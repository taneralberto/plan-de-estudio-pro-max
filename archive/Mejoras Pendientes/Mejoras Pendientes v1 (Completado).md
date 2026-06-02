# Mejoras Pendientes — Plan de Estudio Pro Max

Este archivo es el registro de mejoras identificadas en una revisión completa del plan. Se trabaja en orden de pasadas. Cada ítem tiene contexto suficiente para ejecutarlo sin necesidad de recordar la conversación original.

**Cómo usar este archivo:**
- Las pasadas se hacen EN ORDEN: primero Pasada 1, luego Pasada 2, luego Pasada 3.
- Dentro de cada pasada, el orden de fases es libre — podés empezar por cualquiera.
- Cuando terminés una fase completa de la Pasada 1, marcá la fila de la tabla con ✅.
- Cuando terminés un ítem de checkbox, marcalo con `- [x]`.
- La Pasada 3 se hace JUNTO con la Pasada 1 — no es una ronda separada, es parte del mismo template.

---

## Pasada 1 — Uniformar densidad con template mínimo

### El problema que resuelve

Los archivos del plan tienen densidad MUY inconsistente. Por ejemplo:
- `0.1 — Documentación Técnica` tiene 53 líneas, 3 ejercicios explícitos, recursos en todos los temas.
- `3.1 — DDD` tiene 26 líneas, 1 ejercicio, sin recursos en dos de sus tres temas.
- Ambos son 🔴 (críticos). Esa inconsistencia es un problema: no sabés cuánto tiempo dedicarle a cada tema, y algunos temas críticos quedan subdesarrollados.

### Qué es el template mínimo

Cada tema dentro de cada archivo debe tener EXACTAMENTE estos campos. Si alguno falta, hay que agregarlo:

```
- [ ] **Nombre del tema**

[1-2 oraciones: QUÉ es el tema + cuál es el problema concreto que resuelve]

**Por qué importa:** [El problema REAL y cotidiano que resuelve este conocimiento.
No "es importante para tu carrera" — eso es vacío. Algo concreto como:
"Sin esto, cuando tu app se cae a las 3am no sabés por dónde empezar a buscar"
o "El 90% de los breaches explotó vulnerabilidades conocidas, no zero-days".]

**Ejercicio:** [Una acción concreta y verificable. Debe estar conectada a FreePress
siempre que sea posible. NO vale "investigá sobre X" — eso no es un ejercicio.
Vale "implementá X en FreePress y medí Y antes/después".]

**Done cuando:** [Criterio OBSERVABLE — algo que podés verificar sin que nadie
te lo diga. No "cuando lo entiendas" — eso es subjetivo. Ejemplos buenos:
"Podés dibujar en una pizarra el flujo completo de OAuth 2.0 y explicar por qué
falla si se omite el PKCE"
"Tenés Dependabot corriendo en FreePress con al menos una PR resuelta"
"Podés tomar un dominio nuevo y mapear sus bounded contexts en 30 minutos"]

**Recursos:**
- [Nombre del recurso](URL) — descripción de una línea de por qué este recurso
  específico y no otro. Qué lo hace valioso.
```

### Qué hacer con lo que ya existe

- Si un tema YA tiene alguno de estos campos bien escrito → conservalo, no lo reescribas.
- Si le falta algún campo → agregalo siguiendo el criterio de calidad de arriba.
- Si un campo existe pero está vacío o es genérico → mejoralo.
- NO cambies la estructura de temas ni el contenido técnico — solo uniformás la forma.

### Referencia de cómo quedó bien hecho

Los tres archivos de **Fase 5** ya están aplicados correctamente. Antes de tocar cualquier otra fase, leé esos tres archivos para calibrar el nivel de detalle esperado:
- `Fase 5 — Seguridad y Performance/5.1 — Seguridad Aplicada 🔴.md`
- `Fase 5 — Seguridad y Performance/5.2 — Performance Engineering 🔴.md`
- `Fase 5 — Seguridad y Performance/5.3 — Testing Backend y API 🔴.md`

### Estado por fase

