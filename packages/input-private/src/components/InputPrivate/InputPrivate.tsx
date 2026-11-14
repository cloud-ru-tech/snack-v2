import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ChangeEventHandler, FocusEventHandler, forwardRef, UIEventHandler } from 'react';

import { INPUT_MODE, TYPE } from './constants';
import styles from './styles.module.scss';
import { InputPrivateProps } from './types';

/**
 * Input Private компонент
 */
export const InputPrivate = forwardRef<HTMLInputElement, InputPrivateProps>(
  (
    {
      name,
      value = '',
      onChange,
      placeholder,
      id,
      className,
      type = TYPE.Text,
      inputMode = INPUT_MODE.Text,
      disabled = false,
      readonly = false,
      autoComplete: autoCompleteProp = false,
      autoFocus = false,
      maxLength,
      min,
      max,
      step,
      onFocus,
      onBlur,
      onKeyDown,
      onPaste,
      tabIndex = 0,
      onClick,
      onMouseDown,
      spellCheck,
      pattern,
      ...rest
    },
    ref,
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
      onChange?.(e.target.value, e);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      event.currentTarget.scrollLeft = 0;
      onBlur?.(event);
    };

    const handleScroll: UIEventHandler<HTMLInputElement> = event => {
      const input = event.currentTarget;
      if (input.ownerDocument.activeElement !== input && input.scrollLeft !== 0) {
        input.scrollLeft = 0;
      }
    };

    let autoComplete: string;

    switch (autoCompleteProp) {
      case true:
        autoComplete = 'on';
        break;
      case false:
        autoComplete = 'off';
        break;
      default:
        autoComplete = autoCompleteProp;
        break;
    }

    return (
      <input
        name={name}
        maxLength={maxLength}
        id={id}
        className={cn(className, styles.inputPrivate)}
        autoComplete={autoComplete}
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        disabled={disabled}
        readOnly={readonly}
        onFocus={onFocus}
        onBlur={handleBlur}
        onScroll={handleScroll}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        tabIndex={tabIndex}
        onClick={onClick}
        onMouseDown={onMouseDown}
        min={min}
        max={max}
        step={step}
        spellCheck={spellCheck}
        title=''
        pattern={pattern}
        autoFocus={autoFocus}
        {...extractSupportProps(rest)}
      />
    );
  },
);
