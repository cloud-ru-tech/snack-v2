import { Alert, AlertTop } from '@ds/alert';
import { Avatar } from '@ds/avatar';
import { Breadcrumbs, Item } from '@ds/breadcrumbs';
import { Button } from '@ds/button';
import { FieldDecorator, FieldSelect, FieldText } from '@ds/fields';
import { BellSVG, MainMenuSVG } from '@ds/icons/interface/product';
import { PlusSVG } from '@ds/icons/interface/system';
import { AiCloudLogo } from '@ds/icons/logos';
import { Link } from '@ds/link';
import { StepData, Stepper } from '@ds/stepper';
import { ColumnDefinition, Table } from '@ds/table';
import { Tabs } from '@ds/tabs';
import { Checkbox, Radio, Switch } from '@ds/toggles';
import { Typography } from '@ds/typography';
import { ReactNode, useState } from 'react';

import styles from './ThemePreview.module.scss';

const noop = () => {};

const COMMON_TEXTS = {
  title: 'Информационный баннер',
  description: 'Демонстрация оформления элементов интерфейса',
};

function AlertTopDemo() {
  return (
    <AlertTop
      {...COMMON_TEXTS}
      appearance='primary'
      actions={{ primary: { label: 'Ясно', onClick: noop } }}
      onClose={noop}
    />
  );
}

function AlertDemo() {
  return (
    <Alert
      {...COMMON_TEXTS}
      appearance='primary'
      size='s'
      outline
      onClose={noop}
      actions={{
        primary: { label: 'Скрыть', onClick: noop },
        secondary: { label: 'Больше не показывать', onClick: noop },
      }}
    />
  );
}

const BREADCRUMBS_ITEMS: Item[] = [
  { id: 'evolution', label: 'Evolution', onClick: noop },
  { id: 'service-x', label: 'Service X', onClick: noop },
];

function HeaderDemo() {
  return (
    <div className={styles.header}>
      <div className={styles.headerSide}>
        <Button view='function' appearance='neutral' size='m' icon={<MainMenuSVG />} aria-label='Меню' onClick={noop} />
        <span className={styles.logo}>
          <AiCloudLogo />
        </span>
        <Typography variant='title' size='m'>
          Main
        </Typography>
        <Breadcrumbs items={BREADCRUMBS_ITEMS} className={styles.breadcrumbs} />
      </div>
      <div className={styles.headerSide}>
        <Button
          view='function'
          appearance='neutral'
          size='m'
          icon={<BellSVG />}
          counter={{ value: 1 }}
          aria-label='Уведомления'
          onClick={noop}
        />
        <Avatar name='Ivanov Van' size='xs' showTwoSymbols status='green' />
      </div>
    </div>
  );
}

const TAB_ITEMS = [
  { value: '1', label: 'Вкладка 1' },
  { value: '2', label: 'Вкладка 2' },
  { value: '3', label: 'Вкладка 3' },
];

function TabsDemo() {
  return (
    <Tabs defaultValue='1'>
      <Tabs.TabBar after={<Button view='filled' label='Кнопка' icon={<PlusSVG />} onClick={noop} />}>
        {TAB_ITEMS.map(item => (
          <Tabs.Tab key={item.value} value={item.value} label={item.label} />
        ))}
      </Tabs.TabBar>
    </Tabs>
  );
}

type TableRow = { col1: string; col2: string; col3: string; col4: string };

const ROWS: TableRow[] = Array.from({ length: 3 }, () => ({
  col1: 'Ячейка 1',
  col2: 'Ячейка 2',
  col3: 'Ячейка 3',
  col4: 'Ячейка №4',
}));

const COLUMNS: ColumnDefinition<TableRow>[] = [
  {
    id: 'col1',
    accessorKey: 'col1',
    header: 'Колонка 1',
    cell: () => <Link text='Ячейка 1' appearance='primary' href='#' />,
  },
  { id: 'col2', accessorKey: 'col2', header: 'Колонка 2' },
  { id: 'col3', accessorKey: 'col3', header: 'Колонка 3' },
  { id: 'col4', accessorKey: 'col4', header: 'Колонка №4', align: 'right', headerAlign: 'right' },
];

function TableDemo() {
  return (
    <Table
      data={ROWS}
      columnDefinitions={COLUMNS}
      outline
      fullWidth
      pageSize={3}
      manualPagination
      pageCount={99}
      pagination={{ state: { pageIndex: 0, pageSize: 3 } }}
      rowSelection={{ enable: true, multiRow: true, initialState: { 1: true } }}
    />
  );
}

const SELECT_ITEMS = [
  { id: 'op1', content: { option: 'Опция 1' } },
  { id: 'op2', content: { option: 'Опция 2' } },
  { id: 'op3', content: { option: 'Опция 3' } },
];

function FieldDemo() {
  const [value, setValue] = useState('Текст');

  return (
    <div className={styles.fieldBlock}>
      <FieldDecorator label='Поле ввода' size='m'>
        <div className={styles.fieldRow}>
          <FieldText size='m' value={value} onChange={setValue} />
          <Button view='outline' appearance='primary' size='m' label='Кнопка' icon={<PlusSVG />} onClick={noop} />
        </div>
      </FieldDecorator>

      <FieldDecorator label='Выбор из списка' size='m'>
        <div className={styles.fieldRow}>
          <FieldSelect size='m' selection='single' defaultValue='op2' items={SELECT_ITEMS} />
          <Button view='tonal' appearance='primary' size='m' label='Кнопка' icon={<PlusSVG />} onClick={noop} />
        </div>
      </FieldDecorator>
    </div>
  );
}

function ToggleRow({ children }: { children: ReactNode }) {
  return (
    <div className={styles.toggleRow}>
      <Typography variant='body' size='m'>
        Переключатель
      </Typography>
      {children}
    </div>
  );
}

function ToggleDemo() {
  return (
    <div className={styles.toggleBlock}>
      <ToggleRow>
        <Checkbox defaultChecked size='s' />
      </ToggleRow>
      <ToggleRow>
        <Radio defaultChecked size='s' />
      </ToggleRow>
      <ToggleRow>
        <Switch defaultChecked size='s' />
      </ToggleRow>
    </div>
  );
}

const STEPPER_STEPS: StepData[] = [{ title: 'Первый шаг' }, { title: 'Второй шаг' }, { title: 'Третий шаг' }].map(
  step => ({
    ...step,
    description: 'Демонстрация оформления элементов интерфейса',
  }),
);

function StepperDemo() {
  return (
    <Stepper defaultCurrentStepIndex={1} steps={STEPPER_STEPS}>
      {({ stepper }) => stepper}
    </Stepper>
  );
}

export type ThemePreviewProps = {
  /** Стабильный id корня для play/e2e. */
  testId?: string;
};

/**
 * Демо-панель «Демонстрация элементов интерфейса» на реальных компонентах DS (баннеры, шапка, табы,
 * таблица, поля, тумблеры, степпер) — их цвета/акцент/плотность приходят из оформления. Используется
 * в стори `@ds/theme`, чтобы смена осей и кастомный бренд-цвет были видны на живом интерфейсе.
 */
export function ThemePreview({ testId }: ThemePreviewProps) {
  return (
    <div className={styles.container} data-test-id={testId}>
      <Typography variant='title' size='m'>
        Демонстрация элементов интерфейса
      </Typography>

      <div className={styles.content}>
        <div className={styles.headline}>
          <AlertTopDemo />
          <HeaderDemo />
          <TabsDemo />
        </div>

        <TableDemo />

        <div className={styles.controls}>
          <FieldDemo />
          <ToggleDemo />
        </div>

        <StepperDemo />

        <AlertDemo />
      </div>
    </div>
  );
}
