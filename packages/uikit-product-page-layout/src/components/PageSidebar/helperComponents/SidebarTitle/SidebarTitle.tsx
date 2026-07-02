import { APPEARANCE, IconPredefined, SIZE } from '@ds/icon-predefined';
import { TruncateString } from '@ds/truncate-string';
import { SIZE as TYPOGRAPHY_SIZE, Typography, VARIANT } from '@ds/typography';
import cn from 'classnames';
import { ReactNode } from 'react';

import { Icon } from '../../types';
import styles from './styles.module.scss';

export type SidebarTitleProps = {
  title: string;
  icon: Icon;
  className?: string;
  afterContent?: ReactNode;
};

export function SidebarTitle({ title, className, icon, afterContent }: SidebarTitleProps) {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.icon}>
        {/* Иконка сайдбара 24px (Figma density/size/icon/s, node 3334:70387 → itemPinTop). У @ds/icon-predefined
            нет ключа 's'; SIZE.M square даёт ровно 24px-глиф — визуальный паритет с легаси size='s'. */}
        <IconPredefined appearance={APPEARANCE.Neutral} size={SIZE.M} shape='square' icon={icon} />
      </div>
      <div className={styles.title}>
        <Typography variant={VARIANT.label} size={TYPOGRAPHY_SIZE.l}>
          <TruncateString text={title} />
        </Typography>
      </div>
      {afterContent}
    </div>
  );
}
