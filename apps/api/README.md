# API de SABER-360

API inicial basada en Express, TypeScript, Prisma y PostgreSQL. Está organizada por módulos y actualmente ofrece operaciones de lectura y creación para estudiantes y personal. El módulo de personal diferencia docentes y empleados no docentes.

## Inicio local

Requisitos: Node.js 20 o superior, npm y Docker Compose.

1. Copia `apps/api/.env.example` a `apps/api/.env`.
2. Define en ese archivo seis contraseñas distintas, de al menos 12 caracteres, para las variables `SEED_*_PASSWORD`. Son credenciales exclusivamente locales; no las uses en producción.
3. Inicia PostgreSQL desde la raíz:

```bash
docker compose -f infra/docker-compose.yml up -d
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev:api
```

La API queda en `http://localhost:4000`. Endpoints iniciales: `GET /health`, `GET /ready`, `GET|POST /api/students` y `GET|POST /api/staff`.

## Seed de desarrollo

El seed es idempotente: prepara la institución `Instituto Horizonte`, permisos, roles, seis cuentas de prueba y sus membresías. No sobrescribe las contraseñas de cuentas que ya existan. Al modificar la lista de roles/permisos, el seed agrega las asignaciones nuevas; no elimina asignaciones antiguas automáticamente.

Cuentas creadas:

| Rol | Correo |
|---|---|
| Administrador | `admin@saber360.local` |
| Coordinación académica | `coordinacion@saber360.local` |
| Docente | `docente@saber360.local` |
| Personal no docente | `personal@saber360.local` |
| Estudiante | `estudiante@saber360.local` |
| Acudiente | `acudiente@saber360.local` |

Las contraseñas se definen localmente mediante las variables de entorno indicadas arriba. El hash se genera con bcrypt. El seed no imprime contraseñas.

## Importante antes de desplegar

Este es un backend de desarrollo: las rutas de escritura aún no tienen autenticación ni autorización. Los roles y permisos que crea el seed son datos de configuración, pero todavía no están aplicados como controles en los endpoints. No exponer la API a Internet ni conectarla a datos personales reales hasta incorporar autenticación, autorización, aislamiento por institución, auditoría, gestión segura de secretos, copias de seguridad y revisión de privacidad.
