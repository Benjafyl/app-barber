# PRD v1 — App Barber Pichilemu

**Nombre del proyecto:** App Barber Pichilemu  
**Versión del documento:** v1.0  
**Tipo de producto:** Aplicación web mobile-first para gestión automatizada de barberías y barberos independientes  
**Ubicación inicial objetivo:** Pichilemu, Chile  
**Usuarios principales:** Barberos independientes, barberos arrendatarios, administradores de barbería y clientes finales  
**Arquitectura definida:** Aplicación self-hosted, dockerizada, desplegable en servidor propio con Traefik  
**Fecha de definición:** Junio 2026  

---

## 1. Resumen ejecutivo

App Barber Pichilemu es una plataforma web mobile-first diseñada para digitalizar, automatizar y ordenar la operación diaria de barberos independientes y barberías pequeñas. El producto nace desde una realidad concreta: muchos barberos jóvenes o emergentes gestionan sus reservas, clientes, pagos e insumos mediante WhatsApp, Instagram, efectivo, transferencia, notas manuales o memoria.

El objetivo principal de la app no es obligar al barbero a registrar manualmente todo al final del día, sino capturar la información desde el flujo natural del negocio:

```txt
Cliente reserva
→ cliente confirma
→ barbero atiende
→ barbero marca como realizado
→ sistema registra cliente, atención, ingreso y estadísticas automáticamente
```

La aplicación busca permitir que el barbero trabaje cortando el pelo mientras el sistema ordena por detrás las reservas, clientes, ingresos, gastos, insumos, arriendos y métricas del negocio.

El producto estará pensado para dos escenarios principales:

1. **Barbero independiente:** necesita agenda, reservas, clientes, servicios, ingresos, gastos e historial de clientes.
2. **Barbería con varios barberos:** necesita panel de administrador, rendimiento por barbero, control de arriendo de silla, flujo de clientes y métricas generales del local.

---

## 2. Contexto del problema

En Pichilemu y en otros lugares similares, la barbería se ha vuelto una actividad atractiva para jóvenes que están aprendiendo o ya trabajan cortando pelo. Muchos generan clientela desde redes sociales y administran sus horas por WhatsApp o Instagram.

Sin embargo, la gestión del negocio suele ser informal:

- Reservas manuales por mensaje.
- Horarios anotados en chats.
- Pagos en efectivo o transferencia sin registro centralizado.
- Clientes frecuentes sin historial.
- Gastos e insumos sin seguimiento.
- Compras de máquinas, navajas, sprays, talcos, geles u otros productos sin control.
- Barberos que pagan arriendo de silla o espacio sin registro ordenado.
- Dueños de barbería que no saben claramente cuánto produce cada barbero.

Esto genera una oportunidad para construir una herramienta simple, cercana y adaptada a la forma real en que trabajan estos negocios.

---

## 3. Problema principal

Los barberos y administradores de barberías no cuentan con una herramienta simple y automatizada para gestionar reservas, clientes, atenciones, ingresos, gastos, insumos y arriendos internos.

El problema no es solo la falta de una agenda. El problema es que la operación completa funciona de manera manual y poco medible.

Si el sistema depende de que el barbero registre manualmente cada corte, cliente, servicio y pago, probablemente no lo usará de forma constante, porque durante el día está atendiendo clientes uno tras otro.

Por eso, el producto debe estar diseñado para reducir al mínimo la carga manual y transformar las reservas en datos operativos automáticamente.

---

## 4. Objetivo del producto

Crear una aplicación web mobile-first que permita a barberos y barberías gestionar su operación diaria de manera simple, automatizada y ordenada, centralizando reservas, clientes, servicios, atenciones, ingresos, gastos, insumos, arriendos y métricas de rendimiento.

El objetivo es que el negocio se mida casi solo a partir del flujo real de reservas y atenciones.

---

## 5. Objetivos específicos

### 5.1 Objetivos para el barbero

Permitir que el barbero pueda:

- Recibir reservas desde un link público.
- Mostrar horarios disponibles automáticamente.
- Registrar clientes sin ingresarlos manualmente.
- Confirmar si una cita fue realizada, cancelada o si el cliente no asistió.
- Saber cuánto ganó en el día, semana o mes.
- Identificar sus servicios más vendidos.
- Conocer sus clientes más frecuentes.
- Registrar gastos e insumos de forma simple.
- Controlar su flujo de caja básico.
- Reducir horas perdidas por clientes que no llegan.
- Medir duración aproximada de sus servicios.
- Trabajar con una herramienta rápida desde el celular.

### 5.2 Objetivos para el administrador de barbería

Permitir que el administrador pueda:

- Crear y administrar una barbería.
- Agregar barberos al local.
- Ver la agenda general del local.
- Ver la agenda individual de cada barbero.
- Conocer cuántos clientes entran al local.
- Ver qué barbero realiza más atenciones.
- Ver ingresos estimados por barbero.
- Controlar arriendos de silla o espacios.
- Registrar pagos de arriendo.
- Ver deudas pendientes.
- Medir rendimiento diario, semanal y mensual.
- Tomar decisiones con datos reales.

### 5.3 Objetivos para el cliente final

Permitir que el cliente pueda:

- Reservar una hora de manera rápida.
- Elegir barbería, barbero, servicio, día y hora.
- Confirmar asistencia antes de la cita.
- Cancelar o modificar su reserva, si corresponde.
- Recibir recordatorios.
- Evitar tener que coordinar manualmente por WhatsApp.

---

## 6. Usuarios objetivo

### 6.1 Cliente final

Persona que quiere reservar una hora para cortarse el pelo, hacerse la barba u otro servicio. Puede llegar desde Instagram, WhatsApp, recomendación, código QR o link directo.

Necesita una experiencia rápida y simple, sin crear cuenta obligatoriamente.

### 6.2 Barbero independiente

Persona que trabaja por cuenta propia, con agenda propia y clientela propia. Puede atender desde su casa, a domicilio, en un espacio arrendado o dentro de una barbería.

Necesita ordenar reservas, clientes, servicios, ingresos y gastos.

### 6.3 Barbero arrendatario

Persona que trabaja dentro de una barbería pagando arriendo de silla, espacio o comisión. Puede manejar su propia clientela, pero trabaja dentro de un local administrado por otra persona.

Necesita gestionar su agenda y clientes, además de mantener claridad sobre pagos internos.

### 6.4 Administrador o dueño de barbería

Persona que administra un local y tiene uno o varios barberos trabajando. Puede ser también barbero activo.

Necesita controlar la operación general del local, rendimiento de cada barbero, arriendos, flujo de clientes, pagos pendientes y gastos.

### 6.5 Superadministrador del sistema

Rol interno del producto. Administra la plataforma completa, usuarios, barberías, accesos y métricas generales.

---

## 7. Propuesta de valor

La propuesta de valor principal es:

> Llena tu agenda, reduce plantones y mide cuánto produce cada barbero sin tener que anotar todo a mano.

También puede comunicarse como:

