# Trigger-based stories — стандарт

**Область действия:** Playground-stories компонентов, у которых видимое состояние возникает только после взаимодействия с триггером — `modal`, `drawer`, `popover`, `dropdown`, `tooltip`, `toaster` и любые другие dialog-like / portal-компоненты. Дополняет [stories-standard.md](./stories-standard.md) и [storybook-args-conventions.md](./storybook-args-conventions.md) — там общий каркас Playground/VisualMatrix, здесь — детали именно для триггерных компонентов.

## Принцип

Story trigger-based компонента — это не «открытая фикстура», а **demo-сцена с панелью триггеров**. `open` не выводится в args: пользователь видит кнопку, нажимает, компонент открывается через свой публичный API. Это уравнивает поведение в Storybook с реальным потребительским сценарием и снимает необходимость синхронизировать `open` через `useArgs({ open })` + `onClose: updateArgs(...)`.

> **Где смотреть живой эталон.** Любой пакет, у которого в `__test__/<Name>/visual.spec.ts` есть `placements.png` / `widths.png` composite, выступает источником. Конкретный путь может меняться — ориентируйся на формулировки этого правила, не на файл-эталон.

## 1. Open — действие, не arg

В `args` Playground'а trigger-based компонента **нет** `open` / `defaultOpen`. Эти пропсы прячутся из панели через `table.disable`:

```ts
argTypes: {
  open: { table: { disable: true } },
  onClose: { table: { disable: true } },
}
```

Состояние открытия живёт в локальном `useState` внутри render-компонента, не в args:

```tsx
function PlaygroundRender(args: StoryProps) {
  const { open: _ignoredOpen, ...rest } = args;
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Открыть модалку триггером ниже.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.triggerOpen}
            label='Открыть модалку'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Modal {...rest} open={open} onClose={() => setOpen(false)} />
    </DemoPage>
  );
}
```

Controlled-режим как учебный кейс с `open`-as-arg выносится в `examples/<Name>.Controlled.stories.tsx`. Там `open` — arg, и это явный сценарий.

## 2. Demo-host — `<DemoPage>` + `<DemoPanel>`

Раскладка каждого Playground'а одинаковая. Примитивы — из `#storybook/components`:

```tsx
import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, DemoWarning } from '#storybook/components';
```

Канонический скелет:

```tsx
<DemoPage>
  <DemoPanel>
    <DemoTitle>Playground</DemoTitle>
    <DemoHint>Одно предложение про сцену.</DemoHint>
    {/* опционально — баннер про невалидные args; `clamped` и `effective` приходят
        из runtime-резолвера зависимых осей, разворот — в §5 ниже */}
    {clamped && <DemoWarning>position={position} недопустим для type={type}. Использую {effective}.</DemoWarning>}
    <DemoActions align='center'>
      {/* триггер(ы) — Button из @ds/button + Component-обёртка по необходимости */}
    </DemoActions>
  </DemoPanel>
  {/* surface — Modal/Drawer/Toaster, если она не рендерится через триггер сама */}
</DemoPage>
```

`parameters.layout: 'fullscreen'` — обязательно (центрирование делает `<DemoPage>`). `layout: 'centered'` для trigger-based — запрещено.

Варианты `<DemoPanel>`: `width='default' | 'narrow' | 'wide'`. `<DemoActions>` поддерживает `align='start' | 'center'`.

## 3. Триггер — `Button` из `@ds/button`

Все триггеры — `@ds/button`, не нативные `<button>`. Это единообразие и сразу даёт корректный focus-visible / disabled / loading:

```tsx
<Button
  data-test-id={TEST_IDS.triggerOpen}
  label='Открыть Drawer'
  view={VIEW.Outline}
  appearance={APPEARANCE.Neutral}
  onClick={() => setOpen(true)}
/>
```

Для `Popover` / `Dropdown` / `Tooltip` — `Button` подставляется как children компонента-обёртки. Native `<button>` в Playground запрещён.

## 4. Канонические test-id триггеров

В `packages/<pkg>/stories/<Name>/testIds.ts` (или `stories/testIds.ts` для multi-component) — единый объект `TEST_IDS`. Какие слоты заводить:

- `triggerOpen` — **всегда** (открытие компонента в story).
- `triggerClose` — **только если** story рендерит кнопку закрытия **вне** surface компонента (например, отдельный close-button в `<DemoActions>` рядом с `triggerOpen`). Внутренний close самого компонента (крестик в Modal) под это правило не подпадает — его id живёт в `src/constants.ts::TEST_IDS` компонента.
- `triggerReset` — **только если** story управляет несколькими инстансами/итерациями и нужна явная точка сброса (multi-toaster, переключение position через remount).

Других слотов с префиксом `trigger*` вводить нельзя.

```ts
export const TEST_IDS = {
  root: 'modal',
  triggerOpen: 'modal-trigger',
  // triggerClose / triggerReset — только при выполнении условий выше
} as const
```

Для multi-component пакетов — вложенно: `TEST_IDS.modal.triggerOpen`, `TEST_IDS.modalCustom.triggerOpen`.

Имена `trigger`, `controlledTrigger`, `buttonTrigger` — устаревшие. Рефакторятся в `triggerOpen` за один проход. E2E `__test__/<Component>/helpers.ts` импортирует тот же объект — рассинхрон невозможен.

