import { SimpleColumnDef, StatusColumnConfig } from '@ds/table';

import { mapUserStatusToAppearance, SAMPLE_USERS, User, userStatusLabel } from './fixtures';

export type PresetUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  balance: number;
};

export const PRESET_USERS: PresetUser[] = [
  { id: 'u-1', name: 'Анна Иванова', email: 'anna.ivanova@example.com', role: 'Owner', balance: 12990 },
  { id: 'u-2', name: 'Борис Петров', email: 'boris.petrov@example.com', role: 'Admin', balance: 8450 },
  { id: 'u-3', name: 'Вера Сидорова', email: 'vera.sidorova@example.com', role: 'Editor', balance: 4300 },
  { id: 'u-4', name: 'Глеб Кузнецов', email: 'gleb.kuznetsov@example.com', role: 'Viewer', balance: 0 },
  { id: 'u-5', name: 'Дарья Орлова', email: 'darya.orlova@example.com', role: 'Editor', balance: 990 },
  { id: 'u-6', name: 'Егор Морозов', email: 'egor.morozov@example.com', role: 'Admin', balance: 15600 },
  { id: 'u-7', name: 'Жанна Волкова', email: 'zhanna.volkova@example.com', role: 'Viewer', balance: 2100 },
  { id: 'u-8', name: 'Захар Соколов', email: 'zakhar.sokolov@example.com', role: 'Editor', balance: 7800 },
];

export const presetUserColumns: SimpleColumnDef<PresetUser>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
  { key: 'balance', header: 'Баланс', sortable: true, align: 'right', width: 140, format: 'currency' },
];

export const PRESET_ADMIN_USERS: User[] = SAMPLE_USERS;

export const presetAdminColumns: SimpleColumnDef<User>[] = [
  { key: 'name', header: 'Имя', sortable: true, width: 200 },
  { key: 'email', header: 'Email', width: 240 },
  { key: 'role', header: 'Роль', sortable: true, width: 140 },
  { key: 'amount', header: 'Сумма', sortable: true, align: 'right', width: 140, format: 'currency' },
];

export const presetAdminStatusColumn: StatusColumnConfig<User> = {
  key: 'status',
  mapStatusToAppearance: mapUserStatusToAppearance,
  renderDescription: userStatusLabel,
};
