# Metodología de Aprendizaje

Este archivo describe CÓMO estudiar, no QUÉ estudiar. El contenido de temas está en `Plan de Estudio Pro Max.md`. Acá está el método.

---

## 🤖 La Regla de AI

> **Primero lo construís vos. Después la AI puede entrar.**

La AI es válida como:
1. **Revisor de código** — *"Implementé este sistema de cache. ¿Qué problemas ves?"*
2. **Desbloqueador** — cuando llevás 30+ minutos trabado sin avance real
3. **Generador de casos edge** — *"¿Qué inputs romperían esta función?"*

La AI NO es válida para:
- Escribir el código que el plan espera que vos escribas
- Explicar un concepto antes de que intentes entenderlo solo

**Por qué importa:** El aprendizaje ocurre en la fricción. Si la AI elimina la fricción antes de que ocurra, elimina el aprendizaje junto con ella. Código que funciona + programador que no aprendió = falsa confianza peligrosa.

**El objetivo correcto:** No es "que la AI no pueda hacer lo que yo hago" — es "ser el humano que sabe qué pedirle a la AI, verificar lo que produce, y tomar las decisiones que ella no puede tomar sola". Eso requiere conocimiento real.

---

## 🔄 El Ciclo de Aprendizaje (4 Pasos)

No leas cada libro de tapa a tapa. Los libros son recursos de REFERENCIA. La estrategia es este ciclo:

### Paso 1 — Video o artículo de overview (1-2 horas)

Buscá un video de 20-40 minutos que te dé el mapa mental general. No necesitás entender todo — necesitás saber DE QUÉ SE TRATA, cuál es el problema que resuelve, y por qué importa.

**Dónde buscar:**
- **YouTube:** Fireship, ByteByteGo, ThePrimeagen, Traversy Media, 3Blue1Brown
- **Blogs:** Martin Fowler, web.dev, blogs oficiales de cada tecnología
- **Newsletters:** ByteByteGo, TLDR, JavaScript Weekly

### Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**Esta es la parte más importante.** Si miraste un video sobre el Event Loop, abrí la consola y escribí 10 ejemplos AHORA. No mañana — **AHORA**.

La curva del olvido es brutal: si no practicás en 24 horas, perdés el 70%.

**La regla:** no escribas notas bonitas, no hagas resúmenes. **Escribí código.**

### Paso 3 — Lectura profunda SI algo no quedó claro (variable)

Recién acá entran los libros. Leé el **capítulo específico** que necesitás, no todo el libro.

**Alternativas cuando el tema no requiere tanta profundidad:**
- Documentación oficial — siempre la más actualizada
- Cursos estructurados — Frontend Masters, Pluralsight, MIT OCW

### Paso 4 — Aplicar en FreePress (el cierre del ciclo)

El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real. FreePress es tu proyecto principal. Los mini-proyectos satélite cubren lo que no encaja ahí.

Si no podés aplicar lo que aprendiste, es señal de que necesitás volver al paso 2 o 3.

---

## Cómo se ve el ciclo en el tiempo real

El ciclo no ocurre en una sentada. Para un tema 🔴:

> **Ejemplo: Hash Tables (1.1)**
>
> - **Día 1 (lunes):** Paso 1 — video de overview + leer capítulo 5 de *Grokking Algorithms*. 1.5 horas.
> - **Día 2 (martes):** Paso 2 — implementás tu propio `HashMap` desde cero en TypeScript. 2 horas.
> - **Día 3 (miércoles):** Paso 2 continúa — el `HashMap` tiene un bug con colisiones. Lo arreglás. Hacés 3 ejercicios de NeetCode. 1.5 horas.
> - **Día 4 (jueves):** Paso 3 (opcional) — algo no quedó claro sobre amortized O(1). Leés la sección específica de MDN. 45 minutos.
> - **Día 5-6:** Paso 4 — implementás búsqueda de artículos en FreePress usando un Map para el índice. Comparás con búsqueda lineal.
> - **Día 7:** "Done cuando" — verificás el criterio de completitud. Si podés explicar qué pasa internamente cuando hacés `map.set(key, value)`, marcás el checkbox.

**Tiempos orientativos:**
- Temas 🔴: 5-7 días
- Temas 🟡: 3-4 días
- Temas 🟢: 1-2 días

---

## Qué es una sesión bien usada

Una sesión de 2 horas donde **escribiste código** es una sesión bien usada.

Una sesión de 2 horas donde solo miraste videos o leíste artículos es útil — pero no es suficiente sola, y no cuenta como avance real.

**Señales positivas:**
- Escribiste código que no existía antes (aunque esté roto)
- Rompiste algo y lo arreglaste entendiendo por qué
- Aplicaste algo en FreePress que antes solo "entendías en teoría"

**Señales negativas:**
- Pasaste 2 horas "tomando notas" o haciendo resúmenes
- Miraste el ejercicio y dijiste "esto lo entiendo, no hace falta hacerlo"
- Saltaste el Paso 2 porque "ya sabés de qué se trata"

