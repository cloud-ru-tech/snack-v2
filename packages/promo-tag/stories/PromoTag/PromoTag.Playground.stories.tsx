import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, PromoTag, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const slotPresets = {
  none: undefined,
  iconBefore: <PlaceholderSVG data-test-id={TEST_IDS.beforeNode} />,
  iconAfter: <PlaceholderSVG data-test-id={TEST_IDS.afterNode} />,
} as const;

const meta: Meta<typeof PromoTag> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Промо-тег с иконкой до или после текста и набором appearance/roleAppearance.</DemoHint>
        <DemoActions align='center'>
          <PromoTag {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Promo tag',
    appearance: APPEARANCE.Primary,
    roleAppearance: ROLE_APPEARANCE.Accent,
    size: SIZE.Xs,
    beforeContent: undefined,
    afterContent: undefined,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст компонента' },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
    roleAppearance: { control: 'radio', options: Object.values(ROLE_APPEARANCE) },
    size: { control: 'radio', options: Object.values(SIZE) },
    beforeContent: {
      control: 'select',
      options: ['none', 'iconBefore'],
      mapping: slotPresets,
      description: 'Контент перед текстом (none | iconBefore)',
    },
    afterContent: {
      control: 'select',
      options: ['none', 'iconAfter'],
      mapping: slotPresets,
      description: 'Контент после текста (none | iconAfter)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PromoTag>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClick: fn(),
  },
};
