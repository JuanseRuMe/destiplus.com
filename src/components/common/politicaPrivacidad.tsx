"use client"; // Directiva para componente cliente

import React from 'react';
import Header from '../features/home/header';

const PrivacyPolicyClient: React.FC = () => {
  const lastUpdatedDate = "15 de mayo de 2025"; // Puedes hacer esto dinámico si es necesario

  return (
    <>
        <Header />
        <div className="privacy-policy-page-container">
      <header className="privacy-policy-header">
        <h1 className="privacy-policy-main-title">Política de Privacidad y Tratamiento de Datos Personales</h1>
        <p className="privacy-policy-last-updated">Última actualización: {lastUpdatedDate}</p>
      </header>

      <main className="privacy-policy-body">
        <div className="privacy-policy-content">
          <p className="privacy-policy-paragraph">
            Destiplus Suesca (en adelante “la Plataforma”) se compromete a proteger la privacidad de los usuarios
            conforme a la Ley 1581 de 2012 y demás normas colombianas aplicables. La presente Política de Privacidad
            describe cómo recopilamos, utilizamos y protegemos tus datos personales cuando utilizas nuestra
            plataforma tecnológica turística dedicada a alojamientos, actividades, restaurantes, bares, cafés,
            rutas a miradores y tips de destinos en Suesca, Cundinamarca. Nuestros servicios están dirigidos
            exclusivamente a personas mayores de 18 años. No recopilamos datos de menores de edad y, si algún
            dato de menores llega a almacenarse inadvertidamente, será eliminado de inmediato. El responsable
            del tratamiento de tus datos personales es Destiplus Suesca, con domicilio en Suesca, Cundinamarca,
            Colombia. Al interactuar con la Plataforma, aceptas las condiciones de esta política.
          </p>

          <h2 className="privacy-policy-heading-2">Datos Personales Recopilados</h2>
          <p className="privacy-policy-paragraph">
            Para brindarte nuestros servicios, recopilamos únicamente los datos personales estrictamente necesarios.
            Los principales datos que recogemos son:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Nombre completo:</strong> para identificarte al momento de gestionar tu reserva.
            </li>
            <li>
              <strong>Número de teléfono:</strong> lo usas al comunicarte con nuestro asistente por WhatsApp; nos
              permite contactarte para confirmar detalles de tu reserva.
            </li>
            <li>
              <strong>Correo electrónico:</strong> se solicita para enviarte confirmaciones, información relevante
              sobre la reserva u otros mensajes asociados al servicio solicitado.
            </li>
            <li>
              <strong>Historial de reservas:</strong> almacenamos un registro de las actividades o planes que has
              reservado a través de la plataforma (fechas, servicios contratados, proveedores, etc.). Esto nos
              ayuda a ofrecerte un mejor seguimiento y atención personalizada.
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            Adicionalmente:
          </p>
          <ul className="privacy-policy-list">
            <li>
              No utilizamos cookies ni otras tecnologías de rastreo en el navegador. No se registra información
              de navegación personal ni se hace seguimiento de tu actividad web más allá de lo necesario para el
              funcionamiento del servicio.
            </li>
            <li>
              <strong>Analítica de uso sin cookies:</strong> empleamos herramientas de analítica que no utilizan cookies ni
              identifican individualmente a los usuarios. Estas herramientas registran únicamente eventos de uso
              agregados y anónimos (por ejemplo, número de veces que se consulta una ruta o la duración de las
              sesiones) con fines estadísticos y para mejorar la plataforma. Estos datos no permiten identificarte
              personalmente y no se comparten con terceros para fines de marketing.
            </li>
          </ul>

          <h2 className="privacy-policy-heading-2">Finalidad del Tratamiento</h2>
          <p className="privacy-policy-paragraph">
            Tratamos tus datos personales con las siguientes finalidades explícitas y legítimas:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Gestión de reservas y prestación del servicio:</strong> Procesar y confirmar las reservas de
              alojamiento, actividades o experiencias turísticas que solicites a través de WhatsApp. Esto
              incluye compartir la información necesaria (como tu nombre y contacto) con los proveedores de
              servicios turísticos (hoteles, restaurantes, operadores, guías, etc.) encargados de ejecutar la
              reserva.
            </li>
            <li>
              <strong>Comunicación y notificaciones:</strong> Enviarte confirmaciones, actualizaciones o recordatorios
              relacionados con tus reservas y brindarte soporte ante cualquier inquietud o cambio en el servicio.
            </li>
            <li>
              <strong>Mejora continua del servicio:</strong> Analizar de forma anónima cómo interactúas con la
              plataforma y nuestro asistente de reservas para optimizar functionalities, contenido y rutas
              turísticas disponibles. Para ello usamos métricas de uso anónimas (p.ej., número de consultas,
              comportamiento en la plataforma).
            </li>
            <li>
              <strong>Cumplimiento de obligaciones legales:</strong> En caso de ser necesario, utilizamos tus datos
              para cumplir con obligaciones legales o requerimientos de autoridades competentes de acuerdo con
              la ley colombiana.
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            <strong>Importante:</strong> No utilizamos tus datos personales con fines de mercadeo o publicidad sin tu
            consentimiento explícito. No compartimos tu información con compañías de publicidad ni realizamos
            perfiles comerciales basados en tu actividad.
          </p>

          <h2 className="privacy-policy-heading-2">Base Legal del Tratamiento</h2>
          <p className="privacy-policy-paragraph">
            El tratamiento de tus datos personales se realiza bajo los principios y bases legales establecidos
            en la legislación colombiana (Ley 1581 de 2012 y decretos reglamentarios). En particular:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Consentimiento:</strong> Al proporcionar tus datos y utilizar la plataforma, otorgas tu
              consentimiento expreso para el tratamiento de la información personal necesaria para gestionar
              tus reservas y prestarte los servicios solicitados. Este consentimiento es libre, previo e informado.
            </li>
            <li>
              <strong>Ejecución de un contrato o pedido:</strong> Cuando solicitas y contratas servicios turísticos
              mediante nuestra plataforma, el tratamiento de datos (como confirmaciones de reserva) es necesario
              para la ejecución de ese contrato de prestación de servicios.
            </li>
            <li>
              <strong>Obligación legal:</strong> En ciertos casos, podemos requerir mantener o procesar información
              por cumplimiento de obligaciones legales (por ejemplo, contabilidad, tributarias o requerimientos
              de autoridades).
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            En todo momento aplicamos los principios de finalidad, legalidad, libertad, veracidad, transparencia
            y seguridad de la Ley 1581 de 2012.
          </p>

          <h2 className="privacy-policy-heading-2">Compartición de Datos</h2>
          <p className="privacy-policy-paragraph">
            TravelTech Suesca garantiza que no compartirá tus datos personales con terceros ajenos a lo necesario
            para cumplir con las finalidades mencionadas, salvo tu consentimiento explícito o obligación legal.
            En concreto:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Proveedores turísticos:</strong> Compartimos los datos esenciales de tu reserva con los
              prestadores del servicio que la gestionan (por ejemplo, nombre, contacto y detalle de la reserva)
              para coordinar y confirmar tu plan o actividad. Estos proveedores actúan como encargados del
              tratamiento en los términos del artículo 2 de la Ley 1581. Se les exige manejar tus datos conforme
              a las mismas políticas de confidencialidad.
            </li>
            <li>
              <strong>Equipo interno:</strong> Solo el personal autorizado y capacitado de TravelTech Suesca puede
              acceder a tus datos, cuando sea estrictamente necesario para atención al cliente, gestión
              administrativa o desarrollo de nuestras funciones.
            </li>
            <li>
              <strong>Autoridades y obligaciones legales:</strong> Podremos compartir información cuando así lo exija
              una orden judicial o las autoridades competentes, o en casos expresamente previstos por la ley
              (p.ej., informes a entidades de vigilancia).
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            Nunca compartimos datos con fines de mercadeo y en ningún caso vendemos información personal a
            terceros. Si en el futuro decidimos compartir datos para nuevas finalidades, solicitaremos tu
            consentimiento por separado y transparente.
          </p>
          <p className="privacy-policy-paragraph">
            Todas las transferencias o comparticiones de datos se efectúan dentro del marco legal colombiano y,
            en su caso, se garantizan los mismos niveles de protección en cualquier país destino.
          </p>

          <h2 className="privacy-policy-heading-2">Derechos de los Usuarios</h2>
          <p className="privacy-policy-paragraph">
            Como titular de los datos tienes derechos reconocidos por la ley. Entre otros, puedes ejercer:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Acceso y conocimiento:</strong> Solicitar información sobre los datos personales que tenemos
              acerca de ti.
            </li>
            <li>
              <strong>Rectificación y actualización:</strong> Corregir o actualizar tus datos en caso de que estén
              incompletos, sean inexactos o hayan cambiado.
            </li>
            <li>
              <strong>Supresión o eliminación:</strong> Pedir la eliminación de tus datos cuando consideres que no
              son necesarios para las finalidades previstas o si retiras tu consentimiento.
            </li>
            <li>
              <strong>Oposición o revocatoria:</strong> Oponerte al tratamiento de tus datos para fines específicos o
              revocar tu consentimiento para usos futuros, en cualquier momento.
            </li>
            <li>
              <strong>Portabilidad:</strong> En los casos que aplique, solicitar la portabilidad de tus datos a otro
              proveedor del servicio cuando ello sea técnicamente posible.
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            Para ejercer estos derechos, puedes contactarnos a través de los canales indicados en la sección de
            Contacto. Debes incluir, como mínimo, tu nombre, identificación y los detalles de tu solicitud.
            Respondemos conforme a los términos y plazos establecidos en la normatividad vigente. Además, si no
            estás satisfecho con la gestión de tu solicitud, tienes derecho a presentar reclamo ante la
            Superintendencia de Industria y Comercio en Colombia.
          </p>

          <h2 className="privacy-policy-heading-2">Medidas de Seguridad</h2>
          <p className="privacy-policy-paragraph">
            Hemos implementado políticas, protocolos y controles de seguridad de acuerdo con las mejores
            prácticas y la normatividad colombiana para proteger tu información personal. Entre las medidas
            adoptadas están:
          </p>
          <ul className="privacy-policy-list">
            <li>
              <strong>Cifrado y canales seguros:</strong> La información que transmites a través de la plataforma y
              WhatsApp se encripta mediante protocolos seguros (p.ej., SSL/TLS), garantizando la
              confidencialidad en la comunicación.
            </li>
            <li>
              <strong>Control de acceso:</strong> El acceso a la base de datos de usuarios está restringido mediante
              credenciales seguras. Solo personal autorizado y con necesidad legítima puede consultar o
              gestionar la información personal.
            </li>
            <li>
              <strong>Almacenamiento protegido:</strong> Tus datos se almacenan en servidores seguros ubicados en
              Colombia, con copias de respaldo periódicas que evitan pérdida de información.
            </li>
            <li>
              <strong>Políticas internas:</strong> Todo el personal de TravelTech Suesca recibe capacitación en
              protección de datos y sus obligaciones de confidencialidad. Contamos con políticas claras de
              seguridad de la información para el manejo correcto de los datos.
            </li>
            <li>
              <strong>Auditorías y monitoreo:</strong> Se realizan evaluaciones periódicas de seguridad para detectar y
              corregir posibles vulnerabilidades en nuestros sistemas.
            </li>
          </ul>
          <p className="privacy-policy-paragraph">
            A pesar de estas medidas, recuerda que el uso de internet tiene riesgos inherentes. Te recomendamos
            no compartir contraseñas de otros servicios ni información que exceda lo requerido para la reserva.
            TravelTech Suesca no asume responsabilidad por el uso indebido de tu cuenta externa (por ejemplo, tu
            cuenta de WhatsApp).
          </p>

          <h2 className="privacy-policy-heading-2">Contacto</h2>
          <p className="privacy-policy-paragraph">
            Para cualquier pregunta, solicitud de información adicional o para ejercer tus derechos de acceso,
            rectificación, supresión u otros, puedes contactarnos a través de los siguientes medios:
          </p>
          <ul className="privacy-policy-list">
            <li><strong>Correo electrónico:</strong> <a href="mailto:privacidad@suescatraveltech.com">destino.plus.2024@gmail.com
            </a></li>
            <li><strong>Teléfono:</strong> +57 (301) 508 1517</li>
            <li><strong>Dirección postal:</strong> Suesca, Cundinamarca, Colombia</li>
          </ul>
          <p className="privacy-policy-paragraph">
            Nuestro equipo de protección de datos revisará tu solicitud y te dará respuesta en los plazos
            legales correspondientes.
          </p>

          <h2 className="privacy-policy-heading-2">Cambios en la Política</h2>
          <p className="privacy-policy-paragraph">
            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para
            adaptarnos a cambios legales o mejoras del servicio. Cualquier cambio será publicado en nuestra
            plataforma y la última versión estará siempre disponible para tu consulta. Te recomendamos revisar
            esta política periódicamente. Los cambios se aplicarán a partir de su publicación, con vigencia
            inmediata, salvo indicación contraria.
          </p>
          <p className="privacy-policy-paragraph">
            <strong>Fecha de última actualización:</strong> {lastUpdatedDate}.
          </p>
        </div>
      </main>
        </div>
    </>
  );
};

export default PrivacyPolicyClient;