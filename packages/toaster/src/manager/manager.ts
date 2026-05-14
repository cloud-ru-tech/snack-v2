import { LEAVE_ANIMATION_MS } from '../constants';
import { ManagedToast, ManagerListener, OpenToastInput, ToasterId, UpdateToastInput } from './types';

/**
 * Дефолты уровня контейнера. Применяются ко ВСЕМ тостам этого контейнера, если
 * у самого тоста соответствующий проп не задан. Источник истины — `<ToasterContainer>`,
 * который синхронизирует эти значения через `setContainerDefaults` (см. `helpers.ts::resolveAutoClose`).
 * Используется как fallback между per-toast options и глобальным `AUTO_CLOSE_TIME[type]`.
 */
export type ContainerDefaults = {
  autoClose?: number | false;
};

type ContainerState = {
  toasts: ManagedToast[];
  listeners: Set<ManagerListener>;
  // Per-toast auto-close timers; paused on container hover, resumed on leave.
  closeTimers: Map<ToasterId, ReturnType<typeof setTimeout>>;
  // Final-removal timers fired after leave-animation completes.
  leaveTimers: Map<ToasterId, ReturnType<typeof setTimeout>>;
  // Container-level defaults; resolveAutoClose uses these between per-toast options and AUTO_CLOSE_TIME[type].
  defaults: ContainerDefaults;
};

/**
 * Per-container реестр тостов с listeners (useSyncExternalStore-аналог) и
 * таймерами авто-dismiss / leave-анимации. Состояние обновляется иммьютабельно
 * (новый array + новый toast object): React-подписчики bail-out'ят по reference.
 */
class ToasterManager {
  private containers = new Map<string, ContainerState>();

  private nextAutoId = 1;

  private makeId(): ToasterId {
    const next = this.nextAutoId;
    this.nextAutoId += 1;
    return next;
  }

  private getOrCreate(containerId: string): ContainerState {
    let state = this.containers.get(containerId);
    if (!state) {
      state = {
        toasts: [],
        listeners: new Set(),
        closeTimers: new Map(),
        leaveTimers: new Map(),
        defaults: {},
      };
      this.containers.set(containerId, state);
    }
    return state;
  }

  setContainerDefaults(containerId: string, defaults: ContainerDefaults): void {
    const state = this.getOrCreate(containerId);
    state.defaults = { ...state.defaults, ...defaults };
  }

  getContainerDefaults(containerId: string): ContainerDefaults {
    return this.containers.get(containerId)?.defaults ?? {};
  }

