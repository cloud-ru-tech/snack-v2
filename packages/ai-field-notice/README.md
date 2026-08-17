# AiFieldNotice

`@ds/ai-field-notice` — Композиция AiFieldBanner и AiQueue для контекстных уведомлений над AI-полем.

`AiFieldNotice` — композиция над `AiFieldBanner` и `AiQueue` для AI-полей. Один корневой компонент, один баннер на экран: сценарий выбирается через `variant`, текст, иконка и тип баннера предзашиты.

Мастер-ширина — 400px. Размеры наследуются от `AiFieldBanner`: `s` — desktop, `m` — mobile.

## Когда использовать

- Контекстное уведомление над AI-полем ввода — password, SSH, управление ВМ, поддержка или очередь задач.
- Нужен готовый сценарий из Figma Field Notice без ручной сборки `AiFieldBanner`.

### Когда не нужен

- Универсальный баннер с произвольным текстом и типом:
  - используйте `@ds/ai-field-banner` напрямую.
- Inline-alert в контенте страницы:
  - используйте `@ds/alert`.

## Анатомия

### Variant

`variant` — discriminated union: набор пропсов зависит от значения. В каждый момент рендерится **один** баннер.

- `password` — безопасный ввод пароля. Баннер `security`, иконка `PasswordLock`. Ротирующее описание с hover на «Гига не получит ваши данные».
- `ssh` — безопасный ввод SSH-ключа. Баннер `security`, иконка `PasswordLock`. Та же анимация описания, финальный кадр — «Введите SSH-ключ».
- `vmAgent` — управление виртуальной машиной. Баннер `agentic`, без иконки. Ротация между заголовком и строкой `vmName` / `vmIp`. Обязательны `vmName` и `vmIp`.
- `support` — чат с инженером. Баннер `help`, иконка `Headphones`, статичное описание.
- `queue` — очередь задач агента. Information-баннер с `AiQueue` внутри. Обязателен проп `queue` (`AiQueueProps`). `onActionClick` не используется.

```ts
<AiFieldNotice variant='password' onActionClick={handleCancel} />

<AiFieldNotice
  variant='vmAgent'
  vmName='my-lovely-vm'
  vmIp='93.7.94.11'
  onActionClick={handleNewSession}
/>

<AiFieldNotice variant='queue' queue={{ steps, defaultOpen: true }} />
```

### Size (default `s`)

Общий `size` на корне — передаётся в `AiFieldBanner` и внутренние части описания.

- `s` — desktop (Mobile Off).
- `m` — mobile (Mobile On).

### Action

Для `password`, `ssh`, `support`, `vmAgent` — текстовая кнопка справа с предзашитой подписью (`VARIANT_ACTION_LABELS`) и обработчиком `onActionClick`.

При `variant='queue'` action-слот не используется — управление очередью через пропсы `queue`.

### Animated description

Для `password` и `ssh` — `AiFieldNoticeAnimatedDescription`: автосмена кадров до финального промпта («Введите пароль» / «Введите SSH-ключ»), затем при hover на баннер — кадр «Гига не получит ваши данные».

Для `vmAgent` — ротация между заголовком и блоком `vmName` / `vmIp` без hover-кадра.

## Установка

```bash
pnpm add @ds/ai-field-notice
```

```ts
import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice'
```

## Примеры использования

### Password

Безопасный режим с ротирующим описанием

```tsx
import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function Password() {
  return <AiFieldNotice size={SIZE.S} variant={VARIANT.Password} onActionClick={() => undefined} />;
}
```

### SSH

Безопасный режим для SSH-ключа

```tsx
import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function Ssh() {
  return <AiFieldNotice size={SIZE.S} variant={VARIANT.Ssh} onActionClick={() => undefined} />;
}
```

### Support

Чат с инженером

```tsx
import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function Support() {
  return <AiFieldNotice size={SIZE.S} variant={VARIANT.Support} onActionClick={() => undefined} />;
}
```

### VM Agent

Режим управления ВМ с vmName и vmIp

```tsx
import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function VmAgent() {
  return (
    <AiFieldNotice
      size={SIZE.S}
      variant={VARIANT.VmAgent}
      vmName='my-lovely-vm'
      vmIp='93.7.94.11'
      onActionClick={() => undefined}
    />
  );
}
```

### Queue

Очередь задач агента в information-баннере

```tsx
import { AI_QUEUE_STEP_STATE, AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

const steps = [
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Error },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
];

export function Queue() {
  return (
    <AiFieldNotice
      size={SIZE.S}
      variant={VARIANT.Queue}
      queue={{
        steps,
        defaultOpen: true,
      }}
    />
  );
}
```

## Props

`AiFieldNoticeProps` — discriminated union по `variant`:

- `queue` — только при `variant='queue'`.
- `vmName`, `vmIp` — только при `variant='vmAgent'`.
- `onActionClick` — для остальных variant, кроме `queue`.

**AiFieldNoticeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | — |  |
| `onActionClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Обработчик клика по кнопке действия. Не используется при `variant='queue'`. |
| `queue` | `AiQueueProps` | — | Пропсы `AiQueue`. Только при `variant='queue'`. |
| `size` | `"m"` \| `"s"` | — | Размер баннера. |
| `variant` | `"password"` \| `"queue"` \| `"ssh"` \| `"support"` \| `"vmAgent"` | — | Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. |
| `vmIp` | `string` | — | IP-адрес виртуальной машины для второго кадра описания. Только при `variant='vmAgent'`. |
| `vmName` | `string` | — | Имя виртуальной машины для второго кадра описания. Только при `variant='vmAgent'`. |

#### Related types

- `Variant` = `"password"` \| `"queue"` \| `"ssh"` \| `"support"` \| `"vmAgent"`

## Смотри также

- [`@ds/ai-field-banner`](/packages/ai-field-banner) — базовый баннер под полем ввода.
- [`@ds/ai-queue`](/packages/ai-queue) — очередь задач для `variant='queue'`.
