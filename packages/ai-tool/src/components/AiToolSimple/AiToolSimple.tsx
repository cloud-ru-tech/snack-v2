import { AiButtonChevron } from '@ds/ai-button-chevron';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { AI_TOOL_STATUS_STATE, TEST_IDS } from '../../constants';
import { useToolDisclosure } from '../../hooks';
import { AiToolIconType, AiToolStatusState } from '../../types';
import { isSlotFilled } from '../../utils/slots';
import { AiToolIcon } from '../AiToolIcon';
import { AiToolStatus } from '../AiToolStatus';
import styles from './styles.module.scss';

export type AiToolSimpleOwnProps = {
  /** Имя инструмента — строка заголовка; в свёрнутом состоянии обрезается ellipsis. */
  name: ReactNode;
  /** Тип инструмента — глиф `AiToolIcon` слева от заголовка. */
  icon: AiToolIconType;
  /**
   * Состояние выполнения. В `loading` тип инструмента ещё неизвестен,
   * поэтому вместо иконки показывается пульсирующая точка `AiToolStatus`,
   * а заголовок подсвечивается основным цветом текста. В остальных
   * состояниях слева рендерится иконка типа (`icon`).
   */
  state?: AiToolStatusState;
  /** Текстовое описание под заголовком в раскрытом состоянии. */
  description?: ReactNode;
  /**
   * Контент раскрытия под описанием — например, ряд `AiToolBadge`
   * с задействованными ресурсами. Выкладывается в строку с переносом.
   */
  children?: ReactNode;
  /** Раскрытое состояние (controlled). Для uncontrolled-режима — `defaultOpen`. */
  open?: boolean;
  /** Начальное раскрытое состояние (uncontrolled). */
  defaultOpen?: boolean;
  /** Переключение раскрытия. Получает новое значение `open`. */
  onOpenChange?(open: boolean): void;
  /**
   * Линия-коннектор к следующему инструменту в таймлайне. Линия выходит
   * на 8px ниже корня — рассчитана на вертикальный список с `gap: 8px`.
   */
  connector?: boolean;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolSimple`.
 *
 * Компактный инструмент AI-стриминга (Гига-помощник): иконка типа, имя
 * и chevron в заголовке; в раскрытом состоянии — текстовое описание и
 * контент (бейджи ресурсов). В отличие от `AiTool` — без статус-точки,
 * длительности и фона-карточки. Раскрытие — controlled (`open` +
 * `onOpenChange`) либо uncontrolled (`defaultOpen`).
 */
export type AiToolSimpleProps = WithSupportProps<
  AiToolSimpleOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolSimpleOwnProps>
>;

export function AiToolSimple({
  name,
  icon,
  state = AI_TOOL_STATUS_STATE.Pending,
  description,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  connector = false,
  className,
  'data-test-id': dataTestId = TEST_IDS.simple,
  ...rest
}: AiToolSimpleProps): ReactElement {
  const isLoading = state === AI_TOOL_STATUS_STATE.Loading;
  const hasDescription = isSlotFilled(description);
  const hasContent = isSlotFilled(children);
  const hasDetails = hasDescription || hasContent;
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
        {isLoading && (
          <span className={styles.statusContainer}>
            <AiToolStatus state={state} data-test-id={TEST_IDS.simpleStatus} />
          </span>
        )}
        {!isLoading && <AiToolIcon className={styles.icon} variant={icon} data-test-id={TEST_IDS.simpleIcon} />}
        {connector && <span className={styles.connector} data-test-id={TEST_IDS.simpleConnector} aria-hidden />}
      </div>
      <div className={styles.container}>
        <div className={styles.header} data-test-id={TEST_IDS.simpleHeader}>
          <span className={styles.name} data-test-id={TEST_IDS.simpleName}>
            {name}
          </span>
          {hasDetails && (
            <AiButtonChevron
              className={styles.chevron}
              open={open}
              aria-controls={ariaControls}
              onClick={toggle}
              data-test-id={TEST_IDS.simpleChevron}
            />
          )}
        </div>
        {showDetails && (
          <div className={styles.details} id={detailsId}>
            {hasDescription && (
              <span className={styles.description} data-test-id={TEST_IDS.simpleDescription}>
                {description}
              </span>
            )}
            {hasContent && (
              <div className={styles.content} data-test-id={TEST_IDS.simpleContent}>
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
