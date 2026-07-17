import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { InfoRow, InfoRowProps, POSITION } from '../../src';
import { TEST_IDS } from '../testIds';

type Args = InfoRowProps;

const meta: Meta<Args> = {
  title: 'Uikit Product/InfoRow/InfoRow',
  component: InfoRow,
  parameters: { layout: 'fullscreen' },
  args: {
    position: POSITION.Inner,
    label: 'Адаптивная строка',
    content: 'Значение',
    'data-test-id': TEST_IDS.infoRow.root,
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
          <InfoRow {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.infoRow.root)).toBeVisible();
  },
};
