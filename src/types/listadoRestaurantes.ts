// Interfaz para cada item en la lista de restaurantes
export interface RestauranteListItem {
    id?: number | string; // Asume ID único si existe
    name: string;
    img: string; // URL/Public ID imagen principal
    logo?: string | null; // URL/Public ID logo
    calificacion?: number | null;
    precio_promedio: number; // Propiedad específica de restaurante
    items: { // Objeto usado para los filtros
      [key: string]: string | number | boolean; // Ajusta si es más complejo
    };
    // Añade slug si tu API lo devuelve, si no, lo generaremos en cliente
    slug?: string;
    // ...otras propiedades...
  }
  
  // Puedes tener una interfaz más detallada para el perfil si es diferente
  // export interface RestauranteDetailData { ... }