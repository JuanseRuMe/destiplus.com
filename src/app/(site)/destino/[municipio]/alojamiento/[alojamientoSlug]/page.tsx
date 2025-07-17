// app/(site)/destino/[municipio]/alojamiento/[alojamientoSlug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { getAlojamientoDataBySlug } from '@/lib/api-alojamientoProfile';
import AlojamientoProfile from '@/components/features/alojamientos/alojamientoProfile'; // Importa el Client Component
import type { Metadata } from 'next';



// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ alojamientoSlug: string; municipio: string }> }
): Promise<Metadata> {
  const { alojamientoSlug: slug, municipio } = await params
  const data = await getAlojamientoDataBySlug(slug);

  if (!data || !data.alojamiento || data.alojamiento.length === 0) {
    return { title: 'Alojamiento no Encontrado' };
  }

  const alojamiento = data.alojamiento[0]; // Tomamos el primero del array
  const title = `${alojamiento.name} en ${municipio} | Destiplus`;
  const description = `${alojamiento.name}: ${alojamiento.detalle?.substring(0, 150)}...`;
  const imageUrl = alojamiento.img || 'https://res.cloudinary.com/destinoplus/image/upload/v1747070640/t2jb6rpavh6az9w6zj6y.jpg'; // Imagen principal
  const canonicalUrl = `https://www.destiplus.com/destino/${municipio}/alojamiento/${slug}`; // Actualiza dominio

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      images: [{ url: imageUrl }],
      type: 'website', 
    },
    alternates: { canonical: canonicalUrl },
  };
}

// --- Componente de Página ---
export default async function AlojamientoDetailPage(
  { params }: { params: Promise<{ alojamientoSlug: string; municipio: string }> }
) {
  const { alojamientoSlug: slug, municipio } = await params
  console.log(`Server: Rendering AlojamientoDetailPage for slug (${slug}) in municipio (${municipio})`);

  const initialData = await getAlojamientoDataBySlug(slug);

  if (!initialData) {
    console.log(`Server: Alojamiento not found for slug: ${slug}. Triggering 404.`);
    notFound();
  }

  console.log(`Server: Alojamiento data received for ${initialData.alojamiento[0].name}. Rendering client component.`);

  // Renderiza el componente cliente pasando los datos
  // No necesitamos pasar municipio/slug como props separadas si ya están en initialData
  return <AlojamientoProfile initialData={initialData} />;
}