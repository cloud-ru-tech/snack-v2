import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MOCK_QUOTA_EXHAUSTED, MOCK_QUOTA_GREEN, MOCK_QUOTA_ORANGE, MOCK_QUOTA_RED } from '../mockData';
import styles from './QuotaWidgetCard.VisualMatrix.module.scss';

const meta: Meta<typeof QuotaWidgetCard> = {
  title: 'Uikit Product/Quota/QuotaWidgetCard',
  component: QuotaWidgetCard,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetCard>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <StoryTable
      sectionTitle='limitReached × noData × loading'
      firstColumnHeader='variant'
      cellAlign='start'
      columnHeaders={['QuotaWidgetCard']}
      rows={[
        {
          variantLabel: '0-69%',
          cells: [
            <div key='green' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_GREEN} />
            </div>,
          ],
        },
        {
          variantLabel: '70-89%',
          cells: [
            <div key='orange' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_ORANGE} />
            </div>,
          ],
        },
        {
          variantLabel: '90-99%',
          cells: [
            <div key='red' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_RED} />
            </div>,
          ],
        },
        {
          variantLabel: '100% / exhausted',
          cells: [
            <div key='exhausted' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_EXHAUSTED} />
            </div>,
          ],
        },
        {
          variantLabel: 'noData=true',
          cells: [
            <div key='no-data' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_GREEN} noData onRefresh={() => undefined} />
            </div>,
          ],
        },
        {
          variantLabel: 'loading=true',
          cells: [
            <div key='loading' className={styles.cell}>
              <QuotaWidgetCard quota={MOCK_QUOTA_GREEN} loading />
            </div>,
          ],
        },
      ]}
    />
  ),
};
