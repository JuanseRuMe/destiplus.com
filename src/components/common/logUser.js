import React, { useState } from 'react';
import MapComponent from '@/components/common/mapaUbicacion';


const AuthButtons = ({ isNewListing = false, contactInfo, location, name, tipo, onLocationClick, onContactClick, uniqueClassNmae = 'container-contacto-aloja'}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleWhatsAppClick = () => {
    if (contactInfo) {
        // Trackear el evento cuando realmente se hace el contacto
        onContactClick?.(); // El ?. es para que no falle si no se pasa la función
        
        const message = isNewListing 
            ? `¡Hola! vengo de Desti Plus, me interesa ser el primero en reservar: ${tipo} en ${name}`
            : `¡Hola! vengo de Desti Plus, me interesa reservar: ${tipo} en ${name}`;
        
        window.open(`https://wa.me/${contactInfo}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleMapOpen = () => {
      setIsMapOpen(true);
      onLocationClick()
  };


  return (
    <>

      <div className={uniqueClassNmae}>       
        <button 
          className="como-llegar-aloja"
          onClick={handleMapOpen}
        >
          <img src="/utils/icons8-gps-50.png" alt="GPS icon" />
          Ver ubicación
        </button>
        
        <button 
          className="contacto-aloja"
          onClick={handleWhatsAppClick}
        >
          <span>
            {isNewListing ? '¡Sé el primero en reservar!' : 'Reservar ahora'}
          </span>
          <img src="/utils/icons8-whatsapp-48.png" alt="WhatsApp icon" />
        </button>

        {isMapOpen && location && (
          <MapComponent
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            coordinates={location}
            establishmentName={name}
          />
        )}
      </div>
    </>
  );
};

export default AuthButtons;