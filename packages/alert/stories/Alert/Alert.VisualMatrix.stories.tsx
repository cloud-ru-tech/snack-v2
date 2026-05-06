import { Alert, ALIGN, APPEARANCE, SIZE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const keyAppearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Info,
  APPEARANCE.Success,
  APPEARANCE.Warning,
  APPEARANCE.Error,
] as const;

const keySizes = [SIZE.S, SIZE.M] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size (horizontal)'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <div key={size} className={styles.container}>
              <Alert
                appearance={appearance}
                size={size}
                align={ALIGN.Horizontal}
                title={`Alert ${appearance}`}
                description='Краткое описание'
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Appearance × Outline (size=m)'
        firstColumnHeader='Appearance'
        columnHeaders={['outline/false', 'outline/true']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [false, true].map(outline => (
            <div key={String(outline)} className={styles.container}>
              <Alert
                appearance={appearance}
                outline={outline}
                size='m'
                align={ALIGN.Horizontal}
                title={`Alert ${appearance}`}
                description='Краткое описание'
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
