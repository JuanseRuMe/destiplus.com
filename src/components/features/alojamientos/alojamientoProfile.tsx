'use client';

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react'; // Importa todos los iconos de lucide
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Star, Clock, Award, CircleDot } from 'lucide-react'; // Iconos específicos usados
import { CldImage } from 'next-cloudinary'; // Usamos CldImage
import AuthButtons from '@/components/common/logUser'
import type { AlojamientoDetailData } from '@/types/alojamiento';

// --- Props Interface ---
interface AlojamientoProfileProps {
  initialData: AlojamientoDetailData; // Recibe los datos completos (no nulos)
}

// --- Icon Mapping Helper ---
const getIconComponent = (serviceName: string) => {
    const iconMapping: { [key: string]: keyof typeof LucideIcons } = {
        'Wi-Fi': 'Wifi',
        'Baño privado': 'ShowerHead',
        'TV': 'Tv',
        'Desayuno incluido': 'Coffee',
        'Petfriendly': 'PawPrint',
        'Estacionamiento': 'SquareParking',
        'Balcón privado': 'MountainSnow',
        'Jacuzzi': 'Bath',
    };
    const iconName = iconMapping[serviceName] || 'CircleDot';
    return iconName;
};


// --- Main Client Component ---
const AlojamientoProfile: React.FC<AlojamientoProfileProps> = ({ initialData }) => {
    // Extraemos los datos principales. Asumimos que alojamiento[0] siempre existe
    // porque page.tsx ya hizo la validación o llamó a notFound().
    const alojamiento = initialData.alojamiento[0];
    const oferente = initialData; // 'oferente' es la raíz de initialData según la interfaz

    // --- Estado del Componente ---
    const [backgroundImage, setBackgroundImg] = useState(alojamiento.img);
    // Inicializa selectedImgIndex a 0 si hay imágenes, si no, null
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(
        alojamiento.imgs && alojamiento.imgs.length > 0 ? 0 : null
    );
    const [expandedSection, setExpandedSection] = useState<number | null>(null); // Para el acordeón
    const [isExpanded, setIsExpanded] = useState(false); // Para descripción larga
    const [maxTextLength, setMaxTextLength] = useState(100); // Para descripción responsiva

    const isNewListing = !alojamiento.calificacion || alojamiento.calificacion === 0;
    // const [isMapOpen, setIsMapOpen] = useState(false); // Estado para el mapa si lo necesitas

    // --- Efectos ---
    // Efecto para manejar el tamaño de la pantalla (igual)
    useEffect(() => {
        const handleResize = () => {
            setMaxTextLength(window.innerWidth < 768 ? 100 : Infinity);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Efecto para tracking de tiempo (igual)
    useEffect(() => {
        if (!alojamiento.name) return;
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (typeof window !== 'undefined' && window.gtag) {
                 window.gtag('event', 'tiempo_destino', {
                     nombre_destino: alojamiento.name,
                     tipo_negocio: 'alojamiento',
                     tiempo_segundos: timeSpent
                 });
            }
        };
    }, [alojamiento.name]);

    // Efecto para actualizar imagen principal si cambia la prop (poco probable pero seguro)
    useEffect(() => {
        setBackgroundImg(alojamiento.img);
        // Resetea el índice seleccionado si la imagen principal cambia
        setSelectedImgIndex(alojamiento.imgs && alojamiento.imgs.length > 0 ? 0 : null);
    }, [alojamiento.img, alojamiento.imgs]);


    // --- Handlers ---
    const handleImageClick = (imgSrc: string, index: number) => {
        setSelectedImgIndex(index);
        setBackgroundImg(imgSrc);
    };

    const toggleSection = (index: number) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleGalleryNav = (direction: 'prev' | 'next') => {
        if (!alojamiento.imgs || alojamiento.imgs.length === 0 || selectedImgIndex === null) return;

        let newIndex: number;
        if (direction === 'prev') {
            newIndex = selectedImgIndex === 0 ? alojamiento.imgs.length - 1 : selectedImgIndex - 1;
        } else {
            newIndex = (selectedImgIndex + 1) % alojamiento.imgs.length;
        }
        setSelectedImgIndex(newIndex);
        setBackgroundImg(alojamiento.imgs[newIndex]);
    };

    // --- Cálculo de Texto Visible ---
    const detalleTexto = alojamiento.detalle || ''; // Texto por defecto
    const needsTruncation = detalleTexto.length > maxTextLength;
    const truncatedText = detalleTexto.slice(0, maxTextLength);
    const visibleText = isExpanded ? detalleTexto : `${truncatedText}${needsTruncation ? "..." : ""}`;

    // --- Renderizado JSX (mantenido y adaptado) ---
    return (
        <>
            {/* ScrollToTop solo necesita estar una vez en el layout o página */}
            {/* <ScrollToTop /> */}
            {/* Metadata se maneja en page.tsx */}

            <div className='container-actividades-div'> {/* Revisa si este contenedor general es necesario */}
                 {/* Contenedor Imagen Principal y Flechas */}
                <div className='carousel-main-container'>
                    <div className='alojamiento-image-wrapper'>
                        <CldImage
                            className='container-img-principal' // Clase para CSS (object-fit, etc.)
                            src={backgroundImage} // Imagen principal dinámica
                            alt={alojamiento.name || 'Imagen principal del alojamiento'}
                            fill // Rellena el contenedor
                            priority // Es la imagen principal, cargar rápido
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    {/* Renderiza flechas solo si hay galería */}
                    {alojamiento.imgs && alojamiento.imgs.length > 1 && (
                        <>
                            <button
                                className="carousel-arrow carousel-arrow-left"
                                onClick={() => handleGalleryNav('prev')}
                                aria-label="Imagen anterior"
                            >
                                <IoIosArrowBack />
                            </button>
                            <button
                                className="carousel-arrow carousel-arrow-right"
                                onClick={() => handleGalleryNav('next')}
                                aria-label="Siguiente imagen"
                            >
                                <IoIosArrowForward />
                            </button>
                        </>
                    )}
                </div>

                {/* Contenedor Principal de Información */}
                <div className="container-info">

                    {/* Galería de Miniaturas (si existen) */}
                    {alojamiento.imgs && alojamiento.imgs.length > 1 && (
                        <div className='container-carrusel-imgs'>
                            <div className='carrusel-imgs'>
                                {alojamiento.imgs.map((imgSrc, index) => (
                                    <CldImage
                                        key={index}
                                        src={imgSrc}
                                        alt={`Imagen ${index + 1} de ${alojamiento.name}`}
                                        width={49} // Tamaño fijo para miniaturas (ajusta)
                                        height={65}  // Tamaño fijo para miniaturas (ajusta)
                                        crop="fill"
                                        gravity="center"
                                        onClick={() => handleImageClick(imgSrc, index)}
                                        className={index === selectedImgIndex ? 'selected' : ''} // Clase para miniatura activa
                                        loading="lazy" // Lazy load para miniaturas
                                        style={{ objectFit: 'cover' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Título, CheckIn/Out, Badge Nuevo */}
                    <div className='container-logo-nombre-calificacion-alojamiento'>
                        <div className='container-info-titulo-calificacion-logo'>
                             <div className='logo-establecimiento'>
                                 {/* Usa CldImage también para el logo */}
                                 {oferente.logo && (
                                     <CldImage
                                        src={oferente.logo}
                                        alt={`Logo de ${alojamiento.name}`}
                                        width={60} // Ajusta tamaño logo
                                        height={60} // Ajusta tamaño logo
                                        // crop="fit" // o fill
                                        // gravity="center"
                                    />
                                 )}
                             </div>
                             <div className='nombre-establecimiento-alojamiento'>
                                 <h5>{alojamiento.name}</h5>
                                 <div className='container-horario-modal-nuevo'>
                                    {oferente.checkIn && oferente.checkOut && (
                                        <div className="check-times">
                                           <Clock size={14} className="check-icon" />
                                           <p>Check In: {oferente.checkIn} - Check Out: {oferente.checkOut}</p>
                                        </div>
                                    )}
                                    {isNewListing && (
                                        <div className="new-listing-badge">
                                            <Award size={14} className="award-icon" />
                                            <span>¡Nuevo Alojamiento!</span>
                                        </div>
                                    )}
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* Servicios */}
                    {alojamiento.servicios && alojamiento.servicios.servicios && alojamiento.servicios.servicios.length > 0 && (
                        <div className='container-carrusel-servicios'>
                            <div className='sub-container-carrusel-servicios'>
                                {alojamiento.servicios.servicios.map((servicio, index) => {
                                    return (
                                        <p key={index} className="servicio-item">
                                            {(() => {
                                                const IconName = getIconComponent(servicio);
                                                const Icon = (LucideIcons[IconName] || CircleDot) as React.ComponentType<{ size: number; 'aria-hidden'?: string }>;
                                                return <Icon size={18} aria-hidden="true" />;
                                            })()}
                                            {servicio}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                     {/* Equipamento */}
                    <div className='container-hab-camas-baños'>
                        <div>
                            <p>Habitaciones: <strong>{alojamiento.equipamento.habitaciones}</strong></p>
                            <p>Camas: <strong>{alojamiento.equipamento.camas}</strong></p>
                            <p>Baños: <strong>{alojamiento.equipamento.baños}</strong></p>
                        </div>
                    </div>

                    <div className='separador'></div>

                    {/* Descripción */}
                    <div className='container-descripcion'>
                        <p className='descripcion' id="descripcion-texto">
                        {visibleText}
                            {needsTruncation && (
                                <button onClick={toggleExpand} className='show-more-btn'>
                                    {isExpanded ? 'Leer menos' : 'Leer más'}
                                </button>
                            )}
                         </p>
                    </div>

                    <div className='separador'></div>

                     {/* Calificación y Testimonios (si no es nuevo) */}
                     {!isNewListing && alojamiento.calificacion && (
                         <div className="social-proof-container">
                             <div className="rating-overview">
                                 <div className="rating-number">{alojamiento.calificacion.toFixed(1)}</div>
                                 <div className="rating-stats">
                                     <div className="rating-stars" aria-label={`Calificación: ${alojamiento.calificacion.toFixed(1)} de 5 estrellas`}>
                                         {[...Array(5)].map((_, index) => (
                                             <Star
                                                 key={index}
                                                 size={20}
                                                 // Rellena estrellas completas y parciales (si tuvieras decimales)
                                                 fill={index < Math.round(alojamiento.calificacion!) ? "#FFB800" : "none"}
                                                 color={index < Math.round(alojamiento.calificacion!) ? "#FFB800" : "#e0e0e0"}
                                             />
                                         ))}
                                     </div>
                                     <p className="rating-text">Calificación de huéspedes</p>
                                 </div>
                             </div>
                             {/* Aquí irían testimonios reales si los tuvieras */}
                             {/* <div className="testimonial-preview">"..."</div> */}
                         </div>
                     )}

                    {/* Precio y Métodos de Pago */}
                    <div className='container-principal-precio-metodo'>
                        <div className='container-precio-metodo-pago'>
                            <div className='container-precio'>
                                 <h5>
                                    $ {alojamiento.precio.toLocaleString('es-CO', { /* ... opciones formato ... */ })}
                                 </h5>
                                 <p>Por noche</p>
                                 {isNewListing && <span className="promo-tag">¡Precio de lanzamiento!</span>}
                            </div>
                             {oferente.metodosDePago && (
                                 <div className='container-metodo'>
                                     <h4>Métodos de pago</h4>
                                     <p>{oferente.metodosDePago}</p>
                                 </div>
                             )}
                         </div>
                    </div>

                    <AuthButtons
                         isNewListing={isNewListing}
                         contactInfo={oferente.contacto}
                         location={oferente.coordenadas}
                         name={oferente.oferente}
                         tipo={alojamiento.name}
                         onLocationClick={() => { if(window.gtag){ window.gtag('event', 'ver_como_llegar', {  tipo_negocio: 'alojamiento',
                            nombre_alojamiento: alojamiento.name }); } }}
                         onContactClick={() => { if(window.gtag){ window.gtag('event', 'contacto_whatsapp', { tipo_negocio: 'alojamiento',
                            nombre_alojamiento: alojamiento.name }); } }}
                    />

                    {/* Acordeón de Políticas */}
                    {oferente.politicas && Object.keys(oferente.politicas).length > 0 && (
                        <div className='accordion-aloja'>
                             {Object.entries(oferente.politicas)
                                .filter(([value]) => value) // No mostrar si el valor es null/undefined/vacío
                                .map(([key, value], index) => (
                                 <div key={key} className='accordion-item2'>
                                     <button
                                         className={`accordion-header ${expandedSection === index ? 'active' : ''}`}
                                         onClick={() => toggleSection(index)}
                                         aria-expanded={expandedSection === index} // Accesibilidad
                                     >
                                         {/* Formatea la key si es necesario (ej: 'normas_casa' -> 'Normas de la casa') */}
                                         {key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                                         <IoIosArrowForward className={`icon ${expandedSection === index ? 'rotated' : ''}`} />
                                     </button>
                                     {/* Renderiza contenido solo si está expandido (mejor para performance que display:none) */}
                                     {expandedSection === index && (
                                          <div className='accordion-content-aloja'>
                                              {typeof value === 'string' ? (
                                                  <p>{value}</p>
                                              ) : typeof value === 'object' && value !== null ? ( // Si es objeto (ej: emergencia)
                                                  Object.entries(value).map(([subKey, subValue]) => (
                                                      <div className='emergencia-item' key={subKey}>
                                                         {/* Asume que subValue es un string para el enlace */}
                                                          <p>{subKey.replace(/_/g, ' ')}: </p>
                                                          <a href={typeof subValue === 'string' ? subValue : '#'} target="_blank" rel="noopener noreferrer">
                                                              {typeof subValue === 'string' ? subValue : 'Ver'}
                                                          </a>
                                                      </div>
                                                  ))
                                              ) : null}
                                          </div>
                                     )}
                                 </div>
                             ))}
                        </div>
                    )}
                </div> {/* Fin container-info */}
            </div> {/* Fin container-actividades-div */}
        </>
    );
};

export default AlojamientoProfile;