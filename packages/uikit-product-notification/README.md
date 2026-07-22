# Notification

`@ds/uikit-product-notification` — Пакет уведомлений — карточка NotificationCard, лента NotificationPanelContent со стеками и группами и адаптивная обёртка NotificationPanel (drawer на desktop, bottom-sheet на mobile).

Пакет `@ds/uikit-product-notification` собирает ленту уведомлений из трёх уровней: одиночная карточка, контейнер-лента и адаптивная обёртка для открытия ленты в drawer или bottom-sheet.

- ****NotificationCard**** — одиночная карточка уведомления: тип (`appearance`), состояние `unread`, ссылка, дата, кнопки действий и меню.
- ****NotificationPanelContent**** — контейнер ленты: заголовок, фильтры, кнопка «прочитать все», слот-список карточек и состояния `loading` / `blank`. Namespace-субкомпоненты `Group`, `Stack`, `Blank`.
- ****NotificationPanel**** — адаптивная обёртка панели: на desktop открывает её в drawer, на mobile — в bottom-sheet (выбор по `layoutType`).

## Установка

```bash
pnpm add @ds/uikit-product-notification
```

```ts
import { NotificationCard, NotificationPanelContent, NotificationPanel } from '@ds/uikit-product-notification'
```

## NotificationCard

Карточка одного уведомления — тип (appearance), состояние unread, лейбл, ссылка, дата, кнопки главного и второстепенного действия и меню действий.

Карточка одного уведомления. Тип задаёт иконку статуса и цвет, состояние `unread` подсвечивает непрочитанное и шлёт `onVisible` при попадании во вьюпорт, опциональные слоты — лейбл, ссылка, дата, кнопки действий и меню.

### Когда использовать

- Элемент ленты внутри **`NotificationPanelContent`**.
- Отдельная карточка статуса операции (деплой, бэкап, инцидент) в произвольном контейнере.

### Анатомия

#### Appearance (default `default`)

Тип уведомления — задаёт иконку статуса и её цвет.

- `default` — нейтральное событие (упоминание, информация).
- `error` — ошибка или инцидент.
- `warning` — предупреждение (лимит, деградация).
- `success` — успешное завершение операции.

#### Состояние unread (default `false`)

`unread` подсвечивает карточку как непрочитанную и показывает индикатор. Когда карточка попадает во вьюпорт на 80%, один раз срабатывает `onVisible(id)` — потребитель помечает её прочитанной.

#### Слоты

- `label` — короткий лейбл перед заголовком (категория, ID).
- `link` — ссылка в подвале, рендерится через `@ds/link`.
- `date` — дата/время в подвале.
- `primaryButton` — кнопка главного действия (`Button view='tonal'`).
- `secondaryButton` — кнопка второстепенного действия (`Button view='simple'`).
- `actions` — меню дополнительных действий (kebab-кнопка с droplist).
- `onClick` — делает карточку кликабельной (`role='button'`, фокус с клавиатуры). Вложенные кнопки, ссылка и меню активируются независимо.

### Примеры использования

#### Базовая карточка

Минимальный набор: тип success, лейбл, заголовок, контент и дата.

```tsx
import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';

export function BasicCard() {
  return (
    <NotificationCard
      id='backup-1729'
      label='Backup'
      appearance={APPEARANCE.Success}
      title='Резервная копия завершена'
      description='Бэкап БД prod-1 (412 ГБ) загружен в холодное хранилище s3://backups-prod/2026-05-27/'
      date='сегодня · 14:32'
    />
  );
}
```

#### Непрочитанные с onVisible

unread + onVisible помечает карточку прочитанной при попадании во вьюпорт.

```tsx
import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function UnreadCard() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const markRead = (id: string) => setReadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <NotificationCard
        id='quota-var-data'
        label='Storage'
        appearance={APPEARANCE.Warning}
        title='Лимит дисковой квоты'
        description='Использовано 92% квоты на /var/data — осталось 38 ГБ из 480 ГБ.'
        date='вчера · 19:04'
        unread={!readIds.has('quota-var-data')}
        onVisible={markRead}
      />
      <NotificationCard
        id='quota-var-log'
        label='Storage'
        appearance={APPEARANCE.Warning}
        title='Лимит дисковой квоты'
        description='Использовано 87% квоты на /var/log — осталось 62 ГБ из 480 ГБ.'
        date='вчера · 17:50'
        unread={!readIds.has('quota-var-log')}
        onVisible={markRead}
      />
    </div>
  );
}
```

