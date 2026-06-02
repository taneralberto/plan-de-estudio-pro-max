# Observaciones — Revisión por Etapa

Notas críticas sobre contenido, estructura y mejoras detectadas al revisar cada etapa durante la Mejora 9.

---

## Etapa 1 — Entrada

### Estructura

| Archivo | Separadores `---` | Consistencia |
|---------|-------------------|--------------|
| 1.1 JavaScript Internals | ✅ Sí | Buena |
| 1.2 Debugging Básico | ✅ Sí | Buena |
| 1.3 Testing Fundamentals | ✅ Sí | Buena |
| 1.4 Seguridad Aplicada | ⚠️ Faltaban | Corregido — agregados en Mejora 9 |
| 1.5 ED&A | ⚠️ Usa `##` en vez de `---` | Ver nota abajo |
| 1.6 AI Literacy | ✅ Sí | Buena |
| 1.7 Documentación Técnica | ⚠️ Faltaban | Corregido — agregados en Mejora 9 |
| 1.8 Metodologías | ✅ Sí (parcial) | Ver nota sobre subtema 5 |
| 1.9 Soft Skills | ⚠️ Faltaban | Corregido — agregados en Mejora 9 |

### Observaciones por tema

#### 1.1 — JavaScript Internals
- **Buenísimo.** Estructura limpia, ejercicios universales, Done cuando claro y medible. El modelo de esta etapa.
- Los 4 subtemas cubren los conceptos más importantes del lenguaje. Nada sobra, nada falta.

#### 1.2 — Debugging Básico
- **Buenísimo.** Secuencia lógica (DevTools → Console → Node → Metodología). Los 4 subtemas se complementan bien.
- La progresión de "aprendé las herramientas" a "aprendé la metodología" es acertada.

#### 1.3 — Testing Fundamentals
- **Buenísimo.** El tema más largo de la etapa (6 subtemas) pero cada uno justifica su lugar.
- **Destacable:** Incluye código de ejemplo (AAA pattern, supertest) — es el único tema que lo hace y funciona muy bien.
- **Observación:** El subtema de AAA no tiene línea FreePress porque el ejercicio es universal ("reescribí 3 tests que hayas escrito"). Esto es correcto — no todo subtema necesita FreePress.

#### 1.4 — Seguridad Aplicada
- **Corregido:** Faltaban separadores `---` entre subtemas. Ahora están.
- **Buenísimo contenido.** Los 4 subtemas (OWASP, Auth, Supply Chain, Secrets) son exactamente lo que un dev necesita en Etapa 1.
- **Observación:** El subtema de Auth es denso (OAuth 2.0 + PKCE + JWT + RBAC en un solo subtema). Considerar si en una futura revisión vale la pena dividirlo en dos: uno de conceptos de auth y otro de implementación.

#### 1.5 — ED&A
- **Estructuralmente diferente** al resto: usa `##` headings como títulos de sección Y `- [ ]` checkboxes con el mismo texto, creando duplicación visual. Las tablas "En producción" son EXCELENTES pero únicas de este tema.
- **Decisión:** Dejo la estructura `##` porque las tablas "En producción" merecen su propio subtítulo. Pero la duplicación `## Big O` + `- [ ] Big O` es ruidosa en el renderizado. **Recomendación para futura revisión:** eliminar los `##` headings y dejar solo los `- [ ]` checkboxes, moviendo las tablas "En producción" a una sección dentro del checkbox.
- **Corregido en Mejora 9:** "el modelo de componentes de Angular" → "de frameworks" (universalizado,Angular es un framework específico que no todos usan). También "funciones de caching que vas a implementar en FreePress" → "funciones de caching" (universalizado).
- **Subtemas sin FreePress:** Arrays/Linked Lists, Algoritmos de ordenamiento, Recursión. Correcto — son conceptos abstractos donde una línea FreePress forzaría una conexión artificial.

#### 1.6 — AI Literacy
- **Perfecto como está.** No agregué líneas FreePress porque el tema es 100% conceptual — entender QUÉ es un LLM, POR QUÉ alucina, cómo funciona la temperature, y cuáles son sus limitaciones fundamentales. No hay ejercicio práctico que se conecte naturalmente con un proyecto de software.
- **Observación:** Es el tema más "filosófico" de la etapa. El regresivo de "predicción de siguiente token" está bien hecho y es la base de todo lo demás.

#### 1.7 — Documentación Técnica
- **Corregido:** Faltaban separadores `---`. Ahora están.
- **Contenido excelente.** Los 4 documentos (PRD, RFC, ADR, Tech Writing) son exactamente los que un dev junior/senior necesita aprender a escribir.
- **Observación:** La "Nota importante sobre los ADRs de FreePress" es un patrón que vale la pena replicar en otros temas cuando hay contexto específico del proyecto que modifica el ejercicio. Funciona bien.
- **Observación:** El ejercicio de ADR ahora es universal ("escribí 3 ADRs usando el formato MADR") con una línea FreePress que específica los ADRs retroactivos de FreePress. Esto es más limpio que forzar a TODOS a escribir sobre FreePress.

#### 1.8 — Metodologías y Procesos
- **Buen contenido.** Los 5 subtemas cubren el "sistema operativo" de un equipo.
- **Subtema 5 (AI como herramienta):** Tiene formato diferente — referencia a METODOLOGIA.md, no tiene "Por qué importa" completo, recursos son un one-liner. **Es intencional** porque el contenido completo está en METODOLOGIA.md y este subtema es solo un puntero. Pero vale la pena nota que un lector que vaya archivo por archivo se va a sentir desorientado. **Recomendación:** Considerar agregar una línea que diga "Este tema es un resumen operativo. Para la explicación completa con contexto y recursos, ver METODOLOGIA.md#la-regla-de-ai" más visible.
- **Cross-referencia implícita:** El ejercicio de branching pide escribir un ADR, conectando con el tema 1.7. Buen cross-link, pero es implícito. Considerar hacerlo explícito ("ver tema 1.7 para formato de ADRs").

