import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { PriceSummary } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { DEFAULT_DISCOUNT, DEFAULT_INVOICE, PLAYGROUND_DEFAULT_ARGS } from './constants';
import { PriceSummaryFigmaSurface, PriceSummaryStory } from './PriceSummaryStory';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof PriceSummary> = {
  title: 'Uikit Product/PriceSummary/PriceSummary',
  component: PriceSummary,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummary>;

const baseProps = {
  ...PLAYGROUND_DEFAULT_ARGS,
  'data-test-id': TEST_IDS.priceSummary,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Figma: loading x layoutType'
        firstColumnHeader='loading'
        columnHeaders={['desktop', 'mobile']}
        rows={[
          {
            variantLabel: 'false',
            cells: [
              <div key='d' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
              <div key='m' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'true',
            cells: [
              <div key='d' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} loading />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
              <div key='m' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} loading />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Composition'
        firstColumnHeader='Scenario'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'with discount + invoice',
            cells: [
              <div key='full' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} discount={DEFAULT_DISCOUNT} invoice={DEFAULT_INVOICE} />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'dataError',
            cells: [
              <div key='err' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory {...baseProps} dataError onRetry={() => undefined} />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'hint + valueDelta',
            cells: [
              <div key='hint' className={styles.column}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PriceSummaryFigmaSurface>
                    <PriceSummaryStory
                      {...baseProps}
                      totalSumType='from'
                      hint='Promo applied'
                      hintAppearance='warning'
                      showHintTooltip
                      hintTooltipText='Limited offer'
                      showHintLink
                      hintLink={{ href: 'https://example.com', label: 'Details' }}
                      valueDelta={{ type: 'increased', value: 500 }}
                    />
                  </PriceSummaryFigmaSurface>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
