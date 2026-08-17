import { AiFieldBanner, SIZE, VARIANT, VARIANT_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiFieldBanner> = {
  title: 'Ai/AiFieldBanner',
  component: AiFieldBanner,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiFieldBanner>;

const variants = VARIANT_ORDER;
const sizes = Object.values(SIZE);

const defaultProps = {
  content: 'Description',
  actionLabel: 'Label text',
  variant: VARIANT.Information,
} as const;

const longDescription =
  'This is a longer field hint that wraps across several lines within the banner width to show how multiline description text behaves alongside the icon and action.';

const longBottomContent =
  'This is longer additional content in the bottomContent slot that wraps across several lines within the banner width to show how multiline slot content behaves alongside the description and action.';

function renderCell(props: Parameters<typeof AiFieldBanner>[0], testId: string): ReactElement {
  return <AiFieldBanner {...props} className={styles.bannerCell} data-test-id={testId} />;
}

export const VisualMatrixVariantSize: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Variant × Size (desktop/mobile)'
      firstColumnHeader='Variant'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={variants.map(variant => ({
        variantLabel: variant,
        cells: sizes.map(size =>
          renderCell(
            { ...defaultProps, variant, size, icon: <PlaceholderSVG /> },
            `${TEST_IDS.root}-variant-${variant}-size-${size}`,
          ),
        ),
      }))}
    />
  ),
};

export const VisualMatrixSlots: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Slots'
      firstColumnHeader='Configuration'
      columnHeaders={['Default']}
      rows={[
        {
          variantLabel: 'description + action',
          cells: [renderCell({ ...defaultProps, icon: <PlaceholderSVG /> }, `${TEST_IDS.root}-slots-full`)],
        },
        {
          variantLabel: 'description only',
          cells: [renderCell({ content: 'Description', actionLabel: undefined }, `${TEST_IDS.root}-slots-description`)],
        },
        {
          variantLabel: 'with bottom content',
          cells: [
            renderCell(
              {
                ...defaultProps,
                icon: <PlaceholderSVG />,
                bottomContent: <span>Additional content</span>,
              },
              `${TEST_IDS.root}-slots-bottom-content`,
            ),
          ],
        },
        {
          variantLabel: 'long description',
          cells: [
            renderCell(
              {
                ...defaultProps,
                content: longDescription,
                icon: <PlaceholderSVG />,
              },
              `${TEST_IDS.root}-slots-long-description`,
            ),
          ],
        },
        {
          variantLabel: 'content + bottomContent (long) + action',
          cells: [
            renderCell(
              {
                ...defaultProps,
                icon: <PlaceholderSVG />,
                bottomContent: <span>{longBottomContent}</span>,
              },
              `${TEST_IDS.root}-slots-long-bottom-content`,
            ),
          ],
        },
        {
          variantLabel: 'no icon',
          cells: [
            renderCell(
              { content: defaultProps.content, actionLabel: defaultProps.actionLabel },
              `${TEST_IDS.root}-slots-no-icon`,
            ),
          ],
        },
      ]}
    />
  ),
};
