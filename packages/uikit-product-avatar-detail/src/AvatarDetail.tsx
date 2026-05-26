import { Avatar, AvatarProps, SIZE as AVATAR_SIZE } from '@ds/avatar';
import { Button } from '@ds/button';
import { useLocale } from '@ds/locale';
import { Tooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, useCopyToClipboard, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLAttributes, useCallback } from 'react';

import { COPY_BUTTON_ARIA_LABEL, COPY_TIP, TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type AvatarDetailProps = WithSupportProps<{
  /** Аватар пропсы */
  avatar?: Omit<AvatarProps, 'name' | 'data-test-id'>;
  /** Имя пользователя */
  name: string;
  /** Дополнительное описание под основной строкой */
  description?: string;
  /** Контактные данные для отображения и копирования */
  contactData?: string;
  /** CSS-класс */
  className?: string;
}> &
  Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>;

export function AvatarDetail({
  name,
  description,
  contactData,
  avatar,
  className,
  ...rest
}: AvatarDetailProps) {
  const { isChecked, copy } = useCopyToClipboard();
  const { t } = useLocale('AvatarDetail');
  const { 'data-test-id': testId, ...supportProps } = extractSupportProps(rest);
  const rootTestId = testId ?? TEST_IDS.root;

  const copyLabel = t(COPY_TIP.Copy);
  const copiedLabel = t(COPY_TIP.Copied);
  const copyContactDataLabel = t(COPY_BUTTON_ARIA_LABEL);

  const handleCopyClick = useCallback(() => {
    if (contactData) copy(contactData);
  }, [contactData, copy]);

  return (
    <div className={cn(styles.root, className)} {...supportProps} data-test-id={rootTestId}>
      <div className={styles.headInformationRow}>
        <Avatar
          size={AVATAR_SIZE.S}
          {...avatar}
          name={name}
          data-test-id={TEST_IDS.avatar}
        />

        <Typography
          variant='body'
          size='m'
          as='span'
          className={styles.name}
          data-test-id={TEST_IDS.name}
        >
          <TruncateString text={name} maxLines={1} />
        </Typography>

        {contactData && (
          <Tooltip tip={isChecked ? copiedLabel : copyLabel}>
            <Button
              className={styles.contactButton}
              view='function'
              appearance='neutral'
              size='m'
              type='button'
              label={contactData}
              aria-label={copyContactDataLabel}
              data-test-id={TEST_IDS.contactData}
              onClick={handleCopyClick}
            />
          </Tooltip>
        )}
      </div>

      {description && (
        <Typography
          variant='body'
          size='m'
          as='p'
          className={styles.description}
          data-test-id={TEST_IDS.description}
        >
          <TruncateString text={description} maxLines={1} />
        </Typography>
      )}
    </div>
  );
}
