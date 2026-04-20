# Mejoras Pendientes v2 — Plan de Estudio Pro Max

Este archivo registra los problemas estructurales y metodológicos identificados en una revisión crítica del plan realizada el 19/04/2026. No son errores de contenido técnico (el contenido está bien) — son problemas de estructura, método de aprendizaje, y usabilidad del plan como herramienta diaria.

**Cómo usar este archivo:**
- Cada mejora tiene suficiente contexto para trabajarla en una sesión futura sin necesidad de recordar la conversación original.
- El orden de los ítems refleja prioridad (los 🔴 primero).
- Cuando una mejora esté implementada, marcá su checkbox y agregá una nota de qué se hizo exactamente.
- Este archivo se trabaja junto a un agente de AI en sesiones iterativas — no es para resolver todo de una vez.

---

## 🔴 Mejora 1 — El plan da tres respuestas distintas a "¿por dónde empiezo?"

- [ ] Implementada

### El problema

El plan tiene tres fuentes de verdad en conflicto sobre el orden de estudio:

1. **La numeración de fases** sugiere: Fase 0 → Fase 1 → Fase 2 → Fase 3...
2. **La tabla "Sugerencia de Secuencia"** dice: Fase 0 → Fase 1 → Fase 2 → Fase 5 → Fase 7 → Fase 3 → Fase 6 → Fase 4 → Fase 8 → Fase 9
3. **La advertencia sobre Fase 1** dice: Fase 0 → Fase 1.1 → *desvío a Fase 2* → Fase 1.2, 1.3... → continuar

Cuando alguien arranca, la primera pregunta es *"¿qué estudio mañana?"*. El plan da tres respuestas dependiendo de dónde mire. Eso es cognitive load innecesario en el momento más crítico — el inicio — que es exactamente donde más se abandona un plan de estudio.

### Por qué importa

El inicio es el momento de mayor fricción y menor contexto. Si el lector tiene que reconciliar tres fuentes en conflicto antes de estudiar el primer tema, parte del esfuerzo que debería ir al aprendizaje va a navegar el propio plan. Un buen plan de estudios debería responder "¿qué hago mañana?" en menos de 10 segundos.

### Qué se necesita agregar

Una sección nueva en la portada (`Plan de Estudio Pro Max.md`) llamada **"Por dónde empezar — los primeros 30 días"** que sea prescriptiva, no descriptiva. No más opciones, no más "dependiendo de X". Una decisión tomada:

- Semana 1: qué tema, qué ejercicio concreto, qué entregable al final de la semana
- Semana 2: ídem
- Semana 3-4: ídem
- Cómo retomar si se interrumpe

Esta sección NO reemplaza la tabla de secuencia (que es útil como visión general) — la complementa con una entrada operacional concreta. La tabla es el mapa; esta sección es "arrancá acá, mirá allá, caminá así".

### Archivos afectados

- `Plan de Estudio Pro Max.md` — agregar la sección nueva después del bloque "Cómo Afrontar Cada Tema"

### Referencia de calidad

El criterio de éxito es: alguien que abre el plan por primera vez puede saber exactamente qué estudiar mañana en menos de 10 segundos, sin necesidad de leer la tabla ni reconciliar la numeración con la secuencia sugerida.

---

## 🔴 Mejora 2 — El ciclo de 4 pasos describe el ideal, no lo cotidiano

- [ ] Implementada

### El problema

El ciclo de aprendizaje documentado en la portada tiene 4 pasos:
1. Video o artículo de overview (1-2 horas)
2. Práctica hands-on inmediata (2-4 horas)
3. Lectura profunda si algo no quedó claro (variable)
4. Aplicar en FreePress (el cierre del ciclo)

El problema: ese ciclo completo para un solo tema puede durar entre 5 y 10 días de sesiones dispersas de 2-3 horas. Pero el plan lo presenta como si fuera un proceso que se hace *en una sentada*. No lo dice explícitamente, pero tampoco lo desmiente.

### Por qué importa

