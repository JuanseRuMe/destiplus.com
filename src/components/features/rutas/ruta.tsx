'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Star, Clock, Award, MessageCircle, Users, Leaf, TreePine, ChevronRight, Navigation2, Mountain, ThumbsUp, Share2 } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link'; // Asegúrate de que Link esté importado
import type { RutaProfileData, RutaDetallado, ComentarioItem, TreeCounterData, RutaImagen } from '@/types/ruta';


// --- INTERFACES PARA SUB-COMPONENTES LOCALES ---
interface ImageGalleryProps {
    imagenes: RutaImagen[] | null | undefined;
    selectedIndex: number | null;
    onImageSelect: (url: string, index: number) => void;
    establecimientoName?: string;
}
interface RouteHeaderProps {
    ruta: RutaDetallado;
}
interface DescriptionProps {
  texto: string | null | undefined;
  isExpanded: boolean;
  toggleExpand: () => void;
}
interface RatingStatsProps {
    ruta: Pick<RutaDetallado, 'calificacion' | 'veces_recomendada' | 'completaron_ruta'>;
    rutaID: string | number;
    comentarios: ComentarioItem[]; // Recibe prop
}
interface ComentariosRutaProps {
    rutaId: string | number;
    initialComentarios: ComentarioItem[]; // Recibe prop
}
interface InstructionsAccordionProps {
    instrucciones: Array<{ [key: string]: string }> | null | undefined;
}

// --- SUB-COMPONENTES LOCALES (Adaptados) ---

