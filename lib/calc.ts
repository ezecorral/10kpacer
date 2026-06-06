export type Gender = 'Hombre' | 'Mujer';

export type RunnerInput = {
  nombre_apellido: string;
  email: string;
  edad: number;
  genero: Gender;
  peso_kg: number;
  altura_m: number;
  vo2max: number;
  vo2max_device: string;
  fc_max: number;
  fc_max_device: string;
  rhr: number;
  distancia_competencia_km: number;
  tiempo_competencia: string;
  kms_semanales: number;
  kms_max_carga: number;
  kms_por_sesion: number;
  anos_running: number;
  distancia_max_sesion: number;
  mejor_10k_time: string;
  ritmo_fondo: number;
  ritmo_200m: number;
  proximo_objetivo: string;
  fecha_objetivo: string;
  evento_similar: string;
  info_relevante: string;
};

const probA = [
  { amateur: 0, elite: 0 },
  { amateur: 12, elite: 5 },
  { amateur: 8, elite: 3 },
  { amateur: 6, elite: 2 },
  { amateur: 4, elite: 1.5 },
  { amateur: 3, elite: 1 },
  { amateur: 2.5, elite: 0.8 },
  { amateur: 2, elite: 0.6 },
  { amateur: 1.5, elite: 0.5 },
  { amateur: 1.2, elite: 0.4 },
  { amateur: 1, elite: 0.3 },
];

const kmSemanales = {
  Hombre: {
    pSE: [50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10],
    elite: [120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 148, 146, 144, 142, 140, 138, 136, 134, 132, 130, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80],
  },
  Mujer: {
    pSE: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1],
    elite: [100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60],
  },
};

const vo2maxTable = {
  Hombre: [55.4, 55.2, 55, 54.8, 54.6, 54.4, 54.2, 54, 53.8, 53.6, 53.4, 53.2, 53, 52.8, 52.6, 52.4, 52.2, 52, 51.8, 51.6, 51.4, 51.2, 51, 50.8, 50.6, 50.4, 50.2, 50, 49.8, 49.6, 49.4, 49.2, 49, 48.8, 48.6, 48.4, 48.2, 48, 47.8, 47.6, 47.4, 47.2, 47, 46.8, 46.6, 46.4, 46.2, 46, 45.8, 45.6, 45.4],
  Mujer: [49.6, 49.4, 49.2, 49, 48.8, 48.6, 48.4, 48.2, 48, 47.8, 47.6, 47.4, 47.2, 47, 46.8, 46.6, 46.4, 46.2, 46, 45.8, 45.6, 45.4, 45.2, 45, 44.8, 44.6, 44.4, 44.2, 44, 43.8, 43.6, 43.4, 43.2, 43, 42.8, 42.6, 42.4, 42.2, 42, 41.8, 41.6, 41.4, 41.2, 41, 40.8, 40.6, 40.4, 40.2, 40, 39.8, 39.6],
};

const vo2maxEliteTable = {
  Hombre: [70, 69.8, 69.6, 69.4, 69.2, 69, 68.8, 68.6, 68.4, 68.2, 68, 67.8, 67.6, 67.4, 67.2, 67, 66.8, 66.6, 66.4, 66.2, 66, 65.8, 65.6, 65.4, 65.2, 65, 64.8, 64.6, 64.4, 64.2, 64, 63.8, 63.6, 63.4, 63.2, 63, 62.8, 62.6, 62.4, 62.2, 62, 61.8, 61.6, 61.4, 61.2, 61, 60.8, 60.6, 60.4, 60.2, 60],
  Mujer: [60, 59.8, 59.6, 59.4, 59.2, 59, 58.8, 58.6, 58.4, 58.2, 58, 57.8, 57.6, 57.4, 57.2, 57, 56.8, 56.6, 56.4, 56.2, 56, 55.8, 55.6, 55.4, 55.2, 55, 54.8, 54.6, 54.4, 54.2, 54, 53.8, 53.6, 53.4, 53.2, 53, 52.8, 52.6, 52.4, 52.2, 52, 51.8, 51.6, 51.4, 51.2, 51, 50.8, 50.6, 50.4, 50.2, 50],
};

