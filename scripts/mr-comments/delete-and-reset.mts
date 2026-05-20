import { writeFile } from 'node:fs/promises'
import { COMMENTS_PATH, api, loadComments, loadEnv, projectId } from './lib.mts'

type Note = { id: number; system: boolean }
type Discussion = { id: string; notes: Note[] }

const SEVERITY_ORDER: Record<string, number> = { critical: 0, major: 1, minor: 2, nit: 3 }

const dryRun = process.argv.includes('--dry-run')

const { token, base } = await loadEnv()
const data = await loadComments()
const pid = projectId(data)

for (const c of data.pending) {
  if (!c.discussion_id) continue
  const disc = await api<Discussion>(
    base,
    token,
    `projects/${pid}/merge_requests/${data.mr_iid}/discussions/${c.discussion_id}`,
  ).catch(() => null)
  if (!disc) {
    console.log(`◦ [${c.id}] discussion not found, skip`)
    continue
  }
  for (const note of disc.notes) {
    if (note.system) continue
    if (dryRun) {
      console.log(`◦ [${c.id}] would DELETE note ${note.id}`)
      continue
    }
    await api(
      base,
      token,
      `projects/${pid}/merge_requests/${data.mr_iid}/notes/${note.id}`,
      { method: 'DELETE' },
    )
    console.log(`✓ [${c.id}] note ${note.id} deleted`)
  }
}

if (dryRun) process.exit(0)

// Strip badge prefix from bodies if present, clear sent_at/discussion_id, reorder by severity
const BADGE_RE = /^(?:🟥 \*\*CRITICAL\*\*|🔴 \*\*MAJOR\*\*|🟡 \*\*MINOR\*\*|🔵 \*\*NIT\*\*)\n\n/

for (const c of data.pending) {
  c.body = c.body.replace(BADGE_RE, '')
  delete c.sent_at
  delete c.discussion_id
}

data.pending.sort((a, b) => (SEVERITY_ORDER[a.severity ?? 'nit'] ?? 9) - (SEVERITY_ORDER[b.severity ?? 'nit'] ?? 9))

await writeFile(COMMENTS_PATH, JSON.stringify(data, null, 2) + '\n')
console.log(`\ncomments.json: cleared discussion_id/sent_at, reordered by severity (${data.pending.map(c => c.severity).join(' → ')})`)
