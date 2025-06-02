# Deploy with Docker Compose

Read this to get started using Writr.md with Docker and Docker Compose

The included `docker-compose.yaml` starts a container running Writr.md using the `writrmd:latest, uses [Caddy](https://caddyserver.com/) as a reverse proxy, includes a Postgres database running in a separate container

## Prerequisites

1. Copy the `docker-compose.yaml` and `Caddyfile` from here into an empty directory
2. Add a `.env` file into your directory with the following variables

## Environment setup

```env
NODE_ENV=production
### NEXTJS VARIABLES (REQUIRED) ###
AUTH_SECRET=[...] # Secret key for Auth.js
ADMIN_USERNAME=[...] # Username for admin dashboard access
ADMIN_PASSWORD=[...] # Password for admin dashboard access
AUTH_TRUST_HOST=true # Required by AuthJS

### POSTGRES DOCKER CONTAINER CREDENTIALS (OPTIONAL) ###
POSTGRES_USER=[...]
POSTGRES_PASSWORD=[...]
POSTGRES_DB=[...]

### POSTGRES CONNECTION STRING (REQUIRED) ###
POSTGRES_URL=postgres://[...] ## Connection string for your container or Postgres server
```

## Running the app

Run `docker compose up -d` to get started.
