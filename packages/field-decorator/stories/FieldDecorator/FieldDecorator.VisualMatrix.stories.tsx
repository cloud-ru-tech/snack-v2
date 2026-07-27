import { FieldDecorator, SIZE, VALIDATION_STATE } from '@ds/field-decorator';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta<typeof FieldDecorator> = {
  title: 'Components/FieldDecorator/FieldDecorator',
  component: FieldDecorator,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldDecorator>;

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
            <div key={size} className={styles.cell}>
              <FieldDecorator
                size={size}
                validationState={validationState}
                label='Заголовок'
                required
                caption='Подпись'
                labelTooltip={{ tip: 'Пояснение' }}
                hint='Текст подсказки'
                showHintIcon
                length={{ current: 12, max: 100 }}
              >
                <input className={styles.input} placeholder='Значение' />
              </FieldDecorator>
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='State × Size'
        firstColumnHeader='State'
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'disabled',
            cells: sizes.map(size => (
              <div key={size} className={styles.cell}>
                <FieldDecorator
                  size={size}
                  label='Заголовок'
                  hint='Подсказка'
                  length={{ current: 12, max: 100 }}
                  disabled
                >
                  <input className={styles.input} placeholder='Значение' disabled />
                </FieldDecorator>
              </div>
            )),
          },
          {
            variantLabel: 'readonly',
            cells: sizes.map(size => (
              <div key={size} className={styles.cell}>
                <FieldDecorator
                  size={size}
                  label='Заголовок'
                  validationState={VALIDATION_STATE.Error}
                  hint='Подсказка'
                  showHintIcon
                  readonly
                >
                  <input className={styles.input} placeholder='Значение' readOnly />
                </FieldDecorator>
              </div>
            )),
          },
        ]}
      />
    </div>
  ),
};
