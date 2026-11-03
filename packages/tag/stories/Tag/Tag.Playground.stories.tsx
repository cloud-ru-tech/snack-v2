import { APPEARANCE, SIZE, Tag, TagProps } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type StoryArgs = TagProps & { tooltipText?: string };

const meta = {
  title: 'Components/Tag/Tag',
  component: Tag,
  parameters: { layout: 'fullscreen' },
  render: ({ tooltipText, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Тег-метка с настройкой размера и цветовой схемы appearance.</DemoHint>
        <DemoActions align='center'>
          <Tag {...args} {...(tooltipText ? { tooltip: { tip: tooltipText } } : {})} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Tag',
    size: SIZE.Xs,
    appearance: APPEARANCE.Neutral,
    tooltipText: '',
    'data-test-id': TEST_IDS.tag.root,
  },
  argTypes: {
    tooltip: { table: { disable: true } },
    tooltipText: { name: '[Stories]: tooltip text', control: 'text' },
    size: { control: 'select', options: Object.values(SIZE) },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
  },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.tag.root)).toBeVisible();
  },
};

export const WithTooltip: Story = {
  args: {
    tooltipText: 'Подсказка к тегу',
  },
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByTestId(TEST_IDS.tag.root));
    await expect(await within(canvasElement.ownerDocument.body).findByRole('tooltip')).toHaveTextContent(
      'Подсказка к тегу',
    );
  },
};
