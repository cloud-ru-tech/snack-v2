import cn from 'classnames';

import { MEDIA_KIND, TEST_IDS } from '../../constants';
import { PopupMediaProps } from '../../types';
import styles from './styles.module.scss';

type MediaProps = PopupMediaProps & {
  className?: string;
};

/** Media-блок над headline: `kind='image'` — во всю ширину, `kind='icon'` — иконка. */
export function PopupMedia({ src, alt, kind = MEDIA_KIND.Image, className }: MediaProps) {
  return (
    <div className={cn(styles.wrapper, className)} data-media-kind={kind} data-test-id={TEST_IDS.media}>
      <img src={src} alt={alt} className={kind === MEDIA_KIND.Image ? styles.image : styles.icon} />
    </div>
  );
}
