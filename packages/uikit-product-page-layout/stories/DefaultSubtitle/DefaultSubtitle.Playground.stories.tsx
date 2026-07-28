import { DefaultSubtitle } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DefaultSubtitle> = {
  title: 'Uikit Product/PageLayout/DefaultSubtitle',
  component: DefaultSubtitle,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'ID проекта',
    value: { content: 'prj-9f2c-1a8b-4d7e', valueToCopy: 'prj-9f2c-1a8b-4d7e' },
    labelTooltip: 'Уникальный идентификатор проекта',
    'data-test-id': TEST_IDS.defaultSubtitle.root,
  },
  argTypes: {
    value: { table: { disable: true } },
    labelTooltip: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultSubtitle>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Подзаголовок с подписью, копируемым значением и тултипом-подсказкой.</DemoHint>
        <DemoActions align='center'>
          <DefaultSubtitle {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.defaultSubtitle.root)).toBeVisible();
  },
};
