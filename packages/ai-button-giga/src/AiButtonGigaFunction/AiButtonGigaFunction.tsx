import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS } from '../constants';
import { GigaButton } from '../shared/GigaButton';
import styles from './styles.module.scss';
import { AiButtonGigaFunctionProps } from './types';

export function AiButtonGigaFunction({ size = SIZE.S, ...props }: AiButtonGigaFunctionProps) {
  return (
    <GigaButton
      {...props}
      size={size}
      view='function'
      className={cn(styles.root, props.className)}
      rootTestId={TEST_IDS.function}
    />
  );
}

withInnerRefSupport(AiButtonGigaFunction);
