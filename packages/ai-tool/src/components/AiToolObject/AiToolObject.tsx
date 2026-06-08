import { AiButtonChevron } from '@ds/ai-button-chevron';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { AI_TOOL_OBJECT_TYPE, TEST_IDS } from '../../constants';
import { AiToolContentContext, useAiToolContentFormat } from '../../context';
import { AiToolObjectType } from '../../types';
import styles from './styles.module.scss';

export type AiToolObjectOwnProps = {
  /** Имя узла (`Key[ObjectName]`). */
  name?: ReactNode;
  /** Значение для типа `string` (инлайн рядом с именем). */
  value?: ReactNode;
  /** Тип узла: `complex` — сворачиваемое дерево, `string` — инлайн ключ-значение. */
  variant?: AiToolObjectType;
  /** Раскрытое состояние (только для `complex`). Источник истины — родитель. */
  opened?: boolean;
  /** Переключение раскрытия (только для `complex`). Получает новое значение `opened`. */
  onToggle?: (opened: boolean) => void;
  /** Состояние ошибки: имя и значение красные. По умолчанию наследуется от `AiToolDetails`. */
  error?: boolean;
  /** Моноширинный режим имени и значения. По умолчанию наследуется от `AiToolDetails`. */
  mono?: boolean;
  /** Вложенное дерево (только для раскрытого `complex`). */
  children?: ReactNode;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolObject`.
 *
 * Презентационный узел дерева содержимого инструмента. `complex` —
 * сворачиваемый узел с chevron'ом и вложенными детьми; `string` — инлайн пара
 * имя-значение. Раскрытие controlled: `opened` + `onToggle`.
 */
export type AiToolObjectProps = WithSupportProps<
  AiToolObjectOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiToolObjectOwnProps>
>;

export function AiToolObject({
  name,
  value,
  variant = AI_TOOL_OBJECT_TYPE.Complex,
  opened = false,
  onToggle,
  error,
  mono,
  children,
  className,
  'data-test-id': dataTestId = TEST_IDS.object,
  ...rest
}: AiToolObjectProps): ReactElement {
  const isComplex = variant === AI_TOOL_OBJECT_TYPE.Complex;
  const format = useAiToolContentFormat();
  const effectiveError = error ?? format.error ?? false;
  const effectiveMono = mono ?? format.mono ?? false;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-opened={(isComplex && opened) || undefined}
      data-error={effectiveError || undefined}
      data-mono={effectiveMono || undefined}
      data-test-id={dataTestId}
    >
      {isComplex ? (
        <>
          <div className={styles.header}>
            {name && <span className={styles.name}>{name}</span>}
            <AiButtonChevron
              className={styles.chevron}
              opened={opened}
              data-test-id={TEST_IDS.objectToggle}
              onClick={() => onToggle?.(!opened)}
            />
          </div>
          {opened && (
            <AiToolContentContext.Provider value={{ mono: effectiveMono, error: effectiveError }}>
              <div className={styles.nested}>{children}</div>
            </AiToolContentContext.Provider>
          )}
        </>
      ) : (
        <>
          {name && <span className={styles.name}>{name}</span>}
          {value != null && <span className={styles.value}>{value}</span>}
        </>
      )}
    </div>
  );
}
