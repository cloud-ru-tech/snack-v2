import { createContext, MouseEvent, useContext } from 'react';

import { FavoriteProps, InnerLink } from '../../types';

export type CardsContextValue = {
  showDescription: boolean;

  isMobile?: boolean;

  /** Карточки можно перетаскивать в избранное (иначе рендерятся без dnd-обвязки). */
  dragEnabled: boolean;

  /** Id избранных сервисов. Не передано — избранное для карточек недоступно. */
  favoriteIds?: ReadonlySet<string>;

  /** Стабильная по ссылке обёртка над `favorite.onChange`. */
  onFavoriteChange?: FavoriteProps['onChange'];

  /** Стабильная по ссылке обёртка над обработчиком клика по карточке. */
  onServiceClick?(service: InnerLink, event?: MouseEvent<HTMLElement>): void;
};

const DEFAULT_VALUE: CardsContextValue = {
  showDescription: false,
  dragEnabled: false,
};

/**
 * Общие настройки карточек сервисов внутри группы. Заменяет сквозную передачу
 * `showDescription` / `isMobile` / `favorite` / `onServiceClick` через все уровни сетки.
 */
export const CardsContext = createContext<CardsContextValue>(DEFAULT_VALUE);

export function useCardsContext() {
  return useContext(CardsContext);
}
