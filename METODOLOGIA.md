# Metodología de Aprendizaje

Este archivo describe CÓMO estudiar, no QUÉ estudiar. El contenido de temas está en `Plan de Estudio Pro Max.md`. Acá está el método.

---

## 🤖 La Regla de AI

> **Primero lo construís vos. Después la AI puede entrar.**

La AI es válida como:
1. **Revisor de código** — *"Implementé este sistema de cache. ¿Qué problemas ves?"*
2. **Desbloqueador** — cuando llevás 30+ minutos trabado sin avance real
3. **Generador de casos edge** — *"¿Qué inputs romperían esta función?"*

La AI NO es válida para:
- Escribir el código que el plan espera que vos escribas
- Explicar un concepto antes de que intentes entenderlo solo

**Por qué importa:** El aprendizaje ocurre en la fricción. Si la AI elimina la fricción antes de que ocurra, elimina el aprendizaje junto con ella. Código que funciona + programador que no aprendió = falsa confianza peligrosa.

**El objetivo correcto:** No es "que la AI no pueda hacer lo que yo hago" — es "ser el humano que sabe qué pedirle a la AI, verificar lo que produce, y tomar las decisiones que ella no puede tomar sola". Eso requiere conocimiento real.

---

## 🔄 El Ciclo de Aprendizaje (4 Pasos)

No leas cada libro de tapa a tapa. Los libros son recursos de REFERENCIA. La estrategia es este ciclo:

### Paso 1 — Video o artículo de overview (1-2 horas)

Buscá un video de 20-40 minutos que te dé el mapa mental general. No necesitás entender todo — necesitás saber DE QUÉ SE TRATA, cuál es el problema que resuelve, y por qué importa.

**Dónde buscar:**
- **YouTube:** Fireship, ByteByteGo, ThePrimeagen, Traversy Media, 3Blue1Brown
- **Blogs:** Martin Fowler, web.dev, blogs oficiales de cada tecnología
- **Newsletters:** ByteByteGo, TLDR, JavaScript Weekly

### Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**Esta es la parte más importante.** Si miraste un video sobre el Event Loop, abrí la consola y escribí 10 ejemplos AHORA. No mañana — **AHORA**.

La curva del olvido es brutal: si no practicás en 24 horas, perdés el 70%.

**La regla:** no escribas notas bonitas, no hagas resúmenes. **Escribí código.**

#### Tipos de práctica efectiva

No toda práctica es igual. Copiar código del video NO es práctica efectiva.

| Tipo | Qué es | Ejemplo |
|------|--------|---------|
| **Variación** | El recurso mostró X → vos implementás X con una variación | Video muestra Stack con array → vos implementás Stack con linked list |
| **From scratch** | Cerrá todo y escribí X desde cero sin mirar nada | Implementá HashMap sin ver el código del video o tutorial |
| **Debugging intencional** | Escribí código que USE el concepto y ROMPELO a propósito | Escribí un closure con memory leak, después arreglalo entendiendo por qué |
| **Enseñar** | Explicá el concepto en voz alta como si le enseñaras a un junior | Si te trabás, no lo entendiste bien |

#### La regla de oro del Paso 2

Una sesión cuenta como "Paso 2 completo" solo si produciste código que **NO es copia directa** del recurso que consumiste.

**Señales de que estás practicando mal:**
- Escribís lo mismo que el video/tutorial palabra por palabra
- No probaste casos diferentes a los del ejemplo
- No rompiste nada ni tuviste que arreglar nada
- No podrías explicar por qué funciona tu código

### Paso 3 — Lectura profunda SI algo no quedó claro (variable)

Recién acá entran los libros. Leé el **capítulo específico** que necesitás, no todo el libro.

**Alternativas cuando el tema no requiere tanta profundidad:**
- Documentación oficial — siempre la más actualizada
- Cursos estructurados — Frontend Masters, Pluralsight, MIT OCW

### Paso 4 — Aplicar en FreePress (el cierre del ciclo)

El aprendizaje se CEMENTA cuando lo aplicás en un proyecto real. FreePress es tu proyecto principal. Los mini-proyectos satélite cubren lo que no encaja ahí.

Si no podés aplicar lo que aprendiste, es señal de que necesitás volver al paso 2 o 3.

---

## Cómo se ve el ciclo en el tiempo real

El ciclo no ocurre en una sentada. Para un tema 🔴:

