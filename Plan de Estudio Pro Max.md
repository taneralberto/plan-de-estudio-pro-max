# Plan de Estudio Pro Max

<aside>
🎯

**Filosofía de este plan:** Los conceptos PRIMERO, las herramientas DESPUÉS. No se toca código hasta entender el PORQUÉ. Cada fase construye sobre la anterior — no saltes fases. La AI amplifica lo que ya sabés; si no sabés nada, amplifica la nada.

</aside>

<aside>
🤖

**La regla sobre la AI:** Primero lo construís vos. Después la AI puede entrar.

La AI es válida como revisor de código que ya escribiste, como desbloqueador cuando llevás 30+ minutos trabado sin avance, y como generador de casos edge para código que ya existe. No es válida para escribir el código que el plan espera que vos escribas — eso destruye el aprendizaje silenciosamente, porque el código queda hecho pero vos no aprendiste nada.

El objetivo no es "no quedar desplazado por la AI". Es ser quien sabe dirigirla, verificar lo que produce, y tomar las decisiones que ella no puede tomar sola. Eso requiere conocimiento real. La regla completa está en `0.2 — Metodologías y Procesos`.

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

### Estado esperado de FreePress por fase

Esta tabla es tu ancla de calibración. Al terminar cada fase, mirá FreePress y preguntate: *¿refleja esto lo que aprendí?* Si está muy por debajo, te quedaste corto en la aplicación. Si está muy por encima, construiste sin las bases — y probablemente con patrones que vas a tener que deshacer.

| Fase completada | Estado esperado de FreePress |
|---|---|
| **Fase 0** | Repo creado. Scaffold funcional: `docker-compose up` levanta Angular + NestJS + PostgreSQL + Redis. Carpeta `/docs` con al menos 1 ADR (decisión de stack) y 1 PRD borrador (el editor WYSIWYG). README mínimo que explica cómo levantar el proyecto. |
| **Fase 1** | Nada nuevo en features — pero el código existente tiene análisis de complejidad documentado en los lugares donde importa. Si hay alguna estructura de datos usada (arrays, maps, sets), la elección está justificada. El event loop de Node.js se refleja en cómo está organizado el bootstrap de NestJS. |
| **Fase 2** | Configuración de TypeScript en modo estricto. Build pipeline configurado (esbuild o webpack según corresponda). Al menos un módulo del backend refactorizado para demostrar comprensión de closures, prototypes o concurrencia. Git history limpio con commits atómicos y mensajes convencionales. |
| **Fase 5** | Auth básico funcionando: registro, login, JWT, refresh tokens. Al menos un endpoint protegido con RBAC. Suite de tests backend con cobertura de los flujos críticos (auth, creación de artículos). Un reporte de `npm audit` sin vulnerabilidades críticas. |
| **Fase 7** | Schema de base de datos con migraciones versionadas. Índices justificados con `EXPLAIN ANALYZE`. Al menos una query compleja optimizada. Sistema básico de caché con Redis para queries de lectura frecuente. |
| **Fase 3** | Arquitectura refactorizada a capas claras (domain / application / infrastructure). Al menos un Bounded Context identificado y documentado en un ADR. Event-driven para al menos una feature (ej: notificaciones al publicar un artículo). Context Map en `/docs`. |
| **Fase 6** | Frontend Angular con state management implementado (NgRx o signals según ADR). Componentes con tests de integración usando Angular Testing Library. Storybook configurado con stories para los componentes principales del sistema de diseño. |
| **Fase 4** | Docker Compose de producción separado del de desarrollo. CI/CD con GitHub Actions: lint + tests + build en cada PR. Deploy automatizado a un cloud real (Railway, Fly.io, o AWS). Logs estructurados con correlación de requests. |
| **Fase 8** | `fp-ai-assistant` iniciado: al menos un endpoint que usa la API de Claude para una feature real (ej: sugerencias de tags, resumen de artículo). RAG básico contra el contenido de FreePress. |
| **Fase 9** | Documentación de arquitectura actualizada. Al menos un módulo legacy (el primero que escribiste) refactorizado con characterization tests + técnicas de Fowler. ADRs actualizados con las decisiones que cambiastes durante el plan. |

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

