'use client';

import React from 'react';
import SearchBox from './SearchBox'; // Asumiendo que SearchBox está en la misma carpeta
import ChatAI from './ChatAI';     // Asumiendo que ChatAI está en la misma carpeta
import { ChatMessage } from '@/types/index'; // Ajusta la ruta a tus tipos
import { formatMarkdownText } from "@/lib/utils"; // Ajusta la ruta
import { CldImage }  from 'next-cloudinary'
import CategoriasBurbujas from '@/components/features/home/CategoriasBurbujas';


interface HeroSectionProps {
  titleVisible: boolean;
  showChat: boolean;
  chatMessages: ChatMessage[];
  aiLoading: boolean;
  handleAISearch: (query: string) => void;
  handleCloseChat: () => void;
  onDemoClick: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({
  titleVisible,
  showChat,
  chatMessages,
  aiLoading,
  handleAISearch,
  handleCloseChat,
  onDemoClick
}) => {
  return (
    <section className="hero-section"> {/* Nueva clase contenedora */}
      <div className="hero-background">
        <CldImage
          src="https://res.cloudinary.com/destinoplus/image/upload/v1734700730/vsgukkynidlmdmccxqhj.jpg"
          alt="Paisaje impresionante de Suesca"
          fill
          style={{ objectFit: 'cover', zIndex: -1, opacity: 0.9 }} // Opacidad para no opacar el texto
          priority // Es la imagen principal, debería cargar rápido
        />
      </div>
      
      <div className="hero-content"> {/* Contenedor para centrar el contenido */}
        {titleVisible && !showChat ? ( // Lógica ajustada para mostrar título solo si no hay chat
          <div className={`hero-title-container ${showChat ? 'title-fade-out' : 'title-fade-in'}`}>
            <h1>¿Qué hacer en <span className="highlight">Suesca</span>?</h1>
            <p className="hero-subtitle">
              Dinos qué buscas y descubre la experiencia perfecta <span className="highlight-3">a tu medida</span>.
            </p>
          </div>
        ) : null}

        {!titleVisible && showChat ? (
            <div className={`chat-container ${showChat ? 'fade-in' : ''}`}> {/* Clases originales + animación */}
            <ChatAI
                messages={chatMessages}
                isLoading={aiLoading}
                formatTextFunction={formatMarkdownText} // Pasa la función importada
            />
            {/* Muestra botón cerrar solo si hay mensajes y no está cargando */}
            {chatMessages.length > 0 && !aiLoading && (
                <button className="close-chat-btn" onClick={handleCloseChat}>
                Cerrar conversación
                </button>
            )}
            </div>
        ) : null}

        {/* El SearchBox siempre visible debajo del título o cuando el chat está cerrado */}
        <div className="hero-searchbox-container">
            <SearchBox onAISearch={handleAISearch} />
        </div>

        {!showChat && (
            <CategoriasBurbujas onDemoClick={onDemoClick} />
        )}
      </div>
    </section>
  );
};

export default HeroSection;