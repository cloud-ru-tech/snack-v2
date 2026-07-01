---
description: Git-коммит по conventional-commits из staged diff — когда просят закоммитить, сделать/оформить commit.
---

Последовательность шагов:

1. Просмотри все изменения, которые планируется закоммитить, командой `git diff --staged`.
   Если staged-изменений нет, попробуй добавить все изменения командой `git add .` и проверь снова.

2. Сформулируй сообщение. Формат **строгий**:

   ```
   <feat|fix|chore>(<ticket-ID>): <oneline short message in english>
   ```

   - Тип — `feat` / `fix` / `chore` (при необходимости `docs` / `refactor` / `test`). Скоуп — ID Jira из имени ветки (`FF-1234`), не оставляй пустым.
   - Subject — одна короткая строка на английском. **Никакого body**: ни списков, ни русского текста.
   - **Не** добавляй AI-атрибуцию: `Co-Authored-By`, `Generated with…`, упоминания Claude/Anthropic.

   Пример: `feat(FF-8638): add @ds/adaptive layout mechanism and docs`.

3. Сделай коммит командой `git commit -m "..."` (один `-m`, без body). Проверь, что коммит создан и не прерван git-хуком.
   **Нельзя** добавлять флаг `--no-verify` к команде коммита. Если хук валится — чини причину, а не глуши хук.

4. Если видишь ошибку вида `ticketId is not specified`, попроси пользователя создать новую ветку, содержащую номер Jira-задачи в имени. Пример:

   ```bash
   git checkout -b FF-1234-my-task
   ```

   или

   ```bash
   git checkout -b feat/FF-1234/my-task
   ```

   где `FF-1234` — номер Jira-задачи.
