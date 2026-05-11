# Metodología de Aprendizaje

> CÓMO estudiar, no QUÉ estudiar. El contenido y orden de temas está en [Plan de Estudio Pro Max.md](Plan%20de%20Estudio%20Pro%20Max.md). Acá está el método.

---

## Tu Ritmo Realista

El plan está diseñado para **2-3 horas, 3-4 días por semana**.

| Día | Tiempo | Nota |
|-----|--------|------|
| Lunes a Jueves | 1h trabajo + 1h noche = **2h** | Aprovechá que la AI te adelanta tareas |
| Viernes | **1h** | Descanso mental, más ligero |
| Sábado | **Libre** | Baile, familia, descanso |
| Domingo | **2-3h** | Si se puede, profundizar |

**Total semanal:** ~9-11 horas → **DENTRO del rango del plan** (6-12h)

> **Consistencia > intensidad.** Mejor 1 hora todos los días que 4 horas un domingo y nada más.

---

## Filosofía: Los conceptos PRIMERO

1. **Conceptos antes que código** — No se toca un framework sin entender qué problema resuelve. No se copia código sin entender POR QUÉ funciona. Un framework es una herramienta; si no entendés el problema que resuelve, no podés evaluar si es la correcta.

2. **Cada etapa construye sobre la anterior** — El plan tiene un orden por una razón. Saltar etapas es como construir el segundo piso sin cimientos: parece que funciona hasta que no.

3. **La regla de oro** — No marques un tema como completado hasta que puedas EXPLICARLO a otro programador sin mirar apuntes. Si no podés explicarlo, no lo dominás.

---

## ¿Por qué aprender si la AI lo hace?

La AI puede implementar, pero no puede decidir CUÁNDO ni CÓMO para TU contexto específico.

| La AI SÍ puede | La AI NO puede |
|----------------|-----------------|
| Implementar un HashMap, un QuickSort, un sistema de caching | Decidir si tu caso necesita HashMap vs Trie vs B-Tree |
| Generar código que compile y funcione para casos comunes | Detectar su propio error (hallucinations, APIs inexistentes) |
| Explicar conceptos con ejemplos | Entender tu proyecto, tus convenciones, tu deuda técnica |
| Escribir tests si le pedís | Evaluar tradeoffs PARA VOS |

El conocimiento que TE sirve: evaluar código AI, detectar hallucinations, tomar decisiones arquitectónicas, y promptar mejor. La AI va a estar presente en tu trabajo desde el día 1 — el objetivo es ser el humano que sabe **qué pedirle, cómo verificarlo, y qué decidir**.

---

## La Regla de AI — Progresión por Etapas

> La AI evoluciona con vos. No es una regla binaria — es una progresión que crece con tu conocimiento.

### Etapa 1: Entrada — AI como VALIDADOR

La AI NO escribe código por vos. La AI valida lo que vos entendiste.

✅ Válido:
- "Voy a explicarte Hash Tables. Decime si mi explicación es correcta."
- "¿Qué casos edge no consideré en esta función?"
- "Este código falla con X input. ¿Ves por qué?" (después de intentarlo vos primero)

❌ NO válido:
- "Implementame un HashMap"
- "¿Cómo se resuelve este ejercicio?"
- "Explicame Big O"

**Regla:** Si la AI te está explicando antes de que vos intentaste entender, estás perdiendo el aprendizaje.

### Etapa 2: Fundamentos — AI como CODE REVIEWER

Tu código, sus ojos.

✅ Válido:
- "Este es mi código para X. ¿Qué problemas ves?"
- "¿Esta query SQL es eficiente? ¿Por qué?"
- "Encontrá 3 bugs potenciales en esta función"

❌ NO válido:
- "Escribí la función por mí"
- "Optimizame esta query" (sin entender la original)

**Regla:** El código tiene que ser tuyo. La crítica puede ser de ella.

### Etapa 3: Arquitectura — AI como PAIR PROGRAMMER

Vos conducís, ella sugiere.

✅ Válido:
- "¿Cómo implementarías este patrón en NestJS? Mostrame alternativas"
- "¿Qué trade-offs ves entre option A y B?"
- "Ayudame a diseñar la interfaz de este servicio"

