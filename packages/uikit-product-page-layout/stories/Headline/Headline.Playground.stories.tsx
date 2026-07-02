import { Button } from '@ds/button';
import { Status } from '@ds/status';
import { Headline } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Headline> = {
  title: 'Uikit Product/PageLayout/Headline',
  component: Headline,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Виртуальные машины',
    truncateTitle: false,
    subHeader: 'Управление инстансами проекта',
    afterHeadline: <Status label='Активно' appearance='green' />,
    actions: <Button label='Создать' />,
    'data-test-id': TEST_IDS.headline.root,
  },
  argTypes: {
    truncateTitle: { control: 'boolean' },
    beforeHeadline: { table: { disable: true } },
    afterHeadline: { table: { disable: true } },
    actions: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    subHeader: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Headline>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Заголовок страницы со слотами: before/after, действия и подзаголовок.</DemoHint>
        <DemoActions block>
          <Headline {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.headline.root)).toBeVisible();
  },
};
