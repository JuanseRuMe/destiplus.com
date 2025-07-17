import axios from 'axios';
import type { AlojamientoDetailData } from '@/types/alojamiento'; // Importa tu tipo

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// Función para obtener datos del alojamiento por su slug/nombre exacto
// (Basado en el endpoint que usabas: /alojamiento/${description}/content)
export async function getAlojamientoDataBySlug(
  slugOrName: string
): Promise<AlojamientoDetailData | null> {
  // Codifica el slug/nombre para la URL
  const encodedSlug = slugOrName;
  // ¡ASEGÚRATE QUE ESTA URL SEA CORRECTA PARA TU API!
  const url = `${API_BASE_URL}/alojamiento/${encodedSlug}/content`;
  console.log(`Server Fetching Alojamiento: ${url}`);

  try {
    const response = await axios.get<AlojamientoDetailData>(url, { timeout: 10000 });

    // Verifica si hay datos y si el array 'alojamiento' tiene al menos un elemento
    if (!response.data || !response.data.alojamiento || response.data.alojamiento.length === 0) {
      console.warn(`No content found for alojamiento slug/name: ${slugOrName}`);
      return null;
    }
    // Asumimos que la API siempre devuelve un array en 'alojamiento',
    // incluso si solo hay un resultado para la página de detalle.
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for alojamiento slug/name: ${slugOrName}`, error);
    return null;
  }
}

// (Opcional, para generateStaticParams) Necesitarías una función que devuelva
// todos los pares [municipio, alojamientoSlug] válidos. Esto puede ser complejo.
// export async function fetchAllAlojamientoPaths(): Promise<{ municipio: string; alojamientoSlug: string; }[]> {
//    ... Lógica para obtener todas las combinaciones válidas ...
//    return [ { municipio: 'suesca', alojamientoSlug: 'hostal-x' }, ... ];
// }