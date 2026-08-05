# Plan — Mejorar la claridad de los temas sin perder rigor

## Objetivo

Reestructurar las unidades del plan para que una persona pueda entender, sin adivinar:

1. qué problema aprenderá a resolver;
2. qué modelo mental necesita;
3. qué decisiones debe tomar;
4. qué práctica debe realizar;
5. qué debe entregar;
6. qué evidencia demuestra el resultado;
7. cuándo puede cerrar la unidad.

El contenido técnico y la metodología práctica actuales son la base. El trabajo consiste en comunicar mejor las ideas, no en volver el plan más básico ni convertir cada tema en un curso extenso.

## Restricciones

- Mantener el enfoque de ingeniería real: invariantes, trade-offs, fallos, casos negativos, mediciones, incertidumbre y recuperación.
- Mantener un solo ejercicio o aplicación principal por unidad.
- Conservar la metodología de artefacto, evidencia independiente, caso negativo y recuperación.
- Conservar el enfoque JIT y las fuentes canónicas para no duplicar contenido entre unidades.
- No crear un ejercicio separado para cada término o tecnología.
- No añadir teoría que no ayude a comprender o ejecutar el ejercicio.
- No traducir palabras inglesas por rutina; el inglés no es el problema.
- Explicar un término únicamente cuando su significado sea necesario para seguir el razonamiento o realizar la práctica.
- No renombrar archivos ni reorganizar directorios como parte de este trabajo, salvo que exista una razón funcional demostrada.
- No expandir los archivos históricos integrados, como `1.8` o `4.10`; deben seguir siendo redirects breves hacia la fuente canónica.
- Evitar crecimiento innecesario: los nuevos bloques de orientación y entregable deben ser breves y sustituir ambigüedad, no sumar ceremonia.

## Diagnóstico confirmado

Se revisó una muestra representativa de 17 temas:

- Etapa 1: `1.1`, `1.3`, `1.4`, `1.5`, `1.8`;
- Etapa 2: `2.3`, `2.4`, `2.6`, `2.7`, `2.12`;
- Etapa 3: `3.1`, `3.2`, `3.6`, `3.9`;
- Etapa 4: `4.3`, `4.5`, `4.8`;
- además de `1.7` y `METODOLOGIA.md`.

El contenido técnico suele ser sólido. El problema repetido es que varias unidades parecen notas comprimidas para alguien que ya conoce el tema. El lector debe reconstruir la progresión entre concepto, decisión, práctica, entregable y verificación.

### Problemas sistémicos encontrados

1. Falta una orientación inicial estable que resuma qué lograr, hacer, entregar y dejar fuera.
2. Los encabezados y el orden cambian entre unidades, por lo que cada archivo debe aprenderse de nuevo.
3. Algunas unidades mezclan explicación conceptual e instrucciones operativas en el mismo bloque.
4. No siempre se separa la información proporcionada de las decisiones que debe tomar el estudiante.
5. El entregable suele quedar implícito y debe reconstruirse desde el ejercicio o `Done cuando`.
6. Algunos requisitos aparecen por primera vez en `Done cuando`.
7. Varias casillas de cierre agrupan condiciones independientes.
8. El timebox falta o aparece en lugares diferentes.
9. JIT y fuera de alcance aparecen dispersos o condensados en párrafos con demasiadas referencias.
10. Las dependencias entre unidades se mencionan a veces sin un recordatorio local de qué se reutiliza.
11. Conviven números históricos de archivo y números de unidad del `ROADMAP`; las referencias sin enlace obligan a mantener ese mapa mental.
12. Algunos conceptos abstractos carecen de un ejemplo mínimo que muestre cómo participan en una decisión real.

### Patrones buenos que deben preservarse

- La orientación `Qué debes lograr / Cómo abordarlo / Investiga fuera solo si` de `1.3` y `2.4`.
- Los ejemplos mínimos de `1.3`, `1.4` y `2.4`, aclarando que no constituyen otro ejercicio.
- La plantilla de registro de evidencia de `1.1`.
- El informe mínimo explícito de `4.8`.
- Las tablas de decisión y comparaciones de trade-offs.
- La disciplina de before/after con condiciones comparables.
- La propiedad canónica de temas para evitar duplicación entre unidades.
- Los límites JIT y las decisiones de no introducir tecnología sin evidencia.
- Los redirects históricos breves como `1.8` y `4.10`.

## Estructura común para unidades activas

La progresión canónica es:

> **Problema → modelo mental → decisiones → práctica → entregable → evidencia → cierre**

Usar esta estructura como guía. No es obligatorio añadir texto bajo un encabezado cuando no aporta nada, pero el lector debe poder localizar cada función con facilidad.

