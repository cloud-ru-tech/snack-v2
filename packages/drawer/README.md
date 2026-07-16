# Drawer

`@ds/drawer` — Пакет выезжающих панелей — компоненты Drawer и DrawerCustom с едиными токенами позиции и ширины.

Пакет `@ds/drawer` предоставляет два компонента для боковых/нижних панелей: готовую сборку `Drawer` с пресетной шапкой, телом и футером и низкоуровневый `DrawerCustom` для ручной композиции.

- ****Drawer**** — готовая панель с шапкой, прокручиваемым телом и опциональным футером. Покрывает 90% сценариев.
- ****DrawerCustom**** — низкоуровневая версия без предопределённой структуры: собирайте из `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

## Установка

```bash
pnpm add @ds/drawer
```

```ts
import { Drawer, DrawerCustom, POSITION, WIDTH } from '@ds/drawer'
```

## Смотри также

- **Modal** — центрированное модальное окно для блокирующих подтверждений.
- **Popover** — всплывающий слой рядом с триггером.

## Drawer

Панель, выезжающая со стороны экрана — пресетная шапка, прокручиваемое тело и опциональный футер.

Панель, выезжающая со стороны экрана — для дополнительного контекста, фильтров, форм и пошаговых сценариев. `Drawer` собирает шапку (медиа, заголовок, подзаголовок, back-button, слот после заголовка), прокручиваемое тело и опциональный футер. Для ручной композиции используйте [`DrawerCustom`](./drawer-custom).

### Когда использовать
- Форма, фильтры или детали, которые не помещаются в основной поток и требуют отдельного контекста.
- Пошаговый сценарий с кнопкой «назад» в шапке — возвращение между экранами без потери контекста.
- Нижний лист (bottom sheet) для компактных действий и подтверждений на мобильных устройствах.
- Стек из двух-трёх связанных панелей через `nestedDrawer`.

Когда **не** нужен: критическое подтверждение, блокирующее остальной интерфейс (берите `Modal`), всплывающий поповер рядом с элементом (`Popover`), тост-уведомление (не блокирует UI).

### Примеры использования
#### Базовое использование

Контролируемое open/onClose, footer из `ButtonGroup`.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function Basic() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        onClose={close}
        title='Заголовок'
        subtitle='Короткое пояснение сценария'
        content='Основной контент тела. Сюда помещается форма, предупреждение или подробный текст.'
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </>
  );
}
```

#### Критическое действие

Critical primary, neutral outline secondary.

```tsx
import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function WithFooter() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Удалить…' appearance='critical' view='outline' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        onClose={close}
        title='Удалить запись'
        subtitle='Действие необратимо.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            primaryAction={{
              label: 'Удалить',
              appearance: 'critical',
              view: 'filled',
              onClick: close,
            }}
            secondaryAction={{
              label: 'Отмена',
              appearance: 'neutral',
              view: 'outline',
              onClick: close,
            }}
          />
        }
      />
    </>
  );
}
```

#### С медиа-слотом

`media` рендерится над шапкой на всю ширину панели.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function WithMedia() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть онбординг' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        width='m'
        onClose={close}
        media={
          <div
            style={{
              height: 200,
              background: 'linear-gradient(135deg, rgb(102 126 234), rgb(118 75 162))',
            }}
          />
        }
        title='Добро пожаловать'
        subtitle='Кратко о том, что изменилось в этой версии.'
        content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
      />
    </>
  );
}
```

#### Bottom sheet

`position="bottom"` + `heightAuto` — высота по контенту.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function HeightAuto() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть bottom sheet' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='bottom'
        heightAuto
        onClose={close}
        title='Bottom sheet'
        subtitle='Высота рассчитывается по контенту'
        content='Подходит для компактных подтверждений на мобильных устройствах.'
      />
    </>
  );
}
```

#### Вложенный Drawer

Родитель сдвигается влево при открытии дочернего.

