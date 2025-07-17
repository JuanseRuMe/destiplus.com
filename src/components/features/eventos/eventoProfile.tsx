'use client';

import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPerson, FaRegClock, FaGripfire } from "react-icons/fa6"; // Iconos originales
import { Star, Clock, Award } from 'lucide-react'; // Iconos de Lucide
import AuthButtons from '@/components/common/logUser'; // Verifica ruta
import { CldImage } from 'next-cloudinary';
import type { EventoDetailData } from '@/types/evento'; // Ajusta ruta

// --- Props Interface ---
interface EventoProfileProps {
  initialData: EventoDetailData;
}


// --- COMPONENTES INTERNOS (Adaptados de tu original) ---

// 1. ImageCarousel (Miniaturas - si los eventos tienen galería)
interface ImageCarouselProps {
    images: string[] | undefined | null;
    selectedIndex: number | null;
    onImageClick: (imgSrc: string, index: number) => void;
    eventoName?: string | null;
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, selectedIndex, onImageClick, eventoName }) => {
    const imageList = images || [];
    if (imageList.length <= 1) return null;
    return (
        <div className='container-carrusel-imgs'>
            <div className='carrusel-imgs'>
                {imageList.map((imgSrc, index) => (
                    <CldImage key={index} src={imgSrc} alt={`Miniatura ${index + 1} de ${eventoName || 'evento'}`}
                        width={80} height={60} crop="fill" gravity="center"
                        onClick={() => onImageClick(imgSrc, index)}
                        className={`carrusel-img ${index === selectedIndex ? 'selected' : ''}`}
                        loading="lazy" style={{ cursor: 'pointer' }} />
                ))}
            </div>
        </div>
    );
};

