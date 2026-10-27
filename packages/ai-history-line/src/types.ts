import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ElementType } from 'react';

/** Собственные пропсы компонента плюс атрибуты тега, выбранного через `as`. */
export type PolymorphicProps<T extends ElementType, OwnProps> = WithSupportProps<
  OwnProps & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | 'as' | 'ref'>
>;
