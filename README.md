# SABER-360

Sistema integral de gestión y control educativo para centralizar procesos académicos y administrativos de una institución escolar.

## Estado del proyecto

El repositorio contiene el alcance inicial, la propuesta de producto y el primer prototipo ejecutable del panel web. El panel usa información de demostración local; todavía no hay API, base de datos ni autenticación real.

## Aplicación web

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal. Para validar una compilación de producción:

```bash
npm run build
npm run preview
```

## Estructura

- `apps/web`: interfaz React + TypeScript + Vite, organizada para crecer por módulos.
- `apps/api`: espacio para la API; su tecnología y persistencia se definirán antes de implementarlas.
- `packages`: contratos y configuración compartidos cuando sean necesarios.
- `docs/plan-proyecto-v1.md`: propuesta de negocio y producto.
- `docs/arquitectura-estructura.md`: límites y reglas de modularidad.

## Alcance del prototipo

El panel inicial incluye navegación por módulos, métricas escolares de muestra, resumen semanal de asistencia, próximos eventos, búsqueda de estudiantes y un formulario que agrega estudiantes solo al estado local de la página. Los datos se reinician al recargar; no representan registros reales.
