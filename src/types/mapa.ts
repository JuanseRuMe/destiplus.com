
export interface RutaMapData {
    id: number | string;
    nombre: string;
    // Coordenadas de la ruta principal [[lng, lat], [lng, lat], ...]
    coordenadas_principales: Array<{ cordenadas: Array<{ lng: number; lat: number }> }> | null;
    // Estaciones (con coordenadas)
    estaciones: Array<{ id: number | string; nombre: string; dificultad: string; lat: number; lng: number; description?: string; img?: string; numero_estacion?: number | string; }> | null;
    // Atajos (con coordenadas si las usas para dibujar)
    atajos?: Array<{ nombre: string; dificultad: string; /* start/end coords si las usas */ }> | null;
    // Instrucciones (si las muestras en esta página)
    instrucciones?: Array<{ [key: string]: string }> | null;
    // Emergencias (si las muestras en esta página)
    emergencias?: Array<{ id: number | string; tipo: string; numero: string; }> | null;
    // Cualquier otra propiedad necesaria para el mapa...
}

// Tipos para el estado interno del cliente
export interface LocationState {
    lng: number;
    lat: number;
    accuracy?: number;
    timestamp?: number;
    altitude?: number | null;
    speed?: number | null;
}

export interface MetricsState {
    kmRecorridos: string; // Formateado como string (ej: "1.23")
    velocidadPromedio: string; // Formateado como string (ej: "4.5")
    tiempoRecorrido: string; // Formateado como string (ej: "15:30")
    porcentajeCompletado: number; // Número 0-100
}