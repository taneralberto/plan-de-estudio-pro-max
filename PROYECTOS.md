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