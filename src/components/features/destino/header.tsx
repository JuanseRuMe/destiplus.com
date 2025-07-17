import React from 'react';
import { CldImage } from 'next-cloudinary'; // Importamos CldImage

// Definimos la interfaz para las props que espera el componente
interface HeaderProps {
  destino: string; // El nombre del destino a mostrar
}

// Usamos React.FC (Functional Component) con la interfaz de props
// Este puede ser un Server Component (no necesita 'use client')
const Header: React.FC<HeaderProps> = ({ destino }) => { // Destructuramos 'destino' de las props
  return (
    <div className="header"> 
      <div className="title-header">
        <h5>Destino <span className="mas">{destino}</span></h5>
      </div>
      <div className="back-home">
        <CldImage
          src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" 
          alt="Logo Destiplus" 
          width={55} 
          height={65}
        />
      </div>
    </div>
  );
};

export default Header;