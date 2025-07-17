// Detalles específicos del evento en sí (del array 'evento')
export interface EventoDetallado {
    id?: number | string;
    name: string;
    calificacion?: number | null; // ¿Tienen calificación los eventos?
    img: string; // Imagen principal
    imgs?: {
      imagenes?: string[] | null; // Galería
    };
    itinerario: string; // Descripción larga o itinerario
    precio: number;
    fecha?: string | null; // Formato 'YYYY-MM-DD' o similar
    hora?: string | null;  // Formato 'HH:MM AM/PM'
    duracion?: number | string | null; // ej: 120 (minutos) o "2 horas"
    cupos?: number | string | null; // o capacidad
    requisitos?: { // Para el acordeón
      [key: string]: string | { [subKey: string]: string } | undefined | null;
    } | null;
    // ... otras propiedades del evento
  }
  
  // Detalles del oferente/organizador del evento (de la raíz del objeto 'content')
  export interface EventoOferenteData {
    oferente?: string | null; // Nombre del organizador
    logo?: string | null;
    contacto?: string | number | null; // WhatsApp
    metodosdepago?: string | null; // ¿Aplica a eventos o solo a la entrada?
    coordenadas?: { lat: number; lng: number } | null; // Ubicación del evento
    municipio?: string | null; // Para contexto
    // ... otras propiedades del oferente/contexto
  }
  
  // Estructura completa de la respuesta de la API
  export interface EventoDetailData extends EventoOferenteData {
    evento: EventoDetallado[]; // Asume que siempre es un array con 1 elemento para la página de detalle
    // ... otras propiedades raíz si las hay
  }
  
  // Para generateStaticParams
  export interface BasicEventoInfo {
    slug: string; // O el identificador que uses (ej: name)
    // Si necesitas 'tipo' para generateStaticParams de una ruta más genérica
    // tipo?: 'evento';
  }