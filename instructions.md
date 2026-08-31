# Kindle Display

## Documentation

- [Upstream project README](https://github.com/dennisreimann/kindle-display) — covers the Kindle jailbreak, USB networking, and the server-side setup.
- [Blog post: Kindle Status Display](https://d11n.net/kindle-status-display.html) — the author's write-up on the project.

## What you get on StartOS

Kindle Display runs a web server that generates a grayscale screenshot for a jailbroken Kindle e-reader. The screenshot shows Bitcoin block height, exchange rates, mempool fees, Lightning network statistics, and Bitcoin quotes.

On StartOS you get:

- A **Web Interface** on port 3030 — serves the display page and `display.png` that the Kindle fetches. The address is plain **http://** (no HTTPS): the Kindle's browser cannot validate the self-signed certificate StartOS would otherwise present, so an HTTPS address would make the display unreachable. Use the URL on your LAN only — the traffic is not encrypted.
- A **Configure** action to adjust the display theme, exchange rate currencies, and update interval.
- **Mempool** (required) — the block height, fees, mempool blocks, Lightning statistics, and exchange rates come from your local Mempool instance.

## Getting set up

1. Install **Kindle Display** from the marketplace. **Mempool** is installed automatically as a required dependency.
2. Open **Kindle Display** and click **Configure** to choose your display theme, exchange rate currencies, and update interval.
3. Find the **Web Interface** URL on the service's Interfaces tab. It starts with `http://` — this is deliberate, see above.
4. On your jailbroken Kindle, configure the update script to fetch `display.png` from the Web Interface URL. See the [upstream README](https://github.com/dennisreimann/kindle-display) for Kindle-side setup instructions.
5. The display updates immediately on start, then on the configured interval (default 5 minutes).
