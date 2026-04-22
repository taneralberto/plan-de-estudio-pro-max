# Skill Registry — Plan de Estudio Pro Max

Registry de skills específicas para este proyecto.

---

## Project Skills

| Skill | Descripción | Ubicación |
|-------|-------------|-----------|
| `plan-estudio` | Estructura y mantenimiento del Plan de Estudio. Qué modificar al agregar/modificar fases o temas. | [SKILL.md](.agent/skills/plan-estudio/SKILL.md) |

---

## User Skills (Global)

Skills del usuario disponibles en todos los proyectos:

| Skill | Trigger |
|-------|---------|
| `branch-pr` | Crear PR, abrir PR, preparar cambios para review |
| `go-testing` | Escribir tests en Go, teatest, cobertura |
| `issue-creation` | Crear GitHub issue, reportar bug, solicitar feature |
| `judgment-day` | "judgment day", "review adversarial", "doble review", "juzgar" |
| `sdd-*` | Spec-Driven Development workflow |
| `skill-creator` | Crear nueva skill, agregar instrucciones de AI |

---

## Cómo usar las skills

Las skills se cargan automáticamente cuando el contexto coincide con el trigger.

Para cargar manualmente:
```
/skill plan-estudio
```

---

## Compact Rules (para inyección en sub-agentes)

### plan-estudio (inyectar cuando se modifica el plan)

```
## Plan de Estudio — Arquitectura

Archivos raíz con propósito único:
- ROADMAP.md → QUÉ y CUÁNDO estudiar
- METODOLOGIA.md → CÓMO estudiar
- Plan de Estudio Pro Max.md → Catálogo de fases
- PROGRESS.md → Tracking
- PROYECTOS.md → Proyectos
- RECURSOS.md → Recursos

Al agregar NUEVA FASE:
1. Crear directorio + archivos de tema
2. Actualizar Plan de Estudio Pro Max.md (catálogo)
3. Actualizar ROADMAP.md (etapas + Core/Advanced)
4. Actualizar PROGRESS.md (si es CORE)
5. Actualizar PROYECTOS.md (estado esperado)
6. Actualizar METODOLOGIA.md (checkpoint)

Al agregar NUEVO TEMA:
1. Crear archivo de tema
2. Actualizar Plan de Estudio Pro Max.md
3. Actualizar ROADMAP.md
4. Si es CORE: actualizar PROGRESS.md

Regla de oro: Una pregunta → Un archivo. No duplicar contenido.
```
