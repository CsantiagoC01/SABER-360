# Estructura modular de SABER-360

Esta estructura busca que cada área pueda evolucionar de forma aislada y que añadir o retirar módulos requiera el menor número posible de cambios en el resto del sistema.

> Ninguna estructura puede garantizar que un cambio no afecte absolutamente nada: siempre puede haber dependencias o contratos compartidos. Estas reglas reducen ese riesgo, hacen explícitas las dependencias y permiten detectar incompatibilidades con pruebas.

## Árbol propuesto

```text
SABER-360/
├── apps/
│   ├── web/                         # Aplicación web; independiente de la API
│   │   └── src/
│   │       ├── app/                 # Arranque, composición y rutas generales
│   │       ├── modules/             # Funcionalidades agrupadas por dominio
│   │       │   └── <modulo>/
│   │       │       ├── api/         # Adaptadores para consumir la API
│   │       │       ├── components/  # Componentes propios del módulo
│   │       │       ├── pages/       # Pantallas
│   │       │       ├── routes/      # Rutas del módulo
│   │       │       ├── hooks/       # Lógica de interfaz reutilizable local
│   │       │       └── tests/       # Pruebas del módulo
│   │       └── shared/
│   │           ├── ui/              # Componentes visuales genéricos
│   │           ├── lib/             # Utilidades sin reglas de negocio
│   │           └── types/           # Tipos realmente compartidos
│   └── api/                         # Aplicación de servidor
│       └── src/
│           ├── bootstrap/           # Inicio y composición de la aplicación
│           ├── config/              # Configuración y validación de entorno
│           ├── shared/              # Infraestructura transversal mínima
│           └── modules/
│               └── <modulo>/
│                   ├── domain/      # Entidades y reglas del dominio
│                   ├── application/ # Casos de uso y puertos
│                   ├── infrastructure/ # Persistencia e integraciones
│                   ├── presentation/   # HTTP, validación y serialización
│                   └── tests/       # Pruebas del módulo
├── packages/
│   ├── contracts/                   # Contratos públicos compartidos, sin lógica de negocio
│   └── config/                      # Configuración compartida si se justifica
├── tests/
│   └── e2e/                         # Pruebas de flujos completos
├── infra/
│   └── docker/                      # Recursos de ejecución local/despliegue
├── scripts/                         # Automatizaciones de desarrollo y mantenimiento
└── docs/
    ├── adr/                         # Decisiones de arquitectura (Architecture Decision Records)
    └── arquitectura-estructura.md
```

Los módulos de negocio se agregan cuando se implementen; no es necesario crear desde ahora carpetas vacías para todas las funcionalidades previstas.

## Dominios candidatos

Algunos módulos que podrían crearse bajo `modules/` cuando el MVP los requiera: `identity`, `students`, `guardians`, `staff`, `academic`, `enrollments`, `attendance`, `grading`, `communications` y `reports`. `staff` puede distinguir empleados no docentes de docentes mediante sus conceptos de dominio y permisos, sin mezclar sus procesos laborales.

## Reglas para mantener bajo el acoplamiento

1. **Cada módulo es dueño de sus reglas y datos.** Otro módulo no importa sus entidades internas ni consulta directamente sus tablas.
2. **Comunicación por interfaces públicas.** Un módulo expone casos de uso/servicios y contratos explícitos; el resto no depende de detalles de implementación.
3. **Dependencias dirigidas hacia abstracciones.** En el backend, dominio no depende de HTTP, base de datos ni de otros módulos. Infraestructura implementa puertos definidos por aplicación/dominio.
4. **Sin referencias cruzadas entre interfaces internas.** En el frontend, un módulo puede usar `shared` y la API pública de otro módulo, nunca sus archivos internos.
5. **Compartir solo lo estable.** `packages/contracts` y `shared` no deben convertirse en un depósito de lógica de negocio. Si una regla pertenece a un dominio, permanece en ese módulo.
6. **Cambios de contrato explícitos.** Un cambio incompatible de API o eventos debe versionarse o actualizar todos los consumidores en el mismo cambio y contar con pruebas.
7. **Persistencia encapsulada.** Repositorios y consultas quedan dentro de la infraestructura del módulo propietario. Las claves externas no autorizan acceso a tablas ajenas.
8. **Configuración central y validada.** Los secretos no se guardan en el repositorio. Cada aplicación valida su configuración al iniciar.
9. **Pruebas junto al código y de integración en su nivel.** Pruebas unitarias dentro del módulo; flujos entre módulos en `tests/e2e`.
10. **Eliminar un módulo requiere retirar sus consumidores.** Mantener un registro de dependencias y pruebas de contratos para que la retirada sea verificable.

## Cómo añadir o retirar un módulo

Para añadirlo: crear el módulo en `apps/api/src/modules/<nombre>` y, si corresponde, su sección de interfaz en `apps/web/src/modules/<nombre>`; definir propietario, límites y contratos; integrar en los puntos de composición (`bootstrap` y rutas); agregar pruebas unitarias, de integración y de permisos.

Para retirarlo: localizar sus consumidores, reemplazar o retirar las integraciones, migrar/archivar sus datos conforme a la política institucional, borrar el registro de composición y ejecutar toda la suite de pruebas. No se debe asumir que borrar una carpeta por sí solo deja el sistema intacto.

## Criterio de aceptación de cambios

Un cambio de módulo se considera aislado cuando no modifica implementaciones internas de otros módulos, mantiene o versiona sus contratos públicos, pasa las pruebas del módulo y las pruebas de integración/e2e relevantes, y documenta cualquier migración o cambio de permisos.
