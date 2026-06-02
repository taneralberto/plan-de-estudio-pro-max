# Mejoras Pendientes v8 — Plan de Estudio Pro Max

> Revisión crítica pedagógica realizada el 10/05/2026
> **Estado:** ✅ Ciclo cerrado — Mejoras 1, 2, 3, 4, 6 y 10 implementadas. Mejoras 5, 7, 8, 9 y 11 derogadas por decisión del autor.

---

## Contexto de esta revisión

Esta revisión surge de un análisis crítico profundo del plan completo, enfocado en **estructura, método de aprendizaje y relevancia en la era de AI**. Se identificaron 10 problemas estructurales que afectan la efectividad del aprendizaje. Dos de las propuestas originales fueron corregidas por el autor del plan tras debate pedagógico.

### Disidencias del autor vs. análisis original

1. **Problema 2 (Ramp-up de Stack):** La propuesta original de agregar ~20 horas de ramp-up de Angular/NestJS/PostgreSQL contradice la filosofía del plan ("concepts before frameworks"). La solución acordada es hacer FreePress **agnóstico al inicio** (HTML + CSS + Express + SQLite) y migrar a Angular + NestJS + PostgreSQL en Etapa 2, cuando el estudiante ya entiende POR QUÉ esos frameworks resuelven problemas que Express puro no.

2. **Problema 3b (Interleaving general):** El interleaving entre temas no relacionados es contraproducente para principiantes (genera interferencia proactiva). Se implementa **solo entre pares con conexión explícita** (ej: SQL + TypeScript).

---

## Mejoras pendientes de implementar

---

### 🔴 Mejora 1: Reordenar Etapa 1 — Código primero, documentación al cierre ✅ COMPLETADA

**Problema:**

El plan dice "Victorias tangibles tempranas. Código que falla y se arregla." Pero la Semana 1 es escribir PRDs, ADRs, y leer sobre metodologías — cero código, cero victorias tangibles. El propio tema 1.1 reconoce: *"Los ADRs que vas a escribir son retroactivos"*. Esto traiciona la filosofía del plan y genera riesgo de abandono en las primeras semanas.

**Solución:**

Reordenar la Etapa 1 para que el código venga primero y la documentación se haga cuando ya hay decisiones reales que documentar.

**Implementación concreta:**

Nuevo orden de la Etapa 1:

| Semana | Qué hacer | Nota |
|--------|-----------|------|
| **1-2** | `1.4 — Debugging Básico` + `1.5 — JS Internals` | Código desde el minuto 1 |
| **1-2 (paralelo)** | Mini-ejercicio: escribir el README del proyecto que estás armando | Documentación ligera, no bloqueante |
| **2-3** | `1.8 — Testing Fundamentals` (nuevo mini-tema) + Scaffold FreePress (Express + SQLite) | Testing se enseña ANTES de escribir código sin tests |
| **3-4** | `1.9 — AI Literacy` (nuevo mini-tema) | Entender la herramienta antes de usarla |
| **4-6** | `1.6 — Estructuras de Datos y Algoritmos` | Con contexto de código real |
| **6-7** | `1.7 — Seguridad Aplicada (Auth)` | Auth en FreePress con stack minimalista |
| **7-8** | `1.1 — Documentación Técnica` + `1.2 — Metodologías` | Ahora SÍ hay decisiones reales que documentar |
| **8** | `1.3 — Soft Skills Técnicos` | Lectura reflexiva al cierre |

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — reordenar tabla de Etapa 1
- `PROGRESO.md` — reordenar lista de temas de Etapa 1

**Riesgo:** Bajo. Es un reordenamiento, no un cambio de contenido.

---

### 🔴 Mejora 2: FreePress agnóstico al inicio — Migración de stack en Etapa 2 ✅ COMPLETADA

**Problema:**

El plan exige scaffold Angular + NestJS + PostgreSQL + Redis en la Semana 2-3 sin NINGÚN tema que enseñe estos frameworks. "Concepts before frameworks" es correcto, pero "no necesitas aprender frameworks" es falso. El estudiante choca contra un muro tecnológico antes de tener el contexto para entender por qué esos frameworks existen.

**Solución:**

FreePress arranca con un stack minimalista que cualquier dev puede levantar sin conocimiento previo de frameworks. La migración a Angular + NestJS + PostgreSQL ocurre en la Etapa 2, cuando el estudiante YA entiende los problemas que esos frameworks resuelven.

**Implementación concreta:**

Stack progresivo de FreePress:

