'use client'; // <-- Necesario por useState, useRef, useEffect, event handlers, useRouter

import React, { useState, useRef, MouseEvent } from 'react'; // Import MouseEvent para tipar eventos
import { useRouter } from 'next/navigation'; // Importamos el hook de Next.js para navegación
import { Heart, Star, ChevronRight } from 'lucide-react'; // Importamos iconos
import { CldImage } from 'next-cloudinary'; // Importamos CldImage
import { generateSlug } from '@/lib/utils';

// --- Interfaces de Tipos (TypeScript) ---
// Estas interfaces deberían idealmente vivir en tu archivo de tipos (ej: src/types/destino.ts)
// Las pongo aquí para claridad en el ejemplo. Asegúrate de ajustarlas a tu estructura real.

interface EquipamentoAlojamiento {
  habitaciones: number;
  camas: number;
  baños: number;
}

interface AlojamientoIndividual {
  name: string;
  calificacion?: number | null;
  equipamento: EquipamentoAlojamiento;
  precio: number;
  img: string; // URL o Public ID de Cloudinary
}

interface LugarAlojamiento {
  id: number | string; // ID del lugar (no del alojamiento individual)
  alojamiento?: AlojamientoIndividual[] | null;
}

// Tipo para los datos transformados
interface AccommodationDetails {
  rooms: number;
  beds: number;
  bathrooms: number;
}

interface Accommodation {
  id: string;
  slug: string;
  title: string;
  rating: number;
  details: AccommodationDetails;
  price: number;
  isSuperhost: boolean;
  isNew: boolean;
  image: string;
}

// Props del componente
interface AccommodationsSectionProps {
  alojamientos: LugarAlojamiento[]; // Array de lugares, como viene de la API
  destino_id: number | string; 
  municipio: string;   // ID del destino actual
}
// --- Fin Tipos ---


// --- Funciones Helper (Mantenidas del original) ---
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const transformAlojamientosData = (lugares: LugarAlojamiento[]): Accommodation[] => {
  if (!lugares) return [];
  return lugares.flatMap(lugar => {
    if (!lugar.alojamiento || lugar.alojamiento.length === 0) return [];
    return lugar.alojamiento.map((accommodation): Accommodation => {
       const uniqueId = `${lugar.id}-${accommodation.name}`; // ID para key
       const accommodationSlug = generateSlug(accommodation.name); // <--- GENERAR SLUG

       return {
         id: uniqueId, // ID para el key de React
         slug: accommodationSlug, // <--- GUARDAR SLUG
         title: accommodation.name,
         rating: accommodation.calificacion ?? 0,
         details: {
           rooms: accommodation.equipamento.habitaciones,
           beds: accommodation.equipamento.camas,
           bathrooms: accommodation.equipamento.baños
         },
         price: accommodation.precio,
         isSuperhost: (accommodation.calificacion ?? 0) >= 4.8,
         isNew: accommodation.calificacion === null || accommodation.calificacion === undefined || accommodation.calificacion === 0,
         image: accommodation.img
       };
    });
  });
};


