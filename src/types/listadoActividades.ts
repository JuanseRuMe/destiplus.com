export interface ActividadListItem {
    id?: number | string; // Asume ID único si existe
    name: string;
    img: string; // URL/Public ID imagen principal
    logo?: string | null; // URL/Public ID logo oferente
    calificacion?: number | null;
    precio: number;
    items: { // Objeto usado para los filtros
      [key: string]: string | number | boolean; // Ajusta si es más complejo
    };
    // Añade slug si tu API lo devuelve, si no, lo generaremos en cliente
    slug?: string;
    // ...otras propiedades que devuelva la API de lista...
  }
  