| Etapa | Stack | Por qué |
|-------|-------|---------|
| **1 — Entrada** | HTML + CSS + Express + SQLite | Minimalista, se levanta sin Docker, el estudiante entiende cada pieza |
| **2 — Fundamentos** | Angular + NestJS + PostgreSQL + Redis | Migración justificada: Express se vuelve inmanejable, SQLite no escala, el frontend necesita componentización |

La migración NO es overhead — es aprendizaje. El estudiante vive el dolor del stack minimalista (ruteo manual, estado en el servidor, queries sin ORM, falta de tipado en la DB) y después migra a herramientas que resuelven esos problemas. ES la filosofía del plan aplicada consistentemente.

**Horas de migración a contabilizar:** ~10-15 horas distribuidas en las primeras semanas de Etapa 2. No son horas perdidas — son la experiencia de migrar un sistema real.

**Archivos a modificar:**
- `PROYECTOS.md` — reescribir stack de FreePress Etapa 1, agregar sección "Migración de Stack", actualizar checkpoints y Plan B
- `Plan de Estudio Pro Max.md` — ajustar "El Camino en una Vista" con stack de Etapa 1

**Riesgo:** Medio. Cambia el stack del proyecto principal, pero lo simplifica en la etapa más crítica (las primeras semanas).

---

### 🔴 Mejora 3: Testing Fundamentals — Mini-tema nuevo en Etapa 1 ✅ COMPLETADA

**Problema:**

El plan dice "testing desde el día 1" pero nunca enseña QUÉ testear, CÓMO mockear, CUÁNDO es suficiente. El requisito en METODOLOGIA.md ("Jest básico, testing de funciones puras, testing de endpoints con supertest, un mock simple") es un REQUISITO, no una ENSEÑANZA. Los temas de testing (3.6 y 4.10) son Advanced — llegás al mes 7-11 sin formación formal.

**Solución:**

Crear un mini-tema "Testing Fundamentals" en la Etapa 1, después de JS Internals y antes de Auth. ~5 horas de contenido enfocado en lo mínimo para que "testing desde el día 1" sea realista.

**Implementación concreta:**

Nuevo archivo: `Etapa 1 — Entrada/1.8 — Testing Fundamentals 🟡.md`

Contenido:
- Qué es un test y por qué existe (no "para pasar CI" — para pensar en casos edge antes de que sean bugs)
- Estructura AAA (Arrange-Act-Assert) — el patrón universal
- Qué testear vs qué no testear (lógica de negocio sí, getters/setters no)
- Mocks básicos: cuándo usarlos, cuándo son un smell
- Coverage como guía, no como meta (80% sin sentido > 100% sin valor)
- Testing de endpoints con supertest (aplicable a Express en la Etapa 1)
- Ejercicio: escribir tests para 2 funciones de FreePress + 1 test de endpoint

**Prioridad:** 🟡 Importante (no bloquea avance, pero sí afecta calidad del código desde el inicio)

**Este mini-tema NO reemplaza 3.6 y 4.10.** Es el fundamento mínimo. Los temas Advanced profundizan en testing frontend y backend respectivamente.

**Archivos a crear:**
- `Etapa 1 — Entrada/1.8 — Testing Fundamentals 🟡.md`

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — agregar 1.8 a la tabla de Etapa 1
- `PROGRESO.md` — agregar 1.8 en la sección de Etapa 1

**Riesgo:** Bajo. Mini-tema aditivo que no altera la estructura existente.

---

### 🟡 Mejora 4: Spaced Repetition — Ritual de Repaso ✅ COMPLETADA

**Problema:**

El plan no tiene NINGÚN mecanismo de revisión. Una vez que marcás un tema como "done", nunca lo volvés a tocar. Sin revisión espaciada, olvidás ~70% de lo aprendido en una semana (Ebbinghaus, 1885). En el mes 11, cuando estudiás AI Engineering, ¿cuánto recordás del Event Loop que estudiaste en el mes 2?

**Solución:**

Agregar un "Ritual de Repaso" que se integra en el flujo de estudio sin agregar overhead significativo.

**Implementación concreta:**

1. **Al inicio de cada sesión** (5-10 minutos): Retrieval practice — "Explicá en 2 minutos el último tema que completaste" sin mirar apuntes. Si te trabás, ese tema necesita repaso.
2. **Una vez por mes** (1 sesión completa): Repasar 2-3 temas anteriores con ejercicios rápidos. No es re-estudiar — es verificar que todavía podés explicar.
3. **PROGRESO.md** — agregar columna "Último repaso" para cada tema (fecha de la última vez que hiciste retrieval practice exitoso).

