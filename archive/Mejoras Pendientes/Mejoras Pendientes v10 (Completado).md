# Mejoras Pendientes v10

Derivado de las observaciones de la Mejora 9. Solo incluye items que **aún no fueron aplicados** — los ya resueltos en Mejora 9 no se repiten.

---

## 🔴 Prioridad alta — Solapamientos y problemas estructurales

### ~~1. Solapamiento GRAVE 2.7 ↔ 2.11 — Concurrencia duplicada~~ ✅ COMPLETADO

**Problema:** El subtema 1 de 2.7 ("Concurrencia vs Paralelismo") y el subtema 1 de 2.11 ("Procesos, Threads y Concurrencia") cubren **exactamente el mismo contenido**: proceso vs thread, event loop, Worker Threads.

**Acción aplicada:**
- 2.7 se mantuvo sin cambios — ya era 100% Node.js concurrency (event loop, Worker Threads, race conditions, primitivas de sincronización).
- 2.11 subtema 1 reescrito: de "Procesos, Threads y Concurrencia" a **"Procesos y el Modelo de Ejecución del SO"**. Now cubre process states, context switching, scheduling, kernel vs user threads — sin event loop, sin Worker Threads, sin Node.js.
- Sin cross-references. Cada concepto vive en un solo lugar.

**Archivos afectados:** `2.11 Sistemas Operativos (Profundizar).md`

---

### ~~2. Solapamiento 2.6 ↔ 2.3/2.4 — Índices repetidos~~ ✅ COMPLETADO

**Problema:** El subtema de "Índices" en 2.6 cubre EXPLAIN ANALYZE, índices compuestos, partial indexes — los mismos temas que 2.3 (Database Performance) y 2.4 (SQL avanzado).

**Acción aplicada (Opción B):**
- Subtema 1 combinado: "Migraciones sin downtime y Schema Evolution" — expand-contract pattern, safe vs unsafe changes, CREATE INDEX CONCURRENTLY como operación safe incluido naturalmente en el contexto de migraciones. Se eliminó la teoría general de índices (tipos B-Tree/Hash/GIN/GiST/BRIN, pg_stat_user_indexes, column order) que ya está cubierta en 2.3 y 2.4.
- Subtema 2 nuevo: "Herramientas de Migración, Seeds y Rollback" — comparación de TypeORM/Prisma/Flyway, seeds idempotentes, rollback vs forwarding, migraciones irreversibles.
- Sin cross-references. Cada concepto vive en un solo lugar.

**Archivos afectados:** `2.6 — Data Migrations y Schema Evolution.md`

---

### ~~3. Solapamiento 3.2 ↔ 3.3 — API Design redundante~~ ✅ COMPLETADO

**Problema:** 3.2 tenía un subtema completo sobre REST/GraphQL/gRPC (API Design) y 3.3 es un archivo dedicado al mismo tema. Redundancia significativa.

**Acción aplicada:**
- Eliminado el subtema 4 "API Design — REST, GraphQL, gRPC" de 3.2 enteramente. El contenido vive en 3.3.
- En 3.3: eliminada la nota que referenciaba a 3.2. Agregado gRPC al subtema 1 (ahora "Diseño del contrato de API — REST y gRPC") como paradigma de comunicación interna vs REST para APIs públicas. Ejercicio y Done cuando actualizados para incluir gRPC. Recurso de gRPC.io agregado.
- 3.2 queda con 4 subtemas: SOLID, EDA, CQRS, Microservicios.
- Sin cross-references. Cada concepto vive en un solo lugar.

**Archivos afectados:** `3.2 — Patrones de Arquitectura Avanzados.md`, `3.3 — API Design.md`

---

## 🟡 Prioridad media — Contenido faltante

### ~~4. 1.4 Auth — Subtema demasiado denso~~ ✅ COMPLETADO

**Problema:** OAuth 2.0 + PKCE + JWT + RBAC en un solo subtema. Es demasiada información para un subtema de Etapa 1.

**Acción aplicada:**
- Subtema original "Authentication y Authorization — OAuth 2.0, OpenID Connect, RBAC" dividido en dos:
  - **"Autenticación — OAuth 2.0, PKCE y OpenID Connect"**: foco en protocolos de autenticación (quién sos). OAuth 2.0 flows, PKCE, id_token vs access_token. Ejercicio: flujo OAuth 2.0 + PKCE desde cero con documentación de cada paso HTTP.
  - **"Autorización — JWT, Sesiones y RBAC"**: foco en autorización (qué podés hacer). JWT estructura y pitfalls, sesiones vs JWT, refresh token rotation, RBAC vs ABAC. Ejercicio: RBAC con Express + refresh token rotation + análisis sesiones vs JWT.
