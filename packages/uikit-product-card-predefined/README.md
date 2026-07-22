# CardPredefined

`@ds/uikit-product-card-predefined` — Пресеты карточек Product UI Kit — CardBanner, CardService, CardServiceLight, CardServiceSmall, CardSuggest, CardCustom.

Набор готовых карточек Product UI Kit на базе `@ds/card`:

Все компоненты поддерживают полиморфный `as` prop: `as='a'`, `as={Link}` и т.д.

## Установка

```bash
pnpm add @ds/uikit-product-card-predefined
```

```ts
import { CardBanner, CardService, CardServiceLight, CardSuggest } from '@ds/uikit-product-card-predefined'
```

## CardBanner

Промо-баннер с заголовком, описанием, CTA-ссылкой и изображением. Поддерживает опциональную кнопку закрытия.

Промо-баннер с заголовком, описанием, CTA-ссылкой и изображением. Поддерживает опциональную кнопку закрытия.

### Когда использовать

- Промо-блоки на главной или в каталоге сервисов.
- Баннер с иллюстрацией и одним основным действием.

### Примеры использования

#### Базовый пример

Иллюстрация 96×96 справа от текстового блока.

```tsx
import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustration from '../assets/card-banner-illustration.jpg';

export function Basic() {
  return (
    <CardBanner
      title='Заголовок карточки'
      content='Краткое описание сервиса или предложения для пользователя'
      actionLabel='Подробнее'
      image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
    />
  );
}
```

#### Обработка клика

onClick передаётся в корневой Card — карточка интерактивна по умолчанию.

```tsx
import { Typography } from '@ds/typography';
import { CardBanner } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

import illustration from '../assets/card-banner-illustration.jpg';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardBanner
        title='Заголовок карточки'
        content='Клик по карточке обрабатывается через onClick'
        actionLabel='Подробнее'
        image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
```

#### Закрываемый баннер

При передаче onClose в углу появляется кнопка закрытия; клик по ней не всплывает на карточку.

```tsx
import { Typography } from '@ds/typography';
import { CardBanner } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

import illustration from '../assets/card-banner-illustration.jpg';

export function WithClose() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Typography variant='body' size='m'>
        Баннер закрыт
      </Typography>
    );
  }

  return (
    <CardBanner
      title='Заголовок карточки'
      content='Кнопка закрытия появляется при передаче onClose'
      actionLabel='Подробнее'
      image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
      onClose={() => setVisible(false)}
    />
  );
}
```

#### Ссылка (polymorphic)

Через as и href карточка рендерится как якорь.

```tsx
import { CardBanner } from '@ds/uikit-product-card-predefined';

import illustration from '../assets/card-banner-illustration.jpg';

export function PolymorphicLink() {
  return (
    <CardBanner
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Перейти на сайт'
      content='Откроется в новой вкладке'
      actionLabel='Подробнее'
      image={{ src: illustration.src, alt: 'Иллюстрация сервиса' }}
    />
  );
}
```

### Props

**CardBannerProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionLabel` | `string` | — | Текст кнопки действия |
| `as` | `T` | — | Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. |
| `className` | `string` | — | CSS-класс корневого элемента |
| `content` | `string` | — | Описание |
| `data-test-id` | `string` | — | Support prop для тестов |
| `disabled` | `boolean` | — | Неактивное состояние |
| `image` | `{ src: string; alt: string; }` | — | Изображение |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент / инстанс |
| `onClose` | `MouseEventHandler<HTMLElement>` | — | Колбэк закрытия. При наличии отображается кнопка «Закрыть» |
| `title` | `string` | — | Заголовок карточки |

## CardService

Карточка сервиса с эмблемой, заголовком, описанием и CTA-строкой.

Карточка сервиса с эмблемой, заголовком, описанием и CTA-строкой.

### Когда использовать

- Плитки сервисов в каталоге или дашборде.
- Карточка с иконкой-эмблемой, заголовком и кратким описанием.

### Props

**CardServiceProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionLabel` | `string` | — | Текст кнопки действия |
| `as` | `T` | — | Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. |
| `className` | `string` | — | CSS-класс корневого элемента |
| `content` | `string` | — | Описание |
| `data-test-id` | `string` | — | Support prop для тестов |
| `disabled` | `boolean` | — | Неактивное состояние |
| `emblem` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Эмблема — передавайте `<IconPredefined icon={...} />` или произвольный ReactElement |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент / инстанс |
| `title` | `string` | — | Заголовок карточки |

## CardServiceLight

Компактная интерактивная строка — иконка, текст, promo tag и кнопка «Избранное».

Компактная интерактивная строка: иконка + текст + promo tag + кнопка «Избранное» (ArrowRight/Left keyboard nav).

### Когда использовать

- Компактные списки сервисов в сайдбаре или меню.
- Строка с иконкой, названием и кнопкой «Избранное».

### Примеры использования

#### Базовый пример

Компактная строка с иконкой и заголовком.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} />;
}
```

#### Promo tag

Через promoTag рядом с заголовком отображается промо-бейдж.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      promoTag={{
        label: 'New',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
```

#### Обрезка заголовка

truncate.title ограничивает число строк заголовка через TruncateString.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинное название сервиса, которое не помещается в одну строку и обрезается через TruncateString';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 280 }}>
      <CardServiceLight title={longTitle} icon={<PlaceholderSVG size={24} />} truncate={{ title: 1 }} />
    </div>
  );
}
```

#### Кнопка «Избранное» (always)

favorite.visibilityStrategy="always" — кнопка видна постоянно; checked и onChange задают controlled-режим.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.always,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
```

#### Кнопка «Избранное» (hover)

favorite.visibilityStrategy="hover" — кнопка появляется при наведении и фокусе на карточке.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.hover,
      }}
    />
  );
}
```

#### Неактивное состояние

disabled блокирует взаимодействие с карточкой.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} disabled />;
}
```

#### Обработка клика

onClick передаётся в корневой Card — карточка интерактивна по умолчанию.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardServiceLight title='Мой сервис' icon={<PlaceholderSVG size={24} />} onClick={() => setClicks(c => c + 1)} />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
```

#### Ссылка (polymorphic)

Через as и href карточка рендерится как якорь.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardServiceLight
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Ссылка-сервис'
      icon={<PlaceholderSVG size={24} />}
    />
  );
}
```

### Props

**CardServiceLightProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Полиморфный элемент: `'button'`, `'a'`, `{Link}` и т.д. |
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — | Support prop для тестов |
| `disabled` | `boolean` | — | Неактивное состояние |
| `favorite` | `FavoriteProps` | — | Настройки кнопки «Избранное». <br/> Keyboard: ArrowRight на карточке → фокус на Favourite; ArrowLeft на Favourite → фокус на карточку. |
| `icon` | `ReactElement<any, string \| JSXElementConstructor<any>>` | — | Иконка сервиса |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент / инстанс |
| `onKeyDown` | `KeyboardEventHandler<HTMLElement>` | — | Колбэк нажатия клавиши клавиатуры на карточке |
| `promoTag` | `PromoTagOwnProps` \| `PromoTagProps` | — | Настройки promo tag. При отсутствии не отображается |
| `title` | `string` | — | Заголовок карточки |
| `truncate` | `{ title?: number; }` | — | Настройки обрезки текста заголовка |

##### Related types

**FavoriteProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| undefined` | — | Состояние избранного (controlled) |
| `enabled` | `boolean` | — | Включить отображение кнопки избранного |
| `onChange` | `((value: boolean) => void) \| undefined` | — | Колбэк изменения состояния избранного |
| `visibilityStrategy` | `"always"` \| `"hover"` | — | Формат отображения: всегда или при наведении и фокусе |

- `VisibilityStrategy` = `"always"` \| `"hover"`

## CardServiceSmall

Компактная карточка сервиса — эмблема, заголовок, promo badge и кнопка «Избранное».

Компактная интерактивная строка: эмблема + заголовок + promo badge + кнопка «Избранное».

### Примеры использования

#### Базовый пример

Компактная строка с эмблемой и заголовком.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} />;
}
```

#### Promo badge

Через promoBadge в правом верхнем углу отображается промо-бейдж.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      promoBadge={{
        label: 'Promo Tag',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
```

#### Обрезка заголовка

truncate.title ограничивает число строк заголовка через TruncateString.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинное название сервиса, которое не помещается в одну строку и обрезается через TruncateString';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 280 }}>
      <CardServiceSmall title={longTitle} emblem={{ icon: PlaceholderSVG }} truncate={{ title: 1 }} />
    </div>
  );
}
```

#### Выбранное состояние

checked подсвечивает карточку как выбранную.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithChecked() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} checked />;
}
```

#### Рамка (outline)

outline добавляет контур вокруг карточки.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithOutline() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} outline />;
}
```

#### Кнопка «Избранное» (always)

favorite.visibilityStrategy="always" — кнопка видна постоянно; checked и onChange задают controlled-режим.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.always,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
```

#### Кнопка «Избранное» (hover)

favorite.visibilityStrategy="hover" — кнопка появляется при наведении и фокусе на карточке.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.hover,
      }}
    />
  );
}
```

#### Неактивное состояние

disabled блокирует взаимодействие с карточкой.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return <CardServiceSmall title='Название сервиса' emblem={{ icon: PlaceholderSVG }} disabled />;
}
```

#### Обработка клика

onClick передаётся в корневой Card — карточка интерактивна по умолчанию.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Typography } from '@ds/typography';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardServiceSmall
        title='Название сервиса'
        emblem={{ icon: PlaceholderSVG }}
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
```

#### Ссылка (polymorphic)

Через as и href карточка рендерится как якорь.

```tsx
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardServiceSmall
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Ссылка-сервис'
      emblem={{ icon: PlaceholderSVG }}
    />
  );
}
```

### Props

**CardServiceSmallProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. |
| `checked` | `boolean` | — | Выбранное состояние |
| `className` | `string` | — | CSS-класс корневого элемента |
| `data-test-id` | `string` | — | Support prop для тестов |
| `disabled` | `boolean` | — | Неактивное состояние |
| `emblem` | `ReactElement<any, string \| JSXElementConstructor<any>> \| { icon: JSXElementConstructor<{ className?: string \| undefined; size?: number \| undefined; }>; }` | — | Эмблема: объект с иконкой-компонентом. <br/> Принимает `{ icon: JSXElementConstructor }` или произвольный ReactElement. |
| `favorite` | `FavoriteProps` | — | Настройки кнопки «Избранное». `visibilityStrategy` обязателен. |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент / инстанс |
| `outline` | `boolean` | — | Рамка вокруг карточки |
| `promoBadge` | `PromoTagOwnProps` \| `PromoTagProps` | — | Промо-тег (бейдж). Тип — `PromoTagProps` из `@ds/promo-tag`. |
| `title` | `string` | — | Заголовок карточки |
| `truncate` | `{ title?: number; }` | — | Настройки обрезки заголовка |

##### Related types

**FavoriteProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| undefined` | — | Состояние избранного (controlled) |
| `enabled` | `boolean` | — | Включить отображение кнопки избранного |
| `onChange` | `((value: boolean) => void) \| undefined` | — | Колбэк изменения состояния избранного |
| `visibilityStrategy` | `"always"` \| `"hover"` | — | Формат отображения: всегда или при наведении и фокусе |

- `VisibilityStrategy` = `"always"` \| `"hover"`

## CardSuggest

Карточка-подсказка с двумя размерами (m/s), управляющими типографикой и отступами.

Карточка-подсказка с двумя размерами (m/s), управляющими типографикой и отступами.

### Когда использовать

- Подсказки и onboarding-карточки в интерфейсе.
- Компактные информационные блоки с заголовком и описанием.

### Примеры использования

#### Базовый пример

Карточка-подсказка с заголовком и описанием (size="m").

```tsx
import { CARD_SIZE, CardSuggest } from '@ds/uikit-product-card-predefined';

export function Basic() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      content='Краткое описание действия или функциональности'
      size={CARD_SIZE.M}
    />
  );
}
```

#### Размер s

size="s" уменьшает типографику и отступы.

```tsx
import { CARD_SIZE, CardSuggest } from '@ds/uikit-product-card-predefined';

export function SizeSmall() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      content='Краткое описание действия или функциональности'
      size={CARD_SIZE.S}
    />
  );
}
```

#### Promo badge

Через promoBadge под описанием отображается промо-бейдж.

```tsx
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      content='Краткое описание действия или функциональности'
      promoBadge={{
        label: 'New',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
```

#### Обрезка текста

truncate.title и truncate.description ограничивают число строк через TruncateString.

```tsx
import { CardSuggest } from '@ds/uikit-product-card-predefined';

const longTitle =
  'Очень длинный заголовок подсказки, который не помещается в две строки и обрезается через TruncateString';
const longDescription =
  'Очень длинное описание подсказки, которое не помещается в три строки и обрезается через TruncateString. Дополнительный текст для демонстрации обрезки.';

export function WithTruncate() {
  return (
    <div style={{ maxWidth: 320 }}>
      <CardSuggest title={longTitle} content={longDescription} truncate={{ title: 2, content: 3 }} />
    </div>
  );
}
```

#### Неактивное состояние

disabled блокирует взаимодействие с карточкой.

```tsx
import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function Disabled() {
  return (
    <CardSuggest title='Подсказка для пользователя' content='Краткое описание действия или функциональности' disabled />
  );
}
```

#### Обработка клика

onClick передаётся в корневой Card — карточка интерактивна по умолчанию.

```tsx
import { Typography } from '@ds/typography';
import { CardSuggest } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithOnClick() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardSuggest
        title='Подсказка для пользователя'
        content='Краткое описание действия или функциональности'
        onClick={() => setClicks(c => c + 1)}
      />

      <Typography variant='body' size='m'>
        Кликов по карточке: {clicks}
      </Typography>
    </div>
  );
}
```

#### Ссылка (polymorphic)

Через as и href карточка рендерится как якорь.

```tsx
import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function PolymorphicLink() {
  return (
    <CardSuggest
      as='a'
      href='https://cloud.ru'
      target='_blank'
      title='Подсказка-ссылка'
      content='Это якорный элемент'
    />
  );
}
```

### Props

**CardSuggestProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `T` | — | Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. |
| `className` | `string` | — | CSS-класс корневого элемента |
| `content` | `string` | — | Описание |
| `data-test-id` | `string` | — | Support prop для тестов |
| `disabled` | `boolean` | — | Неактивное состояние |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент / инстанс |
| `promoBadge` | `PromoTagOwnProps` \| `PromoTagProps` | — | Промо-тег. <br/> Используйте `PromoTagProps` из `@ds/promo-tag`. |
| `size` | `"m"` \| `"s"` | `m` | Размер: управляет типографикой и отступами. <br/> `'m'` — roleTitle/m + roleBody/m, padding 16px; <br/> `'s'` — roleTitle/s + roleBody/s, padding 8px. |
| `title` | `string` | — | Заголовок |
| `truncate` | `{ title?: number; content?: number; } \| undefined` | — | Настройки обрезки текста |

##### Related types

- `CardSize` = `"m"` \| `"s"`
