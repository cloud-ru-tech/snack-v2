import { ValueOf } from '@ds/utils';

import { PLACEMENT, POPOVER_HEIGHT_STRATEGY, POPOVER_WIDTH_STRATEGY, TRIGGER } from './constants';

export type Placement = ValueOf<typeof PLACEMENT>;

export type Trigger = ValueOf<typeof TRIGGER>;

export type PopoverWidthStrategy = ValueOf<typeof POPOVER_WIDTH_STRATEGY>;

export type PopoverHeightStrategy = ValueOf<typeof POPOVER_HEIGHT_STRATEGY>;

/**
 * Какие хендлеры на floating-контейнере гасят всплытие (`stopPropagation`).
 * Нужно, чтобы события внутри поповера не доходили до слушателей снаружи
 * (outside-click / document).
 *
 * Отключение `onMouseUp` / `onTouchEnd` нужно для drag&drop внутри поповера
 * (например `@dnd-kit`): сенсоры вешают end-listener на `document` в bubble-фазе,
 * и `stopPropagation` на floating ломает завершение drag.
 */
export type StopPropagationHandlers = {
  onClick?: boolean;
  onMouseDown?: boolean;
  onMouseUp?: boolean;
  onTouchStart?: boolean;
  onTouchEnd?: boolean;
  onTouchMove?: boolean;
};
