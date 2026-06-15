# List

`@ds/list` — Списочный UI — компонент List для плоских/вложенных списков с выбором, группами и поиском и Droplist — тот же список в поповере.

Пакет `@ds/list` собирает списочный UI дизайн-системы: плоские и вложенные списки, списки с выбором (single / multiple), группы с раскрытием, поиск, закреплённые элементы, виртуализацию и Droplist — тот же список в popover.

## Когда использовать

| Задача | Как решить |
|--------|------------|
| Навигация/меню/settings sidebar | `List` с `items` |
| Выбор из коллекции (радио-группа/чекбоксы) | `List` + `selection={{ mode: 'single' \| 'multiple', ... }}` |
| Выпадашка-селектор у кнопки/поля | `Droplist` с `children`-триггером |
| Группы с раскрытием (inbox/starred/folders) | `items` типа `{ type: 'collapse', items: [...] }` + `collapse` |
| Длинный список (1k+) | `virtualized` на `List` |
| Закреплённые действия сверху/снизу | `pinTop` / `pinBottom` |

Когда **не** нужен `List`:

- Простой набор из 2–4 кнопок — используйте **`Button`** + layout.
- Табличные данные с сортировкой/фильтрацией — используйте `Table`.
- Многошаговая форма — используйте `Stepper`.

## Установка

```bash
pnpm add @ds/list
```

```ts
import { List, Droplist, ItemContent } from '@ds/list'
import '@ds/list/style.css'
```

## Figma

Все три компонента живут в одном Figma-файле «Состояния для list / tab / toggles». Ссылки на конкретные узлы — на страницах компонентов.
## Состав пакета

- ****List**** — основной компонент. Принимает `items` (+ `pinTop` / `pinBottom` / `footer`), управляет выбором через `selection`, раскрытием групп через `collapse`, поиском через `search`. Поддерживает виртуализацию для 1000+ элементов.
- ****Droplist**** — тот же список в popover. Оборачивает `children`-триггер и открывает список рядом с ним. Передаёт почти все пропсы `List`.
- ****ItemContent**** — каноничная разметка содержимого item: `option` (заголовок), `caption` (мета справа), `description` (подпись снизу). Используется как значение `item.content`.

## Общие принципы

- **Contract первый, стайлинг второй.** Элементы описываются как данные (`items: Item[]`), а не как JSX. Это даёт стабильную клавиатурную навигацию, selection и поиск «из коробки».
- **ItemContent — единый слот контента.** Разметку внутри элемента задаёт не потребитель, а `ItemContent` — чтобы заголовок / caption / description выравнивались одинаково во всех пакетах.
- **Controlled/uncontrolled симметричны.** У `selection`, `collapse` и `search` одинаковая форма: `defaultValue` / `value` + `onChange`. Выбирайте по тому, где должен жить state.
- **Виртуализация — осознанный выбор.** Включайте `virtualized` только при 1k+ элементов. На коротких списках виртуализация ломает layout-assumptions (динамическая высота, focus-into-view).

## List

Основной компонент списка. Управляет items, выбором, раскрытием групп, поиском, виртуализацией и закреплёнными элементами.

Плоский или вложенный список элементов с клавиатурной навигацией, выбором, раскрытием групп и поиском. Элементы задаются декларативно через `items`, `pinTop`, `pinBottom` — компонент сам строит DOM, управляет фокусом и эмитит изменения выбора.

### Когда использовать

- Навигация (sidebar, меню аккаунта, breadcrumbs popover).
- Селектор-значение (часовой пояс, валюта, язык) — чаще всего вместе с **Droplist**.
- Список объектов с действиями: письма, файлы, задачи.
- Иерархия с раскрытием (folders, workspace → projects → tasks).
- Длинные списки (1k+) через `virtualized`.

Когда **не** нужен:

- Таблицы с колонками — `Table`.
- Короткий набор действий (≤ 4) — кнопки.

### Анатомия

#### Size (default `s`)

- `s` — компактный, дефолт. Droplist'ы, плотные sidebar'ы, настройки.
- `m` — средний. Основные списки объектов (письма, задачи).
- `l` — крупный. Mobile, списки с описаниями, главные навигационные меню.

#### Selection (default off)

- Без `selection` — клик = `onClick` элемента, состояния «выбран» нет. Подходит для навигации.
- `selection={{ mode: 'single' }}` — один выбранный элемент, `value: ItemId`. Селектор значения (валюта, регион).
- `selection={{ mode: 'multiple' }}` — множественный выбор, `value: ItemId[]`. Фильтры, настройки, права доступа.

Visual signal: marker (вертикальная полоса) + фоновая заливка. `marker` можно отключить (`marker={false}`), если родительский layout уже подсвечивает активный элемент.

#### Switch-презентация выбора

У `BaseItem` есть проп `switch`. При `switch: true` элемент рисует на правом краю `Switch` вместо чекбокса/маркера, а `isChecked` управляет положением тумблера. Применяется в списках настроек, где «выбор» — это включение функции (уведомления, доступы, интеграции), а не пометка элемента.

- `switch` работает вместе с `selection` (`mode: 'multiple'` или `'single'`) — состояние тумблера берётся из выбора.
- При `switch: true` маркер и заливка не рисуются: единственный носитель состояния — сам тумблер.
- `showSwitchIcon` — флаг иконки внутри тумблера (на момент Phase 5 не передаётся в `@ds/toggles`, зарезервирован).

#### Group variant (default `subtitleTertiary`)

Тип `group` / `group-select` принимает `groupVariant` — оформление заголовка группы:

- `subtitle` — заголовок-подзаголовок: контрастный текст, акцент на названии секции.
- `subtitleTertiary` — приглушённый третичный текст, для второстепенных группировок.

Дополнительно `divider: true` рисует разделитель над группой.

#### Item shape

Один элемент = одна строка данных. Слоты:

- `option` — заголовок (обязателен).
- `caption` — мета справа (счётчик, дата, badge).
- `description` — подпись под заголовком (1–2 строки).
- `beforeContent` — иконка / аватар слева.
- `afterContent` — слот справа. Иконка рендерится в квадрате размера иконки; произвольный контент (счётчик, badge, tag) — в натуральном размере, без обрезки до иконочного квадрата.

Truncate управляется через `truncate` на `ItemContent` — см. страницу **ItemContent**.

#### States

- `loading` — показывает skeleton вместо items.
- `dataFiltered` — флаг, что текущий пустой массив — результат фильтра/поиска. Компонент покажет `noResultsState`.
- `dataError` — ошибка загрузки, рендерится `errorDataState`.
- `noDataState` / `noResultsState` / `errorDataState` — конфигурация empty-state (`description`, `icon`, `footer`).

### Примеры использования

#### Базовый плоский список

items — массив объектов с id и content.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function BasicList() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          { id: 'inbox', content: { option: 'Входящие', caption: '12' } },
          { id: 'sent', content: { option: 'Отправленные' } },
          { id: 'archive', content: { option: 'Архив', caption: '238' } },
          { id: 'trash', content: { option: 'Корзина', description: 'Удаляется через 30 дней' } },
        ]}
      />
    </div>
  );
}
```

#### Single selection

selection={{ mode: 'single', value, onChange }} — контролируемый выбор одного элемента.

```tsx
import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function SingleSelection() {
  const [value, setValue] = useState<string | number | undefined>('usd');

  return (
    <div className={styles.box}>
      <List
        size='s'
        marker
        selection={{ mode: 'single', value, onChange: setValue }}
        items={[
          { id: 'usd', content: { option: 'Доллар США', caption: 'USD' } },
          { id: 'eur', content: { option: 'Евро', caption: 'EUR' } },
          { id: 'rub', content: { option: 'Российский рубль', caption: 'RUB' } },
          { id: 'cny', content: { option: 'Китайский юань', caption: 'CNY' } },
        ]}
      />
    </div>
  );
}
```

#### Multiple selection

В режиме multiple value — массив ItemId.

```tsx
import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function MultipleSelection() {
  const [value, setValue] = useState<(string | number)[]>(['email', 'push']);

  return (
    <div className={styles.box}>
      <List
        size='s'
        selection={{ mode: 'multiple', value, onChange: setValue }}
        items={[
          { id: 'email', content: { option: 'Email' } },
          { id: 'push', content: { option: 'Push-уведомления' } },
          { id: 'sms', content: { option: 'SMS' } },
          { id: 'telegram', content: { option: 'Telegram', description: 'Требует привязки аккаунта' } },
        ]}
      />
    </div>
  );
}
```

#### Группы с раскрытием

type: 'collapse' + collapse.defaultValue. Подходит для folders / workspace / sidebar-групп.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function GroupsCollapsible() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        collapse={{ defaultValue: ['projects'] }}
        items={[
          {
            type: 'collapse',
            id: 'projects',
            content: { option: 'Проекты' },
            items: [
              { id: 'p-web', content: { option: 'Web-портал' } },
              { id: 'p-mobile', content: { option: 'Mobile' } },
              { id: 'p-admin', content: { option: 'Admin' } },
            ],
          },
          {
            type: 'collapse',
            id: 'settings',
            content: { option: 'Настройки' },
            items: [
              { id: 's-profile', content: { option: 'Профиль' } },
              { id: 's-team', content: { option: 'Команда' } },
              { id: 's-billing', content: { option: 'Оплата' } },
            ],
          },
        ]}
      />
    </div>
  );
}
```

#### Три уровня вложенности

