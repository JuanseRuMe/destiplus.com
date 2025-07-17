export interface BarListItem {
    id?: number | string; // Asume ID único si existe
    name: string;
    img: string; // URL/Public ID imagen principal
    logo?: string | null; // URL/Public ID logo
    calificacion?: number | null;
    precio_promedio: number; // Propiedad específica de bares/restaurantes
    items: { // Objeto usado para los filtros
      [key: string]: string | number | boolean; // Ajusta si es más complejo
    };
    slug?: string;
  }
