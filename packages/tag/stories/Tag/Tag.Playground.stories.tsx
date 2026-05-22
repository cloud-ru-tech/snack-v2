import { APPEARANCE, SIZE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tag',
  component: Tag,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Тег-метка с настройкой размера и цветовой схемы appearance.</DemoHint>
        <DemoActions align='center'>
          <Tag {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Tag',
    size: SIZE.Xs,
    appearance: APPEARANCE.Neutral,
    'data-test-id': TEST_IDS.tag.root,
  },
  argTypes: {
    size: { control: 'select', options: Object.values(SIZE) },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tag.root)).toBeVisible();
  },
};
