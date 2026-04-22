# 🗺️ Roadmap — Tu camino de estudio

> Este archivo es tu brújula. Abrilo cuando necesites saber "¿qué sigue?"

---

## El Camino en una Vista

| Etapa | Duración | Qué estudiás | Entregable clave |
|-------|----------|--------------|------------------|
| **Entrada** | Semanas 1-8 | Mentalidad + Debugging + JS + Algoritmos + Auth | FreePress con auth funcionando |
| **Fundamentos** | Meses 3-6 | Seguridad, Performance, Bases de Datos | FreePress en producción |
| **Arquitectura** | Meses 7-10 | DDD, Patrones, Frontend avanzado | FreePress con arquitectura real |
| **Profundización** | Meses 11-15 | Infra, AI, Completitud | Ingeniero completo |

---

## Etapa 1: Entrada (Semanas 1-8)

El objetivo: victorias tangibles tempranas. Código que falla y se arregla.

### Semana 1 — Mentalidad

| Día | Qué hacer | Tiempo |
|-----|-----------|--------|
| 1-2 | `0.1 — Documentación Técnica` → Escribí tu primer ADR | 3h |
| 3-4 | `0.2 — Metodologías` → PRD borrador del editor | 3h |
| 5 | `0.3 — Soft Skills` → Lectura ligera | 2h |
| 6-7 | Crear repo FreePress, scaffold con Docker | 4h |

**Entregable:** Repo con `docker-compose up` funcional + ADR + PRD en `/docs`

### Semanas 2-3 — Debugging + JS Internals + Scaffold

| Qué | Ejercicios clave |
|-----|------------------|
| `2.0 — Debugging Básico` | Chrome DevTools breakpoints, VS Code debugger |
| `2.1 — JS Internals` | 10 ejemplos event loop, closures, memory |
| FreePress scaffold | Angular + NestJS + PostgreSQL + Redis corriendo |

**Entregable:** FreePress local funcionando. Al menos 1 bug arreglado entendiendo JS.

### Semanas 4-6 — Algoritmos

| Qué | Ejercicios clave |
|-----|------------------|
| `1.1 — Estructuras y Algoritmos` | Implementar desde cero: HashMap, Stack, Queue, BST |
| Big O | Analizar 5 funciones de FreePress |
| Práctica | 5 ejercicios NeetCode Easy por estructura |

**Entregable:** Podés explicar Big O de cualquier función en 2 min.

### Semanas 7-8 — Auth (Seguridad básica)

| Qué | Ejercicios clave |
|-----|------------------|
| `5.1 — Seguridad` (enfocado en auth) | JWT, refresh tokens, RBAC |
| Aplicar en FreePress | Login, logout, endpoints protegidos |

**Entregable:** FreePress con auth funcional. Tests de integración para el flujo.

---

## Etapa 2: Fundamentos (Meses 3-6)

Ahora tenés FreePress funcionando + auth. Los fundamentos tienen contexto.

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `5.2 — Performance Engineering` | ✅ | Profiling antes de optimizar |
| 2 | `7.1 — SQL y Modelado Relacional` | ✅ | Bases de datos bien hechas |
| 3 | `1.2 — Sistemas Operativos` | — | Con contexto práctico |
| 4 | `1.3 — Redes en Profundidad` | — | Con contexto práctico |
| 5 | `2.2 — TypeScript Avanzado` | ✅ | Type safety serio |

**Checkpoint de etapa:** FreePress con índices, queries optimizadas, y profiling básico.

---

## Etapa 3: Arquitectura (Meses 7-10)

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `3.1 — DDD` | ✅ | Bounded Contexts antes de patrones |
| 2 | `3.2 — Patrones de Arquitectura` | ✅ | Clean Architecture, microservicios |
| 3 | `6.1 — Cómo funciona el Browser` | ✅ | Render pipeline, debugging frontend |
| 4 | `6.2 — State Management` | — | NgRx, signals, según stack |

**Checkpoint de etapa:** FreePress refactorizado con arquitectura de capas, Context Map documentado.

---

## Etapa 4: Profundización (Meses 11-15)

| Orden | Tema | Es Core | Por qué |
|-------|------|---------|---------|
| 1 | `4.1 — Containerización` | ✅ | Dockerfile optimizado, security |
| 2 | `4.5 — CI/CD` | ✅ | Pipeline automatizado |
| 3 | `4.6 — Observabilidad` | ✅ | Logs, métricas, traces |
| 4 | `8.2 — AI Engineering` | ✅ | Construir con AI, no solo usarla |
| 5 | `9.2 — Debugging Avanzado` | ✅ | Memory leaks, profiling profundo |
| 6 | `9.5 — Code Review` | ✅ | Evaluar código (propio, ajeno, AI) |

**Checkpoint final:** FreePress en producción real, con CI/CD, observabilidad, y AI features.

---

## El Core Path (19 temas esenciales)

Estos son los temas marcados con ✅ arriba. Completarlos = "graduarte" del plan.

> Tiempo estimado: 12-15 meses a ritmo sostenido (2-3 horas, 3-4 días/semana)

**Lista completa:**

| # | Tema | Fase |
|---|------|------|
| 1 | `0.1 — Documentación Técnica` 🔴 | Mentalidad |
| 2 | `0.2 — Metodologías y Procesos` 🔴 | Mentalidad |
| 3 | `0.3 — Soft Skills Técnicos` 🟡 | Mentalidad |
| 4 | `1.1 — Estructuras de Datos y Algoritmos` 🔴 | CS Fundamentals |
| 5 | `2.0 — Debugging Básico` 🔴 | Lenguaje |
| 6 | `2.1 — JavaScript Internals` 🔴 | Lenguaje |
| 7 | `2.2 — TypeScript Avanzado` 🔴 | Lenguaje |
| 8 | `5.1 — Seguridad Aplicada` 🔴 | Seguridad |
| 9 | `5.2 — Performance Engineering` 🔴 | Seguridad |
| 10 | `7.1 — SQL y Modelado Relacional` 🔴 | Bases de Datos |
| 11 | `3.1 — Domain-Driven Design` 🔴 | Arquitectura |
| 12 | `3.2 — Patrones de Arquitectura` 🔴 | Arquitectura |
| 13 | `4.1 — Containerización Avanzada` 🔴 | Infraestructura |
| 14 | `4.5 — CI/CD` 🔴 | Infraestructura |
| 15 | `4.6 — Observabilidad` 🔴 | Infraestructura |
| 16 | `6.1 — Cómo funciona el Browser` 🔴 | Frontend |
| 17 | `8.2 — AI Engineering` 🔴 | AI |
| 18 | `9.2 — Debugging Avanzado` 🔴 | Completo |
| 19 | `9.5 — Code Review` 🔴 | Completo |

---

## El Advanced Track

Todo lo que NO está en el Core Path arriba. Se explora según:
- Dirección de carrera (más frontend vs más backend vs más infra)
- Interés personal
- Requerimientos del trabajo actual

**No son deuda pendiente. Son profundización optativa.**

| Fase | Temas Advanced | Cuándo explorar |
|------|----------------|-----------------|
| Fase 1 | `1.2 SO`, `1.3 Redes`, `1.4 Paradigmas`, `1.5 Linux` | Si querés ir más profundo en fundamentos |
| Fase 2 | `2.3 Build Tools`, `2.4 Git Avanzado`, `2.5 Concurrency` | Cuando necesités herramientas específicas |
| Fase 3 | `3.3 System Design`, `3.4 API Design`, `3.5 Messaging`, `3.6 Distribuidos` | Si tu rol requiere arquitectura avanzada |
| Fase 4 | `4.2 K8s`, `4.3 IaC`, `4.4 Cloud` | Si te orientás a DevOps/Platform |
| Fase 5 | `5.3 Testing Backend` | Para profundizar testing |
| Fase 6 | `6.2 State Management`, `6.3 a11y`, `6.4 Testing Frontend` | Si te especializás en frontend |
| Fase 7 | `7.2 NoSQL`, `7.3 Migrations` | Para data engineering avanzado |
| Fase 8 | `8.1 ML Fundamentals`, `8.3 Proyectos AI` | Si querés profundizar en AI |
| Fase 9 | `9.1 Open Source`, `9.3 Deuda Técnica`, `9.4 Temas Avanzados` | Complementos de carrera |

---

## Cómo usar este archivo

1. **Al empezar:** Leé "El Camino en una Vista" para entender las 4 etapas
2. **Cada semana:** Consultá la etapa correspondiente para saber qué tocar
3. **Al dudar:** Si no sabés qué sigue, volvé acá. Este es tu mapa.
4. **Tracking:** Usá [PROGRESS.md](PROGRESS.md) para registrar tu avance

---

## Referencias rápidas

| Necesitás... | Ir a... |
|--------------|---------|
| Saber CÓMO estudiar | [METODOLOGIA.md](METODOLOGIA.md) |
| Ver qué contiene cada fase | [Plan de Estudio Pro Max.md](Plan%20de%20Estudio%20Pro%20Max.md) |
| Trackear tu progreso | [PROGRESS.md](PROGRESS.md) |
| Ver detalles de FreePress | [PROYECTOS.md](PROYECTOS.md) |
