# Recursos de AppSec

Catálogo acotado; el orden vive en [ITINERARIO.md](ITINERARIO.md). Por semana selecciona **una teoría, una práctica y como máximo una consulta opcional** de las secciones enlazadas. Si una página sirve para teoría y lab, no necesitas otra. Consulta solo los apartados nombrados por la semana, nunca el estándar o catálogo completo.

Los enlaces oficiales de este documento fueron comprobados por el orquestador con **HTTP 200 el 2026-11-01**. Eso verifica accesibilidad/título en esa fecha: **no significa que se ejecutaran labs ni que se certificara el contenido**. Predomina `EN`; puedes traducir términos, conservando el término inglés para buscar. Registra sección, versión y fecha consultadas. No se fija una edición de OWASP/ASVS como «la última» ni se inventan IDs de controles.

## Uso de Academy y herramientas

- [Learning paths de Web Security Academy](https://portswigger.net/web-security/learning-paths) — `EN · gratis · docs/labs`; cuenta para labs. Busca un lab pequeño del tema, **Apprentice cuando exista y esté accesible**. No se exige un título o nivel concreto ni terminar un catálogo. Uno o dos labs pequeños son techo, no cuota; un caso suficientemente probado basta. Si no hay Apprentice adecuado, ejemplo guiado mínimo.
- [Burp: getting started](https://portswigger.net/burp/documentation/desktop/getting-started) — `EN · gratis · docs`; limita la lectura a proxy, alcance y Repeater. **Community es gratuita**; funciones Pro quedan fuera. Alternativa: DevTools y `curl`, o fixture sin proxy si la herramienta no está disponible.

No hay herramientas comerciales obligatorias. No descargues aplicaciones vulnerables por inercia: los labs alojados autorizados son la opción inicial. Una simulación local debe etiquetarse como tal.

## HTTP y navegador

- Teoría: [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) — `EN · gratis · docs`; mensajes, HTTPS/TLS como protección del transporte, headers, métodos y estados. No sustituye autorización ni protege datos después de terminar TLS.
- Práctica: capturar una petición propia en DevTools y reconstruir método, URL, headers, body y respuesta; repetir solo en alcance autorizado con herramientas de la sección anterior.
- Opcional: [MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) — `EN · gratis · docs`; atributos y envío por navegador.

## Modelado y verificación

- Teoría: [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) — `EN · gratis · guía`; activos, flujos, fronteras y preguntas STRIDE.
- Práctica: [OWASP ASVS](https://asvs.owasp.org/) — `EN · gratis · estándar`; selecciona un requisito verificable, registra su versión e identificador real. No declares evaluación completa.
- Opcional: [OWASP WSTG](https://owasp.org/projects/web-security-testing-guide) — `EN · gratis · guía`; consulta un método de prueba relacionado. Distingue requisito de seguridad (ASVS) de método de prueba (WSTG).

## Autorización

- Teoría y práctica: [Academy access control](https://portswigger.net/web-security/access-control) — `EN · gratis · docs/labs`; controles horizontales/verticales, IDOR y scope. Elige un lab pequeño o fixtures de dos tenants.
- Práctica local: [Seguridad aplicada](../../Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md) — `ES · gratis · ejercicio`; reutiliza permitido/cruzado, no construyas otro servicio.

## Autenticación

- Teoría/práctica: [Academy authentication](https://portswigger.net/web-security/authentication) — `EN · gratis · docs/labs`; login, reset, enumeración, MFA y controles de intentos. Sin fuerza bruta real.
- Consulta: [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — `EN · gratis · guía`; hashing, salt y Argon2id con librería mantenida y configuración vigente. No memorices parámetros ni implementes algoritmos.

## Sesiones y CSRF

- Teoría: [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — `EN · gratis · guía`; ciclo de vida, fijación, expiración, revocación y atributos de cookies.
- Práctica: [Academy CSRF](https://portswigger.net/web-security/csrf) — `EN · gratis · docs/labs`; precondiciones y defensas; no asumir que SameSite o un token resuelven todos los contextos.
- Opcional: cookies en [HTTP y navegador](#http-y-navegador).

## SQL injection

- Teoría/práctica: [Academy SQL injection](https://portswigger.net/web-security/sql-injection) — `EN · gratis · docs/labs`; separación código/datos, consultas parametrizadas y límites cuando se eligen identificadores.
- Práctica local: una query con datos ficticios y el driver del stack ya conocido; usa su documentación vigente para la sintaxis de binding. Un ORM no garantiza que el SQL crudo sea seguro.

## XSS

- Teoría/práctica: [Academy cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) — `EN · gratis · docs/labs`; reflected, stored, DOM, sources/sinks y prevención según contexto.
- Práctica local: un sink aislado con contenido ficticio, encoding contextual o sanitización mediante librería mantenida si realmente se admite HTML. CSP es defensa en profundidad, no arreglo universal.

## Fronteras del navegador

- Teoría: [MDN Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) — `EN · gratis · docs`; definición de origin y límites de lectura.
- Práctica: [Academy CORS](https://portswigger.net/web-security/cors) — `EN · gratis · docs/labs`; preflight, credenciales y decisiones de acceso desde navegador. CORS no es autorización de API.

## SSRF

- Teoría/práctica: [Academy SSRF](https://portswigger.net/web-security/ssrf) — `EN · gratis · docs/labs`; solicitudes server-side, validación, redirecciones y limitaciones de controles. Alternativa segura: stub de resolución y transporte, sin red real.

## Archivos

- Teoría/práctica: [Academy path traversal](https://portswigger.net/web-security/file-path-traversal) — `EN · gratis · docs/labs`; canonicalización, containment y acceso fuera del directorio.
- Teoría/práctica alternativa: [Academy file upload](https://portswigger.net/web-security/file-upload) — `EN · gratis · docs/labs`; nombre, tipo/contenido, almacenamiento y límites. Practica **uno** de los dos flujos; el otro solo lectura comparada.

## JWT y OAuth

- Teoría/práctica alternativa A: [Academy JWT](https://portswigger.net/web-security/jwt) — `EN · gratis · docs/labs`; firma frente a cifrado, validación de claims y algoritmo.
- Teoría/práctica alternativa B: [Academy OAuth](https://portswigger.net/web-security/oauth) — `EN · gratis · docs/labs`; roles y flujo, OAuth frente a OIDC, PKCE, state/nonce y redirect URIs según el flujo. Usa un diagrama, no implementes un proveedor.

## APIs y lógica de negocio

- Teoría: [OWASP API Security](https://api-security.owasp.org/) — `EN · gratis · referencia`; selecciona autorización de objetos/funciones, propiedades y consumo de recursos, registrando la edición.
- Práctica: [Academy business logic](https://portswigger.net/web-security/logic-flaws) — `EN · gratis · docs/labs`; elige una invariante verificable.
- Opcional: [Academy API testing](https://portswigger.net/web-security/api-testing) — `EN · gratis · docs/labs`; inventario **dentro del alcance permitido**, no descubrimiento sobre terceros.

## Carreras

- Teoría/práctica: [Academy race conditions](https://portswigger.net/web-security/race-conditions) — `EN · gratis · docs/labs`; check-then-act, estados y concurrencia. Si no hay lab inicial adecuado, dos operaciones controladas con barrera en un ejemplo local; no flood.

## Revisión de código

- Teoría: [ASVS y WSTG](#modelado-y-verificación); selecciona 3–5 requisitos actuales aplicables, sin checklist completa.
- Consulta defensiva: [OS Command Injection Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) — `EN · gratis · guía`; evitar shell e interfaces riesgosas; no amplía el alcance a explotación de comandos.
- Práctica: seguir entrada → transformaciones → sink → control en código propio o ejemplo pequeño, con fichero/línea y test como evidencia.

## Automatización y supply chain

- Teoría: [GitHub code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning) — `EN · gratis · docs`; señales de análisis y límites. Disponibilidad de scanners/funciones depende de cuenta, plan y repositorio; no es requisito contratar nada.
- Práctica: **un** scanner adecuado al stack sobre código propio, si ya es viable, o salida de ejemplo sanitizada. Puede ser SAST, SCA o secret scanning; documenta qué clase elegiste y qué no cubre. No instales una batería ni uses Dependency-Check por defecto para Node.
- Opcional: [NIST SSDF](https://csrc.nist.gov/Projects/ssdf) — `EN · gratis · marco`; leer prácticas relacionadas con revisión, dependencias y respuesta, no completar el marco. Lockfile, procedencia y SBOM son conceptos, no otro proyecto.

## Pipeline y permisos

- Teoría: [CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html) — `EN · gratis · guía`; permisos de jobs, secretos, eventos no confiables e identidad efímera.
- Práctica: policy/fixture local con una operación permitida y otra denegada, o pipeline propio que ya exista. Lee IAM y non-root en relación con ese flujo. Sin infraestructura nueva ni tres plataformas; cloud es opcional y puede tener coste si se elige.

## Logs y respuesta

- Teoría/práctica: [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) — `EN · gratis · guía`; eventos de autenticación/autorización, request ID, exclusión de secretos/PII y tratamiento de entradas que puedan forjar logs.
- Práctica: logger local y ejercicio de mesa con robo de token ficticio; verificar revocación/contención en el modelo, sin declarar respuesta real ejecutada.

## AppSec en IA

- Teoría: [OWASP Top 10 for LLM Applications](https://owasp.org/projects/top-10-for-large-language-model-applications) — `EN · gratis · referencia`; prompt injection, exfiltración y excessive agency; registra edición consultada.
- Práctica: [LLM Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) — `EN · gratis · guía`; datos no confiables, límites de herramientas y autorización externa al modelo.
- Alternativa sin coste: documento malicioso ficticio y stub determinista que solicita una acción denegada por policy. No requiere modelo real/API ni demuestra que un modelo resista inyección.

## Integración y reporte

- Teoría: reutiliza un requisito de [Modelado y verificación](#modelado-y-verificación).
- Práctica: revisa el mismo objetivo autorizado con alcance congelado y las [plantillas de evidencia y ficha](README.md#registro-de-evidencia-semanal). No inventes hallazgos para completar cuotas.
- Apoyo: [PROMPTS.md](PROMPTS.md) para recuperación, triage o evaluación simulada; la IA no es fuente primaria ni verificador final.
