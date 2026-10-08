import { Tooltip } from '@ds/tooltip';
import { isBrowser } from '@ds/utils';
import { DrawerProps } from '@rc-component/drawer';
import { useCallback, useMemo, useRef, useState } from 'react';

import { RESIZABLE_MAX_FULL } from '../../../constants';
import styles from '../styles.module.scss';
import { DrawerCustomProps } from '../types';

const DRAGGER_SELECTOR = `.${styles.prefixCls}-resizable-dragger`;

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
  /** Флаг, указывающий, что дровер в процессе ресайза */
  isResizing: boolean;
};

const getFullMaxWidth = () => (isBrowser() ? Math.max(0, document.documentElement.clientWidth) : Infinity);

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
    <Tooltip
      placement={position}
      offset={4}
      hoverDelayOpen={500}
      tip={draggerTooltip}
      open={open && !muted}
      onOpenChange={setOpen}
    >
      {({ ref: targetRefCallback }) => {
        if (!targetRefCallback) return null;

        targetRef.current ? targetRefCallback(targetRef.current) : (targetRefCallbackRef.current = targetRefCallback);
      }}
    </Tooltip>
  ) : null;

  const { onResize, onResizeEnd, max, min } = resizableProp ?? {};
  const resizeEnabled = Boolean(resizableProp);
  // Сколько стартовой ширины, которую держит rc-drawer, не помещается в окно: оно могло сузиться, пока дровер
  // был закрыт или открыт. CSS обрезает панель визуально, а rc-drawer считает ресайз от «виртуальной» ширины.
  const excessRef = useRef(0);

  const resizable = useMemo(
    () =>
      resizeEnabled
        ? ({
            onResize: rawValue => {
              // Смещение мыши rc-drawer прибавляет к устаревшей стартовой ширине: вычитаем лишнее.
              const limit = max === RESIZABLE_MAX_FULL ? getFullMaxWidth() : max;
              const value = Math.min(rawValue - excessRef.current, limit ?? Infinity);

              if (value < (min || 0)) return;

              setWidth(value);

              onResize?.(value);
            },
            onResizeEnd: () => {
              setOpen(false);
              setMuted(false);

              onResizeEnd?.(width ?? 0);
            },
            // rc-drawer передаёт во время выполнения реальную стартовую ширину (в типах аргумента нет).
            onResizeStart: (startSize?: number) => {
              excessRef.current =
                max === RESIZABLE_MAX_FULL && startSize !== undefined ? Math.max(0, startSize - getFullMaxWidth()) : 0;
              setMuted(true);
            },
          } satisfies DrawerProps['resizable'])
        : undefined,
    [width, max, min, onResize, onResizeEnd, resizeEnabled],
  );

  return { tooltip, checkElement, resizable, width, isResizing: muted };
}
