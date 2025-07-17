export interface RutaListItem {
    id: number | string; // ID único de la ruta
    nombre: string;
    img: string; // Imagen principal
    logo?: string | null; // ¿Las rutas tienen logo? Probablemente no.
    calificacion?: number | string | null; // Puede ser número o "0" como string
    tiempo?: number | string | null; // ej: 120 o "2 horas"
    distancia?: number | string | null; // ej: 5 o "5 km"
    terreno?: string | null;
    completaron_ruta?: number | null; // Contador
    items: { // Para filtros
      [key: string]: string | number | boolean;
    };
    slug?: string; // Si la API lo devuelve
    // ... otras propiedades ...
  }
  
  export interface ComentarioItem {
      id: number | string;
      foto_usuario?: string | null; // URL/Public ID avatar
      nombre_usuario?: string | null;
      // ... otras propiedades del comentario si las necesitas ...
  }
  
