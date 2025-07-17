'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from 'lucide-react'; // Iconos
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Verifica ruta
import { CldImage } from 'next-cloudinary';
import type { BarListItem } from '@/types/ListadoBar'; // O @/types/bar

// --- Props Interface ---
interface ListadoBaresClientProps {
  initialBares: BarListItem[];
  municipio: string; // Recibe el nombre del municipio
}

// --- Helper Format Currency (igual) ---
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', { /* ... */ }).format(amount);
};

// --- Componente ---
const ListadoBaresClient: React.FC<ListadoBaresClientProps> = ({ initialBares, municipio }) => {
  const router = useRouter();

  // --- Estado para Filtros y Lista Filtrada ---
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({});
  const [baresFiltrados, setBaresFiltrados] = useState<BarListItem[]>(initialBares);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);

  // --- Efecto para Generar Filtros Disponibles ---
  useEffect(() => {
    console.log("Generating filters from initial bares...");
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialBares.forEach((bar) => { // Variable 'bar'
      if (bar.items && typeof bar.items === 'object') {
          Object.entries(bar.items).forEach(([key, value]) => {
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
    setBaresFiltrados(initialBares);
    setFiltroSeleccionado(null);
  }, [initialBares]);

  // --- Manejo de Clic en Filtro ---
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     console.log("Applying filter:", key, filterValue);
     setFiltroSeleccionado(filterValue);
     const filtradas = initialBares.filter(bar => // Variable 'bar'
         bar.items && bar.items[key] === filterValue
     );
     setBaresFiltrados(filtradas);
   };

   // --- Manejo de Clic en Card (Navegación) ---
    const handleCardClick = (bar: BarListItem) => {
        const name = bar.name;


        if (!name) {
            console.error("Falta tipo o nombre/slug para navegar al detalle del bar/café");
            return;
        }
        // ¡¡VERIFICA/CREA ESTA RUTA!! ej: app/(site)/establecimiento/bares/[nombreBar]/page.tsx
        const path = `/destino/${encodeURIComponent(municipio)}/bares/${encodeURIComponent(name)}`;
        console.log("Navigating to Bar/Cafe Detail:", path);
        router.push(path);
    };

  // --- Renderizado JSX (Adaptado de ListadoRestaurantes) ---
  return (
    <>
      {/* Helmet ya no se usa aquí */}
      <div className="alojamientos-container"> {/* Puedes usar clase genérica o 'bares-container' */}
        <FiltrosTitulo
          nombre={`Bares y Cafés en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro}
        />

        <div className="alojamientos-grid"> {/* Puedes usar clase genérica o 'bares-grid' */}
          {baresFiltrados.map((bar) => ( // Variable 'bar'
            <div
              key={bar.id || bar.name}
              className="alojamiento-card" // Puedes usar clase genérica o 'bar-card'
              onClick={() => handleCardClick(bar)}
            >
              <div className="image-container">
                <CldImage
                  className='accommodation-image' // O 'bar-image'
                  src={bar.img}
                  alt={bar.name}
                  width={400} height={280} crop="fill" gravity="center" loading="lazy"
                  // sizes="..."
                />
                <button className="favorite-btn" onClick={(e) => e.stopPropagation()} aria-label="Favorito">
                    <Heart size={18} />
                </button>
                {(bar.calificacion === null || bar.calificacion === undefined || bar.calificacion === 0) && (
                    <span className="badge">Nuevo</span>
                )}
              </div>

              <div className="content">
                <div className="card-header">
                   <div className="logo-name-container">
                       {bar.logo && (
                           <CldImage
                               src={bar.logo}
                               alt={`Logo ${bar.name}`}
                               width={32} height={32}
                               className="alojamiento-logo" // O 'bar-logo'
                           />
                       )}
                       <h3 className="accommodation-title-lista">{bar.name}</h3>
                   </div>
                   <div className="rating">
                       <Star size={14} className="star-icon" />
                       <span>
                           {bar.calificacion === null || bar.calificacion === undefined || bar.calificacion === 0
                               ? ""
                               : bar.calificacion.toFixed(1)
                           }
                       </span>
                   </div>
                </div>

                {/* Los bares usualmente no tienen 'habitaciones', 'camas', 'baños' */}
                {/* <div className="details"> ... </div> */}

                <div className="participants-info">
                   <div className="profile-circles"> {/* Iconos placeholder */}
                       <div className="profile-circle"></div>
                       <div className="profile-circle"></div>
                   </div>
                   <span>¡Descubre nuevos ambientes!</span> {/* Texto para bares */}
                </div>

                <div className="price-booking">
                   <div className="price">
                       <span className="amount">$ {formatCurrency(bar.precio_promedio)}</span>
                       <span className="per-night">/Promedio</span>
                   </div>
                   <button className="book-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(bar); }}>
                      Ver Detalles
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mensaje si no hay resultados */}
        {baresFiltrados.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay bares o cafés con el filtro seleccionado.</p>
        )}
      </div>
    </>
  );
};

export default ListadoBaresClient;