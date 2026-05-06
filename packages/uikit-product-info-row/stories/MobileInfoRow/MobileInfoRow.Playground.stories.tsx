import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { MobileInfoRow, MobileInfoRowProps, POSITION } from '../../src';

const meta: Meta<MobileInfoRowProps> = {
  title: 'Uikit Product/InfoRow/MobileInfoRow',
  component: MobileInfoRow,
  parameters: { layout: 'padded' },
  args: {
    label: 'Мобильная метка',
    content: 'Значение поля',
    'data-test-id': 'mobile-info-row',
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
  name: 'Playground',
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('mobile-info-row')).toBeVisible();
  },
};
