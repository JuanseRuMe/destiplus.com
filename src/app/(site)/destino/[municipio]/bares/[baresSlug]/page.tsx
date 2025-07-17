
import React from 'react';
import { notFound } from 'next/navigation';
import { getEstablecimientoData } from '@/lib/api-restaurante-bar'; // API de establecimiento
import EstablecimientoProfile from '@/components/features/restaurantes/restauranteBar'; // El componente cliente
import type { Metadata } from 'next';

// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ baresSlug: string, municipio: string }> }
): Promise<Metadata> {
  const { baresSlug: slug, municipio } = await params


  const title = `${slug || 'Establecimiento'} | Destiplus`;
  // Ajusta la descripción según los datos disponibles
  const description = `${slug|| 'Menú, horarios, contacto y más.'}`.substring(0, 160);
  // Construye la URL canónica
  const canonicalUrl = `https://www.destiplus.com/destino/${municipio}/bares/${slug}`; // ¡Actualiza dominio!

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: 'https://res.cloudinary.com/destinoplus/image/upload/v1747070640/t2jb6rpavh6az9w6zj6y.jpg' }],
    },
    alternates: { canonical: canonicalUrl },
  };
}


// --- Componente de Página ---
export default async function EstablecimientoDetailPage(
  { params }: { params: Promise<{ baresSlug: string, municipio: string }>}
) {
  const { baresSlug: slug, municipio } = await params; // Recibe tipo y nombre decodificados

  console.log(`Server: Rendering EstablecimientoDetailPage for tipo, nombre (${slug}, ${municipio})`);
  
  const tipo = "bares"

  const initialData = await getEstablecimientoData(tipo, slug)

  if (!initialData) {
    console.log(`Server: Establecimiento not found for ${tipo}/${slug}. Triggering 404.`);
    notFound();
  }

   console.log(`Server: Establecimiento data received. Rendering client component.`);

   // Renderiza el componente cliente, pasando los datos completos
   return <EstablecimientoProfile initialData={initialData} tipoActual={tipo}  />;
}