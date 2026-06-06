import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase: SupabaseClient | null = null;
let pool: Pool | null = null;

if (supabaseUrl && supabaseServiceRoleKey) {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false }
  });
} else {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'No se encontró configuración de base de datos. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel, o DATABASE_URL en desarrollo local.'
    );
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
}

export type PrincipalRecord = {
  nombre_apellido: string;
  email: string;
  edad: number;
  genero: string;
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

export async function insertPrincipal(record: PrincipalRecord) {
  if (supabase) {
    const { error } = await supabase.from('Principal').insert([record]);
    if (error) {
      throw error;
    }
    return;
  }

  if (!pool) {
    throw new Error('El cliente de base de datos no está inicializado.');
  }

  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO "Principal" (
        nombre_apellido,
        email,
        edad,
        genero,
        peso_kg,
        altura_m,
        vo2max,
        vo2max_device,
        fc_max,
        fc_max_device,
        rhr,
        distancia_competencia_km,
        tiempo_competencia,
        kms_semanales,
        kms_max_carga,
        kms_por_sesion,
        anos_running,
        distancia_max_sesion,
        mejor_10k_time,
        ritmo_fondo,
        ritmo_200m,
        proximo_objetivo,
        fecha_objetivo,
        evento_similar,
        info_relevante
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
    `, [
      record.nombre_apellido,
      record.email,
      record.edad,
      record.genero,
      record.peso_kg,
      record.altura_m,
      record.vo2max,
      record.vo2max_device,
      record.fc_max,
      record.fc_max_device,
      record.rhr,
      record.distancia_competencia_km,
      record.tiempo_competencia,
      record.kms_semanales,
      record.kms_max_carga,
      record.kms_por_sesion,
      record.anos_running,
      record.distancia_max_sesion,
      record.mejor_10k_time,
      record.ritmo_fondo,
      record.ritmo_200m,
      record.proximo_objetivo,
      record.fecha_objetivo,
      record.evento_similar,
      record.info_relevante
    ]);
  } finally {
    client.release();
  }
}
