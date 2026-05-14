import { ReactNode } from 'react';

import { ManagedToast } from '../../manager/types';
import { DraggableDirection } from '../../types';
import { ToastSlot } from './ToastSlot';
import { cloneToastContent, TOAST_STATUS } from './utils';

export type RenderToastsOptions = {
  containerId: string;
  draggable: boolean;
  draggableDirection: DraggableDirection;
};

/**
 * Рендерит список тостов плоским колумом без стека (Upload-блок). `isFront`
 * всегда `false`, `stackIndex` всегда `-1` — иначе data-атрибуты в DOM были бы
 * misleading и `useFrontAware`-логика принимала бы карточки за участников
 * стека.
 */
export function renderFlatToasts(toasts: ManagedToast[], options: RenderToastsOptions): ReactNode {
  return toasts.map(toast => (
    <ToastSlot
      key={toast.id}
      toast={toast}
      isFront={false}
      stackIndex={-1}
      containerId={options.containerId}
      draggable={options.draggable}
      draggableDirection={options.draggableDirection}
    >
      {cloneToastContent(toast, options.containerId)}
    </ToastSlot>
  ));
}

/**
 * Рендерит список тостов как стек: самый старый видимый — anchor (прижат к
 * якорю контейнера), новые накладываются ghost-картинками с противоположной
 * стороны. Менеджер prepend'ит, поэтому в массиве самый старый — последний;
 * `stackIndex` нумеруется от anchor'а (0) вверх по возрасту вглубь стека.
 */
export function renderStackToasts(toasts: ManagedToast[], options: RenderToastsOptions): ReactNode {
  const visible = toasts.filter(t => t.status !== TOAST_STATUS.Leaving);
  const anchor = visible[visible.length - 1];

  return toasts.map(toast => {
    const visibleIdx = visible.indexOf(toast);
    const stackIndex = visibleIdx >= 0 ? visible.length - 1 - visibleIdx : -1;
    return (
      <ToastSlot
        key={toast.id}
        toast={toast}
        isFront={toast === anchor}
        stackIndex={stackIndex}
        containerId={options.containerId}
        draggable={options.draggable}
        draggableDirection={options.draggableDirection}
      >
        {cloneToastContent(toast, options.containerId)}
      </ToastSlot>
    );
  });
}
