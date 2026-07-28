import { QuestionTooltip } from '@ds/tooltip';
import { CopyLine, CopyLineProps } from '@ds/uikit-product-copy';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type DefaultSubtitleProps = WithSupportProps<{
  /** Подпись слева */
  label: string;
  /** Копируемое значение (пропсы CopyLine) */
  value: CopyLineProps;
  /** Тултип-подсказка рядом с подписью */
  labelTooltip?: ReactNode;
}>;

export function DefaultSubtitle({ label, labelTooltip, value, ...rest }: DefaultSubtitleProps) {
  return (
    <div className={styles.subtitle} {...extractSupportProps(rest)}>
      <div className={styles.label}>
        {label}
        {labelTooltip && <QuestionTooltip tip={labelTooltip} />}
      </div>
      <CopyLine {...value} />
    </div>
  );
}