> Una app para que barberos sepan cuánto ganan, cuánto gastan y quiénes son sus mejores clientes.

La app no debe sentirse como un sistema contable complejo. Debe sentirse como una agenda inteligente que, además, ordena el negocio.

---

## 8. Principios del producto

### 8.1 Automatización antes que registro manual

Siempre que sea posible, la información debe generarse desde el flujo de reserva y atención, no desde formularios manuales.

### 8.2 Rapidez operativa

El barbero debe poder realizar acciones clave en pocos segundos, especialmente marcar una cita como realizada.

### 8.3 Mobile-first

La app debe estar diseñada principalmente para celular.

### 8.4 Lenguaje simple

El sistema debe usar términos simples: agenda, reservas, clientes, ingresos, gastos, pagos pendientes, arriendos, resumen del día.

### 8.5 Utilidad inmediata

El barbero debe ver valor desde el primer día: agenda ordenada, reservas visibles, clientes registrados e ingresos automáticos.

### 8.6 Escalabilidad funcional

El producto debe servir tanto para un barbero individual como para una barbería con varios barberos.

### 8.7 Infraestructura portable

El sistema debe poder desplegarse en servidor propio mediante Docker y Traefik sin depender de plataformas cloud obligatorias.

---

## 9. Alcance general del producto

El producto contempla los siguientes módulos:

1. Registro y autenticación de usuarios.
2. Creación de perfil de barbero.
3. Creación de barbería o local.
4. Link público de reservas.
5. Agenda por barbero.
6. Agenda general del local.
7. Configuración de servicios, precios y duración.
8. Flujo de reserva de cliente.
9. Recordatorios y confirmación de asistencia.
10. Gestión automática de clientes.
11. Gestión de atenciones realizadas.
12. Registro automático de ingresos.
13. Registro manual de ingresos adicionales.
14. Registro de gastos.
15. Registro de insumos.
16. Registro de herramientas.
17. Dashboard del barbero.
18. Dashboard del administrador.
19. Gestión de barberos dentro de una barbería.
20. Control de arriendo de silla o espacio.
21. Estadísticas de rendimiento.
22. Historial de clientes.
23. Estados de reserva y asistencia.
24. Reportes básicos.
25. Configuración del negocio.
26. Notificaciones por correo en primera etapa.
27. Preparación futura para WhatsApp, pagos online y MinIO.

---

## 10. Roles y permisos

### 10.1 Cliente

El cliente no necesita cuenta inicialmente.

Puede:

- Ingresar al link público de reserva.
- Seleccionar barbería, barbero, servicio, fecha y hora.
- Ingresar sus datos mínimos.
- Confirmar asistencia.
- Cancelar reserva si está permitido.
- Ver resumen de su reserva mediante link seguro.

No puede:

- Ver información interna de la barbería.
- Ver estadísticas.
- Ver otros clientes.
- Ver ingresos, gastos o arriendos.

### 10.2 Barbero

Puede:

- Iniciar sesión.
- Configurar su perfil.
- Definir servicios, precios y duración.
- Configurar horarios disponibles.
- Ver su agenda.
- Ver sus reservas.
- Marcar citas como realizadas, canceladas o no asistidas.
- Ver sus clientes.
- Ver historial de atenciones.
- Registrar pagos.
- Registrar gastos propios.
- Registrar compras de insumos.
- Ver su dashboard personal.

### 10.3 Administrador de barbería

Puede:

- Crear y editar la barbería.
- Agregar barberos al local.
- Configurar servicios del local.
- Ver agenda general.
- Ver rendimiento por barbero.
- Ver clientes atendidos dentro del local.
- Ver ingresos estimados.
- Registrar gastos del local.
- Gestionar arriendos.
- Registrar pagos de arriendo.
- Ver reportes generales.
- Gestionar permisos de barberos.

### 10.4 Superadministrador

Puede:

- Ver todas las barberías.
- Ver usuarios registrados.
- Administrar accesos.
- Desactivar cuentas si corresponde.
- Revisar métricas generales de uso.
- Gestionar configuración global del sistema.

---

## 11. Flujo principal del cliente

### 11.1 Entrada al link público

El cliente llega desde Instagram, WhatsApp, código QR o link directo.

Ejemplos de URL:

```txt
https://appbarber.cl/avenida-cabell
https://appbarber.cl/avenida-cabell/ignacio
```

El link puede representar una barbería completa o un barbero específico.

### 11.2 Selección de barbero

Si el link es de una barbería, el cliente puede elegir barbero.

Ejemplo:

- Ignacio
- Tomás
- Diego

Cada barbero tendrá su propia disponibilidad.

### 11.3 Selección de servicio

El cliente selecciona el servicio.

Ejemplo:

- Corte básico — $12.000 — 30 minutos
- Degradado — $15.000 — 45 minutos
- Corte + barba — $18.000 — 60 minutos
- Barba — $8.000 — 25 minutos
- Servicio personalizado — precio variable

### 11.4 Selección de fecha y hora

El sistema muestra solo horarios disponibles según:

- Horario laboral del barbero.
- Duración del servicio.
- Reservas existentes.
- Bloqueos manuales.
- Pausas configuradas.
- Anticipación mínima de reserva.

### 11.5 Registro de datos

El cliente ingresa datos mínimos:

- Nombre.
- Teléfono.
- Instagram opcional.
- Correo opcional.

El teléfono será el identificador principal para evitar duplicidad de clientes.

### 11.6 Confirmación de reserva

El cliente confirma la reserva y el sistema muestra:

- Barbería.
- Barbero.
- Servicio.
- Fecha.
- Hora.
- Precio estimado.
- Dirección.
- Indicaciones adicionales.

La hora queda bloqueada automáticamente.

---

## 12. Flujo de recordatorio y confirmación

### 12.1 Recordatorio previo

El sistema debe enviar un recordatorio antes de la cita. Para el contexto inicial de Pichilemu, se define una referencia de una hora antes.

Mensaje ejemplo:

```txt
Hola Benjamín, tienes una hora con Ignacio en Barbería Avenida Cabell a las 12:00.
Confirma tu asistencia.
```

Opciones:

- Confirmar asistencia.
- Cancelar reserva.

### 12.2 Confirmación

Si el cliente confirma, la reserva pasa a estado `CONFIRMED`.

### 12.3 Cancelación

Si el cliente cancela, la reserva pasa a estado `CANCELLED_BY_CLIENT` y la hora queda disponible nuevamente, si las reglas configuradas lo permiten.

### 12.4 No confirmación

Si el cliente no confirma dentro del plazo definido, el sistema puede:

- Mantener la reserva como pendiente.
- Marcarla como riesgo de no asistencia.
- Notificar al barbero.
- Liberarla automáticamente si la barbería lo configuró.

---

## 13. Flujo del barbero

### 13.1 Configuración inicial

El barbero configura:

- Nombre público.
- Foto de perfil.
- Descripción breve.
- Servicios ofrecidos.
- Precios.
- Duración estimada.
- Horarios de atención.
- Días no disponibles.
- Dirección o barbería asociada.
- Link público.
- Métodos de pago aceptados.

