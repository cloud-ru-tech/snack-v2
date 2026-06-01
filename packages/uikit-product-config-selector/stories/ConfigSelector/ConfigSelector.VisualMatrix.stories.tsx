import { ConfigSelector, ConfigSelectorProps } from '@ds/uikit-product-config-selector';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof ConfigSelector> = {
  title: 'Uikit Product/ConfigSelector',
  component: ConfigSelector,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ConfigSelector>;

const baseProps: ConfigSelectorProps = {
  label: 'Конфигурация',
  checked: false,
  onChange: () => {},
};

const states: Array<{ key: string; extra: Partial<ConfigSelectorProps> }> = [
  { key: 'default', extra: {} },
  { key: 'available', extra: { available: true } },
  { key: 'checked', extra: { checked: true } },
  { key: 'availableChecked', extra: { available: true, checked: true } },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'disabledChecked', extra: { disabled: true, checked: true } },
  { key: 'availableDisabled', extra: { available: true, disabled: true } },
  { key: 'availableDisabledChecked', extra: { available: true, disabled: true, checked: true } },
];

export const VisualMatrix: Story = {
  // no-a11y: статичная матрица без интерактивного фокуса; a11y проверяется на Playground/InteractionTest.
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Состояния'
        firstColumnHeader='State'
        columnHeaders={['Chip']}
        rows={states.map(({ key, extra }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.column}>
              <ConfigSelector {...baseProps} {...extra} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Truncation'
        firstColumnHeader='Variant'
        columnHeaders={['Chip']}
        rows={[
          {
            variantLabel: 'longLabel',
            cells: [
              <div key='longLabel' className={styles.columnNarrow}>
                <ConfigSelector {...baseProps} label='Очень длинная конфигурация, которая не помещается целиком' />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
