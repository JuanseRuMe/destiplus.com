// src/components/features/destino/DescripcionCarousel.tsx
'use client'; // <-- ¡Obligatorio! Usa hooks de cliente (useState, useRef, useEffect) y manipulación del DOM

import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CldImage } from 'next-cloudinary'; // Usamos CldImage

// --- Definición de Tipos (TypeScript) ---
interface ImagenDestino {
  id: number | string; // O el tipo correcto para tu ID
  img: string;         // URL o Public ID de Cloudinary
}

interface DestinoData {
  municipio?: string; // Asumiendo que viene de aquí
  imagenes: ImagenDestino[];
  frase: string;
  descripcion: string;
}

interface DescripcionCarouselProps {
  destino: DestinoData;
  destino_id?: number | string; // Prop opcional si solo se usa para gtag
}
// --- Fin Tipos ---

const DescripcionCarousel: React.FC<DescripcionCarouselProps> = ({ destino }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Tipamos la referencia para un elemento DIV
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToImage = (index: number) => {
    // Aseguramos que la ref existe y tiene el current asignado
    if (!containerRef.current) return;

    // Usamos requestAnimationFrame para asegurar que el DOM está listo
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return; // Doble chequeo por si acaso

      const images = container.getElementsByClassName('carousel-item');
      if (!images[index]) return;

      // Aseguramos que el elemento es un HTMLElement para acceder a offsetWidth/offsetLeft
      const imageElement = images[index] as HTMLElement;

      const containerWidth = container.clientWidth;
      const imageWidth = imageElement.offsetWidth;
      const scrollPosition = imageElement.offsetLeft - (containerWidth / 2) + (imageWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    });
  };

  // useEffect para centrar la imagen cuando currentIndex cambia
  useEffect(() => {
    // Solo intentar hacer scroll si hay imágenes
    if (destino.imagenes && destino.imagenes.length > 0) {
      scrollToImage(currentIndex);
    }
    // La dependencia es correcta
  }, [currentIndex, destino.imagenes]); // Añadimos destino.imagenes por si cambia

  // Click en una imagen del carrusel
  const handleImageClick = (img: ImagenDestino, index: number) => {
    setCurrentIndex(index);
    // Verificamos que window y gtag existan antes de llamarlo
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'interaccion_carrusel', {
        nombre_destino: destino.municipio || 'desconocido',
        tipo_contenido: 'imagen',
        tipo_interaccion: 'click',
        contenido_id: img.id // Asegúrate que img.id exista y sea el correcto
      });
    } else {
      console.warn('window.gtag no está disponible.'); // Aviso si gtag no carga
    }
  };

  // Scroll con los botones de flecha
  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? Math.max(0, currentIndex - 1)
      : Math.min((destino.imagenes?.length || 1) - 1, currentIndex + 1); // Manejo si no hay imagenes
    setCurrentIndex(newIndex);
  };

  // Asegurarnos de que hay imágenes antes de intentar renderizar el carrusel
  const hasImages = destino.imagenes && destino.imagenes.length > 0;

  return (
    // Quitamos el Fragmento <> innecesario si .container-carr-des es el único elemento raíz
    // NOTA: Este componente devuelve DOS elementos hermanos (carrusel y descripción).
    // DEBE envolverse en un Fragment <>...</> o un <div> si se usa solo.
    // Asumiremos que se usa dentro de otro componente que ya tiene un wrapper.
    // Si no, DESCOMENTA el Fragment <> y </> que envolvían todo en el original.
    <>
      {/* --- Carrusel --- */}
      <div className='container-carr-des'>
        <div className="container-mas-populares-2">
          <button
            className="carousel-arrow left"
            onClick={() => scroll('left')}
            disabled={currentIndex === 0 || !hasImages} // Deshabilitar si no hay imágenes
          >
            <IoIosArrowBack size={24} />
          </button>
          <div className="container-carrusel-actividades-populares-2">
            {/* Añadimos la ref al contenedor scrollable */}
            <div className="container-carrusel-categorias-actividades-2" ref={containerRef}>
              {/* Dummy spacer inicial */}
              <div
                className="dummy-spacer"
                style={{ flex: `0 0 calc(50% - 17.5vh)` }} // Mantenemos tu cálculo de espaciador
              />
              {/* Mapeo de imágenes */}
              {hasImages && destino.imagenes.map((item, index) => (
                <div
                  key={item.id}
                  className={`carousel-item ${currentIndex === index ? 'active-img' : ''}`}
                  onClick={() => handleImageClick(item, index)}
                >
                  {/* Usamos CldImage */}
                  <CldImage
                    src={item.img} // Asume que es URL completa o Public ID
                    alt={`Imagen ${index + 1} de ${destino.municipio || 'destino'}`} // Alt descriptivo
                    width={307}  // Proporcionamos un ancho generoso para calidad
                    height={410} // Proporcionamos alto generoso (ej. ratio 4:3)
                    // El tamaño real lo controla CSS con .contenidoDestino (ej. min-width: 70vh)
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 80vw, 70vh" // Ejemplo, AJUSTA según tu CSS y breakpoints
                    crop="fill" // O 'scale', 'limit' dependiendo del efecto deseado con CSS
                    gravity="center"
                    loading="lazy" // Lazy loading por defecto, considera "eager" para las primeras si es necesario
                    className="contenidoDestino" // Clase CSS para estilizar el tamaño
                  />
                </div>
              ))}
              {/* Dummy spacer final */}
              <div
                className="dummy-spacer"
                style={{ flex: `0 0 calc(50% - 17.5vh)` }} // Mantenemos tu cálculo de espaciador
              />
            </div>
          </div>
          <button
            className="carousel-arrow right"
            onClick={() => scroll('right')}
            disabled={!hasImages || currentIndex === destino.imagenes.length - 1} // Deshabilitar si no hay imágenes
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>

        {/* --- Descripcion --- */}
        <div className='container-descri-home'>
          <div className="container-title-destino">
            <h5 className='title-destino'>{destino.frase}</h5>
          </div>
          <div className='container-descripcion-destino'>
            <p className='descripcion-destino' id="descripcion-texto">
              {destino.descripcion}
            </p>
          </div>
        </div>

      </div>
      {/* Si este componente se usa solo, necesitarías el fragmento </>. */}
      {/* Si se importa en otro que ya tiene un div padre, está bien así. */}
    </>
  )
}

export default DescripcionCarousel; // Renombrado para claridad