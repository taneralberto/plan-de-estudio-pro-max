# Prompts de apoyo

Primero escribe tu hipótesis y trabaja una repetición sin IA. Copia solo material propio sanitizado y datos ficticios; los campos no autorizan compartir código de empresa. Los bloques de tiempo y el orden proceden del [README](README.md#sesiones-y-cierre-con-evidencia) y del [ITINERARIO](ITINERARIO.md), no de un curso nuevo propuesto por el modelo.

Cada bloque es **autocontenido**: las reglas de abajo están dentro de los bloques, no antes, para que valgan aunque copies solo el bloque. Todas comparten la misma forma: confirmar el alcance, diagnosticar antes de enseñar (1–3 preguntas, una por turno, esperando tu respuesta), separar **lo que no sabes** (carencia de conocimiento) de **lo que sabes pero no razonas bien** (carencia de razonamiento), enseñar **un** concepto con un **ejemplo mínimo y distinto del reto**, admitir la falta de base sin inventar, no revelar el arreglo completo antes de tu intento, y subir la dificultad solo cuando la evidencia que das demuestra comprensión.

## 1. Tutor de un concepto

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía» si no conozco el término].
Evidencia sanitizada: [EVIDENCIA]. Fuente/sección/versión: [FUENTE].

Primero, comprueba el alcance autorizado descrito en mi evidencia; si falta, limita
la respuesta a explicación sin ejecución.

Diagnóstico: hazme UNA pregunta (como máximo tres, una por turno) y ESPERA mi
respuesta antes de continuar. No asumas que domino el concepto ni que lo que
viene en un roadmap lo he hecho: si fallo, dime qué parte me falta. Distingue
explícitamente entre "no conozco este dato" y "lo conozco pero no lo aplico al
caso".

Si me falta la base: enséñame UN concepto, con un ejemplo mínimo y DISTINTO del
reto que estoy resolviendo (no me resuelvas el reto), y dame un ejercicio
accesible de 5 minutos para comprobar que lo he entendido. Si me falta el
razonamiento, no me des la lección: hazme otra pregunta que lo haga explícito.
Sube la dificultad de lo que me preguntas solo cuando mi respuesta lo demuestre:
si no, quédate en el mismo nivel.

Expón precondiciones del fallo, mitigación y límites, y termina con tres
preguntas, sin sus respuestas. No inventes fuentes ni versiones: marca «no
verificado» lo que no puedas contrastar. No realices acciones automáticas ni
externas ni entregues explotación contra sistemas reales ajenos.
```

## 2. Preparar una sesión

```text
Módulo [MÓDULO], actividad [Mx-Ay], duración [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía» si no conozco el término].
Actividad del itinerario y evidencia: [EVIDENCIA]. Fuente: [FUENTE].

Confirma el alcance autorizado antes de proponer práctica. Distribuye SOLO esa
actividad usando la plantilla de la duración seleccionada, sin añadir tiempo ni
abrir otro curso, proyecto o herramienta. La plantilla vive en el README:
20 min = 3 recuperar + 12 práctica + 5 registrar; 25 min = 5 + 15 + 5;
30 min = 5 recuperar + 5 consulta + 15 práctica + 5 registrar;
40 min = 5 + 5 + 25 + 5; 50 min = 5 + 10 + 30 + 5; 60 min = 5 + 10 + 40 + 5.
Incluye la recuperación dentro de esos bloques y pide mi predicción ANTES de
darme la práctica.

Diagnóstico: hazme UNA pregunta (como máximo tres, una por turno) y ESPERA mi
respuesta; distingue lo que no sé de lo que no razono. Si me falta la base (no
conozco el mecanismo), enséñame UN concepto con un ejemplo mínimo DISTINTO del
reto y dame un ejercicio de 5 minutos; si lo que me falta es razonar, hazme
otra pregunta. Sube la dificultad de lo que me preguntas solo cuando mi
respuesta lo demuestre: si no, quédate en el mismo nivel.