---

## ⏱️ Ritmo Realista

Con este ciclo, cada tema te debería llevar entre **1 y 2 semanas** estudiando 2-3 horas diarias enfocadas.

Este plan, hecho bien, son **12 a 24 meses**. No es un sprint de 3 meses. Si lo apurás, no aprendés — acumulás la ilusión de haber aprendido.

**La consistencia gana sobre la intensidad.** 3 sesiones de 2 horas por semana durante un año es infinitamente mejor que 2 meses intensos y 4 meses de parálisis.

---

## 🏁 Checkpoints por Fase

Al terminar cada fase, validá tu aprendizaje con un entregable concreto. No alcanza con "lo leí y lo entendí" — necesitás DEMOSTRAR que lo internalizaste.

| Fase | Checkpoint — lo que tenés que poder producir o demostrar |
|------|----------------------------------------------------------|
| **Fase 0** | Abrís el repo de FreePress y encontrás en `/docs`: un ADR que justifica el stack con alternativas consideradas, y un PRD del editor WYSIWYG. Podés explicar la diferencia entre PRD, RFC y ADR en 2 minutos sin mirar apuntes. |
| **Fase 1** | Tomás cualquier función del backend de FreePress y decís su complejidad Big O temporal y espacial en menos de 2 minutos, justificando el razonamiento. Podés explicar con un diagrama propio cómo el event loop de Node.js maneja dos requests HTTP concurrentes. |
| **Fase 2** | Abrís Chrome DevTools, ponés un breakpoint en el código compilado, y traceás la ejecución de una acción del usuario hasta la respuesta del servidor. Podés explicar qué hace el compilador de TypeScript con un generic condicional que usaste. |
| **Fase 5** | Abrís el código de auth de FreePress y señalás al menos 2 superficies de ataque potenciales. Corrés la suite de tests — pasan todos. `npm audit` sin críticos. Corrés un benchmark con Artillery o k6 sobre el endpoint más lento y podés leer el reporte. |
| **Fase 7** | Abrís psql contra la base de FreePress, ejecutás `EXPLAIN ANALYZE` sobre la query más pesada, y podés leer el plan de ejecución: identificás Seq Scans donde no deberían estar y sabés qué índice agregarías. Podés mostrar una migración de schema versionada que no rompe datos existentes. |
| **Fase 3** | Dibujás en el momento el Context Map de FreePress con sus Bounded Contexts y el tipo de relación entre ellos, justificando cada límite. Podés abrir cualquier módulo y decir si viola el Dependency Rule de Clean Architecture — y si viola, explicar exactamente cuál dependencia apunta en la dirección incorrecta. |
| **Fase 6** | Abrís el test de un componente Angular de FreePress y determinás en 5 minutos si está testeando comportamiento o implementación. Podés mostrar en Storybook las variantes del componente principal del sistema de diseño. Podés explicar qué pasa en el render pipeline del browser cuando Angular actualiza un componente con OnPush. |
| **Fase 4** | Hacés un deploy de FreePress a producción desde cero (desde `git push` hasta el sistema corriendo) en menos de 10 minutos usando el pipeline de CI/CD. Podés abrir el dashboard de observabilidad y responder: ¿qué endpoint tiene la latencia P99 más alta esta semana y por qué? |
| **Fase 8** | Mostrás `fp-ai-assistant` funcionando con al menos una feature real integrada a FreePress. Podés explicar qué es RAG, por qué existe, y qué problema resuelve que un LLM sin contexto no puede resolver — con el código de FreePress como ejemplo concreto. |
| **Fase 9** | Abrís el módulo más viejo de FreePress, mostrás que tiene characterization tests, y explicás al menos una decisión de diseño que cambiarías hoy y por qué. Podés abrir un PR y hacer un code review escrito con comentarios en formato Conventional Comments. |

---

## 🚀 Primeros 30 Días

Esta sección responde una sola pregunta: **¿qué estudio mañana?**

El orden está diseñado para crear **victorias tangibles tempranas**. La Fase 1 (CS Fundamentals) es la más abstracta — hacerla ANTES de tener código funcionando genera abandono. Por eso el plan arranca con mentalidad, después código real, y DESPUÉS la teoría pesada.

### Semana 1 — Fase 0 completa (Mentalidad y Proceso)

**Qué estudiar:**
- `0.1 — Documentación Técnica Profesional 🔴`
- `0.2 — Metodologías y Procesos 🔴`
- `0.3 — Soft Skills Técnicos 🟡`

**Qué hacés en la práctica:**
- Día 1-2: `0.1` — aprendés PRD, RFC, ADR. Escribís tu primer ADR para FreePress.
- Día 3-4: `0.2` — metodologías. Al final del día 4, tenés un PRD borrador del editor WYSIWYG.
- Día 5: `0.3` — soft skills técnicos. Sesión más ligera.
- Día 6-7: Creás el repo de FreePress, scaffold básico, y dejás los documentos commiteados.

