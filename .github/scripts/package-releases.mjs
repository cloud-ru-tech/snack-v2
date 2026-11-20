#!/usr/bin/env node
// Создаёт GitHub Release для каждого тега пакета вида `<name>@<version>`,
// у которого ещё нет релиза. Текст релиза — секция этой версии из
// CHANGELOG.md пакета на коммите тега.
//
// Если задан CLOUDRU_API_KEY, над секцией CHANGELOG добавляется краткое
// описание изменений, которое пишет модель Cloud.ru Foundation Models по
// коммитам и diff пакета. Инструкции модели — `.github/release-notes-style.md`.
// Релизы «Version bump only» модель не получают. Если модель недоступна,
// релиз создаётся без описания, и следующий запуск его дописывает.
//
// Скрипт идемпотентен: повторный запуск пропускает теги с готовым релизом.
// Теги, коммит которых ещё не входит в ветку `HEAD` (зеркало обновило теги,
// но не ветку), пропускаются и обрабатываются следующим запуском.
//
// Переменные окружения:
//   GITHUB_REPOSITORY  owner/repo (в Actions задаётся автоматически)
//   GH_TOKEN           токен с правом contents: write (для gh)
//   RELEASES_SINCE     ISO-дата: теги, созданные раньше, не рассматриваются
//   RELEASES_MAX       максимум релизов за запуск (по умолчанию 100)
//   DRY_RUN            "true" — только вывести план, ничего не создавать
//   CLOUDRU_API_KEY    ключ Cloud.ru Foundation Models; без него описаний нет
//   CLOUDRU_MODEL      модель (по умолчанию anthropic/claude-opus-5.5)
//   AI_MAX             максимум обращений к модели за запуск (по умолчанию 30)

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repo = process.env.GITHUB_REPOSITORY;
const since = new Date(process.env.RELEASES_SINCE || '1970-01-01T00:00:00Z');
const max = Number(process.env.RELEASES_MAX || 100);
const dryRun = process.env.DRY_RUN === 'true';
const aiKey = process.env.CLOUDRU_API_KEY;
const aiModel = process.env.CLOUDRU_MODEL || 'anthropic/claude-opus-5.5';
const aiMax = Number(process.env.AI_MAX || 30);

if (!repo) throw new Error('GITHUB_REPOSITORY is not set');
if (Number.isNaN(since.getTime())) throw new Error(`Invalid RELEASES_SINCE: ${process.env.RELEASES_SINCE}`);

const TAG_RE = /^((?:@[^/@]+\/)?[^@]+)@(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/;
const VERSION_HEADING_RE = /^#{1,2} \[?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\]?[\s(]/;
const BUMP_ONLY_RE = /^\*\*Note:\*\* Version bump only/;
// Метки в конце текста релиза: релиз создан этим скриптом / описание написано моделью.
const MARK_SCRIPT = '<!-- package-releases -->';
const MARK_AI = '<!-- package-releases:ai -->';
const AI_URL = 'https://foundation-models.api.cloud.ru/v1/chat/completions';
const AI_TIMEOUT_MS = 180_000;
// Больше этого diff в запрос не идёт: модель получает список файлов и пометку об обрезке.
const DIFF_LIMIT = 80_000;
const STYLE_FILE = '.github/release-notes-style.md';

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, ...opts }).trim();
const git = (...args) => run('git', args);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function isAncestorOfHead(sha) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', sha, 'HEAD'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// name -> каталог пакета по текущему состоянию ветки.
function readPackageDirs() {
  const dirs = new Map();
  for (const entry of readdirSync('packages', { withFileTypes: true })) {
    const manifest = join('packages', entry.name, 'package.json');
    if (!entry.isDirectory() || !existsSync(manifest)) continue;
    dirs.set(JSON.parse(readFileSync(manifest, 'utf8')).name, join('packages', entry.name));
  }
  return dirs;
}

