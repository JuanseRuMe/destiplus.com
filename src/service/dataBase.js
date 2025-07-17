const datosDestinos = {
    "destinos": [
      {
        "id": 1,
        "municipio": "Suesca",
        "departamento": "Cundinamarca",
        "frase": "Paraíso para escaladores.",
        "descripcion": "Donde las rocas cuentan historias de conquistadores antiguos.",
        "epocas": "Suesca es top todo el año. De diciembre a marzo, con clima seco y soleado, ideal para escalar y tirarse un buen senderismo, con temperaturas entre 8°C y 20°C. Julio y agosto son perfectos para ver atardeceres brutales. En abril-mayo y octubre-noviembre, aunque llueve más, el paisaje se pone bien verde, aunque esos meses no son los más populares para escalar. Un dato: si vas entre semana, vas a encontrar más calma y menos gente.",
        "clima": "Suesca tiene el clima perfecto para la aventura: mañanas frescas, días soleados y atardeceres de lo más chéveres. Lleva una chaqueta rompevientos, ropa en capas, zapatos cómodos, bloqueador, gorra, snacks y harto agüita. ¡Y no olvides la cámara para sacar fotos de todas tus hazañas!",
        "seguridad": "¡Explora Suesca como todo un experto! Mantén tus cosas seguras en lugares concurridos y haz actividades con guías certificados. Camina en grupo por los senderos señalizados y avisa a alguien sobre tu ruta. Lleva los contactos de emergencia y algo de efectivo, pero no te sobrecargues, que en el pueblo hay cajeros. Tip extra: los locales son muy buena onda, ¡si necesitas ayuda, no dudes en pedirla!",
        "transporte": "¡Llegar a Suesca ya es toda una aventura! Desde Bogotá, agarra la Autopista Norte hacia Tocancipá y sigue las señales (unos 45 minutos en carro). Si vas en bus, los de \"Alianza\" salen cada hora desde la Terminal del Norte; siéntate a la derecha para gozar las vistas. Ya en el pueblo, todo se puede recorrer a pie, pero si necesitas, siempre hay taxis locales disponibles.",
      },
      {
        "id": 2,
        "municipio": "Sesquilé",
        "departamento": "Cundinamarca",
        "frase": "Tierra Ancestral Muisca",
        "descripcion": "Donde la herencia muisca y la belleza andina crean un paraíso único.",
        "epocas": "Sesquilé es un destino chévere todo el año, pero hay épocas que lo hacen aún más especial. En diciembre y enero, los cielos despejados son perfectos para hacer actividades náuticas en el embalse. En Semana Santa, el pueblo se llena de un ambiente religioso único, y en noviembre, el Festival de la India Infiel trae desfiles y música folclórica para celebrar la cultura local.",
        "clima": "El clima en Sesquilé es típico de la región andina, con temperaturas entre 12 y 18 grados. Las mañanas son fresquitas y las tardes soleadas, perfectas para caminar y hacer planes al aire libre. Eso sí, lleva un abrigo ligero porque en la noche hace más frío. ¡Prepárate para respirar aire puro y llenarte de energía!",
        "seguridad": "Sesquilé es un lugar tranquilo y seguro, con gente súper amable que siempre recibe a los turistas con buena onda. Eso sí, es importante cuidarte un poquito: mejor no vayas solo por lugares solitarios, especialmente en la noche. Si vas a hacer rutas a sitios alejados, lo ideal es ir acompañado, nunca solo. También pilas con tus cosas en lugares concurridos, y listo, ¡disfruta sus calles y paisajes con toda la confianza!",
        "transporte": "Para llegar a Sesquilé desde Bogotá, puedes tomar una flota que vaya para Guatavita. Busca las empresas Valle de Tenza o Flota Águila, esas te dejan justo en el parque principal de Sesquilé. Ya estando en el pueblo, puedes coger un taxi o un mototaxi súper relajado que te lleva a donde necesites. Si vas en carro, toma la Autopista Norte y sigue las señales hacia Sesquilé o Guatavita, que quedan cerquita. El viaje es de unos 40 minutos y el camino está lleno de paisajes increíbles del altiplano cundiboyacense. ¡Desde el trayecto ya empieza la aventura!",
      }
    ],
    "restaurante": [
      {
        "id": 28,
        "name": "Wang long comida china",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "En Wang Long Sesquilé descubre una auténtica experiencia de sabores, donde nuestro pollo broaster crujiente y jugoso se ha convertido en el favorito. Disfruta de nuestro delicioso arroz chino preparado con ingredientes frescos y la sazón tradicional, junto a una variada carta.",
        "precio_promedio": 38000,
        "horario": {
          "abren": "11:00 am",
          "cierran": "8:30 pm"
        },
        "metodosdepago": "Billeteras digitales y efectivo. ",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 15,
        "name": "El Cacique Gourmet",
        "items": {
          "Tipo": "Gastro-Bar"
        },
        "concepto": "Un lugar donde la cocina gourmet se fusiona con la vibra underground. Disfruta sabores únicos de día y noches llenas de pop y rock con estilo auténtico. ¡Tu experiencia, nuestra esencia!",
        "precio_promedio": 39900,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "11:30 PM"
        },
        "metodosdepago": "Efectivo, Billeteras digitales y tarjetas.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 11,
        "name": "Villa Hamburguesa ",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "Un espacio donde lo cotidiano se transforma en extraordinario. En Villa Hamburguesa, celebramos la comida con creatividad, calidad y un ambiente lleno de energía. Aquí, cada detalle importa, desde los ingredientes frescos hasta el sabor que te hará volver una y otra vez. ¡No es solo comida rápida, es una experiencia que despierta tus sentidos! .",
        "precio_promedio": 25000,
        "horario": {
          "abren": "5:00 PM",
          "cierran": "9:30 PM"
        },
        "metodosdepago": "Efectivo, nequi, daviplata.",
        "servicios": {
          "delivery": "No disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 29,
        "name": "La Iguana Café",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "¡Bienvenidos a La Iguana Café! Donde la variedad se encuentra en cada bocado. Desde platos a la carta exquisitamente preparados hasta deliciosas comidas rápidas y refrescantes ensaladas de frutas, nuestra cocina ofrece una experiencia gastronómica diversa y llena de sabor. Ven y disfruta de nuestro ambiente acogedor y nuestros sabores únicos, diseñados para satisfacer todos los gustos y ocasiones.",
        "precio_promedio": 25000,
        "horario": {
          "abren": "11:45 am",
          "cierran": "10:00 pm"
        },
        "metodosdepago": "Billeteras digitales y efectivo.",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 24,
        "name": "Dorilocos La Roca",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "¡El lugar donde tus antojos encuentran su punto máximo de locura!  Aquí, las botanas épicas se encuentran con la velocidad de la buena comida. Nuestros dorilocos están cargados de sabor, con combinaciones explosivas que te harán decir \"¡WOW!\" en cada bocado. Además, nuestro menú de comidas rápidas está diseñado para conquistar cualquier paladar, con hamburguesas jugosas, hot dogs irresistibles y snacks que rompen la rutina.",
        "precio_promedio": 20000,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "8:00 PM"
        },
        "metodosdepago": "Efectivo y billeteras digitales.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 30,
        "name": "De La Casa Burguer",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "De la casa burguer con agrado, un sabor de autenticidad.",
        "precio_promedio": 25000,
        "horario": {
          "abren": "7:00 am",
          "cierran": "11:30 pm"
        },
        "metodosdepago": "Transferencia bancaria, tarjetas, billeteras digitales y efectivo.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 25,
        "name": "Nixcal",
        "items": {
          "Tipo": "Internacional"
        },
        "concepto": "En Nixcal, cada bocado es una explosión de sabor mexicano. Disfruta de auténticos tacos, salsas picantes y platillos tradicionales preparados con ingredientes frescos y de calidad. ¡Ven a vivir la esencia de México en cada plato y siente la fiesta en tu paladar!",
        "precio_promedio": 25000,
        "horario": {
          "abren": "12:00 pm",
          "cierran": "8:30 pm"
        },
        "metodosdepago": "Efectivo, Nequi, Daviplata y Tarjetas.",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 31,
        "name": "Original's Sabor",
        "items": {
          "Tipo": "Típico"
        },
        "concepto": "Original's Sabor es un acogedor restaurante tradicional ubicado cerca al Embalse de Tominé en Sesquilé, especializado en pescados y mariscos frescos con un toque local. El lugar ofrece una experiencia gastronómica única combinando la cocina tradicional colombiana con platos de pescado, destacando su trucha al ajillo y mojarra frita, servidos en un ambiente familiar con vista panorámica al embalse. Su decoración rústica y cálida, junto con un servicio atento, crean el espacio perfecto para disfrutar de un almuerzo durante tu visita a Sesquilé.",
        "precio_promedio": 35000,
        "horario": {
          "abren": "11:00 am",
          "cierran": "6:00 pm"
        },
        "metodosdepago": "Todos los métodos de pago. ",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 26,
        "name": "Stambull",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "La fusión entre lo rústico y moderno de Pizza Stambull's te ofrece un acogedor espacio para disfrutar de deliciosas pizzas, hamburguesas, burritos y más. El ambiente casual y vibrante es perfecto para compartir momentos especiales mientras disfrutas de buena música, excelente compañía y una selecta carta de cafés y cócteles que complementan tu experiencia.",
        "precio_promedio": 20000,
        "horario": {
          "abren": "7:00 am",
          "cierran": "9:30 pm"
        },
        "metodosdepago": "Billeteras digitales y efectivo",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 21,
        "name": "Vamonos Pa'l Monte",
        "items": {
          "Tipo": "Internacional"
        },
        "concepto": "Un rincón culinario único en Suesca donde la esencia oriental, tibetana y colombiana se fusionan en un festín de sabores inolvidables.  Nuestro restaurante, ubicado en el kilómetro 5 de la vía a Suesca, te invita a disfrutar de una experiencia gastronómica excepcional en un entorno natural y acogedor junto a la roca.  Desde desayunos reconfortantes hasta almuerzos exquisitos, nuestra cocina, es una invitación a explorar nuevos sabores.",
        "precio_promedio": 35000,
        "horario": {
          "abren": "2:00 PM",
          "cierran": "11:00 PM"
        },
        "metodosdepago": "Efectivo, billeteras digitales y tarjetas.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 7,
        "name": "Lechuzas",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": " Ven y disfruta de una experiencia única en nuestro restaurante de fast food, donde cada plato está elaborado con un toque artesanal que marca la diferencia. Saborea nuestras especialidades, cuidadosamente preparadas para ofrecerte una fusión entre rapidez y calidad, ideal para aquellos que buscan algo más que la comida rápida convencional. Relájate en un ambiente acogedor y déjate sorprender por nuestros sabores innovadores y frescos, pensados para satisfacer todos los gustos. ¡Tu próxima comida memorable te espera aquí!",
        "precio_promedio": 25000,
        "horario": {
          "abren": "10:00 am",
          "cierran": "9:00 pm"
        },
        "metodosdepago": "Efectivo, billeteras digitales, tarjetas. ",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 3,
        "name": "Cumbamba",
        "items": {
          "Tipo": "Artesanal"
        },
        "concepto": "Sabores autóctonos con un giro moderno. Disfruta de una experiencia gastronómica única donde cada plato honra la riqueza de la cocina tradicional, combinando ingredientes frescos y locales en presentaciones innovadoras. Perfecto para quienes buscan autenticidad y sabor en cada bocado. ¡Ven y despierta tus sentidos en Cumbamba!",
        "precio_promedio": 30000,
        "horario": {
          "abren": "12:00 pm",
          "cierran": "9:00 pm"
        },
        "metodosdepago": "Efectivo, Nequi, Daviplara, No Tarjetas",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 12,
        "name": "La Casona",
        "items": {
          "Tipo": "Artesanal"
        },
        "concepto": "La Casona Quesada en Suesca es un restaurante y hotel boutique, ideal para disfrutar de comida local e internacional en un ambiente tranquilo. Ubicado cerca de las famosas Rocas de Suesca, ofrece un espacio acogedor con terraza y vistas al jardín, perfecto para relajarse tras actividades al aire libre.",
        "precio_promedio": 25000,
        "horario": {
          "abren": "9:00 AM",
          "cierran": "8:00 PM"
        },
        "metodosdepago": "Efectivo y tarjetas ",
        "servicios": {
          "delivery": "No disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 20,
        "name": "Don Toño Ahumados Artesanales",
        "items": {
          "Tipo": "Artesanal"
        },
        "concepto": "En Don Toño celebramos la tradición del ahumado artesanal, transformando ingredientes de la más alta calidad en experiencias gastronómicas inolvidables. Nuestro menú destaca por cortes seleccionados, marinados con recetas únicas y ahumados lentamente para resaltar su sabor, jugosidad y aroma inconfundible.",
        "precio_promedio": 50000,
        "horario": {
          "abren": "2:00 PM",
          "cierran": "11:00 PM"
        },
        "metodosdepago": "Efectivo, billeteras digitales y tarjetas.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 19,
        "name": "Arca Rock",
        "items": {
          "Tipo": "Gastro-Bar"
        },
        "concepto": "Arca Rock es más que un gastrobar, es una experiencia para los sentidos. Disfruta de una gran variedad de platillos y bebidas diseñados para sorprender tu paladar, todo en un ambiente único que combina estilo y comodidad. Al ritmo de la mejor música, desde clásicos del rock hasta los sonidos más vibrantes, cada visita a Arca Rock se convierte en una celebración de sabor, ambiente y buena vibra. ¡Te esperamos para vivirlo juntos!",
        "precio_promedio": 35000,
        "horario": {
          "abren": "2:00 PM",
          "cierran": "11:00 PM"
        },
        "metodosdepago": "Efectivo, billeteras digitales y tarjetas.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 27,
        "name": "Mostaza",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "En Mostaza te ofrecemos una experiencia gastronómica única en el corazón de Sesquilé. Somos especialistas en hamburguesas artesanales, deliciosos hot dogs y sándwiches preparados con los mejores ingredientes. Nuestra carta se destaca por una selección especial de cortes a la parrilla que conquistarán tu paladar. Disfruta de nuestros platos en un ambiente acogedor y moderno, diseñado para brindarte momentos inolvidables. Visítanos y descubre por qué somos el lugar preferido para los amantes de la buena comida en el centro de Sesquilé.",
        "precio_promedio": 25000,
        "horario": {
          "abren": "12:00 pm",
          "cierran": "9:45 pm"
        },
        "metodosdepago": "Todos los métodos de pago.",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 23,
        "name": "La Victoria Cocina",
        "items": {
          "Tipo": "Artesanal"
        },
        "concepto": "En la entrada de las imponentes rocas, descubre Donde Vicky, un restaurante artesanal que combina tradición y naturaleza. Disfruta de platillos frescos, hechos con amor y productos locales, en un ambiente cálido con vistas únicas.  ¡Haz una pausa, saborea lo auténtico y vive la experiencia!",
        "precio_promedio": 40000,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "8:00 PM"
        },
        "metodosdepago": "Efectivo y billeteras digitales.",
        "servicios": {
          "delivery": "No disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 17,
        "name": "Pizzarium",
        "items": {
          "Tipo": "Fast-Food"
        },
        "concepto": "Pizzarium es el lugar perfecto para los amantes de las pizzas artesanales. Aquí, cada receta se prepara con pasión, utilizando los mejores ingredientes para garantizar un sabor único en cada bocado. Nuestro ambiente acogedor y tranquilo te invita a relajarte mientras disfrutas de una experiencia gastronómica que combina tradición y calidad. Ya sea para una comida especial o un momento casual, en Pizzarium siempre encontrarás el lugar ideal para compartir y disfrutar. ¡Ven y descubre el auténtico sabor artesanal!",
        "precio_promedio": 30000,
        "horario": {
          "abren": "4:00 PM",
          "cierran": "10:00 PM"
        },
        "metodosdepago": "Efectivo y Nequi.",
        "servicios": {
          "delivery": "No disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 14,
        "name": "Francachela",
        "items": {
          "Tipo": "Gastro-Bar"
        },
        "concepto": "Francachela, ubicado en el corazón de Sesquilé, Cundinamarca, es un restaurante que combina la calidez de la cocina tradicional con un ambiente moderno y acogedor. Especializado en comidas rápidas gourmet, ofrece una experiencia única donde destacan sus hamburguesas artesanales, churrascos jugosos y una variedad de platos preparados con ingredientes frescos y de alta calidad. El espacio está diseñado para que disfrutes de momentos especiales, ya sea en familia o con amigos, mientras saboreas una deliciosa comida acompañada de un excelente servicio.",
        "precio_promedio": 35000,
        "horario": {
          "abren": "12:00 pm",
          "cierran": "9:30 pm"
        },
        "metodosdepago": "Todos los métodos de pago.",
        "servicios": {
          "delivery": "Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 2,
      },
      {
        "id": 22,
        "name": "Texas Burger",
        "items": {
          "Tipo": "Parrilla"
        },
        "concepto": "Texas Burger un restaurante que fusiona la auténtica hamburguesa texana con un toque latino en un ambiente acogedor y moderno. El espacio destaca por su decoración rústica-contemporánea, con techos de madera adornados con helechos colgantes, iluminación ambiental y mesas de madera maciza que crean una atmósfera casual pero elegante. Su menú ofrece una selecta variedad de hamburguesas gourmet, picadas y combos especiales con precios entre $13,000 y $45,000, posicionándose en un segmento medio-alto que promete una experiencia culinaria elevada sin perder la esencia del sabor texano tradicional.",
        "precio_promedio": 35000,
        "horario": {
          "abren": "8:00 am",
          "cierran": "8:00 pm"
        },
        "metodosdepago": "Efectivo, transferencias y billeteras digitales.",
        "servicios": {
          "delivery": "No disponible",
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "destino_id": 1,
      },
      {
        "id": 2,
        "name": "Ricapizza Gourmet",
        "items": {
          "Tipo": "Gourmet"
        },
        "concepto": "En Ricapizza Gourmet, no solo servimos platos exquisitos, creamos conexiones y memorias que perduran. ¡Bienvenido a nuestra mesa, donde la hospitalidad es nuestra firma! Cuidamos que la presentación de cada plato, represente su belleza y sabor único para que tengas una experiencia memorable.",
        "precio_promedio": 40000,
        "horario": {
          "abren": "12:00 pm",
          "cierran": "8:30 pm"
        },
        "metodosdepago": "Efectivo, Nequi, Daviplata y Tarjetas.",
        "servicios": {
          "delivery": "No Disponible",
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "destino_id": 1,
      }
    ],
    "actividades": [
      {
        "id": 6,
        "oferente": "Refugio Annapurna ",
        "horario": {
          "abren": "9:00 AM",
          "cierran": "3:00 PM"
        },
        "metodosDePago": "Efectivo, Billeteras digitales",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Camping en las Rocas",
            "items": {
              "Tipo": "camping"
            },
            "duracion": 720,
            "dificultad": "Baja",
            "capacidad": 25,
            "description": "Camping en las Rocas",
            "itinerario": "Vive una experiencia única de camping frente a las majestuosas rocas de Suesca, perfecto para una escapada romántica o una aventura con amigos. Nuestro espacio cuenta con zonas húmedas, conexión WiFi, amplio parqueadero y acceso privilegiado a la hermosa Reserva El Turpial, donde podrás conectar con la naturaleza en un entorno seguro y confortable.",
            "requisitosRecomendaciones": {
              "edad": "Menores de edad deben estar acompañados por un adulto responsable mayor de 18 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Parqueadero, acceso exclusivo a la Reserva El Turpial, zona WiFi y zonas húmedas.",
              "recomendaciones": "Para una mejor experiencia de camping, te recomendamos traer sleeping bag, carpa adecuada para clima frío, ropa abrigada, linterna, protector solar y agua. Recuerda que las temperaturas pueden bajar considerablemente en la noche. Los menores deben estar acompañados por un adulto responsable y es importante mantener limpio el espacio y seguir las indicaciones del personal de la reserva."
            },
            "precio": 65000
          },
          {
            "name": "Vía Ferrata",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 300,
            "dificultad": "Media",
            "capacidad": 10,
            "description": "Vía Ferrata",
            "itinerario": "Explora la adrenalina de las vías ferratas en la Reserva El Turpial, un fascinante recorrido que combina tramos verticales y horizontales. Estas rutas están completamente equipadas con sistemas de seguridad profesionales que incluyen clavos, grapas, presas, pasamanos, cadenas y emocionantes puentes colgantes, permitiendo que tanto principiantes como expertos accedan de manera segura a vistas espectaculares normalmente reservadas para escaladores experimentados.",
            "requisitosRecomendaciones": {
              "edad": "Edad mínima 13 años. Los menores de edad deben estar acompañados por un adulto responsable y presentar autorización firmada por sus padres o tutores legales.",
              "experiencia": "Sin experiencia previa.",
              "incluye": "Acceso exclusivo a la Reserva El Turpial.",
              "recomendaciones": "Para tu aventura en la vía ferrata, te recomendamos usar ropa cómoda deportiva, zapatos cerrados con buen agarre, llevar agua, bloqueador solar y un refrigerio ligero. La actividad está diseñada para personas sin experiencia previa, pero los menores de edad deben estar acompañados por un adulto. Todo el equipo técnico necesario será proporcionado por nuestros guías certificados."
            },
            "precio": 200000
          },
          {
            "name": "Fernando Rubio te enseña a escalar.",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 300,
            "dificultad": "Media",
            "capacidad": 2,
            "description": "Fernando Rubio te enseña a escalar.",
            "itinerario": "Escala con un experto: Fernando González-Rubio, reconocido montañista con una extraordinaria trayectoria en el Himalaya y conquistador de 7 de las 14 montañas más altas del mundo. A través de su Fundación, ha contribuido al desarrollo del deporte y apertura de rutas en diversos parques de escalada, incluyendo la Reserva El Turpial y otros destinos internacionales. Aprovecha esta oportunidad única en Suesca, Cundinamarca, para aprender de su experiencia como educador, guía de montaña y defensor del medio ambiente.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Edad mínima 13 años. Los menores de edad deben estar acompañados por un adulto responsable y presentar autorización firmada por sus padres o tutores legales.",
              "experiencia": "Sin experiencia previa.",
              "incluye": "Todo el equipo técnico necesario para la escalada será proporcionado por el instructor (arnés, casco, mosquetones y cuerdas). Se recomienda llegar 15 minutos antes de la hora programada.",
              "recomendaciones": "Traer ropa cómoda deportiva, zapatillas de amarrar, agua, bloqueador solar y refrigerio. Es importante haber desayunado adecuadamente y estar en buen estado de salud."
            },
            "precio": 500000
          }
        ]
      },
      {
        "id": 17,
        "oferente": "SIE Travel",
        "horario": {
          "abren": "7:00 am",
          "cierran": "2:00 pm"
        },
        "metodosDePago": "Transferencias, billeteras digitales y efectivo. ",
        "destino_id": 2,
        "actividad": [
          {
            "name": "Trekking Cuchilla Frailejonal",
            "items": {
              "Tipo": "Trekking"
            },
            "duracion": 480,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Trekking Cuchilla Frailejonal",
            "itinerario": "🌿 AVENTURA EN LA CUCHILLA FRAILEJONAL 🏔️ ¿Listo para conquistar uno de los páramos más imponentes de Colombia? Esta aventura en Guatanfur te espera con paisajes que parecen de otro mundo así como la posibilidad de ver Osos de Anteojos.",
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "18 km de senderos mágicos, Alcanzarás los 3.550 msnm, 7-8 horas de pura adrenalina, Dificultad: Moderada-alta 💪",
              "incluye": "Desayuno montañero completo (¡Con caldo, huevos y chucula!), Refrigerio tipo Brunch, Transporte Local, Guía experto local, Seguro aventurero",
              "recomendaciones": "Llevar: Botas de montaña, Ropa abrigada + Ropa de Cambio, Protección solar, Cámara (¡las fotos serán épicas!)"
            },
            "precio": 110000
          },
          {
            "name": "Trekking Alto Pan de Azúcar",
            "items": {
              "Tipo": "Trekking"
            },
            "duracion": 420,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Trekking Alto Pan de Azúcar",
            "itinerario": "🌿 DESCUBRE EL PÁRAMO PAN DE AZÚCAR 🏔️ ¿Te imaginas alcanzar las nubes mientras caminas entre frailejones? Esta aventura te espera en Sesquilé.",
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "12 km de pura majestuosidad andina, Alcanzarás los 3600 msnm, 6-7 horas de conexión con la naturaleza",
              "incluye": "Desayuno montañero completo (¡Con caldo, huevos y chucula!), Refrigerio tipo Brunch, Transporte Local, Guía experto local, Seguro aventurero",
              "recomendaciones": "Llevar: Botas/tenis de treking, Ropa cómoda + Ropa de cambio, Protección solar, Cámara (¡las vistas son increíbles!)"
            },
            "precio": 95000
          },
          {
            "name": "Trekking Cerro Tres Viejas",
            "items": {
              "Tipo": "Trekking"
            },
            "duracion": 300,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Trekking Cerro Tres Viejas",
            "itinerario": "🌿 TRES VIEJAS: LA JOYA OCULTA DE SESQUILÉ 🌄 ¿Buscas una aventura perfecta para un día? ¡Descubre el secreto mejor guardado de Cundinamarca!",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "10 km de puro encanto natural, Altura máxima: 3.322 msnm, 4-5 horas de conexión con la montaña, Dificultad: Media (ideal para iniciarte) 💫",
              "incluye": "Guía local experto, Refrigerio especial, Seguro de aventura, ¡Momentos inolvidables garantizados!",
              "recomendaciones": "Llevar: Zapatos de trekking, Ropa cómoda + Ropa de cambio, Kit de protección solar, ¡Sonrisa aventurera!"
            },
            "precio": 55000
          },
          {
            "name": "Hiking Camino Ancestral y Laguna del Cacique Guatavita",
            "items": {
              "Tipo": "Hiking"
            },
            "duracion": 480,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Hiking Camino Ancestral y Laguna del Cacique Guatavita",
            "itinerario": "🌿 CAMINO ANCESTRAL Y LAGUNA DE GUATAVITA 🏔️ ¡Vive la magia de los Muiscas en una aventura única que combina historia, naturaleza y misterio!",
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "14 km de historia viva, Altura: 3.100 msnm, 7-8 horas de exploración, Dificultad: Moderada",
              "incluye": "Almuerzo tradicional, Entrada a la Laguna sagrada, Transporte de regreso Local, Guía experto en historia local, Refrigerio del caminante, Seguro todo riesgo",
              "recomendaciones": "Llevar: Calzado de montaña, Ropa cómoda + Ropa de cambio, Kit solar, Cámara (¡fotos imperdibles!)"
            },
            "precio": 115000
          },
          {
            "name": "Hiking Cerro Chibchacum KIDS",
            "items": {
              "Tipo": "Hiking"
            },
            "duracion": 180,
            "dificultad": "Baja",
            "capacidad": 20,
            "description": "Hiking Cerro Chibchacum KIDS",
            "itinerario": "🌈 CHIBCHACUM KIDS: ¡AVENTURA FAMILIAR! 🎈 ¿Buscas una experiencia mágica para los peques? ¡Descubre la naturaleza en familia de una forma única y divertida!",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Todas las edades pueden realizar esta actividad.",
              "experiencia": "5 km de diversión natural, 3 horas de exploración, Para niños de 4 a 9 años, Dificultad: Suave y divertida",
              "incluye": "Regalo sorpresa para peques, Refrigerios deliciosos, Transporte de regreso local, Guías especializados en niños, Fotos de la aventura, Seguro familiar",
              "recomendaciones": " Ropa cómoda, Zapatillas deportivas, Protector solar, ¡Mucha energía!"
            },
            "precio": 75000
          }
        ]
      },
      {
        "id": 3,
        "oferente": "Suesca Colombia Extrema",
        "metodosDePago": "Aceptamos efectivo y billeteras digitales",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Escalada en Roca",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 180,
            "dificultad": "Media",
            "capacidad": 5,
            "description": "Escalada en Roca",
            "itinerario": "Vive una emocionante aventura de escalada en las rocas de Suesca, un destino icónico para escaladores a solo 45 minutos de Bogotá. La experiencia incluye equipo completo de seguridad, guía certificado y una sesión que combina instrucción básica con práctica en diferentes niveles de dificultad. Perfecta tanto para principiantes como para escaladores experimentados.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de 8 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Equipo de escalar completo, seguro, guía certificado, 3 rutas de escalada en roca.",
              "recomendaciones": "Llevar ropa comoda e hidratación"
            },
            "precio": 100000
          },
          {
            "name": "Exploración de Cuevas",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 240,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Exploración de Cuevas",
            "itinerario": "La exploración de la Cueva Chocoancía con Suesca Colombia Extrema te ofrece una aventura única de espeleología en una de las formaciones más impresionantes de Suesca. Durante el recorrido de aproximadamente 4 horas, podrás adentrarte en esta cueva natural guiado por expertos certificados, donde descubrirás formaciones rocosas únicas, pasadizos estrechos y cámaras subterráneas que te transportarán a un mundo subterráneo fascinante. El servicio incluye todo el equipo necesario (casco con luz frontal), guía especializado, seguro de actividad, charla técnica de seguridad y un recorrido que te permitirá conocer los secretos geológicos e históricos de esta maravillosa cueva.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de 8 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Guía certificado, seguro de asistencia, casco y frontal",
              "recomendaciones": "Llevar ropa comoda e hidratación, ropa de cambio, bloqueador solar."
            },
            "precio": 95000
          }
        ]
      },
      {
        "id": 13,
        "oferente": "Go Suesca",
        "horario": {
          "abren": "8:00 am",
          "cierran": "8:00pm"
        },
        "metodosDePago": "Efectivo, transferencias y billeteras digitales",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Camping Villa Go",
            "items": {
              "Tipo": "camping"
            },
            "duracion": 720,
            "dificultad": "Baja",
            "capacidad": 10,
            "description": "Camping Villa Go",
            "itinerario": "Disfruta de una experiencia única de camping con todas las comodidades necesarias: zona verde para acampar, baños con ducha y agua caliente, WiFi y parqueadero incluido. La tarifa se calcula por noche y por persona, e incluye leña para que disfrutes de una acogedora fogata bajo las estrellas. Consulta la disponibilidad para reservar tu espacio.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de edad",
              "experiencia": "Sin experiencia previa",
              "incluye": "Baños completos, zona monitoreada y segura, no incluye carpa",
              "recomendaciones": "Seguir instrucciones de seguridad del lugar."
            },
            "precio": 25000
          }
        ]
      },
      {
        "id": 7,
        "oferente": "Reserva el Turpial",
        "horario": {
          "abren": "9:00 AM",
          "cierran": "5:00 PM"
        },
        "metodosDePago": "Billeteras digitales",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Reserva el Turpial",
            "items": {
              "Tipo": "senderismo"
            },
            "duracion": 180,
            "dificultad": "Baja",
            "capacidad": 20,
            "description": "Reserva el Turpial",
            "itinerario": "Explora por tu cuenta los mágicos senderos de la Reserva Natural El Turpial, un tesoro ecológico en Suesca, Cundinamarca. Durante el recorrido autoguiado, descubrirás la rica biodiversidad local, impresionantes formaciones rocosas y espectaculares vistas panorámicas, mientras te conectas con la naturaleza a tu propio ritmo en este ecosistema único.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Edad mínima 8 años. Los menores de edad deben estar acompañados por un adulto responsable.",
              "experiencia": "Sin experiencia previa.",
              "incluye": "Acceso exclusivo a la Reserva El Turpial.",
              "recomendaciones": "Para tu aventura te recomendamos usar ropa cómoda deportiva, zapatos cerrados con buen agarre, llevar agua, bloqueador solar y un refrigerio ligero. La actividad está diseñada para personas sin experiencia previa, pero los menores de edad deben estar acompañados por un adulto"
            },
            "precio": 15000
          }
        ]
      },
      {
        "id": 1,
        "oferente": "Marlon fernández",
        "horario": {
          "abren": "9:00 am",
          "cierran": "5:00 pm"
        },
        "metodosDePago": "Solo efectivo",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Cabalgata por las Rocas",
            "items": {
              "Tipo": "cabalgata"
            },
            "duracion": 90,
            "dificultad": "Baja",
            "capacidad": 5,
            "description": "Cabalgata por las Rocas",
            "itinerario": "Disfruta de un recorrido a caballo por los majestuosos senderos de Suesca, bordeando sus famosas rocas y valles. La experiencia incluye caballos dóciles, guía experto y equipo de seguridad, permitiéndote explorar los paisajes más espectaculares de la región mientras conectas con la naturaleza. Una aventura ideal para toda la familia, sin necesidad de experiencia previa.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de 8 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Equipo completo para cabalgata",
              "recomendaciones": "Llevar ropa comoda e hidratación"
            },
            "precio": 45000
          }
        ]
      },
      {
        "id": 5,
        "oferente": "Villa Inés",
        "horario": {
          "abren": "9:00 am",
          "cierran": "9:00 pm"
        },
        "metodosDePago": "Efectivo, transferencia bancaria. ",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Camping Villa Inés",
            "items": {
              "Tipo": "camping"
            },
            "duracion": 720,
            "dificultad": "Baja",
            "capacidad": 50,
            "description": "Camping Villa Inés",
            "itinerario": "Disfruta de una experiencia única en el camping Villa Inés, ubicado a 5 minutos de las rocas de Suesca. Un espacio natural rodeado de imponentes rocas y paisajes montañosos, perfecto para los amantes de la aventura y la naturaleza. El camping ofrece zonas designadas para carpas, baños limpios, zona de fogatas y un ambiente seguro y tranquilo. Un lugar ideal para desconectarte bajo las estrellas mientras disfrutas de la majestuosidad del entorno natural.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de edad",
              "experiencia": "Sin experiencia previa",
              "incluye": "Baños completos, zona monitoreada y segura, no incluye carpa, ni parqueadero",
              "recomendaciones": "Comprar leña en la entrada al camping ($10.000), y seguir instrucciones de seguridad del lugar."
            },
            "precio": 25000
          }
        ]
      },
      {
        "id": 8,
        "oferente": "Roca Glamping Suesca",
        "horario": {
          "abren": "9:00 am",
          "cierran": "5:00 pm"
        },
        "metodosDePago": "Aceptamos efectivo y billeteras digitales",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Cabalgata",
            "items": {
              "Tipo": "cabalgata"
            },
            "duracion": 90,
            "dificultad": "Baja",
            "capacidad": 4,
            "description": "Cabalgata",
            "itinerario": "Disfruta de un recorrido a caballo por los majestuosos senderos de Suesca, bordeando sus famosas rocas y valles. La experiencia incluye caballos dóciles, guía experto y equipo de seguridad, permitiéndote explorar los paisajes más espectaculares de la región mientras conectas con la naturaleza. Una aventura ideal para toda la familia, sin necesidad de experiencia previa.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de 8 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Equipo completo para cabalgata",
              "recomendaciones": "Llevar ropa comoda e hidratación"
            },
            "precio": 50000
          },
          {
            "name": "Escalada",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 90,
            "dificultad": "Media",
            "capacidad": 5,
            "description": "Escalada",
            "itinerario": "Vive una emocionante aventura de escalada en las rocas de Suesca, un destino icónico para escaladores a solo 45 minutos de Bogotá. La experiencia incluye equipo completo de seguridad, guía certificado y una sesión que combina instrucción básica con práctica en diferentes niveles de dificultad. Perfecta tanto para principiantes como para escaladores experimentados.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de 8 años",
              "experiencia": "Sin experiencia previa",
              "incluye": "Equipo de escalar completo y seguro.",
              "recomendaciones": "Llevar ropa comoda e hidratación"
            },
            "precio": 65000
          },
          {
            "name": "Camping sobre las Rocas",
            "items": {
              "Tipo": "camping"
            },
            "duracion": 720,
            "dificultad": "Baja",
            "capacidad": 8,
            "description": "Camping sobre las Rocas",
            "itinerario": "Disfruta de una experiencia única en Roca Glamping, ubicado sobre las majestuosas rocas de Suesca en un exclusivo mirador natural. Un espacio privilegiado que te ofrece vistas panorámicas 360° del valle y los paisajes montañosos, perfecto para los amantes de la aventura y la naturaleza. El camping cuenta con zonas designadas para carpas, baños limpios, zona de fogatas y un ambiente seguro y tranquilo. Un lugar extraordinario para desconectarte bajo las estrellas mientras disfrutas de una de las mejores ubicaciones en Suesca.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Mayores de edad",
              "experiencia": "Sin experiencia previa",
              "incluye": "Baños completos, zona monitoreada y segura, no incluye carpa, ni parqueadero, ofrecemos servicio de alquiler de carpas (30.000) y sacos de dormir (15.000 c/u). Importante: No disponemos de servicio de alquiler de colchones.",
              "recomendaciones": "Comprar leña en la entrada al camping ($20.000), y seguir instrucciones de seguridad del lugar."
            },
            "precio": 15000
          }
        ]
      },
      {
        "id": 11,
        "oferente": "Termales Agua Caliente",
        "horario": {
          "abren": "9:00 am",
          "cierran": "5:00 pm"
        },
        "metodosDePago": "Efectivo y billeteras digitales.",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Termales agua caliente",
            "items": {
              "Tipo": "relajantes"
            },
            "duracion": 0,
            "dificultad": "Baja",
            "capacidad": 50,
            "description": "Termales agua caliente",
            "itinerario": "Descubre las Termales Agua Caliente de Suesca, un oasis de tranquilidad para toda la familia ubicado en la Vereda Aguaclara. El complejo cuenta con dos piscinas termales de aguas bicarbonatadas cálcicas: una piscina para adultos a 30°C y una piscina pequeña a 32°C, ideales para la actividad física. El lugar complementa la experiencia con servicios como turco, cancha de fútbol, juegos de ping pong, rana, billar, tienda de víveres y parqueadero gratuito. Abierto de lunes a domingo de 9:00 am a 5:00 pm (excepto miércoles), con tarifas accesibles de $25.000 para adultos y $20.000 para niños hasta 1,35 cm de altura con acceso a piscinas.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Acceso a piscinas termales (una a 30°C y otra a 32°C), cancha de fútbol, juegos de ping pong, rana, billar, tienda de víveres, parqueadero gratuito",
              "recomendaciones": "Llevar traje de baño, toalla, ropa de cambio, chanclas, bloqueador solar, gorra o sombrero para las áreas al aire libre, hidratación personal, no ingresar alimentos ni bebidas alcohólicas, cumplir con los horarios establecidos (9:00 am a 5:00 pm), tener en cuenta que los miércoles no hay servicio de piscina, se recomienda llegar temprano para aprovechar el día completo, y recordar que las aguas son tibias ideales para actividad física y no para relajación profunda"
            },
            "precio": 25000
          }
        ]
      },
      {
        "id": 9,
        "oferente": "Niddo Suesca",
        "horario": {
          "abren": "9:00 am",
          "cierran": "7:00 pm"
        },
        "metodosDePago": "Efectivo, transferencia bancaria y tarjetas.",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Espeleología",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 120,
            "dificultad": "Media",
            "capacidad": 10,
            "description": "Espeleología",
            "itinerario": "¿Listo/a para una aventura diferente y emocionante? Te invitamos a vivir nuestra experiencia de Espeleología en Niddo Suesca. 🧗‍♂️✨ Explora las profundidades de las cuevas naturales, descubre formaciones rocosas milenarias y siente la emoción de adentrarte en un mundo oculto bajo la tierra. Esta experiencia es perfecta para quienes buscan aventura y una conexión única con la naturaleza. 🌄🌌 Ven y descubre un lado diferente de Niddo, ¡donde la naturaleza esconde maravillas bajo tus pies!",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad, siempre acompañados de un adulto responsable",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Guía certificado, todo el equipo de seguridad necesario.",
              "recomendaciones": "Para realizar espeleología de manera segura, es esencial usar ropa cómoda y resistente que pueda ensuciarse, preferiblemente manga larga para proteger brazos y piernas de raspones, llevar calzado antideslizante con buena tracción, y un cambio completo de ropa para después de la actividad. Es fundamental seguir siempre las instrucciones del guía, mantener la calma en espacios estrechos, llevar agua para hidratarse, no separarse del grupo, y contar con una linterna adicional además del casco con luz frontal. Se recomienda también informar de cualquier condición médica preexistente al guía y evitar la actividad si se sufre de claustrofobia."
            },
            "precio": 155000
          },
          {
            "name": "Ciclomontañismo",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 120,
            "dificultad": "Media",
            "capacidad": 10,
            "description": "Ciclomontañismo",
            "itinerario": "Descubre cómo se pone a prueba tu espíritu en una aventura entre tu cuerpo y la montaña. Supera tus límites y exígete al máximo. Disfruta del paisaje mientras tus piernas se llenan de energía. Pregunta por nuestra pista privada catalogada una de las mejores.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad, siempre acompañados de un adulto responsable",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Incluye bicicleta de montaña todo terreno, casco de protección, guía certificado, charla técnica de seguridad, y un recorrido de 120 minutos por los senderos naturales más espectaculares.",
              "recomendaciones": "Usar ropa deportiva cómoda y zapatos deportivos con buena tracción, aplicar bloqueador solar, llevar hidratación adicional, haber desayunado al menos 2 horas antes, y llegar 15 minutos antes para el ajuste del equipo y las instrucciones. Es importante también informar al guía sobre cualquier condición médica o nivel de experiencia en ciclomontañismo."
            },
            "precio": 95000
          },
          {
            "name": "Yoga en Niddo",
            "items": {
              "Tipo": "relajantes"
            },
            "duracion": 60,
            "dificultad": "Baja",
            "capacidad": 25,
            "description": "Yoga en Niddo",
            "itinerario": "Conecta tu cuerpo, mente y naturaleza 🧘‍♀️🌿 En Niddo Suesca, te ofrecemos la oportunidad de disfrutar de sesiones de yoga al aire libre, rodeado/a de la tranquilidad de nuestras montañas y la pureza del aire. Nuestras clases están diseñadas para todas las edades y niveles, brindándote un espacio para relajarte, reconectar con tu interior y liberar tensiones en un entorno natural inigualable. Ya sea que estés buscando estirarte después de un día de aventura o comenzar la mañana con energía y serenidad, nuestras sesiones de yoga son perfectas para revitalizar cuerpo y mente. 🌄✨",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": " El servicio incluye instructor certificado de yoga, mat (tapete) y se realiza en un espacio al aire libre con vista a las montañas",
              "recomendaciones": "Para la práctica de yoga en Niddo Suesca se recomienda usar ropa cómoda y deportiva que permita moverse con libertad, llegar con al menos 15 minutos de anticipación para acomodarse en el espacio, no haber comido una comida pesada en las últimas 2 horas, llevar una botella de agua para hidratarse, usar protector solar si la sesión es al aire libre, y comunicar al instructor cualquier lesión o condición médica previa. También es aconsejable llevar una chaqueta ligera ya que el clima en Suesca puede ser variable durante la práctica."
            },
            "precio": 60000
          }
        ]
      },
      {
        "id": 12,
        "oferente": "Hotel Flora",
        "horario": {
          "abren": "9:00 am",
          "cierran": "7:00 pm"
        },
        "metodosDePago": "Efectivo, billeteras digitales.",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Sauna Flora",
            "items": {
              "Tipo": "relajantes"
            },
            "duracion": 60,
            "dificultad": "Baja",
            "capacidad": 2,
            "description": "Sauna Flora",
            "itinerario": "🌄Complementa tu experiencia de aventura y naturaleza con nuestro exclusivo servicio de sauna en Hotel Flora. Diseñado para ayudarte a relajar los músculos después de un intenso día de actividades en las rocas de Suesca, nuestro sauna ofrece un espacio íntimo de bienestar donde podrás disfrutar de una sesión revitalizante. Con capacidad para 2 personas, temperatura controlada y un ambiente acogedor, es el complemento perfecto para tu estadía. El servicio incluye toallas, zona de vestidores y está disponible para nuestros huéspedes mediante reserva previa.✨",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "No Menores de edad.",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Incluye sauna y toallas",
              "recomendaciones": "Recomendamos no tener tatuajes recientes."
            },
            "precio": 50000
          }
        ]
      },
      {
        "id": 14,
        "oferente": "La GUEBA DEL JOHN ",
        "horario": {
          "abren": "7:00 am",
          "cierran": "4:00 pm"
        },
        "metodosDePago": "Efectivo y billeteras digitales. ",
        "destino_id": 2,
        "actividad": [
          {
            "name": "Ruta Ancestral Muisca",
            "items": {
              "Tipo": "Ancestral"
            },
            "duracion": 210,
            "dificultad": "Baja",
            "capacidad": 20,
            "description": "Ruta Ancestral Muisca",
            "itinerario": "El tour al Resguardo Indígena Mhuysqa incluye transporte interno y comienza en el Parque Principal de Sesquilé, donde iniciaremos un fascinante recorrido por la Calle de los Murales para apreciar la cosmogonía indígena Mhuysqa. La experiencia continúa con una caminata por el Resguardo, donde exploraremos el sendero del agua, la Cuca, las casas ceremoniales, el temazcal y el Qusmuy (casa mayor). El momento más especial es el círculo de palabra alrededor del fuego en el Qusmuy, seguido de un pagamento, limpieza en el fuego y una ceremonia de temazcal. Durante el recorrido, disfrutaremos de un refrigerio con frutas y un almuerzo tradicional de mazamorra, terminando con un recorrido por la laguna del Cacique Guatavita. El tour incluye guía especializado del Resguardo Indígena, un souvenir ancestral, seguro de asistencia médica y el acompañamiento logístico del equipo la Gueba del John para garantizar una experiencia segura y enriquecedora.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Incluye transporte interno, recorrido Calle de los Murales, caminata en el Resguardo, almuerzo, seguro de asistencia medic",
              "recomendaciones": "Para asegurar una experiencia segura y enriquecedora, es fundamental seguir atentamente las indicaciones de nuestros guías expertos. Ellos están capacitados para garantizar tu seguridad y bienestar durante todo el recorrido, además de compartir sus valiosos conocimientos sobre la cultura. Por favor, mantente siempre atento a sus instrucciones y recomendaciones."
            },
            "precio": 160000
          },
          {
            "name": "Caminata Páramo Pan de Azúcar",
            "items": {
              "Tipo": "Trekking"
            },
            "duracion": 570,
            "dificultad": "Alta",
            "capacidad": 20,
            "description": "Caminata Páramo Pan de Azúcar",
            "itinerario": "Aventura de trekking al majestuoso Páramo Pan de Azúcar, alcanzando los 3600 m.s.n.m con una experiencia única que combina naturaleza y tradición ancestral. La aventura inicia a las 6:30 am en el Parque Principal de Sesquilé, desde donde nos transportaremos al punto de inicio del sendero. Durante el recorrido de 12 km, disfrutaremos de un desayuno campestre y exploraremos los diversos ecosistemas del páramo. En el Cerro Pan de Azúcar, realizaremos un significativo pagamento, conectando con la energía ancestral del lugar. La caminata incluye paradas estratégicas para refrigerio y contemplación del paisaje, finalizando aproximadamente a las 4:00 pm con el retorno al punto de encuentro.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables.",
              "experiencia": "No requiere experiencia previa, pero se recomienda buena condición física",
              "incluye": "Transporte ida y regreso desde Parque Principal Sesquilé, desayuno campestre, refrigerio de caminante, guía del resguardo indígena, pagamento en Cerro Pan de Azúcar, souvenir ancestral, seguro de asistencia médica",
              "recomendaciones": "Debido a las condiciones del páramo (temperatura entre 6 a 12°C) y la altitud, se recomienda llevar ropa abrigada e impermeable, calzado apropiado para trekking, hidratación, protector solar y seguir atentamente las indicaciones del guía para una experiencia segura y enriquecedora."
            },
            "precio": 130000
          },
          {
            "name": "Caminata Cerro del Indio Acostado",
            "items": {
              "Tipo": "Trekking"
            },
            "duracion": 300,
            "dificultad": "Media",
            "capacidad": 20,
            "description": "Caminata Cerro del Indio Acostado",
            "itinerario": "Travesía de trekking al enigmático Cerro del Indio Acostado, una experiencia que combina aventura y tradición ancestral a 3250 m.s.n.m en las alturas de Sesquilé. La aventura comienza en el Parque Principal de Sesquilé con una presentación introductoria. Durante el recorrido de 8 km, exploraremos los senderos que conducen al místico Cerro del Indio Acostado, también conocido como Las Tres Viejas. En la cima, realizaremos un significativo pagamento tradicional, conectando con la energía ancestral del lugar. La experiencia incluye paradas estratégicas para el refrigerio y la contemplación del paisaje, completando un recorrido total de 5 horas.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables.",
              "experiencia": "No requiere experiencia previa, pero se recomienda buena condición física",
              "incluye": "Presentación en Parque Principal, caminata trekking, pagamento en Cerro del Indio Acostado, refrigerio de caminante, guía del resguardo indígena, souvenir ancestral, seguro de asistencia médica",
              "recomendaciones": "Dadas las condiciones de montaña (temperatura entre 6 a 13°C) y la altitud, se recomienda llevar ropa térmica adecuada, calzado apropiado para trekking, hidratación suficiente, protector solar y seguir las indicaciones del guía para garantizar una experiencia segura y enriquecedora."
            },
            "precio": 100000
          }
        ]
      },
      {
        "id": 10,
        "oferente": "Refugio de Alta Guita",
        "horario": {
          "abren": "8:00 am",
          "cierran": "5:00 pm"
        },
        "metodosDePago": "Efectivo, transferencias y billeteras digitales.",
        "destino_id": 1,
        "actividad": [
          {
            "name": "Recorrido por el Cañón de las Lechuzas",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 90,
            "dificultad": "Facil",
            "capacidad": 12,
            "description": "Recorrido por el Cañón de las Lechuzas",
            "itinerario": "Disfruta de una experiencia de 90 minutos explorando el Cañón de la Lechuza. La aventura comienza con una breve introducción, tips y recomendaciones de seguridad antes de iniciar una caminata por un sendero natural hasta el punto de embarque. Luego, abordaremos una barcaza para recorrer el imponente cañón, con paradas estratégicas para admirar el paisaje, tomar fotografías y observar la biodiversidad del lugar. Finalmente, regresaremos por el sendero, cerrando la experiencia con un espacio para compartir impresiones. ¡Una travesía inolvidable en plena naturaleza!",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": "Experiencia única en un sendero natural rodeado de biodiversidad, seguido de un recorrido en barcaza a través del imponente Cañón de la Lechuza. La actividad, de dificultad fácil, incluye guía especializado, historia y paradas en puntos panorámicos para apreciar el paisaje y capturar momentos inolvidables.",
              "recomendaciones": "Esta actividad es ideal para quienes buscan una aventura tranquila en la naturaleza. Usa ropa cómoda, calzado con buen agarre y lleva protector solar, gorra y repelente. No es  obligatorio el uso de chaleco salvavidas solo se deben seguir las indicaciones del guía. Lleva agua y snacks ligeros. Aunque es un recorrido accesible, no es recomendable para personas con problemas de salud o en estado de embarazo. Respeta el entorno: no arrojes basura ni extraigas flora o fauna. ¡Disfruta del paisaje y vive la experiencia con responsabilidad!"
            },
            "precio": 120000
          },
          {
            "name": "Escalada en Muro",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 60,
            "dificultad": "Media",
            "capacidad": 10,
            "description": "Escalada en Muro",
            "itinerario": "La experiencia de escalada en muro comienza con una charla técnica de seguridad de 10 minutos, seguida por el equipamiento y ajuste del material. Durante los siguientes 40 minutos, aprenderás técnicas básicas de escalada, nudos esenciales y movimientos fundamentales, practicando en diferentes rutas del muro con distintos niveles de dificultad. La sesión finaliza con 10 minutos de retroalimentación y recomendaciones para seguir progresando en este deporte.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": "El servicio de escalada en muro en el Refugio de Alta Güita incluye instructor certificado, equipo completo de seguridad con arnés, casco y mosquetones, cuerdas especializadas, zapatos de escalada, magnesio para las manos, charla técnica de seguridad y una sesión completa de 60 minutos para aprender las técnicas básicas de escalada.",
              "recomendaciones": "Para realizar la actividad de manera segura, se recomienda usar ropa deportiva cómoda que permita movilidad, evitar joyas o accesorios sueltos, mantener las uñas cortas para mejor agarre, estar bien hidratado, informar sobre cualquier condición médica al instructor, llegar 15 minutos antes para la charla de seguridad y no haber consumido alimentos pesados en las últimas 2 horas antes de la actividad."
            },
            "precio": 60000
          },
          {
            "name": "Ciclomontañismo el Refugio",
            "items": {
              "Tipo": "extremo"
            },
            "duracion": 120,
            "dificultad": "Media",
            "capacidad": 6,
            "description": "Ciclomontañismo el Refugio",
            "itinerario": "La aventura comienza con una charla técnica de 15 minutos donde aprenderás el manejo básico de la bicicleta y las señales de seguridad. Luego inicias un emocionante recorrido de 2 horas por senderos que atraviesan paisajes increibles, con paradas estratégicas para hidratación y fotografías, mientras disfrutas de vistas espectaculares a las rocas de Suesca y la Sabana.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores de edad acompañados de adultos responsables",
              "experiencia": "No requiere experiencia previa",
              "incluye": "El servicio de ciclomontañismo en el Refugio de Alta Güita incluye bicicleta de montaña profesional, casco protector, guía, charla técnica de seguridad y un recorrido de 120 minutos por los senderos naturales de la región.",
              "recomendaciones": "Para realizar la actividad se recomienda usar ropa deportiva cómoda, zapatos con buena tracción, aplicar protector solar, llevar hidratación adicional, haber desayunado 2 horas antes y llegar con 15 minutos de anticipación para el ajuste del equipo e instrucciones de seguridad."
            },
            "precio": 60000
          }
        ]
      },
      {
        "id": 15,
        "oferente": "Brisas del Tomine ",
        "horario": {
          "abren": "10:00 am",
          "cierran": "5:00 pm"
        },
        "metodosDePago": "Transferencias, billeteras digitales y efectivo. ",
        "destino_id": 2,
        "actividad": [
          {
            "name": "Velero Brisas del Tomine",
            "items": {
              "Tipo": "Náuticos"
            },
            "duracion": 60,
            "dificultad": "Baja",
            "capacidad": 20,
            "description": "Velero Brisas del Tomine",
            "itinerario": "Vive una experiencia única navegando en velero por el majestuoso Embalse del Tominé. Rodeado de paisajes montañosos y aguas con mucha historia, aprenderás los fundamentos básicos de la navegación mientras disfrutas de la tranquilidad y la brisa fresca. Esta aventura es ideal para planes románticos, sorpresas especiales o simplemente escapar de la rutina. Contempla el atardecer desde el agua mientras vives un momento mágico e inolvidable.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "Sin experiencia previa. Se brinda capacitación básica.",
              "incluye": "Todo el equipo necesario (velero, chaleco salvavidas, equipo de seguridad)",
              "recomendaciones": "Para reservar: Realizar el pago del 50% con mínimo 7 días de anticipación"
            },
            "precio": 80000
          },
          {
            "name": "Encuentro de Armonía",
            "items": {
              "Tipo": "Relajantes"
            },
            "duracion": 90,
            "dificultad": "Baja",
            "capacidad": 20,
            "description": "Encuentro de Armonía",
            "itinerario": "Encuentra la paz interior y la armonía con nuestras sesiones de yoga, meditación y trabajo interior profundo. Estas actividades están diseñadas para ayudarte a relajarte, rejuvenecer y conectar contigo mismo en un entorno sereno.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Menores acompañados de adultos responsables",
              "experiencia": "Sin experiencia previa. Se brinda capacitación básica.",
              "incluye": "Todo el equipo necesario.",
              "recomendaciones": "Para reservar: Realizar el pago del 50%."
            },
            "precio": 125000
          }
        ]
      },
      {
        "id": 16,
        "oferente": "CAR",
        "horario": {
          "abren": "9:00 am",
          "cierran": "4:00 pm"
        },
        "metodosDePago": "Solo Efectivo",
        "destino_id": 2,
        "actividad": [
          {
            "name": "Laguna del Cacique Guatavita",
            "items": {
              "Tipo": "Ancestral"
            },
            "duracion": 120,
            "dificultad": "Media",
            "capacidad": 100,
            "description": "Laguna del Cacique Guatavita",
            "itinerario": "A tan solo 57 kilómetros de Bogotá, a 3.100 metros sobre el nivel del mar, se encuentra la mítica Laguna de Guatavita. Este santuario natural, bordeado por el Embalse del Tominé, cautiva con sus aguas verde esmeralda que fueron testigo de la legendaria ceremonia de El Dorado. Lugar sagrado para los Muiscas, la laguna se ha convertido en un destino imperdible para aquellos que buscan conectar con la historia ancestral y encontrar un espacio de reflexión en medio de la naturaleza.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Apto para toda edad",
              "experiencia": "No requiere experiencia previa. Se realiza recorrido guiado de 2 horas con acompañamiento permanente de guía CAR.",
              "incluye": "Guía certificado CAR, acceso a los tres miradores empedrados, visita al Kusmuy, recorrido por senderos naturales",
              "recomendaciones": "Es indispensable pagar en efectivo ya que no hay datáfonos. Los vehículos deben dejarse en parqueaderos autorizados. No se permite el ingreso de alimentos, bebidas, mascotas, drones, icopor ni plásticos de un solo uso. El recorrido sale cada 15-20 minutos, por lo que se sugiere llegar con tiempo. Use el baño antes de iniciar pues no hay más puntos durante el trayecto. Es obligatorio permanecer con el grupo y el guía en todo momento, sin tomar senderos no autorizados. Conserve su boleta durante la visita. Se prohíbe el consumo de alcohol y alucinógenos. Se debe respetar la fauna, flora e infraestructura del lugar. Se recomienda usar ropa y calzado cómodo para la caminata. Precios INGRESO ORIUNDO: $4.000, INGRESO NACIONAL: $19.500, INGRESO EXTRANJERO: $28.000"
            },
            "precio": 19500
          }
        ]
      },
      {
        "id": 18,
        "oferente": "Las Tres Viejas",
        "horario": {
          "abren": "8:00 am",
          "cierran": "6:00 pm"
        },
        "metodosDePago": "Todos los métodos de pago.",
        "destino_id": 2,
        "actividad": [
          {
            "name": "Taller de meditación y yoga",
            "items": {
              "Tipo": "Relajantes"
            },
            "duracion": 120,
            "dificultad": "Baja",
            "capacidad": 30,
            "description": "Taller de meditación y yoga",
            "itinerario": "Vive un taller experiencial de meditación, yoga y trabajo interior guiado por un profesional idóneo, en un espacio diseñado especialmente para la tranquilidad y la introspección. Este hermoso salón circular, rodeado de naturaleza, jardines y paisajes impresionantes, te invita a conectar contigo mismo en un entorno único que favorece la calma y la armonía. Un lugar perfecto para desconectarte del mundo exterior y sumergirte en una experiencia de bienestar profundo y renovación.",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Apto para toda edad",
              "experiencia": "No se requiere experiencia previa en yoga o meditación",
              "incluye": "Guía profesional, espacio especialmente diseñado para la meditación y yoga, colchonetas y cojines para la práctica",
              "recomendaciones": "Usar ropa cómoda, traer una botella de agua y, si lo deseas, un cuaderno para anotar reflexiones personales"
            },
            "precio": 150000
          },
          {
            "name": "Pasa Día Ojo de Agua",
            "items": {
              "Tipo": "Familiar"
            },
            "duracion": 480,
            "dificultad": "Baja",
            "capacidad": 70,
            "description": "Pasa Día Ojo de Agua",
            "itinerario": "En este pasadía en la finca Ojo de Agua podrás disfrutar de un día lleno de tranquilidad y diversión en un entorno natural único. Tendrás acceso a amplias zonas verdes, perfectas para relajarte o dar un paseo, y podrás hacer uso del BBQ y la zona de fogata, ideal para preparar un delicioso asado. Si prefieres, también puedes organizar un almuerzo familiar en nuestras instalaciones, diseñadas para que pases momentos inolvidables. Además, la tarifa incluye un desayuno o almuerzo, para que solo te preocupes por disfrutar. ¡Un lugar pensado para que la pases de lujo!",
            "calificacion": 0,
            "requisitosRecomendaciones": {
              "edad": "Apto para toda edad",
              "experiencia": "No se requiere experiencia previa.",
              "incluye": "Acceso a zonas verdes, BBQ, zona de fogata, y desayuno o almuerzo.",
              "recomendaciones": "Se recomienda llevar ropa cómoda y protector solar para disfrutar al máximo de las actividades al aire libre."
            },
            "precio": 140000
          }
        ]
      }
    ],
    "rutas": [
      {
        "id": 2,
        "destino_id": 1,
        "nombre": "Camino del Amor",
        "descripcion": "El camino de piedra es un antiguo sendero utilizado por los locales antes de la construcción de las carreteras. Es un camino colonial que atraviesa un bosque ubicado justo frente a las imponentes rocas, ideal para el senderismo, relajarse, disfrutar del aire libre y capturar excelentes paisajes para fotografías.",
        "etiquetas": {
          "etiquetas": [
            "Pet Friendly",
            "Bosque",
            "Colonial"
          ]
        },
        "distancia": 2.3,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Bosque",
        "items": {
          "Tipo": "Colonial"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 40,
        "img": "https://res.cloudinary.com/dmyq0gr14/image/upload/v1729802981/Rutas/Camino%20de%20Piedra/w0fyvn88tvxnjdszmbvs.jpg"
      },
      {
        "id": 26,
        "destino_id": 1,
        "nombre": "Pictogramas",
        "descripcion": "Las rocas de Suesca revelan un tesoro espectacular de nuestros ancestros: sus increíbles pictogramas, arte rupestre que ha sobrevivido el paso del tiempo. Estas pinturas rojas y ocres, plasmadas en las majestuosas paredes de arenisca, son un testimonio brutal de las civilizaciones indígenas que habitaron Cundinamarca, convirtiendo a Suesca en un museo al aire libre que vale totalmente la pena explorar.",
        "etiquetas": {
          "etiquetas": [
            "Historico"
          ]
        },
        "distancia": 0.86,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Recto",
        "items": {
          "Tipo": "Histórico"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 20,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1733584169/rutas/escalando-el-bosque/ubwhbt3ufpna1uvkjpo2.jpg"
      },
      {
        "id": 1,
        "destino_id": 1,
        "nombre": "Virgen de la Z",
        "descripcion": "El Alto de la Virgen es un lugar sagrado en la cima de una montaña, ofreciendo vistas impresionantes de la sabana. Es perfecto para locales y turistas que buscan una experiencia espiritual, reflexionar, tomar fotos y relajarse en un entorno sereno.",
        "etiquetas": {
          "etiquetas": [
            "Pet Friendly",
            "Monumento",
            "Bosque",
            "Camino Irregular",
            "Paisajes",
            "Montaña"
          ]
        },
        "distancia": 2.6,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Monumento"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 45,
        "img": "https://res.cloudinary.com/dmyq0gr14/image/upload/v1729788635/Rutas/Virgen%20de%20la%20Z/wggqu2bp1vobk375rkec.jpg"
      },
      {
        "id": 31,
        "destino_id": 1,
        "nombre": "Cañón de la Lechuza",
        "descripcion": "El Cañón de las Lechuzas es un sitio super espectacular en Suesca, donde podrás vivir una aventura increíble entre rocas gigantes. Durante el recorrido te vas a encontrar con paisajes que te dejarán sin palabras, podrás ver aves súper chéveres y tomar fotos que te harán triunfar en Instagram. Y si tienes suerte, hasta podrías ver las lechuzas que le dan nombre a este lugar mágico. ¡Es un plan brutal que tienes que hacer sí o sí!",
        "etiquetas": {
          "etiquetas": [
            "Cañon"
          ]
        },
        "distancia": 0.0,
        "veces_recomendada": 3,
        "completaron_ruta": 3,
        "terreno": "Recto",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 55,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1733709123/rutas/can-de-la-lechuza/szo3kqusyfu63s1nub52.jpg"
      },
      {
        "id": 4,
        "destino_id": 1,
        "nombre": "Mirador del Halcón",
        "descripcion": "El Valle de los Halcones es un destino ideal de ecoturismo, perfecto para relajarse, disfrutar de un día de picnic con amigos o en pareja y capturar excelentes fotografías. Ofrece vistas panorámicas de la sabana, las majestuosas rocas de Suesca y el cañón del río Bogotá, todo en un ambiente tranquilo que invita a compartir momentos especiales, apreciar un buen atardecer o simplemente desconectar y disfrutar del paisaje.",
        "etiquetas": {
          "etiquetas": [
            "Montaña",
            "Cañon",
            "Pet Friendly",
            "Picnic"
          ]
        },
        "distancia": 2.3,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 45,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1733759892/rutas/mirador-del-halcon/mxxupbqr7ls8uhzasdmg.jpg"
      },
      {
        "id": 37,
        "destino_id": 1,
        "nombre": "Quebrada la Susana",
        "descripcion": "La Quebrada La Susana es un tesoro natural oculto tras la montaña de la Virgen de la Z, donde el agua cristalina forma una secuencia cautivadora de pequeñas cascadas naturales. Este remanso de paz ofrece pozos naturales que funcionan como piscinas zen, perfectos para refrescar los pies mientras se disfruta del sonido relajante del agua. Sus formaciones escalonadas no solo crean un ambiente perfecto para la fotografía, sino que también brindan espacios íntimos para conectar con la naturaleza, convirtiéndola en un escape ideal para quienes buscan un momento de serenidad lejos del bullicio urbano.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 3.34,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 65,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1735247478/oswxjegleas6zmnzomb5.jpg"
      },
      {
        "id": 33,
        "destino_id": 1,
        "nombre": "Túnel del Agua",
        "descripcion": "Explora un fascinante túnel histórico construido durante la expansión del ferrocarril en Colombia. Este paso subterráneo, diseñado para canalizar una quebrada natural, te sumerge en un viaje al pasado mientras te rodea de exuberante naturaleza. Una caminata de aventura que combina historia ferroviaria con la belleza del entorno natural de Suesca.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 2.4,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Histórico"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 45,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1733960034/dyyrniuqbux9ognvkzwj.jpg"
      },
      {
        "id": 32,
        "destino_id": 1,
        "nombre": "Mirador El Pino",
        "descripcion": "Una ruta imperdible!, embárcate en una aventura por la montaña más alta de Suesca, un recorrido fascinante que te llevará a atravesar dos imponentes antenas de telecomunicaciones. Disfruta de vistas panorámicas únicas de la sabana que te dejarán sin aliento. ¡Prepárate para conectar con la naturaleza desde lo más alto!",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 1.37,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 28,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1733839442/rutas/las-antenas/ecpohfodpxklkns7aoyc.jpg"
      },
      {
        "id": 36,
        "destino_id": 1,
        "nombre": "Ruta Pratimonial",
        "descripcion": "Descubre los lugares más históricos de Suesca en esta ruta que combina cultura y tradición. Comienza en la Plaza del Mercado, un punto lleno de vida local, y sigue hacia el Parque Principal, centro de reunión y símbolo de la comunidad. Visita la Iglesia, con su imponente arquitectura, y la Casa de la Cultura, donde se preserva la esencia artística e histórica del municipio. Explora el encantador Hotel Casona, un ícono de la época colonial, y culmina en el Cementerio Local, un lugar lleno de memoria y legado. Una experiencia única para conectar con la historia de Suesca.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 0.78,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Urbano",
        "items": {
          "Tipo": "Histórico"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 18,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1734701373/bmfytxhiwzzptu1mucud.jpg"
      },
      {
        "id": 34,
        "destino_id": 1,
        "nombre": "Mirador de las Rocas",
        "descripcion": "Un pintoresco sendero te guía hacia un mirador desde donde podrás admirar la majestuosidad de las formaciones rocosas, que se alzan como guardianes naturales del paisaje. Desde este punto estratégico, se despliega ante tus ojos una vista panorámica del pueblo, sus encantadoras veredas y los imponentes paisajes que lo rodean, invitándote a disfrutar de la serenidad y belleza que solo la naturaleza puede ofrecer.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 0.67,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 24,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1734114632/rutas/por-arriba-de-las-rocas/bql2ktkoobihmw5ccdx4.jpg"
      },
      {
        "id": 35,
        "destino_id": 1,
        "nombre": "Puente El Viaducto",
        "descripcion": "Explora el histórico sendero de Los Rieles, un fascinante recorrido que sigue el antiguo viaducto ferroviario de Suesca. Este camino bordeado por impresionantes formaciones rocosas y túneles centenarios te transporta a la época dorada del ferrocarril colombiano, mientras te ofrece vistas espectaculares del valle y las montañas circundantes. Una aventura única donde la historia y la naturaleza se encuentran.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 4.6,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Histórico"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 73,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1734242203/ua5jwzond9dw2miuwsrd.jpg"
      },
      {
        "id": 38,
        "destino_id": 2,
        "nombre": "Mirador El Ascenso",
        "descripcion": "Ubicado estratégicamente antes de iniciar el ascenso al majestuoso Cerro de Las Tres Viejas, el Mirador El Ascenso es un punto perfecto para conectarse con la naturaleza. Su acceso comienza con un tramo montañoso que poco a poco se transforma en una carretera destapada, ideal para los amantes de las caminatas y los recorridos tranquilos. Este mirador público ofrece vistas panorámicas impresionantes de los paisajes andinos, convirtiéndolo en un lugar perfecto para descansar, disfrutar de la brisa fresca y contemplar la belleza natural de Sesquilé.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 2.6,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 35,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737039039/rutas/mirador-el-ascenso/l0exgxn8rfmsdnolqopv.jpg"
      },
      {
        "id": 30,
        "destino_id": 1,
        "nombre": "La Luciérnaga",
        "descripcion": "En este Spot te encuentras con un paisaje espectacular, donde la naturaleza es la absoluta protagonista - el río fluye cerca con su sonido súper relajante, mientras descansas en una especie de iglú natural formado por la vegetación silvestre. ¡Es brutal! Podrás sentarte tranquilamente a la orilla del río y contemplar cómo el agua serpentea entre las majestuosas rocas y árboles nativos, en un espacio increíblemente tranquilo donde solo tú y la naturaleza son testigos de este momento.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 2.68,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Recto",
        "items": {
          "Tipo": "Rio"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 35,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1736911873/rutas/la-lucirnaga/wlzdyxviuowjjyexjelq.jpg"
      },
      {
        "id": 39,
        "destino_id": 2,
        "nombre": "Las Tres Viejas",
        "descripcion": "La travesía hacia el Cerro de Las Tres Viejas inicia con un sendero montañoso que lleva al Mirador El Ascenso, un lugar público y sereno ideal para disfrutar de vistas panorámicas y tomar un breve descanso. Desde este punto, el recorrido continúa por un camino destapado y montañoso que se adentra en paisajes andinos llenos de vegetación y aire puro. A medida que avanzas, el terreno se vuelve más retador, ofreciendo una experiencia perfecta para los amantes del senderismo y la naturaleza. Al llegar a la cima, las vistas espectaculares recompensan cada paso del ascenso.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 4.8,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Alta",
        "tiempo": 80,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737039685/rutas/las-tres-viejas/dzutjgpjps467997u5fm.jpg"
      },
      {
        "id": 41,
        "destino_id": 2,
        "nombre": "La Chorrera",
        "descripcion": "La Chorrera es un mágico sendero que te guiará a través de múltiples cascadas, culminando en una impresionante caída de agua de gran altura. Este paraje natural te ofrece una experiencia única donde podrás desconectarte del mundo cotidiano y sumergirte en la serenidad de la naturaleza pura. Cada paso te acerca más a un espectáculo natural que vale la pena descubrir.",
        "etiquetas": {
          "etiqueta": [
            "Pet-Friendly"
          ]
        },
        "distancia": 2.95,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 95,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737050471/papo2elyxtnsomit5cxq.jpg"
      },
      {
        "id": 46,
        "destino_id": 2,
        "nombre": "Ruta Patrimonial",
        "descripcion": "Embárcate en una ruta única por Sesquilé, un viaje que fusiona la cultura y la tradición en cada paso. Comienza tu recorrido en la histórica Casa Antonio Nariño, hoy sede del Concejo Municipal, y adéntrate en el encanto de la Capilla de Nuestra Señora de los Dolores. Continúa hacia el Santísimo, un lugar de paz y reflexión donde podrás entrar, rezar y conectarte profundamente contigo mismo. Más adelante, te espera la majestuosa Iglesia Inmaculada Concepción, un verdadero tesoro arquitectónico. Luego, déjate envolver por las historias y tradiciones de la Calle de los Murales, una galería al aire libre que cuenta la esencia del pueblo. Finaliza tu viaje en la Embajada Campesina, donde podrás descubrir y llevarte productos auténticos, directamente del corazón de la región.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 0.5,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Urbano",
        "items": {
          "Tipo": "Histórico"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 30,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737696200/zdcv0klnagkzhphwtkka.jpg"
      },
      {
        "id": 44,
        "destino_id": 2,
        "nombre": "Quebrada Seca",
        "descripcion": "¡Descubre este rincón mágico en Sesquilé! Una quebrada cristalina que fluye bajo una imponente roca, creando el spot perfecto para desconectarte del mundo. Es el lugar ideal para parchar con tus amigos, echar historia y dejarte llevar por el relajante sonido del agua. Un espacio natural único donde los buenos momentos y las charlas memorables fluyen tan naturalmente como el agua bajo la piedra.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 1.45,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Trocha",
        "items": {
          "Tipo": "Trocha"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 50,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737144563/rutas/quebrada-seca/lc8vqzhevnokvk14q17f.jpg"
      },
      {
        "id": 43,
        "destino_id": 2,
        "nombre": "Cueva de los Murciélagos",
        "descripcion": "En las alturas de Sesquilé, descubre un sendero mágico donde la naturaleza te sorprende a cada paso. Mientras recorres el camino, te encontrarás con miradores que revelan vistas espectaculares del paisaje cundinamarqués. La ruta te guía hacia dos tesoros naturales: una hermosa cascada que canta entre las rocas y una misteriosa cueva que se adentra en las profundidades de la montaña. Una aventura perfecta para conectar con la naturaleza y descubrir los secretos que guarda Sesquilé.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 0.67,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Cuevas"
        },
        "calificacion": 0.0,
        "dificultad": "Baja",
        "tiempo": 20,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737137275/rutas/cueva-de-los-murcilagos/hqdi5q8tuaclkra7y7op.jpg"
      },
      {
        "id": 42,
        "destino_id": 2,
        "nombre": "Mirador de la Sabana",
        "descripcion": "¡Súbete a uno de los mejores balcones naturales de Sesquilé! Este mirador es un spot increíble donde podrás ver toda la sabana de Suesca y Sesquilé desde las alturas. Imagina estar rodeado de pinos gigantes mientras contemplas un paisaje que te deja sin palabras. ¡Es el lugar perfecto para parchar con amigos y tomarte esas fotos que van directo a las redes y para desconectarte un rato del mundo!",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 0.7,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Medio",
        "tiempo": 30,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737133563/rutas/mirador-de-la-sabana/ecbblsckxhkzqunhpfbi.jpg"
      },
      {
        "id": 45,
        "destino_id": 2,
        "nombre": "Mirador de la Z",
        "descripcion": "¡Descubre el mirador de la Z en la vereda El Gobernador, un parche increíble en lo alto de Sesquilé! La subida es pura adrenalina: un zigzag empinado que te hace sudar pero vale totalmente la pena. Cuando llegues arriba, te vas a quedar sin palabras con la vista espectacular del Embalse de Tominé y todo Sesquilé a tus pies. Ya sea que vengas en bici (si le metes duro al deporte) o prefieras una buena caminata, este spot es perfecto para salir de la rutina y conectarte con la naturaleza.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 2.87,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Trocha",
        "items": {
          "Tipo": "Trocha"
        },
        "calificacion": 0.0,
        "dificultad": "Alta",
        "tiempo": 90,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737149022/rutas/mirador-de-la-z/tryvnx2ao6kd9zlzbzjf.jpg"
      },
      {
        "id": 47,
        "destino_id": 2,
        "nombre": "Cerro Covadonga",
        "descripcion": "¡Descubre la aventura salvaje de Cerro Covadonga! Un ascenso desafiante que transforma cada paso en una experiencia épica de Sesquilé. Imagina un sendero que serpentea entre paisajes de páramo, donde cada curva revela vistas panorámicas que roban el aliento. Desde el corazón del pueblo, tu travesía te elevará por senderos naturales hasta conquistar los 3,200 metros que coronan este tesoro de Cundinamarca. No es solo una caminata, es una inmersión total en la magia de los Andes colombianos, donde la naturaleza te desafía y te premia con horizontes infinitos. Prepárate para una ruta que no solo recorrerás, sino que vivirás intensamente.",
        "etiquetas": {
          "etiquetas": [
            "Pet-Friendly"
          ]
        },
        "distancia": 4.8,
        "veces_recomendada": 0,
        "completaron_ruta": 0,
        "terreno": "Montañoso",
        "items": {
          "Tipo": "Montaña"
        },
        "calificacion": 0.0,
        "dificultad": "Media",
        "tiempo": 80,
        "img": "https://res.cloudinary.com/destinoplus/image/upload/v1737737584/hiaitkfgzhrfjlgx6kzf.jpg"
      }
    ],
    "instrucciones": [
      {
        "id": 5,
        "ruta_id": 1,
        "recomendaciones": "Recuerda llevar hidratación, aplicarte bloqueador solar y usar gorra. La ruta es pet-friendly, pero el ingreso de mascotas está prohibido en el monumento. Asegúrate de llevar agua y algunos snacks para ti y tu mascota durante el trayecto. También puedes llevar una vela como ofrenda, ya que en la parte trasera del monumento hay una sección especial para este tipo de gestos. Sé respetuoso con el lugar, no dañes el monumento, ni alteres la fauna y flora del entorno. No ensucies ni dejes basura.",
        "accesibilidad": "La ruta principal es accesible y adecuada para personas que prefieren un camino más cómodo, ideal para quienes puedan tener alguna complicación física. Los atajos, en cambio, presentan mayor dificultad debido a su inclinación, denso follaje y senderos menos visibles, por lo que es recomendable evitarlos si buscas una experiencia más relajada.",
        "conservacion": "Para contribuir a la conservación del entorno, es fundamental respetar tanto el monumento como la flora y fauna de la ruta. Evita dañar o alterar la vegetación, y sigue siempre los caminos señalados para minimizar el impacto ambiental. Si llevas una vela como ofrenda, utiliza únicamente el espacio destinado para ello. No dejes basura y asegúrate de llevar tus desechos contigo. Si vas con mascota, cuida que no interfiera con la fauna local, y mantén el lugar limpio. El respeto por el entorno es clave para preservar la belleza y el valor natural de este sitio."
      },
      {
        "id": 6,
        "ruta_id": 2,
        "recomendaciones": "Recuerda llevar hidratación, aplicarte bloqueador solar y usar gorra. La ruta es pet-friendly, pero debes tener cuidado con las casas aledañas. Asegúrate de llevar agua y algunos snacks para ti y tu mascota durante el trayecto. No alteres la fauna y flora del entorno. No ensucies ni dejes basura.",
        "accesibilidad": "La ruta principal es accesible y adecuada para personas que prefieren un camino más cómodo, ideal para quienes puedan tener alguna complicación física. Los atajos, en cambio, presentan mayor dificultad debido a su inclinación, denso follaje y senderos menos visibles, por lo que es recomendable evitarlos si buscas una experiencia más relajada.",
        "conservacion": "Para contribuir a la conservación del entorno, es fundamental respetar la flora y fauna de la ruta. Evita dañar o alterar la vegetación, y sigue siempre los caminos señalados para minimizar el impacto ambiental. No dejes basura y asegúrate de llevar tus desechos contigo. Si vas con mascota, cuida que no interfiera con la fauna local, y mantén el lugar limpio. El respeto por el entorno es clave para preservar la belleza y el valor natural de este sitio."
      },
      {
        "id": 8,
        "ruta_id": 4,
        "recomendaciones": "Recuerda llevar hidratación, aplicarte bloqueador solar y usar gorra. La ruta es pet-friendly, pero debes tener cuidado con las casas aledañas. Asegúrate de llevar agua y algunos snacks para ti y tu mascota durante el trayecto. No alteres la fauna y flora del entorno. No ensucies ni dejes basura.",
        "accesibilidad": "La ruta es accesible y adecuada para personas que prefieren una caminata cómoda, ideal para quienes prefieran una experiencia mas relajada.",
        "conservacion": "Para contribuir a la conservación del entorno, es fundamental respetar la flora y fauna de la ruta. Evita dañar o alterar la vegetación, y sigue siempre los caminos señalados para minimizar el impacto ambiental. No dejes basura y asegúrate de llevar tus desechos contigo. Si vas con mascota, cuida que no interfiera con la fauna local, y mantén el lugar limpio. El respeto por el entorno es clave para preservar la belleza y el valor natural de este sitio."
      },
      {
        "id": 36,
        "ruta_id": 38,
        "recomendaciones": "Para disfrutar de este espacio tranquilo, lleva ropa cómoda y calzado adecuado para senderos de tierra. Es recomendable llevar agua, protector solar y algo ligero para comer. Visita el mirador en horas de la mañana para aprovechar la vista y evitar el calor. Siempre informa a alguien sobre tu visita y, si es posible, realiza el recorrido acompañado.",
        "accesibilidad": "El acceso al Mirador El Ascenso es moderado, ideal para principiantes. El camino combina senderos montañosos y carretera destapada, lo cual requiere precaución, especialmente en días lluviosos. No es apto para vehículos ni para personas con movilidad reducida.",
        "conservacion": "Mantén limpio el espacio llevando de regreso tus residuos. Evita dañar la vegetación o alterar la fauna local. No está permitido hacer fogatas ni extraer elementos naturales. Respetar el entorno garantiza la conservación del mirador para futuros visitantes."
      },
      {
        "id": 28,
        "ruta_id": 31,
        "recomendaciones": "Te damos el dato: la mejor forma de hacer esta ruta es en bici, te ahorras tiempo porque es larguita. Pero si prefieres ir a pie, ¡también está super! Solo asegúrate de llevar buena hidratación, varios snacks para el camino y protégete de los mosquitos - nada grave pero mejor prevenir. Ah, y súper importante: celular bien cargado porque te vas a querer tomar mil fotos. ¡Los paisajes están brutales! Solo necesitas buena actitud y listo para la aventura.",
        "accesibilidad": "La ruta es accesible para todos, está super bien para recorrerla en bici de montaña. Si vas a pie, ponte unos zapatos cómodos y ten cuidado donde pisas porque hay algunas piedras en el camino que podrían hacerte tropezar. ¡Nada del otro mundo, pero mejor ir prevenido!",
        "conservacion": "¡Hey! Para mantener este lugar tan increíble como lo encontraste, hay algunas cositas importantes: quédate siempre en los senderos marcados, no arranques plantas ni flores, si ves animalitos solo obsérvalos desde lejos (nada de alimentarlos), y súper importante - llévate toda tu basura de regreso. Ah, y mantén la calma en el lugar, así respetas a todos los habitantes del cañón, ¡especialmente a las lechuzas que son algo tímidas!"
      },
      {
        "id": 23,
        "ruta_id": 26,
        "recomendaciones": "Super importante: durante el recorrido, asegúrate de no salirte del sendero marcado, lleva suficiente agua (¡la hidratación es clave!), y protégete del sol y los mosquitos con gorra y ropa adecuada. Y ojo con estol: según los locales, tocar los pictogramas trae mala suerte, así que ni se te ocurra - además, nada de fotos con flash porque puede dañar estas obras espectaculares. ¡Respetemos y cuidemos nuestro patrimonio!",
        "accesibilidad": "El sendero es bastante amigable - incluso si no eres un experto caminante, ¡lo podrás hacer super tranquilo! Hay algunas rocas que tendrás que pasar, pero es algo manejable. Eso sí, super importante estar pendiente de dónde pisas para evitar tropezones.",
        "conservacion": "¡Hey, super importante! Para proteger este lugar increíble, mantente siempre en el sendero marcado - así cuidamos la fauna y flora del lugar que es espectacular. Y recuerda lo que hablamos antes: nada de tocar los pictogramas, ¡es clave preservar estas obras ancestrales para que otros también puedan disfrutarlas!"
      },
      {
        "id": 27,
        "ruta_id": 30,
        "recomendaciones": "El sendero es bastante amigable - incluso si no eres un experto caminante, ¡lo podrás hacer super tranquilo! Para que tu experiencia sea espectacular, aquí van unos tips importantes: lleva suficiente agua para mantenerte hidratado, usa ropa que te proteja de los mosquitos (nada grave, pero mejor prevenir), asegúrate de que tu celular esté bien cargado para capturar los momentos increíbles, y no olvides unos buenos snacks para mantener la energía.",
        "accesibilidad": "El sendero es super amigable y accesible para todo tipo de personas - ¡no necesitas ser un experto! Aunque el camino es chévere, mantén la atención al pisar porque hay algunas piedras que no perdonan. Nada grave, pero es mejor prevenir cualquier tropezón.",
        "conservacion": "¡Super importante! Sigue siempre el sendero marcado para proteger la vegetación, y ojo con esto que es clave: nada de arrojar residuos al río ni dejar basura por ahí - la idea es cuidar al máximo la flora y fauna del lugar. ¡Es importante poder disfrutar de estos espacios naturales, así que hagamos nuestra parte para conservarlos!"
      },
      {
        "id": 24,
        "ruta_id": 27,
        "recomendaciones": "Se recomienda utilizar zapatos apropiados para senderos resbalosos, vestir ropa que permita una buena flexibilidad y siempre sostenerse de la guaya que se encuentra al inicio del sendero más empinado, la cual se debe usar siempre ya que te llevará hasta la cima. Además, se sugiere guardar el celular durante el tramo más empinado. Sin embargo, este sendero está diseñado únicamente para personas con una alta experiencia en excursiones, ya que existen partes demasiado complicadas que pueden representar un riesgo para quienes no están acostumbrados a este tipo de actividades. Por lo tanto, no se recomienda que niños, personas con condiciones físicas o aquellos que sufren de nerviosismo o miedo a las alturas realicen este trayecto, siendo lo más apropiado que escojan una ruta alternativa.",
        "accesibilidad": "Aunque la mayoría del camino es recto al iniciar la ruta para llegar a la cima, hay un tramo muy empinado y resbaloso. Por lo tanto, solo se recomienda realizar esta ruta para personas experimentadas en este tipo de terrenos y actividades. Se recomienda abstenerse de realizar la ruta sin compañía de un profesional o sin la experiencia necesaria, ya que puede representar un riesgo considerable.",
        "conservacion": "Para mantener este lugar tan increíble como lo encontraste, hay algunas cositas importantes: quédate siempre en los senderos marcados, no arranques plantas ni flores, si ves animalitos solo obsérvalos desde lejos (nada de alimentarlos), y súper importante - llévate toda tu basura de regreso. Ah, y mantén la calma en el lugar, así respetas a todos los habitantes del bosque."
      },
      {
        "id": 29,
        "ruta_id": 32,
        "recomendaciones": "Para disfrutar al máximo esta experiencia, asegúrate de llevar calzado adecuado para senderismo, ropa cómoda y protección contra el sol, como gorra y bloqueador solar. No olvides llevar suficiente agua para mantenerte hidratado durante el recorrido, así como algunos snacks para recuperar energía. Antes de iniciar, revisa las condiciones climáticas y prepárate para capturar las vistas panorámicas con tu cámara.",
        "accesibilidad": "La ruta presenta una dificultad media, ideal para personas con una condición física moderada y experiencia básica en senderismo. El recorrido es exclusivamente peatonal, por lo que no está habilitado para vehículos. Si tienes movilidad reducida o requerimientos especiales, considera rutas alternativas más accesibles.",
        "conservacion": "Es fundamental preservar la belleza natural del lugar. Respeta la flora y fauna local, evitando cualquier interacción que pueda dañarlas. Lleva contigo una bolsa para tus residuos y no dejes basura en la ruta. Procura no tocar ni retirar elementos del entorno, como piedras o plantas, y sigue siempre los senderos establecidos para minimizar el impacto ambiental. ¡Tu cuidado asegura que otros puedan disfrutarlo también!"
      },
      {
        "id": 30,
        "ruta_id": 33,
        "recomendaciones": "Para disfrutar al máximo esta experiencia, asegúrate de llevar calzado adecuado para senderismo, ropa cómoda y protección contra el sol, como gorra y bloqueador solar. No olvides llevar suficiente agua para mantenerte hidratado durante el recorrido, así como algunos snacks para recuperar energía. Antes de iniciar, revisa las condiciones climáticas y prepárate para capturar las vistas panorámicas con tu cámara.",
        "accesibilidad": "a ruta presenta una dificultad media, ideal para personas con una condición física moderada y experiencia básica en senderismo. El recorrido es exclusivamente peatonal, por lo que no está habilitado para vehículos. Si tienes movilidad reducida o requerimientos especiales, considera rutas alternativas más accesibles.",
        "conservacion": "Es fundamental preservar la belleza natural del lugar. Respeta la flora y fauna local, evitando cualquier interacción que pueda dañarlas. Lleva contigo una bolsa para tus residuos y no dejes basura en la ruta. Procura no tocar ni retirar elementos del entorno, como piedras o plantas, y sigue siempre los senderos establecidos para minimizar el impacto ambiental. ¡Tu cuidado asegura que otros puedan disfrutarlo también!"
      },
      {
        "id": 33,
        "ruta_id": 36,
        "recomendaciones": "Para disfrutar al máximo esta ruta histórica, utiliza calzado cómodo y lleva hidratación. Recuerda protegerte del sol con sombrero y bloqueador, especialmente durante los recorridos al aire libre. Una cámara será indispensable para capturar los momentos más destacados de cada lugar. Respeta los horarios de visita y las indicaciones de los guías locales para garantizar una experiencia agradable y segura.",
        "accesibilidad": "La ruta está diseñada para ser accesible para la mayoría de los visitantes. Los puntos principales, como la Plaza del Mercado, el Parque Principal y la Iglesia, cuentan con caminos pavimentados y de fácil acceso. Algunos lugares, como el Cementerio Local o el Hotel Casona, pueden incluir escalones o terrenos irregulares, por lo que se recomienda verificar previamente las condiciones si se tienen necesidades específicas de movilidad.",
        "conservacion": "Ayuda a preservar la belleza e historia de estos lugares evitando dejar basura y respetando las áreas verdes y monumentos. En sitios históricos, no toques elementos antiguos o delicados para garantizar su mantenimiento. Apoya el desarrollo sostenible adquiriendo productos locales y promoviendo el cuidado de este valioso patrimonio cultural."
      },
      {
        "id": 32,
        "ruta_id": 35,
        "recomendaciones": "Para disfrutar al máximo esta experiencia, asegúrate de llevar calzado adecuado para senderismo, ropa cómoda y protección contra el sol, como gorra y bloqueador solar. No olvides llevar suficiente agua para mantenerte hidratado durante el recorrido, así como algunos snacks para recuperar energía. Antes de iniciar, revisa las condiciones climáticas y prepárate para capturar las vistas panorámicas con tu cámara.",
        "accesibilidad": "La ruta presenta una dificultad media, ideal para personas con una condición física moderada y experiencia básica en senderismo. El recorrido es exclusivamente peatonal, por lo que no está habilitado para vehículos. Si tienes movilidad reducida o requerimientos especiales, considera rutas alternativas más accesibles.",
        "conservacion": "Es fundamental preservar la belleza natural del lugar. Respeta la flora y fauna local, evitando cualquier interacción que pueda dañarlas. Lleva contigo una bolsa para tus residuos y no dejes basura en la ruta. Procura no tocar ni retirar elementos del entorno, como piedras o plantas, y sigue siempre los senderos establecidos para minimizar el impacto ambiental. ¡Tu cuidado asegura que otros puedan disfrutarlo también!"
      },
      {
        "id": 34,
        "ruta_id": 37,
        "recomendaciones": "Recuerda llevar hidratación, aplicarte bloqueador solar y usar gorra. La ruta es pet-friendly. Asegúrate de llevar agua y algunos snacks para ti y tu mascota durante el trayecto.  Sé respetuoso con el lugar, no dañes el lugar, ni alteres la fauna y flora del entorno. No ensucies ni dejes basura.",
        "accesibilidad": "La ruta principal es accesible y adecuada para personas que prefieren un camino más cómodo, ideal para quienes puedan tener alguna complicación física. Los atajos, en cambio, presentan mayor dificultad debido a su inclinación, denso follaje y senderos menos visibles, por lo que es recomendable evitarlos si buscas una experiencia más relajada.",
        "conservacion": "Para contribuir a la conservación del entorno, es fundamental respetar tanto el monumento como la flora y fauna de la ruta. Evita dañar o alterar la vegetación, y sigue siempre los caminos señalados para minimizar el impacto ambiental. No dejes basura y asegúrate de llevar tus desechos contigo. Si vas con mascota, cuida que no interfiera con la fauna local, y mantén el lugar limpio. El respeto por el entorno es clave para preservar la belleza y el valor natural de este sitio."
      },
      {
        "id": 31,
        "ruta_id": 34,
        "recomendaciones": "Para disfrutar al máximo esta experiencia, asegúrate de llevar calzado adecuado para senderismo, ropa cómoda y protección contra el sol, como gorra y bloqueador solar. No olvides llevar suficiente agua para mantenerte hidratado durante el recorrido, así como algunos snacks para recuperar energía. Antes de iniciar, revisa las condiciones climáticas y prepárate para capturar las vistas panorámicas con tu cámara.",
        "accesibilidad": "La ruta presenta una dificultad media, ideal para personas con una condición física moderada y experiencia básica en senderismo. El recorrido es exclusivamente peatonal, por lo que no está habilitado para vehículos. Si tienes movilidad reducida o requerimientos especiales, considera rutas alternativas más accesibles.",
        "conservacion": "Es fundamental preservar la belleza natural del lugar. Respeta la flora y fauna local, evitando cualquier interacción que pueda dañarlas. Lleva contigo una bolsa para tus residuos y no dejes basura en la ruta. Procura no tocar ni retirar elementos del entorno, como piedras o plantas, y sigue siempre los senderos establecidos para minimizar el impacto ambiental. ¡Tu cuidado asegura que otros puedan disfrutarlo también!"
      },
      {
        "id": 35,
        "ruta_id": 40,
        "recomendaciones": "Para tu caminata al Cabildo Indígena, lleva suficiente agua, snacks ligeros y calzado cómodo. Recuerda que entrarás a un territorio sagrado, así que no dejes basura, no toques ni recolectes nada del lugar, mantén la voz baja y sigue siempre el sendero marcado. El respeto por la naturaleza y la cultura Muisca es fundamental.",
        "accesibilidad": "Parcialmente accesible en vehículo, ya que gran parte del trayecto cuenta con carretera pavimentada apta para carros y motos. Sin embargo, el último tramo cambia a un sendero de herradura empinado que solo se puede recorrer a pie. Este segmento final, aunque exigente por su pendiente, te lleva directamente hasta el Cabildo.   Copy Retry",
        "conservacion": "Es fundamental preservar este territorio ancestral Muisca. Al visitarlo, evita dejar cualquier tipo de basura, no alteres la vegetación ni recolectes plantas, y mantén siempre el respeto por este espacio sagrado. Tu compromiso con la conservación ayuda a que futuras generaciones puedan seguir disfrutando de este valioso patrimonio cultural y natural."
      },
      {
        "id": 37,
        "ruta_id": 39,
        "recomendaciones": "Para esta ruta de mayor exigencia, utiliza calzado de senderismo y ropa adecuada para cambios de clima. Lleva suficiente agua, snacks energéticos, protector solar y una chaqueta cortavientos. Comienza temprano y camina en grupo por seguridad. No olvides consultar el clima antes de iniciar el recorrido.",
        "accesibilidad": "Esta ruta es de dificultad media a alta, con senderos empinados y terrenos rocosos. Es ideal para personas con experiencia en senderismo. No es recomendable para niños pequeños, adultos mayores o personas con movilidad reducida. El acceso es solo peatonal.",
        "conservacion": "Protege la naturaleza manteniéndote en los senderos marcados para evitar la erosión. No dejes basura ni dañes la vegetación. Evita el uso de plásticos de un solo uso y no molestes a los animales. El respeto por el entorno asegura que esta ruta siga siendo un paraíso natural."
      },
      {
        "id": 38,
        "ruta_id": 41,
        "recomendaciones": "Para visitar Las Chorreras de Sesquilé lleva suficiente agua, gorra, bloqueador solar y zapatos con buen agarre. La ropa debe ser cómoda y trae un cambio completo pues te mojarás. Aunque hay partes que se pueden cruzar sin equipo especial, ten mucho cuidado pues pueden estar resbalosas. No dejes basura, no extraigas nada del lugar y mantente en los senderos establecidos. Se recomienda ir en grupo y verificar el clima antes de la visita.",
        "accesibilidad": "Aun que no es una ruta de alta exigencia física se requiere buen estado de salud y condición física. No es apta para personas con limitaciones de movilidad, problemas cardíacos, respiratorios o lesiones recientes, ya que el terreno es montañoso y rocoso, con secciones resbalosas y empinadas que requieren trepar. Se recomienda solo para personas con buena agilidad y resistencia física.",
        "conservacion": "Es fundamental respetar este espacio natural: no dejes basura ni rastro de tu visita, no extraigas plantas, rocas o elementos del lugar, mantente siempre en los senderos establecidos para evitar la erosión, y no alteres el ecosistema. Recuerda que las cascadas son un patrimonio natural que debemos preservar para futuras generaciones - lo único que debes llevarte son fotos y lo único que debes dejar son huellas."
      },
      {
        "id": 43,
        "ruta_id": 44,
        "recomendaciones": "teste",
        "accesibilidad": "test",
        "conservacion": "test"
      },
      {
        "id": 40,
        "ruta_id": 43,
        "recomendaciones": "Para disfrutar esta aventura al máximo, lleva calzado apropiado para caminata, hidratación suficiente, bloqueador solar y un refrigerio. Es recomendable llevar linterna si planeas ver la cueva.",
        "accesibilidad": "La ruta presenta un nivel moderado, con terreno irregular y pendientes pronunciadas. No es apta para personas con movilidad reducida, adultos mayores o niños pequeños. Se requiere buena condición física ya que el sendero incluye tramos empinados y zonas rocosas que demandan precaución especial.",
        "conservacion": "Este es un espacio natural que debemos proteger. No dejes basura, mantente siempre en los senderos marcados, no extraigas plantas ni elementos del lugar, evita hacer ruido excesivo que perturbe la fauna local y no realices marcas en la cueva ni en las rocas. Recuerda que tu compromiso con la conservación permite que otros también puedan disfrutar de este tesoro natural."
      },
      {
        "id": 42,
        "ruta_id": 45,
        "recomendaciones": "¡Ey aventurero! Antes de lanzarte, prepárate bien para la ruta: si vas en bici, revisa que esté en buen estado y si vas a pie, alista tus mejores tenis. Lo más importante: ¡lleva mucha agua! Mínimo 2 litros por persona y extra si llevas a tu peludito, porque cuando hace calor la cosa se pone seria. No olvides tus snacks para recargar energía durante el recorrido de hora y media, y si vas en bici, un kit básico de reparación puede salvarte el día. ¡Prepárate bien y disfruta la aventura!",
        "accesibilidad": "La ruta no es apta para personas con movilidad reducida o problemas cardíacos/respiratorios. Al ser un camino de trocha empinado con terreno irregular y sin pavimentar, requiere buena condición física para su ascenso de 90 minutos. Se recomienda solo para personas con resistencia física adecuada que puedan manejar terreno montañoso exigente. No es aconsejable para niños pequeños, adultos mayores o personas con limitaciones físicas, especialmente en días calurosos.",
        "conservacion": "Recuerda que Sesquile es nuestro tesoro natural, así que ayúdanos a mantenerlo limpio y hermoso para todos. No dejes basura en el camino, guarda tus residuos hasta encontrar un lugar apropiado para desecharlos, mantente siempre en los senderos marcados para evitar la erosión, protege la vegetación nativa y respeta la tranquilidad del lugar. Al ser un espacio natural compartido, tu compromiso con su conservación asegura que otros también puedan disfrutar de estas vistas espectaculares. ¡La naturaleza te agradece por cuidarla!"
      },
      {
        "id": 39,
        "ruta_id": 42,
        "recomendaciones": "No se te olvide el agua, bloqueador, gorra y algo de mecato para la subida. Si quieres las mejores fotos, date una pasadita tempranito o cuando esté cayendo el sol. Y ojo, guarda una bolsita para la basura que generes.",
        "accesibilidad": "La subida está buena para quemar calorías - es empinada y hay que tener aguante. Si tienes problemas de rodillas, corazón o respiración, mejor búscate otro plan. Cuando llueve se pone resbaloso, así que mucho cuidado con eso.",
        "conservacion": "Este parche es un tesoro, ¡ayúdanos a cuidarlo! Nada de dejar basura tirada, ni salirse de los caminos marcados, ni hacerle daño a los pinos. Acá viven varios animalitos, así que no hagas mucho ruido ni armes fogatas. La idea es que este spot siga igual de bonito para que todos lo puedan disfrutar."
      },
      {
        "id": 44,
        "ruta_id": 46,
        "recomendaciones": "Te recomendamos usar calzado cómodo para caminar y llevar agua, ya que la ruta abarca varios lugares históricos. Aprovecha para conocer cada rincón y aprender sobre la cultura local.",
        "accesibilidad": "La ruta es accesible para personas con movilidad reducida en la mayoría de los puntos, aunque algunas áreas pueden tener desafíos por el tipo de terreno.",
        "conservacion": "Es importante cuidar el patrimonio histórico de Sesquilé, evitando daños a los murales y respetando las estructuras de los sitios visitados para preservar su belleza y valor cultural."
      },
      {
        "id": 45,
        "ruta_id": 47,
        "recomendaciones": "Para conquistar Cerro Covadonga, prepárate con botas de trekking, ropa térmica en capas, mínimo 2 litros de agua, snacks energéticos, protección solar completa y un equipo que te permita enfrentar los desafíos de un terreno montañoso de alta montaña, garantizando comodidad y seguridad durante tu travesía.",
        "accesibilidad": "La ruta a Cerro Covadonga presenta un nivel de dificultad moderado, exigiendo una condición física intermedia, con tramos que requieren escalada básica, mejor transitada durante temporadas secas de diciembre-febrero y julio-agosto, con posibilidad de contratar guías locales que faciliten la navegación y proporcionen información del territorio.",
        "conservacion": "Para preservar el frágil ecosistema de páramo, es fundamental transitar únicamente por senderos marcados, no dejar ningún tipo de residuo, respetar estrictamente la flora y fauna nativa, evitar cualquier alteración del entorno como fogatas o disturbios, practicar un turismo de mínimo impacto que permita la conservación de este valioso patrimonio natural de Sesquilé."
      },
      {
        "id": 41,
        "ruta_id": 44,
        "recomendaciones": "¡Ey aventurero! Antes de lanzarte, prepárate bien para la ruta: si vas en bici, revisa que esté en buen estado y si vas a pie, alista tus mejores tenis. Lo más importante: ¡lleva mucha agua! Mínimo 2 litros por persona y extra si llevas a tu peludito, porque cuando hace calor la cosa se pone seria. No olvides tus snacks para recargar energía durante el recorrido de hora y media, y si vas en bici, un kit básico de reparación puede salvarte el día. ¡Prepárate bien y disfruta la aventura!",
        "accesibilidad": "La ruta no es apta para personas con movilidad reducida o problemas cardíacos/respiratorios. Al ser un camino de trocha empinado con terreno irregular y sin pavimentar, requiere buena condición física para su ascenso de 90 minutos. Se recomienda solo para personas con resistencia física adecuada que puedan manejar terreno montañoso exigente. No es aconsejable para niños pequeños, adultos mayores o personas con limitaciones físicas, especialmente en días calurosos.",
        "conservacion": "Recuerda que Sesquile es nuestro tesoro natural, así que ayúdanos a mantenerlo limpio y hermoso para todos. No dejes basura en el camino, guarda tus residuos hasta encontrar un lugar apropiado para desecharlos, mantente siempre en los senderos marcados para evitar la erosión, protege la vegetación nativa y respeta la tranquilidad del lugar. Al ser un espacio natural compartido, tu compromiso con su conservación asegura que otros también puedan disfrutar de estas vistas espectaculares. ¡La naturaleza te agradece por cuidarla!"
      }
    ],
    "bares": [
      {
        "id": 7,
        "name": "Palo Santo",
        "items": {
          "Tipo": "Café"
        },
        "concepto": "Disfruta de un acogedor salón de onces con una variedad de crêpes dulces y salados, postres artesanales, comidas rápidas y los mejores cafés, en un ambiente vintage. El lugar perfecto para compartir momentos especiales, rodeado de luces cálidas y una decoración única.",
        "precio_promedio": 15000,
        "horario": {
          "abren": "1:30 PM",
          "cierran": "8:30 PM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Transferencias, efectivo. ",
        "destino_id": 1
      },
      {
        "id": 11,
        "name": "Soft Coffee",
        "items": {
          "Tipo": "Café"
        },
        "concepto": "Un encantador café que combina un ambiente tranquilo y acogedor con una iluminación cálida y natural. Perfecto para disfrutar de una taza de café cuidadosamente preparado, mientras te relajas leyendo un libro, trabajando o conversando. Con una decoración minimalista y detalles suaves, Soft Coffee es el lugar ideal para desconectarte del bullicio y encontrar inspiración.",
        "precio_promedio": 10000,
        "horario": {
          "abren": "9:00 am",
          "cierran": "7:00 pm"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Pagos en efectivo y billeteras digitales.",
        "destino_id": 1,
      },
      {
        "id": 8,
        "name": "Bar La Roca ",
        "items": {
          "Tipo": "Lounge"
        },
        "concepto": "El Bar La Roca es un espacio acogedor y temático que combina un estilo rústico con toques modernos, ideal para disfrutar de bebidas en un ambiente inspirado en la naturaleza y la historia de Suesca.",
        "precio_promedio": 12000,
        "horario": {
          "abren": "5:00 PM",
          "cierran": "1:00 AM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "metodos_de_pago": "Efectivo y tarjetas.",
        "destino_id": 1,
      },
      {
        "id": 10,
        "name": "Texas",
        "items": {
          "Tipo": "Lounge"
        },
        "concepto": "Texas Lounge es un moderno bar que mezcla la esencia texana con un ambiente lounge sofisticado. Su barra iluminada con acabados dorados, decoración contemporánea y amplia carta de cócteles especiales (desde margaritas texanas hasta Moscow Mules) lo convierten en un espacio ideal para disfrutar de buenas bebidas en un ambiente elegante pero relajado.",
        "precio_promedio": 18000,
        "horario": {
          "abren": "4:00 pm",
          "cierran": "11:00 pm"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No Disponible"
        },
        "metodos_de_pago": "Efectivo, transferencias y billeteras digitales.",
        "destino_id": 1,
      },
      {
        "id": 5,
        "name": "Atico",
        "items": {
          "Tipo": "Underground"
        },
        "concepto": "Ofrecemos una experiencia única que combina la autenticidad urbana con un ambiente vibrante y acogedor. Pensado para quienes buscan un espacio fuera de lo común, aquí podrás desconectarte de la rutina y disfrutar de una atmósfera alternativa, donde cada rincón está diseñado para hacerte sentir parte de una experiencia underground auténtica. Con música envolvente, iluminación tenue en tonos neón y una selección de bebidas que va desde clásicos hasta creaciones propias, es el lugar perfecto para quienes desean explorar algo diferente y sumergirse en una vibra moderna y auténtica.",
        "precio_promedio": 90000,
        "horario": {
          "abren": "4:00 pm",
          "cierran": "11:00 pm"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Efectivo y billeteras digitales",
        "destino_id": 1,
      },
      {
        "id": 3,
        "name": "El Café Suesca",
        "items": {
          "Tipo": "Café"
        },
        "concepto": "Sumérgete en la calidez de nuestro acogedor salón de onces, donde cada detalle invita a disfrutar. Deléitate con nuestras tortas y postres artesanales, elaborados cuidadosamente para resaltar sabores auténticos y memorables. Acompaña cada bocado con una taza de café de origen, seleccionado y preparado con dedicación para los verdaderos amantes del café. Disfruta de un ambiente único y distintivo, perfecto para compartir momentos especiales y relajarse con un menú delicioso que celebra la esencia artesanal en cada plato.",
        "precio_promedio": 10000,
        "horario": {
          "abren": "2:00 pm",
          "cierran": "7:00 pm"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Pagos en efectivo y billeteras digitales",
        "destino_id": 1,
      },
      {
        "id": 9,
        "name": "Café Bistro Dónde tú Quieras ",
        "items": {
          "Tipo": "Café"
        },
        "concepto": "Un espacio acogedor donde disfrutar una gran variedad de comida y postres artesanales, bebidas especiales y helados irresistibles. El lugar perfecto para endulzar tu día y crear momentos inolvidables. ¡Te esperamos!",
        "precio_promedio": 20000,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "9:00 PM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "metodos_de_pago": "Tarjeta, efectivo, nequi.",
        "destino_id": 2,
      },
      {
        "id": 13,
        "name": "El Cacique Bar",
        "items": {
          "Tipo": "Underground"
        },
        "concepto": "Ubicado en el corazón de Sesquilé, es el punto de encuentro perfecto para disfrutar de las mejores noches. Su privilegiada ubicación ofrece una vista espectacular al parque central desde su acogedor balcón, creando el ambiente ideal para compartir entre amigos. El espacio se distingue por su ambiente versátil, donde destaca un exclusivo segundo piso que funciona como área privada, perfecto para celebraciones especiales o reuniones más íntimas. La combinación de buena música, una selecta carta de cócteles y licores, junto con el ambiente cálido y moderno.",
        "precio_promedio": 18000,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "12:00 AM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "Disponible"
        },
        "metodos_de_pago": "Tarjetas, efectivo y nequi.",
        "destino_id": 2,
      },
      {
        "id": 14,
        "name": "Francachela Bar",
        "items": {
          "Tipo": "Lounge"
        },
        "concepto": "Francachela Bar se destaca como el epicentro de la música en vivo en Sesquilé, donde cada noche cobra vida con el mejor entretenimiento musical. Este espacio vibrante se ha convertido en el punto de encuentro preferido para los amantes de la música en directo y la buena compañía.",
        "precio_promedio": 18000,
        "horario": {
          "abren": "12:00 PM",
          "cierran": "12:00 AM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Todos los métodos de pago.",
        "destino_id": 2,
      },
      {
        "id": 15,
        "name": "Dolcelatto",
        "items": {
          "Tipo": "Heladeria"
        },
        "concepto": "Deliciosa heladería artesanal especializada en helados de yogurt natural. Personaliza tu postre eligiendo entre una amplia variedad de toppings frescos como frutas, frutos secos, chocolates y salsas. Una experiencia refrescante y saludable donde tú eres el chef de tu propia creación helada.",
        "precio_promedio": 15000,
        "horario": {
          "abren": "10:00 AM",
          "cierran": "7:00 PM"
        },
        "servicios": {
          "cover": 0,
          "reservas": "Disponible",
          "parking": "No disponible"
        },
        "metodos_de_pago": "Billeteras digitales y efectivo.",
        "destino_id": 2,
      }
    ],
    "alojamientos": [
      {
        "id": 19,
        "oferente": "Hotel Rokas de Suesca",
        "metodosDePago": "Efectivo, billeteras digitales.",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 14:00 a las 0:00 - Tienes que decirle al alojamiento con antelación a qué hora vas a llegar.",
          "Check Out": "Salida hasta de las 12:00 de medio dia.",
          "Mascotas": "Se admiten bajo petición. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Hay zonas comunes que se comparten, no se puede fumar, monitoreo de seguridad 24 horas, los clientes deben minimizar el ruido de 22:00 a 8:00."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "19-1",
            "name": "Habitación Doble Deluxe",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Esta habitación doble destaca por su chimenea. Dispone de artículos de aseo gratuitos y baño privado con ducha. La zona de cocina de la habitación doble está disponible para cocinar y almacenar alimentos. El alojamiento cuenta con minibar, vistas al jardín, patio y se ofrece vino o champán a los huéspedes. El alojamiento tiene 1 cama.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "19-2",
            "name": "Suite de Lujo",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "La chimenea es una de las principales características de esta suite. Esta suite cuenta con 1 sala de estar, 1 dormitorio independiente y 1 baño con ducha y artículos de aseo gratuitos. En la cocina bien equipada, los huéspedes encontrarán una estufa, una nevera, utensilios de cocina y un horno. Esta suite tiene entrada privada, TV de pantalla plana, vistas al jardín y vino o champán para los huéspedes.",
            "precio": 400000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "19-3",
            "name": "Habitación Doble Deluxes",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Esta habitación doble dispone de artículos de aseo gratuitos, baño privado con ducha, zona de cocina para cocinar y guardar alimentos, minibar, acceso al salón executive, patio y vino o champán gratuitos.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "19-4",
            "name": "Chalet con Jacuzzi",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Este chalet cuenta con bañera de hidromasaje, entrada privada, 1 dormitorio, zona de estar y baño con bañera y ducha. La zona de cocina del chalet está disponible para cocinar y almacenar alimentos. El alojamiento cuenta con minibar, vistas al jardín, terraza y vino o champán para los huéspedes.",
            "precio": 400000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "19-5",
            "name": "Chalet Cama Doble",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "La chimenea es una de las principales características de este chalet. Este chalet cuenta con 1 dormitorio, 1 baño con ducha, zona de estar y terraza donde podrá relajarse. La zona de cocina del chalet está disponible para cocinar y almacenar alimentos. El alojamiento tiene entrada privada, vistas al jardín, patio y se ofrece vino o champán a los huéspedes.",
            "precio": 400000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "19-6",
            "name": "Habitación Doble Roka",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Esta habitación doble cuenta con artículos de aseo gratuitos, baño privado con ducha, zona de cocina para cocinar y guardar alimentos, minibar, acceso al salón executive, patio y vino o champán gratuitos.",
            "precio": 220000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 20,
        "oferente": "Casa Manoa",
        "metodosDePago": "Nequi, Daviplata, cuenta de ahorros, link de pago, datáfono y efectivo. ",
        "politicas": {
          "Cancelacion": "Se cobrará el 100% del total de la reserva, si el cliente cancela faltando 72 horas o menos a la fecha de llegada. Se cobrará el 50% del total de la reserva, si el cliente cancela faltando entre 73 y 168 horas (7 días) a la fecha de llegada.",
          "Check In": "A partir de las 3:00 p.m. hasta las 9:30 p.m.. Early Check-in: desde las 12:00 p.m. por un valor adicional de $20.000 COP *Únicamente con previo aviso y sujeto a disponibilidad.",
          "Check Out": "Hasta las 11:00 a.m.. Late Check-out hasta la 1:00 p.m. por un valor adicional de $20.000 COP *Únicamente con previo aviso y sujeta a disponibilidad.",
          "Mascotas": "Se prohíbe subir las mascotas a las camas, así como asignarles cobijas, toallas o demás elementos de la habitación, es indispensable que por favor traiga su cama, cobijas y demás elementos necesarios para su mascota. Los daños ocasionados por las mascotas serán responsablidad de sus propietarios, quienes deben reponer o indemnizar en caso de ser necesario.",
          "Seguridad y propiedad": "Todos los visitantes deben registrarse presentando su documento de identidad, en caso de ser menores de edad, solicitaremos que se abstengan de ingresar a las habitaciones, a menos que estén bajo el acompañamiento y la responsabilidad de sus padres. Está prohibido fumar en las habitaciones y zonas comunes."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "20-1",
            "name": "Suite con Chimenea",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Cómodas suites con una cama queen size, chimenea de leña, mesa en la habitación y minibar, Tiene capacidad para tres personas agregando una cama sencilla. Perfecta para disfrutar noches de descanso frente a la chimenea compartir en familia y con tu mascota.",
            "precio": 443000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Desayuno incluido",
                "Baño privado",
                "TV",
                "Petfriendly",
                "Estacionamiento",
                "Lavanderia"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "20-2",
            "name": "Habitación Estándar Doble",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Habitaciónes acogedoras con una cama queen, baño privado con agua caliente y minibar. Con disponibilidad de añadir una cama sencilla para lograr acomodación triple.",
            "precio": 343000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Desayuno incluido",
                "Baño privado",
                "TV",
                "Petfriendly",
                "Estacionamiento",
                "Lavanderia"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "20-3",
            "name": "Habitación Estándar Twin",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Cómodas habitaciones con dos camas sencillas, excelentes para compartir entre hermanos, con amigos o compañeros de trabajo. Tienen baño privado con agua caliente y minibar.",
            "precio": 343000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Desayuno incluido",
                "Baño privado",
                "TV",
                "Petfriendly",
                "Estacionamiento",
                "Lavanderia"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 6,
        "oferente": "Casona Quesada",
        "metodosDePago": "Efectivo, tarjetas y transferencias.",
        "politicas": {
          "Cancelacion": "Cancelación gratis",
          "Check In": "Check-in de 3:00 PM a 10:30 PM.",
          "Check Out": "Check-out hasta la 1:00 PM",
          "Masctotas": "Casona Quesada admite mascotas."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "id": "6-1",
            "name": "Suite Casona",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Suite Privada en Casona Suesca, un espacio acogedor que combina elegancia y confort, dotada con una amplia cama king size, un hermoso balcón con vistas panorámicas a la ciudad y un relajante baño con tina. La suite cuenta con detalles de lujo como minibar, TV de pantalla plana y artículos de tocador premium para hacer de su estadía una experiencia inolvidable.",
            "precio": 420000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "id": "6-2",
            "name": "Habitación Estándar",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Habitación Estándar en Casona Suesca, un espacio acogedor y confortable equipado con una amplia cama doble, TV de pantalla plana y un baño privado completo con ducha caliente. La habitación cuenta con acceso a un tranquilo patio y amenidades premium para asegurar una placentera estadía.",
            "precio": 280000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "id": "6-3",
            "name": "Habitación Familiar",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Espaciosa Habitación Estándar en Casona Quesada, perfecta para compartir en familia o con amigos, equipada con dos amplias camas dobles, TV de pantalla plana y un baño privado completo. La habitación ofrece acceso a un tranquilo patio y está dotada con todas las comodidades para garantizar una estancia confortable y relajante.",
            "precio": 480000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 7,
        "oferente": "Villa Inés",
        "metodosDePago": "Efectivo, transferencia bancaria. ",
        "politicas": {
          "Cancelacion": "Cancelación gratuita antes del 6 ene. Pasado ese plazo, la reservación no será reembolsable.",
          "Check In": "Horario de llegada: de las 8:00 a. m. a las 11:00 p. m.",
          "Check Out": "Salida antes de las 5:00 p. m.",
          "Masctotas": "Se admiten. Se pueden aplicar suplementos."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "7-1",
            "name": "Cabaña con Jacuzzi",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Sumérgete en una experiencia única en nuestra acogedora cabaña de montaña, donde el lujo se encuentra con la naturaleza. Relájate en el jacuzzi privado. La cabaña ofrece un refugio perfecto para desconectarte, combinando comodidades modernas con el encanto rústico de la madera, Un espacio íntimo diseñado para quienes buscan paz, romance y conexión con la naturaleza.",
            "precio": 300000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-2",
            "name": "Domo",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Vive una experiencia única en nuestro acogedor domo de madera. Un espacio singular que combina diseño innovador con calidez natural, perfecto para desconectarte y disfrutar de las estrellas. Un refugio íntimo donde la tranquilidad  se fusiona con la comodidad.",
            "precio": 140000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-3",
            "name": "Cabaña con Sauna",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Escapa a nuestra acogedora cabaña de montaña con sauna privado. Disfruta de una experiencia de bienestar única, combinando el encanto rústico con comodidades modernas. Un refugio perfecto para relajarte y conectar con la naturaleza.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-4",
            "name": "Cabaña",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Descubre nuestras acogedoras cabañas en el corazón de Suesca, rodeadas de naturaleza y paisajes rocosos. Un refugio perfecto que combina confort con la serenidad de la montaña, ideal para escapadas memorables cerca de Bogotá",
            "precio": 220000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-5",
            "name": "Casa del Arbol",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Vive una aventura única en nuestra casa del árbol en Villa Inés. Una experiencia mágica elevada entre la naturaleza, con vistas espectaculares. Un refugio acogedor que combina la diversión de dormir en las alturas con el confort de un alojamiento especial",
            "precio": 140000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-6",
            "name": "Cabaña Sencilla ",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Disfruta de esta encantadora cabaña de estilo campestre, equipada con dos cómodas camas y un baño privado. Un espacio acogedor diseñado para brindarte confort y tranquilidad en plena naturaleza.",
            "precio": 160000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "7-7",
            "name": "Cabaña Catamaran",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Sumérgete en la experiencia única de esta cabaña tipo catamarán, rodeada de amplios espacios verdes. Disfruta de una cómoda cama doble, un baño privado y un ambiente cálido y relajante, ideal para desconectar y disfrutar de la naturaleza.",
            "precio": 180000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 9,
        "oferente": "Mano De Oso",
        "metodosDePago": "Transferencia bancaria ",
        "politicas": {
          "Cancelacion": "Reservas NO reembolsables.",
          "Check In": "El horario va de las 3:00 pm a 8:00 pm.",
          "Check Out": "La salida antes de las 11:00 am.",
          "Mascotas": "Se acepta el ingreso de mascotas, siempre y cuando se tenga control sobre ellos.",
          "Seguridad y propiedad": "Hay espacios compartidos, jardines, huertas y área de camping, es necesario subir escaleras. Es una zona cercada y privada con vigilancia constante."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "9-1",
            "name": "Cabaña El Turpial",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Esta cabaña para 3 personas cuenta con un dormitorio con una cómoda cama tamaño queen y una sala de estar con sofá cama. \nLa terraza privada es el lugar perfecto para relajarte y disfrutar de la vista después de un día explorando los alrededores.",
            "precio": 240000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "9-2",
            "name": "Cabaña Tyto Alba",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Esta cabaña para 5 personas es perfecta para grupos o familias. Cuenta con una habitación principal con una cama tamaño queen, una segunda habitación con dos camas sencillas, y un sofá cama en la sala de estar. La cocina está completamente equipada para que puedas preparar tus comidas favoritas.",
            "precio": 240000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "9-3",
            "name": "Casa Satori",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Casa Satori te ofrece una experiencia de lujo en un entorno privilegiado. Con un diseño minimalista y una arquitectura moderna, esta casa es mucho más que un simple refugio: es un espacio amplio y elegante donde cada detalle ha sido pensado para tu confort. Casa Satori te brinda la calidez de un hogar, combinando la funcionalidad de un diseño vanguardista con un ambiente acogedor.",
            "precio": 665000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 3,
              "camas": 4,
              "baños": 2
            }
          }
        ]
      },
      {
        "id": 8,
        "oferente": "Cabañas Quincha",
        "metodosDePago": "Efectivo y billeteras digitales",
        "politicas": {
          "Cancelacion": "Aplazamiento de reserva",
          "Check In": "Llegada de 10 a.m. a 12 p.m.",
          "Check Out": "Salida de 10 a.m. a 12 p.m.",
          "Mascotas": "Se admiten mascotas",
          "Seguridad y propiedad": "Sistemas de seguridad 24 horas "
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "8-1",
            "name": "Cabañas Quincha ",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Disfruta de una encantadora cabaña rústica con acabados de alta calidad, ubicada en un entorno natural incomparable. Rodeada de exuberantes jardines, ofrece vistas espectaculares a la sabana y a imponentes formaciones rocosas, creando un refugio perfecto para relajarse y conectar con la naturaleza.",
            "precio": 180000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 12,
        "oferente": "Roca Glamping Suesca",
        "metodosDePago": "Transferencia bancaria y billeteras digitales",
        "politicas": {
          "Cancelacion": " No realizamos devoluciones de dinero, pero puedes reprogramar tu reserva hasta 6 meses después de la fecha original si cancelas con mínimo 4 días de anticipación. Las cancelaciones realizadas dentro de los 2 días previos a la llegada tendrán un cargo del 25% del valor total por gastos administrativos.",
          "Check In": "Llegada de 12 p.m. a 3 p.m.",
          "Check Out": "Salida 12 p.m día siguiente ",
          "Mascotas": "Somos Petfriendly",
          "Seguridad y propiedad": "Vigilancia y estricta conservación del lugar."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "12-1",
            "name": "Mini Cabañas",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Descubre nuestras acogedoras Mini Cabañas en Roca Glamping Suesca, ubicadas estratégicamente sobre las majestuosas rocas con vistas panorámicas impresionantes. Cada cabaña está equipada con un cómodo colchón doble y cobijas térmicas, acceso cercano a baño y ducha, y desayuno incluido. Disfruta de zonas comunes con juegos de mesa y espacio para fogatas. ¡Y no dejes a tu mascota en casa! Somos pet friendly (con cama propia para tu mascota).",
            "precio": 130000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "12-2",
            "name": "Domo Roca Suesca",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Vive una experiencia única en nuestro Domo Glamping sobre las rocas de Suesca, equipado con una lujosa cama king size y cobijas térmicas para noches acogedoras. Disfruta de tu balcón privado con vistas espectaculares, baño exclusivo, cafetera y delicioso desayuno incluido. Cuenta con zonas comunes para juegos de mesa y fogatas. Somos pet friendly, con espacio alfombrado para el descanso de tu mascota.",
            "precio": 199900,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Desayuno incluido",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 14,
        "oferente": "Niddo Suesca",
        "metodosDePago": "Efectivo, transferencia bancaria y tarjetas.",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 15:00 a las 22:00. Los clientes deben mostrar un documento de identidad con fotografía y una tarjeta de crédito en el momento de hacer el check-in",
          "Check Out": "De las 11:00 a las 11:30",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Los clientes deben minimizar el ruido de 20:00 a 9:00"
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "14-1",
            "name": "Nido de la Roca",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Nuestros nidos de la roca en forma de cabaña están ubicados sobre una plataforma de madera. Esta habitación tiene una capacidad máxima para 3 personas y cuentan con baño privado dentro de la habitación, fogata, balcón, tetera de agua caliente, café, variedad de té y calefactor.",
            "precio": 542045,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "14-2",
            "name": "Nido Estandar",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Nidos en forma de teepe ubicados en un bosque nativo. Esta habitación tiene una capacidad máxima de 4 personas y cuenta con baño privado, fogata privada, zona de picnic privada al aire libre,  tetera de agua caliente, café, variedad de té y calefactor.",
            "precio": 485200,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "14-3",
            "name": "Casa Sobre las Nubes",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Nuestra nueva casa nubbe para los que prefieren una experiencia mas tradicional disfrutando de todos los beneficios de nuestro lugar mágico, con capacidad para 5 personas con la mejor vista de las rocas de Suesca.",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 16,
        "oferente": "Casa Lantana",
        "metodosDePago": "Efectivo, transferencias y billeteras digitales.",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 15:00 a las 19:00",
          "Check Out": "Hasta las 12:00",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "No se puede fumar, monitoreo de seguridad 24 horas."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "16-1",
            "name": "Habitación Triple Básica",
            "items": {
              "Tipo": "Hostal"
            },
            "detalle": "Descubre el Hostal Casa Lantana, un acogedor refugio de montaña ubicado en la vereda Cacicazgo de Suesca, Cundinamarca. Nacido del amor por la aventura y el montañismo, este hostal de dos niveles ofrece 8 habitaciones con diferentes acomodaciones, amplias zonas sociales que incluyen una sala con chimenea, cocina equipada y un salón de TV. Rodeado de naturaleza y con espectaculares vistas a la montaña, Casa Lantana es el lugar perfecto para viajeros y deportistas que buscan un ambiente cálido y económico donde compartir historias y experiencias con otros amantes de los deportes de montaña.",
            "precio": 118000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "16-2",
            "name": "Habitación Doble",
            "items": {
              "Tipo": "Hostal"
            },
            "detalle": "Descubre el Hostal Casa Lantana, un acogedor refugio de montaña ubicado en la vereda Cacicazgo de Suesca, Cundinamarca. Nacido del amor por la aventura y el montañismo, este hostal de dos niveles ofrece 8 habitaciones con diferentes acomodaciones, amplias zonas sociales que incluyen una sala con chimenea, cocina equipada y un salón de TV. Rodeado de naturaleza y con espectaculares vistas a la montaña, Casa Lantana es el lugar perfecto para viajeros y deportistas que buscan un ambiente cálido y económico donde compartir historias y experiencias con otros amantes de los deportes de montaña.",
            "precio": 145000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "16-3",
            "name": "Habitación Cuádruple",
            "items": {
              "Tipo": "Hostal"
            },
            "detalle": "Descubre el Hostal Casa Lantana, un acogedor refugio de montaña ubicado en la vereda Cacicazgo de Suesca, Cundinamarca. Nacido del amor por la aventura y el montañismo, este hostal de dos niveles ofrece 8 habitaciones con diferentes acomodaciones, amplias zonas sociales que incluyen una sala con chimenea, cocina equipada y un salón de TV. Rodeado de naturaleza y con espectaculares vistas a la montaña, Casa Lantana es el lugar perfecto para viajeros y deportistas que buscan un ambiente cálido y económico donde compartir historias y experiencias con otros amantes de los deportes de montaña.",
            "precio": 165000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 4,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 18,
        "oferente": "Go Suesca",
        "metodosDePago": "Efectivo, transferencias y billeteras digitales",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "Horario de llegada: de las 3:00 p.m. a las 12:00 a.m.",
          "Check Out": "Salida antes de las 12:00 p.m.",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Hay zonas comunes que se comparten, no se puede fumar, monitoreo de seguridad 24 horas."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "18-1",
            "name": "Suculenta",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Descubre nuestro acogedor alojamiento ideal para grupos hasta de 6 personas, con dos habitaciones perfectamente equipadas: una principal con cama doble y sencilla, y una secundaria con cama doble más un sofá cama en la sala. La propiedad ofrece todas las comodidades necesarias incluyendo baño con agua caliente, cocina completamente equipada, WiFi y parqueadero. Rodeado por un hermoso bosque de eucaliptos, podrás relajarte en hamacas, practicar slackline o disfrutar de una cálida fogata nocturna. Con tarifas flexibles según el número de huéspedes y temporada, también ofrecemos opciones especiales para viajeros solitarios.",
            "precio": 280000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "18-2",
            "name": "Hierbabuena",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Descubre nuestra acogedora cabaña equipada con cama doble y sofá cama, perfecta para una escapada de hasta 3 personas. Cuenta con todas las comodidades necesarias: baño con agua caliente, cocina completamente dotada, nevera y WiFi. Frente a la cabaña, te espera un encantador bosque con área de parqueo, espacio para fogatas, hamacas y zonas verdes donde podrás conectar con la naturaleza. Las tarifas son flexibles según el número de huéspedes y la temporada elegida.",
            "precio": 190000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 17,
        "oferente": "Hotel Flora",
        "metodosDePago": "Efectivo, billeteras digitales.",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 14:00 a las 23:00",
          "Check Out": "De las 12:00 a las 13:00",
          "Mascotas": "No se admiten.",
          "Seguridad y propiedad": "No se puede fumar, monitoreo de seguridad 24 horas."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "17-1",
            "name": "Habitación Canela",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Descubre la comodidad y tranquilidad en nuestro hotel, estratégicamente ubicado a solo 5 minutos de las famosas rocas de Suesca. Nuestras habitaciones privadas han sido diseñadas pensando en los amantes de la naturaleza y los deportes de aventura, ofreciendo un refugio perfecto para descansar después de un día lleno de adrenalina. La ubicación privilegiada te permite combinar el confort de una estancia acogedora con fácil acceso a las mejores zonas de escalada, senderismo y actividades al aire libre de la región.",
            "precio": 120000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            },
          },
          {
            "tipo_alojamiento_id": "17-2",
            "name": "Habitación Ruda",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Descubre la comodidad y tranquilidad en nuestro hotel, estratégicamente ubicado a solo 5 minutos de las famosas rocas de Suesca. Nuestras habitaciones privadas han sido diseñadas pensando en los amantes de la naturaleza y los deportes de aventura, ofreciendo un refugio perfecto para descansar después de un día lleno de adrenalina. La ubicación privilegiada te permite combinar el confort de una estancia acogedora con fácil acceso a las mejores zonas de escalada, senderismo y actividades al aire libre de la región.",
            "precio": 70000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "17-3",
            "name": "Habitación Vainilla",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Descubre la comodidad y tranquilidad en nuestro hotel, estratégicamente ubicado a solo 5 minutos de las famosas rocas de Suesca. Nuestras habitaciones privadas han sido diseñadas pensando en los amantes de la naturaleza y los deportes de aventura, ofreciendo un refugio perfecto para descansar después de un día lleno de adrenalina. La ubicación privilegiada te permite combinar el confort de una estancia acogedora con fácil acceso a las mejores zonas de escalada, senderismo y actividades al aire libre de la región.",
            "precio": 80000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "17-4",
            "name": "Habitación Cidrón",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Descubre la comodidad y tranquilidad en nuestro hotel, estratégicamente ubicado a solo 5 minutos de las famosas rocas de Suesca. Nuestras habitaciones privadas han sido diseñadas pensando en los amantes de la naturaleza y los deportes de aventura, ofreciendo un refugio perfecto para descansar después de un día lleno de adrenalina. La ubicación privilegiada te permite combinar el confort de una estancia acogedora con fácil acceso a las mejores zonas de escalada, senderismo y actividades al aire libre de la región.",
            "precio": 50000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 11,
        "oferente": "Casa Bella Vista ",
        "metodosDePago": "Transferencia bancaria, billeteras digitales y efectivo.",
        "politicas": {
          "Cancelacion": "NO se hace devolución del dinero, pero SI puedes reagendar tu reserva cuando gustes según la disponibilidad.",
          "Check In": "Llegada de 10 a.m. a 12 p.m.",
          "Check Out": "Salida de 10 a.m. a 12 p.m.",
          "Mascotas": "Se acepta el ingreso de mascotas, porfavor llevar su propia cama.",
          "Seguridad y propiedad": "La casa está en zona libre y cercada para mayor privacidad, puedes ir a recorrer tu destino y volver con total tranquilidad."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "11-1",
            "name": "Bella Vista",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Ubicada en un lugar privilegiado, sobre las majestuosas Rocas de Suesca, Casa Bella Vista te ofrece una experiencia única de comodidad y tranquilidad en medio de la naturaleza. Desde su ubicación estratégica, disfrutarás de vistas impresionantes del paisaje circundante, un entorno perfecto para desconectarte del estrés diario y sumergirte en la serenidad.",
            "precio": 200000,
            "servicios": {
              "servicios": [
                "Baño privado",
                "Desayuno incluido",
                "Petfriendly",
                "Estacionamiento"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 2,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 15,
        "oferente": "Refugio de Alta Guita",
        "metodosDePago": "Efectivo, transferencias y billeteras digitales.",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 12:00 a las 21:00",
          "Check Out": "De las 10:00 a las 10:30",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Solo podrán hacer el check-in los clientes con edades superiores a 18, no se puede fumar, monitoreo de seguridad 24 horas."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "15-1",
            "name": "Modulo",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Sumérgete en una experiencia única de descanso en nuestro módulo exclusivo, donde podrás disfrutar de una espectacular vista panorámica a las majestuosas rocas de Suesca y la inmensa Sabana de Bogotá. Ubicado en el Alto de Guita, este espacio te invita a conectar profundamente con la naturaleza mientras descansas en un ambiente tranquilo y acogedor. El amanecer y el atardecer cobran vida desde tu ventana, creando momentos mágicos que harán de tu estadía una experiencia inolvidable.",
            "precio": 300000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "15-2",
            "name": "El Refugio",
            "items": {
              "Tipo": "Domo/Glamping"
            },
            "detalle": "Descubre nuestro exclusivo glamping en lo alto de la montaña de Alta Güita, donde el lujo se encuentra con la naturaleza en un entorno mágico rodeado de bosque. Disfruta de una vista privilegiada a las imponentes rocas de Suesca y la majestuosa Sabana de Bogotá mientras te relajas en tu piscina privada. Ofrecemos una experiencia íntima y personalizada, con acceso a actividades como senderismo, escalada, espeleología y ciclomontañismo, todo mientras disfrutas de un servicio excepcional que te permitirá despertar por encima de las nubes y terminar tus días contemplando el atardecer junto a una acogedora fogata bajo las estrellas.",
            "precio": 550000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 22,
        "oferente": "Brisas del Tomine ",
        "metodosDePago": "Transferencias, billeteras digitales y efectivo. ",
        "politicas": {
          "Cancelacion": "Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 3:00 pm a las 5:00 pm",
          "Check Out": "De las 9:00 am a las 11:00 am",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "No se puede fumar dentro del alojamiento."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "22-1",
            "name": "Brisas del Tomine",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Brisas del Tominé, una acogedora cabaña de dos pisos en Sesquilé, ofrece una experiencia única con vistas privilegiadas al embalse y bosques de eucalipto. Este refugio completamente equipado cuenta con zona de fogata, tres baños, cocina funcional y excelente conectividad a internet. Ideal para parejas, familias o amigos, el espacio pet-friendly permite disfrutar de atardeceres memorables en un ambiente natural y tranquilo, con fácil acceso desde la vía principal y estacionamiento privado.",
            "precio": 900000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento",
                "Petfriendly",
                "TV",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 5,
              "camas": 6,
              "baños": 3
            }
          },
          {
            "tipo_alojamiento_id": "22-2",
            "name": "Leyenda viva",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Leyenda Viva, una encantadora habitación en una casa colonial de Sesquilé, combina confort moderno con autenticidad rural. Este espacio acogedor ofrece baño privado, vistas panorámicas al embalse del Tominé y acceso a zona de asados. Su diseño cálido y artístico, junto con el entorno natural perfecto para senderismo, crea un refugio ideal para escapadas románticas y desconexión total.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento",
                "Petfriendly",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "22-3",
            "name": "Mirador de las aguas",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "Mirador de las Aguas, una acogedora habitación colonial en Sesquilé, fusiona arte y naturaleza con vistas privilegiadas al embalse del Tominé. Este refugio íntimo ofrece baño privado y acceso a una zona de fogata común, creando el escenario perfecto para escapadas románticas, senderismo y descanso en un entorno tranquilo y memorable.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Estacionamiento",
                "Petfriendly",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 26,
        "oferente": "Chalet Andino",
        "metodosDePago": "Efectivo, transferencias y billeteras digitales.",
        "politicas": {
          "Cancelacion": "Se hace la reserva con el 50% del costo, las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 9:00 en adelante.",
          "Check Out": "Hata la 1:00 p.m.",
          "Mascotas": "Se admiten mascotas, costo adicional $140.000, traer su propia cama, alimentos y correa.",
          "Seguridad y propiedad": "La propiedad esta muy bien ubicada y con gran seguridad, gran variedad de ambientes como lagos, jardines, senderos naturales, creando un ambiente único."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "26-1",
            "description": "Ensueño",
            "name": "Ensueño",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Una cabaña romántica con vista a las montañas andinas. Cuenta con habitación principal con baño, cocineta, sala y comedor integrado.",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Calefacción",
                "Sala",
                "Comedor",
                "Cocina"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "26-2",
            "description": "El Jardín",
            "name": "El Jardín",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Con capacidad para 4,5 o 6 personas, con una habitación con cama doble y una habitación con dos camas individuales y un altillo con dos camas individuales. Cuenta con dos baños completos. Sala, comedor y chimenea. Tiene mensaje en la cocina por si desea cocinar.",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "TV",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Chimenea",
                "Sala",
                "Comedor",
                "Cocina"
              ]
            },
            "equipamento": {
              "habitaciones": 3,
              "camas": 5,
              "baños": 2
            }
          },
          {
            "tipo_alojamiento_id": "26-3",
            "description": "El Lago",
            "name": "El Lago",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Es una cabaña muy bonita y romántica frente al lago , tiene una habitación con cama doble y un altillo con dos camas individuales, sala, comedor y chimenea. Capacidad para 2,3 o 4 personas",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "TV",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Chimenea",
                "Sala",
                "Comedor",
                "Cocina"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "26-4",
            "name": "El Cerezo",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Con capacidad para 2,3 o 4 personas. Tiene una habitación con cama doble y una habitación con dos camas individuales, sala, comedor, cocina, baño y patio de ropas. Cuenta con mensaje de cocina por si desea cocinar.",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "TV",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Sala",
                "Comedor",
                "Cocina",
                "Lavadero"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "26-5",
            "name": "El Huerto",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Con capacidad para 2,3 o 4 personas. Tiene una habitación con cama doble y una habitación con dos camas individuales, sala, comedor y chimenea. Menaje de cocina por si desea cocinar.",
            "precio": 600000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "TV",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Sala",
                "Comedor",
                "Chimenea",
                "Cocina"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "26-6",
            "name": "La Montaña",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "Con capacidad para 11 personas, tiene una habitación con cama doble, dos habitaciones con dos camas individuales y un altillo con 5 camas individuales, sala, comedor, zona BBQ y menaje de cocina por si desea cocinar.",
            "precio": 1500000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "TV",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Sala",
                "Comedor",
                "Cocina"
              ]
            },
            "equipamento": {
              "habitaciones": 4,
              "camas": 10,
              "baños": 3
            }
          }
        ]
      },
      {
        "id": 25,
        "oferente": "Ojo de Agua",
        "metodosDePago": "Todos los métodos de pago.",
        "politicas": {
          "Cancelacion": "Se requiere el 50% para hacer efectiva la reserva. Las condiciones de cancelación pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 3:00 en adelante",
          "Check Out": "Hasta las 12:00 p.m.",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Propiedad cerrada con parking privado."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "25-1",
            "description": "Casa Andrea",
            "name": "Casa Andrea",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "La Casa Andrea en la Finca Ojo de Agua en Sesquilé es un acogedor alojamiento rústico que ofrece a los visitantes un retiro tranquilo en medio de la naturaleza. Ofrece un retiro tranquilo entre los paisajes naturales de la propiedad, incluyendo frondosos jardines y vistas del Embalse del Tominé. Además de las cómodas instalaciones, cuenta con zonas de lectura y parque infantil, zona de fogata, senderos para caminatas, y espacios para meditación y desconexión total. Una experiencia auténtica del estilo de vida rural..",
            "precio": 2000000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 3,
              "camas": 5,
              "baños": 2
            }
          },
          {
            "tipo_alojamiento_id": "25-2",
            "description": "Cueva de los murciélagos",
            "name": "Cueva de los murciélagos",
            "calificacion": 0,
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "La habitación de la Cueva de los Murciélagos ofrece un ambiente rústico y acogedor, con 3 cómodas camas. Cuenta con una zona de fogata, un parque infantil y senderos que recorren los jardines, donde también hay una zona de meditación. Tiene una vista privilegiada del embalse de Tomine. La habitación también puede reservarse para una sola pareja que busca un espacio de desconexión total.",
            "precio": 400000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "25-3",
            "description": "Cabaña Bochica",
            "name": "Cabaña Bochica",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "La acogedora Cabaña Bochica cuenta con 4 camas cómodas, incluyendo un altillo con una cama adicional. Está equipada con una cocina funcional y un baño privado. Rodeada por los hermosos jardines, ofrece vistas privilegiadas del tranquilo embalse de Tomine. Los huéspedes pueden disfrutar de zonas de fogata, senderos para caminar y un parque infantil, además de espacios de meditación y desconexión total. Esta cabaña rústica y bien equipada es ideal para parejas o familias que buscan una escapada de paz y conexión con la naturaleza.",
            "precio": 900000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 4,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "25-4",
            "description": "Cabaña Antigua",
            "name": "Cabaña Antigua",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "La Cabaña Antigua cuenta con dos habitaciones completamente independientes, cada una con una cama doble y un baño privado. Rodeada por los hermosos jardines, ofrece vistas privilegiadas del tranquilo embalse de Tomine. Los huéspedes pueden disfrutar de zonas de fogata, senderos para caminar y un parque infantil, además de espacios de meditación y desconexión total. Esta cabaña rústica y bien equipada es ideal para parejas o familias que buscan una escapada de paz y conexión con la naturaleza. Tambien puede reservarse solo una de las habitaciones por 400.",
            "precio": 800000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 2,
              "camas": 2,
              "baños": 2
            }
          },
          {
            "tipo_alojamiento_id": "25-5",
            "description": "Casa Ojo de Agua",
            "name": "Casa Ojo de Agua",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "La Casa Ojo de Agua es un refugio único que combina comodidad, naturaleza y desconexión total. Con amplios espacios como sala de estar, cocina completamente equipada, comedor, varias salas, 4 habitaciones y 3 baños, esta casa está diseñada para el descanso y el disfrute. Su espectacular balcón ofrece una vista inigualable al embalse del Tominé, creando el escenario perfecto para momentos inolvidables. Además, cuenta con zonas para senderismo, espacios ideales para yoga, meditación y relajación, un parque para niños, y extensas áreas verdes para lectura y conexión con la naturaleza. La Casa Ojo de Agua es el destino perfecto para quienes buscan tranquilidad, bienestar y paisajes de ensueño.",
            "precio": 2500000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 4,
              "camas": 6,
              "baños": 3
            }
          }
        ]
      },
      {
        "id": 21,
        "oferente": "Vientos del Dorado",
        "metodosDePago": "Transferencia bancaria y efectivo.",
        "politicas": {
          "Cancelacion": "Cancelar 8 días antes de la fecha de la reserva, se devolverá el 90% del precio.",
          "Check In": "Llegada de 1 p.m. a 7 p.m.",
          "Check Out": "Salida 12 p.m (Puede ser más según disponibilidad).",
          "Mascotas": "Se admiten bajo petición. Se pueden aplicar suplementos. Se debe traer su propia cama. Las mascotas no tienen permitido subirse a la cama, si esto ocurre se deberá pagar un excedente de 100.000 COP.",
          "Seguridad y propiedad": "Vigilancia y estricta conservación del lugar."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "21-1",
            "description": "Vientos del Dorado",
            "name": "Vientos del Dorado",
            "items": {
              "Tipo": "Casa"
            },
            "detalle": "En nuestro refugio enclavado en majestuosas montañas, te invitamos a experimentar la magia de desconectar y sanar. Deja atrás preocupaciones cotidianas y sumérgete en la serenidad de la naturaleza. Con vistas panorámicas que inspiran paz y tranquilidad, nuestro acogedor hospedaje es el refugio perfecto para renovar tu espíritu y estar en familia. Descubre la curación que solo la montaña puede ofrecer. Bienvenido a un lugar donde el alma se conecta con la naturaleza y la sanación comienza.",
            "precio": 1500000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Desayuno incluido",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Jacuzzi",
                "Cocina",
                "BBQ"
              ]
            },
            "equipamento": {
              "habitaciones": 5,
              "camas": 13,
              "baños": 5
            }
          }
        ]
      },
      {
        "id": 23,
        "oferente": "Alondra Posada Turística",
        "metodosDePago": "Transferencias, billeteras digitales y efectivo.",
        "politicas": {
          "Cancelacion": "Cancelar 8 días antes de la fecha de la reserva, se devolverá el 90% del precio.",
          "Check In": "Llegada de 10:00 a las 18:00.",
          "Check Out": "Salida de las 10:00 a 13:00 (Puede ser más según disponibilidad).",
          "Mascotas": "Se admiten bajo petición. Se pueden aplicar suplementos. Se debe traer su propia cama. Las mascotas no tienen permitido subirse a la cama, si esto ocurre se deberá pagar un excedente de 100.000 COP.",
          "Seguridad y propiedad": "Vigilancia y estricta conservación del lugar."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "23-1",
            "description": "Habitación con Jacuzzi",
            "name": "Habitación con Jacuzzi",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Esta habitación doble cuenta con bañera de hidromasaje y chimenea. La habitación doble dispone de entrada privada, tetera/cafetera y baño privado con bañera y ducha. La habitación doble cuenta con suelo de parquet, zona de estar con TV, zona de comedor, armario y vistas al jardín. El alojamiento cuenta con 1 cama.",
            "precio": 320000,
            "servicios": {
              "servicios": [
                "Wifi",
                "Baño privado",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Chimenea"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "23-2",
            "description": "Habitación Azulejo",
            "name": "Habitación Azulejo",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Refugio artístico de inspiración única, esta habitación luminosa ofrece un espacio de calma y creatividad. Dos camas individuales de diseño contemporáneo se integran en un ambiente minimalista que invita al descanso y la reflexión. El baño cuenta con una elegante bañera de líneas suaves y una ducha de diseño que promete momentos de relajación sensorial. Cada rincón ha sido pensado para nutrir la inspiración y proporcionar un refugio sereno para artistas, viajeros y espíritus inquietos.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wifi",
                "Baño",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Chimenea"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 2,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "23-3",
            "description": "Habitación Colibrí",
            "name": "Habitación Colibrí",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "Santuario de serenidad artística, esta habitación envuelve a sus huéspedes en una atmósfera de tranquilidad refinada. La cama doble, de diseño elegante y texturas suaves, se integra en un espacio luminoso que equilibra estética y confort. El baño incluye una bañera y ducha que invitan a momentos de relajación profunda. Cada detalle ha sido cuidadosamente seleccionado para crear un ambiente inspirador y acogedor, perfecto para descansar y reconectar.",
            "precio": 250000,
            "servicios": {
              "servicios": [
                "Wifi",
                "Baño",
                "TV",
                "Desayuno incluido",
                "Petfriendly",
                "Chimenea"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 24,
        "oferente": "Las Tres Viejas",
        "metodosDePago": "Efectivo, transferencias, billeteras digitales y tarjetas.",
        "politicas": {
          "Cancelacion": "Se requiere el 50% para hacer efectiva la reserva. Las condiciones de cancelación pueden variar según el tipo de alojamiento. Consulta las condiciones con el alojamiento",
          "Check In": "De las 3:00 en adelante",
          "Check Out": "Hasta las 12:00 p.m.",
          "Mascotas": "Se admiten. Se pueden aplicar suplementos.",
          "Seguridad y propiedad": "Propiedad cerrada con parking privado."
        },
        "destino_id": 2,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "24-1",
            "description": "La Chorrera",
            "name": "La Chorrera",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "La habitación La Chorrera en el hotel Las Tres Viejas de Sesquilé combina la tradición local con comodidad práctica. Cuenta con una cama doble y dos sencillas, distribuidas estratégicamente en un espacio que conserva el ambiente rural de la región. El baño, situado de manera independiente, ofrece privacidad y funcionalidad.",
            "precio": 280000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            }
          },
          {
            "tipo_alojamiento_id": "24-2",
            "description": "Paramo Pan de Azúcar",
            "name": "Paramo Pan de Azúcar",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "La habitación de cama doble en el hotel Las Tres Viejas de Sesquilé combina confort y autenticidad local. Un espacio íntimo con una cama matrimonial amplia, decorada con textiles que reflejan la tradición artesanal de la región. El baño privado, completamente equipado, ofrece comodidad y privacidad, con detalles que armonizan con el estilo rústico de la habitación.",
            "precio": 170000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 1,
              "baños": 1
            },
          },
          {
            "tipo_alojamiento_id": "24-3",
            "description": "Laguna del Cacique Guatavita",
            "name": "Laguna del Cacique Guatavita",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "La habitación de cuatro camas en el hotel Las Tres Viejas de Sesquilé está diseñada para grupos o familias. Dispone de dos camas dobles y dos sencillas, distribuidas estratégicamente para maximizar el espacio y la comodidad. Un sofá adicional ofrece un área de descanso o reunión. El baño privado, completamente equipado, garantiza intimidad y funcionalidad.",
            "precio": 440000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 4,
              "baños": 1
            },
          },
          {
            "tipo_alojamiento_id": "24-4",
            "description": "Cerro Covadonga",
            "name": "Cerro Covadonga",
            "items": {
              "Tipo": "Hotel"
            },
            "detalle": "En el hotel Las Tres Viejas de Sesquilé, esta habitación ofrece versatilidad y confort. Equipada con una cama doble y dos sencillas, permite alojar cómodamente hasta cuatro personas. El baño privado garantiza intimidad y comodidad. Una estantería añade funcionalidad al espacio, permitiendo a los huéspedes organizar sus pertenencias. La decoración mantiene el estilo rústico tradicional de la región, con muebles de madera local y detalles que evocan el ambiente acogedor de Sesquilé.",
            "precio": 230000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado",
                "Desayuno incluido"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            }
          }
        ]
      },
      {
        "id": 10,
        "oferente": "El Canto Del Colibrí ",
        "metodosDePago": "Transferencia bancaria y efectivo.",
        "politicas": {
          "Cancelacion": "Cancelar 8 días antes de la fecha de la reserva, se devolverá el 90% del precio.",
          "Check In": "Llegada de 3 p.m. a 7p.m.",
          "Check Out": "Salida 12 p.m día siguiente ",
          "Mascotas": "Solo se aceptan perros, gatos no. Se debe traer su propia cama. Las mascotas no tienen permitido subirse a la cama, si esto ocurre se deberá pagar un excedente de 100.000 COP.",
          "Seguridad y propiedad": "Vigilancia y estricta conservación del lugar."
        },
        "destino_id": 1,
        "alojamiento": [
          {
            "tipo_alojamiento_id": "10-1",
            "description": "Casa de las estrellas ",
            "name": "Casa de las estrellas ",
            "items": {
              "Tipo": "Cabaña"
            },
            "detalle": "A tan solo una hora de Bogotá, en el municipio de Suesca, se encuentra el Canto del Colibrí, sede de la Fundación Pensar Bonito. Allí disponemos de una bella cabaña ideal para familias o parejas con capacidad de hasta cinco (5) personas en donde podrás conectarte con la montaña y realizar actividades de salud holística, bienestar y aventura.",
            "precio": 350000,
            "servicios": {
              "servicios": [
                "Wi-Fi",
                "Baño privado",
                "Petfriendly",
                "Estacionamiento",
                "Balcón privado"
              ]
            },
            "equipamento": {
              "habitaciones": 1,
              "camas": 3,
              "baños": 1
            },
          }
        ]
      }
    ]
}

export default datosDestinos;