```tsx
import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { useState } from 'react';

export function NestedDrawer() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  const closeAll = () => {
    setInnerOpen(false);
    setOuterOpen(false);
  };

  return (
    <>
      <Button label='Открыть родительский' appearance='primary' view='filled' onClick={() => setOuterOpen(true)} />
      <Drawer
        open={outerOpen}
        position='right'
        width='m'
        onClose={closeAll}
        title='Родительский Drawer'
        subtitle='При открытии вложенного — родитель сдвигается влево.'
        content={
          <Button label='Открыть вложенный' appearance='primary' view='outline' onClick={() => setInnerOpen(true)} />
        }
        nestedDrawer={
          <Drawer
            open={innerOpen}
            position='right'
            width='s'
            onClose={() => setInnerOpen(false)}
            title='Вложенный Drawer'
            subtitle='Кнопка «назад» возвращает к родителю'
            onBackButtonClick={() => setInnerOpen(false)}
            content='Вложенный Drawer рендерится через проп nestedDrawer родителя.'
          />
        }
      />
    </>
  );
}
```

### Props

**DrawerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `additionalButton` | `BottomSheetActionButton` | — | Дополнительная (третья) кнопка — пропсы `Button` (дефолт `view='simple'`, `appearance='neutral'`). |
| `approveButton` | `BottomSheetActionButton` | — | Основная кнопка действия — пропсы `Button` (дефолт `view='filled'`, `appearance='primary'`). |
| `cancelButton` | `BottomSheetActionButton` | — | Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`). |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс для элемента с контентом <br/> CSS-класс |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `content` | `ReactNode` | — | Содержимое body (альтернатива `children`). |
| `data-test-id` | `string` | — |  |
| `disclaimer` | `ReactNode` | — | Небольшой текст под кнопками футера (дисклеймер, ссылка и т.п.). |
| `footer` | `(ReactElement<any, string \| JSXElementConstructor<any>> & (string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<...> \| ReactPortal \| null))` | — | Футер <br/> Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton` / `disclaimer`. |
| `footerActionsOrientation` | `"horizontal"` \| `"vertical"` | `'horizontal'` | Ориентация кнопок футера. Применяется только при двух кнопках; игнорируется при заданном `footer`. |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" \| "bottom"`). |
| `media` | `ReactNode` | — | Медиа-контент |
| `nestedDrawer` | `DrawerProps` | — | Вложенный Drawer |
| `onBackButtonClick` | `(() => void)` | — | Callback клика на back-кнопку (слева в шапке). <br/> Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onSnapIndexChange` | `((snapIndex: number) => void)` | — | Callback изменения активного snap'а (пересечение swipe-границы или click по UI). <br/> Не вызывается при программной смене controlled `snapIndex`. |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `safeArea` | `boolean` | `true` | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `slotAfterHeadline` | `ReactNode` | — | Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). |
| `snapIndex` | `number` | — | Controlled-индекс активного snap'а. Если задан, sheet всегда находится на этом snap'е; <br/> swipe-up/down вызывают `onSnapIndexChange`, но не меняют позицию сами — consumer должен <br/> передать новое значение. |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `subtitle` | `ReactNode` | — | Slot под title-строкой во весь блок subtitleWrapper — <br/> типично `SearchBar`, `SegmentControl` или `Filter`. <br/> Подзаголовок под заголовком. |
| `swipeEnabled` | `boolean` | `true` | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `title` | `ReactNode` | — | Заголовок (Typography title-l). |
| `width` | `Width` | `'s'` | Ширина (только при position: "left" \| "right") |

##### Related types

**DrawerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `additionalButton` | `BottomSheetActionButton` | — | Дополнительная (третья) кнопка — пропсы `Button` (дефолт `view='simple'`, `appearance='neutral'`). |
| `approveButton` | `BottomSheetActionButton` | — | Основная кнопка действия — пропсы `Button` (дефолт `view='filled'`, `appearance='primary'`). |
| `cancelButton` | `BottomSheetActionButton` | — | Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`). |
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string \| undefined` | — | CSS-класс для элемента с контентом <br/> CSS-класс |
| `closeOnPopstate` | `boolean \| undefined` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement \| undefined` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Содержимое body (альтернатива `children`). |
| `data-test-id` | `string \| undefined` | — |  |
| `disclaimer` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Небольшой текст под кнопками футера (дисклеймер, ссылка и т.п.). |
| `footer` | `(ReactElement<any, string \| JSXElementConstructor<any>> & (string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null)) \| undefined` | — | Футер <br/> Произвольный футер. Приоритетнее `approveButton` / `cancelButton` / `additionalButton` / `disclaimer`. |
| `footerActionsOrientation` | `"horizontal"` \| `"vertical"` | — | Ориентация кнопок футера. Применяется только при двух кнопках; игнорируется при заданном `footer`. |
| `heightAuto` | `boolean \| undefined` | — | Высота панели по контенту (только при `position: "top" \| "bottom"`). |
| `media` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Медиа-контент |
| `nestedDrawer` | `DrawerProps` | — | Вложенный Drawer |
| `onBackButtonClick` | `(() => void) \| undefined` | — | Callback клика на back-кнопку (слева в шапке). <br/> Наличие callback'а авто-рендерит `Button view='function' icon={<ArrowLeftSVG />}`. |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `onSnapIndexChange` | `((snapIndex: number) => void) \| undefined` | — | Callback изменения активного snap'а (пересечение swipe-границы или click по UI). <br/> Не вызывается при программной смене controlled `snapIndex`. |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `rootClassName` | `string \| undefined` | — | CSS-класс для корневого элемента |
| `safeArea` | `boolean \| undefined` | — | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBlackout` | `boolean \| undefined` | — | Отображение темной подложки |
| `slotAfterHeadline` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Slot справа от title (например, `QuestionTooltip` из `@ds/tooltip`). |
| `snapIndex` | `number \| undefined` | — | Controlled-индекс активного snap'а. Если задан, sheet всегда находится на этом snap'е; <br/> swipe-up/down вызывают `onSnapIndexChange`, но не меняют позицию сами — consumer должен <br/> передать новое значение. |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `subtitle` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Slot под title-строкой во весь блок subtitleWrapper — <br/> типично `SearchBar`, `SegmentControl` или `Filter`. <br/> Подзаголовок под заголовком. |
| `swipeEnabled` | `boolean \| undefined` | — | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `title` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Заголовок (Typography title-l). |
| `width` | `Width` | — | Ширина (только при position: "left" \| "right") |

- `Position` = `"bottom"` \| `"left"` \| `"right"` \| `"top"`

- `Width` = `"l"` \| `"m"` \| `"s"`

### Адаптивность

`Drawer` — адаптивный компонент с переключением поверхности (surface-swap). Раскладку он берёт из `AdaptiveProvider` (контекст `@ds/adaptive`); публичный API единый для обеих платформ:

- **desktop** (по умолчанию) — панель, выезжающая со стороны экрана (`left`/`right`/`top`/`bottom`).
- **mobile** — контент рендерится в `BottomSheet` из `@ds/bottom-sheet` (панель снизу со свайпом для закрытия).

Верстайте под desktop и поставьте один `<AdaptiveProvider>` в корне приложения — mobile-поверхность включается автоматически (desktop-first). Пропа `layoutType` у компонента нет: источник раскладки — только контекст.

#### Как форсировать платформу

Форс — только контекстом, не пропом:

- Поддерево — вложенный провайдер:
  ```tsx
  import { AdaptiveProvider } from '@ds/adaptive'

  <AdaptiveProvider layoutType='mobile'>
    <Drawer open={open} onClose={close} content={…} />
  </AdaptiveProvider>
  ```
- Отдельный компонент — `withLayoutType` (module-scope, сахар над провайдером):
  ```tsx
  import { withLayoutType } from '@ds/adaptive'
  import { Drawer } from '@ds/drawer'

  const MobileDrawer = withLayoutType(Drawer, 'mobile')
  ```

#### Платформенные пропы

Часть пропов управляет геометрией desktop-панели и на mobile молча игнорируется (у `BottomSheet` своя поверхность снизу). Таблица синхронизирована с type-level JSDoc у `DrawerProps`.

| Пропы | desktop | mobile |
|-------|---------|--------|
| `position`, `width`, `heightAuto`, `nestedDrawer` | используется | игнорируется |
| `title`, `subtitle`, `slotAfterHeadline`, `onBackButtonClick`, `media`, `content`, `footer` | используется | используется |
| `open`, `onClose`, `showBlackout`, `container`, `closeOnPopstate`, `className`, `rootClassName` | используется | используется |

Подробнее о модели адаптивности — **Adaptive**.

## DrawerCustom

Низкоуровневая сборка Drawer — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`DrawerCustom` — низкоуровневая версия `Drawer`, которая не диктует структуру содержимого. Вы сами компонуете шапку, тело и футер из субкомпонентов `DrawerCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Используйте `DrawerCustom`, когда стандартной шапки из `Drawer` недостаточно — например, нужна своя раскладка заголовка с несколькими действиями, кастомный футер с группами кнопок или нестандартный порядок секций.

