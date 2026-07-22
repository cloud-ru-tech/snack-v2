import { QuotaWidgetMini } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { BASE_QUOTA_WIDGET_MINI_PROPS } from '../mockData';

const meta: Meta<typeof QuotaWidgetMini> = {
  title: 'Uikit Product/Quota/QuotaWidgetMini',
  component: QuotaWidgetMini,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetMini>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <StoryTable
      sectionTitle='expand × content'
      firstColumnHeader='expand / content'
      cellAlign='start'
      columnHeaders={['QuotaWidgetMini']}
      rows={[
        {
          variantLabel: 'false / data',
          cells: [<QuotaWidgetMini key='collapsed' {...BASE_QUOTA_WIDGET_MINI_PROPS} />],
        },
        {
          variantLabel: 'true / data',
          cells: [<QuotaWidgetMini key='expanded-data' {...BASE_QUOTA_WIDGET_MINI_PROPS} defaultExpanded />],
        },
        {
          variantLabel: 'true / loading',
          cells: [<QuotaWidgetMini key='expanded-loading' {...BASE_QUOTA_WIDGET_MINI_PROPS} defaultExpanded loading />],
        },
        {
          variantLabel: 'true / error',
          cells: [<QuotaWidgetMini key='expanded-error' {...BASE_QUOTA_WIDGET_MINI_PROPS} defaultExpanded error />],
        },
      ]}
    />
  ),
};
