# Cursor / правила проекта

## Пакеты в `packages/`

- **Версии зависимостей** — только строгие (без `^`, `~`). Пример: `"classnames": "2.5.1"`.
- **React** — не прописывать в пакетах: ни `dependencies`, ни `peerDependencies`, ни `devDependencies` для `react` и `react-dom`. React даёт корневой workspace и потребитель пакета.

Подробнее: правило [.cursor/rules/base/packages-deps.mdc](rules/base/packages-deps.mdc).

## Команды

- [commands/make-commit.md](commands/make-commit.md) — коммиты
- [commands/up-cloud-deps.md](commands/up-cloud-deps.md) — обновление cloud-зависимостей

## Правила (rules)

- `base/` — общие правила кода и зависимостей
- `components/` — стандарты компонентов и сторис
- `documentation.mdc` — документация
