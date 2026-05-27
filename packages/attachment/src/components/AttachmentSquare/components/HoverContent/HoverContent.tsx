import cn from 'classnames';

import { useAttachmentContext } from '../../../../context';
import { Actions, TextBlock } from '../../../../helperComponents';
import { AttachmentProps } from '../../../../types';
import styles from './styles.module.scss';

type HoverContentProps = Pick<AttachmentProps, 'title' | 'description' | 'error' | 'className'> & {
  /** image-mode → overlay даёт title/description/actions поверх `<img>`; icon-mode → только actions поверх иконки. */
  hasImage?: boolean;
};

export function HoverContent({ title, description, error, hasImage, className }: HoverContentProps) {
  const { size } = useAttachmentContext();
  const hasError = Boolean(error);

  const showOnHoverOnly = !hasError;
  // Дублировать TextBlock из MainContent нельзя: два absolute-слоя того же текста дают визуальный bold.
  const showText = hasImage || hasError;

  return (
    <div
      className={cn(styles.overlay, showOnHoverOnly && className)}
      data-size={size}
      data-error={hasError || undefined}
      data-mode={hasImage ? 'image' : 'icon'}
    >
      {showText && (
        <TextBlock title={title} error={error} description={!hasError ? description : undefined} align='center' />
      )}
      <Actions hideDownload={hasError} hideRetry={!hasError} />
    </div>
  );
}
