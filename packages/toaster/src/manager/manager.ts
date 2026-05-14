import { LEAVE_ANIMATION_MS } from '../constants';
import {
  ContainerId,
  ManagedToast,
  ManagedToastStatus,
  ManagerListener,
  OpenToastInput,
  ToasterId,
  UpdateToastInput,
} from './types';

/**
 * Дефолты уровня контейнера. Применяются ко ВСЕМ тостам этого контейнера, если
 * у самого тоста соответствующий проп не задан. Источник истины — `<ToasterContainer>`,
 * который синхронизирует эти значения через `setContainerDefaults` (см. `helpers.ts::resolveAutoClose`).
 * Используется как fallback между per-toast options и глобальным `AUTO_CLOSE_TIME[type]`.
 */
export type ContainerDefaults = {
  autoClose?: number | false;
};

type TimeoutId = ReturnType<typeof setTimeout>;

type TimerEntry = {
  // Mutable timer state — не часть immutable snapshot, выдаётся отдельно через getTimerSnapshot.
  runningAt: number | null;
  elapsedMs: number;
  // close+leave таймеры одного id никогда не сосуществуют:
  // close активен в status=visible, leave — после dismiss (status=leaving).
  close?: TimeoutId;
  leave?: TimeoutId;
};

type ContainerState = {
  toasts: ManagedToast[];
  listeners: Set<ManagerListener>;
  // Mutable timer-state, отделённый от snapshot'а тоста.
  timers: Map<ToasterId, TimerEntry>;
  // Container-level defaults; resolveAutoClose uses these between per-toast options and AUTO_CLOSE_TIME[type].
  defaults: ContainerDefaults;
};

const TRANSITIONS: Record<ManagedToastStatus, ManagedToastStatus[]> = {
  entering: ['visible', 'leaving'],
  visible: ['leaving'],
  leaving: [],
};

/**
 * Per-container реестр тостов с listeners (useSyncExternalStore-аналог) и
 * таймерами авто-dismiss / leave-анимации. Snapshot тоста иммьютабельный
 * (новый array + новый toast object): React-подписчики bail-out'ят по reference.
 * Mutable timer-state живёт отдельно в `state.timers` и не утекает в snapshot.
 */
class ToasterManager {
  private containers = new Map<ContainerId, ContainerState>();

  private nextAutoId = 1;

  private makeId(): ToasterId {
    const next = this.nextAutoId;
    this.nextAutoId += 1;
    return next;
  }

  private getOrCreate(containerId: ContainerId): ContainerState {
    let state = this.containers.get(containerId);
    if (!state) {
      state = {
        toasts: [],
        listeners: new Set(),
        timers: new Map(),
        defaults: {},
      };
      this.containers.set(containerId, state);
    }
    return state;
  }

  private getOrCreateTimer(state: ContainerState, id: ToasterId): TimerEntry {
    let entry = state.timers.get(id);
    if (!entry) {
      entry = { runningAt: null, elapsedMs: 0 };
      state.timers.set(id, entry);
    }
    return entry;
  }

  setContainerDefaults(containerId: ContainerId, defaults: ContainerDefaults): void {
    const state = this.getOrCreate(containerId);
    state.defaults = { ...state.defaults, ...defaults };
  }

  getContainerDefaults(containerId: ContainerId): ContainerDefaults {
    return this.containers.get(containerId)?.defaults ?? {};
  }

  private emit(containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    state.listeners.forEach(listener => listener(state.toasts));
  }

  /**
   * Подписка на snapshot тостов. В отличие от useSyncExternalStore, listener
   * НЕ вызывается синхронно при подписке — используйте `getToasts()`/`getSnapshot()`
   * для bootstrap'а начального состояния.
   */
  subscribe(containerId: ContainerId, listener: ManagerListener): () => void {
    const state = this.getOrCreate(containerId);
    state.listeners.add(listener);
    return () => {
      state.listeners.delete(listener);
    };
  }

  getToasts(containerId: ContainerId): ManagedToast[] {
    return this.containers.get(containerId)?.toasts ?? [];
  }

  /** Alias для `getToasts` — каноничное имя пары к `subscribe`. */
  getSnapshot(containerId: ContainerId): ManagedToast[] {
    return this.getToasts(containerId);
  }

