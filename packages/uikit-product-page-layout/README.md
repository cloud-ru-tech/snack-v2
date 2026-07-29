# PageLayout

`@ds/uikit-product-page-layout` — Набор страничных раскладок продуктового кабинета — каталог, детальная страница сервиса, форма, дерево-навигация, сайдбар и общие слоты — с адаптацией desktop/mobile через AdaptiveProvider.

`@ds/uikit-product-page-layout` — набор страничных раскладок продуктового кабинета. Раскладки построены на общих слотах (`Headline`, `Actions`, сайдбар) и переключаются между desktop- и mobile-представлением автоматически по `AdaptiveProvider`.

## Когда использовать

- Страницы продуктового кабинета, которым нужна единая адаптивная раскладка шапки, действий и сайдбара.
- Одно и то же дерево разделов и набор действий нужны и на desktop, и на mobile без ручного дублирования вёрстки.

Когда **не** нужен пакет:

- Отдельная карточка или виджет внутри страницы:
  - используйте **`@ds/uikit-product-widget`** или **`@ds/card`**.
- Только панель действий без страничной обёртки:
  - соберите `Button` / kebab напрямую.

## Установка

```bash
pnpm add @ds/uikit-product-page-layout
```

```ts
import {
  PageCatalog,
  PageServices,
  PageForm,
  TreeNavigation,
  PageSidebar,
  Headline,
  DefaultSubtitle,
  PageLoading,
  TREE_NAVIGATION_MODE,
} from '@ds/uikit-product-page-layout'
```

## Смотри также

- **`@ds/uikit-product-widget`** — карточка-виджет внутри страницы.
- **`@ds/segment-control`** — переключатель вкладок в шапках.
- **`@ds/tree`** — дерево, на котором построен `TreeNavigation`.
- **`@ds/adaptive`** — провайдер раскладки desktop/mobile.
## Раскладки

- ****PageCatalog**** — список/каталог сервисов: заголовок, действия в шапке, контент.
- ****PageServices**** — детальная страница инстанса: селект раздела, заголовок со статусом, действия, контент.
- ****PageForm**** — форма создания/настройки: степпер, сайд-блок и sticky-футер с оценкой бюджета.
- ****TreeNavigation**** — раскладка с деревом разделов в режимах `popover` / `aside` / `fixed`.
- ****PageSidebar**** — сайдбар разделов с поиском, группами и сворачиванием.

Общие слоты, переиспользуемые внутри раскладок:

- ****Headline**** — строка заголовка: title, слоты до/после, действия, подзаголовок.
- ****DefaultSubtitle**** — подзаголовок «подпись + копируемое значение».
- ****PageLoading**** — заглушка-спиннер на время загрузки страницы.

## Адаптивность

`PageCatalog`, `PageServices` и `PageForm` — адаптивные: раскладку они берут из контекста `AdaptiveProvider` (`@ds/adaptive`), а не из пропа. Потребитель ставит один `<AdaptiveProvider>` в корне фичи — desktop работает по умолчанию, mobile подключается автоматически.

- На `mobile` рендерится отдельное представление: сайдбар сворачивается в селект, действия — одно видимое плюс kebab.
- Форс конкретной раскладки — `withLayoutType(Component, 'desktop')` или вложенный `<AdaptiveProvider layoutType='mobile'>`. Пропа `layoutType` у компонентов нет.

Подробности по каждому представлению — на страницах соответствующих раскладок.

## PageCatalog

Раскладка каталога сервисов — строка заголовка с действиями и контентная область. Адаптивная — на mobile действия схлопываются в «основное + kebab».

Раскладка каталога/списка сервисов: строка заголовка (`title`) с панелью действий (`actions`) и контентная область (`children`). Раскладку берёт из `AdaptiveProvider`.

### Когда использовать

- Список или каталог сервисов, ресурсов, проектов с действиями в шапке.
- Нужна одна и та же шапка с действиями на desktop и mobile без ручного дублирования.

### Анатомия

Заголовок (`title`) + панель действий (`actions`) + контент (`children`).

#### Действия

`actions` — массив `Action`. Каждый элемент — дискриминированный union по `variant`:

- `filled` / `outline` / `tonal` / `function` / `simple` — простая кнопка `@ds/button` с соответствующим `view`.
- `dropdown` / `kebab` / `droplist` / `quota` — составные кнопки из предопределённых обёрток.

Основное действие ставьте **первым** в массиве: на desktop (row-reverse) оно встаёт справа, на mobile — растягивается на доступную ширину.

#### Адаптивность

- `desktop` — действия выстроены в строку шапки.
- `mobile` — видимым остаётся первое (основное) действие, остальные уходят в kebab. Количество видимых регулируется `maxVisibleActionsItems`.

