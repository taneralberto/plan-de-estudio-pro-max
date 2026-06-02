# Metodología de Aprendizaje

## Tu Ritmo Realista - **Consistencia > intensidad.**

| Día            | Tiempo                         | Nota                                   |
| -------------- | ------------------------------ | -------------------------------------- |
| Lunes a jueves | 1h trabajo + 1h noche = **2h** | Aprovecha que la AI te adelanta tareas |
| Viernes        | **1h**                         | Descanso mental, más ligero            |
| Sábado         | **Libre**                      | Baile, familia, descanso               |
| Domingo        | **2-3h**                       | Si se puede, profundizar               |

---

## Regla de AI — Progresión por Etapas

La AI evoluciona contigo. No es binaria: crece con tu conocimiento.

| Etapa                  | Rol de la AI    | Regla                                                                 |
| ---------------------- | --------------- | --------------------------------------------------------------------- |
| **1 — Entrada**        | Validador       | Primero tú, después AI. Ella valida tu explicación, no explica por ti |
| **2 — Fundamentos**    | Code Reviewer   | Tu código, su crítica. No escribe código por ti                       |
| **3 — Arquitectura**   | Pair Programmer | Tú conduces, ella sugiere. La decisión arquitectónica es tuya         |
| **4 — Profundización** | Teammate        | Construyen juntos. Ya entiendes cuándo, qué y cómo usarla             |

---

## El Ciclo de Aprendizaje (4 Pasos)

No leas cada libro de principio a fin. Los libros son recursos de REFERENCIA.

### Paso 1 — Video o artículo de overview (1-2 horas)

Busca un video de 20-40 minutos que te dé el mapa mental general. No necesitas entender todo: necesitas saber DE QUÉ SE TRATA.

**Dónde buscar:** Fireship, ByteByteGo, ThePrimeagen, Traversy Media, 3Blue1Brown, Martin Fowler, web.dev.

### Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**La parte más importante.** Si viste un video sobre el Event Loop, abre la consola y escribe 10 ejemplos AHORA.

| Tipo de práctica | Ejemplo |
|------------------|---------|
| **Variación** | El video muestra Stack con array → tú implementas Stack con linked list |
| **From scratch** | Cierra todo y escribe X desde cero |
| **Debugging intencional** | Escribe código que USE el concepto y RÓMPELO a propósito |
| **Enseñar** | Explica el concepto en voz alta como si se lo enseñaras a un junior |

Una sesión cuenta como completa solo si produciste código que NO es copia directa del recurso.

**Señales de sesión mala:** copiaste el tutorial palabra por palabra · no probaste casos diferentes · no rompiste nada · no podrías explicar por qué funciona.

### Paso 3 — Lectura profunda SI algo no quedó claro (variable)

Aquí entran los libros. Lee el **capítulo específico** que necesitas, no todo el libro. Alternativas: documentación oficial, cursos estructurados (Frontend Masters, MIT OCW).

### Paso 4 — Aplicar en un proyecto

El aprendizaje se CONSOLIDA cuando lo aplicas en un proyecto real. Si estás siguiendo FreePress, cada tema tiene una línea **FreePress** con la aplicación concreta. Si no, aplica el ejercicio en cualquier proyecto que estés construyendo. Si no puedes aplicar lo que aprendiste, vuelve al paso 2 o 3.

> **Criterio de completitud:** El "Done cuando" de cada tema es el criterio principal. Un tema se marca ☑ cuando cumples el "Done cuando". El Checkpoint Social es un refuerzo: valida que puedes explicar lo que aprendiste a otra persona, pero no reemplaza el "Done cuando".

---

## Tiempos orientativos

Los símbolos 🔴 🟡 🟢 están definidos en [ROADMAP.md](ROADMAP.md).

| Tipo | Tiempo real |
|------|-------------|
| 🔴 Crítico | 1.5-2 semanas |
| 🟡 Importante | 1 semana |
| 🟢 Complementario | 2-3 días |

**No aceleres los tiempos.** Un tema 🔴 que te lleva 3 semanas pero dominas es mejor que uno que "completas" en 5 días sin entender.

---

## Qué es una sesión bien usada

✅ Escribiste código que no existía antes (aunque esté roto) · Rompiste algo y lo arreglaste entendiendo por qué · Aplicaste algo en un proyecto que antes solo "entendías en teoría"

❌ Pasaste 2 horas tomando notas o haciendo resúmenes · Viste el ejercicio y dijiste "esto lo entiendo, no hace falta hacerlo" · Saltaste el Paso 2 porque "ya sabes de qué se trata"

---

## Checkpoint Social — Validación externa por tema

Un tema no está completo hasta que alguien más validó tu comprensión.

**Temas 🔴 Core (recomendado):**
- [ ] Publicaste un micro-post en redes contando qué aprendiste (280-500 caracteres)
- [ ] Validaste tu explicación con alguien externo (persona o AI con el prompt de validación)

**Temas 🟡/🟢 Advanced (opcional):**
- Validaste tu explicación con alguien externo (AI o persona)
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
[TU EXPLICACIÓN - intenta que sea de 2-3 párrafos]
```

---

## Spaced Repetition — Ritual de Repaso

### Al inicio de cada sesión (5-10 minutos)

Antes de empezar contenido nuevo, elige el último tema que completaste y explícalo en 2 minutos en voz alta, **sin mirar apuntes**.

- ✅ Si puedes explicarlo con fluidez → empieza con el tema nuevo
- ⚠️ Si te bloqueas → dedica 20-30 minutos a revisar, escribe un ejemplo de código y vuelve a intentarlo

### Una vez por mes (~1 hora)

Elige **2-3 temas de etapas anteriores** y haz: explicación oral de 2 minutos + un ejercicio de código desde cero. No releas de entrada: inténtalo primero.

---

## Cómo retomar si se interrumpe

1. Abre [ROADMAP.md](ROADMAP.md) y revisa en qué etapa estabas
2. Continúa desde donde lo dejaste; no vuelvas al principio
3. Si pasaron más de 2 semanas, haz una sesión de repaso de 1 hora del último tema
