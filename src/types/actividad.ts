// Detalles específicos de la actividad en sí (parece estar en un array)
export interface ActividadDetallada {
    id?: number | string; // ID si existe
    name: string;
    calificacion?: number | null;
    img: string; // Imagen principal
    imgs?: {
      // Parece que tienes un objeto imgs con una propiedad Imagenes (array de strings)
      Imagenes?: string[] | null; // Array de URLs/Public IDs para galería
    };
    itinerario: string; // Descripción larga o itinerario
    precio: number;
    dificultad?: string | null;
    duracion?: number | string | null; // Puede ser número (minutos?) o string ("2 horas")
    capacidad?: number | string | null;
    requisitosRecomendaciones?: {
        [key: string]: string | { [subKey: string]: string } | undefined | null; // Para el acordeón
    } | null;
    // Otras propiedades específicas de la actividad...
  }
  
  // Detalles del oferente/proveedor de la actividad
  export interface OferenteActividadData {
    oferente?: string | null; // Nombre del oferente
    logo?: string | null;
    horario?: { // Objeto de horario
        abren?: string | null;
        cierran?: string | null;
    } | null;
    contacto?: string | number | null; // WhatsApp u otro
    metodosDePago?: string | null;
    coordenadas?: { lat: number; lng: number } | null;
    politicas?: { // Revisa si las actividades también tienen políticas o esto es de oferente
        [key: string]: string | { [subKey: string]: string } | undefined | null;
    } | null;
     municipio?: string | null; // Añadido por si viene en la data raíz
    // Otras props del oferente...
  }
  
  // Estructura completa de la respuesta de la API
  export interface ActividadDetailData extends OferenteActividadData {
    actividad: ActividadDetallada[]; // Array, usualmente con 1 elemento
    // Otras propiedades raíz...
  }
  
  // Para la lista necesaria para generateStaticParams
  export interface BasicActividadInfo {
      id?: number | string;
      name: string;
      slug?: string; // Idealmente la API de lista devuelve el slug
  }