**Entregable de la semana:**
Repo de FreePress creado, con scaffold funcionando (`docker-compose up` levanta el stack) y al menos un ADR + un PRD borrador en `/docs`.

### Semanas 2-3 — Fase 2.1 (JavaScript Internals) + Scaffold de FreePress

**Qué estudiar:**
- `2.1 — JavaScript Internals 🔴`

**Por qué esto ANTES de la Fase 1:**
- La Fase 1 (CS Fundamentals) es densa y abstracta
- **Victorias tangibles tempranas crean momentum**
- Escribir JS real, que falla y se arregla, genera contexto práctico
- Cuando llegues a algoritmos, vas a tener código real de referencia

**Qué hacés en la práctica:**
- Event Loop: escribí 10 ejemplos con `setTimeout`, `Promise`, `queueMicrotask`
- Closures: implementá un sistema de caching simple
- Prototypes: extendé funcionalidad sin clases
- Memory: inspeccioná heap snapshots en Chrome DevTools
- **Paralelamente:** scaffold de FreePress funcional con Angular + NestJS + PostgreSQL + Redis

**Entregable:**
FreePress corriendo localmente (`docker-compose up` levanta todo). Al menos un bug que arreglaste entendiendo JS Internals. Podés explicar qué pasa cuando el event loop procesa un `Promise.resolve().then()` vs un `setTimeout(() => {}, 0)`.

### Semanas 4-6 — Fase 1.1 (Estructuras de Datos y Algoritmos)

**Qué estudiar:**
- `1.1 — Estructuras de Datos y Algoritmos 🔴`

**Por qué AHORA sí:** Ya tenés FreePress funcionando y contexto de JS real. Los algoritmos dejan de ser teoría abstracta y pasan a ser herramientas que entendés para qué sirven.

**Qué hacés en la práctica:**
- Ciclo estándar: overview → práctica → profundidad → aplicar en FreePress
- Cada estructura de datos: escribila desde cero en TypeScript antes de usar la nativa
- Terminada la semana 4: Arrays, Linked Lists, Stacks, Queues, Hash Tables
- Terminada la semana 5-6: Trees, Graphs, Heaps + al menos 5 ejercicios de LeetCode/NeetCode Easy por estructura

**Entregable:**
Podés tomar cualquier estructura de datos del plan, implementarla en TypeScript sin mirar nada, y explicar su complejidad Big O en 2 minutos.

### Semanas 7-8 — Fase 5.1 (Seguridad Aplicada — Auth en FreePress)

**Qué estudiar:**
- `5.1 — Seguridad Aplicada 🔴` (enfocado en auth)

**Por qué este desvío:**
- Auth es una **victoria tangible y útil** — algo que podés mostrar y usar
- Rompe la secuencia de teoría pura con algo práctico
- Genera momentum antes de continuar con SO y Redes (más abstractos)

**Qué hacés en la práctica:**
- JWT: implementá login, refresh tokens, logout
- RBAC: roles admin/editor/autor/lector con al menos un endpoint protegido
- Password storage: bcrypt o argon2, nunca texto plano
- OWASP Top 10: identificá superficies de ataque en tu auth

**Entregable:**
FreePress con auth funcional. Podés loguearte, el token se renueva, los endpoints protegidos responden 401 sin token. Al menos 2 tests de integración para el flujo de auth.

### Semana 9+ — Continuar Fase 1 (SO, Redes) y seguir la tabla de secuencia

Ahora sí, con **FreePress funcionando + auth implementado + algoritmos en el cinturón**, tenés el contexto y el momentum para aguantar la Fase 1 completa:

- `1.2 — Sistemas Operativos (Profundizar) 🔴`
- `1.3 — Redes en Profundidad 🔴`
- Y seguís la tabla de secuencia del plan principal

---

## El principio detrás del reordenamiento

El cerebro aprende mejor con **victorias tangibles tempranas**. Estudiar SO, redes y algoritmos ANTES de tener código funcionando que se rompe y se arregla es pedir paciencia donde no debería ser necesaria.

El nuevo orden garantiza que:
1. **Semana 1:** Mentalidad de ingeniero → ADR, PRD, repo creado
2. **Semana 2-3:** Código real que falla → JS Internals + FreePress scaffold
3. **Semana 4-6:** Teoría con contexto → Algoritmos sabiendo PARA QUÉ
4. **Semana 7-8:** Feature útil → Auth que podés mostrar y usar
5. **Semana 9+:** Teoría profunda → SO y Redes con momentum establecido

---

## Cómo retomar si se interrumpe

Si la vida interrumpe el plan:

1. **Abrí `PROGRESS.md`** y mirá en qué estabas.
2. **No volvás al principio.** Continuá desde donde dejaste.
3. **Si pasaron más de 2 semanas**, hacé una sesión de repaso de 1 hora del último tema — no más.
4. **La consistencia gana sobre la intensidad.** 3 sesiones de 2 horas por semana durante un año > 2 meses intensos + 4 meses de parálisis.
