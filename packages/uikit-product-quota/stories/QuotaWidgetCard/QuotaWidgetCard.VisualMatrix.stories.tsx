import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MOCK_QUOTA_EXHAUSTED, MOCK_QUOTA_GREEN, MOCK_QUOTA_ORANGE, MOCK_QUOTA_RED } from '../mockData';

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
          cells: [<QuotaWidgetCard key='green' quota={MOCK_QUOTA_GREEN} />],
        },
        {
          variantLabel: '70-89%',
          cells: [<QuotaWidgetCard key='orange' quota={MOCK_QUOTA_ORANGE} />],
        },
        {
          variantLabel: '90-99%',
          cells: [<QuotaWidgetCard key='red' quota={MOCK_QUOTA_RED} />],
        },
        {
          variantLabel: '100% / exhausted',
          cells: [<QuotaWidgetCard key='exhausted' quota={MOCK_QUOTA_EXHAUSTED} />],
        },
        {
          variantLabel: 'noData=true',
          cells: [<QuotaWidgetCard key='no-data' quota={MOCK_QUOTA_GREEN} noData onRefresh={() => undefined} />],
        },
        {
          variantLabel: 'loading=true',
          cells: [<QuotaWidgetCard key='loading' quota={MOCK_QUOTA_GREEN} loading />],
        },
      ]}
    />
  ),
};
