# Mejoras Pendientes v7 — Plan de Estudio Pro Max

> Revisión crítica realizada el 10/05/2026
> **Estado:** ✅ Completado — 10/05/2026

---

## Contexto de esta revisión

Esta revisión surge de una evaluación crítica del plan completo. Se identificaron problemas estructurales en el método de aprendizaje y en la integración de AI. Dos de estos problemas fueron aprobados por el autor para implementación.

---

## Mejoras pendientes de implementar

---

### ✅ Mejora 1: Learning in Public — Checkpoint Social por tema (Resuelve Problema 2)

**Problema original:**

El "Done cuando" de cada tema es auto-evaluación. La validación externa existe en `Temas Transversales.md` pero está desconectada del flujo de trabajo. El estudiante marca un tema como completado sin que NADIE verifique nada.

**Solución:**

La validación externa pasa a ser parte del "Done cuando" de CADA tema. No es algo aparte, es el cierre natural del tema.

**Implementación concreta:**

Cada archivo de tema (ej: `1.1 — Estructuras de Datos y Algoritmos 🔴.md`) termina con una sección de checkpoint social:

```markdown
---

## 🎯 Checkpoint Social — Validación externa

Este tema NO está completo hasta que:

- [ ] **Publicaste un micro-post** en redes contando qué aprendiste (280-500 caracteres)
- [ ] **Validaste tu explicación** con alguien externo (persona o AI con el prompt de validación)

El post tiene que incluir:
1. Un concepto clave que aprendiste
2. Qué te sorprendió o qué pensabas diferente antes
3. Un link o referencia a tu trabajo (FreePress, repo, o documento)

**Tiempo estimado:** 15-20 minutos por tema
```

**Diferencia entre temas Core y Advanced:**

| Tipo de tema | Checkpoint Social | Frecuencia |
|--------------|-------------------|------------|
| 🔴 **Core** | Micro-post en redes + validación externa | 19 checkpoints en ~15 meses |
| 🟡/🟢 **Advanced** | Solo validación externa (AI o persona) | Opcional, pero recomendado |

**Por tema Core completado, acumulás:**
- 1 micro-post público → portfolio + accountability
- 1 validación externa → demostración real de conocimiento
- 1 checkbox marcado → progreso visible

**Al terminar el Core Path (19 temas), tenés:**
- 19 micro-posts públicos = presencia online como aprendiz activo
- 19 validaciones externas = 19 demostraciones de conocimiento
- Evidencia real, no solo checkboxes

**Archivos a modificar:**
- Todos los archivos de tema Core (19 archivos) — agregar sección "Checkpoint Social"
- `METODOLOGIA.md` — agregar sección explicativa general
- `ROADMAP.md` — mencionar que cada tema tiene checkpoint social

**Riesgo:** Bajo. Cambio incremental que mejora la validación sin alterar estructura.

---

### ✅ Mejora 2: Progresión de uso de AI — Integración gradual desde Fase 0 (Resuelve Problema 3)

**Problema original:**

El plan dice "usá AI desde el día 1" pero "AI Engineering se estudia en el mes 11". Hay 10 meses donde la AI es una caja negra que se usa sin entender.

El resultado: el estudiante usa AI por intuición, no por conocimiento. No sabe evaluarla, no sabe por qué alucina, no sabe cuándo confiar.

**Solución:**

Una **progresión explícita de uso de AI** que crece con el estudiante. La AI se convierte en una herramienta que se domina gradualmente, no en un atajo prohibido ni en una caja negra.

**Progresión por Etapa:**

| Etapa | Uso permitido de AI | Habilidad que desarrollás | Regla clara |
|-------|---------------------|---------------------------|-------------|
| **Entrada** (Fases 0, 2.0, 2.1, 1.1, 5.1) | Solo para validar tu explicación. NO para código | Pensamiento independiente — resolver sin atajos | "Primero vos, después AI" estricto |
| **Fundamentos** (Fases 5.2, 7.1, 1.2, 1.3, 2.2) | Como code reviewer. Le pasás TU código y pedís crítica | Evaluar feedback técnico — discernir críticas válidas de ruido | "Tu código, su ojos" |
| **Arquitectura** (Fases 3.1, 3.2, 6.1, 6.2) | Como pair programmer. Vos liderás, AI sugiere alternativas | Dirigir la herramienta — mantener agencia mientras pedís ayuda | "Vos decidís, ella propone" |
| **Profundización** (Fases 4.1, 4.5, 4.6, 8.2, 9.2, 9.5) | Construir CON AI. RAG, agentes, evals, safety | AI Engineering completo — no solo usarla, entenderla | "La AI como teammate" |

