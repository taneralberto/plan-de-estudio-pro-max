# Mejoras Pendientes v5 — Plan de Estudio Pro Max

> Revisión crítica realizada el 21/04/2026
> Implementación completada el 21/04/2026
> **Estado:** ✅ TODAS las mejoras completadas

---

## Contexto de esta revisión

Esta revisión surge de una queja del usuario: *"siento que los temas están un poco dispersos"*. Se realizó un análisis completo del plan considerando:

1. **Las 4 revisiones anteriores** (v1-v4) y sus decisiones
2. **El problema de múltiples caminos** para responder "¿qué estudio mañana?"
3. **La dispersión de contenido** entre archivos diferentes
4. **La redundancia** de secciones que dicen lo mismo en lugares distintos

### Archivos revisados

- `Plan de Estudio Pro Max.md`
- `METODOLOGIA.md`
- `PROYECTOS.md`
- `PROGRESS.md`
- `Mejoras Pendientes/Mejoras Pendientes v1-v4.md`

---

## 🔴 El problema central: 4 mapas para el mismo territorio

El plan tiene **4 fuentes distintas** que responden a la misma pregunta ("¿qué estudio?") y están en **archivos diferentes**:

| Fuente | Ubicación | Qué contiene |
|--------|-----------|--------------|
| **"Por Dónde Empezar"** | `Plan de Estudio Pro Max.md` | Tabla corta semanas 1-9+ |
| **"Primeros 30 Días"** | `METODOLOGIA.md` | Explicación detallada semanas 1-8+ |
| **"Secuencia Recomendada"** | `Plan de Estudio Pro Max.md` | Tabla fases orden 1-10 |
| **"Core Path"** | `Plan de Estudio Pro Max.md` | Lista 19 temas esenciales |

### Por qué pasó esto

No fue un error de diseño inicial. Fue **acumulación de buenas ideas sin consolidación**:

- **v1 (Pasada 1-3):** Uniformó densidad, agregó temas faltantes, creó checkpoints
- **v2:** Agregó "Primeros 30 Días" en METODOLOGIA.md para resolver "tres respuestas distintas"
- **v3:** Creó Core Path vs Advanced Track para resolver scope creep
- **v4:** Agregó 2.0 Debugging Básico, estructuró Paso 2, agregó validación externa

Cada mejora resolvió un problema específico, pero **creó nuevas capas sin eliminar las anteriores**. El resultado: el usuario hoy no sabe qué camino seguir.

### La experiencia del usuario

Si alguien abre el plan hoy y pregunta "¿qué estudio mañana?", tiene que:

1. Leer "Por Dónde Empezar" en `Plan de Estudio Pro Max.md`
2. Saltar a `METODOLOGIA.md` para el detalle de las primeras semanas
3. Volver al plan principal para la "Secuencia Recomendada"
4. Cruzar con la lista "Core Path" para saber qué es esencial

**Eso no es un plan de estudio. Es un rompecabezas.**

---

## 🎯 Principio rector de la solución

> El estudiante debería poder abrir UN archivo, ver UN mapa, y saber exactamente qué estudiar mañana, la semana que viene, y el mes que viene. Sin saltar entre archivos, sin reconciliar múltiples tablas.

---

## La solución propuesta: UN solo camino, UN solo lugar

### Crear `ROADMAP.md` — La única fuente de verdad para el orden

Este archivo nuevo consolida TODO lo relacionado con "qué y cuándo estudiar":

- La secuencia completa de estudio
- Los primeros 30 días (detalle día por día)
- El Core Path explícito
- Los checkpoints por etapa
- La distinción clara entre etapas del aprendizaje

**El ROADMAP.md propuesto:**

