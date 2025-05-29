#!/bin/sh
cd ./docker-migrations
echo "*** Applying Migrations ***"
pnpm tsx migrate.ts

exec "$@"

