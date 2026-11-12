# AppSec — Iniciación práctica para programadores

Para quien ya programa y quiere reconocer riesgos, probar controles y explicar límites con evidencia. No promete empleo, certificación ni dominio experto.

## Empieza aquí

Abre [M1-A1](ITINERARIO.md#m1-a1--alcance-del-laboratorio-y-ejemplo-de-autorización): lee el ejemplo de alcance ya rellenado, cambia una condición y explica cuándo te detendrías. No necesitas instalar un laboratorio para empezar.

| Documento | Para qué sirve |
|---|---|
| [Itinerario](ITINERARIO.md) | Única fuente del orden, conceptos, ejemplos y actividades |
| [Recursos](RECURSOS.md) | Consulta puntual de fuentes, no lista de lecturas obligatorias |
| [Prompts](PROMPTS.md) | Pistas y feedback después de tu intento |

Referencia flexible: **2–3 horas semanales**, sin sesiones impuestas, cuotas ni fecha final. Avanza cuando puedas **explicar, aplicar y verificar**, no por tiempo transcurrido. Si ya tienes evidencia equivalente, reutilízala y explica sus límites.

## Cómo trabajar

Lee el concepto y el ejemplo resuelto; predice qué cambia al modificarlo, practica con guía y resuelve el desafío propio sin copiar su solución. Verifica con una fuente, test u observación independiente de la IA. «No sé todavía» es una predicción válida.

El *Done* requiere una salida observable, criterio independiente y límites explícitos; en controles ejecutables conserva permitido y negativo. Una simulación demuestra su modelo, no el sistema real. La pregunta de recuperación sirve para explicar sin apuntes, sin calendario de repasos.

### Antiatasco

Si no entiendes el resultado, reduce el caso, localiza el prerrequisito ausente y pide una pista concreta. Conserva el parcial y el siguiente paso; no declares verificado lo pendiente ni reinicies toda la ruta.

## Entorno y límites de seguridad

- Solo objetivos propios con permiso explícito o la instancia autorizada del lab. Tener cuenta no autoriza una auditoría. Escribe host, operaciones, exclusiones y condición de parada; detente ante datos reales o acceso inesperado.
- Labs locales solo en loopback, con cuentas/datos ficticios y perfil de navegador aislado. No publiques apps vulnerables ni instales certificados de proxy en tu perfil personal.
- Sin fuerza bruta real, floods, metadata cloud, redes ajenas ni llamadas a terceros en los ejemplos de integración. Nada de secretos, PII o código de empresa en IA, capturas, Git o portfolio.
- DevTools, `curl`, Node LTS con `node:test` y labs gratuitos bastan. Burp Community es opcional; no necesitas Pro, API de IA ni cloud de pago.

Reutiliza una API existente o funciones y fixtures pequeños de Node/NestJS/Angular/PostgreSQL. No construyas otro producto, login, IdP ni vault para completar la ruta. Conserva las remediaciones rojo–verde de M3/M6/M7 y las fichas de revisión; un control que resiste también es evidencia.

## Registro de evidencia por módulo y actividad

Añade al artefacto existente una nota breve, no un tracker ni un formulario obligatorio: `Mx-Ay`, alcance autorizado, predicción, fuente/versión, comando o pasos, esperado/observado y enlace a evidencia sanitizada. Incluye permitido/negativo cuando aplique, límites y punto de reanudación. No registres horas de estudio.

## Ficha de hallazgo o revisión

Describe título/estado (confirmado por lectura o ejecución, hipótesis, control sin hallazgo), alcance, pasos mínimos, evidencia, precondiciones, exposición, explotabilidad e impacto. Propón arreglo y retest; declara incertidumbre y riesgo residual con dueño y revisión ante cambios relevantes. No inventes CVSS ni hallazgos para llenar casillas.

## Web interactiva

Desde la raíz del repositorio:

```sh
python3 Especializacioes/AppSec/web/iniciar.py
```

Abre `http://127.0.0.1:8000/Especializacioes/AppSec/web/`; el script imprime la URL y trata de abrir el navegador. Mantén la terminal abierta y termina con `Ctrl+C`. Si el puerto está ocupado, no mata el otro proceso: detenlo tú antes de reintentar. No abras `index.html` con `file://`.

Alternativa manual desde la raíz: `python3 -m http.server 8000 --bind 127.0.0.1`, y la misma URL. No instala nada: lee los cuatro Markdown, sin modificarlos.

### Persistencia y copias

Las marcas y notas viven solo en ese navegador y origen (host/puerto), sin sincronización. Limpiar sus datos puede borrarlas: **exporta JSON antes de actualizar**. Importar sobre progreso existente pide confirmación; cancelar no cambia nada. Las 140 marcas del plan anterior se conservan como historial, sin acreditar actividades nuevas. Una casilla no demuestra dominio.

Las marcas anteriores se conservan, pero las actividades ampliadas no se desmarcan automáticamente: revisa los contenidos nuevos según necesidad; la marca previa no acredita su dominio.

### Pruebas desde la raíz

```sh
node --test Especializacioes/AppSec/web/tests/*.test.mjs
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s Especializacioes/AppSec/web/tests -p 'test_*.py'
```

Sin dependencias nuevas; navegador: `/usr/bin/chromium`. El servidor de inicio usa Python 3.

## Encaje y comparación

La [metodología general](../../METODOLOGIA.md), el [roadmap principal](../../ROADMAP.md) y [proyectos](../../PROYECTOS.md) son contexto opcional, no presupuestos temporales adicionales para AppSec. Reutiliza [seguridad aplicada](../../Etapa%201%20—%20Entrada/1.4%20—%20Seguridad%20Aplicada.md), [CI/CD](../../Etapa%204%20—%20Profundización/4.2%20—%20CI-CD%20(Integración%20y%20Entrega%20Continua).md) y [observabilidad](../../Etapa%204%20—%20Profundización/4.5%20—%20Observabilidad%20(Los%203%20Pilares).md) solo para resolver un hueco concreto.

Comparada con [Application Security Engineer Learning Roadmap 2026, Ivan Piskunov](https://www.product-security.expert/22-learning-paths-and-labs/application-security-engineer-learning-roadmap-2026.html), esta ruta conserva sus siete capas sin importar su calendario: fundamentos software/protocolos (M1/M6), web/API/identidad (M3–M13), diseño y amenazas (M2), revisión/crypto/secretos (M4/M11/M14/M16/M17), SDLC y triage (M15/M16), fronteras cloud-native (M11/M16) y comunicación/priorización (M19/M20). Se refuerzan contratos/webhooks, identidad entre servicios, controles de entrega y decisiones por riesgo, dentro de actividades existentes. Kubernetes, cloud profundo y mobile quedan fuera para mantener una iniciación acotada, no otra especialización.
