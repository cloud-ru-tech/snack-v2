import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { AttachmentContext } from '../../context';
import { Actions, TextBlock } from '../../helperComponents';
import { useImage } from '../../hooks';
import { AttachmentProps } from '../../types';
import { getBaseFileName, getFileExtension } from '../../utils';
import { Emblem } from './components/Emblem';
import styles from './styles.module.scss';

export function Attachment({
  file,
  loading,
  icon,
  title: titleProp,
  description: descriptionProp,
  error,
  disabled,
  truncateVariant,
  checked,
  onDownload,
  onDelete,
  onClick,
  onRetry,
  size = 's',
  truncate,
  className,
  ...rest
}: AttachmentProps) {
  const { loading: loadingImage, imageData } = useImage(file);
  const isLoading = loading || loadingImage;

  const title = titleProp || getBaseFileName(file?.name);
  const description = descriptionProp || getFileExtension(file?.name);

  const interactive = Boolean(!isLoading && !disabled && onClick);
  const hasError = Boolean(error);

  return (
    <Card
      {...extractSupportProps(rest)}
      view='outline'
      radius={size === 's' ? 's' : 'm'}
      backgroundPredefined={
        hasError ? BACKGROUND_PREDEFINED_FILL.RedBackground : BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level
      }
      disabled={!loading && disabled}
      checked={!loading && checked}
      multiSelect
      interactive={interactive}
      className={cn(styles.root, className)}
      data-attachment-error={hasError || undefined}
      aria-busy={isLoading || undefined}
    >
      <AttachmentContext.Provider
        value={{ file, truncateVariant, onDelete, onDownload, onRetry, disabled, size, truncate }}
      >
        <div
          className={styles.composition}
          data-size={size}
          data-loading={isLoading || undefined}
          data-error={hasError || undefined}
          onClick={interactive ? onClick : undefined}
          role={interactive ? 'button' : undefined}
          // Card-корень сам фокусируется (tabIndex=0); внутренний кликабельный wrapper
          // забирает себе только обработчик, но в tab-order не участвует.
          tabIndex={-1}
        >
          <Emblem title={title} loading={isLoading} icon={icon} imageData={imageData} />
          <TextBlock title={title} description={description} error={error} />
          <Actions hideDownload={isLoading || hasError} hideRetry={isLoading || !hasError} />
        </div>
      </AttachmentContext.Provider>
    </Card>
  );
}
