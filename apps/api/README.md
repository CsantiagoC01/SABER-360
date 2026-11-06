# API de SABER-360

API inicial basada en Express, TypeScript, Prisma y PostgreSQL. Está organizada por módulos y actualmente ofrece operaciones de lectura y creación para estudiantes y personal. El módulo de personal diferencia docentes y empleados no docentes.

## Inicio local

Desde la raíz del repositorio:

```bash
cp apps/api/.env.example apps/api/.env
 docker compose -f infra/docker-compose.yml up -d
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev:api
```

La API queda en `http://localhost:4000`. Endpoints iniciales: `GET /health`, `GET /ready`, `GET|POST /api/students` y `GET|POST /api/staff`.

Ejemplo de creación de empleado no docente:

```json
{
  "employeeCode": "EMP-001",
  "firstName": "María",
  "lastName": "Pérez",
  "department": "Secretaría",
  "position": "Asistente administrativa",
  "staffType": "NON_TEACHING"
}
```

## Base de datos

El esquema Prisma está en `prisma/schema.prisma`. La migración inicial se crea localmente con `npm run db:migrate`; después de revisar y versionar ese SQL, los despliegues deben usar migraciones versionadas, no `migrate dev`.

## Importante antes de desplegar

Este es un backend de desarrollo: las rutas de escritura aún no tienen autenticación ni autorización. No exponerlo a Internet ni conectarlo a datos personales reales hasta incorporar autenticación, permisos por institución, auditoría, gestión segura de secretos, copias de seguridad y revisión de privacidad. Cambiar la contraseña de ejemplo y configurar HTTPS/secretos es obligatorio fuera del entorno local.
