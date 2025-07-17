import axios from 'axios'
import datosDestinos from './dataBase'

const API_KEY = ''

/**
 * Optimiza los datos filtrados para reducir tokens
 * @param {Object} datosFiltrados - Datos filtrados según la consulta
 * @returns {Object} - Datos comprimidos
 */
const comprimirDatosFiltrados = (datosFiltrados) => {
  const datosComprimidos = {
    d: [] // destinos
  };
  
  // Comprimir datos de destinos
  datosFiltrados.destinos.forEach(destino => {
    const destinoComprimido = {
      i: destino.id, // id
      m: destino.municipio, // municipio
      f: destino.frase // frase
    };
    
    // Items
    if (destino.items) {
      destinoComprimido.it = {};
      
      // Alojamientos (solo mantener datos esenciales)
      if (destino.items.alojamientos) {
        destinoComprimido.it.a = destino.items.alojamientos.map(aloj => ({
          i: aloj.id,
          n: aloj.name,
          o: aloj.oferente,
          d: aloj.description ? aloj.description.substring(0, 100) : '',
          p: aloj.precio_min || (aloj.alojamiento && aloj.alojamiento[0] ? aloj.alojamiento[0].precio : null),
          sa: aloj.alojamiento ? aloj.alojamiento.map(h => ({
            n: h.name, // Nombre de la habitación
            p: h.precio
          })).slice(0, 2) : [] 
        })).slice(0, 2); // Limitar a 2 opciones
      }
      
      // Restaurantes (comprimidos)
      if (destino.items.restaurantes) {
        destinoComprimido.it.r = destino.items.restaurantes.map(rest => ({
          i: rest.id,
          n: rest.name,
          c: rest.concepto ? rest.concepto.substring(0, 100) : '',
          p: rest.precio_promedio,
          img: rest.imagen_principal || ''
        })).slice(0, 2);
      }
      
      // Actividades (muy comprimidas)
      if (destino.items.actividades) {
        destinoComprimido.it.ac = destino.items.actividades.map(actGroup => {
          // De cada grupo, solo tomamos información básica
          const subActividades = actGroup.actividad ? 
            actGroup.actividad.map(act => ({
              n: act.name,
              p: act.precio
            })).slice(0, 2) : [];
            
          return {
            i: actGroup.id,
            n: actGroup.name,
            sa: subActividades
          };
        }).slice(0, 2);
      }
      
      // Bares (ultra comprimidos)
      if (destino.items.bares) {
        destinoComprimido.it.b = destino.items.bares.map(bar => ({
          i: bar.id,
          n: bar.name,
          t: bar.items && bar.items.Tipo ? bar.items.Tipo : ''
        })).slice(0, 2);
      }
    }
    
    datosComprimidos.d.push(destinoComprimido);
  });
  
  // Rutas - solo mantener información esencial
  if (datosFiltrados.rutas && datosFiltrados.rutas.length > 0) {
    datosComprimidos.r = datosFiltrados.rutas.map(ruta => ({
      i: ruta.id,
      n: ruta.nombre,
      d: ruta.dificultad,
      i: ruta.descripcion
    })).slice(0, 2);
  }
  
  return datosComprimidos;
};

