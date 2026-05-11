# Skill Registry — Plan de Estudio Pro Max

Registry de skills específicas para este proyecto.

---

## Project Skills

| Skill | Descripción | Ubicación |
|-------|-------------|-----------|
| `plan-estudio` | Estructura y mantenimiento del Plan de Estudio. Qué modificar al agregar/modificar etapas o temas. | [SKILL.md](.agent/skills/plan-estudio/SKILL.md) |

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

Archivos raíz con propósito único (una pregunta → un archivo):
- Plan de Estudio Pro Max.md → QUÉ estudiar y en qué ORDEN
- METODOLOGIA.md → CÓMO estudiar
- PROYECTOS.md → QUÉ construir
- PROGRESO.md → DÓNDE estás
- Referencia/RECURSOS.md → CON QUÉ estudiar

Al agregar NUEVA ETAPA:
1. Crear directorio + archivos de tema
2. Actualizar Plan de Estudio Pro Max.md (catálogo)
3. Actualizar PROYECTOS.md (checkpoints)
4. Actualizar PROGRESO.md (temas Core)
5. Actualizar METODOLOGIA.md (checkpoint si aplica)

Al agregar NUEVO TEMA:
1. Crear archivo de tema
2. Actualizar Plan de Estudio Pro Max.md
3. Si es Core: actualizar PROGRESO.md

Regla de oro: Una pregunta → Un archivo. No duplicar contenido.
```