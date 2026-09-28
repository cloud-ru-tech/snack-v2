import 'uplot/dist/uPlot.min.css';

import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import merge from 'lodash.merge';
import { useMemo, useRef } from 'react';
import uPlot from 'uplot';
import UPlotReact from 'uplot-react';

import { PLOT_TYPES, TEST_IDS } from '../../constants';
import { readColors, useCssVars } from '../../shared';
import { DEFAULT_HEIGHT } from './constants';
import { layerColors } from './layerColors';
import styles from './styles.module.scss';
import { InteractiveChartProps } from './types';
import { getBaseOptions, resolveLayerColors } from './utils';

// Слой событий uPlot (курсор, zoom, тултип) — адресуемый для тестов.
function handleCreate(chart: uPlot) {
  chart.over.dataset.testId = TEST_IDS.interactiveChart.overlay;
}

export function InteractiveChart({
  data,
  options,
  type = PLOT_TYPES.Default,
  className,
  ...rest
}: WithSupportProps<InteractiveChartProps>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const computedColors = useCssVars(rootRef, readColors);

  // Canvas uPlot рисует готовыми цветами: график создаётся, когда палитра прочитана,
  // и пересоздаётся при смене темы (меняется ссылка на options).
  const resultOptions = useMemo(
    () =>
      computedColors &&
      merge({}, getBaseOptions(type, computedColors), resolveLayerColors(options, computedColors, layerColors)),
    [computedColors, options, type],
  );

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      data-type={type}
      // График появляется после чтения палитры на клиенте: до этого корень держит высоту canvas,
      // чтобы не было скачка вёрстки и ленивая гидрация (client:visible) видела блок.
      style={{ '--min-height': `${options?.height ?? DEFAULT_HEIGHT}px` }}
      {...extractSupportProps(rest)}
    >
      {resultOptions && (
        <div className={styles.plot} data-test-id={TEST_IDS.interactiveChart.plot}>
          <UPlotReact options={resultOptions} data={data} onCreate={handleCreate} />
        </div>
      )}
    </div>
  );
}
