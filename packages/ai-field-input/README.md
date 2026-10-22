# AiFieldInput

`@ds/ai-field-input` — Поле ввода сообщения для чата с агентом — текст с чипами скиллов и упоминаний, вложения и футер действий.

`AiFieldInput` — поле ввода сообщения в чате с агентом и в любом разговоре, которому нужны вложения и ряд действий. Поле принимает текст с чипами скиллов, команд и упоминаний, показывает приложенные файлы и собирает действия перед отправкой. Что произойдёт после отправки, решает потребитель.

## Когда использовать

- Ввод сообщения в чате с агентом.
- Ввод ответа в разговоре, где нужны вложения, вызов скиллов по `/` и упоминания по `@`.

### Когда не нужен

- Однострочный ввод без вложений и действий:
  - используйте `FieldText` из `@ds/fields`.
- Многострочный текст без чипов и футера:
  - используйте `FieldTextArea` из `@ds/fields`.

## Анатомия

Поле собрано сверху вниз из четырёх частей:

- кнопка прокрутки к последнему сообщению (`scrollButton`) — над полем, с точкой непрочитанного;
- слот баннера (`banner`) — `AiFieldBanner` или `AiFieldNotice`; пока открыт список по `/` или `@`, баннер скрыт, но держит своё место; на мобильной раскладке баннер берёт размер `m` из своего пресета адаптивности;
- рамка поля — ряд вложений (`attachments`, плитки `AiAttachment` из `@ds/ai-attachment`), текстовая область и футер;
- дисклеймер (`disclaimer`) — текст под рамкой.

Футер состоит из двух слотов (`footerLeftActions`, `footerRightActions`) и кнопки отправки, которая стоит справа всегда. Кнопки футера экспортируются отдельно: `AiFieldInputPlusButton`, `AiFieldInputSettingsButton`, `AiFieldInputModelButton`, `AiFieldInputEffortButton`, `AiFieldInputContextButton`, `AiFieldInputVoiceButton`, `AiFieldInputSendButton`. У `AiFieldInputPlusButton`, `AiFieldInputSettingsButton`, `AiFieldInputModelButton` и `AiFieldInputEffortButton` есть встроенный выпадающий список:

- `items` — пункты `{ id, label, description? }`;
- `onSelect` — выбор пункта, получает `id`.

На desktop список открывается над кнопкой, на mobile — в шторке снизу. Пока список открыт, кнопка остаётся в состоянии Pressed. Поиск по названию в списке моделей включается пропом `searchable` у `AiFieldInputModelButton`, по умолчанию его нет. На mobile с поиском шторка раскрывается на весь экран, без него — по высоте списка. Выбранный пункт в списке не отмечается: текущее значение показывает подпись кнопки (`label`). Без `items` кнопка только сообщает о нажатии через `onClick`.

### Значение

Содержимое поля — массив сегментов `AiFieldInputValue`:

- `text` — текст, `\n` — перенос строки;
- `skill` — чип скилла или команды. Параметры — обычный текст сообщения за чипом; пока за чипом в строке ничего нет, в нём видна подсказка `paramsPlaceholder` (её задаёт строка списка `skills`);
- `mention` — чип упоминания;
- `search` — знак `/` или `@` с набранным запросом, пока значение не выбрано.

Ввод `/` или `@` создаёт сегмент `search`, если для этого знака передан список (`skills` или `mentions`) и знак стоит в начале строки, после пробела или сразу за чипом; внутри слова (`e@mail`) поиск не открывается. Подсказку в поиске задаёт `searchPlaceholder` — отдельно для `/` (`skill`) и `@` (`mention`); не заданный ключ берёт текст из локали. Подсказка видна, пока запрос пуст и сразу за знаком нет текста.

Строки списка передаются пропсами:

- `skills` — команды и скиллы, открываются по `/`;
- `mentions` — ресурсы и сущности, открываются по `@`.

