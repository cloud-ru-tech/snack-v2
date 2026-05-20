#!/usr/bin/env tsx
// Постит ответы в существующие discussions MR. С `--resolve` ещё и резолвит тред после ответа.
//
//   tsx scripts/mr-comments/reply.mts \
//     --mr=<MR_URL> \
//     --replies=scripts/mr-comments/replies.json \
//     [--notes=<path>] [--resolve] [--dry-run]
//
// replies.json: [{ note_id | discussion_id, body }]
// Если задан note_id — discussion_id берётся из notes.json рядом (по умолчанию ./fetched/<…>/notes.json).
// Можно указать --notes=<path> явно.

import { readFile } from 'node:fs/promises'

import { api, bail, loadEnv } from './lib.mts'

type Args = Record<string, string | boolean>

type Reply = { note_id?: number; discussion_id?: string; body: string }
type NotesFile = { notes: { note_id: number; discussion_id: string }[] }
type Note = { id: number }

const args: Args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/)
    return m ? [m[1], m[2] ?? true] : [a, true]
  }),
)

if (typeof args.mr !== 'string') bail('--mr=<url> обязателен')
if (typeof args.replies !== 'string') bail('--replies=<path> обязателен')

const DRY = Boolean(args['dry-run'])
const RESOLVE = Boolean(args.resolve)

const { token, base } = await loadEnv()
const u = new URL(args.mr as string)
const m = u.pathname.match(/^\/(.+?)\/-\/merge_requests\/(\d+)/)
if (!m) bail(`Не распарсил MR URL: ${args.mr}`)
const [, project, iid] = m!
const pid = encodeURIComponent(project)

const replies = JSON.parse(await readFile(args.replies as string, 'utf8')) as Reply[]

let noteIndex: Map<number, string> | null = null
if (replies.some(r => r.note_id && !r.discussion_id)) {
  const notesPath = typeof args.notes === 'string' ? args.notes : 'scripts/mr-comments/fetched/<slug>/notes.json'
  const notesData = JSON.parse(await readFile(notesPath, 'utf8')) as NotesFile
  noteIndex = new Map(notesData.notes.map(n => [n.note_id, n.discussion_id]))
}

for (const r of replies) {
  const did = r.discussion_id || (r.note_id !== undefined ? noteIndex?.get(r.note_id) : undefined)
  if (!did) bail(`нет discussion_id для note_id=${r.note_id}`)
  console.log(`\n▸ note ${r.note_id ?? '?'}  → discussion ${did}`)
  console.log(r.body.replace(/^/gm, '    '))
  if (DRY) {
    console.log('    (dry-run)')
    continue
  }
  const res = await api<Note>(base, token, `projects/${pid}/merge_requests/${iid}/discussions/${did}/notes`, {
    method: 'POST',
    body: { body: r.body },
  })
  console.log(`    ✓ posted note ${res.id}`)
  if (RESOLVE) {
    await api(base, token, `projects/${pid}/merge_requests/${iid}/discussions/${did}?resolved=true`, {
      method: 'PUT',
    })
    console.log(`    ✓ resolved discussion ${did}`)
  }
}