#### 1.9 — Soft Skills Técnicos
- **Corregido:** Faltaban separadores `---`. Ahora están.
- **Buen contenido.** Los 3 subtemas (comunicación, mentoría, post-mortems) son Crucibles.
- **Observación:** Es el archivo más corto de la etapa (50 líneas vs promedio de 70-170). No necesariamente necesita más contenido — los 3 temas son densos en concepto y ligeros en ejercicio, lo cual es correcto para soft skills.
- **Sin FreePress en Mentoría** — correcto, porque enseñar es una habilidad universal que no necesita un proyecto específico.

### Observaciones cross-tema

1. **Consistencia de formato lograda:** Ahora todos los subtemas siguen el patrón **<span style="color: #29B6F6">Ejercicio</span>** (universal, azul) → **<span style="color: #FFA726">FreePress</span>** (opcional, naranja) → **Done cuando** (universal, primario). Los que ya eran universales no se tocaron.

2. **Regla aplicada para líneas FreePress:** Solo se agrega FreePress donde la conexión con el proyecto es natural y agrega valor. Subtemas puramente conceptuales (AI Literacy, Arrays/Linked Lists, Mentoría) no tienen línea FreePress — y está bien así.

3. **"En producción" tables son oro:** Las tablas de 1.5 que mapean conceptos a situaciones reales son EXCELENTES. **Recomendación fuerte:** Considerar agregar tablas "En producción" similares en otros temas de Etapas posteriores. Un "Big O — En producción" para el tema de bases de datos de Etapa 3 sería valiosísimo.

4. **Subtema 5 de 1.8 (AI) es un outlier estructural.** Referencia a otro archivo en vez de tener su propio contenido completo. Esto es intencional pero crea una asimetría notable. Si en una futura revisión se decide hacer este tema más autosuficiente, se puede expandir.

5. **Código de ejemplo solo en 1.3.** Testing Fundamentals tiene fragments de código inline (AAA pattern, supertest). Los demás temas no. No es un problema — testing se beneficia del código más que otros temas — pero es una inconsistencia estructural a tener en cuenta.

6. **1.5 tiene doble heading.** Cada subtema en 1.5 tiene `## Título` y luego `- [ ] **Título**`. Esto es redundante en el renderizado. No es bloqueante pero es ruidoso. Se deja como está por ahora porque las tablas "En producción" usan el `##` como subtítulo.

---

## Etapa 2 — Fundamentos

### Estructura

| Archivo | Separadores `---` | Consistencia pre-Mejora 9 |
|---------|-------------------|----------------------------|
| 2.1 TypeScript Avanzado | ⚠️ Faltaban + formato `##` | Usaba `## heading` + `- [ ]` contenido dentro |
| 2.2 Build Tools | ⚠️ Faltaban | Buena |
| 2.3 Performance Engineering | ✅ Ya tenía | **Modelo de la etapa** |
| 2.4 SQL y Modelado Relacional | ⚠️ Faltaban | Buena |
| 2.5 Bases de Datos No-Relacionales | ⚠️ Faltaban | Buena |
| 2.6 Data Migrations | ⚠️ Faltaban | Buena |
| 2.7 Concurrency y Parallelism | ⚠️ Faltaban | Buena |
| 2.8 Git Avanzado | ⚠️ Faltaban | Buena — único archivo con blockquote introductorio |
| 2.9 Linux y Shell | ⚠️ Faltaban | Buena |
| 2.10 Paradigmas | ⚠️ Faltaban | Buena |
| 2.11 Sistemas Operativos | ⚠️ Faltaban + **double heading** | Todos los subtemas tenían `## Heading` + `- [ ] Same Heading` |
| 2.12 Redes | ⚠️ Faltaban | Buena |

### Cambios aplicados

