import { PLACEMENT, TRIGGER } from '@ds/tooltip';
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS as STORY_TEST_IDS } from './testIds';

const meta: Meta<typeof PromoTagPredefined> = {
  title: 'Uikit Product/PromoTagPredefined',
  component: PromoTagPredefined,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: VARIANTS.Preview,
    context: PREVIEW_CONTEXT.Service,
    tooltip: {
      placement: PLACEMENT.Top,
      trigger: TRIGGER.Hover,
    },
    onClick: undefined,
    'data-test-id': STORY_TEST_IDS.promoTag,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(VARIANTS),
    },
    context: {
      control: 'select',
      options: Object.values(PREVIEW_CONTEXT),
      if: { arg: 'variant', eq: VARIANTS.Preview },
    },
    tooltip: { control: 'object' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof PromoTagPredefined>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Предопределённый промо-тег с локализованным текстом и tooltip по variant/context.</DemoHint>
        <DemoActions align='center'>
          <PromoTagPredefined {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.promoTag)).toBeVisible();
  },
};
