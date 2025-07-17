'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Clock, Navigation2, Mountain, Share2 } from 'lucide-react';
import FiltrosTitulo from "@/components/common/titulo-filtro"; // Verifica ruta
import { CldImage } from 'next-cloudinary';
import type { RutaListItem, ComentarioItem } from '@/types/listadoRutas'; // Ajusta ruta
 
// Componente para Avatar
interface UserAvatarProps {
    imageSrc?: string | null;
    alt?: string | null;
    index: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageSrc, alt, index }) => {
    return (
        <div className="avatar" style={{ marginLeft: index > 0 ? '-8px' : '0' }}>
            <CldImage
                src={imageSrc || '/avatar-default.png'}
                alt={alt || 'Usuario'}
                width={32}
                height={32}
                style={{ objectFit: 'cover' }}
            />
        </div>
    );
};

// Componente para Grupo de Avatares (usando comentarios del server)
interface UserAvatarsProps {
    comentarios: ComentarioItem[];
}

const UserAvatars: React.FC<UserAvatarsProps> = ({ comentarios }) => {
    if (!comentarios || comentarios.length === 0) {
        return (
            <div className="avatar-group">
                <div className="avatar placeholder"></div>
                <div className="avatar placeholder" style={{ marginLeft: '-8px' }}></div>
            </div>
        );
    }

    return (
        <div className="avatar-group">
            {comentarios.slice(0, 3).map((comentario, index) => (
                <UserAvatar
                    key={comentario.id}
                    imageSrc={comentario.foto_usuario}
                    alt={comentario.nombre_usuario}
                    index={index}
                />
            ))}
        </div>
    );
};


