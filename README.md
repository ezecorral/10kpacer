# 10kpacer

Sitio web de bienvenida para 10K Pacer. Esta aplicación está pensada para desplegarse en Vercel y guardar datos de running en una base PostgreSQL hospedada en Supabase.

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Configurar la variable de entorno en Vercel o localmente:

- `DATABASE_URL` = `postgresql://postgres:Antoyeze89!@db.mfurbfczhluzpwyighae.supabase.co:5432/postgres`

3. Crear la tabla `Principal` usando `supabase/init.sql` o con el editor SQL de Supabase.

## Estructura

- `pages/index.tsx`: página principal de bienvenida con el formulario.
- `pages/api/submit.ts`: ruta API para guardar los datos en la tabla `Principal`.
- `lib/db.ts`: conexión a la base de datos PostgreSQL.
- `supabase/init.sql`: esquema de la tabla `Principal`.
- `styles/`: estilos de la interfaz profesional de la landing page.

## Uso

- Visita la página y completa todos los campos obligatorios.
- El formulario validará correo, formato de tiempo y datos numéricos.
- El registro se guarda en la tabla `Principal`.

## Despliegue en Vercel

- Añade la variable `DATABASE_URL` en Vercel.
- Despliega el proyecto y el sitio estará disponible en `10kpacer.vercel.app`.
