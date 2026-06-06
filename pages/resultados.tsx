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
      </Head>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.callout}>Informe de resultados</span>
          <h1 className={styles.heroTitle}>Tu reporte con base en el modelo del Excel</h1>
          <p className={styles.heroSubtitle}>
            Aquí tienes los cálculos principales que se derivan de tus datos y de las tablas de referencia del plan.
          </p>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.grid}>
          <div>
            <h2>Datos enviados</h2>
            <p><strong>Nombre:</strong> {input.nombre_apellido}</p>
            <p><strong>Edad:</strong> {input.edad}</p>
            <p><strong>Género:</strong> {input.genero}</p>
            <p><strong>Peso:</strong> {input.peso_kg} kg</p>
            <p><strong>Altura:</strong> {input.altura_m.toFixed(2)} m</p>
            <p><strong>KM semanales:</strong> {input.kms_semanales}</p>
            <p><strong>Años corriendo:</strong> {input.anos_running}</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <h2>Informe de posibilidades de mejora</h2>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>IMC</td>
                  <td>{results.imc.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Mejora IMC pSE (kg/m²)</td>
                  <td>{results.mejoraImcPse.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Mejora IMC Elite (kg/m²)</td>
                  <td>{results.mejoraImcElite.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>VO2max combinado</td>
                  <td>{results.vo2Combined.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>VO2max pSE referencia</td>
                  <td>{results.vo2PromMaxSexed.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>VO2max Elite referencia</td>
                  <td>{results.vo2PromMaxElite.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Posibilidad mejora VO2MAX pSE</td>
                  <td>{results.mejoraVo2Pse.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Posibilidad mejora VO2MAX Elite</td>
                  <td>{results.mejoraVo2Elite.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>FCmax estimada</td>
                  <td>{results.maxHrPredicted.toFixed(0)} ppm</td>
                </tr>
                <tr>
                  <td>Posibilidad mejora FCmax</td>
                  <td>{results.mejoraFcMax.toFixed(0)}</td>
                </tr>
                <tr>
                  <td>Probabilidad mejora pSE (%)</td>
                  <td>{results.mejoraYearsPse.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Probabilidad mejora Elite (%)</td>
                  <td>{results.mejoraYearsElite.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Km semanales pSE de referencia</td>
                  <td>{results.kmSemPse}</td>
                </tr>
                <tr>
                  <td>Km semanales Elite de referencia</td>
                  <td>{results.kmSemElite}</td>
                </tr>
                <tr>
                  <td>Mejora km semanales pSE</td>
                  <td>{results.mejoraKmSemanalesPse.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Mejora km semanales Elite</td>
                  <td>{results.mejoraKmSemanalesElite.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
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
