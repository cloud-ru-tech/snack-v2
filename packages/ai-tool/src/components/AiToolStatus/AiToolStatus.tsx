import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { AiToolStatusState } from '../../types';
import styles from './styles.module.scss';

export type AiToolStatusOwnProps = {
  /** Состояние выполнения инструмента: success / error / loading / pending. */
  state: AiToolStatusState;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolStatus`.
 *
 * Презентационная точка-индикатор состояния инструмента. Цвет задаётся `state`
 * (success — зелёный, error — красный, loading — синий, pending — нейтральный).
 * В состоянии `loading` точка пульсирует.
 */
export type AiToolStatusProps = WithSupportProps<
  AiToolStatusOwnProps & Omit<ComponentPropsWithoutRef<'span'>, keyof AiToolStatusOwnProps>
>;

export function AiToolStatus({
  state,
  className,
  'data-test-id': dataTestId = TEST_IDS.status,
  ...rest
}: AiToolStatusProps): ReactElement {
  return <span {...rest} className={cn(styles.root, className)} data-state={state} data-test-id={dataTestId} />;
}
