# Mejoras Pendientes v3 — Plan de Estudio Pro Max

Este archivo registra los problemas estructurales y metodológicos identificados en una revisión crítica del plan realizada el 20/04/2026. Es continuación de `Mejoras Pendientes v2.md` (cuyos items fueron implementados). No son errores de contenido técnico (el contenido sigue sólido) — son problemas de estructura, realismo, y usabilidad del plan como herramienta diaria.

**Cómo usar este archivo:**
- Cada mejora tiene suficiente contexto para trabajarla en una sesión futura sin necesidad de recordar la conversación original.
- El orden de los ítems refleja prioridad (los 🔴 primero).
- Cuando una mejora esté implementada, marcá su checkbox y agregá una nota de qué se hizo exactamente.
- Este archivo se trabaja junto a un agente de AI en sesiones iterativas — no es para resolver todo de una vez.

---

## 🔴 Mejora 1 — El plan sufre de "Scope Creep Académico"

- [ ] Pendiente de implementación

### El problema

El plan intenta cubrir demasiado: CS Fundamentals completos, JS/TS internals, arquitectura avanzada (DDD, Clean Architecture, System Design), DevOps/Cloud, bases de datos en profundidad, frontend avanzado, seguridad, performance, y AI Engineering.

**Los números no cierran:**
- 12-24 meses a 2-3 horas diarias = ~900-1800 horas totales
- Un tema 🔴 bien hecho (ciclo completo) puede tomar 10-15 horas
- Hay ~25 temas 🔴 = 250-375 horas solo para críticos
- Los 🟡 suman ~150 horas adicionales
- Los 🟢 suman más
- Los proyectos (FreePress + satélites) suman cientos de horas
- Checkpoints, repaso, debugging de errores propios: tiempo no contabilizado

**La realidad:** El plan es **irrealista en su completitud**. Y cuando un plan es irrealista, genera frustración y abandono — exactamente el problema que intenta resolver.

### Por qué importa

Un plan de estudios que promete más de lo que puede entregar crea una sensación permanente de "voy lento" o "no llego". Eso erosiona la motivación más que no tener plan. Es preferible un plan más chico que se completa a uno ambicioso que se abandona al 40%.

El lema "un tema bien entendido vale más que diez leídos por encima" está bien, pero el plan no aplica ese principio a sí mismo: intenta cubrir TODO en lugar de definir QUÉ ES LO ESENCIAL.

### Qué se necesita hacer

Crear dos tracks explícitos:

**1. Core Path (~15 temas 🔴 esenciales)** — lo que FORMA un ingeniero de software completo:
- Fase 0 completa (mentalidad y proceso)
- Fase 1.1 (Algoritmos y estructuras de datos)
- Fase 2.1 (JS Internals)
- Fase 2.2 (TypeScript Avanzado)
- Fase 5.1 (Seguridad Aplicada)
- Fase 5.2 (Performance Engineering)
- Fase 7.1 (SQL y Modelado Relacional)
- Fase 3.1 (DDD — Bounded Contexts)
- Fase 3.2 (Patrones de Arquitectura)
- Fase 4.1 (Containerización)
- Fase 4.5 (CI/CD)
- Fase 4.6 (Observabilidad)
- Fase 6.1 (Cómo funciona el Browser)
- Fase 8.2 (AI Engineering)
- Fase 9.2 (Debugging Avanzado)

Este Core Path debería ser completable en **12-15 meses** a ritmo sostenido.

**2. Advanced Track (el resto de temas)** — para profundizar según dirección de carrera:
- SO, Redes, Paradigmas (Fase 1.2-1.5)
- Build Tools, Git avanzado, Concurrency (Fase 2.3-2.5)
- System Design avanzado, Messaging, Sistemas Distribuidos (Fase 3.3-3.6)
- K8s, IaC, Cloud específico (Fase 4.2-4.4)
- Testing Frontend, a11y (Fase 6.3-6.4)
- NoSQL, Migrations (Fase 7.2-7.3)
- ML fundamentals, Proyectos AI (Fase 8.1, 8.3)
- Open Source, Deuda Técnica (Fase 9.1, 9.3)
- Temas que Pocos Dominan (Fase 9.4)

