'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {

  // Efecto para enfocar el campo de búsqueda al cerrar (igual que antes)
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        // Usa una clase más específica si es posible
        const searchInput = document.querySelector('.container-box-filter textarea') as HTMLTextAreaElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 300); // Delay para asegurar que el modal se haya ido
      return () => clearTimeout(timer); // Limpia el timer
    }
  }, [isOpen]);

  // No renderizar si no está abierto
  if (!isOpen) return null;

  const handleUnderstandClick = () => {
    onClose(); // Llama a la función del padre para cerrar
  };

  return (
    // Mantenemos tus clases CSS originales
    <div className="demo-modal-overlay">
      <div className="demo-modal-content">
        <button className="demo-modal-close" onClick={onClose} aria-label="Cerrar demo">
          <X size={18} />
        </button>

        <div className="demo-modal-header">
          <div className="demo-modal-logo">
            {/* Asegúrate que la clase 'demo-modal-plus' exista */}
            <h2>Desti <span className="demo-modal-plus">plus</span></h2>
          </div>
        </div>

        <div className="demo-modal-body">
          <h3 className="demo-modal-title">¡Bienvenido a Destiplus!</h3>
          <p className="demo-modal-intro">
            Aquí puedes encontrar TODO para puebliar tranquilo y comodo:
          </p>

          {/* Asegúrate que las clases 'demo-modal-categories', 'demo-category', 'demo-example' existan */}
          <div className="demo-modal-categories">
            {/* Repetir estructura para cada categoría */}
            <div className="demo-category">
              <h4>ALOJAMIENTOS</h4>
              <p>Pregunta por precio, tipo, ubicación o comodidades específicas</p>
              <span className="demo-example">{`Ej: "¿Hay cabañas en Suesca por menos de 200.000?"`}</span>
            </div>
            <div className="demo-category">
              <h4>ACTIVIDADES</h4>
              <p>Desde escalada hasta tours guiados, te decimos dónde y cuánto cuestan</p>
              <span className="demo-example">{`Ej: "¿Dónde puedo hacer escalada en Suesca?"`}</span>
            </div>
             <div className="demo-category">
               <h4>GASTRONOMÍA</h4>
               <p>Restaurantes por tipo de comida, precio o ubicación</p>
               <span className="demo-example">{`Ej: "Restaurantes con buena vista en Sesquilé"`}</span>
             </div>
             <div className="demo-category">
               <h4>VIDA NOCTURNA</h4>
               <p>Bares, discotecas y lugares para tomar</p>
               <span className="demo-example">{`Ej: "¿Dónde puedo tomarme unas cervezas en Suesca?"`}</span>
             </div>
             <div className="demo-category">
               <h4>EVENTOS</h4>
               <p>Conciertos, festivales y actividades especiales</p>
               <span className="demo-example">{`Ej: "¿Hay algún evento este fin de semana en Suesca?"`}</span>
             </div>
             <div className="demo-category">
               <h4>SPOTS SECRETOS</h4>
               <p>Lugares escondidos que solo conocen los locales</p>
               <span className="demo-example">{`Ej: "¿Hay algún mirador poco conocido en Sesquilé?"`}</span>
             </div>
             <div className="demo-category">
               <h4>PAISAJES ÚNICOS</h4>
               <p>Miradores y rutas no turísticas</p>
               <span className="demo-example">{`Ej: "Rutas de senderismo tranquilas en Suesca"`}</span>
             </div>
            {/* ... más categorías ... */}
          </div>

          <p className="demo-modal-footer">
            ¡Solo pregunta lo que necesites y te responderemos al instante!
          </p>

          {/* Asegúrate que la clase 'demo-modal-button' exista */}
          <button className="demo-modal-button" onClick={handleUnderstandClick}>
            ¡Entendido! Quiero preguntar algo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;