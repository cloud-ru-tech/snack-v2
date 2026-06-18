import { ReactNode } from 'react';

import { RenderCardContext } from '../components/types';
import { View } from '../constants';

export type CardViewInput<TData extends object> = {
  /** Ключ поля строки — заголовок карточки в режиме cards (маппится в `headlineId`) */
  headlineKey?: keyof TData & string;
  /** Начальный режим отображения */
  defaultView?: View;
  /** Управляемый режим отображения */
  view?: View;
  /** Колбэк смены режима */
  onViewChange?: (view: View) => void;
  /** Кастомный рендер карточки */
  renderCard?: (context: RenderCardContext<TData>) => ReactNode;
};

type CardViewTableProps<TData extends object> = {
  headlineId?: string;
  defaultView?: View;
  view?: View;
  onViewChange?: (view: View) => void;
  renderCard?: (context: RenderCardContext<TData>) => ReactNode;
};

/** Маппинг упрощённых card-view пропсов preset-ов в пропсы Table */
export function mapCardViewProps<TData extends object>({
  headlineKey,
  defaultView,
  view,
  onViewChange,
  renderCard,
}: CardViewInput<TData>): CardViewTableProps<TData> {
  if (!headlineKey) {
    return {
      ...(defaultView !== undefined ? { defaultView } : {}),
      ...(view !== undefined ? { view } : {}),
      ...(onViewChange !== undefined ? { onViewChange } : {}),
      ...(renderCard !== undefined ? { renderCard } : {}),
    };
  }

  return {
    headlineId: headlineKey,
    ...(defaultView !== undefined ? { defaultView } : {}),
    ...(view !== undefined ? { view } : {}),
    ...(onViewChange !== undefined ? { onViewChange } : {}),
    ...(renderCard !== undefined ? { renderCard } : {}),
  };
}
