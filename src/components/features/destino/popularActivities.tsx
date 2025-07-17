// src/components/features/destino/PopularActivities.tsx
'use client'; // <-- Obligatorio por hooks y acceso a window

import React, { useEffect, useState } from "react";
import { CldImage } from 'next-cloudinary'; // Usamos CldImage

// --- Interfaces de Tipos ---
interface ContenidoItem {
  id: number | string; // Asumimos que cada item tiene un ID único para el 'key'
  img: string;       // URL o Public ID de Cloudinary
  // Añade otras propiedades si existen y las usas
}

interface PopularActivitiesProps {
  contenido: ContenidoItem[]; // Array de items a mostrar
}
// --- Fin Tipos ---

const PopularActivities: React.FC<PopularActivitiesProps> = ({ contenido = [] }) => { // Default a array vacío
    // Inicializamos isDesktop a null o un valor por defecto seguro (ej: false)
    // Se establecerá al valor correcto en el useEffect después del montaje
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Efecto para detectar el tamaño inicial y escuchar cambios
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        // Establece el valor inicial DESPUÉS de que el componente se monte en el cliente
        handleResize(); // Llama una vez al montar para setear el estado inicial

        window.addEventListener('resize', handleResize);
        // Limpia el listener al desmontar el componente
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Se ejecuta solo una vez al montar

    // Efecto para el intervalo del carrusel de escritorio
    useEffect(() => {
        // Solo activar el intervalo si isDesktop es true y hay contenido
        if (isDesktop && contenido.length > 0) {
            const interval = setInterval(() => {
                // Avanza de 2 en 2 para mostrar el siguiente par
                setCurrentIndex(prev => (prev + 2) % contenido.length);
            }, 3000); // Cambia cada 3 segundos

            // Limpia el intervalo al desmontar o cuando isDesktop cambie a false
            return () => clearInterval(interval);
        }
        // Dependencias: se re-ejecuta si isDesktop o la longitud del contenido cambian
    }, [isDesktop, contenido.length]);


    // --- Componentes Internos para Carruseles ---
    // Renderizado para móvil (scroll horizontal simple)
    const MobileCarousel = () => (
        <div className="container-carrusel-actividades-populares">
            {/* Este contenedor necesita CSS con overflow-x: auto; display: flex; */}
            <div className="container-carrusel-categorias-actividades">
                {contenido.map((item, index) => (
                    <CldImage
                        // Usamos item.id si existe, si no, fallback a img+index (menos ideal)
                        key={item.id ?? `${item.img}-${index}`}
                        className="contenido" // Clase para estilizar (tamaño, etc.)
                        src={item.img}
                        alt={`Actividad popular ${index + 1}`} // Alt descriptivo
                        width={300} // Ancho placeholder, AJUSTA según tu CSS/diseño
                        height={400} // Alto placeholder, AJUSTA según tu CSS/diseño
                        sizes="(max-width: 767px) 80vw, 300px" // Ejemplo, AJUSTA
                        crop="fill" // O scale
                        gravity="center"
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                    />
                ))}
            </div>
        </div>
    );

    // Renderizado para escritorio (muestra 2 imágenes que rotan)
    const DesktopCarousel = () => (
        <div className="container-carrusel-actividades-populares">
            {/* Este contenedor necesita CSS para mostrar solo 2 items */}
            <div className="container-carrusel-categorias-actividades">
                {/* Aseguramos que haya contenido antes de mapear */}
                {contenido.length > 0 && [0, 1].map(offset => {
                    // Calculamos el índice real asegurándonos de que sea válido
                    const index = (currentIndex + offset) % contenido.length;
                    const item = contenido[index];
                    // Necesitamos una key única incluso si las imágenes se repiten en el ciclo
                    const uniqueKey = `${item.id ?? item.img}-${index}`;

                    return (
                        <CldImage
                            key={uniqueKey}
                            className="contenido" // Clase para estilizar (tamaño, etc.)
                            src={item.img}
                            alt={`Actividad popular ${index + 1}`} // Alt descriptivo
                            width={400} // Ancho placeholder, AJUSTA según tu CSS/diseño
                            height={500} // Alto placeholder, AJUSTA según tu CSS/diseño
                            sizes="(min-width: 768px) 40vw, 400px" // Ejemplo, AJUSTA
                            crop="fill" // O scale
                            gravity="center"
                            // Podrías considerar 'eager' o 'priority' aquí si quieres precarga
                            loading="lazy"
                            style={{ objectFit: 'cover' }}
                        />
                    );
                })}
            </div>
        </div>
    );
    // --- Fin Componentes Internos ---


    // --- Renderizado Principal ---
    // Espera a saber si es desktop o mobile antes de renderizar el carrusel correcto
    if (isDesktop === null) {
        // Puedes mostrar un loader pequeño o simplemente null/un placeholder vacío
        // para evitar el flash incorrecto del carrusel móvil en desktop inicialmente
        return <div className="container-mas-populares"><div className="overview-header"><h2 className="overview-title">Experiencias en Tendencia</h2></div>{/* Placeholder o loader */}</div>;
    }

    return (
        <div className="container-mas-populares">
            <div className="overview-header">
                <h2 className="overview-title">Experiencias en Tendencia</h2>
            </div>
            {/* Renderiza el carrusel correspondiente basado en isDesktop */}
            {isDesktop ? <DesktopCarousel /> : <MobileCarousel />}
        </div>
    );
};

export default PopularActivities;