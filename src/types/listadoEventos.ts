// Interfaz para cada item en la lista de eventos
export interface EventoListItem {
    id?: number | string; // Asume ID único si la API lo provee (útil para 'key')
    name: string;
    img: string; // URL/Public ID imagen principal
    logo?: string | null; // URL/Public ID del organizador/logo del evento
    calificacion?: number | null; // ¿Los eventos tienen calificación?
    precio: number;
    fecha?: string | null; // Fecha del evento
    items: { // Objeto usado para los filtros
      [key: string]: string | number | boolean; // Ajusta si es más complejo
    };
    // Añade slug si tu API lo devuelve y lo usarás para navegar al detalle
    // Si no, se generará en el cliente a partir del 'name' para la URL de detalle
    slug?: string;
    // ...otras propiedades que devuelva la API de lista...
  }