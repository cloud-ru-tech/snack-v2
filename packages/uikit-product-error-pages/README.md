# ErrorPage

`@ds/uikit-product-error-pages` — Полноэкранная error-страница с типовыми сценариями ошибок, действиями и декоративной иллюстрацией.

Полноэкранная error-страница. Тип ошибки (`errorType`) задаёт заголовок, код статуса, текст и набор действий; справа — декоративная иллюстрация, скрытая на mobile.

## Когда использовать

- Нужно показать пользователю системную ошибку или недоступность страницы целым экраном.
- Требуется типовой набор: заголовок с кодом статуса, поясняющий текст, кнопка действия и ссылки на главную/назад.
- Нужна точка входа в поддержку (`onSupportCenterClick`).

Когда **не** нужен:

- Локальная ошибка внутри блока или формы:
  - используйте `Alert` или inline-сообщение.
- Загрузочное/пустое состояние без ошибки — это `Skeleton` / empty-state, а не ErrorPage.

## Анатомия

### Error type (default `FrontendError`)

Главная ось — `errorType`. Определяет заголовок, код статуса, текст и какие действия видны:

- `FrontendError` — непредвиденная ошибка. Кнопка «Обновить», ссылки «На главную» и «Назад».
- `PageUnavailable` — сервис недоступен (403). Кнопка «На главную», ссылка «Назад».
- `PageNotFound` — страница не найдена (404). Кнопка «На главную».
- `Offline` — нет соединения. Кнопка «Обновить».
- `Redirect` — ссылка устарела. Кнопка «Перейти» на `mainPageUrl`.
- `Custom` — контент берётся из `custom`.

### Logo variant (default `None`)

Логотип над заголовком (`logoVariant`):

- `Cloud` — фирменный логотип cloud.ru.
- `Custom` — свой узел через проп `logo`.
- `None` — без логотипа.

### Custom

При `errorType='Custom'` объект `custom` задаёт:

- `title` — заголовок.
- `description` — текст под заголовком.
- `statusCode` — код статуса в теге у заголовка.
- `mainButton` — `label` / `href` / `onClick` / `icon` главной кнопки.
- `showMainPageLink` / `showBackLink` — видимость ссылок.
- `actionWrapperClassName` — класс на контейнере действий.

## Установка

```bash
pnpm add @ds/uikit-product-error-pages
```

```ts
import { ErrorPage } from '@ds/uikit-product-error-pages'
import '@ds/uikit-product-error-pages/style.css'
```

## Примеры использования

### Страница не найдена

errorType='PageNotFound' с логотипом cloud.ru и кнопкой поддержки.

```tsx
import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function NotFound() {
  return (
    <ErrorPage
      errorType={ERROR_TYPE.PageNotFound}
      logoVariant={LOGO_VARIANT.Cloud}
      mainPageUrl='/'
      onSupportCenterClick={() => window.open('https://cloud.ru/support', '_blank')}
    />
  );
}
```

### Нет соединения

errorType='Offline' — заголовок и кнопка «Обновить» без кода статуса.

```tsx
import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function Offline() {
  return <ErrorPage errorType={ERROR_TYPE.Offline} logoVariant={LOGO_VARIANT.Cloud} />;
}
```

### Кастомный контент

errorType='Custom' — свой заголовок, код статуса, кнопка и логотип.

```tsx
import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function Custom() {
  return (
    <ErrorPage
      errorType={ERROR_TYPE.Custom}
      logoVariant={LOGO_VARIANT.Custom}
      logo={<span>ACME</span>}
      mainPageUrl='/dashboard'
      custom={{
        title: 'Quota exceeded',
        description: 'Your project reached its resource limit. Upgrade the plan to continue.',
        statusCode: 429,
        mainButton: { label: 'Upgrade plan', href: '/billing' },
        showMainPageLink: true,
        showBackLink: true,
      }}
    />
  );
}
```

## Props

**ErrorPageProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс. |
| `custom` | `ErrorPageCustomConfig` | — | Объект с кастомными настройками, используется только для `ERROR_TYPE.Custom`. |
| `data-test-id` | `string` | — |  |
| `errorType` | `"Custom"` \| `"FrontendError"` \| `"Offline"` \| `"PageNotFound"` \| `"PageUnavailable"` \| `"Redirect"` | `FrontendError` | Тип ошибки — определяет заголовок, текст, код статуса и набор действий. |
| `logo` | `ReactNode` | — | Кастомный логотип, используется только с `LOGO_VARIANT.Custom`. |
| `logoVariant` | `"Cloud"` \| `"Custom"` \| `"None"` | `None` | Вариант логотипа над заголовком. |
| `mainPageUrl` | `string` | `/` | URL главной страницы (для кнопки/ссылки «На главную»). |
| `onSupportCenterClick` | `(() => void)` | — | Обработчик клика по кнопке «Служба поддержки». Если задан — кнопка отображается. |
| `showMainButton` | `boolean` | `true` | Показать основную (filled) кнопку действия. |

#### Related types

**ErrorPageCustomConfig**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionWrapperClassName` | `string \| undefined` | — | Кастомный класс для контейнера с действиями. |
| `description` | `string \| undefined` | — | Кастомный текст под заголовком. |
| `mainButton` | `MainButtonConfig` | — | Кастомные настройки основной кнопки. |
| `showBackLink` | `boolean \| undefined` | — | Принудительно показать/скрыть ссылку «Назад». <br/> Если не задано, используется поведение по умолчанию. |
| `showMainPageLink` | `boolean \| undefined` | — | Принудительно показать/скрыть ссылку на главную страницу. <br/> Если не задано, используется поведение по умолчанию. |
| `statusCode` | `number \| undefined` | — | Кастомный код статуса. |
| `title` | `string \| undefined` | — | Кастомный заголовок. |

**MainButtonConfig**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| undefined` | — | Ссылка. Если задана — кнопка рендерится как `<a>`. |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка. |
| `label` | `string \| undefined` | — | Текст кнопки. |
| `onClick` | `(() => void) \| undefined` | — | Обработчик клика. |
