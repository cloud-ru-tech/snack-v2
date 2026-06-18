import { CHIP_CHOICE_TYPE } from '@ds/chips';
import {
  CellContext,
  COLUMN_SETTINGS_MODE,
  ColumnDefinition,
  CopyCell,
  getStatusColumnDef,
  MapStatusToAppearanceFnType,
  SORT_FN,
  STATUS_APPEARANCE,
  TableProps,
} from '@ds/table';

/** Тип пользователя для табличных fixtures */
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  amount: number;
  /** Дата создания (ISO 8601) — для колонки с `sortingFn: SORT_FN.DateTime` */
  createdAt: string;
  /** Вложенные строки для tree/expanding-сценариев */
  subRows?: User[];
};

const STATUSES = ['active', 'pending', 'blocked', 'invited'] as const;

// `createdAt` намеренно не совпадает по порядку с алфавитным порядком имён —
// сортировка по дате (`SORT_FN.DateTime`) видимо переставляет строки.
const RAW_USERS: Omit<User, 'subRows'>[] = [
  {
    id: 'u-1',
    name: 'Анна Иванова',
    email: 'anna.ivanova@example.com',
    role: 'Owner',
    status: 'active',
    amount: 12990,
    createdAt: '2024-03-12T09:15:00Z',
  },
  {
    id: 'u-2',
    name: 'Борис Петров',
    email: 'boris.petrov@example.com',
    role: 'Admin',
    status: 'active',
    amount: 8450,
    createdAt: '2023-11-02T14:40:00Z',
  },
  {
    id: 'u-3',
    name: 'Вера Сидорова',
    email: 'vera.sidorova@example.com',
    role: 'Editor',
    status: 'pending',
    amount: 4300,
    createdAt: '2024-07-25T08:05:00Z',
  },
  {
    id: 'u-4',
    name: 'Глеб Кузнецов',
    email: 'gleb.kuznetsov@example.com',
    role: 'Viewer',
    status: 'invited',
    amount: 0,
    createdAt: '2024-01-18T16:30:00Z',
  },
  {
    id: 'u-5',
    name: 'Дарья Орлова',
    email: 'darya.orlova@example.com',
    role: 'Editor',
    status: 'blocked',
    amount: 990,
    createdAt: '2023-08-09T11:20:00Z',
  },
  {
    id: 'u-6',
    name: 'Егор Морозов',
    email: 'egor.morozov@example.com',
    role: 'Admin',
    status: 'active',
    amount: 15600,
    createdAt: '2024-05-30T10:00:00Z',
  },
  {
    id: 'u-7',
    name: 'Жанна Волкова',
    email: 'zhanna.volkova@example.com',
    role: 'Viewer',
    status: 'pending',
    amount: 2100,
    createdAt: '2023-12-14T13:55:00Z',
  },
  {
    id: 'u-8',
    name: 'Захар Соколов',
    email: 'zakhar.sokolov@example.com',
    role: 'Editor',
    status: 'active',
    amount: 7800,
    createdAt: '2024-02-21T07:45:00Z',
  },
  {
    id: 'u-9',
    name: 'Ирина Лебедева',
    email: 'irina.lebedeva@example.com',
    role: 'Owner',
    status: 'active',
    amount: 23400,
    createdAt: '2023-06-01T15:10:00Z',
  },
  {
    id: 'u-10',
    name: 'Кирилл Новиков',
    email: 'kirill.novikov@example.com',
    role: 'Viewer',
    status: 'invited',
    amount: 0,
    createdAt: '2024-08-03T12:25:00Z',
  },
  {
    id: 'u-11',
    name: 'Лидия Козлова',
    email: 'lidia.kozlova@example.com',
    role: 'Editor',
    status: 'blocked',
    amount: 540,
    createdAt: '2023-09-27T09:50:00Z',
  },
  {
    id: 'u-12',
    name: 'Михаил Зайцев',
    email: 'mikhail.zaytsev@example.com',
    role: 'Admin',
    status: 'pending',
    amount: 6700,
    createdAt: '2024-04-08T17:05:00Z',
  },
  {
    id: 'u-13',
    name: 'Нина Павлова',
    email: 'nina.pavlova@example.com',
    role: 'Viewer',
    status: 'active',
    amount: 3300,
    createdAt: '2023-10-19T08:35:00Z',
  },
  {
    id: 'u-14',
    name: 'Олег Семёнов',
    email: 'oleg.semenov@example.com',
    role: 'Editor',
    status: 'active',
    amount: 9100,
    createdAt: '2024-06-11T14:15:00Z',
  },
  {
    id: 'u-15',
    name: 'Полина Голубева',
    email: 'polina.golubeva@example.com',
    role: 'Owner',
    status: 'pending',
    amount: 18800,
    createdAt: '2023-07-23T10:40:00Z',
  },
];

