# Metodología de Aprendizaje

El objetivo es convertir experiencia en criterio recuperable, no acumular horas de contenido. La práctica empieza antes que la lectura larga.

## Presupuesto semanal

Usa unas **10 horas semanales** como presupuesto flexible, no como calendario diario obligatorio:

| Uso | Horas orientativas |
|---|---:|
| Práctica principal y debugging | 5–6 h |
| Aplicación en un artefacto pequeño | 2 h |
| R1/R7/R30 e interleaving | 1 h |
| Matemáticas aplicadas, explicación o margen | 1–2 h |

Una semana difícil puede tener menos horas. Continúa desde la última evidencia; no compenses reiniciando ni duplicando sesiones.

## Diagnóstico antes de estudiar

Cuando [ROADMAP.md](ROADMAP.md) marque una unidad como `DIAGNÓSTICO`:

1. Lee únicamente el resultado mínimo.
2. Inténtalo durante 30–60 minutos con documentación disponible.
3. Guarda el artefacto y explica qué hiciste, qué evidencia tienes y qué no sabes.
4. Si lo demuestras, cierra la unidad. Si no, convierte solo el hueco observado en trabajo activo.

Los años de experiencia no prueban dominio, pero tampoco obligan a repetir material conocido.

## Ciclo de una sesión práctica

### 1. Pregunta o predicción — 5–10 minutos

Antes de buscar una respuesta, escribe qué esperas que ocurra, qué evidencia lo confirmaría y qué podría falsarlo.

### 2. Mapa mínimo — 15–30 minutos

Consulta una fuente primaria, artículo o video corto para obtener vocabulario y modelo general. Detente cuando puedas empezar a probar; no consumas un curso completo por defecto.

### 3. Práctica inmediata — 45–90 minutos

Produce algo observable: código, query, benchmark, diagrama, ADR, runbook o informe. Modifica condiciones, rompe el caso feliz o reproduce un fallo. Copiar un tutorial no cuenta como evidencia.

### 4. Lectura puntual — según la duda

Vuelve a documentación, libro o curso solo para resolver una pregunta surgida en la práctica. Puedes consultar documentación durante ejercicios y Done; dominio no significa memorizar APIs.

### 5. Cierre — 5 minutos

Explica en voz alta durante unos dos minutos:

1. problema;
2. decisión;
3. evidencia;
4. incertidumbre o límite conocido.

Anota una pregunta para R1. Evita resúmenes largos que no cambien el artefacto.

## Cómo usar AI y coding agents

Los tres modos aplican desde la primera unidad:

| Modo | Cuándo | Regla |
|---|---|---|
| **Gimnasio** | Fundamento nuevo | Haz una repetición corta sin AI para formar un modelo mental y descubrir el hueco. |
| **Trabajo** | Tarea delegable | Escribe contrato, alcance y aceptación antes de delegar. |
| **Auditoría** | Después de una entrega | Inspecciona el cambio y exige evidencia independiente antes de aceptarlo. |

### Contrato mínimo de una tarea delegada

1. Objetivo, no-objetivos e invariante.
2. Base revision y resultado observable; aceptación y adversarial fijados antes de ejecutar.
3. Contexto y archivos permitidos, y fuentes autoritativas; secretos y datos privados excluidos.
4. Herramientas, permisos, red, tiempo/presupuesto y stop conditions.
5. Checks y formato de reporte: estado, archivos, diff, comandos, salida relevante y riesgos.
6. Acciones que requieren aprobación: dependencias, escritura externa, credenciales, GCP, deploy, push, commit o acciones irreversibles.
7. Rollback previsto antes de delegar.

### Gate para aceptar código generado

No aceptes el cambio hasta poder:

- confirmar la base revision y que el worktree o sandbox no contiene cambios ajenos;
- comparar `status`, `diff --stat`, `diff --name-status` y el diff completo contra el alcance;
- entender el propósito de cada archivo, una ruta feliz y un fallo;
- revisar dependencias, lockfiles, permisos y acciones externas;
- ejecutar personalmente los checks y conservar la salida relevante;
- añadir o modificar personalmente un caso adversarial cuyo oracle venga de una spec, invariante o fuente primaria;
- registrar agente/modelo, contexto, herramientas/permisos y reporte como procedencia, sin tratar el reporte como prueba;
- aceptar, corregir o revertir con motivo y evidencia;
- demostrar el rollback en el aislamiento y verificar la recuperación y el estado limpio.

