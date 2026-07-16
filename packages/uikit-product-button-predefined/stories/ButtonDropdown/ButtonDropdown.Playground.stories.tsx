import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';
import styles from './styles.module.scss';

const items = [
  { id: '1', content: { label: 'Option A' }, onClick: () => undefined },
  { id: '2', content: { label: 'Option B' }, onClick: () => undefined },
];

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Uikit Product/ButtonPredefined/ButtonDropdown',
  component: ButtonDropdown,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Period',
    size: 's',
    items,
    closeDroplistOnItemClick: true,
    'data-test-id': TEST_IDS.buttonDropdown,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonDropdown>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Function button with droplist: anchored popover on desktop, bottom sheet on mobile. Layout is driven by the
          global AdaptiveProvider — switch it via the toolbar layoutType global.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <ButtonDropdown {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.buttonDropdown)).toBeVisible();
  },
};
