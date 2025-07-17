// src/components/features/home/FeedbackSection.tsx
'use client'; // Necesario por useState y window.open

import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdOutlineFeedback } from 'react-icons/md';

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_FEEDBACK || '+573015081517'; // Usa variable de entorno

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Feedback desde Destiplus: ${feedback}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // window.open solo funciona en el cliente, por eso 'use client' es necesario
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    setFeedback(''); // Limpia el campo inmediatamente

    setTimeout(() => {
      setIsSubmitted(false); // Resetea el estado de éxito después de 3s
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
      setFeedback(suggestion);
      // Opcional: Enfocar el textarea
      const textarea = document.querySelector('.feedback-input') as HTMLTextAreaElement;
      textarea?.focus();
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <MdOutlineFeedback className="feedback-icon" />
        <h3>¡Tu opinión nos importa!</h3>
      </div>

      <div className='feedback-content'>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="feedback-form">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Cuéntanos qué destinos te gustaría descubrir, o comparte tus sugerencias para mejorar tu experiencia..."
              required
              className="feedback-input"
              rows={4} // Añadir rows para tamaño inicial
            />
            <button type="submit" className="feedback-submit-btn">
              <FiSend /> Enviar
            </button>
          </form>
        ) : (
          <div className="feedback-success">
            <span>¡Gracias por tu feedback! Lo tendremos en cuenta.</span>
          </div>
        )}

        <div className="feedback-suggestions">
           <p>¿Qué te gustaría contarnos?</p>
           <div className="feedback-suggestion-pills">
              <button type="button" onClick={() => handleSuggestionClick("Me gustaría descubrir destinos en...")} className="suggestion-pill">Nuevos destinos</button>
              <button type="button" onClick={() => handleSuggestionClick("Me encantaría que mejoraran...")} className="suggestion-pill">Sugerencias</button>
              <button type="button" onClick={() => handleSuggestionClick("Mi experiencia con la plataforma ha sido...")} className="suggestion-pill">Mi experiencia</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;