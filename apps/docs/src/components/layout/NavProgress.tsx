import { ProgressBarPage } from '@ds/progress-bar';
import { useEffect, useState } from 'react';

import styles from './NavProgress.module.scss';

export function NavProgress() {
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const start = () => setInProgress(true);
    const stop = () => setInProgress(false);

    document.addEventListener('astro:before-preparation', start);
    document.addEventListener('astro:page-load', stop);

    return () => {
      document.removeEventListener('astro:before-preparation', start);
      document.removeEventListener('astro:page-load', stop);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden>
      <ProgressBarPage inProgress={inProgress} appearance='primary' />
    </div>
  );
}
