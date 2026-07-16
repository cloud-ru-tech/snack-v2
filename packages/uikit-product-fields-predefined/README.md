# Fields Predefined

`@ds/uikit-product-fields-predefined` — Набор предопределённых полей формы поверх @ds/fields — телефон, маски, имя, описание, код и другие готовые сценарии ввода.

Пакет `@ds/uikit-product-fields-predefined` — это готовые поля формы поверх `@ds/fields` с заранее настроенным поведением: маски ввода, телефон с выбором страны, валидация имени и описания (yup + react-hook-form), код подтверждения. Каждое поле инкапсулирует свою логику (маскирование, детект страны, validation) и предоставляет чистое API в стиле `@ds`.

## Установка

```bash
pnpm add @ds/uikit-product-fields-predefined
```

```ts
import { FieldMask, FieldPhone } from '@ds/uikit-product-fields-predefined'
```

## Состав пакета

- **`FieldMask`** — поле с предустановленной маской (uuid, code, passport, snils, ipv4).
- **`FieldName`** — имя с yup-валидацией символов и длины; standalone и react-hook-form варианты.
- **`FieldDescription`** — многострочное описание с валидацией длины, опциональным раскрытием по кнопке и react-hook-form вариантом.
- **`FieldPhone`** — телефон с выбором страны, динамической маской и авто-детектом страны при вставке.
- **`FieldChat`** — поле чата с многострочным вводом, прикреплением файлов и отправкой по Enter.
- **`FieldSelectCreate`** — выбор из списка с действием «Создать» и состояниями загрузки/ошибки/пустого результата.
- **`FieldCode`** — OTP-поле: код по ячейкам с автопереходом фокуса, resend-таймером и imperative ref.

## FieldMask

Поле ввода с предустановленной маской — uuid, code, passport, snils, ipv4 — поверх @ds/fields FieldText.

Обёртка над `FieldText` из `@ds/fields` с предустановленной маской ввода на `react-imask`. Маска, плейсхолдер и `inputMode` выбираются по пропу `mask` — поле само форматирует ввод и отдаёт значение через `onChange(value, mask)`.

### Когда использовать

- Нужен ввод строго форматированного значения: идентификатор (UUID), код, паспорт, СНИЛС, IPv4-адрес.
- Хочется готовую маску без ручной настройки `react-imask`.

Когда **не** нужен `FieldMask`:

- Произвольный текст без формата — **`FieldText`** напрямую.
- Телефон с выбором страны — **`FieldPhone`**.

### Анатомия

#### Mask

Предустановленный набор масок (проп `mask`, константа `MASK`):

- `uuid` — `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX` (hex).
- `code` — `XXXX` (числовой код).
- `passport` — `XXXX XXXXXX`.
- `snils` — `XXXXXX-XXX XX`.
- `ip-v4-address` — `0[00].0[00].0[00].0[00]`.
- `ip-v4-address-with-mask` — IPv4 с CIDR-суффиксом `/NN`.

#### Size (default `m`)

Размер поля наследуется от `FieldText`:

- `s` — компактный.
- `m` — средний.
- `l` — крупный.

### Примеры использования

#### Типы масок

Разные предустановленные маски в одном ряду.

```tsx
import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';

export function FieldMaskMasks() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <FieldMask label='UUID' mask={MASK.Uuid} />
      <FieldMask label='СНИЛС' mask={MASK.Snils} />
      <FieldMask label='IPv4' mask={MASK.IpV4Address} />
    </div>
  );
}
```

#### Controlled

Контролируемое значение через value + onChange.

```tsx
import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldMaskControlled() {
  const [value, setValue] = useState('');

  return (
    <FieldMask
      label='Код'
      mask={MASK.Code}
      value={value}
      onChange={next => setValue(next)}
      caption={`value: ${value || '—'}`}
    />
  );
}
```

### Props

**FieldMaskProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Подпись |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `elementAfter` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот справа (кнопка / селект с опциональным выпадающим списком) |
| `elementBefore` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот слева (кнопка / селект с опциональным выпадающим списком) |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `hint` | `string` | — | Подсказка |
| `iconAfter` | `ReactNode` | — | Иконка справа от строки ввода |
| `iconBefore` | `ReactNode` | — | Иконка слева от строки ввода |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `mask` | `"code"` \| `"ip-v4-address"` \| `"ip-v4-address-with-mask"` \| `"passport"` \| `"snils"` \| `"uuid"` | — | Предустановленная маска поля |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string, mask: InputMask<Record<string, unknown>>) => void)` | — | Колбек смены значения; вторым аргументом — экземпляр маски imask |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `placeholder` | `string` | — | Значение плейсхолдера |
| `postfix` | `ReactNode` | — | Постфикс (текст или нода) |
| `prefix` | `ReactNode` | — | Префикс (текст или нода) |
| `prefixIcon` | `ReactNode` | — | Ведущая иконка. <br/> @deprecated Используйте `iconBefore` — он приоритетнее, если заданы оба. |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Обязательное поле |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | — | Тип инпута |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |

##### Related types

- `Mask` = `"code"` \| `"ip-v4-address"` \| `"ip-v4-address-with-mask"` \| `"passport"` \| `"snils"` \| `"uuid"`

### Адаптивность

`autoFocus` на mobile выключается (наследуется из `@ds/fields`) — автофокус там открывает экранную клавиатуру без действия пользователя. Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет. Вернуть автофокус на mobile — пропом `layoutPresets`:

```tsx
<FieldMask mask='uuid' autoFocus layoutPresets={{ mobile: { autoFocus: true } }} />
```

`size` от раскладки не зависит — задаётся пропом (по умолчанию `m`) одинаково на всех раскладках.

## FieldPhone

Телефонное поле с выбором страны, динамической маской по стране и авто-детектом страны при вставке номера.

Телефонное поле поверх `FieldText`. В ведущем слоте — селектор страны (`AdaptiveDroplist` из `@ds/list`) с флагом и кодом; маска ввода динамически подстраивается под выбранную страну. При вставке номера из буфера страна определяется автоматически (`awesome-phonenumber`).

### Когда использовать

- Ввод телефона с международным выбором страны.
- Нужен авто-детект страны по вставленному номеру и маскирование под формат страны.

Когда **не** нужен `FieldPhone`:

- Произвольный форматированный ввод без телефона — **`FieldMask`**.

### Анатомия

#### Селектор страны

Ведущий слот (`elementBefore`) — флаг выбранной страны + код (`+7`, `+1`, …). Клик открывает `AdaptiveDroplist` со списком стран и поиском. Если доступна одна страна — селектор скрывается, остаётся только код в префиксе.

#### Mask

Маска ввода определяется выбранной страной (`country.mask`) и меняется при смене страны. Префикс с кодом страны добавляется к итоговому значению.

#### options — настройка списка стран

Проп `options` (`CountrySettings`) ограничивает или переопределяет список (взаимоисключающие поля):

- `includedCountries` — оставить только перечисленные страны.
- `excludedCountries` — исключить перечисленные из встроенного списка.
- `overriddenOptions` — полностью заменить список собственными опциями.

#### Size (default `m`)

Размер поля наследуется от `FieldText`: `s`, `m`, `l`.

### Примеры использования

#### Базовый

Телефон с полным списком стран и поиском.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { FieldPhone } from '@ds/uikit-product-fields-predefined';
import { useRef, useState } from 'react';

export function FieldPhoneBasic() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: 320 }}>
        <FieldPhone label='Телефон' value={value} onChange={setValue} searchPlaceholder='Поиск страны' />
      </div>
    </PortalContextProvider>
  );
}
```

