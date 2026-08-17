import { AiButtonChevron } from '@ds/ai-button-chevron';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { AI_TOOL_DETAILS_STATE, AI_TOOL_STATUS_STATE, TEST_IDS } from '../../constants';
import { useToolDisclosure } from '../../hooks';
import { AiToolIconType, AiToolStatusState } from '../../types';
import { formatDuration } from '../../utils/duration';
import { isSlotFilled } from '../../utils/slots';
import { AiToolDetails } from '../AiToolDetails';
import { AiToolIcon } from '../AiToolIcon';
import { AiToolStatus } from '../AiToolStatus';
import styles from './styles.module.scss';

export type AiToolOwnProps = {
  /** Имя инструмента — моноширинная строка заголовка, обрезается ellipsis. */
  name: ReactNode;
  /** Тип инструмента — глиф `AiToolIcon` в заголовке. */
  icon: AiToolIconType;
  /**
   * Состояние выполнения инструмента: `loading` — выполняется (синяя
   * пульсирующая точка, заголовок основным цветом текста вместо
   * приглушённого), `success` — завершён, `error` — завершён с ошибкой
   * (блок ответа подсвечивается красным), `pending` — в очереди.
   */
  state?: AiToolStatusState;
  /**
   * Длительность выполнения в секундах. Форматируется компонентом в д/ч/м/с
   * (ведущие нулевые единицы опускаются, секунды показываются всегда).
   */
  duration?: number;
  /** Раскрытое состояние (controlled). Для uncontrolled-режима — `defaultOpen`. */
  open?: boolean;
  /** Начальное раскрытое состояние (uncontrolled). */
  defaultOpen?: boolean;
  /** Переключение раскрытия. Получает новое значение `open`. */
  onOpenChange?(open: boolean): void;
  /** Содержимое блока запроса. Блок рендерится только при переданном значении. */
  call?: ReactNode;
  /** Содержимое блока ответа. Блок рендерится только при переданном значении. */
  result?: ReactNode;
  /** Заголовок блока запроса. */
  callLabel?: ReactNode;
  /** Заголовок блока ответа. */
  resultLabel?: ReactNode;
  /**
   * Линия-коннектор к следующему инструменту в таймлайне. Линия выходит
   * на 8px ниже корня — рассчитана на вертикальный список с `gap: 8px`.
   */
  connector?: boolean;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiTool`.
 *
 * Составной инструмент AI-стриминга: заголовок (статус-точка, иконка типа,
 * имя, длительность, chevron) и раскрываемые блоки запроса и ответа
 * (`AiToolDetails`). Раскрытие управляется chevron-кнопкой; состояние —
 * controlled (`open` + `onOpenChange`) либо uncontrolled (`defaultOpen`).
 */
export type AiToolProps = WithSupportProps<
  AiToolOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolOwnProps>
>;

export function AiTool({
  name,
  icon,
  state = AI_TOOL_STATUS_STATE.Pending,
  duration,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  call,
  result,
  callLabel = 'Запрос',
  resultLabel = 'Ответ',
  connector = false,
  className,
  'data-test-id': dataTestId = TEST_IDS.tool,
  ...rest
}: AiToolProps): ReactElement {
  const hasCall = isSlotFilled(call);
  const hasResult = isSlotFilled(result);
  const hasDetails = hasCall || hasResult;
  const durationSegments = duration ? formatDuration(duration) : [];
  const { open, toggle, detailsId, ariaControls, showDetails } = useToolDisclosure({
    open: openProp,
    defaultOpen,
    onOpenChange,
    hasDetails,
  });

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-state={state}
      data-open={open || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.stepper}>
        <span className={styles.statusContainer}>
          <AiToolStatus state={state} data-test-id={TEST_IDS.toolStatus} />
        </span>
        {connector && <span className={styles.connector} data-test-id={TEST_IDS.toolConnector} aria-hidden />}
      </div>
      <div className={styles.container}>
        <div className={styles.header} data-test-id={TEST_IDS.toolHeader}>
          <AiToolIcon className={styles.icon} variant={icon} data-test-id={TEST_IDS.toolIcon} />
          <span className={styles.name} data-test-id={TEST_IDS.toolName}>
            {name}
          </span>
          {durationSegments.length > 0 && (
            <span className={styles.duration} data-test-id={TEST_IDS.toolDuration}>
              {durationSegments.map(segment => (
                <span key={segment.unit} className={styles.durationSegment}>
                  <span>{segment.value}</span>
                  <span>{segment.unit}</span>
                </span>
              ))}
            </span>
          )}
          {hasDetails && (
            <AiButtonChevron
              className={styles.chevron}
              open={open}
              aria-controls={ariaControls}
              onClick={toggle}
              data-test-id={TEST_IDS.toolChevron}
            />
          )}
        </div>
        {showDetails && (
          <div className={styles.details} id={detailsId}>
            {hasCall && (
              <AiToolDetails label={callLabel} data-test-id={TEST_IDS.toolCall}>
                {call}
              </AiToolDetails>
            )}
            {hasResult && (
              <AiToolDetails
                label={resultLabel}
                state={
                  state === AI_TOOL_STATUS_STATE.Error ? AI_TOOL_DETAILS_STATE.Error : AI_TOOL_DETAILS_STATE.Default
                }
                data-test-id={TEST_IDS.toolResult}
              >
                {result}
              </AiToolDetails>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
