import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LegalModal from '../components/LegalModal';
import styles from '../styles/Home.module.css';

const STORAGE_KEY = 'runnerFormData';
const timePattern = '^([0-1]?\\d|2[0-3]):[0-5]\\d:[0-5]\\d$';

export default function Home() {
  const [status, setStatus] = useState<string>('');
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setStatus('Enviando datos...');

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      router.push('/resultados');
    } else {
      const body = await response.json();
      setStatus(body.error || 'Ocurrió un error al enviar los datos.');
    }
  }

  const privacyText = `En 10kPacer valoramos tu confianza y utilizamos tus datos únicamente para generar métricas objetivas, comparativos y recomendaciones de rendimiento. La información que proporcionas se usa para calcular tu IMC, VO2max, frecuencia cardíaca, kilómetros semanales y otras referencias de entrenamiento dentro de este sistema. No vendemos tus datos y no los compartimos con terceros comerciales. Los datos se emplean para presentarte un diagnóstico de performance y un punto de partida para que tú manejes tu entrenamiento con mayor claridad. Esta plataforma no ofrece asesoramiento personalizado ni reemplaza la opinión de un profesional. Los cálculos son resultados matemáticos y estadísticos basados en la información que ingresas; su interpretación y uso depende exclusivamente de cada usuario. El propósito del Aviso de Privacidad es dejar en claro que esta solución actúa como herramienta de métricas y comparativos, no como consejo médico, deportivo o profesional. Tu información se conserva temporalmente en este entorno para permitir el cálculo inmediato y la presentación de resultados. Si decides compartir tus métricas, corresponderá a ti hacerlo de manera voluntaria. En ningún caso 10kPacer asume responsabilidad por decisiones personales derivadas del uso de estos indicadores. Esta plataforma respeta la privacidad de quienes la utilizan y su única función es facilitar datos de rendimiento. Si tienes dudas concretas sobre tu salud o tu entrenamiento, consulta con un médico, entrenador o profesional acreditado antes de tomar decisiones basadas en estos resultados.`;

  const termsText = `10kPacer ofrece métricas y resultados basados en los datos que ingresas, sin que esto constituya asesoramiento médico, deportivo, profesional o de cualquier otra naturaleza. Esta herramienta genera indicadores como IPG e IPE, pero no sustituye la consulta con un profesional de la salud o del deporte. El contenido que aquí se presenta es informativo: son valores derivados de fórmulas, comparativos internos y referencias de rendimiento. No garantizamos resultados ni asumimos responsabilidad por tu entrenamiento, tu condición física ni las acciones que tomes con estas métricas. El usuario es el único responsable de cómo emplea la información proporcionada. Si decides ajustar tu entrenamiento, nutrición o rutinas basadas en estos datos, hazlo bajo tu propia responsabilidad y, de ser necesario, con la supervisión de expertos calificados. Esta plataforma no certifica, no recomienda ni no avala prácticas de salud, deporte o medicina. El objetivo es entregar un panorama numérico y comparativo, no dictar una prescripción. Cualquier interpretación, decisión o cambio de hábito a partir de estos resultados queda a cargo del usuario. En caso de requerir asesoramiento especializado, contacta directamente a profesionales acreditados. 10kPacer es una herramienta de métricas, y su uso implica asumir que cada persona es responsable de su propio proceso y de los efectos que puedan derivarse de la información obtenida aquí.`;

  return (
    <div className={styles.page}>
      <Head>
        <title>10K Pacer | Bienvenida</title>
        <meta
          name="description"
          content="Bienvenida profesional para corredores con cálculo automático y registro de datos en Supabase."
        />
        <link rel="icon" href="/Logo.png" />
      </Head>

      <section className={`${styles.hero} ${styles.welcomeHero}`}>
        <div className={styles.heroContent}>
          <img src="/Logo.png" alt="10K Pacer" className={styles.logo} />
          <span className={styles.callout}>10K Pacer</span>
          <h1 className={styles.heroTitle}>Entrena con datos, no con suposiciones.</h1>
          <p className={styles.heroSubtitle}>
            Completa tu perfil y obtén un reporte inmediato de tu rendimiento.
            Descubre tu estado actual, tu potencial de mejora y tu próximo paso para correr mejor.
          </p>
          <p className={styles.heroSubtitle}>
            El informe se enfoca en tu desempeño real y en comparativas de referencia para guiar tu entrenamiento.
          </p>
        </div>
      </section>

      <section className={styles.welcomeImageSection}>
        <img src="/Llegada1.jpg" alt="Corredor llegando a meta" className={styles.welcomeImage} />
      </section>

      <section className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.grid}>
          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="nombre_apellido">
                Nombre y apellido
              </label>
              <input className={styles.input} id="nombre_apellido" name="nombre_apellido" type="text" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="email">
                Correo electrónico
              </label>
              <input className={styles.input} id="email" name="email" type="email" required />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.three}`}>
            <div>
              <label className={styles.label} htmlFor="edad">Edad</label>
              <input className={styles.input} id="edad" name="edad" type="number" min="10" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="genero">Forma física</label>
              <select className={styles.select} id="genero" name="genero" required>
                <option value="">Selecciona</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
            <div>
              <label className={styles.label} htmlFor="peso_kg">Peso en kg</label>
              <input className={styles.input} id="peso_kg" name="peso_kg" type="number" step="0.1" min="30" required />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="altura_m">Altura en metros</label>
              <input
                className={styles.input}
                id="altura_m"
                name="altura_m"
                type="number"
                step="0.01"
                min="1"
                placeholder="1,81"
                required
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="vo2max">VO2MAX</label>
              <input className={styles.input} id="vo2max" name="vo2max" type="number" step="0.1" required />
              <p className={styles.description}>
                Puede que tu reloj o celular tenga un cálculo estimado. Favor aclarar marca y modelo de dispositivo.
              </p>
              <input
                className={styles.input}
                id="vo2max_device"
                name="vo2max_device"
                type="text"
                placeholder="Ej. Garmin Forerunner 965"
                required
              />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="fc_max">Frecuencia cardíaca máxima alcanzada en ppm</label>
              <input className={styles.input} id="fc_max" name="fc_max" type="number" min="100" required />
              <p className={styles.description}>
                Puede que tu reloj o celular tenga un cálculo estimado para compartirte.
              </p>
              <input
                className={styles.input}
                id="fc_max_device"
                name="fc_max_device"
                type="text"
                placeholder="Ej. Polar Vantage V2"
                required
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="rhr">Frecuencia cardíaca de reposo RHR</label>
              <input className={styles.input} id="rhr" name="rhr" type="number" min="30" required />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.three}`}>
            <div>
              <label className={styles.label} htmlFor="distancia_competencia_km">Distancia máxima corrida en competencia (km)</label>
              <input className={styles.input} id="distancia_competencia_km" name="distancia_competencia_km" type="number" step="0.1" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="tiempo_competencia">Tiempo competencia (hh:mm:ss)</label>
              <input
                className={styles.input}
                id="tiempo_competencia"
                name="tiempo_competencia"
                type="text"
                pattern={timePattern}
                placeholder="01:02:30"
                required
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="kms_semanales">Km que corres semanalmente</label>
              <input className={styles.input} id="kms_semanales" name="kms_semanales" type="number" step="0.1" required />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.three}`}>
            <div>
              <label className={styles.label} htmlFor="kms_max_carga">Km en semana de mayor carga</label>
              <input className={styles.input} id="kms_max_carga" name="kms_max_carga" type="number" step="0.1" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="kms_por_sesion">Km por sesión de entrenamiento</label>
              <input className={styles.input} id="kms_por_sesion" name="kms_por_sesion" type="number" step="0.1" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="anos_running">Años en running</label>
              <input className={styles.input} id="anos_running" name="anos_running" type="number" min="0" required />
            </div>
          </div>

          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="distancia_max_sesion">Distancia máxima en sesión (km)</label>
              <input className={styles.input} id="distancia_max_sesion" name="distancia_max_sesion" type="number" step="0.1" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="mejor_10k_time">Tiempo más rápido 10K (hh:mm:ss)</label>
              <input
                className={styles.input}
                id="mejor_10k_time"
                name="mejor_10k_time"
                type="text"
                pattern={timePattern}
                placeholder="00:42:15"
                required
              />
              <p className={styles.description}>
                Aquí necesitamos tu tiempo en la competencia más cercana a 10K que hayas hecho.
              </p>
            </div>
          </div>

          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="ritmo_fondo">Ritmo de fondo (min/km)</label>
              <input className={styles.input} id="ritmo_fondo" name="ritmo_fondo" type="number" step="0.1" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="ritmo_200m">Ritmo rápido en 200m (min/km)</label>
              <input className={styles.input} id="ritmo_200m" name="ritmo_200m" type="number" step="0.1" required />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="proximo_objetivo">Próximo objetivo</label>
            <input className={styles.input} id="proximo_objetivo" name="proximo_objetivo" type="text" required />
          </div>

          <div className={`${styles.grid} ${styles.two}`}>
            <div>
              <label className={styles.label} htmlFor="fecha_objetivo">Fecha de tu próximo objetivo</label>
              <input className={styles.input} id="fecha_objetivo" name="fecha_objetivo" type="date" required />
            </div>
            <div>
              <label className={styles.label} htmlFor="evento_similar">¿Has corrido algún evento similar?</label>
              <input className={styles.input} id="evento_similar" name="evento_similar" type="text" required />
            </div>
          </div>

          <div>
            <label className={styles.label} htmlFor="info_relevante">Agrega cualquier información relevante</label>
            <textarea className={styles.textarea} id="info_relevante" name="info_relevante" required />
          </div>

          <div className={styles.submitGroup}>
            <span className={styles.status}>{status}</span>
            <button type="submit" className={styles.button}>
              Enviar y guardar en la base Principal
            </button>
          </div>
        </form>
      </section>

    <footer className={styles.footer}>
      <div className={styles.footerBrand}>10kPacer. Todos los derechos reservados.</div>
      <div className={styles.footerLinks}>
        <button type="button" className={styles.footerLink} onClick={() => setModalType('privacy')}>
          Aviso de Privacidad
        </button>
        <button type="button" className={styles.footerLink} onClick={() => setModalType('terms')}>
          Términos y Condiciones
        </button>
      </div>
    </footer>

    <LegalModal open={modalType === 'privacy'} title="Aviso de Privacidad" onClose={() => setModalType(null)}>
      <p>{privacyText}</p>
    </LegalModal>
    <LegalModal open={modalType === 'terms'} title="Términos y Condiciones" onClose={() => setModalType(null)}>
      <p>{termsText}</p>
    </LegalModal>
  </div>
  );
}

