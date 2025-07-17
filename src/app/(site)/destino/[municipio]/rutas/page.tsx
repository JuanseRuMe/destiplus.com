import React from 'react';
import { fetchRutaListByIdAndType, fetchRutaComentarios } from '@/lib/api-listadoRutas'; // API de rutas
import ListadoRutasClient from '@/components/features/rutas/listadoRutas'; // Cliente
import type { Metadata } from 'next';
import type { RutaListItem, ComentarioItem } from '@/types/listadoRutas';
// --- Metadata ---
export async function generateMetadata(
  { params }: { params: Promise<{ municipio: string }> }
): Promise<Metadata> {
  const { municipio: municipioRaw } = await params
  const municipioName = decodeURIComponent(municipioRaw);
  const title = `Rutas de Senderismo en ${municipioName} | Destiplus`;
  const description = `Explora las mejores rutas y miradores para senderismo en ${municipioName}. Encuentra tu próxima aventura.`;
  const canonicalUrl = `https://www.destiplus.com/destino/${municipioName}/rutas`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl, // URL Canónica
      type: 'website',
      images: {
        url: 'https://res.cloudinary.com/destinoplus/image/upload/v1736911873/rutas/la-lucirnaga/wlzdyxviuowjjyexjelq.jpg'
      }
    },
    alternates: { canonical: canonicalUrl },
  };
}

// --- (Opcional) generateStaticParams ---
// Necesitaría saber qué municipios tienen rutas de senderismo
// export async function generateStaticParams() { ... }

// --- Componente Página ---
export default async function RutasSenderismoListPage(
  { params }: { params: Promise<{ municipio: string }> }
) {
  const { municipio: municipioRaw } = await params
  const municipioParam = municipioRaw;
  const destinoId = municipioParam === "Suesca" ? 1 : municipioParam === "Sesquile" ? 2 : "";
  

  console.log(`Server: Found Destino ID ${destinoId}. Fetching 'Senderismo' routes...`);

  // 2. Obtener lista de rutas de Senderismo
  const rutas: RutaListItem[] = await fetchRutaListByIdAndType(destinoId, 'Senderismo');
  const comentariosPorRuta: { [key: number]: ComentarioItem[] } = {};
  await Promise.all(
    rutas.map(async (ruta) => {
      comentariosPorRuta[ruta.id as number] = await fetchRutaComentarios(ruta.id);
    })
  );

  // Renderiza el componente cliente
  return (
    <ListadoRutasClient
      initialRutas={rutas}
      comentariosMap={comentariosPorRuta}
      municipio={municipioParam}
    />
  );
}