
export interface MenuItem {
    nombre: string;
    img: string; // URL/Public ID
    descripcion?: string | null;
    costo: number;
    // otras props si existen...
  }

  export interface EstablecimientoServicios {
    reservas?: string | null;
    parking?: string | null;
    // Específicos
    delivery?: boolean | string | null; // Para restaurantes
    cover?: number | string | null;     // Para bares/cafés
    // ...otros servicios...
  }
  
  // Detalles específicos del establecimiento en sí
  export interface EstablecimientoDetallado {
    id?: number | string;
    name: string;
    calificacion?: number | null;
    img: string; // Imagen principal
    imgs?: {
      imagenes?: string[] | null; // Array de URLs/Public IDs para galería
    };
    concepto: string; // Descripción larga
    precio_promedio?: number; // O la propiedad de precio que use Restaurantes/Bares
    servicios: { // Objeto de servicios
        delivery?: boolean | string | null; // El check `!establecimiento.servicios.delivery` sugiere que existe
        cover?: number | string | null;
        reservas?: string | null; // ej: "Sí", "No", "Recomendado"
        parking?: string | null; // ej: "Sí", "No", "Limitado"
        // ...otros servicios específicos?
    };

    metodos_de_pago?: string | null; // O metodosDePago? Verifica tu API
    metodosdepago?: string | null 
    
    // Propiedades del menú
    antojos?: MenuItem[] | null;
    destacados?: MenuItem[] | null;
    bebidas?: MenuItem[] | null;
    recurrentes?: MenuItem[] | null; // La forma normalizada
    recurrente?: MenuItem[] | null;
  }
  
  // Detalles del oferente (similar a Alojamiento, ajusta si es necesario)
  export interface EstablecimientoOferenteData {
    oferente?: string | null;
    logo?: string | null;
    horario?: {
        abren?: string | null;
        cierran?: string | null;
    } | null;
    contacto?: string | number | null;
    coordenadas?: { lat: number; lng: number } | null;
    municipio?: string | null; // Municipio al que pertenece
     // politicas?: { ... } // ¿Los establecimientos tienen políticas? Añade si es necesario
    // ...otras props...
  }
  
  // Estructura completa de la respuesta API (ajusta si no es un array)
  export interface EstablecimientoDetailData extends EstablecimientoOferenteData {
    // Si la API devuelve el establecimiento principal directamente:
    // name: string;
    // calificacion?: number | null;
    // img: string;
    // ...etc (propiedades de EstablecimientoDetallado irían aquí)
    // Y las propiedades del oferente también estarían aquí
  
    // O si devuelve un array como Alojamiento (menos probable para detalle):
     establecimiento?: EstablecimientoDetallado[]; // Asumiendo un array (ajusta si es objeto directo)
  
     // Asegúrate que las propiedades de menú y servicios estén aquí si no están dentro de establecimiento[0]
     servicios?: EstablecimientoDetallado['servicios'];
     antojos?: MenuItem[] | null;
     destacados?: MenuItem[] | null;
     bebidas?: MenuItem[] | null;
     recurrentes?: MenuItem[] | null;
     metodosdepago?: string | null; // OJO: el código usa 'metodos_de_pago' y 'metodosdepago'
  }
  
  // Para la lista necesaria para generateStaticParams
  export interface BasicEstablecimientoInfo {
      tipo: string; // 'restaurante', 'bar', etc.
      nombre: string;
      // slug?: string; // Si tuvieras slugs
  }