# BlockPredefined

`@ds/uikit-product-block-predefined` — Готовые блоки для разделов продуктовой страницы.

**Simple** — блок с заголовком, действиями и областью для содержимого. На мобильном действия переходят под заголовок.

## Установка

```bash
pnpm add @ds/uikit-product-block-predefined
```

```tsx
import { BlockPredefinedSimple } from '@ds/uikit-product-block-predefined';
```

## BlockPredefinedSimple

```tsx
import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Button } from '@ds/button';
import { ChildThemeProvider, PLATFORM } from '@ds/theme';
import { BlockPredefinedSimple } from '@ds/uikit-product-block-predefined';
import { useState } from 'react';

import styles from '../styles.module.scss';

function ExportButton({ onClick }: { onClick(): void }) {
  return <Button label='Экспортировать' view='outline' appearance='neutral' onClick={onClick} />;
}

export function CustomExportAction() {
  const [message, setMessage] = useState('');
  const exportMembers = () => setMessage('Выбрано действие «Экспортировать»');

  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <ChildThemeProvider value={{ platform: PLATFORM.WebMobile }}>
        <div className={styles.preview}>
          <div className={styles.mobile}>
            <BlockPredefinedSimple
              title='Участники проекта'
              maxVisibleActionsItems={1}
              actions={[
                { label: 'Пригласить', onClick: () => setMessage('Выбрано действие «Пригласить»') },
                {
                  variant: 'custom',
                  render: () => ({
                    default: <ExportButton onClick={exportMembers} />,
                    asListItem: { content: { label: 'Экспортировать' }, onClick: exportMembers },
                  }),
                },
              ]}
            >
              <span role='status'>{message || 'В проекте три участника.'}</span>
            </BlockPredefinedSimple>
          </div>
        </div>
      </ChildThemeProvider>
    </AdaptiveProvider>
  );
}
```

### Props `BlockPredefinedSimpleProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Action` \| `ButtonDropdownDroplistConfig` \| `ButtonDroplistProps` \| `ButtonKebabProps` \| `CustomAction` \| `QuotaWidgetPropsBase` | `[]` | Действия в порядке приоритета. При нехватке ширины скрываются в меню, начиная с конца. |
| `children` | `ReactNode` | — | Содержимое под шапкой. |
| `data-test-id` | `string` | — | Стабильный идентификатор для e2e/tests |
| `maxVisibleActionsItems` | `number` | `1` | Только mobile: максимальное число действий в строке. |
| `title` | `string` | — | Заголовок секции. Переносится на несколько строк без обрезания. |
