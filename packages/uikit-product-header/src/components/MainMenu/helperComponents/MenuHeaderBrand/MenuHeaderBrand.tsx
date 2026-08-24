import { Divider } from '@ds/divider';
import { ChevronLeftSVG } from '@ds/icons/interface/system';
import cn from 'classnames';
import { ReactNode } from 'react';

import { headerLocale } from '../../../../locale';
import { HeaderButton } from '../../../HeaderButton';
import styles from './styles.module.scss';

export type MenuHeaderBrandProps = {
  logo?: ReactNode;
  onClose(): void;
  className?: string;
};

export function MenuHeaderBrand({ logo, onClose, className }: MenuHeaderBrandProps) {
  const { t } = headerLocale.useTranslations();

  return (
    <div className={cn(styles.container, className)}>
      {logo}
      <Divider orientation='vertical' />

      <HeaderButton className={styles.closeButton} onClick={onClose} icon={<ChevronLeftSVG />} label={t('close')} />
    </div>
  );
}
