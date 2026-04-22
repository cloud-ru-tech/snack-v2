import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { AdaptiveInfoRow, AdaptiveInfoRowProps, LAYOUT_TYPE, POSITION } from '../../src';

type Args = AdaptiveInfoRowProps;

const meta: Meta<Args> = {
  title: 'Components/UikitProductInfoRow/AdaptiveInfoRow',
  component: AdaptiveInfoRow,
  parameters: { layout: 'padded' },
  args: {
    layoutType: LAYOUT_TYPE.Compact,
    position: POSITION.Inner,
    label: 'Адаптивная строка',
    content: 'Значение',
    'data-test-id': 'adaptive-info-row',
    topDivider: true,
    bottomDivider: true,
    width: 'fixed',
    column: '1',
    maxWidth: false,
    rowActions: {
      first: { icon: <PlaceholderSVG />, label: '' },
    },
  },
  argTypes: {
    layoutType: {
      control: 'radio',
      options: Object.values(LAYOUT_TYPE),
      description: 'compact — горизонтальный InfoRow; comfort — MobileInfoRow + density comfort',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: 'Playground',
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('adaptive-info-row')).toBeVisible();
  },
};
