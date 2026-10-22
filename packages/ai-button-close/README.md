# AiButtonClose

`@ds/ai-button-close` — Кнопка-крестик для закрытия блока или удаления вложения в AI-компонентах.

`AiButtonClose` — кнопка-крестик из набора AI Components. Сообщает о нажатии через `onClick`; закрыть блок или удалить вложение решает потребитель.

## Когда использовать

- Крестик плитки вложения в поле ввода.
- Крестик закрытия баннера над полем ввода.

### Когда не нужен

- Кнопка с текстом или иконкой другого действия:
  - используйте `@ds/button`.
- Стрелка прокрутки или листания:
  - используйте `@ds/ai-button-controls`.

## Анатомия

Кнопка состоит из иконки крестика и, в наборах с подложкой, рамки с обводкой. Текста нет.

### Size (default `s`)

- `xs` — 16×16, только с подложкой. Крестик плитки вложения на desktop.
- `s` — 24×24, с подложкой или без. С подложкой — крестик плитки вложения на mobile, без подложки — крестик баннера на desktop.
- `m` — 32×32, без подложки. Крестик баннера на mobile.

### Outline (default `false`)

`outline` добавляет подложку с тонкой обводкой, она лежит внутри кнопки и не меняет её размер. У `xs` подложка есть всегда, у `m` её нет даже при `outline`; несуществующее в макете сочетание компонент выправляет сам.

На устройствах с наведением крестик в покое окрашен вторичным цветом текста, при наведении — основным; подложка при наведении светлеет. На сенсорных экранах состояния наведения нет. Фокус с клавиатуры показывается акцентной обводкой.

Доступное имя по умолчанию — «Закрыть» (`Close`) из локали пакета. Если крестик удаляет конкретный объект, передайте `aria-label` с его названием.

## Установка

```bash
pnpm add @ds/ai-button-close
```

```ts
import { AiButtonClose } from '@ds/ai-button-close'
```

## Примеры использования

### Наборы

Четыре набора из макета: outline xs, outline s, s, m

```tsx
import { AiButtonClose, SIZE } from '@ds/ai-button-close';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiButtonClose size={SIZE.Xs} outline />
      <AiButtonClose size={SIZE.S} outline />
      <AiButtonClose size={SIZE.S} />
      <AiButtonClose size={SIZE.M} />
    </div>
  );
}
```

### Закрытие блока

Крестик скрывает блок, состояние хранит родитель

```tsx
import { AiButtonClose } from '@ds/ai-button-close';
import { Button } from '@ds/button';
import { useState } from 'react';

export function Dismiss() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать снова' onClick={() => setVisible(true)} />;
  }

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span>Блок можно закрыть крестиком</span>
      <AiButtonClose onClick={() => setVisible(false)} />
    </div>
  );
}
```

### Доступное имя

aria-label с названием удаляемого файла

```tsx
import { AiButtonClose, SIZE } from '@ds/ai-button-close';
import { Fragment, useState } from 'react';

export function CustomLabel() {
  const [files, setFiles] = useState(['report.pdf', 'photo.png']);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {files.map(file => (
        <Fragment key={file}>
          <span>{file}</span>
          <AiButtonClose
            size={SIZE.Xs}
            outline
            aria-label={`Удалить ${file}`}
            onClick={() => setFiles(prev => prev.filter(name => name !== file))}
          />
        </Fragment>
      ))}
    </div>
  );
}
```

## Props

**AiButtonCloseProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-button-close` |  |
| `disabled` | `boolean` | `false` | Блокирует нажатие. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие на крестик. Что происходит после нажатия, решает потребитель. |
| `outline` | `boolean` | `false` | Подложка с обводкой. У `xs` включена всегда, у `m` не применяется. По умолчанию `false`. |
| `size` | `"m"` \| `"s"` \| `"xs"` | `s` | Размер: `xs` 16×16, `s` 24×24, `m` 32×32. По умолчанию `s`. |

#### Related types

- `Size` = `"m"` \| `"s"` \| `"xs"`
