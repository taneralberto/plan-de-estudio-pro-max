# Roadmap — Backend + Ingeniería con Coding Agents

Este roadmap reorganiza los 46 temas históricos en **19 unidades de ruta**. El objetivo no es completar todos los archivos, sino producir evidencia de criterio técnico en Backend y supervisión de coding agents.

## Estados

| Estado | Qué hacer |
|---|---|
| `ACTIVO` | Estudiar y producir el resultado mínimo. |
| `DIAGNÓSTICO` | Intentar primero el resultado mínimo. Si se demuestra y explica, cerrar sin repetir contenido; si falla, tratar como `ACTIVO`. |
| `JIT` | Consultar únicamente cuando trabajo o proyecto lo exija. No bloquea la ruta. |
| `★` | Unidad crítica: además del resultado mínimo, aplica el contrato y R1/R7/R30 de [METODOLOGIA.md](METODOLOGIA.md#cierre-de-una-unidad-crítica). |

Los IDs y nombres antiguos se mantienen como fuentes durante la transición. El estado, agrupación y orden definidos aquí prevalecen sobre la prioridad que todavía figure dentro de esos archivos.

## Primer resultado útil — 12 semanas

Objetivo: desplegar un backend pequeño y auditar de principio a fin un cambio realizado por un coding agent.

| Semanas | Trabajo principal |
|---|---|
| 1 | Unidad 7; diagnóstico de la unidad 1; iniciar la unidad 6. |
| 2 | Diagnósticos de las unidades 8 y 10; acotar el backend pequeño; continuar la unidad 6. |
| 3–4 | Unidad 9 aplicada al diseño del servicio; continuar la unidad 6. |
| 5 | Unidad 3: tests y oracles del contrato; continuar la unidad 6. |
| 6 | Unidad 14: API y límites de dominio; cerrar la unidad 6 antes de delegar. |
| 7–8 | Unidad 17: pipeline y despliegue en GCP. |
| 9 | Unidad 18: observabilidad, incidente y recuperación. |
| 10–12 | Unidad 19: delegación, auditoría, caso adversarial y rollback. |

Las semanas son una guía, no puertas rígidas. Si un diagnóstico falla, estudia solo el hueco necesario y conserva el mismo entregable.

## Las 19 unidades

### 1. Debugging y evidencia — `DIAGNÓSTICO ★`

- [ ] **Resultado mínimo:** reproducir un bug de backend, registrar hipótesis, aislar la causa y demostrar el arreglo con evidencia.
- Fuentes: [1.1 — Debugging Básico](Etapa%201%20—%20Entrada/1.1%20—%20Debugging%20Básico.md) · [4.6 — Debugging Avanzado](Etapa%204%20—%20Profundización/4.6%20—%20Debugging%20Avanzado.md)

### 2. Runtime de JavaScript, procesos y concurrencia — `ACTIVO`

- [ ] **Resultado mínimo:** diagnosticar un bloqueo, carrera o fuga y explicar el comportamiento observado.
- Fuentes: [1.2 — JavaScript Internals](Etapa%201%20—%20Entrada/1.2%20—%20JavaScript%20Internals.md) · [2.7 — Concurrency y Parallelism](Etapa%202%20—%20Fundamentos/2.7%20—%20Concurrency%20y%20Parallelism.md) · [2.11 — Sistemas Operativos](Etapa%202%20—%20Fundamentos/2.11%20—%20Sistemas%20Operativos%20(Profundizar).md) · [4.6 — Debugging Avanzado](Etapa%204%20—%20Profundización/4.6%20—%20Debugging%20Avanzado.md)

### 3. Testing y oracles externos — `ACTIVO ★`

- [ ] **Resultado mínimo:** crear un test que falsifique una solución plausible pero incorrecta, incluida una producida por AI.
- Fuentes: [1.3 — Testing Fundamentals](Etapa%201%20—%20Entrada/1.3%20—%20Testing%20Fundamentals.md) · [4.4 — Testing Backend y API](Etapa%204%20—%20Profundización/4.4%20—%20Testing%20Backend%20y%20API.md)

### 4. Seguridad y trust boundaries — `ACTIVO ★`

- [ ] **Resultado mínimo:** elaborar un threat model pequeño y demostrar un caso negativo de autenticación, autorización o exposición de datos.
- Fuente: [1.4 — Seguridad Aplicada](Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md)

### 5. Complejidad y estructuras cotidianas — `DIAGNÓSTICO`

- [ ] **Resultado mínimo:** justificar Big O y elegir Array, Map, Set o Queue según las operaciones de un caso real.
- Fuente: [1.5 — Estructuras de Datos y Algoritmos](Etapa%201%20—%20Entrada/1.5%20—%20Estructuras%20de%20Datos%20y%20Algoritmos.md)

### 6. AI literacy y fundamentos matemáticos de ML — `ACTIVO ★`

- [ ] **Resultado mínimo:** explicar una limitación de un modelo y medirla con un experimento o eval pequeña.
- Fuentes: [1.6 — AI Literacy](Etapa%201%20—%20Entrada/1.6%20—%20AI%20Literacy.md) · [4.13 — Fundamentos de ML/AI](Etapa%204%20—%20Profundización/4.13%20—%20Fundamentos%20de%20ML-AI%20que%20necesitas%20como%20Dev.md)

### 7. Requirements, ADR y explicación técnica — `ACTIVO ★`

- [ ] **Resultado mínimo:** escribir una spec verificable, registrar una decisión y explicarla en dos minutos incluyendo incertidumbre.
- Fuentes: [1.7 — Documentación Técnica Profesional](Etapa%201%20—%20Entrada/1.7%20—%20Documentación%20Técnica%20Profesional.md) · [1.8 — Metodologías y Procesos](Etapa%201%20—%20Entrada/1.8%20—%20Metodologías%20y%20Procesos.md) · [1.9 — Soft Skills Técnicos](Etapa%201%20—%20Entrada/1.9%20—%20Soft%20Skills%20Técnicos.md)

### 8. Git, shell y recuperación — `DIAGNÓSTICO`

- [ ] **Resultado mínimo:** recuperar trabajo perdido o aislar un cambio defectuoso y extraer evidencia desde terminal.
- Fuentes: [2.8 — Git Avanzado](Etapa%202%20—%20Fundamentos/2.8%20—%20Git%20Avanzado%20y%20Modelo%20de%20Objetos.md) · [2.9 — Linux y Shell](Etapa%202%20—%20Fundamentos/2.9%20—%20Linux%20y%20Shell%20Productivo.md)

### 9. Diseño modular y mantenibilidad — `ACTIVO ★`

- [ ] **Resultado mínimo:** refactorizar un cambio pequeño, justificar los límites y conservar comportamiento con tests de caracterización.
- Fuentes: [2.10 — Paradigmas](Etapa%202%20—%20Fundamentos/2.10%20—%20Paradigmas%20de%20Programación.md) · [3.2 — Patrones de Arquitectura](Etapa%203%20—%20Arquitectura/3.2%20—%20Patrones%20de%20Arquitectura%20Avanzados.md) · [4.10 — Mantenibilidad y Deuda](Etapa%204%20—%20Profundización/4.10%20—%20Mantenibilidad%20y%20Deuda%20Técnica.md)

### 10. SQL y modelado relacional — `DIAGNÓSTICO ★`

- [ ] **Resultado mínimo:** diseñar un modelo pequeño y justificar constraints, transacción, isolation e índice con evidencia.
- Fuente: [2.4 — SQL y Modelado Relacional](Etapa%202%20—%20Fundamentos/2.4%20—%20SQL%20y%20Modelado%20Relacional.md)

### 11. Migraciones seguras — `ACTIVO`

- [ ] **Resultado mínimo:** ejecutar un cambio expand-contract y demostrar rollback o roll-forward.
- Fuente: [2.6 — Data Migrations y Schema Evolution](Etapa%202%20—%20Fundamentos/2.6%20—%20Data%20Migrations%20y%20Schema%20Evolution.md)

### 12. Redes para backend — `ACTIVO ★`

- [ ] **Resultado mínimo:** reproducir y diagnosticar un fallo de DNS, TLS o HTTP con herramientas de terminal.
- Fuente: [2.12 — Redes en Profundidad](Etapa%202%20—%20Fundamentos/2.12%20—%20Redes%20en%20Profundidad.md)

### 13. Performance y elección de datos — `ACTIVO`

- [ ] **Resultado mínimo:** medir baseline y percentiles, localizar un cuello y justificar si optimizar, cachear o cambiar almacenamiento.
- Fuentes: [2.3 — Performance Engineering](Etapa%202%20—%20Fundamentos/2.3%20—%20Performance%20Engineering.md) · [2.5 — Bases No-Relacionales](Etapa%202%20—%20Fundamentos/2.5%20—%20Bases%20de%20Datos%20No-Relacionales.md)

### 14. API y límites de dominio — `ACTIVO ★`

- [ ] **Resultado mínimo:** producir un contrato compatible, casos negativos y límites de dominio justificados.
- Fuentes: [3.1 — API Design](Etapa%203%20—%20Arquitectura/3.1%20—%20API%20Design.md) · [3.3 — Domain-Driven Design](Etapa%203%20—%20Arquitectura/3.3%20—%20Domain-Driven%20Design%20(DDD).md)

### 15. Sistemas distribuidos y mensajería — `ACTIVO`

- [ ] **Resultado mínimo:** implementar un flujo idempotente con retry u outbox y documentar un fallo parcial.
- Fuentes: [3.9 — Messaging y Event Streaming](Etapa%203%20—%20Arquitectura/3.9%20—%20Messaging%20y%20Event%20Streaming.md) · [3.10 — Sistemas Distribuidos](Etapa%203%20—%20Arquitectura/3.10%20—%20Sistemas%20Distribuidos.md)

### 16. System Design y decisiones — `ACTIVO`

- [ ] **Resultado mínimo:** diseñar un sistema desde requisitos y capacidad, explicando trade-offs y lo que cambiaría la decisión.
- Fuente: [3.6 — System Design](Etapa%203%20—%20Arquitectura/3.6%20—%20System%20Design%20en%20Profundidad.md)

### 17. Entrega y GCP — `ACTIVO ★`

- [ ] **Resultado mínimo:** desplegar un servicio en GCP mediante un pipeline reproducible y demostrar una entrega o reversión.
- Fuentes: [4.1 — Containerización](Etapa%204%20—%20Profundización/4.1%20—%20Containerización%20Avanzada.md) · [4.2 — CI/CD](Etapa%204%20—%20Profundización/4.2%20—%20CI-CD%20(Integración%20y%20Entrega%20Continua).md) · [4.3 — Cloud Fundamentals](Etapa%204%20—%20Profundización/4.3%20—%20Cloud%20Fundamentals.md)

### 18. Observabilidad y SRE — `ACTIVO ★`

- [ ] **Resultado mínimo:** detectar, explicar y recuperar un incidente pequeño mediante telemetría y un runbook.
- Fuente: [4.5 — Observabilidad](Etapa%204%20—%20Profundización/4.5%20—%20Observabilidad%20(Los%203%20Pilares).md)

### 19. Ingeniería con coding agents — `ACTIVO ★`

- [ ] **Resultado mínimo:** delegar un cambio con contrato y aislamiento; revisar el diff, ejecutar checks, añadir un adversarial y demostrar rollback.
- Fuentes: [4.7 — Leer Código y Code Review](Etapa%204%20—%20Profundización/4.7%20—%20Leer%20Código%20Ajeno%20y%20Code%20Review.md) · [4.8 — AI Engineering](Etapa%204%20—%20Profundización/4.8%20—%20AI%20Engineering%20(la%20nueva%20disciplina).md) · code archaeology de [4.6 — Debugging Avanzado](Etapa%204%20—%20Profundización/4.6%20—%20Debugging%20Avanzado.md)

## Referencias JIT y especializaciones

Estos temas conservan valor, pero no cuentan para cerrar Backend + coding agents.

| Área | Temas históricos | Cuándo abrirla |
|---|---|---|
| Lenguaje | [2.1 — TypeScript Avanzado](Etapa%202%20—%20Fundamentos/2.1%20—%20TypeScript%20Avanzado.md) | Cuando el tipo o compilador bloquee un cambio real. |
| Web | [2.2 — Build Tools](Etapa%202%20—%20Fundamentos/2.2%20—%20Build%20Tools%20y%20Module%20Bundlers.md), [3.4 — Browser](Etapa%203%20—%20Arquitectura/3.4%20—%20Cómo%20funciona%20el%20Browser.md), [3.5 — State Management](Etapa%203%20—%20Arquitectura/3.5%20—%20State%20Management.md), [3.7 — Testing Frontend](Etapa%203%20—%20Arquitectura/3.7%20—%20Testing%20Frontend.md), [3.8 — Accesibilidad](Etapa%203%20—%20Arquitectura/3.8%20—%20Accesibilidad%20(a11y).md) | Cuando un producto o puesto exija profundidad frontend. |
| AI de producto | [4.9 — Construir con AI](Etapa%204%20—%20Profundización/4.9%20—%20Construir%20con%20AI%20—%20Proyectos%20reales.md) | Cuando un baseline justifique RAG, MCP o integración LLM. |
| Plataforma | [4.11 — Orquestación y GitOps](Etapa%204%20—%20Profundización/4.11%20—%20Orquestación%20de%20Containers.md), [4.12 — IaC](Etapa%204%20—%20Profundización/4.12%20—%20Infrastructure%20as%20Code%20(IaC).md) | Cuando un sistema real supere servicios gestionados o requiera infraestructura repetible. |
| Carrera | [4.14 — Open Source](Etapa%204%20—%20Profundización/4.14%20—%20Open%20Source.md) | Cuando aporte evidencia útil al cambio laboral. |
| Miscelánea | [4.15 — i18n, Regex y WASM](Etapa%204%20—%20Profundización/4.15%20—%20Temas%20que%20Pocos%20Dominan.md) | i18n para producto Web; regex o WASM ante una necesidad concreta. |

## Ruta completa después del primer hito

Tras las 12 semanas, completa los huecos en este orden sugerido:

1. Unidad 4 — Seguridad.
2. Unidad 2 — Runtime y concurrencia.
3. Unidad 11 — Migraciones.
4. Unidad 12 — Redes.
5. Unidad 13 — Performance y datos.
6. Unidad 15 — Distribuidos y mensajería.
7. Unidad 16 — System Design.
8. Diagnóstico de la unidad 5 y cualquier diagnóstico pendiente.

La ruta termina cuando las 19 unidades están cerradas o diagnosticadas, no cuando se consumen las referencias JIT.
