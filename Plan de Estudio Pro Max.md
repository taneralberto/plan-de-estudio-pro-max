# Plan de Estudio Pro Max

> 🎯 **Filosofía:** Los conceptos PRIMERO, las herramientas DESPUÉS. No se toca código hasta entender el PORQUÉ. Cada fase construye sobre la anterior — no saltes fases.
>
> 🤖 **Regla de AI:** Primero lo construís vos. Después la AI puede entrar. [Ver detalle →](METODOLOGIA.md#la-regla-de-ai)
>
> 🗺️ **¿Qué estudio y cuándo?** Ver [ROADMAP.md →](ROADMAP.md) — tu mapa completo del camino.

---

## 🤖 Fundamentos vs AI — ¿Por qué aprender si la AI lo hace?

La pregunta que todos se hacen: *"¿Por qué aprender algoritmos si la AI puede implementarlos?"*

**La respuesta corta:** La AI puede implementar, pero no puede decidir CUÁNDO ni CÓMO para TU contexto específico.

### Lo que la AI SÍ puede hacer

- Implementar un HashMap, un QuickSort, un sistema de caching
- Generar código que compile y funcione para casos comunes
- Explicar conceptos con ejemplos
- Escribir tests si le pedís

### Lo que la AI NO puede hacer

| Limitación | Ejemplo |
|------------|---------|
| **Decidir arquitectura** | No sabe si tu caso necesita un HashMap vs un Trie vs un B-Tree — necesita contexto que no tiene |
| **Detectar su propio error** | Puede generar código con bugs y no darse cuenta (hallucinations, APIs inexistentes) |
| **Entender tu proyecto** | No conoce tus convenciones, tu deuda técnica, tus tradeoffs históricos |
| **Evaluar tradeoffs** | Puede listar opciones, pero no sabe cuál es mejor PARA VOS |

### El conocimiento que TE sirve

1. **Evaluar código AI** — ¿Es correcto? ¿Respeta tu arquitectura? ¿Tiene los patrones de error típicos?
2. **Detectar hallucinations** — APIs que no existen, parámetros inventados, edge cases ignorados
3. **Tomar decisiones** — La AI propone, vos decidís. Pero para decidir necesitás saber.
4. **Promptar mejor** — "Implementá X siguiendo el patrón que usamos en [archivo]" solo funciona si entendés el patrón.

### La realidad de 2026

- La AI va a estar presente en tu trabajo desde el día 1
- La regla "primero vos, después AI" es para el APRENDIZAJE — no es negación de la realidad
- El objetivo: ser el humano que sabe **qué pedirle, cómo verificarlo, y qué decidir**

**Leer también:** `9.5 — Leer Código Ajeno y Code Review 🔴` incluye una sección específica sobre revisar código generado por AI.

---

## Las 10 Fases

### Fase 0 — Mentalidad y Proceso de Ingeniería 🧠

El framework mental que separa un programador de un ingeniero.

- [[Fase 0 — Mentalidad y Proceso/0.1 — Documentación Técnica Profesional 🔴]] **[CORE]**
- [[Fase 0 — Mentalidad y Proceso/0.2 — Metodologías y Procesos 🔴]] **[CORE]**
- [[Fase 0 — Mentalidad y Proceso/0.3 — Soft Skills Técnicos 🟡]] **[CORE]**

---

### Fase 1 — Ciencias de la Computación que te Salteaste ⚠️

La deuda técnica más grande. Algoritmos, SO, redes. Es duro pero es la base de TODO.

- [[Fase 1 — CS Fundamentals/1.1 — Estructuras de Datos y Algoritmos 🔴]] **[CORE]**
- [[Fase 1 — CS Fundamentals/1.2 — Sistemas Operativos (Profundizar) 🔴]] *[ADVANCED]*
- [[Fase 1 — CS Fundamentals/1.3 — Redes en Profundidad 🔴]] *[ADVANCED]*
- [[Fase 1 — CS Fundamentals/1.4 — Paradigmas de Programación 🟡]] *[ADVANCED]*
- [[Fase 1 — CS Fundamentals/1.5 — Linux y Shell Productivo 🟡]] *[ADVANCED]*

---

### Fase 2 — Dominio Profundo del Lenguaje y Runtime 🔥

De "usuario del lenguaje" a "entender la máquina por debajo".

- [[Fase 2 — Lenguaje y Runtime/2.0 — Debugging Básico 🔴]] **[CORE]**
- [[Fase 2 — Lenguaje y Runtime/2.1 — JavaScript Internals 🔴]] **[CORE]**
- [[Fase 2 — Lenguaje y Runtime/2.2 — TypeScript Avanzado 🔴]] **[CORE]**
- [[Fase 2 — Lenguaje y Runtime/2.3 — Build Tools y Module Bundlers 🟡]] *[ADVANCED]*
- [[Fase 2 — Lenguaje y Runtime/2.4 — Git Avanzado y Modelo de Objetos 🟡]] *[ADVANCED]*
- [[Fase 2 — Lenguaje y Runtime/2.5 — Concurrency y Parallelism 🟡]] *[ADVANCED]*

---

### Fase 3 — Arquitectura y Diseño de Sistemas 🏗️

Patrones y decisiones que definen sistemas que escalan y sobreviven años en producción.

- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.1 — Domain-Driven Design (DDD) 🔴]] **[CORE]**
- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.2 — Patrones de Arquitectura Avanzados 🔴]] **[CORE]**
- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.3 — System Design en Profundidad 🔴]] *[ADVANCED]*
- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.4 — API Design 🔴]] *[ADVANCED]*
- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.5 — Messaging y Event Streaming 🟡]] *[ADVANCED]*
- [[Fase 3 — Arquitectura y Diseño de Sistemas/3.6 — Sistemas Distribuidos 🔴]] *[ADVANCED]*

