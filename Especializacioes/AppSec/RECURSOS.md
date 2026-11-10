# Recursos de AppSec

Catálogo acotado; el orden vive en [ITINERARIO.md](ITINERARIO.md). Por actividad selecciona **una teoría, una práctica y como máximo una consulta opcional** de la sección enlazada: la lista «Por actividad» dice qué mirar en cada caso y qué debes obtener, no qué hay que leer entero. Si una página sirve para teoría y práctica, no necesitas otra. Consulta solo los apartados nombrados, nunca el estándar ni el catálogo completo.

**Estado de la comprobación.** Las URLs de este documento se comprobaron por acceso directo (**HTTP 200 el 2026-11-09**): eso verifica que la URL responde, **no** que el apartado citado exista. Los títulos de los apartados se contrastaron con el contenido real de cada página. Dos excepciones: la guía de seguridad de **Angular** y la página de **NestJS** se renderizan en el cliente, así que de ellas solo se comprobó la URL; en esos dos casos se indica el **identificador de API** que debes buscar (`DomSanitizer`, `bypassSecurityTrustHtml`, `ValidationPipe`, `whitelist`, `forbidNonWhitelisted`) en lugar de un apartado. No se afirma que se ejecutaran labs ni que se certificara el contenido. Predomina `EN`; puedes traducir términos, conservando el término inglés para buscar. Registra sección, versión y fecha consultadas. No se fija una edición de OWASP/ASVS como «la última» ni se inventan IDs de controles.

**Reutiliza la fuente:** varias actividades comparten la misma página con un apartado distinto. No hace falta leerla dos veces: léela una vez y vuelve al apartado.

## Uso de Academy y herramientas

