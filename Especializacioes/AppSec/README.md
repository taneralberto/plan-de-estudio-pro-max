# AppSec — Iniciación práctica para programadores

Ruta en español para quien ya programa, pero no tiene formación previa en seguridad. El objetivo es reconocer riesgos, probar controles y explicar límites con evidencia: **no convertirte en experto ni garantizar empleo o certificaciones**.

## Índice

- [README.md](README.md): alcance, método, seguridad y plantillas.
- [ITINERARIO.md](ITINERARIO.md): única fuente del orden, de los módulos y de las actividades.
- [RECURSOS.md](RECURSOS.md): fuentes concretas y qué consultar en cada actividad.
- [PROMPTS.md](PROMPTS.md): apoyo de IA sin sustituir predicción ni verificación.

## Tiempo y encaje con la ruta principal

La ruta son **20 módulos × 9 h = 180 h orientativas**: trabajo efectivo estimado (leer, practicar, escribir evidencia y explicar), **no un calendario cerrado ni una promesa de duración**. A 3 h por semana serían unas **60 semanas**; a 4 h, unas **45**. No se comprime el contenido para caber en menos horas: se baja el ritmo o se entrega parcial.

El presupuesto es **tu ritmo**, no una cita: **3 h por semana** es la referencia y **9 h son las horas de un módulo**, no 9 h semanales. Si puedes más, más; si menos, el módulo se alarga. Lo que se reparte son **bloques de 20–60 min** (una sesión), nunca sesiones de horas enteras: las 9 h de un módulo son 9 sesiones de 60 min o 18 de 30 min, y a 3 h por semana ese mismo presupuesto son 3 sesiones semanales de 60 min (o 6 de 30 min).

Cada módulo tiene **3–5 actividades** con códigos estables (`M3-A2`, `M17-A4`…). Una actividad **no es una sesión**: la divides en sesiones de 20–30 min (lectura o repaso) y de 40–60 min (práctica). En la tabla del itinerario, la columna **«Dedicación acumulada»** es **la dedicación estimada de esa actividad** (un delta), **sumada entre sesiones**: no es un hito acumulado del módulo ni una marca de avance. **El total de un módulo es la suma de sus filas: 9 h.** Por eso las filas de una tabla no empiezan en 1 h ni acaban en 9 h.

Es una ruta alternativa o un enfoque del tiempo disponible: **no sumes este presupuesto a las 10 h de backend** de la [metodología general](../../METODOLOGIA.md). Tampoco necesitas terminar antes las 18 unidades. Introduce fundamentos cuando aparezcan; ante un conocimiento previo **haz una demo de 5–10 min** del resultado esperado y reutiliza evidencia existente si sigue siendo válida. No repitas por completar casillas.

Una sesión perdida no se acumula como deuda: retoma desde la evidencia y mueve la fecha.

### Ejemplo de semana real a 3 h

Una combinación que cuadra con 180 min: **25 + 25 + 50 + 50 + 30**. Las ventanas 19:30–21 son una propuesta, no una obligación: ajústalas a tu entrenamiento y a tu trabajo y no invades ninguno de los dos.

| Día | Ventana | Bloque | Contenido |
|---|---|---|---|
| Lunes | 19:30–19:55 | 25 min | 5 recuperar sin notas + 20 concepto o ejemplo |
| Martes | 19:30–19:55 | 25 min | 5 recuperar sin notas + 20 concepto o ejemplo |
| Miércoles | 19:30–20:20 | 50 min | 5 recuperar + 40 práctica + 5 registrar |
| Jueves | 19:30–20:20 | 50 min | 5 recuperar + 40 práctica + 5 registrar |
| Sábado | 19:30–20:00 | 30 min | 5 repaso + 20 práctica o verificación + 5 cierre |

El reparto cuenta **100 min de práctica explícita** (40 + 40 + 20). Los otros 40 min son «concepto y ejemplo»: si en ellos dedicas la mitad **ejecutando el ejemplo, mutándolo y prediciendo** —no solo leyendo— la semana queda en 120 min de práctica sobre 180, es decir, del 65–70 %.

**La proporción de 60–70 % se mide a nivel de módulo, no de cada semana.** Una semana puede ser casi toda lectura si la anterior fue casi toda práctica. **Lo que no se recupera en una semana no es una deuda**: se retoma en la siguiente tal cual, **sin compensar horas** (no añades minutos para «ponerte al día»). Lo que al final no se recupera nunca, se declara como hueco.

**Microintervalos:** son **bloques de 10–15 min que sustituyen a una parte de una sesión**, no un añadido: si un día solo tienes 10 min, úsalos como **sustituto** de una parte de una sesión (leer el apartado que falta, o repetir el repaso). Si además eliges microintervalos **fuera** de tus sesiones, esos también **cuentan como horas efectivas**: son tiempo real de trabajo, así que el módulo durará menos semanas. Lo único que no vale es contarlos dos veces. Y **nunca son una obligación**: el repaso va dentro del presupuesto de la sesión y no se te pide al final de la jornada de trabajo ni después de cerrar el taller.

### Sin fase 0: los cimientos van dentro de los módulos

No hay un módulo 0 de fundamentos. HTTP, las pruebas, los *fixtures* y el modelo mental de amenazas se introducen **dentro** de los módulos 1–3, justo donde hacen falta:

- **Módulo 1:** qué es una petición y una respuesta, DevTools, qué protege TLS, identidad frente a permiso y la primera prueba ejecutable con `node:test`.
- **Módulo 2:** modelo de amenazas, STRIDE, y la diferencia entre **qué** debe cumplirse (ASVS) y **cómo** se comprueba (WSTG).
- **Módulo 3:** autorización entre tenants, *default deny*, consulta con alcance y el primer rojo–verde.

Una fase 0 aparte duplicaría el HTTP del módulo 1, te haría leer teoría antes de tener un motivo para ella y retrasaría el primer contacto con el problema. Si vienes de la ruta principal y **ya cumples el resultado** de una actividad, haz una **demo de 5–10 min** que lo sustituya: no es trabajo extra ni una casilla.

### Tres palabras que se usan desde el principio

No son un glosario para consultar: son las tres que más se confunden, y cada módulo las introduce con su ejemplo.

- **Fixture (dato de prueba):** un dato **ficticio** y **declarado antes de usarlo**, con su valor escrito: `org-a`, `u-1`, `factura-1`, total 42. Un fixture no es un dato real ni algo que se inventa sobre la marcha: si el valor cambia, cambias el valor y el motivo, y el test sigue significando lo mismo. Escribir los fixtures antes del test es lo que hace comparables dos ejecuciones.
- **Tenant (organización):** la agrupación a la que pertenece cada recurso. Un sistema *multi-tenant* sirve a varias organizaciones en la misma aplicación y **debe mantenerlas aisladas**: un actor de una organización no ve, lee ni modifica nada de otra. El aislamiento se comprueba con un caso que cruza dos organizaciones, que es lo que hace el módulo 3.
- **Identidad frente a permiso:** dos preguntas distintas. La **identidad** es la afirmación de quién eres; la **credencial** es lo que la presentas para demostrarla (una cookie de sesión, un token). El **permiso** es la decisión que toma la aplicación sobre un recurso concreto. Con credencial válida y sin permiso, la respuesta es `403` **o `404`**, según la política de enumeración de esa aplicación (el `404` existe para no confirmar la existencia: lo decides en el módulo 3); con credencial válida y permiso, `200`. Que la primera sea correcta **no** implica la segunda.

### Conexiones reutilizables

Los números siguientes corresponden al [roadmap principal](../../ROADMAP.md), no a prerrequisitos que debas cursar completos.

| Unidad | Qué reutilizar aquí | Documento local |
|---|---|---|
| 4 — Seguridad | Threat model, autorización entre tenants y riesgo residual | [Seguridad aplicada](../../Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md) |
| 3 — Testing | Oracle independiente, permitido y negativo | [Testing](../../Etapa%201%20—%20Entrada/1.3%20—%20Testing%20Fundamentals.md) |
| 7 — Git y shell | Extraer evidencia y recuperar cambios aislados | [Git](../../Etapa%202%20—%20Fundamentos/2.8%20—%20Git%20Avanzado%20y%20Modelo%20de%20Objetos.md) |
| 11 — Redes | HTTP, TLS y diagnóstico puntual | [Redes](../../Etapa%202%20—%20Fundamentos/2.12%20—%20Redes%20en%20Profundidad.md) |
| 13 — API | Contratos e invariantes | [API Design](../../Etapa%203%20—%20Arquitectura/3.1%20—%20API%20Design.md) |
| 16 — Entrega | Permisos del pipeline y secretos, sin exigir cloud | [CI/CD](../../Etapa%204%20—%20Profundización/4.2%20—%20CI-CD%20(Integración%20y%20Entrega%20Continua).md) |
| 17 — Observabilidad | Eventos útiles sin datos sensibles | [Observabilidad](../../Etapa%204%20—%20Profundización/4.5%20—%20Observabilidad%20(Los%203%20Pilares).md) |
| 18 — Coding agents | Alcance, permisos y auditoría de resultados | [Ingeniería con agentes](../../Etapa%204%20—%20Profundización/4.8%20—%20AI%20Engineering%20(la%20nueva%20disciplina).md) |

## Sesiones y cierre con evidencia

Apunta a **60–70 % de práctica**: probar, analizar trazas o código, corregir y escribir tests. El resto es lectura puntual, recuperación y explicación. No leas estándares completos. Cada módulo produce **un artefacto principal**, que puede agrupar tests, diagrama y ficha; no una entrega por sesión.

Una actividad de 2 h se reparte, por ejemplo, en **60 min + 40 min + 20 min**; una de 1,5 h, en **50 + 40**; una de 2,5 h, en **60 + 60 + 30**. Los repasos **están incluidos** en las 9 h del módulo: no son trabajo añadido.

| Sesión | Reparto orientativo |
|---|---|
| 20 min | 3 recuperar + 12 práctica + 5 registrar |
| 25 min | 5 recuperar + 15 práctica + 5 registrar |
| 30 min | 5 recuperar + 5 consultar + 15 práctica + 5 registrar |
| 40 min | 5 recuperar + 5 consultar + 25 práctica + 5 registrar |
| 50 min | 5 recuperar + 10 consultar + 30 práctica + 5 registrar |
| 60 min | 5 recuperar + 10 consultar + 40 práctica + 5 registrar |

Son **presupuestos, no un contrato**: si una sesión se te va en leer, quítale minutos a la lectura y dáselos a la práctica; si necesitas más de 60 min, parte la actividad en dos sesiones. Lo único fijo es que **cada sesión deja un punto de reanudación escrito**.

**Punto de reanudación:** toda sesión que termines a medias deja escrito qué queda pendiente y por dónde se sigue, en el registro de evidencia. Retomar sin ese dato es empezar de nuevo.

**R1** es la pregunta de **Recuperación** del módulo más una idea anterior. Se responde en la **próxima sesión** o a **+1 día** si es viable sin deuda: 5–10 min con el bloque de recuperación. **No es una obligación diaria**: es una revisión por módulo, y si una semana se te junta, se hace la siguiente. La **rotación semanal** cabe dentro de las 3 h: cada semana repasas la idea más antigua que siga pendiente y, al completarla, empiezas la vuelta de nuevo. Si R1 y rotación coinciden, reparte el tiempo entre ambas. La R1 final puede ocupar 5 min del bloque de repaso del cierre, trasladados a la sesión siguiente, sin añadir horas.

Antes de consultar IA escribe tu predicción. **Una predicción puede ser «no sé todavía»**: si todavía no tienes la base, esa es tu predicción honesta y la primera no tiene por qué ser una hipótesis técnica. Elige el [prompt](PROMPTS.md) indicado por la actividad, pero verifica con fuente primaria, test u observación independiente. No uses la respuesta de IA como oracle único.

**Done no es una casilla.** Se cumple cuando la salida es **observable y reproducible por otra persona**, el **criterio es independiente** del código que se prueba, hay **caso permitido y caso negativo**, puedes **explicar los límites** en dos minutos y la R1 está hecha o planificada con fecha. No se cierra por tiempo ni por completar un lab. Si solo tienes un mock, declara que no verifica el backend del proveedor ni un sistema real.

### Antiatasco

Tras unas **8 h acumuladas de primera pasada** sin el resultado: entrega parcial, registra el hueco, reduce el caso y replanifica las dependencias. No marques dominio ni avances a una actividad que presuponga ese control sin adaptarla; tampoco reinicies la ruta. Si el hueco está en un módulo anterior, recupera ese módulo antes de continuar. Si está en el sustrato, reduce el alcance o pasa a *fixtures*. **El tiempo es una alarma, no un aprobado automático.**

