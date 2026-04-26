import { Typography } from '@ds/typography';

import styles from '../../styles.module.scss';

type DemoComponentProps = {
  title?: string;
  description?: string;
};

export function DemoComponent({ title, description }: DemoComponentProps) {
  return (
    <div className={styles.demoComponent}>
      {title && (
        <Typography variant='title' size='m' className={styles.title}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant='body' size='m'>
          {description}
        </Typography>
      )}
    </div>
  );
}
