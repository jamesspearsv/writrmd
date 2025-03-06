# Deploy with Docker Compose

Read this to get started using Writr.md with Docker and Docker Compose

The included `docker-compose.yaml` starts a container running Writr.md using the `writrmd:latest and uses [Caddy](https://caddyserver.com/) as a reverse proxy.

## Prerequisites

1. Copy the `docker-compose.yaml` and `Caddyfile` from here into an empty directory
2. Add an empty`pages` and `posts` directories into your directory
3. Add a `.env` file into your directory with the following variables

## Environment setup

```env
NODE_ENV=production
# Admin username and password values
ADMIN_USERNAME=[...]
ADMIN_PASSWORD=[...]
# The two variables below required by Auth.js
# https://authjs.dev/getting-started/deployment
AUTH_SECRET=[...]
AUTH_TRUST_HOST=true
```

## Running the app

Run `docker compose up -d` to get started.
