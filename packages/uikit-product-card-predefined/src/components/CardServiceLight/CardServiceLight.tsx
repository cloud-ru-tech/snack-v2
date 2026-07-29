import { Card, PolymorphicRef } from '@ds/card';
import { PromoTag, PromoTagProps } from '@ds/promo-tag';
import { Favourite } from '@ds/toggles';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { useUncontrolledProp, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  ComponentPropsWithoutRef,
  ElementType,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
} from 'react';

import { TEST_IDS, VISIBILITY_STRATEGY } from '../../constants';
import { FavoriteProps } from '../../types';
import styles from './styles.module.scss';

type BaseCardServiceLightProps = {
  /** Иконка сервиса */
  icon?: ReactElement;
  /** Заголовок карточки */
  title: string;
  /** Настройки promo tag. При отсутствии не отображается */
  promoTag?: PromoTagProps;
  /** Настройки обрезки текста заголовка */
  truncate?: {
    /** Максимальное количество строк заголовка */
    title?: number;
  };
  /** Неактивное состояние */
  disabled?: boolean;
  /**
   * Настройки кнопки «Избранное».
   * Keyboard: ArrowRight на карточке → фокус на Favourite; ArrowLeft на Favourite → фокус на карточку.
   */
  favorite?: FavoriteProps;
  /** Колбэк нажатия клавиши клавиатуры на карточке */
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export type CardServiceLightProps<T extends ElementType = 'button'> = BaseCardServiceLightProps & {
  /** Полиморфный элемент: `'button'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardServiceLightProps | 'as' | 'ref'>;

export function CardServiceLight<T extends ElementType = 'button'>({
  icon,
  title,
  promoTag,
  truncate,
  disabled,
  favorite,
  onKeyDown: onKeyDownProp,
  className,
  as,
  innerRef,
  'data-test-id': dataTestId,
  ...rest
}: CardServiceLightProps<T>): ReactElement | null {
  const [isFavourite, setIsFavourite] = useUncontrolledProp(favorite?.checked, false, favorite?.onChange);
  const cardRef = useRef<HTMLElement>(null);
  const favouriteRef = useRef<HTMLInputElement>(null);

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = useCallback(
    e => {
      if (e.target !== cardRef.current) {
        onKeyDownProp?.(e);
        return;
      }
      if (e.code === 'ArrowRight' && favorite?.enabled) {
        favouriteRef.current?.focus();
      }
      onKeyDownProp?.(e);
    },
    [favorite?.enabled, onKeyDownProp],
  );

  const handleFavouriteKeyUp: KeyboardEventHandler<HTMLSpanElement> = useCallback(
    e => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        cardRef.current?.focus();
      }
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setIsFavourite(!isFavourite);
      }
    },
    [isFavourite, setIsFavourite],
  );

  const handleFavouriteClick: MouseEventHandler<HTMLSpanElement> = useCallback(e => {
    e.stopPropagation();
    favouriteRef.current?.blur();
  }, []);

  return (
    <Card<T>
      as={as}
      innerRef={mergeRefs(innerRef, cardRef)}
      disabled={disabled}
      interactive
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? TEST_IDS.cardServiceLight}
      onKeyDown={handleKeyDown as KeyboardEventHandler<Element>}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <div className={styles.container}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <div className={styles.content}>
          <Typography
            as='span'
            variant='body'
            size='m'
            className={styles.title}
            data-test-id={TEST_IDS.cardServiceLightTitle}
          >
            <TruncateString text={title} maxLines={truncate?.title} variant='end' />
          </Typography>

          {promoTag && <PromoTag {...promoTag} data-test-id={TEST_IDS.cardServiceLightPromoTag} />}
        </div>

        {favorite?.enabled && (
          <div
            className={styles.favouriteWrapper}
            data-visibility-strategy={favorite.visibilityStrategy ?? VISIBILITY_STRATEGY.hover}
            data-checked={isFavourite || undefined}
          >
            <Favourite
              size='s'
              checked={isFavourite}
              inputRef={favouriteRef}
              onChange={setIsFavourite}
              tabIndex={-1}
              onKeyUp={handleFavouriteKeyUp}
              onClick={handleFavouriteClick}
              data-test-id={TEST_IDS.cardServiceLightFavorite}
              icon='star'
            />
          </div>
        )}
      </div>
    </Card>
  );
}

withInnerRefSupport(CardServiceLight);
