import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { calculateResults, getGenderKey, RunnerInput } from '../lib/calc';
import styles from '../styles/Home.module.css';

const STORAGE_KEY = 'runnerFormData';

type ResultData = ReturnType<typeof calculateResults>;

export default function Resultados() {
  const [input, setInput] = useState<RunnerInput | null>(null);
  const [results, setResults] = useState<ResultData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const normalized: RunnerInput = {
        nombre_apellido: String(parsed.nombre_apellido || ''),
        email: String(parsed.email || ''),
        edad: Number(parsed.edad || 0),
        genero: getGenderKey(String(parsed.genero || 'Hombre')),
        peso_kg: Number(parsed.peso_kg || 0),
        altura_m: Number(parsed.altura_m || 0),
        vo2max: Number(parsed.vo2max || 0),
        vo2max_device: String(parsed.vo2max_device || ''),
        fc_max: Number(parsed.fc_max || 0),
        fc_max_device: String(parsed.fc_max_device || ''),
        rhr: Number(parsed.rhr || 0),
        distancia_competencia_km: Number(parsed.distancia_competencia_km || 0),
        tiempo_competencia: String(parsed.tiempo_competencia || ''),
        kms_semanales: Number(parsed.kms_semanales || 0),
        kms_max_carga: Number(parsed.kms_max_carga || 0),
        kms_por_sesion: Number(parsed.kms_por_sesion || 0),
        anos_running: Number(parsed.anos_running || 0),
        distancia_max_sesion: Number(parsed.distancia_max_sesion || 0),
        mejor_10k_time: String(parsed.mejor_10k_time || ''),
        ritmo_fondo: Number(parsed.ritmo_fondo || 0),
        ritmo_200m: Number(parsed.ritmo_200m || 0),
        proximo_objetivo: String(parsed.proximo_objetivo || ''),
        fecha_objetivo: String(parsed.fecha_objetivo || ''),
        evento_similar: String(parsed.evento_similar || ''),
        info_relevante: String(parsed.info_relevante || ''),
      };
      setInput(normalized);
      setResults(calculateResults(normalized));
    } catch (error) {
      console.error('Error parsing resultado input:', error);
    }
  }, []);

  if (!input || !results) {
    return (
      <div className={styles.page}>
        <Head>
          <title>Resultados | 10K Pacer</title>
        </Head>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>No hay datos para mostrar</h1>
            <p className={styles.heroSubtitle}>Envía tus datos desde la página principal para ver el informe de resultados.</p>
            <Link href="/">Volver al formulario</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>Resultados | 10K Pacer</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <section className={`${styles.hero} ${styles.resultHero}`}>
        <div className={styles.heroContent}>
          <img src="/Logo.png" alt="10K Pacer" className={styles.logo} />
          <span className={styles.callout}>Reporte de Performance</span>
          <h1 className={styles.heroTitle}>Tu informe de performance con datos reales</h1>
          <p className={styles.heroSubtitle}>
            Esta página compara tu perfil actual con valores de referencia pSE y Elite para mostrar tus espacios de mejora más relevantes.
          </p>
        </div>
      </section>

      <section className={`${styles.card} ${styles.darkCard}`}>
        <div className={styles.reportHeader}>
          <h2>Diagnóstico rápido</h2>
          <p>
            Tres pilares para tu próximo ciclo: IMC, VO2max y FCmax. Aquí ves tu estado actual, tus referencias y el potencial de mejora.
          </p>
        </div>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <h3>IMC</h3>
            <p className={styles.metricValue}>{results.imc.toFixed(1)}</p>
            <p className={styles.metricCaption}>Meta pSE: {results.imcIdeal.toFixed(1)}</p>
            <p className={styles.metricCaption}>Meta Elite: {(results.imcIdeal - 1.5).toFixed(1)}</p>
            <div className={styles.metricTrack}>
              <span
                className={styles.metricProgress}
                style={{ width: `${Math.min(100, (results.imc / 30) * 100)}%` }}
              />
            </div>
            <p className={styles.metricDelta}>Reducir {results.mejoraImcPse.toFixed(1)} kg/m² para llegar a pSE</p>
            <p className={styles.metricDelta}>Reducir {results.mejoraImcElite.toFixed(1)} kg/m² para llegar a Elite</p>
          </div>

          <div className={styles.metricCard}>
            <h3>VO2max</h3>
            <p className={styles.metricValue}>{results.vo2Combined.toFixed(1)}</p>
            <p className={styles.metricCaption}>Referente pSE: {results.vo2PromMaxSexed.toFixed(1)}</p>
            <p className={styles.metricCaption}>Referente Elite: {results.vo2PromMaxElite.toFixed(1)}</p>
            <div className={styles.metricTrack}>
              <span
                className={styles.metricProgress}
                style={{ width: `${Math.min(100, (results.vo2Combined / results.vo2PromMaxElite) * 100)}%` }}
              />
            </div>
            <p className={styles.metricDelta}>Espacio de mejora pSE: {results.mejoraVo2Pse.toFixed(1)}</p>
            <p className={styles.metricDelta}>Espacio de mejora Elite: {results.mejoraVo2Elite.toFixed(1)}</p>
          </div>

          <div className={styles.metricCard}>
            <h3>FCmax</h3>
            <p className={styles.metricValue}>{input.fc_max.toFixed(0)} ppm</p>
            <p className={styles.metricCaption}>Estimado objetivo: {results.maxHrPredicted.toFixed(0)} ppm</p>
            <div className={styles.metricTrack}>
              <span
                className={styles.metricProgress}
                style={{ width: `${Math.min(100, (input.fc_max / results.maxHrPredicted) * 100)}%` }}
              />
            </div>
            <p className={styles.metricDelta}>Potencial mejora: {results.mejoraFcMax.toFixed(0)} ppm</p>
            <p className={styles.metricDelta}>RHR actual: {input.rhr} ppm</p>
          </div>
        </div>

        <div className={styles.resultSummary}>
          <div>
            <h3>Datos enviados</h3>
            <p><strong>Nombre:</strong> {input.nombre_apellido}</p>
            <p><strong>Edad:</strong> {input.edad}</p>
            <p><strong>Género:</strong> {input.genero}</p>
            <p><strong>Peso:</strong> {input.peso_kg} kg</p>
            <p><strong>Altura:</strong> {input.altura_m.toFixed(2)} m</p>
            <p><strong>KM semanales:</strong> {input.kms_semanales}</p>
            <p><strong>Años corriendo:</strong> {input.anos_running}</p>
          </div>
          <div>
            <h3>Rutas de mejora</h3>
            <ul>
              <li>Incrementar volumen hasta {results.kmSemPse} km/sem pSE o {results.kmSemElite} km/sem Elite.</li>
              <li>Agregar {results.mejoraKmSemanalesPse.toFixed(1)} km/sem para alcanzar pSE.</li>
              <li>Agregar {results.mejoraKmSemanalesElite.toFixed(1)} km/sem para acercarte a Elite.</li>
              <li>Tu probabilidad de progreso pSE es {results.mejoraYearsPse.toFixed(1)}% y Elite {results.mejoraYearsElite.toFixed(1)}%.</li>
            </ul>
          </div>
        </div>

        <div className={styles.submitGroup}>
          <Link href="/" className={styles.button}>
            Volver al formulario
          </Link>
        </div>
      </section>
    </div>
  );
}
