'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HandPlatter, Star, MapPin, Loader2, ArrowLeft, Share } from 'lucide-react'; // Iconos Lucide
import VotingModal from './votingModal'; // Ajusta ruta si es necesario
import NotificationModal from './notificacion'; // Ajusta ruta si es necesario
import axios, { AxiosError } from 'axios'; // Mantenemos axios como en el original
import { CldImage } from 'next-cloudinary';

const formatCurrency = (amount: number | string | null | undefined): string => {
    // Convierte a número por si acaso llega como string
    const numericAmount = Number(amount);
  
    // Si no es un número válido (ej. null, undefined, texto), devuelve algo por defecto
    if (isNaN(numericAmount)) {
      // Puedes devolver 'N/A', '$ 0', '$ ---', o lo que prefieras
      return '$ 0';
    }
  
    // Usa la API Intl para formatear
    return new Intl.NumberFormat('es-CO', { // 'es-CO' para formato colombiano
      style: 'currency',        // Indica que es moneda
      currency: 'COP',          // Especifica Pesos Colombianos
      minimumFractionDigits: 0, // Sin decimales
      maximumFractionDigits: 0  // Sin decimales
    }).format(numericAmount); // Formatea el número
};

const API_BASE_URL = "https://tree-suesca-backend-production.up.railway.app/api/v1";

interface ErrorResponse {
    detail?: string;
}

interface BurgerProfileClientProps {
    burgerId: string;
}

