'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from 'lucide-react'; // Iconos
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Verifica ruta
import { CldImage } from 'next-cloudinary'; // Usa CldImage
import type { ActividadListItem } from '@/types/listadoActividades'; // O @/types/actividad

// --- Props Interface ---
interface ListadoActividadesClientProps {
  initialActividades: ActividadListItem[];
  municipio: string; // Recibe el nombre del municipio
}

// --- Helper Format Currency (igual) ---
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', { /* ... */ }).format(amount);
};

// --- Componente ---
const ListadoActividadesClient: React.FC<ListadoActividadesClientProps> = ({ initialActividades, municipio }) => {
  const router = useRouter();

  // --- Estado para Filtros y Lista Filtrada ---
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({});
  const [actividadesFiltradas, setActividadesFiltradas] = useState<ActividadListItem[]>(initialActividades);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);

  // --- Efecto para Generar Filtros Disponibles ---
  useEffect(() => {
    console.log("Generating filters from initial actividades...");
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialActividades.forEach((act) => {
      if (act.items && typeof act.items === 'object') {
          Object.entries(act.items).forEach(([key, value]) => {
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
    setActividadesFiltradas(initialActividades);
    setFiltroSeleccionado(null);
  }, [initialActividades]);

  // --- Manejo de Clic en Filtro ---
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     console.log("Applying filter:", key, filterValue);
     setFiltroSeleccionado(filterValue);
     const filtradas = initialActividades.filter(act =>
         act.items && act.items[key] === filterValue
     );
     setActividadesFiltradas(filtradas);
   };

   // --- Manejo de Clic en Card (Navegación) ---
    const handleCardClick = (actividad: ActividadListItem) => {
        const name = actividad.name;

        // Navega a la ruta de detalle de actividad (asumiendo ruta top-level por ahora)
        // ¡¡VERIFICA/CREA ESTA RUTA!! app/(site)/actividad/[slug]/page.tsx
        const path = `/destino/${encodeURIComponent(municipio)}/actividades/${encodeURIComponent(name)}`;
        console.log("Navigating to Actividad Detail:", path);
        router.push(path);
    };

  // --- Renderizado JSX ---
  return (
    <>
      {/* Helmet ya no se usa aquí */}
      <div className="actividades-container"> {/* Clase contenedora general */}
        <FiltrosTitulo
          nombre={`Actividades en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro}
        />

        <div className="actividades-grid"> {/* Clase para la grid */}
          {actividadesFiltradas.map((actividad) => (
            <div
              // Usa un ID único si existe, si no, el nombre como fallback
              key={actividad.id || actividad.name}
              className="actividad-card" // Clase para la card
              onClick={() => handleCardClick(actividad)} // Pasa el objeto completo
            >
              <div className="image-container">
                <CldImage
                  className='activity-image' // Clase para la imagen
                  src={actividad.img}
                  alt={actividad.name}
                  width={400} // Ajusta
                  height={280} // Ajusta
                  crop="fill"
                  gravity="center"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px" // Ejemplo
                  loading="lazy"
                />
                <button className="favorite-btn" onClick={(e) => e.stopPropagation()} aria-label="Favorito">
                    <Heart size={18} />
                </button>
                 {(actividad.calificacion === null || actividad.calificacion === undefined || actividad.calificacion === 0) && (
                    <span className="badge">Nuevo</span>
                 )}
              </div>

              <div className="content">
                <div className="header-container"> {/* Contenedor para logo y título/rating */}
                   <div className="logo-container">
                       {actividad.logo && (
                           <CldImage
                               src={actividad.logo}
                               alt={`Logo ${actividad.name}`}
                               width={32}
                               height={32}
                               className="actividad-logo" // Clase para estilos logo
                           />
                       )}
                   </div>
                   <div className="activity-info">
                       <h3 className="activity-title">{actividad.name}</h3>
                       <div className="rating">
                           <Star size={14} className="star-icon" />
                           <span>
                               {actividad.calificacion === null || actividad.calificacion === undefined || actividad.calificacion === 0
                                   ? "Nuevo"
                                   : actividad.calificacion.toFixed(1)
                               }
                           </span>
                       </div>
                   </div>
                </div>

                {/* Info Participantes (estático en tu ejemplo original) */}
                <div className="participants-info">
                   <div className="profile-circles">
                       <div className="profile-circle"></div>
                       <div className="profile-circle"></div>
                   </div>
                   <span>¡Nueva experiencia disponible!</span>
                </div>

                {/* Precio y Botón Reservar */}
                <div className="price-booking">
                   <div className="price">
                       <span className="amount">$ {formatCurrency(actividad.precio)}</span>
                       <span className="per-person">/persona</span>
                   </div>
                   <button className="book-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(actividad); }}>
                      Ver Detalle
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
         {/* Mensaje si no hay resultados después de filtrar */}
         {actividadesFiltradas.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay actividades con el filtro seleccionado.</p>
         )}
      </div>
    </>
  );
};

export default ListadoActividadesClient;