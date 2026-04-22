# Mejoras Pendientes v4 — ✅ COMPLETADO

> Revisión crítica del plan realizada el 21/04/2026
> Implementación completada el 22/04/2026
> **Estado:** ✅ 7 implementadas | ❌ 1 descartada

---

## Contexto de esta revisión

Se realizó una revisión completa del plan de estudio con foco en:
- Estructura y organización
- Metodología de aprendizaje
- Adecuación para el contexto de 2026 (AI omnipresente)

Se revisaron los archivos principales:
- `Plan de Estudio Pro Max.md`
- `METODOLOGIA.md`
- `PROYECTOS.md`
- `PROGRESS.md`
- Items específicos de Fase 0, 1, 3, 5, 8

---

## Mejoras Aceptadas

### ❌ 1. ~~Renumerar fases según secuencia real~~ — DESCARTADO

El usuario decidió no implementar esta mejora. La numeración actual se mantiene.

**Problema:**
Las fases están numeradas 0-9 pero la secuencia recomendada es distinta (0 → 2 → 1 → 5 → 7 → 3 → 6 → 4 → 8 → 9). Esto genera confusión cognitiva: el estudiante debe hacer un mapeo mental cada vez que busca un tema.

**Solución propuesta:**
Eliminar la numeración y usar solo nombres descriptivos. Las fases no son pasos secuenciales, son dominios de conocimiento. Ejemplo:
- "Fase 0 — Mentalidad" → "Mentalidad y Proceso de Ingeniería"
- "Fase 1 — CS Fundamentals" → "Ciencias de la Computación que te Salteaste"
- etc.

**Archivos afectados:**
- `Plan de Estudio Pro Max.md` (estructura completa)
- Todas las carpetas de fases (renombrar)
- `PROGRESS.md` (referencias)
- `PROYECTOS.md` (tabla de estado esperado)

---

### ✅ 2. Agregar validación externa a "Done cuando" — IMPLEMENTADO

**Solución aplicada:**
Se agregó la sección "Validación externa — No te auto-engañes" en Temas Transversales de METODOLOGIA.md con:
- Tabla de métodos de validación (persona, AI, artículo, video, code review)
- Prompt para validar con AI
- Señales de que NO entendés

**Archivo modificado:** `METODOLOGIA.md` (líneas 296-332)

**Problema:**
El plan asume que el estudiante puede auto-evaluarse. "Done cuando: podés explicar X sin mirar apuntes" — ¿pero quién valida eso? Sin feedback externo, puede creer que entiende algo cuando no lo entiende.

**Solución propuesta:**
Modificar cada "Done cuando" para requerir validación explícita:

```markdown
**Done cuando:** Podés explicar X sin mirar apuntes Y:
- Se lo explicaste a otra persona (amigo, colega) que lo entendió, O
- Se lo explicaste a una AI que confirmó que la explicación es correcta, O
- Escribiste un mini-artículo/blog post que otros pueden leer
```

**Archivos afectados:**
- Todos los archivos de temas (fases 0-9)
- `METODOLOGIA.md` (agregar sección de validación)

---

### ✅ 3. Estructurar el Paso 2 (práctica inmediata) — IMPLEMENTADO

**Solución aplicada:**
Se agregó la sección "Tipos de práctica efectiva" con tabla de 4 tipos (Variación, From scratch, Debugging intencional, Enseñar), más la "Regla de oro del Paso 2" y señales de mala práctica.

**Archivo modificado:** `METODOLOGIA.md` (líneas 47-66)

**Problema:**
El plan dice "escribí código" pero no da estructura. Un estudiante puede "practicar" escribiendo el mismo código del video sin entenderlo.

**Solución propuesta:**
Definir tipos de práctica concretos en `METODOLOGIA.md`:

