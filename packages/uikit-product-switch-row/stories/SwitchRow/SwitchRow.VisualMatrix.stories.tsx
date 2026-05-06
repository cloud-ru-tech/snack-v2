import { SWITCH_ROW_TYPES, SwitchRow, SwitchRowProps } from '@ds/uikit-product-switch-row';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof SwitchRow> = {
  title: 'Uikit Product/SwitchRow',
  component: SwitchRow,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SwitchRow>;

const keyTypes = [SWITCH_ROW_TYPES.Block, SWITCH_ROW_TYPES.Line] as const;

const states: Array<{ key: string; extra: Partial<SwitchRowProps> }> = [
  { key: 'default', extra: {} },
  { key: 'checked', extra: { defaultChecked: true } },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'disabledChecked', extra: { disabled: true, defaultChecked: true } },
  { key: 'loading', extra: { loading: true } },
];

const baseProps: SwitchRowProps = {
  title: 'Уведомления',
  description: 'Раз в сутки будет приходить дайджест событий',
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × Type'
        firstColumnHeader='State'
        columnHeaders={keyTypes.map(t => t.toUpperCase())}
        rows={states.map(({ key, extra }) => ({
          variantLabel: key,
          cells: keyTypes.map(type => (
            <div key={type} className={styles.column}>
              <SwitchRow {...baseProps} {...extra} type={type} />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Tip + truncation × Type'
        firstColumnHeader='Variant'
        columnHeaders={keyTypes.map(t => t.toUpperCase())}
        rows={[
          {
            variantLabel: 'withTip',
            cells: keyTypes.map(type => (
              <div key={type} className={styles.column}>
                <SwitchRow {...baseProps} type={type} tip='Подсказка' />
              </div>
            )),
          },
          {
            variantLabel: 'disableTruncate',
            cells: keyTypes.map(type => (
              <div key={type} className={styles.column}>
                <SwitchRow
                  {...baseProps}
                  type={type}
                  title='Очень длинный заголовок, который должен помещаться целиком без обрезания хвоста'
                  disableTitleTruncate
                />
              </div>
            )),
          },
        ]}
      />
    </div>
  ),
};
