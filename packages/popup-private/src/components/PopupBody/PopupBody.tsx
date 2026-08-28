import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { Ref } from 'react';

import { TEST_IDS } from '../../constants';
import { PopupBodyProps } from '../../types';
import styles from './styles.module.scss';

/** Контейнер основного содержимого overlay'я. Принимает `content` или `children`. */
export function PopupBody({ content, children, bodyPadding = true, innerRef, className, ...rest }: PopupBodyProps) {
  return (
    <div
      // Публичный тип шире (`HTMLElement`), потому что drawer-ветка body отдаёт ref от `Scroll`.
      ref={innerRef as Ref<HTMLDivElement>}
      className={cn(styles.root, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.body}
      data-no-padding={bodyPadding === false || undefined}
    >
      {children ?? content}
    </div>
  );
}

withInnerRefSupport(PopupBody);
