import { AvatarProps } from '@ds/avatar';
import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type BaseTitleClickableProps = {
  /** Заголовок */
  title?: string;
  /** Тег заголовка для семантики (например `'h2'`, `'h3'`, `'span'`) */
  titleTag?: ElementType;
  /**
   * Слот слева от заголовка. Произвольная нода либо предзаготовленные пресеты
   * `<TitleClickableIcon icon={...} />` / `<TitleClickableAvatar {...} />`.
   * Соответствует Figma-слоту `+ slotTitle` (`simpleTitle` / `userTitle`).
   */
  before?: ReactNode;
  /** Кастомное содержимое вместо title/before */
  children?: ReactNode;

  /**
   * @deprecated Используй `before={<TitleClickableIcon icon={...} />}`.
   * Иконка слева от заголовка.
   */
  icon?: ReactNode;
  /**
   * @deprecated Используй `before={<TitleClickableAvatar {...} subtitle={...} />}`.
   * Аватар с subtitle (Figma `userTitle`).
   */
  avatar?: AvatarProps & { subtitle: string };

  /** Занимает ли всю ширину */
  fullWidth?: boolean;
  /** Показывать иконку-стрелку справа. Иконка автоматически меняется на `external link` при `target='_blank'`. */
  showArrow?: boolean;

  /** CSS-класс */
  className?: string;
};

export type TitleClickableProps<T extends ElementType = 'a'> = WithSupportProps<
  BaseTitleClickableProps & {
    /** Полиморфный тег корня — `'a'` по умолчанию, либо компонент-роутер (`Link` из react-router-dom). */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof BaseTitleClickableProps | 'as' | 'ref'>
>;
