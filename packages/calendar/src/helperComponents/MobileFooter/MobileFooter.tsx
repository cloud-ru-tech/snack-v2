import { APPEARANCE, ButtonGroup, VIEW } from '@ds/button';

import { TEST_IDS } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { calendarLocale } from '../../locale';
import { formatSelectedValue } from './format';
import styles from './styles.module.scss';

export type MobileFooterProps = {
  /** Подтверждение выбора. */
  onApply(): void;
  /** Сброс к «сейчас» / переход к текущей дате. */
  onCurrent(): void;
  /** Блокировка Apply (нет полного выбора). */
  applyDisabled: boolean;
};

/**
 * Строка «Выбрано:» (для всех режимов) + Current / Apply кнопки.
 */
export function MobileFooter({ onApply, onCurrent, applyDisabled }: MobileFooterProps) {
  const { mode, value, dateAndTime, showSeconds, locale, getTestId } = useCalendarContext();
  const { t } = calendarLocale.useTranslations();

  const selected = formatSelectedValue({ mode, value, dateAndTime, showSeconds, locale });

  return (
    <div className={styles.footer}>
      {/* Только когда выбрано (FF-8654, #3) */}
      {selected && (
        <div className={styles.selectedRow}>
          <span className={styles.selectedLabel}>{t('selected')}</span>
          <span className={styles.selectedValue} data-test-id={getTestId(TEST_IDS.calendarMobileSelected)}>
            {selected}
          </span>
        </div>
      )}
      <ButtonGroup
        break
        primaryAction={{
          label: t('apply'),
          appearance: APPEARANCE.Primary,
          view: VIEW.Filled,
          disabled: applyDisabled,
          onClick: onApply,
          'data-test-id': TEST_IDS.calendarMobileApply,
        }}
        tertiaryAction={{
          label: t('current'),
          appearance: APPEARANCE.Neutral,
          view: VIEW.Function,
          onClick: onCurrent,
          'data-test-id': TEST_IDS.calendarMobileCurrent,
        }}
      />
    </div>
  );
}
