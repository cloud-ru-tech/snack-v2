import { ORIENTATION, Tabs } from '@design-system/tabs';

import styles from './styles.module.scss';

const VERTICAL_TABS = [
  { value: 'v1', label: 'Раздел 1' },
  { value: 'v2', label: 'Раздел 2' },
  { value: 'v3', label: 'Раздел 3' },
  { value: 'v4', label: 'Раздел 4' },
  { value: 'v5', label: 'Раздел 5' },
];

export function TabsVerticalExample() {
  return (
    <div className={styles.verticalWrapper}>
      <Tabs defaultValue='v1'>
        <Tabs.TabBar orientation={ORIENTATION.Vertical}>
          {VERTICAL_TABS.map(({ value, label }) => (
            <Tabs.Tab key={value} label={label} value={value} />
          ))}
        </Tabs.TabBar>
        {VERTICAL_TABS.map(({ value }) => (
          <Tabs.TabContent key={value} value={value}>
            <div className={styles.panelContent}>Контент раздела {value.replace('v', '')}</div>
          </Tabs.TabContent>
        ))}
      </Tabs>
    </div>
  );
}
