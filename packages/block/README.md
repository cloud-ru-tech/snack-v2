# Block

`@ds/block` — Слот-поверхность с акриловым фоном (матовое/полупрозрачное стекло) для композиции содержимого на разных подложках.

`Block` — универсальный контейнер-слот с акриловой подложкой (backdrop-blur). Подходит для плавающих панелей, карточек над изображением, оверлеев и всплывающих блоков, где нужно сохранить читаемость контента на любом фоне.

## Когда использовать
- Плавающие карточки или панели поверх фоновых изображений.
- Модальные и всплывающие поверхности, где важна глубина.
- Любой контент, который нужно визуально отделить от сложного фона без использования сплошного цвета.

Когда **не** нужен `Block`: для обычных блоков на плоском фоне используйте свёрстанную карточку без акрилового эффекта — Block заметно дороже по отрисовке.

## Анатомия

### View (default `simple`)
Способ визуального отделения поверхности:

- `simple` — только акриловая подложка, без рамки и тени.
- `outline` — с контурной рамкой.
- `elevated` — с тенью для подъёма над фоном (`l` берёт `elevation-level2`, `m`/`s` — `level1`).

### BackgroundPredefined (default `neutralBackground1Level`)
Палитра подложки — тот же набор, что у слота `backgroundPredefined` в Figma (`BACKGROUND_PREDEFINED_FILL` из `@ds/materials`):

- цветные заливки — `primaryBackground`, `neutralBackground1Level`, `redBackground`, `orangeBackground`, `yellowBackground`, `greenBackground`, `blueBackground`, `violetBackground`, `pinkBackground`;
- `decorTransparent` — полупрозрачная декоративная подложка;
- `transparent` — без заливки, остаётся только blur.

Ось независима от `view`: рамка и тень комбинируются с любой подложкой.

### Size
Плотность внутренних отступов и радиуса скругления: `s` — компактный (нестед-карточки, попсайды), `m` — дефолт, `l` — крупные карточки и модальные поверхности.

## Установка
```bash
pnpm add @ds/block
```

```ts
import { Block, SIZE, VIEW } from '@ds/block'
```

## Примеры использования
### Базовое использование

```tsx
import { Block } from '@ds/block';

export function Basic() {
  return (
    <Block>
      <span>Your content here</span>
    </Block>
  );
}
```

### С обводкой и большим размером

```tsx
import { Block } from '@ds/block';

export function OutlineLarge() {
  return (
    <Block view='outline' size='l'>
      <span>Outline size L</span>
    </Block>
  );
}
```

### Прозрачное матовое стекло

```tsx
import { Block } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

export function Transparent() {
  return (
    <Block backgroundPredefined={BACKGROUND_PREDEFINED_FILL.DecorTransparent} size='m'>
      <span>Transparent</span>
    </Block>
  );
}
```

### Палитра подложек

Цвет фона задаётся `backgroundPredefined`, не `view`.

```tsx
import { Block } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

const FILLS = [
  BACKGROUND_PREDEFINED_FILL.PrimaryBackground,
  BACKGROUND_PREDEFINED_FILL.GreenBackground,
  BACKGROUND_PREDEFINED_FILL.YellowBackground,
  BACKGROUND_PREDEFINED_FILL.RedBackground,
  BACKGROUND_PREDEFINED_FILL.VioletBackground,
] as const;

export function BackgroundPalette() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {FILLS.map(fill => (
        <Block key={fill} backgroundPredefined={fill} size='m'>
          <span>{fill}</span>
        </Block>
      ))}
    </div>
  );
}
```

## Props
**BlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | `neutralBackground1Level` | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> Задаёт палитру подложки: цвета, `transparent` и `decorTransparent`. <br/> По умолчанию `material/neutralBackground1Level`. |
| `children` | `ReactNode` | — | Содержимое |
| `contentClassName` | `string` | — | Класс на внутренний слот содержимого (`.content`). Block — подложка, а не layout-контейнер <br/> (`display: block`); раскладку контента задаёт потребитель. Этот проп даёт управлять слотом <br/> содержимого напрямую — напр. растянуть его по высоте блока (`flex`/`height`), когда корень <br/> блока сделан flex-контейнером через `className`. |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `view` | `"elevated"` \| `"outline"` \| `"simple"` | `simple` | Визуальный режим поверхности |

#### Related types

- `Size` = `"l"` \| `"m"` \| `"s"`

- `View` = `"elevated"` \| `"outline"` \| `"simple"`
