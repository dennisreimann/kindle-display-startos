import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { uiPort, mempoolBridge } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting kindle-display!'))

  const store = await storeJson.read().const(effects)

  // Mempool is a required dependency: data.mjs fetches the block height, fees,
  // mempool blocks, Lightning statistics and exchange rates from it. The bridge
  // resolves to host:port, so prefix it with http:// for the Mempool base URL.
  const mempoolAddr = await mempoolBridge(effects).const()

  const sharedEnv: Record<string, string> = {
    DISPLAY_SERVER_PORT: String(uiPort),
    DISPLAY_THEME: store?.theme ?? 'plain',
    DISPLAY_RATE1: store?.rate1 ?? 'USD',
    DISPLAY_RATE2: store?.rate2 ?? 'EUR',
    MEMPOOL_BASE_URL: `http://${mempoolAddr}`,
  }

  const mounts = sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/app/data',
    readonly: false,
  })

  const sub = sdk.SubContainer.of(
    effects,
    { imageId: 'kindle-display' },
    mounts,
    'main',
  )

  return sdk.Daemons.of(effects)
    .addDaemon('web', {
      subcontainer: sub,
      exec: {
        command: sdk.useEntrypoint(),
        env: sharedEnv,
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('updater', {
      subcontainer: sub,
      exec: {
        command: sdk.useEntrypoint(['/app/updater-loop.sh']),
        env: {
          ...sharedEnv,
          UPDATE_INTERVAL: String(store?.updateInterval ?? 300),
        },
      },
      ready: {
        display: i18n('Data Updater'),
        fn: async () => {
          const result = await sub.exec([
            'sh',
            '-c',
            `test -f /app/data/data.json && find /app/data/data.json -mmin -${Math.ceil(
              ((store?.updateInterval ?? 300) * 2) / 60,
            )} | grep -q .`,
          ])
          if (result.exitCode !== 0) {
            return {
              result: 'loading',
              message: i18n('Waiting for first data update'),
            }
          }
          return {
            result: 'success',
            message: i18n('Data is up to date'),
          }
        },
      },
      requires: ['web'],
    })
})
