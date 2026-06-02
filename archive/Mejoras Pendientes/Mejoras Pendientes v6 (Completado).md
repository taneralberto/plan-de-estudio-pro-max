# Mejoras Pendientes v6 — Plan de Estudio Pro Max

> Revisión crítica realizada el 25/04/2026
> **Estado:** ✅ Completado — 10/05/2026

---

## Contexto de esta revisión

Esta revisión surge de un análisis cruzado de los 7 archivos principales del plan (Plan de Estudio Pro Max, METODOLOGIA, PROGRESS, PROYECTOS, RECURSOS, ROADMAP, README). Se identificaron inconsistencias, duplicaciones y oportunidades de simplificación.

### Lo que ya se resolvió en esta sesión (v6a)

- ✅ Creada carpeta `Referencia/` con archivos dedicados: `Filosofía.md`, `Fundamentos vs AI.md`, `Temas Transversales.md`
- ✅ Movido `RECURSOS.md` a `Referencia/RECURSOS.md`
- ✅ Limpiado `Plan de Estudio Pro Max.md` — eliminadas secciones "Fundamentos vs AI" y "Temas Transversales", reemplazadas con referencias
- ✅ Limpiado `METODOLOGIA.md` — eliminada sección "Temas Transversales" completa (~75 líneas), reemplazada con referencia
- ✅ Corregido doble `---` en `METODOLOGIA.md`
- ✅ Actualizado `README.md` — corregidos links rotos (`Roadmap.md` → `ROADMAP.md`), actualizada estructura con `Referencia/`

### Archivos revisados

- `Plan de Estudio Pro Max.md`, `METODOLOGIA.md`, `PROGRESS.md`
- `PROYECTOS.md`, `RECURSOS.md`, `ROADMAP.md`, `README.md`

---

## Mejoras pendientes de implementar

---

### ✅ Mejora 1: Reordenar PROGRESS.md según el orden del Roadmap (COMPLETADO — 25/04/2026: eliminado PROGRESS.md y todas sus referencias)

**Problema:**

PROGRESS.md lista los 19 temas del Core Path agrupados por fase numérica:
```
Fase 0 → CS Fundamentals → Lenguaje → Seguridad → Bases de Datos → Arquitectura → ...
```

Pero el Roadmap establece un orden de estudio diferente:
```
0 → 2.0+2.1 → 1.1 → 5.1 → 5.2 → 7.1 → 2.2 → 3.1 → 3.2 → 6.1 → 4.1 → ...
```

Alguien que lee PROGRESS de arriba a abajo piensa que después de 1.1 viene 2.0, cuando en realidad viene 5.1 (Seguridad/Auth).

**Solución propuesta:**

Reordenar la lista del Core Path en PROGRESS.md para que siga el orden del Roadmap, no el orden de fases. Así, leer de arriba a abajo te dice exactamente qué viene después.

**Archivos a modificar:** `PROGRESS.md` (sección "Próximos temas")

**Riesgo:** Bajo. Solo cambia el orden visual, no el contenido.

**Decisión del autor:** Vamos a deshacernos del archivo `PROGRESS.md`, asegúrate de borrar sus referencias

---

### ✅ Mejora 2: Core Path en 3 archivos — consolidar fuente de verdad (COMPLETADO — 10/05/2026)

**Problema:**

La lista completa del Core Path (19 temas) aparece en TRES lugares:

| Ubicación | Formato |
|-----------|---------|
| `ROADMAP.md` → "El Core Path" | Tabla con # / Tema / Fase |
| `PROGRESS.md` → "Próximos temas" | Lista con checkboxes agrupada por categoría |
| `Plan de Estudio Pro Max.md` | Marcadores `[CORE]` en cada tema |

Si se agrega o elimina un tema Core, hay que actualizar 3 archivos. Esto ya pasó: cuando se agregó `2.0 — Debugging Básico` en v4, hubo que tocar los 3.

**Solución implementada:**

- **ROADMAP.md** queda como la fuente de verdad del Core Path (ya tiene la tabla completa con orden de estudio)
- **PROGRESS.md** eliminado — ya no existe
- **Plan de Estudio Pro Max.md** mantiene los marcadores `[CORE]` porque son útiles al navegar las fases, pero agrega nota: "La lista consolidada del Core Path está en ROADMAP.md"

