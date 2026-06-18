import { AiShimmer, SIZE, VARIANT, WEIGHT } from '@ds/ai-shimmer';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AiShimmer> = {
  title: 'Ai/AiShimmer',
  component: AiShimmer,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiShimmer>;

const keyTexts = [
  { label: 'short latin', text: 'as' },
  { label: 'short cyrillic', text: 'йцу' },
  { label: 'short text', text: 'Generating...' },
  { label: 'medium text', text: 'Generating AI response...\nPlease wait a few seconds.' },
  {
    label: 'long text',
    text: `Generating AI response for your request...
Please wait while we process multiple sources and format the final answer.
This may take a little longer depending on complexity.`,
  },
] as const;

const sizes = Object.values(SIZE);
const variants = Object.values(VARIANT);
const weights = Object.values(WEIGHT);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Text'
        firstColumnHeader='Text'
        columnHeaders={['AiShimmer']}
        rows={keyTexts.map(({ label, text }) => ({
          variantLabel: label,
          cells: [
            <div className={styles.matrixCell} key={label}>
              <AiShimmer text={text} size='m' />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Size'
        firstColumnHeader='Size'
        columnHeaders={['AiShimmer']}
        rows={sizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <div className={styles.matrixCell} key={size}>
              <AiShimmer text='Generating AI response...' size={size} />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Variant'
        firstColumnHeader='Variant'
        columnHeaders={['AiShimmer']}
        rows={variants.map(variant => ({
          variantLabel: variant,
          cells: [
            <div className={styles.matrixCell} key={variant}>
              <AiShimmer text='Generating AI response...' variant={variant} size='m' />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Weight'
        firstColumnHeader='Weight'
        columnHeaders={['AiShimmer']}
        rows={weights.map(weight => ({
          variantLabel: weight,
          cells: [
            <div className={styles.matrixCell} key={weight}>
              <AiShimmer text='Generating AI response...' weight={weight} size='m' />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Width'
        firstColumnHeader='Container'
        columnHeaders={['AiShimmer']}
        rows={[
          {
            variantLabel: 'full (400px)',
            cells: [
              <div className={styles.matrixCell} key='full'>
                <AiShimmer text='йцу' size='m' />
              </div>,
            ],
          },
          {
            variantLabel: 'narrow (120px)',
            cells: [
              <div className={styles.matrixCellNarrow} key='narrow'>
                <AiShimmer text='йцу йцу' size='m' />
              </div>,
            ],
          },
        ]}
      />
    </>
  ),
};
