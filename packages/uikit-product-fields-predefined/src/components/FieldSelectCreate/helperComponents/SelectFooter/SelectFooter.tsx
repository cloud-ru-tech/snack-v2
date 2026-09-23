import { APPEARANCE, Button, ICON_POSITION, Size, VIEW } from '@ds/button';
import { PlusSVG } from '@ds/icons/interface/system';
import { Tooltip } from '@ds/tooltip';

import { TEST_IDS } from '../../../../constants';
import { fieldsPredefinedLocale } from '../../../../locale';
import styles from './styles.module.scss';

type SelectFooterProps = {
  onClick(): void;
  createButtonLabel: string;
  canCreate: boolean;
  size: Size;
};

/** Персистентный футер дроплиста с кнопкой «Создать» (недоступна и с tooltip при нехватке прав). */
export function SelectFooter({ onClick, createButtonLabel, canCreate, size }: SelectFooterProps) {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const button = (
    <Button
      view={VIEW.Function}
      appearance={APPEARANCE.Neutral}
      label={createButtonLabel}
      icon={<PlusSVG />}
      iconPosition={ICON_POSITION.Before}
      onClick={onClick}
      size={size}
      disabled={!canCreate}
      data-test-id={TEST_IDS.fieldSelectCreateFooterButton}
    />
  );

  return (
    <div className={styles.footerWrapper}>
      {canCreate ? button : <Tooltip tip={t('FieldSelectCreate.noPermission')}>{button}</Tooltip>}
    </div>
  );
}
