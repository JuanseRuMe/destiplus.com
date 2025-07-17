// src/components/features/home/ImpactoAmbientalCard.tsx
'use client'; // Añadido por si acaso, y porque recibe una función como prop

import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

interface ImpactoAmbientalCardProps {
  onClick: () => void; // Recibe la función de navegación
}

const ImpactoAmbientalCard: React.FC<ImpactoAmbientalCardProps> = ({ onClick }) => {
  return (
    <div className="impacto-card-container"> {/* Asegúrate que este estilo exista */}
      <div
        className="impacto-card" // Asegúrate que este estilo exista
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Haz click para conocer más sobre el impacto ambiental y reservar tu árbol"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      >
        <div className="impacto-card-backdrop"></div>
        <div className="impacto-content">
            <div className="impacto-left-content">
                <div className="impacto-badge">
                <div className="impacto-badge-pulse"></div>
                <div className="impacto-icon">🌱</div>
                <span>EXCLUSIVO</span>
                </div>
                
                <h3 className="impacto-title">¡Tu Viaje Salva el Planeta!</h3>
            </div>
            
            <div className="impacto-middle-content">
                <div className="impacto-social-proof">
                <div className="tree-icon">🌳</div>
                <p>Únete al selecto 2% que viaja con propósito. Impacto real y verificable</p>
                </div>
            </div>
            
            <div className="impacto-right-content">
                <button className="impacto-button" aria-label="Ver nuestro impacto ambiental">
                Ver Impacto
                <span className="arrow-icon"><IoIosArrowForward /></span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactoAmbientalCard;