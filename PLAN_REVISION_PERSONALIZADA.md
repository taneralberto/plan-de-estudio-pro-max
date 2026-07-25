# Plan de revisión personalizada del plan de estudio

> **Estado:** propuesta de cambios. Este archivo define qué modificar; no implementa esos cambios.

## 1. Objetivo personal que debe gobernar el plan

El plan debe ayudar a una persona con ocho años resolviendo desarrollo y mantenimiento de sistemas en una pyme —frontend, backend, PostgreSQL, servidores, Docker, GCP y GitHub— a avanzar hacia:

1. **Backend senior:** diseñar servicios, datos y límites; diagnosticar sistemas; operar cambios seguros; justificar decisiones.
2. **Ingeniería con AI:** dirigir coding agents, limitar su trabajo, entender sus cambios, comprobarlos con evidencia y revertirlos cuando corresponda.
3. **Cambio de empleo y productos propios:** producir evidencia técnica comunicable, no solo completar ejercicios.

TypeScript, Angular y NestJS son el stack actual, **no la identidad ni el límite del plan**. TypeScript seguirá siendo útil para practicar con un entorno conocido; Python, Rust u otro lenguaje podrán aparecer cuando enseñen mejor un concepto. Lua queda como aprendizaje JIT si una herramienta o proyecto lo exige.

### Necesidades personales que deben reflejarse

- Hay experiencia práctica amplia, pero confianza conceptual desigual. No asumir dominio por años trabajados: usar diagnósticos breves.
- Cuesta entender, recordar y explicar. Cada bloque debe exigir recuperación, explicación y evidencia, no más lectura.
- Estudiar pasivamente produce sueño. La práctica debe comenzar antes que el recurso largo.
- Hay unas **10 horas semanales** sostenibles.
- El frontend es secundario; Backend y agentes son la ruta principal.
- FreePress y los proyectos longitudinales grandes abruman. Sustituirlos por laboratorios y proyectos backend pequeños.
- Existe interés alto por matemáticas, Rust, Lua y Python, pero no deben convertir la ruta principal en varias carreras simultáneas.
- El plan debe tener un final visible y permitir avanzar sin quedar bloqueado meses por un tema.

## 2. Decisiones de diseño

### 2.1 Qué será el plan

Un itinerario personal con tres niveles:

1. **Ruta activa:** Backend + ingeniería con coding agents.
2. **Diagnóstico:** conocimientos posiblemente adquiridos en ocho años; se demuestran con una tarea corta y se saltan si están presentes.
3. **Referencia JIT:** frontend, plataforma avanzada, herramientas y patrones que se consultan cuando exista una necesidad real.

No será obligatorio marcar los 46 temas. El criterio de salida será completar la ruta activa y sus artefactos, no consumir todo el repositorio.

### 2.2 Duración y final visible

- **Primer resultado útil:** 12 semanas, aproximadamente 120 horas. Debe dejar un servicio backend pequeño desplegado, verificable y una entrega realizada por un agente que pueda explicarse y auditarse. Este hito usa las unidades 7 (requirements), 9 (diseño), 3 (testing), 14 (API), 17 (entrega/GCP), 18 (observabilidad/SRE) y 19 (coding agents), más diagnósticos puntuales de debugging, Git/Linux y SQL cuando hagan falta.
- **Ruta personalizada completa:** 28–32 semanas activas como límite orientativo, incluidos proyectos pequeños y repasos superpuestos.
- Al alcanzar el límite, no se extiende automáticamente. Se cierra el ciclo, se evalúan huecos concretos y se elige el siguiente bloque JIT.

El tiempo es una alarma contra el atasco, no una definición de dominio.

### 2.3 Qué significa “AI engineer” aquí

La prioridad no es construir chatbots, RAG o sistemas multiagente. Es convertirse en un ingeniero capaz de trabajar con agentes de código:

- convertir una necesidad en un contrato verificable;
- seleccionar y limitar contexto, archivos, permisos, herramientas, tiempo y presupuesto;
- leer el código y el diff producido;
- distinguir evidencia de afirmaciones del agente;
- ejecutar checks y añadir casos adversariales;
- detectar cambios fuera de alcance;
- decidir aceptar, corregir, detener o revertir;
- registrar decisiones y procedencia.

La construcción de productos que integran LLMs permanece como especialización opcional.

## 3. Estructura objetivo: 19 unidades activas

Los 46 IDs actuales se conservarán como aliases o referencias mientras se fusiona contenido, para no romper enlaces históricos. El roadmap principal mostrará estas unidades, no los 46 archivos como una escalera.

| Orden | Unidad activa | Contenido actual que absorbe | Resultado mínimo |
|---:|---|---|---|
| 1 | Debugging y evidencia | 1.1, debugger y método de 4.6 | Bug reproducido, hipótesis y evidencia del arreglo |
| 2 | Runtime de JavaScript, procesos y concurrencia | 1.2, 2.7, 2.11, memoria/I/O de 4.6 | Diagnóstico de bloqueo, carrera o fuga |
| 3 | Testing y oracles externos | 1.3, 4.4 | Test que falsifica una solución plausible pero incorrecta |
| 4 | Seguridad y trust boundaries | 1.4 | Threat model pequeño + caso de autorización negativo |
| 5 | Complejidad y estructuras cotidianas | 1.5 | Análisis Big O y elección de estructura en código real |
| 6 | AI literacy y fundamentos matemáticos de ML | 1.6, 4.13 | Explicación verificable + experimento o eval pequeña |
| 7 | Requirements, ADR y explicación técnica | 1.7, partes útiles de 1.8 y 1.9 | Spec verificable + ADR + explicación oral breve |
| 8 | Git, shell y recuperación | 2.8, 2.9 | Recuperar trabajo y extraer evidencia desde terminal |
| 9 | Diseño modular y mantenibilidad | 2.10, 3.2, 4.10 | Refactor pequeño con límites y tests de caracterización |
| 10 | SQL y modelado | 2.4 | Modelo, constraint y transacción justificados |
| 11 | Migraciones seguras | 2.6 | Expand-contract con rollback o roll-forward |
| 12 | Redes para backend | 2.12 | Diagnóstico DNS/TLS/HTTP reproducible |
| 13 | Performance y elección de datos | 2.3, base útil de 2.5 | Baseline, percentiles y decisión medida |
| 14 | API y límites de dominio | 3.1, parte estratégica de 3.3 | Contrato compatible + límites de dominio |
| 15 | Sistemas distribuidos y mensajería | 3.9, 3.10 | Flujo idempotente con retry/outbox y fallo documentado |
| 16 | System Design y decisiones | 3.6 | Diseño con requisitos, capacidad y trade-offs |
| 17 | Entrega y GCP | 4.2, 4.3, base de 4.1 | Servicio desplegado mediante un pipeline reproducible |
| 18 | Observabilidad y SRE | 4.5 | Incidente detectado, explicado y recuperado con runbook |
| 19 | Ingeniería con coding agents | 4.7, 4.8, code archaeology de 4.6 | Cambio delegado con contrato, diff, checks, adversarial y rollback |

Los temas DDD táctico, NoSQL, cloud avanzada, frontend y AI de producto no desaparecen: quedan como especializaciones o JIT y no cuentan para terminar la ruta.

## 4. Cambios globales por archivo

### `README.md`

- Reemplazar “desarrollador web TypeScript intermedio” por un perfil independiente del lenguaje: profesional con experiencia construyendo sistemas web que quiere fortalecer backend, diseño, operación y supervisión de agentes.
- Declarar la ruta personal predeterminada: **Backend + ingeniería con coding agents**.
- Aclarar que Angular/NestJS son herramientas de práctica, no límites curriculares.
- Publicar los dos horizontes: resultado útil en 12 semanas y ruta completa con techo de 28–32 semanas activas.
- Definir el criterio de salida por unidades y artefactos, no por los 46 temas.
- Enlazar este documento como fuente temporal de la revisión.

### `ROADMAP.md`

- Sustituir la lista principal de 46 temas por las 19 unidades activas anteriores.
- Conservar una tabla de mapeo a IDs antiguos.
- Añadir tres estados claros: `ACTIVO`, `DIAGNÓSTICO`, `JIT`.
- Backend y agentes serán el recorrido predeterminado; Web y Plataforma avanzada estarán en apéndices.
- Un tema diagnosticable se cierra demostrando el resultado mínimo, sin repetir todo el contenido.
- Mantener R1/R7/R30 solo para unidades realmente críticas; no aplicarlos a cada referencia JIT.
- Reordenar CI/CD y despliegue antes de observabilidad/SRE; ML/AI antes de ingeniería con agentes.

### `METODOLOGIA.md`

- Convertir la distribución diaria sugerida actual en un presupuesto semanal flexible de unas 10 horas.
- Cambiar el ciclo “overview de 1–2 horas” por:
  1. pregunta o predicción antes de leer;
  2. overview de 15–30 minutos;
  3. práctica inmediata de 45–90 minutos;
  4. lectura puntual solo para resolver una duda;
  5. explicación oral de dos minutos: problema, decisión, evidencia e incertidumbre.
- Añadir diagnóstico previo por unidad. Si puede demostrar el Done mínimo, se salta la enseñanza.
- Añadir regla antiatasco: después de unas 8 horas en la primera pasada de una unidad, dividir el hueco, entregar el artefacto mínimo posible y continuar. No repetir desde cero.
- Permitir consultar documentación oficial en todos los Done; dominio no significa memorizar APIs.
- Mantener R1/R7/R30 en 5–10 minutos, creados desde fallos reales.
- Integrar la explicación oral como práctica transversal, no como un tema de soft skills aislado.
- Añadir el gate para aceptar código de AI: poder señalar el propósito de los archivos cambiados, trazar un happy path y un fallo, ejecutar los checks y modificar al menos un caso de prueba.
- Evitar que la AI sea la única verificación. Puede explicar o criticar; la evidencia debe venir del sistema, documentación, tests o mediciones.

### `PROYECTOS.md`

- Retirar FreePress como eje recomendado y conservarlo solo en archivo histórico, si se desea.
- Eliminar `fp-ui`, `freepress-cli` y `fp-ai-assistant` como lista predeterminada.
- Crear tres proyectos backend acotados; cada uno debe caber aproximadamente en 8–12 horas y reutilizar aprendizajes:

#### Proyecto A — `safe-change-api`

API pequeña en NestJS o Python, PostgreSQL, OpenAPI, migración, tests de integración y deploy en Cloud Run. Entrena requirements, API, SQL, seguridad, CI y explicación.

#### Proyecto B — `reliable-worker`

Worker pequeño con retries, idempotencia y outbox. Empezar con PostgreSQL o RabbitMQ; Kafka solo si una necesidad medida lo exige. Entrena concurrencia, mensajería, consistencia y observabilidad.

#### Proyecto C — `agent-change-audit`

Un coding agent implementa un cambio pequeño dentro de una rama o worktree. El estudiante escribe el contrato, limita alcance, revisa el diff, ejecuta checks, añade un adversarial y demuestra rollback. Es la pieza principal del portfolio.

- Cada unidad elige **un** ejercicio o una aplicación en proyecto, nunca ambos.
- Permitir usar un problema laboral sanitizado: reproducirlo en un laboratorio sin código ni datos privados.
- El frontend de los proyectos será mínimo o inexistente; `curl`, tests y documentación OpenAPI bastan.

### `RECURSOS.md`

- Mantener el máximo de una fuente primaria, una práctica y una profundización opcional por unidad, no por cada subapartado.
- Priorizar documentación oficial, RFC, postmortems y código real.
- Etiquetar idioma, coste y formato (`lectura`, `video`, `curso`, `referencia`).
- Para practicar escucha en inglés, añadir como opcional una charla corta con transcript; no hacerla requisito técnico.
- No exigir libros completos. Señalar capítulos concretos.
- Verificar cada enlace que se conserve: que responda, corresponda al título, siga vigente y no haya sido reemplazado por una especificación nueva. Marcar paywall cuando exista. No es necesario auditar todo el contenido de cada libro o curso.
- Eliminar placeholders, “cualquier video reciente”, recursos repetidos y superlativos de autoridad.

### `Observaciones.md`

- Conservarlo como diagnóstico histórico.
- Marcar qué observaciones quedan absorbidas por esta revisión y cuáles siguen pendientes.
- Tras implementar, moverlo a `archive/` o añadir una nota visible que indique que el roadmap vigente es la fuente de verdad.

## 5. Revisión de cada tema actual

### Etapa 1

| Tema | Decisión | Cambios planificados |
|---|---|---|
| **1.1 Debugging Básico** | **Mantener y condensar** | Priorizar backend/NestJS y el método hipótesis→evidencia. DevTools y métodos de `console` serán diagnóstico/JIT. Quitar límites de cinco minutos y prohibiciones de `console.log`. Absorber debugging avanzado general de 4.6. Ejercicio: bug real de endpoint. |
| **1.2 JavaScript Internals** | **Mantener corto** | Event loop útil como núcleo; distinguir browser de fases de Node/libuv. Closures/prototypes/`this` serán diagnóstico. V8 y dual CJS/ESM quedan JIT. Un solo ejercicio de predicción y comprobación. |
| **1.3 Testing Fundamentals** | **Fusionar progresivamente con 4.4** | Convertirlo en dueño único de testing y verificación: riesgo, comportamiento, mocks, integración, property-based/fuzzing básico y caso adversarial. AAA y coverage en bloques breves. Un artefacto, no un ejercicio por subtema. |
| **1.4 Seguridad Aplicada** | **Mantener crítico** | Añadir threat modeling, trust boundaries, autorización por objeto/tenant, least privilege, secretos/PII en prompts y supply chain. OAuth avanzado después de redes/TLS. Sustituir implementación OAuth desde cero por diagrama y auditoría. Quitar cifras “90 %” y absolutos. |
| **1.5 Estructuras de Datos y Algoritmos** | **Resumir fuertemente** | Mantener Big O, Array/Map/Set/Queue y elección basada en operaciones. Linked lists, árboles, grafos, sorting y DP pasan a apéndice JIT. Quitar implementaciones obligatorias. Eliminar el archivo duplicado `Ejemplo Paso a Paso Hash Tables.md` tras trasladar su plantilla útil. |
| **1.6 AI Literacy** | **Mantener crítico** | Enfocar en límites empíricos, alucinación, contexto, permisos y evidencia. Temperature será una nota práctica, no una taxonomía. Conectar con 4.13 sin repetir fundamentos y exigir un ciclo pequeño de delegación/auditoría. |
| **1.7 Documentación Técnica Profesional** | **Reescribir como Requirements, decisiones y explicación** | Fusionar PRD+RFC en una spec verificable: objetivo, no-objetivos, invariantes, ejemplos, contraejemplos y aceptación. Mantener ADR y README. Integrar explicación oral y comunicación de trade-offs desde 1.9. Eliminar stack FreePress predecidido. |
| **1.8 Metodologías y Procesos** | **Disolver como tema activo** | Mover protocolo AI y proceso transversal a `METODOLOGIA.md`; review avanzado a 4.7; estimación como práctica de incertidumbre; Agile/branching como diagnóstico o referencia. `The Phoenix Project` será enriquecimiento. |
| **1.9 Soft Skills Técnicos** | **Disolver e integrar** | Explicar/enseñar se vuelve cierre de unidades críticas; stakeholders y decisiones pasan a 1.7/System Design; postmortem a 4.5. Liderazgo/mentoría queda JIT para el rol. |

### Etapa 2

