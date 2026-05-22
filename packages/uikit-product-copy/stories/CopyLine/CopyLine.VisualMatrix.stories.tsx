import { COPY_BUTTON_HIDE_STRATEGY, CopyLine } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CopyLine> = {
  title: 'Uikit Product/Copy/CopyLine',
  component: CopyLine,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CopyLine>;

const strategies = [COPY_BUTTON_HIDE_STRATEGY.Never, COPY_BUTTON_HIDE_STRATEGY.Hover] as const;
const contentVariants = [
  { label: 'Short', content: 'copy-me-42' as const, truncated: false },
  {
    label: 'Long',
    content: 'very-long-identifier-that-should-be-truncated-1234567890-abcdefghij' as const,
    truncated: true,
  },
  { label: 'Number', content: 1234567890 as const, truncated: false },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      cellAlign='start'
      sectionTitle='CopyButtonHideStrategy × Content'
      firstColumnHeader='Strategy'
      columnHeaders={contentVariants.map(v => v.label)}
      rows={strategies.map(strategy => ({
        variantLabel: strategy,
        cells: contentVariants.map(v => (
          <div key={`${strategy}-${v.label}`} className={v.truncated ? styles.truncatedCell : undefined}>
            <CopyLine copyButtonHideStrategy={strategy} content={v.content} />
          </div>
        )),
      }))}
    />
  ),
};
