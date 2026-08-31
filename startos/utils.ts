import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 3030

export const mempoolBridge = (effects: T.Effects) =>
  sdk.host.getBridgeAddress(effects, {
    packageId: 'mempool',
    hostId: 'main',
    internalPort: 8080,
  })
