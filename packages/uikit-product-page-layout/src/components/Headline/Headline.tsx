import { TruncateString } from '@ds/truncate-string';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';

import styles from './styles.module.scss';
import { HeadlineProps } from './types';

export function Headline({
  title,
  actions,
  moreActions,
  slotBeforeTitle,
  slotAfterTitle,
  subtitle,
  truncateTitle,
  ...rest
}: HeadlineProps) {
  const needsRender = Boolean(title || slotBeforeTitle || slotAfterTitle || subtitle || actions || moreActions);

  if (!needsRender) return null;

  return (
    <div className={styles.headline} {...extractSupportProps(rest)}>
      <div className={styles.headlineLayout}>
        <div className={styles.titleLayout}>
          {slotBeforeTitle && <div className={styles.prefixButtonWrapper}>{slotBeforeTitle}</div>}
          <Typography variant={VARIANT.headline} size={SIZE.s} as='h1' className={styles.title}>
            {truncateTitle ? <TruncateString variant='end' text={title} maxLines={1} /> : title}
          </Typography>

          {slotAfterTitle && <div className={styles.statusWrapper}>{slotAfterTitle}</div>}

          {moreActions && <div className={styles.moreActions}>{moreActions}</div>}
        </div>

        {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
      </div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}
