# Accordion

`@ds/accordion` — Аккордеон дизайн-системы — контейнер Accordion и три уровня раскрываемых блоков CollapseBlock с общими токенами view, appearance и chevron.

Пакет `@ds/accordion` даёт контейнер `Accordion` и три уровня раскрываемых блоков `CollapseBlockPrimary` / `CollapseBlockSecondary` / `CollapseBlockTertiary`. Контейнер отвечает за режим выбора (`single` / `multiple`) и controlled/uncontrolled состояние, блоки — за внешний вид и иерархию на странице.

- ****Accordion**** — контейнер раскрываемых блоков с режимами `single` / `multiple` и controlled/uncontrolled API.
- ****CollapseBlock**** — раскрываемые блоки трёх уровней: `Primary`, `Secondary`, `Tertiary` — для иерархии разделов на странице.

## Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
```

## Когда использовать

| Задача | Как решить |
|--------|------------|
| Длинная форма / настройки с логическими секциями | `Accordion` + `CollapseBlockPrimary` на каждый раздел |
| Двух- / трёхуровневая иерархия (раздел → подраздел → деталь) | Вложенные `Accordion` с `Primary` → `Secondary` → `Tertiary` |
| Разрешить открыть один блок за раз (FAQ) | `selectionMode='single'` |
| Разрешить одновременно несколько открытых блоков | `selectionMode='multiple'` |

Когда **не** нужен аккордеон: короткие списки (≤ 3 пунктов), критичный контент, который пользователь не должен пропустить, и навигация — для неё используйте `Tabs`.

## Figma

Оба компонента следуют одному мастер-файлу Figma. Ссылки на конкретные узлы — на страницах компонентов.

## Accordion

Контейнер-группа раскрываемых блоков. Управляет режимом выбора (single / multiple) и controlled/uncontrolled состоянием.

Контейнер, который группирует `CollapseBlock*` в одну логическую группу и управляет их раскрытием. Под капотом — `ToggleGroup` из `@ds/toggles`, поэтому семантика раскрытия идентична группе переключателей.

### Когда использовать
- Для группы раскрываемых блоков, где открытие/закрытие должно быть согласовано (один из, несколько из).
- Для двух- и трёхуровневой иерархии — вкладывайте `Accordion` внутрь блока, меняя уровень `CollapseBlock*`.

Когда **не** нужен: один изолированный раскрывающийся блок без группы — в этом случае достаточно самого `CollapseBlock*` без обёртки.

### Анатомия

#### Selection mode
Режим раскрытия дочерних блоков: `single` — одновременно открыт максимум один блок (как radio-группа), `multiple` — можно открыть любое количество независимо.

### Установка
```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
```

### Примеры использования
#### 1. Uncontrolled с начальным состоянием

expandedDefault задаёт первоначально открытый блок; дальше компонент управляет раскрытием сам.

```tsx
import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function BasicAccordion() {
  return (
    <div className={styles.wrapper}>
      <Accordion expandedDefault='profile'>
        <Accordion.CollapseBlockPrimary id='profile' title='Профиль' subTitle='Контакты и предпочтения' view='outline'>
          Имя, email, аватар.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='security' title='Безопасность' view='outline'>
          Пароль, сессии, 2FA.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
```

#### 2. Controlled + multiple

expanded + onExpandedChange в режиме multiple — значение массив id.

```tsx
import { Accordion } from '@ds/accordion';
import { useState } from 'react';

import styles from './styles.module.scss';
export function MultipleMode() {
  const [expanded, setExpanded] = useState<string[]>(['email']);

  return (
    <div className={styles.wrapper}>
      <Accordion selectionMode='multiple' expanded={expanded} onExpandedChange={next => setExpanded(next ?? [])}>
        <Accordion.CollapseBlockPrimary id='email' title='Email' view='outline'>
          Уведомления на почту.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='push' title='Push' view='outline'>
          Браузерные push-уведомления.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='messenger' title='Мессенджеры' view='outline'>
          Telegram, Slack, Mattermost.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `string | string[]` | — | Controlled состояние |
| `expandedDefault` | `string | string[]` | — | Начальное состояние |
| `onExpandedChange` | `((value: string) => void) | ((value: string[]) => void) | undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"multiple"` \| `"single"` | — | Режим работы аккордиона |

## CollapseBlock

Семейство раскрываемых блоков аккордеона — Primary (l), Secondary (m), Tertiary (s). Общие пропсы title / subTitle / afterTitle / view / appearance / chevron.

Три семантических уровня раскрываемого блока: `CollapseBlockPrimary`, `CollapseBlockSecondary`, `CollapseBlockTertiary`. Уровень задаёт размер типографики заголовка и плотность отступов; все три компонента используют одно и то же API — меняется только роль в иерархии.

### Когда использовать
- **`Primary`** (title size `l`) — верхнеуровневые разделы страницы или секции формы.
- **`Secondary`** (title size `m`) — подразделы внутри `Primary`. Типовой `view='outline'`.
- **`Tertiary`** (title size `s`) — плоские детали без дальнейшей вложенности. Без `view` / `appearance` — только заголовок и контент.

### Анатомия

#### View
Визуальная подача блока: `simple` — плоский фон без рамки, `outline` — с границей, `elevated` — с тенью для поверхностей поверх страницы.

#### Appearance
Акцентный цвет заголовка/маркера: `neutral` (по умолчанию) и `primary`, плюс семантические `red`, `yellow`, `green`, `blue` для выделения статуса секции.

#### Chevron
Положение шеврона-раскрытия: `before` — слева от заголовка, `after` — справа.

### Установка
```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'

// Каждый уровень доступен статическим полем контейнера:
Accordion.CollapseBlockPrimary
Accordion.CollapseBlockSecondary
Accordion.CollapseBlockTertiary
```

### Примеры использования

#### Цветовые схемы

Neutral — дефолт. Primary — акцент. Цветные варианты — для статусных разделов.

```tsx
import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';

export function Appearances() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='neutral' appearance='neutral' title='Neutral' view='outline'>
          Нейтральный акрил — значение по умолчанию.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='primary' appearance='primary' title='Primary' view='outline'>
          Акцентный раздел, выделенный основным цветом.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='green' appearance='green' title='Green' view='outline'>
          Успех, подтверждённые действия.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='red' appearance='red' title='Red' view='outline'>
          Предупреждение или критическое внимание.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
```

#### Левый шеврон + afterTitle справа

Читается как «строка итогов»: название слева, значение справа, шеврон возле названия.

```tsx
import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function ChevronBefore() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockSecondary
          id='summary'
          view='outline'
          title='Итого'
          chevron='before'
          afterTitle='1 200 ₽'
        >
          Разбивка платежа по позициям.
        </Accordion.CollapseBlockSecondary>
        <Accordion.CollapseBlockSecondary
          id='delivery'
          view='outline'
          title='Доставка'
          chevron='before'
          afterTitle='бесплатно'
        >
          Курьер по Москве, 2–3 дня.
        </Accordion.CollapseBlockSecondary>
      </Accordion>
    </div>
  );
}
```

#### afterTitle — счётчик

Counter в правом слоте заголовка. Не кликабельный — клик по строке раскрывает блок.

```tsx
import { Accordion } from '@ds/accordion';
import { Counter } from '@ds/counter';

import styles from './styles.module.scss';

export function AfterTitle() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='inbox' title='Входящие' view='outline' afterTitle={<Counter value={12} />}>
          Непрочитанные сообщения и уведомления.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary id='archive' title='Архив' view='outline' afterTitle={<Counter value={238} />}>
          Перемещённые из входящих.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
```

#### Primary → Secondary → Tertiary

Каждый уровень — собственный Accordion. Вложенный не наследует состояние родителя.

```tsx
import { Accordion } from '@ds/accordion';

import styles from './styles.module.scss';
export function NestedLevels() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary id='root' title='Платежи' view='outline'>
          <Accordion>
            <Accordion.CollapseBlockSecondary id='sub-cards' view='outline' title='Карты'>
              <Accordion>
                <Accordion.CollapseBlockTertiary id='visa' title='Visa •••• 4242'>
                  Основная карта, истекает 09/28.
                </Accordion.CollapseBlockTertiary>
                <Accordion.CollapseBlockTertiary id='mir' title='МИР •••• 7781'>
                  Зарплатная карта.
                </Accordion.CollapseBlockTertiary>
              </Accordion>
            </Accordion.CollapseBlockSecondary>
            <Accordion.CollapseBlockSecondary id='sub-invoices' view='outline' title='Счета'>
              История операций и выставленные счета.
            </Accordion.CollapseBlockSecondary>
          </Accordion>
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` | `neutral` | Цветовая схема акрила |
| `chevron` | `"after"` \| `"before"` | `after` | Расположение шеврона относительно текста (`before` | `after`) |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `component` | `"accordionPrimary"` \| `"accordionSecondary"` \| `"accordionTertiary"` | — | Уровень аккордеона: размер типографики и отступы |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | `false` | Оставлять ли контент в DOM при сворачивании |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | `simple` | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

## CollapseBlockPrimary

```tsx
import { CollapseBlockPrimary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockPrimary>Click me</CollapseBlockPrimary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` | — | Цветовая схема акрила |
| `chevron` | `"after"` \| `"before"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

## CollapseBlockSecondary

```tsx
import { CollapseBlockSecondary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockSecondary>Click me</CollapseBlockSecondary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `appearance` | `"blue"` \| `"green"` \| `"neutral"` \| `"primary"` \| `"red"` \| `"yellow"` | — | Цветовая схема акрила |
| `chevron` | `"after"` \| `"before"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

## CollapseBlockTertiary

```tsx
import { CollapseBlockTertiary } from '@ds/accordion'

export function Example() {
  return <CollapseBlockTertiary>Click me</CollapseBlockTertiary>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `chevron` | `"after"` \| `"before"` | — | Расположение шеврона относительно текста (`before` | `after`) |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