### Когда использовать

- Стандартная шапка / футер из `Drawer` не подходят — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одной панели.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `Drawer` — он дешевле в поддержке и даёт консистентные отступы.

### Анатомия

#### Position
Сторона, с которой выезжает панель: `right` — стандартный side-panel (по умолчанию), `left` — для навигации и фильтров, `top`/`bottom` — для уведомлений и bottom-sheets на мобильных.

#### Width
Предустановленная ширина панели для `position: left | right`: `s` — для узких форм и фильтров, `m` — дефолт, `l` — для сложных форм и просмотрщиков. Также принимает число или строку CSS для точного контроля.

### Примеры использования

#### Ручная композиция

Header + Body + Footer собираются вручную.

```tsx
import { Button } from '@ds/button';
import { DrawerCustom } from '@ds/drawer';
import { useState } from 'react';

export function CustomComposition() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button label='Открыть custom drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <DrawerCustom open={open} position='right' width='s' onClose={close}>
        <DrawerCustom.Header title='Ручная композиция' subtitle='Header + Body + Footer собираются вручную.' />
        <DrawerCustom.Body
          content={
            <div style={{ padding: 24 }}>
              <p>Тело Drawer собирается из произвольной разметки.</p>
              <p>Скролл включается автоматически при большом содержимом.</p>
            </div>
          }
        />
        <DrawerCustom.Footer>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button label='Закрыть' appearance='neutral' view='outline' onClick={close} />
            <Button label='Подтвердить' appearance='primary' view='filled' onClick={close} />
          </div>
        </DrawerCustom.Footer>
      </DrawerCustom>
    </>
  );
}
```

