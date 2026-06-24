# Arquitectura inicial

El PRD es la fuente de verdad funcional: [PRD_App_Barber_Pichilemu_v1.md](./PRD_App_Barber_Pichilemu_v1.md).

## Decisiones de base

- Next.js App Router concentra las rutas públicas, paneles y mutaciones de dominio.
- PostgreSQL es la única fuente de datos operacional. Prisma mantiene el esquema y las migraciones.
- Better Auth autentica únicamente a usuarios internos; el cliente final opera con tokens seguros de reserva.
- pg-boss corre en un proceso `worker` independiente y usa PostgreSQL para jobs confiables.
- Los archivos viven bajo `/app/uploads`, montado como volumen. El acceso pasa por una futura abstracción `StorageService` para permitir migrar a MinIO.
- Docker separa `app`, `worker` y `postgres` en una red interna. En producción Traefik expone únicamente la aplicación.

## Límites de los módulos

Cada módulo en `src/modules` es dueño de sus validaciones, casos de uso y consultas. Los componentes sólo presentan datos; las reglas de negocio, control de acceso y transacciones quedan del lado del servidor.

La primera iteración cubre el esqueleto funcional y mantiene como siguientes hitos: disponibilidad real, creación transaccional de reservas, notificaciones por correo y dashboards conectados a datos reales.
