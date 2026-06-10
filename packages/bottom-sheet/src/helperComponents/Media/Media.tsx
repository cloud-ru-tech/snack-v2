import cn from 'classnames';

import { MEDIA_KIND, TEST_IDS } from '../../constants';
import { BottomSheetMediaProps } from '../../types';
import styles from './styles.module.scss';

type MediaProps = BottomSheetMediaProps & {
  className?: string;
};

/**
 * Media-блок над headline:
 *  - `kind='image'` (по умолчанию) — изображение во всю ширину, высота 184px.
 *  - `kind='icon'`  — иконка с `padding-top: 24px`.
 */
export function Media({ src, alt, kind = MEDIA_KIND.Image, className }: MediaProps) {
  return (
    <div className={cn(styles.wrapper, className)} data-media-kind={kind} data-test-id={TEST_IDS.media}>
      <img src={src} alt={alt} className={kind === MEDIA_KIND.Image ? styles.image : styles.icon} />
    </div>
  );
}