**Archivos a modificar:**
- `METODOLOGIA.md` — agregar sección "Spaced Repetition — Ritual de Repaso"
- `PROGRESO.md` — agregar columna "Último repaso"

**Riesgo:** Bajo. Cambio aditivo que no altera el flujo existente.

---

### 🟡 Mejora 5: Niveles de profundidad en "Done cuando" ❌ DEROGADA

**Problema:**

El "Done cuando" es binario — marcás un tema como completado y creés que lo dominás. La realidad es que hay niveles: awareness → understanding → application → mastery. Un tema marcado "done" en el mes 2 puede estar en nivel 1 (podés explicar) pero no en nivel 2 (lo aplicaste en FreePress de forma no trivial).

**Solución:**

Agregar niveles de profundidad al tracking de progreso. No cambia el "Done cuando" de cada tema — cambia cómo se TRACKING el nivel de dominio alcanzado.

**Implementación concreta:**

Niveles:
- **L1 — Completado:** El criterio actual del "Done cuando" — podés explicar sin apuntes + checkpoint social.
- **L2 — Aplicado:** Lo usaste en FreePress de forma no trivial (no solo un ejercicio aislado).
- **L3 — Enseñado:** Alguien más lo aprendió de vos (checkpoint social avanzado: mentoreo, workshop, artículo tutorial).

No hace falta alcanzar L3 en todos — pero el estudiante debería saber en qué nivel está.

**PROGRESO.md** — agregar columna "Nivel" por tema con los valores L1/L2/L3.

**Archivos a modificar:**
- `METODOLOGIA.md` — agregar sección "Niveles de Profundidad"
- `PROGRESO.md` — agregar columna "Nivel"

**Riesgo:** Bajo. Cambio aditivo al tracking.

---

### 🟡 Mejora 6: AI Literacy — Mini-tema nuevo en Etapa 1 ✅ COMPLETADA

**Problema:**

La progresión de uso de AI (Validador → Reviewer → Pair → Teammate) es pedagógicamente correcta. Pero el estudiante usa AI desde la Etapa 1 sin entender QUÉ es un LLM, CÓMO funciona a nivel conceptual, y cuáles son sus limitaciones FUNDAMENTALES. Sin este fundamento, el estudiante no entiende por qué la AI a veces valida algo incorrecto (hallucination), por qué no puede razonar realmente (next-token prediction), o por qué el mismo prompt da respuestas distintas (temperature/sampling).

**Solución:**

Crear un mini-tema "AI Literacy" de ~3 horas en la Etapa 1, como alfabetización básica antes de usar la herramienta con criterio.

**Implementación concreta:**

Nuevo archivo: `Etapa 1 — Entrada/1.9 — AI Literacy 🟡.md`

Contenido:
- Qué es un LLM conceptualmente (no matemáticamente): next-token prediction, training data, context window
- Por qué alucina: no "sabe" nada, predice texto estadísticamente
- Por qué no puede verificar su propio output
- Qué significa "temperature" y por qué el mismo prompt da respuestas distintas
- Limitaciones fundamentales vs. limitaciones prácticas
- Esto NO es "AI Engineering" — es alfabetización básica para usar la herramienta con criterio

**Prioridad:** 🟡 Importante

**Archivos a crear:**
- `Etapa 1 — Entrada/1.9 — AI Literacy 🟡.md`

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — agregar 1.9 a la tabla de Etapa 1
- `PROGRESO.md` — agregar 1.9 en la sección de Etapa 1

**Riesgo:** Bajo. Mini-tema aditivo.

---

### 🟡 Mejora 7: Perfiles Sugeridos para los 26 temas Advanced ❌ DEROGADA

**Problema:**

26 temas Advanced con orientación vaga ("si tu rol requiere", "si te orientás a DevOps"). El estudiante no tiene un marco de decisión claro, lo que genera ansiedad ("¿debería estudiar todos?") o evitación ("son optativos, los salto").

**Solución:**

Agregar 3 "Perfiles Sugeridos" (no "Tracks rígidos") con temas pre-seleccionados. El estudiante elige UN perfil como norte — puede tocar temas de otros, pero tiene dirección.

**Implementación concreta:**

| Perfil | Temas Advanced recomendados | Para quién |
|--------|----------------------------|------------|
| **Frontend Senior** | 3.4 State Management, 3.5 Accesibilidad, 3.6 Testing Frontend, 2.8 Build Tools, 2.10 Concurrency | Dev frontend que quiere seniority |
| **Backend/DevOps** | 2.4 SO, 2.5 Redes, 2.7 Linux, 4.7 Orquestación, 4.8 IaC, 4.9 Cloud, 4.10 Testing Backend | Dev que quiere infra + backend profundo |
| **AI-First Developer** | 4.11 ML-AI Fundamentos, 4.12 Proyectos AI reales, 2.11 NoSQL, 3.9 Messaging | Dev que quiere construir con AI |

