# Proyectos de Práctica

Para demostrar un tema, elige **una** vía: ejercicio aislado, un proyecto real que ya uses o FreePress. No repitas las tres. Lo que cuenta es la evidencia exigida por [METODOLOGIA.md](METODOLOGIA.md#cierre-de-un-tema-crítico), no acumular tecnologías.

---

## FreePress — Laboratorio longitudinal opcional

FreePress es un CMS/blog para integrar aprendizajes durante varias etapas. Empieza con el stack más simple que puedas ejecutar y desplegar; Express + SQLite es una opción, no un requisito.

### Regla para introducir tecnología

Antes de agregar un framework, PostgreSQL, Redis, Kafka, Kubernetes u otra herramienta:

1. registra una métrica, limitación o requisito real;
2. define un baseline y qué mejora esperas;
3. prueba la opción en una rama de laboratorio si solo buscas aprenderla;
4. documenta la decisión en un ADR, incluido **“no usarlo todavía”** cuando no haya evidencia.

El resultado correcto puede ser no migrar. Una herramienta que no resuelve un problema no es progreso curricular.

## Evidencia por etapa

### Etapa 1 — Construir y verificar

- [ ] MVP mínimo desplegado temprano en un PaaS sencillo.
- [ ] Pipeline mínimo reproducible: `lint + typecheck + tests + build`.
- [ ] Healthcheck y logs básicos accesibles desde la primera versión.
- [ ] Un artefacto crítico enlazado con verificación independiente y caso negativo.
- [ ] README que permite ejecutar, verificar y recuperar el proyecto.

### Etapa 2 — Diagnosticar y decidir

- [ ] Diagnóstico reproducible de una degradación que combine SQL, concurrencia y SO/red.
- [ ] Al menos una decisión de stack respaldada por medición; un ADR de “no migrar” es válido.
- [ ] Si hubo migración, comparación antes/después y plan de rollback verificado.

### Etapa 3 — Evolucionar contratos

- [ ] Cambio de API compatible con clientes existentes, con evidencia de seguridad, datos y operación.
- [ ] Decisión arquitectónica que parta de una necesidad observada, no de una herramienta prevista.
- [ ] Feedback de 3–5 usuarios reales o de un stakeholder que cambie al menos un requisito.

### Etapa 4 — Operar y supervisar agentes

- [ ] Incidente reproducible con SLO o umbral, detección, causa raíz, recuperación y prevención.
- [ ] Cambio producido por un coding agent con contrato de tarea, diff revisado, checks ejecutados, caso adversarial, revisión de seguridad y rollback.
- [ ] Tecnología de especialización adoptada o rechazada mediante baseline, medición y ADR.

> FreePress reemplaza el ejercicio universal cuando produce la misma evidencia; nunca se suma como trabajo duplicado.

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
- Etapa 4: 4.13 Fundamentos de ML-AI, 4.8 AI Engineering, 4.9 Construir con AI

**Cuándo empezar:** Después de completar 4.13 (Fundamentos de ML-AI), al llegar a 4.8 (AI Engineering). El tema 1.6 da la alfabetización inicial; 4.13 aporta los fundamentos necesarios antes de diseñar un sistema con LLMs.
