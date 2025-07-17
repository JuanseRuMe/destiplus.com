// src/components/features/home/ChatAI.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/index'; // Importa el tipo de mensaje

interface ChatAIProps {
  messages: ChatMessage[];
  isLoading: boolean;
  formatTextFunction: (text: string) => string; // Recibe la función de formato
}

const ChatAI: React.FC<ChatAIProps> = ({ messages, isLoading, formatTextFunction }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Si no hay mensajes y no está cargando, no renderizar nada
  // O podrías mostrar un mensaje inicial "Pregúntame algo..."
  if (messages.length === 0 && !isLoading) {
     return null; // O un placeholder
  }

  return (
    // Mantenemos tus clases originales
    <div className="chat-ai-container">
      <div className="chat-ai-messages" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          // Asegúrate que las clases 'chat-message', 'user', 'ai', 'message-content' existan
          <div key={index} className={`chat-message ${msg.sender}`}>
            {/* Renderiza texto normal para 'user' y HTML formateado para 'ai' */}
            {msg.sender === 'ai' ? (
              <div
                className="message-content"
                // Usamos la función de formato pasada como prop
                dangerouslySetInnerHTML={{ __html: formatTextFunction(msg.text) }}
              />
            ) : (
              <div className="message-content">{msg.text}</div>
            )}
          </div>
        ))}
        {/* Indicador de carga */}
        {isLoading && (
          // Asegúrate que las clases 'typing-indicator' existan
          <div className="chat-message ai">
            <div className="message-content typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAI;