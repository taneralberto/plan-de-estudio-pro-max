# Metodología de Aprendizaje

## Tu Ritmo Realista - **Consistencia > intensidad.**

| Día            | Tiempo                         | Nota                                   |
| -------------- | ------------------------------ | -------------------------------------- |
| Lunes a jueves | 1h trabajo + 1h noche = **2h** | Aprovecha que la AI te adelanta tareas |
| Viernes        | **1h**                         | Descanso mental, más ligero            |
| Sábado         | **Libre**                      | Baile, familia, descanso               |
| Domingo        | **2-3h**                       | Si se puede, profundizar               |

---

## Cómo usar AI y coding agents — Tres modos desde la Etapa 1

Los tres modos aplican en todas las etapas. La habilidad a entrenar es dirigir y verificar trabajo, no desbloquear gradualmente más ayuda.

| Modo | Cuándo | Regla |
|------|--------|-------|
| **Gimnasio** | Fundamento nuevo | Haz una repetición corta sin AI para formar el modelo mental y detectar qué no sabes. |
| **Trabajo** | Tarea delegable | Antes de delegar, escribe objetivo, restricciones, archivos permitidos, criterios de aceptación y comandos de verificación. |
| **Auditoría** | Después de una entrega de AI | Inspecciona el diff, ejecuta checks, agrega un caso adversarial, compara con documentación y decide aceptar, corregir o revertir. |

### Protocolo mínimo para una tarea delegada

1. Escribe primero una predicción, hipótesis o contrato de tarea.
2. Da el mínimo contexto necesario y limita alcance, archivos, herramientas, permisos, tiempo y presupuesto.
3. Exige que el agente reporte archivos cambiados y checks realmente ejecutados.
4. No confíes en “tests passed” sin ejecutar o revisar la evidencia.
5. Busca cambios fuera de alcance y dependencias nuevas.
6. Agrega un caso negativo o adversarial que el agente probablemente omitió.
7. Registra en una frase por qué aceptaste, corregiste o revertiste.
8. Exige aprobación humana explícita para acciones irreversibles o externas.

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

> **Criterio local:** Los “Done cuando” de cada archivo comprueban el dominio inmediato de sus subtemas. En temas 🔴 no bastan para marcar el tema completo.

## Cierre de un tema crítico

Un tema 🔴 se marca completo en [ROADMAP.md](ROADMAP.md) solo cuando cumple este contrato:

- [ ] **Artefacto:** código, benchmark, diagrama, ADR, runbook o informe enlazado.
- [ ] **Verificación independiente:** tests, documentación primaria, medición o revisión humana. La AI puede criticar, pero no ser la única prueba.
- [ ] **Caso negativo:** una forma documentada de romper la solución o falsar la explicación.
- [ ] **R1:** recuperación breve sin apuntes al día siguiente.
- [ ] **R7:** variante con datos o restricciones diferentes, sin tutorial paso a paso.
- [ ] **R30:** recuperación breve treinta días después.

---

## Tiempos orientativos

Los símbolos 🔴 🟡 🟢 están definidos en [ROADMAP.md](ROADMAP.md).

| Tipo | Tiempo real |
|------|-------------|
| 🔴 Crítico | 1.5-2 semanas de trabajo activo + cierre R30 |
| 🟡 Importante | 1 semana |
| 🟢 Complementario | 2-3 días |

Estos tiempos estiman trabajo activo, no días calendario: un tema 🔴 no se marca completo hasta R30, aunque ya hayas empezado el siguiente.

**No aceleres los tiempos.** Un tema 🔴 que te lleva 3 semanas pero dominas es mejor que uno que "completas" en 5 días sin entender.

---

## Qué es una sesión bien usada

✅ Escribiste código que no existía antes (aunque esté roto) · Rompiste algo y lo arreglaste entendiendo por qué · Aplicaste algo en un proyecto que antes solo "entendías en teoría"

❌ Pasaste 2 horas tomando notas o haciendo resúmenes · Viste el ejercicio y dijiste "esto lo entiendo, no hace falta hacerlo" · Saltaste el Paso 2 porque "ya sabes de qué se trata"

---

## Checkpoint social — Refuerzo opcional

Explicar a otra persona puede aportar una revisión humana independiente, pero no es obligatorio publicar ni sustituye tests, documentación primaria o mediciones. Una validación hecha solo por AI tampoco basta como evidencia independiente.

- [ ] Explicaste el tema a otra persona o publicaste un micro-post, si te aporta feedback útil.
- [ ] Contrastaste el feedback recibido con la evidencia del artefacto.

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

## Interleaving sin caos

Reserva alrededor del 20 % de una sesión para discriminar conceptos relacionados, no para mezclar temas al azar: Debugging ↔ JavaScript internals; SQL ↔ migraciones/concurrencia; API Design ↔ seguridad; Observabilidad ↔ debugging avanzado; Evals ↔ seguridad de agentes.

## Spaced Repetition — R1/R7/R30

Para cada tema 🔴 usa las marcas de [ROADMAP.md](ROADMAP.md):

- **R1 (+1 día):** recupera la idea y el artefacto sin mirar apuntes; si te bloqueas, revisa y repite.
- **R7 (+7 días):** resuelve una variante con datos o restricciones diferentes. Esta es la prueba de transferencia.
- **R30 (+30 días):** explica y verifica de nuevo una parte crítica sin releer primero.

Los repasos pueden ocupar 5–10 minutos. Si fallas uno, corrige el artefacto o la explicación y vuelve a programar esa marca; no reinicies el plan.

---

## Cómo retomar si se interrumpe

1. Abre [ROADMAP.md](ROADMAP.md) y revisa en qué etapa estabas
2. Continúa desde donde lo dejaste; no vuelvas al principio
3. Si pasaron más de 2 semanas, haz una sesión de repaso de 1 hora del último tema