**Archivos modificados:** `Plan de Estudio Pro Max.md` (nota agregada)

---

### ✅ Mejora 3: Unificar Checkpoints (METODOLOGIA) con Estado esperado de FreePress (PROYECTOS) (COMPLETADO — 25/04/2026)

**Problema:**

Dos tablas en archivos diferentes describen "qué tenés que demostrar al terminar cada fase":

- **METODOLOGIA.md** → "Checkpoints por Fase" (10 filas, enfocado en habilidades demostrables)
- **PROYECTOS.md** → "Estado esperado de FreePress por Fase" (11 filas, enfocado en el estado del proyecto)

Solapan parcialmente pero dan información complementaria. Ejemplo para Fase 3:
- METODOLOGIA dice: "Dibujás el Context Map... decís si viola el Dependency Rule..."
- PROYECTOS dice: "Arquitectura refactorizada a capas claras... Event-driven... ADR..."

El estudiante no sabe cuál es el criterio real. ¿Los dos? ¿Uno es más importante?

**Solución propuesta:**

Unificar en UNA tabla en `PROYECTOS.md` (porque el checkpoint siempre se valida contra FreePress). Cada fila tiene dos columnas:
- **Habilidad demostrable** (lo de METODOLOGIA): qué sabés hacer
- **Estado de FreePress** (lo de PROYECTOS): qué se ve en el proyecto

METODOLOGIA.md queda con un link: "Ver checkpoints de validación en PROYECTOS.md".

**Archivos a modificar:** `PROYECTOS.md` (merge de tablas), `METODOLOGIA.md` (reemplazar tabla con referencia)

**Riesgo:** Medio. Requiere un merge cuidadoso de las dos tablas fila por fila.

**Decisión del autor:** Hay que unificar

---

### ✅ Mejora 4: METODOLOGIA dice "2h/día, 4-5 días/semana" — no coincide con Roadmap (COMPLETADO — 25/04/2026)

**Problema:**

`METODOLOGIA.md` línea 97 dice:
> "Tiempos orientativos (con ritmo de 2h/día, 4-5 días/semana)"

Pero el `ROADMAP.md` establece un ritmo más específico:
- Lun-Jue: 2h
- Viernes: 1h
- Sábado: libre
- Domingo: 2-3h

No son "4-5 días de 2h" — es un ritmo más variado (Viernes solo 1h, Domingo hasta 3h).

**Solución propuesta:**

Cambiar la línea en METODOLOGIA a:
> "Tiempos orientativos (con ritmo de ~9-11h semanales — ver Tu Ritmo Realista en ROADMAP.md):"

**Archivos a modificar:** `METODOLOGIA.md` (1 línea)

**Riesgo:** Bajo. Cambio mínimo.

**Decisión del autor:** Vamos a quedarnos con el del `ROADMAP.md`

---

### ✅ Mejora 5: Ejemplo de Hash Tables duplicado entre Plan y METODOLOGIA (COMPLETADO — 25/04/2026)

**Problema:**

El ejemplo de Hash Tables aparece en dos archivos con diferente formato:

| Ubicación | Propósito | Formato |
|-----------|-----------|---------|
| `Plan de Estudio Pro Max.md` → "Template: Paso a Paso" | Template para generar pasos a paso | Tabla con Día/Paso/Qué hacer/Tiempo |
| `METODOLOGIA.md` → "Cómo se ve el ciclo en tiempo real" | Mostrar cómo se ve el ciclo de 4 pasos | Blockquote con lista de días |

Mismo ejemplo, diferente framing. El contenido es esencialmente el mismo.

**Solución propuesta:**

Mantener el ejemplo completo en `METODOLOGIA.md` (es sobre CÓMO estudiar — el ciclo en tiempo real). En `Plan de Estudio Pro Max.md`, el template de paso a paso referencia a METODOLOGIA para el ejemplo, y solo deja la instrucción de pedirle a la AI que arme el paso a paso.

Alternativamente, si el template se quiere mantener en el Plan como herramienta rápida, se puede cambiar el ejemplo a otro tema (ej: Event Loop en vez de Hash Tables) para que no se repita.

**Archivos a modificar:** `Plan de Estudio Pro Max.md` o `METODOLOGIA.md` (uno de los dos)

**Riesgo:** Bajo. Decisión de preferencia.

