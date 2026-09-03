import { CheckSVG, CopySVG, EyeClosedSVG, EyeSVG } from '@ds/icons/interface/system';
import { useCopyToClipboard, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode, useCallback } from 'react';

import { AI_TOOL_DETAILS_STATE, TEST_IDS } from '../../constants';
import { AiToolDetailsState } from '../../types';
import styles from './styles.module.scss';

export type AiToolDetailsLabelOwnProps = {
  /** Текст лейбла (заголовок блока деталей). */
  label?: ReactNode;
  /** Состояние: `default` — нейтральный, `error` — красный. */
  state?: AiToolDetailsState;
  /** Содержимое связанного `ToolDetails` для копирования. */
  copyValue?: string;
  /** Вызывается после копирования содержимого. */
  onCopyClick?(value: string): void;
  /** Показать кнопку копирования. По умолчанию `true`; требуется непустой `copyValue`. */
  showCopyButton?: boolean;
  /** Показать кнопку-«глаз» для раскрытия секретного значения. */
  showEyeButton?: boolean;
  /** Секрет раскрыт: глаз открыт (секреты видны). Зачёркнутый глаз — секреты скрыты. Источник истины — родитель. */
  secretRevealed?: boolean;
  /** Клик по кнопке-«глаз». Не вызывается, если `showEyeButton` не задан. */
  onToggleSecret?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolDetailsLabel`.
 *
 * Презентационный заголовок-чип блока деталей инструмента. Несёт текст лейбла и
 * опциональную кнопку-«глаз» для раскрытия секретного содержимого
 * (`showEyeButton` + `onToggleSecret`, видимое состояние — `secretRevealed`).
 */
export type AiToolDetailsLabelProps = WithSupportProps<
  AiToolDetailsLabelOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolDetailsLabelOwnProps>
>;

export function AiToolDetailsLabel({
  label,
  state = AI_TOOL_DETAILS_STATE.Default,
  copyValue,
  onCopyClick,
  showCopyButton = true,
  showEyeButton = false,
  secretRevealed = false,
  onToggleSecret,
  className,
  'data-test-id': dataTestId = TEST_IDS.detailsLabel,
  ...rest
}: AiToolDetailsLabelProps): ReactElement {
  const { isChecked, copy } = useCopyToClipboard();

  const showCopy = showCopyButton && Boolean(copyValue);

  const handleCopyClick = useCallback(() => {
    if (!copyValue) return;
    copy(copyValue);
    onCopyClick?.(copyValue);
  }, [copy, copyValue, onCopyClick]);

  return (
    <div {...rest} className={cn(styles.root, className)} data-state={state} data-test-id={dataTestId}>
      {label && <span className={styles.label}>{label}</span>}
      {showCopy && (
        <button
          type='button'
          className={styles.action}
          data-test-id={TEST_IDS.detailsLabelCopy}
          aria-label={isChecked ? 'Copied' : 'Copy'}
          onClick={handleCopyClick}
        >
          {isChecked ? <CheckSVG size={16} /> : <CopySVG size={16} />}
        </button>
      )}
      {showEyeButton && (
        <button
          type='button'
          className={styles.action}
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
