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
