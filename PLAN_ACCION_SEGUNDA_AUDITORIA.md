# Segunda auditoría crítica y plan de acción

> **Estado de implementación (2026-07-25): completado y validado.** La ruta quedó en 18 unidades, el plan anterior pasó a `archive/`, la superficie curricular activa bajó 6.034 palabras (17,9 %) frente a `HEAD` y no se hizo stage ni commit.
>
> Auditoría realizada sobre el estado **staged** del 2026-07-25. Durante esa auditoría no se modificó, limpió, reseteó, stageó ni commiteó el currículo; este informe fue la única escritura solicitada.
> Alcance leído por la sesión principal: `README.md`, `ROADMAP.md`, `METODOLOGIA.md`, `PROYECTOS.md`, `RECURSOS.md`, `PLAN_REVISION_PERSONALIZADA.md` y los 46 temas. `archive/` se usó solo como historia.

## 1. Dictamen ejecutivo

- El plan ya es sólido y mucho más simple que su versión histórica: tiene ruta, final, JIT y un único cierre por unidad.
- El principal residuo es editorial: `PLAN_REVISION_PERSONALIZADA.md` sigue en la raíz aunque su implementación terminó.
- La principal carga curricular prescindible es la unidad 6: matemática de embeddings/atención y una eval de cuatro cambios antes de la auditoría de la unidad 19.
- Los revisores independientes consideraron defendibles las 19 unidades; esta síntesis recomienda **18**, porque la supervisión de coding agents conserva su resultado sin una unidad matemática separada.
- No recomiendo más fusiones: SQL/migraciones, entrega/operación y distribuidos/System Design tienen resultados distintos.
- El hito de 12 semanas es posible pero frágil; quitar la unidad 6 paralela y estudiar Testing antes de Diseño crea margen real.
- La ruta completa cabe de sobra en 28–32 semanas y probablemente puede cerrarse en 24–28 sin bajar el criterio.

## 2. Hallazgos priorizados

[crítica] [delete] archivar el plan de revisión ya implementado y quitar su enlace temporal del README — elimina 4.861 palabras de la superficie activa y una segunda descripción de las 19 unidades. [`PLAN_REVISION_PERSONALIZADA.md:3`]

[alta] [combine] absorber de la unidad 6 solo modelo/sistema/agente, contexto, riesgo y oracle dentro de Ingeniería con coding agents; convertir embeddings, atención y comparación de modelos en JIT — conserva la auditoría observable y elimina cuatro ejecuciones previas, matemática sin necesidad concreta y seis semanas de trabajo paralelo. [`ROADMAP.md:22`]

[alta] [reorder] estudiar Testing antes de Diseño modular en el primer hito — evita que el ejercicio de caracterización de la unidad 9 dependa de una unidad 3 programada después. [`ROADMAP.md:24`]

[alta] [shrink] hacer que la unidad 18 reutilice el restore de Migraciones y permita cerrar con métrica+logs cuando tracing no cambie una decisión — vuelve creíble el timebox de 120 minutos y fija un dueño para recuperación de datos. [`Etapa 4 — Profundización/4.5 — Observabilidad (Los 3 Pilares).md:82`]

[alta] [delete] eliminar Proyecto C como sección y enlazar directamente el ejercicio canónico de `4.8` desde A/B — hoy no es un proyecto distinto y repite contrato, diff, checks, adversarial y rollback. [`PROYECTOS.md:84`]

[media] [shrink] reemplazar R1/R7/R30 obligatorios por R1 al cerrar y una recuperación semanal del concepto más antiguo o riesgoso — conserva recuperación espaciada sin mantener 36 vencimientos por unidad. [`METODOLOGIA.md:119`]

[media] [shrink] dejar el protocolo genérico de agentes solo en `METODOLOGIA.md` y en `4.8` únicamente el ejercicio, informe y Done específicos — reduce tres listas casi equivalentes y aclara el dueño canónico. [`METODOLOGIA.md:65`]

[media] [rewrite] aclarar que 8–12 horas es el techo total del sustrato de proyecto, no una obligación por unidad ni permiso para acumular sus checklists — evita que A y B se conviertan en proyectos longitudinales de facto. [`PROYECTOS.md:13`]

