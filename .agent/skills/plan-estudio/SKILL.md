---
name: plan-estudio
description: >
  Estructura y mantenimiento del Roadmap del Plan de Estudio.
  Trigger: Cuando se agrega, modifica o elimina una fase, tema/sección del plan de estudio.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "3.0"
---

## Arquitectura del Plan de Estudio

El plan tiene una arquitectura donde cada archivo responde UNA pregunta. Sin overlap. Sin drift.

### Archivos raíz (una pregunta → un archivo)

| Archivo | Pregunta que responde | Propósito |
|---------|----------------------|-----------|
| `ROADMAP.md` | **¿QUÉ estudio, en qué ORDEN, y DÓNDE estoy?** | Temas por etapa, prioridad 🔴🟡🟢, estado de progreso |
| `METODOLOGIA.md` | **¿CÓMO estudio?** | Ciclo de 4 pasos, ritmo, checkpoints, AI usage, spaced repetition |
| `PROYECTOS.md` | **¿QUÉ construyo?** | FreePress MVP, mini-proyectos, migración de stack |
| `RECURSOS.md` | **¿CON QUÉ estudio?** | Libros, cursos, plataformas de referencia |

### Directorios por etapa

```
Etapa {N} — {Nombre}/
├── {N}.{M} — {Tema}.md     # tema (prioridad en ROADMAP.md)
```

**Convención de nombres:**
- `{N}` = número de etapa (1-4)
- `{M}` = número de tema dentro de la etapa
- Sin emoji ni badge en el filename ni en el H1 — la prioridad vive en `ROADMAP.md`

---

## Acción: Agregar una NUEVA ETAPA

Cuando se agrega una etapa completamente nueva, modificar en orden:

### 1. Crear directorio
```bash
mkdir "Etapa {N} — {Nombre}"
```

### 2. Crear archivo(s) de tema
```
Etapa {N} — {Nombre}/{N}.1 — {Tema} 🔴.md
```

### 3. Actualizar `ROADMAP.md`
Agregar sección después de la última etapa:
```markdown
## Etapa {N} — {Nombre} {emoji}

Descripción de la etapa.

**Core (estudiar en orden):**

| Tema | Prioridad | Estado |
|------|-----------|--------|
| [{N}.1 — {Tema}](...) | 🔴 Core | ☐ |
```

### 4. Actualizar `PROYECTOS.md`
- Agregar nota de estado de FreePress al terminar la etapa (como blockquote al final de la sección en el Plan)

### 5. Actualizar `METODOLOGIA.md`
- Agregar checkpoint en tabla de checkpoints si aplica

---

## Acción: Agregar un NUEVO TEMA a una etapa existente

### 1. Crear archivo de tema
```
Etapa {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md
```

### 2. Template del archivo
```markdown
# {N}.{M} — {Tema}

- [ ] **{Subtema 1}**

{Descripción del subtema}

**Por qué importa:** {Razón concreta}

**Ejercicio:** {Acción verificable conectada a FreePress}

**Done cuando:** {Criterio observable}

**Recursos:**
- [Nombre](URL) — {por qué este recurso}
```

### 3. Actualizar `ROADMAP.md`
Agregar línea en la etapa correspondiente:
```markdown
| [{N}.{M} — {Tema}](...) | 🔴 Core | ☐ |
```

---

## Acción: Modificar un tema existente

Solo modificar el archivo del tema:
```
Etapa {N} — {Nombre}/{N}.{M} — {Tema}.md
```

NO es necesario actualizar otros archivos a menos que:
- Cambie la prioridad → actualizar ROADMAP.md
- Cambie el nombre significativamente → actualizar links en ROADMAP.md

---

## Acción: Eliminar un tema

### 1. Eliminar archivo
```bash
rm "Etapa {N} — {Nombre}/{N}.{M} — {Tema}.md"
```

### 2. Actualizar `ROADMAP.md`
Eliminar la línea correspondiente en la etapa.

---

## Regla de Oro: Una pregunta → Un archivo

| Pregunta | Archivo | NO duplicar en |
|----------|---------|----------------|
| "¿Qué estudio y dónde estoy?" | `ROADMAP.md` | Metodología, temas |
| "¿Cómo estudio?" | `METODOLOGIA.md` | Plan, temas |
| "¿Qué construyo?" | `PROYECTOS.md` | — |
| "¿Qué recurso uso?" | `RECURSOS.md` | Temas |

**Si el contenido ya existe en un archivo, referenciarlo, no duplicarlo.**

---

## Checkboxes de temas

Cada archivo de tema tiene checkboxes para subtemas:
```markdown
- [ ] **Subtema 1**
- [ ] **Subtema 2**
```

El estado de estos checkboxes es LOCAL al archivo. El tracking global de progreso está en la columna `Estado` de `ROADMAP.md`.

---

## Metadata de archivos de tema

### Título
```markdown
# {N}.{M} — {Tema}
```

Sin emoji ni badge — la prioridad (🔴/🟡/🟢, Core/Advanced) vive en `ROADMAP.md`.

### Prioridad (en ROADMAP.md solamente)
| Emoji | Significado | Cuándo usar |
|-------|-------------|-------------|
| 🔴 | Crítico | No avanzar sin dominar |
| 🟡 | Importante | Estudiar bien, no bloquea |
| 🟢 | Complementario | Profundizar cuando haya tiempo |

---

## Resumen rápido

| Acción | Archivos a modificar |
|--------|---------------------|
| Nueva etapa | Dir + tema + ROADMAP + PROYECTOS + METODOLOGIA |
| Nuevo tema | Tema + ROADMAP |
| Modificar tema | Solo el tema (salvo cambio de prioridad o nombre) |
| Eliminar tema | Tema + ROADMAP |