import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

export const seedStore = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  await storeJson.merge(effects, {})
})
