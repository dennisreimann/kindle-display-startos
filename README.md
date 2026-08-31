# Kindle Display on StartOS

> Everything not listed in this document should behave the same as upstream kindle-display.

## Image and Container Runtime

The package builds a custom Docker image from `upstream/server/` (a git submodule pinned to [dennisreimann/kindle-display](https://github.com/dennisreimann/kindle-display)). The image is based on `node:24-slim` and installs `firefox-esr`, `pngcrush`, `psmisc`, and `ca-certificates`. Data fetching is pure Node.

The upstream `server/` directory is included as a git submodule. Configuration arrives via environment variables (`MEMPOOL_BASE_URL`, `DISPLAY_THEME`, `DISPLAY_RATE1/2`). Data files (`data.json`, `display.png`) live in `server/data/`, which in StartOS is the volume mount point. StartOS-specific setup is in `docker/`:

- `docker/entrypoint.sh` — seeds an empty `data.json`, truncates `.env` (config arrives via daemon env vars), then execs the daemon command. No X server is involved.
- `docker/updater-loop.sh` — replaces the upstream cron job; runs the data fetch + screenshot immediately on start, then repeats on the configured interval.

Two daemons share a single subcontainer:

- **`web`** — the Express webserver (`node index.js`) on port 3030. Serves the display page and `display.png`.
- **`updater`** — runs `updater-loop.sh`, which calls the upstream `cron.sh` (data fetch + screenshot). Requires `web` to be ready first.

## Volume and Data Layout

Single volume `main` mounted at `/app/data` inside the subcontainer — the `server/data/` directory in upstream. Contains:

- `store.json` — StartOS-level configuration (theme, rates, update interval)
- `data.json` — last fetched data (written by `data.mjs` via `npm run data`)
- `display.png` — last generated grayscale screenshot (written by `cron.sh`)

## Network Access and Interfaces

One interface on port 3030 (`type: 'ui'`), serving the display page and `display.png`. The Kindle points its update script at this URL.

The interface is bound as a **plain-HTTP binding** (`protocol: null`, `secure: { ssl: false }`, `schemeOverride: { ssl: null, noSsl: 'http' }`) rather than the usual `protocol: 'http'` treatment. StartOS would otherwise front the port with its own TLS listener, terminating with a self-signed device certificate that the Kindle's browser cannot validate — the display would be unreachable from the device. Marking the binding non-SSL publishes the plaintext forward on the LAN gateways (StartOS suppresses plaintext addresses unless the binding explicitly declares itself plain — a `secure: null` binding follows the gateway's security policy instead), so the Interfaces tab shows only `http://` addresses and the port is DNAT'd straight to the container with no TLS listener in front.

Consequences: running `setupInterfaces` in a later version that reverts to `protocol: 'http'` would silently drop the http address again, and the interface carries no HTTPS variant at all — traffic is plain on the LAN. That is acceptable here: the display is public status data, not a credential surface.

The updater daemon pulls all display data from a **required local Mempool** instance (via the `MEMPOOL_BASE_URL` bridge):

- **Mempool** (local, direct) — block height, fees, mempool blocks, Lightning statistics, exchange rates
- **bitcoin-quotes.com** (external) — quotes for the plain theme

Note: upstream `data.mjs` performs its own HTTP requests and does not route through a SOCKS5/Tor proxy, so the external bitcoin-quotes call goes out directly.

## Actions (StartOS UI)

- **Configure** — adjust display theme (plain/onchain/lightning/random), primary and secondary exchange rate currency (USD/EUR/GBP/CHF/CAD/AUD/JPY), and update interval.

## Backups and Restore

The `main` volume is backed up in full. This preserves `store.json` (configuration), `data.json` (last data), and `display.png` (last screenshot). Restore re-initializes without any special handling.

## Health Checks

- **Web Interface** — `checkPortListening` on port 3030. Reports ready when the Express server is accepting connections.
- **Data Updater** — checks that `data.json` exists and was modified within twice the update interval. Reports `loading` while the first update is in progress, `success` once data is fresh.

## Dependencies

- **Mempool** (required) — provides the block height, fees, mempool blocks, Lightning statistics, and exchange rates displayed on the Kindle.

Tor and Bitcoin were previously dependencies of this package. Upstream dropped SOCKS/Tor proxy support from its data pipeline when data fetching moved from `data.sh` (shell/curl) to pure-Node `data.mjs` in the `Refactor data fetching and views` commit, and block height now comes from Mempool rather than a local node. So Tor and Bitcoin are no longer needed.

## Limitations and Differences

- **No cron** — the upstream cron job is replaced by the `updater` daemon's loop script. The update interval is configurable via the Configure action (default 300 seconds).
- **No X server / Xvfb** — the screenshot is taken by headless Firefox. `cron.sh` writes an absolute output path, keeps firefox-esr/pngcrush noise out of the logs, and logs one short line per run: `screenshot ok - block height <n>` on success, or `screenshot failed - keeping previous display.png` (exit 1, previous image kept) on failure.

## What Is Unchanged from Upstream

- The Express webserver, Pug templates, static assets, and `helpers.mjs` are used as-is.
- The `cron.sh` screenshot pipeline is unchanged.
- All upstream themes (plain, onchain, lightning, random) are available.
