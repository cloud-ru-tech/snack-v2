import { TEST_IDS } from '../src/constants';

/** Re-export for stories (Playground, VisualMatrix, e2e helpers). */
export { TEST_IDS };

export type QuotaWidgetMatrixState = 'data' | 'loading' | 'error';

export const getQuotaWidgetMatrixCellTestId = (state: QuotaWidgetMatrixState): string => `quota-widget-cell-${state}`;

/** `data-test-id` button-триггера внутри ячейки VM (при `data-test-id` ячейки ≠ root). */
export const getQuotaWidgetMatrixTriggerTestId = (state: QuotaWidgetMatrixState): string =>
  `trigger-${getQuotaWidgetMatrixCellTestId(state)}`;

/** Декартова матрица content × state. Click-loop в visual.spec. */
export const QUOTA_WIDGET_MATRIX = (['data', 'loading', 'error'] as const).map(state => {
  const cellTestId = getQuotaWidgetMatrixCellTestId(state);

  return {
    state,
    cellTestId,
    triggerTestId: getQuotaWidgetMatrixTriggerTestId(state),
    contentTestId: `content-${cellTestId}`,
  };
});