// Función para filtrar datos por consulta
const filtrarDatosPorConsulta = (query) => {
  const queryLower = query.toLowerCase();
  let datosFiltrados = { destinos: [], rutas: [] };
  
  // MEJORA 1: Detección más robusta de destinos
  const destinosMencionados = [];
  const palabrasSuesca = ['suesca', 'rocas', 'escalada', 'escapada'];
  const palabrasSesquile = ['sesquile', 'sesquilé', 'laguna', 'guatavita', 'tunjo'];
  
  if (palabrasSuesca.some(palabra => queryLower.includes(palabra))) destinosMencionados.push(1);
  if (palabrasSesquile.some(palabra => queryLower.includes(palabra))) destinosMencionados.push(2);
  
  // Si no menciona ninguno, incluir ambos para mostrar opciones
  if (destinosMencionados.length === 0) {
    destinosMencionados.push(1, 2);
  }

  // MEJORA 2: Palabras clave ampliadas para categorías
  const palabrasAlojamiento = [
    'hotel', 'hostal', 'cabaña', 'cabañas', 'dormir', 'alojamiento', 'alojamientos'
    , 'habitación', 'hospedaje', 'camping', 'glamping', 'finca', 'quedarse', 
    'pasar la noche', 'descansar', 'pernoctar', 'casa rural', 'posada', 'quinta', 'chalet'
  ];
  
  const palabrasComida = [
    'restaurante', 'comer', 'comida', 'almorzar', 'desayunar', 'cenar', 'gastronomía', 
    'platos', 'menú', 'almuerzo', 'desayuno', 'cena', 'hamburguesería', 'pizzería', 'típico', 'local'
  ];
  
  const palabrasActividad = [
    'hacer', 'actividad', 'tour', 'aventura', 'explorar', 'adrenalina', 'deporte', 
    'extremo', 'guiada', 'excursión', 'paseo', 'bicicleta', 'cabalgata', 'escalada', 
    'senderismo', 'trekking', 'caminata', 'visitar', 'experiencia', 'vuelo'
  ];
  
  const palabrasRuta = [
    'ruta', 'recorrido', 'visitar', 'spot', 'mirador', 'camino', 'sendero', 'itinerario',
    'autoguiada', 'autoguiado', 'tour', 'vista', 'paisaje', 'cascada', 'lago', 'laguna',
    'natural', 'reserva', 'parque', 'atractivo', 'punto', 'lugares', 'turístico', 'miradores', 'conocer'
  ];
  
  const palabrasBares = [
    'bar', 'café', 'cafetería', 'tomar', 'bebida', 'cerveza', 'trago', 'cóctel', 
    'coctel', 'cocktail', 'vino', 'copa', 'licor', 'pub', 'discoteca', 'fiesta', 
    'noche', 'vida nocturna', 'música en vivo', 'música', 'waffle', 'postre',
    'tragos', 'bar', 'café', 'cafetería', 'panadería', 'pastelería'
  ];
  
  // MEJORA 3: Detección de intención más específica
  const buscarAlojamiento = palabrasAlojamiento.some(word => queryLower.includes(word));
  const buscarComida = palabrasComida.some(word => queryLower.includes(word));
  const buscarActividad = palabrasActividad.some(word => queryLower.includes(word));
  const buscarRuta = palabrasRuta.some(word => queryLower.includes(word));
  const buscarBar = palabrasBares.some(word => queryLower.includes(word));
  
  // MEJORA 4: Detección de características específicas
  const buscarCaracteristicas = {
    alojamiento: {
      económico: ['económico', 'barato', 'accesible', 'bajo costo', 'presupuesto', 'ahorrar'].some(p => queryLower.includes(p)),
      lujo: ['lujo', 'exclusivo', 'premium', 'jacuzzi', 'spa', 'lujoso', 'confortable'].some(p => queryLower.includes(p)),
      familiar: ['familia', 'niños', 'familiar', 'mascotas', 'pet friendly', 'grande'].some(p => queryLower.includes(p)),
      pareja: ['pareja', 'romántico', 'romance', 'luna de miel', 'dos personas', 'íntimo'].some(p => queryLower.includes(p)),
      naturaleza: ['naturaleza', 'bosque', 'montaña', 'vista', 'paisaje', 'aire libre', 'tranquilo'].some(p => queryLower.includes(p))
    },
    tipoAlojamiento: {
      cabaña: ['cabaña', 'cabañas', 'chalet', 'bungalow'].some(p => queryLower.includes(p)),
      hotel: ['hotel', 'suite', 'habitación', 'cuarto'].some(p => queryLower.includes(p)),
      camping: ['camping', 'acampar', 'carpa'].some(p => queryLower.includes(p)),
      glamping: ['glamping', 'glam', 'camping de lujo'].some(p => queryLower.includes(p))
    },
    comida: {
      típica: ['típico', 'tradicional', 'local', 'colombiano', 'regional', 'auténtico'].some(p => queryLower.includes(p)),
      económica: ['económico', 'barato', 'accesible', 'bajo costo', 'presupuesto'].some(p => queryLower.includes(p)),
      gourmet: ['gourmet', 'chef', 'exclusivo', 'especial', 'elegante', 'fino'].some(p => queryLower.includes(p)),
      vegetariana: ['vegetariano', 'vegano', 'saludable', 'orgánico', 'plant based'].some(p => queryLower.includes(p))
    },
    actividades: {
      extremo: ['extremo', 'adrenalina', 'aventura', 'escalada', 'rapel'].some(p => queryLower.includes(p)),
      familiar: ['familia', 'niños', 'tranquilo', 'suave', 'fácil'].some(p => queryLower.includes(p)),
      naturaleza: ['naturaleza', 'senderismo', 'caminata', 'observación', 'paisaje'].some(p => queryLower.includes(p)),
      acuático: ['agua', 'río', 'laguna', 'lago', 'nadar', 'acuático'].some(p => queryLower.includes(p))
    },
    bares: {
      café: ['café', 'cafetería', 'postre', 'dulce', 'torta', 'waffle', 'crepe'].some(p => queryLower.includes(p)),
      trago: ['bar', 'cerveza', 'trago', 'cóctel', 'coctel', 'vino', 'licor'].some(p => queryLower.includes(p)),
      música: ['música', 'banda', 'en vivo', 'rock', 'fiesta', 'baile'].some(p => queryLower.includes(p))
    }
  };
  
  // Obtener destinos de la base de datos según los mencionados
  let destinosFiltrados = datosDestinos.destinos.filter(d => destinosMencionados.includes(d.id));
  
  // MEJORA 5: Filtrado más inteligente por destino
  destinosFiltrados.forEach(destino => {
    const destinoFiltrado = {
      id: destino.id,
      municipio: destino.municipio,
      departamento: destino.departamento,
      frase: destino.frase,
      items: {}
    };
    
    // SECCIÓN 1: FILTRADO DE ALOJAMIENTOS
    if (buscarAlojamiento) {
      // Inicializamos el array de alojamientos filtrados
      let todosLosAlojamientos = [];
      
      // Iteramos sobre cada alojamiento
      if (datosDestinos.alojamientos && datosDestinos.alojamientos.length > 0) {
        const alojamientosDelDestino = datosDestinos.alojamientos.filter(a => a.destino_id === destino.id);
        
        alojamientosDelDestino.forEach(alojamiento => {
          // Creamos una copia para modificarla
          const alojamientoFiltrado = {...alojamiento};
          
          // Si el alojamiento tiene habitaciones/tipos individuales
          if (alojamiento.alojamiento && alojamiento.alojamiento.length > 0) {
            // Array para almacenar solo las habitaciones que cumplen los filtros
            let habitacionesFiltradas = [...alojamiento.alojamiento];
            
            // Filtrar por tipo específico si se solicitó
            if (buscarCaracteristicas.tipoAlojamiento.cabaña) {
              habitacionesFiltradas = habitacionesFiltradas.filter(h => 
                (h.items && h.items.Tipo && h.items.Tipo.toLowerCase() === 'cabaña') ||
                (h.items && h.items.Tipo && h.items.Tipo.toLowerCase() === 'chalet') ||
                (h.name && (h.name.toLowerCase().includes('cabaña') || h.name.toLowerCase().includes('chalet'))) ||
                (h.description && (h.description.toLowerCase().includes('cabaña') || h.description.toLowerCase().includes('chalet')))
              );
            }
            
            // Filtrar por glamping
            if (buscarCaracteristicas.tipoAlojamiento.glamping) {
              habitacionesFiltradas = habitacionesFiltradas.filter(h => 
                (h.items && h.items.Tipo && h.items.Tipo.toLowerCase() === 'glamping') ||
                (h.name && h.name.toLowerCase().includes('glamping')) ||
                (h.description && h.description.toLowerCase().includes('glamping')) ||
                (h.detalle && h.detalle.toLowerCase().includes('glamping'))
              );
            }
            
            // Filtrar por características de lujo/jacuzzi
            if (buscarCaracteristicas.alojamiento.lujo || queryLower.includes('jacuzzi')) {
              habitacionesFiltradas = habitacionesFiltradas.filter(h => 
                (h.name && (h.name.toLowerCase().includes('lujo') || h.name.toLowerCase().includes('jacuzzi'))) ||
                (h.description && (h.description.toLowerCase().includes('lujo') || h.description.toLowerCase().includes('jacuzzi'))) ||
                (h.detalle && (h.detalle.toLowerCase().includes('lujo') || h.detalle.toLowerCase().includes('jacuzzi'))) ||
                (h.servicios && h.servicios.servicios && h.servicios.servicios.some(s => s.toLowerCase().includes('jacuzzi'))) ||
                (h.precio && h.precio > 300000)
              );
            }
            
            // Filtrado por características familiares
            if (buscarCaracteristicas.alojamiento.familiar) {
              habitacionesFiltradas = habitacionesFiltradas.filter(h => 
                (h.name && (h.name.toLowerCase().includes('familia') || h.name.toLowerCase().includes('familiar'))) ||
                (h.description && (h.description.toLowerCase().includes('familia') || h.description.toLowerCase().includes('familiar'))) ||
                (h.detalle && (h.detalle.toLowerCase().includes('familia') || h.detalle.toLowerCase().includes('familiar') || 
                              h.detalle.toLowerCase().includes('niño') || h.detalle.toLowerCase().includes('mascota'))) ||
                (h.servicios && h.servicios.servicios && h.servicios.servicios.some(s => s.toLowerCase().includes('petfriendly')))
              );
            }
            
            // Filtrado por características económicas
            if (buscarCaracteristicas.alojamiento.económico) {
              habitacionesFiltradas = habitacionesFiltradas.filter(h => 
                (h.precio && h.precio < 150000) ||
                (h.name && h.name.toLowerCase().includes('económic')) ||
                (h.description && h.description.toLowerCase().includes('económic')) ||
                (h.detalle && h.detalle.toLowerCase().includes('económic'))
              );
            }
            
            // Si hay habitaciones que cumplen el filtro, las asignamos
            if (habitacionesFiltradas.length > 0) {
              alojamientoFiltrado.alojamiento = habitacionesFiltradas;
              todosLosAlojamientos.push(alojamientoFiltrado);
            }
          }
        });
        
        // Si hay alojamientos que cumplen con los criterios, los asignamos
        if (todosLosAlojamientos.length > 0) {
          destinoFiltrado.items.alojamientos = todosLosAlojamientos;
        } else {
          // Si no hay resultados específicos, mostramos los 2 primeros alojamientos
          destinoFiltrado.items.alojamientos = alojamientosDelDestino.slice(0, 4);
        }
      }
    }
    
    // SECCIÓN 2: FILTRADO DE RESTAURANTES
    if (buscarComida) {
      let restaurantesFiltrados = [];
      
      // Tomamos restaurantes del destino correcto
      if (datosDestinos.restaurante && datosDestinos.restaurante.length > 0) {
        restaurantesFiltrados = datosDestinos.restaurante.filter(r => r.destino_id === destino.id);
        
        // Aplicamos filtros específicos
        if (buscarCaracteristicas.comida.típica) {
          const tempFiltrados = restaurantesFiltrados.filter(r => 
            (r.concepto && (r.concepto.toLowerCase().includes('típic') || 
                          r.concepto.toLowerCase().includes('tradicional') || 
                          r.concepto.toLowerCase().includes('colombian') ||
                          r.concepto.toLowerCase().includes('local'))) ||
            (r.items && r.items.Tipo && r.items.Tipo.toLowerCase().includes('típic'))
          );
          
          // Solo aplicamos el filtro si devuelve resultados
          if (tempFiltrados.length > 0) {
            restaurantesFiltrados = tempFiltrados;
          }
        }
        
        if (buscarCaracteristicas.comida.económica) {
          const tempFiltrados = restaurantesFiltrados.filter(r => 
            (r.precio_promedio && r.precio_promedio < 25000) ||
            (r.concepto && (r.concepto.toLowerCase().includes('económic') || 
                          r.concepto.toLowerCase().includes('accesible')))
          );
          
          if (tempFiltrados.length > 0) {
            restaurantesFiltrados = tempFiltrados;
          }
        }
        
        if (buscarCaracteristicas.comida.gourmet) {
          const tempFiltrados = restaurantesFiltrados.filter(r => 
            (r.precio_promedio && r.precio_promedio > 50000) ||
            (r.concepto && (r.concepto.toLowerCase().includes('gourmet') || 
                          r.concepto.toLowerCase().includes('chef') ||
                          r.concepto.toLowerCase().includes('exclusiv')))
          );
          
          if (tempFiltrados.length > 0) {
            restaurantesFiltrados = tempFiltrados;
          }
        }
        
        // Asignamos los restaurantes filtrados (o todos si no hubo filtros específicos)
        if (restaurantesFiltrados.length > 0) {
          destinoFiltrado.items.restaurantes = restaurantesFiltrados.slice(0, 4);
        }
      }
    }
    
    // SECCIÓN 3: FILTRADO DE ACTIVIDADES
    if (buscarActividad) {
      let actividadesFiltradas = [];
      
      // Buscamos en las actividades del destino correcto
      if (datosDestinos.actividades && datosDestinos.actividades.length > 0) {
        const actividadesDelDestino = datosDestinos.actividades.filter(a => a.destino_id === destino.id);
        
        actividadesDelDestino.forEach(actividadGrupo => {
          // Si el grupo tiene actividades individuales
          if (actividadGrupo.actividad && actividadGrupo.actividad.length > 0) {
            // Filtramos las actividades según los criterios
            let actividadesIndividualesFiltradas = [...actividadGrupo.actividad];
            
            // Filtrar por tipo extremo
            if (buscarCaracteristicas.actividades.extremo) {
              const tempFiltradas = actividadesIndividualesFiltradas.filter(act => 
                (act.items && act.items.Tipo && act.items.Tipo.toLowerCase() === 'extremo') ||
                (act.dificultad && (act.dificultad.toLowerCase() === 'alta' || act.dificultad.toLowerCase() === 'media')) ||
                (act.name && (act.name.toLowerCase().includes('escalada') || 
                            act.name.toLowerCase().includes('extremo') ||
                            act.name.toLowerCase().includes('aventura'))) ||
                (act.description && (act.description.toLowerCase().includes('extremo') || 
                                   act.description.toLowerCase().includes('adrenalina')))
              );
              
              if (tempFiltradas.length > 0) {
                actividadesIndividualesFiltradas = tempFiltradas;
              }
            }
            
            // Filtrar por actividades familiares
            if (buscarCaracteristicas.actividades.familiar) {
              const tempFiltradas = actividadesIndividualesFiltradas.filter(act => 
                (act.dificultad && act.dificultad.toLowerCase() === 'baja') ||
                (act.name && (act.name.toLowerCase().includes('familia') || 
                            act.name.toLowerCase().includes('niño'))) ||
                (act.description && (act.description.toLowerCase().includes('familia') || 
                                   act.description.toLowerCase().includes('niño')))
              );
              
              if (tempFiltradas.length > 0) {
                actividadesIndividualesFiltradas = tempFiltradas;
              }
            }
            
            // Si hay actividades que cumplen el criterio
            if (actividadesIndividualesFiltradas.length > 0) {
              const grupoFiltrado = {...actividadGrupo};
              grupoFiltrado.actividad = actividadesIndividualesFiltradas;
              actividadesFiltradas.push(grupoFiltrado);
            }
          }
        });
        
        // Asignamos las actividades filtradas
        if (actividadesFiltradas.length > 0) {
          destinoFiltrado.items.actividades = actividadesFiltradas;
        } else {
          // Si no hay actividades específicas, mostramos algunas por defecto
          destinoFiltrado.items.actividades = actividadesDelDestino.slice(0, 1);
        }
      }
    }
    
    // SECCIÓN 4: FILTRADO DE BARES Y CAFÉS
    if (buscarBar) {
      let baresFiltrados = [];
      
      if (datosDestinos.bares && datosDestinos.bares.length > 0) {
        baresFiltrados = datosDestinos.bares.filter(b => b.destino_id === destino.id);
        
        // Filtrar por cafeterías
        if (buscarCaracteristicas.bares.café) {
          const tempFiltrados = baresFiltrados.filter(b => 
            (b.items && b.items.Tipo && b.items.Tipo.toLowerCase() === 'café') ||
            (b.name && (b.name.toLowerCase().includes('café') || 
                      b.name.toLowerCase().includes('crepe') ||
                      b.name.toLowerCase().includes('waffle'))) ||
            (b.concepto && (b.concepto.toLowerCase().includes('café') || 
                          b.concepto.toLowerCase().includes('postre') ||
                          b.concepto.toLowerCase().includes('dulce')))
          );
          
          if (tempFiltrados.length > 0) {
            baresFiltrados = tempFiltrados;
          }
        }
        
        // Filtrar por bar de tragos
        if (buscarCaracteristicas.bares.trago) {
          const tempFiltrados = baresFiltrados.filter(b => 
            (b.items && b.items.Tipo && (b.items.Tipo.toLowerCase() === 'bar' || b.items.Tipo.toLowerCase() === 'pub')) ||
            (b.name && (b.name.toLowerCase().includes('bar') || 
                      b.name.toLowerCase().includes('pub'))) ||
            (b.concepto && (b.concepto.toLowerCase().includes('trago') || 
                          b.concepto.toLowerCase().includes('cerveza') ||
                          b.concepto.toLowerCase().includes('cóctel')))
          );
          
          if (tempFiltrados.length > 0) {
            baresFiltrados = tempFiltrados;
          }
        }

          // AÑADIR AQUÍ: Evitar que los restaurantes aparezcan como bares
        if (destinoFiltrado.items.restaurantes && destinoFiltrado.items.restaurantes.length > 0) {
          baresFiltrados = baresFiltrados.filter(bar => 
            !destinoFiltrado.items.restaurantes.some(rest => rest.id === bar.id)
          );
        }
        
        // Asignamos los bares filtrados
        if (baresFiltrados.length > 0) {
          destinoFiltrado.items.bares = baresFiltrados.slice(0, 5);
        }
      }
    }
    
    // SECCIÓN 5: FILTRADO DE RUTAS
    if (buscarRuta) {
      let rutasFiltradas = [];
      
      if (datosDestinos.rutas && datosDestinos.rutas.length > 0) {
        rutasFiltradas = datosDestinos.rutas.filter(r => r.destino_id === destino.id);
        
        // Filtrar por características específicas
        // Por ejemplo, por dificultad
        if (queryLower.includes('fácil') || queryLower.includes('facil')) {
          const tempFiltradas = rutasFiltradas.filter(r => 
            r.dificultad && r.dificultad.toLowerCase() === 'baja'
          );
          
          if (tempFiltradas.length > 0) {
            rutasFiltradas = tempFiltradas;
          }
        }
        
        if (queryLower.includes('difícil') || queryLower.includes('dificil')) {
          const tempFiltradas = rutasFiltradas.filter(r => 
            r.dificultad && r.dificultad.toLowerCase() === 'alta'
          );
          
          if (tempFiltradas.length > 0) {
            rutasFiltradas = tempFiltradas;
          }
        }
        
        // Filtrar por tipo de terreno
        if (queryLower.includes('montaña')) {
          const tempFiltradas = rutasFiltradas.filter(r => 
            (r.items && r.items.Tipo && r.items.Tipo.toLowerCase() === 'montaña') ||
            (r.terreno && r.terreno.toLowerCase().includes('empinado'))
          );
          
          if (tempFiltradas.length > 0) {
            rutasFiltradas = tempFiltradas;
          }
        }
        
        // Asignamos las rutas filtradas
        if (rutasFiltradas.length > 0) {
          datosFiltrados.rutas = rutasFiltradas.slice(0, 5);
        }
      }
    }
    
    // MEJORA 6: Si no hay búsqueda específica, mostrar un poco de todo
    if (!buscarAlojamiento && !buscarComida && !buscarActividad && !buscarRuta && !buscarBar) {
      // Mostrar algo de cada categoría para este destino
      
      // Alojamientos (1 de cada destino)
      if (datosDestinos.alojamientos && datosDestinos.alojamientos.length > 0) {
        const alojamientosDelDestino = datosDestinos.alojamientos.filter(a => a.destino_id === destino.id);
        if (alojamientosDelDestino.length > 0) {
          destinoFiltrado.items.alojamientos = [alojamientosDelDestino[0]];
        }
      }
      
      // Restaurantes (1 de cada destino)
      if (datosDestinos.restaurante && datosDestinos.restaurante.length > 0) {
        const restaurantesDelDestino = datosDestinos.restaurante.filter(r => r.destino_id === destino.id);
        if (restaurantesDelDestino.length > 0) {
          destinoFiltrado.items.restaurantes = [restaurantesDelDestino[0]];
        }
      }
      
      // Actividades (1 de cada destino)
      if (datosDestinos.actividades && datosDestinos.actividades.length > 0) {
        const actividadesDelDestino = datosDestinos.actividades.filter(a => a.destino_id === destino.id);
        if (actividadesDelDestino.length > 0) {
          destinoFiltrado.items.actividades = [actividadesDelDestino[0]];
        }
      }
      
      // Bares (1 de cada destino)
      if (datosDestinos.bares && datosDestinos.bares.length > 0) {
        const baresDelDestino = datosDestinos.bares.filter(b => b.destino_id === destino.id);
        if (baresDelDestino.length > 0) {
          destinoFiltrado.items.bares = [baresDelDestino[0]];
        }
      }
    }
    
    datosFiltrados.destinos.push(destinoFiltrado);
  });
  
  return datosFiltrados;
};

