# SCSS — стандарт стилей компонента

**Область действия:** `packages/*/src/**/*.module.scss`. Правило действует всегда.

Эталоны:

- [`packages/counter/src/styles.module.scss`](../../packages/counter/src/styles.module.scss) — несколько осей (`size`, `appearance`, `color`), map-алиас `appearance → theme` (`critical → red`), вложенные `@each`, `composite-var` для типографики.
- [`packages/link/src/styles.module.scss`](../../packages/link/src/styles.module.scss) — две независимые оси (`role`, `appearance`) списками, цикл по полному набору значений из `constants.ts`.
- [`packages/segment-control/src/helperComponents/Segment/styles.module.scss`](../../packages/segment-control/src/helperComponents/Segment/styles.module.scss) — один цикл по `size` с `simple-var` для размеров/радиусов и `composite-var` для типографики.

## Принцип

Стили компонента — это проекция Figma-токенов на DOM-атрибуты `data-*`. Любая ось, существующая в API (`size`, `appearance`, `view`, …), не должна разворачиваться в копипаст-блоки `&[data-axis='value'] { … }` и не должна содержать сырых числовых литералов (`1px`, `2px`, `0.5px`, hex, rgba). И того и другого избегаем по двум причинам: (1) хардкод обходит дизайн-токены и ломается при ребрендинге, (2) копипаст осей раздувает файл и расходится с реальным набором значений в `constants.ts`.

## Запрет: хардкод числовых значений

В `*.module.scss` запрещены:

- `1px`, `2px`, `0.5px`, `1.5px`, `3px` и любые другие пиксельные литералы для `border-width` / `outline-width` / `stroke-width`. Используй `base.$sn-primitive-strokeWeight-stroke{Thin,Regular,Medium,SemiBold,Bold}`.
- **`rem` / `em` литералы для размеров, отступов, радиусов, gap'ов** (`gap: 0.5rem`, `padding: 1rem`, `inset: 0.25rem`, `top: 1.5rem`, `border-radius: 0.75rem`, `width: 2em`). Это тот же хардкод, что и `px` — обходит дизайн-токены и привязывает раскладку к `font-size` корня вместо шкалы DS. Любую размерную величину бери из токенов: `base.$sn-primitive-dimension-*`, `base.simple-var(...)`, `base.$sn-brand-anatomy-*`. Если кажется, что подходящего токена нет — уточни у дизайнера, не подставляй «на глаз» `rem`.
- Литеральные радиусы (`border-radius: 8px`). Используй `base.simple-var(<component>.$<component>, 'anatomy', …, 'border-radius')` либо `base.$sn-brand-anatomy-radius-*`.
- Сырые цвета (`#fff`, `rgba(0,0,0,.5)`). Используй `base.$sn-theme-color-*`.
- Литеральные spacing/padding/gap. Используй токены `base.simple-var(...)` пакета или `base.$sn-brand-anatomy-*`.
- Литеральные opacity для disabled (`opacity: 0.4`). Используй `base.$sn-theme-effect-opacity-disabled`.

Допустимые числовые литералы — только то, что не имеет токена и не является дизайн-параметром: `0`, `100%`, `inherit`, `transparent`, durations/timings (`0.15s`, `ease-in-out`), `z-index: 0|1`. Безразмерные `line-height` (`1.5`) и `1fr`/`auto` в grid — тоже ок; `rem`/`em` под исключения **не** попадают.

```scss
// ❌ Плохо
&[data-outline] {
  border: 1px solid base.$sn-theme-color-available-borderColor;
  border-radius: 8px;
}

// ✅ Хорошо
&[data-outline] {
  border: base.$sn-primitive-strokeWeight-strokeRegular solid base.$sn-theme-color-available-borderColor;
  border-radius: base.simple-var(component.$component, 'anatomy', 'size', $size, 'container', 'border-radius');
}
```

## Запрет: копипаст по `data-size` / `data-axis`

Повторяющиеся блоки `&[data-axis='value'] { … }` сворачиваются в `@each` по карте значений. Карта объявляется в начале файла и совпадает с осью в `constants.ts`.

```scss
// ❌ Плохо — четыре одинаковых блока
&[data-size='s'] {
  padding: segmentControl.$sn-segmentControl-anatomy-size-s-container-borderWidth;
  border-radius: segmentControl.$sn-segmentControl-anatomy-size-s-container-borderRadius;
}
&[data-size='m'] { /* то же с m */ }
&[data-size='l'] { /* то же с l */ }
&[data-size='xs'] { /* то же с s — алиас */ }

// ✅ Хорошо — карта + цикл
$sizes: (
  's': 's',
  'm': 'm',
  'l': 'l',
  'xs': 's', // алиас на токены s
);

@each $size, $tokenSize in $sizes {
  &[data-size='#{$size}'] {
    padding: base.simple-var(component.$component, 'anatomy', 'size', $tokenSize, 'container', 'border-width');
    border-radius: base.simple-var(component.$component, 'anatomy', 'size', $tokenSize, 'container', 'border-radius');
  }
}
```