// 1. Galería de Miniaturas
const ImageGallery: React.FC<ImageGalleryProps> = ({ imagenes, selectedIndex, onImageSelect }) => {
    const imageList = imagenes || [];
    if (imageList.length <= 1) return null;
    return (
        <div className='container-carrusel-imgs'>
            <div className='carrusel-imgs'>
                {imageList.map((imgSrc, index) => (
                    <CldImage
                        key={index}
                        src={imgSrc.url}
                        alt={`Miniatura ${index + 1} de la rutaa`}
                        width={60} height={80} crop="fill" gravity="center"
                        onClick={() => onImageSelect(imgSrc.url, index)}
                        className={`carrusel-img ${index === selectedIndex ? 'selected' : ''}`}
                        loading="lazy" style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
};

// 2. Cabecera de Ruta
const RouteHeader: React.FC<RouteHeaderProps> = ({ ruta }) => {
    // Asume que 'ruta' tiene nombre, logo (del oferente?), fecha, hora
    return (
         <div className='container-recuadro-info-title'> {/* Contenedor original */}
            <h4>{ruta.nombre}</h4> 
            <div className='container-dificultad-distancia-timpo'>
                <div className='section'>
                    <h5><Navigation2 className="info-icon" size={18} /> Distancia</h5>
                    <p>{ruta.distancia} Km</p>
                </div>
                <div className='section'>
                    <h5><Clock className="info-icon" size={18} /> Tiempo</h5>
                    <p>{ruta.tiempo} Min</p>
                </div>
                <div className='section'>
                    <h5><Mountain className="info-icon" size={18} /> Dificultad</h5>
                    <p>{ruta.dificultad}</p>
                </div>
            </div>
        </div>
    );
};

// 3. Descripción con "Leer más"
const Description: React.FC<DescriptionProps> = ({ texto, isExpanded, toggleExpand }) => {
    const [maxTextLength, setMaxTextLength] = useState(100);
    const safeTexto = texto || '';
    const needsTruncation = maxTextLength !== Infinity && safeTexto.length > maxTextLength;
    const truncatedText = safeTexto.slice(0, maxTextLength);
    const visibleText = isExpanded ? safeTexto : `${truncatedText}${needsTruncation ? "..." : ""}`;

    useEffect(() => {
        const handleResize = () => setMaxTextLength(window.innerWidth < 768 ? 100 : Infinity);
        handleResize(); window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='container-descripcion'>
            <p className='descripcion' id="descripcion-texto">
                {visibleText}
                {needsTruncation && (<button onClick={toggleExpand} className='show-more-btn'>{isExpanded ? 'Leer menos' : 'Leer más'}</button>)}
            </p>
        </div>
    );
};

// 4. Estadísticas de Rating/Completado
const RatingStats: React.FC<RatingStatsProps> = ({ ruta, rutaID, comentarios }) => {
     const calificacionNum = Number(ruta.calificacion);
     const isNewRoute = isNaN(calificacionNum) || calificacionNum === 0;
     if (isNewRoute) return null; // No mostrar si es nueva

     return (
        <div className="sub-stats-container">
            <div className="calificacion">
            <span className="rating-number">{ruta.calificacion}</span>
            <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    size={20}
                    fill={index < Math.floor(calificacionNum) ? "#FFB800" : "none"}
                    color={index < Math.floor(calificacionNum) ? "#FFB800" : "#e0e0e0"}
                />
                ))}
            </div>
            <div className="recomendacion">
                <p>Recomendada: <strong>{ruta.veces_recomendada}</strong> veces</p>
                <p>Completada: <strong>{ruta.completaron_ruta}</strong> veces</p>
            </div>
            </div>
            <ComentariosRutaInternal rutaId={rutaID} initialComentarios={comentarios} />
        </div>
     );
};

const ComentariosRutaInternal: React.FC<ComentariosRutaProps> = ({ initialComentarios }) => {
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [reaccion, setReaccion] = useState<Record<string | number, boolean>>({});
    const toggleMostrarTodos = () => setMostrarTodos(!mostrarTodos);
    const toggleReaccion = (id: string | number) => setReaccion(prev => ({ ...prev, [id]: !prev[id] }));

    // --- CORRECCIÓN AQUÍ ---
    // Usa 'initialComentarios' y añade fallback a array vacío por seguridad
    const comentariosParaMapear = initialComentarios || [];
    const comentariosAMostrar = mostrarTodos ? comentariosParaMapear : comentariosParaMapear.slice(0, 3);

    // El useEffect para inicializar reacciones AHORA debe usar initialComentarios
    useEffect(() => {
        const reaccionesIniciales: Record<string | number, boolean> = {};
        // Asegura que initialComentarios sea un array antes de iterar
        (initialComentarios || []).forEach(comentario => {
            if (comentario && comentario.id) { // Verifica que comentario y comentario.id existan
                 reaccionesIniciales[comentario.id] = false;
            }
        });
        setReaccion(reaccionesIniciales);
    }, [initialComentarios]); // Depende de la prop

    // La condición ahora usa la prop
    if (!comentariosParaMapear || comentariosParaMapear.length === 0) {
        return (
             <div className="sin-comentarios">
                 <p>¡Sé el primero en compartir tu experiencia en esta ruta!</p>
                 <button className="boton-compartir-experiencia">Compartir mi experiencia</button>
             </div>
         );
    }

    return (
        <div className="comentarios-contenedor">
            <div className="comentarios-encabezado"><h3><MessageCircle size={20} />Experiencias de la comunidad</h3></div>
            <div className="lista-comentarios">
                {/* Mapea sobre comentariosAMostrar, que deriva de initialComentarios */}
                {comentariosAMostrar.map((comentario) => {
                    if (!comentario?.id) return null; // Guarda extra por si hay datos inválidos
                    return (
                        <div key={comentario.id} className="tarjeta-comentario">
                             <div className="comentario-cabecera">
                                 <div className="comentario-usuario">
                                    <CldImage
                                        src={comentario.foto_usuario || 'https://via.placeholder.com/40'} 
                                        alt={comentario.nombre_usuario} 
                                        className={"avatar-usuario"}
                                        width={42}
                                        height={42}
                                    />
                                     <div className="info-usuario">
                                         <h4>{comentario.nombre_usuario}</h4>
                                         <div className="estrellas-calificacion">
                                            {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={16} 
                                                fill={i < comentario.calificacion ? "#FFB800" : "none"}
                                                color={i < comentario.calificacion ? "#FFB800" : "#e0e0e0"}
                                            />
                                            ))}
                                            <span className="fecha-comentario">
                                            {new Date(comentario.fecha_creacion).toLocaleDateString()}
                                            </span>
                                        </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="comentario-contenido">
                                 <p>{comentario.comentario}</p>
                                 <div className='comentario-imagen-container'>
                                    <CldImage
                                        src={comentario.imagen} 
                                        alt={"Fotografía del usuario"}
                                        className={"comentario-imagen"}
                                        width={333}
                                        height={200}
                                    />
                                 </div>
                             </div>
                             <div className="comentario-acciones">
                                <button 
                                    className={`accion-boton ${reaccion[comentario.id] ? 'activo' : ''}`}
                                    onClick={() => toggleReaccion(comentario.id)}
                                >
                                    <ThumbsUp size={16} /> 
                                    <span>{reaccion[comentario.id] ? 'Útil' : '¿Te fue útil?'}</span>
                                </button>
                                
                                <button className="accion-boton">
                                    <Share2 size={16} /> 
                                    <span>Compartir</span>
                                </button>
                            </div>
                         </div>
                    );
                 })}
            </div>
             {/* La condición ahora usa la prop */}
             {comentariosParaMapear.length > 3 && (
                <button className="boton-ver-mas" onClick={toggleMostrarTodos}>
                    {mostrarTodos ? 'Ver menos' : `Ver todas (${comentariosParaMapear.length})`}
                </button>
            )}
        </div>
    );
};