#### Ограниченный список стран

options.includedCountries оставляет только страны СНГ.

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import {
  ARMENIA_COUNTRY_CODE,
  BELARUS_COUNTRY_CODE,
  FieldPhone,
  KAZAKHSTAN_COUNTRY_CODE,
  RUSSIA_COUNTRY_CODE,
} from '@ds/uikit-product-fields-predefined';
import { useRef, useState } from 'react';

export function FieldPhoneCountrySettings() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative', width: 320 }}>
        <FieldPhone
          label='Телефон (СНГ)'
          value={value}
          onChange={setValue}
          options={{
            includedCountries: [
              RUSSIA_COUNTRY_CODE,
              BELARUS_COUNTRY_CODE,
              KAZAKHSTAN_COUNTRY_CODE,
              ARMENIA_COUNTRY_CODE,
            ],
          }}
        />
      </div>
    </PortalContextProvider>
  );
}
```

### Props

**FieldPhoneProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Подпись |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `hint` | `string` | — | Подсказка |
| `iconAfter` | `ReactNode` | — | Иконка справа от строки ввода |
| `iconBefore` | `ReactNode` | — | Иконка слева от строки ввода |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `label` | `string` | — | Заголовок |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `(((value: string) => void) & ((value: string) => void))` | — | Колбек смены значения |
| `onChangeCountry` | `((country: FieldPhoneOptionsProps) => void)` | — |  |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `options` | `CountrySettings` | — | Конфигурация для изменения стандартного списка стран |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Обязательное поле |
| `scrollList` | `boolean` | — | Скролл с ограничением высоты для списка стран. По умолчанию включён. |
| `searchPlaceholder` | `string` | — | Плейсхолдер поля поиска в выпадающем списке стран |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `type` | `"email"` \| `"number"` \| `"password"` \| `"tel"` \| `"text"` \| `"url"` | — | Тип инпута |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |

##### Related types

- `CountrySettings` = `({ overriddenOptions: FieldPhoneOptionsProps[]; } & { includedCountries?: undefined; excludedCountries?: undefined; }) | ({ includedCountries: Country[]; } & { overriddenOptions?: undefined; excludedCountries?: undefined; }) | ({ excludedCountries: Country[]; } & { overriddenOptions?: undefined; includedCountries?: undefined; })`

### Адаптивность

Выбор страны — адаптивный `Droplist` из `@ds/list`: на desktop анкорный popover, на mobile — список в `BottomSheet`. Раскладку даёт `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет.

`autoFocus` на mobile выключается (наследуется из `@ds/fields`) — вернуть можно пропом `layoutPresets={{ mobile: { autoFocus: true } }}`.

## FieldName

Поле «Имя» с встроенной yup-валидацией (латиница/цифры/.-_, до 64 символов) и режимом react-hook-form.

Поле ввода имени поверх `FieldText` с предустановленной yup-валидацией: только латиница, цифры, точка, дефис и подчёркивание; длина до 64 символов; по умолчанию обязательное. Лейбл и подпись подставляются из локали. Доступно в двух вариантах: standalone (`FieldName`, локальный стейт + `onValidationError`) и `FieldNameRHF` (интеграция с react-hook-form через `Controller`).

### Когда использовать

- Ввод технического имени сущности (сервис, ресурс, ключ) с ограничением на символы и длину.
- В форме на react-hook-form — вариант `FieldNameRHF`.

Когда **не** нужен `FieldName`:

- Произвольный текст без правил валидации — **`FieldText`**.
- Многострочное описание — **`FieldDescription`**.

### Анатомия

#### Валидация

Встроенная схема (yup):

- символы — `^[a-zA-Z0-9.\-_]*$` (иначе ошибка «недопустимые символы»);
- длина — до `maxLength` (по умолчанию 64), счётчик показывается при ошибке длины;
- `required` (по умолчанию `true`) — ошибка обязательности появляется после blur.

