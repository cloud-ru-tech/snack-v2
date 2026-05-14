import { Sun } from '@ds/loader';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { Timer } from '../../helperComponents/Timer';
import { ToastButtonAction } from '../../helperComponents/ToastButtonAction';
import styles from './styles.module.scss';
import { ToastUserActionProps } from './types';
import { getIcon } from './utils';

export function ToastUserAction({
  appearance = 'neutral',
  label,
  action,
  className,
  loading = false,
  timer = false,
  ...rest
}: ToastUserActionProps) {
  const icon = getIcon(appearance);

  // Приоритет leading-slot: timer → loading → icon. Допускается передать оба
  // флага, но в одну отрисовку попадёт только верхний по приоритету; ниже
  // ничего не дублируется.
  let leadingSlot: ReactNode = null;
  if (timer) {
    leadingSlot = <Timer />;
  } else if (loading) {
    leadingSlot = (
      <span className={styles.loader} data-test-id={TEST_IDS.userActionLoader}>
        <Sun size='s' />
      </span>
    );
  } else if (icon) {
    leadingSlot = (
      <span className={styles.icon} data-test-id={TEST_IDS.userActionIcon}>
        {icon}
      </span>
    );
  }

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.userActionRoot}
      data-appearance={appearance}
      data-loading={loading || undefined}
      data-timer={timer || undefined}
    >
      {leadingSlot}

      <span className={styles.label}>
        <TruncateString text={label} maxLines={2} variant='end' data-test-id={TEST_IDS.userActionLabel} hideTooltip />
      </span>

      {action && <ToastButtonAction data-test-id={TEST_IDS.userActionLink} {...action} />}
    </div>
  );
}
