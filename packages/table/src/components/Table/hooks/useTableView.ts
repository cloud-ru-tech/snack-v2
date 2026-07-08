import { useValueControl } from '@ds/utils';

import { DEFAULT_VIEW, VIEW, View } from '../../../constants';

type UseTableViewParams = {
  /** Controlled-значение вида (`view` сверху). */
  view?: View;
  /** Начальный вид для uncontrolled-режима — уже разрешённый по раскладке. */
  defaultView: View;
  /** Колбэк смены вида. */
  onViewChange?(view: View): void;
};

type UseTableViewResult = {
  /** Актуальный вид (controlled `view` либо внутренний стейт). */
  view: View;
  /** Признак карточного вида. */
  isCardsView: boolean;
  /** Сеттер вида: в controlled-режиме дёргает `onViewChange`, иначе меняет стейт. */
  setView: (view: View) => void;
};

/**
 * Управление режимом отображения таблицы (`table` / `cards`) с поддержкой
 * controlled/uncontrolled. Значение `view` и колбэк `onViewChange` приходят
 * сверху; `defaultView` — уже разрешённый по раскладке стартовый вид.
 */
export function useTableView({ view: viewProp, defaultView, onViewChange }: UseTableViewParams): UseTableViewResult {
  const [view, setView] = useValueControl<View>({
    value: viewProp,
    defaultValue: defaultView,
    onChange: onViewChange,
  });

  const resolvedView = view ?? DEFAULT_VIEW;

  return {
    view: resolvedView,
    isCardsView: resolvedView === VIEW.Cards,
    setView,
  };
}
