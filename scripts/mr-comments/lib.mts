import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const HERE = dirname(fileURLToPath(import.meta.url))
export const REPO_ROOT = join(HERE, '..', '..')
export const COMMENTS_PATH = join(HERE, 'comments.json')

export type Severity = 'critical' | 'major' | 'minor' | 'nit'

export type Comment = {
  id: string
  body: string
  severity?: Severity
  file?: string
  line?: number
  end_line?: number
  old_line?: number
  sent_at?: string
  discussion_id?: string
}

export type CommentsFile = {
  project: string
  mr_iid: number
  mr_url?: string
  pending: Comment[]
  [key: string]: unknown
}

export type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
}

async function loadDotenv(path: string): Promise<void> {
  let txt: string
  try {
    txt = await readFile(path, 'utf8')
  } catch {
    return
  }
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    if (process.env[m[1]]) continue
    process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
}

export async function loadEnv(): Promise<{ token: string; base: string }> {
  await loadDotenv(join(REPO_ROOT, '.env'))
  const token = process.env.GITLAB_TOKEN
  const base = process.env.GITLAB_BASE_URL
  if (!token) bail('GITLAB_TOKEN не задан в .env')
  if (!base) bail('GITLAB_BASE_URL не задан в .env')
  return { token, base: base.replace(/\/?$/, '/') }
}

export async function loadComments(): Promise<CommentsFile> {
  const data = JSON.parse(await readFile(COMMENTS_PATH, 'utf8')) as CommentsFile
  if (!data.project || !data.mr_iid) bail('comments.json: нужны поля project и mr_iid')
  data.pending ??= []
  return data
}

export async function api<T = unknown>(
  base: string,
  token: string,
  path: string,
  { method = 'GET', body }: ApiOptions = {},
): Promise<T> {
  const res = await fetch(base + path, {
    method,
    headers: {
      'PRIVATE-TOKEN': token,
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) bail(`${method} ${path} → ${res.status}\n${text}`)
  return (text ? JSON.parse(text) : null) as T
}

export function projectId(data: Pick<CommentsFile, 'project'>): string {
  return encodeURIComponent(data.project)
}

export function bail(msg: string): never {
  console.error('✗', msg)
  process.exit(1)
}

export const SEVERITY_META: Record<Severity, { icon: string; label: string }> = {
  critical: { icon: '🟥', label: 'CRITICAL' },
  major: { icon: '🔴', label: 'MAJOR' },
  minor: { icon: '🟡', label: 'MINOR' },
  nit: { icon: '🔵', label: 'NIT' },
}

export const SEVERITY_ORDER: Severity[] = ['critical', 'major', 'minor', 'nit']

export const SEVERITY_BADGES: Record<Severity, string> = Object.fromEntries(
  SEVERITY_ORDER.map(s => [s, `${SEVERITY_META[s].icon} **${SEVERITY_META[s].label}**`]),
) as Record<Severity, string>

export function withSeverityBadge(body: string, severity?: Severity): string {
  if (!severity) return body
  const badge = SEVERITY_BADGES[severity]
  if (!badge || body.startsWith(badge)) return body
  return `${badge}\n\n${body}`
}

export function shortBody(body: string, lines = 4): string {
  const ls = body.split('\n')
  if (ls.length <= lines) return body
  return ls.slice(0, lines).join('\n') + '\n  …'
}
