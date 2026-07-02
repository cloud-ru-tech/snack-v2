import { TruncateString } from '@ds/truncate-string';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps } from '@ds/utils';

import styles from './styles.module.scss';
import { HeadlineProps } from './types';

export function Headline({
  title,
  actions,
  moreActions,
  beforeHeadline,
  afterHeadline,
  subHeader,
  truncateTitle,
  ...rest
}: HeadlineProps) {
  const needsRender = Boolean(title || beforeHeadline || afterHeadline || subHeader || actions || moreActions);

  if (!needsRender) return null;

  return (
    <div className={styles.headline} {...extractSupportProps(rest)}>
      <div className={styles.headlineLayout}>
        <div className={styles.titleLayout}>
          {beforeHeadline && <div className={styles.prefixButtonWrapper}>{beforeHeadline}</div>}
          <Typography variant={VARIANT.headline} size={SIZE.s} as='h1' className={styles.title}>
            {truncateTitle ? <TruncateString variant='end' text={title} maxLines={1} /> : title}
          </Typography>

          {afterHeadline && <div className={styles.statusWrapper}>{afterHeadline}</div>}

          {moreActions && <div className={styles.moreActions}>{moreActions}</div>}
        </div>

        {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
      </div>

      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
    </div>
  );
}
