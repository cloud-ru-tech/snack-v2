import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyAppearances = Object.values(APPEARANCE);
const keyShapes = [SHAPE.Round, SHAPE.Square] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {keyShapes.map(shape => (
        <StoryTable
          key={shape}
          sectionTitle={`Shape — ${shape}`}
          firstColumnHeader='Appearance'
          columnHeaders={keySizes.map(size => size.toUpperCase())}
          rows={keyAppearances.map(appearance => ({
            variantLabel: appearance,
            cells: keySizes.map(size => (
              <Avatar key={size} name='John Doe' size={size} shape={shape} appearance={appearance} />
            )),
          }))}
        />
      ))}
    </div>
  ),
};
