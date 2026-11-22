# Snack v2

Выбери навык по задаче. Открой его `SKILL.md` по ссылке и прочитай справки, относящиеся к правке.

| Задача или файлы | Навык |
| --- | --- |
| Код TypeScript и React, локализация и адаптивность в `packages/*/src` | [component-development](.agents/skills/component-development/SKILL.md) |
| Публичные пропсы | [Именование пропсов](.agents/skills/component-development/references/prop-naming.md) |
| Структура пакета, зависимости или выбор артефактов по tier | [new-component-package](.agents/skills/new-component-package/SKILL.md) |
| SCSS Modules | [scss-styles-audit](.agents/skills/scss-styles-audit/SKILL.md) |
| Stories и Playground | [component-story-set](.agents/skills/component-story-set/SKILL.md) |
| Playwright и baseline | [component-e2e-tests](.agents/skills/component-e2e-tests/SKILL.md) |
| Отчёт о покрытии тестами | [test-coverage](.agents/skills/test-coverage/SKILL.md) |
| MDX, демо, JSDoc и тексты | [component-docs](.agents/skills/component-docs/SKILL.md) |
| Проверка структуры, готовности пакета или аудит перед MR | [component-validation](.agents/skills/component-validation/SKILL.md) |
| План нового компонента или переноса | [component-planning](.agents/skills/component-planning/SKILL.md) |
| Извлечь оси и варианты Figma или получить SCSS слоя | [figma-inspection](.agents/skills/figma-inspection/SKILL.md) |
| Реализация по макету Figma | [figma-to-code](.agents/skills/figma-to-code/SKILL.md) |
| Сверить компонент с макетом | [component-figma-audit](.agents/skills/component-figma-audit/SKILL.md) |
| Обновить зависимости Snack UI Kit и Cloud.ru | [up-cloud-deps](.agents/skills/up-cloud-deps/SKILL.md) |
| Создать Git-коммит по явному запросу | [make-commit](.agents/skills/make-commit/SKILL.md) |

Соразмеряй stories, тесты и документацию с публичным API по [критерию обоснованности артефакта](.agents/skills/new-component-package/references/complexity-tiers.md). Для аудита компонентного пакета перед MR используй навык `component-validation` и его [справку по аудиту](.agents/skills/component-validation/references/mr-review.md).

Для любого текста для людей в репозитории применяй [стандарт стиля](.agents/skills/component-docs/references/writing-style.md).

## Выполнение задачи

Один агент ведёт задачу от исходного запроса до проверенного результата. Определи ожидаемое поведение, внеси правки и запусти проверки по затронутым областям. Для точечной правки текста достаточно самопроверки. Для изменений публичного API, миграций и общих механизмов оцени необходимость [независимого ревью](.agents/skills/component-validation/references/independent-review.md). Сообщи результат проверок и что осталось непроверенным.

## Общие принципы

- **НЕ** оставляй задачи незавершёнными — доводи до конца или явно сообщай, где остановился и почему.
- **НЕ** пиши длинные объяснения без необходимости. Короче — лучше.
- **НЕ** создавай файлы (включая README, планы, заметки), которых пользователь не просил.
- **НЕ** предлагай решения и рефакторинги, которые не были запрошены.

## TypeScript

- **НЕ** используй `any`. Нужен незнакомый тип — бери `unknown` и сужай.
- **НЕ** игнорируй ошибки TypeScript — устрани причину.
- **НЕ** ставь `@ts-ignore` / `@ts-expect-error` без крайней необходимости. Если ставишь — обязательно пояснение рядом.
- **НЕ** используй `unknown` туда, где тип известен и может быть выражен.

## React и компоненты

- **НЕ** используй типы через `React.*` (`React.ReactNode`, `React.CSSProperties`, `React.FC`, `React.HTMLAttributes`, `React.ElementType` и т.д.). Импортируй именованные типы из `'react'`. См. [react-types.md](.agents/skills/component-development/references/react-types.md).
- **НЕ** применяй `React.FC` / `React.FunctionComponent`. Типизируй пропсы явным объектным типом.
- **НЕ** типизируй колбэк-пропсы свойством с типом функции (`onChange?: (v: string) => void`) — только method-signature (`onChange?(v: string): void`). Исключение — готовый тип-алиас (`MouseEventHandler<…>`). См. [component-api-surface.md](.agents/skills/component-development/references/component-api-surface.md).
- **НЕ** импортируй мобильные компоненты напрямую — используй адаптивные обёртки, если они есть.
- **НЕ** создавай компоненты без продуманных loading/error/empty состояний.

## Код и архитектура

- **НЕ** дублируй логику — выдели общее в утилиту/хук/компонент.
- **НЕ** делай глубокую вложенность компонентов и JSX-деревьев (>4 уровней без декомпозиции).
- **НЕ** игнорируй производительность: лишние ре-рендеры, O(n²) на больших списках, тяжёлые вычисления в рендере.
- **НЕ** создавай сайд-эффекты без явной необходимости. Чистые функции по умолчанию.

## UI / UX

- **НЕ** собирай интерфейсы, без проверки доступности (ARIA, фокус, клавиатура, контраст).
- **НЕ** игнорируй требования адаптивности.
- **НЕ** используй литералы вместо констант и токенов дизайн-системы.
- **НЕ** полагайся на цвет как единственный носитель смысла.

## Команды и сборка

- **НЕ** запускай полный `pnpm build` / `pnpm build:packages` / `pnpm test:e2e` (все проекты) в цикле итераций. Используй селективные команды (`pnpm build:pkg <pkg>`, `pnpm test:e2e:chrome packages/<pkg>`, `pnpm exec eslint --fix packages/<pkg>` и т.д.) — см. [fast-build-commands.md](.agents/skills/component-validation/references/fast-build-commands.md). Полные прогоны — только перед коммитом / PR или при правках shared-пакета.
- **НЕ** чисти `.tsbuildinfo` ради «чистого билда» — теряется инкрементальность.

## Тестирование и качество

- **НЕ** пропускай обработку ошибок в пути, где ошибка реалистична.
- **НЕ** игнорируй предупреждения линтера — устрани причину или объясни исключение рядом с кодом.
- **НЕ** оставляй `console.log` в коде для production.
- **НЕ** коммить закомментированный код и TODO без тикета.

## Работа с данными

- **НЕ** делай прямые `fetch`/`axios` внутри UI-компонентов — вызывай их через слой доступа к данным.
- **НЕ** игнорируй loading/error состояния при асинхронной загрузке.
- **НЕ** оставляй подписки без очистки — проверь cleanup в `useEffect`.

## Безопасность

- **НЕ** используй `dangerouslySetInnerHTML` без очистки HTML.
- **НЕ** доверяй пользовательскому вводу — валидируй на границе системы.
- **НЕ** добавляй в код секреты, токены, внутренние URL.
- **НЕ** записывай в логи персональные данные и секреты.
