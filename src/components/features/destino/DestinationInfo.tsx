'use client'; 

import React, { useState } from 'react';
import { Calendar, CloudSun, Shield, Bus, ChevronRight, X } from 'lucide-react';

// --- Interfaces de Tipos ---
interface DestinoDataForInfo {
  municipio?: string; // Usado en el título del modal
  epocas?: string | null;
  clima?: string | null;
  seguridad?: string | null;
  transporte?: string | null;
  // Añadir otras props si 'destino' las contiene y se usan
}

interface DestinationInfoProps {
  destino: DestinoDataForInfo | null; // Puede ser nulo si los datos fallan
}

interface InfoSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content?: string | null; // El contenido puede ser opcional o nulo
  bgColor: string;
  iconColor: string;
  shortDesc: string; // Añadido por el map
}
// --- Fin Tipos ---


// --- Componente ---
const DestinationInfo: React.FC<DestinationInfoProps> = ({ destino }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false); // Para controlar la clase 'active' de animación

  // Salida temprana si no hay datos del destino
  if (!destino) {
      // Podrías mostrar un placeholder o simplemente no renderizar nada
      return null;
  }

  // Extraemos las propiedades para usarlas en 'sections'
  const { epocas, clima, seguridad, transporte, municipio } = destino;

  // --- Helper para descripción corta (igual que antes, con tipo) ---
  const createShortDesc = (text: string | null | undefined): string => {
    if (!text) return 'Información no disponible'; // Mensaje por defecto si no hay contenido
    // Corta a 65 caracteres, luego quita la última palabra incompleta
    const shortened = text.substring(0, 65).split(' ').slice(0, -1).join(' ');
    // Añade puntos suspensivos solo si el texto original era más largo
    return text.length > 65 ? `${shortened}...` : text;
  };

  // --- Definición de Secciones (igual, pero tipado) ---
  const sectionsData = [
    {
      id: 'epocas',
      icon: <Calendar size={24} />,
      title: 'Mejores épocas',
      content: epocas,
      bgColor: 'bg-icon-epocas', // Asegúrate que estas clases CSS existan
      iconColor: 'icon-epocas'
    },
    {
      id: 'clima',
      icon: <CloudSun size={24} />,
      title: 'Clima y qué llevar',
      content: clima,
      bgColor: 'bg-icon-clima',
      iconColor: 'icon-clima'
    },
    {
      id: 'seguridad',
      icon: <Shield size={24} />,
      title: 'Tips de seguridad',
      content: seguridad,
      bgColor: 'bg-icon-seguridad',
      iconColor: 'icon-seguridad'
    },
    {
      id: 'transporte',
      icon: <Bus size={24} />,
      title: 'Cómo llegar',
      content: transporte,
      bgColor: 'bg-icon-transporte',
      iconColor: 'icon-transporte'
    }
  ];

  // Mapeamos para añadir la descripción corta
  const sections: InfoSection[] = sectionsData
      .filter(section => section.content) // Opcional: Filtra secciones sin contenido si no quieres mostrarlas
      .map(section => ({
          ...section,
          shortDesc: createShortDesc(section.content) // Genera desc corta
      }));


  // --- Handlers del Modal (lógica idéntica) ---
  const handleOpenModal = () => {
     // Gtag event (con verificación)
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'vista_info_destino', {
          nombre_destino: destino?.municipio || 'desconocido',
          tipo_contenido: 'sugerencias',
          tipo_interaccion: 'vista'
          // timestamp: new Date().toISOString() // Opcional si lo necesitas
        });
    } else {
        console.warn('Google Analytics (gtag) no está disponible.');
    }

    // Lógica para animación de entrada
    setShowModal(true);
    // Usamos dos requestAnimationFrame para asegurar que el navegador aplique
    // primero `display: block` (implícito por showModal=true) y luego la clase `active`.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalActive(true);
      });
    });
  };

  const handleCloseModal = () => {
    // Lógica para animación de salida
    setIsModalActive(false);
    // Espera a que termine la transición CSS (ej. 500ms) antes de quitar el modal del DOM
    setTimeout(() => {
      setShowModal(false);
    }, 500); // Asegúrate que este tiempo coincida con tu transición CSS en .modal-overlay y .modal-content
  };


  // --- Renderizado JSX (Mantenemos estructura y clases) ---
  return (
    // Quitamos Fragment <> innecesario
    <div className="overview-section">
      <div className="overview-header">
        <h2 className="overview-title">No viajes sin leer esto</h2>
        {/* Botón solo se muestra si hay secciones con contenido */}
        {sections.length > 0 && (
          <button
            onClick={handleOpenModal}
            className="see-more-btn"
          >
            Ver detalles
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Mostramos las preview cards solo si hay secciones */}
      {sections.length > 0 && (
          <div className="preview-cards">
            {sections.map((section) => (
              <div
                key={section.id}
                className="preview-card"
                onClick={handleOpenModal} // Abrir modal al clickear card
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenModal()}
                aria-label={`Ver detalles sobre ${section.title}`}
              >
                <div className={`card-icon ${section.bgColor}`}>
                  {/* Asumimos que iconColor es clase CSS */}
                  <span className={section.iconColor}>{section.icon}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{section.title}</h3>
                  <p className="card-description">{section.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
       )}

      {/* --- Modal (Renderizado Condicional) --- */}
      {showModal && (
        <div
          // Clases dinámicas para animación
          className={`modal-overlay ${isModalActive ? 'active' : ''}`}
          onClick={handleCloseModal} // Cierra al clickear fuera
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title" // Enlaza con el título para accesibilidad
        >
          {/* Detiene la propagación para no cerrar al clickear DENTRO del contenido */}
          <div
            className={`modal-content ${isModalActive ? 'active' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title" className="modal-title">Todo sobre {municipio || 'el destino'}</h2>
              <button
                onClick={handleCloseModal}
                className="close-btn"
                aria-label="Cerrar modal" // Label para accesibilidad
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {/* Mapeamos sections de nuevo para mostrar el contenido completo */}
              {sectionsData
                .filter(section => section.content) // Muestra solo secciones con contenido real
                .map((section) => (
                <div key={`${section.id}-modal`} className="info-section">
                   <div className="section-header">
                    {/* Icono y título (puedes ajustar layout/estilos si es necesario) */}
                     <div className={`section-icon ${section.bgColor}`}>
                       <span className={section.iconColor}>{section.icon}</span>
                     </div>
                     <h3 className="section-title">{section.title}</h3>
                   </div>
                   {/* Contenido completo */}
                   <p className="section-content">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationInfo;