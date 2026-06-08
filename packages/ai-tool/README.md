# AiTool

`@ds/ai-tool` — Базовые презентационные элементы для сборки AI-компонентов Tool и Tool Simple — иконки, статус, текст, key-value, дерево, бейджи и блок деталей.

`@ds/ai-tool` — набор презентационных элементов для отображения вызова инструмента (tool call) в AI-сценариях стриминга. Из них собираются составные компоненты `Tool` (VibeOps) и `Tool Simple` (Гига-помощник): тип инструмента, статус выполнения, текст, дерево аргументов и результата, бейджи ресурсов.

Все элементы — тонкие presentational-компоненты: состояние (раскрытие узлов, секрет) живёт в родителе, данные передаются через слоты `ReactNode`. Компоненты ничего не запоминают сами.

## Когда использовать

- Рендер аргументов и результата вызова инструмента в чате AI-ассистента.
- Пошаговое отображение статуса инструмента (pending → loading → success / error).
- Сворачиваемое дерево JSON-подобных данных (объекты, массивы, ключ-значение).

### Когда не нужен

- Готовый высокоуровневый компонент вызова инструмента:
  - используйте `Tool` / `Tool Simple` (собраны из этих элементов).
- Обычный контент-блок без семантики инструмента:
  - используйте `@ds/card` или типографику `@ds/typography`.

## Установка

```bash
pnpm add @ds/ai-tool
```

```ts
import { AiToolIcon, AiToolObject, AiToolStatus } from '@ds/ai-tool'
```

## Компоненты

### Content — наполнение контентом

- **AiToolText** — текстовый блок (mono / error).
- **AiToolKeyValue** — пара «ключ — значение».
- **AiToolObject** — узел дерева (complex / string).
- **AiToolArray** — сворачиваемый список со счётчиком.

### Atoms — каркасные элементы

- **AiToolIcon** — иконка типа инструмента.
- **AiToolStatus** — индикатор состояния шага.
- **AiToolBadge** — бейдж ресурса.
- **AiToolDetails** — карточка деталей.
- **AiToolDetailsLabel** — заголовок части блока деталей.

## AiToolIcon

Иконка типа инструмента (reasoning, search, read, act, security, wait), 16×16, цвет наследуется через currentColor.

Иконка 16×16, обозначающая тип шага инструмента. Цвет наследуется через `currentColor` — по умолчанию приглушённый `textTertiary`.

### Когда использовать

- Маркер типа шага в строке вызова инструмента (рассуждение, поиск, чтение, действие).
- Рядом с заголовком блока деталей или в статус-строке.

### Анатомия

#### Variant

- `reasoning` — рассуждение модели.
- `search` — поиск.
- `read` — чтение.
- `act` — действие.
- `security` — проверка безопасности.
- `wait` — ожидание.

### Примеры использования

#### Типы инструментов

Все значения variant в ряд

```tsx
import { AI_TOOL_ICON_TYPE, AiToolIcon } from '@ds/ai-tool';

export function IconSet() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {Object.values(AI_TOOL_ICON_TYPE).map(variant => (
        <AiToolIcon key={variant} variant={variant} />
      ))}
    </div>
  );
}
```

### Props

**AiToolIconProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-icon` |  |
| `variant` | `"act"` \| `"read"` \| `"reasoning"` \| `"search"` \| `"security"` \| `"wait"` | — | Тип инструмента — определяет глиф (reasoning / search / read / act / security / wait). |

##### Related types

- `AiToolIconType` = `"act"` \| `"read"` \| `"reasoning"` \| `"search"` \| `"security"` \| `"wait"`

## AiToolStatus

Точка-индикатор состояния шага инструмента — success, error, loading (пульс) и pending (полое кольцо).

Точка-индикатор состояния выполнения шага инструмента.

### Когда использовать

- Пошаговое отображение прогресса инструмента: pending → loading → success / error.
- Маркер состояния рядом с названием шага или ресурса.

### Анатомия

#### State

- `success` — зелёная заливка.
- `error` — красная заливка.
- `loading` — синяя заливка с пульсом.
- `pending` — полое нейтральное кольцо.

### Примеры использования

#### Состояния статуса

pending · loading · success · error

```tsx
import { AI_TOOL_STATUS_STATE, AiToolStatus } from '@ds/ai-tool';

export function StatusRow() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Pending} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Loading} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Success} />
      <AiToolStatus state={AI_TOOL_STATUS_STATE.Error} />
    </div>
  );
}
```

### Props

**AiToolStatusProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-status` |  |
| `state` | `"error"` \| `"loading"` \| `"pending"` \| `"success"` | — | Состояние выполнения инструмента: success / error / loading / pending. |

##### Related types

- `AiToolStatusState` = `"error"` \| `"loading"` \| `"pending"` \| `"success"`

## AiToolText

Текстовый блок содержимого инструмента с режимами mono (моноширинный) и error (красный); внутри AiToolDetails наследуется автоматически.

Текстовый блок содержимого инструмента. Базовый строительный элемент: из него собираются `AiToolKeyValue`, `AiToolObject` и `AiToolArray`.

### Когда использовать

- Вывод текстового результата или аргумента инструмента.
- Моноширинный вывод JSON-подобных данных (`mono`).

### Анатомия

#### Mono (default `false`)

Переключает шрифт на моноширинный. Внутри `AiToolDetails` включается автоматически.

#### Error (default `false`)

Окрашивает текст в красный. Внутри `AiToolDetails` в состоянии `error` включается автоматически.

### Примеры использования

#### Режимы текста

Обычный, mono, error и mono+error

```tsx
import { AiToolText } from '@ds/ai-tool';

export function TextBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AiToolText>Обычный текст результата</AiToolText>
      <AiToolText mono>{`{ "status": "ok" }`}</AiToolText>
      <AiToolText error>Ошибка выполнения инструмента</AiToolText>
      <AiToolText mono error>{`{ "error": "timeout" }`}</AiToolText>
    </div>
  );
}
```

### Props

**AiToolTextProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Текст блока. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-text` |  |
| `error` | `boolean` | — | Состояние ошибки: текст красный. По умолчанию наследуется от `AiToolDetails`. |
| `mono` | `boolean` | — | Моноширинный режим: шрифт mono/body вместо label. По умолчанию наследуется от `AiToolDetails`. |

## AiToolKeyValue

Пара «ключ — значение» с раскладкой line или column; mono и error наследуются из AiToolDetails или задаются пропом.

Пара «ключ — значение» для содержимого инструмента. Собрана из `AiToolText`, поэтому поддерживает `mono` и `error`.

### Когда использовать

- Вывод полей результата инструмента (region, status, id).
- Строка в составе `AiToolObject` или `AiToolArray`.

### Анатомия

#### Variant (default `line`)

- `line` — ключ слева, значение справа.
- `column` — значение под ключом.

#### Mono / Error

Наследуются из контекста `AiToolDetails` (внутри карточки — всегда mono, в состоянии error — красный) либо задаются пропом явно.

### Примеры использования

#### Раскладки

line и column

```tsx
import { AiToolKeyValue } from '@ds/ai-tool';

export function KeyValuePair() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <AiToolKeyValue label='region' value='ru-central1' variant='line' />
      <AiToolKeyValue label='description' value='Постоянный инстанс для прод-окружения' variant='column' />
    </div>
  );
}
```

### Props

**AiToolKeyValueProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-key-value` |  |
| `error` | `boolean` | — | Состояние ошибки: ключ и значение красные. По умолчанию наследуется от `AiToolDetails`. |
| `label` | `ReactNode` | — | Ключ (левая / верхняя часть пары). |
| `mono` | `boolean` | — | Моноширинный режим ключа и значения. По умолчанию наследуется от `AiToolDetails`. |
| `value` | `ReactNode` | — | Значение (правая / нижняя часть пары). |
| `variant` | `"column"` \| `"line"` | `line` | Раскладка пары: `line` — ключ и значение в строку, `column` — стопкой. |

##### Related types

- `AiToolKeyValueType` = `"column"` \| `"line"`

## AiToolObject

Узел дерева аргументов — complex (сворачиваемый, с вложенными детьми) или string (инлайн пара имя-значение).

Узел дерева аргументов или результата инструмента. Раскрытие controlled: `opened` + `onToggle`.

### Когда использовать

- Сворачиваемый объект с вложенными полями.
- Инлайн пара имя-значение в составе дерева.

### Анатомия

#### Variant (default `complex`)

- `complex` — сворачиваемый узел с chevron'ом и вложенными детьми (`opened` + `onToggle`). Принимает любой вложенный контент: `AiToolText`, `AiToolKeyValue`, вложенные `AiToolObject` и `AiToolArray`.
- `string` — инлайн пара имя-значение.

#### Mono / Error

Наследуются из `AiToolDetails` и каскадом передаются во вложенные узлы; либо задаются пропом явно.

### Примеры использования

#### Дерево вызова инструмента

Object + KeyValue + Array

```tsx
import { AiToolArray, AiToolKeyValue, AiToolObject } from '@ds/ai-tool';
import { useState } from 'react';

export function ToolCallTree() {
  const [openRoot, setOpenRoot] = useState(true);
  const [openZones, setOpenZones] = useState(true);

  return (
    <AiToolObject variant='complex' name='result' opened={openRoot} onToggle={setOpenRoot}>
      <AiToolKeyValue label='region' value='ru-central1' />
      <AiToolKeyValue label='status' value='running' />
      <AiToolArray name='zones' count={2} unit='шт.' opened={openZones} onToggle={setOpenZones}>
        <AiToolObject variant='string' name='[0]' value='ru-central1-a' />
        <AiToolObject variant='string' name='[1]' value='ru-central1-b' />
      </AiToolArray>
    </AiToolObject>
  );
}
```

### Props

**AiToolObjectProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Вложенное дерево (только для раскрытого `complex`). |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-object` |  |
| `error` | `boolean` | — | Состояние ошибки: имя и значение красные. По умолчанию наследуется от `AiToolDetails`. |
| `mono` | `boolean` | — | Моноширинный режим имени и значения. По умолчанию наследуется от `AiToolDetails`. |
| `name` | `ReactNode` | — | Имя узла (`Key[ObjectName]`). |
| `onToggle` | `((opened: boolean) => void)` | — | Переключение раскрытия (только для `complex`). Получает новое значение `opened`. |
| `opened` | `boolean` | `false` | Раскрытое состояние (только для `complex`). Источник истины — родитель. |
| `value` | `ReactNode` | — | Значение для типа `string` (инлайн рядом с именем). |
| `variant` | `"complex"` \| `"string"` | `complex` | Тип узла: `complex` — сворачиваемое дерево, `string` — инлайн ключ-значение. |

##### Related types

- `AiToolObjectType` = `"complex"` \| `"string"`

## AiToolArray

Сворачиваемый список со счётчиком элементов; принимает любые вложенные узлы, включая массив объектов.

Сворачиваемый список однотипных элементов: имя, счётчик (`count` + `unit`) и chevron. Раскрытие controlled: `opened` + `onToggle`.

### Когда использовать

- Массив элементов в результате инструмента.
- Список объектов с вложенными полями.

### Анатомия

#### Count + Unit

Счётчик рендерится как `[ N ]` или `[ N unit ]` (например `[ 2 шт. ]`).

#### Вложенный контент

В элементы можно вкладывать любой контент: `AiToolText`, `AiToolKeyValue`, `AiToolObject` (включая массив объектов) и вложенные `AiToolArray`.

#### Mono / Error

Наследуются из `AiToolDetails` и каскадом передаются во вложенные узлы; либо задаются пропом явно.

### Примеры использования

#### Массив объектов

Array с вложенными Object

```tsx
import { AiToolArray, AiToolObject } from '@ds/ai-tool';
import { useState } from 'react';

