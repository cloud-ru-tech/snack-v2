import { PromoTag, SIZE } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PromoTag> = {
  title: 'Components/PromoTag/Examples/WithTruncate',
  component: PromoTag,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof PromoTag>;

export const WithTruncate: Story = {
  args: {
    label: 'Специальное предложение для новых клиентов',
    truncate: { variant: 'end' },
    appearance: 'primary',
    style: { maxWidth: 160 },
    size: SIZE.Xs,
    roleAppearance: 'accent',
    'data-test-id': TEST_IDS.root,
  },
};
