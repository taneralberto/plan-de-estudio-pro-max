# Plan de Estudio Pro Max

<aside>
🎯

**Filosofía de este plan:** Los conceptos PRIMERO, las herramientas DESPUÉS. No se toca código hasta entender el PORQUÉ. Cada fase construye sobre la anterior — no saltes fases. La AI amplifica lo que ya sabés; si no sabés nada, amplifica la nada.

</aside>

<aside>
📋

**Cómo usar este plan:**

- Cada fase tiene **temas**, **recursos** y **ejercicios prácticos**
- Los temas marcados con 🔴 son **críticos** — no avanzar sin dominarlos
- Los marcados con 🟡 son **importantes** — estudiarlos bien pero no bloquean
- Los marcados con 🟢 son **complementarios** — profundizar cuando haya tiempo
- Los marcados con 🔵 son **proyectos satélite** — práctica complementaria vinculada al proyecto principal
- El checkbox \[ \] es para trackear tu progreso
- **Regla de oro:** no marques un tema como completado hasta que puedas EXPLICARLO a otro programador sin mirar apuntes
</aside>

---

# Proyectos de Práctica — Tu Laboratorio

<aside>
🛠️

**Todo concepto del plan se practica construyendo algo real.** No ejercicios sueltos que se olvidan al día siguiente — proyectos con propósito que crecen con vos a medida que avanzás en el plan.

</aside>

## Proyecto Principal — FreePress 🟢

Una **plataforma CMS/Blog open source** estilo WordPress, construida desde cero. Este proyecto es lo suficientemente complejo como para ejercitar el 80% del plan: arquitectura, API design, auth, base de datos, frontend avanzado, testing, Docker, CI/CD, observabilidad, seguridad, performance.

**Stack:** Angular (frontend) + NestJS (backend) + PostgreSQL + Redis + Docker

**Features que vas a construir a medida que avanzas en las fases:**

- Sistema de usuarios con roles (admin, editor, autor, lector) → Auth, RBAC, JWT
- Editor de contenido WYSIWYG/Markdown → Frontend avanzado, state management
- Sistema de plugins/extensiones → Design patterns, arquitectura, API design
- Media library (upload y gestión de imágenes) → File storage, streams, CDN
- Comentarios en tiempo real → WebSockets, event-driven
- Búsqueda full-text y por tags → PostgreSQL avanzado, índices, caching
- Dashboard de analytics → Queries complejas, materialized views, gráficos
- API pública documentada → REST/GraphQL, versionado, rate limiting
- Sistema de notificaciones → Event bus, queues, emails
- Deploy completo → Docker Compose, CI/CD, observabilidad, cloud

**Filosofía:** NO construyas todo de entrada. Cada fase del plan te da los conocimientos para agregar la siguiente feature. El proyecto CRECE con tu aprendizaje.

**🚀 Cuándo arrancar:** Al terminar la Fase 0 y empezar la Fase 1, creá el repo, el scaffold básico (Angular + NestJS + Docker Compose) y tu primer ADR. No necesitás saber todo para empezar — pero sí necesitás la mentalidad de ingeniero de la Fase 0. A partir de ahí, cada fase te da herramientas para agregar features.

## Mini-Proyectos Satélite 🔵

Para temas que no encajan naturalmente en FreePress:

- **`freepress-cli`** — Una CLI tool para gestionar FreePress desde la terminal (crear posts, deployar, migrar datos). Para practicar: Node.js internals, streams, file system, argument parsing, IPC.
- **`fp-ui`** — Una librería de componentes UI publicada en npm. Para practicar: open source, semantic versioning, CI/CD de paquetes, API design de librerías, Storybook.
- **`fp-ai-assistant`** — Un agente de AI / MCP server para FreePress. Para practicar: API de Claude, MCP, RAG, embeddings, agentic patterns. Acá SÍ podrías usar Python si querés explorar ese ecosistema.

---

# Cómo Afrontar Cada Tema — El Ciclo de Aprendizaje

