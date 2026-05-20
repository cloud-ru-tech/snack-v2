---
description: Работа с комментами GitLab MR через scripts/mr-comments/* (fetch / reply / post)
---

Следуй инструкции из `.claude/skills/mr-comments.md` в этом репо. Краткая шпаргалка:

## Pre-flight

1. В корневом `.env` есть `GITLAB_TOKEN` (scope `api`) и `GITLAB_BASE_URL`. Если нет — попроси user'а добавить.
2. `scripts/mr-comments/comments.json` / `replies.json` — gitignored. Если файлов нет, скопируй из `*.example.json`.
3. Запуск: `pnpm exec tsx scripts/mr-comments/<cmd>.mts ...` (без префикса `pnpm exec` `tsx` глобально не установлен).

## A. Ответ на чужие комменты

```bash
pnpm exec tsx scripts/mr-comments/fetch.mts --mr=<MR_URL> --out=scripts/mr-comments/fetched/<slug>
# прочитать fetched/<slug>/notes.md, подготовить replies.json: [{ note_id, body }, ...]
pnpm exec tsx scripts/mr-comments/reply.mts --mr=<MR_URL> --replies=scripts/mr-comments/replies.json --notes=scripts/mr-comments/fetched/<slug>/notes.json --dry-run
pnpm exec tsx scripts/mr-comments/reply.mts --mr=<MR_URL> --replies=scripts/mr-comments/replies.json --notes=scripts/mr-comments/fetched/<slug>/notes.json
```

## B. Свой review: серия инлайн-комментов

```bash
# составить scripts/mr-comments/comments.json по diff'у: { project, mr_iid, pending: [{ id, file, line, body, severity? }] }
pnpm exec tsx scripts/mr-comments/list.mts
pnpm exec tsx scripts/mr-comments/post.mts --dry-run
pnpm exec tsx scripts/mr-comments/post.mts                 # bodу автоматически префиксуется бейджем по severity
pnpm exec tsx scripts/mr-comments/post.mts --no-severity   # отключить префикс
pnpm exec tsx scripts/mr-comments/post.mts --only=<id1>,<id2>
# fallback, если коммент уже отправлен без бейджа:
pnpm exec tsx scripts/mr-comments/edit-prepend-severity.mts
```

После отправки `post.mts` дописывает `sent_at` и `discussion_id` — повторный запуск не задублирует.

## Правила

- **Не** отправляй `post.mts` / `reply.mts` без явного «ок» user'а. Всегда сначала `--dry-run`.
- `severity` в каждом коммент-объекте: `critical | major | minor | nit`. На сервер не уходит, но `post.mts` дописывает бейдж 🟥/🔴/🟡/🔵 в шапку `body` (отключается `--no-severity`).
- `body` — Markdown с GitLab-расширениями; для замены строки — ```` ```suggestion:-0+0 ```` блок.
- `file` + `line` — новая сторона diff'а; для удалённой строки — `old_line`.
- Слаг `id` — kebab-case, осмысленный.
- 3+ замечаний по одному файлу — одним body с буллетами (исключение: каждое с `suggestion`-блоком).

## Anti-patterns

- ❌ Постить через `curl` напрямую — теряется идемпотентность.
- ❌ Запускать `post.mts` без `--dry-run` в первый раз.
- ❌ Удалять `sent_at` / `discussion_id` руками.

Связанное: [scripts/mr-comments/README.md](../../scripts/mr-comments/README.md).