---

### Fase 4 — Infraestructura, DevOps y Cloud ☁️

Diseñar, desplegar, monitorear y mantener sistemas en producción.

- [[Fase 4 — Infraestructura, DevOps y Cloud/4.1 — Containerización Avanzada 🔴]] **[CORE]**
- [[Fase 4 — Infraestructura, DevOps y Cloud/4.2 — Orquestación de Containers 🟡]] *[ADVANCED]*
- [[Fase 4 — Infraestructura, DevOps y Cloud/4.3 — Infrastructure as Code (IaC) 🟡]] *[ADVANCED]*
- [[Fase 4 — Infraestructura, DevOps y Cloud/4.4 — Cloud Fundamentals 🔴]] *[ADVANCED]*
- [[Fase 4 — Infraestructura, DevOps y Cloud/4.5 — CI-CD (Integración y Entrega Continua) 🔴]] **[CORE]**
- [[Fase 4 — Infraestructura, DevOps y Cloud/4.6 — Observabilidad (Los 3 Pilares) 🔴]] **[CORE]**

---

### Fase 5 — Seguridad y Performance 🔒

Dos áreas que la mayoría de devs ignoran hasta que algo explota.

- [[Fase 5 — Seguridad y Performance/5.1 — Seguridad Aplicada 🔴]] **[CORE]**
- [[Fase 5 — Seguridad y Performance/5.2 — Performance Engineering 🔴]] **[CORE]**
- [[Fase 5 — Seguridad y Performance/5.3 — Testing Backend y API 🔴]] *[ADVANCED]*

---

### Fase 6 — Frontend Avanzado 🎨

Ingeniería frontend seria: state management, rendering pipelines, accesibilidad.

- [[Fase 6 — Frontend Avanzado/6.1 — Cómo funciona el Browser 🔴]] **[CORE]**
- [[Fase 6 — Frontend Avanzado/6.2 — State Management 🔴]] *[ADVANCED]*
- [[Fase 6 — Frontend Avanzado/6.3 — Accesibilidad (a11y) 🟡]] *[ADVANCED]*
- [[Fase 6 — Frontend Avanzado/6.4 — Testing Frontend 🟡]] *[ADVANCED]*

