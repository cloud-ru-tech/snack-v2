# Зависимости пакетов в `packages/`

**Область действия:** `packages/*/package.json` в этом репозитории. Правило действует всегда.

## Версии зависимостей

Все зависимости — **только строгие версии**. Никаких `^`, `~`, `>=`, `*` или других диапазонов. Повторяющиеся в 2+ пакетах внешние зависимости берутся через `catalog:` — версия живёт в `pnpm-workspace.yaml` в секции `catalog`.

```json
// ❌ Плохо
"dependencies": {
  "classnames": "^2.5.1",
  "uncontrollable": "~8.0.4"
}

// ✅ Хорошо
"dependencies": {
  "classnames": "2.5.1",
  "uncontrollable": "8.0.4"
}
```

Workspace-ссылки допускаются как `"workspace:*"` — это не версия, а специальный протокол pnpm. `"catalog:"` — второй специальный протокол, версия резолвится из `pnpm-workspace.yaml::catalog`.

## React и React DOM

В пакетах из `packages/` **не объявляй** зависимости от `react` и `react-dom` — ни в `dependencies`, ни в `peerDependencies`, ни в `devDependencies`.

- React подставляется корневым workspace'ом при сборке и тестах.
- Потребители пакета обеспечивают React сами на своём уровне.

```json
// ❌ Плохо — любой из этих блоков запрещён
{
  "dependencies": { "react": "18.3.1" },
  "peerDependencies": { "react": ">=18" },
  "devDependencies": { "react": "18.3.1", "@types/react": "18.3.20" }
}

// ✅ Хорошо — пакет не упоминает react вообще
{
  "dependencies": {
    "@ds/utils": "workspace:*",
    "classnames": "catalog:"
  },
  "devDependencies": {
    "sass": "catalog:",
    "typescript": "catalog:"
  }
}
```

Типы React (`@types/react`, `@types/react-dom`) — тоже не объявляй в пакете. Они доступны транзитивно из корня.

## Итог

- Только строгие версии зависимостей.
- Никаких `react`/`react-dom`/`@types/react*` в пакетах `packages/*`.
- `workspace:*` — допустимо для внутренних `@ds/*`.