Через `customSchema` к встроенной схеме конкатенируются дополнительные правила. Так подключают data-зависимые проверки, которые компонент не может выполнить сам — например, уникальность имени по данным потребителя. Текст ошибки для этого случая уже есть в локали пакета (`FieldName.errorDuplicate` — «Такое название уже существует»):

```tsx
import { string } from 'yup'
import { fieldsPredefinedLocale } from '@ds/uikit-product-fields-predefined/locale'

const { t } = fieldsPredefinedLocale.useTranslations()

const uniqueSchema = string().test('unique', t('FieldName.errorDuplicate'), value => !existingNames.includes(value ?? ''))

<FieldName customSchema={uniqueSchema} />
```

#### Режимы

- `FieldName` — локальный стейт, ошибка отдаётся через `onValidationError(error)`.
- `FieldNameRHF` — `controllerProps` для react-hook-form; валидация регистрируется как `validate` в `Controller`.

#### Size (default `m`)

Размер поля наследуется от `FieldText`: `s`, `m`, `l`.

### Примеры использования

#### Базовый

Standalone-режим с локальным стейтом и валидацией.

```tsx
import { FieldName } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldNameBasic() {
  const [value, setValue] = useState('');

  return <FieldName value={value} onChange={setValue} />;
}
```

#### React Hook Form

FieldNameRHF внутри FormProvider.

