---
name: component-story-set
description: "Создавай и правь Storybook stories: Playground, VisualMatrix, примеры и play-тесты пакетов @ds."
---

# component-story-set

Для точечной правки начни с существующей story и её локальных файлов. Сохрани title, story ID и используемые селекторы. Чтение stories для проверки покрытия не требует загрузки полного workflow.

| Задача | Что открыть |
| --- | --- |
| Изменить триггер в существующем Playground | [Триггеры и селекторы](references/trigger-based-stories.md#4-канонические-test-id-триггеров) |
| Изменить Controls, args или зависимости между ними | [Конвенции args](references/storybook-args-conventions.md) |
| Добавить отдельную story, play-тест или VisualMatrix | Нужный раздел [стандарта stories](references/stories-standard.md) |
| Создать или пересобрать полный комплект stories | [Создание комплекта stories](references/workflow.md) |

В портальном Playground храни `open` в локальном состоянии render-компонента. При добавлении кнопки открытия сохрани основной `triggerOpen` и добавь отдельный семантический селектор в существующий общий `TEST_IDS` из `stories/testIds.ts` или `stories/<Name>/testIds.ts`, например `triggerOpenLongContent`. Если в story есть локальный объект селекторов, перенеси в него ссылку на ключ из общего `TEST_IDS`. Перед завершением проверь по diff, что обе кнопки имеют разные стабильные `data-test-id`.