**Cómo se ve esto en práctica:**

**Etapa Entrada (Fases 0-2):**

```markdown
## Uso de AI en esta Etapa

La AI es tu VALIDADOR, no tu reemplazo.

✅ Válido:
- "Voy a explicarte Hash Tables. Decime si mi explicación es correcta."
- "¿Qué casos edge no consideré en esta función?"
- "Este código falla con X input. ¿Ves por qué?" (después de intentarlo vos primero)

❌ NO válido:
- "Implementame un HashMap"
- "¿Cómo se resuelve este ejercicio?"
- "Explicame Big O"

La regla: Si la AI te está explicando antes de que vos intentaste entender, estás perdiendo el aprendizaje.
```

**Etapa Fundamentos (Fases 5.2-2.2):**

```markdown
## Uso de AI en esta Etapa

La AI es tu CODE REVIEWER.

✅ Válido:
- "Este es mi código para X. ¿Qué problemas ves?"
- "¿Esta query SQL es eficiente? ¿Por qué?"
- "Encontrá 3 bugs potenciales en esta función"

❌ NO válido:
- "Escribí la función por mí"
- "Optimizame esta query" (sin entender la original)

La regla: El código tiene que ser tuyo. La crítica puede ser de ella.
```

**Etapa Arquitectura (Fases 3-6):**

```markdown
## Uso de AI en esta Etapa

La AI es tu PAIR PROGRAMMER. Vos conducís.

✅ Válido:
- "¿Cómo implementarías este patrón en NestJS? Mostrame alternativas"
- "¿Qué trade-offs ves entre option A y B?"
- "Ayudame a diseñar la interfaz de este servicio"

La regla: Pedís sugerencias, pero la decisión arquitectónica sigue siendo tuya. Si no podés explicar por qué elegiste X, no entendiste.
```

**Etapa Profundización (Fases 4, 8, 9):**

```markdown
## Uso de AI en esta Etapa

La AI es tu TEAMMATE. Construyen juntos.

✅ Válido:
- "Armemos un agente que haga X" — entendiendo cada parte
- "¿Cómo implemento RAG con estos documentos?" — leyendo los docs oficiales
- "Escribí tests para esta feature" — verificando que los tests sean correctos

La regla: Ya no hay restricción de uso. Pero ahora sí entendés CUÁNDO usarla, QUÉ pedirle, y CÓMO verificar lo que produce.
```

**Implementación concreta:**

Agregar una sección "Uso de AI en esta Etapa" en cada sección de Etapa del `ROADMAP.md`, con las reglas claras para esa etapa.

**Archivos a modificar:**
- `ROADMAP.md` — agregar sección "Uso de AI en esta Etapa" al inicio de cada Etapa
- `METODOLOGIA.md` — expandir la "Regla de AI" con la progresión completa
- `Referencia/Filosofía.md` — mencionar que la regla de AI evoluciona con el estudiante

**Riesgo:** Medio. Requiere ajustar el framing de la "Regla de AI" actual para que no suene binaria.

---

## Notas de implementación

1. **Mejora 1 (Checkpoint Social)** es la más urgente porque afecta directamente la calidad del aprendizaje desde el día 1.
   
2. **Mejora 2 (Progresión de AI)** puede implementarse en paralelo, ya que solo requiere agregar secciones al ROADMAP.

3. Ambas mejoras son **aditivas** — no cambian la estructura del plan, solo agregan capas que mejoran la validación y el uso de herramientas.

---

## Priorización

| Prioridad | Mejora | Impacto | Esfuerzo |
|-----------|--------|---------|----------|
| 🔴 Alta | Checkpoint Social por tema | Alto — valida cada aprendizaje | Medio (19 archivos) |
| 🔴 Alta | Progresión de uso de AI | Alto — integra AI correctamente | Bajo (solo ROADMAP/METODOLOGIA) |

---

**Fecha de creación:** 10/05/2026
**Fecha de completado:** 10/05/2026
**Estado:** ✅ Completado
**Aprobado por:** Autor del plan

---

## Resumen de implementación

- **Mejora 1 (Checkpoint Social):** Agregada sección en METODOLOGIA.md con explicación completa. Cada tema tiene referencia corta con link.
- **Mejora 2 (Progresión de AI):** Sección expandida en METODOLOGIA.md con las 4 etapas. ROADMAP.md tiene "Uso de AI en esta Etapa" en cada etapa. Filosofía.md actualizado.