| Estado | Fase | Archivos que contiene |
| --- | --- | --- |
| ✅ Completada | Fase 5 — Seguridad y Performance | 5.1, 5.2, 5.3 |
| ✅ Completada | Fase 0 — Mentalidad y Proceso | 0.1, 0.2, 0.3 |
| ✅ Completada | Fase 1 — CS Fundamentals | 1.1, 1.2, 1.3, 1.4 |
| ✅ Completada | Fase 2 — Lenguaje y Runtime | 2.1, 2.2, 2.3 |
| ✅ Completada | Fase 3 — Arquitectura y Diseño de Sistemas | 3.1, 3.2, 3.3 |
| ✅ Completada | Fase 4 — Infraestructura, DevOps y Cloud | 4.1, 4.2, 4.3, 4.4, 4.5, 4.6 |
| ✅ Completada | Fase 6 — Frontend Avanzado | 6.1, 6.2, 6.3, 6.4 |
| ✅ Completada | Fase 7 — Bases de Datos en Profundidad | 7.1, 7.2, 7.3 |
| ✅ Completada | Fase 8 — AI y Agentes | 8.1, 8.2, 8.3 |
| ✅ Completada | Fase 9 — El Programador Completo | 9.1, 9.2, 9.3, 9.4 |

---

## Pasada 2 — Reubicar temas y agregar ausencias

Esta pasada se hace DESPUÉS de terminar la Pasada 1 en todas las fases. No antes, porque mover temas antes de uniformar genera inconsistencias.

### 2A — Reubicaciones

#### Git avanzado → sacar de Fase 0

**Dónde está hoy:** `Fase 0 — Mentalidad y Proceso / 0.2 — Metodologías y Procesos 🔴.md`

**Por qué es un problema:** La Fase 0 se llama "Mentalidad y Proceso". Sus temas son: Agile, Code Review, Estimación, Trunk-Based Development — todos conceptos de cómo trabaja un equipo. Git avanzado (rebase, bisect, reflog, el modelo de objetos blob/tree/commit) es una HERRAMIENTA, no una mentalidad. Meterlo ahí rompe la coherencia de la fase.

**Qué hacer:** Mover el tema completo de Git avanzado a `Fase 2 — Lenguaje y Runtime`, como un nuevo archivo `2.4 — Git Avanzado y Modelo de Objetos 🟡.md`. La Fase 2 ya tiene JavaScript Internals, TypeScript y Build Tools — Git encaja naturalmente ahí como "herramientas del lenguaje y entorno".

**Qué queda en 0.2:** Agile, Code Review, Estimación, Trunk-Based Development. Esos sí son mentalidad y proceso.

- [x] Mover Git avanzado de `0.2` a nuevo archivo `Fase 2/2.4 — Git Avanzado 🟡.md`

---

#### Testing → desfragmentar

**Dónde está hoy:**
- `Fase 5 — Seguridad y Performance / 5.3 — Testing Backend y API 🔴.md`
- `Fase 6 — Frontend Avanzado / 6.4 — Testing Frontend 🟡.md`

**Por qué es un problema:** Testing es un PILAR de ingeniería de software, no un apéndice de seguridad ni de frontend. Tenerlo partido en dos fases distintas da el mensaje equivocado: que testing es algo que se hace "al final" o "como parte de otra cosa". Para un senior, testing es una disciplina de diseño que atraviesa todo el sistema.

**Qué hacer (dos opciones — elegir una):**

**Opción A (recomendada):** Crear una nueva `Fase 5.5 — Testing` (o renumerar) con tres archivos:
- `Testing — Marco Conceptual` (Pirámide, Trophy, filosofía — ya está en 5.3)
- `Testing Backend` (contenido actual de 5.3 sin el marco conceptual)
- `Testing Frontend` (contenido actual de 6.4)

**Opción B (más simple):** Dejar los archivos donde están pero agregar en la portada del plan (`Plan de Estudio Pro Max.md`) una sección "Temas Transversales" que diga explícitamente: "Testing es una disciplina unificada — estudiá 5.3 y 6.4 juntos, no como partes aisladas."

- [x] Decidir entre Opción A y Opción B para Testing y ejecutar — Elegida Opción B: sección "Temas Transversales" agregada en portada del plan.

