#!/bin/sh
set -e

echo "############################"
echo "*** Waiting for database ***"
echo "############################"

echo "Waiting for database to be available..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "Database is up"

echo "###########################"
echo "*** Applying Migrations ***"
echo "###########################"

cd /app/drizzle
pnpm tsx apply-migrations.ts

echo "############################"
echo "*** Migrations Complete! ***"
echo "############################"

exec "$@"
