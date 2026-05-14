import { UiState } from './uiReducer';

/**
 * Таймеры автозакрытия на паузе, если внутри контейнера курсор/фокус
 * (`hovered`) либо включён sticky-pause после тач-тапа (`touchPaused`).
 */
export const isPaused = (state: UiState): boolean => state.hovered || state.touchPaused;
