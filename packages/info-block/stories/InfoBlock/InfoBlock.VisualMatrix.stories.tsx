import { Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { ALIGN, InfoBlock, InfoBlockProps, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<InfoBlockProps> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<InfoBlockProps>;

const sizes = Object.values(SIZE);
const aligns = Object.values(ALIGN);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Align × Size'
        firstColumnHeader='Align'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={aligns.map(align => ({
          variantLabel: align,
          cells: sizes.map(size => (
            <InfoBlock
              key={`${align}-${size}`}
              title='Title text'
              description='Content text'
              icon={{ icon: PlaceholderSVG, appearance: 'primary', decor: true }}
              size={size}
              align={align}
              footer={
                <div className={styles.footerRow}>
                  <Button label='Label text' view={VIEW.Filled} size={size} />
                  <Button label='Label text' view={VIEW.Tonal} size={size} />
                </div>
              }
            />
          )),
        }))}
      />
    </>
  ),
};
