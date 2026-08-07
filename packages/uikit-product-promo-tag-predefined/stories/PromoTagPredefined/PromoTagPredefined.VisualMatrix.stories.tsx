import { TRIGGER } from '@ds/tooltip';
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';

import { StoryTable } from '#storybook/components';

import { CustomTooltipTip } from './CustomTooltipTip';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof PromoTagPredefined> = {
  title: 'Uikit Product/PromoTagPredefined',
  component: PromoTagPredefined,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PromoTagPredefined>;

function noopSupportClick(e: MouseEvent) {
  e.preventDefault();
}

const presets = [
  {
    label: 'connecting',
    props: { variant: VARIANTS.Connecting, tooltip: { onSupportClick: noopSupportClick } },
  },
  { label: 'partner', props: { variant: VARIANTS.Partner } },
  {
    label: 'preview + service',
    props: { variant: VARIANTS.Preview, context: PREVIEW_CONTEXT.Service },
  },
  {
    label: 'preview + functional',
    props: { variant: VARIANTS.Preview, context: PREVIEW_CONTEXT.Functional },
  },
  { label: 'freeTier', props: { variant: VARIANTS.FreeTier } },
  { label: 'default', props: { variant: VARIANTS.Default } },
] as const;

const customTipVariants = [
  { label: 'soon', variant: VARIANTS.Soon },
  { label: 'latest', variant: VARIANTS.Latest },
  { label: 'private', variant: VARIANTS.Private },
  { label: 'public', variant: VARIANTS.Public },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='variant × context (Figma presets)'
        firstColumnHeader='preset'
        columnHeaders={['']}
        rows={presets.map(({ label, props }) => ({
          variantLabel: label,
          cells: [<PromoTagPredefined key={label} {...props} data-test-id={TEST_IDS.promoTag} />],
        }))}
      />

      <StoryTable
        sectionTitle='custom tip variants × tip'
        firstColumnHeader='variant'
        columnHeaders={['without tip', 'with tip']}
        rows={customTipVariants.map(({ label, variant }) => ({
          variantLabel: label,
          cells: [
            <PromoTagPredefined key={`${label}-no-tip`} variant={variant} data-test-id={TEST_IDS.promoTag} />,
            <PromoTagPredefined
              key={`${label}-tip`}
              variant={variant}
              tooltip={{ tip: <CustomTooltipTip /> }}
              data-test-id={TEST_IDS.promoTag}
            />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='tooltipTrigger (connecting preset)'
        firstColumnHeader='trigger'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'hover',
            cells: [
              <PromoTagPredefined
                key='hover'
                variant={VARIANTS.Connecting}
                tooltip={{ trigger: TRIGGER.Hover, onSupportClick: noopSupportClick }}
                data-test-id={TEST_IDS.promoTag}
              />,
            ],
          },
          {
            variantLabel: 'click',
            cells: [
              <PromoTagPredefined
                key='click'
                variant={VARIANTS.Connecting}
                tooltip={{ trigger: TRIGGER.Click, onSupportClick: noopSupportClick }}
                data-test-id={TEST_IDS.promoTag}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
