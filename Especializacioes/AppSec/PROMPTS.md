# Prompts de apoyo

Usa datos ficticios y alcance autorizado; no pegues secretos, PII ni código de empresa. La IA no es evidencia ni oracle único: contrasta con documentación, tests u observación.

Secuencia: **concepto → ejemplo pequeño resuelto → pista → intento propio → feedback**. Copia el prompt pertinente, no todos. En un desafío, la IA no debe entregar la solución automáticamente: primero debe esperar tu intento.

## 1. Tutor de un concepto

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Concepto: [CONCEPTO]. Sé: [BASE].
Explícalo sin presuponer vocabulario de seguridad; define cada término nuevo.
Resuelve un ejemplo pequeño distinto de mi desafío y explica por qué funciona.
Después pregunta qué cambiaría con una condición distinta y espera mi predicción.
No resuelvas mi desafío. Contrasta mis razones y señala una fuente primaria.
```

## 2. Preparar una práctica

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Salida/Done: [TEXTO]. Alcance: [LÍMITES].
Tengo este ejemplo y este intento: [EVIDENCIA]. Me falta entender: [DUDA].
Comprueba prerrequisitos y explica el concepto ausente con un ejemplo resuelto mínimo.
Propón solo el siguiente paso guiado; espera mi intento antes de dar feedback.
Sin agenda, cuotas ni proyecto nuevo; conserva permitido, negativo y límites.
```

## 3. Pistas escalonadas para un lab

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Lab autorizado: [ALCANCE].
Mi predicción, intento y observado: [DATOS FICTICIOS]. Estoy atascado en [PUNTO].
Da una sola pista conceptual, no el payload ni la solución del desafío.
Espera mi intento; si necesito otra pista, señala qué evidencia buscar y por qué.
No amplíes alcance ni sugieras red ajena. Distingue observado de supuesto.
```

## 4. Reviewer con evidencia

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Código sanitizado y alcance: [CÓDIGO].
Mi traza/conclusión: [ANÁLISIS]. Critícala citando fichero y línea existentes.
Separa confirmado estático, confirmado ejecutado, hipótesis y no probado.
Busca source, sink, controles y un contraejemplo que falsaría mi conclusión.
Si falta base, explica un ejemplo pequeño; después dame una pista y espera mi revisión.
```

## 5. Entender y corregir un control

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Control y riesgo: [DESCRIPCIÓN].
Permitido, negativo, esperado y observado: [EVIDENCIA]. Mi propuesta: [INTENTO].
Explica el mecanismo con otro ejemplo mínimo resuelto, sin implementar mi desafío.
Dame una pista sobre la corrección mínima y espera mi cambio para revisarlo.
Exige criterio independiente, retest y límites; no inventes crypto ni garantías.
```

## 6. Recuperación sin apuntes

```text
Módulo [MÓDULO]. Concepto y pregunta de recuperación: [TEXTO].
Hazme una pregunta de transferencia a otro caso pequeño y espera mi respuesta.
Valora explicación y razonamiento, no palabras memorizadas; señala el error concreto.
Si falta una base, enséñala con ejemplo resuelto y luego plantea otra variante.
No impongas calendario de repaso ni me des la respuesta antes de intentarlo.
```

## 7. Redactar una ficha

```text
Módulo [MÓDULO], actividad [ACTIVIDAD]. Borrador y evidencia sanitizada: [TEXTO].
Ayúdame a aclarar alcance, precondiciones, esperado/observado y límites sin añadir hechos.
Separa nota técnica reproducible de resumen para producto: impacto, decisión y trade-off.
Revisa exposición/explotabilidad, fix por fases, retest y riesgo residual con dueño.
Si falta evidencia, pregunta por ella; no inventes severidad ni conviertas hipótesis en hechos.
```

## 8. Evaluación final o triage

```text
Módulo [MÓDULO]. Mi informe/triage y evidencia: [TEXTO]. Alcance: [LÍMITES].
Cuestiona mi prioridad por exposición, explotabilidad e impacto, no solo CVSS.
Contrasta bloquear/recomendar/aceptar residual, controles compensatorios y arreglo por fases.
Pide un caso que pudiera refutarme y espera mi intento antes de evaluarlo.
No resuelvas desafíos pendientes ni inventes findings; declara incertidumbre y siguiente verificación.
```
