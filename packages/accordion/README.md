# Accordion

`@ds/accordion` — Аккордеон дизайн-системы — контейнер Accordion и три уровня раскрываемых блоков CollapseBlock с общими токенами view, backgroundPredefined и chevronPosition.

Пакет `@ds/accordion` даёт контейнер `Accordion` и три уровня раскрываемых блоков `CollapseBlockPrimary` / `CollapseBlockSecondary` / `CollapseBlockTertiary`. Контейнер отвечает за режим выбора (`single` / `multiple`) и controlled/uncontrolled состояние, блоки — за внешний вид и иерархию на странице.

- ****Accordion**** — контейнер раскрываемых блоков с режимами `single` / `multiple` и controlled/uncontrolled API.
- ****CollapseBlock**** — раскрываемые блоки трёх уровней: `Primary`, `Secondary`, `Tertiary` — для иерархии разделов на странице.

## Когда использовать

| Задача | Как решить |
|--------|------------|
| Длинная форма / настройки с логическими секциями | `Accordion` + `CollapseBlockPrimary` на каждый раздел |
| Двух- / трёхуровневая иерархия (раздел → подраздел → деталь) | Вложенные `Accordion` с `Primary` → `Secondary` → `Tertiary` |
| Разрешить открыть один блок за раз (FAQ) | `selectionMode='single'` |
| Разрешить одновременно несколько открытых блоков | `selectionMode='multiple'` |

Когда **не** нужен аккордеон: короткие списки (≤ 3 пунктов), критичный контент, который пользователь не должен пропустить, и навигация — для неё используйте `Tabs`.

## Установка

```bash
pnpm add @ds/accordion
```

```ts
import { Accordion } from '@ds/accordion'
```

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
**AccordionProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `expanded` | `string \| string[]` | — | Controlled состояние |
| `expandedDefault` | `string \| string[]` | — | Начальное состояние |
| `onExpandedChange` | `((value: string) => void) \| ((value: string[]) => void) \| undefined` | — | Controlled обработчик измения состояния |
| `selectionMode` | `"multiple"` \| `"single"` | — | Режим работы аккордиона |

## CollapseBlock

Семейство раскрываемых блоков аккордеона — Primary (l), Secondary (m), Tertiary (s). Общие пропсы title / subTitle / afterTitle / view / backgroundPredefined / chevronPosition.

Три семантических уровня раскрываемого блока: `CollapseBlockPrimary`, `CollapseBlockSecondary`, `CollapseBlockTertiary`. Уровень задаёт размер типографики заголовка и плотность отступов; все три компонента используют одно и то же API — меняется только роль в иерархии.

### Когда использовать
- **`Primary`** (title size `l`) — верхнеуровневые разделы страницы или секции формы.
- **`Secondary`** (title size `m`) — подразделы внутри `Primary`. Типовой `view='outline'`.
- **`Tertiary`** (title size `s`) — плоские детали без дальнейшей вложенности. Без `view` / `backgroundPredefined` — только заголовок и контент.

### Анатомия

#### View
Визуальная подача блока: `simple` — плоский фон без рамки, `outline` — с границей, `elevated` — с тенью для поверхностей поверх страницы.

#### backgroundPredefined
Слой акрила через `BACKGROUND_PREDEFINED_FILL` из `@ds/materials` (как у `Card`). По умолчанию — `neutralBackground1Level`.

#### chevronPosition (default `after`)
Положение шеврона-раскрытия относительно заголовка.

- `before` — шеврон слева от заголовка.
- `after` — шеврон справа от заголовка.

#### showChevron (default `true`)
Управляет наличием шеврона-раскрытия в строке заголовка.

- `true` — шеврон показывается рядом с заголовком.
- `false` — шеврон скрыт; блок по-прежнему раскрывается кликом по строке заголовка.

### Примеры использования

#### Цветовые схемы

Neutral — дефолт. Primary — акцент. Цветные варианты — для статусных разделов.

