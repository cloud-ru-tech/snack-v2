import { Hint, SIZE, VALIDATION_STATE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta<typeof Hint> = {
  title: 'Components/FieldDecorator/Hint',
  component: Hint,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Hint>;

const sizes = Object.values(SIZE);
const validationStates = Object.values(VALIDATION_STATE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='ValidationState × Size'
        firstColumnHeader='ValidationState'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={validationStates.map(validationState => ({
          variantLabel: validationState,
          cells: sizes.map(size => (
            <Hint key={size} size={size} validationState={validationState} showHintIcon hint='Текст подсказки' />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Counter × Size'
        firstColumnHeader='Counter'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'within limit',
            cells: sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Hint size={size} hint='Подсказка' length={{ current: 12, max: 100 }} />
              </div>
            )),
          },
          {
            variantLabel: 'limit exceeded',
            cells: sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Hint size={size} hint='Подсказка' length={{ current: 120, max: 100 }} />
              </div>
            )),
          },
        ]}
      />
    </div>
  ),
};