function changelogSection(sha, dir, version) {
  let text;
  try {
    text = git('show', `${sha}:${dir}/CHANGELOG.md`);
  } catch {
    return null;
  }
  const lines = text.split('\n');
  const start = lines.findIndex(line => VERSION_HEADING_RE.exec(line)?.[1] === version);
  if (start === -1) return null;
  let end = lines.findIndex((line, i) => i > start && VERSION_HEADING_RE.test(line));
  if (end === -1) end = lines.length;
  return (
    lines
      .slice(start + 1, end)
      .join('\n')
      .trim() || null
  );
}

// tag -> текст релиза.
function existingReleases() {
  const out = run('gh', [
    'api',
    '--paginate',
    `repos/${repo}/releases?per_page=100`,
    '--jq',
    '.[] | {tag: .tag_name, body: (.body // "")} | @json',
  ]);
  const releases = new Map();
  for (const line of out ? out.split('\n') : []) {
    const { tag, body } = JSON.parse(line);
    releases.set(tag, body);
  }
  return releases;
}

// Коммиты и diff пакета между двумя тегами — материал для модели.
function changeContext(prev, tag, dir) {
  const commits = git('log', '--no-merges', '--format=%h %s%n%b', `${prev}..${tag}`, '--', dir)
    .split('\n')
    .filter(line => line.trim() && !line.includes('[ci skip] Version bump'))
    .join('\n');
  const pathspec = ['--', dir, `:(exclude)${dir}/CHANGELOG.md`, `:(exclude)${dir}/**/__snapshots__/**`];
  const stat = git('diff', '--stat=200', prev, tag, ...pathspec);
  let diff = git('diff', '--no-color', prev, tag, ...pathspec);
  let truncated = false;
  if (diff.length > DIFF_LIMIT) {
    diff = diff.slice(0, DIFF_LIMIT);
    truncated = true;
  }
  return { commits, stat, diff, truncated };
}

async function aiSummary(t, prev, dir, section) {
  const ctx = changeContext(prev, t.tag, dir);
  const user = [
    `Пакет: ${t.name}`,
    `Версия: ${t.version} (предыдущая: ${prev})`,
    `\n## Секция CHANGELOG\n\n${section}`,
    `\n## Коммиты\n\n${ctx.commits || '(нет)'}`,
    `\n## Изменённые файлы\n\n${ctx.stat || '(нет)'}`,
    `\n## Diff${ctx.truncated ? ` (обрезан до ${DIFF_LIMIT} символов, полный список файлов — выше)` : ''}\n\n${ctx.diff || '(пусто)'}`,
  ].join('\n');

  const response = await fetch(AI_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${aiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: aiModel,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: readFileSync(STYLE_FILE, 'utf8') },
        { role: 'user', content: user },
      ],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  const data = await response.json();
  const choice = data.choices?.[0];
  const text = choice?.message?.content?.trim();
  if (choice?.finish_reason !== 'stop' || !text) {
    throw new Error(`no summary (finish_reason=${choice?.finish_reason})`);
  }
  return text;
}

function buildNotes(t, dir, section, prev, summary) {
  const links = [
    `[CHANGELOG](https://github.com/${repo}/blob/${encodeURIComponent(t.tag)}/${dir}/CHANGELOG.md)`,
    prev &&
      `[${prev}...${t.tag}](https://github.com/${repo}/compare/${encodeURIComponent(prev)}...${encodeURIComponent(t.tag)})`,
  ].filter(Boolean);
  return [
    summary,
    section ?? `No CHANGELOG entry for ${t.version}.`,
    '---',
    links.join(' · '),
    summary ? `${MARK_SCRIPT}\n${MARK_AI}` : MARK_SCRIPT,
  ]
    .filter(Boolean)
    .join('\n\n')
    .concat('\n');
}

