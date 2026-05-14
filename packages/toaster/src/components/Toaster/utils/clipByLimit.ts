import { ManagedToast } from '../../../manager/types';
import { TOAST_STATUS } from './toastStatus';

/**
 * Trims to `limit` visible slots, keeping `leaving` cards in the DOM until their
 * exit animation completes. Manager prepends новые тосты в начало массива; front
 * (самый старый visible) сохраняется, чтобы anchor не прыгал — drop'аем newest.
 * Leaving cards count against the budget so queue items wait for slide-out.
 * `limit ≤ 0` or `undefined` → no limit.
 */
export function clipByLimit(toasts: ManagedToast[], limit: number | undefined): ManagedToast[] {
  if (typeof limit !== 'number' || limit <= 0) return toasts;
  const leavingCount = toasts.reduce((acc, t) => (t.status === TOAST_STATUS.Leaving ? acc + 1 : acc), 0);
  const allowedActive = Math.max(0, limit - leavingCount);
  const active = toasts.filter(t => t.status !== TOAST_STATUS.Leaving);
  if (active.length <= allowedActive) return toasts;
  const dropCount = active.length - allowedActive;
  const droppedIds = new Set<ManagedToast['id']>();
  for (const toast of toasts) {
    if (droppedIds.size >= dropCount) break;
    if (toast.status !== TOAST_STATUS.Leaving) droppedIds.add(toast.id);
  }
  return toasts.filter(t => !droppedIds.has(t.id));
}
