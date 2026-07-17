import { Button, ButtonProps } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons/interface/system';
import { extractSupportProps, useCopyToClipboard, WithSupportProps } from '@ds/utils';
import { MouseEventHandler } from 'react';

export type CopyButtonProps = WithSupportProps<{
  /** Значение для копирования в буфер. */
  valueToCopy: string | number;
  /** Размер кнопки (s / m / l). По-умолчанию s. */
  size?: ButtonProps['size'];
  /** Текст рядом с иконкой. Если не задан — кнопка отображается только с иконкой. */
  label?: string;
  /** Дополнительный класс. */
  className?: string;
  /** Доп. обработчик клика. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export function CopyButton({ valueToCopy, size = 'm', label, className, onClick, ...rest }: CopyButtonProps) {
  const { isChecked, copy } = useCopyToClipboard();

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    if (valueToCopy) copy(String(valueToCopy));
    onClick?.(event);
  };

  return (
    <Button
      {...extractSupportProps(rest)}
      className={className}
      view='function'
      appearance='neutral'
      size={size}
      type='button'
      aria-label={label ? undefined : 'Copy'}
      label={label}
      icon={isChecked ? <CheckSVG /> : <CopySVG />}
      iconPosition='after'
      onClick={handleClick}
    />
  );
}