**Implementación práctica:**
- En la portada, agregar una sección "🎯 Core Path vs Advanced Track" con la distinción clara
- Marcar visualmente cada tema como [CORE] o [ADVANCED]
- El checkpoint de "completar el plan" se redefine como "completar el Core Path"
- El Advanced Track es optativo y se explora según intereses/carrera

### Archivos afectados

- `Plan de Estudio Pro Max.md` — agregar sección de Core Path vs Advanced Track
- Cada archivo de tema individual — agregar badge [CORE] o [ADVANCED] en el título

### Referencia de calidad

El criterio de éxito es: alguien que completa el Core Path en 15 meses siente que es un ingeniero de software completo, no que "le faltó la mitad del plan". Y alguien que continúa al Advanced Track sabe que es profundización optativa, no deuda pendiente.

---

## 🔴 Mejora 2 — La Fase 1 está posicionada para generar abandono

- [ ] Pendiente de implementación

### El problema

La Fase 1 (CS Fundamentals) es **la más abstracta y la menos gratificante inmediatamente** del plan entero. Incluye:
- Estructuras de Datos y Algoritmos
- Sistemas Operativos
- Redes en Profundidad
- Paradigmas de Programación
- Linux y Shell

Aunque el plan ya incluye un "desvío táctico" a la Fase 2.1 después de 1.1, el problema es más profundo: **el cerebro aprende mejor con victorias tangibles tempranas**. Estudiar SO, redes y algoritmos ANTES de tener código funcionando que se rompe y se arregla es pedir paciencia donde no debería ser necesaria.

El desvío actual ayuda, pero 2.1 (JS Internals) sigue siendo teórico. La primera vez que el estudiante escribe código con propósito real es cuando arranca FreePress — y eso está "después de Fase 0".

### Por qué importa

La Fase 1 es donde más gente abandona planes de estudio — no porque sea imposible, sino porque los resultados no son inmediatos. El plan lo reconoce ("Es la fase más densa y abstracta") pero no lo resuelve estructuralmente.

Victorias tempranas crean momentum. CS Fundamentals SIN contexto práctico previo es la receta para "esto es muy difícil, mejor sigo programando como siempre".

### Qué se necesita hacer

**Reordenar las primeras semanas para crear victorias tangibles:**

```
Semana 1: Fase 0 completa (mentalidad) → ya está bien
Semana 2-3: Fase 2.1 (JS Internals) + scaffold de FreePress
           → Código que falla y se arregla, contexto práctico
Semana 4-6: Fase 1.1 (Algoritmos) 
           → Ahora con contexto de haber escrito JS real
Semana 7-8: Fase 5.1 (Seguridad básica — auth en FreePress)
           → Algo ÚTIL y aplicable YA, feature tangible
Semana 9-10: Continuar Fase 1 (SO, Redes)
           → Con FreePress funcionando y motivación establecida
```

**Cambios concretos:**
1. Mover el scaffold de FreePress a Semana 2 (junto con JS Internals), no "al terminar Fase 0"
2. Incorporar seguridad básica (auth) como victoria temprana antes de continuar con CS Fundamentals
3. La Fase 1 sigue siendo importante, pero se hace DESPUÉS de haber probado que "esto sirve para algo"

**Implementación práctica:**
- Reescribir la sección "Por Dónde Empezar — Los Primeros 30 Días" con este nuevo orden
- Actualizar la tabla "Estado esperado de FreePress por fase" para reflejar que FreePress tiene scaffold + auth básico ANTES de terminar CS Fundamentals

### Archivos afectados

- `Plan de Estudio Pro Max.md` — sección "Por Dónde Empezar" reordenada
- `Plan de Estudio Pro Max.md` — tabla "Estado esperado de FreePress por fase" actualizada

### Referencia de calidad

El criterio de éxito es: alguien que llega a la Semana 4 tiene FreePress corriendo localmente, un auth básico funcional, y al menos un bug que arregló entendiendo JS Internals. Esa persona tiene momentum para aguantar CS Fundamentals.

---

## 🔴 Mejora 3 — Falta un sistema de tracking activo (PROGRESS.md)

- [ ] Pendiente de implementación

### El problema

Los "Done cuando" son excelentes — específicos y observables. Pero el plan es un documento pasivo. No hay manera de:

1. **Trackear qué temas están completados** sin abrir cada markdown individual
2. **Registrar la evidencia** (el código que escribiste, el ADR, el video explicativo)
3. **Saber en qué tema estás** sin navegar por la estructura de carpetas
4. **Ver el progreso histórico** de sesiones de estudio

El checkbox `[ ]` en cada tema está bien, pero vive disperso en ~40 archivos. No hay una vista unificada.

### Por qué importa

Un plan de estudios de 12-24 meses necesita una herramienta de gestión. Sin ella:
- El estudiante pierde tiempo buscando "¿en qué estaba?"
- No hay satisfacción visual de progreso (tachar una lista unificada es diferente a marcar un checkbox en un archivo perdido)
- Las sesiones de estudio se vuelven "¿qué hice la última vez?" en lugar de "continúo desde donde estaba"

Esto convierte el plan de documento pasivo a **herramienta activa de gestión de aprendizaje**.

### Qué se necesita hacer

Crear un archivo `PROGRESS.md` en la raíz del proyecto:

```markdown
# Progreso — Plan de Estudio Pro Max

> Última actualización: 20/04/2026

## 📍 En progreso actualmente
- [ ] 1.1 — Estructuras de Datos y Algoritmos 🔴
  - Arrancado: 15/04/2026
  - Estado: Paso 2 del ciclo (práctica hands-on)
  - Próxima sesión: Implementar HashMap con chaining

## ✅ Completados (Core Path)
- [x] 0.1 — Documentación Técnica Profesional 🔴 (completado: 10/04/2026)
  - Evidencia: `/docs/adr/0001-stack-decision.md`, `/docs/prd-wysiwyg.md`
- [x] 0.2 — Metodologías y Procesos 🔴 (completado: 12/04/2026)
  - Evidencia: RFC del sistema de plugins en `/docs/rfc-plugins.md`
- [x] 0.3 — Soft Skills Técnicos 🟡 (completado: 14/04/2026)

## 📊 Estadísticas
- Temas Core completados: 3/15
- Horas de estudio totales: 18h
- Días activos: 8

## 📝 Log de sesiones
| Fecha | Qué hice | Tiempo | Notas |
|-------|----------|--------|-------|
| 19/04 | Implementé Stack y Queue desde cero | 2.5h | Queue con linked list más complejo de lo esperado |
| 18/04 | Leí Grokking Algorithms cap 2-3 | 1.5h | Arrays vs Linked Lists claro |
| 17/04 | Video de Fireship sobre Big O | 0.5h | Buen overview inicial |

## 🎯 Próximos temas (Core Path)
1. 1.2 — Sistemas Operativos 🔴
2. 2.1 — JavaScript Internals 🔴
3. 5.1 — Seguridad Aplicada 🔴

## 💡 Notas para sesiones futuras
- Repasar colisiones en Hash Tables antes de continuar
- El ejercicio de FreePress con Maps está pendiente
```

**Características clave:**
- Sección "En progreso actualmente" visible arriba de todo
- Lista de completados con links a evidencia
- Log de sesiones para reconstruir contexto después de pausas
- Estadísticas básicas para sensación de progreso

### Archivos afectados

- Nuevo archivo: `PROGRESS.md` en la raíz del proyecto

### Referencia de calidad

El criterio de éxito es: alguien que abre el proyecto después de 2 semanas sin estudiar puede en 30 segundos saber exactamente qué tema estaba estudiando, en qué paso del ciclo estaba, y qué hizo la última sesión.

---

## 🔴 Mejora 4 — FreePress necesita un MVP con Definition of Done

- [ ] Pendiente de implementación

### El problema

FreePress está bien pensado como proyecto ancla, pero tiene un **problema de scope implícito**:

- Un CMS completo es un proyecto MASIVO
- Las features listadas (plugins, real-time comments, analytics dashboard, API pública, notificaciones) **cada una merecería semanas de trabajo**
- El plan dice "NO construyas todo de entrada" pero no define el **MVP de FreePress**

Sin un "esto es suficiente", FreePress se convierte en:
1. Un proyecto que nunca termina → culpa permanente
2. Un proyecto que crece desordenadamente → refactor constante
3. Un distractor del aprendizaje → más tiempo en features que en conceptos

### Por qué importa

