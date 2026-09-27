# NOVA PMS

NOVA is a cloud-native, multi-tenant hotel property management system. The product specification is in [nova-pms.md](nova-pms.md).

## Development foundation

The repository is a pnpm TypeScript monorepo. The planned runtime consists of a React/Vite web client, a Fastify API, shared validation/types packages, PostgreSQL via Prisma, and Redis for jobs and ephemeral coordination. Business features are intentionally not part of this foundation checkpoint.

### Prerequisites

- Node.js 22.14 or newer
- Corepack with pnpm 10.11.0
- Docker Engine or Docker Desktop with Compose

### Local services

1. Copy `.env.example` to `.env` and replace the local-only credentials if needed.
2. Start PostgreSQL and Redis with `docker compose up -d`.
3. Check service health with `docker compose ps`.
4. Stop services with `docker compose down`. Use `docker compose down -v` only when intentionally deleting local database data.

Both service ports bind to loopback only. Never use the example credentials outside local development.

### Workspace

Application and shared-package workspaces live under `apps/` and `packages/`. Install dependencies with `corepack pnpm install` after verifying the required Node.js and Corepack versions. The root scripts provide the repository-wide development, build, typecheck, lint, test, and formatting entry points as packages are added.

## Security baseline

- Keep secrets in an ignored `.env` file; commit only `.env.example`.
- Enforce organization/property authorization in API queries and business services, never only in the client.
- Treat PostgreSQL as the source of truth for inventory and reservation transactions.
- Do not expose local service ports on public network interfaces.
