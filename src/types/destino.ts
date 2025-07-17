// --- Define aquí las interfaces que ya creamos si no las tienes centralizadas ---
interface EquipamentoAlojamiento {
    habitaciones: number;
    camas: number;
    baños: number;
  }
  interface AlojamientoIndividual {
    name: string;
    calificacion?: number | null;
    equipamento: EquipamentoAlojamiento;
    precio: number;
    img: string;
  }
  interface LugarAlojamiento {
    id: number | string;
    alojamiento?: AlojamientoIndividual[] | null;
  }
  export interface ImagenSimple {
    id: number | string; // Asume que las imágenes tienen ID
    img: string;
  }
  interface ContenidoItem { // Para PopularActivities (Tendencias)
    id: number | string;
    img: string;
  }
  // --- Fin Interfaces Requeridas por Subcomponentes ---
  
  
  // --- Interfaz Principal para los datos del Destino ---
  export interface DestinoData {
    // Propiedades que ya usabas
    municipio?: string | null;
    imagenes?: ImagenSimple[] | null;
    frase?: string | null;
    descripcion?: string | null;
    epocas?: string | null;
    clima?: string | null;
    seguridad?: string | null;
    transporte?: string | null;
    alojamientos?: LugarAlojamiento[] | null; // Array de lugares
    tendencias?: ContenidoItem[] | null; // Para PopularActivities
    // Asegúrate de incluir cualquier otra propiedad que devuelva la API
    restaurantes?: unknown[] | null; // Define una interfaz si tienes la estructura
    bares?: unknown[] | null;        // Define una interfaz si tienes la estructura
    actividades?: unknown[] | null;  // Define una interfaz si tienes la estructura
    eventos?: unknown[] | null;      // Define una interfaz si tienes la estructura
    id?: number | string; // El ID del propio destino si viene en la respuesta
    // ... otras propiedades ...
  }