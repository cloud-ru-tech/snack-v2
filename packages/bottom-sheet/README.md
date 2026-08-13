# BottomSheet

`@ds/bottom-sheet` — Mobile-first overlay-контейнер с drag-handle и swipe-down для диалогов, выпадающих списков и фильтров. Поддерживает snap-points (раскрытие на половину → full).

Mobile-first bottom-sheet — overlay-контейнер, выезжающий снизу. Используется как базовый layer для диалогов, выпадающих списков, фильтров и любых полу-полно-экранных UI на мобильных устройствах.

## Когда использовать

- Полу-полно-экранный диалог на мобильном устройстве.
- Action-sheet («Выбрать действие»: фото, удалить, отменить).
- Multi-step flow с back-кнопкой в шапке.
- Контейнер для выпадающего списка / фильтров на мобильном.

## Анатомия

### Handle
Drag-индикатор 32×4px сверху — визуальная подсказка для swipe-down. Показывается, когда включён свайп; при `swipeEnabled={false}` его нет (нет жеста — нет намёка на него).

### Backdrop (default `showBackdrop=true`)
Полупрозрачная подложка. Click по backdrop'у вызывает `onClose`. При `showBackdrop={false}` фон не затемняется и click-outside не закрывает sheet.

### Non-modal (default `lockScroll=true`)
По умолчанию sheet — модальный: фон затемнён и заблокирован для скролла. Для non-modal сценария (sheet поверх контента, с которым продолжают работать) передайте `lockScroll={false}` (страница под sheet'ом скроллится) — обычно вместе с `showBackdrop={false}`.

### Header
- `title` — заголовок.
- `slotAfterTitle` — slot справа от title (QuestionTooltip, badge).
- `onBackButtonClick` — авто-рендерит back-кнопку слева.
- `actionButton` — кастомный slot справа.
- `subtitle` — текстовая строка-подзаголовок под title.
- `slotSecondTitle` — slot под подзаголовком (SearchBar / SegmentControl).

### Media
- `kind='image'` — full-bleed image, min-height 184px; прижато к шапке (убирает верхний отступ контент-блока). Горизонтальные паддинги body не меняются — для edge-to-edge body передайте `bodyPadding={false}`.
- `kind='icon'` — иконка с `padding-top: 24px`.
- Произвольный `ReactNode` — если нужен свой media-блок (видео, карта, кастомная разметка).

### Body padding (default `bodyPadding=true`)
Горизонтальные паддинги тела. При `bodyPadding={false}` контент идёт во всю ширину (edge-to-edge) —
для карт, изображений, списков без отступов. Соответствует Figma-оси `padding=false`.

### Footer actions (default orientation `horizontal`)
Высокоуровневый footer собирается из объектов пропсов `Button` — кнопки рендерятся через `ButtonGroup`:

- `approveButton` — основное действие (по умолчанию `view='filled'`, `appearance='primary'`).
- `cancelButton` — отмена (по умолчанию `view='outline'`, `appearance='neutral'`).
- `additionalButton` — третье действие (по умолчанию `view='simple'`, `appearance='neutral'`).
- `disclaimer` — мелкий центрированный текст под кнопками.

`footerActionsOrientation` управляет раскладкой **пары** cancel/confirm:

- `'horizontal'` — ряд через space-between (secondary слева, primary справа), ширина по контенту.
  Дефолт — точное соответствие Figma `bottomBar.buttonGroup`.
- `'vertical'` — кнопки в столбик, full-width.

Одна кнопка всегда рендерится full-width (одиночный CTA); три кнопки не помещаются в ряд на
mobile-вьюпорте и всегда идут в столбик.

Для произвольной разметки — `footer: ReactNode` (имеет приоритет над `approveButton` / `cancelButton`
/ `additionalButton` / `disclaimer`).

### Dividers (default `withDividers=true`)
Тонкие линии между topBar↔body и body↔footer. Разграничивают закреплённые шапку и подвал от
прокручиваемого под ними содержимого. Передайте `withDividers={false}`, чтобы убрать обе линии.

### SafeArea (default `safeArea=true`)
Блоки сверху/снизу, резервирующие место под iOS notch / home-indicator и Android nav-bar через
`env(safe-area-inset-*)` (с 32px-фолбэком для embedded webview, который не отдаёт inset'ы). Figma-артборд
эти блоки скрывает; на реальном устройстве они нужны, чтобы футер не уходил под home-indicator. Передайте
`safeArea={false}`, если рамку safe-area обеспечивает окружение (например, нативная оболочка webview).

### Snap points (default `undefined` → height auto)
По дефолту sheet `height: auto` (один snap по высоте контента). Когда задан `snapPoints`-массив, sheet поддерживает несколько фиксированных позиций (iOS-detents-аналог):

```tsx
<BottomSheet
  open={open}
  onClose={onClose}
  snapPoints={[0.5, 1]}
  defaultSnapIndex={0}
  title='Меню'
  content={<List />}
/>
```

**Формат** — `number ∈ (0, 1] | 'Npx' | 'N%' | 'Ndvh' | 'Nsvh' | 'Nlvh' | 'fit-content'`. Порядок массива — от меньшей позиции к большей. Drag вверх → следующий snap; drag вниз ниже первого snap'а — закрытие.

- **Controlled snap** — задайте `snapIndex` + `onSnapIndexChange`. В этом режиме swipe вызывает `onSnapIndexChange`, но позицию не двигает: потребитель сам передаёт новое значение обратно.
- **`swipeEnabled` (default `true`)** — `false` отключает swipe-жесты; переключить snap можно только программно через `snapIndex`.
- **`closeOnPopstate` (default `true`)** — закрытие по browser-back (`popstate`). Полезно на mobile, чтобы аппаратная кнопка «назад» закрывала sheet вместо ухода со страницы.

## Установка

```bash
pnpm add @ds/bottom-sheet
```

```ts
import { BottomSheet, BottomSheetCustom, TEST_IDS } from '@ds/bottom-sheet'
```

## Примеры использования

### Базовый сценарий

title + content + одиночная full-width кнопка

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть BottomSheet' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Bottom-sheet headline'
        content={
          <p>
            Bottom-sheet — мобильный overlay-контейнер, выезжающий снизу. Используйте его как базовый layer для
            диалогов, выпадающих списков, фильтров и любых полу-полно-экранных UI.
          </p>
        }
        approveButton={{ label: 'Подтвердить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Кнопки футера + дисклеймер

approve + cancel + additional + disclaimer — три действия собираются в вертикальный full-width ButtonGroup

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function FooterActions() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Удалить ресурс' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Удалить ресурс?'
        content={<p>Действие необратимо. Все связанные данные будут удалены без возможности восстановления.</p>}
        // Три действия: не помещаются в ряд на mobile-вьюпорте, поэтому собираются
        // в вертикальный full-width ButtonGroup (primary сверху). Для пары cancel/confirm футер
        // по умолчанию горизонтальный (space-between) — управляется `footerActionsOrientation`.
        approveButton={{ label: 'Удалить', appearance: 'critical', onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
        additionalButton={{ label: 'Подробнее', onClick: () => undefined }}
      />
    </MobilePreview>
  );
}
```

### С media-блоком

kind=image — full-bleed картинка над контентом

```tsx
import { BottomSheet, MEDIA_KIND } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function WithMedia() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть с media' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Bottom-sheet with media'
        media={{
          src: 'https://placehold.co/360x184?text=Media',
          alt: 'Media',
          kind: MEDIA_KIND.Image,
        }}
        content={<p>Media-блок full-bleed, прижат к шапке. bodyPadding управляет паддингами body отдельно.</p>}
        approveButton={{ label: 'Подтвердить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### С subtitle

SearchBar / SegmentControl под строкой заголовка

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function WithSubtitle() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть с subtitle' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Filters'
        // В продакшене сюда — `@ds/search::SearchBar` или `@ds/segment-control::SegmentControl`.
        slotSecondTitle={<div>SearchBar / SegmentControl placeholder</div>}
        content={<p>Subtitle располагается под заголовком — sticky-зона для поиска/фильтров.</p>}
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### С back- и action-кнопкой

onBackButtonClick авто-рендерит back-кнопку; actionButton — справа в шапке

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { KebabSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const MENU_ACTIONS = ['Поделиться', 'Дублировать', 'Удалить'];

/**
 * `actionButton` — слот в правом верхнем углу header'а. Здесь это kebab-кнопка, открывающая
 * Dropdown со списком действий; выбранное действие отражается в теле sheet'а. Back-button слева
 * появляется автоматически по `onBackButtonClick`.
 */
export function WithActionButton() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <MobilePreview>
      <Button label='Открыть с действиями' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Detail view'
        onBackButtonClick={() => setOpen(false)}
        actionButton={
          // TODO: заменить на дроплист
          <Dropdown
            open={menuOpen}
            onOpenChange={setMenuOpen}
            placement='bottom-end'
            content={
              <div className={styles.menu}>
                {MENU_ACTIONS.map(action => (
                  <button
                    key={action}
                    type='button'
                    className={styles.menuItem}
                    onClick={() => {
                      setLastAction(action);
                      setMenuOpen(false);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            }
          >
            <Button view='function' appearance='neutral' icon={<KebabSVG />} aria-label='Действия' />
          </Dropdown>
        }
        content={
          <p>
            Кнопка-меню в правом верхнем углу открывает список действий.
            {lastAction ? ` Выбрано: «${lastAction}».` : ''}
          </p>
        }
        approveButton={{ label: 'Готово', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Scrollable + dividers

Длинный контент: тонкие линии разделяют header / footer от плывущего тела

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function Scrollable() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть scrollable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Scrollable content'
        withDividers
        content={
          <div>
            {Array.from({ length: 30 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Body скроллится, header и footer остаются sticky.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Expandable: половина → full

snapPoints={[0.5, 1]} — drag вверх раскрывает

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Expandable bottom-sheet: открывается на первом snap'е, drag за handle вверх раскрывает на следующий,
 * drag вниз ниже первого — закрывает.
 *
 * В демо-рамке телефона snap-точки заданы в пикселях под её высоту, чтобы «половина» и «полный»
 * визуально различались. На реальном устройстве для тех же состояний используйте доли вьюпорта —
 * `snapPoints={[0.5, 1]}` (резолвятся относительно высоты вьюпорта, а не контейнера).
 */
export function Expandable() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть Expandable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={['220px', '430px']}
        defaultSnapIndex={0}
        title='Expandable bottom-sheet'
        content={
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>Параграф {i + 1}. Контент для демонстрации snap-points поведения.</p>
            ))}
          </div>
        }
        approveButton={{ label: 'Закрыть', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Фильтры

Back-кнопка + подсказка, chips в subtitle, SegmentControl и переключатели, «Применить / Сбросить»

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Switch } from '@ds/toggles';
import { QuestionTooltip } from '@ds/tooltip';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const PERIOD_ITEMS = [
  { value: 'day', label: 'День' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

/**
 * Реальный сценарий «Фильтры»: back-кнопка + заголовок с подсказкой, sticky-зона chips
 * над контентом (subtitle), форма с SegmentControl и переключателями в теле и пара
 * действий «Применить / Сбросить» в футере.
 */
export function Filters() {
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState('week');
  const [onlyFavourite, setOnlyFavourite] = useState(true);
  const [withArchived, setWithArchived] = useState(false);
  const [chips, setChips] = useState(['Активные', 'За месяц']);

  return (
    <MobilePreview>
      <Button label='Открыть фильтры' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Фильтры'
        onBackButtonClick={() => setOpen(false)}
        slotAfterTitle={<QuestionTooltip tip='Настройте параметры выборки' />}
        slotSecondTitle={
          <div className={styles.chipRow}>
            {chips.map(chip => (
              <Tag
                key={chip}
                label={chip}
                appearance='primary'
                size='s'
                onDelete={() => setChips(prev => prev.filter(c => c !== chip))}
              />
            ))}
          </div>
        }
        content={
          <div className={styles.column}>
            <SegmentControl items={PERIOD_ITEMS} value={period} onChange={setPeriod} width='full' />
            <div className={styles.switchRow}>
              <span>Только избранное</span>
              <Switch checked={onlyFavourite} onChange={setOnlyFavourite} />
            </div>
            <div className={styles.switchRow}>
              <span>Показывать архив</span>
              <Switch checked={withArchived} onChange={setWithArchived} />
            </div>
          </div>
        }
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
        cancelButton={{
          label: 'Сбросить',
          onClick: () => {
            setPeriod('week');
            setOnlyFavourite(false);
            setWithArchived(false);
            setChips([]);
          },
        }}
      />
    </MobilePreview>
  );
}
```

### Выбор из списка

Чекбоксы с «Выбрать все» (indeterminate) и счётчиком выбранного в действии

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Checkbox } from '@ds/toggles';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const OPTIONS = [
  { id: 'compute', label: 'Compute' },
  { id: 'storage', label: 'Object Storage' },
  { id: 'network', label: 'Networking' },
  { id: 'database', label: 'Managed Databases' },
];

/**
 * Сценарий выбора из списка: заголовок, чекбокс «Выбрать все» c indeterminate-состоянием
 * для частичного выбора, список строк-опций и действие «Готово» в футере.
 */
export function SelectionList() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(['compute']);

  const allChecked = selected.length === OPTIONS.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggle = (id: string) => setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const toggleAll = () => setSelected(allChecked ? [] : OPTIONS.map(o => o.id));

  return (
    <MobilePreview>
      <Button label='Выбрать сервисы' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Сервисы'
        withDividers
        content={
          <div className={styles.column}>
            {/* htmlFor связывает подпись с нативным input'ом внутри Checkbox — клик по тексту переключает чекбокс. */}
            <label className={styles.checkRow} htmlFor='sel-all'>
              <Checkbox id='sel-all' checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
              <span>Выбрать все</span>
            </label>
            {OPTIONS.map(option => (
              <label key={option.id} className={styles.checkRow} htmlFor={`sel-${option.id}`}>
                <Checkbox
                  id={`sel-${option.id}`}
                  checked={selected.includes(option.id)}
                  onChange={() => toggle(option.id)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        }
        approveButton={{ label: `Готово (${selected.length})`, onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Picker тегов

Поиск в subtitle фильтрует сетку тегов; клик переключает выбор

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { Search } from '@ds/search';
import { Tag } from '@ds/tag';
import { QuestionTooltip } from '@ds/tooltip';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const ALL_TAGS = ['Production', 'Staging', 'Dev', 'Backend', 'Frontend', 'Database', 'Network', 'Critical', 'Billing'];

/**
 * Picker тегов: заголовок с подсказкой, поиск в sticky-зоне (subtitle) фильтрует список,
 * сетка тегов в теле переключает выбор по клику, футер подтверждает выбор.
 */
export function TagPicker() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['Production']);

  const visible = ALL_TAGS.filter(tag => tag.toLowerCase().includes(query.toLowerCase()));

  const toggle = (tag: string) =>
    setSelected(prev => (prev.includes(tag) ? prev.filter(x => x !== tag) : [...prev, tag]));

  return (
    <MobilePreview>
      <Button label='Выбрать теги' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Теги'
        slotAfterTitle={<QuestionTooltip tip='Отметьте теги, по которым нужно отфильтровать' />}
        slotSecondTitle={<Search value={query} onChange={setQuery} placeholder='Поиск тега' />}
        content={
          <div className={styles.tagGrid}>
            {visible.map(tag => (
              <Tag
                key={tag}
                label={tag}
                size='s'
                appearance={selected.includes(tag) ? 'primary' : 'neutral'}
                onClick={() => toggle(tag)}
              />
            ))}
          </div>
        }
        approveButton={{ label: `Применить (${selected.length})`, onClick: () => setOpen(false) }}
        cancelButton={{ label: 'Отмена', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

### Non-modal

showBackdrop={false} + lockScroll={false} — фон не затемнён и остаётся прокручиваемым

```tsx
import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';
import styles from './styles.module.scss';

const RESOURCES = Array.from({ length: 14 }, (_, i) => `vm-${String(i + 1).padStart(2, '0')} — ru-moscow-1a`);

/**
 * Non-modal sheet: фон не затемняется (`showBackdrop={false}`) и не блокируется
 * (`lockScroll={false}`) — страница под подсказкой остаётся видимой, скроллится и кликается.
 * Свайп отключён (`swipeEnabled={false}`), потому что подсказку закрывают кнопкой, а не жестом.
 */
export function NonModal() {
  const [open, setOpen] = useState(true);

  return (
    <MobilePreview>
      {/* Контент «страницы» под подсказкой. Список длиннее экрана — фон под non-modal sheet'ом
          можно прокручивать, пока окно открыто (он не затемнён и не заблокирован). */}
      <div className={styles.nonModalPage}>
        <p>Регион: ru-moscow-1 — список виртуальных машин. Прокрутите его, пока подсказка открыта.</p>
        <Button label='Показать подсказку' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
        {RESOURCES.map(name => (
          <p key={name}>{name}</p>
        ))}
      </div>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        showBackdrop={false}
        lockScroll={false}
        swipeEnabled={false}
        title='Совет'
        content={<p>Откройте «Расширенные настройки», чтобы выбрать зону доступности вручную.</p>}
        approveButton={{ label: 'Понятно', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
```

Для ручной сборки разметки из `Header / Body / Footer` — см. **BottomSheetCustom**.

## Props

**BottomSheetProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionButton` | `ReactNode` | — | Action-кнопка справа в шапке (любой ReactNode — обычно `Button view='function'`). |
| `additionalButton` | `BottomSheetActionButton` | — | Дополнительная (третья) кнопка — объект пропсов `Button` (по умолчанию `view='simple'`, <br/> `appearance='neutral'`). |
| `approveButton` | `BottomSheetActionButton` | — | Основная кнопка действия — объект пропсов `Button` (по умолчанию `view='filled'`, <br/> `appearance='primary'`). Ширина зависит от `footerActionsOrientation` и числа кнопок. |
| `bodyPadding` | `boolean` | `true` | Горизонтальные паддинги body. При `false` контент идёт во всю ширину (edge-to-edge) — для карт, <br/> изображений, списков без отступов. Соответствует Figma-оси `padding=false`. |
| `cancelButton` | `BottomSheetActionButton` | — | Кнопка отмены — объект пропсов `Button` (по умолчанию `view='outline'`, `appearance='neutral'`). |
| `className` | `string` | — | CSS-класс самого sheet-контейнера. |
| `closeOnPopstate` | `boolean` | `true` | Закрывать sheet при `popstate` (browser-back на mobile). |
| `container` | `string \| HTMLElement` | — | Контейнер для портала. По дефолту — `body` либо контекст-провайдер `@ds/portal-context`. |
| `content` | `ReactNode` | — | Основное содержимое (рендерится в `BottomSheetCustom.Body`). |
| `data-test-id` | `string` | — |  |
| `defaultSnapIndex` | `number` | `0` | Индекс snap'а, на котором sheet открывается по дефолту. Игнорируется при controlled `snapIndex`. |
| `footer` | `ReactNode` | — | Произвольный футер. Если задан — имеет приоритет над <br/> `approveButton` / `cancelButton` / `additionalButton`. |
| `footerActionsOrientation` | `"horizontal"` \| `"vertical"` | `'horizontal'` | Ориентация кнопок футера, собранных из `approveButton` / `cancelButton` / `additionalButton`. <br/> Применяется **только при ровно двух** кнопках (canonical cancel/confirm): <br/> - `'horizontal'` — кнопки в ряд через space-between: secondary слева, primary справа, <br/> ширина по контенту. Точное соответствие Figma `bottomBar.buttonGroup`. <br/> - `'vertical'` — кнопки в столбик, full-width (primary сверху). <br/> Одна кнопка всегда рендерится full-width (одиночный CTA); три кнопки не помещаются в ряд на <br/> mobile-вьюпорте и всегда идут в столбик — для них значение игнорируется. <br/> Игнорируется при заданном `footer` (произвольная разметка футера). |
| `footerTestIds` | `{ approve?: string; cancel?: string; additional?: string \| undefined; } \| undefined` | — | Переопределение `data-test-id` собранных слотов футера (approve/cancel/additional). <br/> По умолчанию — собственные id `BottomSheet`. Адаптивные `Modal`/`Drawer` передают сюда свои <br/> `TEST_IDS.footer*`, чтобы футер метился одинаково на desktop-поверхности и в mobile-sheet'е. |
| `lockScroll` | `boolean` | `true` | Блокировать ли скролл фона на время открытия (`react-remove-scroll`). При `false` страница <br/> под sheet'ом остаётся прокручиваемой — для non-modal сценариев (sheet поверх контента, с <br/> которым продолжают взаимодействовать). Обычно используется вместе с `showBackdrop={false}`. |
| `media` | `PopupMediaProps` | — | Media-блок над шапкой: изображение / иконка либо произвольный `ReactNode`. |
| `onBackButtonClick` | `(() => void)` | — | Callback клика на back-кнопку (слева в шапке). <br/> Наличие callback'а рендерит ArrowLeft-кнопку. |
| `onClose` | `() => void` | — | Колбэк закрытия (вызывается при click outside, Esc, swipe-down, browser-back). |
| `onSnapIndexChange` | `((snapIndex: number) => void)` | — | Callback изменения активного snap'а (пересечение swipe-границы или click по UI). <br/> Не вызывается при программной смене controlled `snapIndex`. |
| `open` | `boolean` | — | Управление состоянием показан / не показан. |
| `rootClassName` | `string` | — | CSS-класс корневого элемента portal'а. |
| `safeArea` | `boolean` | `true` | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBackdrop` | `boolean` | `true` | Отображение тёмной подложки за sheet'ом. При `false` фон не затемняется и click-outside <br/> не закрывает sheet (нет backdrop-узла, по которому ловится клик). |
| `slotAfterTitle` | `ReactNode` | — | Slot справа от title (внутри той же строки) — типично `QuestionTooltip`, status badge. |
| `slotSecondTitle` | `ReactNode` | — | Slot под подзаголовком — типично `SearchBar`, `SegmentControl`, `Filter`. |
| `snapIndex` | `number` | — | Controlled-индекс активного snap'а. Если задан, sheet всегда находится на этом snap'е; <br/> swipe-up/down вызывают `onSnapIndexChange`, но не меняют позицию сами — consumer должен <br/> передать новое значение. |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `subtitle` | `ReactNode` | — | Текстовая строка-подзаголовок под title. |
| `swipeEnabled` | `boolean` | `true` | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |
| `title` | `ReactNode` | — | Заголовок в шапке. |
| `withDividers` | `boolean` | `true` | Тонкие линии между topBar↔body и body↔footer: разграничивают закреплённые шапку и подвал <br/> от прокручиваемого под ними содержимого. Передайте `false`, чтобы убрать обе линии. |

#### Related types

- `SnapPoint` = `number | `${number}px` | `${number}%` | `${number}dvh` | `${number}svh` | `${number}lvh` | "fit-content"`

## Смотри также

- **BottomSheetCustom** — низкоуровневая ручная композиция.
- **Drawer** — выезжающая боковая панель (desktop / мульти-position).
- **Modal** — модальное окно по центру.
- **Toaster** — короткие mobile-уведомления.
- **Popover** — компактный поповер у триггера.
## Когда не нужен

- На desktop'е — используйте **Modal** или **Drawer**.
- Для коротких подтверждений на одну строку — Toaster.
- Для контента, который должен перекрыть весь экран без возможности dismiss — это новый screen, не bottom-sheet.

## Доступность

- **Роль и имя.** Sheet — `role='dialog'` + `aria-modal='true'`. Высокоуровневый `BottomSheet`
  автоматически связывает `title` с dialog'ом через `aria-labelledby` (accessible name). Если `title`
  нет (icon-/media-only sheet) или вы используете низкоуровневый `BottomSheetCustom` — задайте
  `aria-label` сами (прокидывается на dialog).
- **Клавиатура.** `Esc` закрывает sheet (верхний слой при вложенных). Фокус переносится внутрь при
  открытии, зациклен по `Tab` / `Shift+Tab` и возвращается на триггер после закрытия.
- **Motion.** Slide / fade / height-анимации гасятся при `prefers-reduced-motion: reduce`.
- **Media.** Для `media` всегда задавайте осмысленный `alt` (он обязателен в типе `BottomSheetMediaProps`).
- **Non-modal.** При `showBackdrop={false}` + `lockScroll={false}` sheet немодальный: `aria-modal` не выставляется, фокус не запирается (Tab уходит на фон), Esc закрывает даже когда фокус снаружи.
- **Dismiss-контрол.** Своей кнопки «закрыть» у sheet'а нет (dismiss — Esc / клик по backdrop / swipe-down). Если у sheet'а нет ни back-кнопки, ни footer-«Отмена», добавьте явный in-sheet dismiss для keyboard/SR-пользователей.
- **Snap-точки и клавиатура.** Переключение detent'ов (`snapPoints`) — это pointer-жест (swipe); клавиатурой detent не меняется. Контент ниже фолда доступен через скролл body + Tab. Для клавиатурного управления detent'ом используйте controlled `snapIndex` со своим контролом.
- **Pinch-zoom.** В модальном режиме фон-скролл лочится `react-remove-scroll` — на iOS это также блокирует pinch-to-zoom, пока sheet открыт (DS-wide, как у Modal/Drawer).

## BottomSheetCustom

Низкоуровневая сборка bottom-sheet — полный контроль над разметкой через Header / Body / Footer субкомпоненты.

`BottomSheetCustom` — низкоуровневая версия `BottomSheet`, которая не диктует структуру содержимого. Потребитель сам компонует шапку, тело и футер из субкомпонентов `BottomSheetCustom.Header`, `.Body`, `.Footer` или собственной разметки.

Сам компонент берёт на себя portal, backdrop, slide-up-motion, focus-trap и swipe / snap-движок. Готовая анатомия (media-блок, dividers, авто-рендер back-кнопки) есть только у высокоуровневого `BottomSheet`.

### Когда использовать

- Стандартной шапки / футера из `BottomSheet` недостаточно — нужна своя разметка.
- Сложная раскладка нескольких секций внутри одного sheet'а.
- Кастомные слоты (например, фиксированный поиск между шапкой и телом).

Во всех остальных случаях предпочтительнее `BottomSheet` — он дешевле в поддержке и даёт консистентные отступы.

### Анатомия

#### Header
Слот `BottomSheetCustom.Header` — `title`, `slotAfterTitle`, `subtitle`, `slotSecondTitle`, `onBackButtonClick`, `actionButton`.

> **Accessible name.** В отличие от высокоуровневого `BottomSheet`, низкоуровневый `BottomSheetCustom` не связывает `Header.title` с dialog'ом автоматически — задайте имя сами: `aria-label` (или `aria-labelledby` на узел заголовка) прямо на `BottomSheetCustom`. Без него screen reader озвучит просто «dialog».

#### Non-modal / dismissal
`showBackdrop={false}` + `lockScroll={false}` дают non-modal sheet — фон не затемнён и остаётся прокручиваемым (sheet поверх живого контента). `closeOnPopstate` (default `true`) закрывает sheet по browser-back на mobile.

#### Body
Слот `BottomSheetCustom.Body` — основное содержимое (через `children` или `content`). Скроллится независимо от sheet'а.

#### Footer
Слот `BottomSheetCustom.Footer` — нижняя action-зона (обычно `Button` или их композиция).

#### Snap points (default `undefined` → height auto)
`snapPoints` принимает массив фиксированных позиций (`number ∈ (0, 1] | 'Npx' | 'N%' | 'Ndvh' | 'Nsvh' | 'Nlvh' | 'fit-content'`) от меньшей к большей. Активный snap управляется через `defaultSnapIndex` (uncontrolled) либо `snapIndex` + `onSnapIndexChange` (controlled). В controlled-режиме swipe вызывает `onSnapIndexChange`, но позицию не двигает — потребитель сам передаёт новое значение.

### Примеры использования

#### Ручная композиция

Header + Body + Footer собираются вручную.

```tsx
import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * BottomSheetCustom — низкоуровневая обёртка. Backdrop, scroll-lock, focus-trap и slide-up-motion
 * даёт сам компонент; анатомию (header / media / body / footer и их порядок) потребитель
 * собирает из namespace-слотов `BottomSheetCustom.Handle / .Header / .Media / .Body / .Footer`.
 */
export function CustomComposition() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть Custom' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} aria-label='Custom composition'>
        <BottomSheetCustom.Header title='Custom composition' slotAfterTitle={<span>NEW</span>} />
        <BottomSheetCustom.Body>
          <p>Свободный JSX внутри Body. Можно вставить любой контент между Header и Footer.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Готово' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}
```

#### Snap points: половина → full

snapPoints={[0.5, 1]} + controlled snapIndex

```tsx
import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Custom-слой полностью управляет snap-движком. `snapPoints={[0.5, 1]}` открывает sheet на
 * половину экрана; drag вверх (или контролируемый `snapIndex`) раскрывает до full-viewport.
 * Активный snap отслеживается через `onSnapIndexChange`.
 */
export function CustomSnapPoints() {
  const [open, setOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  return (
    <MobilePreview>
      <Button label='Открыть expandable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={[0.5, 1]}
        snapIndex={snapIndex}
        onSnapIndexChange={setSnapIndex}
        aria-label='Snap points sheet'
      >
        <BottomSheetCustom.Header title={snapIndex === 0 ? 'Половина экрана' : 'Full-screen'} />
        <BottomSheetCustom.Body>
          <p>Текущий snap-индекс: {snapIndex}. Потяните вверх, чтобы раскрыть.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button
            fullWidth
            view='filled'
            appearance='primary'
            label={snapIndex === 0 ? 'Раскрыть' : 'Свернуть'}
            onClick={() => setSnapIndex(snapIndex === 0 ? 1 : 0)}
          />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}
```

#### Scrollable body

Длинный список скроллится внутри Body, header / footer фиксированы

```tsx
import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * Длинный контент в `BottomSheetCustom.Body` скроллится независимо: drag-движок отдаёт жест
 * нативному скроллу, пока тело не упёрлось в край, и только тогда перехватывает swipe-down sheet'а.
 * Header и Footer остаются на месте.
 */
export function CustomScrollable() {
  const [open, setOpen] = useState(false);
  const rows = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <MobilePreview>
      <Button label='Открыть scrollable' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} snapPoints={['60dvh']} aria-label='Длинный список'>
        <BottomSheetCustom.Header title='Длинный список' />
        <BottomSheetCustom.Body>
          {rows.map(n => (
            <p key={n}>Строка №{n}</p>
          ))}
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Готово' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}
```

### Props

**BottomSheetCustomProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `className` | `string` | — | CSS-класс самого sheet-контейнера. |
| `closeOnPopstate` | `boolean` | `true` | Закрывать sheet при `popstate` (browser-back на mobile). |
| `container` | `string \| HTMLElement` | — | Контейнер для портала. По дефолту — `body` либо контекст-провайдер `@ds/portal-context`. |
| `data-test-id` | `string` | — |  |
| `defaultSnapIndex` | `number` | `0` | Индекс snap'а, на котором sheet открывается по дефолту. Игнорируется при controlled `snapIndex`. |
| `lockScroll` | `boolean` | `true` | Блокировать ли скролл фона на время открытия (`react-remove-scroll`). При `false` страница <br/> под sheet'ом остаётся прокручиваемой — для non-modal сценариев (sheet поверх контента, с <br/> которым продолжают взаимодействовать). Обычно используется вместе с `showBackdrop={false}`. |
| `onClose` | `() => void` | — | Колбэк закрытия (вызывается при click outside, Esc, swipe-down, browser-back). |
| `onSnapIndexChange` | `((snapIndex: number) => void)` | — | Callback изменения активного snap'а (пересечение swipe-границы или click по UI). <br/> Не вызывается при программной смене controlled `snapIndex`. |
| `open` | `boolean` | — | Управление состоянием показан / не показан. |
| `rootClassName` | `string` | — | CSS-класс корневого элемента portal'а. |
| `safeArea` | `boolean` | `true` | Резервировать ли место под iOS notch / home-indicator и Android nav-bar. Реализовано паддингом <br/> на `.content` через `env(safe-area-inset-*)`: на устройстве без выреза/индикатора (и на desktop) <br/> inset = 0, поэтому никакого «лишнего» отступа не появляется; на notched-устройстве — ровно нужный. <br/> Верхний отступ добавляется только когда sheet раскрыт на полный вьюпорт (его верх под notch). |
| `showBackdrop` | `boolean` | `true` | Отображение тёмной подложки за sheet'ом. При `false` фон не затемняется и click-outside <br/> не закрывает sheet (нет backdrop-узла, по которому ловится клик). |
| `snapIndex` | `number` | — | Controlled-индекс активного snap'а. Если задан, sheet всегда находится на этом snap'е; <br/> swipe-up/down вызывают `onSnapIndexChange`, но не меняют позицию сами — consumer должен <br/> передать новое значение. |
| `snapPoints` | `SnapPoint` | — | Массив фиксированных позиций sheet'а от меньшей к большей. По дефолту `undefined` — <br/> sheet `height: auto` с одним snap'ом по высоте контента. <br/> Пример: `[0.5, 1]` — sheet открывается на половину экрана, drag вверх раскрывает <br/> до full-viewport; drag вниз ниже `0.5` ведёт к закрытию. <br/> Контракт массива (движок не сортирует и не дедуплицирует — порядок и различимость на <br/> стороне потребителя): <br/> - строго по возрастанию: индекс `0` — самая компактная позиция, последний — top / expanded; <br/> - значения должны резолвиться в различные высоты (`['50%', 0.5]` на типичном вьюпорте дадут <br/> одну высоту → дубль-индекс будет недостижим свайпом); <br/> - `'fit-content'` имеет смысл только как ЕДИНСТВЕННЫЙ snap (без `snapPoints`); внутри массива <br/> фиксированных позиций его «контентная» высота не определена. |
| `swipeEnabled` | `boolean` | `true` | Включает swipe-down для закрытия / swipe-up для раскрытия на следующий snap-point. <br/> При `swipeEnabled=false` snap-point по-прежнему можно переключить через controlled `snapIndex` prop'ом. |

##### Related types

- `SnapPoint` = `number | `${number}px` | `${number}%` | `${number}dvh` | `${number}svh` | `${number}lvh` | "fit-content"`

### Смотри также

- **BottomSheet** — высокоуровневая обёртка с готовой анатомией.
- **Drawer** — выезжающая боковая панель (desktop / мульти-position).
- **Modal** — модальное окно по центру.

## Handle

```tsx
import { BottomSheetCustom } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

/**
 * BottomSheetCustom — низкоуровневая обёртка. Backdrop, scroll-lock, focus-trap и slide-up-motion
 * даёт сам компонент; анатомию (header / media / body / footer и их порядок) потребитель
 * собирает из namespace-слотов `BottomSheetCustom.Handle / .Header / .Media / .Body / .Footer`.
 */
export function CustomComposition() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть Custom' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheetCustom open={open} onClose={() => setOpen(false)} aria-label='Custom composition'>
        <BottomSheetCustom.Header title='Custom composition' slotAfterTitle={<span>NEW</span>} />
        <BottomSheetCustom.Body>
          <p>Свободный JSX внутри Body. Можно вставить любой контент между Header и Footer.</p>
        </BottomSheetCustom.Body>
        <BottomSheetCustom.Footer>
          <Button fullWidth view='filled' appearance='primary' label='Готово' onClick={() => setOpen(false)} />
        </BottomSheetCustom.Footer>
      </BottomSheetCustom>
    </MobilePreview>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
