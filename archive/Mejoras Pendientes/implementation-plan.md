# Simplificación del Plan — Análisis v2 (el real)

Mi primer análisis fue superficial. Propuse juntar archivos para tener menos archivos — eso es reorganizar muebles, no arreglar la casa. Voy a ir al problema real.

---

## El problema raíz: evaluación fragmentada y archivos que invaden territorio ajeno

El plan tiene una regla que dice "Una pregunta → Un archivo." Y **la rompe en la práctica.** El contenido de las etapas y los temas individuales está bien. El problema es que **hay 3 sistemas de evaluación paralelos** y **archivos que no saben cuál es su responsabilidad.**

### Los 3 sistemas de evaluación que compiten entre sí

Cuando terminás un tema, ¿cómo sabés que lo completaste? El plan te da **tres respuestas distintas** en **tres archivos diferentes**:

| Sistema | Archivo | Qué dice |
|---------|---------|----------|
| **"Done cuando"** | Cada archivo de tema | "Podés explicar X sin mirar apuntes" — criterio claro, verificable |
| **Checkboxes de progreso** | `PROGRESO.md` | `- [ ] 1.5 — JavaScript Internals` — tracking binario |
| **Checkpoints de validación** | `PROYECTOS.md` | "Traceás la ejecución desde frontend hasta backend con DevTools. FreePress corriendo con al menos 1 bug arreglado." — habilidad demostrable + estado del proyecto |

Tres sistemas. Tres archivos. Tres formas de medir lo mismo. Y **ninguno referencia a los otros**.

¿Cuál es el bueno? ¿El "Done cuando" del tema 1.5 que dice "explicar el event loop"? ¿O el Checkpoint de PROYECTOS que dice "traceás la ejecución + FreePress corriendo + 1 bug arreglado"? Son criterios **distintos** para el **mismo tema**, en **archivos distintos**.

Esto es lo que genera la sensación de "la información está regada" — no es que haya demasiados archivos, es que **la misma pregunta tiene respuestas en múltiples lugares, y no coinciden**.

---

### `PROYECTOS.md` tiene una crisis de identidad

Este archivo se supone que responde "¿Qué construyo?" Pero lo que realmente contiene es:

| Sección | Lo que hace | ¿Es sobre "qué construyo"? |
|---------|-------------|----------------------------|
| FreePress — Proyecto Principal | Define el proyecto y su stack | ✅ Sí |
| Definition of Done — MVP | Lista funcionalidad mínima | ✅ Sí |
| Migración de Stack | Guía técnica de migración Etapa 1→2 | ✅ Sí |
| **Checkpoints de Validación por Etapa** | Evalúa si dominás los temas | ❌ **No — esto es evaluación del aprendizaje** |
| Mini-Proyectos Satélite | Proyectos adicionales | ✅ Sí |

La sección de Checkpoints (líneas 77-112, ~35 líneas) **no es sobre el proyecto** — es una rúbrica de evaluación del aprendizaje disfrazada de documentación de proyecto. Mezcla "habilidad demostrable" (que es evaluación personal) con "estado de FreePress" (que sí es del proyecto) en la misma tabla.

Esto es lo que hace que no sepas en qué archivo buscar cuando querés saber "¿estoy haciendo bien esto?" — porque la respuesta está repartida entre el "Done cuando" de cada tema y los Checkpoints de PROYECTOS.

### `README.md` no aporta nada que no se pueda resolver de otra forma

El README tiene 39 líneas. De esas, **3 tablas dicen la misma cosa** con diferente formato:
1. "¿Qué hago AHORA?" — 4 filas, 4 archivos
2. "Los 4 archivos del plan" — 4 filas, los mismos 4 archivos  
3. "Una pregunta → Un archivo" — 5 filas, los mismos archivos + RECURSOS

Es un archivo de navegación para un repositorio de 4 archivos. No necesita existir si el `Plan de Estudio Pro Max.md` (que es el archivo que abrís primero) tiene una buena intro.

### `PROGRESO.md` es un duplicado del índice con checkboxes

Ya lo dijiste: nunca te gustó. Es la misma lista de temas que `Plan de Estudio Pro Max.md` con `- [ ]` adelante. Hay que mantener dos archivos sincronizados para que uno tenga links y el otro tenga checkboxes. Acuerdo total en eliminarlo.

---

## Propuesta: cirugía precisa, no restructuración masiva

No voy a proponer fusionar archivos ni crear archivos nuevos. Voy a proponer **6 cambios quirúrgicos** que atacan los problemas reales.

---

### Cambio 1: Eliminar `PROGRESO.md` — el tracking vive en `Plan de Estudio Pro Max.md`

**¿Qué cambia?** Agregar una columna `Estado` a cada tabla de temas en `Plan de Estudio Pro Max.md`:

```markdown
**Primero (código y herramientas):**

| Tema | Prioridad | Estado |
|------|-----------|--------|
| [1.4 — Debugging Básico](...) | 🔴 Core | ☐ |
| [1.5 — JavaScript Internals](...) | 🔴 Core | ☐ |
```

Y al final del archivo, la tabla resumen de progreso que hoy está en PROGRESO.md:

```markdown
## Progreso

| Etapa              | Temas | Completados |
| ------------------ | ----- | ----------- |
| 1 — Entrada        | 9     | 0           |
| 2 — Fundamentos    | 3     | 0           |
| 3 — Arquitectura   | 3     | 0           |
| 4 — Profundización | 6     | 0           |
| **Total**          | **21**| **0**       |
```

**¿Qué se gana?** Un solo archivo es el mapa Y el tracking. No hay que sincronizar dos archivos. El "Tipo" se elimina porque nunca aporta decisión — nadie dice "ah, es tipo Seguridad, entonces lo estudio diferente."

