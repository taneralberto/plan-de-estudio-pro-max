---
name: plan-estudio
description: >
  Estructura y mantenimiento del Plan de Estudio Pro Max.
  Trigger: Cuando se agrega, modifica o elimina una fase, tema/sección del plan de estudio.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Arquitectura del Plan de Estudio

El plan tiene una arquitectura modular donde cada archivo tiene un propósito único y específico.

### Archivos raíz (proposito único)

| Archivo | Propósito | Contenido |
|---------|-----------|-----------|
| `ROADMAP.md` | **QUÉ y CUÁNDO estudiar** | Secuencia, etapas, Core Path, Advanced Track |
| `METODOLOGIA.md` | **CÓMO estudiar** | Ciclo de 4 pasos, checkpoints, temas transversales |
| `Plan de Estudio Pro Max.md` | Catálogo de fases | Qué contiene cada fase + filosofía + leyenda |
| `PROGRESS.md` | Tracking | Estado actual, completados, estadísticas |
| `PROYECTOS.md` | Proyectos | FreePress MVP, Plan B, estado por fase |
| `RECURSOS.md` | Recursos | Libros, cursos, plataformas |

### Directorios por fase

```
Fase {N} — {Nombre}/
├── {N}.{M} — {Tema} 🔴.md     # [CORE]
├── {N}.{M} — {Tema} 🟡.md     # [ADVANCED]
└── {N}.{M} — {Tema} 🟢.md     # [ADVANCED]
```

**Convención de nombres:**
- `{N}` = número de fase (0-9)
- `{M}` = número de tema dentro de la fase
- Emoji de prioridad: 🔴 crítico, 🟡 importante, 🟢 complementario
- Badge al inicio: `**[CORE]**` o `*[ADVANCED]*`

---

## Acción: Agregar una NUEVA FASE

Cuando se agrega una fase completamente nueva (ej: Fase 10), modificar en orden:

### 1. Crear directorio
```bash
mkdir "Fase {N} — {Nombre}"
```

### 2. Crear archivo(s) de tema
```
Fase {N} — {Nombre}/{N}.1 — {Tema} 🔴.md
```

### 3. Actualizar `Plan de Estudio Pro Max.md`
Agregar sección después de Fase 9:
```markdown
### Fase {N} — {Nombre} {emoji}

Descripción de la fase.

- [[Fase {N} — {Nombre}/{N}.1 — {Tema} 🔴]] **[CORE]**
- [[Fase {N} — {Nombre}/{N}.2 — {Tema} 🟡]] *[ADVANCED]*
```

### 4. Actualizar `ROADMAP.md`
- Agregar en tabla de etapas si corresponde
- Agregar temas en la etapa correspondiente
- Si es Core, agregar a lista "El Core Path"
- Agregar a tabla "El Advanced Track" si aplica

### 5. Actualizar `PROGRESS.md`
- Agregar temas nuevos a "Próximos temas (Core Path)" si son CORE

### 6. Actualizar `PROYECTOS.md`
- Agregar fila en tabla "Estado esperado de FreePress por fase"

### 7. Actualizar `METODOLOGIA.md`
- Agregar checkpoint en tabla "Checkpoints por Fase"

---

## Acción: Agregar un NUEVO TEMA a una fase existente

Cuando se agrega un tema nuevo a una fase que ya existe:

### 1. Crear archivo de tema
```
Fase {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md
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

- [ ] **{Subtema 2}**

{...}
```

### 3. Actualizar `Plan de Estudio Pro Max.md`
Agregar línea en la fase correspondiente:
```markdown
- [[Fase {N} — {Nombre}/{N}.{M} — {Tema} 🔴]] **[CORE]**
```

### 4. Actualizar `ROADMAP.md`
- Si es CORE: agregar a lista Core Path + tabla de etapa correspondiente
- Si es ADVANCED: agregar a tabla Advanced Track

### 5. Actualizar `PROGRESS.md`
- Si es CORE: agregar a "Próximos temas (Core Path)"
- Actualizar contador de temas Core

---

## Acción: Modificar un tema existente

Solo modificar el archivo del tema:
```
Fase {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md
```

NO es necesario actualizar otros archivos a menos que:
- Cambie de CORE a ADVANCED (o viceversa) → actualizar ROADMAP.md + PROGRESS.md
- Cambie el nombre significativamente → actualizar links en Plan de Estudio Pro Max.md

---

## Acción: Eliminar un tema

### 1. Eliminar archivo
```bash
rm "Fase {N} — {Nombre}/{N}.{M} — {Tema} 🔴.md"
```

### 2. Actualizar `Plan de Estudio Pro Max.md`
Eliminar la línea correspondiente en la fase.

### 3. Actualizar `ROADMAP.md`
- Si era CORE: eliminar de lista Core Path + tabla de etapa
- Si era ADVANCED: eliminar de tabla Advanced Track

### 4. Actualizar `PROGRESS.md`
- Si era CORE: eliminar de lista Core Path
- Actualizar contador

---

## Regla de Oro: Una pregunta → Un archivo

| Pregunta | Archivo | NO duplicar en |
|----------|---------|----------------|
| "¿Qué estudio?" | `ROADMAP.md` | Plan principal, Metodología |
| "¿Cómo estudio?" | `METODOLOGIA.md` | Plan principal, temas |
| "¿Qué contiene la fase X?" | `Plan de Estudio Pro Max.md` | ROADMAP |
| "¿En qué estaba?" | `PROGRESS.md` | — |
| "¿Qué es FreePress?" | `PROYECTOS.md` | — |

**Si el contenido ya existe en un archivo, referenciarlo, no duplicarlo.**

---

## Checkboxes de temas

Cada archivo de tema tiene checkboxes para subtemas:
```markdown
- [ ] **Subtema 1**
- [ ] **Subtema 2**
```

El estado de estos checkboxes es LOCAL al archivo. No se trackea globalmente.

Para tracking global, usar `PROGRESS.md`.

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
| Nueva fase | Dir + tema + Plan + ROADMAP + PROGRESS + PROYECTOS + METODOLOGIA |
| Nuevo tema | Tema + Plan + ROADMAP (+ PROGRESS si es CORE) |
| Modificar tema | Solo el tema (salvo cambio de CORE/ADVANCED) |
| Eliminar tema | Tema + Plan + ROADMAP + PROGRESS |

---

## Comandos útiles

```bash
# Ver estructura de fases
ls -d Fase*/

# Contar temas por fase
ls Fase\ */*.md | wc -l

# Buscar un tema específico
find . -name "*{termino}*.md"

# Ver todos los archivos CORE
grep -l "\*\*\[CORE\]\*\*" Fase\ */*.md
```
