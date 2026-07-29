import { Button } from '@ds/button';
import { Card, PolymorphicRef } from '@ds/card';
import { CrossSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, MouseEventHandler, ReactElement, useCallback } from 'react';

import { TEST_IDS } from '../../constants';
import { CardAction } from '../../helperComponents';
import styles from './styles.module.scss';

type BaseCardBannerProps = {
  /** Заголовок карточки */
  title: string;
  /** Описание */
  content: string;
  /** Текст кнопки действия */
  actionLabel: string;
  /** Изображение */
  image: {
    src: string;
    alt: string;
  };
  /** Колбэк закрытия. При наличии отображается кнопка «Закрыть» */
  onClose?: MouseEventHandler<HTMLElement>;
  /** Неактивное состояние */
  disabled?: boolean;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export type CardBannerProps<T extends ElementType = 'div'> = BaseCardBannerProps & {
  /** Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardBannerProps | 'as' | 'ref'>;

export function CardBanner<T extends ElementType = 'div'>({
  title,
  content,
  actionLabel,
  image,
  onClose,
  disabled,
  className,
  as,
  innerRef,
  'data-test-id': dataTestId,
  ...rest
}: CardBannerProps<T>): ReactElement | null {
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.stopPropagation();
      onClose?.(e);
    },
    [onClose],
  );

  return (
    <Card<T>
      as={as}
      innerRef={innerRef}
      disabled={disabled}
      interactive
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardBanner}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {onClose && (
        <div className={styles.closeButton}>
          <Button
            view='tonal'
            appearance='neutral'
            size='s'
            icon={<CrossSVG />}
            onClick={handleClose}
            data-test-id={TEST_IDS.cardBannerClose}
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.left}>
          <Typography as='p' variant='title' size='m' className={styles.title}>
            <TruncateString key={title} text={title} maxLines={2} variant='end' />
          </Typography>

          <Typography as='p' variant='body' size='m' className={styles.description}>
            <TruncateString
              key={content}
              text={content}
              maxLines={2}
              variant='end'
              data-test-id={TEST_IDS.cardBannerContent}
            />
          </Typography>

          <CardAction actionLabel={actionLabel} />
        </div>

        <img src={image.src} alt={image.alt} className={styles.image} data-test-id={TEST_IDS.cardBannerImage} />
      </div>
    </Card>
  );
}

withInnerRefSupport(CardBanner);
