'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star, Calendar } from 'lucide-react'; // Iconos relevantes
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Verifica ruta
import { CldImage } from 'next-cloudinary';
import type { EventoListItem } from '@/types/listadoEventos'; // O @/types/evento

// --- Props Interface ---
interface ListadoEventosClientProps {
  initialEventos: EventoListItem[];
  municipio: string; // Recibe el nombre del municipio
}

// --- Componente ---
const ListadoEventosClient: React.FC<ListadoEventosClientProps> = ({ initialEventos, municipio }) => {
  const router = useRouter();

  // --- Estado para Filtros y Lista Filtrada ---
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({});
  const [eventosFiltrados, setEventosFiltrados] = useState<EventoListItem[]>(initialEventos);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);

  // --- Efecto para Generar Filtros Disponibles ---
  useEffect(() => {
    console.log("Generating filters from initial eventos...");
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialEventos.forEach((evt) => { // Variable 'evt'
      if (evt.items && typeof evt.items === 'object') {
          Object.entries(evt.items).forEach(([key, value]) => {
              if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                  if (!nuevosFiltros[key]) {
                      nuevosFiltros[key] = new Set();
                  }
                   if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                       nuevosFiltros[key].add({ value });
                   }
              }
          });
      }
    });
    setFiltros(nuevosFiltros);
    setEventosFiltrados(initialEventos);
    setFiltroSeleccionado(null);
  }, [initialEventos]);

  // --- Manejo de Clic en Filtro ---
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     setFiltroSeleccionado(filterValue);
     const filtradas = initialEventos.filter(evt => // Variable 'evt'
         evt.items && evt.items[key] === filterValue
     );
     setEventosFiltrados(filtradas);
   };

   // --- Manejo de Clic en Card (Navegación) ---
    const handleCardClick = (evento: EventoListItem) => {
        // La ruta original era /evento/[description], donde description era evento.name
        // Usaremos slug generado a partir del nombre para la URL
        const slug = evento.name;

        if (!slug) {
            console.error("Falta slug/nombre para navegar al detalle del evento");
            return;
        }
        // ¡¡VERIFICA/CREA ESTA RUTA!! app/(site)/evento/[slug]/page.tsx
        const path = `/destino/${encodeURIComponent(municipio)}/eventos/${encodeURIComponent(slug)}`;
        console.log("Navigating to Evento Detail:", path);
        router.push(path);
    };

  // --- Renderizado JSX (Adaptado de ListadoActividades/Alojamientos) ---
  return (
    <>
      {/* Helmet ya no se usa aquí */}
      <div className="actividades-container"> {/* Reusa clase o crea 'eventos-container' */}
        <FiltrosTitulo
          nombre={`Eventos en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro}
          // Puedes pasar los iconos específicos para eventos si FiltrosTitulo los acepta
          // icon1={<Calendar />} icon2={<Users />}
        />

        <div className="actividades-grid"> {/* Reusa clase o crea 'eventos-grid' */}
          {eventosFiltrados.map((evento) => ( // Variable 'evento'
            <div
              key={evento.id || evento.name}
              className="actividad-card" // Reusa clase o crea 'evento-card'
              onClick={() => handleCardClick(evento)}
            >
              <div className="image-container">
                <CldImage
                  className='activity-image' // O 'evento-image'
                  src={evento.img}
                  alt={evento.name}
                  width={400} height={280} crop="fill" gravity="center" loading="lazy"
                />
                <button className="favorite-btn" onClick={(e) => e.stopPropagation()} aria-label="Favorito">
                    <Heart size={18} />
                </button>
                {(evento.calificacion === null || evento.calificacion === undefined || evento.calificacion === 0) && (
                    // ¿Los eventos tienen 'Nuevo' o es más bien 'Próximamente'? Ajusta.
                    <span className="badge">Nuevo</span>
                )}
              </div>

              <div className="content">
                <div className="header-container">
                   <div className="logo-container">
                       {evento.logo && (
                           <CldImage
                               src={evento.logo}
                               alt={`Logo ${evento.name}`}
                               width={32} height={32}
                               className="actividad-logo" // O 'evento-logo'
                           />
                       )}
                   </div>
                   <div className="activity-info"> {/* O 'evento-info' */}
                       <h3 className="activity-title">{evento.name}</h3>
                       {/* Los eventos podrían no tener calificación numérica, sino 'Gratis', 'Cupos limitados', etc. */}
                       <div className="rating">
                           <Star size={14} className="star-icon" />
                           <span>{evento.calificacion === 0 ? "Próximo" : evento.calificacion}</span>
                       </div>
                   </div>
                </div>

                {/* Info específica de evento como la fecha */}
                {evento.fecha && (
                    <div className="participants-info"> {/* Reusa clase o crea 'evento-date-info' */}
                        <Calendar size={14} className="calendar-icon" />
                        <span>{evento.fecha}</span>
                    </div>
                )}

                <div className="price-booking">
                   <div className="price">
                       <span className="amount">$ {evento.precio}</span>
                       <span className="per-person">/Persona</span> {/* O según aplique */}
                   </div>
                   <button className="book-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(evento); }}>
                      Ver Detalles
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
         {/* Mensaje si no hay resultados */}
         {eventosFiltrados.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay eventos con el filtro seleccionado.</p>
         )}
      </div>
    </>
  );
};

export default ListadoEventosClient;