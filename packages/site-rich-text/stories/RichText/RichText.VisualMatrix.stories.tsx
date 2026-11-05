import { RichText } from '@ds/site-rich-text';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { CONTENT_VARIANTS } from './content';
import styles from './styles.module.scss';

const meta: Meta<typeof RichText> = {
  title: 'Site/RichText',
  component: RichText,
  parameters: { layout: 'padded', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof RichText>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Content × Source'
        firstColumnHeader='content'
        columnHeaders={['html string', 'react node']}
        rows={CONTENT_VARIANTS.map(({ label, html, node }) => ({
          variantLabel: label,
          cells: [
            <div key='html' className={styles.cell}>
              <RichText content={html} />
            </div>,
            <div key='node' className={styles.cell}>
              <RichText content={node} />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
