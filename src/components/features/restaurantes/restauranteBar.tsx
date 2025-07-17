'use client';

import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import { Star, Clock, Award } from 'lucide-react';
import AuthButtons from '@/components/common/logUser'; // Verifica ruta
import { CldImage } from 'next-cloudinary';
// Asegúrate que los tipos se importen correctamente
import type { EstablecimientoDetailData, MenuItem, EstablecimientoDetallado } from '@/types/restaurante-bar'; // Ajusta ruta a tus tipos

type EstablecimientoCompleto = EstablecimientoDetailData & EstablecimientoDetallado;

// --- FORMAT CURRENCY HELPER ---
const formatCurrency = (amount: number | string): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return '';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(numAmount);
};

// --- COMPONENTES INTERNOS REUTILIZABLES (DEFINIDOS AQUÍ MISMO) ---

// 1. ImageCarousel (Miniaturas) - Migrado
interface ImageCarouselProps {
    images: string[] | undefined | null;
    selectedIndex: number | null;
    onImageClick: (imgSrc: string, index: number) => void;
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, selectedIndex, onImageClick }) => {
    // Accede a la lista correcta (si la estructura es establecimiento.imgs.imagenes)
    const imageList = images || [];
    if (imageList.length <= 1) return null;

    return (
        <div className='container-carrusel-imgs'>
            <div className='carrusel-imgs'>
                {imageList.map((imgSrc, index) => (
                    <CldImage
                        key={index}
                        src={imgSrc}
                        alt={`Miniatura ${index + 1}`}
                        width={49} // Ajusta
                        height={65} // Ajusta
                        crop="fill"
                        gravity="center"
                        onClick={() => onImageClick(imgSrc, index)}
                        className={`carrusel-img ${index === selectedIndex ? 'selected' : ''}`}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                    />
                ))}
            </div>
        </div>
    );
};