- [Learning paths de Web Security Academy](https://portswigger.net/web-security/learning-paths) — `EN · gratis · docs/labs`; cuenta para labs. Busca un lab pequeño del tema, **Apprentice cuando exista y esté accesible**. No se exige un título ni nivel concreto ni terminar un catálogo. Uno o dos labs pequeños son techo, no cuota; un caso suficientemente probado basta. Si no hay Apprentice adecuado, ejemplo guiado mínimo.
- [Burp: getting started](https://portswigger.net/burp/documentation/desktop/getting-started) — `EN · gratis · docs`; tutorial de instalación y de las pestañas del proxy. **Community es gratuita**; funciones Pro quedan fuera. Alternativa: DevTools y `curl`, o *fixture* sin proxy si la herramienta no está disponible.

No hay herramientas comerciales obligatorias. No descargues aplicaciones vulnerables por inercia: los labs alojados autorizados son la opción inicial. Una simulación local debe etiquetarse como tal.

**Por actividad**

- M1-A1 → Learning paths: para confirmar qué instancia está habilitada y cuál es tu límite. Resultado: `alcance.md` con host, operaciones permitidas, exclusiones y condición de parada.
- M10-A2 → Learning paths: para elegir un lab pequeño de archivos, solo si existe uno accesible; si no, tu ejemplo local. Resultado: el par permitido y negativo con su salida real.
- M14-A2 → Burp, tutorial de instalación: solo para saber qué es una herramienta de interceptación y por qué **no** la necesitas para una revisión de código. Resultado: la traza en el código, sin herramienta.

## HTTP y navegador

- Teoría: [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) — `EN · gratis · docs`; apartados «HTTP Messages», «Requests» y «Responses» para qué es una petición y una respuesta, y «HTTP is stateless, but not sessionless» para por qué hace falta una credencial. No sustituye autorización ni protege datos después de terminar TLS.
- Teoría del transporte: [MDN Transport Layer Security (TLS)](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security) — `EN · gratis · docs`; apartados «TLS handshake», «Server authentication» y «Mixed content»: las tres cosas que TLS protege (cifrado en tránsito, integridad y autenticación del servidor) y lo que deja fuera.
- Referencia: [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [MDN HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers) (apartado «Authentication») y [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) (apartados «Successful responses» y «Client error responses») — `EN · gratis · docs`.
- Referencia de cookies: [MDN Set-Cookie header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) — `EN · gratis · docs`; apartados «Syntax» y «Attributes» para `Secure`, `HttpOnly` y `SameSite`.

**Por actividad**

- M1-A2 → MDN HTTP overview, apartados «Requests» y «Responses», y MDN response status codes, apartados «Successful responses» y «Client error responses»: para saber qué significa cada parte de una petición y qué dice cada código. Resultado: una nota con método, URL, cabeceras, cuerpo, estado y cookies.
- M1-A3 → MDN HTTP overview, apartado «HTTP is stateless, but not sessionless», y MDN TLS, apartados «TLS handshake» y «Server authentication»: para el alcance exacto de la protección del transporte y por qué la sesión no viaja sola (eso es HTTP, no TLS). Resultado: un diagrama con lo protegido y lo no protegido.
- M1-A4 → MDN HTTP headers, apartado «Authentication», y la cabecera `Authorization`: para ver cómo viaja la identidad y qué significa demostrar quién eres. Resultado: la tabla de tres peticiones con identidad, recurso y decisión esperada.
- M2-A2 → MDN HTTP request methods: para precisar qué espera cada método de una entrada válida. Resultado: la tabla de entradas con la respuesta por capa.
- M5-A3 → MDN Set-Cookie, apartado «Attributes»: para el comportamiento exacto de `Secure`, `HttpOnly` y `SameSite`. Resultado: la observación de los tres atributos con tu predicción al lado.

## DevTools

- [Chrome DevTools: Inspect network activity](https://developer.chrome.com/docs/devtools/network/) — `EN · gratis · docs`; apartados «Open the Network panel», «Log network activity» e «Inspect a resource's details». Equivalente en Firefox o Safari: el criterio es el panel de red, no la herramienta.
- [DevTools overview](https://developer.chrome.com/docs/devtools/overview) — `EN · gratis · docs`; paneles y flujo básico.

**Por actividad**

- M1-A2 → Network, apartado «Inspect a resource's details»: para dónde mirar la petición que acabas de hacer y cómo repetirla. Resultado: la petición reconstruida y su repetición comparada.
- M5-A3 → DevTools, panel de cookies de la aplicación (pestaña Application/Storage): para ver los atributos de una cookie real y su presencia en la cabecera `Cookie`. Resultado: la observación de `Secure`, `HttpOnly` y `SameSite`.
- M8-A3 → Network, con «Preserve log» activado: para ver la petición `OPTIONS` previa a la definitiva. Resultado: la traza del preflight con sus cabeceras.

## Node test runner

- [node:test](https://nodejs.org/api/test.html) — `EN · gratis · docs`; apartados «Test runner» y «Running tests from the command line» para ejecutar y leer el resultado. Sin dependencias: la biblioteca viene con Node.
- [node:assert](https://nodejs.org/api/assert.html) — `EN · gratis · docs`; apartados «Assert» y «Strict assertion mode», con `assert.strictEqual` y `assert.throws`.

**Por actividad**

- M1-A5 → node:test, apartados «Test runner» y «Running tests from the command line», y node:assert, apartado «Strict assertion mode»: para la forma de escribir el caso y de leer la salida. Resultado: `permiso.test.mjs` con la función, un caso permitido y uno negativo, con la salida verde y la salida roja por aserción.
- M3-A1 → node:test, mismo apartado: para el patrón *arrange/act/assert* con *fixtures*. Resultado: los *fixtures* de dos organizaciones y el caso permitido en verde.
- M3-A3 → node:assert, apartado «Assert» (`assert.throws` con error esperado): para distinguir un fallo de aserción de un error de preparación. Resultado: el par rojo–verde con el mismo criterio.
- M4-A5 → node:test: para el test de la mitigación elegida. Resultado: el negativo que deja de distinguir y el permitido que sigue pasando.
- M6-A3 → node:assert: para el criterio de aserción del rojo. Resultado: la salida roja de la variante concatenada y la verde de la parametrizada.
- M7-A3 → node:test: para el test del sink. Resultado: el rojo que muestra la interpretación como markup y el verde tras el cambio.
- M13-A2 → node:test, apartado «Test runner execution model»: para entender el orden de ejecución y por qué un caso debe controlar su propia secuencia. Resultado: la secuencia reproducible del defecto.

## Modelado y verificación

- Teoría: [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «System Modeling», «Addressing Each Question», «Threat Identification», «Response and Mitigations» y «Review and Validation».
- Requisito: [OWASP ASVS](https://asvs.owasp.org/) — `EN · gratis · estándar`; la versión estable es la **5.0.0** y su listado descargable está en el [CSV de la 5.0.0](https://github.com/OWASP/ASVS/raw/v5.0.0/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.csv), con las columnas `chapter_id`, `chapter_name`, `section_id`, `section_name`, `req_id` y `req_description`. Capítulos que te van a tocar: **V1 «Encoding and Sanitization»**, **V2 «Validation and Business Logic»**, **V8 «Authorization»**, **V9 «Self-contained Tokens»** y **V10 «OAuth and OIDC»**. Registra versión e identificador real; no declares evaluación completa.
- Método: [OWASP WSTG](https://wstg.owasp.org/latest/) — `EN · gratis · guía`; la guía está en `https://wstg.owasp.org/latest/4-Web_Application_Security_Testing/`. Casos concretos que usarás: `05-Authorization/04-Insecure_Direct_Object_References`, `07-Injection/01-Reflected_Cross_Site_Scripting` y `10-Business_Logic/01-Business_Logic_Data_Validation`. Distingue requisito de seguridad (ASVS) de método de prueba (WSTG).

### STRIDE en castellano como rejilla de preguntas

Las seis familias, con la pregunta que despierta cada una: **Suplantación** (*spoofing*): ¿puede alguien hacerse pasar por otro? **Manipulación** (*tampering*): ¿puede alguien alterar datos o flujos en tránsito o en reposo? **Repudio** (*repudiation*): ¿puede alguien negar una acción que sí hizo? **Revelación de información** (*information disclosure*): ¿qué datos salen hacia quien no debería verlos? **Denegación de servicio** (*denial of service*): ¿qué puede agotar un recurso? **Elevación de privilegios** (*elevation of privilege*): ¿puede alguien obtener permisos que no le corresponden?

Son **preguntas**, no casillas: una familia vacía es un resultado, no un fallo del análisis. Por eso las amenazas se priorizan **comparando las que apliquen**, no rellenando seis.

**Por actividad**

- M2-A1 → Threat Modeling Cheat Sheet, apartados «System Modeling» y «Addressing Each Question»: para el vocabulario y el criterio de frontera. Resultado: `modelo.md` con activo, actores, componentes, flujo y frontera.
- M2-A3 → Threat Modeling Cheat Sheet, apartado «Threat Identification», y la tabla de las seis familias de arriba: para aplicar las preguntas en castellano y comparar solo las que aplican. Resultado: `amenazas.md` con las seis filas, las que no aplican marcadas y una comparación escrita.
- M2-A4 → ASVS 5.0.0 (capítulo **V2 «Validation and Business Logic»**) y WSTG (`10-Business_Logic/01-Business_Logic_Data_Validation`): para el requisito y el método. Resultado: la ficha con requisito literal, `req_id`, `section_id`, versión y método asociado.
- M2-A5 → Threat Modeling Cheat Sheet, apartado «Response and Mitigations»: para ordenar prioridad, requisito, control y prueba. Resultado: el control comprobado con permitido y negativo y el riesgo residual.
- M14-A1 → ASVS 5.0.0, mismo listado CSV: para copiar 3–5 requisitos con su ID real. Resultado: el alcance congelado y los criterios observables.
- M14-A3 → WSTG, casos de validación de datos de negocio y de IDOR: para contrastar el negativo que has diseñado. Resultado: dos conclusiones con su prueba falsadora.
- M19-A2 → ASVS (el requisito que ya elegiste) y WSTG (el caso del método): para que cada caso seleccionado tenga ambos. Resultado: 3–5 casos con requisito y precondición.

## Autorización

- Teoría y práctica: [Academy access control](https://portswigger.net/web-security/access-control) — `EN · gratis · docs/labs`; apartados «What is access control?», «Vertical access controls», «Horizontal access controls» e «Insecure direct object references». Elige un lab pequeño o *fixtures* de dos tenants.
- Referencia: [IDOR Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Identifier complexity», «Verifying access controls» y «Mitigation»: para aplicar el control antes de acceder al recurso y no después.
- Práctica local: [Seguridad aplicada](../../Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md) — `ES · gratis · ejercicio`; reutiliza permitido/cruzado, no construyas otro servicio.

**Por actividad**

- M3-A1 → Práctica local (ejercicio de tenants) y node:test: para los *fixtures* y el caso permitido. Resultado: dos organizaciones, dos actores, una factura y el test verde.
- M3-A2 → Academy access control, apartado «What is access control?»: para la distinción entre control vertical y horizontal. Resultado: el caso negativo escrito con su criterio, sin ejecutar.
- M3-A3 → IDOR Prevention Cheat Sheet, apartados «Verifying access controls» y «Mitigation»: para el criterio de aplicar el control antes de la lectura. Resultado: el rojo y el verde con el mismo criterio.
- M3-A4 → Academy access control, apartado «Insecure direct object references»: para el criterio de enumerabilidad. Resultado: la decisión `403`/`404` justificada y la ficha n.º 1.

## Autenticación

- Teoría/práctica: [Academy authentication](https://portswigger.net/web-security/authentication) — `EN · gratis · docs/labs`; apartados «What is authentication?», «What is the difference between authentication and authorization?» y «Vulnerabilities in authentication mechanisms».
- Práctica: [Academy, vulnerabilidades de login por contraseña](https://portswigger.net/web-security/authentication/password-based) — `EN · gratis · docs/labs`; apartados «Username enumeration», «Flawed brute-force protection», «Account locking» y «User rate limiting».
- Práctica: [Academy, cómo asegurar tu autenticación](https://portswigger.net/web-security/authentication/securing) — `EN · gratis · docs`; apartados «Prevent username enumeration», «Implement robust brute-force protection» e «Implement proper multi-factor authentication».
- Práctica: [Academy, vulnerabilidades de MFA](https://portswigger.net/web-security/authentication/multi-factor) — `EN · gratis · docs/labs`; apartados «Two-factor authentication tokens» y «Flawed two-factor verification logic».
- Teoría: [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Hashing vs Encryption», «Salting», «Peppering» y «Argon2id». No memorices parámetros ni implementes algoritmos.
- Referencia: [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Multi-Factor Authentication», «Protect Against Automated Attacks» y «OpenID Connect (OIDC)».

**Por actividad**

- M4-A1 → Academy authentication, apartado «Vulnerabilities in authentication mechanisms»: para acotar el defecto. Resultado: la ficha de fallo con precondición y señal observable.
- M4-A2 → Password Storage Cheat Sheet, apartados «Hashing vs Encryption» y «Salting»: para la distinción hash/cifrado y el papel del salt. Resultado: la tabla de tres mecanismos con lo que protege y lo que no.
- M4-A3 → Academy, login por contraseña, apartado «Username enumeration», y la página «How to secure your authentication mechanisms» → «Prevent username enumeration»: para los tipos de enumeración y sus señales. Resultado: la comparación de respuestas existente/inexistente y qué puede observar el atacante.
- M4-A4 → Authentication Cheat Sheet, apartado «Multi-Factor Authentication», y Academy, «Vulnerabilities in multi-factor authentication»: para los factores y sus propiedades. Resultado: la tabla de tres escenarios con veredicto y motivo.
- M4-A5 → Academy, «How to secure your authentication mechanisms» → «Implement robust brute-force protection»: para las mitigaciones concretas y su alcance. Resultado: la mitigación mínima comprobada con permitido y negativo.

## Sesiones y CSRF

- Teoría: [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Session ID Properties», «Session ID Life Cycle», «Session Expiration», «Cookies», «Secure Attribute», «HttpOnly Attribute», «SameSite Attribute» y «Session ID Generation and Verification: Permissive and Strict Session Management».
- Referencia de cookies: [MDN, «Using HTTP cookies»](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) — `EN · gratis · docs`; apartados «Security», «Define where cookies are sent» y «Controlling third-party cookies with SameSite»: el comportamiento de `Secure`, `HttpOnly`, `Domain`, `Path` y `SameSite`. Aquí está la excepción de `localhost` con `Secure` (MDN la documenta y además avisa de que **Safari no la aplica**): no la generalices a otros sitios `http`.
- Práctica: [Academy CSRF](https://portswigger.net/web-security/csrf) — `EN · gratis · docs/labs`; apartados «What is CSRF?», «How does CSRF work?» y «Common defences against CSRF» (las defensas habituales); no asumir que SameSite o un token resuelven todos los contextos.
- Opcional: [CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Token-Based Mitigation», «Synchronizer Token Pattern», «SameSite (Cookie Attribute)», «Limitations of SameSite» y «Using Standard Headers to Verify Origin».

**Por actividad**

- M5-A1 → Session Management Cheat Sheet, apartados «Session ID Life Cycle», «Session Expiration» y «Session ID Generation and Verification: Permissive and Strict Session Management»: para el ciclo de vida de la credencial y el efecto de renovar el identificador. Resultado: el diagrama de emisión, uso, expiración y revocación.
- M5-A3 → MDN Set-Cookie, apartado «Attributes», MDN Cookies, apartados «Security», «Define where cookies are sent» y «Controlling third-party cookies with SameSite», y Session Management Cheat Sheet, apartados «Secure Attribute», «HttpOnly Attribute» y «SameSite Attribute»: para el comportamiento exacto de cada atributo. Resultado: la observación de los tres atributos con tu predicción al lado.
- M5-A4 → Academy CSRF, apartados «What is CSRF?», «How does CSRF work?» y «Common defences against CSRF» (las defensas habituales), y opcional la CSRF Prevention Cheat Sheet: para las precondiciones y el alcance de cada defensa. Resultado: la ficha del caso y la tabla condición → credencial → efecto → defensa.

## SQL injection y PostgreSQL

- Teoría/práctica: [Academy SQL injection](https://portswigger.net/web-security/sql-injection) — `EN · gratis · docs/labs`; apartados «What is SQL injection (SQLi)?», «SQL injection examples» y «How to prevent SQL injection».
- Teoría: [SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Primary Defenses», «Parameterized Queries», «Allow-List Input Validation», «Manually escaping (STRONGLY DISCOURAGED)» e «Input Validation».
- Driver: [node-postgres, «Parameterized query»](https://node-postgres.com/features/queries) — `EN · gratis · docs`; apartados «Parameterized query», «Query config object» y «Prepared statements»: la forma exacta de enviar valores aparte del texto SQL.
- Conexión: [node-postgres, «Connecting to PostgreSQL»](https://node-postgres.com/features/connecting) — `EN · gratis · docs`; apartados «Programmatic» y «Connection URI»: la forma exacta de apuntar el `Pool` a una base concreta (con `connectionString` o con user/password/host/port/database).
- ORM: [TypeORM, «Postgres / CockroachDB»](https://typeorm.io/docs/drivers/postgres), [«Select using Query Builder»](https://typeorm.io/docs/query-builder/select-query-builder) (apartado «Using parameters to escape data») y [«Entities»](https://typeorm.io/docs/entity/entities) — `EN · gratis · docs`.

**Por actividad**

- M6-A1 → Academy SQL injection, apartados «What is SQL injection (SQLi)?» y «SQL injection examples»: para el mecanismo de concatenación frente a parámetro. Resultado: la query anotada por puntos de entrada con tu predicción.
- M6-A2 → node-postgres, apartado «Parameterized query», o TypeORM «Postgres», y node-postgres «Connecting to PostgreSQL», apartados «Programmatic» y «Connection URI»: para la sintaxis exacta de binding y para la cadena de conexión con la que tu `Pool` apunta a la base de pruebas. Resultado: la consulta parametrizada ejecutada contra PostgreSQL y el log que muestra la separación.
- M6-A3 → SQL Injection Prevention Cheat Sheet, apartados «Primary Defenses» y «Parameterized Queries»: para contrastar el criterio de aserción. Resultado: el par rojo–verde con el mismo criterio.
- M6-A4 → TypeORM «Select using Query Builder», apartado «Using parameters to escape data», y el apartado «Getting the generated query»: para ver qué rutas del ORM construyen SQL y cuáles no. Resultado: la *allowlist* aplicada y la ficha n.º 2.

## XSS y Angular

- Teoría/práctica: [Academy cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) — `EN · gratis · docs/labs`; apartados «What is cross-site scripting (XSS)?», «How does XSS work?», «What are the types of XSS attacks?», «Reflected cross-site scripting», «Stored cross-site scripting», «DOM-based cross-site scripting», «Content security policy» y «How to prevent XSS attacks».
- Teoría: [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Output Encoding», «Output Encoding for “HTML Contexts”», «Output Encoding for “HTML Attribute Contexts”», «Output Encoding for “URL Contexts”», «HTML Sanitization», «Safe Sinks» y «Sole Reliance on Content-Security-Policy (CSP) Headers».
- Framework: [Angular security best practices](https://angular.dev/guide/security/best-practices) y la API [DomSanitizer](https://angular.dev/api/core/DomSanitizer) — `EN · gratis · docs` (páginas con renderizado en cliente: busca los identificadores `DomSanitizer`, `bypassSecurityTrustHtml` y `SecurityContext`); para qué escapa Angular por defecto y por qué no se debe desactivar a mano.

**Por actividad**

- M7-A1 → Academy XSS, apartados «What is cross-site scripting (XSS)?» y «What are the types of XSS attacks?»: para la clasificación de los tres tipos y el vocabulario source/sink. Resultado: la tabla de tres recorridos con source y sink.
- M7-A2 → XSS Prevention Cheat Sheet, apartados «Output Encoding», «Output Encoding for “HTML Contexts”» y «Output Encoding for “HTML Attribute Contexts”»: para el criterio de cada contexto y la diferencia entre escapar y sanitizar. Resultado: la tabla de tres contextos con la salida observada.
- M7-A3 → Angular security best practices y `DomSanitizer`: para por qué no se desactiva el escape a mano. Resultado: el rojo–verde del sink comprobado en el DOM y el caso permitido.
- M7-A4 → XSS Prevention Cheat Sheet, apartado «Sole Reliance on Content-Security-Policy (CSP) Headers», y MDN CSP (ver [Fronteras del navegador](#fronteras-del-navegador)): para el alcance real de una política. Resultado: la ficha n.º 3 con «partes no probadas».

## Fronteras del navegador

- Teoría: [MDN Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) — `EN · gratis · docs`; apartados «Definition of an origin», «Inherited origins», «Cross-origin network access», «How to allow cross-origin access» y «How to block cross-origin access».
- Teoría: [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) — `EN · gratis · docs`; apartados «What requests use CORS?», «Simple requests», «Preflighted requests», «Requests with credentials», «The HTTP request headers» (con `Origin`, `Access-Control-Request-Method` y `Access-Control-Request-Headers») y «The HTTP response headers» (con `Access-Control-Allow-Origin` y `Access-Control-Allow-Credentials»).
- Práctica: [Academy CORS](https://portswigger.net/web-security/cors) — `EN · gratis · docs/labs`; apartados «What is CORS (cross-origin resource sharing)?», «Same-origin policy», «Relaxation of the same-origin policy», «How to prevent CORS-based attacks» y «CORS is not a substitute for server-side security policies».
- Opcional: [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) — `EN · gratis · docs`; apartados «CSP overview», «Controlling resource loading», «Testing your policy» y «Violation reporting».

**Por actividad**

- M5-A2 → MDN Same-origin policy, apartado «Definition of an origin», y MDN Cookies, apartado «Controlling third-party cookies with SameSite» (guía de cookies, en [Sesiones y CSRF](#sesiones-y-csrf)): para las dos palabras. Resultado: la tabla de seis URLs con origin, site y SameSite predicho.
- M8-A1 → MDN Same-origin policy, apartado «Definition of an origin»: para las definiciones exactas. Resultado: la tabla ampliada con esquema, host y puerto.
- M8-A2 → MDN Same-origin policy, apartados «Cross-origin network access» y «How to block cross-origin access»: para la regla y sus excepciones. Resultado: el diagrama de enviar y leer por separado.
- M8-A3 → MDN CORS, apartados «Preflighted requests», «The HTTP request headers» y «The HTTP response headers»: para el significado de cada cabecera. Resultado: la traza del preflight y de la petición final.
- M8-A4 → Academy CORS, apartados «What is CORS (cross-origin resource sharing)?» y «CORS is not a substitute for server-side security policies»: para separar política de navegador y autorización de API. Resultado: la matriz con un permitido y un rechazo observados.
- M7-A4 → MDN CSP, apartados «CSP overview» y «Controlling resource loading»: para el alcance de CSP como capa adicional. Resultado: la frase sobre qué no arregla.

## SSRF

- Teoría/práctica: [Academy SSRF](https://portswigger.net/web-security/ssrf) — `EN · gratis · docs/labs`; apartados «What is SSRF?», «Common SSRF attacks», «SSRF attacks against the server», «Circumventing common SSRF defenses», «SSRF with whitelist-based input filters» y «Bypassing SSRF filters via open redirection».
- Teoría: [SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Context», «Overview of a SSRF common flow», «Cases», «Available protections» y «Deny-list (Last Resort)».

Alternativa segura: doble de resolución y transporte, sin red real. No uses metadata real ni redes privadas ajenas.

**Por actividad**

- M9-A1 → Academy SSRF, apartados «Common SSRF attacks» y «SSRF attacks against the server»: para el recorrido de la petición y los puntos de control. Resultado: el diagrama de cinco saltos con la columna «quién controla».
- M9-A2 → SSRF Prevention Cheat Sheet, apartados «Overview of a SSRF common flow» y «Available protections»: para saber qué debe registrar tu doble. Resultado: el doble con su registro de destinos.
- M9-A3 → Academy SSRF, apartado «Bypassing SSRF filters via open redirection»: para las clases de bypass. Resultado: el contraejemplo con redirección y el registro esperado.
- M9-A4 → SSRF Prevention Cheat Sheet, apartados «Cases» y «Deny-list (Last Resort)»: para el orden de las validaciones y por qué la *allowlist* es preferible. Resultado: el modelo de control por salto con sus límites.

## Archivos

- Teoría/práctica: [Academy path traversal](https://portswigger.net/web-security/file-path-traversal) — `EN · gratis · docs/labs`; apartados «What is path traversal?», «Reading arbitrary files via path traversal», «Common obstacles to exploiting path traversal vulnerabilities» y «How to prevent a path traversal attack».
- Teoría/práctica alternativa: [Academy file upload](https://portswigger.net/web-security/file-upload) — `EN · gratis · docs/labs`; apartados «What are file upload vulnerabilities?», «How do file upload vulnerabilities arise?» y «How to prevent file upload vulnerabilities».
- Teoría: [File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Extension Validation», «Content-Type Validation», «File Signature Validation», «Filename Safety», «File Content Validation», «File Storage Location» y «Upload and Download Limits».

Practica **uno** de los dos flujos; el otro solo lectura comparada.

**Por actividad**

- M10-A1 → Academy path traversal, apartado «What is path traversal?»: para el vocabulario de rutas y contención. Resultado: el dibujo de la ruta de datos con sus validaciones presentes y ausentes.
- M10-A2 → Academy path traversal, apartado «Common obstacles to exploiting path traversal vulnerabilities»: para las variantes de ruta que debes probar. Resultado: el par permitido y negativo con su clasificación.
- M10-A3 → Academy path traversal, apartado «How to prevent a path traversal attack», y File Upload Cheat Sheet, apartados «Filename Safety», «File Content Validation» y «Upload and Download Limits»: para el orden de comprobación. Resultado: el análisis del control y los tres controles alternos descartados.
- M10-A4 → Academy file upload, apartados «What are file upload vulnerabilities?» y «How do file upload vulnerabilities arise?»: para la comparación. Resultado: la tabla de tres diferencias con sus incertidumbres.

## JWT, OAuth y OIDC

- Teoría/práctica A: [Academy JWT](https://portswigger.net/web-security/jwt) — `EN · gratis · docs/labs`; apartados «What are JWTs?», «JWT format», «JWT signature», «JWT vs JWS vs JWE», «JWT algorithm confusion», «How to prevent JWT attacks» y «Additional best practice for JWT handling».
- Teoría/práctica B: [Academy OAuth](https://portswigger.net/web-security/oauth) — `EN · gratis · docs/labs`; apartados «What is OAuth?», «How does OAuth 2.0 work?», «Flawed CSRF protection», «Leaking authorization codes and access tokens», «Flawed redirect_uri validation» y «Extending OAuth with OpenID Connect». Usa un diagrama, no implementes un proveedor.
- Norma: [RFC 7519 (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) — `EN · gratis · norma`; apartados «3. JSON Web Token (JWT) Overview», «4.1. Registered Claim Names», «5. JOSE Header», «7.1. Creating a JWT», «7.2. Validating a JWT» y «11.1. Trust Decisions».
- Norma: [RFC 7636 (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) — `EN · gratis · norma`; apartados «4.1. Client Creates a Code Verifier», «4.5. Client Sends the Authorization Code and the Code Verifier to the Token Endpoint», «4.6. Server Verifies code_verifier before Returning the Tokens» y «7.5. TLS Security Considerations».
- Norma: [RFC 8725 (JWT Best Current Practices)](https://www.rfc-editor.org/rfc/rfc8725) — `EN · gratis · norma`; apartados «2.1. Weak Signatures and Insufficient Signature Validation», «2.2. Weak Symmetric Keys», «3.1. Perform Algorithm Verification», «3.4. Validate Cryptographic Inputs», «3.8. Validate Issuer and Subject», «3.9. Use and Validate Audience» y «3.10. Do Not Trust Received Claims».
- Opcional: [OpenID Connect, «How OpenID Connect Works»](https://openid.net/developers/how-connect-works) — `EN · gratis · docs`; qué añade OIDC a OAuth.

**Por actividad**

- M11-A1 → Academy JWT, apartados «What are JWTs?», «JWT format» y «JWT signature», y RFC 7519, apartados «3. JSON Web Token (JWT) Overview» y «5. JOSE Header»: para la separación entre decodificar, verificar y autorizar. Resultado: el token anotado y la tabla de tres columnas.
- M11-A2 → RFC 7519, apartados «4.1. Registered Claim Names» y «7.2. Validating a JWT», y RFC 8725, apartados «3.1. Perform Algorithm Verification» y «3.10. Do Not Trust Received Claims»: para qué se valida cada claim y por qué el algoritmo se fija. Resultado: la tabla de rechazos con sus salidas.
- M11-A3 → Academy OAuth, apartados «What is OAuth?» y «How does OAuth 2.0 work?», y RFC 7636, apartados «4.1. Client Creates a Code Verifier» y «4.6. Server Verifies code_verifier before Returning the Tokens»: para el reparto de responsabilidades y el mecanismo de PKCE. Resultado: el diagrama de cuatro actores con el recorrido numerado.
- M11-A4 → Academy OAuth, apartados «Flawed CSRF protection», «Flawed redirect_uri validation» y «Extending OAuth with OpenID Connect»: para el peligro exacto de `state`, `nonce` y `redirect URI`. Resultado: el diagrama con los tres parámetros y la evidencia acotada.

## APIs y lógica de negocio

- Teoría: [OWASP API Security Top 10, edición 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) — `EN · gratis · referencia`; entradas **API1:2023 Broken Object Level Authorization**, **API3:2023 Broken Object Property Level Authorization**, **API4:2023 Unrestricted Resource Consumption** y **API5:2023 Broken Function Level Authorization**. Registra la edición.
- Práctica: [Academy business logic](https://portswigger.net/web-security/logic-flaws) — `EN · gratis · docs/labs`; apartados «What are business logic vulnerabilities?», «How do business logic vulnerabilities arise?» y «How to prevent business logic vulnerabilities».
- Framework: [NestJS, «Validation»](https://docs.nestjs.com/techniques/validation) — `EN · gratis · docs` (página con renderizado en cliente: busca los identificadores `ValidationPipe`, `whitelist`, `forbidNonWhitelisted` y los decoradores de `class-validator`); para las opciones exactas en la versión que uses.
- Opcional: [Academy API testing](https://portswigger.net/web-security/api-testing) — `EN · gratis · docs/labs`; apartados «Identifying API endpoints», «Mass assignment vulnerabilities» y «Testing mass assignment vulnerabilities»; inventario **dentro del alcance permitido**, no descubrimiento sobre terceros.

**Por actividad**

- M12-A1 → OWASP API Security Top 10 2023, entradas API1 y API3: para la clasificación de controles. Resultado: el inventario con la operación elegida marcada.
- M12-A2 → Academy business logic, apartados «What are business logic vulnerabilities?» y «How do business logic vulnerabilities arise?»: para distinguir reglas de negocio de validaciones de forma. Resultado: la invariante con su permitido y su negativo, o la demostración de que el control resiste.
- M12-A3 → NestJS, identificadores `whitelist` y `forbidNonWhitelisted`: para las opciones exactas. Resultado: el DTO con su lista explícita y el caso del campo de rol.
- M12-A4 → OWASP API Security Top 10 2023, entrada API4: para el criterio de dimensionar límites. Resultado: la tabla de límites con su justificación.

## Carreras

- Teoría/práctica: [Academy race conditions](https://portswigger.net/web-security/race-conditions) — `EN · gratis · docs/labs`; apartados «Methodology» (con «1 - Predict potential collisions», «2 - Probe for clues» y «3 - Prove the concept»), «Single-endpoint race conditions» y «How to prevent race condition vulnerabilities». Si no hay lab inicial adecuado, dos operaciones controladas con planificador en un ejemplo local; no *flood*.
- Referencia: [TypeORM, «Transactions»](https://typeorm.io/docs/transactions) — `EN · gratis · docs`; apartados «Transactions», «Creating and using transactions» y «Specifying isolation level»: para la semántica real de la transacción y del bloqueo.

**Por actividad**

- M13-A1 → Academy race conditions, apartado «Methodology» → «1 - Predict potential collisions»: para el patrón *check-then-act*. Resultado: el interleaving con el punto de ruptura.
- M13-A2 → Academy race conditions, apartado «Methodology» → «3 - Prove the concept»: para la sincronización y su interpretación. Resultado: el defecto reproducido y el cambio de orden que lo hace desaparecer.
- M13-A3 → TypeORM «Transactions», apartados «Creating and using transactions» y «Specifying isolation level»: para la semántica real del bloqueo y del aislamiento. Resultado: el verde del mismo test y la garantía descrita con su límite.
- M13-A4 → Academy race conditions, apartado «How to prevent race condition vulnerabilities»: para el alcance de cada control frente a la idempotencia. Resultado: la tabla de dos escenarios con la conclusión.

## Revisión de código

- Requisito y método: ASVS y WSTG en [Modelado y verificación](#modelado-y-verificación); selecciona 3–5 requisitos actuales aplicables, sin checklist completa.
- Consulta defensiva: [OS Command Injection Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Primary Defenses», «Defense Option 1: Avoid calling OS commands directly» y «Defense Option 2: Escape values added to OS commands specific to each OS»; no amplía el alcance a explotación de comandos.
- Práctica: seguir entrada → transformaciones → sink → control en código propio o ejemplo pequeño, con fichero/línea y test como evidencia.

**Por actividad**

- M14-A1 → ASVS 5.0.0 (listado CSV): para los IDs y el texto literal de los requisitos. Resultado: la lista de 3–5 criterios observables.
- M14-A2 → OS Command Injection Defense Cheat Sheet, apartado «Defense Option 1: Avoid calling OS commands directly»: para el criterio de evitar el shell al leer. Resultado: la traza con fichero y línea por paso.
- M14-A3 → WSTG, casos de validación de datos de negocio y de IDOR: para contrastar el negativo diseñado. Resultado: dos conclusiones etiquetadas con su prueba falsadora.
- M14-A4 → la plantilla de [Ficha de hallazgo o revisión](README.md#ficha-de-hallazgo-o-revisión): para el formato con las tres categorías separadas. Resultado: la ficha n.º 5 con confirmado, hipótesis y no probado.

## Automatización y supply chain

- Teoría: [GitHub code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning) — `EN · gratis · docs`; apartados «About tools for code scanning», «About CodeQL analysis» y «About third-party code scanning tools». Disponibilidad de scanners o funciones depende de cuenta, plan y repositorio; no es requisito contratar nada.
- Práctica: **un** scanner adecuado al stack sobre código propio, si ya es viable, o salida de ejemplo con procedencia declarada. Puede ser SAST, SCA o *secret scanning*; documenta qué clase elegiste y qué no cubre. No instales una batería ni uses Dependency-Check por defecto para Node.
- Marco: [NIST SSDF](https://csrc.nist.gov/Projects/ssdf) — `EN · gratis · marco`; apartados «Overview», «SSDF Practices» y «SSDF Use»; las *practices* son la parte que te interesa, no el marco entero. *Lockfile*, inventario, procedencia y SBOM son conceptos, no otro proyecto.

**Por actividad**

- M15-A1 → GitHub code scanning, apartados «About tools for code scanning» y «About third-party code scanning tools»: para el alcance de un análisis estático y sus límites. Resultado: la tabla de tres clases con la elección razonada.
- M15-A2 → NIST SSDF, apartado «SSDF Practices»: para el lenguaje de procedencia. Resultado: la salida con su versión (o «desconocida») y su procedencia declarada.
- M15-A3 → GitHub code scanning, apartado «About CodeQL analysis»: para el criterio de alcanzabilidad. Resultado: la ficha de la señal con las tres categorías decididas.
- M15-A4 → NIST SSDF, apartado «SSDF Practices»: para el vocabulario de procedencia y la función de un inventario. Resultado: la ficha n.º 6 con lo que ninguna herramienta cubre.

## Pipeline y permisos

- Teoría: [CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Secure Configuration», «Secure SCM Configuration», «Pipeline and Execution Environment», «IAM», «Secrets Management», «Least Privilege», «Identity Lifecycle Management» y «Managing Third-Party Code».
- Práctica: *policy* o *fixture* local con una operación permitida y otra denegada, o pipeline propio que ya exista. Lee IAM y *non-root* en relación con ese flujo. Sin infraestructura nueva ni tres plataformas; cloud es opcional y puede tener coste si se elige.

**Por actividad**

- M16-A1 → CI/CD Security Cheat Sheet, apartados «Secrets Management» y «Least Privilege»: para separar flujo de secretos y permisos mínimos. Resultado: el diagrama de job, identidad, secreto y recurso.
- M16-A2 → CI/CD Security Cheat Sheet, apartados «Managing Third-Party Code» y «Secure SCM Configuration»: para tratar un evento externo como no confiable. Resultado: el mapa de la cadena de instrucciones.
- M16-A3 → CI/CD Security Cheat Sheet, apartados «IAM», «Least Privilege» e «Identity Lifecycle Management»: para el criterio de mínimo privilegio y el alcance de la identidad de trabajo. Resultado: la tabla de permisos con su motivo.
- M16-A4 → CI/CD Security Cheat Sheet, apartado «Least Privilege»: para comprobar que el control cubre lo que dice. Resultado: la *policy* con el caso permitido y el denegado.

## Logs y respuesta

- Teoría/práctica: [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Security use cases», «Which events to log», «Event attributes», «Data to exclude», «Verification», «Attacks on Logs», «Log Injection», «Monitoring of events» y «Disposal of logs».
- Práctica: *logger* local y ejercicio de mesa con robo de token ficticio; verificar revocación y contención en el modelo, sin declarar respuesta real ejecutada.

**Por actividad**

- M17-A1 → Logging Cheat Sheet, apartados «Which events to log» y «Event attributes»: para la lista de atributos y exclusiones. Resultado: la tabla de eventos con campos y propósito.
- M17-A2 → Logging Cheat Sheet, apartados «Data to exclude» y «Verification»: para el criterio de exclusión y la comprobación de la salida. Resultado: la salida antes y después de la redacción.
- M17-A3 → Logging Cheat Sheet, apartados «Attacks on Logs» y «Log Injection»: para tratar las entradas como no confiables. Resultado: el evento forjado y la salida corregida.
- M17-A4 → Logging Cheat Sheet, apartados «Security use cases» y «Monitoring of events»: para el enlace entre evento y respuesta. Resultado: el playbook de cinco pasos recorrido en mesa.

## AppSec en IA

- Teoría: [OWASP Top 10 for LLM Applications](https://owasp.org/projects/top-10-for-large-language-model-applications) — `EN · gratis · referencia`; la lista vigente está en el repositorio del proyecto: entrada [LLM01:2025 Prompt Injection](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM01_PromptInjection.md) y [LLM06:2025 Excessive Agency](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM06_ExcessiveAgency.md). Registra la edición consultada.
- Práctica: [LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; apartados «Anatomy of Prompt Injection Vulnerabilities», «Common Attack Types», «Direct Prompt Injection», «Remote/Indirect Prompt Injection», «Primary Defenses», «Least Privilege», «Smoke-Testing Your Defenses» y «Best Practices Checklist».
- Alternativa sin coste: documento malicioso ficticio y doble determinista que solicita una acción denegada por *policy*. No requiere modelo real ni API, y no demuestra que un modelo resista inyección.

**Por actividad**

- M18-A1 → LLM Prompt Injection Prevention Cheat Sheet, apartados «Anatomy of Prompt Injection Vulnerabilities» y «Common Attack Types»: para el criterio de clasificar entradas. Resultado: el diagrama con la frontera de confianza.
- M18-A2 → OWASP Top 10 for LLM Applications, entrada LLM01:2025: para la clasificación de inyección directa e indirecta. Resultado: el documento ficticio con su predicción de efecto.
- M18-A3 → LLM Prompt Injection Prevention Cheat Sheet, apartados «Primary Defenses» y «Least Privilege»: para el criterio de permisos mínimos de herramientas. Resultado: la política de actor, acción, recurso y alcance.
- M18-A4 → LLM Prompt Injection Prevention Cheat Sheet, apartado «Smoke-Testing Your Defenses» y «Best Practices Checklist»: para contrastar tu enfoque. Resultado: el doble con los tres tests y la frase sobre lo que no demuestra.

## Integración y reporte

- Requisito: reutiliza un requisito de [Modelado y verificación](#modelado-y-verificación).
- Plantillas: el README es quien las define: [Registro de evidencia por módulo y actividad](README.md#registro-de-evidencia-por-módulo-y-actividad) para el registro de cada caso y [Ficha de hallazgo o revisión](README.md#ficha-de-hallazgo-o-revisión) para la ficha de cada conclusión. No inventes hallazgos para completar cuotas.
- Apoyo: [PROMPTS.md](PROMPTS.md) para recuperación, triage o evaluación simulada; la IA no es fuente primaria ni verificador final.

**Por actividad**

- M19-A1 → la plantilla de [Registro de evidencia por módulo y actividad](README.md#registro-de-evidencia-por-módulo-y-actividad): para el formato del documento de alcance y de la condición de parada. Resultado: el documento de alcance congelado.
- M19-A3 → la misma plantilla: para el formato de evidencia. Resultado: el registro de casos con predicción y observado.
- M19-A4 → la plantilla de [Ficha de hallazgo o revisión](README.md#ficha-de-hallazgo-o-revisión): para la estructura de la ficha y el tratamiento de la incertidumbre. Resultado: el informe preliminar con las tres columnas.
- M20-A1 → la plantilla de [Registro de evidencia por módulo y actividad](README.md#registro-de-evidencia-por-módulo-y-actividad): para el encuadre del retest. Resultado: el criterio de aceptación escrito.
- M20-A2 → la misma plantilla: para el formato antes/después. Resultado: el retest con el negativo rechazado y el permitido preservado.
- M20-A3 → las plantillas de [Ficha de hallazgo o revisión](README.md#ficha-de-hallazgo-o-revisión) y de [Registro de evidencia por módulo y actividad](README.md#registro-de-evidencia-por-módulo-y-actividad): para el checklist de publicación. Resultado: el informe con el anexo sanitizado.
- M20-A4 → la plantilla de [Ficha de hallazgo o revisión](README.md#ficha-de-hallazgo-o-revisión): para el checklist de un portfolio honesto. Resultado: la auditoría de fichas y el balance.
