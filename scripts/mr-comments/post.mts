#!/usr/bin/env tsx
// Постит комменты из comments.json в GitLab MR.
//   tsx scripts/mr-comments/post.mts --dry-run          # ничего не отправлять, только показать
//   tsx scripts/mr-comments/post.mts --only=id1,id2     # отправить выборочно
//   tsx scripts/mr-comments/post.mts                    # отправить все pending
//
// После успешной отправки в каждый comment дописывается sent_at + discussion_id,
// чтобы повторный запуск не дублировал.

import { createHash } from 'node:crypto'
import { writeFile } from 'node:fs/promises'

import { COMMENTS_PATH, api, bail, loadComments, loadEnv, projectId, shortBody, withSeverityBadge } from './lib.mts'

// GitLab line_code format: <sha1(path)>_<old_line>_<new_line>
// For new files, old_line is 0.
function lineCode(path: string, oldLine: number, newLine: number): string {
  return `${createHash('sha1').update(path).digest('hex')}_${oldLine}_${newLine}`
}

type DiffRefs = { base_sha: string; start_sha: string; head_sha: string }
type MergeRequest = { diff_refs?: DiffRefs }
type Discussion = { id: string }

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run') || args.includes('-n')
const NO_SEVERITY = args.includes('--no-severity')
const ONLY = args.find(a => a.startsWith('--only='))?.slice(7).split(',').filter(Boolean)

const { token, base } = await loadEnv()
const data = await loadComments()
const pid = projectId(data)

const queue = data.pending.filter(c => !c.sent_at && (!ONLY || ONLY.includes(c.id)))
if (queue.length === 0) {
  console.log('Нечего отправлять.')
  process.exit(0)
}

const needsRefs = queue.some(c => c.file && c.line)
let refs: DiffRefs | undefined
if (needsRefs) {
  const mr = await api<MergeRequest>(base, token, `projects/${pid}/merge_requests/${data.mr_iid}`)
  refs = mr.diff_refs
  if (!refs?.head_sha) bail('Не удалось получить diff_refs из MR (возможно, не хватает scope)')
}

let changed = false
for (const c of queue) {
  const isLine = Boolean(c.file && c.line)
  const anchor = isLine ? `${c.file}:${c.line}` : '(general)'
  const body = NO_SEVERITY ? c.body : withSeverityBadge(c.body, c.severity)
  console.log(`\n▸ [${c.id}] ${anchor}`)
  console.log(shortBody(body, 4).replace(/^/gm, '    '))

  if (DRY) {
    console.log('    (dry-run)')
    continue
  }

  const hasRange = isLine && c.end_line && c.end_line > c.line!
  const position: Record<string, unknown> = isLine
    ? {
        base_sha: refs!.base_sha,
        start_sha: refs!.start_sha,
        head_sha: refs!.head_sha,
        position_type: 'text',
        new_path: c.file,
        new_line: hasRange ? c.end_line : c.line,
        ...(c.old_line ? { old_path: c.file, old_line: c.old_line } : {}),
      }
    : {}
  if (hasRange) {
    position.line_range = {
      start: { line_code: lineCode(c.file!, 0, c.line!), type: 'new' },
      end: { line_code: lineCode(c.file!, 0, c.end_line!), type: 'new' },
    }
  }
  const payload = isLine ? { body, position } : { body }

  const res = await api<Discussion>(base, token, `projects/${pid}/merge_requests/${data.mr_iid}/discussions`, {
    method: 'POST',
    body: payload,
  })
  c.body = body
  c.sent_at = new Date().toISOString()
  c.discussion_id = res.id
  changed = true
  console.log(`    ✓ posted (discussion ${res.id})`)
}

if (changed) {
  await writeFile(COMMENTS_PATH, JSON.stringify(data, null, 2) + '\n')
  console.log(`\nОбновил ${COMMENTS_PATH}.`)
}
