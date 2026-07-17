import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, PromoTag, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const slotPresets = {
  none: undefined,
  icon16Before: <PlaceholderSVG data-test-id={TEST_IDS.beforeNode} size={16} />,
  icon24Before: <PlaceholderSVG data-test-id={TEST_IDS.beforeNode} size={24} />,
  icon16After: <PlaceholderSVG data-test-id={TEST_IDS.afterNode} size={16} />,
  icon24After: <PlaceholderSVG data-test-id={TEST_IDS.afterNode} size={24} />,
} as const;

const meta: Meta<typeof PromoTag> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Промо-тег с иконкой до или после текста и набором appearance/role.</DemoHint>
        <DemoActions align='center'>
          <PromoTag {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    text: 'Promo tag',
    appearance: APPEARANCE.Primary,
    role: ROLE_APPEARANCE.Accent,
    size: SIZE.Xs,
    beforeContent: undefined,
    afterContent: undefined,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    text: { control: 'text', description: 'Текст компонента' },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
    role: { control: 'radio', options: Object.values(ROLE_APPEARANCE) },
    size: { control: 'radio', options: Object.values(SIZE) },
    beforeContent: {
      control: 'select',
      options: ['none', 'icon16Before', 'icon24Before'],
      mapping: slotPresets,
      description: 'Контент перед текстом (none | icon16Before | icon24Before)',
    },
    afterContent: {
      control: 'select',
      options: ['none', 'icon16After', 'icon24After'],
      mapping: slotPresets,
      description: 'Контент после текста (none | icon16After | icon24After)',
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
