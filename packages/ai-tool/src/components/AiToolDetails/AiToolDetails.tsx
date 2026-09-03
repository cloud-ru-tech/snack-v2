import { Scroll } from '@ds/scroll';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode } from 'react';

import { AI_TOOL_DETAILS_HEIGHT, AI_TOOL_DETAILS_STATE, TEST_IDS } from '../../constants';
import { AiToolContentContext } from '../../context';
import { AiToolDetailsHeight, AiToolDetailsState } from '../../types';
import { AiToolDetailsLabel } from '../AiToolDetailsLabel';
import styles from './styles.module.scss';

export type AiToolDetailsOwnProps = {
  /** Контент блока деталей (текст, key-value, дерево). */
  children?: ReactNode;
  /** Текст заголовка-лейбла. */
  label?: ReactNode;
  /** Состояние: `default` — нейтральный, `error` — красная рамка и лейбл. */
  state?: AiToolDetailsState;
  /** Максимальная высота прокручиваемого контента. По умолчанию `small`. */
  height?: AiToolDetailsHeight;
  /** Ограничить высоту контента и включить вертикальный скролл. По умолчанию `true`. */
  scroll?: boolean;
  /** Сериализованное содержимое `ToolDetails` для копирования. */
  copyValue?: string;
  /** Вызывается после копирования содержимого. */
  onCopyClick?(value: string): void;
  /** Показать кнопку копирования. По умолчанию `true`; требуется непустой `copyValue`. */
  showCopyButton?: boolean;
  /** Показать кнопку-«глаз» в заголовке для раскрытия секрета. */
  showEyeButton?: boolean;
  /** Секрет раскрыт. Источник истины — родитель. */
  secretRevealed?: boolean;
  /** Клик по кнопке-«глаз» заголовка. */
  onToggleSecret?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolDetails`.
 *
 * Презентационная карточка деталей инструмента: заголовок-лейбл
 * (`AiToolDetailsLabel`) поверх скроллируемого контента. `state='error'`
 * окрашивает рамку и заголовок в красный.
 */
export type AiToolDetailsProps = WithSupportProps<
  AiToolDetailsOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolDetailsOwnProps>
>;

export function AiToolDetails({
  children,
  label,
  state = AI_TOOL_DETAILS_STATE.Default,
  height = AI_TOOL_DETAILS_HEIGHT.Small,
  scroll = true,
  copyValue,
  onCopyClick,
  showCopyButton = true,
  showEyeButton = false,
  secretRevealed = false,
  onToggleSecret,
  className,
  'data-test-id': dataTestId = TEST_IDS.details,
  ...rest
}: AiToolDetailsProps): ReactElement {
  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-state={state}
      data-height={height}
      data-test-id={dataTestId}
    >
      <AiToolDetailsLabel
        className={styles.header}
        label={label}
        state={state}
        copyValue={copyValue}
        onCopyClick={onCopyClick}
        showCopyButton={showCopyButton}
        showEyeButton={showEyeButton}
        secretRevealed={secretRevealed}
        onToggleSecret={onToggleSecret}
      />
      <AiToolContentContext.Provider value={{ mono: true, error: state === AI_TOOL_DETAILS_STATE.Error }}>
        <Scroll className={cn(scroll && styles.scroll)} size='s' overflow={{ x: 'hidden' }}>
          <div className={styles.content}>{children}</div>
        </Scroll>
      </AiToolContentContext.Provider>
    </div>
  );
}