<aside>
🔄

**No necesitás leer cada libro de tapa a tapa.** Los libros del plan son recursos de REFERENCIA, no lectura obligatoria lineal. Leés el capítulo que necesitás, cuando lo necesitás. La estrategia real para cada tema es el ciclo de 4 pasos que se describe abajo.

</aside>

## Paso 1 — Video o artículo de overview (1-2 horas)

Antes de meterte en un tema de cabeza, buscá un **video de 20-40 minutos** que te dé el mapa mental general. No necesitás entender todo — necesitás saber DE QUÉ SE TRATA, cuál es el problema que resuelve, y por qué importa. Esto te da el marco para que todo lo que estudies después tenga CONTEXTO.

**Dónde buscar:**

- **YouTube:** Fireship (overviews en 100 seconds y en profundidad), ByteByteGo (system design visual), ThePrimeagen (opiniones técnicas con profundidad), Traversy Media (tutoriales prácticos), 3Blue1Brown (conceptos matemáticos visualizados)
- **Blogs:** Martin Fowler (arquitectura), [web.dev](http://web.dev) (frontend/performance), el blog de cada tecnología que estés estudiando
- **Newsletters:** ByteByteGo, TLDR, JavaScript Weekly — te mantienen actualizado sin esfuerzo

## Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**Esta es la parte más importante del ciclo.** Si miraste un video sobre el Event Loop, abrí la consola y escribí 10 ejemplos con Promises y setTimeout AHORA. Si leíste sobre B-Trees, abrí PostgreSQL y hacé `EXPLAIN ANALYZE` AHORA. No mañana, no el fin de semana — **AHORA**.

¿Por qué la urgencia? Porque la curva del olvido es brutal: si no practicás lo que aprendiste en las próximas 24 horas, perdés el 70% de la información. Cada tema del plan tiene un ejercicio práctico diseñado para esto — usalos.

**La regla:** no escribas notas bonitas, no hagas resúmenes, no organices carpetas de estudio. **Escribí código.** La comprensión viene de la práctica, no de la lectura.

## Paso 3 — Lectura profunda SI algo no quedó claro (variable)

Recién ACÁ entran los libros. Y no de tapa a tapa — leés el **capítulo específico** que necesitás para aclarar lo que la práctica te mostró que no entendés. Por ejemplo:

- Estás estudiando bases de datos y no te queda claro cómo funcionan los isolation levels → leés el capítulo 7 de *Designing Data-Intensive Applications*
- Estás practicando TypeScript generics y no entendés conditional types → leés las secciones específicas de *Effective TypeScript*
- Hiciste un ejercicio de system design y no sabés cómo estimar capacidad → leés el capítulo correspondiente de *System Design Interview*

**Alternativas a libros cuando el tema no requiere tanta profundidad:**

- **Documentación oficial** — siempre la fuente más actualizada
- **Cursos estructurados** — para temas densos como algoritmos o seguridad, un buen curso con ejercicios vale ORO. Frontend Masters y Pluralsight son superiores a la mayoría de Udemy. MIT OCW y Stanford Online son gratis y de clase mundial
- **Udemy** — tiene cosas buenas y cosas horribles. Si vas por ahí, buscá instructores específicos con buenas reviews, no cursos genéricos de "aprende todo en 50 horas"

## Paso 4 — Aplicar en FreePress o un mini-proyecto (el cierre del ciclo)

El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real que te importa. **FreePress** es tu proyecto principal donde vas a aplicar la mayoría de los conceptos. Para temas que no encajan naturalmente ahí, tenés los mini-proyectos satélite (`freepress-cli`, `fp-ui`, `fp-ai-assistant`). Cada tema del plan tiene ejercicios conectados a estos proyectos — no son decoración, son la diferencia entre "entendí el concepto" y "sé usarlo en producción".

Este paso también funciona como validación: si no podés aplicar lo que aprendiste en un proyecto real, es señal de que necesitás volver al paso 2 o 3.

---

<aside>
⏱️

**Ritmo realista:** Con este ciclo, cada tema del plan te debería llevar entre **1 y 2 semanas** estudiando unas horas por día (no 8 horas — 2-3 horas enfocadas valen más que 8 distraído). Los temas marcados con 🔴 pueden llevar un poco más. Los 🟢 se pueden hacer en menos.

</aside>

<aside>
🗓️

**Realidad temporal:** Este plan, hecho bien, son **12 a 24 meses** estudiando 2-3 horas diarias enfocadas. No es un sprint de 3 meses. Si lo apurás, no aprendés — acumulás la ilusión de haber aprendido. Un tema bien entendido en 2 semanas vale infinitamente más que 10 temas leídos por encima en 2 semanas.

</aside>

<aside>
💡

**Consejo clave:** No intentes aprender en orden perfecto. Si estás trabajando en algo de FreePress y te cruzás con un concepto del plan (ej: estás escribiendo una query y no entendés qué hace `EXPLAIN ANALYZE`), saltá a ese tema, hacé el ciclo, y volvé. El plan es un MAPA, no una cadena. Usalo como referencia viva, no como una lista rígida.

</aside>

<aside>
🏁

**Checkpoints por fase:** Al terminar cada fase, validá tu aprendizaje con un mini-entregable concreto. No alcanza con "lo leí y lo entendí" — necesitás DEMOSTRAR que lo internalizaste. Puede ser: explicarle el tema a alguien (o grabar un video de 5 minutos), escribir un artículo/blogpost corto, o implementar algo en FreePress que USE ese conocimiento. Si no podés producir un entregable, no terminaste la fase.

</aside>

---

# Fase 0 — Mentalidad y Proceso de Ingeniería de Software

<aside>
🧠

**Por qué esta fase PRIMERO:** Con 8 años de experiencia empírica, tu problema NO es que no sepas programar — es que te falta el **framework mental** de cómo se trabaja profesionalmente en la industria. PRD, RFC, ADR... estos no son buzzwords, son las herramientas que separan a un programador de un **ingeniero de software**. Esta fase es la base de TODO lo demás.

</aside>

[[Fase 0 — Mentalidad y Proceso/0.1 — Documentación Técnica Profesional 🔴]]

[[Fase 0 — Mentalidad y Proceso/0.2 — Metodologías y Procesos 🔴]]

[[Fase 0 — Mentalidad y Proceso/0.3 — Soft Skills Técnicos 🟡]]

---

# Fase 1 — Ciencias de la Computación que te Salteaste

<aside>
⚠️

**Realidad incómoda:** 8 años programando sin estos fundamentos es como construir edificios sin saber física. Funcionan... hasta que no. Esta fase es la que más duele pero la que más retorno da. No la saltes.

</aside>

[[Fase 1 — CS Fundamentals/1.1 — Estructuras de Datos y Algoritmos 🔴]]

[[Fase 1 — CS Fundamentals/1.2 — Sistemas Operativos (Profundizar) 🔴]]

[[Fase 1 — CS Fundamentals/1.3 — Redes en Profundidad 🔴]]

[[Fase 1 — CS Fundamentals/1.4 — Paradigmas de Programación 🟡]]

[[Fase 1 — CS Fundamentals/1.5 — Linux y Shell Productivo 🟡]]

---

# Fase 2 — Dominio Profundo del Lenguaje y Runtime

<aside>
🔥

**Premisa:** Usás JavaScript/TypeScript todos los días. ¿Pero REALMENTE sabés cómo funciona? Esta fase te lleva de "usuario del lenguaje" a "entender la máquina por debajo". Cuando algo falla, sabés DÓNDE buscar.

</aside>

[[Fase 2 — Lenguaje y Runtime/2.1 — JavaScript Internals 🔴]]

[[Fase 2 — Lenguaje y Runtime/2.2 — TypeScript Avanzado 🔴]]

[[Fase 2 — Lenguaje y Runtime/2.3 — Build Tools y Module Bundlers 🟡]]

[[Fase 2 — Lenguaje y Runtime/2.4 — Git Avanzado y Modelo de Objetos 🟡]]

[[Fase 2 — Lenguaje y Runtime/2.5 — Concurrency y Parallelism 🟡]]

---

# Fase 3 — Arquitectura y Diseño de Sistemas (Nivel Senior)

<aside>
🏗️

**Ya tenés Clean Architecture y SOLID en tu roadmap.** Ahora vamos a lo que viene DESPUÉS: los patrones y decisiones que definen sistemas que escalan y sobreviven años en producción.

</aside>

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.1 — Domain-Driven Design (DDD) 🔴]]

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.2 — Patrones de Arquitectura Avanzados 🔴]]

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.3 — System Design en Profundidad 🔴]]

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.4 — API Design 🔴]]

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.5 — Messaging y Event Streaming 🟡]]

