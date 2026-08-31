import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multi = sdk.MultiHost.of(effects, 'ui')
  // The Kindle cannot validate a self-signed TLS cert, so the UI is plain HTTP
  // only: `secure: { ssl: false }` publishes the plaintext forward on LAN gateways.
  const origin = await multi.bindPort(uiPort, {
    protocol: null,
    addSsl: null,
    preferredExternalPort: 80,
    secure: { ssl: false },
  })

  const ui = sdk.createInterface(effects, {
    name: i18n('Web Interface'),
    id: 'ui',
    description: i18n(
      'Serves the display page and display.png screenshot for the Kindle',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: { ssl: null, noSsl: 'http' },
    username: null,
    path: '',
    query: {},
  })

  return [await origin.export([ui])]
})
