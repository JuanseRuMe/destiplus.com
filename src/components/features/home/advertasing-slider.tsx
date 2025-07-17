'use client'; // Necesario por Swiper, useRouter y window

import React from 'react'; // React sigue siendo necesario
import { useRouter } from 'next/navigation'; // Hook de navegación de Next.js

// 1. Importa Swiper y módulos (igual que antes)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// 2. Importa los estilos CSS de Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// 3. Importa CldImage
import { CldImage } from 'next-cloudinary';

// --- Definición de Tipos ---
interface AdData {
  id: number;
  imageUrl: string; // Cloudinary Public ID o URL completa
  linkUrl: string;  // URL de destino
  alt: string;      // Texto alternativo y para Gtag
}
// -------------------------

// --- DATOS DE LA PUBLICIDAD (igual que antes) ---
const adsData: AdData[] = [ // Tipamos el array
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1746722716/dcrrr3r6zxiusrhfcans.jpg', 
    linkUrl: `/destino/Suesca/parchar/batalla`,
    alt: 'Publicidad Evento Batalla de Hamburguesas',
  },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1746721138/og753snwl7pdyndt2od8.jpg', 
    linkUrl: `/destino/Suesca/alojamiento/Caba%C3%B1a%20con%20Jacuzzi`, 
    alt: 'Publicidad Impacto Ambiental Destiplus',
  },
];


const AdSlider: React.FC = () => { // No necesita props externas por ahora
  const router = useRouter(); // Hook de navegación de Next.js

  // Handler para clic en anuncio (modificado)
  const handleAdClick = (ad: AdData) => { // Recibe el objeto 'ad' completo
    const { linkUrl, alt } = ad; // Extrae url y alt

    // --- GTAG Event Tracking (Modificado) ---
    if (typeof window !== 'undefined' && window.gtag) {
        try {
             window.gtag('event', 'ad_click', {
                event_category: 'Advertising',
                event_label: alt, // <-- USA EL ALT TEXT COMO LABEL
                ad_url: linkUrl,  // Guarda la URL clickeada
                placement: 'home_slider', // Ejemplo de dónde está el slider
                timestamp: new Date().toISOString(),
                interaction_type: 'click'
             });
        } catch (error) {
            console.warn("Error tracking GA ad_click event:", error);
        }
    } else {
         console.warn("Google Analytics (gtag) no está disponible.");
    }
    // --- FIN GTAG ---

    const path = linkUrl;
    console.log("Navegando a:", path);
    router.push(path);
  };


  return (
    <div className="ad-slider-container"> {/* Mantiene clase */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
            clickable: true,
            dynamicBullets: true,
        }}
        grabCursor={true}
        className="ad-swiper" // Mantiene clase
      >
        {adsData.map((ad, index) => (
          <SwiperSlide key={ad.id} className="ad-slide"> {/* Mantiene clase */}
            <div
              className="ad-slide-content" // Mantiene clase
              onClick={() => handleAdClick(ad)} // Llama al handler con el objeto 'ad'
              role="link"
              tabIndex={0}
              aria-label={`Publicidad: ${ad.alt}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAdClick(ad); }}
            >
              <CldImage
                src={ad.imageUrl} // Usa Public ID o URL completa
                alt={ad.alt}
                fill // Para que llene el contenedor div
                style={{ objectFit: 'cover' }} // O 'contain' según necesites
                className="ad-slide-image" // Mantiene clase (para estilos adicionales)
                loading={index === 0 ? undefined : "lazy"} // Carga normal la primera, diferida las demás
                priority={index === 0} // Prioriza la carga de la primera imagen si está visible al inicio
                // sizes="(max-width: 768px) 100vw, 50vw" // ¡IMPORTANTE! Define sizes para responsive
              />
              {/* Podrías añadir texto aquí */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdSlider;