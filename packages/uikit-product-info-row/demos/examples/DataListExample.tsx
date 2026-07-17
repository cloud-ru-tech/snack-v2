import { PlaceholderSVG } from '@ds/icons/interface/system';
import { InfoRow, InfoRowFieldItem, useGetContent } from '@ds/uikit-product-info-row';

type Row = { name: string; active: boolean };

const data: Row = { name: 'Project', active: true };

const items: InfoRowFieldItem<Row>[] = [
  {
    label: 'Name',
    accessorKey: 'name',
    rowActions: {
      first: {
        icon: <PlaceholderSVG />,
        'aria-label': 'Изменить',
        'data-test-id': 'data-list-action-first',
      },
      second: {
        icon: <PlaceholderSVG />,
        'aria-label': 'Копировать',
        'data-test-id': 'data-list-action-second',
      },
    },
  },
  { label: 'Active', accessorKey: 'active' },
];

export function DataListExample() {
  const getContent = useGetContent();

  return (
    <div>
      {items.map((item, index) => {
        const { label, accessorKey, render, ...rowProps } = item;
        const content = getContent<Row>({ data, render, accessorKey });
        return (
          <InfoRow
            key={String(accessorKey ?? label)}
            label={label}
            content={content}
            topDivider={index === 0}
            bottomDivider
            width='full'
            column='1'
            data-test-id={`data-list-row-${index}`}
            {...rowProps}
          />
        );
      })}
    </div>
  );
}