[media] [shrink] agrupar los Done más largos de System Design, Observabilidad y Coding agents en 4–5 resultados, remitiendo la evidencia transversal a Metodología — cambia cumplimiento granular por criterio observable sin borrar garantías. [`Etapa 4 — Profundización/4.8 — AI Engineering (la nueva disciplina).md:70`]

[baja] [delete] retirar `fast-check` como requisito, SWE-bench como fuente primaria y el índice `100cosas.dev`; dejar property testing, benchmarks académicos y explicaciones alternativas como JIT — elimina una dependencia y recursos que no son necesarios para resolver los ejercicios. [`RECURSOS.md:37`]

[baja] [rewrite] quitar el marcador `🔴`, único en los 46 temas — restaura la convención `Estado ★` + `Cierre` sin otra taxonomía visual. [`Etapa 2 — Fundamentos/2.12 — Redes en Profundidad.md:7`]

[keep] [keep] conservar los 46 nombres de archivo como compatibilidad histórica, con aliases/JIT cortos y sin ejercicios — no agregan carga de cierre y evitan romper enlaces existentes. [`ROADMAP.md:199`]

## 3. Propuesta de estructura

### Estructura actual y propuesta

| Actual | Propuesta | Resultado observable conservado |
|---|---|---|
| 1. Debugging y evidencia | 1. Debugging y evidencia | Bug reproducido, causa aislada y arreglo probado. |
| 2. Runtime, procesos y concurrencia | 2. Runtime, procesos y concurrencia | Bloqueo/race/leak diagnosticado con evidencia. |
| 3. Testing y oracles externos | 3. Testing y oracles externos | Test que falsifica una solución plausible. |
| 4. Seguridad y trust boundaries | 4. Seguridad y trust boundaries | Threat model y caso negativo de autorización/datos. |
| 5. Complejidad y estructuras cotidianas | 5. Complejidad y estructuras cotidianas | Diagnóstico breve de costo y estructura; se mantiene porque es barato y saltable. |
| 6. AI literacy y fundamentos matemáticos | **Absorbida en 18; matemática JIT** | La auditoría de un cambio demuestra contexto, oracle, permisos y límites; embeddings/atención no bloquean. |
| 7. Requirements, ADR y explicación | 6. Requirements, ADR y explicación | Spec+decisión+explicación como un único paquete. |
| 8. Git, shell y recuperación | 7. Git, shell y recuperación | Recuperación segura y transcript verificable. |
| 9. Diseño modular y mantenibilidad | 8. Diseño modular y mantenibilidad | Refactor acotado protegido por caracterización. |
| 10. SQL y modelado relacional | 9. SQL y modelado relacional | Invariantes, carrera e índice justificados. |
| 11. Migraciones seguras | 10. Migraciones seguras | Expand-contract y recuperación de datos comprobada. |
| 12. Redes para backend | 11. Redes para backend | Fallo DNS/TLS/HTTP localizado con probes. |
| 13. Performance y elección de datos | 12. Performance y elección de datos | Baseline, cuello y decisión medida. |
| 14. API y límites de dominio | 13. API y límites de dominio | Contrato compatible y límites justificados. |
| 15. Sistemas distribuidos y mensajería | 14. Sistemas distribuidos y mensajería | Flujo idempotente y fallo parcial recuperable. |
| 16. System Design y decisiones | 15. System Design y decisiones | Diseño basado en requisitos, capacidad y trade-offs. |
| 17. Entrega y GCP | 16. Entrega y GCP | Artifact desplegado y rollback reproducible. |
| 18. Observabilidad y SRE | 17. Observabilidad y SRE | Incidente detectado, mitigado y explicado. |
| 19. Ingeniería con coding agents | 18. Ingeniería con coding agents | Cambio delegado, auditado, probado y revertido. |

No se fusionan más unidades. Los diagnósticos 1, 5, 7 y 9 de la propuesta cuestan 30–60 minutos si la experiencia ya cubre el resultado; borrarlos ahorraría poco y ocultaría huecos relevantes.

### Canonicalidad y compatibilidad

