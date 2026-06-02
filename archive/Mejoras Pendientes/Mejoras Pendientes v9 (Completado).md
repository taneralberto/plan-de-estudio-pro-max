# Mejoras Pendientes v9 — Plan de Estudio Pro Max

> Revisión de consistencia, claridad y simplificación. Surge de un análisis cruzado de METODOLOGIA, PROYECTOS, README y ROADMAP.
> **Estado:** ✅ Completada (10/10)

---

## Decisión estructural: FreePress es OPCIONAL

FreePress deja de ser el proyecto obligatorio del plan y pasa a ser un **projeto de seguimiento opcional** para quienes quieran constatar el conocimiento con un proyecto continuo. El "Done cuando" de cada tema ya es autosuficiente como criterio de dominio, y el Checkpoint Social es refuerzo.

Esto afecta múltiples archivos y es el cambio más grande de esta versión — el resto de las mejoras se construyen sobre esta decisión.

---

## Nuevo formato de subtemas

Cada subtema dentro de cada archivo de tema pasa de tener **Ejercicio** y **Done cuando** a tener tres secciones:

```
**<span style="color: #29B6F6">Ejercicio</span>:** descripción universal del ejercicio (no menciona FreePress)

**<span style="color: #FFA726">FreePress</span>:** aplicación específica en FreePress (o el mini-proyecto satélite que corresponda).
Omitir esta línea si el tema no tiene aplicación natural en ningún proyecto.

**Done cuando:** criterio universal de dominio. No menciona FreePress ni ningún proyecto específico.
```

- **Ejercicio** (azul `#29B6F6`):Universal. Funciona para cualquier persona siguiendo el plan.
- **FreePress** (naranja `#FFA726`):Opcional. Solo para quienes sigan el proyecto. Se omite en temas donde no aplica naturalmente.
- **Done cuando**: Universal y primario. Es el criterio REAL de completitud. No depende de ningún proyecto.

### Ejemplo del cambio (subtema de 1.2 — Debugging Básico)

**Antes:**

```
**Ejercicio:** Configurá debugging en VS Code para el backend de FreePress.
Agregá un bug en un endpoint (ej: retorna 500 en ciertas condiciones). Usá el
debugger de VS Code para encontrar el origen del problema, con breakpoints y
variable inspection.

**Done cuando:** Tenés configurado debugging en VS Code para el backend de
FreePress y podés debuggear un problema en un endpoint sin agregar
`console.log` al código.
```

**Después:**

```
**<span style="color: #29B6F6">Ejercicio</span>:** Configurá debugging en VS Code para un proyecto Node.js.
Agregá un bug en un endpoint (ej: retorna 500 en ciertas condiciones). Usá el
debugger de VS Code para encontrar el origen del problema con breakpoints y
variable inspection.

**<span style="color: #FFA726">FreePress</span>:** Hacé este ejercicio directamente en el backend de FreePress
— los endpoints de artículos y auth son candidatos ideales.

**Done cuando:** Podés debuggear un endpoint de Node.js con el debugger de VS Code,
inspeccionar variables y call stack, sin agregar `console.log` al código.
```

### Ejemplo donde FreePress NO aplica (subtema teórico)

```
**<span style="color: #29B6F6">Ejercicio</span>:** Explicá en voz alta la diferencia entre un proceso
y un hilo, y por qué los sistemas operativos modernos usan threads en lugar de
procesos para concurrencia. Escribí un ejemplo en pseudocódigo que muestre
cuándo usar uno u otro.

**Done cuando:** Podés explicar la diferencia entre proceso e hilo, y por qué
el overhead de context switching hace que threads sean preferibles para
concurrencia dentro de una aplicación.
```

*(Sin línea FreePress — el tema no tiene aplicación natural en ningún proyecto del plan.)*

---

## Mejoras pendientes de implementar

---

### ✅ Mejora 1: Corregir cálculo de horas semanales en METODOLOGIA.md — HECHA

