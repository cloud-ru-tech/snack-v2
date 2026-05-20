import { SEVERITY_BADGES, api, loadComments, loadEnv, projectId, withSeverityBadge } from './lib.mts'

type Note = { id: number; body: string; system: boolean }
type Discussion = { id: string; notes: Note[] }

const dryRun = process.argv.includes('--dry-run')

const { token, base } = await loadEnv()
const data = await loadComments()
const pid = projectId(data)

for (const c of data.pending) {
  if (!c.discussion_id || !c.severity) continue
  const badge = SEVERITY_BADGES[c.severity]
  if (!badge) continue

  const newBody = withSeverityBadge(c.body, c.severity)
  if (newBody === c.body) {
    console.log(`• [${c.id}] already prefixed, skip`)
    continue
  }

  const disc = await api<Discussion>(
    base,
    token,
    `projects/${pid}/merge_requests/${data.mr_iid}/discussions/${c.discussion_id}`,
  )
  const note = disc.notes.find(n => !n.system)
  if (!note) {
    console.log(`✗ [${c.id}] no user note in discussion ${c.discussion_id}`)
    continue
  }

  if (dryRun) {
    console.log(`◦ [${c.id}] would PUT note ${note.id} (+${badge})`)
    continue
  }

  await api(
    base,
    token,
    `projects/${pid}/merge_requests/${data.mr_iid}/notes/${note.id}`,
    { method: 'PUT', body: { body: newBody } },
  )
  c.body = newBody
  console.log(`✓ [${c.id}] note ${note.id} updated`)
}

if (!dryRun) {
  const fs = await import('node:fs/promises')
  const { COMMENTS_PATH } = await import('./lib.mts')
  await fs.writeFile(COMMENTS_PATH, JSON.stringify(data, null, 2) + '\n')
  console.log('comments.json refreshed')
}
