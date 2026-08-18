import { Button } from '@ds/button';
import { CrossSVG } from '@ds/icons/interface/system';
import { useEventHandler } from '@ds/utils';
import { MouseEventHandler, RefObject, useMemo } from 'react';

import { BUTTON_SIZE_MAP } from '../constants';
import { Size } from '../types';
import { ButtonProps } from './types';

type UseClearButtonProps = {
  clearButtonRef: RefObject<HTMLButtonElement | null>;
  showClearButton: boolean;
  onClear: MouseEventHandler<HTMLButtonElement>;
  onDown?: MouseEventHandler<HTMLButtonElement>;
  size: Size;
  disabled?: boolean;
  /** data-test-id кнопки. Переопределяется полем, когда у него свой публичный id слота. */
  dataTestId?: string;
};

/**
 * Позволяет использовать кнопку сброса значения
 * @function hook
 */
export function useClearButton({
  clearButtonRef,
  showClearButton,
  onClear,
  onDown,
  size,
  disabled,
  dataTestId = 'button-clear-value',
}: UseClearButtonProps): ButtonProps {
  const clearEventHandler = useEventHandler(onClear);
  const onDownEventHandler = useEventHandler(onDown ?? (() => {}));

  return useMemo(
    () => ({
      id: 'clear',
      active: true,
      ref: clearButtonRef,
      show: showClearButton,
      render: ({ key, tabIndex, ref, onKeyDown, ...props }) => {
        const handleClear: MouseEventHandler<HTMLButtonElement> = event => {
          event.stopPropagation();
          props.onClick(event);
          clearEventHandler(event);
        };

        return (
          <Button
            key={key}
            innerRef={ref as RefObject<HTMLButtonElement>}
            type='button'
            view='function'
            appearance='neutral'
            disabled={disabled}
            size={BUTTON_SIZE_MAP[size]}
            icon={<CrossSVG />}
            onClick={handleClear}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onMouseDown={onDownEventHandler}
            data-test-id={dataTestId}
          />
        );
      },
    }),
    [clearButtonRef, clearEventHandler, dataTestId, disabled, onDownEventHandler, showClearButton, size],
  );
}
