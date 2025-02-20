# Deploy with Docker Compose

The files here should help you set up Writr.md using Docker Compose.

The included `docker-compose.yaml` starts a container running Writr.md uses [Caddy](https://caddyserver.com/) as a reverse proxy.

Copy the `docker-compose.yaml` and `Caddyfile` into an empty directory, add a `pages` and `posts` directories, and run `docker compose up -d` to get started.
