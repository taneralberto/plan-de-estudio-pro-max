# Metodología de Aprendizaje

## Tu Ritmo Realista

El plan está diseñado para **2-3 horas, 3-4 días por semana**.

| Día | Tiempo | Nota |
|-----|--------|------|
| Lunes a Jueves | 1h trabajo + 1h noche = **2h** | Aprovechá que la AI te adelanta tareas |
| Viernes | **1h** | Descanso mental, más ligero |
| Sábado | **Libre** | Baile, familia, descanso |
| Domingo | **2-3h** | Si se puede, profundizar |

**Total semanal:** ~9-11 horas. **Consistencia > intensidad.**

---

## Regla de AI — Progresión por Etapas

La AI evoluciona con vos. No es binaria — crece con tu conocimiento.

| Etapa | Rol de la AI | Regla |
|-------|-------------|-------|
| **1 — Entrada** | Validador | Primero vos, después AI. Ella valida tu explicación, no explica por vos |
| **2 — Fundamentos** | Code Reviewer | Tu código, su crítica. No escribe código por vos |
| **3 — Arquitectura** | Pair Programmer | Vos conducís, ella sugiere. La decisión arquitectónica es tuya |
| **4 — Profundización** | Teammate | Construyen juntos. Ya entendés cuándo, qué y cómo usarla |

---

## El Ciclo de Aprendizaje (4 Pasos)

No leas cada libro de tapa a tapa. Los libros son recursos de REFERENCIA.

### Paso 1 — Video o artículo de overview (1-2 horas)

Buscá un video de 20-40 minutos que te dé el mapa mental general. No necesitás entender todo — necesitás saber DE QUÉ SE TRATA.

**Dónde buscar:** Fireship, ByteByteGo, ThePrimeagen, Traversy Media, 3Blue1Brown, Martin Fowler, web.dev.

### Paso 2 — Práctica hands-on INMEDIATA (2-4 horas)

**La parte más importante.** Si miraste un video sobre el Event Loop, abrí la consola y escribí 10 ejemplos AHORA.

| Tipo de práctica | Ejemplo |
|------------------|---------|
| **Variación** | Video muestra Stack con array → vos implementás Stack con linked list |
| **From scratch** | Cerrá todo y escribí X desde cero |
| **Debugging intencional** | Escribí código que USE el concepto y ROMPELO a propósito |
| **Enseñar** | Explicá el concepto en voz alta como si le enseñaras a un junior |

Una sesión cuenta como completa solo si produciste código que NO es copia directa del recurso.

**Señales de sesión mala:** copiaste el tutorial palabra por palabra · no probaste casos diferentes · no rompiste nada · no podrías explicar por qué funciona.

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
3. Decirme qué profundicé bien y qué me faltó
4. Si algo está mal, corregirme con la explicación correcta

El concepto es: [TU TEMA]

Mi explicación:
[TU EXPLICACIÓN - intentá que sea de 2-3 párrafos]
```

---

## Spaced Repetition — Ritual de Repaso

### Al inicio de cada sesión (5-10 minutos)

Antes de arrancar contenido nuevo, elegí el último tema que completaste y explicalo en 2 minutos en voz alta, **sin mirar apuntes**.

- ✅ Si podés explicarlo fluidamente → arrancá con el tema nuevo
- ⚠️ Si te trabás → dedicate 20-30 minutos a revisar, escribí un ejemplo de código, y volvé a intentar

### Una vez por mes (~1 hora)

Elegí **2-3 temas de etapas anteriores** y hacé: explicación oral de 2 minutos + un ejercicio de código desde cero. No releas de entrada — intentá primero.

---

## Cómo retomar si se interrumpe

1. Abrí [ROADMAP.md](ROADMAP.md) y mirá en qué etapa estabas
2. Continuá desde donde dejaste — no volvás al principio
3. Si pasaron más de 2 semanas, hacé una sesión de repaso de 1 hora del último tema
4. La consistencia gana: 3 sesiones de 2 horas/semana durante un año > 2 meses intensos + 4 meses de parálisis