**Archivo eliminado:** `PROGRESO.md`

---

### Cambio 2: Eliminar los Checkpoints de Validación de `PROYECTOS.md`

**¿Qué cambia?** Se elimina la sección "Checkpoints de Validación por Etapa" (líneas 77-112 de PROYECTOS.md). 

**¿Por qué?** Cada tema ya tiene su propio "Done cuando" que es verificable y concreto. Los Checkpoints de PROYECTOS son un **segundo sistema de evaluación** que nadie pidió, que no coincide exactamente con los "Done cuando" de los temas, y que crea confusión sobre cuál criterio importa.

La columna "Estado de FreePress" de los Checkpoints (ej: "FreePress corriendo con Express + SQLite") se puede rescatar como una **nota breve al final de cada etapa en `Plan de Estudio Pro Max.md`**:

```markdown
## Etapa 1 — Entrada 🧠

...tablas de temas...

> **FreePress al terminar esta etapa:** corriendo con Express + SQLite. Auth funcionando. Tests de integración. `/docs` con ADRs y README.
```

Una línea por etapa. La info útil se preserva, el sistema paralelo de evaluación se elimina.

---

### Cambio 3: `README.md` se convierte en intro real, no en tabla de navegación

El README actual es un índice para 4 archivos. No necesita ser eso — el `Plan de Estudio Pro Max.md` ya es el punto de entrada real. 

**El README debería tener:**
1. Una descripción clara de qué es este plan y para quién (esto no existe en ningún lado hoy)
2. La filosofía en versión corta (hoy solo está en METODOLOGIA, enterrada)
3. Un "empieza por aquí" con 2-3 pasos, no 3 tablas repetidas

```markdown
# Plan de Estudio Pro Max

Un plan de aprendizaje para convertirte en un ingeniero de software completo en la 
era de AI. 4 etapas, ~46 temas, un proyecto real (FreePress) que crece con vos.

## Filosofía

1. Conceptos antes que frameworks
2. Cada etapa construye sobre la anterior
3. Si no podés explicarlo, no lo dominás
4. La AI implementa, vos decidís

## Empieza aquí

1. Abrí [Plan de Estudio Pro Max.md](Plan%20de%20Estudio%20Pro%20Max.md) — es el mapa completo: qué estudiar, en qué orden, y tu progreso
2. Leé [METODOLOGIA.md](METODOLOGIA.md) — cómo estudiar, el ritmo, las reglas de AI
3. Abrí el primer tema de la Etapa 1 y empezá

> FreePress (el proyecto que vas a construir) está en [PROYECTOS.md](PROYECTOS.md). 
> Recursos (libros, cursos, plataformas) en [RECURSOS.md](RECURSOS.md).
```

Sin tablas repetidas. Sin 3 formas de decir lo mismo. **Filosofía visible desde el primer archivo** (hoy está enterrada en la página 2 de METODOLOGIA).

---

### Cambio 4: Eliminar "Temas Transversales" de `METODOLOGIA.md`

La sección "Temas Transversales" (líneas 102-112) son 10 líneas que dicen "el tema 4.5 existe" y "el tema 4.14 existe". No aporta información actionable — el estudiante va a descubrir esos temas cuando llegue a la Etapa 4. Lo que sí hace es generar la sensación de "hay cosas que debería estar leyendo pero que están en otro lado."

**Eliminar sin reemplazo.**

---

### Cambio 5: `Referencia/` se disuelve

- `RECURSOS.md` sube a la raíz (un archivo no necesita carpeta)
- `Ejemplo Paso a Paso Hash Tables.md` se mueve a `Etapa 1 — Entrada/` — es un ejemplo de cómo abordar el tema 1.6, pertenece ahí

---

### Cambio 6: `Mejoras Pendientes/` se archiva

Se mueve a `.archive/Mejoras Pendientes/`. Es historial de desarrollo del plan, no contenido del plan.

---

## Resumen de la cirugía

| Acción | Archivo | Resultado |
|--------|---------|-----------|
| Eliminar | `PROGRESO.md` | Tracking vive en `Plan de Estudio Pro Max.md` |
| Recortar | `PROYECTOS.md` | Sin Checkpoints de Validación (~35 líneas menos) |
| Reescribir | `README.md` | Intro real + filosofía visible + 3 pasos para empezar |
| Recortar | `METODOLOGIA.md` | Sin "Temas Transversales" (~10 líneas menos) |
| Mover | `Referencia/RECURSOS.md` → `RECURSOS.md` | Carpeta eliminada |
| Mover | `Referencia/Ejemplo...` → `Etapa 1/` | Donde pertenece |
| Mover | `Mejoras Pendientes/` → `.archive/` | Fuera del camino |

**Archivos después:**
```
README.md                     — Qué es esto + filosofía + empieza aquí
Plan de Estudio Pro Max.md    — QUÉ estudiar + ORDEN + PROGRESO
METODOLOGIA.md                — CÓMO estudiar
PROYECTOS.md                  — QUÉ construir (solo FreePress + mini-proyectos)
RECURSOS.md                   — CON QUÉ estudiar
Etapas 1-4/                   — El contenido
.archive/                     — Historial de mejoras
```

No se crea ningún archivo nuevo. No se fusionan archivos existentes. Se elimina lo redundante, se recorta lo invasivo, y cada archivo vuelve a tener una identidad clara.

> [!IMPORTANT]
> **¿Estoy en el camino correcto esta vez?** La diferencia clave con mi análisis anterior es que ya no propongo fusionar archivos. Lo que propongo es eliminar la **evaluación fragmentada** (3 sistemas para lo mismo) y hacer que cada archivo responda UNA pregunta sin invadir las demás. Si sigo sin dar en el clavo, decime dónde sentís que la fricción está realmente.