### Props

**PageCatalogProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionsProps` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | — |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `maxVisibleActionsItems` | `ActionsProps` | — |  |
| `title` | `string` | — | Заголовок страницы |

##### Related types

- `Action` = `{ tooltip?: TooltipProps; hidden?: boolean; } & (({ variant?: typeof BUTTON_TYPE.Filled; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Outline; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Tonal; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Function; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Simple; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Dropdown; } & { 'data-test-id'?: string; } & AriaAttributes & Omit<ButtonProps, "view" | "size" | "icon" | "iconPosition"> & { size?: "xs" | NonNullable<Size | undefined>; className?: string; open?: boolean; onOpenChange?: (open: boolean) => void; } & { triggerClassName?: string | undefined; closeOnPopstate?: boolean | undefined; placement?: Placement | undefined; items: Item[]; closeDroplistOnItemClick?: boolean | undefined; }) | ({ variant: typeof BUTTON_TYPE.Kebab; } & ButtonKebabProps) | ({ variant: typeof BUTTON_TYPE.Droplist; } & ButtonDroplistProps) | ({ variant: typeof BUTTON_TYPE.Quota; } & { 'data-test-id'?: string; } & AriaAttributes & QuotaWidgetPropsBase & { quotasUrl: string; onQuotasUrlClick?: () => void; buttonProps?: Pick<ButtonProps, "size" | "className" | "fullWidth" | "label" | "appearance" | "disabled" | "view">; }))`

**ActionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Action` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | — |  |
| `maxVisibleItems` | `number \| undefined` | — |  |

**ButtonDroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

## PageServices

Детальная страница инстанса — селект раздела, заголовок со статусом, действия и контент. Адаптивная — на mobile селект выносится наверх full-bleed-строкой.

Детальная страница инстанса: селект раздела (`sidebar`), заголовок (`title`) со статусом в `slotAfterTitle`, действия (`actions`) и контент (`children`). Раскладку берёт из `AdaptiveProvider`.

### Когда использовать

- Страница конкретного ресурса/инстанса с навигацией по разделам и заголовком-статусом.
- Нужен заголовок со статусом и панелью действий поверх адаптивной раскладки с боковым сайдбаром.

### Анатомия

- `sidebar` — селект/сайдбар разделов (пропсы **`PageSidebar`**).
- `title` — заголовок страницы (строка **`Headline`**).
- `slotBeforeTitle` / `slotAfterTitle` — слоты до/после заголовка; статус инстанса обычно кладут в `slotAfterTitle`.
- `actions` — панель действий справа от заголовка.
- `subtitle` — подзаголовок (например, **`DefaultSubtitle`** с ID ресурса).
- `children` — контент страницы.
- `autoHeight` — снять расчёт высоты по глобальному хост-контейнеру single-spa.
- `limitContentMaxWidth` — ограничить максимальную ширину контента.

#### Адаптивность

- `desktop` — сайдбар сбоку, заголовок и действия в строке шапки.
- `mobile` — селект раздела (`SidebarSelect`) выносится наверх как full-bleed-строка с разделителем снизу; ниже — заголовок со статусом, строка действий и контент с отступом.

### Props

**PageServicesProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionsProps` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | — |  |
| `autoHeight` | `boolean` | — |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `limitContentMaxWidth` | `boolean` | — |  |
| `maxVisibleActionsItems` | `ActionsProps` | — |  |
| `sidebar` | `PageSidebarProps` | — |  |
| `slotAfterTitle` | `ReactNode` | — | Слот после заголовка (например, статус) |
| `slotBeforeTitle` | `ReactNode` | — | Слот перед заголовком (например, кнопка «назад») |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |
| `truncateTitle` | `boolean` | — | Обрезать заголовок в одну строку с многоточием |

##### Related types

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**Documentation**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `onClick` | `MouseEventHandler \| undefined` | — |  |
| `target` | `HTMLAttributeAnchorTarget \| undefined` | — |  |

- `HeaderProps` = `{ type: typeof SIDEBAR_HEADER_TYPE.Title; label: string; icon: Icon; afterContent?: ReactNode; } | { type: typeof SIDEBAR_HEADER_TYPE.Back; label: string; href?: string; onClick?: MouseEventHandler; }`

**PageSidebarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — |  |
| `collapse` | `CollapseState` \| `ListProps` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `defaultOpen` | `boolean \| undefined` | — |  |
| `documentation` | `Documentation` | — | Зарезервировано, в текущей реализации не используется. |
| `footerItems` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `hasSearch` | `boolean \| undefined` | — |  |
| `header` | `HeaderProps` | — |  |
| `items` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `onOpenChanged` | `((open: boolean) => void) \| undefined` | — |  |
| `onSelect` | `((id: string \| number) => void) \| undefined` | — |  |
| `open` | `boolean \| undefined` | — |  |
| `pageContainerId` | `string \| undefined` | — | Зарезервировано, в текущей реализации не используется. |
| `selected` | `string \| number \| undefined` | — |  |

- `SidebarItem` = `SidebarItemWithHref | SidebarItemWithItems`

**SidebarItemBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `disabledReason` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `disabledReasonPlacement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `id` | `string \| number` | — |  |
| `label` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

