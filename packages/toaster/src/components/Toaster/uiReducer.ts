/**
 * UI state machine для `ToasterContainer`.
 *
 * Объединяет четыре флага в один автомат — раньше жили независимыми
 * useState'ами и давали невозможные комбинации:
 *
 * - `collapsed` — стек свёрнут (виден только anchor).
 * - `hovered` — мышь/фокус внутри контейнера → таймеры на паузе.
 * - `touchPaused` — sticky-pause после тач-тапа → таймеры на паузе до тапа вне.
 * - `manualCollapseLatched` — пользователь явно тогглил стек кнопкой; авто-
 *   логика hover/leave не должна перетирать его выбор (в обе стороны) до
 *   close-all или tap-outside на тач-устройствах.
 *
 * Действия именованы по источнику события (`pointer:enter-stack` — «pointerenter
 * на блоке карточек»), чтобы поведение читалось без обращения к диспетчеру.
 */
export type UiState = {
  collapsed: boolean;
  hovered: boolean;
  touchPaused: boolean;
  manualCollapseLatched: boolean;
};

export const INITIAL_UI_STATE: UiState = {
  collapsed: true,
  hovered: false,
  touchPaused: false,
  manualCollapseLatched: false,
};

export type UiAction =
  | { type: 'pointer:enter-container' }
  | { type: 'pointer:leave-container'; stacked: boolean }
  | { type: 'pointer:enter-stack'; stacked: boolean }
  | { type: 'focus:enter-container' }
  | { type: 'focus:enter-stack'; stacked: boolean }
  | { type: 'focus:leave-container'; stacked: boolean }
  | { type: 'manual:toggle'; stacked: boolean }
  | { type: 'touch:tap-inside'; stacked: boolean }
  | { type: 'touch:tap-outside'; stacked: boolean }
  | { type: 'toasts:emptied' }
  | { type: 'close-all'; stacked: boolean };

/**
 * Чистый reducer UI-состояния контейнера. Принимает текущий `state` и `action`,
 * возвращает следующий `state` без сайд-эффектов. Все таймеры/подписки
 * управляются снаружи на основании производных из этого state.
 */
export function uiReducer(state: UiState, action: UiAction): UiState {
  switch (action.type) {
    case 'pointer:enter-container':
    case 'focus:enter-container':
      return { ...state, hovered: true };

    case 'pointer:leave-container':
    case 'focus:leave-container':
      // Авто-collapse при уходе курсора/фокуса работает только если пользователь
      // не зафиксировал ручной выбор кнопкой toggle (latch держится до close-all
      // или tap-outside на тач-устройствах).
      return {
        ...state,
        hovered: false,
        touchPaused: false,
        collapsed: action.stacked && !state.manualCollapseLatched ? true : state.collapsed,
      };

    case 'close-all':
      // close-all завершает работу с текущей пачкой — сбрасываем все флаги,
      // включая latch и touchPaused (оставшийся upload-блок не должен держать паузу).
      return {
        ...state,
        hovered: false,
        touchPaused: false,
        manualCollapseLatched: false,
        collapsed: action.stacked ? true : state.collapsed,
      };

    case 'pointer:enter-stack':
    case 'focus:enter-stack':
      if (!action.stacked || state.manualCollapseLatched) return state;
      return { ...state, collapsed: false };

    case 'manual:toggle': {
      if (!action.stacked) return state;
      return { ...state, collapsed: !state.collapsed, manualCollapseLatched: true };
    }

    case 'touch:tap-inside':
      return {
        ...state,
        touchPaused: true,
        collapsed: action.stacked ? false : state.collapsed,
        manualCollapseLatched: action.stacked ? false : state.manualCollapseLatched,
      };

    case 'touch:tap-outside':
      return {
        ...state,
        touchPaused: false,
        manualCollapseLatched: false,
        collapsed: action.stacked ? true : state.collapsed,
      };

    case 'toasts:emptied':
      return state.hovered || state.touchPaused ? { ...state, hovered: false, touchPaused: false } : state;

    default:
      return state;
  }
}