### Props

**DrawerCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `data-test-id` | `string` | — |  |
| `footer` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Футер |
| `heightAuto` | `boolean` | `false` | Высота панели по контенту (только при `position: "top" \| "bottom"`). |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `safeArea` | `boolean` | `true` | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `swipeEnabled` | `boolean` | `true` | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `width` | `Width` | `'s'` | Ширина (только при position: "left" \| "right") |

##### Related types

**DrawerCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string \| undefined` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean \| undefined` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement \| undefined` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `data-test-id` | `string \| undefined` | — |  |
| `footer` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Футер |
| `heightAuto` | `boolean \| undefined` | — | Высота панели по контенту (только при `position: "top" \| "bottom"`). |
| `nestedDrawer` | `DrawerCustomProps` | — | Вложенный Drawer |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | — | Расположение |
| `push` | `boolean \| PushConfig \| undefined` | — | Смещение при открытии "вложенного" компонента |
| `rootClassName` | `string \| undefined` | — | CSS-класс для корневого элемента |
| `safeArea` | `boolean \| undefined` | — | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBlackout` | `boolean \| undefined` | — | Отображение темной подложки |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `swipeEnabled` | `boolean \| undefined` | — | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `width` | `Width` | — | Ширина (только при position: "left" \| "right") |

- `Position` = `"bottom"` \| `"left"` \| `"right"` \| `"top"`

- `Width` = `"l"` \| `"m"` \| `"s"`