```tsx
import { Button } from '@ds/button';
import { FieldNameRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { serviceName: string };

export function FieldNameRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { serviceName: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`name: ${values.serviceName}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}
      >
        <FieldNameRHF controllerProps={{ name: 'serviceName' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
```

### Props

**FieldNameProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `customSchema` | `StringSchema<string, AnyObject, undefined, "">` | — | Дополнительная yup-схема, конкатенируется к встроенной (обязательность, длина, допустимые символы). <br/> Через неё подключают data-зависимые проверки, которые компонент не может выполнить сам — например, <br/> проверку уникальности имени по данным потребителя. Текст ошибки можно взять из локали пакета: <br/> `fieldsPredefinedLocale.useTranslations().t('FieldName.errorDuplicate')`. |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `elementAfter` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот справа (кнопка / селект с опциональным выпадающим списком) |
| `elementBefore` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот слева (кнопка / селект с опциональным выпадающим списком) |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `iconAfter` | `ReactNode` | — | Иконка справа от строки ввода |
| `iconBefore` | `ReactNode` | — | Иконка слева от строки ввода |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `onValidationError` | `((error: ValidationError \| null) => void)` | — | Колбэк, вызываемый при изменении ошибки валидации |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `postfix` | `ReactNode` | — | Постфикс (текст или нода) |
| `prefix` | `ReactNode` | — | Префикс (текст или нода) |
| `prefixIcon` | `ReactNode` | — | Ведущая иконка. <br/> @deprecated Используйте `iconBefore` — он приоритетнее, если заданы оба. |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Обязательное поле |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `showLabel` | `boolean` | — | Показывать предустановленный лейбл «Имя» |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |

### Адаптивность

`autoFocus` на mobile выключается (наследуется из `@ds/fields`) — автофокус там открывает экранную клавиатуру без действия пользователя. Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет. Вернуть автофокус на mobile — пропом `layoutPresets`:

```tsx
<FieldName autoFocus layoutPresets={{ mobile: { autoFocus: true } }} />
```

`size` от раскладки не зависит — задаётся пропом (по умолчанию `m`) одинаково на всех раскладках.

## FieldDescription

Многострочное поле описания с yup-валидацией длины, опциональным раскрытием по кнопке и режимом react-hook-form.

Многострочное поле описания поверх `FieldTextArea` с встроенной yup-валидацией длины (до 255 символов, со счётчиком). По умолчанию необязательное. Доступно в двух вариантах: standalone (`FieldDescription`, локальный стейт + `onValidationError`) и `FieldDescriptionRHF` (react-hook-form через `Controller`). Опционально может сворачиваться в кнопку «Добавить описание».

### Когда использовать

- Ввод необязательного/обязательного описания сущности с ограничением длины.
- В форме на react-hook-form — вариант `FieldDescriptionRHF`.
- Когда описание необязательно и его лучше скрыть до клика — `addButton`.

Когда **не** нужен `FieldDescription`:

- Короткое однострочное имя — **`FieldName`**.

### Анатомия

#### Валидация

Встроенная схема (yup): обрезка пробелов (`trim`) и ограничение длины `maxLength` (по умолчанию 255) с сообщением и счётчиком. `customSchema` конкатенируется к встроенной. При `required` добавляется проверка обязательности.

#### addButton

Если `addButton` и поле необязательное (`required={false}`) — вместо textarea показывается кнопка «Добавить описание». Клик раскрывает поле и ставит в него фокус.

#### Режимы

- `FieldDescription` — локальный стейт, ошибка отдаётся через `onValidationError(error)`.
- `FieldDescriptionRHF` — `controllerProps` для react-hook-form.

#### Size (default `m`)

Размер поля наследуется от `FieldTextArea`: `s`, `m`, `l`.

### Примеры использования

#### Базовый

Standalone-режим с валидацией длины.

```tsx
import { FieldDescription } from '@ds/uikit-product-fields-predefined';

export function FieldDescriptionBasic() {
  return <FieldDescription />;
}
```

#### С кнопкой «Добавить»

Необязательное поле, свёрнутое в кнопку.

```tsx
import { FieldDescription } from '@ds/uikit-product-fields-predefined';

export function FieldDescriptionWithAddButton() {
  return <FieldDescription addButton />;
}
```

#### React Hook Form

FieldDescriptionRHF внутри FormProvider.

```tsx
import { Button } from '@ds/button';
import { FieldDescriptionRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { description: string };

export function FieldDescriptionRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { description: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`description: ${values.description}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}
      >
        <FieldDescriptionRHF controllerProps={{ name: 'description' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
```

### Props

**FieldDescriptionProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `addButton` | `boolean` | — | Поле появляется по кнопке «Добавить описание» (только для опционального поля) |
| `allowMoreThanMaxLength` | `boolean` | `true` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `customSchema` | `StringSchema<string, AnyObject, undefined, "">` | — | Дополнительная yup-схема, которая конкатенируется к встроенной |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `header` | `ReactNode` | — | Нода над textarea — ряд элементов до контента (Figma `elementWrapperBefore` / <br/> `slotBeforeContent`): тулбар с кнопками, чипами и т.п. |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `maxLength` | `number` | `255` | Максимальное количество символов |
| `maxRows` | `number` | `1000` | Максимальное количество строк (после — появляется скролл) |
| `minRows` | `number` | `3` | Минимальное количество строк |
| `onBlur` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: string, event?: ChangeEvent<HTMLTextAreaElement>) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования |
| `onFocus` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек фокуса |
| `onKeyDown` | `((event: KeyboardEvent<HTMLTextAreaElement>) => void)` | — | Колбек нажатия клавиши |
| `onValidationError` | `((error: ValidationError \| null) => void)` | — | Колбэк, вызываемый при изменении ошибки валидации (только в standalone-режиме) |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | `false` | Обязательное поле |
| `resizable` | `boolean` | `true` | Можно ли менять высоту мышкой за нижний угол. Игнорируется при `disabled` или `readonly`. |
| `showClearButton` | `boolean` | `true` | Кнопка очистки (видна при value && !readonly) |
| `showCopyButton` | `boolean` | `true` | Кнопка копирования (видна при value && !disabled, независимо от readonly) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | — | Проверка орфографии |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение (controlled-режим) |

### Адаптивность

`autoFocus` на mobile выключается (наследуется из `@ds/fields`) — автофокус там открывает экранную клавиатуру без действия пользователя. Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет. Вернуть автофокус на mobile — пропом `layoutPresets`:

```tsx
<FieldDescription autoFocus layoutPresets={{ mobile: { autoFocus: true } }} />
```

`size` от раскладки не зависит — задаётся пропом (по умолчанию `m`) одинаково на всех раскладках.

## FieldSelectCreate

Поле выбора из списка с действием «Создать» — под полем и в футере пустых состояний дроплиста; состояния data/error/noData/noResult и поиск.

Поле выбора поверх `FieldSelect` из `@ds/fields` со встроенной формой создания опции. Кнопка `+ Создать <entityName>` показывается под полем и в футере дроплиста; по клику открывается форма в `Drawer` или `Modal`. Пропсы поля передаются через `selectProps`, состояния списка и поиск — из `@ds/list`.

### Когда использовать

- Выбор из списка, где пользователь может тут же создать новый объект, если нужного нет.
- Асинхронная подгрузка с состояниями загрузки/ошибки/пустого результата.

Когда **не** нужен `FieldSelectCreate`:

- Простой выбор без создания — используйте `FieldSelect` из `@ds/fields`.

### Анатомия

#### Действие «Создать»

Кнопка `+ Создать <entityName>` рендерится в двух местах: под полем и в футере дроплиста (`SelectFooter`). По клику открывается форма создания:

- `Drawer` (по умолчанию) или `Modal` — задаётся через `createLayoutType`.
- Содержимое формы и заголовок задаются в `createLayoutProps` (`content` — форма, `title` — заголовок).
- Кнопки «Создать» / «Отмена» добавляет сам компонент; на «Создать» вызывается `submitHandler`.
- `submitHandler` возвращает `value` новой опции — в single-режиме она выбирается в поле; `afterClose` — колбэк после закрытия.

#### entityName

Название сущности в единственном (`single`, вин. падеж) и множественном (`plural`) числе. Из них собираются тексты: кнопка «Создать `single`», пустые состояния «`plural` не обнаружены / не найдены», ошибка «Не удалось загрузить `plural`».

#### Права (`permission`, default `canCreate`)

Ограничивает доступ к чтению и созданию:

- `canCreate` — доступны и выбор, и создание.
- `canRead` — поле активно, но кнопки «Создать» недоступны (с tooltip причины).
- `none` — поле недоступно (с tooltip).

#### Состояния списка

Управляются `@ds/list` по флагам `loading` / `dataError` / `dataFiltered` (передаются через `selectProps`):

- `data` — список опций.
- `error` — «Не удалось загрузить `plural`» + кнопка «Обновить» (`onRefetch`).
- `noData` — «`plural` не обнаружены»; иконку задаёт `entityIcon` (по умолчанию — поиск).
- `noResult` — «`plural` не найдены. Измените запрос или создайте `single`».

#### Режим выбора (`selectProps.selection`, default `single`)

Наследуется от `FieldSelect`: `single` — одна опция, `multiple` — несколько. В `multiple` возвращённое из `submitHandler` значение **не** выбирается автоматически — выбор оставляется потребителю.

#### Size (default `m`)

Размер поля задаётся через `selectProps.size`: `s`, `m`, `l`.

#### Открытие на выбранном элементе (`selectProps.scrollToSelectedItem`)

`FieldSelect` проксирует `scrollToSelectedItem` из `@ds/list` в дроплист — при открытии список прокручивается до выбранной опции:

```tsx
<FieldSelectCreate selectProps={{ scrollToSelectedItem: true }} … />
```

Работает и с `selectProps={{ virtualized: true }}`.

### Примеры использования

#### Базовый

«Создать» открывает форму создания; submitHandler добавляет опцию и выбирает её.

```tsx
import { FieldText } from '@ds/fields';
import { ItemId } from '@ds/list';
import { FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldSelectCreateBasic() {
  const [items, setItems] = useState([
    { id: '1', content: { label: 'Production' } },
    { id: '2', content: { label: 'Staging' } },
  ]);
  const [value, setValue] = useState<ItemId>();
  const [name, setName] = useState('');

  const submitHandler = () => {
    const id = String(items.length + 1);
    setItems(prev => [...prev, { id, content: { label: name.trim() || `Окружение ${id}` } }]);
    setName('');
    return Promise.resolve(id);
  };

  return (
    <div style={{ width: 320 }}>
      <FieldSelectCreate
        entityName={{ single: 'Окружение', plural: 'Окружения' }}
        selectProps={{ label: 'Окружение', items, value, onChange: setValue }}
        createLayoutProps={{
          title: 'Создание окружения',
          content: <FieldText label='Название' value={name} onChange={setName} />,
        }}
        submitHandler={submitHandler}
      />
    </div>
  );
}
```

#### Асинхронная загрузка

Состояние ошибки с кнопкой «Обновить» (onRefetch).

```tsx
import { ItemId } from '@ds/list';
import { FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldSelectCreateAsync() {
  const [value, setValue] = useState<ItemId>();
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(true);

  const load = () => {
    setDataError(false);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div style={{ width: 320 }}>
      <FieldSelectCreate
        entityName={{ single: 'Окружение', plural: 'Окружения' }}
        selectProps={{
          label: 'Окружение',
          items: [{ id: '1', content: { label: 'Production' } }],
          value,
          onChange: setValue,
          loading,
          dataError,
        }}
        onRefetch={load}
        createLayoutProps={{ title: 'Создание окружения', content: 'Форма создания' }}
        submitHandler={() => Promise.resolve('1')}
      />
    </div>
  );
}
```

#### Форма в модальном окне

createLayoutType=modal — форма создания открывается в модальном окне.

```tsx
import { FieldText } from '@ds/fields';
import { ItemId } from '@ds/list';
import { CREATE_LAYOUT_TYPE, FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldSelectCreateModal() {
  const [items, setItems] = useState([
    { id: '1', content: { label: 'Production' } },
    { id: '2', content: { label: 'Staging' } },
  ]);
  const [value, setValue] = useState<ItemId>();
  const [name, setName] = useState('');

  const submitHandler = () => {
    const id = String(items.length + 1);
    setItems(prev => [...prev, { id, content: { label: name.trim() || `Окружение ${id}` } }]);
    setName('');
    return Promise.resolve(id);
  };

  return (
    <div style={{ width: 320 }}>
      <FieldSelectCreate
        entityName={{ single: 'Окружение', plural: 'Окружения' }}
        selectProps={{ label: 'Окружение', items, value, onChange: setValue }}
        createLayoutType={CREATE_LAYOUT_TYPE.Modal}
        createLayoutProps={{
          title: 'Создание окружения',
          content: <FieldText label='Название' value={name} onChange={setName} />,
        }}
        submitHandler={submitHandler}
      />
    </div>
  );
}
```

### Props

**FieldSelectCreateProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `afterClose` | `(() => void)` | — | Колбэк после закрытия модалки/дровера создания. |
| `className` | `string` | — | CSS-класс корневой обёртки. |
| `createLayoutProps` | `ManagedLayoutKeys` \| `ModalProps` | — | Пропсы модалки создания (`content` — форма создания опции). <br/> Пропсы дровера создания (`content` — форма создания опции); `position` по умолчанию `right`. |
| `createLayoutType` | `"drawer"` \| `"modal"` | `drawer` | По клику на «Создать» открывается модальное окно. <br/> По клику на «Создать» открывается дровер (по умолчанию). |
| `data-test-id` | `string` | — |  |
| `entityIcon` | `EntityIcon` | — | Иконка пустого состояния `noData` (по умолчанию — иконка поиска). |
| `entityName` | `EntityName` | — | Название сущности в единственном и множественном числе — для кнопок и пустых состояний. |
| `onRefetch` | `(() => void)` | — | Повтор загрузки в состоянии ошибки (кнопка «Обновить» в футере `errorDataState`). |
| `permission` | `"canCreate"` \| `"canRead"` \| `"none"` | `canCreate` | Права пользователя: <br/> - `canCreate` (по умолчанию) — доступны и выбор, и создание; <br/> - `canRead` — поле активно, но создание недоступно (кнопки «Создать» с tooltip); <br/> - `none` — поле недоступно (с tooltip). |
| `selectProps` | `DroplistListProps` \| `DroplistMobileSlots` \| `EmptyState` \| `FieldSelectDecoratorProps` \| `PublicListContextType` \| `ScrollProps` \| `SelectFieldProps` \| `SelectionState` | — | Пропсы, прокидываемые в `FieldSelect` (`@ds/fields`). |
| `submitHandler` | `() => Promise<string \| void>` | — | Действие создания опции: возвращает `value` новой опции, которая выбирается в поле (single-режим). |

##### Related types

**EntityName**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `plural` | `string` | — | Множественное число — для текстов пустых состояний и ошибки. |
| `single` | `string` | — | Единственное число (винительный падеж) — для кнопки «Создать <single>». |

- `ManagedLayoutKeys` = `"approveButton"` \| `"cancelButton"` \| `"onClose"` \| `"open"`

### Адаптивность

Дроплист — адаптивный `Droplist` из `@ds/list`: на desktop анкорный popover, на mobile — список в `BottomSheet`. Раскладку даёт `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет.

`size` на всех раскладках — база `m`. Автофокус поля выключается на mobile (наследуется из `FieldSelect` / `@ds/fields`); вернуть — через `selectProps={{ layoutPresets: { mobile: { autoFocus: true } } }}`.

## FieldChat

Поле чата с многострочным вводом, прикреплением файлов и кнопкой отправки (Enter — отправка, Shift+Enter — перенос строки).

Поле чата поверх `FieldTextArea`. Многострочный ввод с автоматическим ростом высоты (1–4 строки), футером действий (прикрепление файлов и отправка) и списком прикреплённых вложений. Enter отправляет сообщение, Shift+Enter переносит строку. Прикреплённые файлы на desktop показываются под полем, на mobile — над ним.

### Когда использовать

- Поле ввода сообщения в чате или диалоге с ассистентом.
- Нужно прикрепление файлов рядом с вводом и отправка по Enter.

Когда **не** нужен `FieldChat`:

- Многострочное описание сущности без отправки/вложений — **`FieldDescription`**.
- Произвольный многострочный текст — **`FieldTextArea`**.

### Анатомия

#### Ввод

`FieldTextArea` с `minRows=1` и `maxRows=4`: поле растёт по мере набора текста и дальше скроллится. Плейсхолдер берётся из локали.

#### Футер действий

- Скрепка (`FileUpload`) — прикрепление файлов; видна только при переданном `attachment`. Тип допустимых файлов задаётся через `attachment.accept`.
- Кнопка отправки — активна, когда есть непустой текст или хотя бы один файл; иначе disabled.

#### Вложения

`attachment.files` рендерятся карточками: `AttachmentSquare` на desktop, полноширинный `Attachment` на mobile. Удаление — через `attachment.onFileDelete`.

#### Клавиатура

- Enter — отправка (вызывает `handleSubmit(value)`), если ввод валиден.
- Shift+Enter — перенос строки без отправки.

### Примеры использования

#### Базовый

Многострочный ввод с отправкой по Enter.

```tsx
import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldChatBasic() {
  const [value, setValue] = useState('');

  return <FieldChat value={value} onChange={setValue} handleSubmit={() => setValue('')} />;
}
```

#### С вложениями

Прикрепление и удаление файлов, отправка очищает поле и список.

```tsx
import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldChatWithAttachments() {
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FieldChat
      value={value}
      onChange={setValue}
      handleSubmit={() => {
        setValue('');
        setFiles([]);
      }}
      attachment={{
        files,
        accept: 'image/*,.pdf',
        onFilesUpload: uploaded => setFiles(prev => [...prev, ...uploaded]),
        onFileDelete: file => setFiles(prev => prev.filter(item => item !== file)),
      }}
    />
  );
}
```

### Props

**FieldChatProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `true` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `attachment` | `AttachmentSquareProps` \| `FileUploadProps` \| `NativeInputProps` | — | Прикрепление файлов |
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `caption` | `string` | — | Подпись |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `handleSubmit` | `(value: string) => void` | — | Колбек действия при отправке |
| `header` | `ReactNode` | — | Нода над textarea — ряд элементов до контента (Figma `elementWrapperBefore` / <br/> `slotBeforeContent`): тулбар с кнопками, чипами и т.п. |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `inputMode` | `"decimal"` \| `"email"` \| `"none"` \| `"numeric"` \| `"search"` \| `"tel"` \| `"text"` \| `"url"` | — | Режим виртуальной клавиатуры (`inputmode` нативного `<textarea>`) |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `maxLength` | `number` | — | Максимальное количество символов |
| `name` | `string` | — | HTML name |
| `onBlur` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: string, event?: ChangeEvent<HTMLTextAreaElement>) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования |
| `onFocus` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек фокуса |
| `readonly` | `boolean` | — | Только для чтения |
| `resizable` | `boolean` | `false` | Можно ли менять высоту мышкой за нижний угол. Игнорируется при `disabled` или `readonly`. |
| `showClearButton` | `boolean` | `true` | Кнопка очистки (видна при value && !readonly) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение (controlled-режим) |

### Адаптивность

Раскладку компонент берёт из `AdaptiveProvider` (`@ds/adaptive`) — отдельного пропа `layoutType` нет. На mobile прикреплённые файлы показываются **над** полем полноширинными карточками `Attachment` (на desktop — под полем, `AttachmentSquare`). Размер поля от раскладки не зависит.

`autoFocus` на mobile выключается (наследуется из `@ds/fields`) — он открывает экранную клавиатуру без действия пользователя. Вернуть на mobile — через `layoutPresets`:

```tsx
<FieldChat autoFocus layoutPresets={{ mobile: { autoFocus: true } }} />
```

Mobile включается автоматически при одном `<AdaptiveProvider>` в корне приложения (desktop-first).

## FieldCode

OTP-поле — код по ячейкам с автопереходом фокуса, вставкой кода целиком, resend-таймером и imperative ref.

Поле ввода одноразового кода (OTP): `codeLength` ячеек на `FieldText` из `@ds/fields`, автопереход фокуса при вводе, вставка кода целиком из буфера, колбек `onComplete` при заполнении всех ячеек. Опционально — кнопка повторной отправки кода с таймером (`resendCode`) и хук валидации `useFieldCodeValidate`.

### Когда использовать

- Подтверждение по SMS/email-коду: пользователь вводит фиксированное число цифр.
- Нужен автопереход фокуса между ячейками и вставка кода целиком.

Когда **не** нужен `FieldCode`:

- Числовой код как обычная строка без ячеек — **`FieldMask`** с маской `code`.

### Анатомия

#### Size (default `m`)

Размер ячеек и подписи наследуется от `FieldDecorator`:

- `s` — компактный (ячейка 32px).
- `m` — средний (ячейка 40px).
- `l` — крупный (ячейка 52px).

#### Слоты и состояния

- `label` — заголовок поля.
- `error` / `invalidCode` — текст ошибки; `error` приоритетнее.
- `showEmptyChars` — подсветка пустых ячеек (состояние «код не дописан»).
- `spacing` — визуальный разрыв после указанных индексов (`[2]` для формата `XXX XXX`).
- `stretchCells` — ячейки делят всю ширину контейнера; иначе фиксированная ширина по `size`.
- `resendCode` — кнопка повторной отправки: заблокирована с таймером `mm:ss`, пока `secondsToNextResend > 0`.

#### Imperative ref (`FieldCodeRef`)

- `moveFocus(index)` — перенести фокус на ячейку.
- `blurFields()` — снять фокус со всех ячеек.
- `resetCode()` — сбросить значение.

### Примеры использования

#### Базовый

Uncontrolled-ввод кода с onComplete.

```tsx
import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

export function FieldCodeBasic() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <FieldCode codeLength={6} label='Код подтверждения' value={value} onChange={setValue} onComplete={setCompleted} />
      <span>{completed ? `Код введён: ${completed}` : 'Введите 6 цифр'}</span>
    </div>
  );
}
```

#### Валидация

Хук useFieldCodeValidate: пустое значение и неполный код.

```tsx
import { FieldCode, useFieldCodeValidate } from '@ds/uikit-product-fields-predefined';
import { useState } from 'react';

