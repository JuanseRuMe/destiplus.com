// app/(site)/rutas/caracteristicas/[slug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import {
    getRutaDataBySlug,
    fetchRutaComentarios,
    fetchTreeCountData,
} from '@/lib/api-ruta';
import type { RutaProfileData } from '@/types/ruta'; // Ajusta ruta
import RutaProfileClient from '@/components/features/rutas/ruta'; // Ajusta ruta
import type { Metadata } from 'next';


// --- Metadata ---
export async function generateMetadata(
  { params }: { params: Promise<{ rutaSlug: string, municipio: string }> }
): Promise<Metadata> {
  const { rutaSlug: slug, municipio } = await params
  const rutaData = await getRutaDataBySlug(slug); // Busca por slug

  if (!rutaData) return { title: 'Ruta no Encontrada' };

  const title = `${rutaData.nombre || 'Ruta'} | Destiplus`;
  const description = `Explora la ruta ${rutaData.nombre}: ${rutaData.descripcion?.substring(0, 150) || 'Descubre senderos y paisajes increíbles.'}...`;
  const canonicalUrl = `https://www.destiplus.com/destino/${municipio}/rutas/${slug}`; // Actualiza dominio

  return {
    title, description,
    openGraph: { 
        title, 
        description, 
        url: canonicalUrl, 
        type: 'article' 
    }, // article puede ser apropiado
    alternates: { canonical: canonicalUrl },
  };
}

// --- Componente Página ---
export default async function RutaDetailPage(
  { params }: { params: Promise<{ rutaSlug: string, municipio: string }> }
) {
  const { rutaSlug: slug, municipio } = await params
  console.log(`Server: Rendering RutaDetailPage for slug (${slug})`);

  // 1. Obtener datos principales (y el ID si existe)
  const rutaData = await getRutaDataBySlug(slug);

  if (!rutaData || !rutaData.id) { // Necesitamos ID para las otras llamadas
    console.log(`Server: Ruta not found or missing ID for slug: ${slug}. Triggering 404.`);
    notFound();
  }

  // 2. Obtener comentarios y datos de árboles EN PARALELO
  const rutaId = rutaData.id;
  console.log(`Server: Ruta found (ID: ${rutaId}). Fetching comments and tree data...`);
  const [comentarios, treeData] = await Promise.all([
      fetchRutaComentarios(rutaId),
      fetchTreeCountData(rutaId)
  ]);

  // 3. Construir el objeto de datos para el cliente
  const initialData: RutaProfileData = {
      ruta: rutaData,
      comentarios: comentarios || [],
      treeData: treeData // Puede ser null si falló, el cliente lo manejará
  };

  console.log(initialData)

   console.log(`Server: All data received for ${initialData.ruta.nombre}. Rendering client component.`);
   return <RutaProfileClient initialData={initialData} municipio={municipio}/>;
}