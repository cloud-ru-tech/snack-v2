import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import {
  ColumnDefinition,
  getStatusColumnDef,
  MapStatusToAppearanceFnType,
  STATUS_APPEARANCE,
  Table,
  VIEW,
} from '@ds/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const USERS: User[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna@example.com', role: 'Owner', status: 'active' },
  { id: 'u-2', name: 'Борис Петров', email: 'boris@example.com', role: 'Admin', status: 'pending' },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera@example.com', role: 'Editor', status: 'active' },
];

const mapStatusToAppearance: MapStatusToAppearanceFnType = value =>
  value === 'active' ? STATUS_APPEARANCE.Green : STATUS_APPEARANCE.Orange;

const columns: ColumnDefinition<User>[] = [
  getStatusColumnDef<User>({
    accessorKey: 'status',
    mapStatusToAppearance,
    renderDescription: value => (value === 'active' ? 'Активен' : 'Ожидает'),
    header: 'Статус',
    size: 160,
  }),
  { accessorKey: 'name', header: 'Имя', enableSorting: true },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Роль' },
];

/** Высота sticky header сайта документации (`apps/docs` → `$docs-header-height`). */
const DOCS_HEADER_HEIGHT = 52;

export function MobileLayout() {
  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <div style={{ maxWidth: 375 }}>
        <Table
          data={USERS}
          columnDefinitions={columns}
          defaultView={VIEW.Cards}
          headlineId='name'
          sorting={{}}
          columnsSettings={{ enableSettingsMenu: true }}
          layoutPresets={{
            mobile: {
              stickyControls: { enabled: true, offsetTop: DOCS_HEADER_HEIGHT, offsetBottom: 0 },
            },
          }}
          outline
        />
      </div>
    </AdaptiveProvider>
  );
}