```tsx
import { Accordion } from '@ds/accordion';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

import styles from './styles.module.scss';

export function Appearances() {
  return (
    <div className={styles.wrapper}>
      <Accordion>
        <Accordion.CollapseBlockPrimary
          id='neutral'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
          title='Neutral'
          view='outline'
        >
          Нейтральный акрил — значение по умолчанию.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='primary'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}
          title='Primary'
          view='outline'
        >
          Акцентный раздел, выделенный основным цветом.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='green'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.GreenBackground}
          title='Green'
          view='outline'
        >
          Успех, подтверждённые действия.
        </Accordion.CollapseBlockPrimary>
        <Accordion.CollapseBlockPrimary
          id='red'
          backgroundPredefined={BACKGROUND_PREDEFINED_FILL.RedBackground}
          title='Red'
          view='outline'
        >
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
          chevronPosition='before'
          afterTitle='1 200 ₽'
        >
          Разбивка платежа по позициям.
        </Accordion.CollapseBlockSecondary>
        <Accordion.CollapseBlockSecondary
          id='delivery'
          view='outline'
          title='Доставка'
          chevronPosition='before'
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
**CollapseBlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | `neutralBackground1Level` | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `chevronPosition` | `"after"` \| `"before"` | `after` | Положение шеврона-раскрытия относительно текста (`before` \| `after`) |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `component` | `"accordionPrimary"` \| `"accordionSecondary"` \| `"accordionTertiary"` | — | Уровень аккордеона: размер типографики и отступы |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | `false` | Оставлять ли контент в DOM при сворачивании |
| `showChevron` | `boolean` | `true` | Показывать ли шеврон-раскрытия рядом с заголовком (по умолчанию `true`) |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | `simple` | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

##### Related types

- `ChevronPosition` = `"after"` \| `"before"`

- `Component` = `"accordionPrimary"` \| `"accordionSecondary"` \| `"accordionTertiary"`

- `View` = `"elevated"` \| `"outline"` \| `"simple"`

## CollapseBlockPrimary

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

### Props `CollapseBlockPropsWithoutComponent`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | — | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `chevronPosition` | `"after"` \| `"before"` | — | Положение шеврона-раскрытия относительно текста (`before` \| `after`) |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `showChevron` | `boolean` | — | Показывать ли шеврон-раскрытия рядом с заголовком (по умолчанию `true`) |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

#### Related types

- `ChevronPosition` = `"after"` \| `"before"`

- `View` = `"elevated"` \| `"outline"` \| `"simple"`

## CollapseBlockSecondary

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
          chevronPosition='before'
          afterTitle='1 200 ₽'
        >
          Разбивка платежа по позициям.
        </Accordion.CollapseBlockSecondary>
        <Accordion.CollapseBlockSecondary
          id='delivery'
          view='outline'
          title='Доставка'
          chevronPosition='before'
          afterTitle='бесплатно'
        >
          Курьер по Москве, 2–3 дня.
        </Accordion.CollapseBlockSecondary>
      </Accordion>
    </div>
  );
}
```

### Props `CollapseBlockPropsWithoutComponent`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | — | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `chevronPosition` | `"after"` \| `"before"` | — | Положение шеврона-раскрытия относительно текста (`before` \| `after`) |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `showChevron` | `boolean` | — | Показывать ли шеврон-раскрытия рядом с заголовком (по умолчанию `true`) |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | — | Визуальный вариант обложки (`simple`, `outline`, `elevated`) |

#### Related types

- `ChevronPosition` = `"after"` \| `"before"`

- `View` = `"elevated"` \| `"outline"` \| `"simple"`

## CollapseBlockTertiary

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

### Props `CollapseBlockTertiaryProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterTitle` | `ReactNode` | — | Контент справа от заголовка |
| `chevronPosition` | `"after"` \| `"before"` | — | Положение шеврона-раскрытия относительно текста (`before` \| `after`) |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | Дополнительный класс корневого элемента |
| `data-test-id` | `string` | — |  |
| `id` | `string` | — | Уникальный идентификатор блока в группе переключателей |
| `keepMounted` | `boolean` | — | Оставлять ли контент в DOM при сворачивании |
| `showChevron` | `boolean` | — | Показывать ли шеврон-раскрытия рядом с заголовком (по умолчанию `true`) |
| `subTitle` | `ReactNode` | — | Подзаголовок под строкой заголовка |
| `title` | `string` | — | Начальное состояние раскрытия (uncontrolled) |

#### Related types

- `ChevronPosition` = `"after"` \| `"before"`
