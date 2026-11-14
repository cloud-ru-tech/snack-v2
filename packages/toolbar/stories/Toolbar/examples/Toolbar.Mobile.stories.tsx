import { LAYOUT_TYPE } from '@ds/adaptive';
import { CheckSVG, CrossSVG } from '@ds/icons/interface/system';
import { Checkbox } from '@ds/toggles';
import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, LayoutScope } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

function MobileExample() {
  const selectionToggleId = useId();
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Mobile</DemoTitle>
        <DemoHint>Действия над выбранными строками автоматически открываются в BottomSheet.</DemoHint>
        <DemoActions block>
          <label className={styles.mobileSelectionControl} htmlFor={selectionToggleId}>
            <Checkbox
              id={selectionToggleId}
              size='s'
              checked={checked}
              onChange={setChecked}
              data-test-id={TEST_IDS.mobileSelectionToggle}
            />
            <span className={styles.mobileSelectionControlLabel}>Есть выбранные строки таблицы</span>
          </label>
          <div className={styles.containerMobile}>
            <LayoutScope layoutType={LAYOUT_TYPE.Mobile}>
              <Toolbar
                data-test-id={TEST_IDS.mobile}
                search={{ value: search, onChange: setSearch }}
                onRefresh={() => undefined}
                moreActions={[{ content: { label: 'Действие' }, onClick: () => undefined }]}
                checked={checked}
                onCheck={() => setChecked(v => !v)}
                selectedCount={checked ? 12 : 0}
                totalCount={100}
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
                ]}
              />
            </LayoutScope>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof MobileExample> = {
  title: 'Components/Toolbar/Examples/Mobile',
  component: MobileExample,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof MobileExample>;

export const Mobile: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId(TEST_IDS.mobile)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.mobileSelectionToggle)).toBeVisible();

    await expect(
      within(canvasElement.ownerDocument.body).getByTestId(TOOLBAR_TEST_IDS.mobileBulkActionsSheet),
    ).toBeVisible();
    await expect(
      within(canvas.getByTestId(TEST_IDS.mobile)).queryByTestId(TOOLBAR_TEST_IDS.confirmAction),
    ).not.toBeInTheDocument();
  },
};