---

### 2B — Ausencias notables

Temas que NO están en el plan y que un ingeniero senior completo debería conocer. Para cada uno se indica dónde debería vivir y por qué no es opcional.

---

- [x] **API Design** → agregar en Fase 3

  **Qué es:** El arte de diseñar APIs que sean coherentes, predecibles y que no rompan a los consumidores cuando evolucionan. REST vs GraphQL vs gRPC (cuándo usar cada uno), versionado de APIs, paginación (cursor vs offset), idempotencia, rate limiting, y por qué una API mal diseñada es deuda técnica permanente.

  **Por qué no está y debería estar:** FreePress tiene una "API pública documentada" como feature. Sin saber diseñar APIs, esa feature va a quedar mal. Además, en cualquier empresa senior te van a preguntar cómo diseñarías una API — no solo cómo implementarla.

  **Dónde agregar:** Nuevo archivo `Fase 3/3.4 — API Design 🔴.md`. La Fase 3 es de Arquitectura y Diseño — API Design encaja perfectamente.

---

- [x] **Message Queues y Event Streaming** → agregar en Fase 3 o Fase 4

  **Qué es:** Cómo los sistemas se comunican de forma asíncrona y desacoplada. RabbitMQ (message broker clásico), Kafka (event streaming para alto volumen), SQS/SNS (AWS). Conceptos: producers, consumers, dead letter queues, at-least-once vs exactly-once delivery, consumer groups.

  **Por qué no está y debería estar:** FreePress tiene "sistema de notificaciones" y "comentarios en tiempo real" como features. Ambas son candidatas naturales a queues. Sin este conocimiento, vas a implementar esas features con polling o con acoplamiento directo — dos antipatrones. Además, cualquier sistema a escala usa alguna forma de messaging.

  **Dónde agregar:** Nuevo archivo `Fase 3/3.5 — Messaging y Event Streaming 🟡.md` o `Fase 4/4.7`. La decisión depende de si se lo trata como arquitectura (Fase 3) o como infraestructura (Fase 4). Recomendación: Fase 3, porque el concepto es arquitectónico — la implementación (Kafka en Docker) es infraestructura.

---

- [x] **Sistemas Distribuidos** → agregar en Fase 3

  **Qué es:** Los fundamentos teóricos que gobiernan cualquier sistema que corre en más de una máquina. CAP theorem (no podés tener Consistency, Availability y Partition tolerance al mismo tiempo — elegís dos). Eventual consistency vs strong consistency. Consensus algorithms (Raft, Paxos — entender el concepto, no implementarlos). Distributed transactions y por qué son difíciles (2PC, Saga pattern).

  **Por qué no está y debería estar:** Cuando usás PostgreSQL con réplicas, Redis Cluster, o cualquier microservicio, estás en territorio distribuido. Sin entender CAP, vas a tomar decisiones de arquitectura basadas en intuición en lugar de principios. Es el conocimiento que separa a alguien que "usa herramientas distribuidas" de alguien que "entiende sistemas distribuidos".

  **Dónde agregar:** Expandir `Fase 3/3.3 — System Design en Profundidad 🔴.md` con una sección de fundamentos distribuidos, o crear `Fase 3/3.6 — Sistemas Distribuidos 🔴.md` separado.

---

- [x] **Microservicios vs Monolito** → agregar en Fase 3 — Ya cubierto en `3.2 — Patrones de Arquitectura Avanzados` (tema "Microservicios — Patrones y Anti-patrones"). No se duplicó.

  **Qué es:** El debate más importante de arquitectura de la última década. No "microservicios son mejores" ni "monolito es mejor" — sino cuándo cada uno tiene sentido, cuáles son los costos reales de microservicios (distributed tracing, network failures, eventual consistency, testing de integración), y cómo migrar un monolito a microservicios cuando llega ese momento (strangler fig pattern, anti-corruption layer).

  **Por qué no está y debería estar:** FreePress arranca como monolito (Angular + NestJS). En algún momento del plan se menciona que podría escalar. Sin entender los trade-offs reales, no podés tomar esa decisión. Y en entrevistas senior te van a preguntar exactamente esto.

  **Dónde agregar:** Nuevo archivo `Fase 3/3.7 — Microservicios vs Monolito 🟡.md` o incorporarlo en `3.2 — Patrones de Arquitectura Avanzados`.

