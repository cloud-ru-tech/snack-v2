import { withBase } from '../lib/base-url'
import styles from './StorybookEmbed.module.scss'

type StorybookEmbedProps = {
  storyId: string
  /** Optional viewport args, e.g. `{ layout: 'centered' }` for Storybook parameters. */
  args?: Record<string, string | number | boolean>
  height?: number
  title?: string
}

const DEFAULT_HEIGHT = 420
const STORYBOOK_DEV_URL = 'http://localhost:6006'

/** Prod: same site root as Astro `base` + `/storybook`. Dev: local Storybook on port 6006. */
function getStorybookBaseUrl(): string {
  if (import.meta.env.DEV) return STORYBOOK_DEV_URL
  return withBase('/storybook').replace(/\/$/, '')
}

function buildIframeUrl(baseUrl: string, storyId: string, args?: StorybookEmbedProps['args']): string {
  const params = new URLSearchParams({ id: storyId, viewMode: 'story' })
  if (args && Object.keys(args).length > 0) {
    const argStr = Object.entries(args)
      .map(([k, v]) => `${k}:${v}`)
      .join(';')
    params.set('args', argStr)
  }
  return `${baseUrl}/iframe.html?${params}`
}

export function StorybookEmbed({
  storyId,
  args,
  height = DEFAULT_HEIGHT,
  title = 'Storybook preview',
}: StorybookEmbedProps) {
  const baseUrl = getStorybookBaseUrl()
  const iframeUrl = buildIframeUrl(baseUrl, storyId, args)
  const openUrl = `${baseUrl}/?path=/story/${storyId}`

  return (
    <div className={styles.wrap}>
      <iframe
        className={styles.frame}
        src={iframeUrl}
        title={title}
        loading='lazy'
        sandbox='allow-scripts allow-same-origin allow-popups'
        style={{ height }}
      />
      <div className={styles.footer}>
        <a className={styles.link} href={openUrl} target='_blank' rel='noopener noreferrer'>
          Открыть в Storybook →
        </a>
      </div>
    </div>
  )
}
