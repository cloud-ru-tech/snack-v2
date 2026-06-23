import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { NoAccess, NoAccessProps } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<NoAccessProps> = {
  title: 'Uikit Product/Layout/Layout/NoAccess',
  id: 'uikit-product-layout-noaccess',
  component: NoAccess,
  parameters: { layout: 'fullscreen' },
  args: {
    serviceName: 'Название сервиса',
    'data-test-id': TEST_IDS.noAccess.root,
  },
};

export default meta;

type Story = StoryObj<NoAccessProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Экран ограниченного доступа с локализованным сообщением.</DemoHint>
        <DemoActions align='center'>
          <NoAccess {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.noAccess.root)).toBeVisible();
  },
};