function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function parseTimeToMinutes(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) return 0;

  const parts = trimmed.split(':').map((part) => Number(part));
  if (parts.some(Number.isNaN)) return 0;

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 60 + minutes + seconds / 60;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes + seconds / 60;
  }

  return Number(trimmed) || 0;
}

export function getGenderKey(genero: string): Gender {
  const lower = genero.trim().toLowerCase();
  return lower.startsWith('muj') || lower === 'f' ? 'Mujer' : 'Hombre';
}

export function calculateResults(input: RunnerInput) {
  const gender = getGenderKey(input.genero);
  const age = clamp(20, input.edad, 70);
  const yearsRunning = clamp(0, input.anos_running, 10);
  const ageIndex = age - 20;
  const yearsIndex = yearsRunning;

  const imc = input.peso_kg / (input.altura_m * input.altura_m);
  const imcIdeal = 20;
  const mejoraImcPse = imc - imcIdeal;
  const mejoraImcElite = imc - imcIdeal + 1.5;

  const best10kMinutes = parseTimeToMinutes(input.mejor_10k_time);
  const vo2JackDaniels = best10kMinutes > 0 ? 0.2 * (10000 / best10kMinutes) + 3.5 : 0;

  const maxHrPredicted = gender === 'Hombre' ? 208 - 0.7 * input.edad : 206 - 0.88 * input.edad;
  const vo2Combined = vo2JackDaniels * 0.6 + (15.3 * (input.fc_max / input.rhr)) * 0.4;

  const vo2PromMaxSexed = vo2maxTable[gender][ageIndex];
  const vo2PromMaxElite = vo2maxEliteTable[gender][ageIndex];

  const mejoraVo2Pse = vo2PromMaxSexed - vo2Combined;
  const mejoraVo2Elite = vo2PromMaxElite - vo2Combined;
  const mejoraFcMax = maxHrPredicted - input.fc_max;

  const prob = probA[yearsIndex];
  const mejoraYearsPse = prob.amateur;
  const mejoraYearsElite = prob.elite;

  const kmSemPse = kmSemanales[gender].pSE[ageIndex];
  const kmSemElite = kmSemanales[gender].elite[ageIndex];
  const mejoraKmSemanalesPse = kmSemPse - input.kms_semanales;
  const mejoraKmSemanalesElite = kmSemElite - input.kms_semanales;

  const imcDeltaRatio = clamp(0, mejoraImcPse / 5, 1);
  const vo2DeltaRatio = clamp(0, mejoraVo2Pse / vo2PromMaxSexed, 1);
  const fcDeltaRatio = clamp(0, mejoraFcMax / maxHrPredicted, 1);
  const kmDeltaRatio = clamp(0, mejoraKmSemanalesPse / kmSemPse, 1);

  const ipg = Math.round(95 - (imcDeltaRatio + vo2DeltaRatio + fcDeltaRatio + kmDeltaRatio) * 5);

  const eliteImcRatio = clamp(0, mejoraImcElite / 5, 1);
  const eliteVo2Ratio = clamp(0, mejoraVo2Elite / vo2PromMaxElite, 1);
  const eliteKmRatio = clamp(0, mejoraKmSemanalesElite / kmSemElite, 1);
  const eliteAverage = (eliteImcRatio + eliteVo2Ratio + eliteKmRatio) / 3;
  const ipe = Math.round(99 - eliteAverage * 58);

  return {
    imc,
    imcIdeal,
    mejoraImcPse,
    mejoraImcElite,
    imcImprovementPercent: Math.max(0, (mejoraImcPse / imcIdeal) * 100),
    vo2JackDaniels,
    maxHrPredicted,
    vo2Combined,
    vo2PromMaxSexed,
    vo2PromMaxElite,
    mejoraVo2Pse,
    mejoraVo2Elite,
    vo2ImprovementPercent: Math.max(0, (mejoraVo2Pse / vo2PromMaxSexed) * 100),
    mejoraFcMax,
    fcImprovementPercent: Math.max(0, (mejoraFcMax / maxHrPredicted) * 100),
    mejoraYearsPse,
    mejoraYearsElite,
    kmSemPse,
    kmSemElite,
    mejoraKmSemanalesPse,
    mejoraKmSemanalesElite,
    kmImprovementPercent: Math.max(0, (mejoraKmSemanalesPse / kmSemPse) * 100),
    ipg,
    ipe,
  };
}
