import { Label, SIZE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta<typeof Label> = {
  title: 'Components/FieldDecorator/Label',
  component: Label,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Label>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Slots × Size'
        firstColumnHeader='Slots'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'label',
            cells: sizes.map(size => <Label key={size} size={size} label='Заголовок' />),
          },
          {
            variantLabel: 'required',
            cells: sizes.map(size => <Label key={size} size={size} label='Заголовок' required />),
          },
          {
            variantLabel: 'tooltip',
            cells: sizes.map(size => (
              <Label key={size} size={size} label='Заголовок' labelTooltip={{ tip: 'Пояснение' }} />
            )),
          },
          {
            variantLabel: 'caption',
            cells: sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Label size={size} label='Заголовок' caption='Подпись' />
              </div>
            )),
          },
          {
            variantLabel: 'disabled',
            cells: sizes.map(size => (
              <Label key={size} size={size} label='Заголовок' required caption='Подпись' disabled />
            )),
          },
        ]}
      />
    </div>
  ),
};
