import { SearchPrivate, SIZE } from '@ds/search-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof SearchPrivate> = {
  title: 'Components/SearchPrivate',
  component: SearchPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    size: SIZE.S,
    placeholder: 'Поиск',
    disabled: false,
    loading: false,
    showClearButton: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchPrivate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Приватная база поискового инпута без декора.</DemoHint>
        <DemoActions align='center'>
          <SearchPrivate {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