Группы внутри групп — подходит для каталогов, файловых деревьев.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function NestedLevels() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        collapse={{ defaultValue: ['catalog', 'catalog/books'] }}
        items={[
          {
            type: 'collapse',
            id: 'catalog',
            content: { option: 'Каталог' },
            items: [
              {
                type: 'collapse',
                id: 'catalog/books',
                content: { option: 'Книги' },
                items: [
                  { id: 'catalog/books/fiction', content: { option: 'Художественные' } },
                  { id: 'catalog/books/science', content: { option: 'Научные' } },
                ],
              },
              {
                type: 'collapse',
                id: 'catalog/music',
                content: { option: 'Музыка' },
                items: [
                  { id: 'catalog/music/rock', content: { option: 'Рок' } },
                  { id: 'catalog/music/jazz', content: { option: 'Джаз' } },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
```

#### Поиск внутри списка

search={{ value, onChange }} — встроенная строка поиска. Фильтрация items — на стороне потребителя.

```tsx
import { List } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const ALL = [
  'Антон',
  'Борис',
  'Виктор',
  'Галина',
  'Дарья',
  'Евгений',
  'Жанна',
  'Зоя',
  'Игорь',
  'Ксения',
  'Лев',
  'Мария',
];

export function WithSearch() {
  const [query, setQuery] = useState('');

  const items = useMemo(
    () =>
      ALL.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => ({
        id: name,
        content: { option: name },
      })),
    [query],
  );

  return (
    <div className={styles.box}>
      <List size='s' search={{ value: query, onChange: setQuery, placeholder: 'Поиск по имени' }} items={items} />
    </div>
  );
}
```

#### Закреплённые элементы

pinTop / pinBottom — списки, которые не участвуют в scroll основного массива.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function PinnedItems() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        pinTop={[
          { id: 'all', content: { option: 'Все задачи', caption: '128' } },
          { id: 'mine', content: { option: 'Мои задачи', caption: '14' } },
        ]}
        items={[
          { id: 'design', content: { option: 'Дизайн' } },
          { id: 'backend', content: { option: 'Бэкенд' } },
          { id: 'frontend', content: { option: 'Фронтенд' } },
          { id: 'qa', content: { option: 'QA' } },
        ]}
        pinBottom={[{ id: 'archive', content: { option: 'Архив', description: 'Завершённые задачи' } }]}
      />
    </div>
  );
}
```

#### Виртуализация

virtualized — рендерит только видимые строки. Включайте при 1000+ элементов.

```tsx
import { Button } from '@ds/button';
import { List } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const TOTAL = 10_000;

export function Virtualized() {
  const items = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: `row-${i}`,
        content: { option: `Запись #${i + 1}`, caption: i % 5 === 0 ? 'new' : undefined },
      })),
    [],
  );

  const [value, setValue] = useState<string | number | undefined>('row-0');

  return (
    <div className={styles.wrapper}>
      <Button
        size='s'
        appearance='neutral'
        view='outline'
        label='Прыгнуть к случайной записи'
        onClick={() => setValue(`row-${Math.floor(Math.random() * TOTAL)}`)}
      />
      <List
        size='s'
        virtualized
        scroll
        limitedScrollHeight
        scrollToSelectedItem
        selection={{ mode: 'single', value, onChange: setValue }}
        items={items}
      />
    </div>
  );
}
```

#### Empty state

dataFiltered + noResultsState — контролируемое сообщение при пустом результате поиска.

```tsx
import { List } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function EmptyState() {
  const [query, setQuery] = useState('qwerty');

  const items = query.length > 3 ? [] : [{ id: 'a', content: { option: 'Пример результата' } }];

  return (
    <div className={styles.box}>
      <List
        size='s'
        search={{ value: query, onChange: setQuery, placeholder: 'Поиск' }}
        items={items}
        dataFiltered
        noResultsState={{
          description: 'Ничего не нашли. Проверьте раскладку или измените запрос.',
        }}
      />
    </div>
  );
}
```

#### Обёртка айтема и неактивный элемент

itemWrapRender оборачивает item в Tooltip; inactive выводит элемент из навигации и selection, оставляя его видимым.

```tsx
import { List } from '@ds/list';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

const asExternalLink = (href: string) =>
  function (item: ReactNode) {
    return (
      <a href={href} target='_blank' rel='noreferrer' className={styles.link}>
        {item}
      </a>
    );
  };

export function ListItemWrap() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          {
            id: 'prod',
            content: { option: 'Production', caption: 'open' },
            itemWrapRender: asExternalLink('https://console.cloud.ru/prod'),
          },
          {
            id: 'staging',
            content: { option: 'Staging', caption: 'open' },
            itemWrapRender: asExternalLink('https://console.cloud.ru/staging'),
          },
          {
            id: 'legacy',
            content: { option: 'Legacy', description: 'Среда выведена из эксплуатации — недоступна для перехода' },
            inactive: true,
          },
        ]}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `barHideStrategy` | `"leave"` \| `"move"` \| `"never"` \| `"scroll"` | — | Управление скрытием скролл баров: <br/> <br> - `Never` - показывать всегда <br/> <br> - `Leave` - скрывать когда курсор покидает компонент <br/> <br> - `Scroll` - показывать только когда происходит скроллинг <br/> <br> - `Move` - показывать при движении курсора над компонентом |
