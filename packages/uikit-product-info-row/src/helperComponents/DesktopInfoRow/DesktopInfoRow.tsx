import { Divider, VARIANT as DIVIDER_VARIANT } from '@ds/divider';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import styles from './styles.module.scss';
import { DesktopInfoRowProps } from './types';
import { LabelBlock, ValueColumn } from './utils/renderHelpers';

export { NO_DATA_PLACEHOLDER } from './constants';

/** Плейсхолдер области действий по макету Figma (декоративный; для кнопок используйте `rowActions`). */
export function InfoRowActionPlaceholder({ className, ...rest }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(styles.actionPlaceholder, className)} role='presentation' {...rest} />;
}

export function DesktopInfoRow({
  label,
  topDivider = true,
  bottomDivider = true,
  className,
  labelTooltip,
  secondaryLabel = '',
  secondaryLabelTruncate,
  secondaryLabelTooltip,
  content,
  rowActions,
  rowActionsSlot,
  secondaryContent,
  secondaryRowActions,
  secondaryRowActionsSlot,
  labelTruncate = 1,
  loading = false,
  width = 'fixed',
  labelClassName,
  secondaryLabelClassName,
  rowClassName,
  labelWidth,
  column = '1',
  maxWidth = false,
  ...rest
}: DesktopInfoRowProps) {
  const isDouble = column === '2';
  const secondaryTruncate = secondaryLabelTruncate ?? labelTruncate;

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, className)}
      data-width={width}
      data-column={column}
      data-max-width={maxWidth ? 'true' : undefined}
    >
      {topDivider && <Divider variant={DIVIDER_VARIANT.Thin} />}

      <div className={cn(styles.infoRow, rowClassName)}>
        {isDouble ? (
          <div className={styles.columnsPair}>
            <div className={styles.pairItem}>
              <LabelBlock
                text={label}
                truncate={labelTruncate}
                tooltip={labelTooltip}
                layoutClassName={labelClassName}
                labelWidth={labelWidth}
              />
              <ValueColumn body={content} actions={rowActions} actionsSlot={rowActionsSlot} loading={loading} />
            </div>
            <div className={styles.pairItem}>
              <LabelBlock
                text={secondaryLabel}
                truncate={secondaryTruncate}
                tooltip={secondaryLabelTooltip}
                layoutClassName={secondaryLabelClassName}
                labelWidth={labelWidth}
              />
              <ValueColumn
                body={secondaryContent}
                actions={secondaryRowActions}
                actionsSlot={secondaryRowActionsSlot}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <>
            <LabelBlock
              text={label}
              truncate={labelTruncate}
              tooltip={labelTooltip}
              layoutClassName={labelClassName}
              labelWidth={labelWidth}
            />
            <div className={styles.contentLayout}>
              <ValueColumn body={content} actions={rowActions} actionsSlot={rowActionsSlot} loading={loading} />
            </div>
          </>
        )}
      </div>

      {bottomDivider && <Divider variant={DIVIDER_VARIANT.Thin} />}
    </div>
  );
}
