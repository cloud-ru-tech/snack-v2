# ConfigSelector

`@ds/uikit-product-config-selector` — Chip-toggle для выбора одной опции конфигурации — кликабельный chip с состояниями checked / available / disabled и tooltip-подсказками.

Chip-toggle для выбора опции конфигурации. Под капотом — скрытый `<input type=checkbox>` в `<label>`: chip кликабелен целиком, поддерживает фокус с клавиатуры и tooltip-подсказки. Компонент **controlled** — состояние `checked` хранится снаружи.

## Когда использовать

- Выбор одного значения из набора equal-weight опций конфигурации (тариф, размер инстанса, регион), когда их удобно показать рядом как chips.
- Когда у опции нужно подсветить «рекомендованность» (`available`) или объяснить недоступность (`disabled`) через tooltip.

Когда **не** нужен `ConfigSelector`:

- Бинарная настройка с заголовком и описанием:
  - используйте **`SwitchRow`**.
- Множественный выбор тегов/фильтров:
  - используйте `Chip` / `Tag`.

## Анатомия

### Состояния

- `checked` — выбранная опция: светло-зелёный tint (activated state-layer), accent-обводка, тёмно-зелёный текст. Управляется через `checked` + `onChange(checked, e)`.
- `available` — accent-обводка для рекомендуемой опции. Опционально `availableTip` — tooltip, который показывается, пока опция не выбрана.
- `disabled` — клики игнорируются. Опционально `disabledTip` — tooltip-объяснение.

### Слоты

- `label` — обязательный текст chip. Длинный лейбл обрезается многоточием.

## Установка

```bash
pnpm add @ds/uikit-product-config-selector
```

```ts
import { ConfigSelector } from '@ds/uikit-product-config-selector'
```

## Примеры использования

### Базовый ConfigSelector

```tsx
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Basic() {
  const [checked, setChecked] = useState(false);

  return <ConfigSelector label='Авторазвёртывание' checked={checked} onChange={setChecked} />;
}
```

### Рекомендуемая опция (available + tooltip)

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Available() {
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider>
      <ConfigSelector
        label='Рекомендуемый тариф'
        available
        availableTip='Подходит для большинства проектов'
        checked={checked}
        onChange={setChecked}
      />
    </PortalContextProvider>
  );
}
```

### Disabled с tooltip-объяснением

```tsx
import { PortalContextProvider } from '@ds/portal-context';
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

export function Disabled() {
  const [checked, setChecked] = useState(false);

  return (
    <PortalContextProvider>
      <ConfigSelector
        label='Премиум-конфигурация'
        disabled
        disabledTip='Недоступно на текущем тарифе'
        checked={checked}
        onChange={setChecked}
      />
    </PortalContextProvider>
  );
}
```

### Группа с single-select

Несколько chip’ов, где выбран ровно один.

```tsx
import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { useState } from 'react';

const OPTIONS = ['nano', 'micro', 'standard', 'large'] as const;

export function Group() {
  const [selected, setSelected] = useState<(typeof OPTIONS)[number]>('micro');

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {OPTIONS.map(option => (
        <ConfigSelector
          key={option}
          label={option}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      ))}
    </div>
  );
}
```

## Props

**ConfigSelectorProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `available` | `boolean` | — | Доступна ли опция |
| `availableTip` | `ReactNode` | — | Тултип для доступной опции |
| `checked` | `boolean` | — | Отмечен ли компонент |
| `className` | `string` | — | CSS-класс |
| `data-test-id` | `string` | — |  |
| `disabled` | `boolean` | — | Деактивирован ли компонент |
| `disabledTip` | `ReactNode` | — | Тултип для деактивированного компонента |
| `label` | `string` | — | Лейбл |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` | — | Колбек смены значения |
| `tabIndex` | `number` | `0` | HTML tab index |

## Доступность

Компонент основан на скрытом checkbox — это корректно для одиночного toggle (независимое вкл/выкл).

Для группового single-select (несколько `ConfigSelector` с `checked` ровно у одного, см. пример «Группа с single-select») семантика остаётся checkbox: скринридер озвучивает каждый chip как «checkbox» без контекста «1 из N». Checkbox-семантика выбрана осознанно — компонент переиспользуется в обоих сценариях и не навязывает radio-группу.

Если групповой контекст для скринридера обязателен, набор chip оборачивается в контейнер с `role='radiogroup'` и доступным именем (`aria-label` / `aria-labelledby`); ARIA-роль элементов при этом остаётся на стороне потребителя.