**Problema:**

La tabla de ritmo semanal no cierra:

- Lunes a Jueves: 4 días × 2h = **8h**
- Viernes: **1h**
- Domingo: **2-3h**
- Total real: 8 + 1 + 2-3 = **11-12h**

Pero el documento dice **~9-11 horas**. La diferencia es de 1-3 horas.

**Solución:**

Corregir el total a **11-12 horas** semanales.

**Archivos a modificar:**
- `METODOLOGIA.md` — corregir total semanal

---

### ✅ Mejora 2: Corregir "Etapa 3+" → "Etapa 4" en PROYECTOS.md — HECHA

**Problema:**

La tabla de stack progresivo dice:

> Etapa 3+ | + Docker + CI/CD + Observabilidad

Docker es tema 4.1, CI/CD es 4.2, Observabilidad es 4.5. Ninguno está en la Etapa 3. El "3+" es ambiguo.

**Solución:**

Cambiar "Etapa 3+" por "Etapa 4" directamente.

**Archivos a modificar:**
- `PROYECTOS.md` — corregir tabla de stack progresivo

---

### ✅ Mejora 3: Restructurar PROYECTOS.md — FreePress como opcional + DoD por etapa — HECHA

**Problema:**

1. FreePress se presenta como obligatorio ("Todo concepto del plan se practica construyendo algo real") — contradice la nueva decisión de proyecto opcional.
2. El Definition of Done es una lista plana que mezcla entregables de las 4 etapas sin distinguirlas.
3. La línea "🚀 Cuándo arrancar — Semana 1 de la Etapa 1" referencia un concepto ("Semana 1") que no está definido en ningún lado.

**Solución:**

Reestructurar PROYECTOS.md con estos cambios:

1. **FreePress como opcional**: Cambiar la apertura de "Todo concepto del plan se practica construyendo algo real" a una presentación que refleje que FreePress es el proyecto recomendado para quienes quieren uno continuo, pero que el "Done cuando" de cada tema es suficiente para validar el aprendizaje.

2. **DoD por etapa**: Dividir el Definition of Done en checkpoints progresivos por etapa, alineados con los deliverables que ya están en ROADMAP.md.

3. **Eliminar "Semana 1"**: Quitar la referencia a "Semana 1 de la Etapa 1" y reemplazarla con algo que no dependa de semanas no definidas. Alternativa: "Arrancá FreePress en paralelo con los primeros temas de la Etapa 1".

**Implementación concreta — DoD por etapa:**

```
## Definition of Done por Etapa

### Etapa 1 — Entrada
- [ ] Express + SQLite corriendo (scaffold funcional)
- [ ] Auth básico con roles (admin, editor, autor, lector)
- [ ] CRUD de artículos funcionando
- [ ] Tests de integración para auth y CRUD
- [ ] README que permite levantar el proyecto sin preguntas
- [ ] ADRs retroactivos documentando las decisiones del stack

### Etapa 2 — Fundamentos
- [ ] Migración a Angular completa (frontend)
- [ ] Migración a NestJS completa (backend)
- [ ] Migración a PostgreSQL completa (DB)
- [ ] Redis implementado para caché
- [ ] TypeScript en modo estricto
- [ ] Cada migración con su ADR justificando el cambio

### Etapa 3 — Arquitectura
- [ ] Arquitectura en capas implementada
- [ ] Context Map en `/docs`
- [ ] Frontend con state management
- [ ] API REST diseñada con convenciones claras

### Etapa 4 — Profundización
- [ ] Docker Compose para levantar todo con un comando
- [ ] CI/CD que corre tests en cada PR
- [ ] Deployado en un cloud real
- [ ] Logs estructurados accesibles
- [ ] Al menos un endpoint monitoreado
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] `fp-ai-assistant` con RAG básico funcional
```

**Archivos a modificar:**
- `PROYECTOS.md` — reestructura completa: apertura, DoD, eliminar "Semana 1"

---