[[Fase 3 — Arquitectura y Diseño de Sistemas/3.6 — Sistemas Distribuidos 🔴]]

---

# Fase 4 — Infraestructura, DevOps y Cloud

<aside>
☁️

**La realidad:** No importa cuán perfecto sea tu código si no sabés desplegarlo, monitorearlo, y mantenerlo corriendo. Esta fase te lleva de "sé usar Docker Compose" a "puedo diseñar la infraestructura de un sistema en producción".

</aside>

[[Fase 4 — Infraestructura, DevOps y Cloud/4.1 — Containerización Avanzada 🔴]]

[[Fase 4 — Infraestructura, DevOps y Cloud/4.2 — Orquestación de Containers 🟡]]

[[Fase 4 — Infraestructura, DevOps y Cloud/4.3 — Infrastructure as Code (IaC) 🟡]]

[[Fase 4 — Infraestructura, DevOps y Cloud/4.4 — Cloud Fundamentals 🔴]]

[[Fase 4 — Infraestructura, DevOps y Cloud/4.5 — CI-CD (Integración y Entrega Continua) 🔴]]

[[Fase 4 — Infraestructura, DevOps y Cloud/4.6 — Observabilidad (Los 3 Pilares) 🔴]]

---

# Fase 5 — Seguridad y Performance