---

- [x] **Concurrency y Parallelism** → agregar en Fase 2

  **Qué es:** La diferencia entre concurrencia (manejar múltiples cosas a la vez) y paralelismo (ejecutar múltiples cosas simultáneamente). En Node.js: Worker Threads, child_process, el cluster module. Conceptos universales: race conditions, deadlocks, mutex, semaphores. Por qué el event loop de Node.js hace concurrencia sin paralelismo real, y cuándo eso es un problema.

  **Por qué no está y debería estar:** El plan tiene `2.1 — JavaScript Internals` que cubre el event loop. Pero el event loop solo explica el modelo de Node.js — no explica qué hacer cuando tenés CPU-bound work que bloquea el loop, ni cómo usar Worker Threads para paralelismo real. Es la extensión natural de lo que ya está.

  **Dónde agregar:** Expandir `Fase 2/2.1 — JavaScript Internals 🔴.md` con una sección de concurrencia, o crear `Fase 2/2.4 — Concurrency y Parallelism 🟡.md`.

---

- [x] **Linux y Shell productivo** → agregar en Fase 1 o como transversal

  **Qué es:** No es "aprender bash de memoria". Es entender el modelo de Unix: todo es un archivo, pipes, stdin/stdout/stderr, procesos y señales (SIGTERM, SIGKILL, por qué importa la diferencia), cron jobs, permisos (chmod, chown), y bash scripting básico para automatizar tareas repetitivas.

  **Por qué no está y debería estar:** El plan tiene toda una Fase 4 de DevOps e infraestructura. Vas a trabajar en servidores Linux, escribir Dockerfiles, configurar CI/CD. Sin entender el modelo Unix, vas a copiar comandos de Stack Overflow sin entender qué hacen. Es la base de la base de DevOps.

  **Dónde agregar:** Nuevo archivo `Fase 1/1.5 — Linux y Shell 🟡.md`. La Fase 1 es CS Fundamentals — el modelo Unix es un fundamental que se enseña en cualquier carrera de CS.

---

- [x] **Caching (evaluar profundidad)** → ya cubierto parcialmente en 5.2

  **Qué es:** Ya está como subtema en `5.2 — Performance Engineering`. La pregunta es si merece más profundidad en `Fase 7 — Bases de Datos`, específicamente el caching a nivel de base de datos (materialized views como forma de cache, query result cache de PostgreSQL, Redis como cache de segunda capa frente a Postgres).

  **Acción:** Revisado en Pasada 1 de Fase 7. Resultado: cubierto suficientemente sin duplicar.
  - `5.2` cubre Redis como application cache con ejercicio de implementación en FreePress.
  - `7.1` menciona materialized views dentro del tema de SQL avanzado como pre-cálculo de queries costosas.
  - `7.2` cubre Redis en profundidad (estructuras de datos, casos de uso más allá del cache).
  - No se agregó contenido nuevo — no hay duplicación, no hay hueco real. ✅

---

## Pasada 3 — Criterios de done

**Nota:** Esta pasada NO es una ronda separada. Se ejecuta JUNTO con la Pasada 1. El campo "Done cuando:" es parte del template mínimo. Cuando aplicás el template a una fase, ya estás completando la Pasada 3 para esa fase.

La única excepción son temas que la Pasada 2 agregue como nuevos — esos necesitan "Done cuando:" desde el principio.

