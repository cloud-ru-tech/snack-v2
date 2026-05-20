# mr-comments

Инструмент, чтобы работать с комментами в GitLab MR через API: создавать новые треды, отвечать в существующие.

## Файлы

- `comments.json` — очередь черновиков для `post.mts`. **gitignored.** `pending[]` — что отправить; после отправки в каждый элемент дописывается `sent_at` и `discussion_id`.
- `replies.json` — список ответов для `reply.mts`. **gitignored.**
- `fetched/` — результат `fetch.mts` (notes.json/notes.md + вложения по MR). **gitignored.**
- `list.mts` — превью того, что лежит в `comments.json`.
- `post.mts` — отправка новых тредов (`--dry-run`, `--only=`, `--no-severity`). Если у коммента задан `severity`, в шапку `body` автоматически дописывается бейдж 🟥/🔴/🟡/🔵; локальный `body` обновляется тем же текстом, что ушёл на сервер. Поддерживает многострочное выделение через `end_line`.
- `fetch.mts` — тянет треды и комментарии MR в `fetched/<slug>/`.
- `reply.mts` — постит ответы в существующие треды (`replies.json` + `notes.json` для резолва `note_id → discussion_id`).
- `edit-prepend-severity.mts` — fallback для уже отправленных тредов: добавляет бейдж критичности (🟥/🔴/🟡/🔵) в шапку существующих комментариев через PUT. Нужен, если коммент отправили с `--no-severity`, дописали `severity` задним числом или подняли его. Идемпотентен по локальному body — пропускает уже префиксованные.
- `delete-and-reset.mts` — сносит все комментарии в MR (по `discussion_id` из `comments.json`), чистит `sent_at`/`discussion_id`, срезает badge-префиксы из body и сортирует `pending` по уровню критичности. Полезно для «переотправить заново в правильном порядке».
- `lib.mts` — общий хелпер (env, http, json, типы).

## Использование

```bash
# что лежит в очереди?
pnpm exec tsx scripts/mr-comments/list.mts
pnpm exec tsx scripts/mr-comments/list.mts --all                 # и уже отправленные тоже

# сухой прогон — ничего не отправляет, только показывает, что отправит
pnpm exec tsx scripts/mr-comments/post.mts --dry-run

# отправить выборочно
pnpm exec tsx scripts/mr-comments/post.mts --only=footer-day-bug,sort-no-comparator

# отправить всё, что pending
pnpm exec tsx scripts/mr-comments/post.mts

# проставить бейджи 🟥/🔴/🟡/🔵 в начало уже отправленных комментариев (по критичности)
pnpm exec tsx scripts/mr-comments/edit-prepend-severity.mts --dry-run
pnpm exec tsx scripts/mr-comments/edit-prepend-severity.mts

# снести всё, пересортировать по критичности, очистить sent_at — чтобы переотправить
pnpm exec tsx scripts/mr-comments/delete-and-reset.mts --dry-run
pnpm exec tsx scripts/mr-comments/delete-and-reset.mts
```

## Переменные окружения

В корневом `.env`:

```
GITLAB_TOKEN=...
GITLAB_BASE_URL=https://gitlab.example.com/api/v4/
```

⚠️ **scope токена.** Чтобы постить/редактировать/удалять комменты, токену нужен scope `api` (write). `read_api` хватит только на `fetch.mts` и `--dry-run`. Если попробовать запостить с `read_api` — упадёт `403`. Истёкший токен — `401 Token is expired`.

## Как устроены комменты

```json
{
  "id": "слаг-для-выборочной-отправки",
  "severity": "critical | major | minor | nit",
  "file": "packages/calendar/src/...",
  "line": 99,
  "end_line": 110,
  "body": "Markdown-текст коммента"
}
```

- `file` + `line` — комментарий привязывается к строке нового файла в diff'е MR (`new_path` / `new_line`).
- `end_line` (опционально, `>= line`) — многострочное выделение: GitLab подсветит блок `line..end_line` целиком. Реализовано через `position.line_range` с `line_code = sha1(file)_0_<lineno>` (формат для нового файла; для модификации работает так же, потому что diff агрегируется по new-стороне).
- `old_line` (опционально) — коммент к строке **до** изменения; GitLab прицепит на старую сторону diff'а.
- Без `file`/`line` — обычный комментарий в обсуждении MR (без привязки к коду).
- `severity` — уровень критичности. При отправке через `post.mts` бейдж 🟥/🔴/🟡/🔵 автоматически дописывается в шапку `body` (отключается флагом `--no-severity`). Локальный `body` синхронизируется с тем, что ушло на сервер. Если отправили без бейджа или подняли severity задним числом — добивай через `edit-prepend-severity.mts`.
- `body` поддерживает GitLab Markdown, включая ```suggestion-блоки```. Для одной строки — ```suggestion:-0+0```; для замены N+1 строк, начиная с якоря — ```suggestion:-0+N```.

## После отправки

`post.mts` дописывает каждому отправленному элементу `sent_at` и `discussion_id` — повторный запуск ничего не задублирует.

**Caveat про 500.** Если `post.mts` упал на середине очереди с `500 Internal Server Error`, комментарий **мог фактически создаться** на сервере (GitLab иногда отдаёт 500 при успешной записи). Перед ретраем сверь MR через `fetch.mts` или GitLab UI. Если комментарий продублировался — удали ad-hoc через `DELETE /projects/:id/merge_requests/:iid/notes/:note_id`:

```ts
// см. /tmp/del-orphan.mts как образец — пара строк через api() из lib.mts
await api(base, token, `projects/${pid}/merge_requests/${mrIid}/notes/${noteId}`, { method: 'DELETE' })
```

## Использование с агентом (Claude Code)

Скилл — [`.claude/skills/mr-comments.md`](../../.claude/skills/mr-comments.md). Триггерится фразами вроде «ответь на ревью MR !95», «оставь комменты в MR», «забери обсуждения». Типовой цикл:

1. **Fetch** — агент сам тянет `fetch.mts` по URL MR, читает `fetched/<slug>/notes.md`.
2. **Draft** — наполняет `comments.json` (своё ревью) либо `replies.json` (ответы) с осмысленными `id`/`severity`, при необходимости `end_line`.
3. **Dry-run** — `post.mts --dry-run` / `reply.mts --dry-run`, показывает user'у, что отправит.
4. **Send** — только после явного «ок» (см. правило в скилле: side-effects наружу).
5. **(опц.) бейджи** — `edit-prepend-severity.mts` после отправки, если бейджи не прописаны в body заранее.

## Старт

`comments.json` / `replies.json` / `fetched/` — в `.gitignore`, чтобы не таскать данные конкретного MR между ветками. Скопируй шаблон под текущий MR:

```bash
cp scripts/mr-comments/comments.example.json scripts/mr-comments/comments.json
cp scripts/mr-comments/replies.example.json scripts/mr-comments/replies.json
```
