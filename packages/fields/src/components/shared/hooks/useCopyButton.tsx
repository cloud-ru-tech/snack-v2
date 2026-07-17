import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons/interface/system';
import { BUTTON_SIZE_MAP, ButtonProps, Size as InputPrivateSize } from '@ds/input-private';
import { useEventHandler } from '@ds/utils';
import { MouseEvent, MouseEventHandler, Ref, RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../../constants';

// Длительность визуальной обратной связи «скопировано» (галочка вместо иконки копирования).
const COPIED_FEEDBACK_MS = 2000;

type UseCopyButtonProps = {
  copyButtonRef: RefObject<HTMLButtonElement | null>;
  showCopyButton: boolean;
  /**
   * Колбек копирования. Возвращает `true`, если значение скопировано (для асинхронного
   * источника — `Promise<boolean>`). Галочка показывается только при успехе.
   */
  onCopy(event: MouseEvent<HTMLButtonElement>): boolean | Promise<boolean>;
  size: InputPrivateSize;
  disabled?: boolean;
  /** data-test-id кнопки. Переопределяется полем, когда у него свой публичный id слота. */
  dataTestId?: string;
};

/**
 * Кнопка «Копировать» для postfix (аналогично useClearButton в input-private).
 */
export function useCopyButton({
  copyButtonRef,
  showCopyButton,
  onCopy,
  size,
  disabled,
  dataTestId = TEST_IDS.fieldTextCopyButton,
}: UseCopyButtonProps): ButtonProps {
  const copyEventHandler = useEventHandler(onCopy);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  return useMemo(
    () => ({
      id: 'copy',
      active: true,
      ref: copyButtonRef,
      show: showCopyButton,
      render: ({ key, tabIndex, ref, onKeyDown, ...props }) => {
        const markCopied = () => {
          setCopied(true);
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
        };

        const handleCopy: MouseEventHandler<HTMLButtonElement> = event => {
          event.stopPropagation();
          props.onClick(event);
          // Галочку показываем только при успешном копировании (паритет с легаси ButtonCopyValue).
          const result = copyEventHandler(event);
          if (typeof result === 'boolean') {
            if (result) {
              markCopied();
            }
            return;
          }
          result.then(success => {
            if (success) {
              markCopied();
            }
          });
        };

        return (
          <Button
            key={key}
            innerRef={ref as Ref<HTMLButtonElement>}
            type='button'
            view='function'
            appearance='neutral'
            disabled={disabled}
            size={BUTTON_SIZE_MAP[size]}
            icon={copied ? <CheckSVG /> : <CopySVG />}
            onClick={handleCopy}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
            data-test-id={dataTestId}
          />
        );
      },
    }),
    [copied, copyButtonRef, copyEventHandler, dataTestId, disabled, showCopyButton, size],
  );
}
