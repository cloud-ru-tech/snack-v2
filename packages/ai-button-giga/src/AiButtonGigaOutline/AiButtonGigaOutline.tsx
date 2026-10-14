import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS } from '../constants';
import { GigaButton } from '../shared/GigaButton';
import styles from './styles.module.scss';
import { AiButtonGigaOutlineProps } from './types';

export function AiButtonGigaOutline({ size = SIZE.S, ...props }: AiButtonGigaOutlineProps) {
  return (
    <GigaButton
      {...props}
      size={size}
      view='outline'
      className={cn(styles.root, props.className)}
      rootTestId={TEST_IDS.outline}
    />
  );
}

withInnerRefSupport(AiButtonGigaOutline);
