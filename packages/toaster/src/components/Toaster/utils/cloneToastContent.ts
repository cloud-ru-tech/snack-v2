import { cloneElement, isValidElement, ReactElement, ReactNode } from 'react';

import { toasterManager } from '../../../manager';
import { ManagedToast } from '../../../manager/types';

/**
 * Inject `closeToast` callback into `toast.content`. Card calls the callback;
 * it doesn't know about the manager.
 */
export function cloneToastContent(toast: ManagedToast, containerId: string): ReactNode {
  const close = () => toasterManager.dismiss(toast.id, containerId);
  if (!isValidElement(toast.content)) return toast.content;
  return cloneElement(toast.content as ReactElement<{ closeToast?: () => void }>, { closeToast: close });
}
