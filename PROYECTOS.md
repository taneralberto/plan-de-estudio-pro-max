# Proyectos de Práctica

Todo concepto del plan se practica construyendo algo real. No ejercicios sueltos que se olvidan — proyectos con propósito que crecen con vos.

---

## 🛠️ Proyecto Principal — FreePress

Una **plataforma CMS/Blog open source** estilo WordPress, construida desde cero. Lo suficientemente complejo para ejercitar el 80% del plan.

**Stack:** Angular (frontend) + NestJS (backend) + PostgreSQL + Redis + Docker

### Features que vas a construir

**Filosofía:** NO construyas todo de entrada. Cada fase del plan te da los conocimientos para agregar la siguiente feature. El proyecto CRECE con tu aprendizaje.

---

## ✅ Definition of Done — El MVP de FreePress

FreePress necesita un "finish line" tan claro como los temas del plan. **Completar el MVP es el objetivo del proyecto** — todo lo demás es profundización optativa.

### Funcionalidad mínima

- [ ] Sistema de usuarios con roles (admin, editor, autor, lector)
- [ ] Auth con JWT + refresh tokens funcionando
- [ ] Crear, editar, publicar y borrar artículos
- [ ] Editor de contenido básico (Markdown o WYSIWYG simple)
- [ ] Listado de artículos públicos con paginación
- [ ] Búsqueda full-text básica

### Calidad mínima

- [ ] Tests de integración para flujos críticos (auth, CRUD de artículos)
- [ ] CI/CD que corre tests en cada PR
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] README que permite levantar el proyecto sin preguntar nada

### Deployment

- [ ] Deployado en un cloud real (Railway, Fly.io, AWS, etc.)
- [ ] Logs estructurados accesibles
- [ ] Al menos un endpoint monitoreado

---

### 🎁 BONUS — Features de profundización

**Todo lo siguiente es opcional**, no requerido para marcar FreePress como "done":

- Sistema de plugins/extensiones
- Comentarios en tiempo real
- Dashboard de analytics
- API pública documentada
- Sistema de notificaciones
- Media library avanzada

Si completaste el MVP y querés seguir agregando features por gusto personal, dale. Pero no es deuda pendiente.

---

### ¿Por qué este MVP?

| Criterio | Justificación |
|----------|---------------|
| **Alcanzable** | Se completa dentro del timeline del Core Path (~12-15 meses) |
| **Suficiente** | Demuestra comprensión de todos los conceptos Core del plan |
| **Tangible** | Es algo que podés mostrar, usar, y deployar de verdad |
| **Cerrable** | Tiene un final claro — no es un proyecto que nunca termina |

**El éxito:** Alguien que completa el MVP puede marcar FreePress como "done para los propósitos del plan" sin sentir que "le faltó hacer".

### 🚀 Cuándo arrancar

Al terminar la Fase 0, arrancás con Fase 2.1 (JS Internals) **en paralelo con el scaffold de FreePress**. No necesitás saber todo para empezar — pero sí necesitás la mentalidad de ingeniero de la Fase 0.

**El scaffold funcional (`docker-compose up` levanta todo) es un entregable de las semanas 2-3**, no algo que se pospone. Eso garantiza que cuando llegues a CS Fundamentals, ya tenés código real de referencia.

---

## Estado esperado de FreePress por Fase

Esta tabla es tu ancla de calibración. Al terminar cada fase, mirá FreePress y preguntate: *¿refleja esto lo que aprendí?*

**Nota sobre el orden:** Las fases se estudian en secuencia, no en orden numérico. Ver tabla de secuencia en el plan principal.

| Fase completada | Estado esperado de FreePress |
|-----------------|------------------------------|
| **Fase 0** | Repo creado. Scaffold funcional: `docker-compose up` levanta Angular + NestJS + PostgreSQL + Redis. Carpeta `/docs` con al menos 1 ADR (decisión de stack) y 1 PRD borrador (el editor WYSIWYG). README mínimo que explica cómo levantar el proyecto. |
| **Fase 2.1** (JS Internals) | FreePress corriendo localmente con código funcional. Al menos un bug arreglado entendiendo JS Internals. Configuración de TypeScript inicial. Git history con commits convencionales. Entendés el event loop y cómo afecta tu código. |
| **Fase 1** | Análisis de complejidad documentado en lugares donde importa. Estructuras de datos elegidas con justificación. El código refleja comprensión de cómo el event loop de Node.js maneja requests concurrentes. |
| **Fase 5.1** (Seguridad — Auth) | Auth básico funcionando: registro, login, JWT, refresh tokens. Al menos un endpoint protegido con RBAC. Passwords con hash seguro. Al menos 2 tests de integración para el flujo de auth. |
| **Fase 5** (completa) | Suite de tests backend con cobertura de los flujos críticos. Un reporte de `npm audit` sin vulnerabilidades críticas. Benchmark con Artillery o k6 sobre el endpoint más lento y podés leer el reporte. |
| **Fase 2** (completa) | Configuración de TypeScript en modo estricto. Build pipeline configurado (esbuild o webpack según corresponda). Al menos un módulo refactorizado para demostrar comprensión de closures, prototypes o concurrencia. |
| **Fase 7** | Schema de base de datos con migraciones versionadas. Índices justificados con `EXPLAIN ANALYZE`. Al menos una query compleja optimizada. Sistema básico de caché con Redis para queries de lectura frecuente. |
| **Fase 3** | Arquitectura refactorizada a capas claras (domain / application / infrastructure). Al menos un Bounded Context identificado y documentado en un ADR. Event-driven para al menos una feature (ej: notificaciones al publicar un artículo). Context Map en `/docs`. |
| **Fase 6** | Frontend Angular con state management implementado (NgRx o signals según ADR). Componentes con tests de integración usando Angular Testing Library. Storybook configurado con stories para los componentes principales del sistema de diseño. |
| **Fase 4** | Docker Compose de producción separado del de desarrollo. CI/CD con GitHub Actions: lint + tests + build en cada PR. Deploy automatizado a un cloud real (Railway, Fly.io, o AWS). Logs estructurados con correlación de requests. |
| **Fase 8** | `fp-ai-assistant` iniciado: al menos un endpoint que usa la API de Claude para una feature real (ej: sugerencias de tags, resumen de artículo). RAG básico contra el contenido de FreePress. |
| **Fase 9** | Documentación de arquitectura actualizada. Al menos un módulo legacy (el primero que escribiste) refactorizado con characterization tests + técnicas de Fowler. ADRs actualizados con las decisiones que cambiaste durante el plan. |

---

## 🔵 Mini-Proyectos Satélite

Para temas que no encajan naturalmente en FreePress:

### `freepress-cli`

Una CLI tool para gestionar FreePress desde la terminal (crear posts, deployar, migrar datos).

**Para practicar:** Node.js internals, streams, file system, argument parsing, IPC.

### `fp-ui`

Una librería de componentes UI publicada en npm.

**Para practicar:** Open source, semantic versioning, CI/CD de paquetes, API design de librerías, Storybook.

### `fp-ai-assistant`

Un agente de AI / MCP server para FreePress.

**Para practicar:** API de Claude, MCP, RAG, embeddings, agentic patterns. Acá SÍ podrías usar Python si querés explorar ese ecosistema.
