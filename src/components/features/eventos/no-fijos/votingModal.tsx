'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Star } from 'lucide-react'; // Iconos Lucide

interface Participant {
    id: number;
    name: string;
    restaurant: string;
    image: string; // Cloudinary Public ID
    logo: string;  // Cloudinary Public ID
    visitors: number;
    price: number;
    description: string;
    specialIngredient: string;
    votes: number; // Votos iniciales (puede ser actualizado dinámicamente por el estado)
    location: {
      lat: number;
      lng: number;
    };
}
  
interface VotePayload {
    email: string;
    full_name: string;
    rating: number; // Ya convertido a número
    recommendations: string | null; // Puede ser nulo
    origin: string | null;          // Puede ser nulo
    burger_name: string;
    restaurant_name: string;
  burger_id: number;
}

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  burger: Participant | null; // La hamburguesa por la que se vota
  onSubmit: (voteData: VotePayload) => Promise<void> | void; // Función que envía el voto (puede ser async)
}

const VotingModal: React.FC<VotingModalProps> = ({ isOpen, onClose, burger, onSubmit }) => {
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [rating, setRating] = useState<number>(0); // Cambiado a number para las estrellas
  const [hoveredStar, setHoveredStar] = useState<number>(0); // Para el efecto hover
  const [recommendations, setRecommendations] = useState('');
  const [origin, setOrigin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // Para errores del formulario

  // Resetea el formulario cuando el modal se cierra o cambia la hamburguesa
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setFullName('');
      setRating(0);
      setRecommendations('');
      setOrigin('');
      setIsSubmitting(false);
      setFormError(null); // Limpia error del formulario
    }
  }, [isOpen]);

  // No renderizar si no está abierto o no hay hamburguesa
  if (!isOpen || !burger) {
    return null;
  }

  // Manejador del envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    // Validación de rating (ahora es un número directamente)
    if (rating < 1 || rating > 10) {
        setFormError("Por favor, selecciona una calificación entre 1 y 10 estrellas.");
        return;
    }

    setIsSubmitting(true);

    // Construir el objeto de voto con los datos del formulario
    const voteData: VotePayload = {
      burger_id: burger.id,
      rating: rating, // Rating is already a number 1-10
      email: email,
      full_name: fullName,
      // Asegurar que 'recommendations' y 'origin' no estén vacíos
      recommendations: recommendations.trim() === '' ? 'vacio' : recommendations,
      origin: origin.trim() === '' ? 'vacio' : origin,
      burger_name: burger.name,
      restaurant_name: burger.restaurant,
    };

    try {
        // Llama a la función onSubmit pasada desde el padre
        await onSubmit(voteData);
        // Si onSubmit es exitoso, el componente padre (BurgerProfileClient)
        // debería cerrar el modal y mostrar mensaje de éxito.
        // No necesitamos llamar a onClose() aquí directamente si el padre lo hace.
    } catch (error) {
         // Si onSubmit lanza un error (ej. fallo de red no manejado en padre), lo mostramos aquí
         console.error("Error en onSubmit desde VotingModal:", error);
         setFormError("No se pudo enviar el voto. Inténtalo de nuevo.");
    } finally {
         // Reactivar botón SÓLO si el modal NO se cierra automáticamente por el padre
         // En nuestro caso, BurgerProfileClient cierra el modal, así que no es necesario reactivar aquí.
         // Si quisiéramos permitir reintentos DESDE el modal, haríamos:
         // setIsSubmitting(false);
    }
  };

  // Prevent modal closing while submitting
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isSubmitting) {
      e.stopPropagation();
    } else {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => { e.stopPropagation(); };

  return (
    <div className="voting-modal-overlay" onClick={handleOverlayClick}> {/* Mantener clases */}
      <div className="voting-modal-content" onClick={handleContentClick}>
        <button className="modal-close-btn" onClick={onClose} disabled={isSubmitting}>&times;</button>
        <h3 className="modal-title">
          Vota por: <span className="modal-burger-name">{burger.name}</span>
          <span className="modal-restaurant-name">de {burger.restaurant}</span>
        </h3>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Campo Email */}
          <div className="modal-form-group">
            <label htmlFor="email-vote" className="modal-label">Correo Electrónico:</label>
            <input type="email" id="email-vote" className="modal-input" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isSubmitting} />
          </div>
          {/* Campo Nombre Completo */}
          <div className="modal-form-group">
            <label htmlFor="fullName-vote" className="modal-label">Nombre y Apellidos:</label>
            <input type="text" id="fullName-vote" className="modal-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={isSubmitting} />
          </div>
          {/* Campo Calificación con Estrellas Mejorado */}
          <div className="modal-form-group rating-group">
            <label className="modal-label rating-label">
              Calificación <span className="required">*</span>
            </label>
            <div className="star-rating-container">
              <div className="star-rating">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    disabled={isSubmitting}
                    className="star-button"
                    aria-label={`Calificar con ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                  >
                    <Star
                      size={24}
                      className={`star-icon ${
                        star <= (hoveredStar || rating)
                          ? 'star-filled'
                          : 'star-empty'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <div className="rating-feedback">
                  <span className="rating-text">
                    {rating} {rating === 1 ? 'estrella' : 'estrellas'}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Campo Recomendaciones */}
          <div className="modal-form-group">
            <label htmlFor="recommendations-vote" className="modal-label">Recomendaciones (Opcional):</label>
            <textarea id="recommendations-vote" className="modal-textarea" value={recommendations} onChange={(e) => setRecommendations(e.target.value)} rows={3} disabled={isSubmitting} />
          </div>
          {/* Campo Origen */}
          <div className="modal-form-group">
            <label htmlFor="origin-vote" className="modal-label">¿De dónde nos visitas? (Opcional):</label>
            <input type="text" id="origin-vote" className="modal-input" value={origin} onChange={(e) => setOrigin(e.target.value)} disabled={isSubmitting} />
          </div>

          {/* Mensaje de error del formulario */}
          {formError && <p className="form-message error" style={{textAlign: 'center', marginTop: '-10px', marginBottom: '15px'}}>{formError}</p>}

          {/* Botón Enviar */}
          <button 
            type="submit" 
            className="modal-submit-btn" 
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? (
                <>
                    <Loader2 className="animate-spin" size={18} /> 
                    Enviando...
                </>
            ) : (
                'Enviar Voto'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VotingModal;