Si alguien arranca el ciclo, completa el Paso 1 en la primera sesión, y al final de esa sesión siente que "no terminó el ciclo" — esa sensación de incompletud es el primer eslabón del abandono. El plan implícitamente crea una expectativa que el ritmo real de aprendizaje no puede cumplir.

El ciclo está bien conceptualizado. El problema no es el qué sino el cómo se presenta.

### Qué se necesita agregar

Dos cosas en la sección del ciclo (`Plan de Estudio Pro Max.md`):

1. **Un ejemplo de cómo se ve el ciclo en el tiempo real**, con días concretos:
   - *Día 1 (lunes): Paso 1 — video de overview de Hash Tables, 45 minutos*
   - *Día 2 (martes): Paso 2 — implementar tu propio HashMap en TypeScript, 2 horas*
   - *Día 3 (miércoles): Paso 2 continúa / Paso 3 si algo no quedó claro*
   - *Día 4-5: Paso 4 — aplicar en FreePress*
   - *Día 6: Done cuando — verificar criterio de completitud*

2. **Una descripción de qué es "una sesión bien usada"** de 2 horas. No cuántos pasos completa — qué actitud y qué práctica la definen. Algo como: *"Una sesión de 2 horas donde escribiste código es una sesión bien usada. Una sesión de 2 horas donde solo leíste o miraste videos es útil pero no suficiente sola."*

### Archivos afectados

- `Plan de Estudio Pro Max.md` — expandir la sección "Cómo Afrontar Cada Tema — El Ciclo de Aprendizaje"

### Referencia de calidad

El criterio de éxito es: alguien que termina su primera sesión de estudio de 2 horas habiendo solo completado el Paso 1 del ciclo NO siente que lo hizo mal — siente que avanzó exactamente lo esperado.

---

## 🟡 Mejora 3 — FreePress no tiene un estado esperado por fase

- [ ] Implementada

### El problema

FreePress es el proyecto ancla del plan — la idea es que crece con el aprendizaje. El plan dice que hay que crear el scaffold al terminar la Fase 0. Pero después de eso, no hay ninguna correlación explícita del tipo:

- *Al terminar Fase 1 → FreePress debería tener X*
- *Al terminar Fase 2 → FreePress debería tener Y*
- *Al terminar Fase 3 → FreePress debería tener Z*

Los ejercicios individuales conectan temas específicos con FreePress, pero no existe una visión del estado esperado del proyecto por fase.

### Por qué importa

Sin esa guía, hay dos riesgos opuestos que el plan no mitiga:

1. **El estudiante subestima**: estudia los temas pero posterga FreePress, y el proyecto queda como decoración. El aprendizaje queda teórico.
2. **El estudiante sobreestima**: se lanza a construir FreePress antes de tener las bases, construye con patrones incorrectos, y aprender los antipatrones antes que los patrones es peor que no haber practicado.

El plan menciona este riesgo implícitamente ("No construyas todo de entrada") pero no da la herramienta para manejarlo: el estado esperado por fase.

### Qué se necesita agregar

Una tabla o sección en la descripción de FreePress en la portada que mapee fase → estado del proyecto:

| Fase completada | Estado esperado de FreePress |
|---|---|
| Fase 0 | Repo creado, scaffold Angular + NestJS + Docker Compose, primer ADR escrito |
| Fase 1 | ... |
| Fase 2 | ... |
| etc. | ... |

Esto no tiene que ser exhaustivo ni prescriptivo al nivel de "tal commit exacto". Tiene que ser suficientemente específico para que el estudiante pueda verificar si su FreePress refleja lo que aprendió — o si está atrasado/adelantado.

### Archivos afectados

- `Plan de Estudio Pro Max.md` — expandir la sección "Proyecto Principal — FreePress" con la tabla de estado por fase

### Referencia de calidad

El criterio de éxito es: al terminar cualquier fase, el estudiante puede mirar FreePress y decir "sí, esto refleja lo que aprendí" o "no, me quedé corto — tengo que volver y aplicar X". Sin ambigüedad.