export function ArrayList() {
  const [opened, setOpened] = useState(true);

  return (
    <div style={{ width: 360 }}>
      <AiToolArray name='Key[ArrayName]' count={2} unit='шт.' opened={opened} onToggle={setOpened}>
        <AiToolObject name='Key[0]' opened>
          <AiToolObject variant='string' name='region' value='ru-central1' />
          <AiToolObject variant='string' name='status' value='ok' />
        </AiToolObject>
        <AiToolObject name='Key[1]' opened>
          <AiToolObject variant='string' name='region' value='ru-central1-a' />
          <AiToolObject variant='string' name='status' value='pending' />
        </AiToolObject>
      </AiToolArray>
    </div>
  );
}
```

### Props

**AiToolArrayProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Вложенные элементы (при раскрытии). |
| `className` | `string` | — | Доп. класс корня. |
| `count` | `number` | — | Количество элементов — рендерится как `[ N ]` (или `[ N unit ]`). |
| `data-test-id` | `string` | `ai-tool-array` |  |
| `error` | `boolean` | — | Состояние ошибки: имя и счётчик красные. По умолчанию наследуется от `AiToolDetails`. |
| `mono` | `boolean` | — | Моноширинный режим имени и счётчика. По умолчанию наследуется от `AiToolDetails`. |
| `name` | `ReactNode` | — | Имя узла (`Key[ArrayName]`). |
| `onToggle` | `((opened: boolean) => void)` | — | Переключение раскрытия. Получает новое значение `opened`. |
| `opened` | `boolean` | `false` | Раскрытое состояние. Источник истины — родитель. |
| `unit` | `string` | — | Единица измерения после количества (например `шт.`). |

## AiToolBadge

Бейдж-пилюля ресурса с иконкой по badgeType (cloud-ru / other); полиморфен через as.

Бейдж-пилюля ресурса со встроенной иконкой и текстом. Полиморфен через `as` — например `as='a'` для ссылки на ресурс.

### Когда использовать

- Отметка ресурса, к которому обращается инструмент (проект, сервис, документ).
- Кликабельная ссылка на ресурс (`as='a'`).

### Анатомия

#### BadgeType (default `other`)

- `cloud-ru` — логотип Cloud.ru.
- `other` — нейтральный ромб.

### Примеры использования

#### Бейджи ресурсов

Cloud.ru, нейтральный и ссылочный бейдж

```tsx
import { AI_TOOL_BADGE_TYPE, AiToolBadge } from '@ds/ai-tool';

export function Badges() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='my-vm-instance' />
      <AiToolBadge badgeType={AI_TOOL_BADGE_TYPE.Other} label='external-resource' />
      <AiToolBadge as='a' href='#' badgeType={AI_TOOL_BADGE_TYPE.CloudRu} label='link-resource' />
    </div>
  );
}
```

### Props

**AiToolBadgeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Полиморфный тег корня (`'a'` для ссылки и т.д.). По умолчанию `'span'`. |
| `badgeType` | `"cloud-ru"` \| `"other"` | — | Тип бейджа — определяет встроенную иконку (`cloud-ru` / `other`). Без него иконка не рендерится. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-badge` |  |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на корневой элемент (вместо `forwardRef`). |
| `label` | `ReactNode` | — | Текст бейджа (одна строка с ellipsis). |

##### Related types

- `AiToolBadgeType` = `"cloud-ru"` \| `"other"`

- `PolymorphicRef` = `ComponentPropsWithRef<T>["ref"]`

## AiToolDetails

Карточка деталей инструмента — заголовок-лейбл поверх скроллируемого тела; задаёт mono и (в state error) error для всего вложенного контента.

Карточка деталей инструмента: заголовок-лейбл (`AiToolDetailsLabel`) поверх скроллируемого тела.