### ✅ Mejora 4: Actualizar METODOLOGIA.md — FreePress opcional en el ciclo + Done cuando como criterio primario — HECHA

**Problema:**

1. El Paso 4 del ciclo dice "Aplicar en FreePress (el cierre del ciclo)" — asume FreePress como obligatorio.
2. El Checkpoint Social y el "Done cuando" compiten como criterio de completitud sin una jerarquía clara.
3. Las definiciones de 🔴 🟡 🟢 (tiempos orientativos) están en METODOLOGIA.md, pero también en ROADMAP.md — referencia cruzada innecesaria.

**Solución:**

**4a. Paso 4 del ciclo:**

Cambiar de:
```
### Paso 4 — Aplicar en FreePress (el cierre del ciclo)
El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real. Si no podés
aplicar lo que aprendiste, volvé al paso 2 o 3.
```

A:
```
### Paso 4 — Aplicar en un proyecto (el cierre del ciclo)
El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real. Si estás
siguiendo FreePress, cada tema tiene una línea **FreePress** con la aplicación
concreta. Si no, aplicá el ejercicio en cualquier proyecto que estés construyendo.
Si no podés aplicar lo que aprendiste, volvé al paso 2 o 3.
```

**4b. Criterio de completitud:**

Agregar al final de la sección "El Ciclo de Aprendizaje" o como nota al comienzo:

```
> **Criterio de completitud:** El "Done cuando" de cada tema es el criterio
> principal. Un tema se marca ☑ cuando cumplís el "Done cuando". El Checkpoint
> Social es refuerzo — valida que podés explicar lo que aprendiste a otra persona,
> pero no reemplaza el "Done cuando".
```

**4c. Prioridades (🔴 🟡 🟢):**

Mover las definiciones completas a ROADMAP.md (donde ya están) y eliminarlas de METODOLOGIA.md. METODOLOGIA.md solo conserva la referencia a los tiempos orientativos sin redefinir los símbolos.

**Archivos a modificar:**
- `METODOLOGIA.md` — Paso 4, criterio de completitud, eliminar definición de prioridades
- `ROADMAP.md` — ya tiene las definiciones, verificar que estén completas

---

### ✅ Mejora 5: Agregar mapeo tema → proyecto en PROYECTOS.md — HECHA

**Problema:**

METODOLOGIA dice "Aplicar en FreePress" como cierre del ciclo. PROYECTOS.md define 3 mini-proyectos satélite para "temas que no encajan naturalmente en FreePress". Pero ningún lado dice QUÉ tema va a QUÉ proyecto. El lector tiene que adivinar.

**Solución:**

Agregar en PROYECTOS.md, debajo de cada proyecto, los temas que se practican naturalmente ahí. Esto da dirección clara sin necesidad de referencia cruzada.

**Implementación concreta:**

```
## FreePress — Proyecto Principal (Opcional)

Una plataforma CMS/Blog open source estilo WordPress, construida desde cero.

**Temas que se practican naturalmente acá:**
Etapa 1: 1.1 JS Internals, 1.2 Debugging, 1.3 Testing, 1.4 Seguridad, 1.5 ED&A, 1.7 Documentación
Etapa 2: 2.1 TypeScript, 2.2 Build Tools, 2.4 SQL, 2.6 Migrations, 2.7 Concurrency
Etapa 3: 3.1 DDD, 3.2 Patrones, 3.3 API Design, 3.5 State Management, 3.7 Testing Frontend
Etapa 4: 4.1 Containers, 4.2 CI/CD, 4.3 Cloud, 4.4 Testing Backend, 4.5 Observabilidad, 4.6 Debugging Avanzado

---

## freepress-cli — Mini-Proyecto Satélite

CLI tool para gestionar FreePress (crear posts, deployar, migrar datos).

**Temas que se practican naturalmente acá:**
Etapa 1: 1.5 ED&A (estructuras de datos para parsing de argumentos)
Etapa 2: 2.9 Linux y Shell Productivo, 2.8 Git Avanzado
Etapa 3: (mejor como ejercicio avanzado cuando se profundice en CLI design)

---

## fp-ui — Mini-Proyecto Satélite

Librería de componentes UI publicada en npm.

**Temas que se practican naturalmente acá:**
Etapa 2: 2.1 TypeScript (tipos genéricos para componentes), 2.2 Build Tools (packaging de librería)
Etapa 3: 3.5 State Management, 3.7 Testing Frontend, 3.8 Accesibilidad

---

## fp-ai-assistant — Mini-Proyecto Satélite

Agente de AI / MCP server para FreePress.

**Temas que se practican naturalmente acá:**
Etapa 1: 1.6 AI Literacy (conceptos base de LLMs)
Etapa 4: 4.8 AI Engineering, 4.9 Construir con AI

**Cuándo empezar:** Al llegar al tema 4.8 (AI Engineering). Los conceptos de 1.6 (AI Literacy) dan la base, pero el proyecto arranca cuando estudiás AI Engineering en profundidad.
```

