# Recursos de AppSec

Consulta el apartado que señale el [itinerario](ITINERARIO.md), no todas las páginas. Predomina `EN`; conserva el término original al buscar. Las fuentes son referencias, no garantías sobre tu implementación. Anota versión/sección cuando sostengan una conclusión; no inventes IDs de controles.

## Uso de Academy y herramientas

- [Learning paths de Web Security Academy](https://portswigger.net/web-security/learning-paths): teoría y labs gratuitos; elige un caso pequeño autorizado o un fixture local, sin completar catálogos.
- [Burp: getting started](https://portswigger.net/burp/documentation/desktop/getting-started): Community opcional; DevTools y `curl` son alternativas. Sin funciones Pro obligatorias ni proxy en el perfil personal.

## HTTP y navegador

- [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview): «Requests», «Responses», «HTTP is stateless, but not sessionless».
- [MDN TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security): transporte, autenticación del servidor y límites; no sustituye autorización.
- [Métodos](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers), [estados](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) y [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie): referencia puntual.

## DevTools

- [Inspect network activity](https://developer.chrome.com/docs/devtools/network/): abrir Network, inspeccionar Headers/Payload/Response y conservar la traza del preflight. Equivalentes de Firefox/Safari válidos.

## Node test runner

- [node:test](https://nodejs.org/api/test.html): «Running tests from the command line» y modelo de ejecución. Viene con Node LTS, sin dependencias.
- [node:assert](https://nodejs.org/api/assert.html): aserciones estrictas y errores esperados; criterio independiente de la implementación.

## Modelado y verificación

- [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html): «System Modeling», «Threat Identification», «Response and Mitigations», «Review and Validation».
- [OWASP ASVS](https://asvs.owasp.org/) y [CSV 5.0.0](https://github.com/OWASP/ASVS/raw/v5.0.0/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.csv): requisito literal, versión e ID real. V2 negocio, V8 autorización, V9 tokens, V10 OAuth/OIDC; no evaluación completa.
- [OWASP WSTG](https://wstg.owasp.org/latest/): método de prueba, especialmente IDOR y «Business Logic Data Validation». ASVS dice qué debe cumplirse; WSTG cómo investigarlo.

### STRIDE en castellano como rejilla de preguntas

Suplantación: ¿quién se hace pasar por otro? Manipulación: ¿qué puede alterar? Repudio: ¿qué acción puede negar? Revelación: ¿qué dato sale a quien no debe? Denegación de servicio: ¿qué recurso agota? Elevación de privilegios: ¿qué permiso obtiene? Marca «no aplica» o «no evaluado» con motivo; no inventes amenazas para rellenar filas.

## Autorización

- [Academy access control](https://portswigger.net/web-security/access-control): controles horizontales, verticales e IDOR; práctica con dos tenants ficticios.
- [IDOR Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html): «Verifying access controls», «Mitigation» e identificadores no equivalentes a permisos.
- [Seguridad aplicada local](../../Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md): reutilizar permitido/cruzado, no crear otro servicio.

## Autenticación

- [Academy authentication](https://portswigger.net/web-security/authentication), [login por contraseña](https://portswigger.net/web-security/authentication/password-based), [MFA](https://portswigger.net/web-security/authentication/multi-factor) y [securing](https://portswigger.net/web-security/authentication/securing): enumeración, reset y controles de intentos.
- [Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): «Hashing vs Encryption», «Salting», «Peppering», «Argon2id»; no implementar algoritmos.
- [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html): factores y límites de MFA.

## Sesiones y CSRF

- [Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html): generación, renovación, expiración y revocación.
- [MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies): atributos y SameSite; comprueba el navegador, no generalices excepciones de localhost.
- [Academy CSRF](https://portswigger.net/web-security/csrf) y [CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html): precondiciones, token vinculado/validado y comprobación de origen.

## SQL injection y PostgreSQL

- [Academy SQLi](https://portswigger.net/web-security/sql-injection) y [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html): binding y allowlist, no escape casero.
- [node-postgres queries](https://node-postgres.com/features/queries) y [connecting](https://node-postgres.com/features/connecting): parámetros y conexión explícita a la base ficticia de pruebas.
- [TypeORM QueryBuilder](https://typeorm.io/docs/query-builder/select-query-builder): parámetros y consulta generada; [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html): garantías reales del motor.

## XSS y Angular

- [Academy XSS](https://portswigger.net/web-security/cross-site-scripting) y [XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html): source/sink, contextos, sanitización y safe sinks.
- [Angular security](https://angular.dev/best-practices/security): busca `DomSanitizer`, `bypassSecurityTrustHtml`, `SecurityContext`; sus páginas pueden renderizar en cliente. Verifica en el DOM el escape, no lo supongas.

## Fronteras del navegador

- [MDN Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) y [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS): origin/site, enviar frente a leer, preflight y credenciales.
- [Academy CORS](https://portswigger.net/web-security/cors) y [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP): CORS no autoriza recursos y CSP es una capa adicional.

## SSRF

- [Academy SSRF](https://portswigger.net/web-security/ssrf) y [SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html): parser, resolución, cada redirección y egress. Usa stub sin red, no metadata real.

## Archivos

- [Academy path traversal](https://portswigger.net/web-security/file-path-traversal), [file upload](https://portswigger.net/web-security/file-upload) y [File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html): canonicalización, almacenamiento y límites.
- [Node path](https://nodejs.org/api/path.html) y [fs](https://nodejs.org/api/fs.html): `resolve`, `realpath`, enlaces simbólicos y por qué normalizar no garantiza containment.

## JWT, OAuth y OIDC

- [Academy JWT](https://portswigger.net/web-security/jwt), [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519) y [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725): firma, claims, algoritmos permitidos y separación de contextos.
- [Academy OAuth](https://portswigger.net/web-security/oauth), [RFC 7636 PKCE](https://www.rfc-editor.org/rfc/rfc7636), [OAuth BCP RFC 9700](https://www.rfc-editor.org/rfc/rfc9700) y [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html): delegación, code flow, state/nonce y tokens destinados a cada API.
- [Microservices Security](https://cheatsheetseries.owasp.org/cheatsheets/Microservices_Security_Cheat_Sheet.html): identidad workload, mTLS y autorización entre servicios; no exige cluster ni IdP.

## APIs y lógica de negocio

- [OWASP API Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/): BOLA/BFLA, propiedades, consumo y «Unsafe Consumption of APIs».
- [Academy business logic](https://portswigger.net/web-security/logic-flaws), [NestJS Validation](https://docs.nestjs.com/techniques/validation) y [raw body](https://docs.nestjs.com/faq/raw-body): `ValidationPipe`, decoradores, `whitelist`, `forbidNonWhitelisted` y firma antes de parsear.
- [OpenAPI specification](https://spec.openapis.org/oas/latest.html): contrato y security schemes, no autorización implementada; [GitHub webhooks](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries): firma sobre bytes originales. Estudiar la documentación no requiere llamar a GitHub.

## Carreras

- [Academy race conditions](https://portswigger.net/web-security/race-conditions): «Predict potential collisions», «Prove the concept» y límites de idempotencia.
- [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [isolation](https://www.postgresql.org/docs/current/transaction-iso.html), [locks](https://www.postgresql.org/docs/current/explicit-locking.html) y [TypeORM transactions](https://typeorm.io/docs/advanced-topics/transactions): aislamiento y limpieza de conexiones, no dobles para afirmar garantías del motor.

## Revisión de código

- Reutiliza ASVS/WSTG de [Modelado](#modelado-y-verificación); [OS Command Injection Defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html): evitar shell, trazar argumentos, no construir explotación.
- [Cryptographic Storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html), [Key Management](https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html) y [node:crypto](https://nodejs.org/api/crypto.html): AEAD, nonce/tag, APIs estándar y ciclo de claves; no protocolo propio.

## Automatización y supply chain

- [GitHub code scanning](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning), [CodeQL](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql) y [secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning): cobertura, alertas y límites, no instalación obligatoria.
- [NIST SSDF SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final): prácticas de desarrollo/entrega; [CycloneDX](https://cyclonedx.org/specification/overview/): SBOM como inventario, no veredicto de riesgo.
- [OWASP ZAP baseline](https://www.zaproxy.org/docs/docker/baseline-scan/): contraste opcional con DAST; la comprobación HTTP local del itinerario no necesita instalar ZAP.

## Pipeline y permisos

- [CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html): SCM, third-party code, IAM, least privilege e identity lifecycle.
- [Docker Security](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) y [Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html): non-root, distribución, rotación y revocación; una propuesta no demuestra permisos efectivos.

## Logs y respuesta

- [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html): eventos/campos, exclusiones, verification, ataques a logs y monitorización. Nunca registrar el valor de una clave para probar su rotación.

## AppSec en IA

- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) y [Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html): inyección directa/indirecta, permisos mínimos y decisión fuera del modelo; stub no prueba robustez de un LLM.

## Integración y reporte

- Reutiliza [registro](README.md#registro-de-evidencia-por-módulo-y-actividad) y [ficha](README.md#ficha-de-hallazgo-o-revisión), sin otro tracker. [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final): comunicación y respuesta a vulnerabilidades.
- [Roadmap AppSec 2026](https://www.product-security.expert/22-learning-paths-and-labs/application-security-engineer-learning-roadmap-2026.html): comparación de cobertura en el [README](README.md#encaje-y-comparación), no calendario adicional.
