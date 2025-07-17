// Reutiliza de otros archivos de tipos si es posible
interface EquipamentoAlojamiento {
    habitaciones: number;
    camas: number;
    baños: number;
  }
  
  // Detalles del alojamiento específico dentro del array 'alojamiento'
  export interface AlojamientoDetallado {
    name: string;
    calificacion?: number | null;
    equipamento: EquipamentoAlojamiento;
    precio: number;
    img: string; // Imagen principal
    imgs?: string[]; // Array de URLs/Public IDs para galería
    servicios?: {
      // Ajusta si la estructura es diferente
      servicios: string[];
    };
    detalle: string; // Descripción larga
    // Otras propiedades específicas del alojamiento...
  }
  
  // Detalles del oferente/proveedor
  export interface OferenteData {
    oferente: string; // Nombre del oferente
    logo?: string | null; // URL/Public ID del logo
    checkIn?: string | null;
    checkOut?: string | null;
    contacto?: string | number | null; // Número de WhatsApp u otro
    metodosDePago?: string | null;
    coordenadas?: { lat: number; lng: number } | null; // Para el mapa
    politicas?: {
      // Las claves pueden variar, usa un índice de string
      [key: string]: string | { [subKey: string]: string } | undefined | null;
      // Ejemplo específico si siempre son iguales:
      // cancelacion?: string | null;
      // normas?: string | null;
      // emergencia?: { [subKey: string]: string } | null;
    };
    // Otras props del oferente...
  }
  
  // Estructura completa de la respuesta de la API
  export interface AlojamientoDetailData extends OferenteData {
    alojamiento: AlojamientoDetallado[]; // Asume que siempre es un array, usualmente con 1 elemento para la página de detalle
    // Otras propiedades raíz que pueda devolver la API...
  }