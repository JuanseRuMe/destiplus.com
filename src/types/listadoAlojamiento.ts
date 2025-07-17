
// Reutiliza si ya existe
interface EquipamentoAlojamiento {
    habitaciones: number;
    camas: number;
    baños: number;
}
  
 // Interfaz para cada item en la lista de alojamientos
export interface AlojamientoListItem {
    id?: number | string; // ¿La API devuelve un ID único para el alojamiento? Es útil para keys.
    name: string;
    img: string; // URL/Public ID imagen principal
    logo?: string | null; // URL/Public ID logo oferente
    calificacion?: number | null;
    equipamento: EquipamentoAlojamiento;
    precio: number;
    items: { // Objeto usado para los filtros
      [key: string]: string | number | boolean; // Asume valores simples, ajusta si es más complejo
    };
    slug?: string; // <-- IMPORTANTE: Idealmente, tu API debería devolver un slug aquí
    // ...otras propiedades que devuelva la API de lista...
}