---

## 🟡 Mejora 4 — La Fase 9 debería ser transversal, no secuencial

- [ ] Implementada

### El problema

La Fase 9 se llama "El Programador Completo" y contiene:
- `9.1 — Open Source`
- `9.2 — Debugging Avanzado`
- `9.3 — Mantenibilidad y Deuda Técnica`
- `9.4 — Temas que Pocos Dominan`

El problema es que estos temas —especialmente Debugging y Mantenibilidad— no son cosas que se aprenden al final. Son hábitos que se forman (o NO se forman) durante el proceso de construir. Ponerlos en una "Fase 9" envía el mensaje implícito de que son lo último que importa. Es exactamente lo contrario.

- **Debugging avanzado** es relevante desde el primer día que abrís un debugger en FreePress.
- **Mantenibilidad** se practica (o se ignora) cada commit que hacés en las Fases 2, 3, 5.
- **Open Source** es una práctica continua, no un destino.

### Por qué importa

Los hábitos no se instalan leyendo un capítulo al final del plan. Se instalan haciendo algo repetidamente durante meses. Si Debugging y Mantenibilidad están en la Fase 9, el estudiante los estudia cuando ya construyó meses de FreePress con los hábitos que tenía antes. Eso es mucho más difícil de cambiar que haberlos construido bien desde el principio.

### Qué se necesita hacer

**Opción A (recomendada):** Convertir `9.2 — Debugging Avanzado` y `9.3 — Mantenibilidad y Deuda Técnica` en una sección de "Prácticas Continuas" en la portada, con una nota explícita: *"Estos no esperan a que termines otras fases. Empezán desde el día 1, se practica en cada sesión, y se profundiza progresivamente."*

Los archivos `9.2` y `9.3` pueden quedar donde están como referencia de contenido — pero con un banner al inicio que diga que son prácticas continuas, no temas secuenciales.

**Opción B (más simple):** Agregar en la portada, dentro de "Temas Transversales" (que ya existe para Testing), una mención explícita de `9.2` y `9.3` como prácticas continuas.

`9.1 — Open Source` y `9.4 — Temas que Pocos Dominan` sí pueden quedarse como fase secuencial al final — esos sí tienen prerrequisitos reales.

### Archivos afectados

- `Plan de Estudio Pro Max.md` — sección "Temas Transversales" o nueva sección "Prácticas Continuas"
- `Fase 9 — El Programador Completo/9.2 — Debugging Avanzado 🔴.md` — agregar banner de "práctica continua"
- `Fase 9 — El Programador Completo/9.3 — Mantenibilidad y Deuda Técnica 🟡.md` — agregar banner de "práctica continua"

### Referencia de calidad

El criterio de éxito es: alguien que empieza la Fase 1 sabe que Debugging y Mantenibilidad son compromisos activos desde ese momento — no temas para estudiar "después".

---

## 🟡 Mejora 5 — Los checkpoints por fase son demasiado genéricos

- [ ] Implementada

### El problema

La portada tiene este callout sobre checkpoints:

> *"Al terminar cada fase, validá tu aprendizaje con un mini-entregable concreto. Puede ser: explicarle el tema a alguien (o grabar un video de 5 minutos), escribir un artículo/blogpost corto, o implementar algo en FreePress que USE ese conocimiento."*

Ese criterio aplica igual para todas las fases — y eso es el problema. Una fase puede tener 3 temas (Fase 0) u 8 temas de diferente naturaleza (Fase 1). El "entregable" va a ser muy diferente en complejidad y forma. Y dejar al estudiante decidir qué demostrar es dejar la validación al criterio menos capacitado en ese momento: el propio estudiante que acaba de aprender algo nuevo.

### Por qué importa

La validación del aprendizaje es el paso más importante y el más fácil de saltear. Un checkpoint genérico ("explicale a alguien") es fácilmente evitable con un "ya sé de qué trata" que puede ser completamente falso. Un checkpoint específico ("diseñá el Context Map de FreePress con 4 bounded contexts y justificá cada relación") es difícil de fingir.

