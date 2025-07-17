// src/lib/impactoService.ts

import axios from 'axios'; // Importa Axios
import type { ImpactoData } from '@/types/ImpactoData'; // Asumiendo que las interfaces están en el mismo archivo o importadas


const API_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1/arboles-info';

export async function fetchImpactoData(): Promise<ImpactoData> {
  try {
    // Hacemos la petición GET con Axios
    // Especificamos el tipo de dato esperado en la respuesta con <ImpactoData>
    const response = await axios.get<ImpactoData>(API_URL);

    // Axios devuelve los datos directamente en la propiedad 'data'
    // y lanza errores automáticamente para respuestas no exitosas (status >= 400)
    return response.data;

  } catch (error) {
    console.error('Error fetching environmental impact data with Axios:', error);

    // Puedes manejar errores específicos de Axios si necesitas más detalle
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Error de Axios desconocido';
      throw new Error(`Failed to fetch impact data: ${message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch impact data: ${error.message}`);
    } else {
      throw new Error('Failed to fetch impact data due to an unknown error.');
    }
  }
}