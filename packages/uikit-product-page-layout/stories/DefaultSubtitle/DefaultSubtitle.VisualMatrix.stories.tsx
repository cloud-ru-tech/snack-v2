import { DefaultSubtitle } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DefaultSubtitle> = {
  title: 'Uikit Product/PageLayout/DefaultSubtitle',
  component: DefaultSubtitle,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof DefaultSubtitle>;

const value = { content: 'prj-9f2c-1a8b-4d7e', valueToCopy: 'prj-9f2c-1a8b-4d7e' };

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='labelTooltip'
        firstColumnHeader='labelTooltip'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'without',
            cells: [
              <div key='no' className={styles.column}>
                <DefaultSubtitle label='ID проекта' value={value} data-test-id={TEST_IDS.defaultSubtitle.root} />
              </div>,
            ],
          },
          {
            variantLabel: 'with',
            cells: [
              <div key='yes' className={styles.column}>
                <DefaultSubtitle label='ID проекта' value={value} labelTooltip='Уникальный идентификатор проекта' />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