```markdown
# 🗺️ Roadmap — Tu camino de estudio

> Este archivo es tu brújula. Abrilo cuando necesites saber "¿qué sigue?"

---

## El Camino en una Vista

| Etapa | Duración | Qué estudiás | Entregable clave |
|-------|----------|--------------|------------------|
| **Entrada** | Semanas 1-8 | Mentalidad + JS + Algoritmos + Auth | FreePress con auth funcionando |
| **Fundamentos** | Meses 3-6 | Seguridad, Performance, Bases de Datos | FreePress en producción |
| **Arquitectura** | Meses 7-10 | DDD, Patrones, Frontend avanzado | FreePress con arquitectura real |
| **Profundización** | Meses 11-15 | Infra, AI, Completitud | Ingeniero completo |

---

## Etapa 1: Entrada (Semanas 1-8)

El objetivo: victorias tangibles tempranas. Código que falla y se arregla.

### Semana 1 — Mentalidad

| Día | Qué hacer | Tiempo |
|-----|-----------|--------|
| 1-2 | `0.1 — Documentación Técnica` → Escribí tu primer ADR | 3h |
| 3-4 | `0.2 — Metodologías` → PRD borrador del editor | 3h |
| 5 | `0.3 — Soft Skills` → Lectura ligera | 2h |
| 6-7 | Crear repo FreePress, scaffold con Docker | 4h |

**Entregable:** Repo con `docker-compose up` funcional + ADR + PRD en `/docs`

### Semanas 2-3 — JS Internals + Scaffold

| Qué | Ejercicios clave |
|-----|------------------|
| `2.0 — Debugging Básico` | Chrome DevTools breakpoints, VS Code debugger |
| `2.1 — JS Internals` | 10 ejemplos event loop, closures, memory |
| FreePress scaffold | Angular + NestJS + PostgreSQL + Redis corriendo |

**Entregable:** FreePress local funcionando. Al menos 1 bug arreglado entendiendo JS.

### Semanas 4-6 — Algoritmos

| Qué | Ejercicios clave |
|-----|------------------|
| `1.1 — Estructuras y Algoritmos` | Implementar desde cero: HashMap, Stack, Queue, BST |
| Big O | Analizar 5 funciones de FreePress |
| Práctica | 5 ejercicios NeetCode Easy por estructura |

**Entregable:** Podés explicar Big O de cualquier función en 2 min.

### Semanas 7-8 — Auth (Seguridad básica)

| Qué | Ejercicios clave |
|-----|------------------|
| `5.1 — Seguridad` (enfocado en auth) | JWT, refresh tokens, RBAC |
| Aplicar en FreePress | Login, logout, endpoints protegidos |

**Entregable:** FreePress con auth funcional. Tests de integración para el flujo.

---

## Etapa 2: Fundamentos (Meses 3-6)

Ahora tenés FreePress funcionando + auth. Los fundamentos tienen contexto.

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `5.2 — Performance Engineering` | ✅ | Profiling antes de optimizar |
| 2 | `7.1 — SQL y Modelado Relacional` | ✅ | Bases de datos bien hechas |
| 3 | Continuar Fase 1: `1.2 SO`, `1.3 Redes` | — | Con contexto práctico |

**Checkpoint de etapa:** FreePress con índices, queries optimizadas, y profiling básico.

---

## Etapa 3: Arquitectura (Meses 7-10)

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `3.1 — DDD` | ✅ | Bounded Contexts antes de patrones |
| 2 | `3.2 — Patrones de Arquitectura` | ✅ | Clean Architecture, microservicios |
| 3 | `6.1 — Cómo funciona el Browser` | ✅ | Render pipeline, debugging frontend |
| 4 | `6.2 — State Management` | — | NgRx, signals, según stack |

**Checkpoint de etapa:** FreePress refactorizado con arquitectura de capas, Context Map documentado.

---

## Etapa 4: Profundización (Meses 11-15)

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `4.1 — Containerización` | ✅ | Dockerfile optimizado, security |
| 2 | `4.5 — CI/CD` | ✅ | Pipeline automatizado |
| 3 | `4.6 — Observabilidad` | ✅ | Logs, métricas, traces |
| 4 | `8.2 — AI Engineering` | ✅ | Construir con AI, no solo usarla |
| 5 | `9.2 — Debugging Avanzado` | ✅ | Memory leaks, profiling profundo |
| 6 | `9.5 — Code Review` | ✅ | Evaluar código (propio, ajeno, AI) |

**Checkpoint final:** FreePress en producción real, con CI/CD, observabilidad, y AI features.

---

## El Core Path (19 temas esenciales)

Estos son los temas marcados con ✅ arriba. Completarlos = "graduarte" del plan.

> Tiempo estimado: 12-15 meses a ritmo sostenido (2-3 horas, 3-4 días/semana)

**Lista completa:**

1. `0.1 — Documentación Técnica` 🔴
2. `0.2 — Metodologías y Procesos` 🔴
3. `0.3 — Soft Skills Técnicos` 🟡
4. `1.1 — Estructuras de Datos y Algoritmos` 🔴
5. `2.0 — Debugging Básico` 🔴
6. `2.1 — JavaScript Internals` 🔴
7. `2.2 — TypeScript Avanzado` 🔴
8. `5.1 — Seguridad Aplicada` 🔴
9. `5.2 — Performance Engineering` 🔴
10. `7.1 — SQL y Modelado Relacional` 🔴
11. `3.1 — Domain-Driven Design` 🔴
12. `3.2 — Patrones de Arquitectura` 🔴
13. `4.1 — Containerización Avanzada` 🔴
14. `4.5 — CI/CD` 🔴
15. `4.6 — Observabilidad` 🔴
16. `6.1 — Cómo funciona el Browser` 🔴
17. `8.2 — AI Engineering` 🔴
18. `9.2 — Debugging Avanzado` 🔴
19. `9.5 — Code Review` 🔴

---

## El Advanced Track

Todo lo que NO está en el Core Path arriba. Se explora según:
- Dirección de carrera (más frontend vs más backend vs más infra)
- Interés personal
- Requerimientos del trabajo actual

**No son deuda pendiente. Son profundización optativa.**

| Fase | Temas Advanced | Cuándo explorar |
|------|----------------|-----------------|
| Fase 1 | `1.2 SO`, `1.3 Redes`, `1.4 Paradigmas`, `1.5 Linux` | Si querés ir más profundo en fundamentos |
| Fase 2 | `2.3 Build Tools`, `2.4 Git Avanzado`, `2.5 Concurrency` | Cuando necesités herramientas específicas |
| Fase 3 | `3.3 System Design`, `3.4 API Design`, `3.5 Messaging`, `3.6 Distribuidos` | Si tu rol requiere arquitectura avanzada |
| Fase 4 | `4.2 K8s`, `4.3 IaC`, `4.4 Cloud` | Si te orientás a DevOps/Platform |
| Fase 5 | `5.3 Testing Backend` | Para profundizar testing |
| Fase 6 | `6.2 State Management`, `6.3 a11y`, `6.4 Testing Frontend` | Si te especializás en frontend |
| Fase 7 | `7.2 NoSQL`, `7.3 Migrations` | Para data engineering avanzado |
| Fase 8 | `8.1 ML Fundamentals`, `8.3 Proyectos AI` | Si querés profundizar en AI |
| Fase 9 | `9.1 Open Source`, `9.3 Deuda Técnica`, `9.4 Temas Avanzados` | Complementos de carrera |
```