- Recursos separados: OAuth RFC + libro en autenticación, jwt.io + artículo anti-JWT-sessions en autorización.
- Sin cross-references. Cada concepto vive en un solo lugar.
- El archivo queda con 5 subtemas (era 4): OWASP → Autenticación → Autorización → Supply Chain → Secrets.

**Archivos afectados:** `1.4 — Seguridad Aplicada.md`

---

### ~~5. 2.5 No-Relacionales — Solo 2 subtemas~~ ✅ COMPLETADO

**Problema:** Para un tema tan amplio, 2 subtemas dejaban huecos importantes: MongoDB específicamente, CAP Theorem, Eventual vs Strong consistency.

**Acción aplicada:**
- Agregado subtema "CAP Theorem, Consistencia y Trade-offs Distribuidos": CAP Theorem (formulación práctica: durante partición, elegís C o A), PACELC, consistencia fuerte vs eventual con ejemplos concretos (Cassandra tunable, DynamoDB configurable, MongoDB read concerns). Ejercicio: clasificar DBs por comportamiento CAP y simular partición con resolución de conflictos.
- Agregado subtema "Document Stores — MongoDB como Contraste con SQL": embebido vs referencia, aggregation pipeline, change streams, PostgreSQL JSONB como alternativa concreta, cuándo MongoDB tiene sentido real vs la trampa de reimplementar SQL. Ejercicio: implementar el mismo caso (productos con campos variables) en MongoDB y en PostgreSQL JSONB, comparar.
- El archivo queda con 4 subtemas (era 2): Cuándo NO usar SQL → CAP Theorem → Document Stores/MongoDB → Redis.
- Sin solapamientos con 2.4 (SQL avanzado) — cada concepto vive en un solo lugar.

**Archivos afectados:** `2.5 — Bases de Datos No-Relacionales.md`

---

### ~~6. 2.6 Data Migrations — Solo 2 subtemas~~ ✅ COMPLETADO

**Problema:** Faltan subtemas obvios: herramientas de migración (TypeORM migrations vs Prisma migrate vs Flyway), versionado de datos semilla, estrategias de rollback.

**Acción aplicada:**
- El item #2 ya había reescrito el subtema 1 (expand-contract + safe migrations) y agregado un subtema 2 (Herramientas de Migración, Seeds y Rollback).
- Agregado subtema 3 "Estrategias de Rollback y Migraciones Irreversibles": rollback de código+schema en producción (rollback de código primero, contract después), migraciones irreversibles (DROP TABLE/COLUMN, transformaciones que pierden info), rollback de datos (dual-write, verificación antes de contract), checklist pre-migración en producción.
- Sin duplicar lo que el subtema 2 ya cubre (herramientas, seeds, basics de rollback). El subtema 3 profundiza en la estrategia de cuándo y cómo rollbackear.
- El archivo queda con 3 subtemas: Migraciones sin downtime → Herramientas → Estrategias de Rollback.

**Archivos afectados:** `2.6 — Data Migrations y Schema Evolution.md`

---

### ~~7. 2.12 Redes — Falta HTTP/2 y HTTP/3~~ ✅ COMPLETADO

**Problema:** HTTP se menciona como protocolo de Application layer pero sin profundidad en las diferencias entre versiones. HTTP/3 (QUIC) es relevante.

**Acción aplicada:**
- Agregado subtema 5 "HTTP/2 y HTTP/3 (QUIC) — La evolución del protocolo": binary framing layer, multiplexing sobre una sola conexión TCP, head-of-line blocking a nivel TCP (el problema que HTTP/2 no resuelve), QUIC sobre UDP con streams independientes, 0-RTT connection establishment, connection migration, qué cambia para un dev a nivel aplicación (nada) vs infraestructura (load balancers, CDNs).
- El archivo queda con 5 subtemas: TCP/IP → DNS → TLS/SSL → Latencia/Throughput → HTTP/2 y HTTP/3.

**Archivos afectados:** `2.12 — Redes en Profundidad.md`

---

### ~~8. 3.9 Messaging — Falta event schema design~~ ✅ COMPLETADO

**Problema:** Solo 2 subtemas (Message Queues y RabbitMQ vs Kafka). El próximo paso lógico después de elegir un broker es diseñar los eventos.

**Acción aplicada:**
- Agregado subtema 3 "Event Schema Design y Versionado": envelope fields (event_id, timestamp, event_type, version, correlation_id, producer_id), fat vs thin events, formatos de schema (JSON Schema vs Avro vs Protobuf con trade-offs), Schema Registry (Confluent) con modos de compatibilidad (BACKWARD/FORWARD/FULL), breaking vs non-breaking changes con expand-contract para eventos.
- Sin duplicar contenido de los subtemas existentes (communication patterns en subtema 1, broker comparison en subtema 2). El nuevo subtema cubre el diseño del evento en sí.
- El archivo queda con 3 subtemas: Message Queues → RabbitMQ vs Kafka → Event Schema Design.