**Archivos a modificar:**
- `PROYECTOS.md` — agregar mapeo de temas bajo cada proyecto

---

### ✅ Mejora 6: Clarificar jerarquía de completitud en METODOLOGIA.md — HECHA (incluida en 4b)

**Problema:**

METODOLOGIA dice que un tema no está completo hasta pasar el Checkpoint Social. Cada tema tiene un "Done cuando" específico. Hay dos criterios y no queda claro cuál manda.

**Solución:**

Queda cubierto por la Mejora 4b (criterio de completitud). La jerarquía es:

1. **"Done cuando"** — criterio primario. Si lo cumplís, el tema está dominado.
2. **Checkpoint Social** — refuerzo. Valida que podés explicarlo, pero no bloquea avance.

El texto exacto a agregar está en la Mejora 4b.

**Archivos a modificar:**
- `METODOLOGIA.md` — mismo cambio que Mejora 4b

---

### ✅ Mejora 7: Agregar nota sobre ADRs retroactivos en PROYECTOS.md — HECHA

**Problema:**

El tema 1.7 tiene una excelente nota explicando que los ADRs de FreePress en Etapa 1 son retroactivos (el stack está pre-decidido). Pero PROYECTOS.md dice "Cada migración genera un ADR" sin esa aclaración. Alguien que lea PROYECTOS primero se pregunta "¿qué ADRs escribo si el stack ya está decidido?".

**Solución:**

Mover el contenido de la nota (no una referencia — el contenido completo) a PROYECTOS.md, en la sección de migración. El tema 1.7 la puede seguir mencionando pero la explicación completa vive en PROYECTOS.md donde se necesita.

Agregar en PROYECTOS.md, en la sección "Migración de Stack — Etapa 1 → Etapa 2", un párrafo:

```
**Nota sobre los ADRs de FreePress:** El stack inicial (Express + SQLite) está
pre-decidido antes de que estudies el tema de ADRs. Los primeros ADRs que
escribás son retroactivos — articulás y justificás decisiones ya tomadas. Eso
está bien como ejercicio: aprendés a estructurar razonamiento arquitectónico.
Cuando FreePress crezca y tengas que tomar decisiones nuevas (¿Redis Streams o
RabbitMQ? ¿microservicios o monolito?), ahí vas a escribir ADRs reales antes
de decidir.
```

**Archivos a modificar:**
- `PROYECTOS.md` — agregar nota sobre ADRs retroactivos

---

### ✅ Mejora 8: Agregar trigger de inicio para fp-ai-assistant — HECHA

**Problema:**

El ROADMAP menciona "fp-ai-assistant con RAG básico" como entregable de la Etapa 4. PROYECTOS.md lo define. Pero ningún lado dice cuándo empezar a construirlo ni qué tema es el gatillo natural.

**Solución:**

Queda cubierto por la Mejora 5 (mapeo de temas). La línea "Cuándo empezar" bajo fp-ai-assistant en el mapeo lo resuelve:

