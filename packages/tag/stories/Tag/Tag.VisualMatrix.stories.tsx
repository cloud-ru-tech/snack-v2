import { APPEARANCE, SIZE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const keySizes = [SIZE.Xs, SIZE.S, SIZE.M] as const;
const keyAppearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Red,
  APPEARANCE.Green,
  APPEARANCE.Blue,
] as const;

const compositions = [
  {
    key: 'plain',
    render: (size: (typeof keySizes)[number], appearance: (typeof keyAppearances)[number]) => (
      <Tag size={size} appearance={appearance} label='Tag' />
    ),
  },
  {
    key: 'removable',
    render: (size: (typeof keySizes)[number], appearance: (typeof keyAppearances)[number]) => (
      <Tag size={size} appearance={appearance} label='Tag' onDelete={() => undefined} />
    ),
  },
  {
    key: 'link',
    render: (size: (typeof keySizes)[number], appearance: (typeof keyAppearances)[number]) => (
      <Tag size={size} appearance={appearance} label='Tag' href='#' />
    ),
  },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => <Tag key={size} size={size} appearance={appearance} label='Tag' />),
        }))}
      />

      <StoryTable
        sectionTitle='Composition × Size (appearance=neutral)'
        firstColumnHeader='Composition'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={compositions.map(c => ({
          variantLabel: c.key,
          cells: keySizes.map(size => c.render(size, APPEARANCE.Neutral)),
        }))}
      />
    </div>
  ),
};
