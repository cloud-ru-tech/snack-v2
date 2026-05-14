/**
 * Unit-тесты ToasterManager. Менеджер — единственный источник правды по
 * lifecycle тостов и состоянию auto-close таймеров; критичные инварианты
 * проверяем на фейковых таймерах vitest'а, без DOM и React-обвязки.
 *
 * Каждый тест работает с СВЕЖИМ инстансом менеджера (см. `makeManager`),
 * чтобы глобальный синглтон из `manager.ts` и его побочные слушатели не
 * протекали между кейсами.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Достаём класс через side-channel: модуль экспортирует только singleton,
// но конструктор класса лежит на нём. Создаём новые инстансы класса для
// изолированных тестов.
import { toasterManager } from '../src/manager/manager';
import { ManagedToast, ManagedToastType } from '../src/manager/types';

const ToasterManagerCtor = toasterManager.constructor as new () => typeof toasterManager;

function makeManager() {
  return new ToasterManagerCtor();
}

const CID = 'test-container';

function openSystemEvent(
  manager: ReturnType<typeof makeManager>,
  overrides: { id?: ManagedToast['id']; autoClose?: number | false; toastType?: ManagedToastType } = {},
) {
  return manager.open({
    toastType: overrides.toastType ?? 'system-event',
    content: null,
    containerId: CID,
    id: overrides.id,
    autoClose: overrides.autoClose ?? 5000,
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ToasterManager.open', () => {
  it('prepends new toasts so newest is at index 0', () => {
    const m = makeManager();
    const a = openSystemEvent(m);
    const b = openSystemEvent(m);
    const ids = m.getToasts(CID).map(t => t.id);
    expect(ids).toEqual([b, a]);
  });

  it('emits synchronously then promotes status entering → visible in microtask', async () => {
    const m = makeManager();
    const seen: ManagedToast['status'][] = [];
    m.subscribe(CID, toasts => {
      const t = toasts[0];
      if (t) seen.push(t.status);
    });
    openSystemEvent(m);
    expect(seen.at(-1)).toBe('entering');
    // Слив микротасков. Подмена fake-timers не задевает microtask queue,
    // поэтому ждём реальный flush.
    await Promise.resolve();
    expect(seen.at(-1)).toBe('visible');
  });

  it('starts auto-close timer in the same microtask (transitions to leaving after autoClose)', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    expect(m.getToasts(CID)[0].status).toBe('visible');
    vi.advanceTimersByTime(999);
    expect(m.getToasts(CID)[0].status).toBe('visible');
    vi.advanceTimersByTime(1);
    expect(m.getToasts(CID).find(t => t.id === id)?.status).toBe('leaving');
  });

  it('with duplicate id routes through update() — keeps stacking position, restarts timer', async () => {
    const m = makeManager();
    openSystemEvent(m, { id: 'a' });
    openSystemEvent(m, { id: 'b' });
    expect(m.getToasts(CID).map(t => t.id)).toEqual(['b', 'a']);
    // Дубликат 'a' — должен не сдвинуть его в начало.
    openSystemEvent(m, { id: 'a', autoClose: 2000 });
    expect(m.getToasts(CID).map(t => t.id)).toEqual(['b', 'a']);
    const a = m.getToasts(CID).find(t => t.id === 'a');
    expect(a?.autoClose).toBe(2000);
  });

  it('does not auto-close when autoClose=false', async () => {
    const m = makeManager();
    openSystemEvent(m, { autoClose: false });
    await Promise.resolve();
    vi.advanceTimersByTime(60_000);
    expect(m.getToasts(CID)[0]?.status).toBe('visible');
  });
});

describe('ToasterManager.dismiss', () => {
  it('flips status to leaving immediately, removes after LEAVE_ANIMATION_MS', async () => {
    const m = makeManager();
    const id = openSystemEvent(m);
    await Promise.resolve();
    m.dismiss(id, CID);
    expect(m.getToasts(CID).find(t => t.id === id)?.status).toBe('leaving');
    // LEAVE_ANIMATION_MS = 280. Тост ещё в массиве 279ms спустя.
    vi.advanceTimersByTime(279);
    expect(m.getToasts(CID).some(t => t.id === id)).toBe(true);
    vi.advanceTimersByTime(1);
    expect(m.getToasts(CID).some(t => t.id === id)).toBe(false);
  });

  it('calls onClose exactly once with the toast id', async () => {
    const m = makeManager();
    const onClose = vi.fn();
    const id = m.open({
      toastType: 'system-event',
      content: null,
      containerId: CID,
      autoClose: 5000,
      onClose,
    });
    await Promise.resolve();
    m.dismiss(id, CID);
    m.dismiss(id, CID); // повторный вызов — no-op (status уже leaving)
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(id);
  });

  it('is no-op for unknown ids and for already-leaving toasts', async () => {
    const m = makeManager();
    expect(() => m.dismiss('missing', CID)).not.toThrow();
    const id = openSystemEvent(m);
    await Promise.resolve();
    m.dismiss(id, CID);
    expect(() => m.dismiss(id, CID)).not.toThrow();
  });

  it('without containerId dismisses across all containers', async () => {
    const m = makeManager();
    m.open({ toastType: 'system-event', content: null, containerId: 'c1', id: 'x', autoClose: 5000 });
    m.open({ toastType: 'system-event', content: null, containerId: 'c2', id: 'x', autoClose: 5000 });
    await Promise.resolve();
    m.dismiss('x');
    expect(m.getToasts('c1')[0].status).toBe('leaving');
    expect(m.getToasts('c2')[0].status).toBe('leaving');
  });
});

describe('ToasterManager.pause / play', () => {
  it('pause накапливает elapsedMs, play возобновляет с этой точки', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    vi.advanceTimersByTime(400);
    m.pause({ id, containerId: CID });
    // Прошло 400ms бюджета, осталось 600ms.
    vi.advanceTimersByTime(10_000); // пауза держит таймер замороженным
    expect(m.getToasts(CID)[0].status).toBe('visible');
    m.play({ id, containerId: CID });
    vi.advanceTimersByTime(599);
    expect(m.getToasts(CID)[0].status).toBe('visible');
    vi.advanceTimersByTime(1);
    expect(m.getToasts(CID)[0].status).toBe('leaving');
  });

  it('пауза без id — на все тосты контейнера', async () => {
    const m = makeManager();
    const a = openSystemEvent(m, { autoClose: 1000 });
    const b = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    m.pause({ containerId: CID });
    vi.advanceTimersByTime(2000);
    const statuses = m.getToasts(CID).map(t => t.status);
    expect(statuses).toEqual(['visible', 'visible']);
    expect([a, b].every(id => m.isActive(id, CID))).toBe(true);
  });

  it('play повторно — не плодит таймеры (closeTimers.has guard)', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    // Несколько подряд play не должны рестартить таймер; первый старт сразу
    // после микротаска, остальные — no-op.
    m.play({ id, containerId: CID });
    m.play({ id, containerId: CID });
    m.play({ id, containerId: CID });
    vi.advanceTimersByTime(1000);
    expect(m.getToasts(CID).find(t => t.id === id)?.status).toBe('leaving');
  });
});

describe('ToasterManager.update', () => {
  it('меняет autoClose: сбрасывает elapsedMs и стартует новый таймер с нуля', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    vi.advanceTimersByTime(500);
    m.update(id, CID, { autoClose: 2000 });
    // elapsedMs сброшен → ждём ещё 2000ms полностью.
    vi.advanceTimersByTime(1999);
    expect(m.getToasts(CID).find(t => t.id === id)?.status).toBe('visible');
    vi.advanceTimersByTime(1);
    expect(m.getToasts(CID).find(t => t.id === id)?.status).toBe('leaving');
  });

  it('update без полей — no-op (не дергает emit)', async () => {
    const m = makeManager();
    const id = openSystemEvent(m);
    await Promise.resolve();
    const listener = vi.fn();
    m.subscribe(CID, listener);
    listener.mockClear();
    m.update(id, CID, {});
    expect(listener).not.toHaveBeenCalled();
  });

  it('update сохраняет позицию в массиве', async () => {
    const m = makeManager();
    openSystemEvent(m, { id: 'a' });
    openSystemEvent(m, { id: 'b' });
    openSystemEvent(m, { id: 'c' });
    await Promise.resolve();
    expect(m.getToasts(CID).map(t => t.id)).toEqual(['c', 'b', 'a']);
    m.update('b', CID, { autoClose: 3000 });
    expect(m.getToasts(CID).map(t => t.id)).toEqual(['c', 'b', 'a']);
  });
});

describe('ToasterManager.getTimerSnapshot', () => {
  it('возвращает elapsedMs с учётом текущего play-окна', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    vi.advanceTimersByTime(300);
    const snap = m.getTimerSnapshot(id, CID);
    expect(snap?.autoClose).toBe(1000);
    expect(snap?.running).toBe(true);
    expect(snap?.elapsedMs).toBeCloseTo(300, -1);
  });

  it('после паузы возвращает накопленный elapsedMs и running=false', async () => {
    const m = makeManager();
    const id = openSystemEvent(m, { autoClose: 1000 });
    await Promise.resolve();
    vi.advanceTimersByTime(250);
    m.pause({ id, containerId: CID });
    vi.advanceTimersByTime(5000);
    const snap = m.getTimerSnapshot(id, CID);
    expect(snap?.running).toBe(false);
    expect(snap?.elapsedMs).toBeCloseTo(250, -1);
  });

  it('null для несуществующих контейнера/тоста', () => {
    const m = makeManager();
    expect(m.getTimerSnapshot('x', 'nope')).toBeNull();
    expect(m.getTimerSnapshot('nope', CID)).toBeNull();
  });
});

describe('ToasterManager subscribe', () => {
  it('синхронно вызывает listener при подписке и при каждом emit', async () => {
    const m = makeManager();
    const listener = vi.fn();
    const unsubscribe = m.subscribe(CID, listener);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenLastCalledWith([]);
    openSystemEvent(m);
    // sync emit из open + ещё один из микротаска entering→visible
    expect(listener.mock.calls.length).toBeGreaterThanOrEqual(2);
    await Promise.resolve();
    unsubscribe();
    listener.mockClear();
    openSystemEvent(m);
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('ToasterManager.dismissAll', () => {
  it('сносит все НЕ-leaving тосты контейнера', async () => {
    const m = makeManager();
    const a = openSystemEvent(m);
    const b = openSystemEvent(m);
    await Promise.resolve();
    m.dismiss(a, CID);
    m.dismissAll(CID);
    // Оба перешли в leaving, повторного dismiss для уже-leaving не было.
    expect(m.getToasts(CID).every(t => t.status === 'leaving')).toBe(true);
    expect(m.isActive(a, CID)).toBe(false);
    expect(m.isActive(b, CID)).toBe(false);
  });
});
