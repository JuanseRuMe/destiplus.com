'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation'; // Hook de navegación de Next.js
import { Mountain, Navigation, Camera, ChevronRight } from 'lucide-react'; // Iconos
import { CldImage } from 'next-cloudinary'; // Usamos CldImage

// --- Interfaces de Tipos ---
interface ImagenSimple {
  img: string; // URL o Public ID
  // Puedes añadir otras props si existen (id, etc.) aunque no se usen aquí
  [key: string]: unknown;
}

interface ViewpointsSectionProps {
  imagenes?: ImagenSimple[] | null; // El array de imágenes puede ser opcional o nulo
  destino_id: number | string;
  municipio: string;
}
// --- Fin Tipos ---

const ViewpointsSection: React.FC<ViewpointsSectionProps> = ({ imagenes = [], destino_id, municipio }) => {
  const router = useRouter();

  // Selecciona la imagen principal o usa la de por defecto (igual que antes)
  const mainImage = imagenes?.[0]?.img || "https://res.cloudinary.com/destinoplus/image/upload/v1733759892/rutas/mirador-del-halcon/mxxupbqr7ls8uhzasdmg.jpg";

  // Navegación al hacer clic en la card o el botón "Ver todos"
  const handleClick = () => {
    console.log(`ViewpointsSection: Navegando a lista de rutas para ${municipio} (ID: ${destino_id})`);

    // --- Inicio Bloque GTAG ---
    if (typeof window !== "undefined" && window.gtag) {
      try { // Añadimos try...catch por si acaso
        window.gtag('event', 'click_ver_rutas', { // Nombre de acción claro
          event_category: 'Navigation',         // Categoría
          event_label: `Ver Rutas - ${municipio}`, // Label descriptivo
          nombre_municipio: municipio,
          destino_id: destino_id, // Útil para segmentar por destino
          timestamp: new Date().toISOString(),
          interaction_type: 'click'
        });
      } catch (error) {
          console.warn("Error enviando evento gtag 'click_ver_rutas':", error);
      }
    } else {
      console.warn('Google Analytics (gtag) no está disponible.');
    }

    const path = `/destino/${encodeURIComponent(municipio)}/rutas`; // Ajusta 'senderismo' si es dinámico
    router.push(path);
  };

  // --- Renderizado JSX (Mantenemos estructura y clases) ---
  return (
    // Quitamos Fragment <> innecesario si .container-landing es la raíz
    <div className="container-landing"> {/* Clase contenedora principal */}
      <div className="overview-header">
        <h2 className="overview-title">Paisajes para explorar</h2>
        <button className="see-more-btn" onClick={handleClick}>
          Ver todos
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Card Principal Clickable */}
      <div
        className="viewpoints-main-card"
        onClick={handleClick}
        role="button" // Añadido para accesibilidad
        tabIndex={0} // Añadido para accesibilidad
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()} // Accesibilidad teclado
        aria-label={`Explorar paisajes y rutas de senderismo en ${municipio}`} // Label descriptivo
      >
        {/* Contenedor de imagen principal */}
        {/* IMPORTANTE: Este div necesita position: relative; en tu CSS para que CldImage con fill funcione */}
        <div className="viewpoints-image-container">
          <CldImage
            className='viewpoints-image' // Clase para CSS (añade object-fit: cover/contain aquí)
            src={mainImage} // URL o Public ID de la imagen seleccionada o por defecto
            alt={`Paisaje principal de ${municipio}`} // Alt descriptivo
            fill 
            priority={true} // Marcamos como priority ya que es la imagen principal de la sección
            style={{ objectFit: 'cover' }}
          />
          {/* Overlay con gradiente (igual) */}
          <div className="viewpoints-overlay">
            {/* Badges superiores (igual) */}
            <div className="viewpoints-badges">
              <span className="viewpoints-badge">
                <Mountain size={14} className="viewpoints-badge-icon" />
                Spots
              </span>
            </div>

            {/* Información del mirador (igual) */}
            <div className="viewpoints-content">
              <h3 className="viewpoints-title-text">
                Descubre los mejores spots de {municipio}
              </h3>
              <div className="viewpoints-tags">
                <span className="viewpoints-tag">Sin costo</span>
                <span className="viewpoints-tag">Facil</span>
                <span className="viewpoints-tag">Rapido</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menú inferior de acciones (igual) */}
        {/* Estos botones actualmente no tienen onClick asignado en tu código original */}
        <div className="viewpoints-actions">
          <button className="viewpoints-action-button" aria-label="Información sobre aventura sin guía">
            <Mountain size={20} className="viewpoints-action-icon" />
            <span className="viewpoints-action-text">Aventúrate sin guía</span>
          </button>
          <button className="viewpoints-action-button" aria-label="Información sobre cómo encontrar los lugares">
            <Navigation size={20} className="viewpoints-action-icon" />
            <span className="viewpoints-action-text">Encuéntralos fácil</span>
          </button>
          <button className="viewpoints-action-button" aria-label="Información sobre previsualizar la experiencia">
            <Camera size={20} className="viewpoints-action-icon" />
            <span className="viewpoints-action-text">Vívelo antes de ir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewpointsSection;