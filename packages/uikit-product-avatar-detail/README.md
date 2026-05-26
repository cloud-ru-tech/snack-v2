# AvatarDetail

`@ds/uikit-product-avatar-detail` — Типовой пользовательский блок из продуктового UI Kit: аватар с необязательным статус индикатором, имя, контактные данные для копирования и вторичное описание.

Типовой пользовательский блок из продуктового UI Kit: аватар с необязательным статус индикатором, имя, контактные данные для копирования и вторичное описание.

## Когда использовать

- В профильных карточках, где нужно компактно показать аватар, имя и email/логин для копирования.
- В списках участников, владельцев ресурсов или ответственных, где важна быстрая идентификация пользователя.

## Анатомия

### Слоты

- `name` — обязательное имя пользователя; отображается рядом с аватаром, обрезается при переполнении.
- `contactData` — опциональные контактные данные (email, логин); при клике копируются в буфер.
- `description` — опциональное описание под основной строкой (роль, должность).
- `avatar` — пропсы аватара (`appearance`, `status`, `src` и др.) без `name` (берётся из корневого пропа).

## Установка

```bash
pnpm add @ds/uikit-product-avatar-detail
```

```ts
import { AvatarDetail, AvatarDetailProps } from '@ds/uikit-product-avatar-detail'
```

## Примеры использования

### Базовый

```tsx
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function Basic() {
  return <AvatarDetail name='Иванов Иван' />;
}
```

### С контактными данными

Кнопка с email копирует значение в буфер обмена.

```tsx
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function WithContactData() {
  return <AvatarDetail name='Петрова Мария' contactData='petrova@example.com' />;
}
```

### С описанием

```tsx
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function WithDescription() {
  return <AvatarDetail name='Сидоров Алексей' description='Тимлид платформенной команды' />;
}
```

### Кастомный аватар

Цвет и статус-индикатор передаются через проп avatar.

```tsx
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function WithCustomAvatar() {
  return (
    <AvatarDetail
      name='Козлова Анна'
      contactData='kozlova@example.com'
      avatar={{ appearance: 'violet', status: 'green' }}
    />
  );
}
```

### Полный набор пропсов

```tsx
import { AvatarDetail } from '@ds/uikit-product-avatar-detail';

export function Full() {
  return (
    <AvatarDetail
      name='Новиков Дмитрий'
      contactData='novikov@example.com'
      description='DevOps-инженер, Cloud Platform'
      avatar={{ appearance: 'green', status: 'green' }}
    />
  );
}
```

## Props

**AvatarDetailProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatar` | `AvatarProps` | — | Аватар пропсы |
| `className` | `string` | — | CSS-класс |
| `contactData` | `string` | — | Контактные данные для отображения и копирования |
| `data-test-id` | `string` | — |  |
| `description` | `string` | — | Дополнительное описание под основной строкой |
| `name` | `string` | — | Имя пользователя |
