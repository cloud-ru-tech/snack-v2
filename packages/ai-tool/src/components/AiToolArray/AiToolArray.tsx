import { AiButtonChevron } from '@ds/ai-button-chevron';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { AiToolContentContext, useAiToolContentFormat } from '../../context';
import styles from './styles.module.scss';

export type AiToolArrayOwnProps = {
  /** Имя узла (`Key[ArrayName]`). */
  name?: ReactNode;
  /** Количество элементов — рендерится как `[ N ]` (или `[ N unit ]`). */
  count?: number;
  /** Единица измерения после количества (например `шт.`). */
  unit?: string;
  /** Раскрытое состояние. Источник истины — родитель. */
  opened?: boolean;
  /** Переключение раскрытия. Получает новое значение `opened`. */
  onToggle?: (opened: boolean) => void;
  /** Состояние ошибки: имя и счётчик красные. По умолчанию наследуется от `AiToolDetails`. */
  error?: boolean;
  /** Моноширинный режим имени и счётчика. По умолчанию наследуется от `AiToolDetails`. */
  mono?: boolean;
  /** Вложенные элементы (при раскрытии). */
  children?: ReactNode;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolArray`.
 *
 * Презентационный сворачиваемый список содержимого инструмента: имя, счётчик
 * элементов и chevron. Раскрытие controlled: `opened` + `onToggle`.
 */
export type AiToolArrayProps = WithSupportProps<
  AiToolArrayOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolArrayOwnProps>
>;

export function AiToolArray({
  name,
  count,
  unit,
  opened = false,
  onToggle,
  error,
  mono,
  children,
  className,
  'data-test-id': dataTestId = TEST_IDS.array,
  ...rest
}: AiToolArrayProps): ReactElement {
  const format = useAiToolContentFormat();
  const effectiveError = error ?? format.error ?? false;
  const effectiveMono = mono ?? format.mono ?? false;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-opened={opened || undefined}
      data-error={effectiveError || undefined}
      data-mono={effectiveMono || undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.header}>
        {name && <span className={styles.name}>{name}</span>}
        {count != null && (
          <span className={styles.counter}>
            [ {count}
            {unit && ` ${unit}`} ]
          </span>
        )}
        <AiButtonChevron
          className={styles.chevron}
          opened={opened}
          data-test-id={TEST_IDS.arrayToggle}
          onClick={() => onToggle?.(!opened)}
        />
      </div>
      {opened && (
        <AiToolContentContext.Provider value={{ mono: effectiveMono, error: effectiveError }}>
          <div className={styles.nested}>{children}</div>
        </AiToolContentContext.Provider>
      )}
    </div>
  );
}
