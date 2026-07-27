import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { useSurfaceTokenSegment } from '../../context/overlaySurface';
import { PopupFooterProps } from '../../types';
import styles from './styles.module.scss';

/** Нижняя action-зона overlay'я (рендерит `children` в `bottomBar`-секции). Раскладка по поверхности. */
export function PopupFooter({ children, className, ...rest }: PopupFooterProps) {
  const surface = useSurfaceTokenSegment();

  return (
    <div
      className={cn(styles.root, className)}
      data-surface={surface}
      // Дефолтный id идёт до spread — потребитель-обёртка (drawer) может переопределить своим.
      data-test-id={TEST_IDS.footer}
      {...extractSupportProps(rest)}
    >
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
