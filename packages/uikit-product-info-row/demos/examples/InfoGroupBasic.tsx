import { InfoGroup } from '@ds/uikit-product-info-row';

type Project = { name: string; status: string; active: boolean };

const data: Project = { name: 'Mercury', status: 'Running', active: true };

export function InfoGroupBasic() {
  return (
    <InfoGroup
      data={data}
      items={[
        { label: 'Имя', accessorKey: 'name' },
        { label: 'Статус', accessorKey: 'status' },
        { label: 'Активен', accessorKey: 'active' },
      ]}
    />
  );
}
