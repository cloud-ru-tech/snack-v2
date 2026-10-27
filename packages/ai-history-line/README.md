# AiHistoryLine

`@ds/ai-history-line` — Вертикальная лента шагов AI-диалога — запросы пользователя, ответы агента, вызовы инструментов, чекпоинты

Вертикальная лента шагов AI-диалога — запросы пользователя, ответы агента, вызовы инструментов, чекпоинты

## Когда использовать

Вертикальная лента событий: запрос, ответ, группа вызовов, чекпоинт. Содержимое строки передаёт потребитель. Индикатор, степпер, запрос, аккордеон и чекпоинт можно поставить и отдельно от ленты. Карточка группы раскрывается сама. Уже показанную группу раскрывают снаружи через `open` и `onOpenChange`. Кольцо в ленте одно: его `id` задают `value` или `defaultValue`. Клик по индикатору с `id` переключает это кольцо. Запись адреса и прокрутку к строке делает потребитель в `onIndicatorClick`.

## Анатомия

- `AiHistoryLine` — список, `ul`.
- `AiHistoryLine.Item` — строка: степпер, индикатор и слот тела.
- `AiHistoryLine.Indicator` — колодец 24×24. `background={false}` убирает подложку у аватара. Кольцо задаёт `active`, своё состояние выбора компонент не хранит.
- `AiHistoryLine.Stepper` — верхний и нижний коннекторы вокруг индикатора. Высоту верхней линии задаёт `offset`. `showLeadingConnector={false}` скрывает линию и сохраняет место. Нижняя линия есть при `showClosingConnector`. В ленте смещение считает строка: центр кружка совпадает с центром первой строки, у первой строки линия не видна.
- `AiHistoryLine.AgentContent` — обёртка ответа агента: отступ сверху и расстояние между соседними блоками.
- `AiHistoryLine.Request`, `AiHistoryLine.Accordion`, `AiHistoryLine.Checkpoint` — карточки. Аккордеон хранит раскрытие внутри себя, а `open` и `onOpenChange` передают его наружу.

## Установка

```bash
pnpm add @ds/ai-history-line
```

```ts
import { AiHistoryLine } from '@ds/ai-history-line'
```

## Props

**AiHistoryLineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | Полиморфный тег корня. По умолчанию `ul`. |
| `children` | `ReactNode` | — | Элементы ленты. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | `id` индикатора, выбранного при первом рендере. |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `onIndicatorChange` | `((value: string) => void)` | — | Сообщает `id` выбранного индикатора. Повторный клик по нему передаёт `undefined`. |
| `value` | `string` | — | `id` выбранного индикатора. Вместе с `onIndicatorChange` выбор управляемый. |

## AiHistoryLineAccordion

### Props `AiHistoryLineAccordionProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Слот содержимого. Статус каждой строки задаёт сам ребёнок. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line-accordion` |  |
| `defaultOpen` | `boolean` | `false` | Карточка раскрыта при первом рендере. |
| `id` | `string` | — | Идентификатор карточки. |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корень карточки, не на кнопку. |
| `onOpenChange` | `((open: boolean) => void)` | — | Сообщает новое раскрытие после клика или клавиши. |
| `open` | `boolean` | — | Раскрытие уже показанной карточки. Вместе с `onOpenChange` состояние управляемое. |
| `title` | `string` | — | Подпись кнопки раскрытия. Число вызовов и пометку об ошибке собирает продукт. |

## AiHistoryLineAgentContent

### Props `AiHistoryLineAgentContentProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Блоки ответа. Расстояние задаётся между соседними блоками. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line-agent-content` |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент. |

## AiHistoryLineCheckpoint

### Props `AiHistoryLineCheckpointProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `added` | `number` | — | Количество добавленных строк. Целое неотрицательное число, знак `+` ставит `AiCodeDiff`. |
| `as` | `ElementType` | — | Полиморфный тег корня. По умолчанию `div`. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line-checkpoint` |  |
| `hash` | `string` | — | Короткий идентификатор коммита. |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `removed` | `number` | — | Количество удалённых строк. Целое неотрицательное число, знак `-` ставит `AiCodeDiff`. |
| `title` | `string` | — | Текст коммита. |

## AiHistoryLineIndicator

### Props `AiHistoryLineIndicatorProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Кольцо выбора. Компонент его не переключает. |
| `background` | `boolean` | `true` | Подложка колодца. `false` убирает заливку и внутреннюю обводку, кольцо выбора остаётся. |
| `children` | `ReactNode` | — | Содержимое колодца 24×24: аватар или иконка. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line__indicator` |  |
| `href` | `string` | — | Делает индикатор ссылкой. Переход выполняет потребитель. |
| `indicatorLabel` | `string` | — | Доступное имя кнопки или ссылки. |
| `innerRef` | `Ref<HTMLButtonElement \| HTMLAnchorElement \| HTMLSpanElement>` | — | Ref на корневой элемент. |
| `onClick` | `MouseEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | — | Клик по индикатору. Без `href` рендерит кнопку. |

## AiHistoryLineItem

### Props `AiHistoryLineItemProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | Полиморфный тег корня. По умолчанию `li`. |
| `children` | `ReactNode` | — | Тело строки. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line__item` |  |
| `firstItem` | `boolean` | — | Первая строка. Верхний коннектор остаётся и держит смещение, линия не видна. |
| `href` | `string` | — | Делает индикатор ссылкой. <br/> Переход, запись адреса и прокрутка остаются на стороне потребителя. |
| `id` | `string` | — | Значение в группе активного индикатора. С `id` индикатор становится кнопкой выбора. |
| `indicator` | `ReactNode` | — | Узел в колодце 24×24. Иконку собирает потребитель. |
| `indicatorBackground` | `boolean` | `true` | Подложка индикатора. `false` для аватара: без заливки и внутренней обводки. |
| `indicatorLabel` | `string` | — | Доступное имя интерактивного индикатора. <br/> Имеет смысл у кнопки выбора (`id`) и у ссылки (`href`). |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `lastItem` | `boolean` | — | Последняя строка. Нижний коннектор скрыт. |
| `onIndicatorClick` | `MouseEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | — | Дополнительный обработчик клика. <br/> Сюда потребитель ставит запись хеша и прокрутку, если они нужны. |

## AiHistoryLineRequest

### Props `AiHistoryLineRequestProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `ElementType` | — | Полиморфный тег корня. По умолчанию `div`. |
| `children` | `ReactNode` | — | Текст запроса. Переносится по ширине, лимита строк нет. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line-request` |  |
| `duration` | `string` | — | Уже отформатированная длительность. Нет значения — скрыты и длительность, и разделитель. |
| `innerRef` | `PolymorphicRef` | — | Ref на корневой элемент. |
| `timestamp` | `string` | — | Уже отформатированные дата и время. |

## AiHistoryLineStepper

### Props `AiHistoryLineStepperProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Индикатор между коннекторами. |
| `className` | `string` | — | Дополнительный класс корня. |
| `data-test-id` | `string` | `ai-history-line__stepper` |  |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой элемент. |
| `offset` | `Height<string \| number>` | — | Высота верхнего коннектора. <br/> Число — пиксели, строка — CSS-длина. <br/> Нет значения и `0` — коннектор не рендерится. |
| `showClosingConnector` | `boolean` | — | Показать нижний коннектор. |
| `showLeadingConnector` | `boolean` | — | Показать верхний коннектор. `false` — слот остаётся и держит `offset`, линия скрыта. |
