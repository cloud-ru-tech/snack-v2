#!/usr/bin/env tsx
// Превью того, что лежит в comments.json.
// Использование:
//   tsx scripts/mr-comments/list.mts                     # все pending по группам severity
//   tsx scripts/mr-comments/list.mts --all               # и уже отправленные тоже
//   tsx scripts/mr-comments/list.mts --severity=critical # фильтр по severity (через запятую)
//   tsx scripts/mr-comments/list.mts --only=id1,id2      # фильтр по id
//   tsx scripts/mr-comments/list.mts --summary           # только заголовки, без тел

import { Comment, SEVERITY_META, SEVERITY_ORDER, Severity, loadComments, shortBody } from './lib.mts'

type Flags = {
  showAll: boolean
  summary: boolean
  severity?: Severity[]
  only?: string[]
}

function parseFlags(argv: string[]): Flags {
  return {
    showAll: argv.includes('--all'),
    summary: argv.includes('--summary'),
    severity: argv.find(a => a.startsWith('--severity='))?.slice(11).split(',').filter(Boolean) as Severity[] | undefined,
    only: argv.find(a => a.startsWith('--only='))?.slice(7).split(',').filter(Boolean),
  }
}

function severityOf(c: Comment): Severity {
  return c.severity ?? 'minor'
}

function applyFilters(rows: Comment[], flags: Flags): Comment[] {
  return rows.filter(c => {
    if (flags.severity && !flags.severity.includes(severityOf(c))) return false
    if (flags.only && !flags.only.includes(c.id)) return false
    return true
  })
}

function groupBySeverity(rows: Comment[]): Map<Severity, Comment[]> {
  const grouped = new Map<Severity, Comment[]>(SEVERITY_ORDER.map(s => [s, []]))
  for (const c of rows) grouped.get(severityOf(c))!.push(c)
  return grouped
}

function printHeader(data: { mr_url?: string; project: string; mr_iid: number }, pending: number, sent: number, pendingRows: Comment[]): void {
  const mrRef = data.mr_url ?? `(project: ${data.project}, iid: ${data.mr_iid})`
  const counts: Record<Severity, number> = { critical: 0, major: 0, minor: 0, nit: 0 }
  for (const c of pendingRows) counts[severityOf(c)]++
  const distribution = SEVERITY_ORDER.map(s => `${SEVERITY_META[s].icon} ${s} ${counts[s]}`).join('   ')

  console.log([
    `MR:      ${mrRef}`,
    `Pending: ${pending}    Sent: ${sent}`,
    `By severity: ${distribution}`,
    '',
  ].join('\n'))
}

function printGroup(severity: Severity, rows: Comment[], summary: boolean): void {
  const lines: string[] = []
  lines.push(`──── ${SEVERITY_META[severity].icon} ${severity.toUpperCase()}  (${rows.length}) ────`)
  for (const c of rows) {
    const anchor = c.file && c.line ? `${c.file}:${c.line}` : '(general)'
    const status = c.sent_at ? `sent ${c.sent_at}` : 'pending'
    lines.push('')
    lines.push(`▸ [${c.id}]  ${anchor}  — ${status}`)
    if (!summary) lines.push(shortBody(c.body, 6).replace(/^/gm, '    '))
  }
  console.log(lines.join('\n') + '\n')
}

const flags = parseFlags(process.argv.slice(2))
const data = await loadComments()
const all: Comment[] = data.pending ?? []
const pending = all.filter(c => !c.sent_at)
const sent = all.filter(c => c.sent_at)

printHeader(data, pending.length, sent.length, pending)

const visible = applyFilters(flags.showAll ? all : pending, flags)
for (const [severity, rows] of groupBySeverity(visible)) {
  if (rows.length === 0) continue
  printGroup(severity, rows, flags.summary)
}