// --- Props Interface para ListadoRutasClient ---
interface ListadoRutasClientProps {
    initialRutas: RutaListItem[];
    comentariosMap: Record<string, ComentarioItem[]>;
    municipio: string;
}
const ListadoRutasClient: React.FC<ListadoRutasClientProps> = ({ initialRutas, municipio, comentariosMap }) => {
  const router = useRouter();

  // Estado para Filtros y Lista Filtrada
  const [filtros, setFiltros] = useState<Record<string, Set<{value: string | number | boolean}>>>({});
  const [rutasFiltradas, setRutasFiltradas] = useState<RutaListItem[]>(initialRutas);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string | number | boolean | null>(null);

  // Efecto para Generar Filtros Disponibles
  useEffect(() => {
    const nuevosFiltros: Record<string, Set<{value: string | number | boolean}>> = {};
    initialRutas.forEach((ruta) => { // Variable 'ruta'
      if (ruta.items && typeof ruta.items === 'object') {
          Object.entries(ruta.items).forEach(([key, value]) => {
             if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                 if (!nuevosFiltros[key]) nuevosFiltros[key] = new Set();
                  if (!Array.from(nuevosFiltros[key]).some(item => item.value === value)) {
                      nuevosFiltros[key].add({ value });
                  }
             }
          });
      }
    });
    setFiltros(nuevosFiltros);
    setRutasFiltradas(initialRutas);
    setFiltroSeleccionado(null);
  }, [initialRutas]);

  // Manejo de Clic en Filtro
   const manejarClickFiltro = (key: string, value: {value: string | number | boolean}) => {
     const filterValue = value.value;
     setFiltroSeleccionado(filterValue);
     const filtradas = initialRutas.filter(ruta => // Variable 'ruta'
         ruta.items && ruta.items[key] === filterValue
     );
     setRutasFiltradas(filtradas);
   };

   // Manejo de Clic en Card (Navegación)
    const handleCardClick = (ruta: RutaListItem) => {
        const name = ruta.nombre;

        const path = `/destino/${encodeURIComponent(municipio)}/rutas/${encodeURIComponent(name)}`;
        console.log("Navigating to Ruta Detail:", path);
        router.push(path);
    };

    // Función texto avatares (igual)
     const getUserCountText = (ruta: RutaListItem): string => {
         // Convierte a número para comparar, maneja null/undefined
         const calificacionNum = Number(ruta.calificacion);
         const completaronNum = Number(ruta.completaron_ruta);

         if (isNaN(calificacionNum) || calificacionNum === 0) {
             return "¡Recién agregada!";
         } else if (!isNaN(completaronNum) && completaronNum > 0) {
             return `${completaronNum} personas completaron esta ruta`;
         } else {
             return "¡Visitada recientemente!";
         }
     };

  // --- Renderizado JSX ---
  return (
    <>
      {/* Helmet se maneja en page.tsx */}
       {/* Reusa clase o crea 'rutas-container' */}
      <div className="actividades-container">
        <FiltrosTitulo
          nombre={`Rutas y Miradores en ${municipio}`} // Título dinámico
          filtros={filtros}
          filtroSeleccionado={filtroSeleccionado}
          manejarClick={manejarClickFiltro}
        />

        <div className="container-seccion-lista-rutas"> {/* Tu clase para grid de rutas */}
          {rutasFiltradas.map((item) => ( // Cambiado a 'item' para consistencia con JSX interno
            <div
                key={item.id || item.nombre}
                onClick={() => handleCardClick(item)}
                className="container-item-lista-rutas" // Tu card de ruta
                role="link" tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(item)}
                aria-label={`Ver detalles de la ruta ${item.nombre}`}
            >
                <div className="route-social"> {/* Botones sociales */}
                    <button 
                        className="interaction-button" 
                        onClick={(e) => { 
                            e.stopPropagation();
                            // TODO: Implementar lógica de favoritos
                        }}
                        aria-label="Agregar a favoritos"
                    >
                        <Heart className="icon2" size={14}/>
                    </button>
                    <button 
                        className="interaction-button" 
                        onClick={(e) => { 
                            e.stopPropagation();
                            // TODO: Implementar lógica de compartir
                        }}
                        aria-label="Compartir ruta"
                    >
                        <Share2 className="icon2" size={14}/>
                    </button>
                </div>

                <CldImage // Imagen de la ruta
                    src={item.img}
                    alt={item.nombre}
                    className="container-img-ruta" // Clase para estilos de imagen
                    width={400} // Ajusta
                    height={250} // Ajusta
                    crop="fill" gravity="center" loading="lazy"
                    // sizes="..."
                />

                 {/* Rating Badge */}
                 <div className="rating-badge">
                   {/* Convertir a número para comparar */}
                    {Number(item.calificacion) === 0 || !item.calificacion ? ('Nuevo') : (`${Number(item.calificacion).toFixed(1)} ★`)}
                 </div>

                 <div className="container-info-ruta"> {/* Info debajo de la imagen */}
                    <h3 className="route-title">{item.nombre}</h3>
                    <div className="route-stats"> {/* Tiempo, Distancia, Terreno */}
                       <div className="stat-item"><Clock className="icon2" size={12}/><span>{item.tiempo} min</span></div>
                       <div className="stat-item"><Navigation2 className="icon2" size={12}/><span>{item.distancia} km</span></div>
                       <div className="stat-item"><Mountain className="icon2" size={12}/><span>{item.terreno}</span></div>
                    </div>
                    <div className="route-footer"> {/* Avatares y botón */}
                       <div className="user-count">
                            <UserAvatars 
                                comentarios={comentariosMap[String(item.id)] || []}
                            />
                            <span>{getUserCountText(item)}</span>
                       </div>
                       <button className="ver-ruta-btn">
                            Ver Ruta
                       </button>
                    </div>
                 </div>
            </div>
          ))}
        </div>
        {/* Mensaje si no hay resultados */}
        {rutasFiltradas.length === 0 && filtroSeleccionado && (
             <p className="no-results-message">No hay rutas con el filtro seleccionado.</p>
        )}
      </div>
    </>
  );
};

export default ListadoRutasClient;