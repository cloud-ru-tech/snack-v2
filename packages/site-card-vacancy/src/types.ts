import { ValueOf, WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

import { APPEARANCE } from './constants';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type Appearance = ValueOf<typeof APPEARANCE>;

type BaseCardVacancyProps = {
  /** Заголовок вакансии. Обрезается многоточием, если не помещается в одну строку. */
  title?: string;
  /** Описание под заголовком. Обрезается многоточием, если не помещается в одну строку. */
  description?: string;
  /**
   * Визуальный вид карточки:
   *
   * - `neutral` — нейтральный полупрозрачный фон, тёмный заголовок.
   * - `primary` — акцентный фон `primary` с декоративным паттерном, текст `onAccent`.
   */
  appearance?: Appearance;
  /** Компактная мобильная версия — меньшая высота и более мелкая типографика. */
  mobile?: boolean;
  /** CSS-класс корневого элемента. */
  className?: string;
};

export type CardVacancyProps<T extends ElementType = 'a'> = WithSupportProps<
  BaseCardVacancyProps & {
    /** Полиморфный тег корня — `'a'` по умолчанию (карточка-ссылка), либо роутерный `Link` / `'button'` / `'div'`. */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardVacancyProps | 'as' | 'ref'>
>;