#### Инцидент со ссылкой

appearance=error, лейбл-ID, ссылка на инцидент в подвале.

```tsx
import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';

export function IncidentCard() {
  return (
    <NotificationCard
      id='inc-4821'
      label='INC-4821'
      appearance={APPEARANCE.Error}
      title='Кластер k8s-prod-1 деградирован'
      description='3 из 5 нод недоступны последние 6 минут. Pod scheduling приостановлен.'
      date='сегодня · 03:14'
      link={{ label: 'Открыть инцидент', href: '/incidents/INC-4821' }}
      unread
    />
  );
}
```

#### Действия и состояние

primaryButton с loading, secondaryButton и меню actions — живой сценарий повтора деплоя на useState.

```tsx
import { APPEARANCE, NotificationCard } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function DeployFailureCard() {
  const [status, setStatus] = useState<'failed' | 'retrying' | 'dismissed'>('failed');

  if (status === 'dismissed') {
    return null;
  }

  return (
    <NotificationCard
      id='deploy-9217'
      label='api-gateway · v2.18.3'
      appearance={APPEARANCE.Error}
      title='Деплой не прошёл health-check'
      description='Readiness probe вернул 503 на 4 из 6 подов. Traffic не переключён на новую версию.'
      date='5 минут назад'
      primaryButton={{
        label: status === 'retrying' ? 'Запускаю…' : 'Повторить деплой',
        loading: status === 'retrying',
        onClick: () => {
          setStatus('retrying');
          // Если карточку закрыли во время повтора, по таймеру не возвращаем её в `failed`.
          setTimeout(() => setStatus(prev => (prev === 'retrying' ? 'failed' : prev)), 1200);
        },
      }}
      secondaryButton={{
        label: 'Логи пода',
        onClick: () => window.open('/logs/api-gateway/2.18.3', '_blank'),
      }}
      actions={[
        { content: { option: 'Отметить прочитанным' }, onClick: () => setStatus('dismissed') },
        { content: { option: 'Заглушить на 1 час' }, onClick: () => setStatus('dismissed') },
        { content: { option: 'Удалить' }, onClick: () => setStatus('dismissed') },
      ]}
    />
  );
}
```

### Props

**NotificationCardProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` | — | Дополнительные действия у карточки |
| `appearance` | `"default"` \| `"error"` \| `"success"` \| `"warning"` | `default` | Тип уведомления |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `date` | `string` | — | Дата уведомления |
| `description` | `ReactNode` | — | Описание уведомления — вторичный текст под заголовком |
| `id` | `string` | — | Идентификатор уведомления |
| `label` | `string` | — | Лейбл перед заголовком |
| `link` | `PickLinkProps` | — | Ссылка (рендерится как `<a href>` через `@ds/link`) |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Колбэк клика по карточке. Делает карточку кликабельной (`role='button'`, фокус с клавиатуры). <br/> Активация по карточке срабатывает только при фокусе на самой карточке — вложенные кнопки, <br/> ссылка и меню действий активируются независимо. |
| `onVisible` | `((cardId: string) => void)` | — | Колбэк при попадании карточки в область видимости на 80% |
| `primaryButton` | `NotificationButtonProps` | — | Кнопка главного действия у карточки (рендерится как Button view='tonal') |
| `secondaryButton` | `NotificationButtonProps` | — | Кнопка второстепенного действия у карточки (рендерится как Button view='simple') |
| `title` | `string` | — | Заголовок уведомления |
| `unread` | `boolean` | — | Управление состоянием прочитано/не прочитано |

##### Related types

**Action**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ItemContent` | — | Основной контент айтема |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `icon` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Иконка слева от текста |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки клика |
| `tagLabel` | `string \| undefined` | — | Лейбл-тег справа от текста |

- `Appearance` = `"default"` \| `"error"` \| `"success"` \| `"warning"`

**NotificationButtonProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"button"` | — | Элемент или компонент для рендера: 'button' \| 'a' \| ComponentType (например Link из react-router-dom) |
| `className` | `string \| undefined` | — | Дополнительный класс |
| `counter` | `CounterProps` | — | Пропсы для counter |
| `disabled` | `boolean \| undefined` | — | Отключена |
| `fullWidth` | `boolean \| undefined` | — | На всю ширину |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка |
| `iconPosition` | `"after"` \| `"before"` | — | Позиция иконки относительно текста |
| `innerRef` | `PolymorphicRef` \| `T` | — | Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. <br/> Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт. |
| `label` | `string \| undefined` | — | Текст кнопки |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |

## NotificationPanelContent

Контейнер ленты уведомлений с заголовком, фильтрами, кнопкой «прочитать все», слотом-списком карточек и состояниями loading/blank. Namespace-субкомпоненты Stack/Group/Blank — композиции для слота content.

Контейнер ленты уведомлений. Содержит заголовок, опциональные фильтры (segmented control, chip toggle), кнопку «прочитать все», слот-список карточек и состояния `loading` / `blank`.

Namespace `NotificationPanelContent.{Blank, Group, Stack}` — субкомпоненты-композиции для слота `content`.

### Когда использовать

- Лента уведомлений в центре экрана или на отдельной странице.
- Контент внутри **`NotificationPanel`**.

### Анатомия

#### Panel state

Состояния панели (соответствуют Figma variant `content`):

- `content` — стандартный список карточек через слот `content`.
- `loading` — `loading={true}` показывает скелетоны (`skeletonsAmount`, default `2`).
- `blank` — `content={<NotificationPanelContent.Blank />}` для пустого состояния и состояния ошибки.

#### Субкомпоненты слота `content`

- `NotificationPanelContent.Group` — группа карточек с заголовком.
- `NotificationPanelContent.Stack` — стек схлопывающихся карточек. Стек из одной карточки рендерится без обёртки.
- `NotificationPanelContent.Blank` — пустое состояние (используется и для ошибки — с иконкой и текстом).

### Примеры использования

#### Базовая лента

Список карточек через слот content, readAllButton помечает все прочитанными, onVisible — каждую при прокрутке.

```tsx
import { APPEARANCE, NotificationCard, NotificationPanelContent } from '@ds/uikit-product-notification';
import { useState } from 'react';

export function PanelBasic() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const markRead = (id: string) => setReadIds(prev => (prev.has(id) ? prev : new Set(prev).add(id)));

  return (
    <NotificationPanelContent
      title='Уведомления'
      readAllButton={{
        label: 'Прочитать всё',
        onClick: () => setReadIds(new Set(['inc-4821', 'quota-var-data', 'deploy-9217', 'backup-1729'])),
      }}
      content={
        <>
          <NotificationCard
            id='inc-4821'
            label='INC-4821'
            appearance={APPEARANCE.Error}
            title='Кластер k8s-prod-1 деградирован'
            description='3 из 5 нод недоступны последние 6 минут.'
            date='03:14'
            link={{ label: 'Открыть инцидент', href: '/incidents/INC-4821' }}
            unread={!readIds.has('inc-4821')}
            onVisible={markRead}
          />
          <NotificationCard
            id='quota-var-data'
            label='Storage'
            appearance={APPEARANCE.Warning}
            title='Лимит дисковой квоты'
            description='Использовано 92% /var/data — осталось 38 ГБ из 480 ГБ.'
            date='02:50'
            unread={!readIds.has('quota-var-data')}
            onVisible={markRead}
          />
          <NotificationCard
            id='deploy-9217'
            label='api-gateway · v2.18.3'
            appearance={APPEARANCE.Error}
            title='Деплой не прошёл health-check'
            description='Readiness probe вернул 503 на 4 из 6 подов.'
            date='вчера · 23:11'
            unread={!readIds.has('deploy-9217')}
            onVisible={markRead}
          />
          <NotificationCard
            id='backup-1729'
            label='Backup'
            appearance={APPEARANCE.Success}
            title='Резервная копия завершена'
            description='Бэкап БД prod-1 (412 ГБ) загружен в s3://backups-prod/.'
            date='вчера · 14:32'
          />
        </>
      }
    />
  );
}
```

#### Загрузка

loading + skeletonsAmount={4} вместо слота content; фильтры и readAllButton остаются на месте.

```tsx
import { NotificationPanelContent } from '@ds/uikit-product-notification';