Un proyecto de aprendizaje necesita un "finish line" tan claro como los temas del plan. Si el plan tiene "Done cuando" para cada tema, FreePress necesita un "Done cuando" para el proyecto entero.

Sin eso, el estudiante nunca tiene la satisfacción de "completé el proyecto que sustenta mi aprendizaje" — solo "hice algunas features y me faltan muchas".

### Qué se necesita hacer

**Definir el MVP de FreePress explícitamente:**

```markdown
## FreePress — Definition of Done (para los propósitos de este plan)

FreePress está "completo" para los objetivos del plan cuando cumple:

### Funcionalidad mínima
- [ ] Sistema de usuarios con roles (admin, editor, autor, lector)
- [ ] Auth con JWT + refresh tokens funcionando
- [ ] Crear, editar, publicar y borrar artículos
- [ ] Editor de contenido básico (Markdown o WYSIWYG simple)
- [ ] Listado de artículos públicos con paginación
- [ ] Búsqueda full-text básica

### Calidad mínima
- [ ] Tests de integración para flujos críticos (auth, CRUD de artículos)
- [ ] CI/CD que corre tests en cada PR
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] README que permite levantar el proyecto sin preguntar nada

### Deployment
- [ ] Deployado en un cloud real (Railway, Fly.io, AWS, etc.)
- [ ] Logs estructurados accesibles
- [ ] Al menos un endpoint monitoreado

---

**Todo lo siguiente es BONUS, no requerido:**
- Sistema de plugins
- Comentarios en tiempo real
- Dashboard de analytics
- API pública documentada
- Sistema de notificaciones
- Media library avanzada
```

**Implementación:**
- Agregar esta sección en la descripción de FreePress en la portada
- Hacer referencia a ella desde cada fase que agrega features
- Si alguien completa el MVP antes de terminar el plan, tiene la opción de:
  - Dejar FreePress "done" y enfocarse en otros proyectos
  - Continuar agregando features bonus por gusto personal

### Archivos afectados

- `Plan de Estudio Pro Max.md` — sección "Proyecto Principal — FreePress" expandida con Definition of Done

### Referencia de calidad

El criterio de éxito es: alguien que completa las features del MVP puede marcar FreePress como "done para los propósitos del plan" sin sentir que "le faltó hacer". Y el MVP es alcanzable dentro del timeline del Core Path.

---

## 🟡 Mejora 5 — La numeración de fases genera confusión cognitiva

- [ ] Pendiente de implementación

### El problema

Aunque existe la tabla de secuencia recomendada, el hecho de que "Fase 5" se estudie ANTES de "Fase 3" genera confusión cognitiva permanente. Cada vez que alguien referencia "Fase 5" tiene que verificar si es en orden numérico o en orden de secuencia.

Ejemplo concreto del problema:
- La tabla dice: "4to — Fase 5 — Seguridad y Performance"
- Pero el archivo se llama "Fase 5" y está DESPUÉS de "Fase 3" en la estructura de carpetas
- El lector tiene que mantener dos mapas mentales: numeración vs secuencia

### Por qué importa

El cognitive load del plan debería invertirse en aprender, no en recordar si "Fase 5 va antes o después de Fase 3". Es un detalle menor que se repite cada vez que se referencia una fase.

### Qué se necesita hacer

**Opción A (recomendada): Eliminar números, usar nombres descriptivos**

Renombrar las fases sin números, solo con nombres:
- "Fase 0" → "Mentalidad y Proceso"
- "Fase 1" → "CS Fundamentals"
- "Fase 2" → "Dominio del Lenguaje"
- "Fase 3" → "Arquitectura Avanzada"
- "Fase 4" → "Infraestructura y Cloud"
- "Fase 5" → "Seguridad y Performance"
- "Fase 6" → "Frontend Avanzado"
- "Fase 7" → "Bases de Datos"
- "Fase 8" → "AI y Agentes"
- "Fase 9" → "El Programador Completo"

La tabla de secuencia sigue existiendo para definir el orden, pero no hay números en los nombres.

**Opción B (menos disruptiva): Renumerar según secuencia**

