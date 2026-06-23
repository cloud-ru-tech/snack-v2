import { PlaceholderSVG } from '@ds/icons';
import { SIZE, ToggleCard, ToggleCardProps, ToggleGroup } from '@ds/uikit-product-toggles-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;

const meta: Meta<typeof ToggleCard> = {
  title: 'Uikit Product/TogglesPredefined/ToggleCard',
  component: ToggleCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToggleCard>;

const baseProps: Pick<ToggleCardProps, 'title' | 'description' | 'emblem'> = {
  title: 'Тариф Pro',
  description: '100 ГБ хранилища, приоритетная поддержка',
  emblem: { icon: PlaceholderSVG },
};

// Каждая ячейка — карточка внутри собственной ToggleGroup; `checked` достигается
// тем, что defaultValue группы совпадает со value карточки.
function Cell({ checked, ...props }: ToggleCardProps & { checked?: boolean }): ReactNode {
  return (
    <div className={styles.column}>
      <ToggleGroup defaultValue={checked ? props.value : undefined}>
        <ToggleCard {...props} />
      </ToggleGroup>
    </div>
  );
}

const checkedColumns = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size'
        firstColumnHeader='Size'
        columnHeaders={['CARD']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <Cell
              key={size}
              size={size}
              emblem={{ icon: PlaceholderSVG }}
              title='Тариф Pro'
              description='100 ГБ хранилища'
              value={`size-${size}`}
              checked
            />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='State × Checked'
        firstColumnHeader='State'
        columnHeaders={['UNCHECKED', 'CHECKED']}
        rows={[
          {
            variantLabel: 'default',
            cells: checkedColumns.map(checked => (
              <Cell key={String(checked)} {...baseProps} value='default' checked={checked} />
            )),
          },
          {
            variantLabel: 'disabled',
            cells: checkedColumns.map(checked => (
              <Cell key={String(checked)} {...baseProps} value='disabled' disabled checked={checked} />
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Content slots'
        firstColumnHeader='Variant'
        columnHeaders={['VIEW']}
        rows={[
          {
            variantLabel: 'noIcon',
            cells: [<Cell key='noIcon' title='Без иконки' description='Только текст' value='noIcon' />],
          },
          {
            variantLabel: 'titleOnly',
            cells: [
              <Cell key='titleOnly' title='Только заголовок' emblem={{ icon: PlaceholderSVG }} value='titleOnly' />,
            ],
          },
          {
            variantLabel: 'truncate',
            cells: [
              <Cell
                key='truncate'
                emblem={{ icon: PlaceholderSVG }}
                title='Очень длинный заголовок, который обрезается в одну строку по дефолту'
                description='И длинное описание, которое по умолчанию обрезается до двух строк — этого текста хватает, чтобы перекрыть лимит и показать многоточие'
                value='truncate'
              />,
            ],
          },
          {
            variantLabel: 'promoBadge',
            cells: [
              <Cell
                key='promoBadge'
                emblem={{ icon: PlaceholderSVG }}
                title='Тариф Pro'
                description='С промо-бейджем'
                promoBadge='−20%'
                value='promoBadge'
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
