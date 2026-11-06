# SABER-360 — Plan de negocio y producto (Versión 1)

**Estado:** propuesta inicial para validar con una institución escolar antes de implementar.  
**Tipo de producto:** plataforma web de gestión escolar (SaaS o instalación institucional, por definir).  
**Nombre de trabajo:** SABER-360 — Sistema de Control Educativo.

## 1. Resumen ejecutivo

SABER-360 propone centralizar en una sola plataforma los procesos académicos y administrativos de una institución educativa. Busca reducir el trabajo manual y la duplicación de información, facilitar el seguimiento de estudiantes y personal, y ofrecer información confiable a quienes tienen autorización para consultarla.

La plataforma contempla los procesos escolares de principio a fin: estudiantes y familias, docentes, empleados no docentes, estructura académica, matrículas, asistencia, calificaciones, horarios, comunicaciones y reportes. Se recomienda comenzar con un producto mínimo viable (MVP), probarlo con una institución y priorizar el desarrollo según sus necesidades reales.

## 2. Problema y oportunidad

En muchas instituciones la información escolar se reparte entre hojas de cálculo, documentos, mensajería y sistemas que no se comunican entre sí. Esto puede causar:

- Registros duplicados o desactualizados.
- Dificultad para conocer asistencia, rendimiento o situación de matrícula.
- Procesos lentos para generar reportes y localizar expedientes.
- Comunicación fragmentada entre institución, estudiantes y familias.
- Gestión de personal docente y no docente en herramientas separadas.
- Acceso a datos sensibles sin una separación clara de permisos.

SABER-360 busca resolver estos problemas con registros centralizados, procesos consistentes y acceso basado en roles. La existencia y prioridad de cada problema debe validarse con usuarios de las instituciones objetivo.

## 3. Visión, misión y objetivos

**Visión:** ser una plataforma clara y confiable que ayude a las instituciones educativas a gestionar su operación escolar de forma integral.

**Misión:** ofrecer herramientas accesibles para organizar información académica y administrativa, apoyar el seguimiento de la comunidad educativa y reducir tareas manuales.

**Objetivos iniciales:**

1. Unificar los registros básicos de la institución en una fuente de información estructurada.
2. Permitir que cada usuario acceda únicamente a las funciones y datos que necesita.
3. Simplificar los procesos diarios de administración, asistencia y evaluación.
4. Facilitar reportes útiles para la toma de decisiones.
5. Diseñar una base modular que pueda crecer sin intentar construir todos los módulos a la vez.

## 4. Usuarios y clientes objetivo

### Usuarios de la plataforma

- **Administración / dirección:** configuración, supervisión y reportes institucionales.
- **Coordinación académica:** periodos, cursos, asignaturas, horarios y seguimiento académico.
- **Personal administrativo:** admisiones, matrículas, expedientes y tareas de oficina autorizadas.
- **Docentes:** listas de curso, asistencia, calificaciones y comunicaciones relacionadas con sus grupos.
- **Empleados no docentes:** acceso a las funciones pertinentes a su puesto; por ejemplo, biblioteca, orientación o gestión de servicios escolares.
- **Estudiantes:** consulta de su información, horario, asistencia, calificaciones y avisos, según la política institucional.
- **Familias o acudientes:** consulta de información de los estudiantes vinculados y comunicaciones autorizadas.

### Cliente objetivo inicial

Instituciones escolares que necesiten organizar sus procesos en una plataforma única y que puedan participar en entrevistas, pruebas y validación del MVP. El segmento concreto —por tamaño, nivel educativo, ubicación y capacidad de compra— aún debe definirse.

## 5. Propuesta de valor

- **Un solo lugar:** información escolar y administrativa organizada en módulos conectados.
- **Menos tareas repetitivas:** reutilización de datos y reportes estandarizados.
- **Seguimiento oportuno:** visibilidad de asistencia, calificaciones y matrícula para usuarios autorizados.
- **Roles claros:** separación de permisos para dirección, personal, docentes, estudiantes y familias.
- **Personal completo:** gestión diferenciada de docentes y empleados no docentes.
- **Crecimiento gradual:** empezar con funciones esenciales y agregar módulos según la validación.

## 6. Alcance funcional

### Núcleo del MVP

1. Inicio de sesión, perfiles, roles y permisos.
2. Configuración de la institución y periodos académicos.
3. Registro y consulta de estudiantes y acudientes.
4. Registro de docentes y asignación a cursos o materias.
5. Gestión de empleados no docentes: expediente laboral básico, puesto, departamento, estado, fechas relevantes y datos de contacto.
6. Gestión de grados, grupos, cursos y asignaturas.
7. Matrícula y vinculación de estudiantes con grupos.
8. Registro de asistencia por curso.
9. Registro y consulta de calificaciones básicas.
10. Dashboard y reportes iniciales.
11. Registro de acciones relevantes para auditoría.

### Fases posteriores

