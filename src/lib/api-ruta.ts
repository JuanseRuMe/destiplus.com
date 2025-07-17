import axios from 'axios';
// Importa los tipos necesarios
import type { RutaDetallado, ComentarioItem, TreeCounterData } from '@/types/ruta';


const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Obtener Detalles de Ruta por Slug ---
export async function getRutaDataBySlug(slugOrName: string): Promise<RutaDetallado | null> {
  const encodedIdentifier = slugOrName;
  // Endpoint original: /caracteristicas/{nombre}/content - ¡Asegúrate que es este!
  const url = `${API_BASE_URL}/caracteristicas/${encodedIdentifier}/content`;
  console.log(`Server Fetching Ruta Detail: ${url}`);
  try {
    const response = await axios.get<RutaDetallado>(url, { timeout: 10000 });
    return response.data ?? null;
  } catch (error) {
    console.error('Error al obtener datos de la ruta:', error);
    
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        console.error('Error de red: No hay conexión con el servidor');
      } else {
        console.error(`Error HTTP ${error.response.status}: ${error.response.statusText}`);
        
        // Manejar diferentes códigos de estado
        if (error.response.status === 404) {
          console.error('Ruta no encontrada:', slugOrName);
        } else if (error.response.status >= 500) {
          console.error('Error en el servidor. Intente más tarde.');
        }
      }
    }
    
    return null; // Devolvemos null para que la aplicación pueda manejarlo apropiadamente
  }
}

// --- Obtener Comentarios de Ruta por ID ---
export async function fetchRutaComentarios(rutaId: string | number): Promise<ComentarioItem[]> {
    const url = `${API_BASE_URL}/ruta/comentarios/${rutaId}`;
    console.log(`Workspaceing Comentarios for Ruta ID ${rutaId}: ${url}`);
    try {
        const response = await axios.get<ComentarioItem[]>(url, { timeout: 5000 });
        return response.data || [];
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            console.error('Error de red: No hay conexión con el servidor');
          } else {
            // Para errores 404 podemos simplemente devolver un array vacío
            if (error.response.status === 404) {
              console.log('No se encontraron comentarios para esta ruta');
              return [];
            }
            
            console.error(`Error HTTP ${error.response.status}: ${error.response.statusText}`);
          }
        }
        
        return []; // Devolvemos array vacío para evitar errores en la UI
    }
}


// --- Obtener Datos de Árboles por ID de Ruta ---
export async function fetchTreeCountData(rutaId: string | number): Promise<TreeCounterData | null> {
    const url = `${API_BASE_URL}/contador/arboles/${rutaId}`;
    console.log(`Workspaceing Tree Count Data for Ruta ID ${rutaId}: ${url}`);
    interface RawTreeCountResponse {
      total_arboles?: number;
      co2_ahorrado_kg?: number;
      ultimos_plantadores?: Array<{
        id: number;
        nombre: string;
        foto_perfil: string;
        fecha: string;
      }>;
    }
    interface RawPlanter {
      id: number;
      nombre: string;
      foto_perfil: string;
      fecha: string;
    }
    try {
        const response = await axios.get<RawTreeCountResponse>(url, { timeout: 5000 });
        if (!response.data) return null;
        // Mapea al tipo TreeCounterData
        return {
            totalArboles: response.data.total_arboles || 0,
            co2Ahorrado: response.data.co2_ahorrado_kg || 0,
            ultimosPlantadores: (response.data.ultimos_plantadores || []).map((p: RawPlanter) => ({
                id: p.id, nombre: p.nombre, foto_perfil: p.foto_perfil, fecha: p.fecha
            }))
        };
    } catch (error) {
        console.error('Error al cargar datos de árboles:', error);
        
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            console.error('Error de red: No hay conexión con el servidor');
          } else {
            console.error(`Error HTTP ${error.response.status}: ${error.response.statusText}`);
            
            // Manejar diferentes códigos de estado
            if (error.response.status === 404) {
              console.warn('No se encontraron datos de árboles para esta ruta');
            } else if (error.response.status >= 500) {
              console.error('Error en el servidor al obtener datos de árboles');
            }
          }
        }
        
        // Devolvemos null en lugar de intentar acceder a setError que está fuera del scope
        return null;
    }
}