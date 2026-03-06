import { extractSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { useDrag } from '../../hooks/useDrag';
import { DropzoneProps } from '../Dropzone';
import { PrivateDropZone } from '../PrivateDropZone';
import styles from './styles.module.scss';

export type HiddenDropZoneProps = Omit<DropzoneProps, 'children'> & {
  /** Контент dropzone при drag (overlay) */
  content?: ReactNode;
  /** Дочерний контент, поверх которого отображается dropzone при drag */
  children: ReactNode;
};

/** Компонент — скрытая дропзона, накрывающая произвольный контент (формы, карточки) */
export function HiddenDropZone(props: HiddenDropZoneProps) {
  const { disabled = false, children, className, content, ...rest } = props;

  const { events, isOver } = useDrag(disabled);
  const showOverlay = isOver && !disabled;

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)} {...events}>
      {showOverlay && (
        <PrivateDropZone className={styles.dropZone} {...events} {...rest} isOver disabled={disabled}>
          {content}
        </PrivateDropZone>
      )}

      <div className={cn(styles.children, showOverlay && styles.hidden)}>{children}</div>
    </div>
  );
}