## Cómo se ve el ciclo en el tiempo real

El ciclo de 4 pasos no ocurre en una sentada. Para un tema 🔴, la realidad es más parecida a esto:

> **Ejemplo: Hash Tables (1.1)**
>
> - **Día 1 (lunes):** Paso 1 — video de overview de Hash Tables en Fireship + leer capítulo 5 de *Grokking Algorithms*. 1.5 horas. Terminás el día sabiendo DE QUÉ TRATA, cuál es el problema que resuelve, y por qué O(1) no es siempre O(1).
> - **Día 2 (martes):** Paso 2 — implementás tu propio `HashMap` desde cero en TypeScript con chaining para colisiones. 2 horas. No copiás código — lo escribís vos. Si algo no compila, lo debuggeás. Ahí está el aprendizaje.
> - **Día 3 (miércoles):** Paso 2 continúa — el `HashMap` funciona, pero el `get` con colisiones tiene un bug. Lo arreglás. Después hacés 3 ejercicios de NeetCode sobre Hash Tables. 1.5 horas.
> - **Día 4 (jueves):** Paso 3 (opcional) — algo no quedó claro sobre amortized O(1). Leés la sección específica de MDN sobre `Map` vs objeto plano. 45 minutos.
> - **Día 5-6:** Paso 4 — implementás el sistema de búsqueda de artículos en FreePress usando un Map para el índice en memoria. Lo comparás con una búsqueda lineal y medís la diferencia.
> - **Día 7:** "Done cuando" — verificás el criterio de completitud del tema. Podés explicar qué pasa internamente cuando hacés `map.set(key, value)`. Si podés, marcás el checkbox. Si no podés, volvés al Paso 2.

**El ciclo para temas 🟡 suele ser 3-4 días. Para temas 🟢, 1-2 días.** Los tiempos son orientativos — lo que importa es el "Done cuando", no cuántos días pasaron.

## Qué es una sesión bien usada

Una sesión de 2 horas donde **escribiste código** es una sesión bien usada.

Una sesión de 2 horas donde solo miraste videos o leíste artículos es útil — pero no es suficiente sola, y no cuenta como avance real en el ciclo. El video es el mapa; el código es el territorio.

Señales de una sesión bien usada:
- Escribiste código que no existía antes (aunque sea roto, aunque fallara)
- Rompiste algo y lo arreglaste entendiendo por qué estaba roto
- Aplicaste algo en FreePress que antes solo "entendías en teoría"

Señales de una sesión mal usada:
- Pasaste 2 horas "tomando notas" o haciendo resúmenes
- Miraste el ejercicio del tema y dijiste "esto lo entiendo, no hace falta hacerlo"
- Saltaste el Paso 2 porque "ya sabés de qué se trata"

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

**Checkpoints por fase:** Al terminar cada fase, validá tu aprendizaje con un entregable concreto. No alcanza con "lo leí y lo entendí" — necesitás DEMOSTRAR que lo internalizaste. Los checkpoints de abajo son específicos para cada fase: son difíciles de fingir, observables por otra persona, y anclados en FreePress. Si no podés producirlos, no terminaste la fase.

</aside>

### Checkpoints por fase

Los checkpoints siguen el **orden de la secuencia recomendada**, no la numeración de fases.

