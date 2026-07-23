import { Tooltip } from '@ds/tooltip';
import { isBrowser } from '@ds/utils';
import { DrawerProps } from '@rc-component/drawer';
import { useCallback, useMemo, useRef, useState } from 'react';

import { DrawerCustomProps } from '../types';

const DRAGGER_SELECTOR = '.rc-drawer-resizable-dragger';

type UseDrawerResizeParams = Pick<DrawerCustomProps, 'position' | 'resizable'>;

type UseDrawerResizeResult = {
  /** JSX Тултипа для ползунка изменения ширины */
  tooltip: React.ReactNode;
  /** Функция поиска ползунка в DOM-дереве. Стоит вызывать тогда, когда он отрендерен. */
  checkElement: () => void;
  /** Ресайз-хендлер для rc-drawer */
  resizable: DrawerProps['resizable'];
  /** Ширина ползунка в пикселях */
  width?: number;
};

export function useDrawerResize({ position, resizable: resizableProp }: UseDrawerResizeParams): UseDrawerResizeResult {
  const targetRef = useRef<HTMLElement | null>(null);
  const targetRefCallbackRef = useRef<(node: HTMLElement) => void | undefined>();
  const [width, setWidth] = useState<number | undefined>(resizableProp?.default);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const draggerTooltip = resizableProp?.draggerTooltip;

  const checkElement = useCallback(() => {
    if (isBrowser() && draggerTooltip) {
      const element = document.querySelector(DRAGGER_SELECTOR) as HTMLElement;

      if (!element) return;

      targetRefCallbackRef.current ? targetRefCallbackRef.current(element) : (targetRef.current = element);
    }
  }, [draggerTooltip]);

  const tooltip = draggerTooltip ? (
    <Tooltip placement={position} offset={4} tip={draggerTooltip} open={open && !muted} onOpenChange={setOpen}>
      {({ ref: targetRefCallback }) => {
        if (!targetRefCallback) return null;

        targetRef.current ? targetRefCallback(targetRef.current) : (targetRefCallbackRef.current = targetRefCallback);
      }}
    </Tooltip>
  ) : null;

  const resizable = useMemo(
    () =>
      resizableProp
        ? ({
            onResize: value => {
              if (value < (resizableProp?.min || 0)) return;
              if (value > (resizableProp?.max || Infinity)) return;

              setWidth(value);

              resizableProp?.onResize?.(value);
            },
            onResizeEnd: () => {
              setOpen(false);
              setMuted(false);

              resizableProp?.onResizeEnd?.(width ?? 0);
            },
            onResizeStart: () => {
              setMuted(true);
            },
          } satisfies DrawerProps['resizable'])
        : undefined,
    [resizableProp, width],
  );

  return { tooltip, checkElement, resizable, width };
}
