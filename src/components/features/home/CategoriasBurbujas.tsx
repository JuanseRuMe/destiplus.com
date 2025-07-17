// src/components/features/home/CategoriasBurbujas.tsx
'use client';

import React from 'react';

interface CategoriasBurbujasProps {
  onDemoClick: () => void; // Recibe la función para abrir el DemoModal
}

const CategoriasBurbujas: React.FC<CategoriasBurbujasProps> = ({ onDemoClick }) => {

  const handleDemoClickInternal = () => {
    // Trackear evento si GA está configurado
    if (window && window.gtag) {
      window.gtag('event', 'demo_click', {
        event_category: 'Onboarding',
        event_label: 'Ver cómo funciona (demo rápido)',
        app_name: 'Home busqueda', // Puedes ajustar estos valores
        screen_name: 'Home',
        timestamp: new Date().toISOString(),
        interaction_type: 'click'
      });
    } else {
        console.warn("Google Analytics (gtag) no encontrado.");
    }

    // Llamar a la función del padre
    onDemoClick();
  };

  return (
    // Mantenemos tus clases originales
    <div className="categorias-burbujas-container">
      <div className="categorias-burbujas-wrapper">
        {/* Asegúrate que la clase 'categoria-burbuja' exista */}
        <button className="categoria-burbuja" onClick={handleDemoClickInternal}>
          Ver cómo funciona (demo rápido) 🌍
        </button>
        {/* Podrías añadir más burbujas aquí si las tuvieras */}
      </div>
    </div>
  );
};

export default CategoriasBurbujas;