/**
 * Crea un window context optimizado para la API de OpenAI
 * @param {Object} datosFiltrados - Datos filtrados según la consulta
 * @returns {String} - String con el contexto formateado
 */
export const crearContextWindow = (datosFiltrados, query) => {
  const datosComprimidos = comprimirDatosFiltrados(datosFiltrados);

  const enlaces = determinarEnlaces(query, datosFiltrados);


  // Crear un contexto minimalista
    return `CONTEXTO:Asistente de Destiplus (plataforma turística). Tono: colombiano coloquial. Cobertura: Suesca y Sesquilé. Ayudas descubrir experiencias auténticas.
    
  REGLAS:
  -Solo recomienda lugares en la base de datos
  -Si preguntan por otro destino: "Pronto tendremos más destinos"
  -Sé breve y conversacional (máx 200 palabras)
  -Promueve opciones específicas por nombre: "Te encantará [nombre-lugar] donde puedes [actividad]"
  -Cuando sugieras opciones, enfatiza la relación calidad-precio: "excelente opción por [precio]"
  -INCLUYE LOS ENLACES relevantes en tu respuesta: ${JSON.stringify(enlaces)}

  DATOS:${JSON.stringify(datosComprimidos)}

  TRADUCCIÓN DE CLAVES:
  d=destinos, i=id, m=municipio, f=frase
  it=items, a=alojamientos, r=restaurantes
  ac=actividades, b=bares, sa=subactividades
  n=nombre, p=precio, c=concepto, t=tipo,`;
};