---

## Cambios a archivos existentes

### `Plan de Estudio Pro Max.md` — Limpiar

**Eliminar:**
- [ ] Sección "🚀 Por Dónde Empezar" → Está en ROADMAP.md
- [ ] Sección "Secuencia Recomendada" → Está en ROADMAP.md
- [ ] Tabla "Core Path vs Advanced Track" → Mover referencia conceptual, el detalle está en ROADMAP.md

**Conservar:**
- [ ] Filosofía del plan
- [ ] Sección "Fundamentos vs AI"
- [ ] Las 10 Fases (catálogo: qué contiene cada una)
- [ ] Leyenda
- [ ] Referencia a ROADMAP.md al inicio

**Propósito final:** Este archivo queda como **catálogo de fases** (qué contiene cada una), no como roadmap de orden.

---

### `METODOLOGIA.md` — Limpiar

**Eliminar:**
- [ ] Sección "Primeros 30 Días" completa → Está en ROADMAP.md

**Conservar:**
- [ ] La Regla de AI
- [ ] El Ciclo de Aprendizaje (4 pasos)
- [ ] Cómo se ve el ciclo en tiempo real
- [ ] Qué es una sesión bien usada
- [ ] Ritmo Realista
- [ ] Checkpoints por Fase
- [ ] Temas Transversales (Testing, Debugging, Validación externa, Evaluar código AI)
- [ ] Cómo retomar si se interrumpe