const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({ alojamientos = [], municipio }) => {
  const router = useRouter(); // Hook de navegación de Next.js
  // Transformamos los datos al inicio
  const accommodations = transformAlojamientosData(alojamientos);

  // Estado y Ref para el carrusel arrastrable
  const carouselRef = useRef<HTMLDivElement | null>(null); // Tipamos la ref
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  // --- Navegación ---
  const handleNavigateToAll = () => {
    // Asegúrate de que esta ruta '/alojamientos/[id]' exista en tu App Router
    router.push(`/destino/${encodeURIComponent(municipio)}/alojamiento`);
    console.log(municipio)
  };

  const handleCardClick = (title: string) => {
    if (!municipio || ! title) {
        console.error("Falta municipio o slug para navegar al alojamiento");
        return;
    }
    // Construye la URL anidada correctamente, codificando cada parte dinámica
    // Asume que tu ruta es /destino/[municipio]/alojamiento/[alojamientoSlug]
    const path = `/destino/${encodeURIComponent(municipio)}/alojamiento/${title}`;
    console.log("Navegando a:", path);
    router.push(path);
  };

  // --- Handlers de Eventos (Clics y Arrastre) ---
  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que el clic se propague a la tarjeta
    console.log('Clicked favorite'); // Placeholder
    // Aquí puedes agregar la lógica para los favoritos
  };

  // Iniciar arrastre
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    // pageX es relativo al documento completo
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    // Cambiamos el cursor mientras arrastramos (se hace en el estilo inline abajo)
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.userSelect = 'none'; // Evita selección de texto al arrastrar
  };

  // Mientras se arrastra
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault(); // Previene comportamiento por defecto (ej. seleccionar texto)
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para velocidad de scroll
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Terminar arrastre
  const handleMouseUpOrLeave = () => {
      if (!carouselRef.current) return;
      setIsDragging(false);
      // Restauramos el cursor
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.removeProperty('user-select');
  }
  // NOTA: No hay handleBookClick en el JSX original, pero si lo necesitas, añádelo similar a handleFavoriteClick.

  // --- Renderizado JSX (Mantenemos estructura y clases) ---
  return (
    // Quitamos Fragment <> innecesario
    <section className="accommodations-section">
      <div className="overview-header">
        <h2 className="overview-title">Estadías imperdibles</h2>
        <button className="see-more-btn" onClick={handleNavigateToAll}>
          Ver todos
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Contenedor del Carrusel con eventos de mouse */}
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave} // Usamos la misma función para ambos
        onMouseLeave={handleMouseUpOrLeave} // Termina arrastre si el mouse sale
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // Cursor dinámico
      >
        <div className="accommodations-grid"> {/* Este div interno es el que realmente se desplaza */}
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="accommodation-card"
              onClick={() => handleCardClick(accommodation.title)}
              // Quitamos cursor: pointer de aquí, ya está en el contenedor padre
            >
              <div className="image-container">
                {/* Reemplazamos OptimizedImageLarge con CldImage */}
                <CldImage
                  className='accommodation-image' // Clase para CSS
                  src={accommodation.image} // URL o Public ID
                  alt={accommodation.title}
                  width={360} // Ancho basado en tu CSS previo (ajusta si es necesario)
                  height={240} // Alto estimado (ratio 3:2), ajusta si es necesario
                  sizes="(max-width: 768px) 90vw, 360px" // Ejemplo, ajusta a tu diseño
                  crop="fill" // O scale, etc.
                  gravity="center"
                  loading="lazy" // Carga diferida es buena para carruseles
                  style={{ objectFit: 'cover' }}
                />
                <button
                  className="favorite-btn"
                  onClick={handleFavoriteClick} // Handler separado
                  aria-label="Añadir a favoritos" // Label para accesibilidad
                >
                  <Heart size={18} />
                </button>
                {/* Badges (igual) */}
                {accommodation.isSuperhost && (
                    <span className="badge">Superhost</span>
                )}
                {accommodation.isNew && (
                    <span className="badge">Nuevo</span>
                )}
              </div>

              <div className="content">
                <div className="title-row">
                  <h3 className="accommodation-title">{accommodation.title}</h3>
                  <div className="rating">
                    <Star size={14} className='star-icon' />
                    {/* Mostramos rating solo si es mayor que 0 */}
                    {accommodation.rating > 0 ? accommodation.rating.toFixed(1) : 'Nuevo'}
                  </div>
                </div>

                <p className="details">
                  {/* Lógica para plurales (igual) */}
                  {accommodation.details.rooms} hab. •{accommodation.details.rooms !== 1 ? 'es' : ''} {' '}
                  {accommodation.details.beds} cama{accommodation.details.beds !== 1 ? 's' : ''} • {' '}
                  {accommodation.details.bathrooms} baño{accommodation.details.bathrooms !== 1 ? 's' : ''}
                </p>

                <div className="price-row">
                  <span className="price">
                    {formatCurrency(accommodation.price)} <span className="nights">noche</span>
                  </span>
                  <button
                    className="book-btn"
                    onClick={(e) => { e.stopPropagation(); handleCardClick(accommodation.title); }} // Ejemplo
                   >
                    Ver Detalle
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;