/** Плоский набор строк (~15) для большинства stories */
export const SAMPLE_USERS: User[] = RAW_USERS.map(user => ({ ...user }));

/** Иерархический набор строк (организации → команды → люди) для tree/expanding */
export const TREE_USERS: User[] = [
  {
    id: 'org-cloud',
    name: 'Cloud Platform',
    email: 'platform@example.com',
    role: 'Org',
    status: 'active',
    amount: 0,
    createdAt: '2022-01-10T09:00:00Z',
    subRows: [
      {
        id: 'team-compute',
        name: 'Compute',
        email: 'compute@example.com',
        role: 'Team',
        status: 'active',
        amount: 0,
        createdAt: '2022-04-05T12:00:00Z',
        subRows: [
          {
            id: 't-compute-1',
            name: 'Анна Иванова',
            email: 'anna.ivanova@example.com',
            role: 'Owner',
            status: 'active',
            amount: 12990,
            createdAt: '2024-03-12T09:15:00Z',
          },
          {
            id: 't-compute-2',
            name: 'Борис Петров',
            email: 'boris.petrov@example.com',
            role: 'Admin',
            status: 'active',
            amount: 8450,
            createdAt: '2023-11-02T14:40:00Z',
          },
        ],
      },
      {
        id: 'team-storage',
        name: 'Storage',
        email: 'storage@example.com',
        role: 'Team',
        status: 'pending',
        amount: 0,
        createdAt: '2022-09-14T10:30:00Z',
        subRows: [
          {
            id: 't-storage-1',
            name: 'Вера Сидорова',
            email: 'vera.sidorova@example.com',
            role: 'Editor',
            status: 'pending',
            amount: 4300,
            createdAt: '2024-07-25T08:05:00Z',
          },
        ],
      },
      {
        id: 'org-cloud-1',
        name: 'Алена Петрова',
        email: 'alena.petrova@example.com',
        role: 'Editor',
        status: 'pending',
        amount: 4300,
        createdAt: '2024-08-10T09:15:00Z',
      },
    ],
  },
  {
    id: 'org-data',
    name: 'Data Platform',
    email: 'data@example.com',
    role: 'Org',
    status: 'active',
    amount: 0,
    createdAt: '2022-02-20T11:00:00Z',
    subRows: [
      {
        id: 'team-analytics',
        name: 'Analytics',
        email: 'analytics@example.com',
        role: 'Team',
        status: 'active',
        amount: 0,
        createdAt: '2022-06-30T15:45:00Z',
        subRows: [
          {
            id: 't-analytics-1',
            name: 'Егор Морозов',
            email: 'egor.morozov@example.com',
            role: 'Admin',
            status: 'active',
            amount: 15600,
            createdAt: '2024-05-30T10:00:00Z',
          },
          {
            id: 't-analytics-2',
            name: 'Жанна Волкова',
            email: 'zhanna.volkova@example.com',
            role: 'Viewer',
            status: 'blocked',
            amount: 2100,
            createdAt: '2023-12-14T13:55:00Z',
          },
        ],
      },
    ],
  },
];

const STATUS_LABELS: Record<string, string> = {
  active: 'Активен',
  pending: 'Ожидание',
  blocked: 'Заблокирован',
  invited: 'Приглашён',
};

/** Маппинг строкового статуса пользователя на цвет индикатора `getStatusColumnDef` */
export const mapUserStatusToAppearance: MapStatusToAppearanceFnType = value => {
  switch (value) {
    case 'active':
      return STATUS_APPEARANCE.Green;
    case 'pending':
      return STATUS_APPEARANCE.Yellow;
    case 'blocked':
      return STATUS_APPEARANCE.Red;
    case 'invited':
      return STATUS_APPEARANCE.Blue;
    default:
      return STATUS_APPEARANCE.Neutral;
  }
};

const amountFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

// timeZone: 'UTC' — рендер даты не зависит от часового пояса машины (стабильные скриншоты)
const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Опции для контролов / тестов: список статусов и их человекочитаемые подписи */
export const USER_STATUSES = STATUSES;
export const userStatusLabel = (status: string): string => STATUS_LABELS[status] ?? status;

const ROLES = ['Owner', 'Admin', 'Editor', 'Viewer'] as const;

/** Опции для контролов / тестов: список ролей пользователей */
export const USER_ROLES = ROLES;

// ────────────────────────────────────────────────────────────────────────────
// Wide-колонки: ~16 дополнительных колонок для демонстрации широкой таблицы
// (горизонтальный скролл, сортировка по клику в заголовок, настройки колонок в
// тулбаре). Значения генерируются детерминированно из id строки — без раздувания
// самих данных (User не меняется).
// ────────────────────────────────────────────────────────────────────────────

type ColumnSettingsModeValue = (typeof COLUMN_SETTINGS_MODE)[keyof typeof COLUMN_SETTINGS_MODE];

/** Детерминированный «номер» строки из id (`u-1`, `gen-5`, `t-…-2`) для псевдо-данных */
const ordinalOf = (id: string): number => {
  const match = id.match(/(\d+)\s*$/);

  return match ? Number(match[1]) : id.length;
};

const pickBy = <T,>(arr: readonly T[], id: string, salt = 0): T => arr[(ordinalOf(id) + salt) % arr.length];

const DEPARTMENTS = ['Платформа', 'Биллинг', 'Поддержка', 'Инфраструктура', 'Безопасность'] as const;
const TEAMS = ['Альфа', 'Браво', 'Гамма', 'Дельта'] as const;
const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'] as const;
const REGIONS = ['Север', 'Юг', 'Запад', 'Восток', 'Центр'] as const;
const PLANS = ['Free', 'Pro', 'Enterprise'] as const;
const MANAGERS = ['А. Иванова', 'Б. Петров', 'В. Сидорова', 'Г. Кузнецов'] as const;

type WideField = {
  id: string;
  label: string;
  value(user: User): string | number;
  mode: ColumnSettingsModeValue;
  size?: number;
  align?: 'right';
  date?: boolean;
};

const WIDE_FIELDS: WideField[] = [
  {
    id: 'department',
    label: 'Отдел',
    value: u => pickBy(DEPARTMENTS, u.id),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 170,
  },
  {
    id: 'team',
    label: 'Команда',
    value: u => pickBy(TEAMS, u.id, 1),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 120,
  },
  {
    id: 'city',
    label: 'Город',
    value: u => pickBy(CITIES, u.id, 2),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 170,
  },
  { id: 'country', label: 'Страна', value: () => 'Россия', mode: COLUMN_SETTINGS_MODE.DefaultFalse, size: 130 },
  {
    id: 'region',
    label: 'Регион',
    value: u => pickBy(REGIONS, u.id, 3),
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 120,
  },
  { id: 'plan', label: 'Тариф', value: u => pickBy(PLANS, u.id), mode: COLUMN_SETTINGS_MODE.DefaultTrue, size: 120 },
  {
    id: 'seats',
    label: 'Лицензий',
    value: u => 3 + (ordinalOf(u.id) % 12),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 110,
    align: 'right',
  },
  {
    id: 'usage',
    label: 'Использование',
    value: u => `${10 + ((ordinalOf(u.id) * 7) % 90)} %`,
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 150,
    align: 'right',
  },
  {
    id: 'tickets',
    label: 'Тикетов',
    value: u => ordinalOf(u.id) % 9,
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 110,
    align: 'right',
  },
  {
    id: 'project',
    label: 'Проект',
    value: u => `PRJ-${100 + ordinalOf(u.id)}`,
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 130,
  },
  {
    id: 'manager',
    label: 'Менеджер',
    value: u => pickBy(MANAGERS, u.id, 2),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 170,
  },
  {
    id: 'contract',
    label: 'Договор',
    value: u => (ordinalOf(u.id) % 2 ? 'Годовой' : 'Месячный'),
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 130,
  },
  {
    id: 'tagsCount',
    label: 'Тегов',
    value: u => ordinalOf(u.id) % 6,
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 100,
    align: 'right',
  },
  {
    id: 'lastActive',
    label: 'Был(а)',
    value: u => new Date(Date.UTC(2024, 2, 1 + (ordinalOf(u.id) % 28))).toISOString(),
    mode: COLUMN_SETTINGS_MODE.DefaultTrue,
    size: 130,
    date: true,
  },
  {
    id: 'note',
    label: 'Заметка',
    value: u => `Заметка по ${u.name}`,
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 220,
  },
  {
    id: 'phone',
    label: 'Телефон',
    value: u => `+7 9${ordinalOf(u.id) % 10}0 000-00-${String(10 + (ordinalOf(u.id) % 80)).padStart(2, '0')}`,
    mode: COLUMN_SETTINGS_MODE.DefaultFalse,
    size: 170,
  },
];

function buildWideUserColumns(withColumnSettings: boolean): ColumnDefinition<User>[] {
  return WIDE_FIELDS.map(
    field =>
      ({
        id: field.id,
        accessorFn: (user: User) => field.value(user),
        header: field.label,
        enableSorting: true,
        size: field.size ?? 140,
        ...(field.date ? { sortingFn: SORT_FN.DateTime } : {}),
        ...(field.align ? { align: field.align, headerAlign: field.align } : {}),
        ...(field.date
          ? {
              cell: (ctx: CellContext<User, unknown>) => {
                const value = ctx.getValue();

                return value ? dateFormatter.format(new Date(String(value))) : '—';
              },
            }
          : {}),
        ...(withColumnSettings ? { columnSettings: { label: field.label, mode: field.mode } } : {}),
      }) as ColumnDefinition<User>,
  );
}

type ColumnsOptions = {
  /** Включить служебную колонку статуса слева */
  withStatusColumn?: boolean;
  /** Включить колонку с копированием значения email */
  withCopyColumn?: boolean;
  /**
   * Навесить per-column `columnSettings` (меню настроек колонок): email →
   * DefaultTrue, role → DefaultFalse (изначально скрыта), amount → Hidden
   * (не показывается в меню) — покрывает все значения COLUMN_SETTINGS_MODE.
   */
  withColumnSettings?: boolean;
  /** Включить ручное изменение ширины колонок name/email (ResizeHandle) */
  withResizing?: boolean;
  /** Добавить колонку даты создания (`createdAt`) с `sortingFn: SORT_FN.DateTime` */
  withDates?: boolean;
  /**
   * Добавить ~16 дополнительных колонок (отдел, город, тариф, менеджер, …) для
   * демонстрации широкой таблицы (≥20 колонок). Все сортируемые; при
   * `withColumnSettings` получают пункт в меню настроек колонок тулбара.
   */
  wide?: boolean;
};