**Propósito final:** Este archivo queda como **cómo estudiar** (el método), no como **qué estudiar** (el orden).

---

### Archivos sin cambios

| Archivo | Sin cambios porque... |
|---------|----------------------|
| `PROGRESS.md` | Tracking de progreso, no de orden |
| `PROYECTOS.md` | Descripción de proyectos, no de secuencia |
| `RECURSOS.md` | Lista de recursos, no de orden |
| Archivos de fases (0-9) | Contenido de temas, sin cambios |

---

## Secuencia optimizada

Aprovechando esta consolidación, se propone un cambio en la secuencia:

### Secuencia actual (problemática)

```
0 → 2 → 1 → 5 → 7 → 3 → 6 → 4 → 8 → 9
```

**Problema:** `2.0 — Debugging Básico` se agregó en v4, pero debería ir **ANTES** de `2.1 — JS Internals`. No podés debuggear JS internals si no sabés usar el debugger.

### Secuencia optimizada

```
FASE 0: Mentalidad
├── 0.1 — Documentación Técnica
├── 0.2 — Metodologías y Procesos
└── 0.3 — Soft Skills Técnicos
    ↓
FASE 2 (parcial): Debugging + JS
├── 2.0 — Debugging Básico ← ANTES de JS Internals
└── 2.1 — JavaScript Internals
    ↓
FASE 1 (parcial): Algoritmos
└── 1.1 — Estructuras de Datos y Algoritmos
    ↓
FASE 5 (parcial): Auth
└── 5.1 — Seguridad (enfocado en auth)
    ↓
═══════════════════════════════════════
CHECKPOINT: FreePress con auth funcionando
═══════════════════════════════════════
    ↓
FASE 1 (completa): SO y Redes
├── 1.2 — Sistemas Operativos
└── 1.3 — Redes en Profundidad
    ↓
FASE 5 (completa): Performance + Testing
├── 5.2 — Performance Engineering
└── 5.3 — Testing Backend
    ↓
FASE 7: Bases de Datos
└── 7.1 — SQL y Modelado Relacional
    ↓
FASE 2 (completa): TypeScript + Build
├── 2.2 — TypeScript Avanzado
└── 2.3 — Build Tools
    ↓
FASE 3: Arquitectura
├── 3.1 — Domain-Driven Design
└── 3.2 — Patrones de Arquitectura
    ↓
FASE 6: Frontend
├── 6.1 — Cómo funciona el Browser
└── 6.2 — State Management
    ↓
FASE 4: Infraestructura
├── 4.1 — Containerización
├── 4.5 — CI/CD
└── 4.6 — Observabilidad
    ↓
FASE 8: AI
└── 8.2 — AI Engineering
    ↓
FASE 9: Completitud
├── 9.2 — Debugging Avanzado
└── 9.5 — Code Review
```

---

## El resultado final: Una pregunta → Un archivo

| Pregunta | Archivo a abrir |
|----------|-----------------|
| "¿Qué estudio mañana?" | `ROADMAP.md` |
| "¿Cómo estudio esto?" | `METODOLOGIA.md` |
| "¿Qué contiene la Fase 3?" | `Plan de Estudio Pro Max.md` |
| "¿En qué estaba?" | `PROGRESS.md` |
| "¿Qué es FreePress?" | `PROYECTOS.md` |

---

## Archivos a crear/modificar

| Acción | Archivo | Qué hacer |
|--------|---------|-----------|
| **Crear** | `ROADMAP.md` | Nuevo archivo con el roadmap consolidado |
| **Modificar** | `Plan de Estudio Pro Max.md` | Eliminar "Por Dónde Empezar", "Secuencia Recomendada", tabla Core Path. Agregar referencia a ROADMAP.md |
| **Modificar** | `METODOLOGIA.md` | Eliminar "Primeros 30 Días" |

---

## Checklist de implementación

### Paso 1: Crear ROADMAP.md
- [x] Crear archivo `ROADMAP.md` en la raíz del proyecto
- [x] Copiar el contenido propuesto arriba
- [x] Verificar que todos los links a temas funcionen

