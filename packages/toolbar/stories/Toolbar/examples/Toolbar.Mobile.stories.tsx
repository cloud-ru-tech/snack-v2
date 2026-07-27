import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { CheckSVG, CrossSVG } from '@ds/icons/interface/system';
import { Checkbox } from '@ds/toggles';
import { TEST_IDS as TOOLBAR_TEST_IDS, Toolbar } from '@ds/toolbar';
import { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

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
        <DemoHint>
          Mobile: bulk-действия в BottomSheet без затемнения фона (пока есть выбор); overflow «⋯» — отдельный
          BottomSheet с backdrop.
        </DemoHint>
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
            <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
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
                  { label: 'Подтвердить', icon: CheckSVG, onClick: () => undefined },
                  { label: 'Отклонить', icon: CrossSVG, onClick: () => undefined },
                ]}
              />
            </AdaptiveProvider>
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
  globals: {
    density: 'comfort',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId(TEST_IDS.mobile)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.mobileSelectionToggle)).toBeVisible();

    // На mobile bulk-чекбокс рендерится и в строке тулбара, и в BottomSheet
    // (обе точки — один слот select-all, общий data-test-id из @ds/toolbar).
    const bulkCheckboxes = canvas.getAllByTestId(TOOLBAR_TEST_IDS.checkbox);
    expect(bulkCheckboxes.length).toBeGreaterThan(0);
    await expect(bulkCheckboxes[0]).toBeVisible();
  },
};
