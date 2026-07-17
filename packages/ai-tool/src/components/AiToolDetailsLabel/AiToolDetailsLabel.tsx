import { EyeClosedSVG, EyeSVG } from '@ds/icons/interface/system';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode } from 'react';

import { AI_TOOL_DETAILS_STATE, TEST_IDS } from '../../constants';
import { AiToolDetailsState } from '../../types';
import styles from './styles.module.scss';

export type AiToolDetailsLabelOwnProps = {
  /** Текст лейбла (заголовок блока деталей). */
  label?: ReactNode;
  /** Состояние: `default` — нейтральный, `error` — красный. */
  state?: AiToolDetailsState;
  /** Показать кнопку-«глаз» для раскрытия секретного значения. */
  showSecret?: boolean;
  /** Секрет раскрыт: глаз открыт (секреты видны). Зачёркнутый глаз — секреты скрыты. Источник истины — родитель. */
  secretRevealed?: boolean;
  /** Клик по кнопке-«глаз». Не вызывается, если `showSecret` не задан. */
  onToggleSecret?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolDetailsLabel`.
 *
 * Презентационный заголовок-чип блока деталей инструмента. Несёт текст лейбла и
 * опциональную кнопку-«глаз» для раскрытия секретного содержимого
 * (`showSecret` + `onToggleSecret`, видимое состояние — `secretRevealed`).
 */
export type AiToolDetailsLabelProps = WithSupportProps<
  AiToolDetailsLabelOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolDetailsLabelOwnProps>
>;

export function AiToolDetailsLabel({
  label,
  state = AI_TOOL_DETAILS_STATE.Default,
  showSecret = false,
  secretRevealed = false,
  onToggleSecret,
  className,
  'data-test-id': dataTestId = TEST_IDS.detailsLabel,
  ...rest
}: AiToolDetailsLabelProps): ReactElement {
  return (
    <div {...rest} className={cn(styles.root, className)} data-state={state} data-test-id={dataTestId}>
      {label && <span className={styles.label}>{label}</span>}
      {showSecret && (
        <button
          type='button'
          className={styles.secret}
          data-test-id={TEST_IDS.detailsLabelSecret}
          aria-label={secretRevealed ? 'Hide secret' : 'Show secret'}
          aria-pressed={secretRevealed}
          onClick={onToggleSecret}
        >
          {secretRevealed ? <EyeSVG size={16} /> : <EyeClosedSVG size={16} />}
        </button>
      )}
    </div>
  );
}