### Paso 2: Modificar Plan de Estudio Pro Max.md
- [x] Eliminar sección "🚀 Por Dónde Empezar"
- [x] Eliminar sección "Secuencia Recomendada"
- [x] Mantener tabla "Core Path vs Advanced Track" (referencia conceptual)
- [x] Agregar al inicio (después de filosofía): referencia a ROADMAP.md

### Paso 3: Modificar METODOLOGIA.md
- [x] Eliminar sección completa "Primeros 30 Días"
- [x] Verificar que el archivo siga teniendo sentido sin esa sección

### Paso 4: Actualizar referencias cruzadas
- [x] Verificar que PROGRESS.md no tenga referencias rotas
- [x] Verificar que PROYECTOS.md no tenga referencias rotas
- [x] ROADMAP.md incluye navegación a otros archivos

---

## Riesgos a considerar

| Riesgo | Mitigación |
|--------|------------|
| Links rotos desde otros archivos | Buscar referencias a "Primeros 30 Días" y "Secuencia Recomendada" antes de eliminar |
| El usuario extraña la tabla de secuencia | La tabla de secuencia vive en ROADMAP.md, no se pierde |
| Confusión durante transición | Agregar callout temporal en archivos modificados indicando el cambio |

---

## Notas para futuras sesiones

1. Esta es una **consolidación**, no una reescritura del contenido. El contenido técnico de los temas NO cambia.
2. La secuencia optimizada pone `2.0 — Debugging Básico` ANTES de `2.1 — JS Internals`. Esto es un cambio respecto a v4 donde se agregó 2.0 pero no se ajustó el orden.
3. Si el usuario quiere mantener algo de lo que se elimina (ej: la tabla de secuencia en el plan principal), evaluar si realmente aporta valor o si es resistencia al cambio.
4. Después de implementar, el usuario debería poder abrir solo `ROADMAP.md` y tener todo lo que necesita para saber qué estudiar.

---

## Contexto de decisiones anteriores (para referencia)

| Decisión anterior | Dónde se documentó | Si se revierte |
|-------------------|-------------------|----------------|
| No renumerar fases | v3 Mejora 5, v4 Mejora 1 | Se mantiene. ROADMAP organiza sin tocar numeración |
| Testing en 5.3 + 6.4 | v3 Mejora 2 | Se mantiene. ROADMAP solo organiza el orden |
| Core Path vs Advanced Track | v3 Mejora 1 | Se mantiene. ROADMAP consolida la lista |
| "Primeros 30 Días" en METODOLOGIA.md | v2 Mejora 1 | **Se revierte.** Se mueve a ROADMAP.md |
| 2.0 Debugging Básico como CORE | v4 Mejora 5 | Se mantiene. ROADMAP lo integra en el orden correcto |

---

## 🟡 Mejoras adicionales identificadas

Además de la consolidación del roadmap, se identificaron estos problemas durante la revisión:

---

### Mejora A: Redundancia real entre archivos

Hay contenido **duplicado** (no solo referenciado) en múltiples lugares:

#### A.1 Metodología de debugging duplicada

| Ubicación | Contenido |
|-----------|-----------|
| `2.0 — Debugging Básico` | "La metodología de debugging — No es adivinar" (5 pasos) |
| `9.2 — Debugging Avanzado` | "Debugging sistemático — No 'cambiar cosas a ver si funciona'" (mismo contenido) |

Ambos tienen:
- Reproducir → Reducir → Formular hipótesis → Testear → Repetir
- Referencia al libro de David Agans
- Énfasis en no "probar cosas al azar"

**Solución propuesta:**
- Mantener el contenido completo en `2.0 — Debugging Básico`
- En `9.2 — Debugging Avanzado`, reemplazar la sección de metodología con: *"Para la metodología de debugging (reproducir, reducir, hipótesis, testear), ver `2.0 — Debugging Básico`. Acá nos enfocamos en herramientas avanzadas: strace, Wireshark, memory profiling."*

#### A.2 "Evaluar código AI" duplicado

