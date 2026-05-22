import { LOADER_SIZE, Spinner } from '@ds/loader';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Loader/Spinner',
  component: Spinner,
  parameters: { layout: 'fullscreen' },
  args: { size: LOADER_SIZE.M, 'data-test-id': TEST_IDS.spinner.root },
  argTypes: {
    size: { control: 'radio', options: Object.values(LOADER_SIZE), description: 'Размер' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Спиннер-лоадер с тремя размерами.</DemoHint>
        <DemoActions align='center'>
          <Spinner {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.spinner.root)).toBeVisible();
  },
};
