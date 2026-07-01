# Skill: make-commit

**Триггеры:** «закоммить», «сделай commit», «оформи коммит», «commit changes».

Формат коммита в этом репо — строго:

```
<feat|fix|chore>(<ticket-ID>): <oneline short message in english>
```

- Тип — `feat` / `fix` / `chore` (при необходимости `docs` / `refactor` / `test`).
- `(<ticket-ID>)` — ID Jira из имени ветки (`FF-1234`). Пустой скоуп валит commit-msg хук (`ticketId is not specified`).
- Subject — одна короткая строка на английском.

Запрещено:

- Body — только subject, один `-m`.
- Русский текст в сообщении.
- AI-атрибуция: `Co-Authored-By`, `Generated with…`, упоминания Claude/Anthropic.
- `--no-verify` и обход хуков — чинится причина, не хук.

Примеры:

```
feat(FF-8638): add @ds/adaptive layout mechanism and docs
fix(FF-8438): row layout for field with segment elements
chore(FF-8638): move story inline styles to scss
```

Процедура — в команде [`make-commit`](../commands/make-commit.md). Несколько логических изменений — несколько коммитов, каждый со своей строкой.
