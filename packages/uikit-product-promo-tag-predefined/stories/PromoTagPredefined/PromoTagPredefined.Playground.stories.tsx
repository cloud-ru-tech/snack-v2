import { PLACEMENT, TooltipProps, TRIGGER } from '@ds/tooltip';
import {
  PREVIEW_CONTEXT,
  PreviewContext,
  PromoTagPredefined,
  PromoTagPredefinedProps,
  Variant,
  VARIANTS,
} from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, MouseEvent, useEffect } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CUSTOM_TOOLTIP_CONTENT } from '../constants';
import { CustomTooltipTip } from './CustomTooltipTip';
import { TEST_IDS as STORY_TEST_IDS } from './testIds';

const CUSTOM_TIP_VARIANTS = [VARIANTS.Soon, VARIANTS.Latest, VARIANTS.Private, VARIANTS.Public] as const;

type CustomTipVariant = (typeof CUSTOM_TIP_VARIANTS)[number];

type PlaygroundArgs = {
  variant: Variant;
  context?: PreviewContext;
  tooltip?: Pick<TooltipProps, 'placement' | 'trigger' | 'open'>;
  /** Содержимое tooltip для soon / latest / private / public; пустая строка — без tooltip */
  tooltipTip?: string;
  /** Служебный флаг видимости контрола tooltipTip (OR по вариантам) */
  requiresCustomTip: boolean;
  'data-test-id'?: string;
};

function isCustomTipVariant(variant: Variant): variant is CustomTipVariant {
  return (CUSTOM_TIP_VARIANTS as readonly string[]).includes(variant);
}

function sampleSupportClick(e: MouseEvent) {
  e.preventDefault();
  window.alert('Clicked');
}

function sampleCustomTipLinkClick(e: MouseEvent) {
  e.preventDefault();
  window.alert('Clicked!');
}

function buildPlaygroundProps(args: PlaygroundArgs): PromoTagPredefinedProps {
  const { variant, context, tooltip, tooltipTip, 'data-test-id': dataTestId } = args;
  const rest = { 'data-test-id': dataTestId };

  if (variant === VARIANTS.Default) {
    return { ...rest, variant: VARIANTS.Default };
  }

  if (isCustomTipVariant(variant)) {
    return {
      ...rest,
      variant,
      ...(tooltipTip
        ? {
            tooltip: {
              ...tooltip,
              tip: <CustomTooltipTip text={tooltipTip.trim()} onLinkClick={sampleCustomTipLinkClick} />,
            },
          }
        : {}),
    };
  }

  if (variant === VARIANTS.Preview) {
    return {
      ...rest,
      variant: VARIANTS.Preview,
      context,
      tooltip,
    };
  }

  if (variant === VARIANTS.Connecting) {
    return {
      ...rest,
      variant: VARIANTS.Connecting,
      tooltip: {
        ...tooltip,
        onSupportClick: sampleSupportClick,
      },
    };
  }

  return {
    ...rest,
    variant,
    tooltip,
  };
}

function PlaygroundRender(args: PlaygroundArgs) {
  const [, updateArgs] = useArgs<PlaygroundArgs>();
  const needsCustomTip = isCustomTipVariant(args.variant);

  useEffect(() => {
    if (args.requiresCustomTip !== needsCustomTip) {
      updateArgs({ requiresCustomTip: needsCustomTip });
    }
  }, [needsCustomTip, args.requiresCustomTip, updateArgs]);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Предопределённый промо-тег с локализованным текстом и tooltip.
          <br />
          Для soon / latest / private / public задайте `[Stories]: tooltip tip` (пустая строка — без tooltip).
        </DemoHint>
        <DemoActions align='center'>
          <PromoTagPredefined {...buildPlaygroundProps(args)} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/PromoTagPredefined',
  // `component` — реальный PromoTagPredefined (для SB); story-only args + useArgs живут в render.
  // Каст нужен: PlaygroundArgs шире discriminated union пропсов компонента.
  component: PromoTagPredefined as ComponentType<PlaygroundArgs>,
  parameters: { layout: 'fullscreen' },
  args: {
    variant: VARIANTS.Preview,
    context: PREVIEW_CONTEXT.Service,
    tooltip: {
      placement: PLACEMENT.Top,
      trigger: TRIGGER.Hover,
    },
    tooltipTip: CUSTOM_TOOLTIP_CONTENT,
    requiresCustomTip: false,
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
    tooltip: {
      control: 'object',
      if: { arg: 'variant', neq: VARIANTS.Default },
    },
    requiresCustomTip: {
      table: { disable: true },
      control: false,
    },
    tooltipTip: {
      name: '[Stories]: tooltip tip',
      control: 'text',
      if: { arg: 'requiresCustomTip', truthy: true },
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: PlaygroundRender,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(STORY_TEST_IDS.promoTag)).toBeVisible();
  },
};