const CODE_LENGTH = 6;

export function FieldCodeValidation() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const validateCode = useFieldCodeValidate({ codeLength: CODE_LENGTH });

  const handleChange = (next: string) => {
    setValue(next);
    setTouched(true);
  };

  return (
    <FieldCode
      codeLength={CODE_LENGTH}
      label='Код подтверждения'
      value={value}
      onChange={handleChange}
      error={touched ? validateCode(value) : undefined}
      showEmptyChars={touched}
    />
  );
}
```

#### Повторная отправка

resendCode c таймером обратного отсчёта.

```tsx
import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { useEffect, useState } from 'react';

const RESEND_COUNTDOWN_SECONDS = 10;

export function FieldCodeResend() {
  const [value, setValue] = useState('');
  const [secondsToNextResend, setSecondsToNextResend] = useState(RESEND_COUNTDOWN_SECONDS);

  useEffect(() => {
    if (secondsToNextResend <= 0) {
      return;
    }

    const timerId = window.setTimeout(() => setSecondsToNextResend(seconds => seconds - 1), 1000);

    return () => window.clearTimeout(timerId);
  }, [secondsToNextResend]);

  const handleResend = () => {
    setValue('');
    setSecondsToNextResend(RESEND_COUNTDOWN_SECONDS);
  };

  return (
    <FieldCode
      codeLength={6}
      label='Код подтверждения'
      value={value}
      onChange={setValue}
      resendCode={{ onResend: handleResend, secondsToNextResend }}
    />
  );
}
```

### Props

**FieldCodeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cellClassName` | `string` | — | CSS-класс ячейки кода |
| `className` | `string` | — | CSS-класс компонента |
| `codeLength` | `number` | — | Количество цифр в коде (целое ≥ 1) |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка |
| `invalidCode` | `string` | — | Сообщение при неверном коде, если не передан свой `error` |
| `label` | `string` | — | Заголовок |
| `onChange` | `((code: string) => void)` | — | Колбек изменения значения |
| `onComplete` | `((code: string) => void)` | — | Колбек ввода всех символов кода |
| `resendCode` | `ResendCodeProps` | — 