---

### Fase 7 — Bases de Datos en Profundidad 🗄️

Modelado avanzado, diferentes paradigmas, cuándo usar cada uno.

- [[Fase 7 — Bases de Datos en Profundidad/7.1 — SQL y Modelado Relacional 🔴]] **[CORE]**
- [[Fase 7 — Bases de Datos en Profundidad/7.2 — Bases de Datos No-Relacionales 🟡]] *[ADVANCED]*
- [[Fase 7 — Bases de Datos en Profundidad/7.3 — Data Migrations y Schema Evolution 🔴]] *[ADVANCED]*

---

### Fase 8 — AI y Agentes 🤖

Construir con AI, no solo "usarla". RAG, agentes, evals, safety.

- [[Fase 8 — AI y Agentes/8.1 — Fundamentos de ML-AI que necesitás como Dev 🟡]] *[ADVANCED]*
- [[Fase 8 — AI y Agentes/8.2 — AI Engineering (la nueva disciplina) 🔴]] **[CORE]**
- [[Fase 8 — AI y Agentes/8.3 — Construir con AI — Proyectos reales 🔴]] *[ADVANCED]*

---

### Fase 9 — El Programador Completo 🌟

Los temas que hacen la diferencia entre un buen programador y un ingeniero COMPLETO.

- [[Fase 9 — El Programador Completo/9.1 — Open Source 🟡]] *[ADVANCED]*
- [[Fase 9 — El Programador Completo/9.2 — Debugging Avanzado 🔴]] **[CORE]**
- [[Fase 9 — El Programador Completo/9.3 — Mantenibilidad y Deuda Técnica 🟡]] *[ADVANCED]*
- [[Fase 9 — El Programador Completo/9.4 — Temas que Pocos Dominan 🟢]] *[ADVANCED]*
- [[Fase 9 — El Programador Completo/9.5 — Leer Código Ajeno y Code Review 🔴]] **[CORE]**

---

## Temas Transversales

Algunos temas se practican a lo largo de todo el plan, no en una fase única:

### Testing

- `5.3 — Testing Backend y API 🔴` — marco conceptual + backend
- `6.4 — Testing Frontend 🟡` — continuación natural para frontend

**Estudiarlos como unidad.** El marco conceptual de 5.3 aplica igual al frontend.

### Debugging y Mantenibilidad

- `9.2 — Debugging Avanzado 🔴` — leelo antes de tu primer bug difícil en FreePress
- `9.3 — Mantenibilidad y Deuda Técnica 🟡` — leelo antes de construir FreePress en serio

Los hábitos se forman desde el día 1, no se aprenden al final.

---

## Proyectos de Práctica

**FreePress** es el proyecto principal donde aplicás el 80% del plan. Un CMS/Blog open source que crece con tu aprendizaje.

Ver detalle completo: [PROYECTOS.md →](PROYECTOS.md)

---

## Recursos

Libros, cursos, plataformas y newsletters que aplican a todo el plan.

Ver listado completo: [RECURSOS.md →](RECURSOS.md)

---

## Cómo Estudiar

El método de 4 pasos, cómo se ve en tiempo real, qué es una sesión bien usada, checkpoints por fase.

Ver metodología completa: [METODOLOGIA.md →](METODOLOGIA.md)

---

## Progreso

Trackeo de temas completados, sesiones de estudio y estadísticas.

**Ver:** [PROGRESS.md →](PROGRESS.md)

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| 🔴 | **Crítico** — no avanzar sin dominar |
| 🟡 | **Importante** — estudiar bien, no bloquea |
| 🟢 | **Complementario** — profundizar cuando haya tiempo |
| 🔵 | **Proyecto satélite** — práctica complementaria |
| **[CORE]** | **Core Path** — tema esencial del plan (19 en total) |
| *[ADVANCED]* | *Advanced Track* — profundización optativa |

**Regla de oro:** no marques un tema como completado hasta que puedas EXPLICARLO a otro programador sin mirar apuntes.
