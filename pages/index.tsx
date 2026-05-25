import { FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const timePattern = '^([0-1]?\\d|2[0-3]):[0-5]\\d:[0-5]\\d$';

export default function Home() {
  const [status, setStatus] = useState<string>('');

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
      setStatus('¡Gracias! Los datos se guardaron correctamente.');
      form.reset();
    } else {
      const body = await response.json();
      setStatus(body.error || 'Ocurrió un error al enviar los datos.');
    }
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>10K Pacer | Bienvenida</title>
        <meta
          name="description"
          content="Bienvenida profesional para corredores con cálculo automático y registro de datos en Supabase."
        />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.callout}>10K PACER</span>
          <h1 className={styles.heroTitle}>Descubre tu potencial real como corredor.</h1>
          <p className={styles.heroSubtitle}>
            Bienvenido a una experiencia profesional diseñada para corredores que quieren medir datos clave y traducirlos en resultados.
            Completa tu perfil con precisión para conocer tu rendimiento y tu ruta hacia una versión más veloz y saludable.
          </p>
          <p className={styles.heroSubtitle}>
            Todos los campos son obligatorios. Tu información se guarda en la tabla <strong>Principal</strong> para análisis y resultados confiables.
          </p>
        </div>

        <div className={styles.imagePanel}>
          <div className={styles.imagePanelContent}>
            <h3>Bienvenido a la evaluación de rendimiento</h3>
            <p>
              Este espacio está pensado para corredores serios: velocidad, resistencia y datos precisos para conocerte mejor.
            </p>
          </div>
        </div>
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
    </div>
  );
}
