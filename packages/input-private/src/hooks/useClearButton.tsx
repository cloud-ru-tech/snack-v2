import { Button } from '@design-system/button';
import { CrossCircleSVG } from '@design-system/icons';
import { useEventHandler } from '@design-system/utils';
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
            innerRef={ref}
            type='button'
            view='function'
            appearance='neutral'
            size={BUTTON_SIZE_MAP[size]}
            icon={<CrossCircleSVG />}
            onClick={handleClear}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            onMouseDown={onDownEventHandler}
            data-test-id='button-clear-value'
          />
        );
      },
    }),
    [clearButtonRef, clearEventHandler, onDownEventHandler, showClearButton, size],
  );
}
