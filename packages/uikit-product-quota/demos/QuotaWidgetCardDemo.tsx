import { QuotaWidgetCard } from '@ds/uikit-product-quota';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
import { MOCK_QUOTA_GREEN } from '../stories/mockData';
import styles from './styles.module.scss';

export function QuotaWidgetCardDemo() {
  return (
    <div className={styles.quotaWidgetCard}>
      <Canvas
        component={QuotaWidgetCard}
        componentDoc={doc.QuotaWidgetCard}
        defaultProps={{ quota: MOCK_QUOTA_GREEN }}
        excludeProps={['onRefresh']}
      />
    </div>
  );
}
