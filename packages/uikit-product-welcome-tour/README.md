# WelcomeTour

`@ds/uikit-product-welcome-tour` — Онбординг-тур по интерфейсу — пошаговые подсказки с подсветкой целевых элементов.

Онбординг-тур по интерфейсу: затемняет страницу, подсвечивает целевой элемент шага и показывает рядом подсказку с заголовком, описанием, индикатором прогресса и кнопками навигации. Шаги описываются пропом `steps`, запуск — через `open` / `defaultOpen`.

## Когда использовать

- Первое знакомство с разделом: показать, где что находится, сразу после входа или после релиза.
- Анонс новой функции — короткий тур из одного-двух шагов вокруг новых элементов.
- Обучающий сценарий, где важна последовательность: сначала фильтры, потом действие над выбранным.

Когда **не** нужен:

- Подсказка к одному элементу:
  - **`Tooltip`** — короткое пояснение по наведению.
  - **`HotSpot`** — точка привлечения внимания без пошагового сценария.
- Блокирующее подтверждение — **`Modal`**.
- Справка, которую читают целиком, а не проходят по шагам — отдельная страница документации.

## Анатомия

Тур состоит из трёх частей: полноэкранный оверлей, вырез вокруг целевого элемента шага (spotlight) и подсказка, прикреплённая к вырезу. Оверлей перехватывает клики по остальной странице; целевой элемент остаётся видимым в вырезе.

### Слоты подсказки

Каждый элемент `steps[i]` собирается из:

- `title` — заголовок шага.
- `subtitle` — подзаголовок под заголовком.
- `content` — тело шага.
- `target` — целевой элемент: CSS-селектор, DOM-нода, ref или геттер.

Все слоты необязательные, кроме `target`. Индикатор прогресса появляется автоматически, когда шагов больше одного, и остаётся неинтерактивным — он показывает позицию в туре, навигация идёт кнопками.

`showStepIndicator={false}` убирает индикатор вместе с озвучкой позиции для скринридера. Это нужно туру, у которого длина неизвестна заранее: шаг с ненайденной целью тур пропускает на лету (адаптив скрыл блок, раздел недоступен по правам), а пересчитать общее число он не может — «2 из 5» тогда врёт. Когда все шаги гарантированно доступны, индикатор оставляют: он показывает, сколько ещё идти.

### Placement (default `bottom`)

`steps[i].placement` задаёт положение подсказки относительно целевого элемента: `top`, `bottom`, `left`, `right` и их варианты `-start` / `-end`, а также `auto` (сторона подбирается автоматически) и `center` (подсказка по центру экрана — для шага без привязки к элементу). Если выбранной стороне не хватает места, подсказка разворачивается на противоположную.

### Кнопки (default `['back', 'primary', 'skip']`)

Проп `buttons` перечисляет, какие кнопки показывает подсказка:

- `back` — «Назад»; на первом шаге скрывается автоматически.
- `primary` — «Далее», на последнем шаге — кнопка завершения.
- `skip` — кнопка закрытия в шапке подсказки, завершает тур досрочно.

Подписи берутся из locale пакета и переопределяются пропом `labels` (весь тур) либо `steps[i].labels` (один шаг). Escape завершает тур целиком, как у остальных оверлеев ДС; пока тур открыт, Tab ходит по кругу внутри подсказки.

## Установка

```bash
pnpm add @ds/uikit-product-welcome-tour
```

```ts
import { TOUR_BUTTON, TOUR_PLACEMENT, WelcomeTour } from '@ds/uikit-product-welcome-tour';
```

## Примеры использования

### Базовое использование

Тур из двух шагов, целевые элементы задаются ref-ами.

```tsx
import { Button } from '@ds/button';
import { WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function Basic() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={searchRef}>Поиск</span>

      <Button label='Запустить тур' appearance='neutral' view='outline' onClick={() => setOpen(true)} />

      <WelcomeTour
        open={open}
        onOpenChange={setOpen}
        steps={[
          {
            target: menuRef,
            title: 'Меню разделов',
            subtitle: 'Навигация по проекту',
            content: 'Отсюда открываются все разделы: ресурсы, биллинг и настройки.',
          },
          {
            target: searchRef,
            title: 'Поиск',
            content: 'Ищет по ресурсам проекта и открывает найденное в текущем разделе.',
          },
        ]}
      />
    </div>
  );
}
```

### Управляемый режим

`open` и `stepIndex` живут во внешнем состоянии — тур запускается с произвольного шага.

```tsx
import { Button } from '@ds/button';
import { TourStep, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function Controlled() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: TourStep[] = [
    { target: menuRef, title: 'Меню разделов', content: 'Первый шаг тура.' },
    { target: searchRef, title: 'Поиск', content: 'Второй шаг тура.' },
  ];

  const start = (index: number) => {
    setStepIndex(index);
    setOpen(true);
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={searchRef}>Поиск</span>

      <Button label='С первого шага' appearance='neutral' view='outline' onClick={() => start(0)} />
      <Button label='Со второго шага' appearance='neutral' view='outline' onClick={() => start(1)} />

      <span>Текущий шаг: {stepIndex + 1}</span>

      <WelcomeTour open={open} stepIndex={stepIndex} steps={steps} onOpenChange={setOpen} onStepChange={setStepIndex} />
    </div>
  );
}
```

### Свои подписи кнопок

`labels` переопределяет дефолты из locale, `steps[i].labels` — подписи одного шага.

```tsx
import { Button } from '@ds/button';
import { WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function CustomLabels() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const billingRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={billingRef}>Биллинг</span>

      <Button label='Запустить тур' appearance='neutral' view='outline' onClick={() => setOpen(true)} />

      <WelcomeTour
        open={open}
        onOpenChange={setOpen}
        // Подписи всего тура: переопределяют дефолты из locale.
        labels={{ next: 'Дальше', back: 'Назад', finish: 'Всё понятно' }}
        steps={[
          { target: menuRef, title: 'Меню разделов', content: 'Навигация по проекту.' },
          {
            target: billingRef,
            title: 'Биллинг',
            content: 'Расходы проекта и настройки оплаты.',
            // Подписи одного шага: переопределяют `labels` компонента.
            labels: { finish: 'Перейти в биллинг' },
          },
        ]}
      />
    </div>
  );
}
```

### Тур без кнопки «Назад»

`buttons` без `back` — линейный сценарий, только вперёд.

```tsx
import { Button } from '@ds/button';
import { TOUR_BUTTON, WelcomeTour } from '@ds/uikit-product-welcome-tour';
import { useRef, useState } from 'react';

export function WithoutBackButton() {
  const menuRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span ref={menuRef}>Меню</span>
      <span ref={searchRef}>Поиск</span>

      <Button label='Запустить тур' appearance='neutral' view='outline' onClick={() => setOpen(true)} />

      <WelcomeTour
        open={open}
        // Набор кнопок подсказки: без `back` тур идёт только вперёд.
        buttons={[TOUR_BUTTON.Primary, TOUR_BUTTON.Skip]}
        onOpenChange={setOpen}
        steps={[
          { target: menuRef, title: 'Меню разделов', content: 'Первый шаг.' },
          { target: searchRef, title: 'Поиск', content: 'Последний шаг — кнопки «Назад» нет.' },
        ]}
      />
    </div>
  );
}
```

## Props

**WelcomeTourProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttons` | `TourButton` | `[TOUR_BUTTON.Back, TOUR_BUTTON.Primary, TOUR_BUTTON.Skip]` | Набор кнопок подсказки. |
| `defaultOpen` | `boolean` | `false` | Запущен ли тур изначально. Неуправляемый режим. |
| `defaultStepIndex` | `number` | `0` | Индекс шага, с которого начинается тур. Неуправляемый режим. |
| `labels` | `TourLabels` | — | Подписи кнопок. Переопределяют значения из locale. |
| `onOpenChange` | `((open: boolean, status: TourStatus) => void)` | — | Колбек смены состояния тура. Вторым аргументом приходит статус, с которым тур завершился. |
| `onStepChange` | `((index: number) => void)` | — | Колбек смены шага. <br/> В неуправляемом режиме сообщает об уже случившемся переходе — в том числе о показе <br/> первого шага при запуске тура. В управляемом (когда задан `stepIndex`) это запрос на <br/> переход: компонент сам шаг не меняет, новый индекс обязан применить потребитель — <br/> иначе тур остановится на текущем шаге. |
| `open` | `boolean` | — | Запущен ли тур. Управляемый режим. |
| `portalContainer` | `HTMLElement \| null` | — | Контейнер для портала. По умолчанию — контейнер из `PortalContextProvider` либо `document.body`. |
| `scrollOffset` | `number` | `20` | Отступ при скролле к целевому элементу, px. |
| `showStepIndicator` | `boolean` | `true` | Показывать ли индикатор прогресса. Он и так появляется только у тура длиннее одного <br/> шага; `false` убирает его вместе с озвучкой позиции для скринридера — это нужно там, <br/> где часть шагов может отвалиться на лету (цели нет на странице, шаг пропускается), <br/> и «2 из 5» окажется неправдой. |
| `spotlightPadding` | `TourSpotlightPadding` | `10` | Отступ выреза от границ целевого элемента для всех шагов. Шаг переопределяет своим <br/> `spotlightPadding`. |
| `stepIndex` | `number` | — | Индекс текущего шага. Управляемый режим. |
| `steps` | `TourStep` | — | Шаги тура. |

#### Related types

- `TourButton` = `"back"` \| `"primary"` \| `"skip"`

**TourLabels**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `back` | `string` | — | Кнопка возврата к предыдущему шагу. |
| `close` | `string` | — | Кнопка-крестик в шапке подсказки. |
| `finish` | `string` | — | Кнопка на последнем шаге. |
| `next` | `string` | — | Кнопка перехода к следующему шагу. |

- `TourPlacement` = `"auto"` \| `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"center"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"`

