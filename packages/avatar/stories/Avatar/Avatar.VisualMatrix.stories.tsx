import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import portrait from './assets/portrait.svg';
import styles from './styles.module.scss';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const allSizes = Object.values(SIZE);
const keyAppearances = Object.values(APPEARANCE);
const keyShapes = [SHAPE.Round, SHAPE.Square] as const;
// `portrait` импортируется loader'ом как opaque-объект (SvgComponent & ImageMetadata);
// в runtime — это url-строка. Двойной cast — единственный путь, тип loader'а с
// `string` напрямую не совместим.
const portraitSrc = portrait as unknown as string;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      {keyShapes.map(shape => (
        <StoryTable
          key={shape}
          sectionTitle={`Shape — ${shape} · all sizes`}
          firstColumnHeader='Appearance'
          columnHeaders={allSizes.map(size => size.toUpperCase())}
          rows={keyAppearances.map(appearance => ({
            variantLabel: appearance,
            cells: allSizes.map(size => (
              <Avatar key={size} name='John Doe' size={size} shape={shape} appearance={appearance} />
            )),
          }))}
        />
      ))}
      <StoryTable
        sectionTitle='Image src — all sizes × shape'
        firstColumnHeader='Shape'
        columnHeaders={allSizes.map(size => size.toUpperCase())}
        rows={keyShapes.map(shape => ({
          variantLabel: shape,
          cells: allSizes.map(size => (
            <Avatar key={size} name='Jane Roe' size={size} shape={shape} src={portraitSrc} />
          )),
        }))}
      />
    </div>
  ),
};