| `className` | `string` | — | CSS-класс |
| `collapse` | `CollapseState` | `{}` | Настройки раскрытия элементов |
| `contentRender` | `((props: ContentRenderProps) => ReactNode)` | — | Рендер функция основного контента айтема |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — | Загрузка данных завершилась ошибкой: показывается `errorDataState` |
| `dataFiltered` | `boolean` | — | Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `footerDivider` | `boolean` | — | Показывать divider между body и footer (Figma `dropdownContainer.dividerWrapper` снизу) |
| `hasListInFocusChain` | `boolean` | `true` | Флаг, отвечающий за включение самого родительского контейнера листа в цепочку фокусирующихся элементов |
| `header` | `ReactNode ;` | — | Кастомизируемый элемент в начале списка — Figma `dropdownContainer.topBar`. <br/> Подходит для заголовка / справочного блока над поиском. |
| `headerDivider` | `boolean` | — | Показывать divider между header и body (Figma `dropdownContainer.dividerWrapper` сверху) |
| `items` | `Item[]` | `[]` | Основные элементы списка |
| `keyboardNavigationRef` | `RefObject<{ focusItem(id: ItemId): void; }>` | — | Ссылка на управление навигацией листа с клавиатуры |
| `limitedScrollHeight` | `boolean` | — | Ограничить максимальную высоту скролл-контейнера в зависимости от `size` |
| `loading` | `boolean` | — | Флаг, отвечающий за состояние загрузки списка |
| `marker` | `boolean` | `true` | Отображать ли маркер у выбранного элемента списка |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onKeyDown` | `((e: KeyboardEvent<HTMLElement>) => void)` | — | Обработчик события по нажатию клавиш |
| `onScroll` | `((event?: Event) => void)` | — | Колбек на скролл прокручиваемого списка |
| `pinBottom` | `Item[]` | `[]` | Элементы списка, закрепленные снизу |
| `pinTop` | `Item[]` | `[]` | Элементы списка, закрепленные сверху |
| `scroll` | `boolean` | — | Включить ли скролл для основной части списка |
| `scrollContainerClassName` | `string` | — | CSS-класс для scroll обертки основного списка айтемов |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `search` | `SearchState` | — | Настройки поисковой строки |
| `selection` | `SelectionSingleState \| SelectionMultipleState` | — | Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`), <br/> `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет — <br/> клик вызывает только `onClick` элемента. |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер списка |
| `tabIndex` | `number` | `0` | `tabIndex` корневого элемента списка (для управления порядком фокуса) |
| `untouchableScrollbars` | `boolean` | — | Отключает возможность взаимодействовать со скролбарами мышью. |
| `virtualized` | `boolean` | — | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |

### Смотри также

- **Droplist** — этот список в popover.
- **ItemContent** — каноничная разметка item.
### Item types

- `BaseItem` — обычный элемент с `content` / `beforeContent` / `afterContent`; опционально `switch: true` для тумблер-презентации выбора.
- `{ type: 'collapse', items }` — группа, раскрывается кликом по заголовку; управление — через `collapse`.
- `{ type: 'next-list', items, placement }` — раскрытие в соседний popover (для каскадных меню).
- `{ type: 'group', items, groupVariant }` / `{ type: 'group-select', items, groupVariant }` — визуальная группа с label, `groupVariant` (`subtitle` / `subtitleTertiary`), опциональным `divider` и «выбрать всё» (`group-select`).

Типы экспортируются из пакета: `BaseItemProps`, `AccordionItemProps`, `NextListItemProps`, `GroupItemProps`, `GroupSelectItemProps`. Дискриминаторы — `isBaseItemProps`, `isAccordionItemProps` и пр.

### Controlled vs uncontrolled

`selection`, `collapse` и `search` принимают одинаковую форму:

- **Uncontrolled** — передавайте `defaultValue`. Компонент хранит state сам, пригодно для форм/настроек, где значения потом читаются через `onChange`.
- **Controlled** — `value` + `onChange`. Нужен, когда state живёт в URL / query / внешнем сторе, или когда требуется программно менять выбор/раскрытие.

### Виртуализация

- Включайте `virtualized` при размере `items` от ~1000 элементов.
- Виртуализация несовместима со `scrollToSelectedItem` — фокусирование строки в большом списке делайте вручную через `keyboardNavigationRef.current?.focusItem(id)`.
- Внутри `Droplist` виртуализация работает так же — проп `virtualized` доступен и там.

### Доступность

- Контейнер имеет роль `menu`, элементы — `menuitem`. Это согласовано с использованием списка внутри dropdown/menu-сценариев.
- Клавиатура: `ArrowDown` / `ArrowUp` переходят между элементами (без wrap-around, пропуская `disabled`), `ArrowRight` раскрывает группу или next-list, `ArrowLeft` сворачивает, `Tab` уводит фокус с item на корневой контейнер и далее из списка. `Enter` / `Space` на сфокусированном элементе выбирают его.
- Первый `ArrowDown` от корневого контейнера переводит фокус на первый элемент; дальше навигация идёт по элементам.
- Marker и фоновая заливка выбранного элемента — два независимых носителя смысла, состояние понятно без цвета.
- Disabled-элементы не попадают в цепочку табуляции и не реагируют на клавиатуру.

## Droplist

List в popover. Оборачивает триггер (кнопку / поле) и показывает список рядом с ним. Принимает почти все пропсы List.

Тот же `List` в popover. `Droplist` оборачивает `children`-триггер, сам управляет открытием/закрытием и показывает список рядом с триггером. Почти все пропсы `List` (`items`, `selection`, `collapse`, `search`, `virtualized`, `pinTop` / `pinBottom`) доступны здесь напрямую.

### Когда использовать

- Селектор-значение у кнопки/поля (валюта, язык, регион, сортировка).
- Меню действий (у toolbar-кнопки, у строки таблицы).
- Вторичная навигация, которую не хочется держать на странице постоянно.

Когда **не** нужен Droplist:

- Простое меню из 2–3 действий — проще держать inline.
- Список должен быть виден всегда (sidebar) — используйте **List**.
- Сложная форма с несколькими полями — используйте **Popover** + свой layout.

### Анатомия

#### Size (default `s`)

Размер задаёт высоту строки списка (Figma `listItem`): `s` = 40px, `m` = 52px, `l` = 66px. Совпадает с `size` у **List**.

- `s` — дефолт. Компактные селекторы у кнопок toolbar/header.
- `m` — списки объектов с описанием.
- `l` — крупные меню, mobile.

#### Selection mode (default off)

Режим выбора идентичен **List**:

- без `selection` — клик = навигация/действие, состояния «выбран» нет.
- `selection={{ mode: 'single' }}` — один выбранный элемент (`value: ItemId`); обычно с `closeDroplistOnItemClick`.
- `selection={{ mode: 'multiple' }}` — множественный выбор (`value: ItemId[]`); popover не закрывается на клик.

#### Placement (default `bottom-start`)

- `bottom-start` — дефолт. Для списков у кнопки в header/toolbar, анкорится по левому краю триггера.
- `bottom-end` — если триггер прижат к правому краю контейнера.
- `top-*` — намеренно ставьте только когда триггер физически у нижнего края страницы. У нижнего края viewport fallback отработает автоматически.

#### Trigger event (default `click`)

- `click` — дефолт. Предсказуемо, работает на touch, доступнее для клавиатуры.
- `hover` — допустимо только для навигационных меню без чувствительных действий. Не используйте для селекторов и действий с последствиями.

#### Width strategy (default `auto`)

- `widthStrategy='auto'` — дефолт. Ширина popover'а по контенту.
- `widthStrategy='eq'` — popover ровно по ширине триггера. Идеально для селектов в форме.
- `widthStrategy='gte'` — popover не уже триггера, но может быть шире по контенту.

#### Header / Footer

Шапка и подвал popover'а — кастомные слоты вокруг тела списка (Figma `dropdownContainer.topBar` / `bottomBar`):

- `header` — `ReactNode` над списком (и над полем поиска, если оно есть). Заголовок раздела, справочный блок.
- `headerDivider` — рисует разделитель между `header` (вместе с полем поиска) и телом списка.
- `footer` — `ReactNode` под списком. Сводка, ссылка на полный список.
- `footerDivider` — рисует разделитель между телом списка и `footer`.

Разделители включаются только вместе с соответствующим слотом: `headerDivider` без `header` ничего не рисует.

#### Close after selection

- В `single` + навигация → `closeDroplistOnItemClick` обычно `true`.
- В `multiple` → всегда `false` (по умолчанию), иначе пользователь не сможет проставить несколько галочек.

### Примеры использования

#### Селектор-кнопка

Кнопка-триггер + Droplist с single selection и закрытием после выбора.

```tsx
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function BasicDroplist() {
  const [value, setValue] = useState<string | number | undefined>('rub');

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        items={[
          { id: 'usd', content: { option: 'USD — Доллар США' } },
          { id: 'eur', content: { option: 'EUR — Евро' } },
          { id: 'rub', content: { option: 'RUB — Российский рубль' } },
          { id: 'cny', content: { option: 'CNY — Китайский юань' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Валюта: ${String(value).toUpperCase()}`} />
      </Droplist>
    </div>
  );
}
```

#### Multiple selection

Несколько отметок без закрытия. closeDroplistOnItemClick по умолчанию false.

```tsx
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistMultiple() {
  const [value, setValue] = useState<(string | number)[]>(['email']);

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        selection={{ mode: 'multiple', value, onChange: setValue }}
        items={[
          { id: 'email', content: { option: 'Email' } },
          { id: 'push', content: { option: 'Push-уведомления' } },
          { id: 'sms', content: { option: 'SMS' } },
          { id: 'telegram', content: { option: 'Telegram' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Каналы: ${value.length}`} />
      </Droplist>
    </div>
  );
}
```

#### Поиск внутри Droplist

search + фильтрация items на стороне потребителя — поведение идентично List.

```tsx
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const COUNTRIES = [
  'Австрия',
  'Армения',
  'Беларусь',
  'Бразилия',
  'Германия',
  'Грузия',
  'Индия',
  'Казахстан',
  'Китай',
  'Россия',
  'США',
  'Турция',
];

export function DroplistWithSearch() {
  const [value, setValue] = useState<string | number | undefined>('Россия');
  const [query, setQuery] = useState('');

  const items = useMemo(
    () =>
      COUNTRIES.filter(name => name.toLowerCase().includes(query.toLowerCase())).map(name => ({
        id: name,
        content: { option: name },
      })),
    [query],
  );

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        search={{ value: query, onChange: setQuery, placeholder: 'Поиск страны' }}
        items={items}
      >
        <Button size='s' appearance='neutral' view='outline' label={`Страна: ${value}`} />
      </Droplist>
    </div>
  );
}
```

#### Form select (widthStrategy="eq")

Popover ровно по ширине триггера — поведение нативного select.

```tsx
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistAsFormSelect() {
  const [value, setValue] = useState<string | number | undefined>('m');

  const options = [
    { id: 's', content: { option: 'Small (1 vCPU, 2 GB RAM)' } },
    { id: 'm', content: { option: 'Medium (2 vCPU, 4 GB RAM)' } },
    { id: 'l', content: { option: 'Large (4 vCPU, 8 GB RAM)' } },
    { id: 'xl', content: { option: 'X-Large (8 vCPU, 16 GB RAM)' } },
  ];
  const label = options.find(o => o.id === value)?.content.option ?? 'Выбрать';

  return (
    <div className={styles.formSelect}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        widthStrategy='eq'
        selection={{ mode: 'single', value, onChange: setValue }}
        items={options}
      >
        <Button size='s' appearance='neutral' view='outline' label={label} fullWidth />
      </Droplist>
    </div>
  );
}
```

#### Шапка и подвал с разделителями

header / footer — слоты над и под списком; headerDivider / footerDivider рисуют разделители.

```tsx
import { Button } from '@ds/button';
import { Droplist } from '@ds/list';
import { useState } from 'react';

import styles from './styles.module.scss';

export function DroplistWithHeader() {
  const [value, setValue] = useState<string | number | undefined>('relevance');

  return (
    <div className={styles.wrapper}>
      <Droplist
        trigger='click'
        placement='bottom-start'
        closeDroplistOnItemClick
        selection={{ mode: 'single', value, onChange: setValue }}
        header='Сортировать по'
        headerDivider
        footer='4 варианта сортировки'
        footerDivider
        items={[
          { id: 'relevance', content: { option: 'Релевантности' } },
          { id: 'date', content: { option: 'Дате создания' } },
          { id: 'name', content: { option: 'Имени' } },
          { id: 'size', content: { option: 'Размеру' } },
        ]}
      >
        <Button size='s' appearance='neutral' view='outline' label='Сортировка' />
      </Droplist>
    </div>
  );
}
```

### Props

**DroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `barHideStrategy` | `"leave"` \| `"move"` \| `"never"` \| `"scroll"` | — | Управление скрытием скролл баров: <br/> <br> - `Never` - показывать всегда <br/> <br> - `Leave` - скрывать когда курсор покидает компонент <br/> <br> - `Scroll` - показывать только когда происходит скроллинг <br/> <br> - `Move` - показывать при движении курсора над компонентом |
| `children` | `ReactNode \| ({onKeyDown}) => ReactNode * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры` | — | Триггер для дроплиста |
| `className` | `string` | — | CSS-класс |
| `closeDroplistOnItemClick` | `boolean` | `false` | Закрывать выпадающий список после клика на базовый айтем. <br/> Работает в режимах selection: 'none' \| 'single' |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `collapse` | `CollapseState` | `{}` | Настройки раскрытия элементов |
| `container` | `RefObject<HTMLElement \| null>` | — | Контейнер портала (ref). Переопределяет `PortalContext` для этого дроплиста <br/> (по аналогии с `container` у Modal/Drawer). По умолчанию — из `PortalContextProvider`. |
| `contentRender` | `((props: ContentRenderProps) => ReactNode)` | — | Рендер функция основного контента айтема |
| `data-test-id` | `string` | — |  |
| `dataError` | `boolean` | — | Загрузка данных завершилась ошибкой: показывается `errorDataState` |
| `dataFiltered` | `boolean` | — | Текущий пустой список — результат поиска/фильтра: показывается `noResultsState` вместо `noDataState` |
| `errorDataState` | `EmptyStateProps` | — | Экран при ошибке запроса |
| `footer` | `ReactNode ;` | — | Кастомизируемый элемент в конце списка |
| `footerActiveElementsRefs` | `RefObject<HTMLElement>[]` | — | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| `footerDivider` | `boolean` | — | Показывать divider между body и footer (Figma `dropdownContainer.dividerWrapper` снизу) |
| `header` | `ReactNode ;` | — | Кастомизируемый элемент в начале списка — Figma `dropdownContainer.topBar`. <br/> Подходит для заголовка / справочного блока над поиском. |
| `headerDivider` | `boolean` | — | Показывать divider между header и body (Figma `dropdownContainer.dividerWrapper` сверху) |
| `items` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `Item` \| `ScrollProps` | — | Основные элементы списка |
| `limitedScrollHeight` | `boolean` | — | Ограничить максимальную высоту скролл-контейнера в зависимости от `size` |
| `listRef` | `RefObject<HTMLElement>` | — | Ссылка на элемент выпадающего списка |
| `loading` | `boolean` | — | Флаг, отвечающий за состояние загрузки списка |
| `marker` | `boolean` | `true` | Отображать ли маркер у выбранного элемента списка |
| `noDataState` | `EmptyStateProps` | — | Экран при отсутствии данных |
| `noResultsState` | `EmptyStateProps` | — | Экран при отсутствии результатов поиска или фильтров |
| `onOpenChange` | `((isOpen: boolean) => void)` | — | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| `onScroll` | `OriginalScrollProps` | — | Колбек на скролл прокручиваемого списка |
| `open` | `boolean` | — | Управляет состоянием показан/не показан. |
| `pinBottom` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `Item` \| `ScrollProps` | `[]` | Элементы списка, закрепленные снизу |
| `pinTop` | `BaseItemWithoutNonGroup` \| `CommonGroupItem` \| `Item` \| `ScrollProps` | `[]` | Элементы списка, закрепленные сверху |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `scroll` | `boolean` | — | Включить ли скролл для основной части списка |
| `scrollContainerClassName` | `string` | — | CSS-класс для scroll обертки основного списка айтемов |
| `scrollContainerRef` | `Ref<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `scrollToSelectedItem` | `boolean` | — | Флаг, отвечающий за прокручивание до выбранного элемента |
| `search` | `SearchState` | — | Настройки поисковой строки |
| `selection` | `SelectionMultipleState` \| `SelectionSingleState` | — | Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`), <br/> `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет — <br/> клик вызывает только `onClick` элемента. |
| `size` | `"l"` \| `"m"` \| `"s"` | `s` | Размер списка |
| `trigger` | `"click"` \| `"clickAndFocusVisible"` \| `"focus"` \| `"focusVisible"` \| `"hover"` \| `"hoverAndFocus"` \| `"hoverAndFocusVisible"` | — | Условие отображения поповера: <br/> - `click` - открывать по клику <br/> - `hover` - открывать по ховеру <br/> - `focusVisible` - открывать по focus-visible <br/> - `focus` - открывать по фокусу <br/> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br/> - `hoverAndFocus` - открывать по ховеру и фокусу <br/> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `triggerElemRef` | `RefObject<HTMLElement>` | — | Ссылка на элемент-триггер для дроплиста |
| `untouchableScrollbars` | `boolean` | `false` | Отключает возможность взаимодействовать со скролбарами мышью. |
| `virtualized` | `boolean` | `false` | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| `widthStrategy` | `"auto"` \| `"eq"` \| `"gte"` | `auto` | Стратегия управления шириной контейнера поповера <br/> - `auto` - соответствует ширине контента, <br/> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br/> - `eq` - Equal, строго равен ширине таргета. |

##### Related types

**BaseItemWithoutNonGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот после основного контента |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот до основного контента |
| `checked` | `boolean \| undefined` | — | Управляемое состояние выбранности айтема |
| `className` | `string \| undefined` | — | CSS-класс |
| `content` | `ItemContent` | — | Основной контент айтема |
| `data-test-id` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `hidden` | `boolean \| undefined` | — | Скрыть элемент из списка (не рендерится и выпадает из навигации) |
| `id` | `ItemId` | — | Уникальный идентификатор |
| `itemRef` | `RefObject<HTMLElement> \| undefined` | — | Ссылка на DOM-элемент айтема |
| `itemWrapRender` | `((item: ReactNode) => ReactNode) \| undefined` | — | Рендер-обёртка вокруг айтема (например, для проксирования в `Tooltip`/`Link`) |
| `onBlur` | `((e: FocusEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки блюра |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки клика |
| `onFocus` | `((e: FocusEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки фокуса |
| `onKeyDown` | `((e: KeyboardEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки нажатия клавиши |
| `onMouseDown` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки нажатия кнопки мыши |
| `showSwitchIcon` | `boolean \| undefined` | — | Флаг отображения иконки у чекбоксов |

**CollapseState**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `ItemId` | — |  |
| `onChange` | `((value?: ItemId[]) => void) \| undefined` | — |  |
| `value` | `ItemId` | — |  |

**CommonGroupItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Слот иконки слева от label (Figma listItemGroup 2945:7298). |
| `divider` | `boolean \| undefined` | — | Показать разделитель над группой |
| `groupVariant` | `"subtitle"` \| `"subtitleTertiary"` | — | Визуальный стиль заголовка группы |
| `hidden` | `boolean \| undefined` | — | Скрыть группу из списка |
| `label` | `string \| undefined` | — | Заголовок группы |
| `truncate` | `TruncateStringProps` | — | Настройки усечения длинного заголовка группы |

**EmptyStateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — | Дополнительный класс |
| `data-test-id` | `string \| undefined` | — |  |
| `description` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подзаголовок |
| `footer` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Вложенный контент (например ButtonGroup) |
| `icon` | `IconPredefinedProps` | — | Иконка |

- `Item` = `BaseItem | GroupItem | GroupSelectItem | NextListItem | AccordionItem`

**ItemContent**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `caption` | `string \| undefined` | — |  |
| `className` | `string \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `description` | `string \| undefined` | — |  |
| `disabled` | `boolean \| undefined` | — |  |
| `option` | `string \| number` | — |  |
| `truncate` | `TruncateProps` | — |  |

- `ItemId` = `string | number`

- `OnChangeHandler` = `(value: T) => void`

**ScrollProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `barHideStrategy` | `"leave"` \| `"move"` \| `"never"` \| `"scroll"` | — | Управление скрытием скролл баров: <br/> <br> - `Never` - показывать всегда <br/> <br> - `Leave` - скрывать когда курсор покидает компонент <br/> <br> - `Scroll` - показывать только когда происходит скроллинг <br/> <br> - `Move` - показывать при движении курсора над компонентом |
| `onScroll` | `OriginalScrollProps` | — | Колбек на скролл прокручиваемого списка |
| `scroll` | `boolean \| undefined` | — | Включить ли скролл для основной части списка |
| `scrollContainerRef` | `Ref<HTMLElement> \| undefined` | — | Ссылка на контейнер, который скроллится |
| `scrollRef` | `Ref<HTMLElement> \| undefined` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `untouchableScrollbars` | `boolean \| undefined` | — | Отключает возможность взаимодействовать со скролбарами мышью. |

**SearchState**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean \| undefined` | — |  |
| `onChange` | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | — |  |
| `onKeyDown` | `((e: KeyboardEvent<HTMLElement>) => void) \| undefined` | — |  |
| `placeholder` | `string \| undefined` | — |  |
| `value` | `string \| undefined` | — |  |

**SelectionMultipleState**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `ItemId` | — | Начальное состояние |
| `mode` | `"multiple"` | — | Режим выбора |
| `onChange` | `ItemId` \| `OnChangeHandler` | — | Controlled обработчик изменения состояния — получает массив выбранных `ItemId[]` |
| `value` | `ItemId` | — | Controlled состояние |

**SelectionSingleState**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `ItemId` | — | Начальное состояние |
| `mode` | `"single"` | — | Режим выбора |
| `onChange` | `ItemId` \| `OnChangeHandler` | — | Controlled обработчик изменения состояния — получает выбранный `ItemId` |
| `value` | `ItemId` | — | Controlled состояние |

- `Size` = `"l"` \| `"m"` \| `"s"`

### Figma

{/* Droplist делит Figma-файл с List — отдельного droplist/dropdownContainer-узла в FIGMA_NODES нет.
    Это допустимый fallback (см. figma-integration.md): показываем общий list-узел и item-search. */}
### Droplist vs List

| Ситуация 

### Trigger

`children` — сам триггер. Поддерживаются две формы:

- `ReactNode` — просто вложенный элемент (кнопка / поле). Droplist навешивает на него open/close.
- `({ onKeyDown }) => ReactNode` — render-prop с `onKeyDown`-хендлером, который нужно передать на триггер для клавиатуры. Используйте, если триггер — кастомный компонент без привычной клавиатурной поддержки.

### Открытие и контроль

- **Uncontrolled** — компонент сам управляет `open`, ничего передавать не нужно.
- **Controlled** — `open` + `onOpenChange`. Нужен для программного открытия (например, по keyboard shortcut) или синхронизации с URL.
- `closeOnPopstate` автоматически закрывает popover при `popstate`-событии — полезно в SPA с router'ом.

### Selection и collapse

Всё, что относится к содержимому списка (`items`, `pinTop`, `pinBottom`, `selection`, `collapse`, `search`, `footer`, `virtualized`, `marker`, `size`, `contentRender`), работает так же, как в **List**.

### Доступность

- Триггер получает `aria-expanded` и `aria-haspopup='listbox'` автоматически (через `Dropdown`).
- При открытии фокус переходит внутрь списка, при закрытии — возвращается к триггеру.
- `Escape` закрывает popover, `Tab` переключает на следующий focusable элемент страницы.
- Стрелки, `Home` / `End`, `Enter` / `Space` работают так же, как в List.
- Цвет не единственный индикатор выбранного значения: используется marker и фоновая заливка.

## ItemContent

Каноничная разметка содержимого элемента списка — option / caption / description с единым truncate-поведением.

`ItemContent` — каноничная разметка основного контента item'а: заголовок (`option`), мета справа (`caption`), подпись снизу (`description`). Используется как значение поля `item.content`, а также экспортируется отдельно для кастомного рендеринга внутри `contentRender`.

### Когда использовать

- Всегда, когда элемент списка можно описать как «заголовок + мета-подпись + короткое описание».
- Когда нужен одинаковый truncate-алгоритм во всех списках пакета.
- Когда `content` задаётся как объект в `items` — ровно это и есть `ItemContent` под капотом.

Когда **не** нужен:

- Совсем кастомный layout внутри item — передавайте в `content` свой `ReactNode`, но тогда единый visual-signal и truncate ложатся на вас.
- Элемент с одной иконкой без текста — передавайте `beforeContent` / `afterContent` и оставьте `content` пустым.

### Анатомия

#### Slots

- `option` *(required)* — заголовок item'а (имя файла, название валюты, email-адрес).
- `caption` — короткая мета справа (счётчик, дата, badge, shortcut).
- `description` — подпись под заголовком (хвост описания, короткая справка, секундный статус).

Вне `ItemContent`, но рядом (поля item'а):

- `beforeContent` — иконка / аватар слева.
- `afterContent` — слот справа: чеврон / trailing-иконка в иконочном квадрате; произвольный контент (счётчик, badge, tag) рендерится в натуральном размере без обрезки.
- `switch: true` — заменяет чекбокс/маркер на `Switch` справа; состояние тумблера берётся из `selection`. Для списков-настроек, где выбор = включение функции. `showSwitchIcon` зарезервирован под иконку тумблера.

#### Group variant

У групповых item'ов (`type: 'group'` / `'group-select'`) заголовок оформляется `ItemContent`-независимо, через `groupVariant`:

- `subtitle` — контрастный подзаголовок секции.
- `subtitleTertiary` *(default)* — приглушённый третичный текст.

#### Truncate

- Дефолт: `option` — 1 строка, `description` — 2 строки, вариант обрезки — `end` (многоточие в конце).
- Переопределяется через `truncate.option`, `truncate.description`, `truncate.variant` (`end` / `middle`).

### Примеры использования

99% случаев — `content` передаётся как объект, компонент сам строит `<ItemContent />` под капотом:

#### content как объект

item.content = { option, caption, description } — List оборачивает в ItemContent сам.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function BasicList() {
  return (
    <div className={styles.box}>
      <List
        size='s'
        items={[
          { id: 'inbox', content: { option: 'Входящие', caption: '12' } },
          { id: 'sent', content: { option: 'Отправленные' } },
          { id: 'archive', content: { option: 'Архив', caption: '238' } },
          { id: 'trash', content: { option: 'Корзина', description: 'Удаляется через 30 дней' } },
        ]}
      />
    </div>
  );
}
```

#### Слоты beforeContent / afterContent

Иконка слева, caption-счётчик справа от заголовка и trailing-иконка в afterContent.

```tsx
import { FileSVG, FolderSVG, StarSVG } from '@ds/icons';
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentSlots() {
  return (
    <div className={styles.box}>
      <List
        size='m'
        items={[
          {
            id: 'reports',
            beforeContent: <FolderSVG />,
            content: { option: 'Отчёты', caption: '24' },
            afterContent: <StarSVG />,
          },
          {
            id: 'invoice',
            beforeContent: <FileSVG />,
            content: { option: 'invoice-2024.pdf', caption: '1.2 МБ' },
          },
        ]}
      />
    </div>
  );
}
```

#### Заголовок, caption и description вместе

option + caption (мета справа) + description (подпись снизу) в одном item.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentDescription() {
  return (
    <div className={styles.box}>
      <List
        size='l'
        items={[
          {
            id: 'eu-west',
            content: {
              option: 'eu-west-1',
              caption: 'Доступно',
              description: 'Ирландия — основной регион размещения',
            },
          },
          {
            id: 'us-east',
            content: {
              option: 'us-east-1',
              caption: 'Деградация',
              description: 'Северная Виргиния — повышенная задержка отклика',
            },
          },
        ]}
      />
    </div>
  );
}
```

#### Обрезка текста (truncate)

truncate.option/description задают число строк, variant — место многоточия (end/middle). В узком контейнере длинный текст обрезается.

```tsx
import { List } from '@ds/list';

import styles from './styles.module.scss';

export function ItemContentTruncate() {
  return (
    <div className={styles.narrowBox}>
      <List
        size='m'
        items={[
          {
            id: 'truncated',
            content: {
              option: 'very-long-instance-name-that-overflows.example.internal',
              caption: '8',
              description:
                'Длинное описание ресурса, которое не помещается в одну строку и обрезается по заданному числу строк',
              truncate: { option: 1, description: 2, variant: 'middle' },
            },
          },
        ]}
      />
    </div>
  );
}
```

Если нужен кастомный слот (бейдж, превью, аватар) поверх стандартной разметки — используйте `contentRender` на `List`. Внутри возвращайте `<ItemContent {...props} />` плюс свои дополнения. Это сохраняет типографику и truncate.

### Props

**ItemContentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `caption` | `string` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `description` | `string` | — |  |
| `disabled` | `boolean` | — |  |
| `option` | `string \| number` | — |  |
| `truncate` | `TruncateProps` | — |  |

##### Related types

**TruncateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `number \| undefined` | — |  |
| `option` | `number \| undefined` | — |  |
| `variant` | `"end"` \| `"middle"` | — |  |

### Storybook

`ItemContent` живёт внутри `List`, отдельной истории нет — все сценарии видны в **List playground**.

### Доступность

- `option` остаётся текстовым заголовком — ассистивные технологии прочитают его как основное имя элемента.
- `caption` и `description` находятся в том же DOM-узле и читаются следом за заголовком.
- Визуальные truncate-поведения реализованы через CSS `-webkit-line-clamp`, текст не вырезается из DOM и остаётся доступен скринридеру целиком.
- Disabled-элементы получают уменьшенный контраст + `data-disabled`, но цвет не единственный сигнал: интерактивность выключается и на уровне родительского item'а.
