import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { PLACEMENT } from '@ds/tooltip';
import { VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const slotPresets = {
  none: undefined,
  iconBefore: <PlaceholderSVG data-test-id={TEST_IDS.beforeNode} />,
  iconAfter: <PlaceholderSVG data-test-id={TEST_IDS.afterNode} />,
} as const;

type TruncateOptions = NonNullable<PromoTagProps['truncate']>;
type PlaygroundArgs = PromoTagProps & TruncateOptions & { clickable: boolean; enableTruncate: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: { layout: 'fullscreen' },
  render: ({ clickable, onClick, enableTruncate, variant, tooltipPlacement, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Введите длинную подпись и включите обрезание. У кликабельного тега подсказка скрыта.</DemoHint>
        <DemoActions align='center'>
          <PromoTag
            {...args}
            truncate={enableTruncate ? { variant, tooltipPlacement } : undefined}
            onClick={clickable ? onClick : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Promo tag',
    clickable: false,
    enableTruncate: false,
    variant: VARIANT.End,
    tooltipPlacement: PLACEMENT.Top,
    style: { maxWidth: 160 },
    appearance: APPEARANCE.Primary,
    roleAppearance: ROLE_APPEARANCE.Accent,
    size: SIZE.Xs,
    beforeContent: undefined,
    afterContent: undefined,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    clickable: { name: '[Stories]: clickable', control: 'boolean' },
    truncate: { table: { disable: true } },
    enableTruncate: { name: '[Stories]: enableTruncate', control: 'boolean' },
    variant: {
      name: '[Stories]: truncate.variant',
      control: 'radio',
      options: Object.values(VARIANT),
      if: { arg: 'enableTruncate', eq: true },
    },
    tooltipPlacement: {
      name: '[Stories]: truncate.tooltipPlacement',
      control: 'select',
      options: Object.values(PLACEMENT),
      if: { arg: 'enableTruncate', eq: true },
    },
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

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClick: fn(),
  },
};