Поле само показывает список над полем и фильтрует строки по набранному тексту. Список стоит поверх содержимого выше поля и не меняет высоту компонента: баннер на это время скрыт, но держит место. Если совпадений нет — строка «Ничего не найдено». Выбор строки заменяет сегмент `search` на чип `skill` или `mention`, вызывает `onActionSelect` и возвращает баннер. Пока список открыт, кнопка прокрутки скрыта.

Строка `drillDown` с вложенными `items` открывает следующий уровень: первой стоит строка возврата («Назад» или `backLabel`), при переходе на уровень и обратно набранный запрос стирается, и фильтрация начинается заново. Список закрывают `Escape` и клик вне списка и текста поля, в том числе по кнопкам футера, — набранный текст остаётся в поле обычным текстом. Клик внутри текста список не закрывает.

Список можно открыть и без знака в тексте — например, пунктом «Добавить скилл» в меню кнопки добавления. Для этого компоненты в слотах поля берут хук `useAiFieldInputActions` и вызывают `openActionList('/')` (или `'@'` для упоминаний):

```tsx
function PlusButton() {
  const { openActionList } = useAiFieldInputActions();

  return (
    <AiFieldInputPlusButton
      items={[{ id: 'skills', label: 'Добавить скилл' }]}
      onSelect={id => id === 'skills' && openActionList(SEARCH_TRIGGER.Skill)}
    />
  );
}
```

В таком режиме поле не меняется, фокус встаёт на панель списка, и набранные буквы ничего не делают. Как и при поиске по `/`, строки сначала не выделены: стрелка вниз выделяет первую, стрелка вверх — последнюю, Enter выбирает первую. Выбранная строка встаёт чипом туда, где стоял курсор, или в конец текста, если поле ещё не фокусировали. После выбора или закрытия (`Escape`, клик вне списка) фокус возвращается в поле.

Баннер — обычный слот: крестик появляется, если передать `onClose` в `AiFieldBanner`; по нему потребитель убирает баннер из пропа `banner`.

### Клавиатура

- `Enter` — отправка (`onSubmit`); при открытом поиске — выбор первой строки списка.
- `Shift+Enter` — перенос строки.
- `↓` / `↑` при открытом поиске — переход в список.
- `Esc` при открытом поиске — закрытие списка, знак и запрос остаются текстом.
- `Backspace` сразу за чипом выделяет его (Pressed), повторный — удаляет. `Delete` сразу перед чипом — так же. Ввод при выделенном чипе снимает выделение и печатает за чипом.

### Состояния

- Default — рамка с нейтральной обводкой.
- Focus — акцентная обводка рамки.
- Disabled (`disabled`) — ввод недоступен, ряд вложений скрыт, кнопки футера выключены, кнопка контекста остаётся активной.

### Кнопка отправки (default — по содержимому)

- `disabled` — пустое поле.
- `active` — в поле есть содержимое.
- `loading` — сообщение отправляется.
- `stop` — агент генерирует ответ, нажатие останавливает генерацию.

Состояния `loading` и `stop` задаёт потребитель через `send.state`. Нажатие на кнопку в состоянии `active` вызывает `onSubmit` так же, как Enter; `send.onClick` получает состояние и содержимое поля. Пока кнопка в `loading` или `stop`, Enter не отправляет.

## Установка

```bash
pnpm add @ds/ai-field-input @ds/ai-attachment
```

`@ds/ai-attachment` нужен для плиток вложений, сам пакет поля от него не зависит.

```ts
import { AiFieldInput } from '@ds/ai-field-input'
```

## Примеры использования

### Базовое поле

Enter отправляет, Shift+Enter переносит строку

```tsx
import { AiFieldInput, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

export function Basic() {
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [lastSent, setLastSent] = useState('');

  return (
    <AiFieldInput
      value={value}
      onChange={setValue}
      onSubmit={current => {
        setLastSent(current.map(segment => (segment.type === 'text' ? segment.text : '')).join(''));
        setValue([]);
      }}
      placeholder='Спросите что-нибудь'
      disclaimer={lastSent ? `Отправлено: ${lastSent}` : undefined}
    />
  );
}
```

### Скиллы и упоминания

«/» и «@» открывают список над полем, крестик закрывает баннер

