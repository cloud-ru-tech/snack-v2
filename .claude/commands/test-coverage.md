---
description: Отчёт по метрикам coverage и соответствию E2E-стандарту
argument-hint: [pkg-name]
---

Сформировать отчёт по метрикам тестирования и соответствию E2E-стандарту. Делегируй skill [test-coverage](../skills/test-coverage.md).

## Входные аргументы

Пользователь передал: `$ARGUMENTS`

- **`<pkg>`** (опционально) — имя пакета (`button`) или путь (`packages/button`). Без аргумента — сводка по **всем** компонентным пакетам.
- Нормализуй имя к `packages/<pkg>` (убери префикс `packages/` и `@ds/` если переданы).

## Обязательное чтение перед стартом

1. [test-coverage.md](../skills/test-coverage.md) — полный workflow
2. [coverage-standard.md](../rules/coverage-standard.md) — пороги и команды сбора
3. [e2e-testing-standard.md](../rules/e2e-testing-standard.md) — структура E2E

## Границы

- **Не** редактируй код — только отчёт.
- **Не** коммить.
- **Не** запускай `pnpm test:coverage:pkg` автоматически без явной просьбы пользователя — сначала проверь наличие `coverage/report/coverage-summary.json`.