### 13.2 Visualización de agenda

El barbero ve una agenda simple.

Ejemplo:

| Hora | Cliente | Servicio | Estado |
|---|---|---|---|
| 10:00 | Matías | Corte básico | Confirmado |
| 11:00 | Felipe | Corte + barba | Pendiente |
| 12:00 | Benjamín | Degradado | Confirmado |
| 13:00 | Libre | - | Disponible |

### 13.3 Acciones rápidas

Sobre cada cita, el barbero puede:

- Marcar como realizada.
- Marcar como no asistió.
- Cancelar.
- Reagendar.
- Ver datos del cliente.
- Agregar observación.
- Marcar pago recibido.
- Marcar pago pendiente.

### 13.4 Atención realizada

Después del servicio, el barbero marca la cita como realizada.

El sistema registra automáticamente:

- Cliente atendido.
- Servicio realizado.
- Precio del servicio.
- Fecha.
- Hora.
- Barbero.
- Barbería.
- Ingreso estimado.
- Historial del cliente.
- Métricas del barbero.
- Métricas del local.

### 13.5 Pago

El barbero puede registrar el método de pago:

- Efectivo.
- Transferencia.
- Tarjeta.
- Otro.

Estados posibles:

- Pagado.
- Pendiente.
- Parcial.
- No cobrado.

---

## 14. Flujo del administrador de barbería

### 14.1 Creación de barbería

El administrador crea un local con:

- Nombre.
- Dirección.
- Logo o imagen.
- Horarios generales.
- Barberos asociados.
- Servicios generales.
- Reglas de reserva.
- Link público.

### 14.2 Gestión de barberos

El administrador puede agregar barberos al local.

Datos del barbero:

- Nombre.
- Teléfono.
- Rol.
- Servicios que realiza.
- Horario.
- Tipo de relación con el local.
- Arriendo fijo, comisión o modalidad personalizada.
- Estado activo/inactivo.

### 14.3 Panel general

El administrador ve:

- Reservas del día.
- Atenciones realizadas.
- Clientes atendidos.
- Ingresos estimados.
- Ingresos pagados.
- Barbero con más atenciones.
- Barbero con más ingresos.
- No asistencias.
- Cancelaciones.
- Horas disponibles.
- Horas ocupadas.
- Arriendos pendientes.

### 14.4 Rendimiento por barbero

Ejemplo:

| Barbero | Atenciones | Ingresos estimados | No asistencias | Horas ocupadas |
|---|---:|---:|---:|---:|
| Ignacio | 7 | $105.000 | 1 | 6 h |
| Tomás | 5 | $70.000 | 0 | 4 h |
| Diego | 3 | $45.000 | 2 | 3 h |

### 14.5 Control de arriendo de silla

El administrador puede registrar:

- Barbero.
- Monto acordado.
- Periodicidad.
- Fecha de vencimiento.
- Estado del pago.
- Pagos realizados.
- Monto pendiente.
- Observaciones.

Estados posibles:

- Al día.
- Pendiente.
- Vencido.
- Parcial.
- Pagado.

---

## 15. Gestión de clientes

### 15.1 Creación automática

Cuando un cliente reserva por primera vez, el sistema crea automáticamente su ficha.

Datos mínimos:

- Nombre.
- Teléfono.
- Instagram.
- Correo.
- Fecha de primera reserva.
- Barbero asociado.
- Barbería asociada.

### 15.2 Historial

Cada cliente tendrá historial de:

- Servicios realizados.
- Fechas de atención.
- Barberos que lo atendieron.
- Montos pagados.
- Observaciones.
- No asistencias.
- Cancelaciones.
- Frecuencia de visita.

### 15.3 Cliente frecuente

El sistema debe identificar clientes frecuentes según:

- Cantidad de visitas.
- Frecuencia mensual.
- Monto total generado.
- Última atención.

Ejemplo:

```txt
Benjamín ha venido 5 veces en los últimos 2 meses.
```

### 15.4 Observaciones

El barbero puede agregar notas:

- Tipo de corte habitual.
- Preferencias.
- Detalles del servicio.
- Indicaciones específicas.

Ejemplo:

```txt
Siempre pide degradado bajo y rebaje con tijera arriba.
```

---

## 16. Gestión de servicios

Cada barbero o barbería puede crear servicios.

Campos:

- Nombre del servicio.
- Descripción opcional.
- Precio.
- Duración estimada.
- Estado activo/inactivo.
- Barberos que ofrecen el servicio.

Ejemplos:

- Corte básico.
- Degradado.
- Corte + barba.
- Barba.
- Perfilado de cejas.
- Diseño.
- Servicio premium.
- Servicio personalizado.

La duración es obligatoria para calcular disponibilidad real.

---

## 17. Agenda y disponibilidad

### 17.1 Horario laboral

Cada barbero configura sus días y horarios.

Ejemplo:

- Lunes a viernes: 10:00 a 19:00.
- Sábado: 10:00 a 15:00.
- Domingo: no disponible.

### 17.2 Bloqueos manuales

El barbero puede bloquear horarios por:

- Almuerzo.
- Trámite personal.
- Descanso.
- Día libre.
- Vacaciones.
- Emergencia.
- Evento especial.

### 17.3 Duración dinámica

La disponibilidad se calcula según la duración del servicio.

Ejemplo:

Si un cliente elige corte + barba de 60 minutos, el sistema debe mostrar bloques disponibles de 60 minutos.

### 17.4 Reglas de reserva

Configuraciones posibles:

- Anticipación mínima para reservar.
- Tiempo máximo hacia el futuro para reservar.
- Tiempo de tolerancia.
- Tiempo antes del recordatorio.
- Política de cancelación.
- Liberación automática por no confirmación.
- Bloqueo manual de agenda.

---

## 18. Estados de reserva

Estados principales:

| Estado | Descripción |
|---|---|
| `RESERVED` | El cliente tomó una hora |
| `PENDING_CONFIRMATION` | Falta confirmar asistencia |
| `CONFIRMED` | El cliente confirmó |
| `CANCELLED_BY_CLIENT` | El cliente canceló |
| `CANCELLED_BY_BARBER` | El barbero canceló |
| `NO_SHOW` | El cliente no llegó |
| `COMPLETED` | El servicio fue realizado |
| `PAID` | El servicio fue realizado y pagado |
| `PAYMENT_PENDING` | El servicio fue realizado, pero falta pago |

Flujo ideal:

```txt
RESERVED → CONFIRMED → COMPLETED → PAID
```

Flujos alternativos:

```txt
RESERVED → CANCELLED_BY_CLIENT
RESERVED → CANCELLED_BY_BARBER
RESERVED → NO_SHOW
COMPLETED → PAYMENT_PENDING → PAID
```

---

## 19. Registro de ingresos

El sistema registra ingresos principalmente de forma automática cuando una cita se marca como realizada.

Datos del ingreso:

- Cliente.
- Barbero.
- Barbería.
- Servicio.
- Monto.
- Fecha.
- Método de pago.
- Estado de pago.
- Origen del ingreso.

Orígenes posibles:

- Servicio realizado.
- Arriendo de silla.
- Pago manual.
- Otro ingreso.

---

## 20. Registro de gastos

El sistema permite registrar gastos simples.

Campos:

- Fecha.
- Categoría.
- Descripción.
- Monto.
- Responsable.
- Barbería asociada.
- Barbero asociado.
- Comprobante opcional.

Categorías sugeridas:

- Insumos.
- Herramientas.
- Máquinas.
- Arriendo de local.
- Publicidad.
- Mantención.
- Servicios básicos.
- Limpieza.
- Reparaciones.
- Otros.

---

## 21. Insumos y herramientas

### 21.1 Insumos

Ejemplos:

- Navajas.
- Talco.
- Gel.
- Cera.
- Alcohol.
- Spray de agua.
- Capas.
- Peines.
- Cepillos.
- Guantes.
- Toallas.
- Productos de limpieza.

### 21.2 Herramientas

Ejemplos:

- Máquina cortadora.
- Trimmer.
- Shaver.
- Secador.
- Tijeras.
- Navajas reutilizables.
- Baterías.
- Cargadores.
- Sillas.
- Espejos.

Campos sugeridos:

- Nombre.
- Fecha de compra.
- Costo.
- Categoría.
- Estado.
- Responsable.
- Observación.

### 21.3 Inventario avanzado futuro

En una versión futura, se podrá manejar:

- Stock real.
- Alertas de reposición.
- Consumo estimado por servicio.
- Historial de compras por proveedor.
- Costo operativo por corte.

---

## 22. Dashboard del barbero

Indicadores diarios:

- Reservas de hoy.
- Reservas confirmadas.
- Atenciones realizadas.
- Ingresos estimados.
- Ingresos pagados.
- Pagos pendientes.
- Horas libres.
- Próxima cita.

Indicadores mensuales:

- Total de atenciones.
- Total de ingresos.
- Total de gastos.
- Utilidad estimada.
- Servicio más vendido.
- Cliente más frecuente.
- Día con más atenciones.
- Promedio de cortes por día.
- No asistencias.

---

## 23. Dashboard del administrador

Indicadores diarios:

- Total de reservas.
- Total de atenciones realizadas.
- Total de ingresos estimados.
- Total de ingresos pagados.
- Total de clientes atendidos.
- Barbero con más atenciones.
- Barbero con más ingresos.
- No asistencias.
- Cancelaciones.

Indicadores mensuales:

- Ingresos generados por la barbería.
- Ingresos por barbero.
- Clientes únicos.
- Servicios más vendidos.
- Horarios con mayor demanda.
- Días con mayor movimiento.
- Gastos del local.
- Utilidad estimada.
- Arriendos pendientes.
- Arriendos pagados.

---

## 24. Métricas y estadísticas

### 24.1 Métricas de cliente

- Clientes nuevos.
- Clientes recurrentes.
- Clientes frecuentes.
- Clientes que no asistieron.
- Clientes con más gasto acumulado.
- Última visita por cliente.

### 24.2 Métricas de servicio

- Servicio más vendido.
- Servicio con mayor ingreso.
- Duración promedio por servicio.
- Servicios menos solicitados.

### 24.3 Métricas de barbero

- Atenciones realizadas.
- Ingresos generados.
- Horas ocupadas.
- Horas libres.
- Promedio de atención por día.
- Cancelaciones.
- No asistencias.
- Clientes recurrentes.

### 24.4 Métricas de barbería

- Flujo total de clientes.
- Ingresos totales.
- Gastos totales.
- Utilidad estimada.
- Rendimiento por barbero.
- Arriendos recibidos.
- Arriendos pendientes.
- Ocupación de agenda.

---

## 25. Tiempo de atención

El sistema debe poder estimar cuánto demora un barbero en cada servicio.

Formas de medición:

1. Según duración configurada del servicio.
2. Según hora de reserva y hora en que se marca como realizada.
3. Según inicio y término manual en una versión futura.

Primera versión:

```txt
Hora reservada + hora en que se marca como completada = duración aproximada
```

Ejemplo:

```txt
Benjamín reservó a las 12:00 por un degradado de 45 minutos.
Ignacio marca la cita como realizada a las 12:47.
El sistema registra duración aproximada de 47 minutos.
```

---

## 26. Notificaciones

### 26.1 Notificaciones al cliente

- Confirmación de reserva.
- Recordatorio antes de la cita.
- Solicitud de confirmación.
- Cancelación.
- Reagendamiento.
- Mensaje posterior opcional.

### 26.2 Notificaciones al barbero

- Nueva reserva.
- Reserva confirmada.
- Reserva cancelada.
- Cliente no confirma.
- Próxima cita.
- Pago pendiente.
- Cambio de agenda.

### 26.3 Notificaciones al administrador

- Resumen diario.
- Arriendo vencido.
- Baja actividad de barbero.
- Alta cantidad de cancelaciones.
- Reporte semanal o mensual.

### 26.4 Canales

Primera versión:

- Correo electrónico.
- Notificación interna dentro de la plataforma.

Futuro:

- WhatsApp.
- SMS.
- Push notifications.

---

## 27. Pagos

La aplicación permitirá registrar pagos, pero no necesariamente procesarlos online desde el inicio.

### 27.1 Métodos de pago registrados

- Efectivo.
- Transferencia.
- Tarjeta.
- Otro.

### 27.2 Estados de pago

- Pagado.
- Pendiente.
- Parcial.
- No cobrado.

### 27.3 Pagos online futuros

Integraciones futuras posibles:

- Webpay.
- Mercado Pago.
- Flow.
- Khipu.
- Abono para reservar.
- Pago anticipado parcial.

No se recomienda depender de pagos online en la primera versión.

---

## 28. Control de arriendos internos

El sistema debe permitir controlar el modelo donde un administrador arrienda espacios o sillas a otros barberos.

### 28.1 Tipos de acuerdo

- Arriendo fijo diario.
- Arriendo fijo semanal.
- Arriendo fijo mensual.
- Comisión por servicio.
- Modelo mixto.
- Acuerdo personalizado.

### 28.2 Registro de deuda

Para cada barbero:

- Monto acordado.
- Fecha de vencimiento.
- Monto pagado.
- Monto pendiente.
- Historial de pagos.
- Estado actual.

### 28.3 Impacto en flujo del local

Los pagos de arriendo se registran como ingresos del administrador o barbería, separados de los ingresos por servicios de cada barbero.

---

## 29. Reportes

Reportes sugeridos:

- Reporte diario.
- Reporte semanal.
- Reporte mensual.
- Reporte por barbero.
- Reporte por servicio.
- Reporte por cliente.
- Reporte de gastos.
- Reporte de arriendos.
- Reporte de no asistencias.
- Reporte de pagos pendientes.

Exportaciones futuras:

- PDF.
- Excel.
- CSV.

---

## 30. Configuración del negocio

Cada barbería o barbero puede configurar:

