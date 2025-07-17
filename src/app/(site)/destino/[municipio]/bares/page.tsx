
import React from 'react';
import { fetchBarListById } from '@/lib/api-listadoBares';         // API de bares
import type { BarListItem } from '@/types/ListadoBar';        // O @/types/bar
import ListadoBaresClient from '@/components/features/bares/ListadoBaresClient'; // Componente Cliente
import type { Metadata } from 'next';


// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ municipio: string }> }
): Promise<Metadata> {
  const { municipio: municipioRaw } = await params
  const municipioName = decodeURIComponent(municipioRaw);
  const title = `Bares y Cafés en ${municipioName} | Destiplus`;
  const description = `Encuentra los mejores bares y cafés en ${municipioName} para disfrutar con amigos.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.destiplus.com/destino/${municipioName}/bares`,
      images: [{ url: 'https://res.cloudinary.com/destinoplus/image/upload/v1735269957/nrvunwgbkt0y0bivanr4.jpg' }],
    },
    alternates: { canonical: `https://www.destiplus.com/destino/${municipioName}/bares` }
  };
}


// --- Componente de Página ---
export default async function BaresListPage(
  { params }: { params: Promise<{ municipio: string }> }
) {
  const { municipio: municipioRaw } = await params
  const municipioParam = municipioRaw;
  console.log(`Server: Rendering BaresListPage for municipio (${municipioParam})`);


  const destinoId = municipioParam == 'Suesca' ? 1 : municipioParam == 'Sesquile' ? 2 : "";

  // 2. Obtener lista de bares usando el ID
  const initialBares = await fetchBarListById(destinoId);

  // 3. Filtrar inválidos en servidor
  const filtrarBaresValidos = (data: BarListItem[]): BarListItem[] => {
      return data.filter(bar =>
          bar.name && bar.name !== "Pendiente" &&
          bar.img &&
          bar.logo
      );
  };
  const validBares = filtrarBaresValidos(initialBares);

  console.log(`Server: Received ${validBares.length} valid bares for ${municipioParam}. Rendering client component.`);

  // Renderiza el componente cliente
  return (
      <ListadoBaresClient
          initialBares={validBares}
          municipio={municipioParam} // Pasa el nombre real
      />
  );
}