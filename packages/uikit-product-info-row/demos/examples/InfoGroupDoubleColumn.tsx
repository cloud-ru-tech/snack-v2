import { InfoGroup } from '@ds/uikit-product-info-row';

type Server = { region: string; cpu: string; memory: string; disk: string };

const data: Server = { region: 'eu-west-1', cpu: '4 vCPU', memory: '16 GiB', disk: '200 GiB SSD' };

export function InfoGroupDoubleColumn() {
  return (
    <InfoGroup
      data={data}
      columns='double'
      width='full'
      items={[
        { label: 'Регион', accessorKey: 'region' },
        { label: 'CPU', accessorKey: 'cpu' },
        { label: 'Память', accessorKey: 'memory' },
        { label: 'Диск', accessorKey: 'disk' },
      ]}
    />
  );
}
