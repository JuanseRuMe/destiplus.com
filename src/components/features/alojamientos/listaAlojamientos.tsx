'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from 'lucide-react'; // Importa iconos necesarios
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Asegúrate que la ruta y el componente existan/estén migrados
import { CldImage } from 'next-cloudinary'; // Usa CldImage
import type { AlojamientoListItem } from '@/types/listadoAlojamiento'; // Importa el tipo
import { generateSlug } from '@/lib/utils'; // Importa el generador de slugs

// --- Props Interface ---
interface ListadoAlojamientoClientProps {
  initialAlojamientos: AlojamientoListItem[];
  municipio: string; // Recibe el nombre del municipio
}

// --- Helper Format Currency (igual) ---
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', { /* ... */ }).format(amount);
};

// --- Componente ---
const ListadoAlojamientoClient: React.FC<ListadoAlojamientoClientProps> = ({ initialAlojamientos, municipio }) => {
  const router = useRouter();

  // --- Estado para Filtros y Lista Filtrada ---
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({}); // Tipado más específico
  const [alojamientoFiltrados, setAlojamientosFiltrados] = useState<AlojamientoListItem[]>(initialAlojamientos);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);
  // Ya no necesitamos el estado 'alojamientos' original, usamos initialAlojamientos

  // --- Efecto para Generar Filtros Disponibles ---
  useEffect(() => {
    console.log("Generating filters from initial alojamientos...");
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialAlojamientos.forEach((aloj) => {
      // Asegúrate que aloj.items exista y sea un objeto
      if (aloj.items && typeof aloj.items === 'object') {
          Object.entries(aloj.items).forEach(([key, value]) => {
              // Solo añade si el valor es primitivo (string, number, boolean) para simplificar
              if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                  if (!nuevosFiltros[key]) {
                      nuevosFiltros[key] = new Set();
                  }
                  // Añadimos string o number directamente
                  // Comprobamos si ya existe un objeto con ese valor antes de añadir
                   if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                       nuevosFiltros[key].add({ value });
                   }
              }
          });
      }
    });
    setFiltros(nuevosFiltros);
    // Resetea la lista filtrada y la selección al cargar nuevos datos iniciales
    setAlojamientosFiltrados(initialAlojamientos);
    setFiltroSeleccionado(null);
  }, [initialAlojamientos]); // Se ejecuta si los alojamientos iniciales cambian

  // --- Manejo de Clic en Filtro ---
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     console.log("Applying filter:", key, filterValue);
     setFiltroSeleccionado(filterValue); // Guarda qué filtro está activo

     // Filtra desde la lista INICIAL completa
     const filtrados = initialAlojamientos.filter(aloj =>
         aloj.items && // Chequeo extra
         aloj.items[key] === filterValue
     );
     setAlojamientosFiltrados(filtrados); // Actualiza la lista visible
   };

   // --- Manejo de Clic en Card (Navegación) ---
    const handleCardClick = (alojamiento: AlojamientoListItem) => {
        const name = alojamiento.name;
        // Genera el slug desde el nombre para la URL de detalle
        // O usa alojamiento.slug si tu API de lista lo devuelve
        const slug = alojamiento.slug || generateSlug(name);

        if (!municipio || !slug) {
            console.error("Falta municipio o slug/nombre para navegar al detalle del alojamiento");
            return;
        }

        const path = `/destino/${encodeURIComponent(municipio)}/alojamiento/${name}`;
        console.log("Navegando a:", path);
        router.push(path);
    };

  // --- Renderizado JSX ---
  return (
    <>
      <div className="alojamientos-container"> {/* Asegúrate que esta clase exista y dé estilos generales */}
        {/* Pasa municipio en lugar de titulo, y el handler correcto */}
        <FiltrosTitulo
          nombre={`Alojamientos en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro} // Pasa la función de filtro correcta
        />

        <div className="alojamientos-grid"> {/* Asegúrate que esta clase exista y aplique grid layout */}
          {alojamientoFiltrados.map((alojamiento) => (
            <div
              // Usa un ID único si la API lo provee, si no, el nombre como fallback (menos ideal)
              key={alojamiento.id || alojamiento.name}
              className="alojamiento-card" // Tu clase para la card
              onClick={() => handleCardClick(alojamiento)} // Pasa el objeto completo
            >
              <div className="image-container"> {/* Contenedor para imagen y badges */}
                <CldImage
                  className='accommodation-image' // Clase para estilos (object-fit, etc.)
                  src={alojamiento.img}
                  alt={alojamiento.name} // Usa el nombre como alt
                  width={400} // Ajusta según diseño
                  height={280} // Ajusta según diseño
                  crop="fill"
                  gravity="center"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px" // Ejemplo
                  loading="lazy"
                />
                <button className="favorite-btn" onClick={(e) => e.stopPropagation()} aria-label="Favorito">
                    <Heart size={18} />
                </button>
                 {/* Badge Nuevo */}
                 {(alojamiento.calificacion === null || alojamiento.calificacion === undefined || alojamiento.calificacion === 0) && (
                    <span className="badge">Nuevo</span>
                 )}
              </div>

              <div className="content"> {/* Contenedor para el texto */}
                <div className="card-header"> {/* Logo, nombre, calificación */}
                   <div className="logo-name-container">
                       {alojamiento.logo && (
                           <CldImage
                               src={alojamiento.logo}
                               alt={`Logo ${alojamiento.name}`}
                               width={32} // Tamaño pequeño para logo en card
                               height={32}
                               className="alojamiento-logo" // Clase para redondear, etc.
                           />
                       )}
                       <h3 className="accommodation-title-lista">{alojamiento.name}</h3>
                   </div>
                   <div className="rating">
                       <Star size={14} className="star-icon" />
                       <span>
                           {alojamiento.calificacion === null || alojamiento.calificacion === undefined || alojamiento.calificacion === 0
                               ? "Nuevo"
                               : alojamiento.calificacion.toFixed(1) /* Muestra un decimal */
                           }
                       </span>
                   </div>
                </div>

                {/* Detalles (habitaciones, etc.) */}
                <div className="details">
                    {alojamiento.equipamento.habitaciones} hab. • {' '}
                    {alojamiento.equipamento.camas} cama{alojamiento.equipamento.camas !== 1 ? 's' : ''} • {' '}
                    {alojamiento.equipamento.baños} baño{alojamiento.equipamento.baños !== 1 ? 's' : ''}
                </div>

                {/* Precio */}
                <div className="price-booking">
                   <div className="price">
                       <span className="amount">
                            $ {formatCurrency(alojamiento.precio)}
                        </span>
                       <span className="per-night">/noche</span>
                   </div>
                   {/* El botón reservar aquí probablemente debería hacer lo mismo que el click en la card */}
                    <button className="book-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(alojamiento); }}>
                       Ver Detalle
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Considera añadir un mensaje si 'alojamientoFiltrados' está vacío después de aplicar filtros */}
        {alojamientoFiltrados.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay alojamientos con el filtro seleccionado.</p>
        )}
      </div>
    </>
  );
};

export default ListadoAlojamientoClient;