# Mejoras Pendientes v11

Derivado de Mejora 9, item #12 (tablas "En producción"). La mejora es generalizar el patrón de tablas "En producción" de 1.5 a todos los temas donde aporte valor.

---

## 📋 Guidelines para tablas "En producción"

Las tablas "En producción" de 1.5 siguen este formato:

```
**[Tema] — En producción**

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| ...            | ...              | ...                 |
```

Columnas estándar:
- **Situación real**: un síntoma concreto que un dev encontraría en producción
- **Qué está pasando**: el concepto técnico detrás del síntoma
- **Cómo lo diagnosticás** (o **Lección** o **Ejemplo**, según el tema): la acción o insight

Reglas:
- Situaciones **reales**, no hipotéticas abstractas
- Sin jerga en la columna "Situación real" — lo que un dev lee en un log o error message
- Una tabla por subtema, ubicada después del "Done cuando" y antes de "Recursos"
- Formato: subtítulo bold (`**Tema — En producción**`) dentro del bloque del checkbox (no heading separado)

---

## 🟡 Prioridad media — Aplicar tablas "En producción"

### 1. Etapa 2 — 2.5 No-Relacionales: "CAP Theorem — En producción"

**Subtema:** CAP Theorem, Consistencia y Trade-offs Distribuidos

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| El dashboard muestra "10 vistas" pero el contador real es 15 | Consistencia eventual — la réplica aún no convergió | Verificá el read concern/version — si es `local` o `eventual`, esto es esperado |
| Un usuario se queja de que su pago se procesó dos veces | Idempotency faltante + consistencia eventual — dos nodos procesaron el mismo request | Implementá idempotency keys; verificá si la DB garantiza exactly-once |
| Un cluster de MongoDB pierde el primary y las escrituras se rechazan | Partición de red — la mayoría no puede formar quórum | Verificá la topología y el tamaño del cluster — un cluster de 2 nodos no puede tolerar la pérdida de 1 |

---

### 2. Etapa 2 — 2.6 Data Migrations: "Migraciones sin downtime — En producción"

**Subtema:** Migraciones sin downtime y Schema Evolution

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| Deploy exitoso pero la app empieza a tirar errores 500 | La migración renombró una columna pero el código viejo todavía la busca por el nombre anterior | Verificá si usaste expand-contract o si hiciste el rename en un solo paso |
| `ALTER TABLE` bloquea la tabla por 5 minutos en producción | `ADD COLUMN NOT NULL` sin default en una tabla de millones de filas — PostgreSQL necesita recorrer toda la tabla | Usá `ADD COLUMN ... DEFAULT` (PG 11+) o expand-contract |
| La migración `CREATE INDEX` falló y dejó un índice `INVALID` | `CREATE INDEX CONCURRENTLY` se interrumpió — no se puede ejecutar dentro de una transacción | Eliminá el índice `INVALID` con `DROP INDEX` y re-ejecutá |

---

### 3. Etapa 2 — 2.7 Concurrency: "Race conditions — En producción"

**Subtema:** Concurrency y Parallelism (o Race Conditions y Mutex)

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| Dos usuarios reservan el último asiento al mismo tiempo | Race condition en la reserva — ambos leen "disponible" antes de que el otro escriba | Implementá mutex/lock o usá operaciones atómicas en la DB (`UPDATE ... WHERE available = true`) |
| Un contador de vistas suma de más cuando hay tráfico alto | Múltiples requests leen y escriben el mismo valor sin sincronización | Usá `UPDATE ... SET views = views + 1` (atómico) en lugar de leer, incrementar, escribir |
| El balance de una cuenta es negativo después de transferencias concurrentes | Check-then-act race condition — el balance se verificó antes de la transferencia pero cambió mientras se procesaba | Usá transacciones con `SELECT ... FOR UPDATE` o operaciones atómicas |

---

### 4. Etapa 3 — 3.1 System Design: "Capacity estimation — En producción"

**Subtema:** Capacity Estimation

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| El endpoint de listar artículos tarda 3s con 100K usuarios | No estimaste el growth — el query sin índice funciona con 1K pero no con 100K | Calculá QPS estimado y verificá que tus índices y queries soporten ese volumen |
| El servidor corre out of memory a las 2 horas de tráfico pico | No estimaste memory per request — 10K requests concurrentes × 2MB cada una = 20GB | Medí memory por request en load test y calculá el pico |
| La DB connection pool se agota durante picos | Las connections están abiertas más tiempo del necesario — queries lentas retienen conexiones | Estimá concurrent connections necesarias y configurá el pool size accordingly |

---

### 5. Etapa 3 — 3.9 Messaging: "Message queues — En producción"

**Subtema:** El problema que resuelven los message queues

| Situación real | Qué está pasando | Cómo lo diagnosticás |
|----------------|------------------|---------------------|
| El endpoint de registro tarda 10s porque envía email + welcome push + analytics | Acoplamiento síncrono — el endpoint espera cada servicio | Desacoplá con un queue: el endpoint deposita un mensaje y retorna inmediatamente |
| Un consumer cae y los mensajes se pierden | No hay DLQ configurada — los mensajes fallidos desaparecen sin rastro | Configurá una Dead Letter Queue y monitoreá su tamaño |
| El mismo email se envía dos veces | At-least-once delivery sin idempotency — el consumer procesa el mensaje duplicado | Hacé el consumer idempotente: verificá si ya procesaste ese `message_id` |

---

## 📊 Resumen

| Prioridad | Cantidad | Items |
|-----------|----------|-------|
| 🟡 Media | 5 | #1 (CAP), #2 (Migrations), #3 (Concurrency), #4 (System Design), #5 (Messaging) |

**Nota:** Estos son candidatos — evaluar cada uno y decidir si la tabla aporta suficiente valor antes de agregarla. Si el subtema ya tiene buenas situaciones reales en el "Por qué importa" o el ejercicio, una tabla adicional puede ser redundante.