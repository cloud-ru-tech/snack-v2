import { TRIGGER } from '@ds/tooltip';
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof PromoTagPredefined> = {
  title: 'Uikit Product/PromoTagPredefined',
  component: PromoTagPredefined,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PromoTagPredefined>;

const presets = [
  { label: 'connecting', props: { variant: VARIANTS.Connecting } },
  { label: 'partner', props: { variant: VARIANTS.Partner } },
  {
    label: 'preview + service',
    props: { variant: VARIANTS.Preview, context: PREVIEW_CONTEXT.Service },
  },
  {
    label: 'preview + functional',
    props: { variant: VARIANTS.Preview, context: PREVIEW_CONTEXT.Functional },
  },
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
                tooltip={{ trigger: TRIGGER.Hover }}
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
                tooltip={{ trigger: TRIGGER.Click }}
                data-test-id={TEST_IDS.promoTag}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