| Contenido | Canónico | Alias/preparación | JIT/archivo |
|---|---|---|---|
| Protocolo general de agentes | `METODOLOGIA.md` | — | — |
| Ejercicio y cierre de agentes | `4.8 — AI Engineering...md` | `4.7` como preparación; `1.6` como alias breve | `4.13` para matemática/evals cuando una decisión de modelo, retrieval o producto lo exija |
| Recuperación de datos | `2.6 — Data Migrations...md` | `4.5` enlaza la evidencia | — |
| Incidente de servicio | `4.5 — Observabilidad...md` | reutiliza rollback de `4.3` | tracing profundo JIT si logs/métricas no bastan |
| Historia editorial | `ROADMAP.md` para estudiar | stub opcional en la ruta antigua | `PLAN_REVISION_PERSONALIZADA.md` completo en `archive/` |
| IDs históricos | el tema que cierra cada unidad | conservar stubs actuales | conservar routers JIT actuales |

Los IDs históricos `1.x`–`4.x` no se renumeran. Solo cambia la numeración de las unidades de ruta en `ROADMAP.md` y sus referencias editoriales.

## 4. Metodología mínima propuesta

La metodología actual ayuda, pero repite proceso en demasiados lugares. Reemplazarla por este ciclo semanal:

1. **Elegir un resultado:** intentar el Done 30–60 minutos si es diagnóstico; si pasa, cerrar; si falla, nombrar un solo hueco.
2. **Practicar:** dedicar 6–8 horas al mismo artefacto o aplicación; consultar documentación cuando aparezca una duda y parar al obtener evidencia suficiente.
3. **Cerrar:** conservar un paquete con artefacto, evidencia independiente, caso negativo y explicación de dos minutos con incertidumbre.
4. **Recuperar:** hacer R1 durante 5–10 minutos; una vez por semana recuperar sin apuntes el concepto anterior más antiguo o riesgoso y corregir su artefacto si falla.
5. **Delegar solo cuando aplique:** contrato antes del agente; diff y checks independientes después. El protocolo detallado vive una sola vez.

Reemplaza: tabla de cinco fases cronometradas por sesión, R7 y R30 fijos por unidad, porcentaje de interleaving y repeticiones del gate. Conserva: diagnóstico, práctica antes de lectura, evidencia, explicación, recuperación espaciada y responsabilidad humana.

**Coste semanal:** 8–10 h: 6–8 h práctica, 1–1,5 h documentación/debugging, 20–30 min recuperación y margen restante. No se crea formulario, tracker, plugin ni ledger.

## 5. Qué no cambiar

1. `ROADMAP.md` como única fuente de verdad y final explícito por unidades, no por 46 archivos.
2. Los estados `ACTIVO`, `DIAGNÓSTICO` y `JIT`; son suficientes.
3. Un ejercicio **o** una aplicación por unidad, nunca ambos.
4. Documentación permitida y práctica antes que lectura larga.
5. PostgreSQL y servicios gestionados como defaults hasta que una medición justifique más tecnología.
6. Separación entre Testing, Seguridad, API, Migraciones, Entrega, Operación y Distribuidos: sus fallos y evidencia no son intercambiables.
7. Proyectos sin frontend y reutilización de un backend pequeño; no crear otro sistema para agentes.
8. Aliases y routers JIT cortos para conservar los 46 IDs.
9. Exactitud técnica actual: no se detectaron blockers en PostgreSQL, CAP, mensajería, HTTP/TLS, Cloud Run, SRE o fundamentos de AI.
10. Los checks de progreso de `ROADMAP.md`: no marcarlos durante cambios editoriales.

## 6. Impacto estimado

