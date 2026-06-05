import { CheckSVG, CopySVG, CrossSVG } from '@ds/icons';
import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

function BulkActionsExample() {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Bulk actions</DemoTitle>
        <DemoHint>Строка bulkTool под чипами: чекбокс, счётчик, tonal-кнопки у лейбла и overflow в «⋯».</DemoHint>
        <DemoActions block>
          <div className={styles.containerPlayground} data-test-id={TEST_IDS.example}>
            <Toolbar
              data-test-id={TEST_IDS.root}
              search={{ value: search, onChange: setSearch }}
              checked={checked}
              indeterminate={false}
              selectedCount={checked ? 5 : 0}
              totalCount={100}
              onCheck={() => setChecked(v => !v)}
              bulkActions={[
                {
                  label: 'Подтвердить',
                  icon: CheckSVG,
                  onClick: () => undefined,
                  'data-test-id': TOOLBAR_TEST_IDS.confirmAction,
                },
                {
                  label: 'Отклонить',
                  icon: CrossSVG,
                  onClick: () => undefined,
                  'data-test-id': TOOLBAR_TEST_IDS.rejectAction,
                },
                {
                  label: 'Копировать',
                  icon: CopySVG,
                  onClick: () => undefined,
                  'data-test-id': TOOLBAR_TEST_IDS.deleteAction,
                },
              ]}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof BulkActionsExample> = {
  title: 'Components/Toolbar/Examples/BulkActions',
  component: BulkActionsExample,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BulkActionsExample>;

export const BulkActions: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TOOLBAR_TEST_IDS.checkbox)).toBeVisible();
    await expect(within(canvasElement).getByTestId(TOOLBAR_TEST_IDS.bulkActions)).toBeVisible();
  },
};