Весь текстовый контент внутри карточки автоматически становится моноширинным; в состоянии `error` — ещё и красным. Это прокидывается во вложенные `AiToolText`, `AiToolKeyValue`, `AiToolObject`, `AiToolArray` без ручной простановки пропсов.

### Когда использовать

- Блок с аргументами или результатом одного вызова инструмента.
- Контейнер для дерева данных с фиксированной высотой и скроллом.

### Анатомия

#### State (default `default`)

- `default` — нейтральная рамка и заголовок.
- `error` — красная рамка и заголовок; вложенный контент становится mono + error.

#### Scroll (default `true`)

Ограничивает высоту тела и включает вертикальный скролл. При `false` карточка растягивается по контенту.

### Примеры использования

#### Блок деталей

AiToolDetails с моноширинным контентом

```tsx
import { AiToolDetails, AiToolText } from '@ds/ai-tool';

export function DetailsCard() {
  return (
    <AiToolDetails label='create_instance' state='default'>
      <AiToolText mono>{`{ "region": "ru-central1", "status": "ok" }`}</AiToolText>
    </AiToolDetails>
  );
}
```

### Props

**AiToolDetailsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Контент блока деталей (текст, key-value, дерево). |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-details` |  |
| `label` | `ReactNode` | — | Текст заголовка-лейбла. |
| `onToggleSecret` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Клик по кнопке-«глаз» заголовка. |
| `scroll` | `boolean` | `true` | Ограничить высоту контента и включить вертикальный скролл. По умолчанию `true`. |
| `secretRevealed` | `boolean` | `false` | Секрет раскрыт. Источник истины — родитель. |
| `showSecret` | `boolean` | `false` | Показать кнопку-«глаз» в заголовке для раскрытия секрета. |
| `state` | `"default"` \| `"error"` | `default` | Состояние: `default` — нейтральный, `error` — красная рамка и лейбл. |

##### Related types

- `AiToolDetailsState` = `"default"` \| `"error"`

## AiToolDetailsLabel

Заголовок-чип части блока деталей (Запрос / Ответ) с кнопкой-«глаз» для показа секретных значений в теле.

Заголовок-чип части блока деталей — обычно «Запрос» или «Ответ». Опциональная кнопка-«глаз» (`showSecret` + `onToggleSecret`) переключает показ секретных значений в теле блока.

### Когда использовать

- Подзаголовок секции внутри `AiToolDetails`.
- Переключатель показа секретов (токены, пароли) в результате инструмента.

### Анатомия

#### State (default `default`)

- `default` — нейтральный фон и текст.
- `error` — красный.

#### Secret

`showSecret` добавляет кнопку-«глаз». Видимое состояние — `secretRevealed` (источник истины — родитель): зачёркнутый глаз — секреты скрыты, открытый — показаны.

### Примеры использования

#### Переключение секрета

Кнопка-«глаз» меняет состояние secretRevealed

```tsx
import { AiToolDetailsLabel } from '@ds/ai-tool';
import { useState } from 'react';

export function DetailsLabelSecret() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <AiToolDetailsLabel
        label='Ответ'
        showSecret
        secretRevealed={revealed}
        onToggleSecret={() => setRevealed(prev => !prev)}
      />
    </div>
  );
}
```

### Props

**AiToolDetailsLabelProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-tool-details-label` |  |
| `label` | `ReactNode` | — | Текст лейбла (заголовок блока деталей). |
| `onToggleSecret` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Клик по кнопке-«глаз». Не вызывается, если `showSecret` не задан. |
| `secretRevealed` | `boolean` | `false` | Секрет раскрыт: глаз открыт (секреты видны). Зачёркнутый глаз — секреты скрыты. Источник истины — родитель. |
| `showSecret` | `boolean` | `false` | Показать кнопку-«глаз» для раскрытия секретного значения. |
| `state` | `"default"` \| `"error"` | `default` | Состояние: `default` — нейтральный, `error` — красный. |

##### Related types

- `AiToolDetailsState` = `"default"` \| `"error"`
