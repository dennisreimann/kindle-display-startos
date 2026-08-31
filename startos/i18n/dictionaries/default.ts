export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting kindle-display!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Data Updater': 4,
  'Waiting for first data update': 5,
  'Data is up to date': 6,
  // interfaces.ts
  'Serves the display page and display.png screenshot for the Kindle': 7,
  // actions/configure.ts
  'Display Theme': 8,
  'Which layout to render on the Kindle: plain, onchain, lightning, or a random pick each refresh': 9,
  Plain: 10,
  Onchain: 11,
  Lightning: 12,
  Random: 13,
  'Primary Exchange Rate': 14,
  'Currency for the primary rate. Fetched from Mempool.': 15,
  'Secondary Exchange Rate': 16,
  'Currency for the secondary rate.': 17,
  'Update Interval': 18,
  'Seconds between scheduled data updates': 19,
  Configure: 20,
  'Adjust display theme, exchange rates, and update interval': 21,
  seconds: 22,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
