import { AvatarProps } from '@ds/avatar';
import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type BaseTitleClickableProps = {
  /** Заголовок */
  title?: string;
  /** Тег заголовка для семантики (например `'h2'`, `'h3'`, `'span'`) */
  titleTag?: ElementType;
  /** Произвольная нода после заголовка. Имеет приоритет над `avatar`. */
  children?: ReactNode;
  /** Иконка слева от заголовка. */
  icon?: ReactNode;
  /** Аватар с subtitle (Figma `userTitle`). Рендерится после заголовка, если `children` не передан. */
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
