# Block

`@ds/block` — Слот-поверхность с акриловым фоном (матовое/полупрозрачное стекло) для композиции содержимого на разных подложках.

`Block` — универсальный контейнер-слот с акриловой подложкой (backdrop-blur). Подходит для плавающих панелей, карточек над изображением, оверлеев и всплывающих блоков, где нужно сохранить читаемость контента на любом фоне.

## Когда использовать
- Плавающие карточки или панели поверх фоновых изображений.
- Модальные и всплывающие поверхности, где важна глубина.
- Любой контент, который нужно визуально отделить от сложного фона без использования сплошного цвета.

Когда **не** нужен `Block`: для обычных блоков на плоском фоне используйте свёрстанную карточку без акрилового эффекта — Block заметно дороже по отрисовке.

## Анатомия

### Variant
Способ визуального отделения поверхности: `simple` — сплошная заливка, `outline` — с контурной рамкой, `shadow` — с тенью для подъёма над фоном, `transparent` — только акриловый эффект без заливки.

### Size
Плотность внутренних отступов и радиуса скругления: `s` — компактный (нестед-карточки, попсайды), `m` — дефолт, `l` — крупные карточки и модальные поверхности.

## Установка
```bash
pnpm add @ds/block
```

```ts
import { Block, SIZE, VARIANT } from '@ds/block'
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
    <Block variant='outline' size='l'>
      <span>Outline size L</span>
    </Block>
  );
}
```

### Прозрачное матовое стекло

```tsx
import { Block } from '@ds/block';

export function Transparent() {
  return (
    <Block variant='transparent' size='m'>
      <span>Transparent</span>
    </Block>
  );
}
```

## Props
**BlockProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundPredefined` | `"blueBackground"` \| `"decorTransparent"` \| `"greenBackground"` \| `"neutralBackground1Level"` \| `"orangeBackground"` \| `"pinkBackground"` \| `"primaryBackground"` \| `"redBackground"` \| `"transparent"` \| `"violetBackground"` \| `"yellowBackground"` | `neutralBackground1Level` | Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`). <br/> По умолчанию `material/neutralBackground1Level`. |
| `children` | `ReactNode` | — | Содержимое |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подзаголовок |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `variant` | `"outline"` \| `"shadow"` \| `"simple"` \| `"transparent"` | `simple` | Вариант |