```
**Cuándo empezar:** Al llegar al tema 4.8 (AI Engineering). Los conceptos de
1.6 (AI Literacy) dan la base conceptual, pero el proyecto arranca cuando
estudiás AI Engineering en profundidad y estás listo para diseñar un sistema
que interactúe con LLMs de forma estructurada.
```

Adicionalmente, los archivos de tema 4.8 y 4.9 deberían incluir una línea **FreePress** que diga:

```
**<span style="color: #FFA726">FreePress</span>:** Este es el momento de empezar fp-ai-assistant.
Diseñá la arquitectura del MCP server que conecte con FreePress.
```

**Archivos a modificar:**
- `PROYECTOS.md` — incluido en Mejora 5
- `Etapa 4 — Profundización/4.8 — AI Engineering (la nueva disciplina).md` — agregar línea FreePress
- `Etapa 4 — Profundización/4.9 — Construir con AI — Proyectos reales.md` — agregar línea FreePress

---

### ✅ Mejora 9: Limpiar "Done cuando" que mencionan FreePress en todos los temas — HECHA

**Problema:**

Varios "Done cuando" en los archivos de temas mencionan FreePress como parte del criterio de dominio. Con FreePress como opcional, el "Done cuando" debe ser universal.

**Solución:**

Revisar cada archivo de tema y actualizar los "Done cuando" que mencionan FreePress para que sean universales. Al mismo tiempo, reestructurar cada subtema al nuevo formato (Ejercicio + FreePress + Done cuando).

Lista de temas con "Done cuando" que mencionan FreePress (no exhaustiva — revisar todos):

- `1.2 — Debugging Básico.md`: "Tenés configurado debugging en VS Code para el backend de FreePress"
- `1.3 — Testing Fundamentals.md`: "escribí tests para 2 funciones de FreePress" (en ejercicio, no en Done cuando, pero verificar)
- `1.4 — Seguridad Aplicada.md`: "FreePress no tiene ningún secret en el código"
- `1.7 — Documentación Técnica Profesional.md`: "Escribí el README completo de FreePress"
- `2.1 — TypeScript Avanzado.md`: "Auditá el tsconfig.json de FreePress"
- Y otros — revisar todos los 46 temas

**Criterio de cambio:**
- Si el Done cuando menciona FreePress → universalizarlo (quitar "de FreePress" y hacer que la habilidad sea genérica)
- Si el ejercicio menciona FreePress → separar en Ejercicio (universal) + FreePress (específico)
- Si un ejercicio solo tiene sentido con FreePress (ej: "auditá el auth de FreePress") → ese ejercicio pasa a la línea FreePress, y el Ejercicio se reescribe de forma universal

**Archivos a modificar:**
- Todos los archivos de tema en las 4 etapas (46 archivos total)

---

### ✅ Mejora 10: Actualizar README.md — reflejar FreePress como opcional — HECHA

**Problema:**

README.md presenta FreePress como parte central del plan sin indicar que es opcional.

**Solución:**

Actualizar la línea que dice:

> FreePress (el proyecto que vas a construir) está en PROYECTOS.md.

A algo como:

> FreePress — el proyecto de práctica opcional para quienes quieran un proyecto continuo — está en PROYECTOS.md.

Y actualizar la filosofía para reflejar que cada tema es autosuficiente:

```
## Empieza aquí

1. Abrí [ROADMAP.md](ROADMAP.md) — es el mapa completo: qué estudiar, en qué orden, y tu progreso
2. Leé [METODOLOGIA.md](METODOLOGIA.md) — cómo estudiar, el ritmo, las reglas de AI
3. Abrí el primer tema de la Etapa 1 y empezá

> Cada tema es autosuficiente: el "Done cuando" es tu criterio de dominio.
> Si querés un proyecto continuo para constatar el conocimiento, FreePress está en
> [PROYECTOS.md](PROYECTOS.md). Recursos en [RECURSOS.md](RECURSOS.md).
```

