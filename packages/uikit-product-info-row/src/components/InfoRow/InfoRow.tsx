import { Button, VIEW } from '@ds/button';
import { Divider, VARIANT as DIVIDER_VARIANT } from '@ds/divider';
import { PLACEMENT, TRIGGER } from '@ds/popover-private';
import { SkeletonContextProvider, SkeletonText, WithSkeleton } from '@ds/skeleton';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, getThemeClassnames } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './styles.module.scss';
import { InfoRowProps, RowActionButton, RowActionsPair } from './types.ts';

type LabelTooltipProp =
  | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
  | string;

function LabelBlock({
  text,
  truncate,
  tooltip,
  layoutClassName,
  labelWidth,
}: {
  text: string;
  truncate: number;
  tooltip?: LabelTooltipProp;
  layoutClassName?: string;
  labelWidth?: InfoRowProps['labelWidth'];
}) {
  return (
    <div className={cn(styles.labelLayout, layoutClassName)} data-label-width={labelWidth}>
      <TruncateString className={styles.label} text={text} maxLines={truncate} />

      {tooltip &&
        (typeof tooltip === 'string' ? (
          <QuestionTooltip tip={tooltip} placement={PLACEMENT.Top} trigger={TRIGGER.Hover} tabIndex={-1} />
        ) : (
          <QuestionTooltip {...tooltip} />
        ))}
    </div>
  );
}

export { NO_DATA_PLACEHOLDER } from './constants';

/** Плейсхолдер области действий по макету Figma (декоративный; для кнопок используйте `rowActions`). */
export function InfoRowActionPlaceholder({ className, ...rest }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(styles.actionPlaceholder, className)} role='presentation' {...rest} />;
}

export function withTip(children: ReactNode, tip?: TooltipProps | string) {
  if (!tip) {
    return children;
  }

  return typeof tip === 'string' ? <Tooltip tip={tip}>{children}</Tooltip> : <Tooltip {...tip}>{children}</Tooltip>;
}

/** Legacy `ButtonTonal` + `appearance="neutral"` / Figma `buttonTonalNeutral` → `@ds/button`. */
function renderRowActionButton(action: RowActionButton, loading: boolean) {
  const { tip, ...buttonProps } = action;
  return withTip(
    <Button
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
      appearance='neutral'
      size='m'
      view={VIEW.Tonal}
    />,
    tip,
  );
}

function RowActions({ actions, loading }: { actions: RowActionsPair; loading: boolean }) {
  return (
    <div className={cn(getThemeClassnames({ density: 'compact' }), styles.rowActions)}>
      {renderRowActionButton(actions.first, loading)}
      {actions.second && renderRowActionButton(actions.second, loading)}
    </div>
  );
}

function ValueColumn({
  body,
  actions,
  actionsSlot,
  loading,
}: {
  body: ReactNode;
  actions?: RowActionsPair;
  actionsSlot?: ReactNode;
  loading: boolean;
}) {
  const actionsBlock = actionsSlot ?? (actions ? <RowActions actions={actions} loading={loading} /> : null);

  return (
    <div className={styles.valueColumn}>
      <SkeletonContextProvider loading={loading}>
        <WithSkeleton skeleton={<SkeletonText width='100%' lines={1} />}>
          <div className={styles.content}>{body}</div>
        </WithSkeleton>
      </SkeletonContextProvider>
      {actionsBlock}
    </div>
  );
}

export function InfoRow({
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
}: InfoRowProps) {
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