- Nombre del negocio.
- Logo.
- Dirección.
- Teléfono.
- Instagram.
- Horarios.
- Servicios.
- Precios.
- Duración.
- Reglas de reserva.
- Políticas de cancelación.
- Métodos de pago.
- Mensajes automáticos.
- Barberos activos.
- Permisos.

---

## 31. Reglas de negocio principales

### 31.1 Reserva

Una hora solo puede reservarse si está disponible según agenda y duración del servicio.

### 31.2 Bloqueo de horario

Una vez confirmada la reserva, el horario queda bloqueado.

### 31.3 Confirmación previa

El sistema solicita confirmación antes de la cita.

### 31.4 Registro automático

Cuando una cita se marca como realizada, el sistema genera automáticamente una atención e ingreso.

### 31.5 Cliente único

El sistema debe evitar duplicar clientes usando teléfono como identificador principal.

### 31.6 Servicio con duración

Cada servicio debe tener duración para calcular disponibilidad.

### 31.7 Visibilidad por rol

Un barbero solo ve su información salvo permisos especiales.

### 31.8 Arriendos

Los arriendos son independientes de los ingresos por servicios.

---

## 32. Requisitos funcionales

| ID | Requisito |
|---|---|
| RF01 | El sistema debe permitir registro de usuario. |
| RF02 | El sistema debe permitir login con email y contraseña. |
| RF03 | El sistema debe permitir crear una barbería. |
| RF04 | El sistema debe permitir crear perfil de barbero. |
| RF05 | El sistema debe permitir crear servicios con precio y duración. |
| RF06 | El sistema debe generar link público de reserva. |
| RF07 | El cliente debe poder reservar desde link público. |
| RF08 | El sistema debe crear o actualizar cliente automáticamente. |
| RF09 | El sistema debe bloquear la hora reservada. |
| RF10 | El sistema debe enviar recordatorio antes de la cita. |
| RF11 | El cliente debe poder confirmar o cancelar asistencia. |
| RF12 | El barbero debe poder ver su agenda. |
| RF13 | El barbero debe poder marcar una cita como realizada. |
| RF14 | El sistema debe registrar ingreso automáticamente. |
| RF15 | El sistema debe permitir registrar método de pago. |
| RF16 | El sistema debe permitir pagos pendientes. |
| RF17 | El sistema debe mostrar historial de cliente. |
| RF18 | El sistema debe mostrar dashboard del barbero. |
| RF19 | El sistema debe mostrar dashboard del administrador. |
| RF20 | El sistema debe permitir registrar gastos. |
| RF21 | El sistema debe permitir registrar insumos y herramientas. |
| RF22 | El sistema debe permitir gestionar arriendos. |
| RF23 | El sistema debe permitir reportes básicos. |
| RF24 | El sistema debe permitir reagendar citas. |
| RF25 | El sistema debe permitir cancelar reservas. |
| RF26 | El sistema debe permitir bloquear horarios. |
| RF27 | El sistema debe manejar roles y permisos. |
| RF28 | El sistema debe guardar sesiones seguras. |
| RF29 | El sistema debe permitir subir logo o foto de perfil. |
| RF30 | El sistema debe manejar jobs automáticos para recordatorios. |

---

## 33. Requisitos no funcionales

### 33.1 Usabilidad

La app debe ser simple, rápida y clara.

### 33.2 Rendimiento

Las pantallas principales deben cargar rápido, especialmente agenda, dashboard y reserva pública.

### 33.3 Mobile-first

Todas las pantallas deben funcionar correctamente en celular.

### 33.4 Seguridad

Los datos deben estar protegidos por autenticación, roles y permisos.

### 33.5 Privacidad

El sistema debe tratar cuidadosamente teléfonos, nombres, correos e historial de atención.

### 33.6 Escalabilidad

La arquitectura debe permitir crecer desde un barbero a múltiples barberías.

### 33.7 Mantenibilidad

El código debe estar organizado por módulos.

### 33.8 Portabilidad

La aplicación debe poder levantarse mediante Docker en servidor propio.

---

## 34. Entidades principales

### 34.1 User

Representa a una persona con acceso al sistema.

Campos sugeridos:

- id
- name
- email
- phone
- role
- passwordHash
- createdAt
- updatedAt
- status

### 34.2 Barbershop

Representa un local.

Campos sugeridos:

- id
- name
- slug
- address
- logoUrl
- phone
- instagram
- ownerId
- status
- createdAt
- updatedAt

### 34.3 Barber

Representa a un barbero.

Campos sugeridos:

- id
- userId
- barbershopId
- publicName
- slug
- photoUrl
- bio
- status
- createdAt
- updatedAt

### 34.4 Client

Representa a un cliente final.

Campos sugeridos:

- id
- name
- phone
- instagram
- email
- firstVisitAt
- lastVisitAt
- visitsCount
- notes
- createdAt
- updatedAt

### 34.5 Service

Representa un servicio ofrecido.

Campos sugeridos:

- id
- barbershopId
- barberId
- name
- description
- price
- durationMinutes
- status
- createdAt
- updatedAt

### 34.6 Booking / Appointment

Representa una hora agendada.

Campos sugeridos:

- id
- clientId
- barberId
- barbershopId
- serviceId
- startAt
- endAt
- status
- confirmationToken
- cancellationToken
- notes
- createdAt
- updatedAt

### 34.7 Attendance / CompletedService

Representa una atención efectivamente realizada.

Campos sugeridos:

- id
- appointmentId
- clientId
- barberId
- serviceId
- finalPrice
- estimatedDuration
- actualDuration
- completedAt
- paymentStatus
- createdAt
- updatedAt

### 34.8 Payment / Income

Representa dinero recibido o esperado.

Campos sugeridos:

- id
- type
- amount
- date
- method
- status
- barberId
- barbershopId
- appointmentId
- rentPaymentId
- createdAt
- updatedAt

### 34.9 Expense

Representa un gasto.

Campos sugeridos:

- id
- category
- description
- amount
- date
- responsibleUserId
- barbershopId
- barberId
- receiptUrl
- createdAt
- updatedAt

### 34.10 Supply / Tool

Representa un insumo o herramienta.

Campos sugeridos:

- id
- name
- category
- cost
- purchaseDate
- responsibleUserId
- barbershopId
- barberId
- status
- notes
- createdAt
- updatedAt

### 34.11 RentAgreement

Representa un acuerdo de arriendo.

Campos sugeridos:

- id
- barberId
- barbershopId
- type
- amount
- periodicity
- dueDay
- status
- createdAt
- updatedAt

### 34.12 RentPayment

Representa un pago de arriendo.

Campos sugeridos:

- id
- rentAgreementId
- amount
- paidAt
- method
- status
- notes
- createdAt
- updatedAt

---

## 35. Pantallas principales

### 35.1 Landing pública de barbería

Debe mostrar:

- Nombre de barbería.
- Dirección.
- Barberos disponibles.
- Servicios destacados.
- Botón para reservar.

### 35.2 Perfil público de barbero

Debe mostrar:

