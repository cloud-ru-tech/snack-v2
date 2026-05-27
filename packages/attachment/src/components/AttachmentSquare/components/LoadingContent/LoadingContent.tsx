import { Spinner } from '@ds/loader';

import { TEST_IDS } from '../../../../constants';
import { Actions } from '../../../../helperComponents';
import styles from './styles.module.scss';

export function LoadingContent() {
  return (
    <div className={styles.composition} data-test-id={TEST_IDS.loadingSquare}>
      <Spinner />
      <Actions hideDownload hideRetry />
    </div>
  );
}
