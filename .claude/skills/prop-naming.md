# Skill: prop-naming

**Триггеры:** «как назвать проп», «какое имя для этого пропа», «проверь именование пропсов в `<pkg>`», добавление/переименование публичного пропа компонента, ревью нового API, вопрос «`text` или `label`?», «`isLoading` или `loading`?», «`option` или `label`?».

Скилл — **канон именования публичных пропсов** дизайн-системы, закреплённый по итогам аудита именования (FF-8680). Решает **какое имя дать семантическому слоту**, а не механику типов (это [component-api-surface.md](../rules/component-api-surface.md)). Самодостаточен: весь канон — в таблицах ниже, внешних снапшотов не требует.

Правило простое: **имя пропа определяется семантической ролью слота, а не компонентом**. Один слот — одно имя во всей ДС. Ниже — таблицы «роль → канон» и список легаси-алиасов, которые в API заводить нельзя.

## Когда использовать

- Заводишь новый публичный проп — сверься с таблицей «роль → канон» ниже.
- Переносишь компонент из `@snack-uikit/*` / `@cloud-ru/*` — легаси приносит `text` / `option` / `isLoading` / `headline` / `subHeadline`; приводи к канону сразу.
- Ревьюишь API нового пакета — прогони греп-проверки §«Легаси-алиасы».
- Сомневаешься «X или Y» — ищи роль в таблице, а не «как в соседнем компоненте».

Не используй для механики типов пропсов (method-signature колбэки, `ValueOf`, полиморфизм) — это [component-api-surface.md](../rules/component-api-surface.md).

## 1. Канон: текстовые слоты

### Primary text (заголовок / основной текст)

| Роль слота | Канон | Тип | Примеры |
|------------|-------|-----|---------|
| Подпись интерактивного контрола | **`label`** | `string` | Button, Link, Chip, Tag, Segment, AlertButton, ItemContent (строка списка) |
| Заголовок поверхности / секции | **`title`** | `string \| ReactNode` | Modal, Drawer, BottomSheet, CollapseBlock, Alert, Card, Dropdown |
| Основной слот-контент (payload) | **`content`** | `ReactNode` | Dropdown (body), Modal (body), Alert (body), InfoBlock, cards |

### Secondary text (вторичный / вспомогательный)

| Роль слота | Канон | Тип | Примеры |
|------------|-------|-----|---------|
| Аннотация справа от label (та же строка заголовка) | **`caption`** | `string` | fields.* |
| Хелпер под полем / подсказка-тултип | **`hint`** | `string \| ReactNode` | fields.*, product widgets |
| Подзаголовок поверхности | **`subtitle`** | `ReactNode` | Drawer, Modal, BottomSheet |
| Вторичный текст в теле карточки/строки | **`description`** | `string \| ReactNode` | attachment, avatar-detail, ItemContent, ReleaseNotes |

**`caption` vs `hint`:** `caption` — короткая аннотация **справа от label** в той же строке заголовка (flex-row `labelWrapper`); `hint` — помощь **под полем** (footer) или тултип у «?».

### `content` — когда и чем отличается

`content` — **основной payload** компонента (то, ради чего он существует), переданный **пропом**, а не через `children`. Заводи `content`, когда выполнено любое из:

- **`children` уже занят.** У trigger-based/портальных компонентов (`Dropdown`, `Popover`, `Modal`, `BottomSheet`) `children` — это **триггер** (анкор), поэтому тело портала физически не может быть `children` и идёт пропом `content`.
- **Body — один из именованных слотов раскладки.** Компонент сам раскладывает `title` / `content` / `footer` (`Alert`, `InfoBlock`, cards). `content` тут — data-слот наравне с остальными, сериализуем, виден в Controls/args.

Используй `children` (а не `content`), когда потребитель свободно композит контент и **нет** конкурирующих именованных слотов (`ModalCustom`, обёртки-контейнеры).

| Граница | Канон | Правило |
|---------|-------|---------|
| `content` vs `children` | `content` если `children` занят триггером **или** body — именованный слот; иначе `children` | — |
| `content` vs `label` | `content` = `ReactNode`-payload; `label` = короткая `string`-подпись контрола | если это подпись кнопки/ссылки/чипа — `label`, не `content` |

#### `content` vs `description` — операциональный критерий

Обе роли — текст, часто под заголовком. Различай **не по домену пакета, а по роли** (домен вводит в заблуждение):

