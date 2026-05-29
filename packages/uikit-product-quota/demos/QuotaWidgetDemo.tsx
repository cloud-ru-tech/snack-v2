import { QuotaWidget } from '@ds/uikit-product-quota';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
import { BASE_QUOTA_WIDGET_PROPS } from '../stories/mockData';

export function QuotaWidgetDemo() {
  return (
    <Canvas
      component={QuotaWidget}
      componentDoc={doc.QuotaWidget}
      defaultProps={BASE_QUOTA_WIDGET_PROPS}
      excludeProps={['onRefresh', 'onIncreaseQuotaClick', 'onWidgetOpen', 'onQuotasUrlClick', 'buttonProps']}
    />
  );
}
