import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { PriceSummaryFigmaSurface } from '../PriceSummary/PriceSummaryStory';
import styles from '../PriceSummary/styles.module.scss';
import { TEST_IDS } from '../PriceSummary/testIds';
import { PLAYGROUND_DEFAULT_ARGS } from './constants';

const meta: Meta<typeof PriceSummarySmall> = {
  title: 'Uikit Product/PriceSummary/PriceSummarySmall',
  component: PriceSummarySmall,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummarySmall>;

const baseProps = {
  ...PLAYGROUND_DEFAULT_ARGS,
  'data-test-id': TEST_IDS.priceSummarySmall,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Figma: loading x size=small (2909:8947)'
        firstColumnHeader='loading'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'false',
            cells: [
              <div key='default' className={styles.column}>
                <PriceSummaryFigmaSurface>
                  <PriceSummarySmall {...baseProps} />
                </PriceSummaryFigmaSurface>
              </div>,
            ],
          },
          {
            variantLabel: 'true',
            cells: [
              <div key='loading' className={styles.column}>
                <PriceSummaryFigmaSurface>
                  <PriceSummarySmall {...baseProps} loading />
                </PriceSummaryFigmaSurface>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
