# Roadmap — Contenido por Etapa

| Símbolo | Significado |
|---------|-------------|
| 🔴 | **Núcleo crítico** — bloqueante dentro del núcleo o de la ruta elegida |
| 🟡 | **Importante** — estudiar según proyecto o especialización; no bloquea |
| 🟢 | **Complementario** — aprender cuando una necesidad real lo justifique |

Los identificadores conservan la numeración original, pero el orden de la lista es el orden recomendado de ejecución. En temas 🔴, el cierre exige evidencia y los repasos `R1` (+1 día), `R7` (+7 días) y `R30` (+30 días) definidos en [METODOLOGIA.md](METODOLOGIA.md#cierre-de-un-tema-crítico).

## Elige una ruta, no todo el atlas

Completa el núcleo y elige especializaciones según tu trabajo. Para el objetivo de este plan se recomienda **núcleo + AI/Agentes + una de Web o Backend**; Plataforma queda para cuando el contexto la exija.

| Ruta | Temas |
|------|-------|
| **Núcleo común** | 1.1–1.9; 2.1, 2.3, 2.4, 2.6–2.12; 3.1–3.3, 3.6, base de 3.9–3.10; 4.2, 4.4–4.7, 4.10, 4.13 |
| **Web/Frontend** | 2.2; 3.4, 3.5, 3.7, 3.8; i18n de 4.15 |
| **Backend/Distribuidos** | 2.5; profundización de 2.7, 3.9 y 3.10 |
| **Plataforma** | 4.1, 4.3, 4.12, 4.11, en ese orden |
| **AI/Agentes** | 4.8, 4.9 |
| **Opcional/JIT** | V8 y dual packages de 1.2; algoritmos avanzados de 1.5; GraphQL/gRPC de 3.1; CQRS/Event Sourcing/microservicios de 3.2; Kafka/Schema Registry de 3.9; 4.14; regex y WASM de 4.15 |

No estudies una ruta no elegida para “completar” el roadmap. Los temas compartidos cubren una base común; profundiza solo en la ruta correspondiente.

---

## Etapa 1 — Entrada 🧠

Victorias tangibles tempranas. Código que falla y se arregla. **Código desde el minuto 1** — la documentación viene al cierre. En 1.2, Event Loop y fundamentos del lenguaje son comunes; V8 y dual packages son JIT.

- [ ] 🔴 [1.1 — Debugging Básico](Etapa%201%20—%20Entrada/1.1%20—%20Debugging%20Básico.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [1.2 — JavaScript Internals](Etapa%201%20—%20Entrada/1.2%20—%20JavaScript%20Internals.md)
- [ ] 🔴 [1.3 — Testing Fundamentals](Etapa%201%20—%20Entrada/1.3%20—%20Testing%20Fundamentals.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🔴 [1.6 — AI Literacy](Etapa%201%20—%20Entrada/1.6%20—%20AI%20Literacy.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🔴 [1.7 — Documentación Técnica Profesional](Etapa%201%20—%20Entrada/1.7%20—%20Documentación%20Técnica%20Profesional.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🔴 [1.4 — Seguridad Aplicada](Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [1.5 — Estructuras de Datos y Algoritmos](Etapa%201%20—%20Entrada/1.5%20—%20Estructuras%20de%20Datos%20y%20Algoritmos.md)
- [ ] 🟡 [1.8 — Metodologías y Procesos](Etapa%201%20—%20Entrada/1.8%20—%20Metodologías%20y%20Procesos.md)
- [ ] 🟡 [1.9 — Soft Skills Técnicos](Etapa%201%20—%20Entrada/1.9%20—%20Soft%20Skills%20Técnicos.md)

- [ ] **Checkpoint acumulativo — Etapa 1:** reproducir, arreglar y documentar un bug desconocido con un test de regresión, combinando al menos tres temas sin que se anuncien cuáles.

---

## Etapa 2 — Fundamentos 🏗️

Convertir código que funciona en criterio técnico sólido: tipos, performance, datos, concurrencia, Git, Linux y redes. `2.2` pertenece a Web/Frontend y `2.5` a Backend/Distribuidos; puedes saltarlos si no elegiste esas rutas.

- [ ] 🔴 [2.9 — Linux y Shell Productivo](Etapa%202%20—%20Fundamentos/2.9%20—%20Linux%20y%20Shell%20Productivo.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🔴 [2.8 — Git Avanzado y Modelo de Objetos](Etapa%202%20—%20Fundamentos/2.8%20—%20Git%20Avanzado%20y%20Modelo%20de%20Objetos.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [2.1 — TypeScript Avanzado](Etapa%202%20—%20Fundamentos/2.1%20—%20TypeScript%20Avanzado.md)
- [ ] 🟡 [2.10 — Paradigmas de Programación](Etapa%202%20—%20Fundamentos/2.10%20—%20Paradigmas%20de%20Programación.md)
- [ ] 🟡 [2.2 — Build Tools y Module Bundlers](Etapa%202%20—%20Fundamentos/2.2%20—%20Build%20Tools%20y%20Module%20Bundlers.md)
- [ ] 🔴 [2.4 — SQL y Modelado Relacional](Etapa%202%20—%20Fundamentos/2.4%20—%20SQL%20y%20Modelado%20Relacional.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [2.6 — Data Migrations y Schema Evolution](Etapa%202%20—%20Fundamentos/2.6%20—%20Data%20Migrations%20y%20Schema%20Evolution.md)
- [ ] 🟡 [2.11 — Sistemas Operativos](Etapa%202%20—%20Fundamentos/2.11%20—%20Sistemas%20Operativos%20(Profundizar).md)
- [ ] 🔴 [2.12 — Redes en Profundidad](Etapa%202%20—%20Fundamentos/2.12%20—%20Redes%20en%20Profundidad.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [2.7 — Concurrency y Parallelism](Etapa%202%20—%20Fundamentos/2.7%20—%20Concurrency%20y%20Parallelism.md)
- [ ] 🟡 [2.3 — Performance Engineering](Etapa%202%20—%20Fundamentos/2.3%20—%20Performance%20Engineering.md)
- [ ] 🟡 [2.5 — Bases de Datos No-Relacionales](Etapa%202%20—%20Fundamentos/2.5%20—%20Bases%20de%20Datos%20No-Relacionales.md)

- [ ] **Checkpoint acumulativo — Etapa 2:** diagnosticar una degradación que mezcle SQL, concurrencia y SO/red sin que se anuncien los conceptos relevantes.

---

## Etapa 3 — Arquitectura 🏛️

Patrones y decisiones que definen sistemas que escalan y sobreviven. La profundidad distribuida de `3.9` y `3.10` pertenece a Backend; `3.4`, `3.5`, `3.7` y `3.8` forman un carril Web independiente.

### Núcleo y base distribuida

- [ ] 🔴 [3.1 — API Design](Etapa%203%20—%20Arquitectura/3.1%20—%20API%20Design.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [3.3 — Domain-Driven Design](Etapa%203%20—%20Arquitectura/3.3%20—%20Domain-Driven%20Design%20(DDD).md)
- [ ] 🟡 [3.2 — Patrones de Arquitectura Avanzados](Etapa%203%20—%20Arquitectura/3.2%20—%20Patrones%20de%20Arquitectura%20Avanzados.md)
- [ ] 🟡 [3.10 — Sistemas Distribuidos](Etapa%203%20—%20Arquitectura/3.10%20—%20Sistemas%20Distribuidos.md)
- [ ] 🟡 [3.9 — Messaging y Event Streaming](Etapa%203%20—%20Arquitectura/3.9%20—%20Messaging%20y%20Event%20Streaming.md)
- [ ] 🟡 [3.6 — System Design en Profundidad](Etapa%203%20—%20Arquitectura/3.6%20—%20System%20Design%20en%20Profundidad.md)

### Ruta Web/Frontend

- [ ] 🟡 [3.4 — Cómo funciona el Browser](Etapa%203%20—%20Arquitectura/3.4%20—%20Cómo%20funciona%20el%20Browser.md)
- [ ] 🟡 [3.5 — State Management](Etapa%203%20—%20Arquitectura/3.5%20—%20State%20Management.md)
- [ ] 🟡 [3.7 — Testing Frontend](Etapa%203%20—%20Arquitectura/3.7%20—%20Testing%20Frontend.md)
- [ ] 🟡 [3.8 — Accesibilidad (a11y)](Etapa%203%20—%20Arquitectura/3.8%20—%20Accesibilidad%20(a11y).md)

- [ ] **Checkpoint acumulativo — Etapa 3:** evolucionar un contrato sin romper clientes y justificar seguridad, datos y operación.

---

## Etapa 4 — Profundización 🚀

Profundización común y rutas independientes. Estudia solo las rutas elegidas.

### Núcleo común

- [ ] 🟡 [4.4 — Testing Backend y API](Etapa%204%20—%20Profundización/4.4%20—%20Testing%20Backend%20y%20API.md)
- [ ] 🟡 [4.2 — CI/CD](Etapa%204%20—%20Profundización/4.2%20—%20CI-CD%20(Integración%20y%20Entrega%20Continua).md)
- [ ] 🔴 [4.5 — Observabilidad](Etapa%204%20—%20Profundización/4.5%20—%20Observabilidad%20(Los%203%20Pilares).md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [4.6 — Debugging Avanzado](Etapa%204%20—%20Profundización/4.6%20—%20Debugging%20Avanzado.md)
- [ ] 🔴 [4.7 — Code Review](Etapa%204%20—%20Profundización/4.7%20—%20Leer%20Código%20Ajeno%20y%20Code%20Review.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [4.10 — Mantenibilidad y Deuda Técnica](Etapa%204%20—%20Profundización/4.10%20—%20Mantenibilidad%20y%20Deuda%20Técnica.md)
- [ ] 🔴 [4.13 — Fundamentos de ML-AI](Etapa%204%20—%20Profundización/4.13%20—%20Fundamentos%20de%20ML-AI%20que%20necesitas%20como%20Dev.md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30

### Ruta Plataforma

- [ ] 🟡 [4.1 — Containerización Avanzada](Etapa%204%20—%20Profundización/4.1%20—%20Containerización%20Avanzada.md)
- [ ] 🟡 [4.3 — Cloud Fundamentals](Etapa%204%20—%20Profundización/4.3%20—%20Cloud%20Fundamentals.md)
- [ ] 🟡 [4.12 — Infrastructure as Code](Etapa%204%20—%20Profundización/4.12%20—%20Infrastructure%20as%20Code%20(IaC).md)
- [ ] 🟢 [4.11 — Orquestación de Containers y GitOps](Etapa%204%20—%20Profundización/4.11%20—%20Orquestación%20de%20Containers.md)

### Ruta AI/Agentes

- [ ] 🔴 [4.8 — AI Engineering](Etapa%204%20—%20Profundización/4.8%20—%20AI%20Engineering%20(la%20nueva%20disciplina).md)
  - [ ] R1
  - [ ] R7 — resolver una variante
  - [ ] R30
- [ ] 🟡 [4.9 — Construir con AI — Proyectos reales](Etapa%204%20—%20Profundización/4.9%20—%20Construir%20con%20AI%20—%20Proyectos%20reales.md)

### Opcional/JIT

- [ ] 🟢 [4.14 — Open Source](Etapa%204%20—%20Profundización/4.14%20—%20Open%20Source.md)
- [ ] 🟢 [4.15 — i18n, Regex y WASM](Etapa%204%20—%20Profundización/4.15%20—%20Temas%20que%20Pocos%20Dominan.md) — i18n pertenece a Web; Regex y WASM se estudian cuando una necesidad los justifique.

- [ ] **Checkpoint acumulativo — Etapa 4:** responder a un incidente causado por un cambio producido por un coding agent, con evidencia de detección, rollback y prevención.
