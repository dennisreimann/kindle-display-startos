#!/bin/bash
# updater-loop.sh — replaces the upstream cron job.
# Runs cron.sh (data.mjs fetch + screenshot) immediately on start, then
# sleeps UPDATE_INTERVAL seconds between updates.

UPDATE_INTERVAL="${UPDATE_INTERVAL:-300}"
cd /app

run_update() {
  ./cron.sh 2>&1 || true
}

# First update immediately so the Kindle has a picture right away
run_update

while true; do
  sleep "${UPDATE_INTERVAL}"
  run_update
done
