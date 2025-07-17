
import type { Metadata } from 'next';
// Importa TU componente cliente principal
import HomeClient from '@/components/features/home/HomeClient';
// Importa TU función para obtener datos
import { getDestinosIniciales, getBlogsIniciales } from '@/lib/api-home'; // O '@/lib/api-home' si renombraste el archivo .ts
// Importa TU tipo de dato

// Metadata para la página RAÍZ '/'
export const metadata: Metadata = {
  title: 'Destiplus | Qué hacer en Suesca Colombia, planes, hoteles y turismo',
  description: 'Descubre Suesca, Colombia con Destiplus: actividades al aire libre, hoteles, las Rocas de Suesca, glamping, rutas, y más',
  openGraph: {
     title: 'Destiplus | Turismo inteligente en Suesca',
     description: 'Planes de fin de semana cerca de Bogotá: camping, glamping, hoteles, rutas de viaje y más en Suesca y Sesquilé. Planea tu escapada con IA.',
     url: 'https://www.destiplus.com/',
     images: [{ url: 'https://res.cloudinary.com/destinoplus/image/upload/v1734700730/vsgukkynidlmdmccxqhj.jpg' }],
  },
  alternates: {
    canonical: 'https://www.destiplus.com/', // URL canónica específica para esta página
  },
  keywords: [
    'qué hacer en Suesca',
    'planes en Suesca',
    'rocas de Suesca',
    'turismo en Suesca',
    'hoteles en Suesca',
    'cabañas en Suesca',
    'camping en Suesca',
    'glamping Cundinamarca',
    'pueblos cerca de Bogotá',
    'cómo llegar a Suesca',
    'Suesca turismo',
    'planes fin de semana Bogotá',
    'escalada en Suesca',
    'Rocas de Suesca Cundinamarca',
    'Destiplus Suesca'
  ],
};

// Componente ASÍNCRONO de servidor para la página RAÍZ '/'
export default async function HomePage() { // El nombre puede ser cualquiera, pero representa la página raíz
  // 1. Llama a tu función de API en el servidor
  const initialDestinos = await getDestinosIniciales();
  const listaBlogs = await getBlogsIniciales();
  console.log(listaBlogs)

  // 2. Renderiza TU componente cliente, pasándole los datos
  return <HomeClient initialDestinos={initialDestinos} sampleArticles={listaBlogs} />;
}