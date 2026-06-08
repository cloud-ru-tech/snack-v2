import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { AiToolIconType } from '../../types';
import { AI_TOOL_ICON_GLYPHS } from './icons';
import styles from './styles.module.scss';

export type AiToolIconOwnProps = {
  /** Тип инструмента — определяет глиф (reasoning / search / read / act / security / wait). */
  variant: AiToolIconType;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolIcon`.
 *
 * Презентационная 16×16 иконка типа инструмента для составных AI-компонентов
 * стриминга (Tool, Tool Simple). Цвет наследуется через `currentColor`; по
 * умолчанию — приглушённый `textTertiary`, переопределяется через `color` на
 * родителе.
 */
export type AiToolIconProps = WithSupportProps<
  AiToolIconOwnProps & Omit<ComponentPropsWithoutRef<'span'>, keyof AiToolIconOwnProps>
>;

export function AiToolIcon({
  variant,
  className,
  'data-test-id': dataTestId = TEST_IDS.icon,
  ...rest
}: AiToolIconProps): ReactElement {
  const Glyph = AI_TOOL_ICON_GLYPHS[variant];

  return (
    <span {...rest} className={cn(styles.root, className)} data-variant={variant} data-test-id={dataTestId}>
      {Glyph && <Glyph className={styles.glyph} />}
    </span>
  );
}
