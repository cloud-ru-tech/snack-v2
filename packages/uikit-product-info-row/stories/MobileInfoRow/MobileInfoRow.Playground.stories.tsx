import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { MobileInfoRow, MobileInfoRowProps, POSITION } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<MobileInfoRowProps> = {
  title: 'Uikit Product/InfoRow/MobileInfoRow',
  component: MobileInfoRow,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Мобильная метка',
    content: 'Значение поля',
    'data-test-id': TEST_IDS.mobileInfoRow.root,
    topDivider: true,
    bottomDivider: true,
    loading: false,
    position: POSITION.Inner,
    rowActions: {
      first: { icon: <PlaceholderSVG />, label: '' },
      second: { icon: <PlaceholderSVG />, label: '' },
    },
  },
  argTypes: {
    position: { control: 'select', options: Object.values(POSITION) },
    labelTooltip: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Мобильный вариант InfoRow с вертикальной раскладкой.</DemoHint>
        <DemoActions align='center'>
          <MobileInfoRow {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.mobileInfoRow.root)).toBeVisible();
  },
};