| Fase | Checkpoint — lo que tenés que poder producir o demostrar |
|---|---|
| **Fase 0** | Abrís el repo de FreePress y encontrás en `/docs`: un ADR que justifica el stack (Angular + NestJS + PostgreSQL + Redis) con alternativas consideradas y razones de descarte, y un PRD del editor WYSIWYG con al menos problema, usuarios, y criterios de éxito definidos. Podés explicar la diferencia entre un PRD, un RFC y un ADR en 2 minutos sin mirar apuntes. |
| **Fase 1** | Tomás cualquier función del backend de FreePress y decís su complejidad Big O temporal y espacial en menos de 2 minutos, justificando el razonamiento. Podés explicar con un diagrama propio (dibujado en el momento) cómo el event loop de Node.js maneja dos requests HTTP concurrentes. Podés mostrar qué pasa en memoria cuando una función de FreePress genera un closure. |
| **Fase 2** | Abrís Chrome DevTools en el frontend de FreePress, ponés un breakpoint en el código compilado (no el fuente), y traceo la ejecución de una acción del usuario hasta la respuesta del servidor. Podés explicar qué hace el compilador de TypeScript con un generic condicional que usaste en FreePress — no a nivel "compila", sino qué emite en JavaScript. |
| **Fase 5** | Abrís el código de auth de FreePress y señalás al menos 2 superficies de ataque potenciales que existen o existieron, explicando el vector de ataque concreto. Corrés la suite de tests del backend — pasan todos. Corrés `npm audit` — cero críticos. Corrés un benchmark con Artillery o k6 sobre el endpoint más lento de FreePress y podés leer el reporte. |
| **Fase 7** | Abrís psql contra la base de FreePress, ejecutás `EXPLAIN ANALYZE` sobre la query más pesada del sistema, y podés leer el plan de ejecución: identificás si hay Seq Scans donde no deberían estar y sabés qué índice agregarías. Podés mostrar una migración de schema versionada que no rompe datos existentes. |
| **Fase 3** | Dibujás en el momento el Context Map de FreePress con sus Bounded Contexts y el tipo de relación entre ellos (upstream/downstream, ACL, etc.), justificando cada límite. Podés abrir cualquier módulo de FreePress y decir si viola el Dependency Rule de Clean Architecture — y si viola, explicar exactamente cuál dependencia apunta en la dirección incorrecta. |
| **Fase 6** | Abrís el test de un componente Angular de FreePress y determinás en 5 minutos si está testeando comportamiento o implementación. Podés mostrar en Storybook las variantes del componente principal del sistema de diseño con sus estados. Podés explicar qué pasa en el render pipeline del browser cuando Angular actualiza un componente con OnPush. |
| **Fase 4** | Hacés un deploy de FreePress a producción desde cero (desde `git push` hasta el sistema corriendo) en menos de 10 minutos usando el pipeline de CI/CD. Podés abrir el dashboard de observabilidad (Grafana, Datadog, o similar) y responder: ¿qué endpoint tiene la latencia P99 más alta esta semana y por qué? |
| **Fase 8** | Mostrás `fp-ai-assistant` funcionando con al menos una feature real integrada a FreePress (sugerencias, resumen, búsqueda semántica). Podés explicar qué es RAG, por qué existe, y qué problema resuelve que un LLM sin contexto no puede resolver — con el código de FreePress como ejemplo concreto. |
| **Fase 9** | Abrís el módulo más viejo de FreePress (el que escribiste en la Fase 1 o 2), mostrás que tiene characterization tests, y explicás al menos una decisión de diseño que cambiarías hoy y por qué. Podés abrir un PR de FreePress y hacer un code review escrito con comentarios en formato Conventional Comments, incluyendo al menos un comentario de diseño no bloqueante y uno bloqueante con alternativa propuesta. |

---

# 🚀 Por Dónde Empezar — Los Primeros 30 Días

<aside>
📌

**Esta sección responde una sola pregunta: ¿qué estudio mañana?**

El plan tiene una tabla de secuencia, numeración de fases, y advertencias sobre por dónde arrancar. Las tres son útiles — pero si las leés juntas antes de empezar, el cognitive load hace que no empieces. Esta sección toma la decisión por vos. Seguila literalmente.

</aside>

## La decisión tomada

Arrancás por la **Fase 0**. Completa. Sin desvíos. No porque sea la más emocionante — porque es la más estratégica. Después viene **Fase 1.1**, y desde ahí seguís la tabla de secuencia.

---

## Semana 1 — Fase 0 completa (Mentalidad y Proceso)

**Qué estudiar:**
- `0.1 — Documentación Técnica Profesional 🔴`
- `0.2 — Metodologías y Procesos 🔴`
- `0.3 — Soft Skills Técnicos 🟡`