Cada perfil tiene 4-7 temas — manejable en 2-3 meses adicionales.

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — agregar sección "Perfiles Sugeridos" después de la tabla de Etapa 4

**Riesgo:** Bajo. Cambio aditivo que no altera la estructura existente.

---

### 🟡 Mejora 8: Retrospectiva Mensual — Reflexión metacognitiva ❌ DEROGADA

**Problema:**

El plan tiene tracking de progreso, validación externa y un método de estudio. Pero no tiene NINGÚN mecanismo de reflexión metacognitiva: "¿Cómo estoy aprendiendo? ¿Qué me funciona? ¿Qué tengo que cambiar?" Sin reflexión, el estudiante puede pasar meses usando un método inefectivo sin darse cuenta.

**Solución:**

Agregar una "Retrospectiva Mensual" de 30 minutos con preguntas estructuradas.

**Implementación concreta:**

Preguntas de la retrospectiva:
1. ¿Qué tema me costó más el último mes? ¿Por qué?
2. ¿Qué tema disfruté más? ¿Por qué? (señal de dirección de carrera)
3. ¿Estoy usando AI en la etapa correcta? ¿Me estoy saltando la restricción?
4. ¿Cuántas sesiones completé este mes? ¿Es consistente con mi ritmo objetivo?
5. ¿Hay algo del plan que quiero ajustar?

Documentar las respuestas en PROGRESO.md o un journal separado.

**Archivos a modificar:**
- `METODOLOGIA.md` — agregar sección "Retrospectiva Mensual"

**Riesgo:** Bajo. Cambio aditivo.

---

### 🟢 Mejora 9: Reorganizar Etapa 2 en 2A y 2B ❌ DEROGADA

**Problema:**

12 temas que van desde Performance Engineering hasta Linux Shell hasta Concurrency hasta NoSQL. No es una "etapa" — es una categoría residual. Los temas no tienen cohesión entre sí. Algunos son CS Fundamentals (SO, Redes, Paradigmas), otros son herramientas (Build Tools, Git, Linux), otros son profundización de datos (SQL, NoSQL, Migrations).

**Solución:**

Dividir Etapa 2 en dos sub-etapas con identidad propia.

**Implementación concreta:**

| Sub-etapa | Temas | Identidad | Carácter |
|-----------|-------|-----------|----------|
| **2A — Fundamentos de Ingeniería** | 2.1 Performance, 2.2 SQL, 2.3 TypeScript, 2.12 Migrations | Lo que necesitás para construir FreePress en serio | Core y secuencial |
| **2B — Fundamentos de CS** | 2.4 SO, 2.5 Redes, 2.6 Paradigms, 2.7 Linux, 2.8 Build Tools, 2.9 Git, 2.10 Concurrency, 2.11 NoSQL | El contexto teórico que profundiza tu entendimiento | Optativo, intercalable con 2A |

2A es obligatorio y secuencial. 2B se puede intercalar con 2A (interleaving estratégico para pares conectados) o estudiar después.

**Interleaving estratégico permitido en 2A:**
- SQL (2.2) + TypeScript (2.3) se pueden intercalar — los tipos modelan la data que sale de la DB
- Performance (2.1) se estudía antes de SQL (2.2) — necesitás saber medir antes de optimizar queries

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — reescribir tabla de Etapa 2 con las dos sub-etapas
- Renombrar carpeta si es necesario

**Riesgo:** Medio. Reorganización visual que no cambia contenido pero sí la presentación y el orden percibido.

---

### 🟢 Mejora 10: Corregir errores de categorización ✅ COMPLETADA

**Problema:**

En `Plan de Estudio Pro Max.md` hay errores de categorización que confunden al estudiante sobre la naturaleza del tema:

- **2.1 — Performance Engineering** está categorizado como "Seguridad" → debería ser "Performance"
- **4.10 — Testing Backend y API** está categorizado como "Seguridad" → debería ser "Testing"

**Solución:**

Corregir los tipos en la tabla de Etapa 2 y Etapa 4.

**Archivos a modificar:**
- `Plan de Estudio Pro Max.md` — corregir tipo de 2.1 y 4.10

**Riesgo:** Muy bajo. Fix cosmético con impacto en claridad.

---

### 🟢 Mejora 11: Nota de honestidad sobre el timeline ❌ DEROGADA

**Problema:**

