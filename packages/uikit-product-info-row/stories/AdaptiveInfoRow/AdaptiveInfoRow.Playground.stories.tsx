import { PlaceholderSVG } from '@ds/icons';
import { LAYOUT_TYPE } from '@ds/utils';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { AdaptiveInfoRow, AdaptiveInfoRowProps, POSITION } from '../../src';
import { TEST_IDS } from '../testIds';

type Args = AdaptiveInfoRowProps;

const meta: Meta<Args> = {
  title: 'Uikit Product/InfoRow/AdaptiveInfoRow',
  component: AdaptiveInfoRow,
  parameters: { layout: 'fullscreen' },
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    position: POSITION.Inner,
    label: 'Адаптивная строка',
    content: 'Значение',
    'data-test-id': TEST_IDS.adaptiveInfoRow.root,
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
      control: 'select',
      options: Object.values(LAYOUT_TYPE),
      description: '`desktop` — горизонтальный InfoRow; `mobile` — MobileInfoRow + density comfort',
    },
    position: {
      control: 'select',
      options: Object.values(POSITION),
      description: 'Позиция строки в списке (для mobile layout)',
    },
    label: { control: 'text' },
    content: { control: 'text' },
    topDivider: { control: 'boolean' },
    bottomDivider: { control: 'boolean' },
    width: { control: 'select', options: ['fixed', 'full'], description: 'Ширина строки' },
    column: { control: 'select', options: ['1', '2'], description: 'Ось Figma: число колонок значений' },
    maxWidth: { control: 'boolean', description: 'Ось Figma maxWidth' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>InfoRow с автоматическим переключением между desktop и mobile layout.</DemoHint>
        <DemoActions align='center'>
          <AdaptiveInfoRow {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.adaptiveInfoRow.root)).toBeVisible();
  },
};
