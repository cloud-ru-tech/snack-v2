import { WebIcons } from '@ds/icons';
import cn from 'classnames';
import { ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldNoticeVmInfoProps } from '../../types';
import styles from './styles.module.scss';

export function AiFieldNoticeVmInfo({ vmName, vmIp, size, className }: AiFieldNoticeVmInfoProps): ReactElement {
  return (
    <div className={cn(styles.root, className)} data-size={size} data-test-id={TEST_IDS.vmInfo}>
      <span className={styles.item} data-test-id={TEST_IDS.vmName}>
        <span className={styles.icon} aria-hidden>
          <WebIcons.EvolutionComputeSVG />
        </span>
        <span className={styles.label}>{vmName}</span>
      </span>
      <span className={styles.item} data-test-id={TEST_IDS.vmIp}>
        <span className={styles.icon} aria-hidden>
          <WebIcons.PublicIpSVG />
        </span>
        <span className={styles.label}>{vmIp}</span>
      </span>
    </div>
  );
}