> **Ejemplo: Hash Tables (1.1)**
>
> - **Día 1 (lunes):** Paso 1 — video de overview + leer capítulo 5 de *Grokking Algorithms*. 1.5 horas.
> - **Día 2 (martes):** Paso 2 — implementás tu propio `HashMap` desde cero en TypeScript. 2 horas.
> - **Día 3 (miércoles):** Paso 2 continúa — el `HashMap` tiene un bug con colisiones. Lo arreglás. Hacés 3 ejercicios de NeetCode. 1.5 horas.
> - **Día 4 (jueves):** Paso 3 (opcional) — algo no quedó claro sobre amortized O(1). Leés la sección específica de MDN. 45 minutos.
> - **Día 5-6:** Paso 4 — implementás búsqueda de artículos en FreePress usando un Map para el índice. Comparás con búsqueda lineal.
> - **Día 7:** "Done cuando" — verificás el criterio de completitud. Si podés explicar qué pasa internamente cuando hacés `map.set(key, value)`, marcás el checkbox.

**Tiempos orientativos:**
- Temas 🔴: 5-7 días
- Temas 🟡: 3-4 días
- Temas 🟢: 1-2 días

---

## Qué es una sesión bien usada

Una sesión de 2 horas donde **escribiste código** es una sesión bien usada.

Una sesión de 2 horas donde solo miraste videos o leíste artículos es útil — pero no es suficiente sola, y no cuenta como avance real.

**Señales positivas:**
- Escribiste código que no existía antes (aunque esté roto)
- Rompiste algo y lo arreglaste entendiendo por qué
- Aplicaste algo en FreePress que antes solo "entendías en teoría"

**Señales negativas:**
- Pasaste 2 horas "tomando notas" o haciendo resúmenes
- Miraste el ejercicio y dijiste "esto lo entiendo, no hace falta hacerlo"
- Saltaste el Paso 2 porque "ya sabés de qué se trata"

---

## ⏱️ Ritmo Realista

Con este ciclo, cada tema te debería llevar entre **1 y 2 semanas** estudiando 2-3 horas diarias enfocadas.

Este plan, hecho bien, son **12 a 24 meses**. No es un sprint de 3 meses. Si lo apurás, no aprendés — acumulás la ilusión de haber aprendido.

**La consistencia gana sobre la intensidad.** 3 sesiones de 2 horas por semana durante un año es infinitamente mejor que 2 meses intensos y 4 meses de parálisis.

---

## 🏁 Checkpoints por Fase

Al terminar cada fase, validá tu aprendizaje con un entregable concreto. No alcanza con "lo leí y lo entendí" — necesitás DEMOSTRAR que lo internalizaste.

| Fase | Checkpoint — lo que tenés que poder producir o demostrar |
|------|----------------------------------------------------------|
| **Fase 0** | Abrís el repo de FreePress y encontrás en `/docs`: un ADR que justifica el stack con alternativas consideradas, y un PRD del editor WYSIWYG. Podés explicar la diferencia entre PRD, RFC y ADR en 2 minutos sin mirar apuntes. |
| **Fase 1** | Tomás cualquier función del backend de FreePress y decís su complejidad Big O temporal y espacial en menos de 2 minutos, justificando el razonamiento. Podés explicar con un diagrama propio cómo el event loop de Node.js maneja dos requests HTTP concurrentes. |
| **Fase 2** | Abrís Chrome DevTools, ponés un breakpoint en el código compilado, y traceás la ejecución de una acción del usuario hasta la respuesta del servidor. Podés explicar qué hace el compilador de TypeScript con un generic condicional que usaste. |
| **Fase 5** | Abrís el código de auth de FreePress y señalás al menos 2 superficies de ataque potenciales. Corrés la suite de tests — pasan todos. `npm audit` sin críticos. Corrés un benchmark con Artillery o k6 sobre el endpoint más lento y podés leer el reporte. |
| **Fase 7** | Abrís psql contra la base de FreePress, ejecutás `EXPLAIN ANALYZE` sobre la query más pesada, y podés leer el plan de ejecución: identificás Seq Scans donde no deberían estar y sabés qué índice agregarías. Podés mostrar una migración de schema versionada que no rompe datos existentes. |
| **Fase 3** | Dibujás en el momento el Context Map de FreePress con sus Bounded Contexts y el tipo de relación entre ellos, justificando cada límite. Podés abrir cualquier módulo y decir si viola el Dependency Rule de Clean Architecture — y si viola, explicar exactamente cuál dependencia apunta en la dirección incorrecta. |
| **Fase 6** | Abrís el test de un componente Angular de FreePress y determinás en 5 minutos si está testeando comportamiento o implementación. Podés mostrar en Storybook las variantes del componente principal del sistema de diseño. Podés explicar qué pasa en el render pipeline del browser cuando Angular actualiza un componente con OnPush. |
| **Fase 4** | Hacés un deploy de FreePress a producción desde cero (desde `git push` hasta el sistema corriendo) en menos de 10 minutos usando el pipeline de CI/CD. Podés abrir el dashboard de observabilidad y responder: ¿qué endpoint tiene la latencia P99 más alta esta semana y por qué? |
| **Fase 8** | Mostrás `fp-ai-assistant` funcionando con al menos una feature real integrada a FreePress. Podés explicar qué es RAG, por qué existe, y qué problema resuelve que un LLM sin contexto no puede resolver — con el código de FreePress como ejemplo concreto. |
| **Fase 9** | Abrís el módulo más viejo de FreePress, mostrás que tiene characterization tests, y explicás al menos una decisión de diseño que cambiarías hoy y por qué. Podés abrir un PR y hacer un code review escrito con comentarios en formato Conventional Comments. |