- **`content`** — текст **и есть** основное тело/сообщение компонента (presentational-блок, портальное тело). Убери его — компонент теряет смысл. Примеры: `Alert` (сообщение), `InfoBlock`/`EmptyBlock` (тело), `Modal` (body), `Dropdown`/`Popover` (тело портала), `AiReasoning` (текст рассуждения), cards (основной текст карточки, обычно required).
- **`description`** — **вторичная аннотация сущности/контрола**, который опознаётся своим `title`/`name`/`label`. Убери текст — остаётся осмысленный контрол/сущность. Примеры: `attachment` (файл), `avatar-detail` (человек), `ItemContent` (строка списка), `SwitchRow` (настройка), `ToggleCard` (переключаемая карточка), `CardVacancy`, `ToastSystemEvent`.

**Тест «убери текст»:** `SwitchRow` без текста — всё ещё подписанный switch → текст вторичен → `description`. `Alert` без текста — пустой алерт, текст был сообщением → `content`. `AiReasoning` без текста — пустой блок, текст был контентом → `content`.

**Сигнал по типу:** обязательный `ReactNode`-payload тяготеет к `content`; опциональный `string` под обязательным `title` — почти всегда `description`.

> **Решай по роли, а не по домену пакета.** Принадлежность компонента к группе инвентаря (карточки, тосты, настройки) ничего не говорит о том, `content` там или `description`: «описание под заголовком» у `SwitchRow` / `ToggleCard` / `CardVacancy` / `ToastSystemEvent` играет ту же роль, что у `attachment` / `avatar-detail`, и потому называется одинаково — `description`. Домен вводит в заблуждение; применяй тест «убери текст».

### Item / option shape

Форма элемента select/list — **`{ label, value }`** (не `{ option, value }`). `value` — значение, `label` — отображаемый текст. Доп. слоты строки: `caption`, `description`, `beforeContent`, `afterContent`.

## 2. Канон: слоты и состояния

| Роль | Канон | Анти-канон |
|------|-------|-----------|
| Слот справа от заголовка | `slotAfterTitle` | `headlineHint` |
| Слот произвольного контента перед/после | `beforeContent` / `afterContent` | — |
| Иконочный слот перед/после | `iconBefore` / `iconAfter` | — |
| Шапка / футер поверхности | `header` / `footer` | — |
| Состояние загрузки | **`loading`** | `isLoading` |
| Режим выбора | **`selectionMode`** со значениями `single` / `multiple` | `multi` |
| Форма (скругление) | **`shape`** со значениями `rounded` / `squared` | `square`, `round` |
| Ось положения элемента | суффикс **`<x>Position`** (`chevronPosition`, `markerPosition`) | голое `chevron` |
| Положение элемента в последовательности (первый / промежуточный / последний) | **`position`** со значениями `start` / `center` / `end` | `role` |
| Роль, в которой применяется `appearance` (акцентная заливка vs декоративная; обычный текст vs текст на акцентной подложке) | **`roleAppearance`** | `role`, `color` |
| Наличие фон/заливка-слоя | **`background`** | `hasBackground`, `showBackground`, `decor`, `withBackground` |
| Ref на **корневой** DOM-узел компонента | **`innerRef`** | `rootRef`, `elementRef`, `forwardedRef`, `nodeRef` |
| Ref на **внутренний слот** | суффикс **`<slot>Ref`** (`scrollRef`, `inputRef`, `triggerRef`, `itemRef`) | `innerRef` для не-корневого узла |
| Булев флаг | утвердительно: `disabled`, `loading`, `fullWidth` | `isDisabled`, `notActive` |

Значения enum-осей — из общего словаря: `single`/`multiple`, `rounded`/`squared`, `before`/`after`, `start`/`center`/`end`. Не вводи синонимы (`multi`, `square`, `round`) — сверяйся с [component-api-surface.md](../rules/component-api-surface.md) §«Константы».

> **Почему `squared`, а не `square`:** в `@sbercloud/figma-variables` ключ `square` зарезервирован билдером — токен `<c>.anatomy.size.<s>.square` разворачивается в `width` + `height` (размер квадратного бокса), а форму несёт `<c>.anatomy.size.<s>.squared.borderRadius`. Переименовать токен нельзя — будет коллизия. Канон `squared` даёт совпадение имён во всех трёх слоях (Figma-варианты, токены, код) и снимает мост `$shapeMap` в SCSS.

