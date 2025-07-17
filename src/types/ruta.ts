export interface ComentarioItem {
    id: number;
    foto_usuario: string; 
    nombre_usuario: string; 
    calificacion: number;
    fecha_creacion: string; 
    comentario: string;
    imagen: string;
}
export interface Plantador { 
    id: number;
    nombre: string; 
    foto_perfil: string; 
    fecha: string;
}
export interface TreeCounterData { 
    totalArboles: number; 
    co2Ahorrado: number; 
    ultimosPlantadores: Plantador[]; 
}
export interface Estacion { 
    nombre: string; 
    dificultad: string; /* ... */ 
}
export interface Atajo { 
    nombre: string; 
    dificultad: string; /* ... */ 
}
export interface RutaImagen { 
    id?: string | number; 
    url: string; 
}
export interface RutaDetallado {
    id: number | string;
    nombre: string;
    img: string; // Principal
    imagenes?: RutaImagen[] | null; // Galería
    descripcion: string;
    calificacion?: number | string | null;
    tiempo?: number | string | null;
    distancia?: number | string | null;
    terreno?: string | null;
    dificultad?: string | null;
    veces_recomendada?: number | null;
    completaron_ruta?: number | null;
    estaciones?: Estacion[] | null;
    atajos?: Atajo[] | null;
    instrucciones?: Array<{ [key: string]: string }> | null; // O un tipo más específico
    municipio?: string | null; // Municipio al que pertenece la ruta
    // ... otras propiedades ...
}

// Estructura de datos combinada que recibe el componente cliente
export interface RutaProfileData {
    ruta: RutaDetallado;
    comentarios: ComentarioItem[];
    treeData: TreeCounterData | null; // Puede ser nulo si falla el fetch
}

// Para generateStaticParams
export interface BasicRutaInfo {
    slug: string;
}