<aside>
🔒

**Dos áreas que la mayoría de devs ignoran hasta que algo explota.** Seguridad y performance no son "nice to have" — son requisitos fundamentales de cualquier sistema profesional.

</aside>

[[Fase 5 — Seguridad y Performance/5.1 — Seguridad Aplicada 🔴]]

[[Fase 5 — Seguridad y Performance/5.2 — Performance Engineering 🔴]]

[[Fase 5 — Seguridad y Performance/5.3 — Testing Backend y API 🔴]]

---

# Fase 6 — Frontend Avanzado

<aside>
🎨

**No es solo "hacer que se vea bonito".** El frontend moderno es ingeniería seria: state management, rendering pipelines, accesibilidad, internacionalización. Acá se separa el que maqueta del que construye aplicaciones.

</aside>

[[Fase 6 — Frontend Avanzado/6.1 — Cómo funciona el Browser 🔴]]

[[Fase 6 — Frontend Avanzado/6.2 — State Management 🔴]]

[[Fase 6 — Frontend Avanzado/6.3 — Accesibilidad (a11y) 🟡]]

[[Fase 6 — Frontend Avanzado/6.4 — Testing Frontend 🟡]]

---

# Fase 7 — Bases de Datos en Profundidad

<aside>
🗄️

**Ya tenés PostgreSQL y B-Trees en tu plan de fundamentos.** Ahora vamos más allá: modelado avanzado, diferentes paradigmas de bases de datos, y cuándo usar cada una.

</aside>

[[Fase 7 — Bases de Datos en Profundidad/7.1 — SQL y Modelado Relacional 🔴]]

