// src/lib/api-ruta.ts
import axios from 'axios';
import type { RutaListItem, ComentarioItem } from '@/types/listadoRutas' ; // Ajusta ruta

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para obtener LISTA de Rutas por ID de Destino y Tipo ---
export async function fetchRutaListByIdAndType(
  destinoId: string | number,
  tipoRuta: string // ej: "Senderismo"
): Promise<RutaListItem[]> {
  // Endpoint que usabas, asumiendo que tipoRuta es parte de la URL
  const url = `${API_BASE_URL}/rutas/${destinoId}/${tipoRuta}/content`;
  console.log(`Server Fetching Ruta List for Destino ID ${destinoId}, Tipo ${tipoRuta}: ${url}`);
  try {
    const response = await axios.get<RutaListItem[]>(url, { timeout: 8000 });
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ruta list for destino ID ${destinoId}, Tipo ${tipoRuta}:`, error);
    return [];
  }
}

// --- Función para obtener COMENTARIOS de una Ruta específica ---
export async function fetchRutaComentarios(rutaId: string | number): Promise<ComentarioItem[]> {
    const url = `${API_BASE_URL}/ruta/comentarios/${rutaId}`;
    console.log(`Client Fetching Comentarios for Ruta ID ${rutaId}: ${url}`);
    try {
        // Esta función se llamará desde el cliente, pero la definimos aquí por organización
        const response = await axios.get<ComentarioItem[]>(url, { timeout: 5000 });
        return response.data || [];
    } catch (error) {
        console.error(`Error fetching comentarios for ruta ID ${rutaId}:`, error);
        // Podrías querer devolver un error específico aquí para manejarlo en el componente
        return []; // Devuelve array vacío por ahora
    }
}