### Qué se necesita agregar

Un checkpoint específico por fase, al final de cada archivo de fase en la portada (o como sección dedicada). No genérico. Que sea un entregable concreto, observable, y difícil de fingir. Ejemplos del nivel de especificidad esperado:

- **Fase 0 checkpoint:** Tenés escritos en el repo de FreePress: un PRD para el editor WYSIWYG, un RFC para el sistema de plugins, y 3 ADRs para las decisiones de stack. Alguien externo puede leerlos y entender exactamente qué se va a construir y por qué.
- **Fase 1 checkpoint:** Podés tomar cualquier función de FreePress, decir su complejidad Big O en 2 minutos, y justificarlo. Podés explicar con un diagrama cómo el event loop de Node.js maneja una request HTTP concurrente.
- **Fase 2 checkpoint:** Podés abrir el devtools de Chrome, poner un breakpoint en el código compilado de FreePress, y tracear la ejecución de una feature completa desde el evento del usuario hasta la respuesta del servidor.

Estos checkpoints van en la portada como tabla, o como sección al final de cada bloque de fase.

### Archivos afectados

- `Plan de Estudio Pro Max.md` — agregar checkpoints específicos por fase (tabla o sección)

### Referencia de calidad

El criterio de éxito es: el checkpoint de cada fase es lo suficientemente específico como para que sea difícil "aprobarlo" sin haber realmente internalizado lo que la fase enseña.

---

## 🟢 Mejora 6 — Testing en Fase 6 no tiene referencia cruzada visible

- [ ] Implementada

### El problema

Testing está partido en dos archivos:
- `5.3 — Testing Backend y API 🔴` (marco conceptual + backend)
- `6.4 — Testing Frontend 🟡` (testing de componentes Angular)

La solución elegida fue agregar una nota en la sección "Temas Transversales" de la portada diciendo que se deben estudiar como unidad. Eso está bien. El problema es que la nota vive en la portada — y cuando alguien llega a la Fase 6 después de semanas o meses de estudio, es muy probable que no recuerde esa nota.

### Qué se necesita hacer

Agregar un banner al inicio del archivo `6.4 — Testing Frontend 🟡.md` que diga explícitamente:

> *⚠️ **Este archivo es la continuación directa de `5.3 — Testing Backend y API`**. El marco conceptual (Testing Trophy, filosofía de Testing Library, qué testear y qué no) está en ese archivo — no se repite acá. Si no lo estudiaste, hacelo primero.*

Simple, pequeño, efectivo.

### Archivos afectados

- `Fase 6 — Frontend Avanzado/6.4 — Testing Frontend 🟡.md` — agregar banner al inicio

### Referencia de calidad

El criterio de éxito es: alguien que llega a `6.4` directamente (sin pasar por la portada) sabe inmediatamente que necesita `5.3` primero.

---

## 🔴 Mejora 7 — El rol de la AI en el proceso de aprendizaje no está definido

- [ ] Implementada

### El problema

El plan no dice explícitamente cómo, cuándo y para qué se puede usar la AI durante el estudio y la construcción de FreePress. Eso parece un detalle menor — no lo es. En ausencia de una regla clara, el camino de menor resistencia es usar la AI para todo, y eso destruye el aprendizaje silenciosamente: el estudiante siente que avanza (el código funciona, los ejercicios están "hechos") pero no internalizó nada. Es la ilusión de aprendizaje más peligrosa que existe hoy.

### El origen de la conversación

Esta mejora surgió de una discusión sobre si el plan debería incorporar a la AI como herramienta de estudio, dado que el objetivo declarado del plan es "no quedar desplazado por la AI". La conclusión fue que el objetivo en sí tiene una trampa conceptual — y que la regla sobre cuándo usar AI durante el aprendizaje necesita ser explícita y estar en el plan.

### El marco conceptual que falta (para tener contexto al implementar)

**Sobre el objetivo "no quedar desplazado por la AI":**