**Decisión del autor:** Pasar el Hash Tables de `Plan de Estudio Pro Max.md` a Referencia en un archivo.

---

### ✅ Mejora 6: RECURSOS.md desconectado de los temas individuales (COMPLETADO — 10/05/2026)

**Problema:**

`RECURSOS.md` es una lista genérica de libros, cursos y plataformas. No hay conexión explícita entre los recursos y las fases/temas donde aplican. Los archivos individuales de cada tema tienen sus propios recursos (en las secciones de cada tema), pero RECURSOS.md no referencia a cuáles fases aplica cada libro.

**Solución implementada (Opción B):**

Se agregó nota aclaratoria al inicio de `RECURSOS.md`:

> **Nota:** Estos recursos aplican a múltiples fases. Para recursos específicos por tema (libros, cursos, artículos), ver cada archivo de tema individual — cada uno tiene su sección de **Recursos** al final.

**Archivos modificados:** `Referencia/RECURSOS.md`

---

## Priorización sugerida

| Prioridad | Mejora | Impacto | Esfuerzo |
|-----------|--------|---------|----------|
| 🔴 Alta | Mejora 1 (Reordenar PROGRESS) | Alto — afecta navegación diaria | Bajo |
| 🔴 Alta | Mejora 4 (Fix "2h/día" en METODOLOGIA) | Medio — inconsistencia visible | Mínimo |
| 🟡 Media | Mejora 3 (Unificar Checkpoints) | Alto — elimina confusión | Medio |
| 🟡 Media | Mejora 2 (Core Path fuente de verdad) | Medio — previene drift futuro | Bajo |
| 🟢 Baja | Mejora 5 (Hash Tables duplicado) | Bajo — cosmético | Bajo |
| 🟢 Baja | Mejora 6 (RECURSOS desconectado) | Bajo — nice to have | Bajo |

---

## Notas para sesiones futuras

1. Las Mejoras 1 y 4 se pueden implementar en una sola sesión rápida (<15 min).
2. La Mejora 3 (unificar checkpoints) requiere un merge cuidadoso fila por fila entre las tablas de METODOLOGIA y PROYECTOS. Hacer diff visual antes de mergear.
3. La Mejora 2 implica una decisión: ¿PROGRESS mantiene su propia lista (más autónomo) o solo referencia al Roadmap (menos duplicación pero más saltos)?
4. Para la Mejora 5, el usuario prefirió tener el template en el Plan (decisión de sesión anterior, 24/04/2026). Si se mantiene ahí, cambiar el ejemplo a otro tema evita la duplicación.
5. La estructura actual después de v6a es:
   - **Raíz:** README, Plan, ROADMAP, PROGRESS, METODOLOGIA, PROYECTOS (6 archivos de uso diario)
   - **Referencia/:** Filosofía, Fundamentos vs AI, Temas Transversales, RECURSOS (4 archivos de consulta)
   - **Fase X/:** Archivos individuales de cada tema

---

## Contexto de decisiones de esta sesión

| Decisión | Justificación |
|----------|---------------|
| Crear `Referencia/` en vez de dejar en raíz | La raíz tenía 7 archivos + carpetas de fases. 3 archivos nuevos la hubieran llevado a 10. Separar "uso diario" de "consulta" aclara la estructura. |
| Mover `RECURSOS.md` a `Referencia/` | Es pura referencia — una lista de libros/cursos consultada esporádicamente. No es un archivo de uso diario. |
| NO mover `METODOLOGIA.md` a `Referencia/` | Se consulta activamente mientras se estudia. Es parte del flujo diario, no solo referencia. |
| NO mover `PROYECTOS.md` a `Referencia/` | Tiene el MVP checklist y estado de FreePress — es tracking activo, no solo referencia. |
| Filosofía.md incluye mención de Regla de AI | La regla es filosófica ("primero vos, después AI") pero el detalle operativo vive en METODOLOGIA. Filosofía tiene el principio, METODOLOGIA las reglas. |
| Temas Transversales.md unifica contenido de 2 archivos | Plan tenía la versión corta (Testing + Debugging), METODOLOGIA tenía la versión larga (Testing + Validación + AI). Se unificó todo en un archivo. |

---

**Fecha de creación:** 25/04/2026
**Fecha de completado:** 10/05/2026
**Estado:** ✅ Completado