| Estado | Fase |
| --- | --- |
| ✅ Completada (junto con Pasada 1) | Fase 5 — Seguridad y Performance |
| ✅ Completada (junto con Pasada 1) | Fase 0 — Mentalidad y Proceso |
| ✅ Completada (junto con Pasada 1) | Fase 1 — CS Fundamentals |
| ✅ Completada (junto con Pasada 1) | Fase 2 — Lenguaje y Runtime |
| ✅ Completada (junto con Pasada 1) | Fase 3 — Arquitectura y Diseño de Sistemas |
| ✅ Completada (junto con Pasada 1) | Fase 4 — Infraestructura, DevOps y Cloud |
| ✅ Completada (junto con Pasada 1) | Fase 6 — Frontend Avanzado |
| ✅ Completada (junto con Pasada 1) | Fase 7 — Bases de Datos en Profundidad |
| ✅ Completada (junto con Pasada 1) | Fase 8 — AI y Agentes |
| ✅ Completada (junto con Pasada 1) | Fase 9 — El Programador Completo |
| ✅ Completada (Pasada 2 — archivos nuevos) | 1.5, 2.4, 2.5, 3.4, 3.5, 3.6 — creados con Done cuando desde el principio |

---

## Otros ajustes — Portada del plan

Estos cambios van en el archivo raíz `Plan de Estudio Pro Max.md`, no en los archivos de fase.

- [x] **Agregar realismo temporal explícito**

  **Qué agregar:** Un callout en la portada, después de "Cómo usar este plan", con este contenido:

  > ⏱️ **Realidad temporal:** Este plan, hecho bien, son **12 a 24 meses** estudiando 2-3 horas diarias enfocadas. No es un sprint de 3 meses. Si lo apurás, no aprendés — acumulás la ilusión de haber aprendido. Un tema bien entendido en 2 semanas vale infinitamente más que 10 temas leídos por encima en 2 semanas.

  **Por qué:** El plan tiene ~40 temas × 1-2 semanas × 2-3h/día = 1 a 2 años reales. Sin esa expectativa explícita, hay riesgo de frustrarse a los 3 meses pensando que "debería ir más rápido".

---

- [x] **Agregar nota de honestidad sobre el stack pre-fijado** — Aplicado en sesión anterior directamente en `0.1 — Documentación Técnica Profesional`.

  **Qué agregar:** Una nota en `Fase 0/0.1 — Documentación Técnica Profesional 🔴.md`, en la sección de ADR, aclarando:

  > **Nota sobre los ADRs de FreePress:** El stack de FreePress (Angular + NestJS + PostgreSQL + Redis) está pre-decidido antes de que estudies este tema. Eso significa que los ADRs que vas a escribir son *retroactivos* — estás articulando y justificando decisiones que ya fueron tomadas, no tomándolas en tiempo real. Eso está bien y es valioso como ejercicio: aprendés a estructurar el pensamiento arquitectónico y a documentar razonamientos. Pero sé consciente de que en un proyecto real, un ADR se escribe ANTES de decidir, no después. Cuando FreePress crezca y tengas que tomar nuevas decisiones (¿agregamos Redis Streams o RabbitMQ? ¿migramos a microservicios?), ahí vas a escribir ADRs reales.

  **Por qué:** El plan tiene como filosofía "conceptos antes que herramientas" y "entender el porqué". Que el stack esté pre-fijado antes de aprender a decidir crea una tensión filosófica. Nombrarla explícitamente es más honesto y más educativo que ignorarla.

---

- [x] **Agregar estrategia de mini-wins para Fase 1**

  **Qué agregar:** Una nota en la portada del plan, en la tabla de secuencia sugerida, o como callout dentro de `Fase 1 — CS Fundamentals`:

  > ⚠️ **Advertencia sobre Fase 1:** Es la fase más densa y abstracta del plan, y está al principio. Es también donde más gente abandona planes de estudio — no porque sea imposible, sino porque los resultados no son inmediatos. Estrategia recomendada: después de completar `1.1 — Estructuras de Datos y Algoritmos`, hacé un desvío a `Fase 2 — Lenguaje y Runtime` (que es más práctica y conectada a tu trabajo diario), y volvé a `1.2` y `1.3`. Esto te da victorias más rápidas sin saltarte los fundamentos.

  **Por qué:** Fase 1 cubre algoritmos, sistemas operativos y redes — temas abstractos donde el aprendizaje se siente lento. Intercalar con Fase 2 (JavaScript Internals, TypeScript) que es más práctica y conectada al trabajo real reduce el riesgo de abandono sin comprometer la calidad del aprendizaje.
