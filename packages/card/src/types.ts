import { BackgroundPredefinedFill } from '@ds/materials';
import { ValueOf } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import { RADIUS, VIEW } from './constants';

export type Radius = ValueOf<typeof RADIUS>;
export type View = ValueOf<typeof VIEW>;

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type BaseCardProps = {
  /** Радиус контейнера. */
  radius?: Radius;
  /** Визуальный режим карточки. */
  view?: View;
  /**
   * Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
   * По умолчанию `material/neutralBackground1Level`.
   */
  backgroundPredefined?: BackgroundPredefinedFill;
  /** Заблокированный режим: интерактив отключён, opacity снижен. */
  disabled?: boolean;
  /** Выбран (для multiSelect — показывает чек-бэйдж в углу). */
  checked?: boolean;
  /** Режим множественного выбора — добавляет чек-бэйдж в углу при `checked`. */
  multiSelect?: boolean;
  /**
   * Включает интерактивные эффекты (hover/press state layer, cursor: pointer, focus-ring).
   * Установи `false` для презентационной карточки без отклика на курсор.
   * @default true
   */
  interactive?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Полиморфный проп: рендер как `div` (по умолчанию), как `a` или как кастомный
 * компонент (например `Link` из react-router-dom). Для `as='a'` поддерживается
 * `href`/`target`/`rel`; для `as={Link}` — `to`, и т.д. — типы вытягиваются из
 * `ComponentPropsWithoutRef<T>`.
 */
export type CardProps<T extends ElementType = 'div'> = BaseCardProps & {
  as?: T;
  /**
   * Ref на реальный DOM-элемент/инстанс, который рендерится через `as`.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseCardProps | 'as' | 'ref'>;