**Qué hacés en la práctica:**
- Día 1-2: `0.1` — aprendés PRD, RFC, ADR. Al final del día 2, escribís tu primer ADR para FreePress: *"Por qué Angular + NestJS + PostgreSQL + Redis"*.
- Día 3-4: `0.2` — metodologías y procesos. Al final del día 4, tenés un PRD borrador del editor WYSIWYG de FreePress.
- Día 5: `0.3` — soft skills técnicos. Sesión más ligera, lectura + reflexión.
- Día 6-7: Creás el repo de FreePress, scaffold básico (Angular + NestJS + Docker Compose), y dejás los tres documentos (ADR, PRD borrador) commiteados.

**Entregable de la semana:**
Repo de FreePress creado, con scaffold funcionando (`docker-compose up` levanta el stack) y al menos un ADR + un PRD borrador en `/docs`. Esto es lo que necesitás para poder decir que terminaste la Fase 0.

---

## Semanas 2-3 — Fase 1.1 (Estructuras de Datos y Algoritmos)

**Qué estudiar:**
- `1.1 — Estructuras de Datos y Algoritmos 🔴`

**Por qué solo esto:** Es el tema más denso del plan. Intentar combinarlo con otras cosas en la misma semana garantiza no aprender ninguno bien.

**Qué hacés en la práctica:**
- Ciclo estándar: overview → práctica → profundidad → aplicar en FreePress
- Cada estructura de datos: escribila desde cero en TypeScript antes de usar la nativa
- Terminada la semana 2: Arrays, Linked Lists, Stacks, Queues, Hash Tables
- Terminada la semana 3: Trees, Graphs, Heaps + al menos 5 ejercicios de LeetCode/NeetCode Easy por estructura

**Entregable:**
Podés tomar cualquier estructura de datos del plan, implementarla en TypeScript sin mirar nada, y explicar su complejidad Big O en 2 minutos.

---

## Semana 4 — Desvío a Fase 2.1 (JavaScript Internals) + vuelta a Fase 1

**Qué estudiar:**
- `2.1 — JavaScript Internals 🔴` (solo esta semana)

**Por qué el desvío:** La Fase 1 es la más densa y abstracta del plan. Después de dos semanas de algoritmos, una semana de algo más conectado a tu trabajo diario te da una victoria táctica y recarga la energía para volver. Este desvío está diseñado — no es escapar de los fundamentos.

**Al terminar la semana 4:** Volvés a la Fase 1 con `1.2 — Sistemas Operativos` y continuás en orden hasta terminar la fase.

---

## Cómo retomar si se interrumpe

Si la vida interrumpe el plan (pasa, siempre pasa), la regla es simple:

1. **Abrí este archivo** y mirá en qué semana estabas.
2. **No volvás al principio.** Continuá desde donde dejaste, aunque hayan pasado semanas.
3. **Si pasaron más de 2 semanas**, hacé una sesión de repaso de 1 hora del último tema antes de continuar — no más.
4. **La consistencia gana sobre la intensidad.** 3 sesiones de 2 horas por semana durante un año es infinitamente mejor que 2 meses intensos y 4 meses de parálisis.

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

<aside>
⚠️

**Debugging y Mantenibilidad son prácticas continuas — no temas del final.**

`9.2 — Debugging Avanzado` y `9.3 — Mantenibilidad y Deuda Técnica` están en la Fase 9 como referencia de contenido, pero los hábitos que describen se forman (o no se forman) desde el primer día que empezás a construir FreePress.

- **`9.2 — Debugging Avanzado 🔴`** — leelo antes de tu primer bug difícil en FreePress. El método científico de debugging y `git bisect` son útiles desde la Fase 1. Las herramientas avanzadas (Wireshark, heap snapshots) las vas a necesitar a partir de la Fase 4-5.
- **`9.3 — Mantenibilidad y Deuda Técnica 🟡`** — leelo antes de empezar a construir FreePress en serio (Fase 2 en adelante). "Dejá el código mejor de como lo encontraste" es un hábito que se instala en cada commit, no una lección que se aprende al final.

Ambos archivos tienen un banner que lo recuerda. La Fase 9 sigue siendo el lugar donde los estudiás en profundidad — pero la práctica empieza mucho antes.

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