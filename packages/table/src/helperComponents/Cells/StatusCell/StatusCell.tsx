import { Appearance as StatusComponentAppearance, Status, STATUS_SIZE } from '@ds/status';

import { COLUMN_PIN_POSITION, DefaultColumns, TEST_IDS } from '../../../constants';
import { useTableContext } from '../../../contexts';
import { ColumnDefinition } from '../../../types';
import { MIN_STATUS_CELL_SIZE, STATUS_APPEARANCE } from './constants';
import styles from './styles.module.scss';
import { StatusAppearance } from './types';

export { STATUS_APPEARANCE };
export type { StatusAppearance };

export type MapStatusToAppearanceFnType = (value: string | number) => StatusAppearance;

// Полосатой status-колонки в новом дизайне нет — легаси-хелпер `getStatusColumnDef`
// сохранён, но рендерится компонентом <Status> из '@ds/status' (точка-индикатор + подпись).
// У @ds/status нет appearance 'primary' (это были brand-токены) — маппим на 'blue'.
// 'loading' выражается отдельным пропом Status `loading`, а не цветом.
const MAP_LEGACY_TO_STATUS_APPEARANCE: Record<
  Exclude<StatusAppearance, typeof STATUS_APPEARANCE.Loading>,
  StatusComponentAppearance
> = {
  primary: 'blue',
  neutral: 'neutral',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  violet: 'violet',
  pink: 'pink',
};

type BaseStatusColumnDef = {
  /** Идентификатор колонки */
  id?: string;
  /** Имя ключа соответствующее полю в data */
  accessorKey: string;
  /** Маппинг значений статуса на цвета */
  mapStatusToAppearance: MapStatusToAppearanceFnType;
  /** Включение/выключение сортировки */
  enableSorting?: boolean;
};

type StatusColumnDef = BaseStatusColumnDef & {
  renderDescription?: never;
  size?: never;
  minSize?: never;
  maxSize?: never;
  header?: never;
  enableResizing?: never;
};

type StatusColumnDefWithDescription<TData> = BaseStatusColumnDef & {
  /** Функция для отрисовки текста, если не передана, то будет отрисован только индикатор статуса */
  renderDescription(cellValue: string, row: TData): string;
  /** Размер ячейки */
  size: number;
  minSize?: number;
  maxSize?: number;
  /** Заголовок колонки */
  header?: ColumnDefinition<TData>['header'];
  /** Включение/выключение ресайза колонки */
  enableResizing?: boolean;
};

export type StatusColumnDefinitionProps<TData> = StatusColumnDef | StatusColumnDefWithDescription<TData>;

type StatusCellProps = {
  appearance: StatusAppearance;
  label?: string;
};

function StatusCell({ appearance, label }: StatusCellProps) {
  const { isCardsView } = useTableContext();
  const isLoading = appearance === STATUS_APPEARANCE.Loading;
  const statusAppearance = isLoading ? undefined : MAP_LEGACY_TO_STATUS_APPEARANCE[appearance];
  const isCardField = Boolean(isCardsView && label);

  return (
    <div
      className={styles.statusCell}
      data-status-cell
      data-card-field={isCardField || undefined}
      data-no-label={!label || undefined}
    >
      <Status
        className={styles.status}
        appearance={statusAppearance}
        loading={isLoading}
        background={isCardField}
        size={isCardField ? STATUS_SIZE.S : STATUS_SIZE.XS}
        // Indicator-only вариант (без renderDescription): Status с пустым label = только точка.
        label={label ?? ''}
        data-test-id={TEST_IDS.statusIndicator}
      />
    </div>
  );
}

/** Вспомогательная функция для создания ячейки со статусом */
export function getStatusColumnDef<TData>({
  id,
  header,
  accessorKey,
  mapStatusToAppearance,
  renderDescription,
  size,
  maxSize,
  minSize,
  enableSorting = true,
  enableResizing,
}: StatusColumnDefinitionProps<TData>): ColumnDefinition<TData> {
  const hasDescription = Boolean(renderDescription);

  return {
    id: id ?? DefaultColumns.Status,
    pinned: COLUMN_PIN_POSITION.Left,
    noBodyCellPadding: true,
    noHeaderCellPadding: !hasDescription,
    noHeaderCellBorderOffset: hasDescription,
    size: hasDescription ? size : MIN_STATUS_CELL_SIZE,
    minSize: enableSorting || hasDescription ? Math.max(MIN_STATUS_CELL_SIZE, minSize || 0) : 1,
    maxSize,
    meta: {
      skipOnExport: true,
    },
    accessorKey,
    enableSorting,
    header: hasDescription ? header : undefined,
    enableResizing: enableResizing ?? hasDescription,
    accessorFn: (row: TData) => {
      if (!Object.hasOwn(row as object, accessorKey)) {
        return undefined;
      }

      const rawValue = (row as Record<string, unknown>)[accessorKey];

      return renderDescription ? renderDescription(rawValue as string, row) : rawValue;
    },
    cell: cell => {
      const value =
        typeof cell.row.original === 'object' && Object.hasOwn(cell.row.original as object, accessorKey)
          ? (cell.row.original as Record<string, string | number>)[accessorKey]
          : (cell.getValue() as string | number);

      const appearance = mapStatusToAppearance(value);

      return (
        <StatusCell
          appearance={appearance}
          label={renderDescription ? renderDescription(value as string, cell.row.original) : undefined}
        />
      );
    },
  } as ColumnDefinition<TData>;
}