Cambiar los números para que coincidan con el orden recomendado:
- Mentalidad y Proceso = Fase 1
- CS Fundamentals = Fase 2
- Dominio del Lenguaje = Fase 3
- Seguridad y Performance = Fase 4
- Bases de Datos = Fase 5
- Arquitectura Avanzada = Fase 6
- Frontend Avanzado = Fase 7
- Infraestructura y Cloud = Fase 8
- AI y Agentes = Fase 9
- El Programador Completo = Fase 10

Esto requiere renombrar carpetas y actualizar todas las referencias cruzadas.

### Archivos afectados

- TODAS las carpetas de fases (renombrar)
- `Plan de Estudio Pro Max.md` (actualizar referencias)
- Cada archivo individual de tema (actualizar encabezados y referencias)

### Referencia de calidad

El criterio de éxito es: alguien puede referenciar una fase sin tener que verificar si está hablando del número o de la secuencia. "Arquitectura Avanzada" es único; "Fase 3" no.

---

## 🟡 Mejora 6 — Falta un tema: "Leer código ajeno y Code Review"

- [ ] Pendiente de implementación

### El problema

El plan entero se enfoca en **escribir** código. Pero en el mundo real, la mayor parte del tiempo profesional se pasa:
1. **Leyendo código que otro escribió** (incluyendo código generado por AI)
2. **Haciendo code review** a teammates
3. **Debuggeando codebases ajenos** o legacy

Estas son habilidades distintas a "saber escribir código" y no se adquieren automáticamente.

### Por qué importa

Con AI generando más código, la habilidad crítica se desplaza de "escribir código" a **"evaluar código"**:
- ¿Este código que la AI generó es correcto?
- ¿Respeta la arquitectura del proyecto?
- ¿Tiene los patrones de error típicos de AI (over-confidence, hallucinated APIs)?
- ¿Cómo reviso código sin entender cada línea?

Un plan que prepara para "el mundo con AI" necesita abordar esto explícitamente.

### Qué se necesita hacer

Agregar un tema nuevo, idealmente como parte de la Fase 9 o como tema transversal:

**`9.5 — Leer Código Ajeno y Code Review 🔴`**

Contenido sugerido:
- **Archaeology de codebases:** cómo abordar un proyecto desconocido, por dónde empezar, qué buscar primero
- **Code review efectivo:** estructura de comentarios, Conventional Comments, cómo dar feedback constructivo
- **Detectar code smells:** patrones de código problemático que no son bugs pero indican problemas
- **Revisar código generado por AI:** patrones típicos de error (hallucinations, over-engineering, falta de contexto del proyecto), cómo verificar sin reescribir todo
- **Debugging en código ajeno:** cómo investigar sin el contexto mental del autor original

**Ejercicio:** Hacer un code review real de un PR abierto en un proyecto open source (o de FreePress si hay contribuidores), usando Conventional Comments, con al menos un comentario de cada tipo: bloqueante, no bloqueante, pregunta, sugerencia.

**Done cuando:** Podés abrir un PR de 500 líneas de código que no escribiste, identificar en 15 minutos los 3 problemas más importantes (de calidad, no de estilo), y escribir comentarios de review que el autor pueda accionar.

### Archivos afectados

- Nuevo archivo: `Fase 9 — El Programador Completo/9.5 — Leer Código Ajeno y Code Review 🔴.md`
- `Plan de Estudio Pro Max.md` — agregar referencia al nuevo tema en Fase 9

### Referencia de calidad

El criterio de éxito es: alguien que completa el plan sabe no solo escribir código sino **evaluar código** — propio, ajeno, y generado por AI.

---

## 🟡 Mejora 7 — La Fase 8 (AI) necesita integrarse transversalmente

- [ ] Pendiente de implementación

### El problema

El plan trata AI como "otra fase" — la 8. Pero el problema de la AI en 2026 no es solo "aprender AI engineering" — es que **la AI cambia la naturaleza del trabajo de programación entero**.

La Fase 8 está bien para "construir features con AI" (RAG, agentes, evals), pero no aborda:
1. **Qué pasa con los fundamentos en la era de AI** — ¿por qué aprender algoritmos si la AI puede implementarlos?
2. **AI-assisted debugging** — no "usar AI para debuggear" sino "debuggear código que AI escribió"
3. **Prompts para código** — cómo pedirle a la AI que respete arquitectura, patrones existentes, convenciones del proyecto

### Por qué importa