Форма карты:

- **`$sizes: ('s', 'm', 'l')`** (список) — если все значения оси один-в-один соответствуют именам токенов.
- **`$sizes: ('s': 's', 'xs': 's', …)` (map)** — если есть алиасы (значение API → имя токена) или нужны разные ключи. Перебирается через `@each $key, $tokenKey in $sizes`.

Те же правила — для любой оси: `data-appearance`, `data-view`, `data-variant`. Имя переменной — множественное число оси (`$appearances`, `$views`).

## Когда копипаст оправдан

Цикл не нужен, если:

- Ось имеет ровно одно значение, для которого пишутся стили (тогда и `data-axis` лишний).
- Каждое значение оси даёт **существенно различающийся** набор свойств (не одно и то же свойство с разным токеном). Например, `appearance='critical'` меняет `color` + `background`, а `appearance='primary'` меняет только `background` — это два разных блока, цикл их не упрощает.
- Стиль зависит **сразу от двух осей** и реально различается в каждой комбинации — в этом случае допускается вложенный цикл, либо явные блоки, если их 2–3.

В сомнительных случаях ориентир — `Segment/styles.module.scss`: общие свойства внутри `@each $size in $sizes`, специфика — отдельными `&[data-…]` снаружи цикла.

## Несколько осей и алиасы

Если стиль зависит от двух осей одновременно — вложенные `@each`. Если значение API не совпадает с именем токена (исторический mismatch, ребрендинг) — карта-алиас и `base.simple-var($map, $apiValue)` для разворота.

```scss
// counter/src/styles.module.scss
$contexts: 'primary', 'neutral', 'critical';
$appearance-to-theme: (
  'primary': 'primary',
  'neutral': 'neutral',
  'critical': 'red',           // appearance=critical → токены theme.red.*
);
$roleColors: 'accent', 'decor';

@each $roleColor in $roleColors {
  @each $appearance in $contexts {
    $token: base.simple-var($appearance-to-theme, $appearance);

    &[data-color='#{$roleColor}'][data-appearance='#{$appearance}'] {
      color: base.simple-var(base.$sn-theme, 'color', $token, /* … */);
    }
  }
}
```

Карты-алиасы — единственный канонический способ зашить «Figma-typo-мост» и ребрендинговые расхождения, см. [figma-integration.md](./figma-integration.md). Не дублируй карту в `.tsx` — она живёт только в SCSS, потому что там и применяется.

Для типографики/композитных токенов — `composite-var` вместо `simple-var`, как в `Segment.textWrapper` и `counter`:

```scss
$typography: (
  xs: base.$sn-regular-label-s,
  s: base.$sn-regular-label-l,
);

@each $size in $sizes {
  &[data-size='#{$size}'] {
    @include base.composite-var($typography, $size);
  }
}
```

## Чек-лист перед коммитом SCSS

- [ ] Нет литералов `1px` / `2px` / `0.5px` / `1.5px` / `3px` — заменены на `base.$sn-primitive-strokeWeight-stroke*`.
- [ ] Нет `rem` / `em` литералов в размерах/отступах/радиусах/gap'ах — через `base.$sn-primitive-dimension-*` / `base.simple-var(...)` / `base.$sn-brand-anatomy-*`.
- [ ] Нет hex/rgba — заменены на `base.$sn-theme-color-*`.
- [ ] Нет литеральных `border-radius` / `padding` / `gap` — через `base.simple-var(...)` или `base.$sn-brand-anatomy-*`.
- [ ] Нет литерального `opacity` для disabled — `base.$sn-theme-effect-opacity-disabled`.
- [ ] Нет 2+ одинаковых по форме блоков `&[data-axis='…']` — свёрнуты в `@each` по карте.
- [ ] Карта значений оси соответствует `constants.ts` пакета (включая алиасы вроде `xs` → токены `s`).
- [ ] `composite-var` / `simple-var` пути совпадают с реальной структурой токенов в `node_modules/@sbercloud/figma-variables/build/scss/components/<component>.module.scss`.

## Связанное

- [figma-to-code.md](./figma-to-code.md) — мапинг hex/rgba и focusedFrame на токены и `:focus-visible`.
- [component-api-surface.md](./component-api-surface.md) — оси API в `constants.ts`, на которые ссылается карта в SCSS.
- [package-src-structure.md](./package-src-structure.md) — где живёт `styles.module.scss`.
