"use client"; // Directiva para componente cliente

import React from 'react';
import Header from '../features/home/header';

const TermsAndConditionsClient: React.FC = () => {
  const lastUpdatedDate = "15 de mayo de 2025"; // Puedes hacer esto dinámico si es necesario

  return (
    <>
        <Header />
        <div className="privacy-policy-page-container"> {/* Reutilizamos la clase base del contenedor */}
        <header className="privacy-policy-header"> {/* Reutilizamos la clase del encabezado */}
            <h1 className="privacy-policy-main-title">Términos y Condiciones de Uso</h1> {/* Reutilizamos la clase del título */}
            <p className="privacy-policy-last-updated">Última actualización: {lastUpdatedDate}</p> {/* Reutilizamos la clase */}
        </header>

        <main className="privacy-policy-body"> {/* Reutilizamos la clase del cuerpo */}
            <div className="privacy-policy-content"> {/* Reutilizamos la clase del contenido */}
            <p className="privacy-policy-paragraph">
                Bienvenido a Destiplus Suesca, una plataforma digital que centraliza información turística sobre
                alojamientos, experiencias, gastronomía, rutas naturales, actividades culturales y tips de viaje
                en Suesca, Cundinamarca. Al acceder y utilizar nuestra plataforma, aceptas expresamente los
                siguientes Términos y Condiciones de uso. Si no estás de acuerdo con ellos, por favor abstente
                de utilizar nuestros servicios.
            </p>

            <h2 className="privacy-policy-heading-2">1. Naturaleza del Servicio</h2>
            <p className="privacy-policy-paragraph">
                Destiplus Suesca no es un proveedor de servicios turísticos, ni ofrece actividades de alojamiento,
                gastronomía, transporte, guianza, ni experiencias de ningún tipo. Nuestra función es exclusivamente:
            </p>
            <ul className="privacy-policy-list">
                <li>Centralizar información sobre la oferta turística local.</li>
                <li>Sugerir actividades y experiencias con base en preferencias del usuario.</li>
                <li>Gestionar solicitudes de reserva con terceros proveedores.</li>
                <li>
                Diseñar y compartir rutas turísticas autodirigidas (GPS) con información detallada para
                facilitar la exploración autónoma.
                </li>
            </ul>
            <p className="privacy-policy-paragraph">
                Nuestra labor es informativa, de recomendación y coordinación. No tenemos relación de sociedad,
                subordinación o control con los establecimientos turísticos listados o sugeridos.
            </p>

            <h2 className="privacy-policy-heading-2">2. Sobre las Reservas y Terceros</h2>
            <p className="privacy-policy-paragraph">
                Cuando un usuario solicita gestionar una reserva a través de nuestro canal (p. ej., WhatsApp),
                actuamos únicamente como intermediarios entre el usuario y el proveedor final del servicio
                (hotel, restaurante, guía, etc.). El contrato de prestación de servicio se celebra directamente
                entre el usuario y el proveedor turístico.
            </p>
            <p className="privacy-policy-paragraph">
                Destiplus Suesca no es responsable por:
            </p>
            <ul className="privacy-policy-list">
                <li>El cumplimiento, calidad, disponibilidad o seguridad de los servicios ofrecidos por terceros.</li>
                <li>Cambios, cancelaciones, sobrecostos, incidentes o inconformidades en la prestación del servicio.</li>
                <li>Daños, pérdidas o perjuicios derivados de la experiencia contratada.</li>
            </ul>
            <p className="privacy-policy-paragraph">
                En caso de reclamos, quejas o reembolsos, el usuario deberá contactar directamente al
                establecimiento prestador del servicio. Aun así, estaremos dispuestos a ayudar a canalizar la
                comunicación si es necesario.
            </p>

            <h2 className="privacy-policy-heading-2">3. Sobre las Rutas Autodirigidas con GPS</h2>
            <p className="privacy-policy-paragraph">
                La plataforma ofrece acceso a rutas turísticas naturales que los usuarios pueden realizar por
                cuenta propia (senderismo, rutas a miradores, caminos rurales, etc.), mediante mapas y
                coordenadas GPS.
            </p>
            <p className="privacy-policy-paragraph">
                Estas rutas son totalmente opcionales, autodirigidas y realizadas bajo la responsabilidad
                exclusiva del usuario. Aunque ofrecemos descripciones detalladas (tipo de terreno, duración,
                nivel de dificultad, recomendaciones de seguridad), no garantizamos condiciones del clima,
                del terreno o de seguridad en campo.
            </p>
            <p className="privacy-policy-paragraph">
                Al hacer uso de estas rutas, el usuario reconoce y acepta que:
            </p>
            <ul className="privacy-policy-list">
                <li>La decisión de recorrer cualquier ruta es voluntaria y personal.</li>
                <li>
                Destiplus Suesca no se hace responsable por accidentes, pérdidas, lesiones, extravíos,
                condiciones médicas, daños personales o materiales que ocurran durante la ejecución de las rutas.
                </li>
                <li>Se recomienda evaluar condiciones físicas personales, clima, llevar el equipo adecuado y contar con compañía.</li>
            </ul>

            <h2 className="privacy-policy-heading-2">4. Limitación de Responsabilidad</h2>
            <p className="privacy-policy-paragraph">
                El uso de la plataforma implica que entiendes y aceptas que:
            </p>
            <ul className="privacy-policy-list">
                <li>
                Toda la información proporcionada es referencial, basada en fuentes públicas y/o en
                colaboración con los propios establecimientos turísticos.
                </li>
                <li>
                No garantizamos la veracidad absoluta ni actualizada de la información de terceros,
                aunque nos esforzamos por mantenerla precisa.
                </li>
                <li>
                Destiplus Suesca no es responsable por errores, omisiones, cambios de tarifas, condiciones,
                horarios u otros elementos informativos publicados por terceros.
                </li>
                <li>
                No garantizamos la disponibilidad continua del servicio. La plataforma puede estar
                temporalmente inactiva por mantenimiento, fallos técnicos u otras razones.
                </li>
            </ul>

            <h2 className="privacy-policy-heading-2">5. Responsabilidad del Usuario</h2>
            <p className="privacy-policy-paragraph">
                El usuario acepta:
            </p>
            <ul className="privacy-policy-list">
                <li>
                Utilizar la información y los servicios ofrecidos en la plataforma de forma responsable,
                legal y bajo su propio riesgo.
                </li>
                <li>
                No utilizar la plataforma para fines fraudulentos, ilegales o contrarios a estos
                Términos y Condiciones.
                </li>
                <li>
                Asumir total responsabilidad por las decisiones que tome con base en la información
                sugerida por la plataforma.
                </li>
            </ul>

            <h2 className="privacy-policy-heading-2">6. Propiedad Intelectual</h2>
            <p className="privacy-policy-paragraph">
                Todo el contenido original de la plataforma, incluyendo textos, rutas, diseños, mapas
                personalizados y materiales gráficos, es propiedad exclusiva de Destiplus Suesca o se
                utiliza bajo licencia. Está prohibida su reproducción total o parcial sin autorización
                previa por escrito.
            </p>

            <h2 className="privacy-policy-heading-2">7. Protección de Datos Personales</h2>
            <p className="privacy-policy-paragraph">
                El tratamiento de los datos personales de los usuarios se rige por nuestra Política de Privacidad,
                disponible en la plataforma. Al utilizar nuestros servicios, aceptas dicha política.
            </p>

            <h2 className="privacy-policy-heading-2">8. Modificaciones</h2>
            <p className="privacy-policy-paragraph">
                Destiplus Suesca podrá modificar estos Términos y Condiciones en cualquier momento.
                Las modificaciones serán publicadas y tendrán efecto a partir de su fecha de publicación.
                Recomendamos revisar esta sección periódicamente.
            </p>

            <h2 className="privacy-policy-heading-2">9. Legislación Aplicable y Jurisdicción</h2>
            <p className="privacy-policy-paragraph">
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier
                controversia derivada del uso de la plataforma será resuelta ante los tribunales
                competentes en Suesca, Cundinamarca.
            </p>

            <h2 className="privacy-policy-heading-2">10. Contacto</h2>
            <p className="privacy-policy-paragraph">
                Si tienes preguntas o sugerencias sobre estos Términos y Condiciones, puedes escribirnos a:
            </p>
            <ul className="privacy-policy-list">
                <li><strong>Correo electrónico:</strong> <a href="mailto:legal@suescatraveltech.com">destino.plus.2024@gmail.com
                </a></li>
                <li><strong>Teléfono:</strong> +57 (301) 508 1517</li>
                <li><strong>Dirección:</strong> Suesca, Cundinamarca, Colombia</li>
            </ul>
            </div>
        </main>
        </div>
    </>

  );
};

export default TermsAndConditionsClient;