- Horarios y espacios físicos.
- Admisiones y seguimiento de solicitudes.
- Portal de familias y portal estudiantil.
- Notificaciones y mensajería institucional.
- Permisos, licencias y asistencia del personal no docente.
- Pagos, cuotas y conciliación, sujeto a las reglas locales.
- Biblioteca, inventario, transporte y servicios escolares.
- Exportación avanzada de reportes y analítica.

Cada fase dependerá de entrevistas con usuarios y de requisitos legales, operativos y técnicos aplicables.

## 7. Gestión de empleados no docentes

Este módulo será distinto del módulo docente, aunque puede compartir el inicio de sesión y los controles comunes de usuarios. Permitirá administrar personal como dirección, secretaría, orientación, biblioteca, mantenimiento, limpieza, seguridad y otros servicios escolares.

El alcance propuesto incluye expediente laboral, puesto, departamento, estado de empleo, fechas, datos de contacto, horarios, asistencia, solicitudes de permiso y documentos asociados. El MVP debe limitarse a los datos estrictamente necesarios. Documentos y datos laborales sensibles requerirán permisos restringidos, trazabilidad de acceso cuando sea pertinente y políticas de retención definidas por la institución.

## 8. Modelo de operación y sostenibilidad

La modalidad comercial todavía no está decidida. Opciones para evaluar con instituciones piloto:

- Suscripción por institución, con niveles según módulos o tamaño.
- Suscripción por cantidad de estudiantes activos.
- Licencia institucional con soporte y mantenimiento.
- Implementación y capacitación como servicio adicional.

No se fijan precios en esta versión: primero deben estimarse costos de alojamiento, soporte, desarrollo, respaldo, seguridad y operación, y validar la disposición de pago del segmento objetivo. Cualquier modalidad deberá explicar claramente el tratamiento y la propiedad de los datos institucionales.

## 9. Estrategia de lanzamiento

1. Entrevistar a dirección, administración, docentes, empleados no docentes, estudiantes y familias.
2. Elegir una institución piloto y documentar sus procesos actuales.
3. Priorizar problemas frecuentes y definir criterios de éxito antes de desarrollar.
4. Prototipar los flujos principales y validar comprensión y accesibilidad.
5. Implementar el MVP con datos de prueba y probar permisos, importación y reportes.
6. Ejecutar un piloto controlado, capacitar a usuarios y recoger incidencias.
7. Ajustar el producto y decidir si ampliar el alcance o preparar una primera versión productiva.

## 10. Indicadores de éxito

Los valores objetivo se definirán después de obtener una línea base. Indicadores iniciales posibles:

- Porcentaje de usuarios piloto que completan sus tareas principales.
- Tiempo para registrar asistencia y generar reportes, comparado con el proceso actual.
- Porcentaje de expedientes con información completa y validada.
- Número de incidencias de acceso o permisos detectadas durante las pruebas.
- Tasa de uso semanal por rol.
- Satisfacción de usuarios piloto y volumen de solicitudes de soporte.
- Disponibilidad, errores y recuperación de respaldos en el entorno de prueba.

## 11. Riesgos y medidas de mitigación

- **Alcance demasiado amplio:** limitar la primera entrega al MVP y validar cada módulo.
- **Requisitos escolares diversos:** entrevistar a instituciones y hacer configurables los procesos que realmente varían.
- **Datos personales de menores y empleados:** aplicar minimización de datos, controles de acceso, respaldos protegidos y revisión de requisitos legales locales antes del piloto.
- **Errores en migración:** definir plantillas, validación y copias de seguridad antes de importar información real.
- **Baja adopción:** incluir capacitación, diseño sencillo y acompañamiento al piloto.
- **Dependencia de una persona o proveedor:** documentar arquitectura, decisiones, respaldos y procedimientos de operación.
- **Costos de operación no estimados:** medir consumo y soporte en el piloto antes de elegir precios o escala.

## 12. Supuestos y decisiones pendientes

Esta versión es una hipótesis de producto, no una especificación legal ni un compromiso de funcionalidades. Para avanzar se debe confirmar:

- País y normativa educativa y de protección de datos aplicable.
- Nivel o niveles educativos y tipo de institución objetivo.
- Si el producto servirá a una institución o a varias instituciones (multi-tenant).
- Flujos actuales de matrícula, asistencia, calificación, pagos y recursos humanos.
- Qué roles y permisos requiere cada institución.
- Qué datos pueden consultar estudiantes y familias.
- Modalidad de alojamiento, respaldo, soporte y continuidad del servicio.
- Stack tecnológico y presupuesto de desarrollo.
- Requisitos de accesibilidad, idioma e integración con sistemas existentes.

## 13. Próximo paso recomendado

Realizar una fase breve de descubrimiento: entrevistar a representantes de una institución piloto, mapear sus procesos y validar el alcance del MVP. El resultado debería ser una lista priorizada de requisitos, prototipos de pantallas, matriz de roles y permisos, y criterios verificables para aceptar la primera versión.
