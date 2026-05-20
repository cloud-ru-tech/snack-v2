# Skill: mr-comments

**Триггеры:** «ответь на ревью», «забери комменты из MR», «оставь комменты в MR», «обсуди ревью», «закрой ниты в MR», «закрой nit в MR», «прокомментируй diff», «GitLab MR <number>».

Скилл — для работы с комментами GitLab MR через тулинг `scripts/mr-comments/*.mts` (см. [scripts/mr-comments/README.md](../../scripts/mr-comments/README.md)). Агент не ходит в Web UI и не пишет SQL — он использует CLI: `fetch` → review локально → `post` / `reply`.

## Когда использовать

- В чате упомянут URL GitLab MR (`.../merge_requests/<N>`) или фраза «MR !N» / «ревью моего MR» / «ответь ревьюеру».
- Нужно автоматически разобрать чужие комменты, подготовить ответы, и/или оставить серию инлайн-комментов на конкретные строки diff'а.

Не используй скилл, когда от агента просят просто прочитать diff (`git diff`) или дать ревью «в чат» без публикации.

## Pre-flight

1. В корневом `.env` есть `GITLAB_TOKEN` (scope `api`) и `GITLAB_BASE_URL`. Если нет — попроси user'а добавить, не пытайся подобрать.
2. `scripts/mr-comments/comments.json` / `replies.json` — gitignored. Если файлов нет, копируй из `*.example.json`.

## Сценарии

### A. Ответ на чужие комменты (review reply)

```bash
# 1. Забрать ветки обсуждений + вложения
tsx scripts/mr-comments/fetch.mts --mr=<MR_URL> --out=scripts/mr-comments/fetched/<slug>

# 2. Прочитать fetched/<slug>/notes.md (для агента) и/или notes.json (для маппинга note_id → discussion_id)
# 3. Подготовить scripts/mr-comments/replies.json: { note_id, body } на каждый тред
# 4. Сухой прогон, потом отправка
tsx scripts/mr-comments/reply.mts --dry-run
tsx scripts/mr-comments/reply.mts
```

`notes.md` — human-readable рендер для чтения агентом и user'ом (тексты комментариев + контекст файла/строки); `notes.json` — машинный список для резолва `note_id → discussion_id`. `reply.mts` сам матчит по `note_id`.

### B. Свой review: серия инлайн-комментов на diff

```bash
# 1. Прочитать diff (git diff origin/<base>...HEAD) и составить comments.json:
#    { project, mr_iid, pending: [{ id, severity, file, line, end_line?, body }] }
#    end_line — опционально, для многострочного выделения (line..end_line).
# 2. Превью + сухой прогон
tsx scripts/mr-comments/list.mts
tsx scripts/mr-comments/post.mts --dry-run

# 3. Отправить всё или выборочно. По умолчанию post.mts префиксует body
#    бейджем 🟥/🔴/🟡/🔵 по severity; --no-severity отключает.
tsx scripts/mr-comments/post.mts
tsx scripts/mr-comments/post.mts --only=<id1>,<id2>
tsx scripts/mr-comments/post.mts --no-severity

# 4. (опц.) добить бейдж задним числом, если коммент уже отправлен без префикса
tsx scripts/mr-comments/edit-prepend-severity.mts
```

После отправки `post.mts` дописывает каждому элементу `sent_at` и `discussion_id` — повторный запуск не задублирует.

**Caveat про 500.** Если `post.mts` упал на середине очереди с `500 Internal Server Error`, комментарий мог фактически создаться на сервере (`sent_at` при этом не пишется, так как `bail()` рвёт цикл до flush). После ретрая получится дубль. Прежде чем ретраить — `fetch.mts` и сверить, нет ли уже комментария с этим текстом; если есть — удалить ad-hoc PUT/DELETE через `api()` из `lib.mts`.

### C. Переотправить всё заново (другой порядок / другой текст)

Например, отсортировать `pending` по `severity` (critical → nit) и пересоздать:

```bash
tsx scripts/mr-comments/delete-and-reset.mts --dry-run
tsx scripts/mr-comments/delete-and-reset.mts    # сносит ноты, чистит sent_at, сортирует pending, срезает badge-префиксы
tsx scripts/mr-comments/post.mts                # переотправка
tsx scripts/mr-comments/edit-prepend-severity.mts  # если нужны бейджи в шапке
```

## Правила для агента

- **Не отправляй `post.mts` / `reply.mts` без явного «ок» user'а.** Всегда сначала `--dry-run`, показать diff отправляемого, дождаться подтверждения. Публикация комментариев в GitLab — необратимое внешнее действие, см. правило про reversibility в системном промпте.
- **Указывай уровень критичности `severity`** в каждом коммент-объекте: `critical | major | minor | nit`. Само поле в GitLab не уходит, но используется (а) `post.mts` дописывает бейдж 🟥/🔴/🟡/🔵 в шапку `body` при отправке (отключается `--no-severity`), (б) для триажа в `list.mts`, (в) `edit-prepend-severity.mts` добивает бейдж задним числом, если коммент отправлен без префикса, (г) для сортировки в `delete-and-reset.mts`. Без `severity` бейдж не дописывается.
- **`end_line`** — если правка касается блока (функция, JSX-узел, типобъект), укажи `end_line` ≥ `line`. GitLab подсветит весь диапазон, читателю не нужно гадать, куда смотреть.
- **`body` — Markdown с GitLab-расширениями.** Когда хочешь предложить замену строки — используй ```suggestion:-0+0``` блок. Тогда GitLab покажет кнопку «Apply suggestion».
- **`file` + `line` указывают на новую сторону diff'а** (`new_path` / `new_line`). Для коммента на удалённой строке — `old_line` вместо `line`.
- **Не создавай тред без привязки**, если можно прицепить к строке. Комментарии без привязки к коду тяжело отсматривать.
- **Слаг `id`** — короткое kebab-case-имя-заголовок черновика (`footer-day-bug`, `sort-no-comparator`, `migrate-typings`). По сути это локальный идентификатор + краткое описание сути коммента, чтобы потом удобно ссылаться: «поправь коммент `migrate-typings`» вместо «поправь тот, где про типы». Используется как фильтр для выборочной отправки (`post.mts --only=<id>`) и как локальный маркер «уже отправлено» (рядом дописывается `sent_at`). На сервер не уходит.
- **Группировка**. Если по одному файлу 3+ замечания — оформи их одним body с буллетами, не плоди три discussions. Исключение — если каждое замечание про конкретную строку и `suggestion`-блок.

## Anti-patterns

- ❌ Постить через `curl` напрямую — теряется идемпотентность (`sent_at` маркер) и единый формат.
- ❌ Хранить `comments.json` между ветками — он gitignored по причине: данные одного MR не должны утечь в коммит другого.
- ❌ Запускать `post.mts` без `--dry-run` в первый раз на новом `comments.json`.
- ❌ Удалять `sent_at`/`discussion_id` руками ради «переотправить» — лучше `delete-and-reset.mts`, он и треды снесёт, и локальное состояние подровняет.

> Терминология: в этом скилле и в `scripts/mr-comments/*` используется единый словарь — **тред** (GitLab discussion), **комментарий** (GitLab note), **уровень критичности** (severity).

## Связанное

- [scripts/mr-comments/README.md](../../scripts/mr-comments/README.md) — детали формата и команд.
- GitLab Merge Request Discussions API — `POST /projects/:id/merge_requests/:iid/discussions`.