## PageForm

Раскладка формы создания/настройки — степпер, контент, сайд-блок и sticky-футер с оценкой бюджета. Адаптивная.

Раскладка формы создания или настройки ресурса: заголовок, степпер (`stepper`), контент (`children`), сайд-блок (`sideBlock`) и sticky-футер с оценкой бюджета (`priceSummary`) и кнопками (`footer`). Раскладку берёт из `AdaptiveProvider`.

### Когда использовать

- Многошаговые формы создания/аренды/настройки ресурса со степпером и итоговой ценой.
- Нужен закреплённый футер с основной/вторичной кнопкой и сводкой бюджета.

### Анатомия

Тело PageForm на desktop — одна карточка формы фиксированной ширины по центру страницы; справа при переданных слотах встаёт липкая колонка sideItems (304px). Внутри карточки вертикальным стеком идут заголовок, степпер, контент шага и футер.

Боковая колонка отрисовывается только при переданных `priceSummary.content` / `sideBlock`; иначе карточка формы стоит одна по центру. На mobile раскладка одноколоночная: степпер sticky сверху, слоты — стопкой, футер sticky снизу.

Слоты:

- `title` / `subtitle` — заголовок формы и подзаголовок.
- `stepper` — степпер шагов; на mobile становится sticky сверху.
- `children` — контент текущего шага.
- `sideBlock` — массив блоков `{ label, content }` в боковой колонке (подсказки, сводка конфигурации).
- `priceSummary` — `{ total, content? }`: на desktop `content` идёт карточкой боковой колонки, на mobile — оценкой бюджета в футере.
- `footer` — кнопки футера (внизу карточки формы на desktop, sticky-футер на mobile). `stickyFooter` закрепляет его внизу при прокрутке длинной формы.

#### Кнопки футера

- `buttonPrimary` — основная кнопка. `variant` из набора (`continue`, `create`, `save`, `rent`, `send`, `restore`, `add`) задаёт локализованную подпись; `variant: 'custom'` требует свой `label`.
- `buttonSecondary` — вторичная кнопка (`cancel`, `back` или `custom`).
- `buttonAdditional` — дополнительная кнопка `@ds/button`.

Каждой кнопке можно передать `tooltip` (пропсы **`@ds/tooltip`**).

#### Адаптивность

- `desktop` — сайд-блок сбоку, футер с бюджетом и кнопками внизу.
- `mobile` — слот «ещё» (`moreActions`, kebab) прижимается к правому краю строки заголовка; степпер sticky сверху, футер с оценкой бюджета и кнопками — sticky снизу.

### Props

**PageFormProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `footer` | `ButtonPrimaryVariant` \| `ButtonProps` \| `ButtonSecondaryVariant` \| `TooltipProps` | — |  |
| `priceSummary` | `{ total: ReactNode; content?: ReactNode; }` | — |  |
| `sideBlock` | `{ label: string; content: ReactNode; }[]` | — |  |
| `stepper` | `ReactNode` | — |  |
| `stickyFooter` | `boolean` | — | Закрепляет футер внизу формы при прокрутке контента. |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |

##### Related types

- `ButtonPrimaryVariant` = `"add"` \| `"continue"` \| `"create"` \| `"rent"` \| `"restore"` \| `"save"` \| `"send"`

- `ButtonSecondaryVariant` = `"back"` \| `"cancel"`

## TreeNavigation

Раскладка с деревом разделов — шапка, дерево-меню и контент. Режимы popover / aside / fixed.

Раскладка с деревом разделов: шапка (`header`), дерево-меню (`menu`) на **`@ds/tree`** и контентная область (`content`). Способ показа дерева задаёт `mode`.

### Когда использовать

- Страница с иерархической навигацией по разделам (документация, настройки, дерево ресурсов).
- Нужно меню-дерево, которое можно держать сбоку, фиксировать или прятать в поповер.

### Анатомия

#### Mode (default `aside`)