## Entorno y límites de seguridad

- Solo aplicaciones propias con permiso explícito o labs habilitados para esa actividad. Tener login o cuenta **no es autorización**. Documenta objetivo, operaciones permitidas, límites y condición de parada.
- En Academy trabaja únicamente con la instancia provisionada y autorizada del lab; no escanees el sitio general de PortSwigger ni otros servicios.
- Cualquier aplicación vulnerable local escucha solo en **loopback**, con datos y cuentas ficticios; nunca despliegues público. Usa navegador o perfil de laboratorio. No instales certificados de proxy en tu perfil personal; si no puedes aislarlo, usa DevTools y `curl` sin proxy.
- No ataques fuera del alcance, metadata cloud real, redes privadas ajenas, fuerza bruta real, *floods* ni pruebas de carga sobre terceros. Detente ante datos reales o acceso inesperado.
- No incluyas secretos, PII ni código de empresa en IA, capturas o portfolio. Un secreto ficticio debe ser inequívocamente de prueba.
- No se necesita Burp Pro, APIs de IA de pago ni cloud. Academy, DevTools, `curl`, `node:test` y **Burp Community/Repeater** bastan cuando corresponda; no dependas de funciones Pro. Usa mocks o tests locales si un lab no es accesible.
- Para las pruebas necesitas una **versión mantenida de Node** (LTS) con `node:test` y `node:assert`: vienen con Node, sin instalar nada. No fijes una versión antigua por costumbre.
- Estas son instrucciones de estudio futuras, no una petición de instalar, arrancar apps o ejecutar pruebas al crear estos documentos.

## Sustrato pequeño, no otro producto

Prefiere labs alojados autorizados. Puedes usar una API propia existente o `safe-change-api` **si ya existe**; este repositorio contiene documentos, no presupone ese código. Si no hay API, usa pequeñas funciones, tests y *fixtures* locales del stack conocido (Node, PostgreSQL, Angular, NestJS). No construyas login, proveedor OAuth, servicio nuevo, frontend grande ni infraestructura cloud.

El límite de [PROYECTOS.md](../../PROYECTOS.md) es **8–12 h TOTALES acumuladas por sustrato personal** para prepararlo o ampliarlo, compartidas por toda la ruta: no por semana ni por módulo. Registra el gasto de preparación o ampliación y el acumulado en la evidencia. El resto del tiempo se dedica a práctica, análisis y tests sobre ese alcance, no a crecer el proyecto. Al agotar el techo, reduce alcance o pasa a *fixtures* o labs; el capstone revisa lo existente, no crea otro producto.

Al terminar conserva **al menos seis fichas distintas** de hallazgo o revisión justificada, distribuidas en la ruta (por ejemplo autorización, SQL, XSS, identidad, review y automatización). No cuentes duplicados ni inventes findings. **Cero hallazgos es válido** si la evidencia y el alcance lo sostienen: una ficha puede documentar un control que resistió y sus límites. Para practicar defectos pendientes usa fallos controlados de laboratorio, claramente etiquetados.

Conserva además **tres remediaciones locales rojo–verde**, distribuidas en autorización (módulo 3), SQL (módulo 6) y XSS (módulo 7): el mismo test detecta el defecto antes y pasa después, manteniendo el caso permitido. Explotar un lab que no controlas no demuestra que hayas aplicado o verificado tu remediación. Los ejemplos sintéticos prueban solo su propia implementación.

## Registro de evidencia por módulo y actividad

Añádelo al artefacto del módulo, sin tracker aparte. Usa solo datos ficticios. Una entrada por actividad, aunque la actividad ocupe varias sesiones.

```md
Módulo / actividad (Mx-Ay):
Fecha y horas de esta sesión / acumuladas del módulo:
Hipótesis y predicción antes de probar:
Fuente, sección y versión/fecha consultada:
Entorno, revisión del código y alcance autorizado:
Preparación/ampliación del sustrato: horas de esta sesión / acumuladas:
Caso permitido y resultado esperado:
Caso negativo y resultado esperado:
Observado y referencia a salida/test/captura sanitizada:
Control/corrección y evidencia roja–verde, si aplica:
Explicación de 2 min / pregunta de recuperación / R1 y resultado:
Punto de reanudación (qué queda a medias y por dónde se sigue):
Incertidumbre, fuera de alcance y siguiente actividad:
```

