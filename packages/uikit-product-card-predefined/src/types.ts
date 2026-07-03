import { ValueOf } from '@ds/utils';

import { CARD_SIZE, VISIBILITY_STRATEGY } from './constants';

export type VisibilityStrategy = ValueOf<typeof VISIBILITY_STRATEGY>;
export type CardSize = ValueOf<typeof CARD_SIZE>;

export type FavoriteProps = {
  /** Включить отображение кнопки избранного */
  enabled: boolean;
  /**
   * Формат отображения: всегда или при наведении и фокусе
   * @default 'hover'
   */
  visibilityStrategy?: VisibilityStrategy;
  /** Состояние избранного (controlled) */
  checked?: boolean;
  /** Колбэк изменения состояния избранного */
  onChange?(value: boolean): void;
};
