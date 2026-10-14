import { withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS } from '../constants';
import { GigaButton } from '../shared/GigaButton';
import styles from './styles.module.scss';
import { AiButtonGigaMamaProps } from './types';

export function AiButtonGigaMama(props: AiButtonGigaMamaProps) {
  return (
    <GigaButton
      {...props}
      size={SIZE.S}
      view='mama'
      className={cn(styles.root, props.className)}
      rootTestId={TEST_IDS.mama}
    />
  );
}

withInnerRefSupport(AiButtonGigaMama);
