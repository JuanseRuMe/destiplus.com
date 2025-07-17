import React from 'react';
import { fetchRestauranteListById } from '@/lib/api-listadoRestaurantes'; // API de restaurantes
import type { RestauranteListItem } from '@/types/listadoRestaurantes'; // O @/types/restaurante
import ListadoRestaurantesClient from '@/components/features/restaurantes/listadoRestaurantes'; // Componente Cliente
import type { Metadata } from 'next';


// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{ municipio: string }>}
): Promise<Metadata> {
  const { municipio: municipioRaw } = await params
  const municipioName = decodeURIComponent(municipioRaw);
  const title = `Restaurantes en ${municipioName} | Destiplus`;
  const description = `Descubre dónde comer en ${municipioName}. Encuentra los mejores restaurantes, precios y ambientes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.destiplus.com/destino/${municipioName}/restaurantes`, // URL Canónica
      images: [
        { // Imagen principal del evento para compartir
          url: 'https://res.cloudinary.com/destinoplus/image/upload/v1736722535/restaurantes/nixcal/iiwpzg8z9mtqpqaa2vi0.jpg', 
          width: 1080, // Ancho real de la imagen
          height: 1080, // Alto real de la imagen
          alt: 'Batalla de Hamburguesas 3.0 Suesca',
        },
      ],
    },
    alternates: { canonical: `https://www.destiplus.com/destino/${municipioName}/restaurantes` }
  };
}


// --- Componente de Página ---
export default async function RestaurantesListPage(
  { params }: { params: Promise<{ municipio: string }>}
) {
  const { municipio: municipioRaw } = await params
  const municipioParam = municipioRaw; // Puede ser nombre o slug
  console.log(`Server: Rendering RestaurantesListPage for municipio (${municipioParam})`);

  const destinoId = municipioParam === "Suesca" ? 1 : municipioParam === "Sesquile" ? 2 : "";

  // 2. Obtener lista de restaurantes usando el ID
  const initialRestaurantes = await fetchRestauranteListById(destinoId);

  // 3. Filtrar inválidos en servidor
  const filtrarRestaurantesValidos = (data: RestauranteListItem[]): RestauranteListItem[] => {
      return data.filter(restaurante =>
          restaurante.name && restaurante.name !== "Pendiente" &&
          restaurante.img &&
          restaurante.logo
      );
  };
  const validRestaurantes = filtrarRestaurantesValidos(initialRestaurantes);

  console.log(`Server: Received ${validRestaurantes.length} valid restaurantes for ${municipioParam}. Rendering client component.`);

  // Renderiza el componente cliente
  return (
      <ListadoRestaurantesClient
          initialRestaurantes={validRestaurantes}
          municipio={municipioParam} // Pasa el nombre real
      />
  );
}