| Tema | Decisión | Cambios planificados |
|---|---|---|
| **2.1 TypeScript Avanzado** | **Diagnóstico/JIT** | Mantener discriminated unions, narrowing y exhaustividad. Quitar type puzzles, recrear utility types y declaraciones complejas como requisitos. `tsconfig` se audita solo en opciones relevantes. Añadir comparaciones puntuales con Python/Rust, sin crear rutas nuevas. |
| **2.2 Build Tools y Bundlers** | **Ruta Web JIT** | Sacarlo de la ruta activa. Mantener una referencia breve sobre ESM, tree shaking y diagnóstico de bundle. Vite, monorepos y packaging dual solo por necesidad real. |
| **2.3 Performance Engineering** | **Mantener orientado a backend** | Profiling, baseline, p50/p95/p99, variabilidad y carga. Mover Core Web Vitals a Web. SQL/EXPLAIN se enseña en 2.4 y aquí se reutiliza. Unificar herramienta de carga con 2.7/2.12. Cache solo después de medir. |
| **2.4 SQL y Modelado Relacional** | **Mantener crítico con diagnóstico** | Conservar modelado, constraints, transacciones, isolation, índices y EXPLAIN. Reducir ejercicios a un modelo, una carrera y un plan antes/después. Eliminar cifras “80 %” y recursos redundantes. |
| **2.5 Bases No-Relacionales** | **Condensar a criterio de decisión** | PostgreSQL por defecto; comparar garantías por operación. MongoDB profundo, Elasticsearch y Redis avanzado serán JIT. Mantener un caso de “no migrar” y un uso concreto de Redis solo si se justifica. |
| **2.6 Migraciones y Schema Evolution** | **Mantener y recortar** | Expand-contract, índices concurrentes, backups comprobados y roll-forward. Fusionar los dos bloques repetidos de rollback. Usar una herramienta conocida, no comparar tres. Un ejercicio de cambio compatible. |
| **2.7 Concurrency y Parallelism** | **Mantener** | I/O-bound vs CPU-bound, bloqueo del event loop, una tarea en Worker Thread y carreras. Reutilizar la carrera SQL de 2.4; no repetir herramientas de carga. Añadir puente conceptual opcional a Rust y data races. |
| **2.8 Git Avanzado** | **Diagnóstico crítico** | Priorizar object model suficiente para razonar, `bisect`, `reflog`, revert y recuperación de trabajo de agentes. Hooks, commitlint y rebase básico quedan como diagnóstico/JIT. |
| **2.9 Linux y Shell** | **Diagnóstico crítico** | Mantener pipes, `jq`, procesos, señales y graceful shutdown. Reducir el script de backup a exit codes, `set -euo pipefail`, `trap` y una restauración local. Slack/S3/systemd son extras. |
| **2.10 Paradigmas de Programación** | **Integrar en 3.2** | Conservar pureza/inmutabilidad, composición sobre herencia, cohesión y acoplamiento. RxJS es diagnóstico por experiencia Angular. No estudiar patrones como catálogo. |
| **2.11 Sistemas Operativos** | **Condensar dentro de runtime** | Conservar memoria/leaks, heap snapshots, streams y backpressure. Procesos se enlazan a 2.7; señales a 2.9. IPC avanzado queda JIT. Quitar el tercer ejercicio de graceful shutdown. |
| **2.12 Redes** | **Mantener crítico** | TCP/DNS/TLS/HTTP con `curl`, `dig` y `openssl`; Wireshark opcional. HTTP/3 operativo queda JIT. Reutilizar load test de 2.3. Quitar “siempre aparece en entrevistas”. |

### Etapa 3