---

## Cómo retomar si se interrumpe

Si la vida interrumpe el plan:

1. **Abrí `PROGRESS.md`** y mirá en qué estabas.
2. **No volvás al principio.** Continuá desde donde dejaste.
3. **Si pasaron más de 2 semanas**, hacé una sesión de repaso de 1 hora del último tema — no más.
4. **La consistencia gana sobre la intensidad.** 3 sesiones de 2 horas por semana durante un año > 2 meses intensos + 4 meses de parálisis.

---

## 🧪 Temas Transversales

### Testing

El testing NO se aprende al final. Se practica desde el día 1.

**La regla:** Desde la Fase 2 (Lenguaje), cada feature que agregues a FreePress incluye:
- Al menos **1 test unitario** para la lógica core
- Al menos **1 test de integración** para el endpoint o flujo completo

No es "agregar tests después" — es "escribir tests como parte del desarrollo".

#### ¿Por qué desde el principio?

Escribir código sin tests durante 6 meses genera código **no testeable por diseño**. Cuando llegues a las fases de testing avanzado, vas a tener que reescribir todo.

Si escribís tests desde el día 1:
- Tu código es testeable por construcción
- Aprendés a pensar en edge cases naturalmente
- Los tests se convierten en documentación viva
- El refactoring es seguro porque tenés red

#### Testing básico que necesitás saber desde Fase 2

Antes de profundizar en testing (Fases 5 y 6), necesitás lo mínimo:

1. **Jest básico:** `describe`, `it`, `expect`, `beforeEach`
2. **Testing de funciones puras:** input → output esperado
3. **Testing de endpoints:** supertest o equivalente para tu stack
4. **Un test double simple:** mock básico para dependencias

Con eso alcanza para escribir tests útiles desde el principio. Los patrones avanzados vienen en `5.3 — Testing Backend` y `6.4 — Testing Frontend`.

### Validación externa — No te auto-engañes

El "Done cuando" dice "podés explicar X sin mirar apuntes". ¿Pero cómo sabés que realmente podés? La auto-evaluación es traicionera: podés creer que entendés algo cuando no lo entendés.

**La regla:** Un tema no está completo hasta que RECIBISTE VALIDACIÓN EXTERNA de que lo entendés.

#### Formas de validar

| Método | Cómo funciona | Cuándo usarlo |
|--------|---------------|---------------|
| **Explicar a otra persona** | Le contás el concepto a un amigo/colega. ¿Lo entendió? | Ideal, pero requiere tener alguien disponible |
| **Explicar a una AI** | Le pedís a Claude/ChatGPT: "Voy a explicarte X. Decime si mi explicación es correcta o si me falta algo" | Rápido, disponible siempre, feedback inmediato |
| **Escribir un mini-artículo** | Redactás el concepto como si fuera un blog post. Si alguien lo lee y lo entiende, válido | Útil para temas complejos que querés recordar |
| **Enseñar en un video** | Grabáte explicando el tema. Si podés explicarlo fluido sin trabarte, lo dominás | Para temas que querés dominar en profundidad |
| **Code review cruzado** | Le pedís a alguien que revise el código que escribiste para ese tema | Útil para temas de código específicos |

#### El prompt para validar con AI

```
Voy a explicarte [CONCEPTO] con mis propias palabras. 
Después de leer mi explicación, evaluá:
1. ¿Es técnicamente correcta?
2. ¿Hay algo importante que me falta?
3. ¿Hay algo que entendí mal?

Mi explicación:
[TU EXPLICACIÓN ACÁ]
```

#### Señales de que NO entendés (aunque creas que sí)

- Solo podés explicarlo con las mismas palabras del recurso original
- Te trabás cuando alguien te hace una pregunta de seguimiento
- No podés dar un ejemplo diferente al del tutorial
- No podés conectar el concepto con TU código real

**La prueba de fuego:** Si no podés explicar el concepto a un junior sin usar jerga técnica que él no entienda, no lo dominás todavía.

### Evaluar código AI

Cada línea de código que la AI genera y vos aceptás, LA APROBASTE VOS.

> **Para el checklist completo de verificación, ejercicio de "bug hunt" y patrones de error típicos, ver `9.5 — Leer Código Ajeno y Code Review` → sección "Revisar código generado por AI".**
