import { Button, VIEW } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons';
import { TruncateString } from '@ds/truncate-string';
import { copyToClipboard } from '@ds/utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { TEST_IDS } from '../../../constants';
import styles from './styles.module.scss';

export type CopyCellProps = {
  value?: string | number;
};

export function CopyCell({ value }: CopyCellProps) {
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    value && copyToClipboard(String(value));
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <div className={styles.copyCell} onClick={handleClick} role='presentation'>
      <div className={styles.content}>
        <TruncateString className={styles.text} text={String(value ?? '')} maxLines={1} />
        <Button
          appearance='neutral'
          data-test-id={TEST_IDS.copyButton}
          type='button'
          view={VIEW.Function}
          icon={isChecked ? <CheckSVG /> : <CopySVG />}
          size='s'
          className={styles.copyButton}
        />
      </div>
    </div>
  );
}
