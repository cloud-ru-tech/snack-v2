import { SIZE, Size, VALIDATION_STATE, ValidationState } from '@ds/field-decorator';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, ReactNode } from 'react';

import fieldStyles from '../../styles.module.scss';
import { getAcrylicProps } from '../../utils';
import styles from './styles.module.scss';

export type FieldShellProps = WithSupportProps<{
  /** Контент поля (input / scroll / редактор). Рендерится в fieldContainer между header и footer. */
  children: ReactNode;
  /** Размер поля */
  size?: Size;
  /** Состояние валидации — тонирует acrylic-фон */
  validationState?: ValidationState;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
  /**
   * Acrylic-фон поля
   * @default true
   */
  background?: boolean;
  /** Виден ли клавиатурный фокус (управляется потребителем по `:focus-visible` контента) */
  focusVisible?: boolean;
  /** Hover поля (управляется потребителем) */
  hover?: boolean;
  /** Ряд элементов над контентом (тулбар, чипы) */
  header?: ReactNode;
  /** Ряд элементов под контентом (действия, счётчик) */
  footer?: ReactNode;
  /** CSS-класс оболочки (fieldWrapper) */
  className?: string;
  /** Inline-стиль оболочки (например, CSS-переменные высоты) */
  style?: CSSProperties;
  /** Колбек входа курсора в поле */
  onMouseEnter?(): void;
  /** Колбек выхода курсора из поля */
  onMouseLeave?(): void;
}>;

/**
 * Визуальная оболочка поля: слои material/border/focus + контейнер со слотами
 * header / content / footer. Единый source-of-truth shell'а для `FieldTextArea` и
 * потребителей с кастомным контентом (например, WYSIWYG-редактор), которым нужен
 * тот же внешний вид, но не подходит нативный `<textarea>`.
 */
export function FieldShell({
  children,
  size = SIZE.M,
  validationState = VALIDATION_STATE.Default,
  disabled,
  readonly: readOnly,
  background = true,
  focusVisible,
  hover,
  header,
  footer,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: FieldShellProps) {
  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(fieldStyles.fieldWrapper, className)}
      data-size={size}
      data-validation-state={validationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible || undefined}
      data-hover={!readOnly && hover ? true : undefined}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={fieldStyles.backgroundWrapper}>
        <div
          className={fieldStyles.materialLayer}
          {...getAcrylicProps({ validationState, disabled, readonly: readOnly, hover, focusVisible })}
        >
          <div className={fieldStyles.acrylicBg} aria-hidden />
        </div>
        <div className={fieldStyles.borderStateLayer} data-state='regularBorder' />
        <div className={fieldStyles.focusLayer} />
      </div>

      {header && <div className={styles.header}>{header}</div>}

      <div className={fieldStyles.fieldContainer}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