```tsx
import { AiFieldBanner } from '@ds/ai-field-banner';
import { ACTION_LIST_ITEM_TYPE, AiFieldInput, AiFieldInputActionListItem, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

const SKILLS: AiFieldInputActionListItem[] = [
  { id: 'summarize', label: 'summarize', caption: 'Краткое содержание', shortcut: '⌘ S' },
  { id: 'translate', label: 'translate', caption: 'Перевод текста' },
  {
    id: 'agents',
    label: 'Агенты',
    caption: '2',
    type: ACTION_LIST_ITEM_TYPE.DrillDown,
    backLabel: 'К списку команд',
    items: [
      { id: 'hermes', label: 'Гермес' },
      { id: 'analyst', label: 'Аналитик' },
    ],
  },
];

const MENTIONS: AiFieldInputActionListItem[] = [
  { id: 'team', label: 'команде', caption: 'Группа' },
  { id: 'docs', label: 'документация', caption: 'Пространство' },
];

export function SlashCommands() {
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <AiFieldInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue([])}
      placeholder='Введите / для скиллов или @ для упоминаний'
      skills={SKILLS}
      mentions={MENTIONS}
      banner={
        bannerVisible ? (
          <AiFieldBanner content='Агент работает в режиме чтения' onClose={() => setBannerVisible(false)} />
        ) : undefined
      }
    />
  );
}
```

### Вложения

Удаление и повтор загрузки; на desktop ряд листается стрелками

```tsx
import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { AiFieldInput } from '@ds/ai-field-input';
import { useState } from 'react';

const INITIAL_FILES = ['report.pdf', 'budget.xlsx', 'notes.txt', 'design.fig', 'contract.docx', 'roadmap.pdf'];

export function Attachments() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [failed, setFailed] = useState('budget.xlsx');

  return (
    <AiFieldInput
      placeholder='Опишите, что сделать с файлами'
      attachments={
        files.length > 0
          ? files.map(file => (
              <AiAttachment
                key={file}
                type={ATTACHMENT_TYPE.File}
                state={file === failed ? ATTACHMENT_STATE.Error : ATTACHMENT_STATE.Default}
                fileName={file}
                tooltip={file === failed ? 'Не удалось загрузить' : file}
                onRemove={() => setFiles(prev => prev.filter(name => name !== file))}
                onRetry={() => setFailed('')}
              />
            ))
          : undefined
      }
    />
  );
}
```

### Футер

Кнопки из макета, выбор модели и уровня усилий, переключение отправки в остановку

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Выключенное поле

Ввод и кнопки футера недоступны

```tsx
import { AiFieldInput } from '@ds/ai-field-input';

export function Disabled() {
  return <AiFieldInput disabled placeholder='Отправка сообщений недоступна' />;
}
```

## Props

### AiFieldInput

**AiFieldInputProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attachments` | `ReactNode` | — | Плитки вложений (`AiAttachment` из `@ds/ai-attachment`). Ряд не рендерится, если слот пуст. |
| `attachmentsScrollStep` | `number` | `92` | Шаг сдвига ряда вложений стрелкой, px. По умолчанию — одна плитка с зазором (92). |
| `banner` | `ReactNode` | — | Слот над полем: `AiFieldBanner` или `AiFieldNotice`. Пока открыт список по `/` или `@`, на месте баннера стоит список. |
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input` |  |
| `defaultValue` | `AiFieldInputValue` | — | Начальное содержимое (uncontrolled). |
| `disabled` | `boolean` | `false` | Выключенное поле: ввод недоступен, кнопки футера выключены, ряд вложений скрыт. |
| `disclaimer` | `ReactNode` | — | Текст под полем. По умолчанию — дисклеймер из локали; `null` скрывает текст, отступ сохраняется. |
| `footerLeftActions` | `ReactNode` | — | Слот левых действий футера. |
| `footerRightActions` | `ReactNode` | — | Слот дополнительных правых действий футера (перед кнопкой отправки). |
| `mentions` | `AiFieldInputActionListGroup` \| `AiFieldInputActionListItem` | — | Строки списка по `@`: ресурсы и сущности. Не заданы — список по `@` не открывается. |
| `onActionSelect` | `((item: AiFieldInputActionListItem, trigger: SearchTrigger) => void)` | — | Выбор строки списка по `/` или `@`: строка уже стоит в поле чипом. |
| `onChange` | `((value: AiFieldInputValue) => void)` | — | Изменение содержимого. |
| `onSubmit` | `((value: AiFieldInputValue) => void)` | — | Отправка: Enter без Shift, когда поиск по `/` или `@` не активен, или нажатие кнопки в состоянии `active`. Пока кнопка в `loading` или `stop`, не вызывается. |
| `placeholder` | `string` | — | Подсказка в пустом поле. |
| `scrollButton` | `AiFieldInputScrollButton` | — | Кнопка прокрутки к последнему сообщению над полем. Не задана — кнопки нет. |
| `searchPlaceholder` | `AiFieldInputSearchPlaceholder` | — | Подсказки в поиске после `/` и `@`. Не заданный ключ — текст из локали («Введите название» / «Type a name»). |
| `send` | `AiFieldInputSend` | — | Кнопка отправки: состояние и нажатие. |
| `skills` | `AiFieldInputActionListGroup` \| `AiFieldInputActionListItem` | — | Строки списка по `/`: команды и скиллы. Не заданы — список по `/` не открывается. |
| `value` | `AiFieldInputValue` | — | Содержимое поля (controlled). |

#### Related types

- `ActionListItemType` = `"back"` \| `"default"` \| `"drillDown"`

**AiFieldInputActionListGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divider` | `boolean \| undefined` | — | Разделитель над группой. |
| `id` | `string` | — | Уникальный идентификатор группы. |
| `items` | `AiFieldInputActionListItem` | — | Строки группы. |
| `label` | `string \| undefined` | — | Заголовок группы. |

**AiFieldInputActionListItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backLabel` | `string \| undefined` | — | Подпись строки возврата на следующем уровне. По умолчанию «Назад» из локали. |
| `caption` | `string \| undefined` | — | Описание справа от имени. |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка слева. |
| `id` | `string` | — | Уникальный идентификатор строки. |
| `items` | `AiFieldInputActionListGroup` \| `AiFieldInputActionListItem` | — | Строки следующего уровня у строки `drillDown`. Список поля ввода (`skills`, `mentions`) открывает их <br/> по выбору строки и ставит первой строку возврата. |
| `label` | `string` | — | Имя строки. |
| `onClick` | `(() => void) \| undefined` | — | Выбор строки кликом или Enter. |
| `paramsPlaceholder` | `string \| undefined` | — | Только для скиллов (`skills`): подсказка параметров, которая встаёт сразу за выбранным чипом, <br/> пока за ним ничего не набрано (ISM-5). Не задана — подсказки нет. <br/> Пустая строка — подсказка по умолчанию из локали. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш в теге справа (строка `default`). |
| `tooltip` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подсказка при наведении. |
| `type` | `"back"` \| `"default"` \| `"drillDown"` | — | Вид строки: выбор, переход на следующий уровень или возврат. По умолчанию `default`. |

**AiFieldInputScrollButton**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicator` | `boolean \| undefined` | — | Точка «внизу есть непрочитанное сообщение» (ISC-2). |
| `onClick` | `(() => void) \| undefined` | — | Нажатие. Прокрутку выполняет потребитель. |

**AiFieldInputSearchPlaceholder**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mention` | `string \| undefined` | — | Подсказка после `@` — поиск упоминаний. |
| `skill` | `string \| undefined` | — | Подсказка после `/` — поиск скиллов и команд. |

**AiFieldInputSend**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `((state: SendState, value: AiFieldInputValue) => void) \| undefined` | — | Нажатие на кнопку отправки: текущее состояние и содержимое поля. В состоянии `active` поле само вызывает `onSubmit`. |
| `state` | `"active"` \| `"disabled"` \| `"loading"` \| `"stop"` | — | Состояние кнопки отправки. Не задано — выводится из содержимого: пусто `disabled`, иначе `active`. |

