export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * DEFINICIÓN DE TIPOS DE SUPABASE (GENERADOS MANUALMENTE BASADOS EN SCHEMA.SQL)
 * 
 * IMPORTANCIA:
 * 1. INTELLISENSE: El editor te dirá qué campos existen en cada tabla (ej. profiles, courses).
 * 2. SEGURIDAD: Evita errores de escritura en los nombres de las columnas.
 * 3. CONSISTENCIA: Si cambias la DB y actualizas este archivo, TypeScript te avisará de errores en el código.
 */

export interface Database {
  public: {
    Tables: {
      /**
       * Perfiles de usuario: Extensión de la tabla auth.users.
       * Contiene metadatos del usuario, estado de membresía y rol administrativo.
       */
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          is_admin: boolean
          membership_status: string
          membership_expires_at: string | null
          referred_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          is_admin?: boolean
          membership_status?: string
          membership_expires_at?: string | null
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          is_admin?: boolean
          membership_status?: string
          membership_expires_at?: string | null
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Pagos: Registro de transacciones recibidas (ej. MercadoPago).
       * Crucial para auditar ingresos y activar membresías.
       */
      payments: {
        Row: {
          id: string
          user_id: string
          external_id: string | null
          amount: number
          currency: string
          status: string
          payment_method: string | null
          raw_response: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          external_id?: string | null
          amount: number
          currency?: string
          status?: string
          payment_method?: string | null
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          external_id?: string | null
          amount?: number
          currency?: string
          status?: string
          payment_method?: string | null
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Planes: Planes de suscripción disponibles en la plataforma.
       */
      plans: {
        Row: {
          id: string
          name: string
          price: number
          interval: 'month' | 'year'
          mercadopago_plan_id: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          interval: 'month' | 'year'
          mercadopago_plan_id: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          interval?: 'month' | 'year'
          mercadopago_plan_id?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Suscripciones: Estado de la suscripción recurrente de cada usuario.
       */
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'inactive' | 'cancelled'
          current_period_end: string | null
          external_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: 'active' | 'inactive' | 'cancelled'
          current_period_end?: string | null
          external_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: 'active' | 'inactive' | 'cancelled'
          current_period_end?: string | null
          external_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Cursos: Agrupadores de contenido audiovisual (lecciones).
       */
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          order_index: number
          is_published: boolean
          is_free: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          order_index?: number
          is_published?: boolean
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          order_index?: number
          is_published?: boolean
          is_free?: boolean
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Lecciones: Contenido de video específico dentro de un curso.
       */
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          video_url: string
          duration: number | null
          order_index: number
          is_free: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          video_url: string
          duration?: number | null
          order_index?: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          video_url?: string
          duration?: number | null
          order_index?: number
          is_free?: boolean
          created_at?: string
          updated_at?: string
        },
        Relationships: []
      }
      /**
       * Progreso: Seguimiento de qué lecciones ha visto cada usuario.
       */
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          is_completed: boolean
          last_watched_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          is_completed?: boolean
          last_watched_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          is_completed?: boolean
          last_watched_at?: string
        },
        Relationships: []
      }
      /**
       * Sorteos: Eventos de premios gestionados por la plataforma.
       */
      raffles: {
        Row: {
          id: string
          title: string
          description: string | null
          draw_date: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          draw_date?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          draw_date?: string | null
          status?: string
          created_at?: string
        },
        Relationships: []
      }
      /**
       * Tickets: Entradas de usuarios para participar en sorteos.
       */
      tickets: {
        Row: {
          id: string
          user_id: string
          raffle_id: string | null
          payment_id: string | null
          ticket_number: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          raffle_id?: string | null
          payment_id?: string | null
          ticket_number: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          raffle_id?: string | null
          payment_id?: string | null
          ticket_number?: string
          created_at?: string
        },
        Relationships: []
      }
      /**
       * Referidos: Seguimiento de invitaciones entre usuarios.
       */
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_id?: string
          status?: string
          created_at?: string
        },
        Relationships: []
      }
      /**
       * Anuncios: Comunicaciones globales dentro del Dashboard.
       */
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          priority: number
          is_active: boolean
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          priority?: number
          is_active?: boolean
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          priority?: number
          is_active?: boolean
          expires_at?: string | null
          created_at?: string
        },
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_interval: 'month' | 'year'
      subscription_status: 'active' | 'inactive' | 'cancelled'
    },
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
