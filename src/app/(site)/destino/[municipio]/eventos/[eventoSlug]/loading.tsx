// app/(site)/impactoAmbiental/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    // Añadimos role="status" para accesibilidad
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner">
         {/* Spinner creado con CSS */}
      </div>
      {/* Puedes opcionalmente mantener un ícono temático */}
      {/* <LucideLeaf className="loading-icon" size={32} /> */}
      <h3 className="loading-title">Cargando evento</h3>
      <p className="loading-message">Preparando tu próxima aventura</p>
    </div>
  );
}