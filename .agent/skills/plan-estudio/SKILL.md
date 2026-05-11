---
name: plan-estudio
description: >
  Estructura y mantenimiento del Plan de Estudio Pro Max.
  Trigger: Cuando se agrega, modifica o elimina una fase, tema/sección del plan de estudio.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "2.0"
---

## Arquitectura del Plan de Estudio

El plan tiene una arquitectura donde cada archivo responde UNA pregunta. Sin overlap. Sin drift.

### Archivos raíz (una pregunta → un archivo)

| Archivo | Pregunta que responde | Propósito |
|---------|----------------------|-----------|
| `Plan de Estudio Pro Max.md` | **¿QUÉ estudio y en qué ORDEN?** | Temas por etapa, prioridad 🔴🟡🟢, overview de duración |
| `METODOLOGIA.md` | **¿CÓMO estudio?** | Ciclo de 4 pasos, ritmo, checkpoints, AI usage, spaced repetition |
| `PROYECTOS.md` | **¿QUÉ construyo?** | FreePress MVP, Plan B, checkpoints por etapa, migración de stack |
| `PROGRESO.md` | **¿DÓNDE estoy?** | Tracking de los 19 temas Core con niveles de profundidad |
| `Referencia/RECURSOS.md` | **¿CON QUÉ estudio?** | Libros, cursos, plataformas por tema |

### Directorios por etapa

```
Etapa {N} — {Nombre}/
├── {N}.{M} — {Tema} 🔴.md     # [CORE] - tema esencial
├── {N}.{M} — {Tema} 🟡.md     # [ADVANCED] - tema importante
└── {N}.{M} — {Tema} 🟢.md     # [ADVANCED] - tema complementario
```

**Convención de nombres:**
- `{N}` = número de etapa (1-4)
- `{M}` = número de tema dentro de la etapa
- Emoji de prioridad: 🔴 crítico, 🟡 importante, 🟢 complementario
- Badge al inicio: `**[CORE]**` o `*[ADVANCED]*`

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

### 3. Actualizar `Plan de Estudio Pro Max.md`
Agregar sección después de la última etapa:
```markdown
## Etapa {N} — {Nombre} {emoji}

Descripción de la etapa.

**Core (estudiar en orden):**

| Tema | Prioridad | Tipo |
|------|-----------|------|
| [{N}.1 — {Tema}](...) | 🔴 Core | {Tipo} |
```

### 4. Actualizar `PROYECTOS.md`
- Agregar fila en tabla "Checkpoints de Validación por Etapa"

### 5. Actualizar `PROGRESO.md`
- Agregar sección de la nueva etapa con los temas Core

### 6. Actualizar `METODOLOGIA.md`
- Agregar checkpoint en tabla de checkpoints si aplica

---

## Acción: Agregar un NUEVO TEMA a una etapa existente

### 1. Crear archivo de tema
```
Etapa {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md
```

### 2. Template del archivo
```markdown
# {N}.{M} — {Tema} {emoji} [{CORE|ADVANCED}]

- [ ] **{Subtema 1}**

{Descripción del subtema}

**Por qué importa:** {Razón concreta}

**Ejercicio:** {Acción verificable conectada a FreePress}

**Done cuando:** {Criterio observable}

**Recursos:**
- [Nombre](URL) — {por qué este recurso}

---

## 🎯 Checkpoint Social

> **Este tema NO está completo hasta que valides externamente tu comprensión.**

Ver [METODOLOGIA.md → Checkpoint Social](../METODOLOGIA.md#-checkpoint-social--validación-externa-por-tema) para los pasos completos.
```

### 3. Actualizar `Plan de Estudio Pro Max.md`
Agregar línea en la etapa correspondiente:
```markdown
| [{N}.{M} — {Tema}](...) | 🔴 Core | {Tipo} |
```

### 4. Actualizar `PROGRESO.md`
Si es Core, agregar a la sección de la etapa correspondiente.

---

## Acción: Modificar un tema existente

Solo modificar el archivo del tema:
```
Etapa {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md
```

NO es necesario actualizar otros archivos a menos que:
- Cambie de CORE a ADVANCED (o viceversa) → actualizar PROGRESO.md y Plan de Estudio
- Cambie el nombre significativamente → actualizar links en Plan de Estudio

---

## Acción: Eliminar un tema

### 1. Eliminar archivo
```bash
rm "Etapa {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md"
```

### 2. Actualizar `Plan de Estudio Pro Max.md`
Eliminar la línea correspondiente en la etapa.

### 3. Actualizar `PROGRESO.md`
Si era Core, eliminar de la sección correspondiente.

---

## Regla de Oro: Una pregunta → Un archivo

| Pregunta | Archivo | NO duplicar en |
|----------|---------|----------------|
| "¿Qué estudio?" | `Plan de Estudio Pro Max.md` | Metodología, temas |
| "¿Cómo estudio?" | `METODOLOGIA.md` | Plan, temas |
| "¿Qué construyo?" | `PROYECTOS.md` | — |
| "¿Dónde estoy?" | `PROGRESO.md` | — |
| "¿Qué recurso uso?" | `Referencia/RECURSOS.md` | Temas |

**Si el contenido ya existe en un archivo, referenciarlo, no duplicarlo.**

---

## Checkboxes de temas

Cada archivo de tema tiene checkboxes para subtemas:
```markdown
- [ ] **Subtema 1**
- [ ] **Subtema 2**
```

El estado de estos checkboxes es LOCAL al archivo. No se trackea globalmente.

---

## Metadata de archivos de tema

### Título
```markdown
# {N}.{M} — {Tema} {emoji} [{CORE|ADVANCED}]
```

### Badge
- `**[CORE]**` = tema esencial del Core Path
- `*[ADVANCED]*` = tema optativo de profundización

### Emoji de prioridad
| Emoji | Significado | Cuándo usar |
|-------|-------------|-------------|
| 🔴 | Crítico | No avanzar sin dominar |
| 🟡 | Importante | Estudiar bien, no bloquea |
| 🟢 | Complementario | Profundizar cuando haya tiempo |

---

## Resumen rápido

| Acción | Archivos a modificar |
|--------|---------------------|
| Nueva etapa | Dir + tema + Plan + PROYECTOS + METODOLOGIA + PROGRESO |
| Nuevo tema | Tema + Plan + PROGRESO (si es Core) |
| Modificar tema | Solo el tema (salvo cambio de CORE/ADVANCED) |
| Eliminar tema | Tema + Plan + PROGRESO |