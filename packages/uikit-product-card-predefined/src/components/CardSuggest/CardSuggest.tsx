import { Card, PolymorphicRef } from '@ds/card';
import { PromoTag, PromoTagProps } from '@ds/promo-tag';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

import { CARD_SIZE, CARD_SUGGEST_TRUNCATE_DEFAULTS, TEST_IDS } from '../../constants';
import { CardSize } from '../../types';
import styles from './styles.module.scss';

type BaseCardSuggestProps = {
  /** Заголовок */
  title: string;
  /** Описание */
  content: string;
  /**
   * Размер: управляет типографикой и отступами.
   * `'m'` — roleTitle/m + roleBody/m, padding 16px;
   * `'s'` — roleTitle/s + roleBody/s, padding 8px.
   * @default 'm'
   */
  size?: CardSize;
  /** Настройки обрезки текста */
  truncate?: {
    /** Максимальное количество строк заголовка */
    title?: number;
    /** Максимальное количество строк содержимого */
    content?: number;
  };
  /** Неактивное состояние */
  disabled?: boolean;
  /**
   * Промо-тег.
   * Используйте `PromoTagProps` из `@ds/promo-tag`.
   */
  promoBadge?: PromoTagProps;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export type CardSuggestProps<T extends ElementType = 'div'> = BaseCardSuggestProps & {
  /** Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardSuggestProps | 'as' | 'ref'>;

export function CardSuggest<T extends ElementType = 'div'>({
  title,
  content,
  size = CARD_SIZE.M,
  truncate,
  disabled,
  promoBadge,
  className,
  as,
  innerRef,
  'data-test-id': dataTestId,
  ...rest
}: CardSuggestProps<T>): ReactElement | null {
  const truncateLines = { ...CARD_SUGGEST_TRUNCATE_DEFAULTS, ...truncate };

  return (
    <Card<T>
      as={as}
      innerRef={innerRef}
      disabled={disabled}
      interactive
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardSuggest}
      data-size={size}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <div className={styles.content}>
        {promoBadge && (
          <div className={styles.promoBadge}>
            <PromoTag {...promoBadge} data-test-id={TEST_IDS.cardSuggestPromoBadge} />
          </div>
        )}

        <Typography as='p' variant='title' size={size} className={styles.title}>
          <TruncateString text={title} maxLines={truncateLines.title} variant='end' />
        </Typography>

        <Typography as='p' variant='body' size={size} className={styles.description}>
          <TruncateString
            text={content}
            maxLines={truncateLines.content}
            variant='end'
            data-test-id={TEST_IDS.cardSuggestContent}
          />
        </Typography>
      </div>
    </Card>
  );
}
