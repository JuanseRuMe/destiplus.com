'use client'; 

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Hook de enrutamiento de Next.js
import { CldImage } from 'next-cloudinary'; // ¡Importa CldImage!
import Link from 'next/link';


// // --- Iconos ---
// import { MdExplore } from "react-icons/md";
// // import { IoMdArrowDropdown } from "react-icons/io"; // No parece usarse en el JSX final
// import { FaUserGroup } from "react-icons/fa6";
// import { ChevronDown} from 'lucide-react'; // Iconos usados

// --- Componentes Hijos (Asegúrate que existan en estas rutas y estén adaptados) ---
import FeedbackSection from '@/components/features/home/FeedbackSection';
import WelcomeModal from '@/components/features/home/WelcomeModal';
import DemoModal from '@/components/features/home/DemoModal';
import ImpactoAmbientalCard from '@/components/features/home/ImpactoAmbientalCard';
import AdSlider from '@/components/features/home/advertasing-slider'
import Header from '@/components/features/home/header'
import HeroSection from '@/components/features/home/heroSection'

// --- Servicios y Utils (Asegúrate que existan y funcionen) ---
import { consultarOpenAI } from "@/service/openIAService"; // Asumiendo que usa axios si es necesario
import { DestinoType, ChatMessage, ArticlePreview, ArticlePreviewResponse } from '@/types/index'; // Tus definiciones de tipos

// Props para el componente HomeClient
export interface HomeClientProps {
  initialDestinos: DestinoType[];
  sampleArticles: ArticlePreview[] | ArticlePreviewResponse; // Acepta ambos formatos
}

