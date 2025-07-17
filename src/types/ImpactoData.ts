// src/types/impacto.ts

// Define la interfaz para un Donante
export interface Donante {
    id: number | string;
    nombre: string;
    fecha_donacion: string; // Puedes usar Date si prefieres convertirla después
    cantidad_total: number;
    descripcion: string;
    estado: 'activa' | 'completada'; // Asumiendo estos estados
  }
  
  // Define la interfaz para un Árbol
  export interface Arbol {
    id: number | string;
    imagen_url: string;
    especie: string;
    nombre_ubicacion: string;
    region: string;
    pais: string;
    plantador: {
      foto_perfil: string;
      nombre: string;
    };
    fecha_plantacion: string; // Puedes usar Date si prefieres convertirla después
    co2_estimado: number;
    donante?: Donante | null; // Donante es opcional y puede ser null o no existir
  }
  
  // Define la interfaz principal para los datos de impacto
  export interface ImpactoData {
    cantidad_total: number;
    m2_reforestados: number;
    co2_total: number;
    arboles: Arbol[];
    // Añade aquí otras propiedades si la API las devuelve en la raíz
  }