```markdown
### Paso 2 — Práctica hands-on INMEDIATA

**Tipos de práctica efectiva:**

1. **Variación del ejemplo:** El video mostró X → vos implementás X con una variación
2. **From scratch:** Cerrá todo y escribí X desde cero sin mirar nada
3. **Debugging intencional:** Escribí código que USE el concepto y ROMPELO a propósito
4. **Enseñar:** Explicá el concepto en voz alta como si le enseñaras a un junior

**La regla:** Una sesión cuenta como "Paso 2 completo" solo si produciste código 
que NO es copia directa del recurso que consumiste.
```

**Archivos afectados:**
- `METODOLOGIA.md`

---

### ✅ 4. Agregar "Plan B" si FreePress se traba — IMPLEMENTADO

**Solución aplicada:**
Se agregó la sección completa "🆘 Plan B — Si FreePress se traba" con tabla de alternativas para Docker, Angular, PostgreSQL, NestJS, y el proyecto completo.

**Archivo modificado:** `PROYECTOS.md` (líneas 81-107)

**Problema:**
FreePress es el proyecto principal. Si el estudiante se traba en una parte específica (Docker, Angular, PostgreSQL), se traba en TODO el plan. La frustración con UN aspecto técnico puede hacer abandonar el plan entero.

**Solución propuesta:**
Agregar sección en `METODOLOGIA.md` o `PROYECTOS.md`:

```markdown
## 🆘 Plan B — Si FreePress se traba

| Problema | Solución alternativa |
|----------|---------------------|
| Docker no funciona | SQLite local + Node directo. Docker se aprende en Fase 4 |
| Angular frustra | Cambiar a React o Vue. El framework NO importa para el 80% del plan |
| PostgreSQL complica | Empezar con SQLite. El modelado relacional es lo mismo |

**La regla:** FreePress es el vehículo, no el destino. Si el vehículo se rompe, 
cambiá de vehículo. Lo importante es que estés aprendiendo.
```

**Archivos afectados:**
- `PROYECTOS.md` (agregar sección)
- `METODOLOGIA.md` (referenciar)

---

### ✅ 5. Mover debugging a posición temprana — IMPLEMENTADO

**Solución aplicada:**
Se creó el nuevo tema "2.0 — Debugging Básico 🔴 [CORE]" con 4 secciones: Chrome DevTools, Console methods, Node.js debugging, y Metodología de debugging.

**Archivos creados/modificados:**
- Nuevo: `Fase 2 — Lenguaje y Runtime/2.0 — Debugging Básico 🔴.md`
- Actualizado: `Plan de Estudio Pro Max.md` (agregado a Fase 2)
- Actualizado: `PROGRESS.md` (contador 0/19, agregado a lista)
- Actualizado: `PROYECTOS.md` (nueva fila en tabla de estados)

**Core Path:** Ahora tiene 19 temas (antes 18)

**Problema:**
Debugging está en Fase 9 (la última). Pero el estudiante va a tener bugs desde la semana 2. Sin habilidades de debugging, cada bug es un bloqueo que frena el aprendizaje.

**Solución propuesta:**
Agregar un tema "2.0 — Debugging Básico" como CORE, antes de JS Internals:

```markdown
### 2.0 — Debugging Básico 🔴 [CORE]

- Chrome DevTools básico: breakpoints, call stack, scope
- Console methods que no son console.log: table, dir, time, assert
- Node debugger: node --inspect, VS Code debugging
- La metodología de debugging: no "probar cosas al azar"

**Done cuando:** Podés encontrar un bug en código ajeno en menos de 10 minutos 
usando breakpoints y call stack, no console.log en todos lados.
```

Esto significa que el Core Path pasa de 18 a 19 temas.

**Archivos afectados:**
- `Plan de Estudio Pro Max.md` (agregar tema)
- Nueva carpeta/archivo para el tema
- `PROGRESS.md` (agregar a lista Core)
- `METODOLOGIA.md` (ajustar primeros 30 días)

---