| Tema | Decisión | Cambios planificados |
|---|---|---|
| **3.1 API Design** | **Mantener crítico** | Contrato, compatibilidad, versionado, paginación e idempotencia. OpenAPI como artefacto. gRPC y GraphQL JIT. No atar idempotency keys a Redis. Permitir documentación. Quitar “10 veces más barato”. |
| **3.2 Patrones de Arquitectura** | **Reescribir como diseño modular y evolución** | Empezar por cohesión, acoplamiento, information hiding, costo de abstracción y monolito modular. SOLID será una lente, no dogma. EDA conceptual; CQRS/Event Sourcing/microservicios JIT. Absorber 2.10 y parte de 4.10. |
| **3.3 DDD** | **Mantener estratégico, condensar táctico** | Priorizar lenguaje ubicuo, bounded contexts y context mapping. Entities/VO/Aggregates solo lo necesario para límites y consistencia. Team Topologies y tácticas profundas opcionales. |
| **3.4 Browser** | **Ruta Web JIT** | Retirar del itinerario personal. Mantener como referencia para problemas de rendering/SEO. Ningún ejercicio obligatorio. |
| **3.5 State Management** | **Ruta Web JIT** | Retirar del itinerario. Conservar solo el marco local/shared/server/URL y eliminar repetición de recursos de Signals. |
| **3.6 System Design** | **Mantener** | Requirements, estimación de capacidad, trade-offs y un postmortem real. CAP solo se aplica enlazando 3.10; brokers enlazan 3.9. Entrevistas de system design se usan para comunicar, no como realidad operativa. |
| **3.7 Testing Frontend** | **Ruta Web JIT** | Eliminar fundamentos repetidos; conservar solo matiz frontend y visual regression JIT. No bloquea la ruta Backend. |
| **3.8 Accesibilidad** | **Ruta Web/Product opcional** | Mantener como referencia de calidad para productos, no como bloqueo. Permitir consultar APG/WCAG; eliminar cifras y memorización de atributos. |
| **3.9 Messaging y Event Streaming** | **Mantener base Backend** | Queues, delivery semantics, publisher confirms, outbox/inbox, retries, idempotencia y evolución de eventos. RabbitMQ/Kafka como decisiones, no instalaciones obligatorias. Kafka/Avro/Schema Registry JIT. Romper el párrafo gigante de schemas. |
| **3.10 Sistemas Distribuidos** | **Mantener base Backend** | Dueño único de CAP, fallos parciales, consistencia, Saga y quorum. Raft/Paxos conceptuales. Ejercicio pequeño de retry/idempotencia o lag; no obligar topologías complejas. |

### Etapa 4

| Tema | Decisión | Cambios planificados |
|---|---|---|
| **4.1 Containerización** | **Diagnóstico/JIT** | Convertir en checklist aplicada a un Dockerfile real: multi-stage, non-root, caché, `.dockerignore`, escaneo. No exigir cero CVEs sin fix. Healthchecks se integran en entrega/operación. |
| **4.2 CI/CD** | **Mantener y adelantar** | GitHub Actions: lint, typecheck, tests, build, scan y artifact/image. Deploy strategies se entienden; solo implementar la que use el proyecto. Reemplazar AWS por GHCR/Artifact Registry y quitar “único firewall”. |
| **4.3 Cloud Fundamentals** | **Mantener práctico en GCP** | Aunque se usa GCP, hay poca experiencia desplegando: no tratarlo como dominado. Reescribir ejemplos a Cloud Run, Cloud SQL, Storage, IAM, Logging y Artifact Registry. Priorizar managed vs self-hosted y un deploy pequeño. |
| **4.4 Testing Backend y API** | **Fusionar en 1.3** | Testcontainers/integración, invariantes/property tests y un E2E crítico. Pact y suites grandes JIT. El archivo quedará como alias o profundización enlazada, no otro tema que completar. |
| **4.5 Observabilidad** | **Reescribir como Observabilidad y SRE** | Logs estructurados, correlation ID, RED/USE, SLI/SLO, alertas por síntoma, runbook, rollback/roll-forward, RPO/RTO y restore de backup. Sustituir Loki+Prometheus+Grafana+Jaeger separados por un incidente integrado con el stack mínimo. |
| **4.6 Debugging Avanzado** | **Fusionar** | Heap snapshots se integran en 2.11; debugger en 1.1; debugging ajeno en 4.7; `strace`/`tcpdump` JIT. Eliminar cifras 90/10. |
| **4.7 Leer Código y Code Review** | **Mantener crítico y ampliar** | Code archaeology, lectura de flujo, smells con evidencia, debugging ajeno y revisión de AI. Absorber mantenibilidad práctica de 4.10 y convertir el protocolo de coding agents en ejercicio evaluable. |
| **4.8 AI Engineering** | **Reescribir como Ingeniería con coding agents** | Priorizar contratos de tarea, contexto mínimo, permisos, sandbox/worktree, revisión de diff, checks, adversariales, stop conditions, rollback, procedencia, evals y seguridad. Structured outputs/tool use quedan como base; agente redactor y multi-agent JIT. Añadir estadística mínima para evals. |
| **4.9 MCP y RAG** | **Especialización AI de producto JIT** | No forma parte del criterio de salida. Implementar solo si un baseline exige integración o recuperación. Reutilizar el modelo conceptual de embeddings de 4.13; crear un índice mínimo aquí únicamente si el caso lo justifica. |
| **4.10 Mantenibilidad y Deuda** | **Fusionar con 3.2 y 4.7** | Diseño y costo de complejidad en 3.2; characterization tests, refactor y legacy en 4.7. Mantener frontera detectar→corregir y una sola referencia a Fowler/Clean Code con contraste. |
| **4.11 Kubernetes y GitOps** | **Plataforma JIT** | Alternativas simples primero. Kubernetes solo por requisito real de trabajo/escala; GitOps después. No es parte de la ruta personal inicial. |
| **4.12 IaC** | **Plataforma JIT** | Terraform con GCP, state/locking y un `plan` pequeño. Ansible solo si aparece configuración de hosts. No cuenta para cerrar Backend+Agentes. |
| **4.13 Fundamentos ML/AI** | **Mantener crítico antes de 4.8** | Añadir matemáticas aplicadas: vectores/producto punto para embeddings/atención, probabilidad e incertidumbre. Cerrar con una eval pequeña de coding agents; no crear una vector database dentro del núcleo. |
| **4.14 Open Source** | **Opcional de carrera** | Útil para portfolio, pero no exigir merge de terceros ni publicación pública. Done basado en PR bien preparada o paquete publicable con CI. Ejecutar después del primer hito si aporta al cambio laboral. |
| **4.15 i18n, Regex y WASM** | **Disolver** | i18n pasa a Web/Product; regex queda como referencia en parsing/seguridad con catastrophic backtracking; WASM se archiva como JIT. Eliminar el cajón de sastre del roadmap activo. |

