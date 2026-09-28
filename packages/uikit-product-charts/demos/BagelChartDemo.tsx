import { BagelChart } from '@ds/uikit-product-charts';

import { Canvas } from '#docs/components/Canvas';

import chartsDoc from '../docs/props.json';

// У кольца нет собственной ширины — оно заполняет контейнер, поэтому превью ограничено по ширине.
function BagelChartPreview(props: Parameters<typeof BagelChart>[0]) {
  return (
    <div style={{ width: 160 }}>
      <BagelChart {...props} />
    </div>
  );
}

export function BagelChartDemo() {
  return (
    <Canvas
      component={BagelChartPreview}
      componentName='BagelChart'
      componentDoc={chartsDoc.BagelChart}
      defaultProps={{ title: 'vCPU', value: 48, total: 128 }}
      controls={{
        value: { type: 'number' },
        total: { type: 'number' },
        title: { type: 'text' },
      }}
      excludeProps={['className', 'data-test-id']}
    />
  );
}
