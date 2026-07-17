import { Button } from '@ds/button';
import { CrossCircleSVG } from '@ds/icons/interface/system';
import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react';

import { ButtonSize } from '../../types';
import styles from './styles.module.scss';

type ButtonClearValueProps = {
  size: ButtonSize;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  'data-test-id'?: string;
};

export const ButtonClearValue = forwardRef<HTMLButtonElement, ButtonClearValueProps>(
  ({ size, onClick, tabIndex = -1, onKeyDown, 'data-test-id': dataTestId }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation();
      onClick(event);
    };

    return (
      <Button
        className={styles.clearButton}
        view='function'
        appearance='neutral'
        icon={<CrossCircleSVG />}
        size={size}
        onClick={handleClick}
        data-test-id={dataTestId}
        type='button'
        innerRef={ref}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
      />
    );
  },
);
