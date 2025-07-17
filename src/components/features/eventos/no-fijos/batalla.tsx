'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/style/events/batalla.css' // Importa los estilos CSS Modules
import { CldImage } from 'next-cloudinary';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
    <path d="M8 5v14l11-7z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const categoryIds = [
  'panela', 'mango', 'maduro', 'lulo', 'pina', 'naranja',
  'champinones', 'cafe', 'vino', 'maracuya', 'uchuva', 'maiz',
  'frutosRojos', 'pimenton'
];

interface Participant {
  id: number;
  name: string;
  restaurant: string;
  image: string;
  logo: string;
  visitors: number;
  price: number;
  description: string;
  specialIngredient: string;
  votes: number;
  location: {
    lat: number;
    lng: number;
  };
}

const BurgerBattle = () => {
  const router = useRouter();
  const [participants] = useState<Participant[]>([
    {
      id: 1,
      name: "Terraza",
      restaurant: "Terraza",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056160/puzcgyebo8lqaqpyjmkf.jpg", // Cloudinary Public ID
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721281/wmz2sj60iuvl8eswhzdz.jpg", // Cloudinary Public ID
      visitors: 46,
      price: 16000,
      description: "Pan artesanal, carne de res madurada, queso mozzarella, lechuga romana, mayonesa cítrica y un toque dulce de piña caramelizada.",
      specialIngredient: "Piña caramelizada",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 2,
      name: "La Gloria",
      restaurant: "Cacique Burguer",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055031/wanllxqb4v4oytbx3khq.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721515/kdennvrlqzyd0lrmuec3.jpg",
      visitors: 38,
      price: 16000,
      description: "Una fusión única con carne de cerdo desmechada, queso cheddar, alioli de ajo rostizado y plátano maduro frito en forma de chips.",
      specialIngredient: "Plátano maduro frito",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 3,
      name: "Deep Purple",
      restaurant: "Arca Rock",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056258/dgg8felik5fgvxqa2vbt.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721490/zqbrxrfk5n59t1zkbkxo.jpg",
      visitors: 52,
      price: 16000,
      description: "Carne de res en doble medallón, queso americano, cebolla caramelizada y una generosa capa de mermelada de tocineta.",
      specialIngredient: "Mermelada de tocineta",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 4,
      name: "Fuera de Serie",
      restaurant: "Lo Nuestro",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056750/szhhck2etj0wape71z26.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721854/mj7ew6hjdv24wqsp3rnh.jpg",
      visitors: 61,
      price: 16000,
      description: "Para paladares osados: carne de cordero, rúgula fresca, cebolla morada crujiente y un potente queso azul que lo cambia todo.",
      specialIngredient: "Queso azul",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 5,
      name: "La Conquistadora",
      restaurant: "Texas Burguer",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055248/on6j3bt24o9nlmunnwwk.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721792/udbn3mgoaero4yy4vlir.jpg",
      visitors: 0,
      price: 16000,
      description: "",
      specialIngredient: "Maiz",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 6,
      name: "La Guerrera de Lulo",
      restaurant: "Crucero",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056345/qbuma5fjob1nzlxzbanw.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721472/o673xcuzwhloip00sakf.jpg",
      visitors: 38,
      price: 16000,
      description: "Hamburguesa veggie con portobellos grillados, queso de cabra, reducción balsámica y servida en un pan de remolacha que roba miradas.",
      specialIngredient: "Pan de remolacha",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 7,
      name: "La Vikinga",
      restaurant: "Villa Hamburguesa",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055560/quxsz5idifv0sckmbzum.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721379/wh1gymjaeuhz2hlfg73j.jpg",
      visitors: 52,
      price: 16000,
      description: "Carne mixta (res y cerdo), cebollín, mayonesa de limón y un crocante e irresistible toque de chicharrón crocante.",
      specialIngredient: "Chicharrón crocante",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 8,
      name: "La Ahumadita",
      restaurant: "Don Toño",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056695/zeiurbncwoh3hi2keiml.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721357/smnu6jofmm3d86fjgmyx.jpg",
      visitors: 0,
      price: 16000,
      description: "Don toño ahumados es un lugar en el parque principal de suesca, un lugar especial, en donde el ahumado es el protagonista, no comparable, un espacio original. Nuestra hamburguesa con toques ahumados esta creada para combinarse con los demás ingredientes y fascinar en el paladar!!!",
      specialIngredient: "Maduro",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 9,
      name: "La Bendita",
      restaurant: "Palo Santo",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056612/vdasiay9bz559v51vkcv.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721330/cyw08ddfvmlhmqosarn2.jpg",
      visitors: 46,
      price: 16000,
      description: "Pechuga de pollo grillada, tomate confitado, queso provolone y un intenso pesto de albahaca que le da el alma al bocado.",
      specialIngredient: "Pesto de albahaca",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 10,
      name: "Mango breeze",
      restaurant: "Amore Pizza",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056435/rtinbovb7o8udqwrqcxr.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721782/gordtfirjpujbiait6ur.jpg",
      visitors: 38,
      price: 16000,
      description: "Carne sellada en mantequilla, queso suizo, cebolla blanca salteada y unos aromáticos champiñones al vino tinto.",
      specialIngredient: "Champiñones al vino tinto",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 11,
      name: "Craff Burger",
      restaurant: "La Parrilla de Juancho",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055827/gx3ogqvi3czw6p9vpezw.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721305/fjshp3eytuvai3z48ogy.jpg",
      visitors: 95,
      price: 16000,
      description: "Clásica con sorpresa: carne de res jugosa, cheddar fundido, tocineta ahumada y un brillante huevo pochado encima.",
      specialIngredient: "Huevo pochado",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 12,
      name: "La Crazy Crunch",
      restaurant: "Dorilocos La Roca",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056508/rv7h14gyt2xtr6j9xbe6.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721424/zzbgw6xporkrjbcflsrj.jpg",
      visitors: 61,
      price: 16000,
      description: "Doble carne, queso pepper jack, vegetales asados y una atrevida salsa de maracuyá picante que te hace sudar.",
      specialIngredient: "Salsa de maracuyá picante",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 13,
      name: "La Cumbambeña",
      restaurant: "Cumbamba",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055729/udgoytef8zrlyfd5qfok.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721401/bxyumnz1bwmuqllbwpat.jpg",
      visitors: 46,
      price: 16000,
      description: "Inspiración dark: pulled pork jugoso, cebolla crispy y una intensa BBQ de café que potencia el sabor de principio a fin.",
      specialIngredient: "Pulled pork en BBQ de café",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    },
    {
      id: 14,
      name: "La Oriental",
      restaurant: "Monopizza Gourmet",
      image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055364/cjcsaoyxx5grvyrtytm6.jpg",
      logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721802/kjwd5jreolrrpcpzturq.jpg",
      visitors: 38,
      price: 16000,
      description: "Carne a la parrilla, queso costeño, lechuga fresca, cebolla crocante y el vibrante y exótico chutney de mango con habanero.",
      specialIngredient: "Chutney de mango con habanero",
      votes: 0,
      location: { "lat": 5.100817, "lng": -73.799823 }
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ajicrema');
  const categoriesRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === participants.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? participants.length - 1 : prevIndex - 1));
  };

  const stopCategoryAutoplay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const getItemClassName = (index: number) => {
    if (index === currentIndex) return `${'burger-battle-carousel-item'} ${'active-b'}`;
    if (index === (currentIndex + 1) % participants.length) return `${'burger-battle-carousel-item'} ${'next'}`;
    if (index === (currentIndex - 1 + participants.length) % participants.length) return `${'burger-battle-carousel-item'} ${'prev'}`;
    return 'burger-battle-carousel-item';
  };

  const handleVisitClick = (burgerId: number) => {
    router.push(`/destino/Suesca/parchar/batalla/${burgerId}`);
  };

  const handleCategoryScroll = () => {
    if (isDraggingRef.current || !categoriesRef.current) return;

    const container = categoriesRef.current;
    const categoryElements = container.querySelectorAll(`.${'burger-battle-category'}`);
    let mostVisibleCategoryData = activeCategory;
    let minDistanceFromCenter = Infinity;
    const containerRect = container.getBoundingClientRect();
    const containerVisibleCenter = containerRect.left + containerRect.width / 2;

    categoryElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.left + rect.width / 2;
      const distanceFromCenter = Math.abs(elementCenter - containerVisibleCenter);
      const threshold = (element as HTMLElement).offsetWidth / 4;

      if (distanceFromCenter < minDistanceFromCenter && distanceFromCenter < threshold * 4) {
        minDistanceFromCenter = distanceFromCenter;
        const currentDataCategory = element.getAttribute('data-category');
        if (currentDataCategory) {
          mostVisibleCategoryData = currentDataCategory;
        }
      }
    });

    if (activeCategory !== mostVisibleCategoryData) {
      setActiveCategory(mostVisibleCategoryData);
    }
  };

  const handleCategoryClick = (category: string, isAutoplay = false) => {
    if (!isAutoplay) {
      stopCategoryAutoplay();
    }

    setActiveCategory(category);
    const index = categoryIds.indexOf(category);

    if (categoriesRef.current && index !== -1) {
      const categoryElements = categoriesRef.current.querySelectorAll(`.${'burger-battle-category'}`);
      if (categoryElements?.[index]) {
        const elementToScrollTo = categoryElements?.[index] as HTMLElement;
        const containerWidth = categoriesRef.current.offsetWidth;
        const elementWidth = elementToScrollTo.offsetWidth;
        const scrollLeftPosition = elementToScrollTo.offsetLeft - (containerWidth / 2) + (elementWidth / 2);

        categoriesRef.current.scrollTo({
          left: scrollLeftPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    stopCategoryAutoplay();
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    stopCategoryAutoplay();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setTimeout(handleCategoryScroll, 150);
    }
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setTimeout(handleCategoryScroll, 150);
    }
  };

  useEffect(() => {
    const startCategoryAutoplay = () => {
      stopCategoryAutoplay();
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveCategory(prevActiveCategory => {
          const currentIndex = categoryIds.indexOf(prevActiveCategory);
          const nextIndex = (currentIndex + 1) % categoryIds.length;
          const nextCategory = categoryIds?.[nextIndex];
          if (nextCategory) {
            handleCategoryClick(nextCategory, true);
            return nextCategory;
          }
          return prevActiveCategory;
        });
      }, 3000);
    };

    startCategoryAutoplay();
    return () => stopCategoryAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (participants.length > 0) {
      const participantsInterval = setInterval(() => {
        nextSlide();
      }, 600000);
      return () => clearInterval(participantsInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants.length]);

  const redirectToHome = () => {
    window.location.href = "https://www.destiplus.com/";
  };

  const handleOpenVideoModal = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  return (
    <div className='burger-battle-container'>
      <div className='burger-battle-header'>
        <div className='burger-battle-title'>
          <h5>Desti <span className='burger-battle-brand'><strong>plus</strong></span></h5>
        </div>
        <div className='burger-battle-home-btn' onClick={redirectToHome}>
          <i className="fas fa-home burger-battle-home-icon"></i>
        </div>
      </div>

      <div className='burger-battle-hero'>
        <div className='burger-battle-hero-image'>
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dmyq0gr14/video/upload/v1749073039/Se_acab%C3%B3_el_misterio_Ya_conocemos_los_ingredientes_secretos_que_deber%C3%A1n_usar_los_participantes_de_esta_tercera_edici%C3%B3n_de_Batalla_de_Hamburguesas_y_no_fueron_f%C3%A1ciles._%EF%B8%8F_Cada_establecimiento_tendr%C3%A1_eui4ta.mp4"
            controls={!showPlayButton}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            poster="https://res.cloudinary.com/destinoplus/image/upload/v1746721138/dcyghr6nulheihralqbg.jpg"
          />
          {showPlayButton && (
            <button
              className='hero-play-button'
              onClick={handleOpenVideoModal}
              aria-label="Reproducir video en modal"
            >
              <PlayIcon />
            </button>
          )}
          <CldImage
            src="https://res.cloudinary.com/destinoplus/image/upload/v1746725955/d9gwhmgkcy1ywlozlhbi.png"
            alt="Logo Batalla de Hamburguesa Suesca"
            width={200} // Ajusta el ancho según necesites
            height={200} // Ajusta la altura según necesites
            className={'hero-logo'} // Añade una clase para estilos si es necesario
            priority // Considera si esta imagen es importante para la carga inicial
          />
        </div>
        <div className='burger-battle-hero-title'>
          <h2>Del 19 de JUN al 3 de JUL</h2>
        </div>
      </div>

      <div className='burger-battle-desc-header'>
        <div className='burger-battle-desc-title'>
          BATALLA DE HAMBURGUESAS <span className='burger-battle-highlight'>3.0</span>
        </div>
        <p className='burger-battle-desc-subtitle'>
          <span>¡Participa y elige al número 1 de Suesca!</span>
        </p>
        <div className='burger-battle-line-decor'>
          <div className='burger-battle-line'></div>
          <div className='burger-battle-arrow-circle'>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <div className='burger-battle-info-box'>
        <p>Cada restaurante deberá cocinar con un ingrediente secreto</p>
      </div>

      <div className='burger-battle-categories'>
        <h2 className='burger-battle-section-title'>¡Ingredientes!</h2>
        <div
          className='burger-battle-categories-wrapper'
          ref={categoriesRef}
          onScroll={handleCategoryScroll}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchEnd={handleTouchEnd}
        >
          {categoryIds.map((catId) => {
            let displayName = catId.charAt(0).toUpperCase() + catId.slice(1);
            let imageUrl = '';
            switch (catId) {
              case 'panela': displayName = 'Panela'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721712/l01hsxxropvcka9zqpgm.jpg'; break;
              case 'mango': displayName = 'Mango'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721739/fbypmbs101nd6vx7f8s9.jpg'; break;
              case 'maduro': displayName = 'Maduro'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721239/whhfvamkyuhonw6sun5h.png'; break;
              case 'lulo': displayName = 'Lulo'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721768/bi8g1njgzaeeixqjfkbg.jpg'; break;
              case 'pina': displayName = 'Piña'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721654/m0cw2ywnawexacirax7l.jpg'; break;
              case 'naranja': displayName = 'Naranja'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721721/bwlpafhrwhwo2mky7qic.jpg'; break;
              case 'champinones': displayName = 'Champiñones'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721872/mzrzi5mc2rtvyg6atfz8.jpg'; break;
              case 'cafe': displayName = 'Café'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721883/a5dcubjkpreoopefldvh.jpg'; break;
              case 'vino': displayName = 'Vino'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721890/myrvnj9krtumlye1fx3g.jpg'; break;
              case 'maracuya': displayName = 'Maracuya'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721728/ebhsjyltwpdgv0e8fvap.jpg'; break;
              case 'uchuva': displayName = 'Uchuva'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721196/objrw7w5mc5zxjxic22m.jpg'; break;
              case 'maiz': displayName = 'Maiz'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721750/plwj2bncidaixtnkdtoq.jpg'; break;
              case 'frutosRojos': displayName = 'Rojos'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721842/cmdj69unvqqruoqeuo4i.jpg'; break;
              case 'pimenton': displayName = 'Pimentón'; imageUrl = 'https://res.cloudinary.com/destinoplus/image/upload/v1746721699/bhusfj2a0kgxahvcsajo.jpg'; break;
              default: displayName = catId; imageUrl = '';
            }

            return (
              <button
                key={catId}
                className={`${'burger-battle-category'} ${activeCategory === catId ? 'active-b' : ''}`}
                onClick={() => handleCategoryClick(catId)}
                data-category={catId}
              >
                <CldImage
                  src={imageUrl}
                  alt={displayName}
                  width={80} // Ajusta el ancho
                  height={80} // Ajusta la altura
                  className={'img-ingredientes'}
                />
                <span>{displayName}</span>
              </button>
            );
          })}
        </div>

        <div className='burger-battle-categories-dots'>
          {categoryIds.map((category) => (
            <button
              key={category}
              className={`${'burger-battle-categories-dot'} ${activeCategory === category ? 'active-b' : ''}`}
              onClick={() => handleCategoryClick(category)}
              aria-label={`Ir a categoría ${category}`}
            />
          ))}
        </div>
      </div>

      <div className='burger-battle-carousel'>
        <h2 className='burger-battle-section-title'>Participantes</h2>
        <div className='burger-battle-carousel-container'>
          <div className='burger-battle-carousel-wrapper'>
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className={getItemClassName(index)}
              >
                <div className='burger-battle-card'>
                  <div className='burger-battle-card-image'>
                    <CldImage
                      src={participant.image}
                      alt={participant.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className='burger-battle-card-details'>
                    <div className='burger-battle-info-container'>
                      <div className='burger-battle-restaurant-logo'>
                        <CldImage
                          src={participant.logo}
                          alt={participant.restaurant}
                          width={80} // Ajusta el tamaño del logo
                          height={80}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className='burger-battle-text-container'>
                        <h3 className='burger-battle-burger-name'>{participant.name}</h3>
                        <p className='burger-battle-restaurant-name'>{participant.restaurant}</p>
                      </div>
                    </div>
                    <div className='burger-battle-price-area'>
                    </div>
                    <div className='burger-battle-stats'>
                      <span className='burger-battle-visitors'>
                        <strong>
                          {!isNaN(participant.price)
                            ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(participant.price)
                            : 'Precio no disponible'}
                        </strong>
                      </span>
                      <button
                        className='burger-battle-cta-btn'
                        onClick={() => handleVisitClick(participant.id)}
                      >
                        <span>Descúbrela</span>
                        <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={`${'burger-battle-carousel-arrow'} ${'left'}`} onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className={`${'burger-battle-carousel-arrow'} ${'right'}`} onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className='burger-battle-carousel-dots'>
            {participants.map((_, index) => (
              <div
                key={index}
                className={`${'burger-battle-carousel-dot'} ${index === currentIndex ? 'active-b' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='suesca-promo-section'>
        <div className='promo-section-header'>
          <h2 className='promo-section-title'>
            ¿Y Después de la Burger?
          </h2>
          <p className='promo-section-subtitle'>
            Encuéntralo todo en <span className='destiplus-brand'>Desti <span className='mas-promo'>plus</span></span>
          </p>
        </div>

        <div className='inspiration-cards-grid'>
          <a href="https://www.destiplus.com/destino/Suesca/actividades" className='inspiration-card'>
            <div className='inspiration-card-image'>
              <CldImage
                src="https://res.cloudinary.com/destinoplus/image/upload/v1734236561/cajbjyr4g2g7oizfgweu.jpg"
                alt="Aventuras"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='inspiration-card-overlay'></div>
            <div className='inspiration-card-content'>
              <i className="fas fa-hiking"></i>
              <h4>Aventuras</h4>
            </div>
          </a>

          <a href="https://www.destiplus.com/destino/Suesca/alojamiento" className='inspiration-card'>
            <div className='inspiration-card-image'>
              <CldImage
                src="https://res.cloudinary.com/destinoplus/image/upload/v1733937504/alojamientos/casona-quesada/e2pi6ecstwuou0ghf7xa.jpg"
                alt="Alojamientos"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='inspiration-card-overlay'></div>
            <div className='inspiration-card-content'>
              <i className="fas fa-bed"></i>
              <h4>Alojamientos</h4>
            </div>
          </a>

          <a href="https://www.destiplus.com/destino/Suesca/rutas" className="inspiration-card">
            <div className="inspiration-card-image"></div>
                <CldImage
                    src="https://res.cloudinary.com/destinoplus/image/upload/v1736911873/rutas/la-lucirnaga/wlzdyxviuowjjyexjelq.jpg"
                    alt="Miradores y Paisajes"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            <div className="inspiration-card-overlay"></div>
            <div className="inspiration-card-content">
              <i className="fas fa-map-marked-alt"></i>
              <h4>Rutas y Paisajes</h4>
            </div>
          </a>

          {/* Tarjeta 4: Gastronomía (Opcional, o dejar 3 más grandes) */}
          <a href="https://www.destiplus.com/destino/Suesca/restaurantes" className="inspiration-card">
            <div className="inspiration-card-image"></div>
                <CldImage
                    src="https://res.cloudinary.com/destinoplus/image/upload/v1735271082/zataxjvehdporgk9oasa.jpg"
                    alt="Restaurante"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            <div className="inspiration-card-overlay"></div>
            <div className="inspiration-card-content">
              <i className="fas fa-utensils"></i>
              <h4>Sabores Únicos</h4>
            </div>
          </a>

        </div>
        {/* === Fin Grid de Tarjetas === */}


        {/* --- Botón de Llamada a la Acción (Mantenemos el anterior) --- */}
        <button
          className="promo-cta-button"
          onClick={() => window.location.href = 'https://www.destiplus.com/destino/Suesca'}
        >
          <span>¡Anímate a Explorar Suesca!</span>
          <i className="fas fa-arrow-right arrow-icon"></i>
        </button>

      </div>
      {/* === Fin Nueva Sección Promocional === */}


      {/* Footer */}
      <footer style={{ width: '100%', padding: '40px 7%', backgroundColor: '#ffffff', borderTop: '1px solid #eaeaea' /* Borde superior opcional */, marginTop: '20px' }}>

        {/* Enlaces Sociales - Estilo más minimalista */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '25px' }}>
          <a
            href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA"
            aria-label="Facebook"
            style={{ color: '#666', textDecoration: 'none', fontSize: '24px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'} // Hover verde
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/batalladehamburguesas_/"
            aria-label="Instagram"
            style={{ color: '#666', textDecoration: 'none', fontSize: '24px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'} // Hover verde
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <i className="fab fa-instagram"></i>
          </a>
          {/* Añade más redes si es necesario */}
        </div>

        {/* Enlaces Rápidos - Estilo estándar de enlaces */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px 25px', marginBottom: '25px' }}>
          <a
            href="https://www.destiplus.com/"
            // Podrías usar una clase como .quick-link si la tienes definida
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Inicio
          </a>
          <a
            href="https://www.google.com/maps/place/Suesca,+Cundinamarca/@5.1023645,-73.8008345,376m/data=!3m1!1e3!4m6!3m5!1s0x8e401481a06da0a7:0x8dcabdf79b176aca!8m2!3d5.103929!4d-73.798632!16s%2Fm%2F02qnm70?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D" // Revisa este enlace
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Ubicación
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100092877753209&locale=es_LA" // Enlace a FB para términos? Revisar.
            style={{ color: '#666', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#00cd70'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Términos y Condiciones
          </a>
          {/* Añade más enlaces rápidos si es necesario */}
        </div>

        {/* Información de Contacto */}
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-envelope" style={{ marginRight: '8px', color: '#fd5959' }}></i>
            {/* Enlace de correo */}
            <a href="mailto:batalladehamburguesas@gmail.com" style={{ color: '#666', textDecoration: 'none' }}>batalladehamburguesas@gmail.com</a>
          </p>
          {/* Podrías añadir un copyright o el nombre de tu empresa */}
          <p style={{ marginTop: '20px', fontSize: '12px', opacity: '0.8' }}>
            &copy; {new Date().getFullYear()} Destiplus.com | Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* --- MODAL DEL VIDEO --- */}
      {isModalOpen && (
        <div className="video-modal-overlay" onClick={handleCloseModal}> {/* Overlay que cierra al hacer clic */}
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()} // Evita que el clic DENTRO del modal lo cierre
          >
            <button
              className="video-modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            >
              &times; {/* Icono simple de 'X' para cerrar */}
            </button>
            <video
              ref={modalVideoRef} // Ref para el video del modal
              src="https://res.cloudinary.com/dmyq0gr14/video/upload/v1749073039/Se_acab%C3%B3_el_misterio_Ya_conocemos_los_ingredientes_secretos_que_deber%C3%A1n_usar_los_participantes_de_esta_tercera_edici%C3%B3n_de_Batalla_de_Hamburguesas_y_no_fueron_f%C3%A1ciles._%EF%B8%8F_Cada_establecimiento_tendr%C3%A1_eui4ta.mp4" // MISMA URL del video
              controls // <-- ¡IMPORTANTE! Añade los controles nativos
              autoPlay // <-- Para que empiece al abrir el modal
              playsInline // Buena práctica
             // loop // Decide si quieres que haga loop en el modal o no
              className="video-in-modal" // Clase para estilos específicos del video modal
            />
          </div>
        </div>
      )}
      {/* --- FIN MODAL DEL VIDEO --- */}
    </div>
  );
};

export default BurgerBattle;