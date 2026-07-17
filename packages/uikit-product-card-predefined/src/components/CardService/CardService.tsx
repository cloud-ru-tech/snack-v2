import { Card, PolymorphicRef } from '@ds/card';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { CardAction } from '../../helperComponents';
import styles from './styles.module.scss';

type BaseCardServiceProps = {
  /** Заголовок карточки */
  title: string;
  /** Описание */
  content: string;
  /** Текст кнопки действия */
  actionLabel: string;
  /** Эмблема — передавайте `<IconPredefined icon={...} />` или произвольный ReactElement */
  emblem: ReactElement;
  /** Неактивное состояние */
  disabled?: boolean;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export type CardServiceProps<T extends ElementType = 'div'> = BaseCardServiceProps & {
  /** Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardServiceProps | 'as' | 'ref'>;

export function CardService<T extends ElementType = 'div'>({
  title,
  content,
  actionLabel,
  emblem,
  disabled,
  className,
  as,
  innerRef,
  'data-test-id': dataTestId,
  ...rest
}: CardServiceProps<T>): ReactElement | null {
  return (
    <Card<T>
      as={as}
      innerRef={innerRef}
      disabled={disabled}
      interactive
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardService}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.emblem}>{emblem}</div>

          <Typography as='p' variant='title' size='m' className={styles.title}>
            <TruncateString text={title} maxLines={2} variant='end' />
          </Typography>
        </div>

        <Typography as='p' variant='body' size='m' className={styles.description}>
          <TruncateString text={content} maxLines={3} variant='end' data-test-id={TEST_IDS.cardServiceContent} />
        </Typography>

        <CardAction actionLabel={actionLabel} />
      </div>
    </Card>
  );
}
