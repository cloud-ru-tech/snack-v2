import { APPEARANCE, Button, SIZE as BUTTON_SIZE, VIEW } from '@ds/button';
import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../constants';
import styles from '../../styles.module.scss';
import { UploadFilesDropZoneProps } from '../../types';

export function UploadFilesDropZone({ title, description, buttonLabel }: UploadFilesDropZoneProps) {
  return (
    <div className={styles.dropzoneContent} data-test-id={TEST_IDS.dropzone}>
      <Typography size='s' as='span' variant='body' weight='regular'>
        {title}
      </Typography>
      <Button
        label={buttonLabel}
        appearance={APPEARANCE.Neutral}
        view={VIEW.Outline}
        size={BUTTON_SIZE.S}
        tabIndex={-1}
        as='div'
      />
      <Typography className={styles.dropzoneDescription} size='m' as='span' variant='body' weight='regular'>
        {description}
      </Typography>
    </div>
  );
}