- **Unidades:** 19 → 18; desaparece una obligación activa y su contenido útil se absorbe en Coding agents.
- **Archivos:** 1 documento raíz movido a `archive/`; `1.6` convertido en alias/preparación; `4.13` convertido en JIT; 0 IDs históricos eliminados.
- **Ejercicios:** −1 eval de cuatro cambios; −1 subpráctica obligatoria de property testing; −1 restore duplicado en Observabilidad; Proyecto C deja de parecer una tercera obligación.
- **Checks:** −22 repasos fijos R7/R30 si quedan 11 unidades críticas; aproximadamente −20 a −30 bullets al agrupar los tres Done más largos.
- **Recursos:** −3 entradas activas (`fast-check`, SWE-bench, `100cosas.dev`) y 3 recursos matemáticos degradados a JIT.
- **Palabras:** −6.034 de superficie activa frente a `HEAD` (17,9 %); de ellas 4.861 se archivan, no se destruyen.
- **Horas:** −15 a −25 h de trabajo obligatorio; el primer hito gana aproximadamente 10–15 h de margen.
- **Duración:** primer resultado útil en 12 semanas con menos paralelismo; ruta completa estimada en 24–28 semanas, manteniendo 28–32 como techo de interrupciones.
- **Complejidad nueva:** cero; no se añaden unidades, herramientas, taxonomías, trackers, proyectos ni recursos.

## 7. Plan de implementación

### Fase 0 — Proteger el estado actual

- **Archivos:** ninguno.
- **Cambio:** guardar fuera del repo `git status --short`, `git diff --cached --stat`, `git diff --cached` y el hash base; no alterar el staged actual sin autorización.
- **Validación:** confirmar que no hay cambios unstaged y que el patch guardado coincide con el staged.
- **Riesgo:** mezclar esta segunda revisión con el cierre pendiente de la primera.
- **No tocar:** index, commits, branches, checks de `ROADMAP.md`, `archive/` histórico.

### Fase 1 — Retirar andamiaje terminado

- **Archivos:** `README.md`, `PLAN_REVISION_PERSONALIZADA.md`, `archive/`.
- **Cambio:** mover el plan completo a `archive/` y quitar la nota temporal del README; no resumirlo en otro documento.
- **Validación:** enlaces internos, `rg -n 'PLAN_REVISION_PERSONALIZADA'`, `git diff --check`.
- **Riesgo:** romper un enlace externo al path raíz; si importa, dejar un stub de 3 líneas en vez de eliminarlo.
- **No tocar:** contenido del roadmap ni el diagnóstico histórico archivado.

### Fase 2 — Pasar de 19 a 18 resultados

- **Archivos:** `README.md`, `ROADMAP.md`, `1.6 — AI Literacy.md`, `4.13 — Fundamentos de ML-AI...md`, `4.8 — AI Engineering...md`, `RECURSOS.md`.
- **Cambio:** absorber literacy mínima en la unidad de agentes, convertir 4.13 en JIT y actualizar hito, ruta, numeración y mapa de 46 IDs.
- **Validación:** exactamente 18 checks de progreso; los 46 IDs siguen mapeados una vez; 4.13 no contiene obligación/Done; unidad de agentes conserva contrato, oracle, permisos, diff, checks, adversarial y rollback.
- **Riesgo:** recortar seguridad de agentes junto con matemática; revisar explícitamente que contexto no confiable, secretos y autonomía permanezcan.
- **No tocar:** AI de producto 4.9, IDs históricos, checks marcados/desmarcados.

### Fase 3 — Corregir orden y metodología

- **Archivos:** `ROADMAP.md`, `METODOLOGIA.md` y líneas de cierre R1/R7/R30 en unidades críticas.
- **Cambio:** mover Testing antes de Diseño; reemplazar el ciclo metodológico y repasos fijos por el flujo mínimo; agrupar solo los Done de `3.6`, `4.5` y `4.8` en esta fase.
- **Validación:** cada unidad activa tiene un ejercicio/aplicación y un Done; diagnóstico sigue siendo saltable; la recuperación semanal y R1 permanecen; no quedan referencias obligatorias a R7/R30.
- **Riesgo:** convertir simplificación en menor exigencia; comparar cada bullet eliminado con el artefacto y caso negativo conservados.
- **No tocar:** criterios técnicos propios de las demás unidades ni checks de progreso.

### Fase 4 — Eliminar obligaciones paralelas