> **Почему `roleAppearance`, а не `role`/`color`:** `role` — ключевое слово HTML/ARIA, поэтому `jsx-a11y/aria-role` срабатывает на каждое использование пропа и потребитель обвешивает вызовы `eslint-disable`. `color` (историческое имя в `@ds/counter`) конфликтует по смыслу с соседним `appearance`, который и несёт цвет: пара `appearance='red' color='accent'` читается как «цвет = accent», хотя цвет — red. `roleAppearance` говорит ровно то, что происходит: в какой роли применяется выбранный `appearance` — акцентная заливка или декоративная (`counter`, `promo-tag`), обычный текст или текст на акцентной подложке (`link`). Имя совпадает со свойством Figma-мастера, DOM-атрибут следует за пропом: `data-role-appearance`.
>
> **Значения оси у каждого компонента свои** — `accent`/`decor` у `counter` и `promo-tag`, `regular`/`onAccent` у `link`. Общее у них имя оси, не словарь значений: каждый набор берётся из своего сегмента токена темы (`theme.color.<appearance>.<segment>`).

> **Почему `background` (голое), а не `hasBackground`/`showBackground`/`decor`:** булев флаг «есть ли цветная подложка/заливка» — это тот же bare-flag канон, что `outline` / `loading` / `fullWidth` (без префиксов `has`/`show`/`with`). Имя одинаковое в коде и в свойстве Figma-компонента, DOM-атрибут следует за пропом: `data-background`. Токен theme-цвета `decor` и CSS-класс `.decor` — отдельная поверхность, канон имени пропа на них не распространяется.

> **Почему `innerRef`, а не `ref`:** компоненты ДС — обычные функции без `forwardRef` (это сохраняет дженерик полиморфного `as` без type-assertions), а функции в React 18 не принимают `ref`. Поэтому DOM-нода корня отдаётся отдельным пропом. Имя одно и то же и у полиморфных (`innerRef?: PolymorphicRef<T>`), и у обычных (`innerRef?: Ref<HTMLDivElement>`) компонентов.
>
> **Ref на корень — не только имя, но и маркер.** Компонент, принимающий `innerRef`, обязан быть помечен `withInnerRefSupport` из `@ds/utils`: по этому маркеру `Popover` / `Tooltip` / `Dropdown` понимают, каким каналом отдать триггеру reference-ноду (интроспекция пропсов функции в рантайме невозможна). Непомеченный триггер молча заворачивается в `<span>`. Проверяется eslint-правилом `ds/require-inner-ref-support`; механика — в [component-api-surface.md](../rules/component-api-surface.md) §«Полиморфизм».
>
> **Слот-рефы `<slot>Ref` маркера не требуют** — они ведут не на корень (`inputRef` у `dropzone` — на скрытый `<input type="file">`). Отдельная роль и у `rootRef` в `@ds/theme`: это ссылка на **чужой** элемент, к которому применяется тема, а не форвардинг своего корня; под канон `innerRef` она не подпадает.

> **Расхождение с Figma по префиксу `show`: слот-нода vs булев флаг.** В Figma один и тот же смысл нередко разложен на **два** свойства — булев `showX` (видимость) + `X` (контент): `showTitle` + `title`, `showMedia` + `media`, `showFooter` + `footer`. В коде **слот, который либо пуст, либо несёт ноду**, — это **один** nullable-проп `X?: ReactNode`: сама передача ноды и есть «показать». Отдельный булев `showX` из Figma в API **не** заводим (`title` вместо `showTitle` + `title`; `media` вместо `showMedia` + `media`). Это и есть маппинг «2 свойства Figma → 1 проп кода».
>
> **К чисто-булевым флагам это не относится.** У `background` / `outline` / `loading` нет парного контент-пропа-ноды — «показать» = сам флаг, поэтому имя голое и в коде, и в Figma. Признак: если у свойства нет ноды-контента, `show`-обёртка избыточна с обеих сторон — это один bare-flag.

## 3. Легаси-алиасы — греп-проверки

Прогоняй на новом/мигрированном пакете. Каждое попадание — привести к канону из §1–2.