// --- Componente Principal ---
const BurgerProfileClient: React.FC<BurgerProfileClientProps> = ({ burgerId }) => {
    const router = useRouter();

    interface VotePayload {
        burger_id: number;
        rating: number;
        // Otros campos del formulario del modal si los envías
        email?: string;
        full_name?: string;
        recommendations?: string | null;
        origin?: string | null;
        burger_name?: string; // Opcional si el backend lo obtiene por ID
        restaurant_name?: string; // Opcional si el backend lo obtiene por ID
    }
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
        ingrediente_img: string;
        votes: number;
        location: {
          lat: number;
          lng: number;
        };
    }
    const [participants] = useState<Participant[]>([
        {
          id: 1,
          name: "Terraza",
          restaurant: "Terraza",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056160/puzcgyebo8lqaqpyjmkf.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721281/wmz2sj60iuvl8eswhzdz.jpg",
          visitors: 46,
          price: 16000,
          description: "Terraza es una hamburguesa jugosa y deliciosa, con carne de res tierna, cocida al carbón y servida en un pan suave y fresco. La carne está acompañada de una reducción de uchuva, tocineta y whisky, salsas cremosas y pepinillos, que aportan un toque crujiente y ácido, y un queso derretido que une todos los sabores. Cada bocado es una experiencia de sabores y texturas que te hará querer más.",
          specialIngredient: "Uchuva",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721196/objrw7w5mc5zxjxic22m.jpg",
          votes: 0,
          location: { "lat": 5.102700, "lng": -73.797749 }
        },
        {
          id: 2,
          name: "La Gloria",
          restaurant: "Cacique Burguer",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055031/wanllxqb4v4oytbx3khq.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721515/kdennvrlqzyd0lrmuec3.jpg",
          visitors: 38,
          price: 16000,
          description: "!Oh, la gloria echa hamburguesa! Imagina un lecho dorado de pan brioche con semillas de chía abrazando una joya de carne 100% de res moldeada con amor y lista para liberar sus jugos acompañada de una tajada de queso blanco doble crema, sobre ella, la frescura vibrante de los vegetales danza en armonía con la dulzura intrigante de una mermelada de pimentón, un toque agri dulce que despierta los sentidos. Y para culminar esta sinfonía de sabores, la tocineta ahumada cruje con su promesa salada mientras que el jamón añade una capa extra de indulgencia. !Cada mordisco es una explosión de texturas y sabores que te harán suspirar de puro placer.",
          specialIngredient: "Pimentón",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721699/bhusfj2a0kgxahvcsajo.jpg",
          votes: 0,
          location: { "lat": 5.088006, "lng": -73.790932 }
        },
        {
          id: 3,
          name: "Deep Purple",
          restaurant: "Arca Rock",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056258/dgg8felik5fgvxqa2vbt.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721490/zqbrxrfk5n59t1zkbkxo.jpg",
          visitors: 52,
          price: 16000,
          description: "La estrella indiscutible del escenario. Una sinfonía de sabores que arranca con un riff de umami y termina en un solo de sabor inolvidable. La DEEP PURPLE no es solo una hamburguesa: es una experiencia sensorial. Carne jugosa y perfectamente sazonada, con notas profundas gracias a su preparación con tintes de vino tinto. La acompaña un repollo morado salteado en salsa bordelesa, fusión de dulzura y carácter. Doble golpe de sabor con mozzarella cremosa y cheddar fundido, coronados con un crocante de jamón de cerdo bañado en una intensa salsa bourguignonne. Cada bocado es una balada eléctrica para tu paladar: audaz, elegante y absolutamente inolvidable. Solo apta para quienes sienten el sabor en estereo y viven la vida a todo volumen.",
          specialIngredient: "Vino",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721890/myrvnj9krtumlye1fx3g.jpg",
          votes: 0,
          location: { "lat": 5.101383, "lng": -73.797573 }
        },
        {
          id: 4,
          name: "Fuera de Serie",
          restaurant: "Lo Nuestro",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056750/szhhck2etj0wape71z26.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721854/mj7ew6hjdv24wqsp3rnh.jpg",
          visitors: 61,
          price: 16000,
          description: "Fuera de serie es una hamburguesa gourmet que desafía los límites del sabor, con una base fresca de vegetales que aportan textura y un toque natural, acompañados de un glaceado de maracuyá que equilibra con su dulce acidez tropical. Su Carne es 100% artesanal sazonada con especias secretas, cocinada al grill y al punto perfecto para mantener su jugosidad, sobre esta trocitos de bacon salteados con una deliciosa crema de whisky, que añade un contraste seductor entre lo salado y el destilado, finalmente un puñado de papas crocantes tipo fosforito aportando un crunch irresistible en cada bocado. Todo esto dentro de un pan artesanal suave, con esencia de maracuyá, que une todos los sabores y aromas en un abrazo dulce y esponjoso. Una explosión de texturas y sabores donde lo fresco, lo ahumado, lo tropical y lo crocante se fusionan en una experiencia gastronómica única.",
          specialIngredient: "Maracuyá",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721728/ebhsjyltwpdgv0e8fvap.jpg",
          votes: 0,
          location: { "lat": 5.104041, "lng": -73.800171 }
        },
        {
          id: 5,
          name: "La Conquistadora",
          restaurant: "Texas Burguer",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055248/on6j3bt24o9nlmunnwwk.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721792/udbn3mgoaero4yy4vlir.jpg",
          visitors: 46,
          price: 16000,
          description: "La Conquistadora no es una hamburguesa cualquiera. Es el trabajo apasionado de almas que viven la gastronomía y la ganadería como un arte, que han unido su experiencia para crear una receta que enamore, su carne jugosa, marcada por el fuego como una insignia de honor. La acompaña una sinfonía de sabores: salsas cuidadosamente elaboradas, ingredientes frescos y seleccionados, y un pan de maíz artesanal que envuelve cada bocado como una armadura dorada. Es una hamburguesa hecha para conquistar paladares exigentes y corazones valientes. No llega sola: llega con historia, con alma y mucho amor.",
          specialIngredient: "Maíz",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721750/plwj2bncidaixtnkdtoq.jpg",
          votes: 0,
          location: { "lat": 5.102645, "lng": -73.798458 }
        },
        {
          id: 6,
          name: "La Guerrera de Lulo",
          restaurant: "Crucero",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056345/qbuma5fjob1nzlxzbanw.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721472/o673xcuzwhloip00sakf.jpg",
          visitors: 38,
          price: 16000,
          description: "En el corazón de Suesca nace una fusión inesperada y brutal: La Guerrera de Lulo, una hamburguesa que desafía lo común con el sabor tropical del lulo. Mezclamos lo mejor del campo para crear una experiencia única: carne jugosa, crocancia explosiva y una salsa artesanal de lulo con toques cítricos y dulces que remata cada bocado. Es más que una hamburguesa: es un homenaje a nuestras raíces, a la vereda, al sabor rebelde y auténtico que solo CRUCERO sabe entregar.",
          specialIngredient: "Lulo",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721768/bi8g1njgzaeeixqjfkbg.jpg",
          votes: 0,
          location: { "lat": 5.102165, "lng": -73.799732 }
        },
        {
          id: 7,
          name: "La Vikinga",
          restaurant: "Villa Hamburguesa",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055560/quxsz5idifv0sckmbzum.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721379/wh1gymjaeuhz2hlfg73j.jpg",
          visitors: 52,
          price: 16000,
          description: "Una hamburguesa indomable, inspirada en los banquetes nórdicos. Carne jugosa a la plancha,, coronada con salsa de champiñones salteados en mantequilla, ajo, cebolla y vino blanco , con un toque de tomate confitado con albahaca. Todo esto entre pan artesanal rústico en forma de dona, dorado como escudo de guerra. La Vikinga no se come. Se conquista.",
          specialIngredient: "Champiñones",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721872/mzrzi5mc2rtvyg6atfz8.jpg",
          votes: 0,
          location: { "lat": 5.103729, "lng": -73.800158 }
        },
        {
          id: 8,
          name: "La Ahumadita",
          restaurant: "Don Toño",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056695/zeiurbncwoh3hi2keiml.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721357/smnu6jofmm3d86fjgmyx.jpg",
          visitors: 61,
          price: 16000,
          description: "Don toño ahumados es un lugar en el parque principal de suesca, un lugar especial, en donde el ahumado es el protagonista, no comparable, un espacio original. Nuestra hamburguesa con toques ahumados esta creada para combinarse con los demás ingredientes y fascinar en el paladar!.",
          specialIngredient: "Maduro",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721239/whhfvamkyuhonw6sun5h.png",
          votes: 0,
          location: { "lat": 5.103808, "lng": -73.799205 }
        },
        {
          id: 9,
          name: "La Bendita",
          restaurant: "Palo Santo",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056612/vdasiay9bz559v51vkcv.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721330/cyw08ddfvmlhmqosarn2.jpg",
          visitors: 46,
          price: 16000,
          description: "La Bendita es una hamburguesa que desafía lo convencional y eleva el sabor a un nivel celestial. Su base de carne artesanal se combina con el toque jugoso del cerdo y la frescura de la espinaca, tomate y cebolla, creando una armonía perfecta. La salsa de la casa, con su receta secreta, realza cada bocado con una explosión de sabor único. Pero el toque definitivo lo aporta la deliciosa piña, que con su dulzura tropical transforma cada mordisco en una experiencia inolvidable. La Bendita no es solo una hamburguesa, es una revelación de sabor que te hará volver por más.",
          specialIngredient: "Piña",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721654/m0cw2ywnawexacirax7l.jpg",
          votes: 0,
          location: { "lat": 5.102658, "lng": -73.798251 }
        },
        {
          id: 10,
          name: "Mango Breeze",
          restaurant: "Amore Pizza",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056435/rtinbovb7o8udqwrqcxr.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721782/gordtfirjpujbiait6ur.jpg",
          visitors: 38,
          price: 16000,
          description: "Al primer bocado, la suavidad del pan brioche se combina con la jugosidad de la carne artesanal, el queso fundido añade una cremosidad irresistible, mientras que la tocineta crujiente aporta un toque salado y textura. Las cebollas caramelizadas ofrecen una dulzura equilibrada y la mermelada de mango y plátano sorprende con un contraste exótico, la lechuga y el tomate añaden frescura y equilibrio, haciendo de cada bocado una experiencia única.",
          specialIngredient: "Mango",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721739/fbypmbs101nd6vx7f8s9.jpg",
          votes: 0,
          location: { "lat": 5.101043, "lng": -73.796932 }
        },
        {
          id: 11,
          name: "Craff Burger",
          restaurant: "La Parrilla de Juancho",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055827/gx3ogqvi3czw6p9vpezw.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721305/fjshp3eytuvai3z48ogy.jpg",
          visitors: 52,
          price: 16000,
          description: "La llamamos Craft Burger, como un tributo a lo hecho con las manos, con el alma y en familia.",
          specialIngredient: "Naranja",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721721/bwlpafhrwhwo2mky7qic.jpg",
          votes: 0,
          location: { "lat": 5.102663, "lng": -73.799183 }
        },
        {
          id: 12,
          name: "La Crazy Crunch",
          restaurant: "Dorilocos La Roca",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749056508/rv7h14gyt2xtr6j9xbe6.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721424/zzbgw6xporkrjbcflsrj.jpg",
          visitors: 61,
          price: 16000,
          description: "Una locura entre panes. La hamburguesa CraziCrunch es una bomba de sabor que no pide permiso: 140g de carne artesanal jugosa, queso cheddar fundido, tocineta crujiente, deditos de chorizo dorados a la plancha, cebolla crispy con toque dulce, lechuga crespa y tomate fresco. Todo coronado con nuestra salsa secreta de la casa y abrazado por un pan brioche dorado con mantequilla de café. Una experiencia intensa, crujiente y adictiva.¡Es calle, es sabor, es CraziCrunch!",
          specialIngredient: "Café",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721883/a5dcubjkpreoopefldvh.jpg",
          votes: 0,
          location: { "lat": 5.103711, "lng": -73.799553 }
        },
        {
          id: 13,
          name: "La Cumbambeña",
          restaurant: "Cumbamba",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055729/udgoytef8zrlyfd5qfok.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721401/bxyumnz1bwmuqllbwpat.jpg",
          visitors: 46,
          price: 16000,
          description: "Para este 2025 nuestra hamburguesa la favorita de la casa, resalta la magia del sabor de nuestra Jugosa carne de hamburguesa artesanal bañada en una suave salsa de panela hecha cocada que resalta los sabores intensos de la manzana y el tocino serrano en un suave pan de mantequilla llevándonos a disfrutar de sabores únicos y atrevidos",
          specialIngredient: "Panela",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721712/l01hsxxropvcka9zqpgm.jpg",
          votes: 0,
          location: { "lat": 5.103480, "lng": -73.799466 }
        },
        {
          id: 14,
          name: "La Oriental",
          restaurant: "Monopizza Gourmet",
          image: "https://res.cloudinary.com/destinoplus/image/upload/v1749055364/cjcsaoyxx5grvyrtytm6.jpg",
          logo: "https://res.cloudinary.com/destinoplus/image/upload/v1746721802/kjwd5jreolrrpcpzturq.jpg",
          visitors: 38,
          price: 16000,
          description: "Una hamburguesa innovadora y llena de sabores, con carne de res servida en pan de la casa. Vegetales que aportan frescura, mientras que la reducción de frutos rojos en aguardiente agrega un toque dulce y sofisticado. La cebolla caramelizada añade un sabor profundo y la carne mixta picada al estilo shawarma aporta un toque exótico y especiado. Una explosión de sabores en cada mordisco.",
          specialIngredient: "Frutos rojos",
          ingrediente_img: "https://res.cloudinary.com/destinoplus/image/upload/v1746721842/cmdj69unvqqruoqeuo4i.jpg",
          votes: 0,
          location: { "lat": 5.103129, "lng": -73.799425 }
        }
    ]);

    const [burgerData, setBurgerData] = useState<Participant | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBurgerForVote, setSelectedBurgerForVote] = useState<Participant | null>(null);
    const [voteCount, setVoteCount] = useState<number | null>(null);
    const [isLoadingCount, setIsLoadingCount] = useState(true);
    const [hasVotedLocally, setHasVotedLocally] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Efecto para encontrar la hamburguesa actual y verificar voto local
    useEffect(() => {
        console.log("BurgerProfileClient: Buscando datos para burgerId:", burgerId);
        const burgerIdNum = parseInt(burgerId, 10);
        const currentBurger = participants.find(p => p.id === burgerIdNum);

        if (currentBurger) {
            setBurgerData(currentBurger);
            const votedKey = `voted_burger_${currentBurger.id}`;
            const alreadyVoted = localStorage.getItem(votedKey) === 'true';
            setHasVotedLocally(alreadyVoted);
            console.log(`Burger encontrada: ${currentBurger.name}, Votado localmente: ${alreadyVoted}`);
        } else {
            setBurgerData(null);
            setHasVotedLocally(false);
            console.error(`Burger con ID ${burgerId} no encontrada.`);
            // Opcional: Redirigir si no se encuentra
            // router.replace('/batalla'); // O a una página 404 personalizada
        }
        // Resetear otros estados
        setIsLoadingCount(true);
        setVoteCount(null);
    }, [burgerId]);

    // Efecto para obtener el conteo de votos
    useEffect(() => {
        const burgerIdNum = parseInt(burgerId, 10);
        if (burgerIdNum && burgerData) { // Solo si tenemos ID numérico y datos de la burger
            setIsLoadingCount(true);
            setVoteCount(null); // Resetear antes de buscar
            const source = axios.CancelToken.source();
            console.log(`Workspaceing vote count for burger ID: ${burgerIdNum}`);

            axios.get(`${API_BASE_URL}/votes/burger/${burgerIdNum}/count`, { cancelToken: source.token })
                .then(response => {
                    setVoteCount(response.data.vote_count ?? 0); // Asume 0 si no viene count
                })
                .catch(error => {
                    if (!axios.isCancel(error)) {
                        console.error("Error fetching vote count:", error);
                        setVoteCount(0); // Asume 0 en caso de error
                    }
                })
                .finally(() => {
                    setIsLoadingCount(false);
                });

            return () => { source.cancel('Fetching vote count canceled.'); };
        } else {
            setIsLoadingCount(false); // No buscar si no hay burgerId válido o burgerData
            setVoteCount(null);
        }
    }, [burgerId, burgerData]); // Ejecutar si cambia el ID o burgerData


    // --- HANDLERS ---

    const handleGoBack = () => router.push('https://www.destiplus.com/destino/Suesca/parchar/batalla');

    const handleShare = () => {
        if (!burgerData) return;
        
        if (navigator.share) {
          navigator.share({
            title: burgerData.name,
            text: `¡Mira esta increíble hamburguesa: ${burgerData.name} de ${burgerData.restaurant}!`,
            url: window.location.href,
          })
          .catch((error) => console.log('Error al compartir:', error));
        } else {
          alert('La función de compartir no está disponible en este navegador.');
        }
    };

    const handleDirections = () => {
        if (burgerData?.location?.lat && burgerData?.location?.lng) {
            const { lat, lng } = burgerData.location;
            // Abrir Google Maps con las coordenadas del restaurante
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            alert("Ubicación del establecimiento no disponible.");
        }
    };

    const handleVote = () => {
        if (!burgerData) {
          alert("No se han podido cargar los datos de la hamburguesa.");
          return;
        }
        setSelectedBurgerForVote(burgerData);
        setIsModalOpen(true);
    };

    console.log(handleVote)

    const handleActualSubmitVote = async (voteData: { rating: number }) => {
        if (!burgerData) return;
        const payload: VotePayload = {
            burger_id: burgerData.id,
            rating: voteData.rating
        };
        setShowNotificationModal(false);
        console.log('Enviando voto:', payload);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/votes/batalla`,
                voteData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 201) {
                console.log('Voto creado:', response.data);
                setIsModalOpen(false);
                setVoteCount(prevCount => (prevCount !== null ? prevCount + 1 : 1));
                const votedKey = `voted_burger_${burgerData.id}`;
                localStorage.setItem(votedKey, 'true');
                setHasVotedLocally(true);
                // Mostrar el modal de éxito
                setShowSuccessModal(true);
            } else {
                console.warn("Respuesta inesperada con status 2xx:", response);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error al enviar el voto (axios):', error);
            setIsModalOpen(false);
      
            let userMessage = "Ocurrió un error al enviar tu voto. Inténtalo de nuevo.";
      
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                const detail = axiosError.response?.data?.detail;
      
                if (axiosError.response?.status === 409) {
                  console.warn('Voto duplicado detectado (409)');
                  setNotificationMessage("No puedes votar 2 veces por este participante");
                  setShowNotificationModal(true);
                  return;
                } else if (axiosError.response?.status === 422) { // Error de validación
                  userMessage = "Hubo un problema con los datos enviados. Por favor, revisa el formulario.";
                  console.error("Detalles Validación (422):", detail);
                } else { // Otros errores del servidor
                  userMessage = typeof detail === 'string' ? detail : `Error del servidor (${axiosError.response?.status}).`;
                }
            } else if (error instanceof Error) {
                userMessage = `Ocurrió un error inesperado: ${error.message}`;
            } else {
                userMessage = 'Ocurrió un error inesperado';
            }
            setNotificationMessage(userMessage);
            setShowNotificationModal(true);
        }
    };

    // --- RENDERIZADO ---
    if (!burgerData) {
        return (
            <div className="loading-container">
                 <Loader2 className="animate-spin" size={48} />
                 <p>Buscando hamburguesa...</p>
             </div>
        );
    }

    return (
        <div className="burger-profile-container">
            {/* Header */}
            <div className="burger-profile-header">
                <button className="burger-profile-back" onClick={handleGoBack} aria-label="Volver"><ArrowLeft /></button>
                <button className="burger-profile-share" onClick={handleShare} aria-label="Compartir"><Share /></button>
            </div>

            {/* Hero Image */}
            <div className="burger-profile-hero" style={{ position: 'relative', width:'100%', aspectRatio: '16/10' /* Ajusta */ }}>
                <CldImage
                    src={burgerData.image} // USA PUBLIC ID
                    alt={burgerData.name}
                    fill
                    priority
                    className="burger-profile-image" // Para estilos adicionales si necesitas
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                />
            </div>

            {/* Content Area */}
            <div className="burger-profile-content">
                {/* Main Info */}
                <div className="burger-profile-main-info">
                    <h2 className="burger-profile-name">{burgerData.name}</h2>
                    <div className="burger-profile-restaurant-info-inline">
                        <CldImage src={burgerData.logo} alt={burgerData.restaurant} width={32} height={32} style={{ objectFit: 'contain', borderRadius:'50%' }} className="burger-profile-restaurant-logo-inline" />
                        <span className="burger-profile-restaurant-name-inline">{burgerData.restaurant}</span>
                    </div>
                    <div className="burger-profile-vote-count-inline">
                        <Star size={16} className="star-icon-inline" />
                        <span>{isLoadingCount ? '...' : (voteCount ?? 0)} Votos</span>
                    </div> 
                    {burgerData.specialIngredient && (
                        <div className="burger-profile-special-tag" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            marginTop: '16px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                flex: 1
                            }}>
                                <CldImage
                                    src={burgerData.ingrediente_img}
                                    alt={burgerData.specialIngredient}
                                    width={48}
                                    height={48}
                                    style={{ 
                                        objectFit: 'contain', 
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ 
                                        fontSize: '0.85rem', 
                                        color: '#666',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>Ingrediente Secreto</span>
                                    <span style={{ 
                                        fontSize: '1.1rem', 
                                        color: '#333',
                                        fontWeight: 600,
                                        marginTop: '2px'
                                    }}>{burgerData.specialIngredient}</span>
                                </div>
                            </div>
                        </div>
                    )}
                     <div className="burger-profile-price-votes-area">
                        <p className={`${"burger-profile-card-price"} ${"prominent"}`}>
                            <strong>{formatCurrency(burgerData.price)}</strong>
                        </p>
                     </div>
                </div>

                {/* Description */}
                <div className="burger-profile-description-section">
                    <h3 className="section-title"><HandPlatter size={18} /> Descripción</h3>
                    <p className="description-text">
                        {burgerData.specialIngredient ? burgerData.description.split(burgerData.specialIngredient).map((part, index, array) => ( index === array.length - 1 ? part : <React.Fragment key={index}>{part}<span className="burger-profile-highlight">{burgerData.specialIngredient}</span></React.Fragment> )) : burgerData.description}
                    </p>
                </div>

                 {/* Messages */}
                <div className="burger-profile-messages">
                    {/* Errores/Éxito de Submit ahora se muestran en el modal */}
                </div>

                <div style={{ height: '100px' }}></div> {/* Spacer */}
            </div>

            {/* Fixed Actions */}
            <div className="burger-profile-actions">
                <button className={`${"burger-profile-btn"} ${"directions"}`} onClick={handleDirections} disabled={!burgerData.location?.lat}>
                    <MapPin size={18} /><span>Cómo llegar</span>
                </button>
                <button className={`${"burger-profile-btn"} ${"vote"}`} disabled={hasVotedLocally}>
                    {hasVotedLocally ? (<>✓<span> Votado</span></>)
                     : (<><Star size={18} /><span> Votar</span></>)}
                </button>
            </div>

            {/* Modals */}
            {selectedBurgerForVote && (
                <VotingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    burger={selectedBurgerForVote}
                    onSubmit={handleActualSubmitVote}
                />
            )}
            <NotificationModal
                isOpen={showNotificationModal}
                message={notificationMessage}
                duration={4000}
                onClose={() => setShowNotificationModal(false)}
                type="error"
            />

            {/* Modal de Éxito */}
            {showSuccessModal && (
                <div className="voting-modal-overlay" onClick={() => setShowSuccessModal(false)}>
                    <div className="voting-modal-content success-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}>&times;</button>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <h3 style={{ 
                                fontSize: '24px', 
                                color: '#B71C1C', 
                                marginBottom: '15px',
                                fontFamily: 'Bebas Neue, sans-serif'
                            }}>
                                ¡Voto Registrado!
                            </h3>
                            <p style={{ 
                                fontSize: '16px', 
                                color: '#666', 
                                marginBottom: '25px',
                                lineHeight: '1.5'
                            }}>
                                Gracias por participar en la Batalla de Hamburguesas de Suesca.
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '12px',
                                marginTop: '20px'
                            }}>
                                <a 
                                    href="https://www.destiplus.com/destino/Suesca/parchar/batalla"
                                    className="modal-action-link"
                                    style={{
                                        display: 'block',
                                        padding: '12px 20px',
                                        backgroundColor: '#B71C1C',
                                        color: 'white',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#9f1818'}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#B71C1C'}
                                >
                                    Descubre más hamburguesas
                                </a>
                                <a 
                                    href="https://www.destiplus.com/"
                                    className="modal-action-link"
                                    style={{
                                        display: 'block',
                                        padding: '12px 20px',
                                        backgroundColor: '#f5f5f5',
                                        color: '#333',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e5e5e5'}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                >
                                    Explora más de Suesca
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerProfileClient;