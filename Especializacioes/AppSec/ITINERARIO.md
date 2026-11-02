# Itinerario AppSec — 20 semanas

Esta es la **única fuente del orden y calendario**. Aplica las [reglas de sesión, cierre y seguridad](README.md): 60 min L–V y 120 min cada sábado/domingo, con repasos incluidos; **9 h/semana, 180 h**. Cada fila ocupa la sesión completa usando esos bloques, no añade tareas fuera del horario. Las lecturas son puntuales; la acción principal es predecir, probar y explicar.

Cada domingo registra el artefacto semanal con la [plantilla](README.md#registro-de-evidencia-semanal), explicación de dos minutos y pregunta R1. R1 ocurre a +1 día dentro del siguiente bloque de recuperación; el domingo incluye la rotación semanal. Si falta evidencia, entrega parcial y replanifica según la regla de 8 h, no marques Done por calendario. Un diagnóstico de 30–60 min o evidencia previa válida puede sustituir trabajo repetido, no sumarse a él.

**Labs:** uno o dos pequeños como máximo por semana, no cuota obligatoria. Elige Apprentice solo cuando exista y sea accesible; de lo contrario usa un ejemplo guiado pequeño. Un caso suficientemente probado cierra la práctica. No completes catálogos. Distingue siempre el lab que puedes explotar del control local que puedes modificar y verificar. Todas las pruebas usan cuentas/datos ficticios y alcance autorizado.

**IA:** usa el prompt sugerido solo después de tu propia predicción. Los enlaces de recursos apuntan al catálogo; selecciona allí una teoría, una práctica y como máximo una consulta opcional (máximo tres recursos concretos). No necesitas leer todo lo enlazado en una sección.

## Resumen

| Semana | Foco | Artefacto principal |
|---|---|---|
| 1 | HTTP y alcance | Request/response anotados y reglas de laboratorio |
| 2 | Threat modeling | Diagrama y control comprobado |
| 3 | Autorización | Test multi-tenant rojo–verde n.º 1 |
| 4 | Autenticación | Un fallo y mitigación mínima |
| 5 | Sesiones y CSRF | Tabla de condiciones y prueba |
| 6 | SQL injection | Query parametrizada rojo–verde n.º 2 |
| 7 | XSS | Sink local rojo–verde n.º 3 |
| 8 | Fronteras del navegador | Matriz origin/site/CORS |
| 9 | SSRF | Modelo de salida y validación falsada |
| 10 | Archivos | Un flujo comprobado y comparación |
| 11 | JWT/OAuth/OIDC | Análisis de identidad acotado |
| 12 | APIs y negocio | Invariante y caso negativo |
| 13 | Carreras | Dos operaciones y atomicidad |
| 14 | Code review | Trazas y dos conclusiones justificadas |
| 15 | Automatización | Triage de un scanner |
| 16 | Pipeline y permisos | Control mínimo de privilegios |
| 17 | Logs y respuesta | Prueba de log y playbook |
| 18 | AppSec en IA | Stub y autorización externa |
| 19 | Evaluación integradora | Informe de alcance congelado |
| 20 | Retest y comunicación | Reporte y evidencia sanitizada |

## Semana 1 — HTTP, navegador y alcance seguro

**Objetivo verificable:** reconstruir una petición propia/de lab y su respuesta, repetirla sin ampliar alcance y explicar qué protege TLS y qué no.

**Busca:** petición/respuesta (*request/response*), método, URL, headers, body, códigos de estado (*status codes*), cookies, HTTPS/TLS, proxy, Repeater, alcance (*scope*). No hace falta estudiar criptografía ni toda la pila de red.

**Recursos:** teoría MDN HTTP overview y opcional MDN Cookies en [HTTP y navegador](RECURSOS.md#http-y-navegador); práctica Burp getting started en [herramientas](RECURSOS.md#uso-de-academy-y-herramientas). Alternativa sin Burp: DevTools/`curl`.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Diagnostica en 30–60 min cuánto puedes explicar de un request propio; escribe permiso, host permitido y condiciones de parada. |
| Martes | 1 h | Recupera método/URL de memoria; observa headers, body y estado en DevTools y predice el efecto de cambiar un dato ficticio. |
| Miércoles | 1 h | Prepara perfil de laboratorio y alcance de proxy/Repeater si lo usarás; si no puedes aislarlo, conserva DevTools/`curl`. No captures tráfico personal. |
| Jueves | 1 h | Repite una única petición propia o de la instancia autorizada; compara request y response, sin probar otros hosts ni descubrir rutas. |
| Viernes | 1 h | Dibuja navegador → terminación TLS → aplicación; separa confidencialidad del transporte de identidad y autorización. Usa tutor, prompt 1, para una duda. |
| Sábado | 2 h | Anota una traza sanitizada completa y un negativo inocuo, como entrada inválida permitida por el lab; contrasta respuesta esperada/observada. |
| Domingo | 2 h | Reproduce la traza desde tus notas, revisa que no haya cookies reales y explica en dos minutos el alcance y el límite de HTTPS; registra evidencia y R1. |

**Entregable / Done:** traza sanitizada, repetición observable y negativo, con alcance explícito. **Setup ≤2 h**, contabilizado en la práctica y en el gasto del sustrato; si lo supera, usa la alternativa sin proxy.

**Recuperación:** ¿por qué HTTPS no impide que un usuario autenticado lea un objeto ajeno?

## Semana 2 — Threat model que termina en una prueba

**Objetivo verificable:** convertir una amenaza de un flujo en un control y comprobarlo, sin afirmar una evaluación ASVS completa.

**Busca:** activos (*assets*), actores, flujos de datos (*data flows*), fronteras de confianza (*trust boundaries*), STRIDE como preguntas, requisito verificable (*verification requirement*) y método de prueba (*test method*).

**Recursos:** Threat Modeling Cheat Sheet, ASVS y opcional WSTG, seleccionados en [Modelado y verificación](RECURSOS.md#modelado-y-verificación).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Elige un único flujo propio, de ejemplo o del lab anterior; nombra activo, actor, objetivo y exclusiones antes de leer. |
| Martes | 1 h | Dibuja componentes y flechas; marca dónde cambia la confianza, no solo dónde cambia una caja. |
| Miércoles | 1 h | Formula preguntas STRIDE sobre dos flechas; prioriza una amenaza por precondiciones, exposición e impacto. |
| Jueves | 1 h | Busca un requisito ASVS aplicable y registra versión/sección/ID real; escríbelo como resultado observable. |
| Viernes | 1 h | Consulta un método WSTG solo si necesitas concretar el negativo; predice permitido y rechazo. Prompt 2 puede acotar la sesión. |
| Sábado | 2 h | Prueba un control del flujo o fixture, conserva resultado permitido/negativo y corrige el diagrama con lo observado. |
| Domingo | 2 h | Revisa si el control está en la frontera adecuada; explica amenaza, evidencia y riesgo residual, y registra artefacto/R1. |

**Entregable / Done:** diagrama pequeño más amenaza → requisito → control → prueba, con al menos una incertidumbre. Un dibujo sin control comprobado no cierra.

**Recuperación:** ¿qué diferencia hay entre nombrar una amenaza y demostrar que su mitigación funciona?

## Semana 3 — Autorización e IDOR/BOLA entre tenants

**Objetivo verificable:** el caso cruzado falla contra una variante defectuosa y pasa tras aplicar default deny y scope por tenant/objeto, preservando el permitido.

**Busca:** autenticación frente a autorización, IDOR/BOLA, autorización horizontal, multi-tenant, *default deny*, *scoped query*, enumeración, `403` frente a `404`.

**Recursos:** Academy access control y ejercicio local de Seguridad aplicada en [Autorización](RECURSOS.md#autorización). Reutiliza la evidencia de la unidad 4 si ya cumple el resultado.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Prepara fixtures A/tenant A, B/tenant B y objeto de A; diagnostica una prueba existente sin construir usuarios ni login. |
| Martes | 1 h | Escribe permitido A→objeto y cruzado B→objeto; predice qué ocurre si solo se comprueba autenticación o rol. |
| Miércoles | 1 h | Ejecuta el mismo oracle contra esa variante defectuosa local y conserva el rojo; no uses datos de terceros. |
| Jueves | 1 h | Añade decisión actor/acción/tenant/objeto y default deny antes de leer/modificar; deriva tenant de identidad confiable. |
| Viernes | 1 h | Limita la query por objeto y tenant; decide `403` o `404` y qué evidencia evitará fuga de contenido/existencia. Prompt 5 como apoyo. |
| Sábado | 2 h | Obtén verde con el mismo negativo y conserva permitido; revisa response/logs y una acción no contemplada que deba denegarse. |
| Domingo | 2 h | Redacta ficha n.º 1, enlaza rojo–verde n.º 1 y explica dónde se decide el permiso; registra riesgo residual y R1. |

**Entregable / Done:** remediación local n.º 1 con tests permitido/cruzado, defecto rojo, corrección verde y decisión de enumeración justificada. Un lab remoto sin corrección propia no sustituye el rojo–verde.

**Recuperación:** ¿por qué añadir `tenantId` enviado por el cliente a la query no basta por sí solo?

## Semana 4 — Autenticación y contraseñas sin construir un login

**Objetivo verificable:** elegir un fallo de login/reset/enumeración y verificar una mitigación mínima en un ejemplo, distinguiendo almacenamiento de contraseña y controles de intentos.

**Busca:** autenticación (*authentication*), reset de contraseña, enumeración (*username enumeration*), MFA, rate controls, hashing frente a cifrado (*encryption*), salt, Argon2id.

**Recursos:** Academy authentication y Password Storage Cheat Sheet en [Autenticación](RECURSOS.md#autenticación).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Enumera el ciclo login/reset/MFA de un ejemplo; elige solo un defecto y escribe su precondición, sin construir un sistema completo. |
| Martes | 1 h | Compara respuestas de cuentas ficticias existente/inexistente en lab o fixture; predice qué señales permitirían enumeración. |
| Miércoles | 1 h | Lee hashing/salt/Argon2id; identifica una librería vigente del stack si necesitas mostrar verificación, sin implementar algoritmo ni fijar parámetros de memoria. |
| Jueves | 1 h | Prueba el fallo elegido con unos pocos casos controlados; si es rate control, usa contador/tiempo simulado, no fuerza bruta real. |
| Viernes | 1 h | Diseña una mitigación mínima y su límite: mensajes coherentes, token reset de un solo uso o control de intentos, según el caso elegido. |
| Sábado | 2 h | Verifica mitigación y permitido en el ejemplo local; usa prompt 4 para cuestionar evidencia, no para confirmar su propio código. |
| Domingo | 2 h | Agrupa flujo, prueba y revisión en una ficha; explica qué aporta MFA y qué fallo no resuelve; registra evidencia/R1. |

**Entregable / Done:** un fallo delimitado y su mitigación comprobada en ejemplo mínimo, más distinción hashing/cifrado/salt. No necesitas implementar todos los mecanismos de autenticación.

**Recuperación:** ¿por qué almacenar contraseñas con un hash apropiado no evita la enumeración del endpoint de reset?

## Semana 5 — Sesiones, cookies y CSRF

**Objetivo verificable:** demostrar un caso de sesión/CSRF y documentar cuándo aplican sus controles, sin confundir CSRF con XSS.

**Busca:** Secure, HttpOnly, SameSite, sesión/token, expiración, revocación, fijación (*session fixation*), solicitud cruzada (*cross-site request forgery*), token CSRF y envío automático de credenciales.

**Recursos:** Session Management Cheat Sheet, Academy CSRF y opcional MDN Cookies en [Sesiones y CSRF](RECURSOS.md#sesiones-y-csrf).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Dibuja quién guarda y envía la credencial en sesión por cookie o token explícito; elige el contexto del ejercicio. |
| Martes | 1 h | Inspecciona cookies ficticias y predice el efecto de Secure, HttpOnly y SameSite; consulta solo los atributos dudosos. |
| Miércoles | 1 h | Traza emisión, cambio de identidad, expiración y revocación; identifica qué evitaría fijación en ese modelo. |
| Jueves | 1 h | Escoge un lab CSRF pequeño o fixture; escribe precondiciones del intento cruzado y resultado esperado antes de verlo. |
| Viernes | 1 h | Contrasta petición legítima y cruzada; usa prompt 3 si te atascas, sin pedir solución antes del intento. |
| Sábado | 2 h | Construye tabla condición → credencial enviada → efecto → defensa; comprueba un rechazo y que el permitido siga funcionando. |
| Domingo | 2 h | Explica por qué HttpOnly no elimina XSS ni SameSite/tokens son sustitutos universales; cierra tabla y evidencia/R1. |

**Entregable / Done:** tabla de condiciones y prueba observable de un caso, con ciclo de vida y límites de la defensa. Etiqueta cualquier simulación como tal.

**Recuperación:** ¿qué tiene que enviar automáticamente el navegador para que el caso CSRF elegido sea viable?

## Semana 6 — SQL injection y separación código/datos

**Objetivo verificable:** reemplazar concatenación de datos por binding y demostrar la regresión con el mismo test, sin asumir que un ORM protege SQL crudo.

**Busca:** SQL injection, consulta parametrizada (*parameterized query*), *parameter binding*, código frente a datos, identificadores dinámicos, allowlist y SQL crudo (*raw SQL*).

**Recursos:** teoría/lab Academy y práctica local de [SQL injection](RECURSOS.md#sql-injection); consulta la documentación vigente del driver existente solo para su sintaxis.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Elige una query mínima con filas ficticias; predice en qué punto un dato concatenado cambia la estructura SQL. |
| Martes | 1 h | Lee el mecanismo y prueba un lab pequeño autorizado o un ejemplo guiado; no hagas extracción masiva. |
| Miércoles | 1 h | En el ejemplo local escribe permitido y negativo con oracle sobre las filas devueltas, no solo sobre el texto SQL. |
| Jueves | 1 h | Conserva rojo contra la variante concatenada; parametriza valores con el driver, sin inventar una función de escape. |
| Viernes | 1 h | Revisa un identificador dinámico de ejemplo: explica por qué no se trata como valor y limita opciones por allowlist. |
| Sábado | 2 h | Comprueba verde y permitido con la query real del ejemplo; si solo hay mock, no lo presentes como binding verificado y completa un caso local ejecutable. |
| Domingo | 2 h | Redacta ficha n.º 2 y remediación n.º 2 con salidas sanitizadas; explica el límite del ORM y registra evidencia/R1. |

**Entregable / Done:** query local vulnerable → parametrizada con test rojo–verde y permitido preservado, más decisión para identificadores. No necesitas un servidor ni una nueva base de datos de producto.

**Recuperación:** ¿por qué parametrizar valores no permite elegir de forma segura cualquier nombre de columna recibido?

## Semana 7 — XSS y controles según contexto

**Objetivo verificable:** corregir un sink local mínimo con test rojo–verde y distinguir reflected/stored/DOM sin crear una UI completa.

**Busca:** XSS reflejado/almacenado/DOM (*reflected/stored/DOM-based*), source, sink, encoding contextual (*output encoding*), sanitización de HTML, CSP y defensa en profundidad.

**Recursos:** Academy XSS y práctica local en [XSS](RECURSOS.md#xss).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Clasifica tres recorridos pequeños como reflected/stored/DOM; elige uno y señala source, transformaciones y sink. |
| Martes | 1 h | En un lab pequeño o página aislada loopback predice si una entrada ficticia se interpreta como texto o estructura. |
| Miércoles | 1 h | Escribe un test local que falle al interpretar datos como markup en el sink elegido; evita efectos externos. |
| Jueves | 1 h | Cambia a API de texto/encoding contextual; si el requisito exige HTML, usa sanitización con librería mantenida y doc vigente, no regex propia. |
| Viernes | 1 h | Contrasta contexto texto, atributo y URL; explica por qué un escape único no protege todos. Prompt 1 para una duda concreta. |
| Sábado | 2 h | Verifica rojo–verde con el mismo oracle y contenido permitido; documenta CSP como capa adicional, no sustituto del fix. |
| Domingo | 2 h | Redacta ficha n.º 3 y remediación n.º 3; explica dónde quedó la frontera datos/código y registra evidencia/R1. |

**Entregable / Done:** sink local antes/después, prueba negativa y permitida, y contexto explícito. Un test de escape de string no prueba todos los sinks del navegador; declara lo no probado.

**Recuperación:** ¿cuándo necesitas sanitizar HTML en vez de convertir todo el contenido a texto?

## Semana 8 — Origin, site, SOP y CORS

**Objetivo verificable:** predecir y observar qué permite leer el navegador en un caso CORS, sin atribuirle autorización de API ni defensa universal CSRF.

**Busca:** origen frente a sitio (*origin vs site*), Same-origin policy/SOP, CORS, preflight, credentials, headers de acceso y lectura frente a envío.

**Recursos:** MDN SOP y Academy CORS en [Fronteras del navegador](RECURSOS.md#fronteras-del-navegador).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Clasifica pares ficticios de URLs por esquema/host/puerto y por site; anota dudas sin asumir que ambos conceptos coinciden. |
| Martes | 1 h | Dibuja envío de petición y acceso a respuesta por separado; predice qué bloquea SOP en el caso elegido. |
| Miércoles | 1 h | Escoge lab CORS o dos origins de ejemplo locales ya mínimos; no crees otra aplicación ni política CSP extensa. |
| Jueves | 1 h | Observa preflight y headers de una petición del alcance; compara predicción con el comportamiento del navegador. |
| Viernes | 1 h | Varía una condición de credenciales/origin de forma controlada; no infieras comportamiento del navegador solo por `curl`. |
| Sábado | 2 h | Completa matriz origin/site/credenciales/lectura/efecto y un negativo; diferencia política de navegador de autorización del servidor. |
| Domingo | 2 h | Explica un caso donde CORS bloquea lectura pero no impide el efecto; usa quiz prompt 6 y registra evidencia/R1. |

**Entregable / Done:** matriz con al menos un permitido y un rechazo observados, distinguiendo envío y lectura. Un mock de headers debe declarar que no verifica la aplicación real de SOP.

**Recuperación:** ¿por qué una API que «solo acepta mi origin» sigue necesitando autorización por recurso?

## Semana 9 — SSRF y límites de las solicitudes salientes

**Objetivo verificable:** falsar una validación incompleta en un stub seguro y proponer controles de salida con límites explícitos.

**Busca:** server-side request forgery/SSRF, parser de URL, redirecciones (*redirects*), DNS/resolución, egress, allowlist y validación en cada salto.

**Recursos:** teoría/práctica de [SSRF](RECURSOS.md#ssrf). Elige stub local sin red o lab provisionado; no metadata real ni red privada ajena.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Dibuja entrada de URL → parser → resolución → redirección → transporte; identifica dónde se confía en datos externos. |
| Martes | 1 h | Elige una validación defectuosa de ejemplo y predice un contraejemplo con destinos simbólicos ficticios. |
| Miércoles | 1 h | Crea fixtures de resolución y transporte que registren destino solicitado sin abrir conexiones reales. |
| Jueves | 1 h | Falsa el control incompleto, por ejemplo destino inicial permitido que redirige a destino no autorizado dentro del stub. |
| Viernes | 1 h | Modela validación por salto, parser consistente y política de egress; explica límites ante DNS/cambios de destino sin prometer solución absoluta. |
| Sábado | 2 h | Comprueba que el stub permite el destino autorizado y bloquea el desvío; conserva trazas sin tocar servicios internos reales. |
| Domingo | 2 h | Revisa el modelo con prompt 4; explica qué no comprueba la simulación de DNS/egress y registra evidencia/R1. |

**Entregable / Done:** contraejemplo a la validación y modelo de controles, permitido/denegado observables en stub o lab. No presentes el stub como prueba de una red real.

**Recuperación:** ¿por qué validar solo la URL inicial no controla el destino final de una solicitud?

## Semana 10 — Archivos: traversal o uploads, no ambos proyectos

**Objetivo verificable:** comprobar un único flujo de archivos y comparar sus controles con el otro flujo solo mediante lectura.

**Busca:** path traversal, canonicalización (*canonicalization*), containment, symlinks, file upload, content type, webroot, nombres generados y límites de tamaño/cantidad.

**Recursos:** Academy path traversal y file upload en [Archivos](RECURSOS.md#archivos); una página es práctica, la otra lectura comparada.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Elige traversal o upload según el sustrato disponible; escribe activo y ruta de datos, sin construir servidor de uploads. |
| Martes | 1 h | Lee el flujo elegido y predice un fallo de validación; selecciona un lab pequeño o función local con archivos ficticios. |
| Miércoles | 1 h | Prueba permitido y negativo en ese único flujo; para traversal usa solo directorios temporales propios del ejemplo. |
| Jueves | 1 h | Si elegiste traversal, revisa canonicalización/containment/symlinks; si upload, revisa nombres, almacenamiento fuera de webroot, contenido y límites. |
| Viernes | 1 h | Lee el otro flujo y escribe tres diferencias de controles; no implementes un segundo ejercicio. |
| Sábado | 2 h | Retesta el control elegido o analiza su límite en el lab; muestra por qué Content-Type o comparación de prefijo no bastan por sí solos. |
| Domingo | 2 h | Agrupa prueba y comparación en el artefacto; explica incertidumbre de filesystem/concurrencia si aplica y registra evidencia/R1. |

**Entregable / Done:** un flujo comprobado, permitido/negativo y comparación breve del otro, distinguiendo remediación local de análisis de un lab remoto.

**Recuperación:** ¿qué supuesto sobre rutas o contenido podría invalidar una validación aparentemente correcta?

## Semana 11 — JWT, OAuth y OIDC con alcance mínimo

**Objetivo verificable:** explicar validaciones JWT y dibujar authorization code + PKCE; profundizar solo en un lab JWT **o** análisis de flujo, no una integración completa.

**Busca:** firmado frente a cifrado (*signed vs encrypted*), issuer, audience, algoritmo, expiración; OAuth autorización/OIDC identidad; authorization code, PKCE, state, nonce, redirect URI.

**Recursos:** Academy JWT y Academy OAuth en [JWT y OAuth](RECURSOS.md#jwt-y-oauth). Prerrequisitos concretos: HTTP/TLS de semana 1 y autenticación/sesiones de semanas 4–5; si faltan, recupera el hueco dentro del tiempo.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Recupera transporte y ciclo de sesión; inspecciona claims ficticios y separa decodificar, validar firma y autorizar. |
| Martes | 1 h | Escribe tabla issuer/audience/algoritmo/vigencia → rechazo esperado usando librería mantenida como principio, sin implementar crypto. |
| Miércoles | 1 h | Dibuja cliente, usuario, authorization server y resource server en code + PKCE; diferencia identidad OIDC de autorización OAuth. |
| Jueves | 1 h | Ubica state, nonce y redirect URIs según el flujo; marca qué garantías aplican y qué depende de proveedor/configuración vigente. |
| Viernes | 1 h | Elige práctica: un lab JWT pequeño o revisión detallada del diagrama con un fallo de flujo. Escribe predicción antes de pedir pistas. |
| Sábado | 2 h | Prueba el caso JWT autorizado o recorre permitido/negativo del flujo; no construyas proveedor, login ni integración completa. |
| Domingo | 2 h | Redacta ficha n.º 4 con límites de lo observado; explica por qué un JWT válido no concede cualquier permiso y registra evidencia/R1. |

**Entregable / Done:** tabla JWT, diagrama básico y evidencia acotada de la alternativa elegida. El análisis documental de un flujo no demuestra que un proveedor lo implemente correctamente.

**Recuperación:** ¿qué diferencia existe entre un token con firma válida y un token válido para esta API y esta operación?

## Semana 12 — APIs y lógica de negocio

**Objetivo verificable:** seleccionar una invariante de negocio, demostrar permitido/negativo y justificar límites de recursos sin carga abusiva.

**Busca:** inventario de endpoints, BOLA, BFLA (*broken function level authorization*), mass assignment, validación de negocio (*business invariant*), cuotas, rate limits y resource limits.

**Recursos:** OWASP API Security, Academy business logic y opcional Academy API testing en [APIs y lógica de negocio](RECURSOS.md#apis-y-lógica-de-negocio).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Inventaría solo rutas/operaciones permitidas del objetivo propio o fixture; no hagas descubrimiento sobre terceros. |
| Martes | 1 h | Clasifica controles de objeto, función y propiedades; detecta cuál ya cubriste y evita contar el mismo hallazgo otra vez. |
| Miércoles | 1 h | Elige una invariante, como cantidad positiva o campo de rol no editable; predice un negativo con payload ficticio mínimo. |
| Jueves | 1 h | Prueba permitido y negativo; identifica la frontera de validación y evita confiar solo en frontend o esquema de tipos. |
| Viernes | 1 h | Modela cuota/tamaño/tiempo con contadores o fixtures; no hagas benchmark ni saturación de un servicio público. |
| Sábado | 2 h | Verifica la invariante o su mitigación mínima y una decisión de límite; usa prompt 5 para cuestionar un control, no para añadir features. |
| Domingo | 2 h | Explica impacto de violar la regla aun con autenticación correcta; registra artefacto, exposición y R1. |

**Entregable / Done:** inventario acotado y una invariante comprobada con permitido/negativo, más límite de recursos razonado. No necesitas probar toda la API Top 10.

**Recuperación:** ¿qué regla de negocio no queda protegida por validar únicamente el tipo y formato de una entrada?

## Semana 13 — Una carrera controlada

**Objetivo verificable:** reproducir una carrera check-then-act con dos operaciones controladas y comprobar una garantía atómica adecuada al ejemplo.

**Busca:** race condition, check-then-act, atomicidad, transacción, constraint, aislamiento, idempotencia (*idempotency*) y barrera de sincronización.

**Recursos:** Academy race conditions y alternativa de dos operaciones en [Carreras](RECURSOS.md#carreras).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Reutiliza reserva existente o función de stock mínima; fija una sola invariante, como no reservar más de lo disponible. |
| Martes | 1 h | Dibuja dos ejecuciones entre comprobar y actuar; predice el interleaving que rompe la invariante. |
| Miércoles | 1 h | Usa barrera/hook de test para dos operaciones o solicitudes controladas, sin flood; conserva resultado defectuoso. |
| Jueves | 1 h | Elige actualización atómica, transacción/lock o constraint según el sustrato y explica su garantía real. |
| Viernes | 1 h | Contrasta dos solicitudes distintas concurrentes con repetir la misma clave idempotente; muestra por qué no son el mismo problema. |
| Sábado | 2 h | Retesta el interleaving y el caso secuencial permitido; no declares una transacción real si solo simulaste estado en memoria. |
| Domingo | 2 h | Explica punto de atomicidad, alcance y riesgo residual; documenta la única carrera y registra evidencia/R1. |

**Entregable / Done:** secuencia reproducible de dos operaciones, invariante falsada y luego protegida en el ejemplo, con límite explícito del mecanismo utilizado.

**Recuperación:** ¿por qué dos reservas con claves idempotentes distintas todavía pueden sufrir una carrera?

## Semana 14 — Secure code review manual

**Objetivo verificable:** seguir entradas hasta sinks y sostener dos conclusiones de revisión, sean hallazgos o controles sin hallazgo.

**Busca:** source, sink, trace, trust boundary, validación/encoding, ORM/raw SQL, API de shell riesgosa, command injection como lectura defensiva, requisito ASVS verificable.

**Recursos:** ASVS y opcional OS Command Injection Defense Cheat Sheet en [Revisión de código](RECURSOS.md#revisión-de-código); práctica sobre código propio/ejemplo existente.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Congela archivos y un flujo; selecciona 3–5 requisitos ASVS aplicables con versión e IDs reales, no una checklist completa. |
| Martes | 1 h | Sigue una entrada no confiable hasta persistencia/salida; anota fichero/línea, transformaciones y control efectivo. |
| Miércoles | 1 h | Revisa una query ORM/raw o API peligrosa del ejemplo; si lees shell, enfócate en evitarlo/limitar argumentos, sin nueva explotación. |
| Jueves | 1 h | Diseña un negativo para falsar la primera conclusión; separa código leído de comportamiento realmente probado. |
| Viernes | 1 h | Pide revisión con prompt 4 después de tu análisis; rechaza afirmaciones sin traza/fuente y documenta desacuerdos. |
| Sábado | 2 h | Comprueba las dos conclusiones con tests o evidencia primaria y registra lo que no pudiste verificar. |
| Domingo | 2 h | Redacta dos fichas distintas de revisión —al menos ficha n.º 5 del conjunto— y explica prioridades y límites; registra evidencia/R1. |

**Entregable / Done:** trazas reproducibles, 3–5 requisitos seleccionados y dos conclusiones justificadas. No fuerces dos vulnerabilidades: «sin hallazgo en este alcance» es válido con evidencia.

**Recuperación:** ¿qué evidencia transforma una API sospechosa encontrada en código en un defecto confirmado?

## Semana 15 — Automatización con triage, no confianza ciega

**Objetivo verificable:** interpretar la salida de un único scanner adecuado al stack y decidir qué se confirma, descarta o queda pendiente.

**Busca:** SAST, SCA, secret scanning, falso positivo/negativo, alcanzabilidad (*reachability*), exposición, fix, supply chain, lockfile, procedencia y SBOM conceptual.

**Recursos:** GitHub code scanning y opcional NIST SSDF en [Automatización y supply chain](RECURSOS.md#automatización-y-supply-chain); práctica con un scanner viable o salida de ejemplo sanitizada.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Distingue qué ve SAST, SCA y secret scanning; elige solo una clase/herramienta adecuada al código propio disponible. |
| Martes | 1 h | Revisa disponibilidad, permisos y coste; si no es viable sin añadir infraestructura, elige salida de ejemplo con procedencia declarada. |
| Miércoles | 1 h | Ejecuta como actividad de estudio ese único scanner sobre alcance propio si ya es viable, o examina la salida elegida; conserva versión/configuración o marca desconocido. |
| Jueves | 1 h | Triage de una señal: localiza origen, ruta alcanzable, exposición y precondiciones; si no hay alertas, documenta una limitación verificable. |
| Viernes | 1 h | Revisa fix/control y lockfile/procedencia; describe qué aportaría un SBOM sin construir pipeline nuevo ni instalar todas las herramientas. |
| Sábado | 2 h | Contrasta la señal con código/test o evidencia disponible; usa prompt 8 y separa confirmado, falso positivo razonado y pendiente. |
| Domingo | 2 h | Redacta ficha n.º 6 de revisión/triage, aunque no haya defecto confirmado; explica falsos negativos y registra evidencia/R1. |

**Entregable / Done:** salida y triage reproducible o ejemplo identificado, con decisión razonada y partes no probadas. No descargues dependencias maliciosas ni introduzcas un secreto real para probar. Cero alertas no implica seguro.

**Recuperación:** ¿por qué una dependencia vulnerable listada no demuestra por sí sola explotación alcanzable, ni su ausencia demuestra seguridad?

## Semana 16 — Pipeline, cloud y contenedores como fronteras

**Objetivo verificable:** demostrar un control mínimo de least privilege en el flujo pipeline → secreto/operación, sin infraestructura nueva.

**Busca:** permisos de job/token, least privilege, secret flow, eventos no confiables, identidad efímera (*short-lived/workload identity*), IAM y non-root en relación con despliegue.

**Recursos:** CI/CD Security Cheat Sheet y práctica local en [Pipeline y permisos](RECURSOS.md#pipeline-y-permisos).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Dibuja un job, su identidad, el secreto ficticio y el recurso; elige una operación permitida y otra que no necesita. |
| Martes | 1 h | Revisa quién puede cambiar instrucciones/artefactos del pipeline y qué ocurre ante un evento no confiable. |
| Miércoles | 1 h | Lee least privilege e identidad efímera; relaciona IAM/non-root con el flujo, sin estudiar tres plataformas. |
| Jueves | 1 h | Prepara policy/fixture local o usa entorno propio ya existente; predice qué acción debe denegarse. |
| Viernes | 1 h | Implementa UN control mínimo de permiso; evita añadir cloud, registry, deploy o servicios nuevos. |
| Sábado | 2 h | Prueba permitido y negativo y revisa que la salida no revele el secreto ficticio; distingue policy simulada de permisos efectivos reales. |
| Domingo | 2 h | Explica confianza en código del job y riesgo residual; registra diagrama, control y evidencia/R1. |

**Entregable / Done:** un control least privilege comprobado con permitido/denegado. Leer IAM o configurar non-root no sustituye la prueba del control elegido; cloud es opcional, no requisito de gasto.

**Recuperación:** ¿qué puede hacer un job comprometido con un secreto que legítimamente tiene permitido leer?

## Semana 17 — Logging y respuesta de seguridad

**Objetivo verificable:** verificar un log útil sin secretos y recorrer un playbook de robo de token ficticio con límites claros.

**Busca:** eventos auth/authz, request ID, minimización de PII, token/password redaction, log forging, revocar/rotar/contener, evidencia de incidente y respuesta de seguridad frente a SRE.

**Recursos:** Logging Cheat Sheet y ejercicio local de [Logs y respuesta](RECURSOS.md#logs-y-respuesta).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Selecciona eventos de éxito/fallo auth/authz y request ID; predice qué campos ayudan sin copiar bodies o credenciales. |
| Martes | 1 h | Prueba logger local con datos ficticios; inspecciona salida para descartar tokens, passwords y PII innecesaria. |
| Miércoles | 1 h | Introduce delimitadores/saltos de línea ficticios y verifica que no forjen eventos; decide formato estructurado/tratamiento apropiado. |
| Jueves | 1 h | Escribe playbook corto detectar → contener → revocar/rotar → verificar → documentar, con responsables y señales. |
| Viernes | 1 h | Simula en mesa robo de un token ficticio; distingue borrar una copia de invalidar su capacidad de uso. |
| Sábado | 2 h | Comprueba localmente la exclusión de datos sensibles; en el modelo verifica intento posterior a revocación y operación legítima recuperada. |
| Domingo | 2 h | Explica por qué una alerta de seguridad no es solo disponibilidad SRE; registra prueba, decisiones y límites de la simulación/R1. |

**Entregable / Done:** test de log sin contenido sensible y playbook recorrido, con evidencia de lo local y marcas de lo simulado. No afirmes haber respondido a un incidente real.

**Recuperación:** ¿por qué borrar un token de un log no resuelve su posible uso por un atacante?

## Semana 18 — AppSec en sistemas con IA

**Objetivo verificable:** un documento no confiable puede solicitar una acción, pero una autorización externa al modelo la deniega en un stub reproducible.

**Busca:** prompt injection directa/indirecta, untrusted data, exfiltration, excessive agency, tools least privilege, autorización fuera del modelo y límites de simulación.

**Recursos:** OWASP Top 10 for LLM Applications y LLM Prompt Injection Prevention Cheat Sheet en [AppSec en IA](RECURSOS.md#appsec-en-ia).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Dibuja usuario → documento recuperado → modelo/stub → herramienta; marca instrucción confiable frente a dato no confiable. |
| Martes | 1 h | Escribe documento con instrucción maliciosa ficticia y fake secret inequívoco; predice la acción indebida solicitada. |
| Miércoles | 1 h | Usa un stub determinista que produzca esa solicitud de herramienta, sin API pagada ni modelo real. |
| Jueves | 1 h | Coloca control externo actor/acción/recurso/alcance antes de ejecutar la herramienta; no dependas solo de regex o prompt guardrail. |
| Viernes | 1 h | Escribe test de acción legítima y de exfiltración denegada a destino simbólico; la herramienta no hace red real. |
| Sábado | 2 h | Verifica efecto prohibido ausente y permitido presente; inspecciona trazas/contexto para no propagar secretos incluso ficticios innecesariamente. |
| Domingo | 2 h | Reporta lo que el stub demuestra sobre la policy y lo que no demuestra sobre un LLM; explica límites y registra evidencia/R1. |

**Entregable / Done:** documento de inyección ficticia, stub, policy externa y tests de efecto permitido/denegado. No afirmar robustez de un modelo real ni garantía basada en instrucciones de sistema.

**Recuperación:** ¿qué decisión de seguridad debe seguir siendo correcta aunque el modelo obedezca por completo al documento malicioso?

## Semana 19 — Evaluación integradora con alcance congelado

**Objetivo verificable:** revisar un único objetivo autorizado mediante 3–5 flujos/requisitos seleccionados y producir conclusiones sostenidas por evidencia.

**Busca:** scope, inventario, threat model, plan de pruebas manuales, precondiciones, evidencia negativa, priorización por impacto/exposición e incertidumbre.

**Recursos:** requisito ASVS de [Modelado y verificación](RECURSOS.md#modelado-y-verificación) y plantillas/práctica de [Integración y reporte](RECURSOS.md#integración-y-reporte). No necesitas un proyecto nuevo.

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Elige un objetivo propio existente, ejemplo local o instancia autorizada; congela hosts, archivos, operaciones y exclusiones. |
| Martes | 1 h | Actualiza inventario y threat model; selecciona 3–5 flujos/requisitos concretos según lo que ese objetivo realmente tenga. |
| Miércoles | 1 h | Escribe hipótesis y predicción por caso antes de consultar walkthroughs; define permitido, negativo y condición de parada. |
| Jueves | 1 h | Ejecuta la primera parte de pruebas manuales controladas y registra resultados, incluidos controles que resisten. |
| Viernes | 1 h | Continúa los casos restantes; si aparece hueco bloqueante, entrega parcial y replanifica sin ampliar el alcance. |
| Sábado | 2 h | Reproduce la evidencia más relevante, descarta duplicados y separa confirmado/hipótesis/no probado; prioriza sin inventar findings. |
| Domingo | 2 h | Redacta informe preliminar y explica decisiones con prompt 8 después de tu evaluación; registra límites y R1. |

**Entregable / Done:** alcance congelado, 3–5 casos seleccionados con evidencia y conclusiones, incluso sin vulnerabilidades. No es un examen sin límites ni permiso para escanear otros sistemas.

**Recuperación:** ¿qué evidencia cambiaría tu prioridad principal y qué parte del objetivo no evaluaste?

## Semana 20 — Remediación, retest y portfolio honesto

**Objetivo verificable:** retestar un alcance pequeño, preservar permitido/rechazar negativo y comunicar resultados reproducibles sin exagerar capacidades.

**Busca:** remediation, regression, retest, riesgo residual (*residual risk*), reporte ejecutivo/técnico, sanitización de evidencia y límites de evaluación.

**Recursos:** plantillas de [Integración y reporte](RECURSOS.md#integración-y-reporte) y requisito previamente seleccionado de [Modelado y verificación](RECURSOS.md#modelado-y-verificación).

| Día | Duración | Tarea de la sesión |
|---|---|---|
| Lunes | 1 h | Elige una corrección pequeña del informe si está bajo tu control; si no hay hallazgo, selecciona un control local anterior para retest, sin inventar fallo. |
| Martes | 1 h | Aplica corrección mínima o reproduce la ya existente; conserva base, revisión y evidencia antes/después según corresponda. |
| Miércoles | 1 h | Retesta negativo rechazado y permitido preservado con el mismo criterio; no declares reparado un backend de lab que no puedes modificar. |
| Jueves | 1 h | Escribe resumen ejecutivo: alcance, impacto, decisión, estado y riesgo residual; no uses severidad ni CVSS sin base. |
| Viernes | 1 h | Completa anexo técnico con pasos mínimos, entorno/versiones y evidencia sanitizada; usa prompt 7 sin añadir hechos nuevos. |
| Sábado | 2 h | Comprueba reproducibilidad del paquete y ausencia de secretos/PII; audita al menos seis fichas distintas y las tres remediaciones locales distribuidas. |
| Domingo | 2 h | Simula explicación de impacto/decisiones/límites con prompt 8, haz balance y elige un siguiente foco; registra cierre y reserva R1 +1 día sin horas extra. |

**Entregable / Done:** reporte ejecutivo+técnico, retest permitido/negativo, evidencia reproducible sanitizada y balance honesto. Si falta alguna remediación/ficha, registra el hueco y replanifica: 180 h no concede dominio automático. Puedes mantener el portfolio privado.

**Recuperación:** ¿qué puedes afirmar con tus pruebas, qué no y cuál sería el siguiente experimento seguro para reducir esa incertidumbre?

Una revisión a **30 días es opcional y no está incluida en las 180 h**. El resultado es iniciación práctica con evidencia, no garantía de empleo, certificación ni seguridad completa de un sistema.
