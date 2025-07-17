import React from 'react';
import { Filter } from 'lucide-react';
import { useEffect } from 'react';

const FiltrosTitulo = ({nombre, filtros, manejarClick, filtroSeleccionado}) => {
  useEffect(() => {
    const filterOptions = document.querySelectorAll('.filter-options');
    
    filterOptions.forEach(element => {
      if (element.scrollWidth > element.clientWidth) {
        element.classList.add('scrollable');
      } else {
        element.classList.remove('scrollable');
      }
    });
  }, [filtros]);

  return (
    <div className="filters-container">
      <div className="filters-header">
        <div className="filters-title">
          <h2>{nombre}</h2>
          <img 
            src='https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png'
            alt="Tree Suesca"
            className="filters-logo"
          />
        </div>
      </div>
      
      <div className="filters-content">
        {Object.entries(filtros).map(([key, values]) => (
          <div className="filter-group" key={key}>
            <div className="filter-category">
              <Filter size={16} className="filter-icon" />
              <h3>{key}</h3>
            </div>
            <div className="filter-options">
              {Array.from(values).map((value, index) => (
                <button
                  key={index}
                  onClick={() => manejarClick(key, value)}
                  className={`filter-button ${filtroSeleccionado === value.value ? 'selected' : ''}`}
                >
                  {value.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltrosTitulo;