import { QuotaWidgetMini } from '@ds/uikit-product-quota';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
import { BASE_QUOTA_WIDGET_MINI_PROPS } from '../stories/mockData';
import styles from './styles.module.scss';

export function QuotaWidgetMiniDemo() {
  return (
    <div className={styles.quotaWidgetMini}>
      <Canvas
        component={QuotaWidgetMini}
        componentDoc={doc.QuotaWidgetMini}
        defaultProps={BASE_QUOTA_WIDGET_MINI_PROPS}
        excludeProps={['onRefresh', 'onIncreaseQuotaClick', 'onWidgetOpen']}
      />
    </div>
  );
}