  private emit(containerId: string): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    state.listeners.forEach(listener => listener(state.toasts));
  }

  subscribe(containerId: string, listener: ManagerListener): () => void {
    const state = this.getOrCreate(containerId);
    state.listeners.add(listener);
    listener(state.toasts);
    return () => {
      state.listeners.delete(listener);
    };
  }

  getToasts(containerId: string): ManagedToast[] {
    return this.containers.get(containerId)?.toasts ?? [];
  }

  /**
   * Снимок состояния auto-close таймера тоста для UI-индикаторов
   * (`ToastSystemEventProgress`, `Timer`). Возвращает фактический `elapsedMs`
   * с учётом текущего play-окна, если таймер сейчас идёт. Не модифицирует
   * state — безопасно вызывать из rAF-цикла.
   */
  getTimerSnapshot(
    id: ToasterId,
    containerId: string,
  ): { autoClose: number | false; elapsedMs: number; running: boolean } | null {
    const state = this.containers.get(containerId);
    if (!state) return null;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast) return null;
    const running = toast.runningAt !== null;
    const elapsedMs = running ? toast.elapsedMs + (performance.now() - (toast.runningAt as number)) : toast.elapsedMs;
    return { autoClose: toast.autoClose, elapsedMs, running };
  }

  isActive(id: ToasterId, containerId?: string): boolean {
    if (containerId) {
      return this.getToasts(containerId).some(t => t.id === id && t.status !== 'leaving');
    }
    for (const state of this.containers.values()) {
      if (state.toasts.some(t => t.id === id && t.status !== 'leaving')) return true;
    }
    return false;
  }

  open(input: OpenToastInput): ToasterId {
    const state = this.getOrCreate(input.containerId);
    const id = input.id ?? this.makeId();
    const existingIndex = state.toasts.findIndex(t => t.id === id);
    // Duplicate id: update in place, preserve stacking position and don't restart slide-in.
    if (existingIndex !== -1) {
      this.update(id, input.containerId, {
        content: input.content,
        autoClose: input.autoClose,
        onClose: input.onClose,
      });
      return id;
    }
    const toast: ManagedToast = {
      id,
      toastType: input.toastType,
      content: input.content,
      containerId: input.containerId,
      autoClose: input.autoClose ?? false,
      onClose: input.onClose,
      status: 'entering',
      elapsedMs: 0,
      runningAt: null,
    };
    state.toasts = [toast, ...state.toasts];
    this.clearCloseTimer(state, id);
    this.emit(input.containerId);
    queueMicrotask(() => {
      const current = this.containers.get(input.containerId);
      if (!current) return;
      // Перепроверяем по id из СВЕЖЕГО state — между sync-открытием и микротаском
      // мог пройти другой open(id)/update(id), который заменил объект через map.
      const target = current.toasts.find(t => t.id === id);
      if (!target) return;
      if (target.status === 'entering') {
        // Иммьютабельное обновление: новый array + новый toast object со статусом
        // visible. Гарантирует ре-рендер подписчиков (setState bail-outs по ref).
        current.toasts = current.toasts.map(t => (t.id === id ? { ...t, status: 'visible' as const } : t));
        this.emit(input.containerId);
      }
      this.startCloseTimer(input.containerId, id);
    });
    return id;
  }

  update(id: ToasterId, containerId: string, input: UpdateToastInput): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    const existing = state.toasts.find(t => t.id === id);
    if (!existing) return;

    const autoCloseChanged = input.autoClose !== undefined;
    const contentChanged = input.content !== undefined;
    const onCloseChanged = input.onClose !== undefined;
    if (!autoCloseChanged && !contentChanged && !onCloseChanged) return;

    // Иммьютабельное обновление: React-подписчики bail-out'ят по reference.
    state.toasts = state.toasts.map(t => {
      if (t.id !== id) return t;
      const next: ManagedToast = { ...t };
      if (contentChanged) next.content = input.content;
      if (autoCloseChanged) {
        next.autoClose = input.autoClose ?? false;
        next.elapsedMs = 0;
        next.runningAt = null;
      }
      if (onCloseChanged) next.onClose = input.onClose;
      return next;
    });

    if (autoCloseChanged) {
      this.clearCloseTimer(state, id);
      this.startCloseTimer(containerId, id);
    }
    this.emit(containerId);
  }

  dismiss(id: ToasterId, containerId?: string): void {
    if (!containerId) {
      this.containers.forEach((_, key) => this.dismiss(id, key));
      return;
    }
    const state = this.containers.get(containerId);
    if (!state) return;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast || toast.status === 'leaving') return;

    this.clearCloseTimer(state, id);
    state.toasts = state.toasts.map(t => (t.id === id ? { ...t, status: 'leaving' as const } : t));
    this.emit(containerId);

    // onClose после emit и в try/catch: user-code не должен ронять менеджер и
    // не должен наблюдать pre-update state.
    if (toast.onClose) {
      try {
        toast.onClose(toast.id);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[toaster] onClose threw', err);
        }
      }
    }

    const leaveTimer = setTimeout(() => {
      const current = this.containers.get(containerId);
      if (!current) return;
      current.toasts = current.toasts.filter(t => t.id !== id);
      current.leaveTimers.delete(id);
      this.emit(containerId);
    }, LEAVE_ANIMATION_MS);

    state.leaveTimers.set(id, leaveTimer);
  }

  dismissAll(containerId?: string): void {
    if (!containerId) {
      this.containers.forEach((_, key) => this.dismissAll(key));
      return;
    }
    const state = this.containers.get(containerId);
    if (!state) return;
    [...state.toasts].forEach(toast => {
      if (toast.status !== 'leaving') this.dismiss(toast.id, containerId);
    });
  }

  // Пауза / возобновление — на ВСЕ видимые тосты контейнера. Hover контейнера
  // замораживает таймеры всех ghost-карточек, чтобы они не сгорали под спудом.
  pause(params?: { id?: ToasterId; containerId?: string }): void {
    const ids = params?.containerId ? [params.containerId] : [...this.containers.keys()];
    ids.forEach(containerId => this.pauseAll(containerId, params?.id));
  }

  play(params?: { id?: ToasterId; containerId?: string }): void {
    const ids = params?.containerId ? [params.containerId] : [...this.containers.keys()];
    ids.forEach(containerId => this.playAll(containerId, params?.id));
  }

  private startCloseTimer(containerId: string, id: ToasterId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast || toast.status === 'leaving' || toast.autoClose === false) return;
    this.clearCloseTimer(state, id);
    toast.runningAt = performance.now();
    const remaining = Math.max(0, toast.autoClose - toast.elapsedMs);
    const timer = setTimeout(() => {
      state.closeTimers.delete(id);
      this.dismiss(id, containerId);
    }, remaining);
    state.closeTimers.set(id, timer);
  }

  private clearCloseTimer(state: ContainerState, id: ToasterId): void {
    const existing = state.closeTimers.get(id);
    if (existing !== undefined) {
      clearTimeout(existing);
      state.closeTimers.delete(id);
    }
  }

  private pauseAll(containerId: string, only?: ToasterId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    state.toasts.forEach(toast => {
      if (only !== undefined && toast.id !== only) return;
      if (toast.status === 'leaving' || toast.autoClose === false) return;
      if (toast.runningAt !== null) {
        toast.elapsedMs += performance.now() - toast.runningAt;
        toast.runningAt = null;
      }
      this.clearCloseTimer(state, toast.id);
    });
  }

  private playAll(containerId: string, only?: ToasterId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    state.toasts.forEach(toast => {
      if (only !== undefined && toast.id !== only) return;
      if (toast.status === 'leaving' || toast.autoClose === false) return;
      if (state.closeTimers.has(toast.id)) return;
      this.startCloseTimer(containerId, toast.id);
    });
  }
}

export const toasterManager = new ToasterManager();
