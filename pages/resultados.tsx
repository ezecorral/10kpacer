import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { calculateResults, getGenderKey, RunnerInput } from '../lib/calc';
import LegalModal from '../components/LegalModal';
import styles from '../styles/Home.module.css';

const STORAGE_KEY = 'runnerFormData';

type ResultData = ReturnType<typeof calculateResults>;

export default function Resultados() {
  const [input, setInput] = useState<RunnerInput | null>(null);
  const [results, setResults] = useState<ResultData | null>(null);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const shareImageRef = useRef<HTMLDivElement | null>(null);

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

  const privacyText = `En 10kPacer valoramos tu confianza y utilizamos tus datos únicamente para generar métricas objetivas, comparativos y recomendaciones de rendimiento. La información que proporcionas se usa para calcular tu IMC, VO2max, frecuencia cardíaca, kilómetros semanales y otras referencias de entrenamiento dentro de este sistema. No vendemos tus datos y no los compartimos con terceros comerciales. Los datos se emplean para presentarte un diagnóstico de performance y un punto de partida para que tú manejes tu entrenamiento con mayor claridad. Esta plataforma no ofrece asesoramiento personalizado ni reemplaza la opinión de un profesional. Los cálculos son resultados matemáticos y estadísticos basados en la información que ingresas; su interpretación y uso depende exclusivamente de cada usuario. El propósito del Aviso de Privacidad es dejar en claro que esta solución actúa como herramienta de métricas y comparativos, no como consejo médico, deportivo o profesional. Tu información se conserva temporalmente en este entorno para permitir el cálculo inmediato y la presentación de resultados. Si decides compartir tus métricas, corresponderá a ti hacerlo de manera voluntaria. En ningún caso 10kPacer asume responsabilidad por decisiones personales derivadas del uso de estos indicadores. Esta plataforma respeta la privacidad de quienes la utilizan y su única función es facilitar datos de rendimiento. Si tienes dudas concretas sobre tu salud o tu entrenamiento, consulta con un médico, entrenador o profesional acreditado antes de tomar decisiones basadas en estos resultados.`;

  const termsText = `10kPacer ofrece métricas y resultados basados en los datos que ingresas, sin que esto constituya asesoramiento médico, deportivo, profesional o de cualquier otra naturaleza. Esta herramienta genera indicadores como IPG e IPE, pero no sustituye la consulta con un profesional de la salud o del deporte. El contenido que aquí se presenta es informativo: son valores derivados de fórmulas, comparativos internos y referencias de rendimiento. No garantizamos resultados ni asumimos responsabilidad por tu entrenamiento, tu condición física ni las acciones que tomes con estas métricas. El usuario es el único responsable de cómo emplea la información proporcionada. Si decides ajustar tu entrenamiento, nutrición o rutinas basadas en estos datos, hazlo bajo tu propia responsabilidad y, de ser necesario, con la supervisión de expertos calificados. Esta plataforma no certifica, no recomienda ni no avala prácticas de salud, deporte o medicina. El objetivo es entregar un panorama numérico y comparativo, no dictar una prescripción. Cualquier interpretación, decisión o cambio de hábito a partir de estos resultados queda a cargo del usuario. En caso de requerir asesoramiento especializado, contacta directamente a profesionales acreditados. 10kPacer es una herramienta de métricas, y su uso implica asumir que cada persona es responsable de su propio proceso y de los efectos que puedan derivarse de la información obtenida aquí.`;

  const shareText = `Mi IPG es ${results?.ipg}% y mi IPE es ${results?.ipe}%. Datos de 10kPacer.`;

  const handleInstagramShare = async () => {
    if (typeof window === 'undefined' || !shareImageRef.current) {
      return;
    }

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareImageRef.current, {
        backgroundColor: '#060708',
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) {
        throw new Error('No se pudo generar la imagen');
      }

      const file = new File([blob], '10kPacer-resultados.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '10kPacer - IPG e IPE',
          text: 'Mi resultado de performance en 10kPacer',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = '10kPacer-resultados.png';
        anchor.click();
        URL.revokeObjectURL(url);
        window.alert('Se descargó la imagen para que puedas compartirla desde tu galería.');
      }
    } catch (error) {
      console.error('Error compartiendo imagen:', error);
      window.alert('No se pudo compartir la imagen. El texto quedó copiado en el portapapeles.');
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
      }
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Resultados | 10K Pacer</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4415505503427088"
        crossOrigin="anonymous"
      />
      <section className={`${styles.hero} ${styles.resultHero}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Tu informe de performance con datos reales</h1>
          <p className={styles.heroSubtitle}>
            Esta página compara tu perfil actual con valores de referencia pSE y Elite para mostrar tus espacios de mejora más relevantes.
          </p>
        </div>
        <div className={styles.heroLabelRight}>
          <span className={styles.callout}>Reporte de Performance</span>
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
            <p className={styles.metricDelta}>Mejora disponible: {results.imcImprovementPercent.toFixed(0)}%</p>
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
            <p className={styles.metricDelta}>Mejora disponible: {results.vo2ImprovementPercent.toFixed(0)}%</p>
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
            <p className={styles.metricDelta}>Mejora disponible: {results.fcImprovementPercent.toFixed(0)}%</p>
          </div>

          <div className={styles.metricCard}>
            <h3>Km semanales</h3>
            <p className={styles.metricValue}>{input.kms_semanales.toFixed(1)}</p>
            <p className={styles.metricCaption}>pSE: {results.kmSemPse} km/sem <span className={styles.tooltipWrapper}><span className={styles.tooltipIcon}>?</span><span className={styles.tooltipText}>pSE es la referencia amateur de entrenamiento por semana para tu edad y género.</span></span></p>
            <p className={styles.metricCaption}>Elite: {results.kmSemElite} km/sem <span className={styles.tooltipWrapper}><span className={styles.tooltipIcon}>?</span><span className={styles.tooltipText}>Elite es la referencia de volumen semanal de los mejores corredores dentro de tu categoría.</span></span></p>
            <div className={styles.metricTrack}>
              <span
                className={styles.metricProgress}
                style={{ width: `${Math.min(100, (input.kms_semanales / results.kmSemElite) * 100)}%` }}
              />
            </div>
            <p className={styles.metricDelta}>Mejora disponible: {results.kmImprovementPercent.toFixed(0)}%</p>
            <p className={styles.metricDelta}>
              {results.mejoraKmSemanalesPse < 0
                ? `Estás ${Math.abs(results.mejoraKmSemanalesPse).toFixed(1)} km/sem por encima de pSE! Felicitaciones!`
                : `Faltan ${results.mejoraKmSemanalesPse.toFixed(1)} km para pSE`}
            </p>
          </div>

          <div className={styles.metricCard}>
            <h3>Posibilidad de mejora años</h3>
            <p className={styles.metricValue}>{results.mejoraYearsPse.toFixed(1)}%</p>
            <p className={styles.metricCaption}>pSE: {results.mejoraYearsPse.toFixed(1)}%</p>
            <p className={styles.metricCaption}>Elite: {results.mejoraYearsElite.toFixed(1)}%</p>
            <div className={styles.metricTrack}>
              <span
                className={styles.metricProgress}
                style={{ width: `${Math.min(100, results.mejoraYearsPse)}%` }}
              />
            </div>
            <p className={styles.metricDelta}>Tu probabilidad de mejora pSE es {results.mejoraYearsPse.toFixed(1)}%.</p>
            <p className={styles.metricDelta}>Posible Elite: {results.mejoraYearsElite.toFixed(1)}%.</p>
          </div>
        </div>

        <div className={styles.indicatorPanel} ref={shareImageRef}>
          <div className={styles.indicatorCard}>
            <div className={styles.indicatorHead}>
              <img src="/Logo.png" alt="10kPacer" className={styles.logoSmall} />
              <span className={styles.brandTag}>10kPacer</span>
            </div>
            <p className={styles.indicatorLabel}>IPG <span className={styles.tooltipWrapper}><span className={styles.tooltipIcon}>?</span><span className={styles.tooltipText}>IPG es tu Indicador General de Performance. Refleja qué tan cerca estás de las referencias pSE en múltiples pilares.</span></span></p>
            <p className={styles.indicatorValue}>{results.ipg}%</p>
            <p className={styles.indicatorNote}>
              Indicador General de Performance basado en tu brecha frente al grupo etario amateur / pSE.
            </p>
            
          </div>
          <div className={styles.indicatorCard}>
            <div className={styles.indicatorHead}>
              <img src="/Logo.png" alt="10kPacer" className={styles.logoSmall} />
              <span className={styles.brandTag}>10kPacer</span>
            </div>
            <p className={styles.indicatorLabel}>IPE <span className={styles.tooltipWrapper}><span className={styles.tooltipIcon}>?</span><span className={styles.tooltipText}>IPE es tu Índice de Performance Elite. Indica qué tan cerca estás del nivel Elite dentro de tu categoría.</span></span></p>
            <p className={styles.indicatorValue}>{results.ipe}%</p>
            <p className={styles.indicatorNote}>
              Índice Elite que muestra qué tanto te acercas al nivel Elite dentro de la referencia de tu categoría.
            </p>
            
          </div>
        </div>
        <div className={styles.shareSection}>
          <p className={styles.shareText}>
            Trabajamos para llevar nuestro análisis a todos los runners posibles, si estás de acuerdo, ayúdanos compartiendo.
          </p>
          <button type="button" className={styles.shareButton} onClick={handleInstagramShare}>
            Compartir
          </button>
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
      </section>
    </div>
  );
}
