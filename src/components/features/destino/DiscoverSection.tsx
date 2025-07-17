'use client'; // <-- Necesario por useRouter y ReactGA/onClick

import React from 'react'; // Import React
import { useRouter } from 'next/navigation'; // Hook de navegación de Next.js
import { // Importamos los iconos necesarios
  CalendarClock,
  UtensilsCrossed,
  Coffee,
  Activity,
  ChevronRight
} from 'lucide-react';

// --- Definición de Tipos (TypeScript) ---
interface Category {
  id: number;
  title: string;
  count: string;
  icon: React.ReactNode; // Tipo para componentes React como los iconos
  iconClass: string;
  bgClass: string;
  route: string; // Ruta base de la categoría
  trackingName: string; // Nombre para GA
}

interface DiscoverSectionProps {
  destino_id: number | string; // ID del destino actual
  pueblo: string;             // Nombre del pueblo/destino actual
}
// --- Fin Tipos ---

const DiscoverSection: React.FC<DiscoverSectionProps> = ({ pueblo }) => {
  const router = useRouter(); // Hook de navegación de Next.js

  // Mantenemos los datos de las categorías como estaban
  const categories: Category[] = [ // Tipamos el array
    {
      id: 2,
      title: "Actividades",
      count: "+19 opciones",
      icon: <Activity size={24} />,
      iconClass: "icon-food", // Revisa si estas clases icon/bg son necesarias o si se estiliza el wrapper
      bgClass: "bg-icon-food",
      route: '/actividades', // Ruta base para la categoría
      trackingName: 'Activities'
    },
    {
      id: 3,
      title: "Restaurantes",
      count: "+11 lugares",
      icon: <UtensilsCrossed size={24} />,
      iconClass: "icon-food",
      bgClass: "bg-icon-food",
      route: '/restaurantes',
      trackingName: 'Restaurants'
    },
    {
      id: 4,
      title: "Bares y Cafés",
      count: "+6 lugares",
      icon: <Coffee size={24} />,
      iconClass: "icon-coffee",
      bgClass: "bg-icon-coffee",
      route: '/bares', // O '/bares-cafes' si prefieres
      trackingName: 'Bars_Cafes'
    },
    {
      id: 1,
      title: "Eventos",
      count: "+1 por suceder", // O podría venir de una API si es dinámico
      icon: <CalendarClock size={24} />,
      iconClass: "icon-sleep",
      bgClass: "bg-icon-sleep",
      route: '/eventos',
      trackingName: 'Events'
    }
  ];

  const handleCategoryClick = (route: string, trackingName: string) => {
    // --- INICIO CAMBIO GTAG ---
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'Category_Click_Destino', { // 'action' va como segundo argumento
        event_category: 'Navigation',                  // event_category va en el objeto de parámetros
        event_label: `${pueblo} - ${trackingName}`,    // event_label va en el objeto de parámetros
        value: route,
        page_path: window.location.pathname, // Ejemplo
        app_name: 'Destiplus', // Si tienes un nombre de app global
        screen_name: `Destino - ${pueblo}`, // Nombre de la pantalla actual
        timestamp: new Date().toISOString(), // Coherente con otros eventos
        interaction_type: 'click'          // Coherente con otros eventos
      });
    } else {
      console.warn("Google Analytics (gtag) no está disponible.");
    }
    // --- FIN CAMBIO GTAG ---

    // Navegar usando el router de Next.js
    // (Mantenemos la corrección de la barra inicial de la respuesta anterior)
    const path = `/destino/${encodeURIComponent(pueblo)}${route}`;
    console.log("Navigating to category list:", path);
    router.push(path);
  };

  // --- Renderizado JSX (Mantenemos estructura y clases) ---
  return (
    // Quitamos Fragment <> innecesario
    <div className="discover-section">
      <div className="overview-header">
        {/* Usamos la prop 'pueblo' dinámicamente */}
        <h2 className="overview-title">Disfruta en {pueblo}</h2>
      </div>
      <div className="discover-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.route, category.trackingName)}
          >
            <div className="category-icon-container">
              {/* Asegúrate que las clases bgClass y iconClass tengan estilos CSS asociados */}
              <div className={`icon-wrapper ${category.bgClass}`}>
                <div className={category.iconClass}>
                  {category.icon}
                </div>
              </div>
              <div className="category-text">
                <span className="category-title">{category.title}</span>
                <div className="category-count">
                  {category.count}
                </div>
              </div>
            </div>
            <div className="category-action">
              <span>Ver todos</span>
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiscoverSection;