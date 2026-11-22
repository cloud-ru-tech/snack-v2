---
name: component-e2e-tests
description: "Добавляй и обновляй Playwright-проверки и визуальные снимки пакетов @ds."
---

# component-e2e-tests

Для одной проверки сначала просмотри существующие файлы тестов, вспомогательные функции и `play`-функции пакета. Сопоставь их с публичным API. Чтение существующего `play` для поиска дублей не требует навыка Storybook.

Если найден новый сценарий, дополни существующий spec и используй его fixtures, story ID и локаторы. Проверки взаимодействия (click, keyboard, focus, callback) относятся к Storybook play. Playwright rendering проверяет базовый рендеринг и передачу пропсов. Для новых interaction, keyboard и polymorphism specs проверь условия в точном разделе [стандарта E2E](references/e2e-testing-standard.md). Если полезного сценария нет, объясни почему.

| Задача | Что открыть |
| --- | --- |
| Создать или перестроить набор Playwright specs | [Создание и обновление Playwright-проверок](references/workflow.md) |
| Добавить или обновить визуальные проверки и baselines | [Стандарт снимков](references/visual-regression-standard.md) |
| Разобраться со сбоем Storybook или Playwright | Соответствующий раздел [диагностики](references/test-environment-pitfalls.md) |

Проверь diff и, если окружение готово, запусти нужный spec через `pnpm test:e2e:chrome <путь-к-spec>`. Сообщи, если браузерная проверка не выполнялась.
