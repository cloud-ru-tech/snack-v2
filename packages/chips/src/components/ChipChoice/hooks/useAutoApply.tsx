import { Button } from '@ds/button';
import { useLocale } from '@ds/locale';
import { DroplistProps } from '@sbercloud/snack-v2-list';
import { useCallback } from 'react';

import { CHIP_CHOICE_TEST_IDS } from '../../../constants';
import { Size } from '../../../types';
import { DROPLIST_FOOTER_SIZE_MAP } from '../constants';
import styles from '../styles.module.scss';

type UseAutoApplyProps = {
  autoApply: boolean;
  size: Size;
  onApprove(): void;
  onCancel(): void;
};

export function useAutoApply({
  autoApply,
  size,
  onApprove,
  onCancel,
}: UseAutoApplyProps): () => DroplistProps['pinBottom'] {
  const { t } = useLocale('Chips');

  return useCallback(() => {
    if (autoApply) {
      return;
    }

    return [
      {
        content: (
          <div className={styles.choiceChipFooter} data-size={size} data-test-id={CHIP_CHOICE_TEST_IDS.footer}>
            <Button
              view='function'
              size={DROPLIST_FOOTER_SIZE_MAP[size]}
              appearance='neutral'
              label={t('cancel')}
              onClick={onCancel}
              data-test-id={CHIP_CHOICE_TEST_IDS.cancelButton}
            />
            <Button
              view='filled'
              size={DROPLIST_FOOTER_SIZE_MAP[size]}
              appearance='primary'
              label={t('apply')}
              onClick={onApprove}
              data-test-id={CHIP_CHOICE_TEST_IDS.approveButton}
            />
          </div>
        ),
        inactive: true,
      },
    ] as DroplistProps['pinBottom'];
  }, [t, autoApply, size, onApprove, onCancel]);
}