- Nombre.
- Foto.
- Bio.
- Servicios.
- Precios.
- Horarios disponibles.
- Botón de reserva.

### 35.3 Flujo de reserva

Debe permitir:

- Elegir servicio.
- Elegir fecha.
- Elegir hora.
- Ingresar datos.
- Confirmar reserva.

### 35.4 Agenda del barbero

Debe mostrar:

- Citas del día.
- Estados.
- Acciones rápidas.
- Horarios libres.

### 35.5 Dashboard del barbero

Debe mostrar:

- Atenciones.
- Ingresos.
- Gastos.
- Clientes frecuentes.
- Servicios más vendidos.
- Pagos pendientes.

### 35.6 Dashboard del administrador

Debe mostrar:

- Actividad del local.
- Rendimiento por barbero.
- Ingresos.
- Gastos.
- Arriendos.
- Clientes.
- No asistencias.

### 35.7 Clientes

Debe permitir:

- Buscar cliente.
- Ver historial.
- Ver datos.
- Agregar observaciones.

### 35.8 Gastos e insumos

Debe permitir:

- Registrar gasto.
- Clasificar gasto.
- Ver gastos por período.
- Registrar insumo o herramienta.

### 35.9 Arriendos

Debe permitir:

- Crear acuerdo.
- Registrar pago.
- Ver deuda pendiente.
- Ver historial.

### 35.10 Configuración

Debe permitir:

- Editar perfil.
- Editar horarios.
- Editar servicios.
- Editar reglas de reserva.
- Editar mensajes automáticos.
- Gestionar barberos.

---

## 36. Casos de uso principales

### 36.1 Cliente reserva hora

1. Cliente entra al link público.
2. Selecciona barbero.
3. Selecciona servicio.
4. Selecciona fecha y hora.
5. Ingresa nombre y teléfono.
6. Confirma reserva.
7. Sistema bloquea la hora.
8. Sistema crea o actualiza cliente.
9. Sistema muestra la reserva en agenda del barbero.

### 36.2 Cliente confirma asistencia

1. Sistema envía recordatorio.
2. Cliente selecciona confirmar.
3. Sistema cambia estado a confirmado.
4. Barbero ve la cita confirmada.

### 36.3 Cliente cancela

1. Cliente recibe recordatorio.
2. Selecciona cancelar.
3. Sistema cambia estado a cancelada.
4. Hora queda disponible según configuración.
5. Barbero recibe aviso.

### 36.4 Barbero realiza atención

1. Cliente llega.
2. Barbero realiza servicio.
3. Cliente paga.
4. Barbero marca cita como realizada.
5. Barbero registra pago.
6. Sistema crea atención.
7. Sistema crea ingreso.
8. Dashboard se actualiza.

### 36.5 Administrador revisa rendimiento

1. Administrador entra al panel.
2. Revisa barberos activos.
3. Ve atenciones por barbero.
4. Ve ingresos estimados.
5. Ve no asistencias.
6. Toma decisiones.

### 36.6 Administrador registra arriendo

1. Administrador entra a módulo de arriendos.
2. Selecciona barbero.
3. Registra monto pagado.
4. Sistema actualiza deuda.
5. Pago queda reflejado como ingreso interno.

---

## 37. Criterios de aceptación generales

El producto será considerado funcional cuando:

- Un barbero pueda crear su perfil.
- Un barbero pueda crear servicios con precio y duración.
- Un cliente pueda reservar desde link público.
- La hora aparezca en la agenda del barbero.
- El sistema pueda enviar o preparar recordatorio.
- El cliente pueda confirmar o cancelar.
- El barbero pueda marcar como realizada.
- El sistema genere atención automática.
- El sistema genere ingreso automático.
- El cliente quede registrado.
- El barbero pueda ver dashboard.
- El administrador pueda ver rendimiento por barbero.
- El administrador pueda registrar arriendos.
- El sistema diferencie ingresos, gastos y pagos pendientes.

---

## 38. Funcionalidades futuras

- Pagos online.
- Abono obligatorio para reservar.
- Integración con WhatsApp Business API.
- SMS.
- App móvil nativa.
- Notificaciones push.
- Programa de fidelización.
- Cupones o descuentos.
- Ranking de clientes frecuentes.
- Galería de fotos por cliente.
- Fotos antes/después del corte.
- Control avanzado de stock.
- Alertas de reposición.
- Reportes PDF.
- Reportes Excel.
- Comisiones automáticas.
- Integración con Instagram.
- Sistema de reseñas.
- Lista de espera para horas liberadas.
- Recomendaciones automáticas de horarios.
- Predicción de demanda.
- Multi-sucursal.
- Planes de suscripción.

---

## 39. Fuera de alcance inicial

No son prioridad inicial:

- Facturación electrónica.
- Integración con SII.
- Contabilidad tributaria formal.
- Liquidaciones legales.
- Contratos laborales.
- Gestión avanzada de remuneraciones.
- Inventario exacto por unidad.
- Marketplace abierto de barberías.
- Sistema complejo de pagos divididos.
- App móvil nativa desde el primer día.
- Kubernetes.
- Microservicios.
- Supabase managed.
- Firebase.

---

## 40. Riesgos del producto

### 40.1 Baja adopción por carga manual

Si el sistema exige demasiado registro manual, los barberos podrían dejar de usarlo.

Mitigación:

- Priorizar reservas automáticas.
- Minimizar formularios.
- Usar acciones rápidas.

### 40.2 Clientes que no confirman

Si los clientes no confirman, puede haber confusión con horas liberadas.

Mitigación:

- Reglas claras de confirmación.
- Estado de riesgo.
- Notificación al barbero.
- Configuración por barbería.

### 40.3 Uso informal de pagos

Muchos pagos serán en efectivo o transferencia.

Mitigación:

- Registrar método de pago sin exigir integración online.

### 40.4 Resistencia al cambio

Algunos barberos podrían preferir WhatsApp.

Mitigación:

- Mantener link público simple.
- Permitir compartir por WhatsApp e Instagram.
- No obligar a pagos online.

### 40.5 Datos duplicados

Clientes pueden ingresar nombres o teléfonos distintos.

Mitigación:

- Usar teléfono como identificador principal.
- Permitir fusionar clientes en una versión futura.

---

## 41. Métricas de éxito del producto

### 41.1 Métricas de uso

- Barberos registrados.
- Barberías registradas.
- Reservas creadas.
- Citas realizadas.
- Clientes registrados.
- Usuarios activos mensuales.

### 41.2 Métricas de valor

- Porcentaje de reservas realizadas.
- Reducción de no asistencias.
- Ingresos registrados automáticamente.
- Barberos que revisan dashboard.
- Administradores que usan módulo de arriendos.
- Frecuencia de uso semanal.

### 41.3 Métricas comerciales futuras

- Barberías activas pagando plan.
- Retención mensual.
- Conversión de prueba gratuita a pago.
- Ingreso mensual recurrente.
- Promedio de barberos por barbería.

---

## 42. Modelo de monetización posible

### 42.1 Plan individual

