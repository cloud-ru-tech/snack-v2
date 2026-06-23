import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';

import { GRID_SIZE, SIZE, VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { calendarLocale } from '../../locale';
import { stringifyAddress } from '../../utils';
import { NavButton } from '../NavButton';
import { LEVEL_BUTTON_FOCUS_NAME, NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME } from './constants';
import { usePeriodName } from './hooks';
import styles from './styles.module.scss';
import { getShift } from './utils';

const VIEW_MODE_MAP = {
  [VIEW_MODE.Month]: VIEW_MODE.Year,
  [VIEW_MODE.Year]: VIEW_MODE.Decade,
  [VIEW_MODE.Decade]: VIEW_MODE.Decade,
};

const PERIOD_NAV_ARIA_KEYS = {
  prev: {
    [VIEW_MODE.Month]: 'prevPeriodMonth',
    [VIEW_MODE.Year]: 'prevPeriodYear',
    [VIEW_MODE.Decade]: 'prevPeriodDecade',
  },
  next: {
    [VIEW_MODE.Month]: 'nextPeriodMonth',
    [VIEW_MODE.Year]: 'nextPeriodYear',
    [VIEW_MODE.Decade]: 'nextPeriodDecade',
  },
} as const;

const ICONS = {
  UP: {
    [SIZE.S]: <ChevronUpSVG size={16} />,
    [SIZE.M]: <ChevronUpSVG />,
    [SIZE.L]: <ChevronUpSVG />,
  },
  DOWN: {
    [SIZE.S]: <ChevronDownSVG size={16} />,
    [SIZE.M]: <ChevronDownSVG />,
    [SIZE.L]: <ChevronDownSVG />,
  },
};

export function Header() {
  const {
    referenceDate,
    viewDate,
    viewShift,
    setViewShift,
    viewMode,
    setViewMode,
    focus,
    setFocus,
    getTestId,
    size,
    firstNotDisableCell,
  } = useCalendarContext();
  const periodName = usePeriodName();
  const { t } = calendarLocale.useTranslations();

  const prevPeriodAriaLabel = t(PERIOD_NAV_ARIA_KEYS.prev[viewMode]);
  const nextPeriodAriaLabel = t(PERIOD_NAV_ARIA_KEYS.next[viewMode]);

  const levelButtonDisabled = viewMode === VIEW_MODE.Decade;

  const isArrowButtonFocused = focus && [NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME].includes(focus);

  const gridForMode = GRID_SIZE[viewMode];

  return (
    <div className={styles.header} data-size={size}>
      <NavButton
        disabled={levelButtonDisabled}
        onClick={() => {
          if (viewMode === VIEW_MODE.Year) {
            setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME);
          }
          setViewShift(getShift(referenceDate, viewDate, viewMode));
          setViewMode(VIEW_MODE_MAP[viewMode]);
        }}
        label={periodName}
        data-test-id={getTestId('period-level')}
        focusName={LEVEL_BUTTON_FOCUS_NAME}
        tabIndex={levelButtonDisabled || isArrowButtonFocused ? -1 : 0}
        icon={viewMode !== VIEW_MODE.Decade ? ICONS.DOWN[size] : undefined}
        onRightArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
        onDownArrowKeyDown={() => setFocus(stringifyAddress(firstNotDisableCell?.current ?? [0, 0]))}
        useNavigationStartRef
      />
      <div className={styles.scrollControlWrapper}>
        <NavButton
          onClick={() => setViewShift(viewShift - 1)}
          aria-label={prevPeriodAriaLabel}
          data-test-id={getTestId('period-prev')}
          focusName={PREV_PERIOD_BUTTON_FOCUS_NAME}
          tabIndex={
            focus === PREV_PERIOD_BUTTON_FOCUS_NAME || (levelButtonDisabled && focus !== NEXT_PERIOD_BUTTON_FOCUS_NAME)
              ? 0
              : -1
          }
          icon={ICONS.UP[size]}
          onRightArrowKeyDown={() => setFocus(NEXT_PERIOD_BUTTON_FOCUS_NAME)}
          onLeftArrowKeyDown={() => setFocus(LEVEL_BUTTON_FOCUS_NAME)}
          onDownArrowKeyDown={() => {
            const rightGap = viewMode === VIEW_MODE.Month ? 2 : 1;
            setFocus(stringifyAddress([0, gridForMode.columns - rightGap]));
          }}
        />
        <NavButton
          onClick={() => setViewShift(viewShift + 1)}
          aria-label={nextPeriodAriaLabel}
          data-test-id={getTestId('period-next')}
          focusName={NEXT_PERIOD_BUTTON_FOCUS_NAME}
          tabIndex={focus === NEXT_PERIOD_BUTTON_FOCUS_NAME ? 0 : -1}
          icon={ICONS.DOWN[size]}
          onLeftArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
          onDownArrowKeyDown={() => setFocus(stringifyAddress([0, gridForMode.columns - 1]))}
        />
      </div>
    </div>
  );
}