```md
# Número — Título

> Estado:
> Prerrequisitos:
> Cierre:

## Propósito

Qué problema se aprenderá a resolver, por qué importa y qué enfoque incorrecto
se evita. Uno o dos párrafos como máximo.

## Orientación

**Qué debes lograr:** ...
**Cómo abordarlo:** ...
**Entregarás:** ...
**Investiga fuera solo si:** ...

## Modelo mínimo

Conceptos estrictamente necesarios, ordenados según cómo participan en el
problema o decisión real. Separar el modelo mental de los pasos operativos.

## Ejemplo mínimo

Solo cuando reduzca una abstracción importante. Debe indicar que explica el
razonamiento y que no es otro ejercicio ni otro Done.

## Ejercicio único — Nombre

**Timebox:** ...
**Contexto proporcionado:** ...
**Decisiones que debes tomar:** ...

1. ...
2. ...
3. ...

## Entregable y evidencia

- **Artefacto:** ...
- **Evidencia:** ...
- **Caso negativo:** ...
- **Límite, incertidumbre o riesgo:** ...

## Done cuando

- [ ] Una condición observable y atómica.
- [ ] ...

## JIT y recursos

Qué queda fuera, qué recurso consultar y ante qué bloqueo concreto.
```

### Aplicación flexible

- En unidades `DIAGNÓSTICO`, `Ejercicio único` puede llamarse `Diagnóstico`, manteniendo las mismas funciones.
- En unidades no críticas, no inventar recuperación ni evidencia adicional que el `ROADMAP` no exija.
- En archivos históricos integrados, conservar únicamente el estado y los destinos canónicos; no aplicar la plantilla completa.
- `Ejemplo mínimo` es opcional. Añadirlo solo cuando una carrera, fallo parcial, oracle, migración, medición o abstracción sea difícil de visualizar sin él.
- `Orientación` y `Entregable y evidencia` deben ser compactos; normalmente bastan cuatro líneas cada uno.

## Reglas de comunicación

### 1. Abrir con un contrato de lectura

En menos de un minuto debe entenderse qué se logrará, qué se hará, qué se entregará y cómo se comprobará.

### 2. Ordenar las ideas causalmente

No enumerar conceptos solo porque pertenecen al tema. Presentarlos en el orden en que participan en el flujo, fallo o decisión estudiada.

### 3. Explicar términos en contexto

Definir brevemente un término cuando sea necesario para continuar. Evitar glosarios exhaustivos y definiciones desconectadas del ejercicio.

### 4. Separar explicación y acción

- `Modelo mínimo` explica cómo pensar.
- `Ejercicio` indica qué hacer.
- `Entregable y evidencia` indica qué conservar.
- `Done cuando` verifica lo ya solicitado.

Mover flags, comandos e imperativos operativos al ejercicio cuando no formen parte del modelo mental.

### 5. Separar restricciones y decisiones

Todo ejercicio debe permitir distinguir:

- lo que el escenario ya fija;
- los supuestos permitidos;
- las decisiones que el estudiante debe justificar;
- las preguntas que puede dejar abiertas.

### 6. Nombrar el entregable

Indicar archivos, informe, salida o evidencia esperada. El lector no debe deducirlo desde el checklist final.

### 7. Mantener trazabilidad

Cada condición de `Done cuando` debe corresponder a un paso, entregable o evidencia presentado anteriormente. No introducir requisitos nuevos en el cierre.

### 8. Usar checks atómicos

Una casilla debe representar una afirmación comprobable. Separar condiciones que puedan cumplirse de manera independiente.

### 9. Incluir un timebox

Comunica el nivel de profundidad esperado y evita investigación abierta. No funciona como aprobación automática ni sustituye la evidencia.

### 10. Resumir dependencias esenciales

Mantener enlaces a las fuentes canónicas, pero añadir una frase local que explique qué artefacto o idea se reutiliza y qué no debe repetirse.

Enlazar la primera mención de `unidad N` cuando el archivo dependa de ella. Evitar cadenas de referencias sin explicar su función.

### 11. Mantener JIT visible

Agrupar lo que queda fuera en una sección breve. No acumular muchos destinos y enlaces en una sola oración difícil de procesar.

### 12. Conservar el rigor

Mejorar claridad no significa eliminar incertidumbre, fallos parciales, costes operativos, límites de laboratorio, evidencia independiente ni alternativas descartadas.

## Proceso de ejecución

### Fase 1 — Leer las fuentes canónicas

Antes de editar, leer completos:

1. `README.md`;
2. `ROADMAP.md`;
3. `METODOLOGIA.md`;
4. `PROYECTOS.md`;
5. `RECURSOS.md`.

Usarlos para distinguir unidades activas, diagnósticas, JIT e históricas, y para evitar inventar nuevos requisitos.

### Fase 2 — Inventariar todas las unidades

Crear una tabla temporal con:

