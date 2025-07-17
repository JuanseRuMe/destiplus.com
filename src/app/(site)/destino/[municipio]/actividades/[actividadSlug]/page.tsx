
import React from 'react';
import { notFound } from 'next/navigation';
import { getActividadDataBySlug } from '@/lib/api-actividadProfule'; 
import ActividadProfile from '@/components/features/actividades/actividadProfile'; // Componente cliente
import type { Metadata } from 'next';

// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ actividadSlug: string; municipio: string }> }
): Promise<Metadata> {
  const { actividadSlug: slug, municipio } = await params;
  const data = await getActividadDataBySlug(slug); // Busca por slug

  if (!data || !data.actividad || data.actividad.length === 0) {
    return { title: 'Actividad no Encontrada' };
  }

  const actividad = data.actividad[0];
  const title = `${actividad.name} en ${municipio} | Destiplus`;
  const description = `${actividad.name}: ${actividad.itinerario?.substring(0, 150)}...`;
  const imageUrl = actividad.img || 'https://res.cloudinary.com/destinoplus/image/upload/v1747070640/t2jb6rpavh6az9w6zj6y.jpg';
  const canonicalUrl = `https://www.destiplus.com/destino/${municipio}}actividades/${slug}`; // Actualiza dominio

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      images: [{ url: imageUrl }],
    },
    alternates: { canonical: canonicalUrl },
  };
}


// --- Componente de Página ---
export default async function ActividadDetailPage(
  { params }: { params: Promise<{ actividadSlug: string; municipio: string }> }
) {
  const { actividadSlug: slug } = await params;
  const initialData = await getActividadDataBySlug(slug);

  if (!initialData) {
    console.log(`Server: Actividad not found for slug: ${slug}. Triggering 404.`);
    notFound();
  }

   console.log(`Server: Actividad data received for ${initialData.actividad[0]?.name}. Rendering client component.`);

   // Renderiza el componente cliente pasando los datos
   return <ActividadProfile initialData={initialData} />;
}