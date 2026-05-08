import { CheckSVG } from '@ds/icons';
import { BACKGROUND_PREDEFINED_FILL, BackgroundPredefinedFill, backgroundPredefinedFillToAcrylic } from '@ds/materials';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { RADIUS, VIEW } from '../../constants';
import { CardContext } from '../../context';
import { Radius, View } from '../../types';
import styles from './styles.module.scss';

export type CardProps = WithSupportProps<{
  /** Радиус контейнера */
  radius?: Radius;
  /** Визуальный режим карточки */
  view?: View;
  /**
   * Слой backgroundPredefined + acrylic (см. `BACKGROUND_PREDEFINED_FILL` в `@ds/materials`).
   * По умолчанию `material/neutralBackground1Level`.
   */
  backgroundPredefined?: BackgroundPredefinedFill;
  disabled?: boolean;
  checked?: boolean;
  /** Показ чекбокса для режима множественного выбора */
  multiSelect?: boolean;
  children?: ReactNode;
  className?: string;
}>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      radius = RADIUS.M,
      view = VIEW.Simple,
      backgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
      disabled = false,
      checked,
      multiSelect = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const supportProps = extractSupportProps(rest);
    const { appearance, level } = backgroundPredefinedFillToAcrylic(backgroundPredefined);

    return (
      <CardContext.Provider value={{ radius, disabled }}>
        <div
          ref={ref}
          className={cn(styles.card, className)}
          data-radius={radius}
          data-view={view}
          data-disabled={disabled || undefined}
          data-checked={checked || undefined}
          data-acrylic-appearance={appearance}
          data-acrylic-level={level}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- корневой Tab-фокус как в легаси; интерактив (href/onClick) — позже
          tabIndex={0}
          {...supportProps}
        >
          <span className={styles.acrylic} aria-hidden data-acrylic-background />
          <span className={styles.stateLayer} data-state={checked ? 'activatedFilled' : 'regularFilled'} aria-hidden />
          {checked && multiSelect && (
            <span className={styles.checkWrapper} aria-hidden>
              <span className={styles.checkContainer} data-check-badge>
                <CheckSVG size={16} />
              </span>
            </span>
          )}
          <div className={styles.content}>{children}</div>
        </div>
      </CardContext.Provider>
    );
  },
);

Card.displayName = 'Card';
