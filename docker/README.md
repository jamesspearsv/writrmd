# Deploy with Docker Compose

Read this to get started using Writr.md with Docker and Docker Compose

The included `docker-compose.yaml` starts a container running Writr.md and uses [Caddy](https://caddyserver.com/) as a reverse proxy.

Copy the `docker-compose.yaml` and `Caddyfile` from here into an empty directory, add a `pages` and `posts` directories. Add a `.env` file into your directory with the following variables:

```env
NODE_ENV=production
ADMIN_USERNAME=[...]
ADMIN_PASSWORD=[...]
# The two variables below required by Auth.js
# https://authjs.dev/getting-started/deployment
AUTH_SECRET=[...]
AUTH_TRUST_HOST=true
```

Run `docker compose up -d` to get started.
