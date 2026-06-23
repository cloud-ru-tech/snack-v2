import { SELECTION_MODE } from '@ds/toggles';
import { GAP, ORIENTATION, ToggleCard, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';
import styles from './styles.module.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Uikit Product/TogglesPredefined/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'fullscreen' },
  args: {
    orientation: ORIENTATION.Vertical,
    gap: GAP.S,
    breakpoint: 0,
    selectionMode: SELECTION_MODE.Single,
    defaultValue: 'pro',
    'data-test-id': TEST_IDS.group,
  },
  argTypes: {
    orientation: { control: 'radio', options: Object.values(ORIENTATION) },
    gap: { control: 'radio', options: Object.values(GAP) },
    selectionMode: { control: 'radio', options: Object.values(SELECTION_MODE) },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Группа карточек выбора. orientation / gap / breakpoint управляют раскладкой.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.wide}>
            <ToggleGroup {...args}>
              <ToggleCard value='start' title='Тариф Start' description='10 ГБ хранилища' />
              <ToggleCard value='pro' title='Тариф Pro' description='100 ГБ хранилища' />
              <ToggleCard value='enterprise' title='Тариф Enterprise' description='Безлимит' />
            </ToggleGroup>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.group)).toBeVisible();
  },
};
