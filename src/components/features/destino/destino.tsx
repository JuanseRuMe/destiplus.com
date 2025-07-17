'use client';

import React, { useEffect } from 'react';
import type { DestinoData } from '@/types/destino';

// Importa los sub-componentes que ya migraste (verifica nombres/rutas)
import Header from '@/components/features/destino/header';
import DescripcionCarousel from '@/components/features/destino/descripcion';
import ViewpointsSection from '@/components/features/destino/ViewpointsSection';
import PopularActivities from '@/components/features/destino/popularActivities';
import AccommodationsSection from '@/components/features/destino/AccommodationsSection';
import DiscoverSection from '@/components/features/destino/DiscoverSection';
import DestinationInfo from '@/components/features/destino/DestinationInfo';
import { CldImage } from 'next-cloudinary'; // ¡Importa CldImage!

// --- Helper de Analytics (igual que antes) ---
const Analytics = {
    // Track tiempo en página
    trackTimeSpent: (municipio: string | null | undefined, timeSpent: number) => {
        try {
            if (!window?.gtag) return;
            if (timeSpent < 0) return;
            
            window.gtag('event', 'tiempo_destino', {
                nombre_destino: municipio || 'desconocido',
                tiempo_segundos: timeSpent,
                tipo_engagement: 'tiempo_en_pagina'
            });

            if (process.env.NODE_ENV === 'development') {
                console.log('Analytics - Tiempo:', {
                    destino: municipio,
                    tiempo: timeSpent
                });
            }
        } catch (error) {
            console.error('Error Analytics - Tiempo:', error);
        }
    },
    // Track errores de carga (mantener esto es importante)
    trackError: (municipio: string | null | undefined, errorType: string | null | undefined) => {
        try {
            if (!window?.gtag) return;
            
            window.gtag('event', 'error_carga', {
                nombre_destino: municipio || 'desconocido',
                tipo_error: errorType,
                pagina: 'destino'
            });

            if (process.env.NODE_ENV === 'development') {
                console.log('Analytics - Error:', { 
                    destino: municipio,
                    error: errorType 
                });
            }
        } catch (error) {
            console.error('Error Analytics - Track Error:', error);
        }
    }
};
// --- Fin Analytics Helper ---

// --- Props del Componente ---
interface DestinoPageContentProps {
    initialContent: DestinoData; // Recibe los datos (asegurado que no es null por page.tsx)
    destinoIdFromParam: string | number; // Recibe el ID/Slug
}

// --- Componente Principal de UI ---
const DestinoPageContent: React.FC<DestinoPageContentProps> = ({ initialContent, destinoIdFromParam }) => {

    // --- Efecto para Trackear Tiempo (Mantenido) ---
    useEffect(() => {
        if (!initialContent?.municipio) return;
        const startTime = Date.now();
        return () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            Analytics.trackTimeSpent(initialContent.municipio, timeSpent);
        };
    }, [initialContent?.municipio]);

    // Extraemos los datos para pasarlos fácilmente
    // Usamos '?? []' o '?? {}' como fallback por si la API no devuelve alguna propiedad opcional
    const {
      municipio = 'Destino',
      imagenes = [],
      frase = '',
      descripcion = '',
      epocas = null,
      clima = null,
      seguridad = null,
      transporte = null,
      alojamientos = [],
      tendencias = [],
      // Asegúrate que estas propiedades existan en tu interfaz DestinoData y en la respuesta API
      // restaurantes = [],
      // bares = [],
      // actividades = [],
      // eventos = [],
    } = initialContent;

    // Recreamos objetos para pasar a componentes hijos si mantienen esa estructura de props
     const infoDesParaTips = { municipio, epocas, clima, seguridad, transporte };

    return (
        <>
            <Header destino={municipio || 'Suesca'} />

            <DescripcionCarousel
                destino={{
                    ...initialContent,
                    municipio: municipio || 'Suesca',
                    imagenes: imagenes || [],
                    frase: frase || '',
                    descripcion: descripcion || ''
                }}
                destino_id={destinoIdFromParam}
            />

            {/* Banner Ad with next/image */}
            <div className='banner-ads'>
                 <CldImage
                    src='https://res.cloudinary.com/destinoplus/image/upload/v1741362727/pptjxoehzinr0ciqxjyy.jpg'
                    alt="Publicidad Destiplus"
                    width={1200}
                    height={200}
                    priority
                 />
            </div>

            <AccommodationsSection
                alojamientos={alojamientos || []}
                destino_id={destinoIdFromParam}
                municipio={municipio || ''}
            />

            <div className='separador'></div>

            <DiscoverSection
                destino_id={destinoIdFromParam}
                pueblo={municipio || 'Suesca'}
            />

             <div className='container-tendencias-miradores'>
                <PopularActivities contenido={tendencias || []} />
                <ViewpointsSection
                    imagenes={imagenes?.map(img => ({ img: img.img })) || []}
                    destino_id={destinoIdFromParam}
                    municipio={municipio || 'Suesca'}
                />
             </div>

            <DestinationInfo
                destino={{
                    ...infoDesParaTips,
                    municipio: municipio || 'Suesca'
                }}
            />
        </>
    );
}

export default DestinoPageContent;