**Archivos a modificar:**
- `README.md` — ajustar filosofía y sección "Empieza aquí"

---

## Priorización de implementación

| Prioridad | Mejora | Archivos principales | Impacto | Esfuerzo | Estado |
|-----------|--------|---------------------|---------|----------|--------|
| 🔴 Crítico | 1. Corregir horas semanales | METODOLOGIA.md | Bajo (fix) | Muy bajo | ✅ Hecha |
| 🔴 Crítico | 2. Corregir "Etapa 3+" | PROYECTOS.md | Bajo (fix) | Muy bajo | ✅ Hecha |
| 🔴 Crítico | 3. Restructurar PROYECTOS.md | PROYECTOS.md | Alto | Medio | ✅ Hecha |
| 🔴 Crítico | 4. Actualizar METODOLOGIA.md | METODOLOGIA.md, ROADMAP.md | Alto | Medio | ✅ Hecha |
| 🟡 Importante | 5. Mapeo tema → proyecto | PROYECTOS.md | Alto | Medio | ✅ Hecha |
| 🟡 Importante | 6. Jerarquía de completitud | METODOLOGIA.md | Medio | Bajo (incluido en 4b) | ✅ Hecha |
| 🟡 Importante | 7. Nota ADRs retroactivos | PROYECTOS.md | Medio | Bajo | ✅ Hecha |
| 🟡 Importante | 8. Trigger fp-ai-assistant | PROYECTOS.md, 4.8, 4.9 | Medio | Bajo | ✅ Hecha |
| 🟡 Importante | 9. Limpiar "Done cuando" + nuevo formato | Todos los temas (46 archivos) | Alto | Alto | ✅ Hecha |
| 🟢 Mejora | 10. Actualizar README.md | README.md | Medio | Bajo | ✅ Hecha |

---

## Orden sugerido de implementación

1. ✅ ~~Corregir horas semanales en METODOLOGIA.md~~ (1 minuto)
2. ✅ ~~Corregir "Etapa 3+" en PROYECTOS.md~~ (1 minuto)
3. ✅ ~~Actualizar METODOLOGIA.md: Paso 4, criterio de completitud, mover prioridades a ROADMAP~~
4. ✅ ~~Restructurar PROYECTOS.md: FreePress opcional, DoD por etapa, eliminar "Semana 1"~~
5. ✅ ~~Mapeo tema → proyecto en PROYECTOS.md~~
6. ✅ ~~Actualizar README.md~~
7. ✅ ~~Nota ADRs retroactivos en PROYECTOS.md~~
8. ✅ ~~Trigger fp-ai-assistant en 4.8, 4.9 y PROYECTOS.md~~
8. ✅ ~~Trigger fp-ai-assistant en 4.8, 4.9 y PROYECTOS.md~~
9. ✅ ~~Aplicar nuevo formato (Ejercicio + FreePress + Done cuando) a todas las etapas~~ — Etapas 1-4 completas

---

## Propuesta de colores HTML

Para diferenciar visualmente las secciones en cada subtema:

| Sección | Color | HTML | Preview |
|---------|-------|------|---------|
| **Ejercicio** | Azul claro | `<span style="color: #29B6F6">**Ejercicio:**</span>` | Ejercicio — acción universal, hands-on |
| **FreePress** | Naranja | `<span style="color: #FFA726">**FreePress:**</span>` | FreePress — aplicación opcional en el proyecto |
| **Done cuando** | Sin color (default) | `**Done cuando:**` | Done cuando — criterio universal de dominio |

Los colores se eligieron para funcionar tanto en tema claro como oscuro (Obsidian, GitHub, VS Code). Si algún visor no renderiza el HTML, el texto sigue siendo legible porque el nombre de la sección está en negrita.

---

**Fecha de creación:** 23/05/2026
**Fecha de completitud:** 26/05/2026
**Estado:** ✅ Completada