1. **Separadores `---` agregados** en todos los archivos excepto 2.3 (ya los tenía).
2. **2.1 reformateado:** de `## Heading` + `- [ ] contenido` a `- [ ] **Heading**` + contenido. Ahora consistente con el resto.
3. **2.11 double heading eliminado:** los `## Heading` redundantes se eliminaron, quedando solo `- [ ] **Heading**`.
4. **Ejercicio en azul (#29B6F6) y FreePress en naranja (#FFA726)** agregados en todos los subtemas.
5. **Líneas FreePressOrange** agregadas donde la conexión con el proyecto es natural y agrega valor.
6. **Ejercicios universalizados** — los ejercicios que referenciaban específicamente "FreePress", "Angular", o "NestJS" ahora son universales, con una línea FreePress naranja que específica la conexión.

### Universalizaciones por archivo

| Archivo | Referencias universalizadas |
|---------|--------------------------|
| 2.1 TypeScript | "FreePress tiene Angular en el frontend y NestJS en el backend" → "Cualquier proyecto con frontend y backend tiene dos tsconfig distintos" |
| 2.1 TypeScript | "Auditá el tsconfig.json de FreePress (frontend Angular + backend NestJS)" → universal + FreePress line |
| 2.2 Build Tools | "FreePress usa Angular" → framework-agnostic |
| 2.2 Build Tools | "proxy para las llamadas a la API de NestJS" → "API del backend" |
| 2.2 Build Tools | Monorepo structure hardcodes "apps/frontend (Angular), apps/backend (NestJS)" → genérico |
| 2.7 Concurrency | "NestJS sobre Node.js" → "Node.js" |
| 2.7 Concurrency | "endpoint de NestJS" → "endpoint" |
| 2.7 Concurrency | "manejo del error de unicidad en NestJS" → "en la capa de servicio" |
| 2.9 Linux | "proceso de NestJS" → genérico |
| 2.9 Linux | "handler de shutdown de NestJS" → "handler de shutdown" |
| 2.10 Paradigmas | "backend de FreePress en NestJS usa pipes, guards e interceptors" → "Cualquier framework de backend usa pipes, guards e interceptors" |
| 2.10 Paradigmas | "Angular usa RxJS" → "frameworks modernos usan RxJS" |
| 2.10 Paradigmas | Subtema Reactivo: "RxJS no es Angular magic" pero TODO el "Por qué importa" era Angular-specific → reescrito para ser framework-agnostic |
| 2.11 Sistemas Operativos | "app NestJS de FreePress" → "tu backend" |
| 2.3 Performance | Ejercicios específicos de FreePress → universales + línea FreePress |
| 2.4 SQL | "FreePress" en ejercicio → universalizado + FreePress line |
| 2.5 No-Relacionales | "FreePress" en ejercicio → universalizado + FreePress line |
| 2.6 Migrations | "_FreePress_" en Por qué importa → universalizado |
| 2.8 Git | Ya era universal ✅ |
| 2.12 Redes | Ya era universal ✅ |

### Observaciones por tema

#### 2.1 — TypeScript Avanzado
- **Reformateado** de `## Heading` + `- [ ] contenido` a `- [ ] **Heading**` + contenido. Era el único archivo de la etapa con ese formato.
- **skipLibCheck:** La línea original decía "skipLibCheck: true es un parche que esconde errores reales" — era dogmático. Lo suavicé a "es una decisión con trade-offs: reduce tiempo de compilación pero puede esconder errores reales". En proyectos grandes con muchas dependencias, `skipLibCheck` tiene justificación legítima.
- **3 subtemas** — justo y suficiente. No falta nada obvio.

#### 2.2 — Build Tools y Module Bundlers
- **5 referencias Angular/NestJS universalizadas** — era el segundo archivo con más acoplamiento a tecnología específica (después de 2.10).
- **Observación sobre Angular esbuild vs Vite:** La versión original decía "FreePress usa Angular con un toolchain basado en esbuild. Entender el modelo de Vite (que es el mismo modelo conceptual)" — esto es impreciso. Angular usa esbuild como bundler interno, Vite usa esbuild para transpilación. No es "el mismo modelo conceptual". Lo corregí a ser framework-agnostic.
- **3 subtemas** — bien elegidos. El de monorepos es muy práctico y justificado.

#### 2.3 — Performance Engineering
- **EL ARCHIVO MODELO.** Ya tenía `---`, ya era universal, ya tenía buen formato. Solo se agregaron colores y líneas FreePress.
- **Contenido excelente.** La secuencia Profiling → Web Perf → Caching → DB Perf → Load Testing tiene una progresión lógica impecable.
- **Cross-referencia explícita a 2.4** en Database Performance — buen ejemplo de cómo conectar temas.

#### 2.4 — SQL y Modelado Relacional
- **TypeORM en Done cuando:** Original decía "leer el código de una transacción de TypeORM" — lo universalicé a "leer el código de una transacción de tu ORM" + FreePress line. TypeORM aparece en recursos, lo cual es razonable como referencia de consulta.
- **3 subtemas** — suficientes y bien cubiertos. Normalización, ACID y SQL avanzado son los tres pilares.

#### 2.5 — Bases de Datos No-Relacionales
- **Solo 2 subtemas** — es el archivo más corto de la etapa junto con 2.6. Para un tema tan amplio, faltan subtemas obvios: MongoDB específicamente, CAP Theorem, Eventual vs Strong consistency. **Recomendación:** Considerar expandir en una futura revisión.
- **La "regla fundamental"** ("Usá PostgreSQL por default") es excelente estrategia pedagógica.

#### 2.6 — Data Migrations y Schema Evolution
- **Solo 2 subtemas.** Faltan subtemas obvios: herramientas de migración (TypeORM migrations vs Prisma migrate vs Flyway), versionado de datos semilla, estrategias de rollback. **Recomendación:** Considerar expandir.
- **Solapamiento con 2.3 y 2.4:** El subtema 2 (Índices) cubre EXPLAIN ANALYZE, índices compuestos, partial indexes — los mismos temas que 2.3 (Database Performance) y 2.4 (SQL avanzado). **Recomendación fuerte:** En 2.6, el foco debería ser MIGRATIONS + schema evolution, no重复 índices. El subtema de índices debería referenciar 2.3 y 2.4 en vez de repetir contenido, o combinar ambos temas de 2.6 en uno solo y agregar contenido sobre herramientas de migración.

#### 2.7 — Concurrency y Parallelism
- **Solapamiento GRAVE con 2.11.** El subtema 1 de 2.7 ("Concurrencia vs Paralelismo") y el subtema 1 de 2.11 ("Procesos, Threads y Concurrencia") cubren EXACTAMENTE el mismo contenido: proceso vs thread, event loop, Worker Threads. **Recomendación fuerte:** Diferenciarlos más. 2.7 debería enfocarse en Node.js (event loop, Worker Threads, primitivas de sincronización) y 2.11 en el sistema operativo (syscalls, memory management, signals). El event loop y Worker Threads deberían estar en UN lugar, no en dos.
- **"Node.js es single-threaded"** → Corregido a "Node.js ejecuta JavaScript en un solo hilo, pero usa el thread pool de libuv para operaciones de I/O". La versión original era imprecisa.
- **NestJS en ejercicio de race condition** → universalizado. El ejercicio ahora pide "un escenario real de race condition" genérico + línea FreePress para FreePress.

#### 2.8 — Git Avanzado
- **Único archivo con blockquote introductorio:** `> Movido desde la Etapa 1: Git es una herramienta del entorno de desarrollo, no una metodología de equipo.` Se mantiene porque da contexto valioso.
- **Ya era universal.** No necesitó universalización.
- **3 subtemas excelentes.** Modelo de objetos, comandos avanzados, hooks. Cada uno justificado.

#### 2.9 — Linux y Shell Productivo
- **Línea introductoria fuera de subtema:** `"Toda la Etapa 4 (Docker, CI/CD, cloud) asume que sabés moverte en un servidor Linux."` Se mantiene porque da contexto de por qué importa.
- **2 referencias NestJS universalizadas:** "proceso de NestJS" → genérico, "handler de shutdown de NestJS" → genérico.
- **Cross-referencia implícita con 2.11:** Señales (SIGTERM, SIGKILL) se mencionan en ambos archivos. En 2.9 como concepto práctico, en 2.11 como concepto de OS. La conexión es complementaria, no redundante.

#### 2.10 — Paradigmas de Programación
- **La corrección más importante de la etapa.** El subtema Reactivo decía "RxJS no es Angular magic" y LUEGO todo el "Por qué importa" era 100% específico de Angular: "Angular usa RxJS en su núcleo...", "FreePress en Angular los necesita bien usados". Contradicción flagrante. Se reescribió para ser framework-agnostic: "RxJS se usa extensivamente en frameworks modernos... Pero RxJS también es invaluable fuera de frameworks para manejar streams de eventos."
- **4+ referencias Angular/NestJS universalizadas en subtemas de FP y OOP.** El "Por qué importa" de FP decía "El backend de FreePress en NestJS usa pipes, guards e interceptors" → "Cualquier framework de backend usa pipes, guards e interceptors". OOP tenía "NestJS está construido sobre OOP con decoradores" → "Cualquier framework de backend moderno está construido sobre OOP con decoradores".

#### 2.11 — Sistemas Operativos (Profundizar)
- **Double heading eliminado.** Los 4 subtemas tenían `## Heading` + `- [ ] **Same Heading**`. Se eliminaron los `##` headings redundantes.
- **"app NestJS de FreePress"** universalizado a "tu backend" + línea FreePress.
- **Solapamiento con 2.7** — ver nota en 2.7.

#### 2.12 — Redes en Profundidad
- **Ya era universal.** No necesitó universalización.
- **4 subtemas bien elegidos:** TCP/IP, DNS, TLS, Latencia. Progresión lógica.
- **Falta subtema de HTTP/2 y HTTP/3.** Se menciona HTTP como protocolo de Application layer pero sin profundidad en las diferencias entre versiones. Dado que el mundo se mueve a HTTP/3 (QUIC), esto es relevante. **Recomendación:** Considerar expandir.

### Observaciones cross-tema — Etapa 2

1. **Formato consistente logrado:** Todos los archivos ahora usan `- [ ] **Heading**` como título de subtema, con `---` separadores entre ellos. 2.1 y 2.11 tuvieron cambios estructurales mayores.

2. **Solapamiento 2.7 ↔ 2.11 es el problema más serio de la etapa.** "Procesos, Threads y Concurrencia" se cubre en ambos archivos con contenido casi idéntico. Esto va a confundir al estudiante. **Acción recomendada:** Redistribuir — event loop y Worker Threads belong in 2.7 (Concurrency), procesos/threads como concepto de OS belong in 2.11 (Sistemas Operativos). Eliminar la duplicación del event loop.

3. **Solapamiento 2.3 ↔ 2.6 en índices.** "Database Performance" en 2.3 y "Índices" en 2.6 cubren EXPLAIN ANALYZE, índices compuestos, partial indexes. **Acción recomendada:** En 2.6, el subtema de índices debería referenciar 2.3 en vez de repetir contenido, o combinarse ambos subtemas de 2.6 en uno solo para hacer espacio a herramientas de migración.

4. **Archivos cortos (2.5 y 2.6):** Con solo 2 subtemas cada uno, el contenido es menor que el resto de la etapa. No es bloqueante, pero sí hay espacio para expandir.

5. **2.10 Reactivo contradiction fixed.** La versión original contradecía su propio título. Ahora es consistente: framework-agnostic en el cuerpo, FreePress en la línea naranja.

6. **2.3 es el modelo.** Si hay que elegir un archivo como referencia de formato, contenido y estructura para la Etapa 2, es 2.3.

---

## Etapa 3 — Arquitectura

### Estructura

| Archivo | Separadores `---` | Consistencia pre-Mejora 9 | Referencias FreePress/Angular/NestJS |
|---------|-------------------|----------------------------|--------------------------------------|
| 3.1 DDD | ⚠️ Faltaban (solo después del primer subtema) | Buena | Pesada — todos los Por qué importa y Ejercicios mencionan FreePress |
| 3.2 Patrones Arquitectura | ⚠️ Faltaban | Buena | Pesada — todos los subtemas mencionan FreePress/NestJS/Angular |
| 3.3 API Design | ⚠️ Faltaban | Buena | Pesada — API pública de FreePress como caso central |
| 3.4 Browser | ⚠️ Faltaban | Buena | Moderada — FreePress como caso de uso |
| 3.5 State Management | ⚠️ Faltaban | Buena | Pesada — NgRx, Angular Signals, FreePress como caso central |
| 3.6 System Design | ⚠️ Faltaban | Buena | Pesada — FreePress como caso de estudio en los 3 subtemas |
| 3.7 Testing Frontend | ⚠️ Faltaban | Buena | Moderada — FreePress como caso de uso en Testing Trophy y Visual Regression |
| 3.8 Accesibilidad | ⚠️ Faltaban | Buena | Moderada — FreePress como caso de uso |
| 3.9 Messaging | ⚠️ Faltaban | Buena | Pesada — FreePress con RabbitMQ/NestJS como implementación central |
| 3.10 Sistemas Distribuidos | ⚠️ Faltaban | Buena | Moderada — FreePress como caso de estudio |

### Cambios aplicados

1. **Separadores `---` agregados** en todos los archivos (ninguno los tenía consistente).
2. **Ejercicio en azul (#29B6F6) y FreePress en naranja (#FFA726)** aplicados en todos los subtemas de los 10 archivos.
3. **Líneas FreePress naranja** agregadas donde la conexión con el proyecto es natural.
4. **Universalización extensiva** — Etapa 3 era la etapa con MÁS referencias FreePress. Prácticamente cada Por qué importa y Ejercicio mencionaba FreePress como caso central. Se universalizó manteniendo la línea naranja como caso específico.

### Universalizaciones por archivo

| Archivo | Referencias universalizadas | Nota |
|---------|---------------------------|------|
| 3.1 DDD | "En FreePress" → "En un CMS como FreePress"; Ejercicio 1: "Mapeá los Bounded Contexts de FreePress" → universal; Ejercicio 2: "Modelá el dominio de FreePress" → universal; Ejercicio 3: "Dibujá el Context Map de FreePress" → universal | Los Por qué importa mantienen FreePress como ejemplo porque DDD se beneficia de ejemplos concretos de dominio |
| 3.2 Patrones | SOLID: "Tomá una clase de FreePress" → universal; EDA: "Cuando el módulo editorial de FreePress publica un artículo" → universal + FreePress line; EDA Ejercicio: "Diseñá el flujo de publicación de un artículo en FreePress usando EDA. Implementá en NestJS un EventEmitter" → universal Ejercicio + FreePress line con NestJS; CQRS: "dashboard de analytics de FreePress" → universal + FreePress line; API Design: "API pública de FreePress" → universal + FreePress line; Microservicios: "Analizá FreePress como si fuera a migrar" → universal + FreePress line | 3.2 era el archivo con MÁS acoplamiento FreePress — solo la introducción de SOLID era genérica |
| 3.3 API Design | "API pública de FreePress" presente en Por qué importa y ambos Ejercicios → universal + FreePress line; OpenAPI "para FreePress" → universal | 3.3 es un desprendimiento de 3.2, hereda su acoplamiento |
| 3.4 Browser | "editor de artículos de FreePress se siente lento" → "un editor de artículos se siente lento"; "grabá la carga de FreePress" → universal + FreePress line; Rendering: "Configurá Angular Universal (SSR) en el frontend de FreePress" → universal + FreePress line; "una SPA Angular sin SSR" → "una SPA sin SSR"; Web APIs: "Implementá tres features en FreePress" → universal + FreePress line | 3.4 tenía Angular hardcodeado en el ejercicio de SSR. Universalizado |
| 3.5 State Management | "En FreePress, los artículos publicados son server state" → "Los artículos publicados son server state"; "Ponerlos en NgRx" → "Ponerlos en un store global"; Testing Trophy: "listado de artículos de FreePress" → universal + FreePress line; "component.articles = []" → genérico; Patrones: "bookmarks en FreePress" → universal + FreePress line; Signals: "emigrá el currentUser$ observable" → universal + FreePress line | 3.5 tenía Angular/NgRx como tecnología central. Reescrito para ser genérico |
| 3.6 System Design | Capacity: "Hacé una capacity estimation de FreePress" → universal + FreePress line; Escalabilidad: "Diseñá FreePress para soportar 1M" → universal + FreePress line; Casos de estudio: "qué parte de esa solución podrías aplicar en FreePress" → universal + FreePress line | 3.6 usaba FreePress como caso de estudio constante. Universalizado |
| 3.7 Testing | "listado de artículos de FreePress" → universal + FreePress line; "Storybook en el frontend de FreePress" → universal + FreePress line; Componentes: ArticleCard, Button, Badge → se mantuvieron como ejemplos genéricos | Testing es framework-agnostic por naturaleza, así que la universalización fue más ligera |
| 3.8 Accesibilidad | "FreePress es un CMS" → "Un CMS tiene una audiencia que incluye lectores con discapacidades"; "Navegá FreePress usando SOLO el teclado" → universal + FreePress line; "editor de artículos de FreePress" → universal + FreePress line; "componente más complejo de la app" → se mantuvo como genérico | Accesibilidad es inherentemente universal — los problemas son los mismos en cualquier app |
| 3.9 Messaging | "FreePress tiene un sistema de notificaciones: cuando se publica un artículo, los suscriptores reciben un email" → Reescrito como universal; Ejercicio: "Implementá el sistema de notificaciones de FreePress con un message queue" → universal + FreePress NestJS line; "Para FreePress en sus primeras etapas, RabbitMQ o Redis Streams son casi siempre la respuesta correcta" → "Para proyectos en sus primeras etapas, RabbitMQ o Redis Streams son casi siempre la respuesta correcta"; Casos de estudio: "recomendación: Slack o YouTube — son los más relevantes para FreePress" → universal + FreePress line | 3.9 era MUY específico a NestJS y FreePress. Universalizado extensivamente |
| 3.10 Sistemas Dist. | "Cuando FreePress tenga réplicas de PostgreSQL" → universal; Ejercicio: "Demostrá CAP en FreePress con PostgreSQL" → universal + FreePress line; "En FreePress, publicar un artículo es una operación que puede tocar múltiples sistemas" → universal; Saga: "Diseñá el flujo de publicación de artículos de FreePress como una Saga" → universal + FreePress line; "etcd es el cerebro de Kubernetes" → se mantuvo (es factual) | 3.10 usaba FreePress como caso de estudio constante. Universalizado |

### Observaciones por tema

#### 3.1 — Domain-Driven Design (DDD)
- **3 subtemas excelentes.** Bounded Contexts → táctico → Context Mapping es la secuencia correcta.
- **DDD se beneficia enormemente de ejemplos concretos.** La universalización aqui fue más sutil: el Por qué importa de Bounded Contexts mantiene el ejemplo de "Article" porque DDD sin dominio concreto es teoría vacía. Pero el Ejercicio se universalizó: "Mapeá los Bounded Contexts de tu proyecto" en lugar de "de FreePress".
- **Cross-referencia implícita con 3.2.** Los conceptos de Bounded Context (3.1) son prerequisito directo para Event-Driven Architecture y CQRS (3.2). Esto es positivo.

#### 3.2 — Patrones de Arquitectura Avanzados
- **5 subtemas, pero sería mejor 4.** API Design está cubierto en profundidad en 3.3 (archivo dedicado). Tener REST/GraphQL/gRPC como subtema de 3.2 Y luego tener un archivo completo de 3.3 es redundancia. **Recomendación:** En 3.2, el subtema de API Design debería ser una introducción de 2-3 líneas que diga "Ver 3.3 para profundidad", no un subtema completo.
- **SOLID es prerequisito, no arquitectura.** SOLID es un principio de diseño de clases, no de arquitectura. Está bien como primer subtema porque sin SOLID no hay Clean Architecture, pero el estudiante debe entender que SOLID es base, no el objetivo.
- **Angular/NestJS eliminado del ejercicio EDA.** Original: "Implementá en NestJS un EventEmitter interno simple para `ArticlePublished`". Universalizado a "Implementá un EventEmitter interno simple", con NestJS mencionado solo en la línea naranja.

#### 3.3 — API Design
- **Solapamiento con 3.2.** REST, GraphQL y gRPC se cubren en ambos archivos. 3.2 tiene un subtema completo sobre API Design y 3.3 profundiza. Es mejor que 3.2 solo mencione brevemente que 3.3 existe. **Recomendación:** Reducir el subtema de API Design en 3.2 a una referencia cruzada, o eliminarlo.
- **Contenido excelente.** Los tres subtemas (contrato REST, versionado/paginación/idempotencia, GraphQL sí/no) son exactamente lo que un dev necesita saber sobre APIs.
- **Nota blockquote bien colocada.** La nota al inicio que referencia 3.2 es útil para evitar confusión.

#### 3.4 — Cómo funciona el Browser
- **"Configurá Angular Universal (SSR)" universalizado.** Original mencionaba Angular específicamente en el ejercicio de SSR. Ahora dice "Configurá Server-Side Rendering en tu frontend" con línea naranja para Angular Universal.
- **3 subtemas bien elegidos.** Critical Rendering Path → Rendering modes → Web APIs. Progresión lógica.
- **Web APIs es oro.** IntersectionObserver, AbortController, Web Workers — la mayoría de los devs no conoce estas APIs y las necesitan. Bien elegido.

#### 3.5 — State Management
- **Angular/NgRx desmarried de los conceptos.** Original: "Un proyecto Angular grande con múltiples features complejas puede justificar NgRx". Ahora: "Un proyecto grande con múltiples features complejas puede justificar un store global". Los conceptos de state management son universales, no Angular-específicos. Bien.
- **La referencia a Angular Signals se mantuvo** porque es el framework del estudiante, pero se contextualizó: "Angular, Solid, Preact y Vue los adoptaron".
- **3 subtemas perfectos.** El problema → los patrones → Signals. Cada uno justifica al siguiente.

#### 3.6 — System Design en Profundidad
- **3 subtemas excelentes.** Cómo pensar → Patrones → Casos de estudio. Progresión perfecta.
- **FreePress como caso de estudio permanente eliminado.** Original: "capacity estimation de FreePress", "Diseñá FreePress para 1M de MAU", "qué parte de esa solución podrías aplicar en FreePress". Universalizado, con línea naranja.
- **Recomendación:** Los recursos de highscalability.com y ByteByteGo son muy buenos. Sin cambio.

#### 3.7 — Testing Frontend
- **Nota sobre prerequisito.** Dice "continuación directa de 4.10 — Testing Backend y API". Esto es una buena cross-referencia.
- **2 subtemas suficientes** para una introducción a testing frontend. Testing Trophy cubre la filosofía y Visual Regression cubre lo práctico.
- **Testing Trophy universalizado.** Original: "Escribí tests de integración para el componente de listado de artículos de FreePress". Ahora: "escribí tests de integración para el componente de listado de artículos de tu proyecto".
- **`component.articles = []` sin comillas de código invertidas.** Comentario menor: en el Por qué importa, se usa `component.articles = []` sin formato de código inline. Verificar en futuro pass.

#### 3.8 — Accesibilidad (a11y)
- **El más universal de la etapa.** Accesibilidad es inherentemente universal. Los cambios fueron menores: "FreePress es un CMS" → "Un CMS tiene una audiencia..."
- **2 subtemas bien elegidos.** WCAG principles → Componentes concretos. De lo general a lo específico.
- **"En muchos países, la accesibilidad web es un requisito legal"** — buena justificación práctica que va más allá de "es lo correcto".

#### 3.9 — Messaging y Event Streaming
- **2 subtemas excelentes.** El problema → RabbitMQ vs Kafka. Simple y directo.
- **Original MUY acoplado a NestJS.** "Implementá en NestJS usando `@golevelup/nestjs-rabbitmq`" era la implementación central del ejercicio. Ahora: universal + línea naranja.
- **"Para FreePress en sus primeras etapas, RabbitMQ o Redis Streams son casi siempre la respuesta correcta"** → universalizado a "Para proyectos en sus primeras etapas". importante porque esto es un principio general, no específico de FreePress.
- **Recomendación:** Considerar agregar un tercer subtema sobre event schema design (schema registry, Avro vs JSON, breaking vs non-breaking changes). Es el siguiente paso lógico después de elegir el broker.

#### 3.10 — Sistemas Distribuidos
- **3 subtemas impecables.** CAP → Eventual Consistency/Sagas → Consensus. Progresión lógica perfecta.
- **FreePress era el caso de estudio en todos los subtemas.** Universalizado extensivamente: "Cuando FreePress tenga réplicas" → "Cuando tengas réplicas", "En FreePress, publicar un artículo" → "Publicar un artículo", etc.
- **"It's consensus applied"** — en el Por qué importa de Consensus, esta frase en inglés dentro de un texto en español. Verificar en futuro pass si se quiere traducir o mantiene como referencia técnica.

### Observaciones cross-tema — Etapa 3

1. **Etapa 3 era la etapa con MÁS acoplamiento FreePress.** Prácticamente todos los "Por qué importa" y "Ejercicios" mencionaban FreePress como caso central. La universalización fue extensiva: se reescribieron Por qué importa, Ejercicios y Done cuando para ser genéricos, con líneas naranja para FreePress donde aplica.

2. **Solapamiento 3.2 ↔ 3.3 en API Design.** 3.2 tiene un subtema completo sobre REST/GraphQL/gRPC y 3.3 es un archivo dedicado al mismo tema. Es redundancia significativa. **Acción recomendada:** Reducir el subtema de API Design en 3.2 a una referencia cruzada (2-3 líneas + "ver 3.3 para profundidad"), o eliminarlo directamente.

3. **Angular/NestJS desmarried de conceptos universales.** State Management, EDA, y CQRS son conceptos que aplican a cualquier stack. La versión original presentaba estos conceptos como si fueran específicos de Angular/NestJS. La versión universalizada mantiene la línea naranja para la conexión FreePress, pero los conceptos son stack-agnostic.

4. **Ningún archivo tenía separadores `---`.** A diferencia de Etapa 2 donde 2.3 era el modelo con separadores, en Etapa 3 ningún archivo los tenía consistentemente. Algunos archivos tenían un `---` después del primer subtema pero no entre los demás.

5. **3.4 SSR exercise era Angular-specific.** "Configurá Angular Universal (SSR) en el frontend de FreePress" → universalizado a "Configurá Server-Side Rendering en tu frontend" con Angular Universal en la línea naranja.

6. **Capacidad de observación:** Etapa 3 tiene 10 archivos con un total de ~24 subtemas. Es la etapa más densa. Los temas están bien elegidos y en buen orden. El mayor problema estructural es el solapamiento 3.2/3.3.

---

## Etapa 4 — Profundización

### Estructura

| Archivo | Separadores `---` | Consistencia pre-Mejora 9 | Referencias FreePress/Angular/NestJS |
|---------|-------------------|----------------------------|--------------------------------------|
| 4.1 Containerización | ⚠️ Faltaban | Buena | Pesada — ambos ejercicios y Por qué importa |
| 4.2 CI/CD | ⚠️ Faltaban | Buena | Pesada — todos los ejercicios mencionan FreePress |
| 4.3 Cloud | ⚠️ Faltaban | Buena | Pesada — deploy de FreePress, serverless para FreePress |
| 4.4 Testing Backend | ⚠️ Faltaban + double space | Buena | Pesada — todos los ejercicios mencionan FreePress/NestJS |
| 4.5 Observabilidad | ⚠️ Faltaban | Buena | Pesada — logs de FreePress, métricas de NestJS, tracing de FreePress |
| 4.6 Debugging | ⚠️ Faltaban | Buena | Moderada — ejercicios de debugging en FreePress/NestJS |
| 4.7 Leer Código/Review | ⚠️ Faltaban (algunos sí) | Buena | Baja — ejercicio 3 (code smells) y ejercicio 4 (AI review) |
| 4.8 AI Engineering | ⚠️ Inconsistentes | Buena | Moderada — Ejercicio 4 (AI Safety) y Por qué importa |
| 4.9 Construir con AI | ⚠️ Faltaban (RAG) | Buena | MUY pesada — el MCP y RAG están centrados en FreePress/fp-ai-assistant |
| 4.10 Mantenibilidad | ⚠️ Faltaban | Buena | Pesada — ambos ejercicios mencionan FreePress |
| 4.11 Orquestación | ⚠️ Faltaban | Buena | Pesada — deploy de FreePress en K8s |
| 4.12 IaC | ⚠️ Faltaban | Buena | Moderada — infra de FreePress en Terraform |
| 4.13 ML-AI Fundamentals | ⚠️ Faltaban | Buena | Moderada — ejercicios con FreePress |
| 4.14 Open Source | ⚠️ Faltaban | Buena | Moderada — contribuir a deps de FreePress, extraer utils de FreePress |
| 4.15 Temas pocos dominan | ⚠️ Faltaban | Buena | Pesada — i18n en FreePress, regex para FreePress, WASM en FreePress |

### Cambios aplicados

1. **Separadores `---` agregados** en todos los archivos que no los tenían.
2. **Ejercicio en azul (#29B6F6) y FreePress en naranja (#FFA726)** aplicados en todos los subtemas.
3. **Líneas FreePress naranja** agregadas donde la conexión natural aplica.
4. **Universalización extensiva** — Etapa 4 era la segunda etapa con más referencias FreePress (después de Etapa 3). Prácticamente todos los ejercicios y muchos "Por qué importa" mencionaban FreePress.
5. **Double space corregido en 4.4** — cinco subtemas tenían `- [ ]  **` (doble espacio) en lugar de `- [ ] **`.

### Observaciones por tema

#### 4.1 — Containerización Avanzada
- **2 subtemas** — Docker avanzado y Docker Compose. Bien elegidos para la etapa.
- **Por qué importa 1** ya era bastante universal (habla de Node.js en general). Bien.
- **Ejercicio 1** universalizado: "Tomá los Dockerfiles actuales de tu proyecto" + línea FreePress para Angular/NestJS.

#### 4.2 — CI/CD
- **3 subtemas** — Pipelines, Deploy Strategies, GitOps. Progresión lógica excelente.
- **GitOps** referencia a 4.7 (cross-reference). Positivo.
- **Feature flags exercise** era "Implementá feature flags en FreePress usando una tabla simple en PostgreSQL" → universalizado. Bien.

#### 4.3 — Cloud Fundamentals
- **3 subtemas** — Cloud services, Serverless, Managed vs Self-hosted. Excelente selección.
- **Serverless Por qué importa** tenía "Para FreePress, casos de uso naturales son: procesar imágenes..." → universalizado a "Para un CMS, casos de uso naturales son..." + FreePress line.

#### 4.4 — Testing Backend y API
- **5 subtemas** — el archivo más largo de la etapa. Fundamentals → Trophy → Unit → Integration → E2E.
- **Testing Fundamentals** ya era muy universal. Bien.
- **Double space en checkboxes** — original tenía `- [ ]  **` (doble espacio). Corregido a `- [ ] **`.
- **Nota al inicio:** "Testing es una disciplina de diseño" — buena apertura.

#### 4.5 — Observabilidad
- **3 subtemas** — Logs, Métricas, Tracing. Los 3 pilares. Excelente.
- **Por qué importa de Tracing** era MUY específico: "Cuando un request de FreePress tarda 3 segundos y pasa por el backend NestJS, luego a PostgreSQL, luego a Redis, luego a un servicio de thumbnails" → universalizado manteniendo la secuencia sin FreePress.
- **NestJS específico en métricas:** "`@willsoto/nestjs-prometheus`" → movido a línea FreePress, ejercicio universalizado.

#### 4.6 — Debugging Avanzado
- **2 subtemas** — corto pero enfocado. El primero referencia a 1.2 (Debugging Básico).
- **Ejercicio 3 partes** universalizado: cada parte referenciaba FreePress/NestJS específicamente.

#### 4.7 — Leer Código Ajeno y Code Review
- **4 subtemas** — Archaeology, Code Review, Code Smells, AI Code Review. Excelente cobertura.
- **Warning al inicio:** "Habilidad crítica en la era de AI" — buen framing.
- **Ejercicio de AI code review** ahora es más universal: "generá una feature para tu proyecto" + FreePress line.
- **Ya tenía `---` entre algunos subtemas** pero no todos. Corregido.

#### 4.8 — AI Engineering
- **3 subtemas** — API, Evals, Agentic Patterns, AI Safety (4 total con la nota). Muy actual.
- **La línea FreePress naranja YA ESTABA** en el primer subtema (fp-ai-assistant). Se mantuvo.
- **Evals Por qué importa** tenía "romper el feature de moderación de FreePress" → universalizado.
- **AI Safety Por qué importa** tenía "FreePress es un CMS público" → "Un CMS público" + FreePress line.

#### 4.9 — Construir con AI
- **2 subtemas** — MCP y RAG. MUY orientados a FreePress/fp-ai-assistant.
- **MCP era 100% FreePress.** El ejercicio entero era "Construí un MCP server completo para FreePress". Universalizado: "Construí un MCP server completo en TypeScript usando el SDK oficial de MCP" + FreePress line para conectar con FreePress.
- **RAG era 100% FreePress.** El ejercicio era "Implementá un asistente RAG completo para FreePress". Universalizado: "Implementá un asistente RAG completo" + FreePress line.
- **Nota al final** sobre "Prompts para arquitectura" — se mantiene.

#### 4.10 — Mantenibilidad y Deuda Técnica
- **2 subtemas** — Refactoring y Legacy Code. Corto pero poderoso.
- **Warning al inicio:** "Práctica continua — no esperés a llegar a la Etapa 4" — excelente framing.
- **Ejercicio de Refactoring** universalizado: "Elegí el módulo más complejo de tu proyecto".
- **Ejercicio de Legacy** universalizado: "Identificá en tu proyecto el módulo más viejo".

#### 4.11 — Orquestación de Containers
- **2 subtemas** — K8s y Alternativas. Bien equilibrado.
- **"Para FreePress en sus primeras etapas, ese overhead es puro costo sin beneficio"** → "Para un proyecto en sus primeras etapas" — universalizado. Importante porque es un principio general.
- **Alternativas a K8s** lista separada de PaaS y herramientas — útil.

#### 4.12 — IaC
- **2 subtemas** — Terraform y Ansible vs Terraform. Complementarios.
- **Ejercicios universalizados** — "infraestructura de tu proyecto" en lugar de "de FreePress".

#### 4.13 — Fundamentos de ML-AI
- **2 subtemas** — Cómo funcionan los LLMs y Embeddings/Vector DB. Justo el conocimiento que un dev necesita.
- **Ejercicio de LLMs** referenciaba FreePress específicamente: "¿qué features tiene FreePress?" → universalizado a "sobre un proyecto que conozcas".
- **Embeddings ejercicio** era "Indexá los artículos de FreePress" → "Indexá artículos" + FreePress line.

#### 4.14 — Open Source
- **2 subtemas** — Contribuir y Crear librerías.
- **"Las dependencias principales de FreePress (TypeORM, NestJS, o Angular)"** → universalizado a "de tu proyecto" + FreePress line con los frameworks.
- **Por qué importa 2** tenía "FreePress va a acumular utilities..." → "Todo proyecto acumula utilities..." — universalizado.

#### 4.15 — Temas que Pocos Dominan
- **3 subtemas** — i18n, Regex, WASM. Excelente selección de temas poco cubiertos.
- **i18n Por qué importa** era totalmente FreePress: "FreePress tiene audiencia potencialmente global" → "Un CMS tiene audiencia potencialmente global" + FreePress line.
- **Regex Por qué importa** ya era universal ("En cualquier proyecto vas a necesitar validar emails, parsear slugs..."). No necesitó FreePress line.
- **WASM Por qué importa** era FreePress: "FreePress tiene un editor de contenido rico" → "Un editor de contenido rico puede demandar operaciones CPU-intensivas" + FreePress line.
- **WASM Done cuando** tenía "comunicar los resultados de vuelta al componente Angular" → "comunicar los resultados de vuelta al componente" — Angular removido.

### Observaciones cross-tema — Etapa 4

1. **Etapa 4 era la segunda etapa con MÁS acoplamiento FreePress** (después de Etapa 3). Prácticamente todos los ejercicios y "Por qué importa" mencionaban FreePress como caso central. La universalización fue extensiva.

2. **4.9 (Construir con AI) era 100% FreePress/fp-ai-assistant.** Los dos subtemas (MCP y RAG) estaban completamente centrados en FreePress. Se universalizaron pero el ejercicio FreePress sigue siendo natural — estos temas aplican directamente al proyecto.

3. **4.8 y 4.9 SON los archivos más FreePress-específicos de todo el plan.** AI Engineering y Construir con AI son donde FreePress tiene la conexión más natural — fp-ai-assistant es el proyecto que acompaña todo el plan de estudio. Las líneas naranja son especialmente importantes acá.

4. **4.4 (Testing Backend) tenía un error de formato:** 5 subtemas tenía doble espacio en el checkbox (`- [ ]  **`). Corregido.

5. **4.4 es el archivo más largo de la etapa** (5 subtemas, 92 líneas). Mantiene coherencia con 3.7 (Testing Frontend) que tiene 2 subtemas. La referencia entre ambos (4.4→3.7 y 3.7→4.4) es positiva.

6. **Archivos con blockquote introductorio:**
   - 4.4: "Testing es una disciplina de diseño"
   - 4.7: "Habilidad crítica en la era de AI"
   - 4.10: "Práctica continua — no esperés a llegar a la Etapa 4"
   - Todos valiosos y se mantienen.

7. **Temas de infraestructura (4.1-4.5, 4.11-4.12)** tenían referencias a NestJS/Angular/TypeORM en los ejercicios pero no en los conceptos. Los conceptos (Docker, CI/CD, Cloud, Observabilidad, K8s, Terraform) son inherentemente universales.

8. **15 archivos hacen de Etapa 4 la etapa más densa del plan.** Los temas cubren desde infraestructura (Docker, CI/CD, Cloud, Observabilidad, K8s, IaC) hasta habilidades profesionales (Debugging, Code Review, AI Engineering, Open Source) hasta fundamentos (ML-AI, Regex, i18n, WASM). La variedad es enorme.

---

*Mejora 9 completada — todas las etapas revisadas*