interface TreeCounterPropsInternal {
    rutaId: string | number;
    rutaNombre: string | undefined | null; // Para el botón de WhatsApp
    initialTreeData: TreeCounterData | null; // Recibe datos o null desde page.tsx
}

const TreeCounterInternal: React.FC<TreeCounterPropsInternal> = ({ rutaId, rutaNombre, initialTreeData }) => {
    const router = useRouter(); // Para el enlace de 'Ver todos' si es interno
    const [showDetails, setShowDetails] = useState(false);
    const [animateCount, setAnimateCount] = useState(0);

    // Efecto para animar el contador (basado en los datos recibidos)
    useEffect(() => {
        const totalArboles = initialTreeData?.totalArboles || 0;
        if (totalArboles > 0) {
            const duration = 1500; // ms
            const framesPerSecond = 60;
            const totalFrames = (duration / 1000) * framesPerSecond;
            const incrementPerFrame = totalArboles / totalFrames;

            let currentCount = 0;
            let frame = 0;
            const timer = setInterval(() => {
                currentCount += incrementPerFrame;
                frame++;
                if (frame >= totalFrames || currentCount >= totalArboles) {
                    setAnimateCount(totalArboles); // Asegura el valor final exacto
                    clearInterval(timer);
                } else {
                    setAnimateCount(Math.floor(currentCount));
                }
            }, 1000 / framesPerSecond);

            return () => clearInterval(timer); // Limpia el intervalo al desmontar/cambiar
        } else {
            setAnimateCount(0); // Resetea si no hay árboles
        }
    }, [initialTreeData?.totalArboles]); // Depende del total de árboles recibido

    // Manejo si los datos no llegaron del servidor
    if (initialTreeData === null) {
        return (
            <div className="tree-counter-error"> {/* Reusa clase o crea una específica */}
                <TreePine color="#aaa" size={24} />
                <span>Info árboles no disponible</span>
            </div>
        );
    }

    // Manejo si no hay árboles plantados
    if (initialTreeData.totalArboles === 0) {
        return (
            <div className="tree-counter-container">
                <div className="tree-counter-main empty"> {/* Mantiene clases originales */}
                    <div className="tree-counter-icon">
                        <TreePine color="#aaa" size={24} />
                    </div>
                    <div className="tree-counter-info">
                        <div className="tree-counter-title">
                            <span className="tree-counter-text">Sin árboles plantados aún</span>
                        </div>
                        <div className="tree-counter-subtitle">
                            ¡Sé el primero en contribuir!
                        </div>
                    </div>
                    {/* No mostrar flecha si no hay detalles */}
                </div>
            </div>
        );
    }

    // Handler para el botón de plantar árbol (abre WhatsApp)
    const handlePlantTreeClick = () => {
        const phoneNumber = "3015081517"; // Reemplaza con tu número
        const message = `Hola, quiero plantar un árbol en la ruta: ${rutaNombre || 'esta ruta'}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        if (typeof window !== 'undefined' && window.gtag) {
             window.gtag('event', 'plantar_arbol_click', {
                 ruta_id: rutaId,
                 nombre_ruta: rutaNombre || 'Ruta sin nombre'
             });
        }
    };

    // Handler para el enlace "Ver todos" (usando Next Router)
    const handleViewAllImpact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Previene navegación del <a>
        // Asegúrate que '/impactoAmbiental' sea la ruta correcta en tu app Next.js
        router.push('/impactoAmbiental');
         // Opcional: Trackear este clic
        if (typeof window !== 'undefined' && window.gtag) {
             window.gtag('event', 'ver_impacto_total', { origen: 'tree_counter' });
        }
    };


    // --- Renderizado Principal del Contador ---
    return (
        <div className="tree-counter-container">
            {/* Contador Principal (Clickable) */}
            <div className="tree-counter-main" onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
                <div className="tree-counter-icon">
                    <TreePine color="#00cd70" size={24} />
                </div>
                <div className="tree-counter-info">
                    <div className="tree-counter-title">
                        <span className="tree-counter-number">{animateCount}</span>
                        <span className="tree-counter-text">árboles plantados</span>
                    </div>
                    <div className="tree-counter-subtitle">
                        ¡Sé parte del cambio!
                    </div>
                </div>
                <ChevronRight
                    className={`tree-counter-chevron ${showDetails ? 'rotated' : ''}`}
                    size={20}
                />
            </div>

            {/* Panel Expandible */}
            {showDetails && (
                <div className="tree-counter-details">
                    {/* Plantadores recientes */}
                    {initialTreeData.ultimosPlantadores && initialTreeData.ultimosPlantadores.length > 0 && (
                        <div className="tree-planters">
                            <h4><Users size={16} /> Últimos plantadores</h4>
                            <div className="planters-list">
                                {initialTreeData.ultimosPlantadores.map((plantador) => (
                                    <div key={plantador.id} className="planter-item">
                                        {/* Reutiliza UserAvatar */}
                                        <UserAvatar imageSrc={plantador.foto_perfil} alt={plantador.nombre} index={0}/>
                                        <div className="planter-info">
                                            <span className="planter-name">{plantador.nombre}</span>
                                            {/* Formatea la fecha */}
                                            {plantador.fecha && <span className="planter-date">{new Date(plantador.fecha).toLocaleDateString()}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Impacto Ambiental */}
                    <div className="environmental-impact">
                        <h4><Leaf size={16} /> Impacto Ambiental</h4>
                        <div className="impact-stats">
                            <div className="impact-stat">
                                <span className="impact-value">{(initialTreeData.co2Ahorrado / 1000).toFixed(2)}</span>
                                <span className="impact-label">toneladas de CO₂</span>
                            </div>
                            <div className="impact-stat">
                                <span className="impact-value">{initialTreeData.totalArboles * 2}</span>{/* Asumiendo 2m² por árbol */}
                                <span className="impact-label">m² reforestados</span>
                            </div>
                        </div>
                    </div>

                    {/* Botón CTA */}
                    <button className="plant-tree-button" onClick={handlePlantTreeClick}>
                        Plantar un árbol en esta ruta
                    </button>

                    {/* Enlace a sección completa (Convertido a <a> con handler) */}
                    <a href="/impactoAmbiental" onClick={handleViewAllImpact} className="view-all-link">
                        Ver todos los árboles plantados
                        <ChevronRight size={16} />
                    </a>
                    {/* Alternativa con <Link> de Next si prefieres:
                    <Link href="/impactoAmbiental" className="view-all-link">
                        Ver todos los árboles plantados <ChevronRight size={16} />
                    </Link>
                    */}
                </div>
            )}
        </div>
    );
};



// 7. Accordion de Instrucciones (Componente de UI)
interface InstructionsAccordionProps {
    instrucciones: Array<{ [key: string]: string }> | null | undefined;
}
const InstructionsAccordion: React.FC<InstructionsAccordionProps> = ({ instrucciones }) => {
    const [expandedSectionAcc, setExpandedSectionAcc] = useState<number | null>(null);
    const toggleSectionAcc = (index: number) => {
        setExpandedSectionAcc(current => (current === index ? null : index));
    };

    // Asume que instrucciones es un array con UN objeto dentro, como en el original
    const instructionObject = Array.isArray(instrucciones) && instrucciones.length > 0 ? instrucciones[0] : null;

    if (!instructionObject) return null;

    return (
        <div className='accordion'>
            {Object.entries(instructionObject)
                .filter(([key, value]) => key !== 'id' && value) // Filtra ID y vacíos
                .map(([key, value], index) => (
                <div key={key} className='accordion-item1'> {/* O item2 si es la clase que funciona */}
                    <button
                        className={`accordion-header ${expandedSectionAcc === index ? 'active' : ''}`}
                        onClick={() => toggleSectionAcc(index)}
                        aria-expanded={expandedSectionAcc === index}
                    >
                        {key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                        <IoIosArrowForward className={`icon ${expandedSectionAcc === index ? 'rotated' : ''}`} />
                    </button>
                    {expandedSectionAcc === index && (
                        <div className='accordion-content-aloja'> {/* Usa la clase correcta */}
                            <p>{String(value)}</p> {/* Asegura que value sea string */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


interface UserAvatarProps {
    imageSrc?: string | null;
    alt?: string | null;
    index: number;
}
const UserAvatar: React.FC<UserAvatarProps> = ({ imageSrc, alt, index }) => {
    // Usa CldImage para optimización y fallback
    return (
        <div
            className="avatar" // Tu clase CSS
            style={{ marginLeft: index > 0 ? '-8px' : '0' }} // Estilo original para superposición
            title={alt || 'Usuario'}
        >
             <CldImage
                src={imageSrc || 'URL_IMAGEN_POR_DEFECTO_AVATAR'} // Necesitas una imagen por defecto
                alt={alt || 'Avatar de usuario'}
                width={32} // Tamaño pequeño para avatar
                height={32} // Tamaño pequeño para avatar
                crop="thumb" // Ideal para avatares
                gravity="face" // Intenta centrar en cara
                className="avatar-image" // Clase para border-radius: 50% en CSS
             />
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE PERFIL DE RUTA ---
interface RutaProfileClientProps {
  initialData: RutaProfileData;
  municipio: string;
}
const RutaProfileClient: React.FC<RutaProfileClientProps> = ({ initialData, municipio }) => {
    const router = useRouter();
    const { ruta, comentarios, treeData } = initialData; // Desestructura datos
    const isNewRoute = !ruta.calificacion || Number(ruta.calificacion) === 0;
    const [backgroundImage, setBackgroundImg] = useState(ruta.img || '');
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
      ruta.imagenes && ruta.imagenes.length > 0 ? 0 : null
    );
    // Estado para descripción
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // --- ESTADOS PARA EL MODAL DE TÉRMINOS ---
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    // --- FIN ESTADOS MODAL ---

    // Efecto para actualizar imagen si cambian las props
    useEffect(() => {
    setBackgroundImg(ruta.img || '');
    setCurrentImageIndex(ruta.imagenes && ruta.imagenes.length > 0 ? 0 : null);
    }, [ruta.img, ruta.imagenes]);

     // Handlers galería
     const handleImageSelect = (imgSrc: string, index: number) => {
    setBackgroundImg(imgSrc);
    setCurrentImageIndex(index);
    };
    const handleGalleryNav = (direction: 'prev' | 'next') => {
    const imageList = ruta.imagenes;
    if (!imageList || imageList.length <= 1 || currentImageIndex === null) return;
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? imageList.length - 1 : currentImageIndex - 1;
    } else {
      newIndex = (currentImageIndex + 1) % imageList.length;
    }
    setCurrentImageIndex(newIndex);
    setBackgroundImg(imageList[newIndex].url); // Accede a la URL dentro del objeto imagen
    };

    // --- FUNCIÓN PARA ABRIR EL MODAL ---
    const handleOpenTermsModal = () => {
        console.log('Intento 1')
        setTermsAccepted(false); // Resetear la aceptación previa
        setIsTermsModalOpen(true);
    };
    // --- FIN FUNCIÓN MODAL ---

    // --- FUNCIÓN QUE SE EJECUTA DESPUÉS DE ACEPTAR TÉRMINOS ---
    const proceedToAdventure = () => {
        const startMap = ruta.nombre; // Consider using ID for consistency
        const tipoNegocio = 'rutas';

        // --- GTAG (improved) ---
        if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'iniciar_aventura_terminos_aceptados', { // Evento más específico
            event_category: 'engagement',
            event_label: ruta.nombre || 'N/A',
            ruta_nombre: ruta.nombre || 'N/A',
            ruta_id: ruta.id, // Añadir ID de ruta si es posible
            ruta_tipo: tipoNegocio,
            user_interaction: 'click_accepted_terms',
        });
        }

        // --- Navegación ---
        router.push(`/destino/${encodeURIComponent(municipio)}/mapa/${encodeURIComponent(startMap)}`);
        console.log("Términos aceptados, iniciando aventura:", startMap);
    };
    // --- FIN FUNCIÓN ---

    // Handler descripción
    const toggleExpandDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);


    if (!ruta) { return <div>Ruta no encontrada.</div>; }

    // --- SUBCOMPONENTE MODAL DE TÉRMINOS Y CONDICIONES ---
    const TermsConfirmationModal = () => {
        if (!isTermsModalOpen) return null;

        const handleAcceptAndProceed = () => {
            if (termsAccepted) {
                setIsTermsModalOpen(false);
                proceedToAdventure();
            }
        };

        return (
        <div className={`terms-modal-overlay ${isTermsModalOpen ? 'open' : ''}`}>
            <div className="terms-modal-content">
            <p>
                Acepta los Términos y Condiciones para acceder a la ruta. {' '}
                <Link href="/terminos-condiciones" target="_blank" rel="noopener noreferrer" className="terms-modal-link">
                Términos y Condiciones
                </Link>
            </p>
            <div className="terms-modal-checkbox-container">
                <input
                type="checkbox"
                id="termsAcceptCheckbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="termsAcceptCheckbox">
                He leído y acepto los Términos y Condiciones.
                </label>
            </div>
            <div className="terms-modal-actions">
                <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="terms-modal-button terms-modal-button-cancel"
                >
                Cancelar
                </button>
                <button
                type="button"
                onClick={handleAcceptAndProceed}
                disabled={!termsAccepted}
                className="terms-modal-button terms-modal-button-accept"
                >
                Aceptar e Iniciar Ruta
                </button>
            </div>
            </div>
        </div>
        );
    };
    // --- FIN SUBCOMPONENTE MODAL ---

    // --- Renderizado ---
    return (
    <>
      {/* <ScrollToTop /> */}
      <div className='container-actividades-div'> {/* O usa 'container-ruta-div' */}
        {/* Galería Principal */}
        <div className='carousel-main-container'>
            <div className='alojamiento-image-wrapper'> {/* Wrapper si es necesario */}
              <CldImage
                  className='container-img-principal'
                  src={backgroundImage} alt={ruta.nombre || 'Imagen principal de la ruta'}
                  fill priority style={{ objectFit: 'cover' }}
                  // sizes="..."
              />
            </div>
            {ruta.imagenes && ruta.imagenes.length > 1 && (
                 <>
                   <button className="carousel-arrow carousel-arrow-left" onClick={() => handleGalleryNav('prev')}><IoIosArrowBack /></button>
                   <button className="carousel-arrow carousel-arrow-right" onClick={() => handleGalleryNav('next')}><IoIosArrowForward /></button>
                 </>
             )}
        </div>

        {/* Contenedor de Info */}
        <div className='container-info'>
            <ImageGallery
                imagenes={ruta.imagenes}
                selectedIndex={currentImageIndex}
                onImageSelect={handleImageSelect}
                establecimientoName={ruta.nombre}
            />
            <RouteHeader ruta={ruta} />
            <div className='separador'></div>

             {/* --- MAPA SVG ELIMINADO --- */}
             {/* <div className='container-mapa-atajos-estaciones'></div> */}
             {/* <div className='container-leyenda-mapa-interactivo-arriba'></div> */}
             {/* <div className='separador'></div> */}

            <Description
                texto={ruta.descripcion}
                isExpanded={isDescriptionExpanded}
                toggleExpand={toggleExpandDescription}
            />
            <div className='separador'></div>

            {isNewRoute ? (
                <div className='new-route-banner'>
                    <div className='new-route-header'>
                        <Award className="award-icon" />
                        <h3>¡Nueva Ruta Descubierta!</h3>
                    </div>
                    <div className='container-pioneros-nuevos'>
                        <div className='p-del-pionero-nueva-ruta'>
                            <p>Sé el primero en explorar este emocionante sendero</p>
                        </div>
                        <div className='pioneer-badge'>
                            <Users className="users-icon" />
                            <span>¡Conviértete en pionero de esta aventura!</span>
                        </div>
                    </div>
                </div>
            ) : (
                // Si NO es nueva, renderiza el componente de estadísticas
                <RatingStats ruta={ruta} rutaID={ruta.id} comentarios={comentarios}/>
            )}
            <TreeCounterInternal rutaId={ruta.id} rutaNombre={ruta.nombre} initialTreeData={treeData} />

            <div className='container-cta-accordion-mas'>
               <div className='container-boton'>
                   <button className="adventure-button" onClick={handleOpenTermsModal}>
                       <span className="button-main-text">¡Iniciar Aventura!</span>
                       <span className="button-sub-text">{!ruta.calificacion || Number(ruta.calificacion) === 0 ? '¡Sé el primero!' : '¡Únete!'}</span>
                   </button>
               </div>
               <div className='separador'></div>
               <InstructionsAccordion instrucciones={ruta.instrucciones} />
            </div>

        </div> {/* Fin container-info */}
      </div> {/* Fin container-actividades-div */}
      <TermsConfirmationModal />
    </>
    );
};

export default RutaProfileClient; // Exporta el componente cliente principal