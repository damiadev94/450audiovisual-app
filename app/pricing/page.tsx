'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/payments/create-subscription', {
        method: 'POST',
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push('/auth/login');
          return;
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details ? JSON.stringify(errorData.details) : errorData.error || 'Error al crear suscripción');
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un problema al procesar el pago. Detalle: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Elige tu Plan en Bunker 450
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Forma parte de nuestra comunidad audiovisual y accede al mejor contenido y oportunidades exclusivas.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
        
        {/* Tier Free */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex-1 flex flex-col hover:border-neutral-700 transition">
          <h2 className="text-2xl font-bold text-gray-200 mb-2">Cuenta Free</h2>
          <div className="text-4xl font-extrabold text-white mb-6">Gratis</div>
          <ul className="space-y-4 mb-8 flex-1 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-pink-500">✓</span>
              Acceso a lecciones introductorias gratuitas
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">✓</span>
              Progreso personal guardado
            </li>
            <li className="flex items-center gap-2 opacity-30">
              <span className="text-transparent">✓</span>
              Acceso a TODO el contenido Pro
            </li>
            <li className="flex items-center gap-2 opacity-30">
              <span className="text-transparent">✓</span>
              Participación en sorteo mensual de filmaciones
            </li>
          </ul>
          <button 
            className="w-full py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 font-semibold text-white transition"
            onClick={() => router.push('/dashboard')}
          >
            Tu plan actual
          </button>
        </div>

        {/* Tier Pro */}
        <div className="bg-neutral-900 border-2 border-pink-500 rounded-2xl p-8 flex-1 flex flex-col relative shadow-[0_0_30px_rgba(236,72,153,0.1)] transform md:-translate-y-4">
          <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Recomendado
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bunker Pro</h2>
          <div className="text-4xl font-extrabold text-white mb-2">$9.999 <span className="text-lg font-normal text-gray-400">/ mes</span></div>
          <p className="text-sm text-pink-400 mb-6">Suscripción recurrente mensual</p>
          <ul className="space-y-4 mb-8 flex-1 text-gray-300">
            <li className="flex items-center gap-2 font-medium">
              <span className="text-pink-500">✓</span>
              Acceso <strong>ILIMITADO</strong> a todos los cursos y lecciones
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="text-pink-500">✓</span>
              <strong>Participación automática</strong> en el sorteo mensual por filmación de video gratis
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">✓</span>
              Acceso a lecciones introductorias gratuitas
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">✓</span>
              Progreso personal guardado
            </li>
          </ul>
          <button 
            disabled={loading}
            onClick={handleSubscribe}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          >
            {loading ? 'Procesando...' : 'Obtener Bunker Pro'}
          </button>
        </div>

      </div>
    </div>
  );
}
