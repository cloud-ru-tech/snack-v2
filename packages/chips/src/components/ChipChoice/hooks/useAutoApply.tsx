import { Button } from '@ds/button';
import { ReactNode, RefObject, useCallback, useRef } from 'react';

import { CHIP_CHOICE_TEST_IDS } from '../../../constants';
import { chipsLocale } from '../../../locale';
import { Size } from '../../../types';
import { DROPLIST_FOOTER_SIZE_MAP } from '../constants';
import styles from '../styles.module.scss';

type UseAutoApplyProps = {
  autoApply: boolean;
  size: Size;
  onApprove(): void;
  onCancel(): void;
  mobile?: boolean;
  selectedCount?: number;
  onReset?(): void;
};

/**
 * Слоты sticky-футера дроплиста. И на desktop, и на mobile футер — отдельная нода, прилипающая
 * к низу: на desktop через `footer` (bottomBar popover'а вне скролла `<ul>`), на mobile через
 * `footer` `BottomSheet`. Кнопки не встраиваются в список (`pinBottom`) — так они не скроллятся
 * вместе с опциями. `footerActiveElementsRefs` регистрирует кнопки в стрелочной навигации popover'а
 * (mobile обходится Tab-фокусом BottomSheet).
 */
type AutoApplySlots = {
  footer?: ReactNode;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
  footerDivider?: boolean;
};

export function useAutoApply({
  autoApply,
  size,
  onApprove,
  onCancel,
  mobile = false,
  selectedCount = 0,
  onReset,
}: UseAutoApplyProps): () => AutoApplySlots {
  const { t } = chipsLocale.useTranslations();

  const approveRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return useCallback(() => {
    if (mobile) {
      return {
        footer: (
          <div className={styles.choiceChipMobileFooter} data-size={size} data-test-id={CHIP_CHOICE_TEST_IDS.footer}>
            <div className={styles.choiceChipFooterGroup}>
              <span className={styles.choiceChipFooterCount} data-test-id={CHIP_CHOICE_TEST_IDS.selectedCount}>
                {t('selectedCount', { count: selectedCount })}
              </span>
              <Button
                view='function'
                size={DROPLIST_FOOTER_SIZE_MAP[size]}
                appearance='primary'
                label={t('resetAll')}
                onClick={onReset}
                data-test-id={CHIP_CHOICE_TEST_IDS.resetButton}
              />
            </div>
            <Button
              fullWidth
              view='filled'
              size={DROPLIST_FOOTER_SIZE_MAP[size]}
              appearance='primary'
              label={t('select')}
              onClick={onApprove}
              data-test-id={CHIP_CHOICE_TEST_IDS.approveButton}
            />
          </div>
        ),
      };
    }

    if (autoApply) {
      return {};
    }

    return {
      footerDivider: true,
      footerActiveElementsRefs: [cancelRef, approveRef],
      footer: (
        <div className={styles.choiceChipFooter} data-size={size} data-test-id={CHIP_CHOICE_TEST_IDS.footer}>
          <Button
            innerRef={cancelRef}
            view='function'
            size={DROPLIST_FOOTER_SIZE_MAP[size]}
            appearance='neutral'
            label={t('cancel')}
            onClick={onCancel}
            data-test-id={CHIP_CHOICE_TEST_IDS.cancelButton}
          />
          <Button
            innerRef={approveRef}
            view='filled'
            size={DROPLIST_FOOTER_SIZE_MAP[size]}
            appearance='primary'
            label={t('apply')}
            onClick={onApprove}
            data-test-id={CHIP_CHOICE_TEST_IDS.approveButton}
          />
        </div>
      ),
    };
  }, [t, mobile, selectedCount, onReset, autoApply, size, onApprove, onCancel]);
}
