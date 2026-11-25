import { execFileSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const repo = 'cloud-ru-tech/snack-v2';
const workflow = '.github/workflows/package-releases.yml';
const versionPattern = String.raw`\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?`;
const tagPattern = new RegExp(`^@ds/([a-z0-9][a-z0-9-]*)@(${versionPattern})$`);
const versionHeading = new RegExp(String.raw`^#{1,3}\s+(?:<small>)?\[?v?(${versionPattern})(?=[\s\](<]|$)`);

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...options }).trimEnd();
}

function git(...args) {
  return run('git', args);
}

// Смотрим дату первого появления workflow именно в master, включая merge-коммит.
const since = new Date(
  process.env.RELEASES_SINCE ||
    git('log', '-1', '--first-parent', '--diff-filter=A', '--format=%cI', 'HEAD', '--', workflow),
);
const max = Number(process.env.RELEASES_MAX || 100);
const dryRun = process.env.DRY_RUN === 'true';
if (Number.isNaN(since.getTime())) throw new Error('Expected an ISO date for RELEASES_SINCE');
if (!Number.isSafeInteger(max) || max < 1) throw new Error('RELEASES_MAX must be a positive integer');

function existingReleaseTags() {
  const tags = run('gh', ['api', '--paginate', `repos/${repo}/releases?per_page=100`, '--jq', '.[].tag_name']);
  return new Set(tags.split('\n').filter(Boolean));
}

function pendingTags(released) {
  // --merged откладывает тег, если мастер зеркала ещё не получил его коммит.
  const refs = git(
    '-c',
    'versionsort.suffix=-',
    'for-each-ref',
    '--merged=HEAD',
    '--sort=version:refname',
    '--sort=creatordate',
    '--format=%(refname:strip=2)%09%(objectname)%09%(*objectname)%09%(creatordate:unix)',
    'refs/tags/@ds/',
  );
  const previous = new Map();
  const pending = [];
  for (const line of refs.split('\n')) {
    const [tag, object, peeled, timestamp] = line.split('\t');
    const match = tagPattern.exec(tag);
    if (!match) continue;
    const [, slug, version] = match;
    if (Number(timestamp) * 1000 >= since.getTime() && !released.has(tag)) {
      pending.push({ tag, slug, version, sha: peeled || object, previous: previous.get(slug) });
    }
    previous.set(slug, tag);
  }
  return pending;
}

function changelogSection(text, version) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => versionHeading.exec(line)?.[1] === version);
  if (start === -1) return '';
  // Lerna использует h1 для major/minor, h2 для patch и h3 для групп изменений.
  const level = Math.max(2, /^#+/.exec(lines[start])[0].length);
  let end = start + 1;
  for (; end < lines.length; end++) {
    const heading = /^(#{1,6})\s/.exec(lines[end]);
    if (heading && (heading[1].length <= level || versionHeading.test(lines[end]))) break;
  }
  return lines
    .slice(start + 1, end)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function releaseNotes({ sha, slug, version, previous, tag }) {
  const path = `packages/${slug}/CHANGELOG.md`;
  const hasChangelog = Boolean(git('ls-tree', '--name-only', sha, '--', path));
  const body = hasChangelog && changelogSection(git('show', `${sha}:${path}`), version);
  const links = [];
  if (hasChangelog) links.push(`[CHANGELOG](https://github.com/${repo}/blob/${sha}/${path})`);
  if (previous) {
    const range = `${encodeURIComponent(previous)}...${encodeURIComponent(tag)}`;
    links.push(`[${previous}...${tag}](https://github.com/${repo}/compare/${range})`);
  }
  const text = body || `No CHANGELOG entry for ${version}.`;
  return links.length ? `${text}\n\n---\n\n${links.join(' · ')}\n` : text;
}

// Несколько тегов пакета могут ожидать npm одновременно после неудачного publish.
const versionsByPackage = new Map();
async function publishedVersions(slug) {
  if (versionsByPackage.has(slug)) return versionsByPackage.get(slug);
  const url = `https://registry.npmjs.org/@cloud-ru%2Fds-${slug}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.npm.install-v1+json' },
    redirect: 'error',
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok && response.status !== 404) throw new Error(`npm returned HTTP ${response.status} for ${slug}`);
  const versions = response.ok ? Object.keys((await response.json()).versions) : [];
  const published = new Set(versions);
  versionsByPackage.set(slug, published);
  return published;
}

async function readyToRelease({ sha, slug, version }) {
  const manifest = JSON.parse(git('show', `${sha}:packages/${slug}/package.json`));
  if (manifest.name !== `@ds/${slug}` || manifest.version !== version) {
    throw new Error(`Tag and package.json disagree for @ds/${slug}@${version}`);
  }
  // Приватные пакеты получают тег и CHANGELOG. Публичные пакеты GitLab
  // публикует в npm после отправки тегов, под именами @cloud-ru/ds-*.
  if (manifest.private === true) return true;
  return (await publishedVersions(slug)).has(version);
}

const pending = pendingTags(existingReleaseTags());
let count = 0;
let deferred = 0;
for (const pkg of pending) {
  if (count >= max) break;
  if (!(await readyToRelease(pkg))) {
    console.info(`Deferred ${pkg.tag} until its version is available on npm.`);
    deferred++;
    continue;
  }
  const notes = releaseNotes(pkg);
  if (dryRun) {
    console.info(`\n=== Would create ${pkg.tag}\n${notes}`);
  } else {
    const args = [
      'release',
      'create',
      pkg.tag,
      '--repo',
      repo,
      '--verify-tag',
      '--title',
      pkg.tag,
      '--notes-file',
      '-',
      '--latest=false',
    ];
    if (pkg.version.includes('-')) args.push('--prerelease');
    run('gh', args, { input: notes });
    console.info(`Created ${pkg.tag}`);
    await sleep(1000);
  }
  count++;
}
console.info(`${dryRun ? 'Planned' : 'Created'} ${count} releases, deferred ${deferred}.`);
