import { IconPredefined } from '@ds/icon-predefined';
import { FileSVG } from '@ds/icons';
import { Spinner } from '@ds/loader';
import { useEffect, useState } from 'react';

import { TEST_IDS } from '../../../../constants';
import { useAttachmentContext } from '../../../../context';
import { AttachmentProps } from '../../../../types';
import { EMBLEM_ICON_SIZE } from '../../../../utils';
import styles from './styles.module.scss';

export type EmblemProps = {
  imageData?: string;
} & Pick<AttachmentProps, 'icon' | 'loading' | 'title'>;

export function Emblem({ loading, icon, imageData, title }: EmblemProps) {
  const { size = 's' } = useAttachmentContext();
  const ipSize = EMBLEM_ICON_SIZE[size];

  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false);
  }, [imageData]);

  if (loading) {
    return (
      <span className={styles.loader} data-size={size} data-test-id={TEST_IDS.loading}>
        <Spinner />
      </span>
    );
  }

  if (imageData && !imgError) {
    return (
      <img
        src={imageData}
        alt={title}
        data-size={size}
        data-test-id={TEST_IDS.image}
        className={styles.image}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <IconPredefined
      size={ipSize}
      icon={icon ?? FileSVG}
      decor
      appearance='neutral'
      shape='square'
      data-test-id={TEST_IDS.icon}
    />
  );
}