const featuredCategories = [
  { name: 'Aventuras', slug: 'https://www.destiplus.com/destino/Suesca/actividades', imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1734234353/lkimdcu2qrowjwt4dcct.jpg', iconClass: 'fas fa-hiking' }, // Reemplaza con tus URLs reales
  { name: 'Alojamientos', slug: 'https://www.destiplus.com/destino/Suesca/alojamiento', imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1734990366/gw9pwqit2yymx8peyj3e.jpg', iconClass: 'fas fa-bed' },
  { name: 'Rutas y Paisajes', slug: 'https://www.destiplus.com/destino/Suesca/rutas', imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1737039685/rutas/las-tres-viejas/dzutjgpjps467997u5fm.jpg', iconClass: 'fas fa-map-marked-alt' },
  { name: 'Sabores Únicos', slug: 'https://www.destiplus.com/destino/Suesca/restaurantes', imageUrl: 'https://res.cloudinary.com/destinoplus/image/upload/v1736722535/restaurantes/nixcal/iiwpzg8z9mtqpqaa2vi0.jpg', iconClass: 'fas fa-utensils' },
];

interface CategoryHighlightCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  iconClass: string; // Clases de Font Awesome u otro sistema de iconos
}
const CategoryHighlightCard: React.FC<CategoryHighlightCardProps> = ({ name, slug, imageUrl, iconClass }) => {
  return (
      <Link href={`${slug}`} className="category-highlight-card">
          <div className="category-highlight-image">
              <CldImage
                  src={imageUrl}
                  alt={name}
                  fill
                  // Elige una opción: style con objectFit o crop/gravity
                  // Opción 1:
                  style={{ objectFit: 'cover' }}
                  // Opción 2:
                  // crop="fill"
                  // gravity="center"
                  loading="lazy"
                  // sizes="(max-width: 768px) 50vw, 25vw" // Ajusta sizes según tu grid
              />
          </div>
          <div className="category-highlight-overlay"></div>
          <div className="category-highlight-content">
              {/* Asegúrate de tener FontAwesome u otro sistema de iconos configurado */}
              <i className={iconClass}></i>
              <h4>{name}</h4>
          </div>
      </Link>
  );
};

// --- Componente Tarjeta de Artículo ---
interface ArticleCardProps {
  title: string;
  imageUrl: string;
  category: string;
  excerpt: string;
}
const ArticleCard: React.FC<ArticleCardProps> = ({ title, imageUrl, category, excerpt }) => {
  return (
    <div className="article-card">
       <div className="article-card-image-wrapper">
         <CldImage
            src={imageUrl}
            alt={title}
            fill // Rellena el contenedor
            // Usar 'crop' y 'gravity' o 'style' con 'objectFit', elige uno:
            // Opción 1:
            crop="fill" // Asegura que la imagen cubra, puede recortar
            gravity="center" // Centra el recorte
            // Opción 2 (si prefieres usar CSS object-fit via style prop):
            style={{ objectFit: 'cover' }}
            className="article-card-image" // Para transiciones CSS
            loading="lazy" // Carga diferida
            // Considera añadir 'sizes' para optimización de imagen responsiva
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
         <span className="article-card-category">{category}</span>
       </div>
       <div className="article-card-content">
         <h3 className="article-card-title">{title}</h3>
         <p className="article-card-excerpt">{excerpt}</p>
       </div>
     </div>
  );
};

// Type guard to check if object is ArticlePreviewResponse
const isArticlePreviewResponse = (obj: ArticlePreviewResponse | ArticlePreview[]): obj is ArticlePreviewResponse => {
  return 'articles' in obj && Array.isArray(obj.articles);
};

// --- Componente Cliente Principal ---
const HomeClient: React.FC<HomeClientProps> = ({ initialDestinos, sampleArticles }) => {
  const router = useRouter();
  // Estados de UI
  const [error, setError] = useState<string | null>(null); // Para errores del cliente
  console.log(initialDestinos)

  // Estados de Modales y Chat
  // WelcomeModal ahora controla su propia visibilidad inicial
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true); // Controla si se ve el título o el chat
  const currentYear = new Date().getFullYear();

  // Extrae el array de artículos del objeto si tiene la estructura esperada
  const articlesArray = isArticlePreviewResponse(sampleArticles) 
    ? sampleArticles.articles 
    : Array.isArray(sampleArticles) 
      ? sampleArticles 
      : [];

  // Ahora filtra los artículos prioritarios de la fuente correcta
  const priorityArticles = articlesArray
    .filter((article: ArticlePreview) => article.prioridad === 1)
    .slice(0, 3);


  // Manejadores de Modales
  const handleDemoClick = () => {
    setShowDemoModal(true);
    if (window && window.gtag) { /* gtag event */ }
  };
  const handleCloseDemoModal = () => setShowDemoModal(false);
  // WelcomeModal maneja su propio cierre internamente ahora

  // Manejador Búsqueda con IA
  const handleAISearch = async (query: string) => {
    if (!query.trim()) return; // No buscar si está vacío

    setShowChat(true); // Muestra el contenedor del chat
    // Oculta el título con animación (asegúrate que la clase CSS 'title-fade-out' funcione)
    const titleElement = document.querySelector('.titulo-landing');
    if (titleElement) titleElement.classList.add('title-fade-out');
    setTimeout(() => setTitleVisible(false), 600); // Sincroniza con la animación CSS

    setAiLoading(true); // Muestra el indicador de carga en ChatAI
    setError(null); // Limpia errores previos
    console.log(error)
    setChatMessages(prev => [...prev, { text: query, sender: 'user' }]); // Muestra la pregunta del usuario

     // Limpiar Input - Idealmente SearchBox debería manejar esto internamente o vía callback
     setTimeout(() => {
         const searchInput = document.querySelector('.container-box-filter textarea') as HTMLTextAreaElement;
         if (searchInput) {
             searchInput.value = '';
             searchInput.style.height = 'auto'; // Resetear altura
             searchInput.dispatchEvent(new Event('input', { bubbles: true })); // Para que SearchBox sepa que cambió (si es necesario)
         }
     }, 100);

    try {
      const response = await consultarOpenAI(query); // Llama al servicio de IA
      setChatMessages(prev => [...prev, { text: response, sender: 'ai' }]); // Muestra la respuesta de la IA
    } catch (err: unknown) {
      console.error('Error consultando IA:', err);
      const errorMsg = err instanceof Error ? err.message : 
                      (err && typeof err === 'object' && 'response' in err && 
                       typeof err.response === 'object' && err.response && 
                       'data' in err.response && typeof err.response.data === 'object' && 
                       err.response.data && 'message' in err.response.data && 
                       typeof err.response.data.message === 'string' ? 
                       err.response.data.message : 'Lo siento, hubo un problema. Intenta de nuevo.');
      setChatMessages(prev => [...prev, { text: errorMsg, sender: 'ai' }]);
      setError(errorMsg); // Guarda el error por si necesitas mostrarlo en otro lugar
    } finally {
      setAiLoading(false); // Oculta el indicador de carga
    }
  };

  // Manejador para Cerrar el Chat
  const handleCloseChat = () => {
    setShowChat(false); // Oculta el chat
    setChatMessages([]); // Limpia los mensajes
    // Muestra el título de nuevo (podrías añadir animación de entrada)
    setTitleVisible(true);
    // Restaura la lista completa de destinos si la IA la había modificado
    // (Actualmente la IA no modifica la lista, solo muestra texto)
    // setRutasFiltradas(destinos);
  };

  // const handleNavigateToDestino = (item: DestinoType) => {
  //   const { id: destino_id, municipio } = item;
  //   // Verifica que municipio exista y no esté vacío
  //   if (!municipio) {
  //     console.error("Intento de navegar a destino sin municipio:", item);
  //     return; // No navegar si no hay municipio
  //   }

  //   // --- Inicio Bloque GTAG para Destino ---
  //   if (typeof window !== "undefined" && window.gtag) { // Usamos typeof para más seguridad
  //       window.gtag('event', 'destination_click', {
  //           event_category: 'Navigation',
  //           event_label: municipio,
  //           value: destino_id, // Asegúrate que destino_id sea un número si value debe serlo
  //           app_name: 'Home busqueda',
  //           screen_name: municipio, // Opcional pero útil
  //           timestamp: new Date().toISOString(),
  //           interaction_type: 'click'
  //       });
  //   } else {
  //       console.warn('Google Analytics (gtag) no está disponible.');
  //   }
  //   const encodedMunicipio = encodeURIComponent(municipio);
  //   router.push(`/destino/${encodedMunicipio}`);
  // };


  const handleNavigateToImpacto = () => {
    console.log("Navegando a impacto ambiental");

    // --- Inicio Bloque GTAG para Impacto ---
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag('event', 'impacto_ambiental_click', {
            event_category: 'Engagement',
            event_label: 'Reserva árbol', // O 'Ver Impacto Click' según prefieras
            app_name: 'Home busqueda',
            timestamp: new Date().toISOString(),
            interaction_type: 'click'
        });
    } else {
       // Puedes añadir un console.warn aquí también si quieres
       // console.warn('Google Analytics (gtag) no está disponible.');
    }
    // --- Fin Bloque GTAG ---

    // --- Navegación Next.js ---
    router.push('/impactoAmbiental'); // Esta ruta parece correcta según lo discutido
    // -------------------------
  };



  // // Funciones Auxiliares para el renderizado
  // const getBadgeType = (calificacion?: number): 'new' | 'popular' | null => {
  //   if (calificacion === undefined || calificacion === null) return null;
  //   if (calificacion === 0) return 'new';
  //   if (calificacion >= 4.6) return 'popular';
  //   return null;
  // };
  // const getDestinationType = (municipio: string): string => {
  //   // Podrías tener una lógica más compleja o datos desde la API aquí
  //   return municipio.toLowerCase() === "suesca" ? "Aventura" : "Trekking";
  // };

  // --- JSX Renderizado ---
  return (
    <>
      <Header />

      <HeroSection 
        titleVisible={titleVisible}
        showChat={showChat}
        chatMessages={chatMessages}
        aiLoading={aiLoading}
        handleAISearch={handleAISearch}
        handleCloseChat={handleCloseChat}
        onDemoClick={handleDemoClick}
      />

      {/* Sección: Explorar por Categoría */}
      <div className="blog-page-container">
        <div className="category-ads">
          <section className="category-highlight-section">
              <h2 className="section-title-2">Tu viaje, desde un solo lugar</h2>
              <div className="category-highlight-grid">
                  {featuredCategories.map((category) => (
                      <CategoryHighlightCard
                          key={category.slug}
                          name={category.name}
                          slug={category.slug}
                          imageUrl={category.imageUrl}
                          iconClass={category.iconClass}
                      />
                  ))}
              </div>
          </section>

          <AdSlider />
        </div>

        <section className="recent-articles-section">
          <h2 className="section-title-2">Planes que están marcando tendencia</h2>
          <div className="article-grid recent-articles-grid">
            {priorityArticles.length > 0 ? (
              priorityArticles.map((article) => (
                <Link key={article.slug} href={`/suesca-blog/${article.slug}`} className="article-card-link">
                  <ArticleCard
                    title={article.title}
                    imageUrl={article.hero_image_url}
                    category={article.category}
                    excerpt={article.excerpt}
                  />
                </Link>
              ))
            ) : (
              <p className="no-articles-message">No hay artículos destacados disponibles en este momento.</p>
            )}
          </div>
        
          {/* Botón para ver todos los artículos */}
          <div className="view-all-button-container">
            <Link href="/suesca-blog" className="view-all-btn">
              <span>Ver Todos los Artículos</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>
      </div>
      
      {/* --- Encabezado Lista Destinos (Clases originales) --- */}
      {/* <div className="destinations-header">
        <div className="destinations-title-container">
          <h2 className="destinations-title">Destinos para este fin de semana</h2>
          <p className="destinations-subtitle">
            <ChevronDown size={18} className="arrow-down" />
            Da click en alguno y empieza a explorar
            <ChevronDown size={18} className="arrow-down" />
          </p>
        </div>
      </div> */}

      {/* <div className="container-seccion-lista-home">
        {initialDestinos.length > 0 ? (
          initialDestinos.map((item) => {
            const badgeType = getBadgeType(item.calificacion);
            return (
              <div
                key={item.id}
                className="destination-card" 
                onClick={() => handleNavigateToDestino(item)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigateToDestino(item)}
                aria-label={`Explorar ${item.municipio}`}
              >
                <div className="image-section"> 
                  <CldImage
                    src={item.img} 
                    alt={`Paisaje de ${item.municipio}`}
                    width={400}
                    className={'destination-image'}
                    crop="fill"
                    gravity="center"
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="destination-badges">
                    {badgeType && (
                      <span className={`badge ${badgeType}`}>
                        {badgeType === 'new' ? 'Nuevo' : 'Popular'}
                      </span>
                    )}
                  </div>
                  <div className="destination-rating">
                    {item.calificacion !== undefined && item.calificacion >= 0 ? ( // Muestra si hay calificación >= 0
                      <>
                        {item.calificacion > 0 && <span>{item.calificacion.toFixed(1)}</span>} 
                        <Image // <-- Usa Image de next/image
                          src="/utils/icons8-estrella-48.png" // <-- Ruta desde la carpeta /public
                          alt="Estrella"
                          width={16}
                          height={16}
                          className="star-icon"
                          style={{ objectFit: 'cover' }}
                        />                      
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="destination-info">
                  <div className="destination-header">
                    <h3>{item.municipio}, {item.departamento}</h3>
                    <span className="destination-type"> 
                      {getDestinationType(item.municipio)}
                    </span>
                  </div>
                  <div className="destination-description">
                    <MdExplore className="explore-icon" />
                    <p>{item.frase}</p> 
                  </div>
                  <div className="explorar-boton"> 
                    <div className="destination-stats">
                      <FaUserGroup className="visitors-icon" />
                      <span>¡Sé de los primeros en explorar!</span> 
                    </div>
                    <button className="book-btn" tabIndex={-1}>Explorar</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: '#666' }}>
            {initialDestinos.length === 0 ? 
              <p>No hay destinos cargados en este momento. ¡Vuelve pronto!</p>
              : 
              <p>No se encontraron destinos que coincidan con tu búsqueda actual.</p>
            }
          </div>
        )}
      </div> */}

      {/* --- Impacto Ambiental Card (Componente hijo) --- */}
      <ImpactoAmbientalCard onClick={handleNavigateToImpacto} />

      {/* --- Feedback Section (Componente hijo) --- */}
      <FeedbackSection />

      {/* --- Modales (Componentes hijos, renderizado condicional interno/externo) --- */}
      <WelcomeModal /> {/* Controla su visibilidad internamente con localStorage */}
      <DemoModal isOpen={showDemoModal} onClose={handleCloseDemoModal} />
      
      <footer className="site-footer">
        <div className="footer-content-container">
            {/* Sección superior opcional del footer */}
            <div className="footer-promo-section">
            <h2>¿Listo para tu próxima aventura?</h2>
            <p>Descubre los tesoros escondidos de Suesca, Sesquilé y sus alrededores.</p>
            <Link href="https://www.destiplus.com/" className="promo-button">
                Explora Destinos
            </Link>
            </div>

            <div className="footer-main">
            <div className="footer-column footer-about">
                <h4 className="footer-logo">
                Desti<span className="highlight-plus">plus</span>
                </h4>
                <p>
                Tu guía para experiencias inolvidables cerca a Bogotá.
                Aventura, cultura y naturaleza te esperan.
                </p>
            </div>

            <div className="footer-column footer-links">
                <h5>Enlaces Rápidos</h5>
                <ul>
                <li><Link href="https://www.destiplus.com/suesca-blog">Blog</Link></li>
                <li><Link href="https://www.destiplus.com/destino/Suesca">Suesca</Link></li>
                <li><Link href="https://www.destiplus.com/destino/Sesquile">Sesquilé</Link></li>
                </ul>
            </div>
            <div className="footer-column footer-legal">
                <h5>Legal</h5>
                <ul>
                <li><Link href="/politica-privacidad">Política de Privacidad</Link></li>
                <li><Link href="/terminos-condiciones">Términos y Condiciones</Link></li>
                <li><Link href="https://wa.me/573015081517">Contacto</Link></li>
                </ul>
            </div>

            <div className="footer-column footer-social">
                <h5>Síguenos</h5>
                <div className="social-icons">
                <a href="https://www.instagram.com/desti.plus/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@desti.plus" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                </a>
                {/* Añade más redes si es necesario */}
                </div>
            </div>
            </div>

            <div className="footer-bottom">
            <p>&copy; {currentYear} Destiplus. Todos los derechos reservados.</p>
            <p>Diseñado con <i className="fas fa-heart" style={{ color: 'var(--primary-color)' }}></i> en Suesca, Colombia.</p>
            </div>
        </div>
      </footer>
    </>
  );
};

export default HomeClient;