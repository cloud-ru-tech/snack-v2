import { ReactNode } from 'react';

import { ManagedToast } from '../../../manager/types';
import { ToastSlot } from '../ToastSlot';
import { cloneToastContent } from './cloneToastContent';
import { RenderToastsOptions } from './renderStackToasts';

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
