import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { useAiToolContentFormat } from '../../context';
import styles from './styles.module.scss';

export type AiToolTextOwnProps = {
  /** Текст блока. */
  children?: ReactNode;
  /** Состояние ошибки: текст красный. По умолчанию наследуется от `AiToolDetails`. */
  error?: boolean;
  /** Моноширинный режим: шрифт mono/body вместо label. По умолчанию наследуется от `AiToolDetails`. */
  mono?: boolean;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolText`.
 *
 * Презентационный текстовый блок для содержимого инструмента. `mono`
 * переключает шрифт на моноширинный, `error` — окрашивает текст в красный.
 */
export type AiToolTextProps = WithSupportProps<
  AiToolTextOwnProps & Omit<ComponentPropsWithoutRef<'span'>, keyof AiToolTextOwnProps>
>;

export function AiToolText({
  children,
  error,
  mono,
  className,
  'data-test-id': dataTestId = TEST_IDS.text,
  ...rest
}: AiToolTextProps): ReactElement {
  const format = useAiToolContentFormat();
  const effectiveError = error ?? format.error ?? false;
  const effectiveMono = mono ?? format.mono ?? false;

  return (
    <span
      {...rest}
      className={cn(styles.root, className)}
      data-error={effectiveError || undefined}
      data-mono={effectiveMono || undefined}
      data-test-id={dataTestId}
    >
      {children}
    </span>
  );
}