- archivo;
- estado real según `ROADMAP`;
- unidad canónica;
- propósito;
- ejercicio o diagnóstico;
- entregable actual;
- evidencia actual;
- dependencias;
- problemas de claridad encontrados.

No editar aún. Identificar patrones compartidos y excepciones legítimas.

### Fase 3 — Corregir primero las unidades de la ruta principal

Aplicar la estructura en el orden pedagógico del `ROADMAP`, no en el orden de nombres de archivo:

1. unidad 6;
2. diagnósticos 1, 7 y 9;
3. unidades 3, 8, 13, 16, 17 y 18;
4. resto de la fase 2 del roadmap.

Trabajar en lotes pequeños. Después de cada lote, revisar enlaces, coherencia y crecimiento de texto antes de continuar.

### Fase 4 — Corregir comunicación, no rediseñar el currículo

Para cada unidad:

1. conservar propósito técnico, ejercicio principal y evidencia existente;
2. añadir o corregir la orientación inicial;
3. ordenar el modelo mínimo causalmente;
4. separar explicación de instrucciones;
5. explicitar contexto y decisiones del ejercicio;
6. nombrar el entregable y su evidencia;
7. hacer que `Done cuando` sea trazable y atómico;
8. agrupar JIT y recursos;
9. eliminar repeticiones creadas por la reestructuración.

Si una corrección exige cambiar alcance, prerrequisitos, proyecto, estado o resultado mínimo del `ROADMAP`, detenerse y registrar la decisión en vez de modificarlo silenciosamente.

### Fase 5 — Revisar navegación y referencias

- Verificar enlaces Markdown locales.
- Enlazar dependencias relevantes en su primera mención.
- Aclarar qué se reutiliza de cada unidad previa.
- No renombrar archivos solo para hacer coincidir H1 y filename; corregir únicamente si la divergencia impide identificar el tema.
- Confirmar que redirects históricos sigan apuntando a la fuente vigente.

### Fase 6 — Validación global

Revisar cada unidad activa con estas seis dimensiones:

1. **Orientación:** ¿se entiende rápidamente el objetivo?
2. **Continuidad conceptual:** ¿las ideas siguen un orden lógico?
3. **Accionabilidad:** ¿se sabe cómo comenzar y continuar?
4. **Entregable:** ¿está nombrado explícitamente?
5. **Verificación:** ¿ejercicio, evidencia y Done coinciden?
6. **Dependencias:** ¿las referencias ayudan sin obligar a reconstruir el tema?

Usar esta escala:

- `0`: claro y autosuficiente para su alcance;
- `1`: exige una inferencia menor o una consulta razonable;
- `2`: obliga a reconstruir instrucciones, contiene contradicción o bloquea el inicio.

Ninguna unidad corregida debe conservar un `2`. Una unidad con varios `1` debe revisarse otra vez para comprobar que la concisión no se convirtió en compresión.

## Criterios de aceptación

El trabajo termina cuando:

- [ ] Todas las unidades activas y diagnósticas tienen una progresión reconocible entre propósito, modelo, práctica, entregable y cierre.
- [ ] El lector puede identificar qué hacer y qué entregar sin reconstruirlo desde `Done cuando`.
- [ ] Cada ejercicio separa contexto proporcionado y decisiones del estudiante cuando esa distinción sea relevante.
- [ ] Cada `Done cuando` verifica requisitos ya presentados y usa checks atómicos.
- [ ] Todas las prácticas tienen un timebox o una razón explícita para no tenerlo.
- [ ] Las dependencias esenciales incluyen enlace y recordatorio local suficiente.
- [ ] JIT y fuera de alcance permanecen claros y compactos.
- [ ] Los archivos históricos integrados no fueron inflados.
- [ ] No se añadieron ejercicios, tecnologías ni investigación sin una necesidad del resultado mínimo.
- [ ] Los enlaces locales siguen funcionando.
- [ ] Una revisión final de varias unidades de cada etapa no encuentra dificultad de comprensión nivel `2`.

## Resultado esperado de la sesión

La sesión que ejecute este plan debe entregar:

1. archivos de temas corregidos;
2. resumen por lotes de los cambios estructurales;
3. lista de decisiones de alcance que no se modificaron por requerir aprobación;
4. validación de enlaces y estructura;
5. riesgos o ambigüedades restantes.

## Instrucción para una sesión nueva

> Lee completo `PLAN_MEJORA_CLARIDAD_TEMAS.md` y las cinco fuentes canónicas que indica. Ejecuta el plan sobre todas las unidades activas y diagnósticas, en el orden pedagógico del `ROADMAP`. Mantén el contenido técnico, el enfoque práctico y el alcance actual; corrige comunicación, estructura y trazabilidad sin convertir los temas en tutoriales extensos. Trabaja por lotes, valida cada lote y detente ante cualquier cambio que altere currículo, alcance o estados sin aprobación.