**Regla:** Pedís sugerencias, pero la decisión arquitectónica sigue siendo tuya. Si no podés explicar por qué elegiste X, no entendiste.

### Etapa 4: Profundización — AI como TEAMMATE

Construyen juntos. Ya no hay restricción de uso.

✅ Válido:
- "Armemos un agente que haga X" — entendiendo cada parte
- "¿Cómo implemento RAG con estos documentos?" — leyendo los docs oficiales
- "Escribí tests para esta feature" — verificando que los tests sean correctos

**Regla:** Ya no hay restricción. Pero ahora sí entendés CUÁNDO usarla, QUÉ pedirle, y CÓMO verificar lo que produce.

### Resumen

| Etapa | Uso permitido | Habilidad que desarrollás | Regla |
|-------|---------------|---------------------------|-------|
| **Entrada** | Validar tu explicación | Pensamiento independiente | "Primero vos, después AI" |
| **Fundamentos** | Code reviewer de tu código | Evaluar feedback técnico | "Tu código, su crítica" |
| **Arquitectura** | Pair programmer, vos decidís | Dirigir la herramienta | "Vos conducís, ella sugiere" |
| **Profundización** | Teammate, construir juntos | AI Engineering completo | "Entendés CUÁNDO, QUÉ y CÓMO" |

---

## El Ciclo de Aprendizaje (4 Pasos)

No leas cada libro de tapa a tapa. Los libros son recursos de REFERENCIA.

### Paso 1 — Video o artículo de overview (1-2 horas)

Buscá un video de 20-40 minutos que te dé el mapa mental general. No necesitás entender todo — necesitás saber DE QUÉ SE TRATA.

**Dónde buscar:** Fireship, ByteByteGo, ThePrimeagen, Traversy Media, 3Blue1Brown, Martin Fowler, web.dev.

### Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**La parte más importante.** Si miraste un video sobre el Event Loop, abrí la consola y escribí 10 ejemplos AHORA.

La regla: no escribas notas bonitas. **Escribí código.**

| Tipo de práctica | Qué es | Ejemplo |
|------------------|--------|---------|
| **Variación** | El recurso mostró X → vos implementás X con una variación | Video muestra Stack con array → vos implementás Stack con linked list |
| **From scratch** | Cerrá todo y escribí X desde cero | Implementá HashMap sin ver el código del tutorial |
| **Debugging intencional** | Escribí código que USE el concepto y ROMPELO a propósito | Escribí un closure con memory leak, después arreglalo |
| **Enseñar** | Explicá el concepto en voz alta como si le enseñaras a un junior | Si te trabás, no lo entendiste bien |

**Una sesión cuenta como "Paso 2 completo" solo si produciste código que NO es copia directa del recurso.**

Señales de práctica mala: escribís lo mismo que el video palabra por palabra · no probaste casos diferentes · no rompiste nada · no podrías explicar por qué funciona.

### Paso 3 — Lectura profunda SI algo no quedó claro (variable)

Recién acá entran los libros. Leé el **capítulo específico** que necesitás, no todo el libro. Alternativas: documentación oficial, cursos estructurados (Frontend Masters, MIT OCW).

### Paso 4 — Aplicar en FreePress (el cierre del ciclo)

El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real. Si no podés aplicar lo que aprendiste, volvé al paso 2 o 3.

---

## Tiempos orientativos

| Tipo | Tiempo real | Por qué |
|------|-------------|---------|
| 🔴 Crítico | 1.5-2 semanas | Requiere práctica profunda + aplicación en FreePress |
| 🟡 Importante | 1 semana | Menos profundidad, pero necesita hands-on |
| 🟢 Complementario | 2-3 días | Lectura + ejercicio ligero |

**No apures los tiempos.** Un tema 🔴 que te lleva 3 semanas pero lo dominás es mejor que uno que "completás" en 5 días sin entender.

---

## Qué es una sesión bien usada

✅ Escribiste código que no existía antes (aunque esté roto) · Rompiste algo y lo arreglaste entendiendo por qué · Aplicaste algo en FreePress que antes solo "entendías en teoría"

❌ Pasaste 2 horas tomando notas o haciendo resúmenes · Miraste el ejercicio y dijiste "esto lo entiendo, no hace falta hacerlo" · Saltaste el Paso 2 porque "ya sabés de qué se trata"

