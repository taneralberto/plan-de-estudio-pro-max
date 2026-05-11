# Proyectos de Práctica

Todo concepto del plan se practica construyendo algo real.

---

## FreePress — Proyecto Principal

Una **plataforma CMS/Blog open source** estilo WordPress, construida desde cero. Lo suficientemente complejo para ejercitar el 80% del plan.

**Stack progresivo:**

| Etapa | Stack | Por qué |
|-------|-------|--------|
| **1 — Entrada** | HTML + CSS + Express + SQLite | Minimalista, se levanta sin Docker, el estudiante entiende cada pieza |
| **2 — Fundamentos** | Angular + NestJS + PostgreSQL + Redis | Migración justificada: Express se vuelve inmanejable, SQLite no escala, el frontend necesita componentización |
| **3+** | + Docker + CI/CD + Observabilidad | Infraestructura profesional |

**Filosofía:** NO construyas todo de entrada. Cada etapa del plan te da los conocimientos para agregar la siguiente feature. El proyecto CRECE con tu aprendizaje. El stack también — empezás con lo mínimo y migrás cuando entendés POR QUÉ los frameworks resuelven problemas que el stack minimalista no.

---

## Definition of Done — El MVP de FreePress

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

### 🎁 BONUS (optativo, no requerido para marcar "done")

- Sistema de plugins/extensiones
- Comentarios en tiempo real
- Dashboard de analytics
- API pública documentada
- Sistema de notificaciones
- Media library avanzada

### 🚀 Cuándo arrancar

En la Semana 1 de la Etapa 1. El scaffold funcional (`npm start` levanta Express + SQLite) es un entregable de las semanas 1-2. Sin Docker, sin frameworks — código desde el minuto 1.

---

## Plan B — Si FreePress se traba

| Problema | Solución alternativa | Por qué funciona |
|----------|---------------------|------------------|
| **Express te frustra** | Fastify o Koa | El framework HTTP no importa, los conceptos sí |
| **SQLite te limita** | Seguí con SQLite hasta Etapa 2 — ahí migrás a PostgreSQL | El modelado relacional aplica igual |
| **La migración de stack te abruma** | No migrés todo de una vez — migrá un módulo a la vez | La migración incremental es como se hace en la vida real |
| **Angular te frustra (Etapa 2)** | React, Vue, o Svelte | El framework no importa para el 80% del plan |
| **NestJS te parece mucho (Etapa 2)** | Seguí con Express + TypeScript estricto | Los patrones importan más que la sintaxis |
| **El proyecto completo te abruma** | Mini-proyectos por tema | No es todo o nada |

> **FreePress es el vehículo, no el destino.** Si el vehículo se rompe, cambiá de vehículo. Lo importante es que estés aprendiendo.

---

## Migración de Stack — Etapa 1 → Etapa 2

La migración NO es overhead — es aprendizaje. El estudiante vive el dolor del stack minimalista y después migra a herramientas que resuelven esos problemas. ES la filosofía del plan aplicada consistentemente: primero el problema, después la herramienta.

### Qué se migra y por qué

| Componente | Etapa 1 | Etapa 2 | Por qué migrar |
|------------|---------|---------|----------------|
| **Frontend** | HTML + CSS plano | Angular | HTML plano no escala: repetís headers/footers en cada página, no hay componentización, el estado se pierde al navegar. Angular resuelve esto con componentes, routing SPA, y state management. |
| **Backend** | Express puro | NestJS | Express no tiene estructura: no hay módulos, no hay dependency injection, no hay decoradores. NestJS impone arquitectura (modules, controllers, providers) que escala. |
| **Base de datos** | SQLite (archivo local) | PostgreSQL | SQLite no soporta concurrent writes, no tiene tipos avanzados (JSONB, arrays), no tiene connection pooling real. PostgreSQL es lo que usás en producción. |
| **Caché** | Ninguna | Redis | Sin caché, cada request hittea la DB. Redis resuelve queries frecuentes con O(1). |

### Cómo migrar (orden sugerido)

1. **Primero: SQLite → PostgreSQL** (~3-4 horas) — La DB es la base de todo. Migrá el schema, las queries, y verificá que los tests pasan.
2. **Después: Express → NestJS** (~4-5 horas) — Migrá ruta por ruta. Express y NestJS pueden coexistir temporalmente (NestJS corre sobre Express).
3. **Último: HTML → Angular** (~3-5 horas) — El frontend es lo más visible pero lo menos crítico para la migración. Podés tener Angular servido por NestJS.

