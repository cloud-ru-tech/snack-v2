import { CrossSVG } from '@ds/icons/interface/system';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type PopupCloseButtonProps = WithSupportProps<{
  /** Действие при клике. */
  onClick(): void;
  /** CSS-класс. */
  className?: string;
  /** Доступное имя кнопки. По умолчанию `close popup`. */
  'aria-label'?: string;
}>;

/** Единая кнопка закрытия overlay'я (крестик в правом верхнем углу). */
export function PopupCloseButton({
  onClick,
  className,
  'aria-label': ariaLabel = 'close popup',
  ...rest
}: PopupCloseButtonProps) {
  return (
    <button
      type='button'
      className={cn(styles.root, className)}
      onClick={onClick}
      aria-label={ariaLabel}
      data-test-id={TEST_IDS.closeButton}
      {...extractSupportProps(rest)}
    >
      <div className={styles.stateLayer} aria-hidden data-state='onColorFilled' />
      <CrossSVG />
    </button>
  );
}
