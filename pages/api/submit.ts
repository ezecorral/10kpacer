import type { NextApiRequest, NextApiResponse } from 'next';
import { insertPrincipal } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body;
    await insertPrincipal({
      nombre_apellido: String(data.nombre_apellido || '').trim(),
      email: String(data.email || '').trim(),
      edad: Number(data.edad),
      genero: String(data.genero || '').trim(),
      peso_kg: Number(data.peso_kg),
      altura_m: Number(data.altura_m),
      vo2max: Number(data.vo2max),
      vo2max_device: String(data.vo2max_device || '').trim(),
      fc_max: Number(data.fc_max),
      fc_max_device: String(data.fc_max_device || '').trim(),
      rhr: Number(data.rhr),
      distancia_competencia_km: Number(data.distancia_competencia_km),
      tiempo_competencia: String(data.tiempo_competencia || '').trim(),
      kms_semanales: Number(data.kms_semanales),
      kms_max_carga: Number(data.kms_max_carga),
      kms_por_sesion: Number(data.kms_por_sesion),
      anos_running: Number(data.anos_running),
      distancia_max_sesion: Number(data.distancia_max_sesion),
      mejor_10k_time: String(data.mejor_10k_time || '').trim(),
      ritmo_fondo: Number(data.ritmo_fondo),
      ritmo_200m: Number(data.ritmo_200m),
      proximo_objetivo: String(data.proximo_objetivo || '').trim(),
      fecha_objetivo: String(data.fecha_objetivo || '').trim(),
      evento_similar: String(data.evento_similar || '').trim(),
      info_relevante: String(data.info_relevante || '').trim(),
    });

    return res.status(200).json({ message: 'Datos guardados correctamente en Principal.' });
  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({ error: 'Error al guardar los datos. Verifica la configuración de la base de datos.' });
  }
}