/**
 * Determina los enlaces relevantes basados en la consulta del usuario
 * @param {String} query - Consulta del usuario
 * @param {Object} datosFiltrados - Datos filtrados según la consulta
 * @returns {Object} - Objeto con los enlaces relevantes
 */
const determinarEnlaces = (query, datosFiltrados) => {
  const queryLower = query.toLowerCase();
  const enlaces = {};
  
  // Array de destinos mencionados en la consulta
  const destinos = [];
  
  // Detectar Suesca
  if (queryLower.includes('suesca') || 
      queryLower.includes('rocas') || 
      queryLower.includes('escalada')) {
    destinos.push({id: 1, nombre: 'Suesca'});
  }
  
  // Detectar Sesquilé
  if (queryLower.includes('sesquile') || 
      queryLower.includes('sesquilé') || 
      queryLower.includes('laguna') || 
      queryLower.includes('guatavita') || 
      queryLower.includes('tunjo')) {
    destinos.push({id: 2, nombre: 'Sesquilé'});
  }
  
  // Si no se mencionó ningún destino específico pero hay destinos en los datos filtrados
  if (destinos.length === 0 && datosFiltrados.destinos && datosFiltrados.destinos.length > 0) {
    datosFiltrados.destinos.forEach(destino => {
      destinos.push({id: destino.id, nombre: destino.municipio});
    });
  }
  
  // Por cada destino detectado, agregar sólo los enlaces relevantes a la consulta
  destinos.forEach(destino => {
    const destinoId = destino.id;
    const destinoNombre = destino.nombre;
    
    // Verificar qué categoría se está consultando
    const buscarAlojamiento = queryLower.includes('alojamiento') || 
                              queryLower.includes('hotel') || 
                              queryLower.includes('hostal') || 
                              queryLower.includes('cabaña') || 
                              queryLower.includes('dormir') || 
                              queryLower.includes('hospedaje') ||
                              queryLower.includes('glamping') ||
                              queryLower.includes('camping');
    
    const buscarComida = queryLower.includes('restaurante') || 
                         queryLower.includes('comer') || 
                         queryLower.includes('comida') || 
                         queryLower.includes('almorzar') || 
                         queryLower.includes('cenar') || 
                         queryLower.includes('desayunar') ||
                         queryLower.includes('gastronomía');
    
    const buscarActividad = queryLower.includes('actividad') || 
                            queryLower.includes('hacer') || 
                            queryLower.includes('tour') || 
                            queryLower.includes('aventura') || 
                            queryLower.includes('deporte') || 
                            queryLower.includes('extremo') ||
                            queryLower.includes('escalada') ||
                            queryLower.includes('senderismo') ||
                            queryLower.includes('experiencia');
    
    const buscarBar = queryLower.includes('bar') || 
                      queryLower.includes('café') || 
                      queryLower.includes('cafetería') || 
                      queryLower.includes('tomar') || 
                      queryLower.includes('cerveza') || 
                      queryLower.includes('trago') ||
                      queryLower.includes('discoteca') ||
                      queryLower.includes('fiesta') ||
                      queryLower.includes('vida nocturna');
    
    const buscarRuta = queryLower.includes('ruta') || 
                       queryLower.includes('mirador') || 
                       queryLower.includes('spot') || 
                       queryLower.includes('senderismo') || 
                       queryLower.includes('recorrido') || 
                       queryLower.includes('camino') ||
                       queryLower.includes('sendero') ||
                       queryLower.includes('paisaje') ||
                       queryLower.includes('vista');
    
    const buscarEvento = queryLower.includes('evento') || 
                        queryLower.includes('festival') || 
                        queryLower.includes('concierto') || 
                        queryLower.includes('actividad cultural') || 
                        queryLower.includes('feria');
    
    // Siempre incluir enlace a home del destino
    enlaces[`${destinoNombre}_home`] = `https://www.destiplus.com/home/destino/${destinoId}`;
    
    // Incluir enlaces específicos según lo que se está buscando
    if (buscarAlojamiento) {
      enlaces[`${destinoNombre}_alojamientos`] = `https://www.destiplus.com/alojamientos/${destinoId}`;
    }
    
    if (buscarComida) {
      enlaces[`${destinoNombre}_restaurantes`] = `https://www.destiplus.com/restaurantes/${destinoId}`;
    }
    
    if (buscarActividad) {
      enlaces[`${destinoNombre}_actividades`] = `https://www.destiplus.com/actividades/${destinoId}`;
    }
    
    if (buscarBar) {
      enlaces[`${destinoNombre}_bares_cafes`] = `https://www.destiplus.com/fiesta-amigos/${destinoId}`;
    }
    
    if (buscarRuta) {
      enlaces[`${destinoNombre}_rutas`] = `https://www.destiplus.com/rutas/Senderismo/${destinoId}`;
    }
    
    if (buscarEvento) {
      enlaces[`${destinoNombre}_eventos`] = `https://www.destiplus.com/eventos/${destinoId}`;
    }
    
    // Si no se detectó ninguna categoría específica, incluir todos los enlaces
    if (!buscarAlojamiento && !buscarComida && !buscarActividad && !buscarBar && !buscarRuta && !buscarEvento) {
      enlaces[`${destinoNombre}_alojamientos`] = `https://www.destiplus.com/alojamientos/${destinoId}`;
      enlaces[`${destinoNombre}_restaurantes`] = `https://www.destiplus.com/restaurantes/${destinoId}`;
      enlaces[`${destinoNombre}_actividades`] = `https://www.destiplus.com/actividades/${destinoId}`;
      enlaces[`${destinoNombre}_bares_cafes`] = `https://www.destiplus.com/fiesta-amigos/${destinoId}`;
      enlaces[`${destinoNombre}_rutas`] = `https://www.destiplus.com/rutas/Senderismo/${destinoId}`;
      enlaces[`${destinoNombre}_eventos`] = `https://www.destiplus.com/eventos/${destinoId}`;
    }
  });
  
  return enlaces;
};