// 2. HeaderInfo - Migrado
interface HeaderInfoProps {
    // Ajusta las props según la estructura de 'establecimiento' que le pasas
    name: string | undefined | null;
    logo: string | undefined | null;
    calificacion: number | undefined | null;
    horario: { abren?: string | null; cierran?: string | null; } | undefined | null;
}
const HeaderInfo: React.FC<HeaderInfoProps> = ({ name, logo, calificacion, horario }) => {
    const isNewListing = !calificacion || calificacion === 0;
    return (
        <div className='container-logo-nombre-calificacion-alojamiento'>
            <div className='container-info-titulo-calificacion-logo'>
                <div className='logo-establecimiento'>
                    {logo && (
                        <CldImage src={logo} alt={`Logo de ${name}`} width={50} height={50} crop="fit" />
                    )}
                </div>
                <div className='nombre-establecimiento-alojamiento'>
                    <h5>{name || 'Establecimiento'}</h5>
                    <div className='container-horario-modal-nuevo'>
                        {horario && horario.abren && horario.cierran && (
                            <div className="check-times">
                                <Clock size={14} className="check-icon" />
                                <p>{`Horario: ${horario.abren} - ${horario.cierran}`}</p>
                            </div>
                        )}
                        {isNewListing && (
                            <div className="new-listing-badge">
                                <Award size={14} className="award-icon" />
                                <span>¡Nuevo lugar!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Description - Migrado y con su propio estado/efecto
interface DescriptionProps {
  texto: string | null | undefined;
  isExpanded: boolean;
  toggleExpand: () => void;
}
const Description: React.FC<DescriptionProps> = ({ texto, isExpanded, toggleExpand }) => {
    const [maxTextLength, setMaxTextLength] = useState(100); // Mantiene su estado interno
    const safeTexto = texto || '';
    const needsTruncation = maxTextLength !== Infinity && safeTexto.length > maxTextLength;
    const truncatedText = safeTexto.slice(0, maxTextLength);
    const visibleText = isExpanded ? safeTexto : `${truncatedText}${needsTruncation ? "..." : ""}`;

    useEffect(() => { // Mantiene su efecto interno
        const handleResize = () => {
            setMaxTextLength(window.innerWidth < 768 ? 100 : Infinity);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
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
    );
};

// 4. MenuSection (Reutilizable para Bebidas, Populares, etc.) - Migrado
interface MenuSectionProps {
  title: string;
  items: MenuItem[] | null | undefined;
  itemLayoutType: 'bebida' | 'popular' | 'recurrente' | 'antojo'; // Diferencia layouts
}
const MenuSection: React.FC<MenuSectionProps> = ({ title, items, itemLayoutType }) => {
  if (!items || items.length === 0) return null;

  const containerClass = itemLayoutType === 'popular' ? 'container-recomendados-top-5' : 'container-carrusel-bebidas';
  const itemClass = itemLayoutType === 'popular' ? 'popular' : 'bebida'; // Ajusta si tienes clase 'recurrente' o 'antojo'
  const ofertaClass = itemLayoutType === 'popular' ? 'oferta' : 'ofertaBebida';

  return (
    <>
        <div className='container-top-5'>
            <div className='container-title'><h4>{title}</h4></div>
            <div className={containerClass}>
                {items.map((item, index) => (
                <div className={itemClass} key={`${itemLayoutType}-${index}-${item.nombre}`}> {/* Key más única */}
                    <div className={ofertaClass}>
                    <CldImage
                        src={item.img} alt={item.nombre}
                        width={200} height={200} // Ajusta
                        crop="fill" gravity="center" loading="lazy"
                    />
                    {/* Mostrar precio/nombre aquí solo para ciertos tipos si el layout es diferente */}
                    {(itemLayoutType === 'bebida' || itemLayoutType === 'antojo') && (
                        <>
                        <div className='container-info-bebidas'>
                                <h5>{item.nombre}</h5>
                                <p>{formatCurrency(item.costo)}</p>
                            </div>
                            <p className='descripcion-bebidas-antojos'>
                                {item.descripcion}
                            </p>
                        </>
                    )}
                    </div>
                    {/* Descripción para tipos que la tienen separada */}
                    {(itemLayoutType === 'popular' || itemLayoutType === 'recurrente' ) && (
                    <div className='descripcion-oferta'>
                            <h5>{item.nombre}</h5>
                            {item.descripcion && <p>{item.descripcion}</p>}
                            <h5 className='precio-top'>{formatCurrency(item.costo)}</h5>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </>
    
  );
};

// --- Props Interface para el componente principal ---
interface EstablecimientoProfileProps {
  initialData: EstablecimientoDetailData;
  tipoActual: string;
}

// --- COMPONENTE PRINCIPAL DE UI (Antes DescripcionEstablecimientos) ---
const EstablecimientoProfile: React.FC<EstablecimientoProfileProps> = ({ initialData, tipoActual }) => {
    const establecimiento = (initialData.establecimiento?.[0] || initialData) as EstablecimientoCompleto;
    const [backgroundImage, setBackgroundImg] = useState(establecimiento.img || '');
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(
        establecimiento.imgs?.imagenes && establecimiento.imgs.imagenes.length > 0 ? 0 : null
    );
    const [isExpanded, setIsExpanded] = useState(false); // Para Description
    const isNewListing = !establecimiento.calificacion || establecimiento.calificacion === 0;

    useEffect(() => {
    // Verifica que tengamos un nombre de establecimiento para el tracking
    const nombreEstablecimiento = establecimiento?.name;
    if (!nombreEstablecimiento) {
      console.warn("EstablecimientoProfile: 'establecimiento.name' es indefinido, no se puede trackear tiempo.");
      return; // No hacer nada si no hay nombre
    }

    const startTime = Date.now();
    console.log(`EstablecimientoProfile: Tracking de tiempo iniciado para "${nombreEstablecimiento}" (Tipo: ${tipoActual})`);

    // La función de limpieza se ejecuta cuando el componente se desmonta
    // o cuando alguna de las dependencias (nombreEstablecimiento, tipoActual) cambia.
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // Tiempo en segundos

      if (timeSpent < 0) return; // Pequeña guarda por si acaso

      console.log(`EstablecimientoProfile: Tracking de tiempo finalizado para "${nombreEstablecimiento}". Tiempo: ${timeSpent}s`);

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tiempo_en_pagina_item', { // Nombre de evento más específico
          item_name: nombreEstablecimiento,
          item_category: tipoActual, // 'restaurante', 'bar', etc.
          duration_seconds: timeSpent,
          page_path: window.location.pathname, // Ruta actual
          // Puedes añadir más parámetros si son útiles
          // 'nombre_municipio': initialData.municipio || 'desconocido',
        });
      } else {
        console.warn('EstablecimientoProfile: window.gtag no está disponible para el tracking de tiempo.');
      }
    };
    }, [establecimiento?.name, tipoActual, initialData?.municipio]);

    useEffect(() => { /* Efecto setBackgroundImg (sin cambios) */ }, [establecimiento.img, establecimiento.imgs?.imagenes]);

    // --- Handlers ---
    const handleImageClick = (imgSrc: string, index: number) => {
        setSelectedImgIndex(index);
        setBackgroundImg(imgSrc);
    };
    const toggleExpand = () => setIsExpanded(!isExpanded);
    const handleGalleryNav = (direction: 'prev' | 'next') => {
    const imageList = establecimiento.imgs?.imagenes;
    if (!imageList || imageList.length <= 1 || selectedImgIndex === null) return;
    let newIndex: number;
    if (direction === 'prev') {
        newIndex = selectedImgIndex === 0 ? imageList.length - 1 : selectedImgIndex - 1;
    } else {
        newIndex = (selectedImgIndex + 1) % imageList.length;
    }
    setSelectedImgIndex(newIndex);
    setBackgroundImg(imageList[newIndex]);
    };

    const principalesItems: MenuItem[] = 
        (Array.isArray(establecimiento.recurrentes) && establecimiento.recurrentes.length > 0
        ? establecimiento.recurrentes
        : (Array.isArray(establecimiento.recurrente) && establecimiento.recurrente.length > 0 // Chequeo para la propiedad singular
            ? establecimiento.recurrente
            : [])); // Fallback a un array vacío

    // --- Determinar qué propiedad usar para "Métodos de Pago" ---

    // Verifica si hay datos básicos antes de continuar
    if (!establecimiento?.name) {
        return <div>Cargando o datos no disponibles...</div>;
    }
    // --- Renderizado ---
    return (
    <>
        <div className='container-actividades-div'> 
            <div className='carousel-main-container'>
                <div className='alojamiento-image-wrapper'>
                    <CldImage
                        className='container-img-principal'
                        src={backgroundImage}
                        alt={establecimiento.name || 'Imagen principal'}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                {establecimiento.imgs?.imagenes && establecimiento.imgs.imagenes.length > 1 && (
                    <>
                        <button className="carousel-arrow carousel-arrow-left" onClick={() => handleGalleryNav('prev')} aria-label="Imagen anterior"><IoIosArrowBack /></button>
                        <button className="carousel-arrow carousel-arrow-right" onClick={() => handleGalleryNav('next')} aria-label="Siguiente imagen"><IoIosArrowForward /></button>
                    </>
                )}
            </div>

            <div className="container-info">
                <ImageCarousel
                    images={establecimiento.imgs?.imagenes}
                    selectedIndex={selectedImgIndex}
                    onImageClick={handleImageClick}
                />
                <HeaderInfo
                    name={establecimiento.name}
                    logo={establecimiento.logo}
                    calificacion={establecimiento.calificacion}
                    horario={establecimiento.horario}
                />

                {establecimiento.servicios && (
                    <div className='container-caracteristicas'>
                        <div className='sub-container'>
                            {/* Si es Bar/Café (asumiendo que NO tiene 'delivery' o que 'tipoActual' es 'bares') */}
                            {tipoActual.includes('bar') || tipoActual.includes('cafe') || !establecimiento.servicios.delivery ? (
                                <>
                                    {establecimiento.servicios.cover != null && (
                                        <div className='container-individual'>
                                            <div><h5>Cover</h5><FaPerson className="fa-grip-fire"/></div> {/* Icono para Cover */}
                                            <h5>{formatCurrency(establecimiento.servicios.cover)}</h5>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Si es Restaurante (asumiendo que SÍ tiene 'delivery' o 'tipoActual' es 'restaurante')
                                <>
                                    {establecimiento.servicios.delivery != null && (
                                        <div className='container-individual'>
                                            <div><h5>Domicilios</h5><FaGripfire className='fa-grip-fire'/></div> {/* Icono para Domicilios */}
                                            <h5 className='disponibilidad'>
                                                {String(establecimiento.servicios.delivery) === 'true' || establecimiento.servicios.delivery === true || String(establecimiento.servicios.delivery).toLowerCase() === 'sí' || String(establecimiento.servicios.delivery).toLowerCase() === 'si'
                                                    ? 'Sí Disponible'
                                                    : String(establecimiento.servicios.delivery).toLowerCase() === 'no'
                                                    ? 'No Disponible'
                                                    : String(establecimiento.servicios.delivery)
                                                }
                                            </h5>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Características Comunes */}
                            {establecimiento.servicios.reservas != null && (
                                <div className='container-individual'>
                                    <div><h5>Reservas</h5><FaRegClock className='fa-clock'/></div> {/* Desde react-icons/fa6 */}
                                    <h5 className='disponibilidad'>{String(establecimiento.servicios.reservas)}</h5>
                                </div>
                            )}
                            {establecimiento.servicios.parking != null && (
                                <div className='container-individual'>
                                    <div><h5>Parking</h5><FaPerson className='fa-person'/></div> {/* Desde lucide-react */}
                                    <h5 className='disponibilidad'>{String(establecimiento.servicios.parking)}</h5>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className='separador'></div>

                <Description
                    texto={establecimiento.concepto} // ¿Es 'concepto' o 'detalle'? Ajusta según tu tipo
                    isExpanded={isExpanded}
                    toggleExpand={toggleExpand}
                />

                <div className='separador'></div>

                {!isNewListing && establecimiento.calificacion != null && (
                    <div className="social-proof-container">
                        <div className="rating-overview">
                            <div className="rating-number">{establecimiento.calificacion.toFixed(1)}</div>
                            <div className="rating-stats">
                                <div className="rating-stars" aria-label={`Calificación: ${establecimiento.calificacion.toFixed(1)} de 5`}>
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} size={20}
                                                fill={index < Math.round(establecimiento.calificacion!) ? "#FFB800" : "none"}
                                                color={index < Math.round(establecimiento.calificacion!) ? "#FFB800" : "#e0e0e0"} />
                                        ))}
                                </div>
                                <p className="rating-text">Calificación de Usuarios</p>
                            </div>
                        </div>
                        {/* <div className="testimonial-preview">"..."</div> */}
                    </div>
                )}

                <div className='container-principal-precio-metodo-es'>
                    <div className='container-precio-metodo-pago'>
                        <div className='container-precio'>
                            {/* Lógica de precio puede variar según el tipo */}
                            {tipoActual.includes('bar') || tipoActual.includes('cafe') || !establecimiento.servicios.delivery ? (
                                <>
                                    <h5>{establecimiento.servicios.cover != null ? formatCurrency(establecimiento.servicios.cover) : '$ 0.0'}</h5>
                                    <p>{establecimiento.servicios.cover != null ? '¡Reserva gratis!' : 'Entrada Libre'}</p>
                                </>
                            ) : (
                                <>
                                    <h5>{establecimiento.precio_promedio ? formatCurrency(establecimiento.precio_promedio) : '0.0'}</h5>
                                    <p>¡Reserva gratis!</p>
                                </>
                            )}
                            {isNewListing && <span className="promo-tag">¡De Lanzamiento!</span>}
                        </div>

                        {/* Lógica de Métodos de Pago Condicional */}
                        {(tipoActual === 'restaurante' && establecimiento.metodosdepago) && (
                            <div className='container-metodo'>
                                <h4>Aquí puedes pagar con</h4>
                                <p>{establecimiento.metodosdepago}</p>
                            </div>
                        )}
                        {(tipoActual.includes('bar') || tipoActual.includes('cafe')) && establecimiento.metodos_de_pago && (
                            <div className='container-metodo'>
                                <h4>Aquí puedes pagar con</h4>
                                <p>{establecimiento.metodos_de_pago}</p>
                            </div>
                        )}
                    </div>
                </div>

                <AuthButtons
                    isNewListing={isNewListing}
                    contactInfo={establecimiento.contacto}
                    location={establecimiento.coordenadas}
                    name={establecimiento.name}
                    tipo={'Una mesa'}
                    onLocationClick={() => { if(window.gtag){ window.gtag('event', 'ver_como_llegar', { tipo_negocio: 'bar o cafe',
                    nombre_establecimiento: establecimiento.name }); } }}
                    onContactClick={() => { if(window.gtag){ window.gtag('event', 'contacto_whatsapp', { tipo_negocio: 'bar o cafe',
                    nombre_establecimiento: establecimiento.name }); } }}
                />
            </div>
        </div>
        <div className='container-info-menus'>
                {principalesItems.length > 0 && (
                    <>
                        <div className='container-top-5'>
                            <div className='container-title'>
                                <h4>Principales</h4>
                            </div>
                            <div className='container-carrusel-recurrentes'> 
                                {principalesItems.map((item, index) => (
                                    <div className='recurrente' key={index}>
                                        <div className='oferta'>
                                            <CldImage
                                                src={item.img}
                                                alt={item.nombre}
                                                width={150}
                                                height={100}
                                                crop="fill"
                                                gravity="center"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className='descripcion-oferta'>
                                            <h5>{item.nombre}</h5>
                                            <p>{item.descripcion}</p>
                                            <h5>${item.costo.toLocaleString()}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                
                <div className='separador-menus'></div>
                <MenuSection title="¡Recomendado!" items={establecimiento.destacados} itemLayoutType="popular" />
                <div className='separador-menus'></div>
                <MenuSection title="Antojos" items={establecimiento.antojos} itemLayoutType="antojo" />
                <div className='separador-menus'></div>
                <MenuSection title="Bebidas" items={establecimiento.bebidas} itemLayoutType="bebida" />
        </div>
    </>
    );
};

export default EstablecimientoProfile; 