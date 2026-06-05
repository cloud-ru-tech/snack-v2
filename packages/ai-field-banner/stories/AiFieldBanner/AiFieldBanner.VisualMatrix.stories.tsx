import { AiFieldBanner, SIZE, TYPE, TYPE_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons';
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

const types = TYPE_ORDER;
const sizes = Object.values(SIZE);

const defaultProps = {
  description: 'Description',
  actionLabel: 'Label text',
  variant: TYPE.Information,
} as const;

const longDescription =
  'This is a longer field hint that wraps across several lines within the banner width to show how multiline description text behaves alongside the icon and action.';

const longAdditionalContent =
  'This is longer additional content in the children slot that wraps across several lines within the banner width to show how multiline slot content behaves alongside the description and action.';

function renderCell(props: Parameters<typeof AiFieldBanner>[0], testId: string): ReactElement {
  return (
    <div className={styles.bannerCell}>
      <AiFieldBanner {...props} data-test-id={testId} />
    </div>
  );
}

export const VisualMatrixTypeSize: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Type × Size (desktop/mobile)'
      firstColumnHeader='Type'
      columnHeaders={sizes.map(s => s.toUpperCase())}
      rows={types.map(type => ({
        variantLabel: type,
        cells: sizes.map(size =>
          renderCell(
            { ...defaultProps, variant: type, size, icon: <PlaceholderSVG /> },
            `${TEST_IDS.root}-type-${type}-size-${size}`,
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
          cells: [
            renderCell({ description: 'Description', actionLabel: undefined }, `${TEST_IDS.root}-slots-description`),
          ],
        },
        {
          variantLabel: 'with additional slot',
          cells: [
            renderCell(
              {
                ...defaultProps,
                icon: <PlaceholderSVG />,
                children: <span>Additional content</span>,
              },
              `${TEST_IDS.root}-slots-additional`,
            ),
          ],
        },
        {
          variantLabel: 'long description',
          cells: [
            renderCell(
              {
                ...defaultProps,
                description: longDescription,
                icon: <PlaceholderSVG />,
              },
              `${TEST_IDS.root}-slots-long-description`,
            ),
          ],
        },
        {
          variantLabel: 'description + children (long) + action',
          cells: [
            renderCell(
              {
                ...defaultProps,
                icon: <PlaceholderSVG />,
                children: <span>{longAdditionalContent}</span>,
              },
              `${TEST_IDS.root}-slots-long-children`,
            ),
          ],
        },
        {
          variantLabel: 'no icon',
          cells: [
            renderCell(
              { description: defaultProps.description, actionLabel: defaultProps.actionLabel },
              `${TEST_IDS.root}-slots-no-icon`,
            ),
          ],
        },
      ]}
    />
  ),
};
