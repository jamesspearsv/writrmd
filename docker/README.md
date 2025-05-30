# Deploy with Docker Compose

Read this to get started using Writr.md with Docker and Docker Compose

The included `docker-compose.yaml` starts a container running Writr.md using the `writrmd:latest, uses [Caddy](https://caddyserver.com/) as a reverse proxy, includes a Postgres database running in a separate container

## Prerequisites

1. Copy the `docker-compose.yaml` and `Caddyfile` from here into an empty directory
2. Add a `.env` file into your directory with the following variables

## Environment setup

```env
NODE_ENV=production
# Admin username and password values
ADMIN_USERNAME=[...]
ADMIN_PASSWORD=[...]
# Two variables below required by Auth.js
# https://authjs.dev/getting-started/deployment
AUTH_SECRET=[...]
AUTH_TRUST_HOST=true

# Postgres credentials and connection details
POSTGRES_USER=[...]
POSTGRES_PASSWORD=[...]
POSTGRES_DB=[...]
```

## Running the app

Run `docker compose up -d` to get started.
