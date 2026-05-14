import { useEffect } from 'react';

import { TOASTER_TYPE } from '../../../constants';
import { toasterManager } from '../../../manager';
import { ManagedToast } from '../../../manager/types';
import { TOAST_STATUS } from '../utils';

type SyncOptions = {
  containerId: string;
  paused: boolean;
  stacked: boolean;
  collapsed: boolean;
  visibleToasts: ManagedToast[];
  hiddenByLimit: ManagedToast[];
  systemEventNonLeaving: ManagedToast[];
  frontId: ManagedToast['id'] | undefined;
  // visibleIdsKey + frontId — derived ключи, по которым реально нужен пересинхрон;
  // ссылки на массивы менеджер обновляет на каждый emit (включая update без
  // изменения состава), пересинхрон pause/play на каждый emit бесполезен и
  // потенциально сбрасывал бы elapsedMs у front'а.
  visibleIdsKey: string;
};

/**
 * Синхронизирует JS-таймеры автозакрытия с визуальным состоянием стека:
 *
 * - Скрытые лимитом — всегда пауза (не в DOM, иначе сгорают невидимыми).
 * - paused (hover/touch) — пауза всем видимым.
 * - !stacked — играют все видимые.
 * - stacked && collapsed — в SystemEvent тикает только front, ghost'ы на паузе
 *   (видна только верхняя карточка, остальные не должны сгорать невидимыми);
 *   Upload и UserAction в стек не входят и играют независимо.
 * - stacked && !collapsed — стек раскрыт, все карточки видны полностью →
 *   играют параллельно как в flat-режиме. Иначе после ухода front'а у
 *   следующего таймер «перезапускается с нуля», а UI-полоска прогресса не
 *   соответствует реальному времени.
 */
export function useTimerSync({
  containerId,
  paused,
  stacked,
  collapsed,
  visibleToasts,
  hiddenByLimit,
  systemEventNonLeaving,
  frontId,
  visibleIdsKey,
}: SyncOptions): void {
  useEffect(() => {
    const pause = (id: ManagedToast['id']) => toasterManager.pause({ id, containerId });
    const play = (id: ManagedToast['id']) => toasterManager.play({ id, containerId });

    hiddenByLimit.forEach(t => pause(t.id));

    if (paused) {
      visibleToasts.forEach(t => {
        if (t.status !== TOAST_STATUS.Leaving) pause(t.id);
      });
      return;
    }
    if (!stacked || !collapsed) {
      visibleToasts.forEach(t => {
        if (t.status !== TOAST_STATUS.Leaving) play(t.id);
      });
      return;
    }

    systemEventNonLeaving.forEach(t => (t.id === frontId ? play(t.id) : pause(t.id)));
    visibleToasts.forEach(t => {
      if (t.toastType !== TOASTER_TYPE.SystemEvent && t.status !== TOAST_STATUS.Leaving) play(t.id);
    });
    // visibleToasts/systemEventNonLeaving — derived из visibleIdsKey+frontId;
    // зависим только от контентных id'шников, не от ссылок.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, paused, stacked, collapsed, frontId, visibleIdsKey, hiddenByLimit]);
}