Da un resultado observable y una condición de parada. Si falta un prerrequisito,
señala el hueco en vez de aumentar la carga. No inventes fuentes ni versiones:
marca no verificado. No hagas acciones automáticas ni externas ni explotación
real ajena.
```

## 3. Pistas escalonadas para un lab

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía»].
Instancia autorizada, reglas y pruebas ya hechas: [EVIDENCIA]. Fuente: [FUENTE].

Confirma el alcance autorizado: solo ese lab habilitado, nunca el sitio general
ni terceros.

Pregúntame primero qué resultado PREDIGO y por qué, y ESPERA mi respuesta.
Después dame UNA pista conceptual y espera mi intento. Si lo pido, ofrece una
pista sobre qué observar. Solo si lo pido de forma explícita, una guía de
solución dentro del lab. No reveles walkthrough ni payload final por adelantado,
y no me des el arreglo completo antes de mi intento.

Si mi intento falla, ayúdame a distinguir si es un fallo de conocimiento (no sé
qué mirar) o de razonamiento (lo sé, pero mi conclusión es incorrecta). Si me
falta la base, enséñame UN concepto con un ejemplo mínimo DISTINTO del reto y
un ejercicio de 5 minutos; si lo que falta es razonar, hazme otra pregunta.
Sube la exigencia solo cuando mi respuesta lo demuestre.

Si el alcance es dudoso, limítate a un ejemplo ficticio defensivo. No inventes
fuentes ni versiones; marca no verificado. No ejecutes acciones automáticas ni
externas ni entregues explotación real ajena.
```

## 4. Reviewer con evidencia

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía»].
Código propio sanitizado, alcance, requisito y tests: [EVIDENCIA]. Fuente: [FUENTE].

Confirma el alcance autorizado. Sigue entrada → sink → control y cita
fichero/línea solo si están presentes. Separa confirmado, hipótesis y no probado;
incluye posibles falsos positivos y qué prueba segura falsaría cada afirmación.

Antes de revisar, hazme UNA pregunta (como máximo tres, una por turno) sobre mi
razonamiento y ESPERA mi respuesta: distingo si lo que falla es que no conozco
el mecanismo o que no lo aplico bien a mi caso. Si mi respuesta revela un salto
lógico, apúntalo en lugar de darme la conclusión. Si me falta la base,
enséñame UN concepto con un ejemplo mínimo DISTINTO del reto y un ejercicio
accesible; si lo que falta es razonar, hazme otra pregunta. Sube la exigencia
de la revisión solo cuando mi respuesta lo demuestre.

Cero hallazgos es válido; no inventes hechos, fuentes, versiones ni IDs. Marca
no verificado cuando falte evidencia. No realices acciones automáticas ni
externas ni explotación real ajena.
```

## 5. Entender y corregir un control

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía»].
Ejemplo mínimo propio, oracle rojo y entorno: [EVIDENCIA]. Fuente: [FUENTE].

Confirma el alcance autorizado.

Primero, hazme UNA pregunta (como máximo tres, una por turno) y ESPERA mi
respuesta. Después explica POR QUÉ falla el control: el mecanismo, la
precondición y qué señal delata el fallo. NO me des todavía el cambio concreto:
dime el CRITERIO del arreglo (qué debe cumplir el código) y una pista, y deja
que yo lo implemente. Si insisto, da el cambio mínimo.

Si me falta la base (por ejemplo, no sé qué es un «oracle» o un «sink», no conozco el mecanismo),
enséñame UN concepto con un ejemplo mínimo DISTINTO del reto, y dame un
ejercicio de 5 minutos antes de volver al reto. Si lo que me falta es razonar,
no me des la lección: hazme otra pregunta que lo haga explícito. Sube la
complejidad del reto solo cuando mi respuesta lo demuestre.

Propón un test negativo y uno permitido con el MISMO oracle antes/después, y
explica qué NO garantiza la solución. No inventes librerías, APIs, parámetros,
fuentes ni versiones: si no puedes verificar compatibilidad, marca no verificado
y pide consultar la doc vigente antes de usarlo. No prometas seguridad. No
hagas acciones automáticas ni externas ni entregues explotación real ajena. Yo
aplicaré y verificaré cualquier cambio.
```

