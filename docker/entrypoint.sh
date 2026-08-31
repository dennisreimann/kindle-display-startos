#!/bin/bash
set -e

# data/ is on the persistent volume (mounted at /app/data by the daemon).
# Seed an empty data.json so the web server doesn't ENOENT before the first
# update cycle writes real data.
mkdir -p /app/data
if [ ! -f /app/data/data.json ]; then
  echo '{}' > /app/data/data.json
fi

# upstream cron.sh and data.mjs source .env — truncate it so that no stale
# .env baked into the image can leak old config. Real config arrives via
# environment variables from the daemon.
: > /app/.env

exec "$@"