// 2. HeaderInfoEvento (Adaptado para eventos)
interface HeaderInfoEventoProps {
    name: string | undefined | null;
    logo: string | undefined | null; // Logo del organizador
    fecha: string | undefined | null;
    hora: string | undefined | null;
    isNew: boolean;
}
const HeaderInfoEvento: React.FC<HeaderInfoEventoProps> = ({ name, logo, fecha, hora, isNew }) => {
    return (
        <div className='container-logo-nombre-calificacion-alojamiento'> {/* Reusa clase o crea nueva */}
            <div className='container-info-titulo-calificacion-logo'>
                <div className='logo-establecimiento'>
                    {logo && <CldImage src={logo} alt={`Logo ${name || 'evento'}`} width={50} height={50} crop="fit" />}
                </div>
                <div className='nombre-establecimiento-alojamiento'>
                    <h5>{name || 'Evento'}</h5>
                    <div className='container-horario-modal-nuevo'>
                        {(fecha || hora) && (
                            <div className="check-times"> {/* Reusa clase o crea nueva */}
                                <Clock size={14} className="check-icon" />
                                <p>{`${fecha || ''}${fecha && hora ? ' - ' : ''}${hora || ''}`}</p>
                            </div>
                        )}
                        {isNew && (
                            <div className="new-listing-badge">
                                <Award size={14} className="award-icon" />
                                <span>¡Nuevo Evento!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Description (Reutilizable)
interface DescriptionProps {
    texto: string | null | undefined;
    isExpanded: boolean;
    toggleExpand: () => void;
}
  
const Description: React.FC<DescriptionProps> = ({ texto, isExpanded, toggleExpand }) => {
      const [maxTextLength, setMaxTextLength] = useState(100); // Estado dinámico
  
      // Efecto para manejar el tamaño de la pantalla
      useEffect(() => {
          const handleResize = () => {
              if (window.innerWidth < 768) {
                  setMaxTextLength(100);
              } else {
                  setMaxTextLength(Infinity); // Mostrar todo el texto en pantallas grandes
              }
          };
  
          // Ejecutar al montar y al cambiar tamaño
          handleResize(); // Llama una vez al montar
          window.addEventListener("resize", handleResize);
  
          // Limpiar evento al desmontar
          return () => window.removeEventListener("resize", handleResize);
      }, []); // Se ejecuta solo al montar y desmontar
  
      // Calcular texto visible
      const safeTexto = texto || ''; // Asegura que texto sea string, si es null/undefined lo hace ''
      const needsTruncation = maxTextLength !== Infinity && safeTexto.length > maxTextLength;
      const truncatedText = safeTexto.slice(0, maxTextLength);
      const visibleText = isExpanded ? safeTexto : `${truncatedText}${needsTruncation ? "..." : ""}`;
  
      return (
          <div className='container-descripcion'>
              <p className='descripcion' id="descripcion-texto">
                  {visibleText}
                  {/* Mostrar botón solo si es necesario y hay texto que truncar */}
                  {needsTruncation && (
                      <button onClick={toggleExpand} className='show-more-btn'>
                          {isExpanded ? 'Leer menos' : 'Leer más'}
                      </button>
                  )}
              </p>
          </div>
      );
};

// --- COMPONENTE PRINCIPAL DE UI (PERFIL DEL EVENTO) ---
const EventoProfile: React.FC<EventoProfileProps> = ({ initialData }) => {
    // Extrae el objeto 'evento' principal y los datos del 'oferente'
    const evento = initialData.evento?.[0]; // Asume que el detalle del evento está en el primer item del array
    const oferente = initialData; // Asume que los datos del oferente están en la raíz
    const [backgroundImage, setBackgroundImg] = useState(evento?.img || '');
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(
        evento?.imgs?.imagenes && evento.imgs.imagenes.length > 0 ? 0 : null
    );
    const [expandedSection, setExpandedSection] = useState<number | null>(null); // Para acordeón
    const [isExpanded, setIsExpanded] = useState(false); // Para descripción

    const isNewListing = !evento.calificacion || evento.calificacion === 0;

    // Efecto para tracking de tiempo
    useEffect(() => {
        const nameToTrack = evento.name;
        if (!nameToTrack) return;
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (typeof window !== 'undefined' && window.gtag && timeSpent >= 0) {
                window.gtag('event', 'tiempo_pagina_item', {
                    item_name: nameToTrack,
                    item_category: 'evento', // Categoría fija
                    duration_seconds: timeSpent
                });
            }
        };
    }, [evento.name]);

    // Efecto para actualizar imagen principal
    useEffect(() => {
        setBackgroundImg(evento.img || '');
        setSelectedImgIndex(evento.imgs?.imagenes && evento.imgs.imagenes.length > 0 ? 0 : null);
    }, [evento.img, evento.imgs?.imagenes]);

    if (!evento || !evento.name) {
        return <div className="loading-container"><div className="loading-content"><div className="loading-spinner"></div><h5 className="loading-text">Información del evento no disponible...</h5></div></div>;
    }

    // Handlers
    const handleImageClick = () => { /* ... */ };
    const toggleExpand = () => setIsExpanded(!isExpanded);
    const toggleSection = (index: number) => {
        setExpandedSection(current => (current === index ? null : index));
    };
    const handleGalleryNav = (direction: 'prev' | 'next') => {
        const imageList = evento.imgs?.imagenes;
        if (!imageList || imageList.length <= 1 || selectedImgIndex === null) return;
        let newIndex = selectedImgIndex; // Initialize with current
        if (direction === 'prev') {
            newIndex = selectedImgIndex === 0 ? imageList.length - 1 : selectedImgIndex - 1;
        } else {
            newIndex = (selectedImgIndex + 1) % imageList.length;
        }
        setSelectedImgIndex(newIndex);
        setBackgroundImg(imageList[newIndex]);
    };

    // --- Renderizado JSX ---
    return (
        <>
            {/* Metadata (Helmet) se maneja en page.tsx */}
            {/* <ScrollToTop /> si lo necesitas globalmente, mejor en layout.tsx raíz */}

            <div className='container-actividades-div'> {/* Usa una clase contenedora general */}
                <div className='carousel-main-container'>
                     <div className='alojamiento-image-wrapper'> {/* Reutiliza si el CSS es el mismo */}
                        <CldImage
                            className='container-img-principal'
                            src={backgroundImage}
                            alt={evento.name || 'Imagen principal del evento'}
                            fill priority style={{ objectFit: 'cover' }}
                        />
                     </div>
                     {/* Flechas si hay galería */}
                     {evento.imgs?.imagenes && evento.imgs.imagenes.length > 1 && (
                         <>
                           <button className="carousel-arrow carousel-arrow-left" onClick={() => handleGalleryNav('prev')}><IoIosArrowBack /></button>
                           <button className="carousel-arrow carousel-arrow-right" onClick={() => handleGalleryNav('next')}><IoIosArrowForward /></button>
                         </>
                     )}
                </div>

                <div className="container-info">
                    <ImageCarousel
                        images={evento.imgs?.imagenes}
                        selectedIndex={selectedImgIndex}
                        onImageClick={handleImageClick}
                        eventoName={evento.name}
                    />
                    <HeaderInfoEvento
                        name={evento.name}
                        logo={oferente.logo} // Logo del organizador
                        fecha={evento.fecha}
                        hora={evento.hora}
                        isNew={isNewListing}
                    />

                    {/* Características del Evento */}
                    <div className='container-caracteristicas'>
                        <div className='sub-container'>
                            {oferente.oferente && (
                                <div className='container-individual'>
                                    <div><h5>Organizador</h5><FaGripfire className='fa-grip-fire'/></div>
                                    <h5>{oferente.oferente}</h5>
                                </div>
                            )}
                            {evento.duracion && (
                                <div className='container-individual'>
                                    <div><h5>Duración</h5><FaRegClock className='fa-clock'/></div>
                                    <h5>{typeof evento.duracion === 'number' ? `${evento.duracion} Min` : evento.duracion} Hrs</h5>
                                </div>
                            )}
                            {evento.cupos && (
                                <div className='container-individual'>
                                    <div><h5>Cupos</h5><FaPerson className='fa-person'/></div>
                                    <h5>{evento.cupos}</h5>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='separador'></div>

                    <Description
                        texto={evento.itinerario}
                        isExpanded={isExpanded}
                        toggleExpand={toggleExpand}
                    />

                    <div className='separador'></div>

                    {/* Calificación (si aplica a eventos) */}
                    {!isNewListing && evento.calificacion != null && (
                        <div className="social-proof-container">
                            <div className="rating-overview">
                                <div className="rating-number">{evento.calificacion.toFixed(1)}</div>
                                <div className="rating-stats">
                                    <div className="rating-stars" aria-label={`Calificación: ${evento.calificacion.toFixed(1)} de 5`}>
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} size={20}
                                                  fill={index < Math.round(evento.calificacion!) ? "#FFB800" : "none"}
                                                  color={index < Math.round(evento.calificacion!) ? "#FFB800" : "#e0e0e0"}
                                            />
                                        ))}
                                    </div>
                                    <p className="rating-text">Calificación</p>
                                </div>
                            </div>
                            {/* <div className="testimonial-preview">"..."</div> */}
                        </div>
                    )}

                    {/* Precio y Métodos de Pago */}
                    <div className='container-principal-precio-metodo'> {/* Reusa o crea clase nueva */}
                        <div className='container-precio-metodo-pago'>
                            <div className='container-precio'>
                                <h5>
                                    $ {evento.precio.toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    })}
                                </h5>
                                <p>Por persona</p>
                                {isNewListing && <span className="promo-tag">¡Precio de lanzamiento!</span>}
                            </div>
                            {oferente.metodosdepago && ( // Usa el nombre correcto de la prop
                                <div className='container-metodo'>
                                    <h4>Métodos de pago</h4>
                                    <p>{oferente.metodosdepago}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <AuthButtons
                        isNewListing={isNewListing}
                        contactInfo={oferente.contacto}
                        location={oferente.coordenadas}
                        name={evento.name}
                        tipo=" " // Texto específico para evento
                        onLocationClick={() => {
                            if (typeof window !== "undefined" && window.gtag) {
                                window.gtag('event', 'ver_como_llegar', { // 'action' es el nombre del evento
                                    event_category: 'Event_Interaction',    // Categoría del evento
                                    event_label: `Ver ubicación - ${evento.name}`, // Label descriptivo
                                    item_name: evento.name,
                                    item_category: 'eventos', // ej: "evento", "restaurante", "bar"
                                    interaction_type: 'click',
                                    timestamp: new Date().toISOString()
                                });
                            } else {
                                console.warn('Google Analytics (gtag) no está disponible.');
                            }
                        }}
                        onContactClick={() => {
                            if (typeof window !== "undefined" && window.gtag) {
                                window.gtag('event', 'contacto_whatsapp', { // 'action' es el nombre del evento
                                    event_category: 'Event_Interaction',      // Categoría del evento
                                    event_label: `Contacto WhatsApp - ${evento.name}`, // Label descriptivo
                                    item_name: evento.name,
                                    item_category: 'evento', // ej: "evento", "restaurante", "bar"
                                    interaction_type: 'click',
                                    timestamp: new Date().toISOString()
                                });
                            } else {
                                console.warn('Google Analytics (gtag) no está disponible.');
                            }
                        }}
                    />

                    {/* seccion de accordean, recomendaciones y mas */}
                    <div className='accordion-aloja'>
                        {Object.entries(evento.requisitos || {}).map(([key, value], index) => (
                            <div key={key} className='accordion-item1'>
                            <button 
                                className={`accordion-header ${expandedSection === index ? 'active' : ''}`}
                                onClick={() => toggleSection(index)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                <IoIosArrowForward className={`icon ${expandedSection === index ? 'rotated' : ''}`} />
                            </button>
                            <div 
                                className='accordion-content'
                                style={{ display: expandedSection === index ? 'block' : 'none' }}
                            >
                                {typeof value === 'string' ? (
                                <p>{value}</p>
                                ) : typeof value === 'object' && value !== null ? (
                                Object.entries(value).map(([subKey, subValue]) => (
                                    <div className='emergencia-item' key={subKey}>
                                    <p>{subKey}: </p>
                                    <a href={subValue}>{subValue}</a>
                                    </div>
                                ))
                                ) : null}
                            </div>
                            </div>
                        ))}
                    </div>
                </div> {/* Fin container-info */}
            </div> {/* Fin container-actividades-div */}
        </>
    );
};

export default EventoProfile;