[[Fase 7 — Bases de Datos en Profundidad/7.2 — Bases de Datos No-Relacionales 🟡]]

[[Fase 7 — Bases de Datos en Profundidad/7.3 — Data Migrations y Schema Evolution 🔴]]

---

# Fase 8 — AI y Agentes (Tu Roadmap, Expandido)

<aside>
🤖

**Ya tenés un roadmap sólido de AI.** Acá vamos a complementar lo que falta y agregar lo que cambió en los últimos meses (esta área se mueve MUY rápido).

**⚠️ Fecha de revisión:** Esta fase se desactualiza más rápido que cualquier otra. Revisala cada 3-6 meses. Fuentes para mantenerte al día: blog de Anthropic, blog de OpenAI, newsletters como TLDR AI y The Batch de Andrew Ng.

</aside>

[[Fase 8 — AI y Agentes/8.1 — Fundamentos de ML-AI que necesitás como Dev 🟡]]

[[Fase 8 — AI y Agentes/8.2 — AI Engineering (la nueva disciplina) 🔴]]

[[Fase 8 — AI y Agentes/8.3 — Construir con AI — Proyectos reales 🔴]]

---

# Fase 9 — El Programador Completo

<aside>
🌟

**Los temas que hacen la diferencia entre un buen programador y un ingeniero de software COMPLETO.** Estas son las áreas que rara vez se enseñan pero que definen la calidad profesional.

</aside>

[[Fase 9 — El Programador Completo/9.1 — Open Source 🟡]]

[[Fase 9 — El Programador Completo/9.2 — Debugging Avanzado 🔴]]

[[Fase 9 — El Programador Completo/9.3 — Mantenibilidad y Deuda Técnica 🟡]]

[[Fase 9 — El Programador Completo/9.4 — Temas que Pocos Dominan 🟢]]

---

# 🧩 Temas Transversales

<aside>
⚠️

**Testing es una disciplina unificada — no un apéndice de seguridad ni de frontend.** El plan tiene dos archivos de testing en fases distintas por razones de cohesión temática, pero deben estudiarse como una unidad coherente:

- `5.3 — Testing Backend y API 🔴` — el marco conceptual (Testing Trophy, filosofía de Testing Library), tests unitarios e integración en NestJS, contract testing con Pact.
- `6.4 — Testing Frontend 🟡` — tests de componentes Angular con Testing Library, visual regression con Playwright.

**Cómo estudiarlos:** Cuando llegues a la Fase 5, estudiá `5.3` completo. Cuando llegues a la Fase 6, estudiá `6.4` como continuación natural — el marco conceptual de `5.3` aplica igual al frontend. No los trates como temas aislados.

</aside>

---

# 📚 Recursos Transversales

<aside>
📖

**Libros que todo ingeniero de software debería leer** — independientemente de la tecnología o fase en la que estés. Estos forman tu criterio y pensamiento.

</aside>

## Libros esenciales (en orden de prioridad)

1. **Designing Data-Intensive Applications** — Martin Kleppmann

*El libro más importante de esta lista. Cubre bases de datos, sistemas distribuidos, consistency, replication, partitioning. Si solo leés un libro, que sea este.*

1. **Clean Code** + **Clean Architecture** — Robert C. Martin

*Controversiales pero fundamentales. Tomalos como guías, no como dogma.*

1. **The Pragmatic Programmer** — David Thomas & Andrew Hunt

*Mentalidad de ingeniero. Tips prácticos que aplican a cualquier lenguaje.*

1. **System Design Interview Vol. 1 y 2** — Alex Xu

*Práctico, visual, casos reales. Excelente para pensar en sistemas.*

1. **Grokking Algorithms** — Aditya Bhargava

*El mejor libro para aprender algoritmos si nunca los estudiaste formalmente.*

1. **A Philosophy of Software Design** — John Ousterhout

*Corto, denso, brillante. Sobre complejidad y cómo manejarla.*

1. **Staff Engineer / The Staff Engineer's Path**