Para barberos independientes.

Incluye:

- Perfil público.
- Link de reservas.
- Agenda.
- Clientes.
- Dashboard básico.
- Ingresos y gastos.

### 42.2 Plan barbería

Para locales con varios barberos.

Incluye:

- Múltiples barberos.
- Panel de administrador.
- Rendimiento por barbero.
- Arriendos.
- Reportes.
- Configuración de local.

### 42.3 Plan premium

Para barberías más avanzadas.

Incluye:

- Recordatorios avanzados.
- WhatsApp integrado.
- Reportes exportables.
- Control de stock.
- Fidelización.
- Pagos online.
- Multi-sucursal.

---

# Sección técnica

## 43. Decisión tecnológica final

App Barber Pichilemu será construida como una aplicación web mobile-first, dockerizada y self-hosted, pensada para ser desplegada en un servidor propio mediante Docker y Traefik.

La decisión técnica principal es no depender de Supabase managed, Firebase u otra plataforma cloud obligatoria para base de datos, autenticación o storage en la primera versión.

En su lugar, el sistema usará:

- PostgreSQL propio.
- Autenticación interna.
- Storage local persistente.
- Workers propios para automatizaciones.
- Docker Compose para despliegue.
- Traefik como reverse proxy.

Esta decisión busca mantener control sobre costos, datos, infraestructura y despliegue.

---

## 44. Stack final recomendado

### 44.1 Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod

### 44.2 Backend

- Next.js App Router
- Server Actions
- API Routes
- Prisma ORM
- Validaciones con Zod

### 44.3 Base de datos

- PostgreSQL propio desplegado en Docker
- Prisma Migrate para migraciones
- Backups automáticos programados

### 44.4 Autenticación

- Better Auth
- Email y contraseña
- Sesiones persistidas en PostgreSQL
- Roles y permisos internos
- Recuperación de contraseña mediante correo

### 44.5 Automatizaciones

- pg-boss como sistema de jobs basado en PostgreSQL
- Worker separado en Docker
- Jobs programados para recordatorios, confirmaciones, liberación de horas y reportes

### 44.6 Storage

- Storage local mediante volumen Docker en primera versión
- Archivos servidos mediante rutas protegidas
- MinIO como alternativa futura compatible con S3

### 44.7 Notificaciones

- Correo transaccional mediante SMTP externo o Resend
- WhatsApp Business API o Twilio como integración futura
- Notificaciones internas dentro de la plataforma

### 44.8 Infraestructura

- Docker Compose
- Traefik como reverse proxy
- SSL manejado por Traefik
- Variables de entorno por ambiente
- Red interna privada
- Exposición pública solo del servicio web

---

## 45. Justificación de arquitectura

La arquitectura elegida permite:

- Desplegar todo en servidor físico propio.
- Mantener PostgreSQL bajo control propio.
- Evitar costos mensuales innecesarios.
- Ejecutar automatizaciones sin servicios externos obligatorios.
- Integrar WhatsApp o pagos más adelante.
- Mantener compatibilidad con Docker y Traefik desde el inicio.
- Facilitar backups y restauración.
- Escalar funcionalmente sin rehacer la base.

---

## 46. Arquitectura general

```txt
Cliente / Barbero / Administrador
        ↓
Dominio público
        ↓
Traefik Reverse Proxy
        ↓
Contenedor Next.js App
        ↓
PostgreSQL
        ↓
Worker pg-boss
        ↓
Notificaciones / Recordatorios / Jobs
```

Procesos principales:

1. Aplicación web.
2. Worker de automatizaciones.
3. Base de datos PostgreSQL.
4. Servicio de backups.
5. Storage local persistente.

---

## 47. Servicios Docker esperados

### 47.1 app

Servicio principal de Next.js.

Responsabilidades:

- Renderizar vistas públicas.
- Manejar panel de barbero.
- Manejar panel de administrador.
- Ejecutar Server Actions.
- Exponer API Routes.
- Gestionar autenticación.
- Procesar reservas, clientes, pagos, gastos y arriendos.

### 47.2 worker

Servicio encargado de jobs.

Responsabilidades:

- Enviar recordatorios.
- Detectar reservas no confirmadas.
- Liberar horarios si corresponde.
- Enviar avisos de cancelación.
- Enviar resúmenes diarios.
- Notificar arriendos vencidos.
- Reintentar jobs fallidos.

### 47.3 postgres

Base de datos principal.

Responsabilidades:

- Usuarios.
- Sesiones.
- Barberías.
- Barberos.
- Clientes.
- Reservas.
- Atenciones.
- Pagos.
- Gastos.
- Insumos.
- Herramientas.
- Arriendos.
- Jobs de pg-boss.

### 47.4 backup

Servicio o script programado.

Responsabilidades:

- Crear dumps automáticos.
- Guardar respaldos.
- Mantener historial.
- Permitir restauración.

### 47.5 minio opcional futuro

Storage compatible con S3.

Uso futuro:

- Fotos de perfil.
- Logos.
- Comprobantes.
- Reportes.
- Archivos persistentes.

---

## 48. Estructura recomendada del repositorio

```txt
app-barber-pichilemu/
│
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
├── next.config.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── app/
│   ├── modules/
│   ├── lib/
│   ├── workers/
│   └── components/
│
├── uploads/
├── backups/
├── .env.example
├── .env.production.example
└── README.md
```

---

## 49. Docker Compose base esperado

```yaml
services:
  app:
    build: .
    container_name: barber_app
    restart: unless-stopped
    depends_on:
      - postgres
    env_file:
      - .env.production
    networks:
      - internal
      - traefik
    labels:
      - traefik.enable=true
      - traefik.http.routers.barber-app.rule=Host(`appbarber.cl`)
      - traefik.http.routers.barber-app.entrypoints=websecure
      - traefik.http.routers.barber-app.tls.certresolver=letsencrypt
      - traefik.http.services.barber-app.loadbalancer.server.port=3000
    volumes:
      - uploads_data:/app/uploads

  worker:
    build: .
    container_name: barber_worker
    restart: unless-stopped
    command: npm run worker
    depends_on:
      - postgres
    env_file:
      - .env.production
    networks:
      - internal
    volumes:
      - uploads_data:/app/uploads

  postgres:
    image: postgres:16
    container_name: barber_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: barber_db
      POSTGRES_USER: barber_user
      POSTGRES_PASSWORD: strong_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - internal

volumes:
  postgres_data:
  uploads_data:

networks:
  internal:
    driver: bridge
  traefik:
    external: true
```

La base de datos no debe exponerse públicamente.

---

## 50. Autenticación

La autenticación se manejará con Better Auth conectado a PostgreSQL.

Debe soportar:

- Registro.
- Login.
- Logout.
- Recuperación de contraseña.
- Sesiones seguras.
- Roles.
- Permisos.
- Asociación de usuarios a barberías.
- Asociación de usuarios a perfiles de barbero.

Roles iniciales:

```txt
SUPER_ADMIN
BARBERSHOP_ADMIN
BARBER
```