Cero hallazgos es válido si alcance, checks y adversarial lo sostienen; no inventes defectos para completar una cuota. La AI puede proponer, implementar y criticar, pero no puede ser la única fuente que confirme que su propio resultado es correcto.

## Un ejercicio o una aplicación, no ambos

Cada unidad exige un solo artefacto principal. Puedes obtenerlo mediante:

- el ejercicio aislado del tema;
- una aplicación pequeña en un proyecto;
- un problema laboral reproducido sin datos ni código privados.

No hagas el ejercicio y luego repitas lo mismo en un proyecto solo para completar dos casillas.

## Regla antiatasco

Después de unas **8 horas de primera pasada** en una unidad sin alcanzar el resultado:

1. escribe exactamente qué falta;
2. reduce el ejercicio al caso mínimo que conserva ese hueco;
3. entrega la evidencia parcial y programa una recuperación;
4. continúa con la siguiente dependencia útil.

El tiempo es una alarma, no aprobación automática. No reinicies la unidad ni conviertas una duda en semanas de consumo pasivo.

## Cierre de una unidad crítica

Una unidad marcada con `★` se cierra cuando cumple:

- [ ] **Artefacto:** código, benchmark, diagrama, ADR, runbook o informe enlazado.
- [ ] **Evidencia independiente:** test, documentación primaria, medición o revisión humana.
- [ ] **Caso negativo:** una forma comprobada de romper la solución o falsar la explicación.
- [ ] **Explicación:** problema, decisión, evidencia e incertidumbre.
- [ ] **R1:** recuperación breve al día siguiente.
- [ ] **R7:** variante con datos o restricciones diferentes.
- [ ] **R30:** recuperación breve treinta días después.

Puedes avanzar mientras llega R30. No esperes un mes para abrir la siguiente unidad.

## R1/R7/R30 sin administración excesiva

- **R1 (+1 día, 5–10 min):** recupera la idea y la evidencia antes de mirar apuntes.
- **R7 (+7 días, 5–10 min):** resuelve o explica una variante.
- **R30 (+30 días, 5–10 min):** verifica de nuevo la parte con mayor riesgo de olvido.

Crea las preguntas desde errores reales. Si fallas un repaso, corrige el artefacto o la explicación y reprograma esa marca; no reinicies el plan.

## Interleaving sin caos

Usa alrededor del 20 % de una sesión de repaso para distinguir conceptos cercanos:

- debugging ↔ runtime;
- SQL ↔ migraciones ↔ concurrencia;
- API ↔ seguridad;
- observabilidad ↔ incidentes;
- evals ↔ seguridad de agentes.

No mezcles temas aleatorios ni abras varias unidades nuevas a la vez.

## Señales de una sesión útil

**Útil:** hiciste una predicción, produjo evidencia, falló algo, cambiaste una hipótesis o pudiste explicar un límite.

**Poco útil:** copiaste un tutorial, consumiste dos horas sin probar nada, aceptaste una respuesta de AI sin verificarla o escribiste notas que no ayudaron a decidir.

## Explicación y feedback

Explicar a otra persona, grabar una nota de voz o publicar un texto corto son opciones equivalentes. La publicación no es obligatoria. La explicación debe incluir:

1. qué problema resolviste;
2. qué decisión tomaste y qué alternativa descartaste;
3. qué evidencia respalda el resultado;
4. qué cambiaría tu decisión.

La AI puede señalar ambigüedades, pero contrasta cualquier corrección con el artefacto o una fuente primaria.

## Cómo retomar tras una interrupción

1. Abre [ROADMAP.md](ROADMAP.md) y localiza la última evidencia, no la última página leída.
2. Si pasaron más de dos semanas, intenta durante 30 minutos el resultado mínimo de esa unidad.
3. Revisa únicamente el hueco que aparezca.
4. Continúa desde ahí; nunca vuelvas al principio por defecto.