  /**
   * Снимок состояния auto-close таймера тоста для UI-индикаторов
   * (`ToastSystemEventProgress`, `Timer`). Возвращает фактический `elapsedMs`
   * с учётом текущего play-окна, если таймер сейчас идёт. Не модифицирует
   * state — безопасно вызывать из rAF-цикла.
   */
  getTimerSnapshot(
    id: ToasterId,
    containerId: ContainerId,
  ): { autoClose: number | false; elapsedMs: number; running: boolean } | null {
    const state = this.containers.get(containerId);
    if (!state) return null;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast) return null;
    const timer = state.timers.get(id);
    const runningAt = timer?.runningAt ?? null;
    const baseElapsed = timer?.elapsedMs ?? 0;
    const running = runningAt !== null;
    const elapsedMs = running ? baseElapsed + (performance.now() - (runningAt as number)) : baseElapsed;
    return { autoClose: toast.autoClose, elapsedMs, running };
  }

  isActive(id: ToasterId, containerId?: ContainerId): boolean {
    if (containerId) {
      return this.getToasts(containerId).some(t => t.id === id && t.status !== 'leaving');
    }
    for (const state of this.containers.values()) {
      if (state.toasts.some(t => t.id === id && t.status !== 'leaving')) return true;
    }
    return false;
  }

  /**
   * Whitelist-переход статуса. Возвращает true если переход применился (и snapshot
   * обновлён иммьютабельно), false если переход запрещён или тост не найден.
   * Сам по себе `transition` НЕ эмитит — это ответственность вызывающего, чтобы
   * можно было сгруппировать несколько структурных изменений и эмитить один раз.
   */
  private transition(state: ContainerState, id: ToasterId, to: ManagedToastStatus): boolean {
    const existing = state.toasts.find(t => t.id === id);
    if (!existing) return false;
    if (!TRANSITIONS[existing.status].includes(to)) return false;
    state.toasts = state.toasts.map(t => (t.id === id ? { ...t, status: to } : t));
    return true;
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
    };
    state.toasts = [toast, ...state.toasts];
    state.timers.set(id, { runningAt: null, elapsedMs: 0 });
    this.emit(input.containerId);
    queueMicrotask(() => {
      const current = this.containers.get(input.containerId);
      if (!current) return;
      // Перепроверяем по id из СВЕЖЕГО state — между sync-открытием и микротаском
      // мог пройти другой open(id)/update(id), который заменил объект через map.
      const target = current.toasts.find(t => t.id === id);
      if (!target) return;
      if (target.status !== 'entering') return;
      if (this.transition(current, id, 'visible')) {
        this.emit(input.containerId);
        this.startCloseTimer(input.containerId, id);
      }
    });
    return id;
  }

  update(id: ToasterId, containerId: ContainerId, input: UpdateToastInput): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    const existing = state.toasts.find(t => t.id === id);
    if (!existing) return;

    const contentChanged = input.content !== undefined;
    const onCloseChanged = input.onClose !== undefined;
    // autoClose сбрасывает таймер только если ФАКТИЧЕСКИ поменялся.
    const autoCloseChanged = input.autoClose !== undefined && input.autoClose !== existing.autoClose;

    if (!autoCloseChanged && !contentChanged && !onCloseChanged) return;

    // Иммьютабельное обновление snapshot'а.
    state.toasts = state.toasts.map(t => {
      if (t.id !== id) return t;
      const next: ManagedToast = { ...t };
      if (contentChanged) next.content = input.content;
      if (autoCloseChanged) next.autoClose = input.autoClose ?? false;
      if (onCloseChanged) next.onClose = input.onClose;
      return next;
    });

    if (autoCloseChanged) {
      // Только в этом случае сбрасываем elapsedMs/runningAt и рестартим.
      const timer = this.getOrCreateTimer(state, id);
      timer.elapsedMs = 0;
      timer.runningAt = null;
      this.clearCloseTimer(state, id);
      this.startCloseTimer(containerId, id);
    }
    this.emit(containerId);
  }

  dismiss(id: ToasterId, containerId?: ContainerId): void {
    if (!containerId) {
      this.containers.forEach((_, key) => this.dismiss(id, key));
      return;
    }
    const state = this.containers.get(containerId);
    if (!state) return;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast || toast.status === 'leaving') return;

    this.clearCloseTimer(state, id);
    if (!this.transition(state, id, 'leaving')) return;
    this.emit(containerId);

    // onClose асинхронно через microtask: убираем sync re-entrancy и не даём
    // user-code ронять менеджер. Ошибка проглатывается с предупреждением в dev.
    const onClose = toast.onClose;
    if (onClose) {
      queueMicrotask(() => {
        try {
          onClose(toast.id);
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[toaster] onClose threw', err);
          }
        }
      });
    }

    const leaveTimer = setTimeout(() => {
      const current = this.containers.get(containerId);
      if (!current) return;
      current.toasts = current.toasts.filter(t => t.id !== id);
      const entry = current.timers.get(id);
      if (entry) {
        entry.leave = undefined;
        current.timers.delete(id);
      }
      this.emit(containerId);
    }, LEAVE_ANIMATION_MS);

    const entry = this.getOrCreateTimer(state, id);
    entry.leave = leaveTimer;
  }

  dismissAll(containerId?: ContainerId): void {
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

  /**
   * Очищает контейнер: останавливает все таймеры (close+leave), удаляет state
   * и listener'ов. После `destroy` подписки на этот containerId больше не сработают,
   * до следующего `open`/`subscribe`, который пересоздаст state.
   */
  destroy(containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    state.timers.forEach(entry => {
      if (entry.close !== undefined) clearTimeout(entry.close);
      if (entry.leave !== undefined) clearTimeout(entry.leave);
    });
    state.timers.clear();
    state.listeners.clear();
    this.containers.delete(containerId);
  }

  // --- Новые явные pause/play API ---

  /** Пауза всех таймеров одного контейнера. */
  pauseContainer(containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    let changed = false;
    state.toasts.forEach(toast => {
      if (this.pauseOne(state, toast.id)) changed = true;
    });
    if (changed) this.emit(containerId);
  }

  /** Пауза одного тоста. */
  pauseToast(id: ToasterId, containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    if (this.pauseOne(state, id)) this.emit(containerId);
  }

  /** Пауза по всем контейнерам. */
  pauseAll(): void {
    this.containers.forEach((_state, containerId) => this.pauseContainer(containerId));
  }

  /** Возобновление всех таймеров одного контейнера. */
  playContainer(containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    let changed = false;
    state.toasts.forEach(toast => {
      if (this.playOne(containerId, state, toast.id)) changed = true;
    });
    if (changed) this.emit(containerId);
  }

  /** Возобновление одного тоста. */
  playToast(id: ToasterId, containerId: ContainerId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    if (this.playOne(containerId, state, id)) this.emit(containerId);
  }

  /** Возобновление по всем контейнерам. */
  playAll(): void {
    this.containers.forEach((_state, containerId) => this.playContainer(containerId));
  }

  /** Возвращает true, если pause фактически изменил состояние таймера. */
  private pauseOne(state: ContainerState, id: ToasterId): boolean {
    const toast = state.toasts.find(t => t.id === id);
    if (!toast) return false;
    if (toast.status === 'leaving' || toast.autoClose === false) return false;
    const timer = this.getOrCreateTimer(state, id);
    let changed = false;
    if (timer.runningAt !== null) {
      timer.elapsedMs += performance.now() - timer.runningAt;
      timer.runningAt = null;
      changed = true;
    }
    if (timer.close !== undefined) {
      clearTimeout(timer.close);
      timer.close = undefined;
      changed = true;
    }
    return changed;
  }

  /** Возвращает true, если play реально запустил таймер. */
  private playOne(containerId: ContainerId, state: ContainerState, id: ToasterId): boolean {
    const toast = state.toasts.find(t => t.id === id);
    if (!toast) return false;
    if (toast.status === 'leaving' || toast.autoClose === false) return false;
    const timer = state.timers.get(id);
    if (timer?.close !== undefined) return false;
    this.startCloseTimer(containerId, id);
    return state.timers.get(id)?.close !== undefined;
  }

  private startCloseTimer(containerId: ContainerId, id: ToasterId): void {
    const state = this.containers.get(containerId);
    if (!state) return;
    const toast = state.toasts.find(t => t.id === id);
    if (!toast || toast.status === 'leaving' || toast.autoClose === false) return;
    const timer = this.getOrCreateTimer(state, id);
    if (timer.close !== undefined) {
      clearTimeout(timer.close);
      timer.close = undefined;
    }
    timer.runningAt = performance.now();
    const remaining = Math.max(0, toast.autoClose - timer.elapsedMs);
    timer.close = setTimeout(() => {
      const cur = this.containers.get(containerId);
      const entry = cur?.timers.get(id);
      if (entry) entry.close = undefined;
      this.dismiss(id, containerId);
    }, remaining);
  }

  private clearCloseTimer(state: ContainerState, id: ToasterId): void {
    const timer = state.timers.get(id);
    if (timer?.close !== undefined) {
      clearTimeout(timer.close);
      timer.close = undefined;
    }
  }
}

export const toasterManager = new ToasterManager();
