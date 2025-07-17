
import React from 'react';
import { fetchEventoListById } from '@/lib/api-listadoEventos';     // API de eventos
import type { EventoListItem } from '@/types/listadoEventos';    // O @/types/evento
import ListadoEventosClient from '@/components/features/eventos/listadoEventos'; // Componente Cliente
import type { Metadata } from 'next';


// --- Metadata Dinámica ---
export async function generateMetadata(
  { params }: { params: Promise<{municio: string}> }
): Promise<Metadata> {
  const { municio: municipioRaw } = await params
  const municipioName = decodeURIComponent(municipioRaw);
  const title = `Eventos en ${municipioName} | Destiplus`;
  const description = `Descubre los próximos eventos y festivales en ${municipioName}. ¡No te los pierdas!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.destiplus.com/destino/${municipioName}/eventos`, // URL Canónica
      images: [{ url: 'https://res.cloudinary.com/destinoplus/image/upload/v1741624924/eventos/casona-quesada/nqks1qvkl0hheoqofhvc.jpg' }],
    },
    alternates: { canonical: `https://www.destiplus.com/destino/${municipioName}/eventos` }
  };
}

// --- Componente de Página ---
export default async function EventosListPage(
  { params }: { params: Promise<{ municipio: string }> }
) {
  const { municipio: municipioRaw } = await params
  const municipioParam = municipioRaw;
  console.log(`Server: Rendering EventosListPage for municipio (${municipioParam})`);

  const destinoId = municipioParam === "Suesca" ? 1 : municipioParam === "Sesquile" ? 2 : "";

  console.log(`Server: Found Destino ID ${destinoId} for $municipioParam}. Fetching eventos...`);

  // 2. Obtener lista de eventos usando el ID
  const initialEventos = await fetchEventoListById(destinoId);

  // 3. Filtrar inválidos en servidor (si tu API no lo hace)
  const filtrarEventosValidos = (data: EventoListItem[]): EventoListItem[] => {
      return data.filter(evento =>
          evento.name && evento.name !== "Pendiente" &&
          evento.img //&& // ¿logo es obligatorio para eventos?
          // evento.logo
      );
  };
  const validEventos = filtrarEventosValidos(initialEventos);

  console.log(`Server: Received ${validEventos.length} valid eventos for ${municipioParam}. Rendering client component.`);

  // Renderiza el componente cliente
  return (
      <ListadoEventosClient
          initialEventos={validEventos}
          municipio={municipioParam} // Pasa el nombre real
      />
  );
}