#!/usr/bin/env tsx
// Получает треды и комментарии из GitLab MR + скачивает приложенные к ним вложения.
//
//   tsx scripts/mr-comments/fetch.mts \
//     --mr=<MR_URL> \
//     --filter=<substring> \
//     --out=scripts/mr-comments/fetched/<slug>
//
// Альтернативно: --project=<path-or-id> --iid=<N> вместо --mr.
// --filter — подстрока, по которой фильтруются note.body / position.new_path (case-insensitive).
// --no-attachments — не качать вложения.
//
// Результат:
//   <out>/notes.json       — нормализованный список комментов с метаданными
//   <out>/notes.md         — человекочитаемый дайджест для review
//   <out>/attachments/...  — скачанные файлы (если есть)

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { api, bail, loadEnv } from './lib.mts'

type Args = Record<string, string | boolean>

type MergeRequest = {
  title: string
  state: string
  source_branch: string
  target_branch: string
  web_url: string
  iid: number
}

type Position = { new_path?: string; old_path?: string; new_line?: number; old_line?: number }

type Note = {
  id: number
  body: string
  system?: boolean
  resolved?: boolean
  resolvable?: boolean
  created_at: string
  author?: { username?: string; name?: string }
  position?: Position
}

type DiscussionPage = { id: string; notes?: Note[] }

type NormalizedNote = {
  discussion_id: string
  note_id: number
  author: string | undefined
  author_name: string | undefined
  created_at: string
  resolved: boolean
  resolvable: boolean
  file: string | null
  new_line: number | null
  old_line: number | null
  url: string
  body: string
}

type Target = { project: string; iid: string }

type Options = {
  target: Target
  out: string
  filter: string | null
  skipAttachments: boolean
}

type Attachment = { note_id: number; url: string; local: string }

const UPLOAD_RE = /!\[[^\]]*\]\((\/[^)]*?\/uploads\/[^)]+)\)|\[[^\]]*\]\((\/[^)]*?\/uploads\/[^)]+)\)/g

function parseArgs(argv: string[]): Args {
  return Object.fromEntries(
    argv.map(a => {
      const m = a.match(/^--([^=]+)(?:=(.*))?$/)
      return m ? [m[1], m[2] ?? true] : [a, true]
    }),
  )
}

function resolveTarget(args: Args): Target {
  let project = typeof args.project === 'string' ? args.project : undefined
  let iid = typeof args.iid === 'string' ? args.iid : undefined

  if (typeof args.mr === 'string') {
    const m = new URL(args.mr).pathname.match(/^\/(.+?)\/-\/merge_requests\/(\d+)/)
    if (!m) bail(`Не распарсил MR URL: ${args.mr}`)
    project = m[1]
    iid = m[2]
  }
  if (!project || !iid) bail('Нужно --mr=<url> или --project=<path> --iid=<N>')
  return { project, iid }
}

function resolveOptions(args: Args, target: Target): Options {
  return {
    target,
    out: typeof args.out === 'string' ? args.out : `scripts/mr-comments/fetched/mr-${target.iid}`,
    filter: typeof args.filter === 'string' ? args.filter.toLowerCase() : null,
    skipAttachments: Boolean(args['no-attachments']),
  }
}

async function fetchDiscussions(base: string, token: string, pid: string, iid: string): Promise<DiscussionPage[]> {
  const result: DiscussionPage[] = []
  for (let page = 1; ; page++) {
    const chunk = await api<DiscussionPage[]>(
      base,
      token,
      `projects/${pid}/merge_requests/${iid}/discussions?per_page=100&page=${page}`,
    )
    if (!chunk?.length) break
    result.push(...chunk)
    if (chunk.length < 100) break
  }
  return result
}

