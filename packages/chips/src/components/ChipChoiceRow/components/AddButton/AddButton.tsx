import { Button } from '@ds/button';
import { PlusSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps } from '@ds/list';
import { Tooltip } from '@ds/tooltip';

import { CHIP_CHOICE_ROW_TEST_IDS } from '../../../../constants';
import { chipsLocale } from '../../../../locale';
import { MAP_ROW_SIZE_TO_BUTTON_SIZE } from '../../constants';
import styles from '../../styles.module.scss';
import { ChipChoiceRowSize } from '../../types';

export type AddButtonProps = {
  open: DroplistProps['open'];
  onOpenChange: DroplistProps['onOpenChange'];
  items: DroplistProps['items'];
  size: ChipChoiceRowSize;
};

export function AddButton({ open, onOpenChange, items, size }: AddButtonProps) {
  const { t } = chipsLocale.useTranslations();
  const disabled = items.length === 0;

  const button = (
    <Button
      view='function'
      appearance='neutral'
      disabled={disabled}
      label={t('add')}
      icon={<PlusSVG />}
      iconPosition='before'
      size={MAP_ROW_SIZE_TO_BUTTON_SIZE[size]}
      data-test-id={CHIP_CHOICE_ROW_TEST_IDS.addButton}
      className={styles.addButton}
    />
  );

  if (disabled) {
    return (
      <Tooltip
        tip={t('addButtonDisabledTip')}
        placement='bottom'
        data-test-id={CHIP_CHOICE_ROW_TEST_IDS.addButtonTooltip}
      >
        {button}
      </Tooltip>
    );
  }

  return (
    <Droplist open={open} onOpenChange={onOpenChange} items={items} size={size} trigger='clickAndFocusVisible'>
      {button}
    </Droplist>
  );
}