- `TourSpotlightPadding` = `number | { top?: number; right?: number; bottom?: number; left?: number; }`

**TourStep**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Тело шага. |
| `labels` | `TourLabels` | — | Подписи кнопок для этого шага. Переопределяют `labels` компонента. |
| `onBeforeShow` | `(() => Promise<void>) \| undefined` | — | Хук перед показом шага. Тур ждёт разрешения промиса и до тех пор шаг не показывает — <br/> этим дожидаются анимации и появления целевого элемента (открытие меню, смена таба). <br/> Ожидание ограничено `beforeTimeout` движка (5с); после таймаута шаг пропускается. |
| `onFinish` | `(() => void) \| undefined` | — | Колбек ухода с шага. Вызывается на любом переходе — «Далее», «Назад», а также при <br/> закрытии тура с этого шага. Для отметки «шаг пройден» этого недостаточно: сверяйся <br/> со статусом из `onOpenChange`. |
| `placement` | `"auto"` \| `"bottom"` \| `"bottom-end"` \| `"bottom-start"` \| `"center"` \| `"left"` \| `"left-end"` \| `"left-start"` \| `"right"` \| `"right-end"` \| `"right-start"` \| `"top"` \| `"top-end"` \| `"top-start"` | — | Положение подсказки относительно целевого элемента. |
| `spotlightPadding` | `TourSpotlightPadding` | — | Отступ выреза от границ целевого элемента. Переопределяет `spotlightPadding` компонента. |
| `spotlightTarget` | `TourTarget` | — | Элемент, который подсвечивает вырез, если он не совпадает с `target`. Подсказка <br/> остаётся прикреплённой к `target`: так крупный блок подсвечивается целиком, а <br/> подсказка цепляется за компактный якорь внутри него и не выходит за вьюпорт. <br/> Список целей подсвечивается одним вырезом по их общей области — этим собирают <br/> кнопку и раскрытый под ней список, которые в DOM лежат в разных поддеревьях. <br/> Каждый селектор берётся целиком: `querySelectorAll`, а не первый совпавший узел. |
| `subtitle` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подзаголовок под заголовком. |
| `target` | `TourTarget` | — | Целевой элемент, вокруг которого подсвечивается вырез и к которому крепится подсказка. |
| `title` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Заголовок шага. |
| `width` | `string \| number \| undefined` | — | Ширина подсказки, px или CSS-значение. По умолчанию подсказка растёт по содержимому <br/> до 480px; сужение нужно, когда сбоку от цели меньше места и подсказка иначе <br/> перекидывается движком на другую сторону. |

- `TourTarget` = `string | HTMLElement | RefObject<HTMLElement | null> | (() => HTMLElement | null)`

## Смотри также

- **HotSpot** — точка привлечения внимания к элементу без пошагового сценария.
- **Popover** — всплывающий слой рядом с триггером.
- **Tooltip** — короткая подсказка по наведению.
## Do / Don't

- ✅ Один тур на сценарий: 3–5 шагов вокруг ключевых элементов раздела.
- ❌ Тур на 12 шагов через весь интерфейс — такой редко проходят до конца.
- ✅ Запускать тур один раз и запоминать факт прохождения на стороне приложения (`onOpenChange` со статусом `finished` / `skipped`).
- ❌ Показывать тур при каждом входе в раздел — он становится модальным препятствием.
- ✅ Привязывать шаг к элементу, который уже отрисован и виден.
- ❌ Указывать `target` на элемент за пределами вьюпорта или появляющийся асинхронно — шаг не найдёт цель.
- ✅ Формулировать шаг одним действием: что это и зачем нажимать.
- ❌ Складывать в `content` абзац справки — для этого есть документация раздела.
- ✅ Скрывать индикатор (`showStepIndicator={false}`), если часть шагов может оказаться недоступной.
- ❌ Показывать «2 из 5» туру, который на узком экране проходит за три шага.
- ✅ Оставлять `skip`: пользователь должен уметь выйти в любой момент.
- ❌ Делать тур безвыходным (`buttons` только с `primary`) в обязательном онбординге.

## Адаптивность

> **Только desktop.** Компонент не читает раскладку из **`@ds/adaptive`** и отдельной mobile-поверхности не получит: пошаговый онбординг — сценарий десктопного интерфейса. Подсказка и полноэкранный оверлей одинаковы на всех разрешениях.

Что это значит на практике:

- Ширина подсказки ограничена сверху и на узком экране занимает почти всю его ширину.
- Оверлей и вырез вокруг целевого элемента считаются от вьюпорта и работают на любом размере, но подсказка рядом с мелким элементом может не поместиться на выбранной стороне — движок развернёт её на противоположную.
- `layoutPresets` у компонента нет: пропы применяются одинаково на всех раскладках, `AdaptiveProvider` на тур не влияет.

Если раздел открывают преимущественно с телефона, тур там лучше не запускать: решение о показе принимает приложение, и оно же хранит состояние прохождения.