| Ubicación | Contenido |
|-----------|-----------|
| `METODOLOGIA.md` → Temas Transversales | Sección "Evaluar código AI — Tu nueva responsabilidad" |
| `9.5 — Code Review` | "Revisar código generado por AI — Patrones de error típicos" |

Ambos tienen:
- Checklist de verificación antes de aceptar código AI
- Ejercicio de "bug hunt" obligatorio
- Patrones de error típicos (over-confidence, hallucinated APIs, etc.)

**Solución propuesta:**
- Mantener el contenido completo en `9.5 — Code Review` (es el lugar natural)
- En `METODOLOGIA.md`, reemplazar la sección completa con: *"Para evaluar código generado por AI, ver `9.5 — Leer Código Ajeno y Code Review` → sección 'Revisar código generado por AI'. Acá solo la regla: cada línea que aceptás, LA APROBASTE VOS."*

#### A.3 Regla de AI mencionada en múltiples lugares

| Ubicación | Qué tiene |
|-----------|-----------|
| `Plan de Estudio Pro Max.md` | Callout con regla resumida + referencia a METODOLOGIA.md |
| `METODOLOGIA.md` | "La Regla de AI" con detalle completo |
| `0.2 — Metodologías y Procesos` | "La AI como herramienta de desarrollo" con la misma regla |

Esto es menos problemático porque son **niveles de detalle** (resumen vs detalle), no duplicación idéntica. Pero `0.2` tiene contenido muy similar a `METODOLOGIA.md`.

**Solución propuesta:**
- Mantener callout resumen en `Plan de Estudio Pro Max.md`
- Mantener "La Regla de AI" en `METODOLOGIA.md` como fuente de verdad
- En `0.2`, reemplazar la sección de AI con referencia: *"Para la regla completa de uso de AI durante el aprendizaje, ver `METODOLOGIA.md` → 'La Regla de AI'. Acá nos enfocamos en metodologías de equipo."*

---

### Mejora B: Fase 8 es demasiado densa

`8.2 — AI Engineering 🔴` tiene **5 subtemas enormes**, cada uno merecería ser su propio tema:

1. API de Claude/OpenAI — Uso profesional
2. Evaluación de outputs de LLMs (Evals)
3. Agentic Patterns avanzados
4. AI Safety y Responsible AI
5. Prompts para arquitectura

**Problemas adicionales:**
- "Prompts para arquitectura" es un skill **transversal**, no específico de AI. Aparece en la fase 8 pero se aplica a TODO el plan.
- 8.1 (ML Fundamentals) y 8.3 (Proyectos AI) son [ADVANCED], pero 8.2 tiene que cargar con todo el peso de "AI Engineering".

**Soluciones propuestas:**

**Opción A — Dividir 8.2 en dos archivos:**
- `8.2 — AI Engineering 🔴`: API profesional + Evals + Agentes + Safety (4 subtemas)
- `8.4 — Prompts para Arquitectura 🟡`: Mover el quinto subtema a archivo propio, marcar como [ADVANCED]

**Opción B — Mantener un archivo pero clarificar scope:**
- Dejar 8.2 como está, pero agregar nota: *"Este tema es denso. Se recomienda dividirlo en 2-3 semanas de estudio, un subtema por semana."*
- Mover "Prompts para arquitectura" a METODOLOGIA.md como tema transversal

**Recomendación:** Opción A es más limpia estructuralmente.

---

### Mejora C: Huecos conceptuales en el plan

Hay conceptos **implícitos pero no explícitos** que el plan asume pero nunca enseña:

#### C.1 SOLID Principles

**Dónde se menciona:** Solo en `9.5 — Code Review` como referencia en un prompt: "Buscá violaciones de SOLID principles".

**El problema:** El plan nunca EXPLICA qué son SOLID, sus 5 principios, ni cómo aplicarlos. Para un plan que dice "conceptos primero, herramientas después", esto es un hueco.

**Por qué importa:** SOLID es la base para:
- Entender por qué ciertos code smells son problemas
- Diseñar clases y módulos que se puedan modificar sin romper
- Entender la Dependency Rule de Clean Architecture (mencionada en 3.1 sin explicación previa)