```bash
PKG=<pkg>
# text как подпись контрола → label (НЕ трогать TruncateString text=, insideText, data-*text)
grep -rnE "^\s+text\??:" packages/$PKG/src --include="*.ts" --include="*.tsx"
# option как primary text строки → label (НЕ трогать options-массивы, FilterOption, <option>)
grep -rnE "^\s+option\??:\s*(string|ReactNode)" packages/$PKG/src
# isLoading → loading (публичный проп; локальный const isLoading = loading||... оставить)
grep -rnE "^\s+isLoading\??:" packages/$PKG/src
# headline / headlineHint / subHeadline → title / slotAfterTitle / subtitle
grep -rnE "^\s+(headline|headlineHint|subHeadline)\??:" packages/$PKG/src
# selectionMode со значением 'multi' → 'multiple'
grep -rn "'multi'" packages/$PKG/src
# shape со значениями 'square' / 'round' → 'squared' / 'rounded'
grep -rnE "'(square|round)'" packages/$PKG/src
# описание вторичного текста: убедиться, что description ≠ основной payload (иначе content)
grep -rnE "^\s+description\??:" packages/$PKG/src
# role как ось API (не ARIA-роль) → roleAppearance либо position (см. §2)
grep -rnE "^\s+role\??:" packages/$PKG/src
grep -rn "data-role=" packages/$PKG/src
# color как «акцентная заливка vs декоративная» → roleAppearance (НЕ трогать CSS-свойства и токены)
grep -rnE "^\s+color\??:" packages/$PKG/src --include="*.ts" --include="*.tsx"
# ref на корень под чужим именем → innerRef (слот-рефы `<slot>Ref` и `rootRef` у @ds/theme — не трогать)
grep -rnE "^\s+(rootRef|elementRef|forwardedRef|nodeRef)\??:\s*(Ref|RefObject|ForwardedRef)" packages/$PKG/src
# innerRef без маркера ловит eslint — прогнать точечно
pnpm exec eslint "packages/$PKG/src/**/*.tsx"
```

## 4. Ловушки при переименовании (проверено на FF-8680)

Механический ренейм имени легко ломает то, что **не ловит typecheck**. Перед переименованием:

1. **Проверь коллизию имени в разрешённой поверхности**, а не только в файле. `Droplist.label → header` был отменён: `header` уже занят `ListProps.header` через `Omit<ListProps, …>` (наследование). Ренейм молча забирал бы существующий слот. Проверяй **все типы, от которых наследуется целевой** (`Omit<…>` / `Pick<…>` / `& …`), а не один `.tsx`. Плоскую разрешённую поверхность пакета можно перегенерить на месте: `pnpm aggregate:props` (build-артефакт, в гите не хранится).
2. **Config-объекты через `Pick`/`PickLinkProps` каскадят.** `Pick<LinkProps, 'text'>` заставляет поле дескриптора тоже стать `label`. Гони `pnpm typecheck` как драйвер — он покажет всех потребителей.
3. **Runtime-guard'ы typecheck НЕ ловит.** `'option' in content`, `item['option'] !== undefined`, `content as { option }`, `Omit<Props, 'option'>` компилируются с любым строковым ключом — после ренейма фильтрация/проверки молча ломаются. Ищи грепом: `grep -rn "'<old>' in \|\['<old>'\]\|as { <old>\|Omit<.*'<old>'"`.
4. **URL-args в спеках typecheck НЕ ловит.** `buildStoryOptions({ <old>: … })` — это `Record<string, unknown>`; после ренейма тест молча ловит дефолт и остаётся зелёным впустую. Ищи `grep -rn "buildStoryOptions.*<old>"` в `__test__`.
5. **Зеркальные ключи `truncate.<name>`.** `truncate.option` (maxLines) зеркалит имя текстового пропа — при ренейме `option → label` он тоже становится `truncate.label` (число сосуществует с текстовым `label`, как `truncate.description` с `description`).
6. **`TEST_IDS.*` и CSS-классы — отдельная поверхность.** Их **не** переименовывают вместе с пропом (это e2e-селекторы потребителей). Имя слота меняется, id остаётся — это осознанный рассинхрон, а не недоделка.
7. **Проверь живьём то, что завязано на имя пропа в рантайме** (фильтрация списков, поиск) — live-прогон Storybook, не только typecheck.

## 5. Deprecation

Ренеймы публичных пропсов — **breaking changes**. По умолчанию — hard rename без legacy-alias (см. [dont-do-that.md](../rules/dont-do-that.md), [stories-standard.md](../rules/stories-standard.md) «не оставлять legacy-aliases как переходный мост»). Deprecation-alias с `@deprecated` JSDoc — только если явно решено в agreement пакета.

## Связанное

- [component-api-surface.md](../rules/component-api-surface.md) — механика типов пропсов (`constants.ts`, `ValueOf`, method-signature колбэки, полиморфизм, `TEST_IDS`).
- [component-internals.md](../rules/component-internals.md) — переиспользование типов, вынос хелперов.
- [pre-mr-audit.md](./pre-mr-audit.md) — общий греп-скан ревью-нитов пакета.
- Провенанс канона (что и почему переименовано) — git-история: `git log --grep=FF-8680`.