Es un objetivo defensivo, y los objetivos defensivos tienen un problema estructural: estás corriendo detrás de algo que se mueve más rápido que vos. La AI va a seguir mejorando. Lo que hoy requiere un senior, mañana lo hace un modelo.

El objetivo ganador no es *"que la AI no pueda hacer lo que yo hago"* — es *"ser el humano que sabe qué pedirle a la AI, verificar lo que produce, y tomar las decisiones que la AI no puede tomar sola"*. Eso requiere conocimiento real, no conocimiento delegado.

**Por qué la AI no puede estar en la construcción de FreePress (durante el aprendizaje):**

El aprendizaje ocurre en la fricción. Cuando algo no compila, cuando el test falla, cuando no entendés por qué tu HashMap tiene colisiones — ahí está el aprendizaje. Si la AI elimina esa fricción antes de que ocurra, elimina el aprendizaje junto con ella.

Usar la AI para escribir el código de FreePress mientras se aprende produce código que funciona y un programador que no aprendió nada. Es exactamente peor que no haber practicado — porque además da falsa confianza.

**La regla central:**

> Primero lo construís vos. Después la AI puede entrar.

### Los tres roles válidos para la AI (después de hacer el trabajo)

1. **Revisor de código** — *"Implementé este sistema de cache con Redis. ¿Qué problemas ves?"* La AI como par senior que revisa lo que vos ya escribiste.
2. **Desbloqueador** — cuando ya intentaste resolver algo y estás bloqueado hace más de 30 minutos sin avance real. No para que resuelva el problema — para que te dé una pista de por dónde buscar.
3. **Generador de casos edge** — *"¿Qué inputs romperían esta función?"* Para fortalecer lo que ya implementaste.

**El rol que la AI NO debe tener nunca en este plan:**
- Escribir el código de FreePress o de cualquier ejercicio que el estudiante tendría que escribir para aprender.
- Explicar un concepto antes de que el estudiante haya intentado entenderlo solo (el intento fallido es parte del aprendizaje).

### Qué se necesita agregar al plan

**En `Fase 0 — Mentalidad y Proceso`** (específicamente como tema nuevo o como sección de `0.2`): una sección sobre cómo trabajar con AI como herramienta de desarrollo profesional. No como tecnología a estudiar (eso es Fase 8) sino como práctica y actitud que se establece desde el día 1. Debe incluir:

- La distinción entre usar AI como amplificador (válido) vs como reemplazo (destruye el aprendizaje)
- La regla "primero vos, después la AI"
- Los tres roles válidos descritos arriba
- Cómo hacer code review de código generado por AI (tiene patrones de error distintos al código humano — excesiva confianza, alucinaciones con APIs, código que compila pero tiene lógica incorrecta)
- Cómo detectar cuando la AI está alucinando con confianza (el riesgo más silencioso)

**En la portada** (`Plan de Estudio Pro Max.md`): un callout corto en la sección de filosofía o en "Cómo usar este plan" que establezca la regla desde el principio, antes de que el estudiante empiece.

### Archivos afectados

- `Plan de Estudio Pro Max.md` — callout sobre la regla de AI en la sección de filosofía
- `Fase 0 — Mentalidad y Proceso/0.2 — Metodologías y Procesos 🔴.md` — nuevo tema o sección sobre AI como herramienta de desarrollo

### Referencia de calidad

El criterio de éxito es: alguien que lee el plan tiene absolutamente claro en qué momentos del estudio puede abrir el chat de la AI y en cuáles no — sin necesidad de razonarlo cada vez.

---

## Contexto de la revisión

**Fecha:** 19/04/2026  
**Revisado por:** Claude (Sonnet 4.5) junto al autor del plan  
**Alcance de la revisión:** Estructura y método de aprendizaje — no contenido técnico  
**Veredicto sobre el contenido técnico:** Sólido. Los temas están bien elegidos, los recursos son curados y justificados, los "Done cuando" son observables y verificables. Los problemas identificados son todos estructurales o metodológicos, no de fondo.
