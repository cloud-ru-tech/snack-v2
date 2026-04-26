import { visit } from 'unist-util-visit'

/**
 * Root-relative path without a trailing slash → add `/` (page URLs).
 * Skip obvious static files (`/x.y`) and leave `?` / `#` tails intact.
 */
function ensureTrailingSlashOnPagePath(href) {
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)
  if (!m) return href
  let pathPart = m[1]
  const query = m[2] ?? ''
  const hash = m[3] ?? ''

  if (pathPart.endsWith('/')) return href

  const last = pathPart.split('/').filter(Boolean).pop() ?? ''
  if (last.includes('.') && !last.startsWith('.')) return href

  pathPart += '/'
  return pathPart + query + hash
}

/**
 * Prefixes root-relative Markdown links with the same base as `astro.config` `base`
 * (`process.env.BASE_PATH`). Appends `/` on page URLs — same as `trailingSlash: 'always'`.
 */
export function remarkInternalBaseUrl() {
  const base = process.env.BASE_PATH || '/'
  const prefix = base === '/' ? '' : base.replace(/\/$/, '')

  return function transformer(tree) {
    visit(tree, (node) => {
      if (node.type !== 'link' && node.type !== 'definition') return
      const url = node.url
      if (typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//')) {
        return
      }
      let next = prefix + url
      next = ensureTrailingSlashOnPagePath(next)
      node.url = next
    })
  }
}