**Archivos afectados:** `3.9 — Messaging y Event Streaming.md`

---

## 🟢 Prioridad baja — Consistencia y polish

### ~~9. 1.5 ED&A — Doble heading~~ ✅ COMPLETADO

**Problema:** Cada subtema tiene `## Título` y luego `- [ ] **Título**`. Es redundante en el renderizado.

**Acción aplicada:**
- Eliminados todos los `##` headings redundantes (6 subtemas + "Recursos generales" que se mantuvo como sección global).
- Convertidos los `### ... En producción` a subtítulos bold (`**... En producción**`) dentro del bloque del checkbox, eliminando los headings h3 también.
- El archivo ahora tiene un solo nivel de headings para subtemas: los `- [ ]` checkboxes. Las tablas "En producción" son subtítulos bold dentro de cada subtema.

**Archivos afectados:** `1.5 — Estructuras de Datos y Algoritmos.md`

---

### ~~10. 1.8 Subtema 5 (AI) — Outlier estructural~~ ✅ COMPLETADO

**Problema:** El subtema de AI era una referencia a METODOLOGIA.md sin contenido propio. Un lector archivo por archivo se quedaba sin contexto.

**Acción aplicada:**
- Reescrito como subtema completo con contenido propio: explicación de la regla (primero vos, después AI), progresión por etapa (tabla con 4 niveles: Validador → Reviewer → Pair Programmer → Teammate), roles válidos (revisor, desbloqueador, generador de edge cases), rol inválido, "Por qué importa", ejercicio ampliado, FreePress específico, "Done cuando" mejorado.
- Sin cross-references a METODOLOGIA.md. Todo el contenido vive en 1.8.

**Archivos afectados:** `1.8 — Metodologías y Procesos.md`

---

### ~~11. 1.8 Cross-referencia implícita con 1.7~~ ✅ COMPLETADO

**Problema:** El ejercicio de branching pide escribir un ADR pero no referencia explícitamente el tema 1.7 donde se explica el formato.

**Acción aplicada:** Agregada referencia explícita: "(ver tema 1.7 para el formato de ADRs)" en el ejercicio de branching.

**Archivos afectados:** `1.8 — Metodologías y Procesos.md`

---

### 12. Replicar tablas "En producción" en otras etapas

**Problema:** Las tablas "En producción" de 1.5 que mapean conceptos abstractos a situaciones reales son EXCELENTES. Solo existen en 1.5.

**Acción:** Ver Mejoras Pendientes v11 — guideline generalizada para aplicar tablas "En producción" a todos los temas donde aporte valor.

**Archivos afectados:** Múltiples archivos de Etapas 2 y 3

---

### ~~13. 3.7 — `component.articles` sin code formatting~~ ✅ COMPLETADO

**Problema:** En el "Done cuando" de Testing Frontend, se usa `component.articles = []` sin formato de código inline.

**Acción aplicada:** Verificado — ya tenía backticks. No se necesitó cambio.

**Archivos afectados:** `3.7 — Testing Frontend.md`

---

### ~~14. 3.10 — "It's consensus applied" en inglés~~ ✅ COMPLETADO

**Problema:** En el "Por qué importa" de Consensus, esta frase estaba en inglés dentro de un texto en español.

**Acción aplicada:** Verificado — la frase ya dice "es consenso aplicado" en español. Fue corregida en una mejora previa.

**Archivos afectados:** `3.10 — Sistemas Distribuidos.md`

---

## 📊 Resumen

| Prioridad | Cantidad | Items |
|-----------|----------|-------|
| 🔴 Alta | 3 | #1 (2.7↔2.11), #2 (2.6↔2.3/2.4), #3 (3.2↔3.3) |
| 🟡 Media | 5 | #4, #5, #6, #7, #8 |
| 🟢 Baja | 6 | #9, #10, #11, #12, #13, #14 |
| **Total** | **14** | |

---

## 🔄 Orden sugerido de aplicación

1. **#1** — Solapamiento 2.7 ↔ 2.11 (contenido duplicado confunde al estudiante)
2. **#3** — Solapamiento 3.2 ↔ 3.3 (API Design redundante)
3. **#2** — Solapamiento 2.6 ↔ 2.3/2.4 (índices repetidos)
4. **#4** — Dividir 1.4 Auth en dos subtemas
5. **#6** — Expandir 2.6 con herramientas de migración (se beneficia de resolver #2 primero)
6. **#5** — Expandir 2.5 con CAP/MongoDB
7. **#7** — Agregar HTTP/2 y HTTP/3 a 2.12
8. **#8** — Agregar event schema design a 3.9
9. **#9-#14** — Consistencia y polish (orden indistinto)