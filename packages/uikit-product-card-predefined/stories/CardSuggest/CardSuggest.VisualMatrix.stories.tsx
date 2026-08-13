import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CARD_SIZE, CardSuggest } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardSuggest> = {
  title: 'Uikit Product/CardPredefined/CardSuggest',
  component: CardSuggest,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CardSuggest>;

const suggestProps = {
  title: 'Подсказка для пользователя',
  content: 'Краткое описание действия или функциональности',
};

const longTitle =
  'Очень длинный заголовок подсказки, который не помещается в две строки и обрезается через TruncateString';
const longDescription =
  'Очень длинное описание подсказки, которое не помещается в три строки и обрезается через TruncateString. Дополнительный текст для демонстрации обрезки.';

const promoBadge = {
  label: 'Новинка',
  appearance: APPEARANCE.Primary,
  role: ROLE_APPEARANCE.Accent,
  size: SIZE.Xs,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='CardSuggest — размеры'
        firstColumnHeader='size'
        columnHeaders={['Default', 'disabled']}
        rows={[
          {
            variantLabel: CARD_SIZE.M,
            cells: [
              <CardSuggest key='m' {...suggestProps} size={CARD_SIZE.M} />,
              <CardSuggest key='m-d' {...suggestProps} size={CARD_SIZE.M} disabled />,
            ],
          },
          {
            variantLabel: CARD_SIZE.S,
            cells: [
              <CardSuggest key='s' {...suggestProps} size={CARD_SIZE.S} />,
              <CardSuggest key='s-d' {...suggestProps} size={CARD_SIZE.S} disabled />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardSuggest — promoBadge'
        firstColumnHeader='Вариант'
        columnHeaders={['without', 'with promoBadge']}
        rows={[
          {
            variantLabel: CARD_SIZE.M,
            cells: [
              <CardSuggest key='m-no-promo' {...suggestProps} size={CARD_SIZE.M} />,
              <CardSuggest key='m-promo' {...suggestProps} size={CARD_SIZE.M} promoBadge={promoBadge} />,
            ],
          },
          {
            variantLabel: CARD_SIZE.S,
            cells: [
              <CardSuggest key='s-no-promo' {...suggestProps} size={CARD_SIZE.S} />,
              <CardSuggest key='s-promo' {...suggestProps} size={CARD_SIZE.S} promoBadge={promoBadge} />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='CardSuggest — truncate'
        firstColumnHeader='Вариант'
        columnHeaders={['default', 'truncate']}
        rows={[
          {
            variantLabel: 'long text',
            cells: [
              <CardSuggest key='long-default' title={longTitle} content={longDescription} />,
              <CardSuggest
                key='long-truncate'
                title={longTitle}
                content={longDescription}
                truncate={{ title: 2, content: 3 }}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