##### Related types

**ResendCodeProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean \| undefined` | — | Отключена |
| `onResend` | `() => void` | — | Колбек отправки нового кода |
| `secondsToNextResend` | `number` | — | Количество секунд до следующей отправки кода |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |

### Адаптивность

Раскладка читается из `AdaptiveProvider` (`@ds/adaptive`); отдельного пропа `layoutType` нет. На mobile компонент не переносит фокус автоматически (ни при монтировании, ни при `resetCode`) — чтобы экранная клавиатура не открывалась без действия пользователя. Размер на mobile не меняется — база `m`.

## FieldDescriptionRHF

```tsx
import { Button } from '@ds/button';
import { FieldDescriptionRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { description: string };

export function FieldDescriptionRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { description: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`description: ${values.description}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}
      >
        <FieldDescriptionRHF controllerProps={{ name: 'description' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
```

### Props `FieldDescriptionRHFProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `addButton` | `boolean` | — | Поле появляется по кнопке «Добавить описание» (только для опционального поля) |
| `allowMoreThanMaxLength` | `boolean` | `true` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoFocus` | `boolean` | — | Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `controllerProps` | `Omit<ControllerProps<FieldValues>, "disabled" \| "render" \| "rules">` | — | Режим контроллера с использованием react-hook-form |
| `customSchema` | `StringSchema<string, AnyObject, undefined, "">` | — | Дополнительная yup-схема, которая конкатенируется к встроенной |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | — | Поле выключено |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля |
| `header` | `ReactNode` | — | Нода над textarea — ряд элементов до контента (Figma `elementWrapperBefore` / <br/> `slotBeforeContent`): тулбар с кнопками, чипами и т.п. |
| `id` | `string` | — | HTML id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `maxLength` | `number` | `255` | Максимальное количество символов |
| `maxRows` | `number` | `1000` | Максимальное количество строк (после — появляется скролл) |
| `minRows` | `number` | `3` | Минимальное количество строк |
| `onBlur` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек блюра |
| `onChange` | `((value: string, event?: ChangeEvent<HTMLTextAreaElement>) => void)` | — | Колбек смены значения |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования |
| `onFocus` | `((event: FocusEvent<HTMLTextAreaElement, Element>) => void)` | — | Колбек фокуса |
| `onKeyDown` | `((event: KeyboardEvent<HTMLTextAreaElement>) => void)` | — | Колбек нажатия клавиши |
| `readonly` | `boolean` | — | Только для чтения |
| `required` | `boolean` | `false` | Обязательное поле |
| `resizable` | `boolean` | `true` | Можно ли менять высоту мышкой за нижний угол. Игнорируется при `disabled` или `readonly`. |
| `showClearButton` | `boolean` | `true` | Кнопка очистки (видна при value && !readonly) |
| `showCopyButton` | `boolean` | `true` | Кнопка копирования (видна при value && !disabled, независимо от readonly) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `size` | `"l"` \| `"m"` \| `"s"` | `m` | Размер |
| `spellCheck` | `boolean` | — | Проверка орфографии |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение (controlled-режим) |

## FieldNameRHF

```tsx
import { Button } from '@ds/button';
import { FieldNameRHF } from '@ds/uikit-product-fields-predefined';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = { serviceName: string };

export function FieldNameRHFExample() {
  const methods = useForm<FormValues>({ defaultValues: { serviceName: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(values => alert(`name: ${values.serviceName}`))}
        style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}
      >
        <FieldNameRHF controllerProps={{ name: 'serviceName' }} />
        <Button type='submit' label='Отправить' />
      </form>
    </FormProvider>
  );
}
```

### Props `FieldNameRHFProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowMoreThanMaxLength` | `boolean` | `false` | Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти). |
| `autoComplete` | `string \| boolean` | `false` | Включен ли автокомплит для поля |
| `autoFocus` | `boolean` | `false` | Включен ли авто-фокус для поля |
| `background` | `boolean` | `true` | Фон поля (acrylic) |
| `className` | `string` | — | CSS-класс <br/> CSS-класс корня `FieldDecorator` |
| `controllerProps` | `Omit<ControllerProps<FieldValues>, "disabled" \| "render" \| "rules">` | — | Режим контроллера с использованием react-hook-form |
| `customSchema` | `StringSchema<string, AnyObject, undefined, "">` | — | Дополнительная yup-схема, конкатенируется к встроенной (обязательность, длина, допустимые символы). <br/> Через неё подключают data-зависимые проверки, которые компонент не может выполнить сам — например, <br/> проверку уникальности имени по данным потребителя. Текст ошибки можно взять из локали пакета: <br/> `fieldsPredefinedLocale.useTranslations().t('FieldName.errorDuplicate')`. |
| `data-test-id` | `string` | — |  |
| `defaultValue` | `string` | — | Начальное значение (uncontrolled-режим) |
| `disabled` | `boolean` | `false` | Поле выключено <br/> Является ли поле деактивированным |
| `elementAfter` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот справа (кнопка / селект с опциональным выпадающим списком) |
| `elementBefore` | `FieldElementButtonProps` \| `FieldElementSlot` | — | Слот слева (кнопка / селект с опциональным выпадающим списком) |
| `error` | `string` | — | Ошибка |
| `fieldClassName` | `string` | — | CSS-класс оболочки поля ввода |
| `iconAfter` | `ReactNode` | — | Иконка справа от строки ввода |
| `iconBefore` | `ReactNode` | — | Иконка слева от строки ввода |
| `id` | `string` | — | Значение html-атрибута id |
| `innerRef` | `Ref<HTMLDivElement>` | — | Ref на корневой DOM-элемент |
| `labelFor` | `string` | — | HTML-атрибут `for` для `<label>` |
| `labelTooltip` | `QuestionTooltipProps` | — | Подсказка для заголовка |
| `layoutPresets` | `FieldLayoutPresets` | — | Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен <br/> (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`. |
| `length` | `{ current: number; max?: number; }` | — | Допустимая длина текста |
| `max` | `number` | — | Максимальное значение поля |
| `maxLength` | `number` | — | Максимальная длина вводимого значения |
| `min` | `number` | — | Минимальное значение поля |
| `name` | `string` | — | Значение html-атрибута name |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки потери фокуса |
| `onChange` | `((value: string) => void)` | — | Колбек смены значения |
| `onClearButtonClick` | `(() => void)` | — | Колбек клика по кнопке очистки |
| `onClick` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки клика |
| `onCopyButtonClick` | `(() => void)` | — | Колбек после копирования значения в буфер |
| `onFocus` | `FocusEventHandler<HTMLInputElement>` | — | Колбек обработки получения фокуса |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement>` | — | Колбек обработки начала нажатия клавиши клавиатуры |
| `onMouseDown` | `MouseEventHandler<HTMLInputElement>` | — | Колбек обработки нажатия кнопки мыши |
| `onPaste` | `ClipboardEventHandler<HTMLInputElement>` | — | Колбек обработки вставки значения |
| `outline` | `boolean` | `true` | Разделитель между основным полем и слотами `elementBefore` / `elementAfter` |
| `pattern` | `string` | — | Регулярное выражение валидного инпута |
| `postfix` | `ReactNode` | — | Постфикс (текст или нода) |
| `prefix` | `ReactNode` | — | Префикс (текст или нода) |
| `prefixIcon` | `ReactNode` | — | Ведущая иконка. <br/> @deprecated Используйте `iconBefore` — он приоритетнее, если заданы оба. |
| `readonly` | `boolean` | `false` | Только для чтения <br/> Является ли поле доступным только для чтения |
| `required` | `boolean` | — | Обязательное поле |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки значения (как в Search) |
| `showCopyButton` | `boolean` | `true` | Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`) |
| `showHintIcon` | `boolean` | — | Отображение иконки у подсказки |
| `showLabel` | `boolean` | — | Показывать предустановленный лейбл «Имя» |
| `size` | `"l"` \| `"m"` \| `"s"` | — | Размер |
| `spellCheck` | `boolean` | `true` | Значение атрибута spellcheck (проверка орфографии) |
| `step` | `string \| number` | — | Максимальное значение поля |
| `tabIndex` | `number` | `0` | Значение атрибута tab-index |
| `validationState` | `"default"` \| `"error"` \| `"success"` \| `"valid"` \| `"warning"` | — | Состояние валидации |
| `value` | `string` | — | Значение поля (controlled-режим) |
