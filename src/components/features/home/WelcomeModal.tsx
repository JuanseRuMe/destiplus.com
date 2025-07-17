// src/components/features/home/WelcomeModal.tsx
'use client'; // Necesario por useState, useEffect, localStorage, setTimeout

import React, { useState, useEffect, useCallback } from 'react';
import { CldImage } from 'next-cloudinary'; // ¡Importa CldImage!
import { X } from 'lucide-react';

interface WelcomeModalProps {
  onClose?: () => void; // onClose es opcional
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true); // Controla si se renderiza o no

  const showBanner = useCallback(() => {
    setIsVisible(true);
    const now = new Date().getTime();
    localStorage.setItem('destiplus_banner_last_shown', now.toString());

    // Ocultar automáticamente después de 10 segundos
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 10000);

    // Guardar el ID del timer para limpiarlo si se cierra manualmente
    (window as unknown as { __welcomeModalTimer?: ReturnType<typeof setTimeout> })
    .__welcomeModalTimer = autoCloseTimer;
  }, []);

  useEffect(() => {
    const checkLastShown = () => {
      try {
        const lastShown = localStorage.getItem('destiplus_banner_last_shown');
        const now = new Date().getTime();
        const COOLDOWN_PERIOD_HOURS = 0.01; // ~36 segundos para pruebas (ajusta a horas reales después)

        if (!lastShown) {
          console.log("WelcomeModal: Primera vez mostrando");
          showBanner();
          return;
        }

        const lastShownTime = parseInt(lastShown, 10);
        if (isNaN(lastShownTime)) { // Maneja valor inválido
             console.log("WelcomeModal: localStorage inválido, mostrando.");
             showBanner();
             return;
        }

        const hoursDifference = (now - lastShownTime) / (1000 * 60 * 60);
        console.log(`WelcomeModal: Horas desde última vez: ${hoursDifference}`);

        if (hoursDifference >= COOLDOWN_PERIOD_HOURS) {
          console.log("WelcomeModal: Cooldown pasado, mostrando.");
          showBanner();
        } else {
          console.log("WelcomeModal: En cooldown, no mostrar.");
          setShouldRender(false); // No renderizar si está en cooldown
        }
      } catch (error) {
        console.error("WelcomeModal: Error leyendo localStorage", error);
        showBanner(); // Mostrar en caso de error
      }
    };

    // Añade un delay para no bloquear el renderizado inicial
    const timerId = setTimeout(checkLastShown, 500);

    return () => clearTimeout(timerId); // Limpia el timeout si el componente se desmonta

  }, [showBanner]); // Se ejecuta solo una vez al montar

  const handleClose = () => {
    const w = window as unknown as { __welcomeModalTimer?: ReturnType<typeof setTimeout> };
    if (w.__welcomeModalTimer) {
      clearTimeout(w.__welcomeModalTimer);
      delete w.__welcomeModalTimer;
    }

    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false); // Desmonta después de la animación
      if (onClose) {
        onClose();
      }
    }, 400); // Duración de la animación CSS 'banner-hidden'
  };

  if (!shouldRender) {
    return null; // No renderizar nada si no se debe mostrar
  }

  return (
    // Asegúrate que las clases CSS 'banner-publicitario-vertical', 'banner-visible', 'banner-hidden' existan
    <div className={`banner-publicitario-vertical ${isVisible ? 'banner-visible' : 'banner-hidden'}`}>
      <div className="banner-overlay"></div>
      <div className="banner-container">
        <button className="banner-close" onClick={handleClose} aria-label="Cerrar publicidad">
          <X size={20} />
        </button>

        <div className="banner-content">
          {/* Usa next/image */}
          <CldImage
            src="https://res.cloudinary.com/destinoplus/image/upload/v1743744434/hxl0wluoczaqbjbb0xoo.jpg"
            alt="¡Atención! Solo hoy 2x1. Reserva y deja huella"
            className="banner-image"
            width={300} // Define un ancho apropiado para el modal
            height={500} // Define un alto apropiado para el modal
            style={{ objectFit: 'cover' }} // Para mantener el aspecto
            priority={false} // Probablemente no sea prioritaria
          />
          {/* Si necesitas un link, envuelve la imagen con <Link> de next/link */}
          {/* <Link href="/tu-oferta" passHref> */}
          {/* <Image ... /> */}
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;