- **Archivos:** `PROYECTOS.md`, `1.3 — Testing Fundamentals.md`, `2.6 — Data Migrations...md`, `4.5 — Observabilidad...md`, `4.8 — AI Engineering...md`, `RECURSOS.md`.
- **Cambio:** borrar Proyecto C como sección duplicada; aclarar timebox de A/B; dejar property testing JIT; hacer a 2.6 dueño del restore; permitir incidente con logs/métricas y tracing solo por necesidad.
- **Validación:** Proyecto A/B siguen cubriendo las unidades declaradas; 4.8 puede ejecutarse sobre cualquiera; 4.5 conserva alerta, runbook, rollback y postmortem; 2.6 conserva restore verificable.
- **Riesgo:** que la unidad 18 pierda recuperación o la 3 pierda un oracle fuerte.
- **No tocar:** tests negativos, PostgreSQL real cuando su semántica importa, rollback de Cloud Run.

### Fase 5 — Higiene y revisión

- **Archivos:** `2.12 — Redes en Profundidad.md` y cualquier enlace afectado por fases anteriores.
- **Cambio:** quitar `🔴`; no reescribir prose correcta ni fusionar preparaciones/aliases por simetría.
- **Validación:** todos los checks de la sección siguiente y revisión fresh-context.
- **Riesgo:** perseguir perfección editorial después de agotar recortes de alto valor.
- **No tocar:** los 46 filenames, `.obsidian/`, `.pi/`, `archive/` salvo links rotos demostrados.

Cada fase debe ser un diff pequeño y revisable. No stagear ni commitear automáticamente; pedir autorización después de cada fase o implementar todo sin stage si el usuario lo elige explícitamente.

## 8. Validaciones finales

### Enlaces y anchors

- Parsear links Markdown con paréntesis balanceados y percent-decoding; comprobar existencia del path y slug del heading.
- Estado actual: **0 paths internos y 0 anchors rotos** en los 51 Markdown revisados.

### 46 IDs históricos

```bash
find 'Etapa 1 — Entrada' 'Etapa 2 — Fundamentos' 'Etapa 3 — Arquitectura' 'Etapa 4 — Profundización' -maxdepth 1 -name '*.md' | wc -l
rg '^\| [1-4]\.[0-9]+ \|' ROADMAP.md | wc -l
```

Ambos deben devolver `46`; cada ID debe aparecer una sola vez en el mapa.

### Un ejercicio/Done por unidad

- Construir la relación unidad→archivos desde ROADMAP.
- Exigir exactamente un heading `Ejercicio único|Ejercicio principal|Diagnóstico` que produzca el artefacto y un cierre canónico por unidad; preparaciones no cuentan como segundo ejercicio.
- Confirmar manualmente que “ejercicio o aplicación” no reaparece como dos vías obligatorias.

### JIT sin obligaciones

```bash
rg -n '^## (Ejercicio|Done)|^- \[ \]' 'Etapa 2 — Fundamentos/2.1 — TypeScript Avanzado.md' 'Etapa 4 — Profundización/4.13 — Fundamentos de ML-AI que necesitas como Dev.md' 'Etapa 4 — Profundización/4.9 — Construir con AI — Proyectos reales.md'
```

Debe quedar sin resultados obligatorios en todos los archivos marcados `JIT`.

### FreePress y placeholders

```bash
rg -ni 'FreePress|fp-|placeholder|\bTODO\b|\bTBD\b|por completar|cualquier video' --glob '*.md' --glob '!archive/**'
```

Solo se aceptan menciones históricas dentro de `archive/`; `TODO` debe comprobarse como palabra completa para evitar falsos positivos como “metodología”.

### Recursos externos

- Extraer URLs únicas, seguir redirects y comprobar respuesta con timeout; revisar manualmente título/vigencia, no solo HTTP.
- Estado actual: 70 URLs únicas; 69 respondieron `200/206`; RabbitMQ respondió `403` al probe automatizado y requiere comprobación manual, no sustitución automática.

### Git

```bash
git status --short --branch
git diff --cached --name-status
git diff --name-status
git diff --cached --check
git diff --check
```

No ejecutar `add`, `commit`, `reset`, `clean`, `checkout` ni modificar los checks de progreso como parte de la validación.

### Revisión independiente final

Lanzar al menos dos revisores `fresh-context`, read-only:

1. coherencia técnica/prerrequisitos/Done;
2. simplificación/navegación/JIT/recursos.

Aceptar solo hallazgos con `archivo:línea`; la sesión principal debe contrastarlos con los archivos y detenerse cuando no queden recortes de alto valor.
