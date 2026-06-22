# Зависимости пакетов (`packages/*/package.json`)

- **Только строгие версии.** Никаких `^ ~ >= *` или других диапазонов. Повторяющиеся в 2+ пакетах внешние deps — через `catalog:` (версия живёт в `pnpm-workspace.yaml::catalog`).
- `workspace:*` (внутренние `@ds/*`) и `catalog:` — это протоколы pnpm, не версии; они допустимы.
- **Не объявляй `react` / `react-dom` / `@types/react*`** ни в `dependencies`, ни в `peerDependencies`, ни в `devDependencies`. React и его типы даёт корневой workspace (сборка/тесты) и потребитель пакета.

```json
// ❌ "classnames": "^2.5.1"   |   "dependencies": { "react": "18.3.1" }   |   "peerDependencies": { "react": ">=18" }
// ✅
{ "dependencies": { "@ds/utils": "workspace:*", "classnames": "catalog:" },
  "devDependencies": { "sass": "catalog:", "typescript": "catalog:" } }
```
