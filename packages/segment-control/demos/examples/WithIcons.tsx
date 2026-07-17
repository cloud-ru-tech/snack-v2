import { HomeSVG, PlusSVG, SettingsSVG } from '@ds/icons/interface/system';
import { SegmentControl } from '@ds/segment-control';

export function WithIcons() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <SegmentControl
        defaultValue='home'
        items={[
          { value: 'home', label: 'Home', icon: <HomeSVG /> },
          { value: 'settings', label: 'Settings', icon: <SettingsSVG /> },
          { value: 'add', label: 'Add', icon: <PlusSVG /> },
        ]}
      />
      <SegmentControl
        defaultValue='home'
        items={[
          { value: 'home', icon: <HomeSVG /> },
          { value: 'settings', icon: <SettingsSVG /> },
          { value: 'add', icon: <PlusSVG /> },
        ]}
      />
    </div>
  );
}