/** Базовый набор колонок для пользователей. Переиспользуется во всех stories. */
export function buildUserColumns({
  withStatusColumn = false,
  withCopyColumn = false,
  withColumnSettings = false,
  withResizing = false,
  withDates = false,
  wide = false,
}: ColumnsOptions = {}): ColumnDefinition<User>[] {
  const columns: ColumnDefinition<User>[] = [];

  if (withStatusColumn) {
    columns.push(
      getStatusColumnDef<User>({
        accessorKey: 'status',
        mapStatusToAppearance: mapUserStatusToAppearance,
        renderDescription: value => userStatusLabel(value),
        header: 'Статус',
        size: 160,
      }),
    );
  }

  // Условные поля добавляются спредом, а не `key: cond ? value : undefined`:
  // tanstack мержит columnDef поверх defaultColumn спредом, и явный `cell: undefined`
  // затирает дефолтный cell-рендер таблицы (TruncateString) — ячейка рендерится пустой.
  // Явный id (= accessorKey) обязателен колонкам, которым важны size/resize:
  // columnSizes матчит columnDef по `col.id` (legacy-совместимо) — без id
  // не работают инициализация ширины из `size` и savedState-resize.
  columns.push(
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Имя',
      enableSorting: true,
      size: 200,
      ...(withResizing ? { enableResizing: true } : {}),
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      enableSorting: true,
      size: 240,
      ...(withResizing ? { enableResizing: true } : {}),
      ...(withCopyColumn
        ? { cell: (ctx: CellContext<User, unknown>) => <CopyCell value={String(ctx.getValue() ?? '')} /> }
        : {}),
      ...(withColumnSettings ? { columnSettings: { label: 'Email', mode: COLUMN_SETTINGS_MODE.DefaultTrue } } : {}),
    },
    {
      accessorKey: 'role',
      header: 'Роль',
      enableSorting: true,
      size: 140,
      ...(withColumnSettings ? { columnSettings: { label: 'Роль', mode: COLUMN_SETTINGS_MODE.DefaultFalse } } : {}),
    },
    {
      accessorKey: 'amount',
      header: 'Баланс',
      align: 'right',
      headerAlign: 'right',
      enableSorting: true,
      size: 140,
      cell: ctx => amountFormatter.format(Number(ctx.getValue() ?? 0)),
      ...(withColumnSettings ? { columnSettings: { label: 'Баланс', mode: COLUMN_SETTINGS_MODE.Hidden } } : {}),
    },
  );

  if (withDates) {
    columns.push({
      accessorKey: 'createdAt',
      header: 'Создан',
      enableSorting: true,
      sortingFn: SORT_FN.DateTime,
      size: 140,
      cell: ctx => {
        const value = ctx.getValue();

        return value ? dateFormatter.format(new Date(String(value))) : '—';
      },
    });
  }

  if (wide) {
    columns.push(...buildWideUserColumns(withColumnSettings));
  }

  return columns;
}

/**
 * Состояние фильтров stories: ключи совпадают с `id` фильтров из `USER_FILTERS`.
 * `role` — single-выбор, `status` — multiple.
 */
export type UserFiltersState = {
  role?: string;
  status?: string[];
};

/**
 * Тип фильтров, который принимает `Table.columnFilters.filters`. Выводится из
 * `TableProps`, а не объявляется напрямую через `ChipChoiceRowFilter` из
 * `@ds/chips`: производный тип не разъедется с фактическим API filter-row
 * тулбара (`@ds/toolbar` → `@ds/chips`) при обновлении пакетов.
 */
export type UserTableFilters = NonNullable<TableProps<User, UserFiltersState>['columnFilters']>['filters'];

/**
 * Фильтры filter-row тулбара (`columnFilters.filters`): single-фильтр по роли
 * и multiple-фильтр по статусу.
 */
export const USER_FILTERS: UserTableFilters = [
  {
    id: 'role',
    type: CHIP_CHOICE_TYPE.Single,
    label: 'Роль',
    options: ROLES.map(role => ({ value: role, label: role })),
  },
  {
    id: 'status',
    type: CHIP_CHOICE_TYPE.Multiple,
    label: 'Статус',
    options: USER_STATUSES.map(status => ({ value: status, label: userStatusLabel(status) })),
  },
];

/** Consumer-side фильтрация пользователей по состоянию `columnFilters` */
export function filterUsers(users: User[], filters: UserFiltersState): User[] {
  return users.filter(
    user =>
      (!filters.role || user.role === filters.role) &&
      (!filters.status || filters.status.length === 0 || filters.status.includes(user.status)),
  );
}

/**
 * Детерминированный генератор плоских строк для infinite-scroll сценариев
 * (~60 строк). Без рандома: строки собираются циклом по `RAW_USERS`
 * с порядковым суффиксом, даты — от фиксированной базы с шагом в сутки.
 */
export function makeUsers(count: number): User[] {
  return Array.from({ length: count }, (_, index) => {
    const base = RAW_USERS[index % RAW_USERS.length];
    const ordinal = index + 1;

    return {
      ...base,
      id: `gen-${ordinal}`,
      name: `${base.name} ${ordinal}`,
      email: `user-${ordinal}@example.com`,
      amount: 1000 + ordinal * 137,
      createdAt: new Date(Date.UTC(2024, 0, 1 + index)).toISOString(),
    };
  });
}

/** Получить вложенные строки для `expanding.getSubRows` */
export const getUserSubRows = (user: User): User[] | undefined => user.subRows;
