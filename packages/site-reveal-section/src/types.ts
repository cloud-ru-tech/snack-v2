import { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type RevealAnimationOptions = {
  /** Отображать содержимое сразу, без анимации. */
  disabled?: boolean;
  /** Не использовать анимацию появления при инициализации компонента */
  skipInitialViewport?: boolean;
  /** Длительность анимации в миллисекундах. */
  duration?: number;
  /** Задержка анимации в миллисекундах. */
  delay?: number;
  /** Начальное смещение по вертикали в пикселях. */
  offset?: number;
  /** CSS-функция плавности перехода. */
  easing?: CSSProperties['transitionTimingFunction'];
  /** Отступы области наблюдения IntersectionObserver. */
  rootMargin?: IntersectionObserverInit['rootMargin'];
  /** Порог пересечения или массив порогов для IntersectionObserver. */
  threshold?: IntersectionObserverInit['threshold'];
};

export type RevealSectionProps = HTMLAttributes<HTMLDivElement> &
  RevealAnimationOptions & {
    /** Тестовый идентификатор обёртки. */
    'data-test-id'?: string;
  };

export type RevealSectionsProps = PropsWithChildren<
  RevealAnimationOptions &
    Pick<RevealSectionProps, 'className' | 'style'> & {
      /** Отображать первый дочерний элемент без обёртки для анимации. */
      skipFirst?: boolean;
      /** Отображать подходящие под условие элементы без обёртки для анимации. */
      shouldSkip?(child: ReactNode, index: number): boolean;
    }
>;
