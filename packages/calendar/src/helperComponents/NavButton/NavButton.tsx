import { Button } from '@ds/button';
import {
  extractSupportProps,
  focusWithoutScroll,
  preventScrollOnArrowKeys,
  useLayoutEffect,
  WithSupportProps,
} from '@ds/utils';
import { JSX, KeyboardEvent, useCallback, useImperativeHandle, useRef } from 'react';

import { useCalendarContext } from '../../hooks';

export type ButtonProps = WithSupportProps<{
  focusName?: string;
  label?: string;
  onClick?(): void;
  onLeftArrowKeyDown?(): void;
  onRightArrowKeyDown?(): void;
  onDownArrowKeyDown?(): void;
  tabIndex?: 0 | -1;
  disabled?: boolean;
  icon?: JSX.Element;
  useNavigationStartRef?: boolean;
}>;

export function NavButton({
  label,
  icon,
  onClick,
  focusName,
  tabIndex,
  onLeftArrowKeyDown,
  onRightArrowKeyDown,
  onDownArrowKeyDown,
  disabled,
  useNavigationStartRef,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { size, focus, setFocus, onFocusLeave, navigationStartRef } = useCalendarContext();

  useLayoutEffect(() => {
    if (focus && focus === focusName) {
      focusWithoutScroll(ref.current);
    }
  }, [focus, focusName]);

  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      // Стрелки навигации по календарю гасим: иначе нативное поведение прокручивает страницу
      // (фокус на header-кнопке, событие уходит за календарь).
      preventScrollOnArrowKeys(e);

      switch (e.key) {
        case 'ArrowLeft':
          onLeftArrowKeyDown?.();
          break;
        case 'ArrowRight':
          onRightArrowKeyDown?.();
          break;
        case 'ArrowDown':
          onDownArrowKeyDown?.();
          break;
        case 'ArrowUp':
          onFocusLeave?.('prev');
          break;
        case 'Tab':
          if (e.shiftKey) {
            onFocusLeave?.('prev');
          }
          break;
        default:
          break;
      }
    },
    [onDownArrowKeyDown, onFocusLeave, onLeftArrowKeyDown, onRightArrowKeyDown],
  );

  useImperativeHandle(
    useNavigationStartRef && navigationStartRef ? navigationStartRef : null,
    () => ({
      focus: () => {
        focusWithoutScroll(ref.current);
      },
    }),
    [],
  );

  return (
    <Button
      label={label}
      view='function'
      appearance='neutral'
      icon={icon}
      iconPosition='after'
      size={size}
      tabIndex={tabIndex}
      innerRef={ref}
      onClick={onClick}
      onKeyDown={onKeyDownHandler}
      onFocus={() => setFocus(focusName)}
      onBlur={() => setFocus(undefined)}
      disabled={disabled}
      aria-label={ariaLabel}
      {...extractSupportProps(rest)}
    />
  );
}
