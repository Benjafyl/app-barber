# App Barber Pichilemu

Aplicación web mobile-first para que barberos independientes y barberías pequeñas gestionen reservas, agenda, clientes e ingresos sin convertir la operación diaria en trabajo administrativo.

La definición funcional está en [docs/PRD_App_Barber_Pichilemu_v1.md](./docs/PRD_App_Barber_Pichilemu_v1.md). Las decisiones iniciales se resumen en [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Base creada

- Next.js 16 con App Router, TypeScript estricto, Tailwind CSS y shadcn/ui.
- Modelo PostgreSQL/Prisma para usuarios, sesiones, barberías, barberos, clientes, servicios, reservas, atenciones, pagos, gastos, insumos, herramientas, arriendos, notificaciones y disponibilidad.
- Better Auth preparado para usuarios internos y roles `SUPER_ADMIN`, `BARBERSHOP_ADMIN` y `BARBER`.
- Worker `pg-boss` separado con los jobs definidos por el PRD.
- Rutas públicas de ejemplo para barbería, barbero y reserva; paneles protegidos para barbero y administrador.
- Docker Compose de desarrollo y una sobrecapa de producción preparada para Traefik.

## Requisitos

- Node.js 22 o superior.
- Docker Compose v2 para ejecutar PostgreSQL localmente.

## Desarrollo local

1. Crea el archivo local de variables y configura secretos válidos:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Levanta PostgreSQL:

   ```powershell
   docker compose up -d postgres
   ```

3. Instala dependencias y genera el cliente Prisma:

   ```powershell
   npm install
   npm run prisma:generate
   ```

4. Crea la primera migración una vez definido el entorno:

   ```powershell
   npm run prisma:migrate -- --name initial_schema
   ```

5. Ejecuta la aplicación y el worker en terminales separadas:

   ```powershell
   npm run dev
   npm run worker
   ```

La aplicación estará en `http://localhost:3000`.

Para ejecutar app, worker y PostgreSQL dentro de Docker:

```powershell
docker compose up --build
```

## Variables de entorno

`.env.example` contiene todas las variables necesarias. Nunca subas `.env` ni `.env.production` al repositorio.

| Variable | Uso |
| --- | --- |
| `DATABASE_URL` | Conexión PostgreSQL para app, Prisma y pg-boss. |
| `BETTER_AUTH_SECRET` | Secreto de sesiones; mínimo 32 caracteres. |
| `APP_URL` / `BETTER_AUTH_URL` | URL pública de la aplicación. |
| `SMTP_*` | Canal de correo preparado para recordatorios. |
| `UPLOADS_DIR` | Directorio persistente de storage local. |

## Datos semilla de desarrollo

El seed crea dos tenants aislados en la misma base de datos: **The House Fade** y **Barbería Peters Rocher**. Incluye usuarios internos, membresías, barberos, servicios y acuerdos de subarriendo pendientes de configurar para The House Fade.

No crea cuentas de autenticación ni contraseñas; los usuarios sembrados son perfiles internos para probar relaciones multi-tenant. El comando es idempotente: puede ejecutarse varias veces sin duplicar tenants, barberos, servicios, membresías ni acuerdos de arriendo.

Inspecciona el estado sin modificar la base:

```powershell
$env:SEED_DRY_RUN=1
npm run seed:dev
```

Aplica o sincroniza los datos de prueba:

```powershell
Remove-Item Env:SEED_DRY_RUN -ErrorAction Ignore
npm run seed:dev
```

## Producción con Traefik

1. Provisiona una red externa de Traefik una sola vez:

   ```bash
   docker network create traefik
   ```

2. Crea `.env.production` a partir de `.env.production.example`; utiliza contraseñas y secretos reales.
3. Revisa el dominio y el `certresolver` en `docker-compose.prod.yml` para que coincidan con tu instalación de Traefik.
4. Despliega:

   ```bash
   docker compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up -d --build
   ```

La base de datos no publica puertos. Sólo `app` entra a la red Traefik; `worker` y `postgres` permanecen dentro de `internal`.

## Estructura

```text
src/
├── app/                 # Rutas públicas, auth, paneles y API
├── components/          # UI reusable y componentes por superficie
├── lib/                 # Prisma, auth, permisos, entorno y storage
├── modules/             # Casos de uso y validaciones por dominio
└── workers/             # Proceso pg-boss y handlers de jobs
```

## Próximos hitos

1. Implementar creación transaccional de reservas y cálculo de disponibilidad.
2. Conectar registro/login con Better Auth y alta inicial de barbería.
3. Convertir el job `booking.created` en recordatorio por correo y enlaces seguros de confirmación/cancelación.
4. Conectar dashboards a atenciones, pagos, gastos y arriendos reales.
