# popup-private

`@ds/popup-private` — 

## FooterActions

### Props `FooterActionsProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionsClassName` | `string` | — | Доп. CSS-класс на `ButtonGroup` (поверх встроенной раскладки по числу действий). |
| `additionalButton` | `BottomSheetActionButton` | — | Дополнительная (третья) кнопка (по умолчанию `view='simple'`, `appearance='neutral'`). |
| `approveButton` | `BottomSheetActionButton` | — | Основная кнопка (по умолчанию `view='filled'`, `appearance='primary'`). |
| `cancelButton` | `BottomSheetActionButton` | — | Кнопка отмены (по умолчанию `view='outline'`, `appearance='neutral'`). |
| `footerActionsOrientation` | `"horizontal"` \| `"vertical"` | `horizontal` | Ориентация кнопок при ровно двух действиях. |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер кнопок футера. Задаётся на уровне группы (как в `ButtonGroup`), не по кнопке — <br/> в макетах все действия футера одного размера. Нужен потребителям с собственной осью <br/> размера (календарные дропдауны: 24 / 32 / 40 при s / m / l). У modal, drawer и <br/> bottom-sheet своей оси нет, но кит рисует их футеры на `l` — эти поверхности <br/> передают `size='l'` явно. |
| `surface` | `"bottomSheet"` \| `"window"` | `window` | Поверхность overlay'я — определяет раскладку кнопок: <br/> - `window` (desktop, дефолт): 1–2 кнопки компактно вправо, 3 — стопка (primary сверху). <br/> - `bottomSheet` (mobile): 1 → вправо, 2 → space-between, 3 → стопка с инверсией (primary внизу). |
| `testIds` | `FooterActionsTestIds` | — | Идентификаторы слотов конкретного компонента (`bottom-sheet` / `modal` / `drawer`). |

#### Related types

- `BottomSheetActionButton` = `Omit<ButtonProps<"button">, "size" | "fullWidth"> | Omit<ButtonProps<"a">, "size" | "fullWidth">`

- `FooterActionsOrientation` = `"horizontal"` \| `"vertical"`

**FooterActionsTestIds**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `additional` | `string` | — |  |
| `approve` | `string` | — |  |
| `cancel` | `string` | — |  |

- `SurfaceTokenSegment` = `"bottomSheet"` \| `"window"`

## OVERLAY_SURFACE

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## OverlaySurfaceProvider

### Props `OverlaySurfaceProviderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bodyHeightAuto` | `boolean` | `false` | Только drawer: высота панели по контенту → `Body` (drawer-ветка) добавляет соответствующий класс. |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `surface` | `"drawer"` \| `"modal"` \| `"sheet"` | — | Поверхность, в которой рендерятся дочерние слоты. |

#### Related types

- `OverlaySurface` = `"drawer"` \| `"modal"` \| `"sheet"`

## PopupBody

### Props `PopupBodyProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bodyPadding` | `boolean` | `true` | Горизонтальные паддинги body. При `false` контент идёт во всю ширину sheet'а (edge-to-edge) — <br/> для карт, изображений, списков без отступов. Соответствует Figma-оси `padding=false`. |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс контейнера body. |
| `content` | `ReactNode` | — | Содержимое body (альтернатива `children`). |
| `data-test-id` | `string` | — |  |
| `innerRef` | `Ref<HTMLElement>` | — | Ссылка на скроллируемый контейнер body. |

## PopupCloseButton

### Props `PopupCloseButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string \| undefined` | — | Defines a string value that labels the current element. <br/> Доступное имя кнопки. По умолчанию `close popup`. |
| `className` | `string` | — | CSS-класс. |
| `data-test-id` | `string` | — |  |
| `onClick` | `() => void` | — | Действие при клике. |

## PopupFooter

### Props `PopupFooterProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс контейнера footer'а. |
| `data-test-id` | `string` | — |  |

## PopupHeader

### Props `PopupHeaderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionButton` | `ReactNode` | — | Slot справа от headline-строки (любой `ReactNode`, обычно `Button` с иконкой). |
| `className` | `string` | — | CSS-класс контейнера header'а. |
| `data-test-id` | `string` | — |  |
| `onBackButtonClick` | `(() => void)` | — | Callback клика на back-кнопку (слева в шапке). <br/> Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`. |
| `slotAfterTitle` | `ReactNode` | — | Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). |
| `slotSecondTitle` | `ReactNode` | — | Slot под подзаголовком — типично `SearchBar`, `SegmentControl` или `Filter`. <br/> Рендерится на обеих поверхностях: `secondWrapper` в мастере `bottomSheet`, <br/> `subHeadlineWrapper` в мастере `window` (modal / drawer). |
| `subtitle` | `ReactNode` | — | Текстовая строка-подзаголовок под title (Figma `subtitleWrapper`). Рендерится на всех поверхностях. |
| `testIds` | `PopupHeaderTestIds` | — | Переопределение `data-test-id` слотов шапки. Каждый пропущенный ключ берётся из `TEST_IDS`. <br/> Потребитель-обёртка (drawer/modal) прокидывает сюда свои id, чтобы сохранить публичный контракт. |
| `title` | `ReactNode` | — | Заголовок. Типографика зависит от поверхности: `title-l` на sheet, `headline-s` на window (modal/drawer). |
| `titleId` | `string` | — | `id` заголовка — для связи с `aria-labelledby` dialog'а (accessible name). |
| `truncate` | `{ title?: number; subtitle?: number; } \| undefined` | — | Усечение строковых `title`/`subtitle` через `TruncateString` (число строк). Применяется только <br/> когда задано — по умолчанию текст не усекается. Актуально для window-поверхности (modal/drawer), <br/> где длинный заголовок иначе переносится на несколько строк. |

#### Related types

**PopupHeaderTestIds**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionButton` | `string \| undefined` | — |  |
| `backButton` | `string \| undefined` | — |  |
| `header` | `string \| undefined` | — |  |
| `slotAfterTitle` | `string \| undefined` | — |  |
| `slotSecondTitle` | `string \| undefined` | — |  |
| `subtitle` | `string \| undefined` | — |  |
| `title` | `string \| undefined` | — |  |

## PopupMedia

### Props `MediaProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alt` | `string` | — | Альтернативный текст (a11y). |
| `className` | `string` | — |  |
| `kind` | `"icon"` \| `"image"` | `image` | Режим: <br/> - `'image'` — изображение во всю ширину (высота `184px`), прижато к шапке (убирается <br/> верхний отступ контент-блока). Горизонтальные паддинги body не затрагивает — для edge-to-edge body <br/> используйте `bodyPadding={false}` отдельно. <br/> - `'icon'` — иконка с `padding-top: 24px`. |
| `src` | `string` | — | URL изображения / иконки. |

#### Related types

- `MediaKind` = `"icon"` \| `"image"`

## SURFACE_TOKEN_SEGMENT

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## useOverlayBodyHeightAuto

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## useOverlaySurface

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|

## useSurfaceTokenSegment

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
