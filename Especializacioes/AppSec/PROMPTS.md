# Prompts de apoyo

Primero escribe tu hipótesis y trabaja una repetición sin IA. Copia solo material propio sanitizado y datos ficticios; los campos no autorizan compartir código de empresa. Los bloques de tiempo y el orden proceden de [README](README.md#sesiones-y-cierre-con-evidencia) e [ITINERARIO](ITINERARIO.md), no de un curso nuevo propuesto por el modelo.

## 1. Tutor de un concepto

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis: [MI HIPOTESIS].
Evidencia sanitizada: [EVIDENCIA]. Fuente/sección/versión: [FUENTE].
Confirma primero el alcance autorizado descrito en mi evidencia; si falta, limita
la respuesta a explicación sin ejecución. Explica UN concepto para un programador
con un ejemplo pequeño JS/TS. Expón precondiciones del fallo, mitigación y límites;
termina con tres preguntas, sin sus respuestas. No inventes fuentes ni versiones:
marca «no verificado» lo que no puedas contrastar. No realices acciones automáticas
ni externas ni entregues explotación contra sistemas reales ajenos.
```

## 2. Preparar una sesión

```text
Semana [SEMANA], tema [TEMA], duración [60/120 min]. Mi hipótesis: [MI HIPOTESIS].
Fila del itinerario y evidencia: [EVIDENCIA]. Fuente: [FUENTE].
Confirma alcance autorizado antes de proponer práctica. Distribuye SOLO esa fila
usando únicamente el esquema de la duración seleccionada, sin añadir tiempo:
60 min = 5 recuperar + 10 consulta + 40 práctica + 5 registro.
120 min = 10 recuperar + 15 consulta + 75 práctica + 10 explicar/revisar + 10 registro.
Incluye la recuperación en esos bloques y una predicción mía antes de pedirte ayuda.
No abras otro curso, proyecto ni herramientas.
Da un resultado observable y condición de parada; si falta un prerrequisito, señala
el hueco en vez de aumentar carga. No inventes fuentes/versiones: marca no verificado.
No hagas acciones automáticas/externas ni explotación real ajena.
```

## 3. Pistas escalonadas para un lab

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis: [MI HIPOTESIS].
Instancia autorizada, reglas y pruebas ya hechas: [EVIDENCIA]. Fuente: [FUENTE].
Confirma alcance: solo ese lab habilitado, nunca el sitio general o terceros.
Dame UNA pista conceptual y espera mi intento. Después ofrece una pista sobre
qué observar; solo si la pido explícitamente, una guía de solución dentro del lab.
No reveles walkthrough ni payload final por adelantado. Pregunta qué resultado
predigo. No inventes fuentes/versiones; marca no verificado. No ejecutes acciones
automáticas/externas ni entregues explotación real ajena; si el alcance es dudoso,
limítate a un ejemplo ficticio defensivo.
```

## 4. Reviewer con evidencia

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis: [MI HIPOTESIS].
Código propio sanitizado, alcance, requisito y tests: [EVIDENCIA]. Fuente: [FUENTE].
Confirma el alcance autorizado. Sigue entrada → sink → control y cita fichero/línea
solo si están presentes. Separa confirmado, hipótesis y no probado; incluye posibles
falsos positivos y qué prueba segura falsaría cada afirmación. Cero hallazgos es
válido; no inventes hechos, fuentes, versiones ni IDs. Marca no verificado cuando
falte evidencia. No realices acciones automáticas/externas ni explotación real ajena.
```

## 5. Entender y corregir un control

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis: [MI HIPOTESIS].
Ejemplo mínimo propio, oracle rojo y entorno: [EVIDENCIA]. Fuente: [FUENTE].
Confirma el alcance autorizado. Explica por qué falla el control y propone el cambio
mínimo, un test negativo y uno permitido con el mismo oracle antes/después. Explica
qué NO garantiza. No inventes librerías, APIs, parámetros, fuentes ni versiones:
si no puedes verificar compatibilidad, marca no verificado y pide consultar la doc
vigente antes de usarlo. No prometas seguridad. No hagas acciones automáticas/externas
ni entregues explotación real ajena. Yo aplicaré y verificaré cualquier cambio.
```

## 6. Recuperación sin apuntes

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis de memoria: [MI HIPOTESIS].
Alcance y evidencia previa sanitizada: [EVIDENCIA]. Fuente para contrastar: [FUENTE].
Confirma alcance autorizado; esto es un quiz, no una orden de ejecutar pruebas.
Haz tres preguntas, una por turno, sin respuestas iniciales: mecanismo, caso negativo
y límite de la mitigación. Tras mi respuesta señala el hueco y una verificación en
la fuente/evidencia, sin inventar fuentes ni versiones; marca no verificado si falta
base. No hagas acciones automáticas/externas ni explotación real ajena.
```

## 7. Redactar una ficha

```text
Semana [SEMANA], tema [TEMA]. Mi hipótesis: [MI HIPOTESIS].
Observaciones sanitizadas y permiso: [EVIDENCIA]. Requisito y fuente: [FUENTE].
Confirma el alcance autorizado. Ordena solo hechos aportados en estos campos:
título/estado; alcance/autorización; requisito/fuente/versión; pasos seguros;
esperado/observado/evidencia; impacto/precondiciones/severidad justificada si procede;
recomendación; retest permitido/negativo/rojo–verde si aplica; riesgo residual/no probado.
No inventes findings, severidad, CVSS, fuentes,
versiones ni hechos; marca no verificado o pendiente lo ausente. Si el control resistió,
redacta revisión sin hallazgo con sus límites. No realices acciones automáticas/externas
ni entregues explotación real ajena. No presentes un mock como validación de un proveedor.
```

## 8. Evaluación final o triage

```text
Semana [SEMANA], tema [TEMA], modo [evaluación/triage]. Mi hipótesis: [MI HIPOTESIS].
Alcance congelado, reporte o salida de scanner sanitizada: [EVIDENCIA]. Fuente: [FUENTE].
Confirma alcance autorizado y no lo amplíes. En evaluación, pídeme explicar un flujo,
una decisión, un negativo y un límite; espera mis respuestas antes de dar feedback.
En triage, separa señal de defecto confirmado y razona alcanzabilidad, exposición,
precondiciones, fix y controles; propón una comprobación segura, no la ejecutes.
No inventes fuentes/versiones, resultados ni severidad: marca no verificado. Cero
alertas no significa seguro. No realices acciones automáticas/externas ni entregues
explotación real ajena. No propongas dependencias maliciosas ni secretos reales de prueba.
```