/**
 * Realiza una llamada a la API de OpenAI
 * @param {String} query - Consulta del usuario
 * @returns {Promise} - Promesa con la respuesta de la API
 */

export const consultarOpenAI = async (query) => {
  // Paso 1: Filtrar datos según la consulta
  const datosFiltrados = filtrarDatosPorConsulta(query);

  // Debug: Ver qué se está filtrando
  console.log('---- FILTRADO DE DATOS ----');
  console.log('Consulta:', query);

  // Paso 2: Crear contexto optimizado con los datos filtrados
  // Calcular tamaño aproximado
  const context = crearContextWindow(datosFiltrados, query);
  const tamanoBytesC = new TextEncoder().encode(JSON.stringify(context)).length;
  const tamanoKBC = (tamanoBytesC / 1024).toFixed(2);
  const tokensAproxC = Math.ceil(tamanoBytesC / 4);
  
  console.log('Tamaño de datos :', tamanoKBC, 'KB');
  console.log('Tokens aproximados:', tokensAproxC);
  console.log(context)

  // Paso 3: Configurar petición a OpenAI
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: context
      },
      {
        role: "user",
        content: query
      }
    ],
    max_tokens: 300,
    temperature: 0.7, // Controla la creatividad (0 = más preciso, 1 = más creativo)
    top_p: 1
  };

  // Paso 4: Enviar a OpenAI y devolver respuesta
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers })
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log('Error al consultar a OpenIA:', error);
    throw error;
  }
}

export default {
  consultarOpenAI,
  crearContextWindow,
  filtrarDatosPorConsulta
}