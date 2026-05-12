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

El proyecto CRECE con tu aprendizaje. Empezás con lo mínimo y migrás cuando entendés POR QUÉ.

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

### 🎁 BONUS (optativo)

- Sistema de plugins/extensiones
- Comentarios en tiempo real
- Dashboard de analytics
- API pública documentada
- Sistema de notificaciones
- Media library avanzada

### 🚀 Cuándo arrancar

Semana 1 de la Etapa 1. El scaffold funcional (`npm start` levanta Express + SQLite) es un entregable de las semanas 1-2.

---

## Migración de Stack — Etapa 1 → Etapa 2

| Componente | Etapa 1 | Etapa 2 | Por qué migrar |
|------------|---------|---------|----------------|
| **Frontend** | HTML + CSS plano | Angular | Componentización, routing SPA, state management |
| **Backend** | Express puro | NestJS | Módulos, DI, decoradores, estructura que escala |
| **Base de datos** | SQLite | PostgreSQL | Concurrent writes, JSONB, connection pooling |
| **Caché** | Ninguna | Redis | Queries frecuentes con O(1) |

**Orden:** DB primero → Backend después → Frontend último. Cada migración genera un ADR. Tiempo estimado: ~10-15 horas.

> Si un componente del stack te frustra, cambialo. FreePress es el vehículo, no el destino. Lo que importa son los conceptos.

---

## Checkpoints de Validación por Etapa

### Etapa 1: Entrada

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **1.4 + 1.5** | Traceás la ejecución desde frontend hasta backend con DevTools. Explicás el event loop con un diagrama propio. | FreePress corriendo (Express + SQLite). Al menos 1 bug arreglado con JS Internals. |
| **1.8 + 1.9** | Escribís un test AAA sin mirar ejemplos. Explicás por qué un LLM alucina. | Tests de integración para health check. |
| **1.6** | Decís la complejidad Big O de cualquier función del backend en <2 minutos. | Análisis de complejidad documentado. |
| **1.7** | Señalás al menos 2 superficies de ataque en el código de auth. | Auth funcionando: registro, login, JWT, refresh tokens, RBAC. |
| **1.1 + 1.2** | Explicás la diferencia entre PRD, RFC y ADR en 2 minutos sin apuntes. | `/docs` con ADRs, PRD del editor, README completo. |

### Etapa 2: Fundamentos

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **Migración** | Explicás POR QUÉ cada componente nuevo resuelve problemas que el anterior no. | FreePress migrado. Cada migración con ADR. |
| **2.1** | Corrés un benchmark con Artillery/k6 y explicás el reporte. | Suite de tests con cobertura de flujos críticos. |
| **2.2** | Ejecutás `EXPLAIN ANALYZE`, identificás Seq Scans, y sabés qué índice agregar. | Schema con migraciones versionadas. Caché Redis. |
| **2.3** | Explicás qué hace el compilador de TS con un generic condicional que usaste. | TypeScript en modo estricto. |

### Etapa 3: Arquitectura

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **3.1 + 3.2** | Dibujás el Context Map con Bounded Contexts. Decís si un módulo viola el Dependency Rule. | Arquitectura en capas. Context Map en `/docs`. |
| **3.3** | Explicás el render pipeline del browser con OnPush. | Frontend con state management. |

### Etapa 4: Profundización

| Tema completado | Habilidad demostrable | Estado de FreePress |
|-----------------|----------------------|---------------------|
| **4.1 + 4.2 + 4.3** | Deployás FreePress a producción en <10 minutos. Respondés qué endpoint tiene latencia P99 más alta. | Docker Compose + CI/CD + Deploy automatizado + Logs con correlación. |
| **4.4** | Explicás qué es RAG, por qué existe, y qué problema resuelve. | `fp-ai-assistant` con RAG básico. |
| **4.6** | Hacés code review con Conventional Comments. | Docs y ADRs actualizados. |

---

## Mini-Proyectos Satélite

Para temas que no encajan naturalmente en FreePress:

### `freepress-cli`
CLI tool para gestionar FreePress (crear posts, deployar, migrar datos).
**Practica:** Node.js internals, streams, file system, argument parsing.

### `fp-ui`
Librería de componentes UI publicada en npm.
**Practica:** Open source, semantic versioning, CI/CD de paquetes, API design.

### `fp-ai-assistant`
Agente de AI / MCP server para FreePress.
**Practica:** API de Claude, MCP, RAG, embeddings, agentic patterns.