## Ficha de hallazgo o revisión

```md
Título / hallazgo confirmado, hipótesis o control revisado sin hallazgo:
Alcance, entorno y autorización:
Requisito verificable y fuente/versión (sin inventar IDs):
Pasos mínimos seguros con datos ficticios:
Esperado / observado / evidencia:
Impacto y precondiciones; severidad razonada si procede:
Recomendación y responsable del control:
Verificación: permitido, negativo y rojo–verde si aplica:
Riesgo residual, incertidumbre y partes no probadas:
```

No inventes un CVSS ni una severidad para rellenar campos. Justifica impacto, exposición y precondiciones, o declara que faltan datos.

## Web interactiva

Hay una versión web local de la ruta en `web/`, dentro de esta misma carpeta AppSec (`Especializacioes/AppSec/web/`): lee estos mismos cuatro archivos, así que **el Markdown sigue siendo la fuente de verdad** y la web no lo modifica.

**Inicio recomendado.** Abre una terminal en la carpeta `Especializacioes/AppSec/web/` y ejecuta:

```sh
python3 iniciar.py
```

El script sirve el repositorio en `127.0.0.1:8000`, imprime esa URL y abre el navegador en `http://127.0.0.1:8000/Especializacioes/AppSec/web/`. Deja la terminal abierta mientras uses la web y pulsa `Ctrl+C` para detener el servidor y salir limpio. Si el navegador no se abre, la URL queda impresa y entras a mano. Si el puerto 8000 ya está ocupado, el script no toca el proceso anterior: avisa y te pide detenerlo con `Ctrl+C` y volver a ejecutar `python3 iniciar.py`.

**Alternativa manual.** Sin script, desde la raíz del repositorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Y entra en `http://127.0.0.1:8000/Especializacioes/AppSec/web/`.

Usa siempre ese mismo origen (mismo puerto): el progreso se guarda en el almacenamiento local del navegador, así que otro puerto parece un navegador nuevo y sin progreso. Da igual que la ruta de la web haya cambiado: el progreso guardado sigue siendo el mismo porque depende del origen (host y puerto) y no de la carpeta donde vive la página. Deja el servidor en marcha mientras uses la web; no abras `Especializacioes/AppSec/web/index.html` con doble clic, porque `file://` no permite leer los `.md`, ni hagas doble clic en `iniciar.py`, porque el sistema puede abrirlo con un editor en vez de ejecutarlo. No instala nada, no llama a servicios externos y no necesita cuentas: solo un navegador moderno con JavaScript.

### Qué ofrece la web y qué hay que vigilar

La web refleja el Markdown: **20 módulos**, cada uno con sus actividades (**83 en total**), con una marca de estudio por actividad y **notas por módulo**. Búsqueda y filtros por estado, y el README, los recursos y los 8 prompts con botón de copiar.

- **El historial anterior se conserva.** Las **140 marcas** por sesión de la versión previa se muestran como historial y **no se convierten automáticamente** en marcas de actividad: una sesión de la versión anterior no equivale a una actividad de esta. Tampoco cuentan como horas actuales: las horas que ves son **planificadas**, no medidas.
- **Exporta antes de actualizar.** Desde la propia web puedes exportar e importar una copia JSON. Exporta una copia **antes** de que cambie la versión: si después retrocedes a una versión antigua, puede no reconocer los identificadores nuevos de actividad. Importar con progreso existente pide confirmación y cancelarla no cambia nada.

Límites del progreso: son marcas locales de estudio, **no evidencia**. Una casilla marcada ni demuestra dominio ni cumple el *Done* de la actividad, y las horas mostradas son **planificadas**, no medidas. El estado vive solo en ese navegador y ese origen: no se sincroniza, no se envía a ningún sitio y puede desaparecer al limpiar los datos del navegador.

Pruebas opcionales, sin dependencias (la de navegador usa `/usr/bin/chromium`). Desde la raíz del repositorio:

```sh
node --test Especializacioes/AppSec/web/tests/*.test.mjs
```

Las del script de inicio (solo biblioteca estándar, sin servidor real ni navegador) se ejecutan desde la raíz del repositorio con:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s Especializacioes/AppSec/web/tests -p "test_*.py"
```