---

## Temas Transversales

### Testing — desde la Etapa 1

Desde que empezás a escribir código en FreePress, cada feature incluye:
- Al menos **1 test unitario** para la lógica core
- Al menos **1 test de integración** para el endpoint o flujo completo

Escribir código sin tests durante meses genera código no testeable por diseño. Los temas de profundización (Testing Backend 4.10, Testing Frontend 3.6) expanden esto, pero la práctica arranca desde el día 1.

Lo mínimo que necesitás desde el inicio: Jest básico (`describe`, `it`, `expect`, `beforeEach`), testing de funciones puras, testing de endpoints con supertest, un mock simple para dependencias.

### Debugging y Mantenibilidad

- `4.5 — Debugging Avanzado 🔴` — leelo antes de tu primer bug difícil en FreePress
- `4.3 — Mantenibilidad y Deuda Técnica 🟡` — leelo antes de construir FreePress en serio

Los hábitos se forman desde el día 1, no se aprenden al final.

---

## Checkpoint Social — Validación externa por tema

Un tema no está completo hasta que alguien más validó tu comprensión.

**Temas 🔴 Core:**
- [ ] Publicaste un micro-post en redes contando qué aprendiste (280-500 caracteres)
- [ ] Validaste tu explicación con alguien externo (persona o AI con el prompt de validación)

**Temas 🟡/🟢 Advanced:**
- [ ] Validaste tu explicación con alguien externo (AI o persona)
- La publicación en redes es opcional pero recomendada

### El micro-post debe incluir:
1. **Un concepto clave** que aprendiste
2. **Qué te sorprendió** o qué pensabas diferente antes
3. **Un link o referencia** a tu trabajo

### Prompt de validación (para AI):

```
Voy a explicarte un concepto técnico. Tu trabajo es:

1. Evaluar si mi explicación es técnicamente correcta
2. Identificar cualquier concepto erróneo o confuso
3. Decirme qué profundicé bien y qué me faltó profundizar
4. Si algo está mal, corregirme con la explicación correcta

El concepto es: [TU TEMA]

Mi explicación:
[TU EXPLICACIÓN - intentá que sea de 2-3 párrafos]
```

### ¿Por qué importa?

Sin validación externa, es fácil marcarse un tema como "completado" cuando solo se consumió contenido. La validación fuerza a: **articular** lo que aprendiste en tus propias palabras, **recibir feedback** sobre huecos, y **publicar** evidencia de tu aprendizaje.

**Tiempo estimado:** 15-20 minutos por tema.

### Señales de que NO entendés (aunque creas que sí)

- Solo podés explicarlo con las mismas palabras del recurso original
- Te trabás cuando alguien te hace una pregunta de seguimiento
- No podés dar un ejemplo diferente al del tutorial
- No podés conectar el concepto con TU código real

**La prueba de fuego:** Si no podés explicar el concepto a un junior sin usar jerga técnica que él no entienda, no lo dominás todavía.

---

## Evaluar código AI

Cada línea de código que la AI genera y vos aceptás, LA APROBASTE VOS.

Patrones de error típico en código AI: hallucinations (APIs que no existen), parámetros inventados, edge cases ignorados, soluciones genéricas que no respetan tu arquitectura. Ver tema `4.6 — Code Review` para el checklist completo.

---

## Cómo retomar si se interrumpe

1. Abrí [Plan de Estudio Pro Max.md](Plan%20de%20Estudio%20Pro%20Max.md) y mirá en qué etapa estabas
2. No volvás al principio. Continuá desde donde dejaste
3. Si pasaron más de 2 semanas, hacé una sesión de repaso de 1 hora del último tema — no más
4. La consistencia gana sobre la intensidad. 3 sesiones de 2 horas por semana durante un año > 2 meses intensos + 4 meses de parálisis

---

## Cómo usar este archivo

- **Primera vez:** Leé completo para entender el método
- **Cada sesión:** Volvé a "El Ciclo de Aprendizaje" si necesitás recordar los 4 pasos
- **Al completar un tema:** Usá "Checkpoint Social" para validar tu comprensión
- **Al usar AI:** Volvé a "La Regla de AI" para verificar que estás en la etapa correcta