# Toaster

`@ds/toaster` — Система всплывающих уведомлений с тремя типами контента и императивным API.

Три типа контента под разные UX-сценарии:

- **ToastSystemEvent** — системные события (5 appearance, link, action). Auto-dismiss 5s, поддерживает stack.
- **ToastUserAction** — короткий feedback на пользовательское действие (copy, save). Auto-dismiss 2s.
- **ToastUpload** — прогресс загрузки файлов (мульти-файл, pause/resume).

Открытие — через императивный singleton `toaster`:

```ts
import { toaster } from '@ds/toaster'

toaster.systemEvent.success({ title: 'Сохранено' })
toaster.userAction.neutral({ label: 'Скопировано' })
toaster.upload.startOrUpdate({ status: 'loading', files, progress: { current: 0, total: files.length } })
```

## Когда использовать

- **SystemEvent** — результаты асинхронных операций, системные события, критические ошибки с action-кнопками.
- **UserAction** — короткий ack на локальное действие («скопировано», «сохранено», «удалено»), опционально с link-отменой.
- **Upload** — длительная загрузка файлов с прогрессом и контролем pause/resume/cancel.

Когда тосты **не** нужны:

- Блокирующее подтверждение действия — используй Modal/Dialog.
- Постоянная информация в интерфейсе — используй Alert / InfoBlock.
- Inline-валидация формы — используй встроенный error-state поля.

## Анатомия

По умолчанию **SystemEvent и Upload рендерятся в одном контейнере** (Figma 26297:48316). Upload-карточка прижата к якорю контейнера, SystemEvent-стек — на противоположной стороне, кнопки `Expand`/`Close all` посередине. Кнопки управляют только SystemEvent-стеком, Upload не задевается. UserAction живёт отдельным контейнером (другая позиция, pill-стиль).

```tsx
<>
  {/* shared контейнер для SystemEvent + Upload */}
  <ToasterContainer
    type={TOASTER_TYPE.SystemEvent}
    position='bottom-right'
    stacked
    displayCloseAllButton
    limit={5}
    autoClose={5000}
  />
  {/* UserAction — отдельно */}
  <ToasterContainer type={TOASTER_TYPE.UserAction} />
</>
```

Если нужны раздельные контейнеры под SystemEvent и Upload — передавай разные `containerId` явно и шорткатам, и `<ToasterContainer/>`.

Менеджер тостов синглтонный, мультиплексирует обращения по `containerId`. Каждый контейнер автономно держит свой стек и таймеры.

### Type

Тип контейнера — определяет, какой тостовый компонент он рендерит:

- `systemEvent` — стек системных событий (`ToastSystemEvent`).
- `userAction` — pill-feedback (`ToastUserAction`).
- `upload` — карточка загрузки (`ToastUpload`).

### Position (default из `TOASTER_CONTAINER_DEFAULTS[type]`)

Якорь контейнера на экране:

- `SystemEvent` поддерживает все 6 положений: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.
- `UserAction` использует только `top-center` / `bottom-center`.

### Limit (default `5` для SystemEvent, `2` для UserAction, `1` для Upload)

Максимум одновременно видимых тостов в контейнере. При превышении новые тосты прячутся в начало массива (newest), сохраняя front. Передай `limit: 0` — ограничение отключается полностью, вся очередь рендерится (актуально, когда у контейнера есть скролл-fallback по высоте).

### AutoClose (default `5000` для SystemEvent, `2000` для UserAction, `false` для Upload)

Дефолтное время автозакрытия (мс) для всех тостов контейнера. Каскад resolve'а: `toastOptions.autoClose` (per-toast) → `<ToasterContainer autoClose>` (per-container) → `AUTO_CLOSE_TIME[type]` (глобальный). Передать `false` — автозакрытие выключено по умолчанию.

### Stacked (default `false`)

`stacked` включает deck-режим: в коллапсе виден front-тост (oldest, ближе к якорю контейнера), новые карточки уходят ghost-стопкой. Hover контейнера разворачивает стек и ставит auto-dismiss на паузу.

### Draggable (default `false`) — ⚠️ экспериментально

`draggable` включает закрытие тоста свайпом мыши или пальцем. Жест активируется после смещения >32px по оси свайпа; до этого порога клики по детям (например, кнопка close внутри тоста) проходят как обычно. Свайп считается «достаточным», если путь ≥50% размера карточки по оси или скорость ≥2.5px/мс (быстрый флик) — тост уезжает за край и закрывается. Иначе карточка возвращается на место CSS-транзишеном.

`draggableDirection` (`x` | `y`) задаёт ось. По умолчанию выводится из `position`: `top-center` / `bottom-center` → `y` (свайп вверх/вниз), остальные позиции → `x` (свайп влево/вправо). Во время взаимодействия таймер автозакрытия паузится. На touch-устройствах нативный скролл по поперечной оси сохраняется (`touch-action: pan-x` / `pan-y`), поэтому свайп тоста не конфликтует со скроллом страницы.

**Под капотом:** на время drag'а карточка переключается в `position: fixed` и резолвится к `.toasterRoot` (`container-type: size` создаёт containing block). Это позволяет свайпу физически выйти за пределы внутреннего `@ds/scroll`-host'а (его `overflow: hidden` иначе клипил бы карточку у границы). Конструкция чувствительна: если в DOM-цепочке между `.toasterRoot` и тостом появляется новый containing block (`transform`, `filter`, `will-change`, `contain`), координаты разойдутся и карточка приземлится в неверной точке. Перед prod-использованием поведение нужно стабилизировать.

### Overflow fallback (узкий / низкий viewport, кастомный `toasterParent`)

Контейнер уважает размеры родителя:

- **Ширина.** `.container` и `.toast` зажаты в `min(maxWidth, 100cqw - 2*paddingHorizontal)` — на широком экране применяется обычная `maxWidth` из дизайн-токенов, на узком ужимается, оставляя `paddingHorizontal` от обоих краёв. `100cqw` резолвится к ширине `.toasterRoot` (он = `toasterParent` через `position: absolute; inset: 0; container-type: size`), то есть к ширине родителя, а не viewport'а. Дефолт `toasterParent = document.body` сохраняет старое поведение.
- **Высота.** Содержимое контейнера обёрнуто в `<Scroll>` (`@ds/scroll`) с `max-height: min(100cqh, 100dvh) - 2*paddingVertical`. Когда суммарная высота тостов превышает доступное окно — появляется внутренний кастомный скролл, хвост стека не уезжает за экран. `min(cqh, dvh)` нужен ради мобильных браузеров, где `cqh` зачастую резолвится к "small viewport" (статике без учёта адресной строки), а `dvh` отражает реально видимую область.

Кастомный `toasterParent` (`openToast({ ..., toasterParent })`): передавай `HTMLElement` — `helpers.tsx` вставит туда `<div data-toaster-root>` с `container-type: size`, и все размерные ограничения зарезолвятся к этому боксу. Для свайпа важно, чтобы между `data-toaster-root` и тостом не появлялся новый containing block (`transform` / `filter` и т.п.) — см. блок про drag.

### ContainerId и маршрутизация

Дефолтный `containerId` для типа — `toaster-container__<type>`. Несколько `<ToasterContainer/>` одного типа должны получить уникальные `containerId`; шорткаты `toaster.<type>.*({ containerId })` маршрутизируют тосты в нужный.

## Установка

```bash
pnpm add @ds/toaster
```

```ts
import {
  ToasterContainer,
  ToastSystemEvent,
  ToastUserAction,
  ToastUpload,
  toaster,
  TOASTER_TYPE,
  UploadItem,
} from '@ds/toaster'
```

## Props

### ToasterContainer

**ToasterProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoClose` | `number \| false` | — | Дефолтное время автозакрытия (мс) для всех тостов этого контейнера. Используется, <br/> если в `toastOptions.autoClose` явно не передано значение. Передать `false` — <br/> автозакрытие отключено по умолчанию. Если проп не задан — берётся `AUTO_CLOSE_TIME[type]`. |
| `containerId` | `string` | — | Идентификатор контейнера — ключ маршрутизации тостов. Вызов <br/> `toaster.<type>.open({ containerId })` находит контейнер по этому id и <br/> рендерит тост в нём. Если не задан — используется дефолт <br/> `toaster-container__<type>` (см. `TOASTER_CONTAINER_PREFIX`), общий для <br/> всех контейнеров одного `type`. Задавай явный id, когда на странице <br/> несколько контейнеров одного типа и нужно адресовать конкретный. |
| `data-test-id` | `string` | — | Override `data-test-id` корня контейнера. Если не задан — используется <br/> `TEST_IDS.toasterContainer`. Имеет смысл, если на странице несколько <br/> контейнеров одного типа и e2e-тестам нужно адресовать конкретный. |
| `displayCloseAllButton` | `boolean` | — |  |
| `draggable` | `boolean` | — |  |
| `draggableDirection` | `"x"` \| `"y"` | — |  |
| `limit` | `number` | — | Максимум одновременно видимых тостов в контейнере. По умолчанию — из TOASTER_CONTAINER_DEFAULTS[type]. |
| `position` | `"bottom-center"` \| `"bottom-left"` \| `"bottom-right"` \| `"top-center"` \| `"top-left"` \| `"top-right"` | — |  |
| `stacked` | `boolean` | — |  |
| `type` | `"system-event"` \| `"upload"` \| `"user-action"` | — |  |
| `width` | `"auto"` \| `"full"` | — |  |

#### Related types

- `DraggableDirection` = `"x"` \| `"y"`

- `SystemEventPosition` = `"bottom-center"` \| `"bottom-left"` \| `"bottom-right"` \| `"top-center"` \| `"top-left"` \| `"top-right"`

- `ToasterWidth` = `"auto"` \| `"full"`

## Storybook

Playground — все props контейнера через controls:

### Stacking · `stacked` + `displayCloseAllButton`

Шесть позиций, у каждой свой контейнер с `stacked`, `limit: 5`, `autoClose: 5000`. В углу — сквозной счётчик тостов (повторные клики продолжают нумерацию). Hover на стеке разворачивает deck, кнопки `Expand` / `Close all` появляются при ≥ 2 активных тостах.

### Positions · 6 точек якоря

Демонстрация всех `position` для `SystemEvent` (`top-left` / `top-center` / `top-right` / `bottom-left` / `bottom-center` / `bottom-right`) рядом — наглядно, как меняется flex-направление и `slide-in` транзишен у каждой.

### Triggers · вызов из императивного API

Список кнопок-триггеров под все шорткаты (`toaster.systemEvent.success`, `…neutral`, `…error`, `userAction`, `upload`). Удобно для сверки, как кадровые случаи смотрятся бок о бок.

### UpdateFlow · `id` + `update`-семантика

Длительный сценарий: один и тот же тост проходит через `loading → success → error`. Демонстрирует контракт `toaster.upload.startOrUpdate(...)` / возврат `id` и `update`.

### Mobile · кастомный `toasterParent` + узкий viewport

Тосты рендерятся внутри телефонной рамки через `toasterParent={frameRef.current}`. Ширина / высота клампится по `cqw` / `min(cqh, dvh)`, скролл-fallback по высоте, swipe-to-dismiss (экспериментально). Можно переключать размер экрана (SE / iPhone / Pro Max) и проверять реакцию на узкий контейнер.
