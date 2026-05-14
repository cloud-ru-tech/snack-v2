import { ReactNode, useEffect, useMemo, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { ToastRuntimeContext } from '../../manager/runtimeContext';
import { ManagedToast } from '../../manager/types';
import { DraggableDirection } from '../../types';
import { useSwipeGesture } from './hooks';
import styles from './styles.module.scss';
import { TOAST_STATUS } from './utils';

type ToastSlotProps = {
  toast: ManagedToast;
  isFront: boolean;
  stackIndex: number;
  containerId: string;
  draggable: boolean;
  draggableDirection: DraggableDirection;
  children: ReactNode;
};

export function ToastSlot({
  toast,
  isFront,
  stackIndex,
  containerId,
  draggable,
  draggableDirection,
  children,
}: ToastSlotProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (!cancelled) setMounted(true);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  const swipe = useSwipeGesture({ toast, containerId, draggable, draggableDirection });
  // Force 'entering' until first paint: queue-promoted toasts arrive
  // already 'visible', so without this they'd skip slide-in.
  const renderedStatus = !mounted && toast.status === TOAST_STATUS.Visible ? TOAST_STATUS.Entering : toast.status;

  const runtime = useMemo(() => ({ id: toast.id, containerId }), [toast.id, containerId]);

  return (
    <ToastRuntimeContext.Provider value={runtime}>
      <div className={styles.toastSlot} style={swipe.slotStyle}>
        <div
          className={styles.toast}
          data-test-id={TEST_IDS.toastSlot}
          data-front={isFront || undefined}
          data-status={renderedStatus}
          data-mounted={mounted || undefined}
          data-stack-index={stackIndex >= 0 ? stackIndex : undefined}
          data-dragging={swipe.isDragging || undefined}
          data-draggable={swipe.enabled || undefined}
          data-drag-axis={swipe.enabled ? draggableDirection : undefined}
          style={swipe.style}
          onPointerDown={swipe.enabled ? swipe.onPointerDown : undefined}
          onPointerMove={swipe.enabled ? swipe.onPointerMove : undefined}
          onPointerUp={swipe.enabled ? swipe.onPointerUp : undefined}
          onPointerCancel={swipe.enabled ? swipe.onPointerUp : undefined}
        >
          {children}
        </div>
      </div>
    </ToastRuntimeContext.Provider>
  );
}