**Tiempo total estimado:** ~10-15 horas distribuidas en las primeras semanas de Etapa 2.

### ADRs de la migración

Cada migración genera un ADR que documenta POR QUÉ se migró:

- **ADR-004:** "Migrar de SQLite a PostgreSQL" — concurrent writes, tipos avanzados, producción real
- **ADR-005:** "Migrar de Express a NestJS" — estructura, DI, decoradores, escalabilidad
- **ADR-006:** "Migrar de HTML plano a Angular" — componentización, SPA, state management

Estos ADRs son REALES — no retroactivos. El estudiante toma la decisión, la documenta, y la implementa. Es la primera experiencia de arquitectura real del plan.

---

## Checkpoints de Validación por Etapa

Al terminar cada etapa, validá tu aprendizaje contra estas dos columnas.

### Etapa 1: Entrada

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **1.4 + 1.5** | Traceás la ejecución de una acción del usuario desde frontend hasta backend usando DevTools. Explicás el event loop con un diagrama propio. | FreePress corriendo localmente (Express + SQLite). Al menos 1 bug arreglado entendiendo JS Internals. |
| **1.8 + 1.9** | Escribís un test AAA para una función pura sin mirar ejemplos. Explicás por qué un LLM alucina y por qué el mismo prompt da respuestas distintas. | Tests de integración para el endpoint de health check. |
| **1.6** | Decís la complejidad Big O (temporal y espacial) de cualquier función del backend en <2 minutos, justificando. | Análisis de complejidad documentado donde importa. |
| **1.7** | Abrís el código de auth y señalás al menos 2 superficies de ataque potenciales. | Auth funcionando: registro, login, JWT, refresh tokens. Al menos 1 endpoint con RBAC. |
| **1.1 + 1.2** | Explicás la diferencia entre PRD, RFC y ADR en 2 minutos sin mirar apuntes. | `/docs` con ADRs retroactivos (Express vs NestJS, SQLite vs PostgreSQL), PRD del editor, README completo. |

### Etapa 2: Fundamentos

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **Migración de stack** | Explicás POR QUÉ Angular resuelve problemas que HTML plano no, POR QUÉ NestJS resuelve problemas que Express puro no, y POR QUÉ PostgreSQL resuelve problemas que SQLite no. | FreePress migrado: Angular + NestJS + PostgreSQL + Redis. Cada migración justificada con un ADR. |
| **2.1** | Corrés un benchmark con Artillery/k6 y explicás el reporte. | Suite de tests con cobertura de flujos críticos. `npm audit` sin críticos. |
| **2.2** | Abrís psql, ejecutás `EXPLAIN ANALYZE` sobre la query más pesada, identificás Seq Scans donde no deberían estar, y sabés qué índice agregar. | Schema con migraciones versionadas. Índices justificados. Caché Redis para queries frecuentes. |
| **2.3** | Explicás qué hace el compilador de TypeScript con un generic condicional que usaste. | TypeScript en modo estricto. Build pipeline configurado. |

### Etapa 3: Arquitectura

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **3.1 + 3.2** | Dibujás el Context Map de FreePress con Bounded Contexts y sus relaciones. Abrís cualquier módulo y decís si viola el Dependency Rule — y por qué. | Arquitectura en capas (domain/application/infrastructure). Al menos un Bounded Context documentado. Context Map en `/docs`. |
| **3.3** | Explicás el render pipeline del browser con OnPush. | Frontend con state management. |

### Etapa 4: Profundización

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **4.1 + 4.2 + 4.3** | Deployás FreePress a producción desde cero en <10 minutos. Respondés qué endpoint tiene latencia P99 más alta y por qué. | Docker Compose de producción. CI/CD con GitHub Actions. Deploy automatizado. Logs estructurados con correlación. |
| **4.4** | Explicás qué es RAG, por qué existe, y qué problema resuelve que un LLM sin contexto no puede. | `fp-ai-assistant` iniciado: endpoint que usa API de Claude para feature real. RAG básico contra contenido de FreePress. |
| **4.6** | Hacés code review con Conventional Comments. Explicás al menos una decisión de diseño que cambiarías hoy. | Docs de arquitectura actualizadas. ADRs actualizados. |

---

## Mini-Proyectos Satélite

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