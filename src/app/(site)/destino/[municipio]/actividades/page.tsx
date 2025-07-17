import React from 'react';
import { fetchActividadListById } from '@/lib/api-listadoActividades'; // API de actividades
import ListadoActividadesClient from '@/components/features/actividades/listadoActividades'; // Componente Cliente
import type { Metadata } from 'next';



// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ municipio: string }> }
): Promise<Metadata> {
  const { municipio: rawMunicipio } = await params;
  const municipioName = decodeURIComponent(rawMunicipio);
  const title = `Actividades en ${municipioName} | Destiplus`;
  const description = `Encuentra las mejores actividades y experiencias en ${municipioName}: Caminatas, escalada, aventura y más.`;
  const canonicalUrl = 'https://www.destiplus.com/destino/${municipioName}/actividades'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: 'https://res.cloudinary.com/destinoplus/image/upload/v1734236561/cajbjyr4g2g7oizfgweu.jpg' }],
    },
    alternates: { 
      canonical: canonicalUrl 
    },
  };
}


export default async function ActividadesListPage(
  { params }: { params: Promise<{ municipio: string }> }
) {
  const { municipio: municipioParam } = await params;
  const destinoId = municipioParam === "Suesca" ? 1 : municipioParam === "Sesquile" ? 2 : "";
  const initialActividades = await fetchActividadListById(destinoId);
  const validActividades = initialActividades.filter(a =>
    a.name && a.name !== "Pendiente" && a.img && a.logo
  );
  return (
    <ListadoActividadesClient
      initialActividades={validActividades}
      municipio={municipioParam}
    />
  );
}