### `data-test-id` для скрытого portal-контента

`data-test-id`, переданный в компонент с portal'ом через `args` или `{...rest}`, оседает на portal-узле, который монтируется в DOM **только после открытия**. До этого селектор по такому id ничего не находит. Если test'у нужно адресовать **видимый до открытия** контент (slot в parent-компоненте, обёртка-ярлык, статичный preview) — ставь id на стабильный DOM-узел в story-рендере (обычно `<span data-test-id={...}>` вокруг slot'а), не полагайся на пробрасывание `args.data-test-id` сквозь portal-компонент.

По той же причине `buildStoryOptions` для trigger-based пакетов **не** должен ставить `data-test-id` в `props` — URL-args перетирают story-defaults и могут спровоцировать коллизию между триггер-id и portal-id (оба элемента с одинаковым id → strict-mode violation в спеках).

## 5. Конфликты args — рантайм + `<DemoWarning>`, не `if:`

Если ось A валидна только при значении B на оси C — **не прятать** A через `if:`, а:

- разрешать выбрать любое значение в контролах;
- в render-компоненте резолвить к ближайшему валидному;
- рисовать `<DemoWarning>` с объяснением, что произошло.

Скелет (на примере зависимости оси `position` от оси `type`):

```tsx
const { value: effectivePosition, clamped } = resolveDependentAxis(type, position);
// …
{clamped && (
  <DemoWarning>
    <code>position={position}</code> недопустим для <code>type={type}</code>. Использую <code>{effectivePosition}</code>.
  </DemoWarning>
)}
```

**Критерий выбора между `if:` и runtime-резолвом**:

- **`if: { arg, eq | neq }`** — когда зависимый проп **не имеет визуального значения** при отключённом партнёре (числовой/строковый параметр настройки, который при выключенном флаге просто не используется). Пример: `autoCloseMs` имеет смысл только при `autoCloseEnabled: true`. Скрытие правильнее, потому что менять `autoCloseMs` без `autoCloseEnabled` бессмысленно.
- **Runtime-резолв + `<DemoWarning>`** — когда зависимый проп **имеет визуальное значение**, но не каждое его значение валидно при значении партнёра. Пример: `position` × `type` у toaster — `position='top-right'` бывает невалидным при `type='inline'`, но `position` сам по себе визуально важен и должен оставаться выбираемым. Скрывать нельзя — пользователь не поймёт, что произошло.

Кросс-типные конфликты (две оси, где значения одной ограничивают значения другой) — всегда runtime + warning.

Это даёт совместимость с URL-args в e2e: тест выставляет любую комбинацию через `gotoStory`, story остаётся работоспособной и явно показывает, что значение было приведено к валидному.

## 6. Slot-toggle через `[Stories]: show*`

Тогглы видимости слотов (header/footer/media/back-button) живут как story-props и идут отдельной категорией в Controls:

```ts
type StoryProps = ModalProps & {
  showHeader: boolean;
  showHeadline: boolean;
  showAfterHeadline: boolean;
  showSubHeadline: boolean;
  showBackButton: boolean;
  showFooter: boolean;
  showMedia: boolean;
  // …
};

argTypes: {
  showHeader: { name: '[Stories]: showHeader', control: 'boolean' },
  showHeadline: { name: '[Stories]: showHeadline', control: 'boolean', if: { arg: 'showHeader', eq: true } },
  // …
}
```

Сами тогглы — НЕ в API компонента, только в `StoryProps`. Префикс `[Stories]:` визуально отделяет их от настоящих пропсов.

## 7. Тег и `tags`

Playground trigger-based компонента — обычный Playground:

```ts
export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  },
};
```

`play` — минимальный `toBeVisible` на триггере. Открытие/закрытие/keyboard — в `tests/<Name>.InteractionTest.stories.tsx` (см. [stories-standard.md](./stories-standard.md)).

## Запреты

- `useArgs({ open })` + sync `onClose: updateArgs({ open: false })` в Playground.
- `layout: 'centered'` для drawer/modal/toaster/любого trigger-based Playground.
- Триггер-кнопка обязана получать `data-test-id` через `TEST_IDS.triggerOpen` — инлайн-литералы (`data-test-id='modal-trigger'`) запрещены.
- Native `<button>` в качестве триггера — только `Button` из `@ds/button`.
- `open` / `onClose` / `onOpenChange` в `argTypes` без `table: { disable: true }`.
- `<DemoWarning>` без причины — баннер показывается только когда args приводятся к валидному значению рантаймом.

## Чек-лист

Финальный чек-лист (по доменам) — в скилле [`pre-mr-audit`](../skills/pre-mr-audit.md) §«Финальные чек-листы». Источник истины по правилам — этот файл; gate перед MR — скилл.

## Связанное

- [stories-standard.md](./stories-standard.md) — общий каркас Playground/VisualMatrix + `data-test-id` и `TEST_IDS`.
- [storybook-args-conventions.md](./storybook-args-conventions.md) — детали `args` / `argTypes`.
- [component-api-surface.md](./component-api-surface.md) — `constants.ts` / `types.ts` / `TEST_IDS` в публичном API.
