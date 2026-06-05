import { ValueOf, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, useId } from 'react';

import { GIGA_PATH, GRADIENT_PARAMS, LOGO_DARK_STOPS, LOGO_LIGHT_STOPS, TEST_IDS, VARIANT } from './constants';
import styles from './styles.module.scss';

export type AiIconGigaVariant = ValueOf<typeof VARIANT>;

const STOPS_BY_VARIANT = {
  [VARIANT.LogoDark]: LOGO_DARK_STOPS,
  [VARIANT.LogoLight]: LOGO_LIGHT_STOPS,
} as const;

export type AiIconGigaOwnProps = {
  /**
   * Вариант логотипа GigaChat:
   * - `neutral` — монохром (`currentColor`, по умолчанию вторичный текстовый токен);
   * - `logoDark` — брендовый градиент для тёмного фона;
   * - `logoLight` — брендовый градиент для светлого фона.
   * По умолчанию `neutral`.
   */
  variant?: AiIconGigaVariant;
  /** Размер иконки в px (квадрат). По умолчанию `80`. */
  size?: number;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiIconGiga`.
 *
 * Иконка-логотип GigaChat из набора AI Components для переиспользования в
 * составных компонентах стриминга. Рендерится как `<svg>`.
 *
 * По умолчанию декоративна (`aria-hidden`). Если иконка несёт смысл —
 * переопределите `aria-hidden={false}` и задайте `aria-label`.
 */
export type AiIconGigaProps = WithSupportProps<
  AiIconGigaOwnProps & Omit<ComponentPropsWithoutRef<'svg'>, keyof AiIconGigaOwnProps | 'children'>
>;

export function AiIconGiga({
  variant = VARIANT.Neutral,
  size = 80,
  className,
  'aria-hidden': ariaHidden,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiIconGigaProps): ReactElement {
  const gradientId = useId();
  const isBranded = variant === VARIANT.LogoDark || variant === VARIANT.LogoLight;
  const stops = isBranded ? STOPS_BY_VARIANT[variant] : undefined;

  return (
    <svg
      {...rest}
      width={size}
      height={size}
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(styles.root, className)}
      aria-hidden={ariaHidden ?? true}
      data-variant={variant}
      data-test-id={dataTestId}
    >
      <g transform='translate(10 10)'>
        <path d={GIGA_PATH} fill={isBranded ? `url(#${gradientId})` : 'currentColor'} />
        {stops && (
          <defs>
            <radialGradient id={gradientId} {...GRADIENT_PARAMS}>
              {stops.map(({ offset, stopColor }) => (
                <stop key={offset} offset={offset} stopColor={stopColor} />
              ))}
            </radialGradient>
          </defs>
        )}
      </g>
    </svg>
  );
}
