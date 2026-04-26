# Icons

`@ds/icons` — Наборы интерфейсных иконок React и компонент Sprite для SVG-спрайтов.

Пакет экспортирует сгенерированные компоненты `*SVG` / `*SpriteSVG` и вспомогательный [`Sprite`](./props.json) для подключения спрайтов. Цвет наследуется через `currentColor`.

## Установка

```bash
pnpm add @ds/icons
```

```ts
import { SearchSVG, Sprite, SpriteSnackIconsSVG } from '@ds/icons'
```

Для режима **sprite** сначала отрендерьте скрытый блок со спрайтом, затем используйте иконки с `<use href="#id">` внутри.

## Sprite

<PropsTable data={iconsDoc.Sprite} />

Отдельные иконки (`SearchSVG` и др.) используют тип `ISvgIconProps` (`className`, `size`, атрибуты SVG) — см. `packages/icons/src/types.ts`.

## Sprite

```tsx
import { Sprite } from '@ds/icons'

export function Example() {
  return <Sprite>Click me</Sprite>
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — |  |
| `data-test-id` | `string` | — |  |