**Solución propuesta:**
- Agregar como sección en `3.2 — Patrones de Arquitectura Avanzados`, ANTES de Clean Architecture
- O crear tema nuevo `3.0 — SOLID Principles 🔴` como prerrequisito de arquitectura

**Contenido mínimo:**
```markdown
- [ ] **SOLID Principles**

Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. 
No como acrónimo para entrevistas — como principios que determinan si tu código 
se puede modificar sin romper todo lo demás.

**Por qué importa:** Sin SOLID, "Clean Architecture" y "DDD" son palabras vacías. 
La Dependency Rule de Clean Architecture ES el Dependency Inversion Principle aplicado a arquitectura.

**Ejercicio:** Tomá una clase de FreePress que tenga más de una responsabilidad. 
Identificá qué hace cada método. Separá en clases distintas siguiendo SRP.

**Done cuando:** Podés mirar una clase y decir si viola algún principio SOLID, 
cuál, y cómo refactorizarla.
```

#### C.2 Clean Architecture / Hexagonal Architecture basics

**Dónde se menciona:** `3.1 — DDD` menciona "Dependency Rule" sin explicarla. `3.2 — Patrones de Arquitectura` menciona "Clean Architecture" pero presupone que el lector ya la conoce.

**El problema:** DDD presupone que entendés arquitectura de capas y dependency inversion. Sin esa base, Bounded Contexts y Context Mapping quedan flotando sin fundamento.

**Solución propuesta:**
- Asegurar que `3.2 — Patrones de Arquitectura` TENGA una sección de "Clean Architecture basics" ANTES de entrar en microservicios
- Incluir: Entities, Use Cases, Interface Adapters, Frameworks & Drivers, y por qué las dependencias apuntan hacia adentro

#### C.3 Testing Fundamentals

**Dónde está:** Testing aparece como práctica desde Fase 2 (v4 agregó esto), y los temas 5.3 y 6.4 cubren testing. Pero NUNCA hay un "qué es un test, tipos de tests, cuándo escribir cuál".

**El problema:** El plan dice "escribí tests desde el día 1" pero no enseña QUÉ es un test hasta la Fase 5.

**Solución propuesta:**
- Agregar sección introductoria en `5.3 — Testing Backend y API` ANTES de entrar en testing backend específico
- Contenido: "Qué es un test", "Test unitario vs integración vs E2E", "Testing Trophy vs Pirámide", "Qué testear y qué NO testear"

---

### Checklist de implementación para mejoras adicionales

#### Mejora A (Redundancia)
- [x] `9.2 — Debugging Avanzado`: Reemplazar sección metodología con referencia a 2.0 ✅
- [x] `METODOLOGIA.md`: Reemplazar sección "Evaluar código AI" con referencia a 9.5 ✅
- [x] `0.2 — Metodologías`: Verificado — ya tiene solo resumen + referencia a METODOLOGIA.md ✅

#### Mejora B (Fase 8 densa)
- [x] Opción elegida: Mover "Prompts para arquitectura" a nota de referencia transversal ✅
- [x] Eliminar sección ~40 líneas, reemplazar con nota corta ✅

#### Mejora C (Huecos conceptuales)
- [x] `3.2 — Patrones de Arquitectura`: Agregar sección SOLID antes de Clean Architecture ✅
- [x] `5.3 — Testing Backend`: Agregar sección introductoria "Testing Fundamentals" ✅

---

## Priorización sugerida

| Prioridad | Mejora | Estado |
|-----------|--------|--------|
| ✅ **Completada** | Consolidación ROADMAP | ✅ Implementado |
| ✅ **Completada** | Mejora A (redundancia) | ✅ Implementado |
| ✅ **Completada** | Mejora C.1 (SOLID) | ✅ Implementado |
| ✅ **Completada** | Mejora B (Fase 8) | ✅ Implementado |
| ✅ **Completada** | Mejora C.3 (Testing fundamentals) | ✅ Implementado |

**Todas las mejoras fueron implementadas el 21/04/2026.**

---

**Fecha de creación:** 21/04/2026
**Estado:** 🔴 Pendiente de implementación
**Prioridad:** Alta — afecta la usabilidad fundamental del plan