export function PanelLoading() {
  return (
    <NotificationPanelContent
      title='Уведомления'
      loading
      skeletonsAmount={4}
      segments={{
        items: [
          { value: 'all', label: 'Все' },
          { value: 'unread', label: 'Непрочитанные' },
          { value: 'mentions', label: 'Упоминания' },
        ],
        value: 'all',
        onChange: () => {},
      }}
      readAllButton={{ label: 'Прочитать всё', onClick: () => {} }}
    />
  );
}
```

#### Полный сценарий продовой ленты

Segments + chipToggle + settings + readAll, Group для критичных, Stack для повторяющихся алертов квоты по нескольким хостам.

```tsx
import { APPEARANCE, NotificationCard, NotificationPanelContent } from '@ds/uikit-product-notification';
import { useMemo, useState } from 'react';

type Filter = 'all' | 'unread' | 'mentions';

type CardId = 'inc-4821' | 'deploy-9217' | 'stack-quota' | 'mention-1' | 'backup-1729';

export function PanelFull() {
  const [filter, setFilter] = useState<Filter>('all');
  const [importantOnly, setImportantOnly] = useState(false);
  const [muted, setMuted] = useState(false);
  const [readIds, setReadIds] = useState<Set<CardId>>(new Set());

  const markRead = (id: string) =>
    setReadIds(prev => (prev.has(id as CardId) ? prev : new Set(prev).add(id as CardId)));

  const isUnread = (id: CardId) => !readIds.has(id);

  // Какие карточки попадают под текущий фильтр. `important` — критичные алерты (error/warning).
  const visible = useMemo(() => {
    const matches = (id: CardId, important: boolean, mention: boolean) => {
      if (filter === 'unread' && !isUnread(id)) return false;
      if (filter === 'mentions' && !mention) return false;
      if (importantOnly && !important) return false;
      return true;
    };

    return {
      inc: matches('inc-4821', true, false),
      deploy: matches('deploy-9217', true, false),
      quota: matches('stack-quota', true, false),
      mention: matches('mention-1', false, true),
      backup: matches('backup-1729', false, false),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, importantOnly, readIds]);

  const attentionVisible = visible.inc || visible.deploy;

  if (muted) {
    return (
      <NotificationPanelContent
        title='Уведомления'
        settings={{
          button: { onClick: () => setMuted(false) },
          actions: [{ content: { option: 'Снять заглушение' }, onClick: () => setMuted(false) }],
        }}
        content={<NotificationPanelContent.Blank />}
      />
    );
  }

  return (
    <NotificationPanelContent
      title='Уведомления'
      segments={{
        items: [
          { value: 'all', label: 'Все' },
          { value: 'unread', label: 'Непрочитанные' },
          { value: 'mentions', label: 'Упоминания' },
        ],
        value: filter,
        onChange: value => setFilter(value as Filter),
      }}
      chipToggle={{
        label: 'Только важные',
        checked: importantOnly,
        onChange: setImportantOnly,
      }}
      settings={{
        button: {},
        actions: [
          { content: { option: 'Только непрочитанные' }, onClick: () => setFilter('unread') },
          { content: { option: 'Показать все' }, onClick: () => setFilter('all') },
          { content: { option: 'Заглушить на 1 час' }, onClick: () => setMuted(true) },
        ],
      }}
      readAllButton={{
        label: 'Прочитать всё',
        onClick: () => setReadIds(new Set(['inc-4821', 'deploy-9217', 'stack-quota', 'mention-1'])),
      }}
      content={
        <>
          {attentionVisible && (
            <NotificationPanelContent.Group title='Требуют внимания'>
              {visible.inc && (
                <NotificationCard
                  id='inc-4821'
                  label='INC-4821'
                  appearance={APPEARANCE.Error}
                  title='Кластер k8s-prod-1 деградирован'
                  description='3 из 5 нод недоступны последние 6 минут.'
                  date='03:14'
                  link={{ label: 'Открыть инцидент', href: '/incidents/INC-4821' }}
                  unread={isUnread('inc-4821')}
                  onVisible={markRead}
                />
              )}
              {visible.deploy && (
                <NotificationCard
                  id='deploy-9217'
                  label='api-gateway · v2.18.3'
                  appearance={APPEARANCE.Error}
                  title='Деплой не прошёл health-check'
                  description='Readiness probe вернул 503 на 4 из 6 подов.'
                  date='02:50'
                  primaryButton={{ label: 'Повторить', onClick: () => markRead('deploy-9217') }}
                  secondaryButton={{
                    label: 'Логи',
                    onClick: () => window.open('/logs/api-gateway/2.18.3', '_blank'),
                  }}
                  unread={isUnread('deploy-9217')}
                  onVisible={markRead}
                />
              )}
            </NotificationPanelContent.Group>
          )}

          {visible.quota && (
            <>
              <NotificationPanelContent.Stack
                title='Лимит дисковой квоты · 3 хоста'
                unread={isUnread('stack-quota')}
                actions={[
                  { content: { option: 'Прочитать все' }, onClick: () => markRead('stack-quota') },
                  { content: { option: 'Заглушить группу' }, onClick: () => setMuted(true) },
                ]}
                onOpenChanged={open => open && markRead('stack-quota')}
              >
                <NotificationCard
                  id='quota-prod-1'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='prod-1 · /var/data'
                  description='Использовано 92% — осталось 38 ГБ из 480 ГБ.'
                  date='01:12'
                />
                <NotificationCard
                  id='quota-prod-2'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='prod-2 · /var/log'
                  description='Использовано 87% — осталось 62 ГБ из 480 ГБ.'
                  date='00:48'
                />
                <NotificationCard
                  id='quota-stage-1'
                  label='Storage'
                  appearance={APPEARANCE.Warning}
                  title='stage-1 · /var/data'
                  description='Использовано 84% — осталось 76 ГБ из 480 ГБ.'
                  date='вчера · 23:50'
                />
              </NotificationPanelContent.Stack>
            </>
          )}

          {visible.mention && (
            <NotificationCard
              id='mention-1'
              label='@you · billing/PR-1402'
              appearance={APPEARANCE.Default}
              title='А. Иванов упомянул вас в PR'
              description='Пересмотрите расчёт grace-period в BillingScheduler.tsx:142'
              date='вчера · 18:20'
              link={{ label: 'Открыть PR', href: '/billing/pulls/1402' }}
              unread={isUnread('mention-1')}
              onVisible={markRead}
            />
          )}

          {visible.backup && (
            <>
              <NotificationCard
                id='backup-1729'
                label='Backup'
                appearance={APPEARANCE.Success}
                title='Резервная копия завершена'
                description='prod-1 (412 ГБ) → s3://backups-prod/2026-05-26/'
                date='вчера · 14:32'
              />
            </>
          )}
        </>
      }
    />
  );
}
```

### Props

#### NotificationPanelContent

**NotificationPanelContentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chipToggle` | `{ label: string; checked: boolean; onChange(checked: boolean): void; }` | — | Переключатель для фильтрации |
| `className` | `string` | — |  |
| `content` | `ReactNode` | — | Контент для отрисовки (e.g NotificationCard \| NotificationPanelContent.Blank) |
| `data-test-id` | `string` | — |  |
| `loading` | `boolean` | — | Состояние загрузки |
| `readAllButton` | `ButtonProps` \| `TooltipProps` | — | Кнопка в "шапке" панели |
| `scrollContainerRef` | `RefObject<HTMLElement>` | — | Ссылка на контейнер, который скроллится |
| `scrollEndRef` | `RefObject<HTMLDivElement>` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `segments` | `SegmentControlProps` | — | Сегменты для фильтрации |
| `settings` | `NotificationPanelSettingsProps` | — | Кнопка настроек и выпадающий список |
| `skeletonsAmount` | `number` | `2` | Количество скелетонов карточек для отображения при загрузке |
| `title` | `string` | — | Заголовок панели |

##### Related types

**Action**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ItemContent` | — | Основной контент айтема |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `icon` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Иконка слева от текста |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки клика |
| `tagLabel` | `string \| undefined` | — | Лейбл-тег справа от текста |

**NotificationPanelSettingsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` | — | Дополнительные действия панели |
| `button` | `ButtonProps` | — | Кнопка дополнительного действия панели |
| `size` | `"m"` \| `"s"` | — |  |

#### NotificationPanelContent.Stack

**NotificationCardStackProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` | — | Список действий в выпадающем меню |
| `children` | `Iterable<ReactNode>` | — | Карточки в стопке, видна первая карточка, остальные схлопываются под нее. |
| `data-test-id` | `string` | — |  |
| `defaultOpen` | `boolean` | — | Состояние открыт/закрыт по умолчанию |
| `onOpenChanged` | `((open: boolean) => void)` | — | Колбек смены состояния открыт/закрыт |
| `title` | `string` | — | Заголовок стопки карточек |
| `unread` | `boolean` | — | Состояние непрочитанных карточек |

##### Related types

**Action**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ItemContent` | — | Основной контент айтема |
| `disabled` | `boolean \| undefined` | — | Флаг неактивности элемента |
| `icon` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | — | Иконка слева от текста |
| `onClick` | `((e: MouseEvent<HTMLElement>) => void) \| undefined` | — | Колбек обработки клика |
| `tagLabel` | `string \| undefined` | — | Лейбл-тег справа от текста |

#### NotificationPanelContent.Group

**NotificationPanelGroupProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Содержимое группы |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `title` | `string` | — | Заголовок группы |

#### NotificationPanelContent.Blank

**NotificationPanelBlankProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Дополнительный класс |
| `content` | `ReactNode` | — | Подзаголовок |
| `data-test-id` | `string` | — |  |
| `icon` | `IconPredefinedProps` | — | Иконка |
| `title` | `string` | — | Заголовок |

##### Related types

- `Appearance` = `"default"` \| `"error"` \| `"success"` \| `"warning"`

## NotificationPanel

Адаптивная обёртка панели уведомлений — на desktop открывает NotificationPanelContent в drawer, на mobile в bottom-sheet (выбор по layoutType).

Адаптивная обёртка **`NotificationPanelContent`**. На desktop открывает панель в drawer, на mobile — в bottom-sheet. Выбор раскладки — по `layoutType` (как у `Widget` / `Toolbar`).

Контент передаётся пропом `content` как элемент `<NotificationPanelContent />`, а не как пропсы.

### Когда использовать

- Лента уведомлений, открываемая из иконки в шапке или тулбаре.
- Один и тот же контент панели на desktop и mobile без дублирования разметки.

### Анатомия

#### Layout type (default `desktop`)

Тип раскладки определяет обёртку:

- `desktop` — drawer (Figma `notificationDrawer`).
- `mobile` — bottom-sheet (Figma `notificationBottomSheet`).

#### Position (default `right`)

Сторона, с которой выезжает drawer. Только для `desktop`.

#### Width (default `s`)

Ширина drawer. Только для `desktop`.

### Props

**NotificationPanelProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс для элемента с контентом |
| `closeOnPopstate` | `boolean` | — | Закрывать дровер при перемещении по истории браузера |
| `container` | `string \| HTMLElement` | — | Контейнер в котором будет рендерится Drawer. По-умолчанию - body |
| `content` | `NotificationPanelContentProps` | — | Контент панели (`NotificationPanelContent`), отображаемый внутри обёртки |
| `data-test-id` | `string` | — |  |
| `onClose` | `() => void` | — | Колбэк закрытия |
| `open` | `boolean` | — | Управление состоянием показан/не показан. |
| `position` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | `right` | Расположение |
| `rootClassName` | `string` | — | CSS-класс для корневого элемента |
| `showBlackout` | `boolean` | `true` | Отображение темной подложки |
| `width` | `Width` | `s` | Ширина (только при position: "left" \| "right") |

##### Related types

**NotificationPanelContentProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chipToggle` | `{ label: string; checked: boolean; onChange(checked: boolean): void; } \| undefined` | — | Переключатель для фильтрации |
| `className` | `string \| undefined` | — |  |
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Контент для отрисовки (e.g NotificationCard \| NotificationPanelContent.Blank) |
| `data-test-id` | `string \| undefined` | — |  |
| `loading` | `boolean \| undefined` | — | Состояние загрузки |
| `readAllButton` | `ButtonProps` \| `TooltipProps` | — | Кнопка в "шапке" панели |
| `scrollContainerRef` | `RefObject<HTMLElement> \| undefined` | — | Ссылка на контейнер, который скроллится |
| `scrollEndRef` | `RefObject<HTMLDivElement> \| undefined` | — | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| `segments` | `SegmentControlProps` | — | Сегменты для фильтрации |
| `settings` | `NotificationPanelSettingsProps` | — | Кнопка настроек и выпадающий список |
| `skeletonsAmount` | `number \| undefined` | — | Количество скелетонов карточек для отображения при загрузке |
| `title` | `string` | — | Заголовок панели |

**NotificationPanelSettingsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` | — | Дополнительные действия панели |
| `button` | `ButtonProps` | — | Кнопка дополнительного действия панели |
| `size` | `"m"` \| `"s"` | — |  |
