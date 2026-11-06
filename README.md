# SABER-360

Sistema integral de gestión y control educativo para centralizar procesos académicos y administrativos de una institución escolar.

## Estado del proyecto

El repositorio incluye la propuesta de producto, una estructura modular, un prototipo web y una API inicial conectada a PostgreSQL mediante Prisma. La interfaz todavía usa datos de demostración locales; la API ofrece endpoints iniciales para estudiantes y personal, pero aún no hay autenticación ni autorización.

## Requisitos

Node.js 20 o superior, npm y Docker con Docker Compose.

## Iniciar frontend y backend localmente

1. Preparar variables de entorno: `cp apps/api/.env.example apps/api/.env`.
2. Iniciar PostgreSQL: `docker compose -f infra/docker-compose.yml up -d`.
3. Instalar paquetes: `npm install`.
4. Generar cliente Prisma: `npm run db:generate`.
5. Crear/aplicar migración local: `npm run db:migrate`.
6. Cargar institución de desarrollo: `npm run db:seed`.
7. Terminal 1: `npm run dev:api`.
8. Terminal 2: `npm run dev:web`.

La API usa `http://localhost:4000`; el frontend se sirve con Vite. Rutas disponibles: `GET /health`, `GET /ready`, `GET|POST /api/students` y `GET|POST /api/staff`.

## Estructura

- `apps/web`: interfaz React + TypeScript + Vite.
- `apps/api`: API Express + TypeScript y acceso a PostgreSQL con Prisma.
- `apps/api/prisma`: esquema y carga inicial de desarrollo.
- `packages`: contratos/configuración compartidos cuando sean necesarios.
- `infra/docker-compose.yml`: base de datos PostgreSQL local.
- `docs/plan-proyecto-v1.md`: propuesta de negocio y producto.
- `docs/arquitectura-estructura.md`: límites y reglas de modularidad.

## Prototipo

El panel web muestra métricas de ejemplo. Añadir un estudiante desde la interfaz solo cambia el estado local del navegador: todavía no está conectado a la API. La API y la base de datos son un primer esqueleto funcional independiente; conectar la interfaz será una etapa posterior.