El plan tiene una regla sobre AI ("primero vos, después la AI") que es correcta para el aprendizaje. Pero en el trabajo profesional, la AI va a estar presente desde el día 1. El plan necesita preparar para esa realidad sin contradecir la regla de aprendizaje.

### Qué se necesita hacer

**1. Posicionamiento sobre fundamentos vs AI (agregar en la portada o Fase 0)**

Un apartado explícito que explique:
> "¿Por qué aprender algoritmos si la AI los implementa?"
> 
> La AI puede implementar un HashMap, pero no puede decidir CUÁNDO usar un HashMap vs un Array vs un Set sin entender el contexto de tu problema específico. Esa decisión es arquitectural, no de implementación. El conocimiento de fundamentos te permite:
> - Evaluar si lo que la AI propuso es correcto PARA TU CASO
> - Detectar cuando la AI está alucinando (ej: propone O(1) donde imposible)
> - Tomar decisiones que la AI no puede porque no tiene el contexto completo

**2. Debugging de código generado por AI (agregar en 9.2 o como sección nueva)**

Patrones típicos de error en código AI:
- Over-confidence: código que parece correcto pero tiene edge cases no considerados
- Hallucinated APIs: métodos que no existen o parámetros incorrectos
- Context blindness: código correcto en general pero que ignora convenciones del proyecto
- Over-engineering: soluciones complejas para problemas simples

**3. Prompts para arquitectura (agregar en 8.2 o como sección nueva)**

Cómo estructurar prompts que respeten el contexto del proyecto:
- "Implementá X siguiendo el patrón que usamos en [archivo existente]"
- "Este es el ADR de nuestra arquitectura — tu implementación debe respetarlo"
- "Generá código que compile con nuestra configuración de TypeScript estricto"

### Archivos afectados

- `Plan de Estudio Pro Max.md` — nuevo apartado sobre fundamentos vs AI
- `Fase 9 — El Programador Completo/9.2 — Debugging Avanzado 🔴.md` — sección sobre debugging de código AI
- `Fase 8 — AI y Agentes/8.2 — AI Engineering 🔴.md` — sección sobre prompts para arquitectura

### Referencia de calidad

El criterio de éxito es: alguien que completa el plan entiende que la AI es una herramienta que amplifica conocimiento, no que lo reemplaza — y tiene habilidades específicas para trabajar CON AI, no solo "usar AI".

---

## 🟢 Mejora 8 — Agregar alternativas en español donde existan

- [ ] Pendiente de implementación

### El problema

No todos los recursos están disponibles en español, y no todos prefieren aprender en inglés. El plan asume lectura fluida de inglés técnico sin ofrecer alternativas.

### Por qué importa

La accesibilidad del plan aumenta significativamente con alternativas en español, incluso si son parciales o de menor calidad. Un recurso en español de 80% de calidad es más útil que uno en inglés de 100% para quien no domina el idioma.

### Qué se necesita hacer

Para cada recurso listado, investigar si existe alternativa en español y agregar una columna o nota:

**Formato sugerido:**
```markdown
**Recursos:**
- Libro: *Grokking Algorithms* de Aditya Bhargava (inglés)
  - 🇪🇸 Alternativa: *Algoritmos Ilustrados* (traducción oficial disponible)
- Curso: MIT 6.006 (inglés, sin subtítulos)
  - 🇪🇸 Alternativa: [Máxima Teoría de Algoritmos en YouTube](link) — contenido similar en español
```

No todos los recursos tendrán alternativa, y eso está bien. La idea es reducir barreras donde sea posible.

### Archivos afectados

- Todos los archivos de temas individuales (agregar 🇪🇸 donde corresponda)

### Referencia de calidad

El criterio de éxito es: al menos el 50% de los recursos principales tienen una alternativa o complemento en español listado.

---

## Contexto de la revisión

**Fecha:** 20/04/2026
**Revisado por:** Claude (GLM-5) junto al autor del plan
**Alcance de la revisión:** Estructura, realismo, y usabilidad — no contenido técnico
**Continuación de:** `Mejoras Pendientes v2.md` (todos sus items fueron implementados)
**Veredicto sobre el contenido técnico:** Sigue sólido. Los problemas identificados son de scope, ordenamiento, y herramientas prácticas de gestión del aprendizaje.
