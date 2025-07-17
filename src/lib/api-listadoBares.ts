import axios from 'axios';
import type { BarListItem } from '@/types/ListadoBar'; // O @/types/bar

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';
const TIPO_ESTABLECIMIENTO = 'bares'; // Tipo para la API

// --- Función para obtener LISTA de Bares por ID de Destino ---
export async function fetchBarListById(destinoId: string | number): Promise<BarListItem[]> {
  const url = `${API_BASE_URL}/listados/${destinoId}/${TIPO_ESTABLECIMIENTO}`;
  console.log(`Server Fetching Bar List for Destino ID: ${url}`);
  try {
    const response = await axios.get<BarListItem[]>(url, { timeout: 8000 });
    return response.data || []; // Devuelve datos o array vacío
  } catch (error) {
    console.error(`Error fetching bar list for destino ID: ${destinoId}`, error);
    return []; // Devuelve array vacío en caso de error
  }
}