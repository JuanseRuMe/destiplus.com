'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from 'lucide-react'; // Iconos
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Verifica ruta
import { CldImage } from 'next-cloudinary'; // Usa CldImage
import type { RestauranteListItem } from '@/types/listadoRestaurantes'; // O @/types/restaurante
import { generateSlug } from '@/lib/utils'; // Importa generador de slug

// --- Props Interface ---
interface ListadoRestaurantesClientProps {
  initialRestaurantes: RestauranteListItem[];
  municipio: string; // Recibe el nombre del municipio
}

// --- Helper Format Currency (igual) ---
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', { /* ... */ }).format(amount);
};

// --- Componente ---
const ListadoRestaurantesClient: React.FC<ListadoRestaurantesClientProps> = ({ initialRestaurantes, municipio }) => {
  const router = useRouter();

  // --- Estado para Filtros y Lista Filtrada ---
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({});
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState<RestauranteListItem[]>(initialRestaurantes);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);

  // --- Efecto para Generar Filtros Disponibles ---
  useEffect(() => {
    console.log("Generating filters from initial restaurantes...");
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialRestaurantes.forEach((res) => { // Cambiado de 'act' a 'res'
      if (res.items && typeof res.items === 'object') {
          Object.entries(res.items).forEach(([key, value]) => {
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
    setRestaurantesFiltrados(initialRestaurantes); // Usa initialRestaurantes
    setFiltroSeleccionado(null);
  }, [initialRestaurantes]);

  // --- Manejo de Clic en Filtro ---
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     console.log("Applying filter:", key, filterValue);
     setFiltroSeleccionado(filterValue);
     // Filtra desde la lista INICIAL completa
     const filtradas = initialRestaurantes.filter(res => // Cambiado de 'act' a 'res'
         res.items && res.items[key] === filterValue
     );
     setRestaurantesFiltrados(filtradas); // Actualiza la lista visible
   };

   // --- Manejo de Clic en Card (Navegación) ---
    const handleCardClick = (restaurante: RestauranteListItem) => {
        const name = restaurante.name;
        // Genera slug o usa el nombre para la URL de detalle del restaurante
        const slug = restaurante.slug || generateSlug(name);

        if (!municipio || !slug) {
            console.error("Falta municipio o slug/nombre para navegar al detalle del restaurante");
            return;
        }
        // Navega a la ruta de detalle de restaurante
        // ¡¡VERIFICA/CREA ESTA RUTA!! ej: app/(site)/destino/[municipio]/restaurante/[slug]/page.tsx
        const path = `/destino/${encodeURIComponent(municipio)}/restaurantes/${name}`;
        console.log("Navigating to Restaurante Detail:", path);
        router.push(path);
    };

  // --- Renderizado JSX ---
  return (
    <>
      {/* Helmet ya no se usa aquí */}
      {/* Cambiamos clases base para evitar conflictos si son iguales a las de alojamiento */}
      <div className="alojamientos-container">
        <FiltrosTitulo
          nombre={`Restaurantes en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro} // Pasa la función correcta
        />

        <div className="alojamientos-grid"> {/* Clase específica para grid de restaurantes */}
          {restaurantesFiltrados.map((restaurante) => (
            <div
              key={restaurante.id || restaurante.name} // Usa ID si existe
              className="alojamiento-card" // Clase específica para card
              onClick={() => handleCardClick(restaurante)}
            >
              <div className="image-container"> {/* Reutiliza clase si el estilo es igual */}
                <CldImage
                  className='accommodation-image' // Clase genérica o específica
                  src={restaurante.img}
                  alt={restaurante.name}
                  width={400} // Ajusta
                  height={280} // Ajusta
                  crop="fill"
                  gravity="center"
                  // sizes="..." // Ajusta
                  loading="lazy"
                />
                <button className="favorite-btn" onClick={(e) => e.stopPropagation()} aria-label="Favorito">
                  <Heart size={18} />
                </button>
                {(restaurante.calificacion === null || restaurante.calificacion === undefined || restaurante.calificacion === 0) && (
                  <span className="badge">Nuevo</span>
                )}
              </div>

              <div className="content"> {/* Reutiliza clase si estilo es igual */}
                <div className="card-header">
                  <div className="logo-name-container">
                    {restaurante.logo && (
                      <CldImage
                        src={restaurante.logo}
                        alt={`Logo ${restaurante.name}`}
                        width={32}
                        height={32}
                        className="alojamiento-logo" // Clase genérica o específica
                      />
                    )}
                    {/* Usa clase específica si necesitas estilo diferente */}
                    <h3 className="accommodation-title-list">{restaurante.name}</h3>
                  </div>
                  <div className="rating">
                      <Star size={14} className="star-icon" />
                      <span>
                          {restaurante.calificacion === null || restaurante.calificacion === undefined || restaurante.calificacion === 0
                              ? "Nuevo"
                              : restaurante.calificacion.toFixed(1)
                          }
                      </span>
                  </div>
                </div>

                <div className="participants-info">
                    <div className="profile-circles">
                    <div className="profile-circle"></div>
                    <div className="profile-circle"></div>
                    </div>
                    <span>¡Descubre nuevos sabores!</span>
                </div>

                {/* Precio Promedio y Botón */}
                <div className="price-booking">
                  <div className="price">
                      <span className="amount">$ {formatCurrency(restaurante.precio_promedio)}</span>
                      <span className="per-person">/Promedio</span> {/* Ajustado */}
                  </div>
                   <button className="book-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(restaurante); }}>
                      Ver Detalles
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mensaje si no hay resultados */}
        {restaurantesFiltrados.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay restaurantes con el filtro seleccionado.</p>
        )}
      </div>
    </>
  );
};

export default ListadoRestaurantesClient;