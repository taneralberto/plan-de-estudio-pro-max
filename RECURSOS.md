# Recursos de la Ruta

Usa recursos para resolver una duda surgida en la práctica, no como otra checklist. Por unidad hay como máximo:

1. **Fuente primaria:** documentación, especificación o texto de referencia.
2. **Práctica:** laboratorio o guía para producir evidencia.
3. **Profundización:** opcional y acotada a capítulos concretos.

Etiquetas: `ES/EN` · `gratis/pago` · `docs/curso/libro/video/lab`.

Enlaces externos verificados el **2026-07-25**.

> El estado y el resultado mínimo de cada unidad están en [ROADMAP.md](ROADMAP.md). Durante la migración, esta selección prevalece sobre listas largas que aún existan dentro de los temas.

## Biblioteca reutilizada

- **DDIA — [Designing Data-Intensive Applications](https://dataintensive.net/)** — Martin Kleppmann (`EN · pago · libro`). Consultar capítulos concretos; no leer completo como requisito.
- **APOSD — [A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/book.php)** — John Ousterhout (`EN · pago · libro`). Usar capítulos 2–6 para complejidad y modularidad.
- **GA — [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms-second-edition)** — Aditya Bhargava (`EN · pago · libro`). Usar capítulos 1, 3 y 6 solo si falla el diagnóstico de estructuras.

## Recursos por unidad

### 1 — Debugging y evidencia

- **Fuente primaria:** [Node.js Debugging](https://nodejs.org/en/learn/getting-started/debugging) (`EN · gratis · docs`).
- **Práctica:** reproducir un bug propio siguiendo las secciones de debugging y memory; no hace falta otra plataforma.

### 2 — Runtime, procesos y concurrencia

- **Fuente primaria:** [The Node.js Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) (`EN · gratis · docs`).
- **Práctica:** [Don't Block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) (`EN · gratis · guía`).

### 3 — Testing y oracles externos

- **Fuente primaria:** [Jest Documentation](https://jestjs.io/docs/getting-started) (`EN · gratis · docs`).
- **Práctica:** [Testcontainers for Node.js](https://node.testcontainers.org/) (`EN · gratis · docs/lab`).
- **Profundización:** [fast-check](https://fast-check.dev/) — property-based testing (`EN · gratis · docs`).

### 4 — Seguridad y trust boundaries

- **Fuente primaria:** [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) (`EN · gratis · estándar`).
- **Práctica:** [PortSwigger Web Security Academy](https://portswigger.net/web-security) (`EN · gratis · labs`). Elegir un laboratorio relacionado con el caso estudiado.
- **Profundización:** [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) (`EN · gratis · guía`). Consultar una sección, no la guía completa.

### 5 — Complejidad y estructuras cotidianas

- **Fuente primaria:** GA, capítulos 1, 3 y 6 (`EN · pago · libro`).
- **Práctica:** [VisuAlgo](https://visualgo.net/en) (`EN · gratis · visualización`). Comparar operaciones, no completar todo el catálogo.

### 6 — AI literacy y matemáticas de ML

- **Fuente primaria:** [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) (`EN · gratis · curso`). Elegir módulos de regresión, clasificación y embeddings.
- **Práctica:** [3Blue1Brown — Neural Networks](https://www.3blue1brown.com/topics/neural-networks) (`EN · gratis · video`). Tiene apoyo visual y permite practicar escucha con subtítulos.
- **Profundización:** [Mathematics for Machine Learning](https://mml-book.github.io/) (`EN · gratis · libro`). Consultar vectores, producto punto y probabilidad; cálculo completo queda fuera.

### 7 — Requirements, ADR y explicación

- **Fuente primaria:** [Architectural Decision Records](https://adr.github.io/) (`EN · gratis · referencia`).
- **Práctica:** [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/) (`EN · gratis · artículo`). Adaptar solo problema, alcance, alternativas y decisión.

### 8 — Git, shell y recuperación

- **Fuente primaria:** [Pro Git](https://git-scm.com/book/en/v2) — capítulos 7.1 y 10 (`EN · gratis · libro`).
- **Práctica:** [Learn Git Branching](https://learngitbranching.js.org/) (`ES/EN · gratis · lab`). Elegir niveles de rebase, reset y revert según el diagnóstico.
- **Profundización:** [Bash Reference Manual](https://www.gnu.org/software/bash/manual/) (`EN · gratis · docs`). Consultar quoting, exit status, pipelines y traps.

### 9 — Diseño modular y mantenibilidad

- **Fuente primaria:** APOSD, capítulos 2–6 (`EN · pago · libro`).
- **Práctica:** [Refactoring Catalog](https://refactoring.com/catalog/) (`EN · gratis · catálogo`). Elegir una transformación para un smell observado.
- **Profundización:** [Google Engineering Practices](https://google.github.io/eng-practices/) (`EN · gratis · guía`). Usar las secciones de small CLs y review.

### 10 — SQL y modelado relacional

- **Fuente primaria:** [PostgreSQL Documentation](https://www.postgresql.org/docs/current/index.html) — Data Definition, Indexes y Concurrency Control (`EN · gratis · docs`).
- **Práctica:** [PGExercises](https://pgexercises.com/) (`EN · gratis · labs`). Elegir ejercicios de joins, aggregates y ventanas según el diagnóstico.

### 11 — Migraciones seguras

- **Fuente primaria:** [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html) (`EN · gratis · docs`).
- **Práctica:** [GitLab — Avoiding Downtime in Migrations](https://docs.gitlab.com/development/database/avoiding_downtime_in_migrations/) (`EN · gratis · guía`). Reproducir un patrón expand-contract pequeño.
- **Profundización:** [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html) (`EN · gratis · artículo`).

### 12 — Redes para backend

- **Fuente primaria:** [Beej's Guide to Network Concepts](https://beej.us/guide/bgnet0/) (`EN · gratis · libro`). Consultar capas, TCP, DNS y TLS según el fallo.
- **Práctica:** [Everything curl](https://everything.curl.dev/) (`EN · gratis · libro/lab`). Usar resolución DNS, conexión, TLS, headers y timing.

### 13 — Performance y elección de datos

- **Fuente primaria:** [PostgreSQL — Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) (`EN · gratis · docs`).
- **Práctica:** [The USE Method](https://www.brendangregg.com/usemethod.html) (`EN · gratis · guía`). Aplicar utilización, saturación y errores a un cuello medido.
- **Profundización:** DDIA, capítulos 3 y 5 (`EN · pago · libro`).

### 14 — API y límites de dominio

- **Fuente primaria:** [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) (`EN · gratis · especificación`).
- **Práctica:** [Zalando RESTful API Guidelines](https://opensource.zalando.com/restful-api-guidelines/) (`EN · gratis · guía`). Contrastar una decisión del contrato, no copiar toda la guía.
- **Profundización:** [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/) (`EN · gratis · referencia`). Priorizar lenguaje ubicuo y bounded contexts.

### 15 — Sistemas distribuidos y mensajería

- **Fuente primaria:** DDIA, capítulos 8–12 (`EN · pago · libro`). Elegir el capítulo relacionado con el fallo estudiado.
- **Práctica:** [RabbitMQ Reliability Guide](https://www.rabbitmq.com/docs/reliability) (`EN · gratis · docs`). Aplicar conceptos aunque el laboratorio use PostgreSQL como cola.
- **Profundización:** [Jepsen Analyses](https://jepsen.io/analyses) (`EN · gratis · informes`). Leer un análisis del sistema relevante.

### 16 — System Design y decisiones

- **Fuente primaria:** DDIA, capítulo 1 y el capítulo del trade-off elegido (`EN · pago · libro`).
- **Práctica:** [System Design Primer](https://github.com/donnemartin/system-design-primer) (`EN · gratis · ejercicios`). Usar solo para estructurar requisitos, capacidad y trade-offs; no como prueba de operación real.

### 17 — Entrega y GCP

- **Fuente primaria:** [Cloud Run — Deploy a Node.js Service](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service) (`EN · gratis · docs; uso de GCP puede generar coste`).
- **Práctica:** [GitHub Actions Documentation](https://docs.github.com/en/actions) (`EN · gratis · docs/lab`). Construir un pipeline mínimo de checks, artifact y deploy.
- **Profundización:** [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework) (`EN · gratis · guía`). Consultar la sección ligada a una decisión real.

### 18 — Observabilidad y SRE

- **Fuente primaria:** [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) (`EN · gratis · libro`). Usar capítulos 4, 6 y 10 según SLO, monitoreo o automatización.
- **Práctica:** [OpenTelemetry Documentation](https://opentelemetry.io/docs/) (`EN · gratis · docs/lab`). Instrumentar un solo flujo antes de añadir plataformas.
- **Profundización:** [Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/) (`EN · gratis · capítulo`).

### 19 — Ingeniería con coding agents

- **Fuente primaria:** [SWE-bench](https://www.swebench.com/) (`EN · gratis · benchmark/papers`). Estudiar qué evidencia exige una tarea de código real.
- **Práctica:** el protocolo y gate de [METODOLOGIA.md](METODOLOGIA.md#cómo-usar-ai-y-coding-agents) aplicados a `agent-change-audit` (`ES · gratis · lab propio`).
- **Profundización:** [OWASP GenAI Security Project](https://genai.owasp.org/) (`EN · gratis · guía`). Consultar riesgos de permisos, datos y acciones del agente.

## Índice complementario en español

- **[100cosas.dev](https://100cosas.dev/)** (`ES · gratis · índice`) — úsalo para descubrir una explicación alternativa. No sustituye documentación primaria ni añade otra ruta obligatoria.

## Escucha técnica en inglés

La escucha es opcional y no cuenta como evidencia por sí sola. Usa subtítulos o transcript y limita la sesión al tema activo. Los videos de 3Blue1Brown cubren matemáticas/AI; para Backend, elige una charla corta del autor o proyecto citado en la unidad y contrasta sus afirmaciones con la fuente primaria.

## Regla de vigencia

Antes de usar un recurso:

1. confirma que corresponde al tema y versión actuales;
2. revisa si fue reemplazado por documentación nueva;
3. anota paywall o coste de infraestructura;
4. elimina enlaces rotos en vez de buscar un reemplazo por inercia.

Un recurso secundario nunca vence a un test, medición, especificación o comportamiento observado del sistema.
