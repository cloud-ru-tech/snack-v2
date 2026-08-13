import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { APPEARANCE as STATUS_APPEARANCE } from '@ds/status';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import placeholderSrc from './assets/placeholder.png?url';
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
export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Shape — rounded · all appearances × sizes'
        firstColumnHeader='Appearance'
        columnHeaders={allSizes.map(size => size.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: allSizes.map(size => (
            <Avatar key={size} name='John Doe' size={size} shape={SHAPE.Rounded} appearance={appearance} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Shape — squared · all appearances × sizes'
        firstColumnHeader='Appearance'
        columnHeaders={allSizes.map(size => size.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: allSizes.map(size => (
            <Avatar key={size} name='John Doe' size={size} shape={SHAPE.Squared} appearance={appearance} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Image src × badge slot — all sizes'
        firstColumnHeader='Variant'
        columnHeaders={allSizes.map(size => size.toUpperCase())}
        rows={[
          {
            variantLabel: 'rounded',
            cells: allSizes.map(size => (
              <Avatar key={size} name='Jane Roe' size={size} shape={SHAPE.Rounded} src={placeholderSrc} />
            )),
          },
          {
            variantLabel: 'squared',
            cells: allSizes.map(size => (
              <Avatar key={size} name='Jane Roe' size={size} shape={SHAPE.Squared} src={placeholderSrc} />
            )),
          },
          {
            variantLabel: 'rounded + badge',
            cells: allSizes.map(size => (
              <Avatar
                key={size}
                name='Jane Roe'
                size={size}
                shape={SHAPE.Rounded}
                src={placeholderSrc}
                status={STATUS_APPEARANCE.Green}
              />
            )),
          },
          {
            variantLabel: 'squared + badge',
            cells: allSizes.map(size => (
              <Avatar
                key={size}
                name='Jane Roe'
                size={size}
                shape={SHAPE.Squared}
                src={placeholderSrc}
                status={STATUS_APPEARANCE.Green}
              />
            )),
          },
          {
            variantLabel: 'abbreviation + badge',
            cells: allSizes.map(size => (
              <Avatar key={size} name='Jane Roe' size={size} shape={SHAPE.Rounded} status={STATUS_APPEARANCE.Green} />
            )),
          },
        ]}
      />
    </div>
  ),
};