Los clientes finales no requieren cuenta inicialmente. Confirmaciones y cancelaciones se manejarán mediante links con tokens seguros asociados a la reserva.

---

## 51. Storage

Primera versión:

- Storage local con volumen Docker.
- Archivos fuera del contenedor principal.
- Metadata en PostgreSQL.

Rutas sugeridas:

```txt
/uploads/barbers/
/uploads/barbershops/
/uploads/receipts/
```

Se recomienda crear una capa de abstracción:

```txt
StorageService.upload()
StorageService.getSignedUrl()
StorageService.delete()
```

Esto permitirá migrar a MinIO sin reescribir módulos.

---

## 52. Automatizaciones y jobs

El sistema usará pg-boss.

Jobs principales:

### 52.1 booking.created

Responsabilidades:

- Guardar reserva.
- Crear o actualizar cliente.
- Agendar recordatorio.
- Notificar al barbero.

### 52.2 booking.reminder

Responsabilidades:

- Enviar recordatorio.
- Solicitar confirmación.
- Cambiar estado si corresponde.

### 52.3 booking.confirmation-timeout

Responsabilidades:

- Marcar reserva como no confirmada.
- Notificar al barbero.
- Liberar hora si está configurado.

### 52.4 booking.cancelled

Responsabilidades:

- Liberar horario.
- Notificar al barbero.
- Actualizar dashboard.

### 52.5 booking.completed

Responsabilidades:

- Crear atención.
- Registrar ingreso.
- Actualizar historial del cliente.
- Actualizar métricas.

### 52.6 daily.summary

Responsabilidades:

- Enviar resumen diario al barbero.
- Enviar resumen diario al administrador.

### 52.7 rent.due-reminder

Responsabilidades:

- Notificar arriendo pendiente.
- Marcar arriendo vencido si corresponde.
- Actualizar panel del administrador.

---

## 53. Notificaciones técnicas

Primera versión:

- Email con SMTP externo o Resend.
- Notificaciones internas.

Interfaz recomendada:

```ts
NotificationService.sendEmail()
NotificationService.sendWhatsApp()
NotificationService.sendSms()
```

Solo `sendEmail` será obligatorio al inicio. WhatsApp y SMS quedan preparados para futuro.

---

## 54. Variables de entorno

```env
NODE_ENV=production
APP_URL=https://appbarber.cl

DATABASE_URL=postgresql://barber_user:password@postgres:5432/barber_db

BETTER_AUTH_SECRET=secret
BETTER_AUTH_URL=https://appbarber.cl

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASSWORD=password
SMTP_FROM=no-reply@appbarber.cl

UPLOADS_DIR=/app/uploads

TZ=America/Santiago
```

Las credenciales no deben subirse al repositorio.

---

## 55. Migraciones

Prisma será usado para migraciones.

Desarrollo:

```bash
npx prisma migrate dev
```

Producción:

```bash
npx prisma migrate deploy
```

El despliegue debe contemplar ejecutar migraciones antes de iniciar la app o mediante comando controlado.

---

## 56. Backups

Estrategia inicial:

- Backup diario de PostgreSQL.
- Archivo comprimido.
- Guardado en volumen local.
- Retención de 7 a 30 días.
- Backup de uploads.
- Documentar proceso de restauración.

Ejemplo:

```txt
/backups/postgres/barber_db_2026-06-23.sql.gz
/backups/uploads/uploads_2026-06-23.tar.gz
```

---

## 57. Observabilidad y logs

Primera versión:

- Logs de Docker.
- Logs de app.
- Logs de worker.
- Logs de jobs fallidos.
- Logs de notificaciones fallidas.

Futuro:

- Grafana.
- Prometheus.
- Loki.
- Sentry.
- Uptime Kuma.

---

## 58. Seguridad

Consideraciones:

- PostgreSQL no expuesto públicamente.
- HTTPS obligatorio.
- Traefik exponiendo solo la app.
- Variables sensibles fuera del repositorio.
- Hash seguro de contraseñas.
- Sesiones protegidas.
- Validaciones con Zod.
- Rate limit en login.
- Rate limit en reservas públicas.
- Tokens seguros para confirmar/cancelar.
- Backups protegidos.
- Control de permisos por barbería.
- Separación de redes Docker.

---

## 59. Ambientes

### 59.1 Desarrollo local

Incluye:

- App.
- PostgreSQL local.
- Worker.
- Mail catcher opcional.
- Seed de datos.

### 59.2 Producción

Incluye:

- App.
- Worker.
- PostgreSQL.
- Backups.
- Traefik.
- SSL.
- Storage persistente.

### 59.3 Staging opcional

Ambiente previo a producción para probar cambios.

---

## 60. Arquitectura de carpetas recomendada

```txt
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── admin/
│   └── api/
│
├── modules/
│   ├── auth/
│   ├── barbershops/
│   ├── barbers/
│   ├── clients/
│   ├── services/
│   ├── bookings/
│   ├── appointments/
│   ├── payments/
│   ├── expenses/
│   ├── rents/
│   ├── notifications/
│   └── jobs/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── env.ts
│   ├── storage.ts
│   └── permissions.ts
│
├── workers/
│   ├── index.ts
│   ├── booking.worker.ts
│   ├── notification.worker.ts
│   └── rent.worker.ts
│
└── components/
    ├── ui/
    ├── forms/
    ├── dashboard/
    └── booking/
```

---

## 61. Decisiones fuera de alcance técnico inicial

No se utilizará inicialmente:

- Supabase managed.
- Firebase.
- Kubernetes.
- Microservicios.
- App móvil nativa.
- Redis obligatorio.
- Pagos online obligatorios.
- WhatsApp obligatorio.
- Inventario avanzado obligatorio.
- Facturación electrónica.
- Integración con SII.

---

## 62. Decisión técnica final resumida

```txt
Aplicación web mobile-first construida con Next.js y TypeScript,
desplegada en Docker sobre servidor propio,
expuesta mediante Traefik,
con PostgreSQL propio como base de datos,
Prisma como ORM,
Better Auth para autenticación,
pg-boss para automatizaciones,
storage local persistente en volumen Docker
y arquitectura preparada para integrar MinIO, WhatsApp y pagos online en futuras versiones.
```

---

## 63. Frase guía del producto

> Que el barbero trabaje cortando, y que la app ordene el negocio por detrás.

---

## 64. Conclusión

App Barber Pichilemu busca transformar una operación informal en una operación ordenada, automatizada y medible.

La clave del producto no está solo en registrar información, sino en capturarla desde el flujo natural del negocio: cuando el cliente reserva, confirma y asiste.

El producto debe ser simple, rápido y adaptado a la realidad de barberos que trabajan con redes sociales, efectivo, transferencia, clientes frecuentes y horarios dinámicos.

La primera base del sistema debe resolver reservas automatizadas, agenda, clientes, atenciones, ingresos, dashboard, gastos, insumos, arriendos y roles. Sobre esa base, el producto podrá evolucionar hacia WhatsApp, pagos online, fidelización, reportes avanzados y control de stock.
