// src/lib/api-establecimiento.ts
import axios from 'axios';
import type { EstablecimientoDetailData} from '@/types/restaurante-bar'; // O tu archivo de tipos

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para obtener DATOS DETALLADOS por TIPO y NOMBRE ---
export async function getEstablecimientoData(
  tipo: string, // ej: "restaurante", "bar"
  nombre: string // ej: "Restaurante La Casona" (decodificado)
): Promise<EstablecimientoDetailData | null> {

  // Codifica el nombre para la URL de la API
  const encodedNombre = nombre;
  // ¡ASEGÚRATE QUE ESTA URL SEA CORRECTA!
  const url = `${API_BASE_URL}/${tipo}/${encodedNombre}/content`;
  console.log(`Server Fetching Establecimiento Detail: ${url}`);

  try {
    const response = await axios.get<EstablecimientoDetailData>(url, { timeout: 10000 });
    // Añade validación específica si es necesario (ej: verificar si existe la propiedad clave)
    if (!response.data) { // O !response.data.name si name está en la raíz
      console.warn(`No content found for ${tipo}/${nombre}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${tipo}/${nombre}:`, error);
    return null;
  }
}