### ✅ 6. Agregar "evaluar código AI" como práctica transversal — IMPLEMENTADO

**Solución aplicada:**
Se agregó la sección "Evaluar código AI — Tu nueva responsabilidad" en Temas Transversales de METODOLOGIA.md con:
- Checklist de 6 verificaciones antes de aceptar código AI
- Ejercicio del "bug hunt" obligatorio
- Prompt para que la AI ayude a evaluar
- Tabla de lo que la AI NO va a detectar

**Archivo modificado:** `METODOLOGIA.md` (líneas 334-393)

**Problema:**
El plan menciona evaluar código AI en 9.5, pero eso es al final. En la práctica, el estudiante va a recibir código AI desde el día 1.

**Solución propuesta:**
Integrar "evaluar código AI" como ejercicio recurrente en cada fase:

```markdown
### Ejercicio de verificación AI (agregar a cada tema)

Generá código para [concepto del tema] usando AI. Después:
1. Encontrá al menos UN problema que la AI no detectó
2. Explicá por qué es un problema
3. Arreglalo

**Done cuando:** Podés tomar código AI y encontrar en 5 minutos al menos un 
problema real (bug, mal patrón, performance, seguridad) que la AI no mencionó.
```

**Archivos afectados:**
- Todos los archivos de temas (agregar ejercicio)
- `METODOLOGIA.md` (agregar sección)

---

### ✅ 7. Agregar tablas "En producción se ve cuando" en CS Fundamentals — IMPLEMENTADO

**Solución aplicada:**
Se agregaron 6 tablas al final de cada sección del archivo 1.1:
1. Big O — En producción
2. Arrays vs Linked Lists — En producción
3. Hash Tables — En producción
4. Árboles y Grafos — En producción
5. Ordenamiento — En producción
6. Recursión y DP — En producción

**Archivo modificado:** `Fase 1 — CS Fundamentals/1.1 — Estructuras de Datos y Algoritmos 🔴.md`

**Problema:**
El estudiante pregunta "¿para qué me sirve saber Big O?" y la respuesta es abstracta. Necesita ejemplos concretos de cómo se aplica en el trabajo real.

**Solución propuesta:**
Agregar a cada sección de `1.1` una tabla con ejemplos de producción:

```markdown
## Hash Tables — En producción

| Situación real | Qué está pasando | Cómo lo sabés |
|----------------|------------------|---------------|
| `getUser(id)` instantáneo, `getUsersByRole("admin")` tarda 5s | O(1) vs O(n) | Entendés qué índice falta |
| Tu caché funciona hasta que hay colisiones | Hash collision degrada O(1) a O(n) | Sabés por qué se degrada |
| Un objeto como key en Map "no funciona" | `{}` se convierte en `"[object Object]"` | Entendés que Objects no son keys válidas |
```

**Archivos afectados:**
- `Fase 1 — CS Fundamentals/1.1 — Estructuras de Datos y Algoritmos 🔴.md`

---

### ✅ 8. Hacer testing transversal desde Fase 2 — IMPLEMENTADO

**Solución aplicada:**
Se agregó la sección "Testing" en "Temas Transversales" de METODOLOGIA.md con:
- La regla de escribir tests desde Fase 2
- Justificación de por qué desde el principio
- Testing básico necesario (Jest básico, funciones puras, endpoints, test double)

**Archivo modificado:** `METODOLOGIA.md` (líneas 263-294)

**Problema:**
Testing está en 5.3 y 6.4. Pero si el estudiante escribe código desde la semana 2, debería escribir tests desde la semana 2. Escribir código sin tests durante 6 meses genera código no testeable por diseño.

**Solución propuesta:**
Hacer de testing una práctica obligatoria desde el inicio:

```markdown
## Testing como práctica transversal

Desde Fase 2 (Lenguaje), cada feature de FreePress incluye:
- Al menos 1 test unitario para la lógica core
- Al menos 1 test de integración para el endpoint/flujo

### 5.3 y 6.4 son profundización

Testing en Fase 5 y 6 es para aprender PATRONES avanzados:
- Test doubles (mocks, stubs, fakes, spies)
- Property-based testing
- Testing de performance

Pero la PRÁCTICA arranca en Fase 2.
```

**Archivos afectados:**
- `METODOLOGIA.md` (agregar sección transversal)
- `Plan de Estudio Pro Max.md` (agregar a Temas Transversales)
- `PROYECTOS.md` (ajustar Definition of Done)

---

## Mejoras Descartadas (con justificación)

| Mejora propuesta | Por qué se descarta |
|------------------|---------------------|
| Sistema de repaso programado (spaced repetition) | Por ahora no es prioritario. El plan ya es denso. Se puede agregar en una futura iteración. |
| Sección "AI como copiloto" en Metodología | Ya se explica en Fase 0, tema 0.2 (Metodologías y Procesos). No es necesario duplicar. |

---

## Lo que está excelente (no cambiar)

- Filosofía "Conceptos primero, herramientas después"
- Proyecto FreePress como hilo conductor
- División Core Path vs Advanced Track
- Los "Done cuando" específicos (solo falta validación externa)
- El ciclo de 4 pasos (overview → práctica → profundidad → aplicar)
- La sección "Fundamentos vs AI — ¿Por qué aprender si la AI lo hace?"

---

## Próximos pasos sugeridos

### ✅ Implementadas (22/04/2026)

| # | Mejora | Estado |
|---|--------|--------|
| 3 | Estructurar Paso 2 | ✅ Implementado |
| 4 | Plan B en PROYECTOS.md | ✅ Implementado |
| 5 | Debugging Básico (2.0) | ✅ Implementado |
| 7 | Tablas "En producción" en 1.1 | ✅ Implementado |
| 8 | Testing transversal | ✅ Implementado |

### ✅ Todas las mejoras implementadas o descartadas

| # | Mejora | Estado |
|---|--------|--------|
| 1 | Renumerar fases | ❌ Descartado por el usuario |
| 2 | Validación externa "Done cuando" | ✅ Implementado en METODOLOGIA.md |
| 6 | Ejercicio verificación AI | ✅ Implementado en METODOLOGIA.md |

---

## Resumen de implementación

**Fecha de implementación:** 22/04/2026

### Primera tanda (subagentes en paralelo)

1. ✅ Nuevo tema 2.0 — Debugging Básico creado (73 líneas)
2. ✅ Core Path actualizado a 19 temas
3. ✅ PROGRESS.md actualizado con nuevo tema y contador
4. ✅ PROYECTOS.md: Plan B agregado + fila para Fase 2.0
5. ✅ METODOLOGIA.md: Paso 2 estructurado + Testing transversal
6. ✅ 1.1 Algoritmos: 6 tablas "En producción" agregadas

### Segunda tanda

7. ✅ METODOLOGIA.md: Validación externa + Evaluar código AI (en Temas Transversales)

**Archivos modificados:** 5
**Archivos creados:** 1
**Total mejoras implementadas:** 7 de 8 (1 descartada)

**Impacto:** El plan ahora tiene:
- Metodología de práctica concreta (Paso 2 estructurado)
- Debugging desde el día 1 (nuevo tema 2.0)
- Testing como práctica transversal
- Alternativas si FreePress se traba (Plan B)
- Ejemplos de producción para conectar teoría con realidad
- Validación externa del aprendizaje
- Evaluación crítica de código AI

---

## Notas para futuras sesiones

- El Core Path ahora tiene **19 temas** (se agregó 2.0 — Debugging Básico)
- Si se implementa #1 (renumerar fases), verificar que todos los links internos sigan funcionando
- Las mejoras #2 y #6 quedaron pendientes por requerir modificaciones a TODOS los archivos de temas
