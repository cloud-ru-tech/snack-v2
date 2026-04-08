# Timeline

Пакет содержит публичный компонент **Timeline** (лента шагов) и внутренний **TrackItem** (строка пункта с колонкой маркера и линиями). API и поведение согласованы с `@snack-uikit/timeline`; стилизация — через `@sbercloud/figma-variables`.

## Installation

```bash
npm install @design-system/timeline
# or
yarn add @design-system/timeline
# or
pnpm add @design-system/timeline
```

## Exports



## Live examples

### Базовый таймлайн

```tsx
import { TimelineBasicExample } from '@design-system/timeline';

<TimelineBasicExample client:load />
```

### Alternate

```tsx
import { TimelineAlternateExample } from '@design-system/timeline';

<TimelineAlternateExample client:load />
```

### Full width

```tsx
import { TimelineFullWidthExample } from '@design-system/timeline';

<TimelineFullWidthExample client:load />
```

### Базовый пункт

```tsx
import { TrackItemBasicExample } from '@design-system/timeline';

<TrackItemBasicExample client:load />
```

### С колонкой opposite

```tsx
import { TrackItemWithOppositeExample } from '@design-system/timeline';

<TrackItemWithOppositeExample client:load />
```


## Usage

### Базовый пример

```tsx
import { Typography } from '@design-system/typography';
import { Timeline } from '@design-system/timeline';

export function Example() {
  return (
    <Timeline
      items={[
        {
          content: (
            <>
              <Typography variant='title' size='m'>
                Шаг 1
              </Typography>
              <Typography variant='body' size='m'>
                Описание
              </Typography>
            </>
          ),
          dotAppearance: 'primary',
        },
        {
          content: (
            <>
              <Typography variant='title' size='m'>
                Шаг 2
              </Typography>
              <Typography variant='body' size='m'>
                Ещё текст
              </Typography>
            </>
          ),
          lineStyle: 'dashed',
        },
      ]}
    />
  );
}
```

### Чередование и полная ширина

```tsx
<Timeline items={items} alternate contentPosition="right" />
<Timeline items={items} fullWidth />
```

### Пункт с под-событием и цветом точки

```tsx
<Timeline
  items={[
    {
      content: <>{/* ... */}</>,
      lineStyle: 'dashed',
      dotVariant: 'subEvent',
      dotAppearance: 'red',
    },
  ]}
/>
```

## Props

### TimelineProps
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `TimelineItem[]` | - | Пункты таймлайна |
| contentPosition | enum Position: `"right"`, `"left"` | right | Положение контента |
| alternate | `boolean` | - | Перемешать положение контента |
| fullWidth | `boolean` | - | Сделать таймлайн во всю ширину |
| className | `string` | - | CSS-класс для элемента с контентом |

## Best Practices

1. **Стабильные ключи** — в текущей реализации список рендерится с `key={index}`; при динамической перестановке пунктов рассмотрите обёртку со своими ключами на стороне продукта.
2. **Длинный текст** — допускается многострочный `content`; высота строки задаётся контентом, трек растягивается по высоте строки.
3. **Один пункт** — линии между шагами скрываются (`showLines` внутри выключается), остаётся только маркер.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
