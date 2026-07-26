# Proyectos de Práctica

Los proyectos producen evidencia, no otra lista de tecnologías. Para cerrar una unidad elige **una** vía:

1. ejercicio aislado;
2. aplicación en uno de estos proyectos;
3. problema laboral reproducido sin código ni datos privados.

No repitas el mismo aprendizaje en varias vías. La evidencia debe cumplir [METODOLOGIA.md](METODOLOGIA.md#cierre-de-una-unidad-crítica) cuando la unidad sea crítica.

## Límites comunes

- **Timebox total de 8–12 horas por sustrato.** Es el techo compartido entre las unidades que reutilizan el proyecto, no un presupuesto por unidad ni permiso para acumular sus checklists. Si la evidencia está lista antes, detente; al llegar al límite, elimina alcance.
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

3 — Testing · 6 — Requirements · 8 — Diseño modular · 9 — SQL · 10 — Migraciones · 13 — API/dominio · 16 — Entrega/GCP · 17 — Observabilidad/SRE · 18 — Coding agents.

Usa el proyecto solo para la unidad que estés cerrando. No vuelvas a implementar una evidencia que ya exista. Para la unidad 18, delega y audita un cambio pequeño —por ejemplo, expirar reservas vencidas— siguiendo [4.8](Etapa%204%20—%20Profundización/4.8%20—%20AI%20Engineering%20(la%20nueva%20disciplina).md).

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

2 — Runtime/concurrencia · 12 — Performance/datos · 14 — Distribuidos/mensajería · 15 — System Design · 18 — Coding agents.

Para la unidad 18, delega y audita un cambio pequeño —por ejemplo, reprocesar un trabajo en error— siguiendo [4.8](Etapa%204%20—%20Profundización/4.8%20—%20AI%20Engineering%20(la%20nueva%20disciplina).md).

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
