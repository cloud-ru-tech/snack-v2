import { TEST_IDS } from '../../constants';
import { classifyCell, useCalendarContext } from '../../hooks';
import { Size, ViewMode } from '../../types';
import { Item } from '../Item';
import { LevelConfig } from '../MobileCalendar/levelConfig';
import styles from './styles.module.scss';

export type MobilePeriodBlockProps = {
  /** Дата периода блока (1-е число месяца / 1 января года / 1 января старта декады). */
  date: Date;
  /** Текущий уровень (определяет сетку и гранулярность ячеек). */
  level: ViewMode;
  /** Конфиг уровня. */
  config: LevelConfig;
  /** Размер ячеек. */
  size: Size;
  /** Выбор ячейки (tap). */
  onSelect(date: Date): void;
};

/**
 * Один период скролла: заголовок + грид ячеек. Ячейки соседних периодов скрыты.
 */
export function MobilePeriodBlock({ date, level, config, size, onSelect }: MobilePeriodBlockProps) {
  const { mode, value, preselectedRange, dateAndTime, isDateFilled, showHolidays, today, buildCellProps, getTestId } =
    useCalendarContext();

  const classifiedRows = config.buildGrid(date).map(row =>
    row.map(({ date: cellDate }) => ({
      cellDate,
      cell: classifyCell({
        date: cellDate,
        viewDate: date,
        viewMode: level,
        mode,
        value,
        preselectedRange,
        dateAndTime,
        isDateFilled,
        showHolidays,
        today,
        buildCellProps,
        isTheSameItem: config.isTheSameItem,
        isInPeriod: config.isInPeriod,
        getItemLabel: config.getItemLabel,
      }),
    })),
  );

  // Строки целиком из соседнего периода (ведущие/замыкающие) не рендерим — блок месяца сжимается до
  // реально занятых недель, иначе пустой «хвост» создаёт зазор и сбивает подпись активного периода.
  const cells = classifiedRows.filter(row => row.some(({ cell }) => !cell.another)).flat();

  return (
    <div className={styles.block} data-size={size} data-test-id={getTestId(TEST_IDS.calendarMobilePeriodBlock)}>
      <div className={styles.caption}>{config.label(date)}</div>
      <div
        className={styles.grid}
        data-level={level}
        style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}
      >
        {cells.map(({ cellDate, cell }) => (
          <Item
            key={cellDate.getTime()}
            size={size}
            label={cell.label}
            checked={cell.checked}
            disabled={cell.disabled}
            holiday={cell.holiday}
            another={cell.another}
            current={cell.current}
            rangePosition={cell.rangePosition}
            visible={!cell.another}
            date={cellDate}
            tabIndex={-1}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
