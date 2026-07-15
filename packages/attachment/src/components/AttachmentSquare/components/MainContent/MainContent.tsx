import { IconPredefined } from '@ds/icon-predefined';
import { FileSVG } from '@ds/icons/interface/system';
import cn from 'classnames';

import { TEST_IDS } from '../../../../constants';
import { useAttachmentContext } from '../../../../context';
import { TextBlock } from '../../../../helperComponents';
import { AttachmentProps } from '../../../../types';
import { EMBLEM_ICON_SIZE } from '../../../../utils';
import styles from './styles.module.scss';

type MainContentProps = {
  imageData?: string;
  description?: string;
} & Pick<AttachmentProps, 'title' | 'icon' | 'className'>;

export function MainContent({ title, description, icon, imageData, className }: MainContentProps) {
  const { file, size = 's' } = useAttachmentContext();

  if (imageData) {
    return (
      <div className={cn(styles.composition, styles.image, className)} data-attachment-image=''>
        <img src={imageData} alt={file?.name ?? title ?? 'file'} data-test-id={TEST_IDS.image} className={styles.img} />
      </div>
    );
  }

  return (
    <div className={cn(styles.composition, styles.iconMode, className)} data-size={size}>
      <TextBlock title={title} description={description} align='center' />
      <div className={styles.iconSlot} data-attachment-icon-slot=''>
        <IconPredefined
          size={EMBLEM_ICON_SIZE[size]}
          icon={icon ?? FileSVG}
          decor
          appearance='neutral'
          shape='squared'
          data-test-id={TEST_IDS.icon}
        />
      </div>
    </div>
  );
}
