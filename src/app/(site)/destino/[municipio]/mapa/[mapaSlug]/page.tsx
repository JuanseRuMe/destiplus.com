
import React from 'react';
import { notFound } from 'next/navigation';
import { getRutaMapDataBySlug, /* fetchAllRutaMapIdentifiers */ } from '@/lib/api-mapa'; // Ajusta ruta
import RutaMapaClient from '@/components/features/rutas/mapa'; // Ajusta ruta
import type { Metadata } from 'next';


// --- Metadata ---
export async function generateMetadata(
  { params }: { params: Promise<{ mapaSlug: string}>}
): Promise<Metadata> {
  const { mapaSlug: slug } = await params 
  const title = `Mapa de Ruta: ${decodeURIComponent(slug).replace(/-/g, ' ')} | Destiplus`; // Título genérico

  return {
    title,
    description: `Sigue la ruta en el mapa interactivo.`,
    robots: { index: false, follow: false }, // Generalmente no quieres indexar páginas de mapa activo
  };
}


// --- Componente Página ---
export default async function RutaMapaPage(
  { params }: { params: Promise<{ mapaSlug: string }>}
) {
  const { mapaSlug: slug } = await params
  console.log(`Server: Rendering RutaMapaPage for slug (${slug})`);

  // Fetch inicial de datos del mapa
  const initialRutaData = await getRutaMapDataBySlug(slug);

  if (!initialRutaData) {
    console.log(`Server: Ruta map data not found for slug: ${slug}. Triggering 404.`);
    notFound();
  }

   console.log(`Server: Ruta map data received for ${initialRutaData.nombre}. Rendering client component.`);
   return <RutaMapaClient initialRutaData={initialRutaData} />; // Pasa los datos al cliente
}