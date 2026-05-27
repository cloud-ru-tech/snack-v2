import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEvent, MouseEvent, useState } from 'react';

import { AttachmentContext, AttachmentFocusActionsContext } from '../../context';
import { useImage } from '../../hooks';
import { AttachmentSquareProps } from '../../types';
import { getBaseFileName, getFileExtension } from '../../utils';
import { HoverContent } from './components/HoverContent';
import { LoadingContent } from './components/LoadingContent';
import { MainContent } from './components/MainContent';
import styles from './styles.module.scss';

export function AttachmentSquare({
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
  className,
  ...rest
}: AttachmentSquareProps) {
  const { loading: loadingImage, imageData } = useImage(file);
  const isLoading = loading || loadingImage;

  const title = titleProp || getBaseFileName(file?.name);
  const description = descriptionProp || getFileExtension(file?.name);

  const [hasFocusedActions, setHasFocusedActions] = useState<boolean>(false);

  const interactive = !isLoading && !disabled && Boolean(onClick);
  const hasError = Boolean(error);
  const hasActions = Boolean(onDownload || onDelete || onRetry);
  // Error-вариант в Figma не показывает selected/checkbox — error и checked взаимно исключают друг друга.
  const isChecked = !loading && !error && checked;
  const isDisabled = !loading && disabled;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive || !onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <Card
      {...extractSupportProps(rest)}
      view='outline'
      radius={size === 's' ? 's' : 'm'}
      backgroundPredefined={
        hasError ? BACKGROUND_PREDEFINED_FILL.RedBackground : BACKGROUND_PREDEFINED_FILL.Transparent
      }
      disabled={isDisabled}
      checked={isChecked}
      multiSelect
      interactive={interactive}
      className={cn(styles.root, className)}
      data-attachment-error={hasError || undefined}
      aria-busy={isLoading || undefined}
    >
      <AttachmentContext.Provider
        value={{
          file,
          truncateVariant,
          onDelete,
          onDownload,
          onRetry,
          disabled,
          size,
          truncate: { title: 1, description: 1, error: 1 },
        }}
      >
        <AttachmentFocusActionsContext.Provider
          value={{ focused: hasFocusedActions, setFocused: setHasFocusedActions }}
        >
          <div
            className={cn(styles.composition, {
              [styles.hasFocusedActions]: hasFocusedActions,
            })}
            data-size={size}
            data-loading={isLoading || undefined}
            data-error={hasError || undefined}
            data-has-actions={hasActions || undefined}
            onClick={interactive ? onClick : undefined}
            onKeyDown={interactive ? handleKeyDown : undefined}
            role={interactive ? 'button' : undefined}
            // Card-корень уже фокусируется (tabIndex={0}); внутренний wrapper забирает только обработчики.
            tabIndex={-1}
          >
            {!isLoading && !hasError && (
              <MainContent
                title={title}
                description={description}
                icon={icon}
                imageData={imageData}
                className={styles.main}
              />
            )}

            {!isLoading && !disabled && (
              <HoverContent
                title={title}
                description={description}
                error={error}
                hasImage={Boolean(imageData)}
                className={styles.hover}
              />
            )}

            {isLoading && <LoadingContent />}
          </div>
        </AttachmentFocusActionsContext.Provider>
      </AttachmentContext.Provider>
    </Card>
  );
}
