# AppSec — Iniciación práctica para programadores

Ruta en español para quien ya programa, pero no tiene formación previa en seguridad. El objetivo es reconocer riesgos, probar controles y explicar límites con evidencia: **no convertirte en experto ni garantizar empleo o certificaciones**.

## Índice

- [README.md](README.md): alcance, método, seguridad y plantillas.
- [ITINERARIO.md](ITINERARIO.md): única fuente del orden y del calendario diario.
- [RECURSOS.md](RECURSOS.md): fuentes y selección de lecturas/labs.
- [PROMPTS.md](PROMPTS.md): apoyo de IA sin sustituir predicción ni verificación.

## Tiempo y encaje con la ruta principal

La propuesta es **20 semanas × 9 h = 180 h**, aproximadamente cinco meses a ritmo continuo, no una promesa de duración. **Horario confirmado: 1 h de lunes a viernes y 2 h CADA sábado y domingo**: 5 × 1 + 2 × 2 = 9 h.

Es una ruta alternativa o un enfoque del tiempo disponible: **no sumes estas 9 h a las 10 h de backend** de la [metodología general](../../METODOLOGIA.md). Tampoco necesitas terminar antes las 18 unidades. Introduce fundamentos cuando aparezcan; ante un conocimiento previo intenta el resultado durante 30–60 min, dentro de la sesión, y reutiliza evidencia existente si sigue siendo válida. No repitas por completar casillas.

Una sesión perdida no se acumula como deuda: retoma desde la evidencia y mueve la fecha.

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

Apunta a **60–70 % de práctica**: probar, analizar trazas/código, corregir y escribir tests. El resto es lectura puntual, recuperación y explicación. No leas estándares completos. Cada semana produce **un artefacto principal**, que puede agrupar tests, diagrama y ficha; no siete entregas diarias.

| Sesión | Distribución exacta |
|---|---|
| 60 min | 5 min recuperar sin notas + 10 min consultar una duda + 40 min práctica de la fila diaria + 5 min registrar evidencia y próxima predicción = 60 |
| 120 min | 10 min recuperar sin notas + 15 min consulta puntual + 75 min práctica de la fila diaria + 10 min explicar/revisar + 10 min registrar evidencia y siguiente paso = 120 |

Los repasos **están incluidos en las 9 h**. Haz R1 a +1 día de una idea o del cierre (5–10 min, usando el bloque de recuperación); el cierre del domingo se recupera el lunes siguiente. El domingo usa ese bloque para repasar también una idea anterior, rotando de la más antigua a la más reciente y volviendo a empezar. Si falla, corrige la evidencia y recupérala la próxima semana, sin otro tracker. Si coinciden R1 y rotación, reparte los 10 min entre ambas. La R1 final puede ocupar 5 min del bloque de repaso del domingo, trasladados al lunes, sin añadir horas.

Antes de consultar IA escribe tu predicción. Elige el [prompt](PROMPTS.md) indicado por la tarea, pero verifica con fuente primaria, test u observación independiente. No uses la respuesta de IA como oracle único.

**Done común:** artefacto reproducible, fuente/entorno identificados, caso permitido y negativo, explicación de dos minutos con incertidumbre y R1 realizada. El Done específico semanal añade su condición observable. No se cierra por tiempo ni por completar un lab. Si solo tienes un mock, declara que no verifica el backend del proveedor ni un sistema real.

**Antiatasco:** tras unas **8 h acumuladas de primera pasada** sin el resultado, entrega parcial, registra el hueco, reduce el caso y replanifica las dependencias. No marques dominio ni avances a un ejercicio que presuponga ese control sin adaptarlo; tampoco reinicies el curso. El tiempo es alarma, no aprobado automático.

## Entorno y límites de seguridad

- Solo aplicaciones propias con permiso explícito o labs habilitados para esa actividad. Tener login/cuenta **no es autorización**. Documenta objetivo, operaciones permitidas, límites y condición de parada.
- En Academy trabaja únicamente con la instancia provisionada y autorizada del lab; no escanees el sitio general de PortSwigger ni otros servicios.
- Cualquier aplicación vulnerable local escucha solo en **loopback**, con datos y cuentas ficticios; nunca despliegue público. Usa navegador/perfil de laboratorio. No instales certificados de proxy en tu perfil personal; si no puedes aislarlo, usa DevTools y `curl` sin proxy.
- No ataques fuera del alcance, metadata cloud real, redes privadas ajenas, fuerza bruta real, floods ni pruebas de carga sobre terceros. Detente ante datos reales o acceso inesperado.
- No incluyas secretos, PII ni código de empresa en IA, capturas o portfolio. Un secreto ficticio debe ser inequívocamente de prueba.
- No se necesita Burp Pro, APIs de IA de pago ni cloud. Academy, DevTools, `curl` y **Burp Community/Repeater** bastan cuando corresponda; no dependas de funciones Pro. Usa mocks/tests locales si un lab no es accesible.
- Estas son instrucciones de estudio futuras, no una petición de instalar, arrancar apps o ejecutar pruebas al crear estos documentos.

## Sustrato pequeño, no otro producto

Prefiere labs alojados autorizados. Puedes usar una API propia existente o `safe-change-api` **si ya existe**; este repositorio contiene documentos, no presupone ese código. Si no hay API, usa pequeñas funciones, tests y fixtures locales del stack conocido. No construyas login, proveedor OAuth, servicio nuevo, frontend grande ni infraestructura cloud.

El límite de [PROYECTOS.md](../../PROYECTOS.md) es **8–12 h TOTALES acumuladas por sustrato personal** para prepararlo o ampliarlo, compartidas por toda la ruta: no por semana ni módulo. Registra gasto de preparación/ampliación y acumulado en la evidencia. El resto del tiempo se dedica a práctica, análisis y tests sobre ese alcance, no a crecer el proyecto. Al agotar el techo, reduce alcance o pasa a fixtures/labs; el capstone revisa lo existente, no crea otro producto.

Al terminar conserva **al menos seis fichas distintas de hallazgo o revisión justificada**, distribuidas en la ruta (por ejemplo autorización, SQL, XSS, identidad, review y automatización). No cuentes duplicados ni inventes findings. **Cero hallazgos es válido** si evidencia y alcance lo sostienen: una ficha puede documentar un control que resistió y sus límites. Para practicar defectos pendientes usa fallos controlados de laboratorio, claramente etiquetados.

Conserva además **tres remediaciones locales rojo–verde**, distribuidas en autorización, SQL y XSS: el mismo test detecta el defecto antes y pasa después, manteniendo el caso permitido. Explotar un lab que no controlas no demuestra que hayas aplicado o verificado su remediación. Los ejemplos sintéticos prueban solo su propia implementación.

## Registro de evidencia semanal

Añádelo al artefacto semanal, sin tracker aparte. Usa solo datos ficticios.

```md
Semana / artefacto:
Hipótesis y predicción antes de probar:
Fuente, sección y versión/fecha consultada:
Entorno, revisión del código y alcance autorizado:
Preparación/ampliación del sustrato: horas de esta sesión / acumuladas:
Caso permitido y resultado esperado:
Caso negativo y resultado esperado:
Observado y referencia a salida/test/captura sanitizada:
Control/corrección y evidencia roja–verde, si aplica:
Explicación de 2 min / pregunta R1 / resultado R1 y repaso:
Incertidumbre, fuera de alcance y próxima sesión:
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

Qué ofrece: el itinerario completo en 20 acordeones con una casilla «Estudiado» por sesión (140) y notas opcionales por semana; búsqueda y filtros por estado; el README, los recursos y los 8 prompts con botón de copiar; y enlaces navegables al resto del repositorio.

Límites del progreso: son marcas locales de estudio, **no evidencia**. Una casilla marcada ni demuestra dominio ni cumple el *Done* de la semana, y las horas mostradas son las **planificadas**, no medidas. El estado vive solo en ese navegador y ese origen: no se sincroniza, no se envía a ningún sitio y puede desaparecer al limpiar los datos del navegador. Desde la propia web puedes exportar e importar una copia JSON; importar con progreso existente pide confirmación y cancelarla no cambia nada.

Pruebas opcionales, sin dependencias (la de navegador usa `/usr/bin/chromium`). Desde la raíz del repositorio:

```sh
node --test Especializacioes/AppSec/web/tests/*.test.mjs
```

Las del script de inicio (solo biblioteca estándar, sin servidor real ni navegador) se ejecutan desde la raíz del repositorio con:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s Especializacioes/AppSec/web/tests -p "test_*.py"
```