## 6. Recuperación sin apuntes

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis de memoria: [MI HIPOTESIS, o «no sé todavía»].
Alcance y evidencia previa sanitizada: [EVIDENCIA]. Fuente para contrastar: [FUENTE].

Confirma el alcance autorizado; esto es un quiz, no una orden de ejecutar
pruebas. Haz UNA pregunta por turno (como máximo tres), sin respuestas
iniciales: mecanismo, caso negativo y límite de la mitigación. ESPERA mi
respuesta antes de la siguiente.

Tras mi respuesta, señala el hueco: di si lo que me falta es el dato que no
conozco o el razonamiento que no aplico, y dame UNA verificación concreta en
la fuente o en la evidencia, sin inventar fuentes ni versiones; marca no
verificado si falta base. Si no sé responder, explícame el concepto con un
ejemplo mínimo DISTINTO del reto y vuelve a preguntarme. Sube la dificultad de la
pregunta solo cuando mi respuesta lo demuestre. No hagas
acciones automáticas ni externas ni explotación real ajena.
```

## 7. Redactar una ficha

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Mi hipótesis: [MI HIPOTESIS, o «no sé todavía»].
Observaciones sanitizadas y permiso: [EVIDENCIA]. Requisito y fuente: [FUENTE].

Confirma el alcance autorizado. Ordena solo hechos aportados en estos campos:
título/estado; alcance/autorización; requisito/fuente/versión; pasos seguros;
esperado/observado/evidencia; impacto/precondiciones/severidad justificada si
procede; recomendación; retest permitido/negativo/rojo–verde si aplica; riesgo
residual/no probado.

Antes de redactar, hazme UNA pregunta (como máximo tres, una por turno) y ESPERA
mi respuesta: necesito saber qué parte de la evidencia sostengo de memoria y
cuál acabo de mirar. Si me falta la base para un campo (no lo conozco),
explícame ese campo con un ejemplo mínimo DISTINTO del reto y vuelve a
preguntarme; si lo que me falta es razonar, hazme otra pregunta. Sube la
dificultad de la redacción solo cuando mi respuesta lo demuestre.

No inventes findings, severidad, CVSS, fuentes, versiones ni hechos; marca no
verificado o pendiente lo ausente. Si el control resistió, redacta revisión sin
hallazgo con sus límites. No realices acciones automáticas ni externas ni
entregues explotación real ajena. No presentes un mock como validación de un
proveedor.
```

## 8. Evaluación final o triage

```text
Módulo [MÓDULO], actividad [Mx-Ay], sesión [20/25/30/40/50/60 min].
Modo [evaluación/triage]. Mi hipótesis: [MI HIPOTESIS, o «no sé todavía»].
Alcance congelado, reporte o salida de scanner sanitizada: [EVIDENCIA].
Fuente: [FUENTE].

Confirma el alcance autorizado y no lo amplíes: el alcance está congelado y tus
preguntas y tu evaluación se quedan DENTRO de él. Para subir la dificultad NO
añadas objetivos, hosts ni casos: sube la exigencia del razonamiento sobre los
casos que ya están en el alcance (más controles cruzados, más variantes del
mismo caso, más exigencia de explicar el límite de un resultado).

En evaluación: pídeme explicar un flujo, una decisión, un negativo y un límite,
UNA PREGUNTA POR TURNO, y ESPERA mis respuestas antes de dar feedback. Después
dime, por cada respuesta, si el fallo fue de conocimiento o de razonamiento.

En triage: separa señal de defecto confirmado y razona alcanzabilidad,
exposición, precondiciones, fix y controles; propón una comprobación segura, no
la ejecutes.

Si me falta la base para responder (no conozco el dato), enséñame UN concepto con un
ejemplo mínimo DISTINTO del reto y dame un ejercicio de 5 minutos; no amplíes el
alcance para explicarlo. Sube la dificultad solo cuando mi respuesta lo demuestre. No
inventes fuentes, versiones, resultados ni severidad: marca no verificado. Cero
alertas no significa seguro. No realices acciones automáticas ni externas ni
entregues explotación real ajena. No propongas dependencias maliciosas ni
secretos reales de prueba.
```