- `AiFieldInputValue` = `AiFieldInputSegment[]`

- `SendState` = `"active"` \| `"disabled"` \| `"loading"` \| `"stop"`

### AiFieldInputActionList

**AiFieldInputActionListProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | — |  |
| `items` | `AiFieldInputActionListGroup` \| `AiFieldInputActionListItem` | — | Строки и группы строк. |
| `onClose` | `(() => void)` | — | Нажатие Escape. |
| `padding` | `boolean` | — | Отступ 8 со всех сторон; без него — только сверху и снизу. По умолчанию `false`. |

#### Related types

- `ActionListItemType` = `"back"` \| `"default"` \| `"drillDown"`

**AiFieldInputActionListGroup**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divider` | `boolean \| undefined` | — | Разделитель над группой. |
| `id` | `string` | — | Уникальный идентификатор группы. |
| `items` | `AiFieldInputActionListItem` | — | Строки группы. |
| `label` | `string \| undefined` | — | Заголовок группы. |

**AiFieldInputActionListItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backLabel` | `string \| undefined` | — | Подпись строки возврата на следующем уровне. По умолчанию «Назад» из локали. |
| `caption` | `string \| undefined` | — | Описание справа от имени. |
| `icon` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Иконка слева. |
| `id` | `string` | — | Уникальный идентификатор строки. |
| `items` | `AiFieldInputActionListGroup` \| `AiFieldInputActionListItem` | — | Строки следующего уровня у строки `drillDown`. Список поля ввода (`skills`, `mentions`) открывает их <br/> по выбору строки и ставит первой строку возврата. |
| `label` | `string` | — | Имя строки. |
| `onClick` | `(() => void) \| undefined` | — | Выбор строки кликом или Enter. |
| `paramsPlaceholder` | `string \| undefined` | — | Только для скиллов (`skills`): подсказка параметров, которая встаёт сразу за выбранным чипом, <br/> пока за ним ничего не набрано (ISM-5). Не задана — подсказки нет. <br/> Пустая строка — подсказка по умолчанию из локали. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш в теге справа (строка `default`). |
| `tooltip` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Подсказка при наведении. |
| `type` | `"back"` \| `"default"` \| `"drillDown"` | — | Вид строки: выбор, переход на следующий уровень или возврат. По умолчанию `default`. |

Плитки вложений — `AiAttachment` из `@ds/ai-attachment`.

## Адаптивность

Раскладка берётся из `AdaptiveProvider` (`@ds/adaptive`), пропа раскладки нет.

| Часть | Desktop | Mobile |
|-------|---------|--------|
| Ряд вложений | стрелки при переполнении, полоса скрыта | свайп, полоса видна при листании |
| Крестик плитки | `xs` с подложкой, при наведении или фокусе | `s` с подложкой, виден всегда |
| Подсказка плитки | при наведении | нет |
| Высота текста | до 10 строк, дальше прокрутка | до 5 строк, дальше прокрутка |
| Списки кнопок футера | выпадающий список над кнопкой | шторка снизу по высоте списка; со `searchable` у кнопки модели — на весь экран |
| `/` и `@` в тексте | открывают список над полем | печатаются как обычный текст |
| `openActionList` из пункта меню кнопки | список над полем | список заменяет пункты в той же шторке; первая строка — возврат «Назад» |
| `openActionList` из своей кнопки | список над полем | список в отдельной шторке |

Размер баннера в слоте выбирает потребитель.

На mobile скиллы и упоминания добавляются только через `openActionList`, например из пунктов меню кнопки добавления. Строки с переходом открывают следующий уровень в той же шторке, первой строкой уровня стоит возврат («Назад» или `backLabel`). Высота шторки подстраивается под список. Выбор строки закрывает шторку, ставит чип и курсор за ним.

## AiFieldInputContextButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputContextButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__context` |  |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `progress` | `"green"` \| `"orange"` \| `"red"` | — | Цвет дуги. Не задан — по порогам: до 70 green, до 90 orange, выше red. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |
| `value` | `number` | — | Доля заполнения контекста, 0–100. Задаёт угол дуги. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |

- `ContextProgress` = `"green"` \| `"orange"` \| `"red"`

## AiFieldInputEffortButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputEffortButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__effort` |  |
| `disabled` | `boolean` | — | Выключенная кнопка. Внутри выключенного поля выключается автоматически. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `items` | `AiFieldInputFooterMenuItem` | — | Пункты выпадающего списка: на desktop — над кнопкой, на mobile — в шторке снизу. <br/> Без пунктов кнопка только сообщает о нажатии через `onClick`. |
| `label` | `string` | — | Текущий уровень усилий. Длиннее 100px обрезается многоточием. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `onSelect` | `((id: string) => void)` | — | Выбор пункта выпадающего списка. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |

**AiFieldInputFooterMenuItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — | Описание под названием. |
| `id` | `string` | — | Уникальный идентификатор пункта. |
| `label` | `string` | — | Название пункта. |

## AiFieldInputModelButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputModelButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__model` |  |
| `disabled` | `boolean` | — | Выключенная кнопка. Внутри выключенного поля выключается автоматически. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `items` | `AiFieldInputFooterMenuItem` | — | Пункты выпадающего списка: на desktop — над кнопкой, на mobile — в шторке снизу. <br/> Без пунктов кнопка только сообщает о нажатии через `onClick`. |
| `label` | `string` | — | Имя текущей модели. Длиннее 180px обрезается многоточием. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `onSelect` | `((id: string) => void)` | — | Выбор пункта выпадающего списка. |
| `searchable` | `boolean` | `false` | Поиск по названию в списке моделей. На mobile с поиском шторка раскрывается на весь экран, <br/> без него — по высоте списка. По умолчанию `false`. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |

**AiFieldInputFooterMenuItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — | Описание под названием. |
| `id` | `string` | — | Уникальный идентификатор пункта. |
| `label` | `string` | — | Название пункта. |

## AiFieldInputPlusButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputPlusButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__plus` |  |
| `disabled` | `boolean` | — | Выключенная кнопка. Внутри выключенного поля выключается автоматически. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `items` | `AiFieldInputFooterMenuItem` | — | Пункты выпадающего списка: на desktop — над кнопкой, на mobile — в шторке снизу. <br/> Без пунктов кнопка только сообщает о нажатии через `onClick`. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `onSelect` | `((id: string) => void)` | — | Выбор пункта выпадающего списка. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |

**AiFieldInputFooterMenuItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — | Описание под названием. |
| `id` | `string` | — | Уникальный идентификатор пункта. |
| `label` | `string` | — | Название пункта. |

## AiFieldInputSettingsButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputSettingsButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__settings` |  |
| `disabled` | `boolean` | — | Выключенная кнопка. Внутри выключенного поля выключается автоматически. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `items` | `AiFieldInputFooterMenuItem` | — | Пункты выпадающего списка: на desktop — над кнопкой, на mobile — в шторке снизу. <br/> Без пунктов кнопка только сообщает о нажатии через `onClick`. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `onSelect` | `((id: string) => void)` | — | Выбор пункта выпадающего списка. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |

**AiFieldInputFooterMenuItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string \| undefined` | — | Описание под названием. |
| `id` | `string` | — | Уникальный идентификатор пункта. |
| `label` | `string` | — | Название пункта. |

## AiFieldInputVoiceButton

```tsx
import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
```

### Props `AiFieldInputVoiceButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Доп. класс корня. |
| `data-test-id` | `string` | `ai-field-input__voice` |  |
| `disabled` | `boolean` | — | Выключенная кнопка. Внутри выключенного поля выключается автоматически. |
| `innerRef` | `Ref<HTMLButtonElement>` | — | Ref на кнопку. |
| `onClick` | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Нажатие. |
| `tooltip` | `AiFieldInputFooterButtonTooltip` | — | Подсказка при наведении. |

#### Related types

**AiFieldInputFooterButtonTooltip**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — | Текст подсказки. |
| `shortcut` | `string \| undefined` | — | Сочетание клавиш справа от текста. |
