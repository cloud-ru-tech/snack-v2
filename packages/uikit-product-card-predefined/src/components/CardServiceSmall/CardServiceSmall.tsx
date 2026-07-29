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
  JSXElementConstructor,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
} from 'react';

import { TEST_IDS, VISIBILITY_STRATEGY } from '../../constants';
import { FavoriteProps } from '../../types';
import styles from './styles.module.scss';

type BaseCardServiceSmallProps = {
  /** Заголовок карточки */
  title: string;
  /**
   * Эмблема: объект с иконкой-компонентом.
   * Принимает `{ icon: JSXElementConstructor }` или произвольный ReactElement.
   */
  emblem: { icon: JSXElementConstructor<{ className?: string; size?: number }> } | ReactElement;
  /** Настройки обрезки заголовка */
  truncate?: {
    /** Максимальное количество строк */
    title?: number;
  };
  /** Выбранное состояние */
  checked?: boolean;
  /** Неактивное состояние */
  disabled?: boolean;
  /** Рамка вокруг карточки */
  outline?: boolean;
  /**
   * Промо-тег (бейдж). Тип — `PromoTagProps` из `@ds/promo-tag`.
   */
  promoBadge?: PromoTagProps;
  /**
   * Настройки кнопки «Избранное». `visibilityStrategy` обязателен.
   */
  favorite?: FavoriteProps & { visibilityStrategy: 'always' | 'hover' };
  /** CSS-класс корневого элемента */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export type CardServiceSmallProps<T extends ElementType = 'div'> = BaseCardServiceSmallProps & {
  /** Полиморфный элемент: `'div'`, `'a'`, `{Link}` и т.д. */
  as?: T;
  /** Ref на реальный DOM-элемент / инстанс */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardServiceSmallProps | 'as' | 'ref'>;

function isIconEmblem(
  emblem: BaseCardServiceSmallProps['emblem'],
): emblem is { icon: JSXElementConstructor<{ className?: string; size?: number }> } {
  return 'icon' in emblem;
}

export function CardServiceSmall<T extends ElementType = 'div'>({
  title,
  emblem,
  truncate,
  checked,
  disabled,
  outline,
  promoBadge,
  favorite,
  className,
  as,
  innerRef,
  'data-test-id': dataTestId,
  ...rest
}: CardServiceSmallProps<T>): ReactElement | null {
  const [isFavourite, setIsFavourite] = useUncontrolledProp(favorite?.checked, false, favorite?.onChange);
  const cardRef = useRef<HTMLElement>(null);
  const favouriteRef = useRef<HTMLInputElement>(null);

  const handleCardKeyDown: KeyboardEventHandler<HTMLElement> = useCallback(e => {
    if (e.code === 'ArrowRight') {
      favouriteRef.current?.focus();
    }
  }, []);

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

  const IconComponent = isIconEmblem(emblem) ? emblem.icon : null;

  return (
    <div className={cn(styles.wrapper, className)}>
      <Card<T>
        as={as}
        innerRef={mergeRefs(innerRef, cardRef)}
        disabled={disabled}
        interactive
        checked={checked}
        view={outline ? 'outline' : undefined}
        className={styles.card}
        data-test-id={dataTestId ?? TEST_IDS.cardServiceSmall}
        onKeyDown={handleCardKeyDown as KeyboardEventHandler<Element>}
        {...(rest as ComponentPropsWithoutRef<T>)}
      >
        <div className={styles.contentWrapper}>
          {IconComponent ? (
            <IconComponent className={styles.icon} size={24} />
          ) : (
            !isIconEmblem(emblem) && <div className={styles.icon}>{emblem}</div>
          )}

          <div className={styles.contentLayout}>
            <Typography
              as='span'
              variant='title'
              size='s'
              className={styles.title}
              data-test-id={TEST_IDS.cardServiceSmallTitle}
            >
              <TruncateString text={title} maxLines={truncate?.title} variant='end' />
            </Typography>
          </div>

          {favorite?.enabled && (
            <div
              className={styles.favouriteWrapper}
              data-visibility-strategy={favorite.visibilityStrategy ?? VISIBILITY_STRATEGY.hover}
            >
              <Favourite
                size='s'
                checked={isFavourite}
                inputRef={favouriteRef}
                onChange={setIsFavourite}
                tabIndex={-1}
                onKeyUp={handleFavouriteKeyUp}
                onClick={handleFavouriteClick}
                data-test-id={TEST_IDS.cardServiceSmallFavorite}
                icon='star'
              />
            </div>
          )}
        </div>
      </Card>

      {promoBadge && (
        <div className={styles.promoTagWrapper}>
          <PromoTag {...promoBadge} data-test-id={TEST_IDS.cardServiceSmallPromoBadge} />
        </div>
      )}
    </div>
  );
}

withInnerRefSupport(CardServiceSmall);
