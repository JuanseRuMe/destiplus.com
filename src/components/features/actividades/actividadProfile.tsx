'use client';

import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { Star, Clock, Award } from 'lucide-react';
// import AuthButtons from '@/components/common/logUser'; // Asegúrate que esté migrado/disponible
import { CldImage } from 'next-cloudinary';
import AuthButtons from '@/components/common/logUser'
import type { ActividadDetailData } from '@/types/actividad';

// --- Props Interface ---
interface ActividadProfileProps {
  initialData: ActividadDetailData; // Recibe datos (no nulos)
}


const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
};

// --- Componente Principal de UI ---
const ActividadProfile: React.FC<ActividadProfileProps> = ({ initialData }) => {
    // Extraemos datos. Asumimos que initialData y initialData.actividad[0] existen
    const actividad = initialData.actividad[0];
    const oferente = initialData; // Datos del oferente están en la raíz

    // --- Estado y Efectos (de DescripcionActividades) ---
    const [backgroundImage, setBackgroundImg] = useState(actividad.img);
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(
        actividad.imgs?.Imagenes && actividad.imgs.Imagenes.length > 0 ? 0 : null
    );
    const [expandedSection, setExpandedSection] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [maxTextLength, setMaxTextLength] = useState(100);
    const isNewListing = !actividad.calificacion || actividad.calificacion === 0;

    useEffect(() => {
        const handleResize = () => {
            setMaxTextLength(window.innerWidth < 768 ? 100 : Infinity);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!actividad.name) return;
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (typeof window !== 'undefined' && window.gtag) {
                 window.gtag('event', 'tiempo_destino', {
                     nombre_destino: actividad.name,
                     tipo_negocio: 'actividad',
                     tiempo_segundos: timeSpent
                 });
            }
        };
    }, [actividad.name]);

    useEffect(() => {
        setBackgroundImg(actividad.img);
        // Resetea el índice seleccionado si la imagen principal cambia
        setSelectedImgIndex(
            actividad.imgs?.Imagenes && actividad.imgs.Imagenes.length > 0 
            ? 0 
            : null
        );
    }, [actividad.img, actividad.imgs]);

    // --- Handlers (de DescripcionActividades) ---
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
        // 1. Obtén la lista de imágenes de forma segura
        const imageList = actividad.imgs?.Imagenes;
    
        // 2. Si no hay lista o está vacía, no hagas nada
        if (!imageList || imageList.length === 0) {
            console.warn("handleGalleryNav: No hay imágenes en la galería.");
            return;
        }
    
        // 3. Determina el índice actual para calcular el siguiente.
        //    Si selectedImgIndex es null (caso inicial improbable pero posible),
        //    o si es un número, usa el operador nullish coalescing (??) para default a 0.
        const currentIndex = selectedImgIndex ?? 0;
    
        // 4. Calcula el nuevo índice
        let newIndex: number;
        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? imageList.length - 1 : currentIndex - 1;
        } else { // direction === 'next'
            newIndex = (currentIndex + 1) % imageList.length;
        }
    
        // 5. Actualiza el estado
        // Verifica que la nueva imagen exista antes de actualizar (extra seguridad)
        if (imageList[newIndex]) {
            console.log(`handleGalleryNav: Changing index from ${selectedImgIndex} to ${newIndex}`);
            setSelectedImgIndex(newIndex);
            setBackgroundImg(imageList[newIndex]);
        } else {
            console.error(`handleGalleryNav: Calculated newIndex ${newIndex} is out of bounds.`);
        }
    };


    // --- Cálculo Texto Visible (usa itinerario) ---
    const detalleTexto = actividad.itinerario || ''; // Usa itinerario
    const needsTruncation = detalleTexto.length > maxTextLength;
    const truncatedText = detalleTexto.slice(0, maxTextLength);
    const visibleText = isExpanded ? detalleTexto : `${truncatedText}${needsTruncation ? "..." : ""}`;


    // --- Renderizado JSX ---
    return (
        <>
             {/* Metadata/Helmet se manejan en page.tsx */}
             {/* <ScrollToTop /> si es necesario aquí o en layout */}

             <div className='container-actividades-div'> {/* Contenedor General */}
                {/* Sección Imagen Principal y Flechas */}
                <div className='carousel-main-container'>
                     {/* <div className='alojamiento-image-wrapper'> Revisa si necesitas este wrapper extra */}
                     <div className='alojamiento-image-wrapper'>
                        <CldImage
                            className='container-img-principal' // Clase para estilos
                            src={backgroundImage}
                            alt={actividad.name || 'Imagen principal de la actividad'}
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                     </div>
                        
                     {/* </div> */}
                     {/* Flechas si hay galería */}
                     {actividad.imgs?.Imagenes && actividad.imgs.Imagenes.length > 1 && (
                        <>
                           <button className="carousel-arrow carousel-arrow-left" onClick={() => handleGalleryNav('prev')} aria-label="Imagen anterior"><IoIosArrowBack /></button>
                           <button className="carousel-arrow carousel-arrow-right" onClick={() => handleGalleryNav('next')} aria-label="Siguiente imagen"><IoIosArrowForward /></button>
                        </>
                     )}
                 </div>

                 {/* Contenedor Información */}
                 <div className="container-info">
                     {/* Galería Miniaturas */}
                     {actividad.imgs?.Imagenes && actividad.imgs.Imagenes.length > 1 && (
                         <div className='container-carrusel-imgs'>
                             <div className='carrusel-imgs'>
                                 {actividad.imgs.Imagenes.map((imgSrc, index) => (
                                     <CldImage
                                         key={index}
                                         src={imgSrc}
                                         alt={`Imagen ${index + 1} de ${actividad.name}`}
                                         width={49} // Ajusta tamaño miniaturas
                                         height={65} // Ajusta tamaño miniaturas
                                         crop="fill"
                                         gravity="center"
                                         onClick={() => handleImageClick(imgSrc, index)}
                                         className={index === selectedImgIndex ? 'selected' : ''}
                                         loading="lazy"
                                         style={{ objectFit: 'cover' }}
                                     />
                                 ))}
                             </div>
                         </div>
                     )}

                     {/* Título, Horario, Badge Nuevo */}
                    <div className='container-logo-nombre-calificacion-alojamiento'> {/* Reusa clases o crea nuevas */}
                        <div className='container-info-titulo-calificacion-logo'>
                             <div className='logo-establecimiento'>
                                 {oferente.logo && <CldImage src={oferente.logo} alt={`Logo ${oferente.oferente}`} width={50} height={50} />}
                             </div>
                             <div className='nombre-establecimiento-alojamiento'>
                                 <h5>{actividad.name}</h5>
                                 <div className='container-horario-modal-nuevo'>
                                      {oferente.horario && (
                                         <div className="check-times"> {/* Reusa clase o crea nueva */}
                                             <Clock size={14} className="check-icon" />
                                             <p>{`Horario: ${oferente.horario.abren} - ${oferente.horario.cierran}`}</p>
                                         </div>
                                       )}
                                      {isNewListing && (
                                         <div className="new-listing-badge">
                                             <Award size={14} className="award-icon" />
                                             <span>¡Nueva Actividad!</span>
                                         </div>
                                       )}
                                  </div>
                             </div>
                         </div>
                    </div>

                     {/* Características (Dificultad, Duración, Capacidad) */}
                    <div className='container-caracteristicas'> {/* Necesitas estilos para esto */}
                        <div className='sub-container'> {/* Y esto */}
                            {actividad.dificultad && (
                                <div className='container-individual'>
                                    <div><h5>Dificultad</h5><FaGripfire className='fa-grip-fire'/></div>
                                    <h5>{actividad.dificultad}</h5>
                                </div>
                            )}
                             {actividad.duracion && (
                                <div className='container-individual'>
                                    <div><h5>Duración</h5><FaRegClock className='fa-clock'/></div>
                                     {/* Formatea duración si es número */}
                                    <h5>{typeof actividad.duracion === 'number' ? `${actividad.duracion} Min` : actividad.duracion}</h5>
                                </div>
                             )}
                             {actividad.capacidad && (
                                <div className='container-individual'>
                                    <div><h5>Capacidad</h5><FaPerson className='fa-person'/></div>
                                    <h5>{actividad.capacidad}</h5>
                                </div>
                              )}
                        </div>
                    </div>


                    <div className='separador'></div>

                    {/* Itinerario / Descripción Larga */}
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

                     {/* Calificación (si existe) */}
                     {!isNewListing && actividad.calificacion && (
                          <div className="social-proof-container"> {/* Reusa clases */}
                               <div className="rating-overview">
                                   <div className="rating-number">{actividad.calificacion.toFixed(1)}</div>
                                   <div className="rating-stats">
                                       <div className="rating-stars" aria-label={`Calificación: ${actividad.calificacion.toFixed(1)} de 5 estrellas`}>
                                       {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                size={20}
                                                fill={index < Math.floor(actividad.calificacion!) ? "#FFB800" : "none"}
                                                color={index < Math.floor(actividad.calificacion!) ? "#FFB800" : "#e0e0e0"}
                                            />
                                        ))}
                                       </div>
                                       <p className="rating-text">Calificación de Usuarios</p> {/* Cambiado */}
                                   </div>
                               </div>
                               {/* <div className="testimonial-preview">"..."</div> */}
                          </div>
                      )}


                    {/* Precio y Métodos de Pago */}
                    <div className='container-principal-precio-metodo'>
                        <div className='container-precio-metodo-pago'>
                            <div className='container-precio'>
                                 <h5>{formatCurrency(actividad.precio)}</h5>
                                 <p>Por persona</p>
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
                         tipo={actividad.name}
                         onLocationClick={() => { if(window.gtag){ window.gtag('event', 'ver_como_llegar', { tipo_negocio: 'actividad',
                            nombre_actividad: actividad.name }); } }}
                         onContactClick={() => { if(window.gtag){ window.gtag('event', 'contacto_whatsapp', { tipo_negocio: 'actividad',
                            nombre_actividad: actividad.name }); } }}
                    />

                    {/* Acordeón Requisitos/Recomendaciones */}
                    {actividad.requisitosRecomendaciones && Object.keys(actividad.requisitosRecomendaciones).length > 0 && (
                        <div className='accordion-aloja'> {/* Reusa clase o crea nueva */}
                             {Object.entries(actividad.requisitosRecomendaciones)
                                .filter(([value]) => value)
                                .map(([key, value], index) => (
                                 <div key={key} className='accordion-item2'>
                                     <button 
                                        className={`accordion-header ${expandedSection === index ? 'active' : ''}`} 
                                        onClick={() => toggleSection(index)}
                                        aria-expanded={expandedSection === index} // Accesibilidad
                                     >
                                         {key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                                         <IoIosArrowForward className={`icon ${expandedSection === index ? 'rotated' : ''}`} />
                                     </button>
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

export default ActividadProfile;