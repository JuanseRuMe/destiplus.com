import React from 'react';
import type { Metadata } from 'next';
import BurgerBattle from '@/components/features/eventos/no-fijos/batalla'; // Ajusta la ruta a donde guardaste tu componente

// Configurar revalidación cada 60 segundos (1 minuto)
export const revalidate = 3600;


const municipio = 'Suesca'
export const metadata: Metadata = {
  title: 'Batalla de Hamburguesas 3.0 - Suesca Colombia | Destiplus', // Título específico del evento
  description: '¡La Batalla de Hamburguesas 3.0 vuelve a Suesca! Descubre los participantes, ingredientes secretos y vota por tu favorita. Del 19 de Junio al 3 de Julio.',
  keywords: ['batalla de hamburguesas', 'evento gastronómico', 'suesca', 'hamburguesas suesca', 'restaurantes suesca', 'comida suesca', 'destiplus'],
  alternates: {
    canonical: `https://www.destiplus.com/destino/${municipio}/parchar/batalla`, // La URL canónica de ESTA página
  },
  openGraph: {
    title: '¡Prepárate para la Batalla de Hamburguesas 3.0 en Suesca!',
    description: '14 establecimientos, 15 días de competencia. ¿Quién ganará? Vota por tu hamburguesa favorita.',
    url: `https://www.destiplus.com/destino/${municipio}/parchar/batalla`, // La URL de esta página
    type: 'website', // O 'event' si tienes más detalles como fechas de inicio/fin
    images: [
      { // Imagen principal del evento para compartir
        url: 'https://res.cloudinary.com/destinoplus/image/upload/v1746721138/dcyghr6nulheihralqbg.jpg', 
        width: 1080, // Ancho real de la imagen
        height: 1080, // Alto real de la imagen
        alt: 'Batalla de Hamburguesas 3.0 Suesca',
      },
    ],
  },
};

// --- Componente de Página (Server Component muy simple) ---
export default function BurgerBattlePage() {
  // No necesita ser async porque no busca datos del servidor aquí
  console.log("Server: Rendering BurgerBattlePage (Server Component)");

  // Simplemente renderiza el componente cliente que contiene toda la lógica y UI
  return <BurgerBattle />;
}