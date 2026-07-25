# Proyectos de Práctica

Los proyectos producen evidencia, no otra lista de tecnologías. Para cerrar una unidad elige **una** vía:

1. ejercicio aislado;
2. aplicación en uno de estos proyectos;
3. problema laboral reproducido sin código ni datos privados.

No repitas el mismo aprendizaje en varias vías. La evidencia debe cumplir [METODOLOGIA.md](METODOLOGIA.md#cierre-de-una-unidad-crítica) cuando la unidad sea crítica.

## Límites comunes

- **Timebox máximo de 8–12 horas.** Si la evidencia está lista antes, detente; al llegar al límite, elimina alcance.
- Sin frontend: `curl`, OpenAPI y tests son interfaz suficiente.
- Usa un stack conocido por defecto. NestJS + PostgreSQL es válido; Python puede usarse cuando aporte al aprendizaje de AI o automatización.
- No agregues Redis, Kafka, Kubernetes, microservicios ni otra dependencia sin una necesidad demostrada.
- Un servicio, una base de datos y un flujo principal bastan.
- Cada proyecto debe poder ejecutarse y verificarse con comandos documentados.

---

## Proyecto A — `safe-change-api`

Una API pequeña para reservar unidades de stock sin permitir cantidades negativas.

### Alcance

- `POST /reservations`: reserva una cantidad de un SKU.
- `GET /stock/:sku`: muestra disponible y reservado.
- PostgreSQL como única dependencia de datos.
- Un identificador de idempotencia evita reservas duplicadas.
- Una migración compatible añade un campo como `expires_at`.
- Deploy en Cloud Run mediante GitHub Actions.

No necesita usuarios, pagos, panel administrativo ni catálogo completo.

### Evidencia mínima

- [ ] Spec de una página: objetivo, no-objetivos, invariantes, ejemplos y aceptación.
- [ ] Contrato OpenAPI y modelo SQL con constraints justificados.
- [ ] Tests del caso feliz, stock insuficiente y petición duplicada.
- [ ] Migración con estrategia de rollback o roll-forward.
- [ ] Pipeline reproducible y URL o registro del deploy.
- [ ] Log estructurado con request ID y un runbook corto para una entrega fallida.
- [ ] ADR de una decisión real, incluida la opción de no introducir otra tecnología.

### Unidades que puede cubrir

3 — Testing · 7 — Requirements · 9 — Diseño modular · 10 — SQL · 11 — Migraciones · 14 — API/dominio · 17 — Entrega/GCP · 18 — Observabilidad/SRE.

Usa el proyecto solo para la unidad que estés cerrando. No vuelvas a implementar una evidencia que ya exista.

---

## Proyecto B — `reliable-worker`

Un worker que procesa trabajos con fallos reproducibles sin ejecutar dos veces el efecto final.

### Alcance

- Una tabla PostgreSQL funciona como cola inicial.
- El worker reclama un trabajo, ejecuta un efecto local y registra el resultado.
- Retry con backoff acotado y estado final de error.
- Clave de idempotencia para evitar efectos duplicados.
- Inyección deliberada de un fallo después del efecto y antes del acknowledgement.

RabbitMQ puede reemplazar la tabla si ya existe una necesidad concreta. Kafka, Avro y Schema Registry quedan fuera.

### Evidencia mínima

- [ ] Diagrama del flujo normal y de un fallo parcial.
- [ ] Test que demuestra que el efecto no se duplica al reintentar.
- [ ] Métrica o log que permite ver pendientes, reintentos y errores finales.
- [ ] Explicación de las garantías reales: qué puede perderse, repetirse o retrasarse.
- [ ] Benchmark pequeño antes de proponer caché, paralelismo o cambio de broker.
- [ ] ADR que justifica conservar PostgreSQL o adoptar otra cola.

### Unidades que puede cubrir

2 — Runtime/concurrencia · 13 — Performance/datos · 15 — Distribuidos/mensajería · 16 — System Design.

---

## Proyecto C — `agent-change-audit`

Auditar un cambio pequeño producido por un coding agent. Reutiliza el Proyecto A o B; **no crea un tercer sistema**.

### Cambio sugerido

Pide al agente una sola modificación con impacto observable, por ejemplo:

- expirar reservas vencidas en `safe-change-api`; o
- permitir reprocesar un trabajo en error en `reliable-worker`.

### Evidencia mínima

- [ ] Contrato de tarea con objetivo, no-objetivos, invariantes, archivos permitidos y aceptación.
- [ ] Ejecución aislada en rama o worktree con permisos y herramientas limitados.
- [ ] Diff revisado, incluidos cambios fuera de alcance y dependencias nuevas.
- [ ] Registro de los checks ejecutados y su salida relevante.
- [ ] Un test adversarial añadido o modificado por ti.
- [ ] Trazado manual de un happy path y un fallo a través del código.
- [ ] Decisión escrita: aceptar, corregir o revertir, con evidencia.
- [ ] Rollback demostrado o ensayado.

### Unidades que puede cubrir

1 — Debugging · 6 — AI/ML · 8 — Git/shell · 19 — Ingeniería con coding agents.

No requiere construir un chatbot, servidor MCP, RAG ni sistema multiagente. El producto es la auditoría verificable del cambio.

---

## Cómo acotar cada proyecto

Antes de empezar, escribe:

```md
Objetivo:
No-objetivos:
Invariante principal:
Resultado observable:
Comandos de verificación:
Tiempo máximo:
```

Si el proyecto supera 12 horas, conserva solo el flujo necesario para producir la evidencia de la unidad actual. Autenticación completa, UI, infraestructura avanzada y generalización para futuros casos se eliminan primero.

## Usar experiencia laboral

Un incidente, migración, query lenta o cambio de API del trabajo puede reemplazar estos proyectos si:

- se reproduce en un laboratorio mínimo;
- no contiene propiedad intelectual, secretos ni datos reales;
- deja un artefacto verificable que puedes explicar;
- cumple el mismo resultado mínimo de la unidad.

El objetivo es demostrar criterio transferible, no publicar código de la empresa.
