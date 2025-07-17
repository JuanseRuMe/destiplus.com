import axios from 'axios';
import type { RestauranteListItem } from '@/types/listadoRestaurantes'; // O @/types/restaurante

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para obtener LISTA de Restaurantes por ID de Destino ---
export async function fetchRestauranteListById(destinoId: string | number): Promise<RestauranteListItem[]> {
  const url = `${API_BASE_URL}/listados/${destinoId}/restaurantes`; // Endpoint específico
  console.log(`Server Fetching Restaurante List for Destino ID: ${url}`);
  try {
    const response = await axios.get<RestauranteListItem[]>(url, { timeout: 8000 });
    return response.data || []; // Devuelve datos o array vacío
  } catch (error) {
    console.error(`Error fetching restaurante list for destino ID: ${destinoId}`, error);
    return []; // Devuelve array vacío en caso de error
  }
}

