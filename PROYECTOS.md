# Proyectos de Práctica

Cada tema del plan es autosuficiente: el "Done cuando" es tu criterio de dominio. Si quieres un proyecto continuo para validar el conocimiento, FreePress es el proyecto recomendado, pero es **opcional**.

---

## FreePress — Proyecto de Seguimiento (Opcional)

Una **plataforma CMS/Blog open source** estilo WordPress, construida desde cero. Lo suficientemente complejo para ejercitar el 80% del plan.

**Temas que se practican naturalmente aquí:**
- Etapa 1: 1.1 JS Internals, 1.2 Debugging, 1.3 Testing, 1.4 Seguridad, 1.5 ED&A, 1.7 Documentación
- Etapa 2: 2.1 TypeScript, 2.2 Build Tools, 2.4 SQL, 2.6 Migrations, 2.7 Concurrency
- Etapa 3: 3.1 DDD, 3.2 Patrones, 3.3 API Design, 3.5 State Management, 3.7 Testing Frontend
- Etapa 4: 4.1 Containers, 4.2 CI/CD, 4.3 Cloud, 4.4 Testing Backend, 4.5 Observabilidad, 4.6 Debugging Avanzado

**Stack progresivo sugerido:**

| Etapa                  | Stack                                                       | Por qué                                                                                                           |
| ---------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **1 — Entrada**        | HTML + CSS + Express + SQLite                               | Minimalista, se levanta sin Docker, el estudiante entiende cada pieza                                             |
| **2 — Fundamentos**    | Frontend Framework + Backend Framework + PostgreSQL + Redis | Migración justificada por necesidades reales: componentización, estructura que escala, concurrencia y performance |
| **4 — Profundización** | + Docker + CI/CD + Observabilidad                           | Infraestructura profesional                                                                                       |

El proyecto CRECE con tu aprendizaje. Empiezas con lo mínimo y migras cuando entiendes POR QUÉ.

---

## Milestones de FreePress por Etapa

### Etapa 1 — Entrada

- [ ] Express + SQLite corriendo (scaffold funcional)
- [ ] Auth con roles (admin, editor, autor, lector)
- [ ] CRUD de artículos funcionando
- [ ] Tests de integración para auth y CRUD
- [ ] README que permite levantar el proyecto sin preguntas
- [ ] ADRs retroactivos documentando las decisiones del stack

### Etapa 2 — Fundamentos

- [ ] Migración completa al frontend framework elegido
- [ ] Migración completa al backend framework elegido
- [ ] Migración a PostgreSQL completa (DB)
- [ ] Redis implementado para caché
- [ ] TypeScript en modo estricto
- [ ] Cada migración con su ADR justificando el cambio

### Etapa 3 — Arquitectura

- [ ] Arquitectura en capas implementada
- [ ] Context Map en `/docs`
- [ ] Frontend con state management
- [ ] API REST diseñada con convenciones claras

### Etapa 4 — Profundización

- [ ] Docker Compose para levantar todo con un comando
- [ ] CI/CD que corre tests en cada PR
- [ ] Desplegado en un cloud real
- [ ] Logs estructurados accesibles
- [ ] Al menos un endpoint monitoreado
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] `fp-ai-assistant` con RAG básico funcional

### 🎁 BONUS (optativo)

- Sistema de plugins/extensiones
- Comentarios en tiempo real
- Dashboard de analytics
- API pública documentada
- Sistema de notificaciones
- Media library avanzada

### 🚀 Cuándo empezar

Si decidiste seguir FreePress, empiézalo en paralelo con los primeros temas de la Etapa 1. El scaffold funcional (`npm start` levanta Express + SQLite) es un entregable natural de las primeras semanas.

---

## Migración de Stack — Etapa 1 → Etapa 2

| Componente        | Etapa 1                      | Etapa 2                    | Por qué migrar                                              |
| ----------------- | ---------------------------- | -------------------------- | ----------------------------------------------------------- |
| **Frontend**      | HTML + CSS plano o UI mínima | Frontend framework elegido | Componentización, routing SPA, state management             |
| **Backend**       | Backend mínimo               | Backend framework elegido  | Módulos, DI, middlewares/decoradores, estructura que escala |
| **Base de datos** | SQLite                       | PostgreSQL                 | Concurrent writes, JSONB, connection pooling                |
| **Caché**         | Ninguna                      | Redis                      | Queries frecuentes con O(1)                                 |

**Orden:** DB primero → Backend después → Frontend último. Cada migración genera un ADR. Tiempo estimado: ~10-15 horas.

**Nota sobre los ADRs de FreePress:** El stack inicial (Express + SQLite) está predefinido antes de que estudies el tema de ADRs. Los primeros ADRs que escribas son retroactivos: articulas y justificas decisiones ya tomadas. Eso está bien como ejercicio: aprendes a estructurar razonamiento arquitectónico. Cuando FreePress crezca y tengas que tomar decisiones nuevas (¿Redis Streams o RabbitMQ? ¿microservicios o monolito?), ahí escribirás ADRs reales antes de decidir.

> Si un componente del stack te frustra, cámbialo. FreePress es el vehículo, no el destino. Lo importante son los conceptos.

---

## Mini-Proyectos Satélite

Para temas que no encajan naturalmente en FreePress:

### `freepress-cli`
CLI tool para gestionar FreePress (crear posts, deployar, migrar datos).
**Practica:** Node.js internals, streams, file system, argument parsing.

**Temas que se practican naturalmente aquí:**
- Etapa 1: 1.5 ED&A (estructuras de datos para parsing de argumentos)
- Etapa 2: 2.8 Git Avanzado, 2.9 Linux y Shell Productivo

### `fp-ui`
Librería de componentes UI publicada en npm.
**Practica:** Open source, semantic versioning, CI/CD de paquetes, API design.

**Temas que se practican naturalmente aquí:**
- Etapa 2: 2.1 TypeScript (tipos genéricos para componentes), 2.2 Build Tools (packaging de librería)
- Etapa 3: 3.5 State Management, 3.7 Testing Frontend, 3.8 Accesibilidad

### `fp-ai-assistant`
Agente de AI / servidor MCP para FreePress.
**Practica:** API de Claude, MCP, RAG, embeddings, agentic patterns.

**Temas que se practican naturalmente aquí:**
- Etapa 1: 1.6 AI Literacy (conceptos base de LLMs)
- Etapa 4: 4.8 AI Engineering, 4.9 Construir con AI

**Cuándo empezar:** Al llegar al tema 4.8 (AI Engineering). Los conceptos de 1.6 (AI Literacy) dan la base conceptual, pero el proyecto empieza cuando estudias AI Engineering en profundidad y estás listo para diseñar un sistema que interactúe con LLMs de forma estructurada.