## 6. Matemáticas y lenguajes sin crear otra carrera

### Matemáticas aplicadas

No crear una etapa matemática separada. Integrar una franja máxima de unas dos horas semanales en puntos donde resuelve un problema:

- 1.5: funciones, crecimiento asintótico, logaritmos y conteo de operaciones.
- 2.3: distribuciones, percentiles, variabilidad, muestras e intervalos intuitivos.
- 3.6: estimaciones, órdenes de magnitud y capacidad.
- 4.13: vectores, producto punto, matrices y probabilidad básica.
- 4.8: precision, recall, falsos positivos, base rates, slices y comparación con baseline.

Cálculo, optimización y ML matemático profundo quedan para una segunda ruta si después surge interés por modelos, no solo por agentes.

### Lenguajes

- **TypeScript:** ejemplos de backend y código laboral familiar.
- **Python:** un ejercicio de estadísticas/evals o automatización AI; suficiente para leer código del ecosistema.
- **Rust:** comparaciones puntuales en memoria/concurrencia y un laboratorio opcional posterior.
- **Lua:** JIT cuando aparezca scripting, configuración o extensión de una herramienta concreta.

Ninguno añade un bloque obligatorio al primer ciclo.

## 7. Criterios editoriales para todos los temas

Al implementar, cada unidad activa debe cumplir:

1. una frase de propósito relacionada con Backend o supervisión de agentes;
2. prerrequisitos explícitos;
3. alcance `activo`, `diagnóstico` o `JIT`;
4. máximo un ejercicio principal de 45–120 minutos;
5. una alternativa de aplicación en proyecto, no una segunda obligación;
6. un Done basado en evidencia, justificación y reconocimiento de incertidumbre;
7. ninguna exigencia de memorizar APIs o resolver “sin consultar documentación”;
8. ningún límite de minutos como definición de dominio;
9. máximo tres recursos: primario, práctico y opcional;
10. sin porcentajes, superlativos ni absolutos sin fuente;
11. sin proveedor obligatorio cuando el concepto sea agnóstico;
12. cross-link a la única explicación canónica de cada concepto duplicado.

