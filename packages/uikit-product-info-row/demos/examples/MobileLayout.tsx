import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { InfoGroup } from '@ds/uikit-product-info-row';

type Project = { name: string; status: string; region: string; active: boolean };

const data: Project = { name: 'Mercury', status: 'Running', region: 'ru-moscow-1', active: true };

export function MobileLayout() {
  return (
    <div style={{ maxWidth: 360 }}>
      <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
        <InfoGroup
          data={data}
          items={[
            { label: 'Имя', accessorKey: 'name' },
            { label: 'Статус', accessorKey: 'status' },
            { label: 'Регион', accessorKey: 'region' },
            { label: 'Активен', accessorKey: 'active' },
          ]}
        />
      </AdaptiveProvider>
    </div>
  );
}
