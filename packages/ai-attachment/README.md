# AiAttachment

`@ds/ai-attachment` — Плитка вложения 88×88 для AI-компонентов — картинка с превью или файл с именем, загрузка и ошибка.

`AiAttachment` — плитка одного вложения фиксированного размера 88×88. Показывает картинку с превью или файл с именем и сообщает о трёх событиях отдельно: нажатие крестика (`onRemove`), повтора загрузки (`onRetry`) и самой плитки (`onClick`). Лимиты количества и размера файлов плитка не хранит: превышение потребитель показывает состоянием `error`.

## Когда использовать

- Ряд вложений в поле ввода сообщения (`@ds/ai-field-input`).
- Вложения в сообщениях ленты и других местах, где нужен единый вид файла.

### Когда не нужен

- Карточка файла с названием, описанием и скачиванием:
  - используйте `@ds/attachment`.

## Анатомия

Плитка состоит из контейнера, крестика в правом верхнем углу и, по состоянию, индикатора загрузки или кнопки повтора в центре.

### Type (default `image`)

- `image` — превью картинки заливкой контейнера, без имени.
- `file` — иконка типа (`icon`, по умолчанию файл) и имя, обрезанное посередине.

### State (default `default`)

- `default` — непрозрачный контейнер.
- `loading` — полупрозрачный контейнер и индикатор загрузки.
- `error` — красная обводка и кнопка повтора; у файла имя окрашено красным.

### Раскладка

Плитка закреплена на платформе webDesktop на обеих раскладках: размер 88×88 не меняется.

- Desktop — крестик `xs` появляется сразу при наведении или фокусе, подсказка (`tooltip`) — через 300 мс после наведения.
- Mobile — крестик `s` виден всегда, подсказки нет.

## Установка

```bash
pnpm add @ds/ai-attachment
```

```ts
import { AiAttachment } from '@ds/ai-attachment'
```

## Примеры использования

### Состояния

Default, Loading и Error

```tsx
import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';

export function States() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiAttachment type={ATTACHMENT_TYPE.File} fileName='quarterly-report-final.pdf' tooltip='PDF, 2 МБ' />
      <AiAttachment type={ATTACHMENT_TYPE.File} state={ATTACHMENT_STATE.Loading} fileName='budget.xlsx' />
      <AiAttachment
        type={ATTACHMENT_TYPE.File}
        state={ATTACHMENT_STATE.Error}
        fileName='notes.txt'
        tooltip='Файл больше 20 МБ'
      />
    </div>
  );
}
```

### Удаление и повтор

Крестик удаляет плитку, повтор снимает ошибку

```tsx
import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { useState } from 'react';

export function RemoveAndRetry() {
  const [files, setFiles] = useState(['report.pdf', 'budget.xlsx', 'notes.txt']);
  const [failed, setFailed] = useState('budget.xlsx');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {files.map(file => (
        <AiAttachment
          key={file}
          type={ATTACHMENT_TYPE.File}
          state={file === failed ? ATTACHMENT_STATE.Error : ATTACHMENT_STATE.Default}
          fileName={file}
          tooltip={file === failed ? 'Не удалось загрузить' : file}
          onRemove={() => setFiles(prev => prev.filter(name => name !== file))}
          onRetry={() => setFailed('')}
        />
      ))}
    </div>
  );
}
```

### Нажатие на плитку

Плитка с onClick доступна с клавиатуры

```tsx
import { AiAttachment, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { useState } from 'react';

export function Clickable() {
  const [opened, setOpened] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiAttachment type={ATTACHMENT_TYPE.File} fileName='contract.docx' onClick={() => setOpened(prev => prev + 1)} />
      <span>Открыто: {opened}</span>
    </div>
  );
}
```

## Props

**AiAttachmentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-attachment` |  |
| `fileName` | `string` | — | Имя файла — для `type='file'`. |
| `icon` | `ReactNode` | — | Иконка типа файла. Подставляется снаружи (AT-7.3). |
| `onClick` | `(() => void)` | — | Нажатие на плитку. |
| `onRemove` | `(() => void)` | — | Нажатие на крестик. |
| `onRetry` | `(() => void)` | — | Нажатие на кнопку повтора в состоянии `error`. |
| `src` | `string` | — | Адрес превью картинки. |
| `state` | `"default"` \| `"error"` \| `"loading"` | `default` | Состояние плитки. По умолчанию `default`. |
| `tooltip` | `ReactNode` | — | Подсказка при наведении (только desktop). |
| `type` | `"file"` \| `"image"` | `image` | Тип плитки: картинка с превью или файл с именем. По умолчанию `image`. |

#### Related types

- `AttachmentState` = `"default"` \| `"error"` \| `"loading"`

- `AttachmentType` = `"file"` \| `"image"`
