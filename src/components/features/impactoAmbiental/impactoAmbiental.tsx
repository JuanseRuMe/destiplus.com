// src/components/features/impactoAmbiental/ImpactoAmbientalClient.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Importa Link para la navegación interna
import type { ImpactoData, Arbol, Donante } from '@/types/ImpactoData'; // Importa las interfaces
import { CldImage } from 'next-cloudinary'; // ¡Importa CldImage!


// Definimos las props que recibirá este componente
interface ImpactoAmbientalClientProps {
  initialData: ImpactoData | null; // Datos iniciales (pueden ser null si hubo error)
  error?: string | null;           // Mensaje de error opcional
}

// Número de items a mostrar en las vistas previas
const PREVIEW_COUNT = 3;

// Usamos React.FC con las props definidas
const ImpactoAmbientalClient: React.FC<ImpactoAmbientalClientProps> = ({ initialData, error: initialError }) => {
  // Estado para el error (si se pasa como prop)
  const [error] = useState(initialError); // No necesitamos set Error aquí normalmente

  // Si hubo un error al cargar los datos en el servidor, muéstralo
  if (error) {
    return <div className="impacto-error">{error}</div>;
  }

  // Si los datos no llegaron (podría ser un caso de error no manejado o estado inicial)
  // En la práctica, si page.tsx espera los datos, esto no debería pasar a menos que initialData sea null intencionalmente.
  if (!initialData) {
    return (
      <div className="impacto-loading">
         {/* Puedes mantener un loader simple aquí o confiar en loading.tsx */}
         <div className="impacto-loader"></div>
         <p>Cargando datos...</p>
       </div>
     );
  }

  // Extraemos los datos para usarlos más fácil
  const impactoData = initialData;

  // --- Lógica para obtener donantes únicos y las vistas previas ---
  const getUniqueDonantes = (arboles: Arbol[]): Donante[] => {
    const donantes = arboles
        .filter(arbol => arbol.donante)
        .map(arbol => arbol.donante as Donante);
    return donantes.filter((donante, index, self) =>
        index === self.findIndex(d => d.id === donante.id)
    );
  };

  const allArboles = impactoData.arboles || [];
  const uniqueDonantes = getUniqueDonantes(allArboles);

  const arbolesPreview = allArboles.slice(0, PREVIEW_COUNT);
  const donantesPreview = uniqueDonantes.slice(0, PREVIEW_COUNT);


  // --- Renderizado del componente (JSX idéntico al original) ---
  return (
    <>
      <div className="header">
        <div className="title-header">
          <h5>Desti <span className="mas-home"><strong>plus</strong></span></h5>
        </div>
        <div className="back-home">
          <CldImage
            src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" // O "tree_suesca_bdaba9" si prefieres
            alt="destiplus logo"
            width={55} 
            height={65}
          />
        </div>
      </div>
      <div className="impacto-container">
        <div className="impacto-header">
          <h2>Impacto Ambiental</h2>
          <p className="impacto-subtitle">Juntos construimos un futuro más verde con cada viaje</p>
        </div>

        <div className="impacto-stats-container">
          {/* Card 1: Árboles */}
          <div className="impacto-stat-card">
            <div className="impacto-stat-icon">🌳</div>
            <div className="impacto-stat-value">{impactoData.cantidad_total ?? 0}</div>
            <div className="impacto-stat-label">Árboles Plantados</div>
          </div>
          {/* Card 2: m² Reforestados */}
          <div className="impacto-stat-card">
            <div className="impacto-stat-icon">🌱</div>
            <div className="impacto-stat-value">{impactoData.m2_reforestados ?? 0}</div>
            <div className="impacto-stat-label">m² Reforestados</div>
          </div>
          {/* Card 3: CO2 */}
          <div className="impacto-stat-card">
            <div className="impacto-stat-icon">♻️</div>
            <div className="impacto-stat-value">{impactoData.co2_total ?? 0}</div>
            <div className="impacto-stat-label">kg de CO₂ capturados</div>
          </div>
        </div>


        {/* --- Sección Resumen (antes era una pestaña) --- */}
        <div className="impacto-resumen impacto-section"> {/* Añadimos clase para margen */}
          {/* Contenido del resumen (Progreso, Equivalencias, ODS) igual que antes */}
          <div className="impacto-progress">
            <div className="impacto-progress-title"><span role="img" aria-label="meta">🎯</span> Nuestro objetivo: 1,000 árboles en 2025</div>
            <div className="impacto-progress-bar-container">
                <div
                  className="impacto-progress-bar"
                  style={{ width: `${Math.min(((impactoData.cantidad_total ?? 0) / 1000) * 100, 100)}%` }}
                ></div>
            </div>
            <div className="impacto-progress-stats">
                <span>{impactoData.cantidad_total ?? 0} plantados</span>
                <span>{Math.max(0, 1000 - (impactoData.cantidad_total ?? 0))} por plantar</span>
            </div>
          </div>
          <div className="impacto-impact-cards">
            <div className="impacto-impact-card">
              <h3><span role="img" aria-label="equivalencia">⚖️</span> Equivale a:</h3>
              {/* ... contenido equivalencias ... */}
                <div className="impacto-equivalence">
                  <div className="impacto-equivalence-icon">🚗</div>
                  <div className="impacto-equivalence-text">
                    <span className="impacto-equivalence-value">{Math.round((impactoData.co2_total ?? 0) / 0.14)}</span>
                    <span className="impacto-equivalence-label">km de recorrido en auto compensados</span>
                  </div>
                </div>
                <div className="impacto-equivalence">
                  <div className="impacto-equivalence-icon">💡</div>
                  <div className="impacto-equivalence-text">
                    <span className="impacto-equivalence-value">{Math.round((impactoData.co2_total ?? 0) / 0.004)}</span>
                    <span className="impacto-equivalence-label">horas de luz compensadas</span>
                  </div>
                </div>
            </div>
            <div className="impacto-impact-card">
              <h3><span role="img" aria-label="objetivos">🎯</span> Contribuye al ODS:</h3>
              {/* ... contenido ODS ... */}
                <div className="impacto-ods-icons">
                  <div className="impacto-ods-icon ods-13">13</div>
                  <div className="impacto-ods-icon ods-15">15</div>
                </div>
                <p>Acción por el clima y Vida de ecosistemas terrestres</p>
            </div>
          </div>
        </div>

        {/* --- Sección Comunidad/Árboles (Vista Previa) --- */}
        <div className="impacto-arboles impacto-section"> {/* Añadimos clase para margen */}
          <h3><span role="img" aria-label="árbol">🌳</span> Nuestra Comunidad</h3>
          {arbolesPreview.length > 0 ? (
            <>
              <div className="impacto-arboles-list">
                {arbolesPreview.map((arbol) => (
                  // Card del árbol (igual que antes, con CldImage)
                  <div key={arbol.id} className="impacto-arbol-card">
                    <div className="impacto-arbol-image">
                        <CldImage
                            src={arbol.imagen_url} // Idealmente debería ser el Public ID
                            alt="Árbol plantado"
                            crop="fill"
                            gravity="center"
                            width={360} // Ajusta si es necesario basado en tu CSS grid/flex
                            height={200} // Ajusta si es necesario
                            loading="lazy" // Dejamos lazy por defecto para previews
                        />
                        <div className="impacto-arbol-tag">{arbol.especie}</div>
                    </div>
                    <div className="impacto-arbol-content">
                        <div className="impacto-arbol-location">
                            <strong>{arbol.nombre_ubicacion}</strong>
                            <span>{arbol.region}, {arbol.pais}</span>
                        </div>
                        <div className="impacto-arbol-planter">
                            <CldImage
                                src={arbol.plantador.foto_perfil} // Idealmente Public ID
                                alt={arbol.plantador.nombre}
                                crop="fill" // O 'thumb' para avatares
                                gravity="face" // Mejor para caras
                                width={24}
                                height={24}
                                className="impacto-planter-avatar" // Añadir clase para border-radius si CldImage no lo hace
                            />
                            <span>Plantado por {arbol.plantador.nombre}</span>
                        </div>
                        <div className="impacto-arbol-date">
                            <span>Fecha: {new Date(arbol.fecha_plantacion).toLocaleDateString()}</span>
                        </div>
                        <div className="impacto-arbol-co2">
                            <span>{arbol.co2_estimado} kg de CO₂ capturados</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Botón Ver Todos (si hay más árboles que los mostrados) */}
              {allArboles.length > PREVIEW_COUNT && (
                <div className="impacto-ver-todos-container">
                  <Link href="/impacto/comunidad" className="impacto-ver-todos-btn">
                    Ver Todos los Árboles ({allArboles.length})
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="impacto-no-data">
              <p>Aún no hay árboles registrados.</p>
              {/* Considera qué botón poner aquí, quizás el CTA general */}
            </div>
          )}
        </div>

        {/* --- Sección Donantes (Vista Previa) --- */}
        <div className="impacto-donantes impacto-section"> {/* Añadimos clase para margen */}
          <h3><span role="img" aria-label="donante">💚</span> Ultimos Donantes</h3>
          {donantesPreview.length > 0 ? (
            <>
              <div className="impacto-donantes-list">
                {donantesPreview.map(donante => (
                  // Card de donante (igual que antes)
                  <div key={donante.id} className="impacto-donante-card">
                    <div className="impacto-donante-header">
                        <h4>{donante.nombre}</h4>
                        <span className="impacto-donante-date">
                            {new Date(donante.fecha_donacion).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="impacto-donante-info">
                        <div className="impacto-donante-amount">
                            <strong>{donante.cantidad_total}</strong>
                            <span>árboles donados</span>
                        </div>
                        <p className="impacto-donante-description">{donante.descripcion}</p>
                    </div>
                    <div className="impacto-donante-badge">
                        {donante.estado === 'activa' ? 'Activa' : 'Completada'}
                    </div>
                  </div>
                ))}
              </div>
              {/* Botón Ver Todos (si hay más donantes que los mostrados) */}
              {uniqueDonantes.length > PREVIEW_COUNT && (
                <div className="impacto-ver-todos-container">
                    <Link href="/impacto/donantes" className="impacto-ver-todos-btn">
                      Ver Todos los Donantes ({uniqueDonantes.length})
                    </Link>
                </div>
              )}
            </>
          ) : (
            <div className="impacto-no-data">
              <p>No hay donantes registrados aún.</p>
              {/* Considera qué botón poner aquí */}
            </div>
          )}
        </div>

        {/* Sección CTA (idéntica) */}
        <div className="impacto-cta">
          <h3>¿Quieres contribuir al planeta?</h3>
          <div className="impacto-cta-buttons">
            <div className="impacto-cta-option">
              <h4>Viaje con Propósito</h4>
              <button
                className="impacto-cta-button"
                onClick={() => window.open('https://wa.me/573227879811?text=Hola,%20quiero%20reservar%20mi%20viaje%20y%20aportar%20al%20planeta', '_blank')}
              >
                ¡RESERVA Y SIEMBRA!
              </button>
            </div>
            <div className="impacto-cta-option">
              <h4>Siembra Directa</h4>
              <button
                className="impacto-cta-button whatsapp"
                onClick={() => window.open('https://wa.me/573227879811?text=Hola,%20quiero%20dejar%20mi%20huella%20verde%20en%20Suesca', '_blank')}
              >
                  {/* Asumiendo que tienes FontAwesome o similar para este icono */}
                <i className="fab fa-whatsapp"></i> ¡SIEMBRA YA!
              </button>
            </div>
          </div>
          <p className="impacto-cta-note">Cada árbol cuenta para un planeta más verde</p>
        </div>
      </div>
    </>
    
  );
};

export default ImpactoAmbientalClient;