function normalizeDiscussions(discussions: DiscussionPage[], mrWebUrl: string, filter: string | null): NormalizedNote[] {
  const out: NormalizedNote[] = []
  for (const d of discussions) {
    for (const n of d.notes ?? []) {
      if (n.system) continue
      const path = n.position?.new_path || n.position?.old_path || null
      const body = n.body || ''
      if (filter) {
        const hay = `${body}\n${path ?? ''}`.toLowerCase()
        if (!hay.includes(filter)) continue
      }
      out.push({
        discussion_id: d.id,
        note_id: n.id,
        author: n.author?.username,
        author_name: n.author?.name,
        created_at: n.created_at,
        resolved: Boolean(n.resolved),
        resolvable: Boolean(n.resolvable),
        file: path,
        new_line: n.position?.new_line ?? null,
        old_line: n.position?.old_line ?? null,
        url: `${mrWebUrl}#note_${n.id}`,
        body,
      })
    }
  }
  return out
}

function collectAttachments(notes: NormalizedNote[]): Attachment[] {
  const out: Attachment[] = []
  for (const n of notes) {
    for (const m of n.body.matchAll(UPLOAD_RE)) {
      const rel = m[1] || m[2]
      const filename = rel.split('/').pop()!
      out.push({
        note_id: n.note_id,
        url: rel,
        local: join('attachments', String(n.note_id), filename),
      })
    }
  }
  return out
}

async function downloadAttachments(items: Attachment[], origin: string, token: string, out: string): Promise<void> {
  for (const a of items) {
    const dst = join(out, a.local)
    await mkdir(dirname(dst), { recursive: true })
    const res = await fetch(origin + a.url, { headers: { 'PRIVATE-TOKEN': token } })
    if (!res.ok) {
      console.warn(`  ✗ ${a.url} → ${res.status}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(dst, buf)
    console.log(`  ↓ ${a.local} (${buf.length}b)`)
  }
}

function renderMarkdown(mr: MergeRequest, notes: NormalizedNote[], filter: string | null): string {
  const lines: string[] = [
    `# ${mr.title}`,
    '',
    `- MR: ${mr.web_url}`,
    `- Notes: ${notes.length}${filter ? ` (filter=\`${filter}\`)` : ''}`,
    '',
  ]
  for (const n of notes) {
    const anchor = n.file ? `\`${n.file}${n.new_line ? `:${n.new_line}` : ''}\`` : '(general)'
    lines.push(
      `## @${n.author} · ${anchor}${n.resolved ? ' · ✅ resolved' : ''}`,
      '',
      `- ${n.url}`,
      `- created: ${n.created_at}`,
      '',
      n.body.trim(),
      '',
      '---',
      '',
    )
  }
  return lines.join('\n')
}

async function writeOutput(out: string, mr: MergeRequest, notes: NormalizedNote[], filter: string | null): Promise<void> {
  await mkdir(out, { recursive: true })
  const json = { mr: { url: mr.web_url, title: mr.title, iid: mr.iid }, notes }
  await writeFile(join(out, 'notes.json'), JSON.stringify(json, null, 2) + '\n')
  await writeFile(join(out, 'notes.md'), renderMarkdown(mr, notes, filter))
}

const args = parseArgs(process.argv.slice(2))
const opts = resolveOptions(args, resolveTarget(args))
const { token, base } = await loadEnv()
const pid = encodeURIComponent(opts.target.project)

console.log(`▸ MR ${opts.target.project}!${opts.target.iid}`)
const mr = await api<MergeRequest>(base, token, `projects/${pid}/merge_requests/${opts.target.iid}`)
console.log(`  title: ${mr.title}`)
console.log(`  state: ${mr.state}  source: ${mr.source_branch} → ${mr.target_branch}`)

const discussions = await fetchDiscussions(base, token, pid, opts.target.iid)
console.log(`  discussions: ${discussions.length}`)

const notes = normalizeDiscussions(discussions, mr.web_url, opts.filter)
console.log(`  matched notes: ${notes.length}${opts.filter ? ` (filter=${opts.filter})` : ''}`)

if (!opts.skipAttachments) {
  const attachments = collectAttachments(notes)
  console.log(`  attachments: ${attachments.length}`)
  await downloadAttachments(attachments, new URL(base).origin, token, opts.out)
}

await writeOutput(opts.out, mr, notes, opts.filter)
console.log(`\n✓ saved to ${opts.out}`)
