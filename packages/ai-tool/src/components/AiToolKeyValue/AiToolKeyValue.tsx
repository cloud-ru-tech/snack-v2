import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { AI_TOOL_KEY_VALUE_TYPE, TEST_IDS } from '../../constants';
import { useAiToolContentFormat } from '../../context';
import { AiToolKeyValueType } from '../../types';
import styles from './styles.module.scss';

export type AiToolKeyValueOwnProps = {
  /** Ключ (левая / верхняя часть пары). */
  label?: ReactNode;
  /** Значение (правая / нижняя часть пары). */
  value?: ReactNode;
  /** Раскладка пары: `line` — ключ и значение в строку, `column` — стопкой. */
  variant?: AiToolKeyValueType;
  /** Состояние ошибки: ключ и значение красные. По умолчанию наследуется от `AiToolDetails`. */
  error?: boolean;
  /** Моноширинный режим ключа и значения. По умолчанию наследуется от `AiToolDetails`. */
  mono?: boolean;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolKeyValue`.
 *
 * Презентационная пара «ключ — значение» для содержимого инструмента.
 * В режиме `line` ключ слева, значение справа; в `column` — значение под ключом.
 */
export type AiToolKeyValueProps = WithSupportProps<
  AiToolKeyValueOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolKeyValueOwnProps>
>;

export function AiToolKeyValue({
  label,
  value,
  variant = AI_TOOL_KEY_VALUE_TYPE.Line,
  error,
  mono,
  className,
  'data-test-id': dataTestId = TEST_IDS.keyValue,
  ...rest
}: AiToolKeyValueProps): ReactElement {
  const format = useAiToolContentFormat();
  const effectiveError = error ?? format.error ?? false;
  const effectiveMono = mono ?? format.mono ?? false;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-error={effectiveError || undefined}
      data-mono={effectiveMono || undefined}
      data-test-id={dataTestId}
    >
      {label && <span className={styles.key}>{label}</span>}
      {value != null && <span className={styles.value}>{value}</span>}
    </div>
  );
}
