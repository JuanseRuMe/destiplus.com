// src/components/features/blog/single-article/ArticlePageClient.tsx
'use client';

import React, { useState, useEffect, ElementType } from 'react';
import { CldImage } from 'next-cloudinary';

import Header from '@/components/features/home/header'; // Ajusta ruta si es necesario
import type { ArticleData } from '@/types/blogIndivdual'; // Importa el tipo actualizado

// Componente para renderizar el contenido dinámicamente
// Este componente no debería necesitar cambios si la estructura interna de 'contentItem' no cambió de nombre
const ArticleContentRenderer = ({ contentItem }: { contentItem: ArticleData['content'][0] }) => {
  switch (contentItem.type) {
    case 'paragraph':
      return <p className="article-paragraph" dangerouslySetInnerHTML={{ __html: contentItem.text || '' }} />;
    case 'heading':
      const Tag = `h${contentItem.level}` as ElementType;
      return <Tag className={`article-heading-${contentItem.level}`} dangerouslySetInnerHTML={{ __html: contentItem.text || '' }} />;
    case 'image':
      return (
        <figure className="article-inline-image-figure">
          <CldImage
            src={contentItem.url || ''}
            alt={contentItem.alt || 'Imagen del artículo'}
            width={800} height={500} crop="fill" gravity="center" quality="auto"
            className="article-inline-image"
            style={{ objectFit: 'cover' }}
          />
          {contentItem.caption && <figcaption className="article-image-caption">{contentItem.caption}</figcaption>}
        </figure>
      );
    case 'list':
      return (
        <ul className="article-list">
          {contentItem.items?.map((item: string, index: number) => (<li key={index}>{item}</li>))}
        </ul>
      );
    case 'quote':
      return <blockquote className="article-blockquote"><p>{contentItem.text}</p>{contentItem.cite && <cite>{contentItem.cite}</cite>}</blockquote>;
    default: return null;
  }
};

interface ArticlePageClientProps {
  article: ArticleData; // article ahora usará los nombres de campo snake_case
}

const ArticlePageClient: React.FC<ArticlePageClientProps> = ({ article }) => {
  const [currentClientUrl, setCurrentClientUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentClientUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (currentClientUrl) {
      navigator.clipboard.writeText(currentClientUrl)
        .then(() => alert('¡Enlace copiado al portapapeles!'))
        .catch(err => {
          console.error('Error al copiar el enlace: ', err);
          alert('Error al copiar el enlace.');
        });
    }
  };

  if (!article) {
    return <div>Artículo no encontrado.</div>;
  }

  const encodedTitle = encodeURIComponent(article.title);
  const encodedCurrentClientUrl = encodeURIComponent(currentClientUrl);
  
  // Formatear fecha para mostrar
  // Usamos los campos con snake_case de la interfaz ArticleData actualizada
  const displayPublicationDate = article.display_date || 
    new Date(article.publication_date).toLocaleDateString('es-CO', { // CAMBIADO: article.publication_date
      year: 'numeric', month: 'long', day: 'numeric' 
    });


  return (
    <>
      <Header />
      <main>
        <article className="article-page-container">
          {/* CABECERA DEL ARTÍCULO */}
          <header className="article-header">
            <div className="article-header-image-wrapper">
              <CldImage
                src={article.hero_image_url} // Ya estaba en snake_case en tu snippet
                alt={article.hero_image_alt} // Ya estaba en snake_case en tu snippet
                fill
                crop="fill"
                gravity="center"
                quality="auto"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                className="article-header-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="article-header-overlay"></div>
            </div>
            <div className="article-header-content">
              <span className="article-category-badge">{article.category}</span>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <span>Por {article.author}</span>
                <span>&bull;</span>
                {/* Se usa la variable displayPublicationDate que ya tiene la lógica con los campos correctos */}
                <span>{displayPublicationDate}</span> 
                <span>&bull;</span>
                <span>{article.reading_time}</span> {/* CAMBIADO: article.reading_time */}
              </div>
            </div>
          </header>

          {/* CUERPO DEL ARTÍCULO */}
          <div className="article-body">
            <div className="main-content-column">
              {article.content.map((contentItem, index) => (
                <ArticleContentRenderer key={index} contentItem={contentItem} />
              ))}
            </div>
          </div>
          
          {/* BOTONES DE COMPARTIR */}
          <section className="share-section">
            <h3>¡Comparte esta aventura!</h3>
            <div className="share-buttons">
              {currentClientUrl && (
                <>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedCurrentClientUrl}`} className="share-button-facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodedCurrentClientUrl}&text=${encodedTitle}`} className="share-button-twitter" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                  <a href={`https://wa.me/?text=${encodedTitle}%20${encodedCurrentClientUrl}`} className="share-button-whatsapp" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i> WhatsApp
                  </a>
                </>
              )}
              <button onClick={handleCopyLink} className="share-button-copy-link">
                <i className="fas fa-link"></i> Copiar Enlace
              </button>
            </div>
          </section>
          
        </article>
      </main>
    </>
  );
};

export default ArticlePageClient;