### Plantilla objetivo de tema

```md
# ID — Nombre

> Estado: ACTIVO | DIAGNÓSTICO | JIT
> Prerrequisitos: ...
> Propósito: ...

## Modelo mínimo
...

## Ejercicio principal
...

## Done cuando
- Artefacto observable
- Evidencia independiente
- Caso negativo o límite conocido
- Explicación breve con incertidumbre

## Si necesitas profundizar
- Fuente primaria
- Práctica
- Opcional
```

## 8. Orden de implementación futura

Este orden reduce riesgo y evita reescribir enlaces varias veces:

1. **Cerrar cambios pendientes actuales:** confirmar que las eliminaciones y referencias ya solicitadas queden consistentes.
2. **Documentos globales:** README, ROADMAP y metodología con la estructura de 19 unidades.
3. **Proyectos:** reemplazar FreePress por los tres proyectos pequeños.
4. **Etapa 1:** diagnóstico, requirements, testing, seguridad y AI literacy.
5. **Etapa 2:** runtime, datos, redes, performance y migraciones.
6. **Etapa 3:** diseño modular, API, DDD, distribuidos, messaging y system design.
7. **Etapa 4:** GCP/entrega, SRE, code review y coding agents.
8. **Disolver/archivar aliases:** 1.8, 1.9, 2.10, 4.4, 4.6, 4.10 y 4.15 después de mover su contenido único.
9. **Recursos y enlaces externos:** revisar únicamente los recursos que sobrevivan al recorte.
10. **Revisión independiente final:** exactitud técnica, carga, coherencia de links y confirmación de que los 46 IDs tienen destino.

Cada etapa debe ser un commit independiente y validado. No mezclar todos los cambios en una sola reescritura difícil de revisar.

## 9. Validación de la implementación

La revisión se considerará implementada cuando:

- [ ] El README ya no identifica el objetivo con TypeScript.
- [ ] El roadmap activo contiene 19 unidades y tiene un final visible.
- [ ] Los 46 IDs anteriores apuntan a una unidad activa, diagnóstico o referencia JIT.
- [ ] Backend + coding agents es la ruta predeterminada.
- [ ] Web y plataforma avanzada no bloquean la finalización.
- [ ] No hay proyecto longitudinal obligatorio ni menciones contradictorias de FreePress.
- [ ] Cada unidad activa tiene un solo ejercicio principal y un Done pragmático.
- [ ] Testing contiene un oracle adversarial para código generado.
- [ ] Seguridad incluye trust boundaries y secretos/PII en contexto de agentes.
- [ ] Diseño modular precede a SOLID, DDD táctico y microservicios.
- [ ] Observabilidad incluye SRE, restore y rollback.
- [ ] Coding agents tiene un artefacto completo: contrato, aislamiento, diff, checks, adversarial y rollback.
- [ ] Las matemáticas aparecen aplicadas y acotadas, no como otra carrera.
- [ ] Los ejemplos cloud principales usan GCP.
- [ ] Los recursos retenidos responden y corresponden a su título.
- [ ] No quedan enlaces internos rotos, placeholders ni recursos duplicados.
- [ ] `git diff --check` pasa y una revisión independiente no encuentra bloqueos.

## 10. No objetivos

- Convertir el plan en una carrera universitaria completa de matemáticas o informática.
- Dominar simultáneamente TypeScript, Python, Rust y Lua.
- Implementar cada tecnología nombrada.
- Completar las cuatro especializaciones.
- Construir FreePress, un frontend completo, Kubernetes, Kafka, RAG o MCP para poder decir que el plan terminó.
- Eliminar documentación oficial del flujo de aprendizaje: saber consultarla es parte del dominio.
- Compensar inseguridad profesional acumulando contenido sin un resultado observable.

El plan terminado debe producir mejor juicio, evidencia y capacidad de explicación; no una checklist más larga.