- `popover` — дерево открывается в поповере под кнопкой-бургером.
- `aside` — дерево в боковой колонке, сворачиваемое.
- `fixed` — боковая колонка всегда раскрыта (Figma-состояние `treeMenu=fixed`).

#### Шапка (`header`)

`title` обязателен; опционально `icon`, `description`, `status` (пропсы **`@ds/status`**) и `actions`.

#### Меню (`menu`)

- `items` — данные дерева (`TreeNodeProps[]` из **`@ds/tree`**).
- `menuTitle` — заголовок меню.
- `selected` / `onSelect` — выбранный узел и колбэк выбора.
- `isMenuOpen` / `onMenuToggle` / `defaultMenuOpened` — управление раскрытием (в `popover`). В контролируемом режиме `onMenuToggle` обязателен.
- `enableShrinkMenuButton` — кнопка «Свернуть всё».
- `withDefaultOpenedMenuList` — раскрыть пункты меню по умолчанию.

#### Контент

- `content` — контентная часть страницы.
- `contentClassName` — класс контейнера контента.

### Props

**TreeNavigationProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Контентная часть страницы |
| `contentClassName` | `string` | — | Класс для контейнера контентной части |
| `header` | `StatusProps` | — |  |
| `menu` | `TreeNodeId` \| `TreeNodeProps` | — |  |
| `mode` | `"aside"` \| `"fixed"` \| `"popover"` | — | Вариант отображения |

##### Related types

- `TreeNavigationMode` = `"aside"` \| `"fixed"` \| `"popover"`

## PageSidebar

Сайдбар разделов страницы — список с группами и сворачиванием, опциональный поиск, шапка title/back и подвал.

Боковая навигация страницы: список разделов (`items`) с группами и сворачиванием, опциональный поиск, шапка (`header`) и подвал (`footerItems`). Используется самостоятельно и как слот `sidebar` в **`PageServices`**.

### Когда использовать

- Навигация по разделам внутри одной страницы продукта.
- Нужен сворачиваемый сайдбар с группировкой пунктов, поиском и шапкой «назад» / «заголовок».

### Анатомия

#### Элементы (`items`, `footerItems`)

`SidebarItem` — либо ссылка (`href`), либо узел с вложенностью (`items`). Базовые поля: `id`, `label`, `onClick`, `beforeContent` / `afterContent`, `disabledReason` (+ `disabledReasonPlacement`).

- `type` — `collapse` (по умолчанию, сворачиваемая группа) или `group`.
- `divider` — разделитель после узла.

#### Шапка (`header`)

- `type: 'title'` — заголовок с `label` и обязательной `icon`, опционально `afterContent`.
- `type: 'back'` — кнопка «назад» с `label`, `href` или `onClick`.

#### Состояние и поведение

- `open` / `defaultOpen` / `onOpenChanged` — раскрытие сайдбара (controlled / uncontrolled).
- `selected` / `onSelect` — выбранный пункт и колбэк.
- `hasSearch` — строка поиска по пунктам.
- `collapse` — поведение сворачивания (пропсы **`@ds/list`**).

### Props

**PageSidebarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `collapse` | `CollapseState` \| `ListProps` | — |  |
| `data-test-id` | `string` | — |  |
| `defaultOpen` | `boolean` | — |  |
| `documentation` | `Documentation` | — | Зарезервировано, в текущей реализации не используется. |
| `footerItems` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `hasSearch` | `boolean` | — |  |
| `header` | `HeaderProps` | — |  |
| `items` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `onOpenChanged` | `((open: boolean) => void)` | — |  |
| `onSelect` | `((id: string \| number) => void)` | — |  |
| `open` | `boolean` | — |  |
| `pageContainerId` | `string` | — | Зарезервировано, в текущей реализации не используется. |
| `selected` | `string \| number` | — |  |

##### Related types

**Documentation**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `onClick` | `MouseEventHandler \| undefined` | — |  |
| `target` | `HTMLAttributeAnchorTarget \| undefined` | — |  |

- `HeaderProps` = `{ type: typeof SIDEBAR_HEADER_TYPE.Title; label: string; icon: Icon; afterContent?: ReactNode; } | { type: typeof SIDEBAR_HEADER_TYPE.Back; label: string; href?: string; onClick?: MouseEventHandler; }`

- `SidebarItem` = `SidebarItemWithHref | SidebarItemWithItems`

**SidebarItemBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `disabledReason` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `disabledReasonPlacement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `id` | `string \| number` | — |  |
| `label` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

## Headline

Строка заголовка страницы — title, слоты до/после, действия и подзаголовок. Базовый слот, переиспользуемый раскладками.

Строка заголовка страницы: заголовок (`title`), слоты до/после, действия и подзаголовок. Базовый слот, на котором собраны шапки **`PageCatalog`**, **`PageServices`** и **`PageForm`**.

### Когда использовать

- Шапка раздела внутри собственной раскладки, когда готовые `Page*` не подходят.
- Нужна согласованная по DS строка «заголовок + статус + действия».

### Анатомия

- `title` — заголовок страницы.
- `slotBeforeTitle` — слот перед заголовком (например, кнопка «назад»).
- `slotAfterTitle` — слот после заголовка (например, статус).
- `actions` — действия справа от заголовка.
- `moreActions` — слот действий внутри строки заголовка (mobile-рендереры кладут сюда kebab / «ещё»).
- `subtitle` — подзаголовок под заголовком.
- `truncateTitle` — обрезать заголовок в одну строку с многоточием.

### Props

**HeadlineProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ReactNode` | — | Действия справа от заголовка |
| `data-test-id` | `string` | — |  |
| `moreActions` | `ReactNode` | — | Слот действий внутри строки заголовка (mobile-рендереры кладут сюда kebab/«ещё») |
| `slotAfterTitle` | `ReactNode` | — | Слот после заголовка (например, статус) |
| `slotBeforeTitle` | `ReactNode` | — | Слот перед заголовком (например, кнопка «назад») |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |
| `truncateTitle` | `boolean` | — | Обрезать заголовок в одну строку с многоточием |

## DefaultSubtitle

Подзаголовок страницы «подпись + копируемое значение» с опциональной тултип-подсказкой.

Подзаголовок страницы из подписи (`label`) и копируемого значения (`value`, пропсы **`CopyLine`**). Типичный слот `subtitle` для строки с ID ресурса.

### Когда использовать

- Подзаголовок детальной страницы с копируемым идентификатором (ID инстанса, ARN, адрес).
- Нужна пара «подпись — значение» с кнопкой копирования и опциональной подсказкой.

### Анатомия

- `label` — подпись слева.
- `value` — копируемое значение (пропсы `CopyLine` из **`@ds/uikit-product-copy`**).
- `labelTooltip` — тултип-подсказка рядом с подписью (рендерится через `QuestionTooltip`).

### Props

**DefaultSubtitleProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — |  |
| `label` | `string` | — | Подпись слева |
| `labelTooltip` | `ReactNode` | — | Тултип-подсказка рядом с подписью |
| `value` | `CopyLineProps` | — | Копируемое значение (пропсы CopyLine) |

## PageLoading

Заглушка-спиннер на всю область страницы на время загрузки данных раскладки.

Заглушка с центрированным спиннером на всю область страницы. Показывается, пока грузятся данные раскладки.

### Когда использовать

- Первичная загрузка страницы продукта, до того как готовы данные для `Page*`-раскладки.
- Нужен единый по DS лоадер во всю область контента вместо локальных спиннеров.

### Анатомия

- `className` — CSS-класс контейнера (например, чтобы задать высоту области).

Внутри — `Spinner` размера `m` из **`@ds/loader`**, центрированный по контейнеру.

### Props

**PageLoadingProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |

## ActionView

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"critical"` \| `"neutral"` \| `"primary"` | — | Вариант оформления |
| `as` | `"button"` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `button` | `Omit<ButtonProps, "label" \| "icon" \| "view"> \| (Omit<ButtonProps, "appearance" \| "view"> & { buttonType?: "filled"; }) \| (Omit<...> & { ...; })` | — |  |
| `buttonProps` | `Pick<ButtonProps, "label" \| "appearance" \| "size" \| "disabled" \| "fullWidth" \| "className" \| "view">` | — | Свойства кнопки открытия виджета |
| `canEditQuota` | `boolean` | — | Флаг наличия прав на редактирование квот |
| `className` | `string` | — | Дополнительный класс <br/> Класс триггерной кнопки. |
| `closeDroplistOnItemClick` | `boolean` | `false` | Закрывать выпадающий список после клика на базовый айтем. <br/> Работает в режимах selection: 'none' \| 'single' |
| `closeOnPopstate` | `boolean` | — | Закрывать ли поповер при переходе по истории браузера |
| `commonProps` | `CommonProps` | — |  |
| `counter` | `Omit<CounterProps, "appearance" \| "size">` | — | Пропсы для counter |
| `data-test-id` | `string` | — |  |
| `disableSorting` | `boolean` | — | Флаг отключения сортировки квот |
| `disabled` | `boolean` | — | Отключена |
| `error` | `boolean` | — | Флаг ошибки при загрузке квот |
| `fullWidth` | `boolean` | — | На всю ширину |
| `hidden` | `boolean` | `false` |  |
| `hideIncreaseQuotaButton` | `boolean` | — | Флаг скрытия кнопки увеличения квоты |
| `icon` | `ReactNode` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно текста |
| `innerRef` | `((instance: HTMLButtonElement \| null) => void) \| RefObject<HTMLButtonElement> \| null` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `items` | `Item[]` | — | Основные элементы списка |
| `label` | `string` | — | Текст кнопки |
| `list` | `Pick<DroplistProps, "className" \| "open" \| "onOpenChange" \| "items" \| "closeDroplistOnItemClick">` | — |  |
| `loading` | `boolean` | — | Состояние загрузки <br/> Флаг загрузки квот |
| `minWidth` | `boolean` | — | Минимальная ширина контейнера (`min-width` из токена размера). По умолчанию `true`. <br/> `false` — кнопка сжимается по контенту вместо фиксированного минимума. |
| `onIncreaseQuotaClick` | `(() => void)` | — | Колбек нажатия на кнопку увеличения квот |
| `onOpenChange` | `((open: boolean) => void)` | — | Колбэк изменения раскрытия. |
| `onQuotasUrlClick` | `(() => void)` | — | Колбек клика по ссылке на страницу квот по проекту |
| `onRefresh` | `() => void` | — | Колбек на обновление списка квот при ошибке |
| `onWidgetOpen` | `(() => void)` | — | Колбек открытия виджета квот |
| `open` | `boolean` | — | Контролируемое состояние раскрытия. |
| `placement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | `top` | Положение поповера относительно своего триггера (children). |
| `projectName` | `string` | — | Название проекта, по которому отображаются квоты |
| `quotas` | `QuotaItem[]` | — | Список квот для отображения |
| `quotasUrl` | `string` | — | Ссылка на страницу квот по проекту |
| `size` | `"l"` \| `"m"` \| `"s"` \| `"xs"` | — | Размер <br/> Размер триггера; для `xs` применяется кнопка `s`. |
| `tooltip` | `TooltipProps` | — |  |
| `triggerClassName` | `string` | — | CSS-класс триггера |
| `variant` | `"dropdown"` \| `"droplist"` \| `"filled"` \| `"function"` \| `"kebab"` \| `"outline"` \| `"quota"` \| `"simple"` \| `"tonal"` | — |  |
| `view` | `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"` | — | Вариант кнопки (Figma: filled, outline, function, simple, elevated) |

## ButtonDroplist

### Props `ButtonDroplistProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

## ButtonKebab

### Props `ButtonKebabProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

## ButtonQuota

### Props `ButtonQuotaProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonProps` | `ButtonProps` | — | Свойства кнопки открытия виджета |
| `canEditQuota` | `boolean` | — | Флаг наличия прав на редактирование квот |
| `data-test-id` | `string` | — |  |
| `disableSorting` | `boolean` | — | Флаг отключения сортировки квот |
| `error` | `boolean` | — | Флаг ошибки при загрузке квот |
| `hideIncreaseQuotaButton` | `boolean` | — | Флаг скрытия кнопки увеличения квоты |
| `loading` | `boolean` | — | Флаг загрузки квот |
| `onIncreaseQuotaClick` | `(() => void)` | — | Колбек нажатия на кнопку увеличения квот |
| `onQuotasUrlClick` | `(() => void)` | — | Колбек клика по ссылке на страницу квот по проекту |
| `onRefresh` | `() => void` | — | Колбек на обновление списка квот при ошибке |
| `onWidgetOpen` | `(() => void)` | — | Колбек открытия виджета квот |
| `projectName` | `string` | — | Название проекта, по которому отображаются квоты |
| `quotas` | `QuotaItem` | — | Список квот для отображения |
| `quotasUrl` | `string` | — | Ссылка на страницу квот по проекту |

## ConditionalPopover

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — |  |
| `onOpenChange` | `(value: boolean) => void` | — |  |
| `tip` | `ReactNode` | — |  |
| `withPopover` | `boolean` | — |  |

## DesktopActions

### Props `Pick`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Action[]` | — |  |

## DesktopPageCatalog

### Props `DesktopPageCatalogProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ReactNode` | — | Действия справа от заголовка |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок страницы |

## DesktopPageForm

### Props `DesktopPageFormProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `footer` | `ButtonPrimaryVariant` \| `ButtonProps` \| `ButtonSecondaryVariant` \| `TooltipProps` | — |  |
| `priceSummary` | `{ total: ReactNode; content?: ReactNode; }` | — |  |
| `sideBlock` | `{ label: string; content: ReactNode; }[]` | — |  |
| `stepper` | `ReactNode` | — |  |
| `stickyFooter` | `boolean` | — | Закрепляет футер внизу формы при прокрутке контента. |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |

#### Related types

- `ButtonPrimaryVariant` = `"add"` \| `"continue"` \| `"create"` \| `"rent"` \| `"restore"` \| `"save"` \| `"send"`

- `ButtonSecondaryVariant` = `"back"` \| `"cancel"`

## DesktopPageServices

### Props `DesktopPageServicesProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ReactNode` | — | Действия справа от заголовка |
| `autoHeight` | `boolean` | — |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `limitContentMaxWidth` | `boolean` | — |  |
| `sidebar` | `PageSidebarProps` | — |  |
| `slotAfterTitle` | `ReactNode` | — | Слот после заголовка (например, статус) |
| `slotBeforeTitle` | `ReactNode` | — | Слот перед заголовком (например, кнопка «назад») |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |
| `truncateTitle` | `boolean` | — | Обрезать заголовок в одну строку с многоточием |

#### Related types

**Documentation**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — |  |
| `onClick` | `MouseEventHandler \| undefined` | — |  |
| `target` | `HTMLAttributeAnchorTarget \| undefined` | — |  |

- `HeaderProps` = `{ type: typeof SIDEBAR_HEADER_TYPE.Title; label: string; icon: Icon; afterContent?: ReactNode; } | { type: typeof SIDEBAR_HEADER_TYPE.Back; label: string; href?: string; onClick?: MouseEventHandler; }`

**PageSidebarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — |  |
| `collapse` | `CollapseState` \| `ListProps` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `defaultOpen` | `boolean \| undefined` | — |  |
| `documentation` | `Documentation` | — | Зарезервировано, в текущей реализации не используется. |
| `footerItems` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `hasSearch` | `boolean \| undefined` | — |  |
| `header` | `HeaderProps` | — |  |
| `items` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `onOpenChanged` | `((open: boolean) => void) \| undefined` | — |  |
| `onSelect` | `((id: string \| number) => void) \| undefined` | — |  |
| `open` | `boolean \| undefined` | — |  |
| `pageContainerId` | `string \| undefined` | — | Зарезервировано, в текущей реализации не используется. |
| `selected` | `string \| number \| undefined` | — |  |

- `SidebarItem` = `SidebarItemWithHref | SidebarItemWithItems`

**SidebarItemBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `disabledReason` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `disabledReasonPlacement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `id` | `string \| number` | — |  |
| `label` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

## Menu

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableShrinkMenuButton` | `boolean` | `true` |  |
| `menuItems` | `TreeNodeProps[]` | — |  |
| `menuTitle` | `string` | — |  |
| `onSelect` | `((selectedKey: string, node: TreeNodeProps) => void)` | — |  |
| `selected` | `string` | — |  |
| `withDefaultOpenedMenuList` | `boolean` | — |  |

## MobileActions

### Props `ActionsProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideDelete` | `boolean \| undefined` | — |  |
| `hideDownload` | `boolean \| undefined` | — |  |
| `hideRetry` | `boolean \| undefined` | — |  |
| `items` | `Action[]` | — |  |
| `maxVisibleItems` | `number` | — |  |

## MobilePageCatalog

### Props `MobilePageCatalogProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionsProps` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | `[]` |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `maxVisibleActionsItems` | `ActionsProps` | — |  |
| `title` | `string` | — | Заголовок страницы |

#### Related types

- `Action` = `{ tooltip?: TooltipProps; hidden?: boolean; } & (({ variant?: typeof BUTTON_TYPE.Filled; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Outline; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Tonal; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Function; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Simple; } & { 'data-test-id'?: string; } & AriaAttributes & { label?: string; icon?: ReactNode; iconPosition?: IconPosition; appearance?: Appearance; size?: Size; disabled?: boolean; loading?: boolean; fullWidth?: boolean; minWidth?: boolean; className?: string; view?: View; counter?: Omit<CounterProps, "size" | "appearance">; } & { as?: "button" | undefined; innerRef?: ((instance: HTMLButtonElement | null) => void | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) | RefObject<HTMLButtonElement> | null | undefined; } & Omit<Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">, "data-test-id" | keyof AriaAttributes | "className" | "view" | "label" | "ref" | "disabled" | "size" | "icon" | "loading" | "as" | "iconPosition" | "appearance" | "fullWidth" | "minWidth" | "counter">) | ({ variant: typeof BUTTON_TYPE.Dropdown; } & { 'data-test-id'?: string; } & AriaAttributes & Omit<ButtonProps, "view" | "size" | "icon" | "iconPosition"> & { size?: "xs" | NonNullable<Size | undefined>; className?: string; open?: boolean; onOpenChange?: (open: boolean) => void; } & { triggerClassName?: string | undefined; closeOnPopstate?: boolean | undefined; placement?: Placement | undefined; items: Item[]; closeDroplistOnItemClick?: boolean | undefined; }) | ({ variant: typeof BUTTON_TYPE.Kebab; } & ButtonKebabProps) | ({ variant: typeof BUTTON_TYPE.Droplist; } & ButtonDroplistProps) | ({ variant: typeof BUTTON_TYPE.Quota; } & { 'data-test-id'?: string; } & AriaAttributes & QuotaWidgetPropsBase & { quotasUrl: string; onQuotasUrlClick?: () => void; buttonProps?: Pick<ButtonProps, "size" | "className" | "fullWidth" | "label" | "appearance" | "disabled" | "view">; }))`

**ActionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Action` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | — |  |
| `maxVisibleItems` | `number \| undefined` | — |  |

**ButtonDroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

## MobilePageForm

### Props `DesktopPageFormProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `footer` | `ButtonPrimaryVariant` \| `ButtonProps` \| `ButtonSecondaryVariant` \| `TooltipProps` | — |  |
| `priceSummary` | `{ total: ReactNode; content?: ReactNode; }` | — |  |
| `sideBlock` | `{ label: string; content: ReactNode; }[]` | — |  |
| `stepper` | `ReactNode` | — |  |
| `stickyFooter` | `boolean` | — | Закрепляет футер внизу формы при прокрутке контента. |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |

#### Related types

- `ButtonPrimaryVariant` = `"add"` \| `"continue"` \| `"create"` \| `"rent"` \| `"restore"` \| `"save"` \| `"send"`

- `ButtonSecondaryVariant` = `"back"` \| `"cancel"`

## MobilePageServices

### Props `MobilePageServicesProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionsProps` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `QuotaWidgetPropsBase` | `[]` |  |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — |  |
| `data-test-id` | `string` | — |  |
| `maxVisibleActionsItems` | `ActionsProps` | — |  |
| `sidebar` | `SidebarSelectProps` | — |  |
| `slotAfterTitle` | `ReactNode` | — | Слот после заголовка (например, статус) |
| `slotBeforeTitle` | `ReactNode` | — | Слот перед заголовком (например, кнопка «назад») |
| `subtitle` | `ReactNode` | — | Подзаголовок под заголовком |
| `title` | `string` | — | Заголовок страницы |

#### Related types

**ButtonDroplistProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

**ButtonKebabProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `button` | `ButtonProps` | — |  |
| `list` | `DroplistListProps` \| `DroplistMobileSlots` \| `DroplistProps` \| `EmptyState` \| `PublicListContextType` \| `ScrollProps` \| `SelectionState` | — |  |

- `SidebarItem` = `SidebarItemWithHref | SidebarItemWithItems`

**SidebarItemBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `disabledReason` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `disabledReasonPlacement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `id` | `string \| number` | — |  |
| `label` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

**SidebarSelectProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string \| undefined` | — |  |
| `collapse` | `CollapseState` \| `DroplistProps` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `footerItems` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `hasSearch` | `boolean \| undefined` | — |  |
| `items` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `onSelect` | `((id: string \| number) => void) \| undefined` | — |  |
| `selected` | `string \| number \| undefined` | — |  |

## SearchContextProvider

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## SidebarSelect

### Props `SidebarSelectProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — |  |
| `collapse` | `CollapseState` \| `DroplistProps` | — |  |
| `data-test-id` | `string` | — |  |
| `footerItems` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `hasSearch` | `boolean` | — |  |
| `items` | `SidebarItem` \| `SidebarItemBase` | — |  |
| `onSelect` | `((id: string \| number) => void)` | — |  |
| `selected` | `string \| number` | — |  |

#### Related types

- `SidebarItem` = `SidebarItemWithHref | SidebarItemWithItems`

**SidebarItemBase**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `beforeContent` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `data-test-id` | `string \| undefined` | — |  |
| `disabledReason` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `disabledReasonPlacement` | `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — |  |
| `id` | `string \| number` | — |  |
| `label` | `string` | — |  |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — |  |

## SidebarTitle

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterContent` | `ReactNode` | — |  |
| `className` | `string` | — |  |
| `icon` | `JSXElementConstructor<{ size?: number \| undefined; className?: string \| undefined; }>` | — |  |
| `title` | `string` | — |  |

## useButtonWithTooltip

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `TooltipProps` | — |  |
| `view` | `"elevated"` \| `"filled"` \| `"function"` \| `"outline"` \| `"simple"` \| `"tonal"` | — |  |

## useSearchFilter

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## useStickyFooterShadow

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