// Все теги пакетов с коммитом и датой создания, от старых к новым.
function listTags() {
  const out = git(
    'for-each-ref',
    '--sort=creatordate',
    '--format=%(refname:strip=2)%09%(objectname)%09%(*objectname)%09%(creatordate:iso-strict)',
    'refs/tags',
  );
  return out
    .split('\n')
    .filter(Boolean)
    .map(line => {
      // Для аннотированного тега %(*objectname) — коммит, для лёгкого поле пустое.
      const [tag, object, peeled, date] = line.split('\t');
      const sha = peeled || object;
      const match = TAG_RE.exec(tag);
      return match && { tag, sha, date: new Date(date), name: match[1], version: match[2] };
    })
    .filter(Boolean);
}

async function main() {
  const packageDirs = readPackageDirs();
  const releases = existingReleases();
  const allTags = listTags();

  const previousTag = new Map();
  const lastByName = new Map();
  for (const t of allTags) {
    if (lastByName.has(t.name)) previousTag.set(t.tag, lastByName.get(t.name));
    lastByName.set(t.name, t.tag);
  }

  let created = 0;
  let updated = 0;
  let deferred = 0;
  let aiCalls = 0;
  let aiFailed = 0;

  // Описание модели — только для релизов с реальными изменениями.
  async function summaryFor(t, dir, section, prev) {
    if (!aiKey || !prev || !section || BUMP_ONLY_RE.test(section)) return null;
    if (aiCalls >= aiMax) return null;
    aiCalls += 1;
    try {
      return await aiSummary(t, prev, dir, section);
    } catch (error) {
      aiFailed += 1;
      console.warn(`summary for ${t.tag} failed: ${error.message}`);
      return null;
    }
  }

  for (const t of allTags) {
    if (t.date < since) continue;
    const body = releases.get(t.tag);
    // Существующий релиз дописывается, только если его создал этот скрипт без описания модели.
    const needsSummary = body !== undefined && aiKey && body.includes(MARK_SCRIPT) && !body.includes(MARK_AI);
    if (body !== undefined && !needsSummary) continue;

    if (body === undefined && created >= max) {
      console.info(`Limit of ${max} releases reached, the rest will be created on the next run.`);
      break;
    }
    if (!isAncestorOfHead(t.sha)) {
      deferred += 1;
      console.info(`skip ${t.tag}: ${t.sha.slice(0, 9)} is not on the branch yet`);
      continue;
    }

    const dir = packageDirs.get(t.name) ?? join('packages', t.name.replace(/^@[^/]+\//, ''));
    const section = changelogSection(t.sha, dir, t.version);
    const prev = previousTag.get(t.tag);
    const summary = await summaryFor(t, dir, section, prev);
    if (body !== undefined && !summary) continue;
    const notes = buildNotes(t, dir, section, prev, summary);

    if (dryRun) {
      console.info(`\n=== would ${body === undefined ? 'create' : 'update'} ${t.tag} (${t.sha.slice(0, 9)})\n${notes}`);
    } else if (body === undefined) {
      const args = [
        'release',
        'create',
        t.tag,
        '--repo',
        repo,
        '--verify-tag',
        '--title',
        t.tag,
        '--notes-file',
        '-',
        '--latest=false',
      ];
      if (t.version.includes('-')) args.push('--prerelease');
      run('gh', args, { input: notes });
      console.info(`created ${t.tag}${summary ? ' with summary' : ''}`);
    } else {
      run('gh', ['release', 'edit', t.tag, '--repo', repo, '--notes-file', '-'], { input: notes });
      console.info(`added summary to ${t.tag}`);
    }
    if (body === undefined) created += 1;
    else updated += 1;
    // Пауза снижает риск secondary rate limit при массовом создании.
    if (!dryRun) await sleep(1000);
  }

  const verb = dryRun ? 'planned' : 'done';
  console.info(
    `\n${verb}: created ${created}, summaries added ${updated}, deferred ${deferred}, ` +
      `model calls ${aiCalls} (failed ${aiFailed}), already released ${releases.size}.`,
  );
  if (!aiKey) console.info('CLOUDRU_API_KEY is not set: releases are created without summaries.');
}

await main();