El timeline de 15 meses es optimista. 19 Core topics en ~600 horas da ~31 horas por tema Core, pero temas como Algoritmos (40-50h), DDD + Patrones (60+h), y AI Engineering (40+h) necesitan más. Además, FreePress como proyecto consume horas no contabilizadas.

**Solución:**

Agregar una nota de honestidad en lugar de reescribir todo el roadmap.

**Implementación concreta:**

Agregar en `METODOLOGIA.md`, sección "Tu Ritmo Realista":

> **Nota sobre el timeline:** 15 meses es el escenario optimista con ritmo consistente de 9-11 horas semanales. 18-24 meses es realista si tenés semanas con menos disponibilidad, si algún tema te lleva más tiempo del estimado, o si FreePress requiere más horas de las contabilizadas. No es un problema — la consistencia gana sobre la velocidad.

**Archivos a modificar:**
- `METODOLOGIA.md` — agregar nota en "Tu Ritmo Realista"

**Riesgo:** Muy bajo. Nota aditiva.

---

## Priorización de implementación

| Prioridad | Mejora | Archivos principales | Impacto | Esfuerzo |
|-----------|--------|---------------------|---------|----------|
| 🔴 Crítico | 1. Reordenar Etapa 1 | Plan de Estudio Pro Max.md, PROGRESO.md | Alto | Medio |
| 🔴 Crítico | 2. FreePress agnóstico | PROYECTOS.md, Plan de Estudio Pro Max.md | Alto | Medio |
| 🔴 Crítico | 3. Testing Fundamentals | Nuevo archivo 1.8, Plan de Estudio Pro Max.md, PROGRESO.md | Alto | Bajo |
| 🟡 Importante | 4. Spaced Repetition | METODOLOGIA.md, PROGRESO.md | Alto | Bajo |
| 🟡 Importante | 5. Niveles de profundidad | METODOLOGIA.md, PROGRESO.md | Medio | Bajo |
| 🟡 Importante | 6. AI Literacy | Nuevo archivo 1.9, Plan de Estudio Pro Max.md, PROGRESO.md | Medio | Bajo |
| 🟡 Importante | 7. Perfiles Sugeridos | Plan de Estudio Pro Max.md | Medio | Bajo |
| 🟡 Importante | 8. Retrospectiva Mensual | METODOLOGIA.md | Medio | Bajo |
| 🟢 Mejora | 9. Etapa 2 → 2A/2B | Plan de Estudio Pro Max.md | Medio | Medio |
| 🟢 Mejora | 10. Corregir categorización | Plan de Estudio Pro Max.md | Bajo | Muy bajo |
| 🟢 Mejora | 11. Nota de honestidad timeline | METODOLOGIA.md | Bajo | Muy bajo |

---

## Orden sugerido de implementación

1. 🔴 Crear mini-tema Testing Fundamentals (1.8) — archivo nuevo
2. 🔴 Crear mini-tema AI Literacy (1.9) — archivo nuevo
3. 🔴 Reescribir PROYECTOS.md (stack agnóstico + migración)
4. 🔴 Reordenar Etapa 1 en Plan de Estudio Pro Max.md y PROGRESO.md (código primero)
5. 🟡 Dividir Etapa 2 en 2A/2B en Plan de Estudio Pro Max.md
6. 🟡 Agregar Perfiles Sugeridos + nota timeline en Plan de Estudio Pro Max.md y METODOLOGIA.md
7. 🟡 Agregar spaced repetition + retrospectiva + niveles a METODOLOGIA.md
8. 🟡 Actualizar PROGRESO.md (niveles + último repaso)
9. 🟡 Actualizar Plan de Estudio Pro Max.md (reordenar + categorías + nuevos temas)
10. 🟢 Corregir errores de categorización

---

## Decisiones acordadas

- **FreePress agnóstico al inicio** (HTML + CSS + Express + SQLite), migrar a Angular + NestJS + PostgreSQL en Etapa 2. NO hacer "Ramp-up de Stack".
- **Interleaving solo entre pares con conexión explícita** (SQL + TypeScript). NO interleaving generalizado.
- **Documentación no se elimina de Etapa 1** — se reordena: código primero, mini-doc en paralelo, documentación completa al cierre.
- **"Perfiles Sugeridos"** (no "Tracks rígidos") para los 26 temas Advanced.
- **Nota de honestidad** sobre timeline en METODOLOGIA.md (sección Tu Ritmo Realista)’en lugar de reescribir todo el roadmap.

---

**Fecha de creación:** 10/05/2026
**Estado:** 🔲 Pendiente de implementación