*Para cuando estés listo para el siguiente nivel de tu carrera.*

## Plataformas y recursos online

- **Cursos:** MIT OCW, Stanford Online, Coursera (auditar gratis), Frontend Masters, Pluralsight
- **Práctica de algoritmos:** [NeetCode.io](http://NeetCode.io), LeetCode, HackerRank
- **System Design:** ByteByteGo (YouTube), Grokking System Design
- **Seguridad:** PortSwigger Academy, OWASP, HackTheBox
- **Frontend:** [web.dev](http://web.dev), MDN Web Docs, CSS-Tricks
- **Newsletters:** ByteByteGo, TLDR, JavaScript Weekly, Node Weekly
- **Podcasts:** [Syntax.fm](http://Syntax.fm), Software Engineering Daily, The Changelog

---

# 🗓️ Sugerencia de Secuencia y Ritmo

<aside>
⏱️

**Esto NO es un sprint, es una maratón.** No intentes hacer todo a la vez. Un tema bien entendido vale más que diez leídos por encima.

</aside>

<aside>
💡

**¿Por qué el orden no sigue la numeración de fases?** Las fases están NUMERADAS por tema, pero el orden RECOMENDADO prioriza impacto práctico. Seguridad y Performance (5) y Bases de Datos (7) se mueven antes de Arquitectura Avanzada (3) porque necesitás entender cómo se rompen las cosas ANTES de diseñar sistemas complejos. Infraestructura (4) va después porque tiene sentido deployar cuando ya tenés algo sólido que deployar. **Seguí la tabla, no los números.**

</aside>

| **Orden** | **Fase** | **Enfoque** |
| --- | --- | --- |
| 1ro | Fase 0 — Mentalidad y Proceso | Empezá por acá. Cambia cómo pensás ANTES de cambiar cómo programás. |
| 2do | Fase 1 — CS Fundamentals | La deuda técnica más grande. Algoritmos, SO, redes. Es duro pero es la base de TODO. ⚠️ Ver nota abajo. |
| 3ro | Fase 2 — Lenguaje y Runtime | JS/TS internals. Combiná con tu trabajo diario — aplicá lo que aprendés. |
| 4to | Fase 5 — Seguridad y Performance | Mové esto antes de arquitectura avanzada. Importa más en la práctica diaria. |
| 5to | Fase 7 — Bases de Datos | SQL avanzado, transactions, migraciones. Aplicalo directamente en FreePress. |
| 6to | Fase 3 — Arquitectura Avanzada | DDD, Event-Driven, System Design. Necesitás las bases anteriores para que esto haga clic. |
| 7mo | Fase 6 — Frontend Avanzado | Browser internals, state management, a11y. Complementá con tu experiencia. |
| 8vo | Fase 4 — Infraestructura y Cloud | K8s, IaC, cloud. Deployá FreePress en infraestructura real. |
| 9no | Fase 8 — AI y Agentes | Ya tenés base. Ahora profundizá con proyectos reales. |
| 10mo | Fase 9 — Completar | Open source, debugging avanzado, refactoring. El cierre del arco. |

---

<aside>
⚠️

**Advertencia sobre Fase 1:** Es la fase más densa y abstracta del plan, y está al principio. Es también donde más gente abandona planes de estudio — no porque sea imposible, sino porque los resultados no son inmediatos. Estrategia recomendada: después de completar `1.1 — Estructuras de Datos y Algoritmos`, hacé un desvío a `Fase 2 — Lenguaje y Runtime` (que es más práctica y conectada a tu trabajo diario), y volvé a `1.2`, `1.3` y los siguientes. Esto te da victorias más rápidas sin saltarte los fundamentos.

</aside>

---

> *"La diferencia entre un programador con 8 años de experiencia y un ingeniero de software con 8 años de experiencia es que el segundo sabe POR QUÉ las cosas funcionan, no solo CÓMO hacerlas funcionar. Este plan te lleva de uno al otro."*
>