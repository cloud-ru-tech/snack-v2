import { AiButtonGigaOutline, APPEARANCE, ICON_POSITION, SIZE } from '@ds/ai-button-giga';
import { PlusSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiButtonGigaOutline> = {
  title: 'AI/ButtonGiga/Outline',
  component: AiButtonGigaOutline,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Создать ресурс',
    appearance: APPEARANCE.Primary,
    loading: false,
    disabled: false,
    size: SIZE.S,
    iconPosition: ICON_POSITION.Before,
    icon: 'default',
    'data-test-id': TEST_IDS.outline.root,
  },
  argTypes: {
    innerRef: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
    size: { control: 'radio', options: Object.values(SIZE) },
    icon: {
      control: 'select',
      options: ['default', 'none', 'plus'],
      mapping: { default: undefined, none: null, plus: <PlusSVG data-test-id={TEST_IDS.outline.customIcon} /> },
    },
    iconPosition: { control: 'radio', options: Object.values(ICON_POSITION) },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AiButtonGigaOutline</DemoTitle>
        <DemoHint>Внешний вид и состояние задаются свойствами кнопки.</DemoHint>
        <DemoActions align='center'>
          <AiButtonGigaOutline {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaOutline>;
export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.outline.root)).toBeVisible();
  },
};
