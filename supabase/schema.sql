-- Habilitar extensión para generación de UUIDs (Identificadores Únicos Universales)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Perfiles: Almacena información adicional de los usuarios registrados.
-- Se vincula directamente con la tabla de autenticación nativa de Supabase (auth.users).
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT false, -- Identifica si el usuario es administrador/creador.
    membership_expires_at TIMESTAMP WITH TIME ZONE, -- Fecha hasta la cual el usuario tiene acceso premium.
    referred_by UUID REFERENCES public.profiles(id), -- Almacena quién invitó a este usuario.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Pagos: Registro histórico y auditoría de transacciones.
-- Permite validar el estado de los pagos recibidos de pasarelas como MercadoPago.
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    external_id TEXT UNIQUE, -- ID de referencia externo (ej. ID de MercadoPago) para evitar duplicidad.
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'ARS',
    status TEXT NOT NULL DEFAULT 'pending', -- Estados: pending, approved, rejected.
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Sorteos: Define los eventos de sorteo disponibles en la plataforma.
CREATE TABLE public.raffles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    draw_date TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'active', -- Estados: active, completed, cancelled.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Tickets: Registra la participación de los usuarios en los sorteos.
-- Cada ticket está vinculado a un pago y a un sorteo específico.
CREATE TABLE public.tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    raffle_id UUID REFERENCES public.raffles(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
    ticket_number TEXT UNIQUE NOT NULL, -- Número lógico único del ticket (ej. BH-0001).
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabla de Referidos: Seguimiento detallado del crecimiento orgánico.
CREATE TABLE public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Quién invita.
    referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Quién es invitado.
    status TEXT NOT NULL DEFAULT 'pending', -- Cambia a 'completed' cuando el referido realiza su primer pago.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(referred_id) -- Un usuario solo puede ser referido por una persona.
);

-- 6. Tabla de Anuncios: Comunicaciones internas para los miembros del dashboard.
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Tabla de Cursos: Organización del contenido académico.
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Tabla de Lecciones: El contenido audiovisual individual dentro de los cursos.
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL, -- URL de Vimeo o Bunny Stream.
    duration INTEGER, -- Duración en segundos.
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Tabla de Progreso: Seguimiento del consumo de contenido por parte de los miembros.
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lesson_id) -- Un registro de progreso por usuario/lección.
);

-- SEGURIDAD: Row Level Security (RLS)
-- Estas sentencias aseguran que los usuarios NO puedan ver datos de otros usuarios a menos que se defina una política específica.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO

-- Perfiles: El usuario solo puede ver y editar sus propios datos de perfil.
-- Los administradores (is_admin = true) pueden ver todos los perfiles en el futuro (opcional).
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Pagos: El usuario solo puede ver su propio historial de pagos.
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

-- Cursos y Lecciones: 
-- 1. Usuarios con membresía activa pueden ver contenido publicado.
-- 2. Administradores pueden ver todo. (Se asume que el sistema de pago controla la fecha en 'profiles')
CREATE POLICY "Members can view published courses" ON public.courses
    FOR SELECT USING (
        is_published = true AND (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND (membership_expires_at > now() OR is_admin = true)
            )
        )
    );

CREATE POLICY "Members can view lessons of accessible courses" ON public.lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND is_published = true AND (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND (membership_expires_at > now() OR is_admin = true)
                )
            )
        )
    );

-- Progreso: Usuarios solo pueden ver y editar su propio progreso.
CREATE POLICY "Users can view their own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Sorteos: Todos los usuarios con acceso pueden ver los sorteos activos.
CREATE POLICY "Anyone can view active raffles" ON public.raffles
    FOR SELECT USING (status = 'active');

-- Tickets: El usuario solo puede ver sus propios tickets de sorteo.
CREATE POLICY "Users can view their own tickets" ON public.tickets
    FOR SELECT USING (auth.uid() = user_id);

-- Referidos: Los usuarios pueden ver su propia actividad de referidos (como referente o referido).
CREATE POLICY "Users can view their own referrals" ON public.referrals
    FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- Anuncios: Todos los usuarios pueden ver los anuncios que no han expirado y están activos.
CREATE POLICY "Anyone can view active announcements" ON public.announcements
    FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- FUNCIONES Y TRIGGERS (AUTOMATIZACIÓN)

-- Función para actualizar el campo 'updated_at' automáticamente en cada edición.
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_payments_updated
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_courses_updated
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_lessons_updated
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Función para crear automáticamente un perfil en 'public.profiles' cuando un usuario se registra en la plataforma.
-- Esto sincroniza la base de datos de Auth con nuestra base de datos de negocio.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
