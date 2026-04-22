import { Button, VIEW } from '@ds/button';
import { Divider, VARIANT as DIVIDER_VARIANT } from '@ds/divider';
import { PLACEMENT, TRIGGER } from '@ds/popover-private';
import { SkeletonContextProvider, SkeletonText, WithSkeleton } from '@ds/skeleton';
import { QuestionTooltip, Tooltip, TooltipProps } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, getThemeClassnames } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { POSITION } from '../../constants';
import styles from './styles.module.scss';
import { MobileInfoRowProps, MobileRowActionButton } from './types.ts';

function withTip(children: ReactNode, tip?: TooltipProps | string) {
  if (!tip) {
    return children;
  }

  return typeof tip === 'string' ? <Tooltip tip={tip}>{children}</Tooltip> : <Tooltip {...tip}>{children}</Tooltip>;
}

function renderRowActionButton(action: MobileRowActionButton, loading: boolean) {
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

export function MobileInfoRow({
  label,
  topDivider = true,
  bottomDivider = true,
  className,
  labelTooltip,
  content,
  rowActions,
  loading = false,
  position = POSITION.Inner,
  labelTruncate,
  ...rest
}: MobileInfoRowProps) {
  const showTruncate = labelTruncate != null && labelTruncate > 0;

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(getThemeClassnames({ density: 'comfort' }), styles.wrapper, className)}
    >
      {topDivider && position !== POSITION.First && <Divider variant={DIVIDER_VARIANT.Regular} />}

      <div className={styles.infoRow} data-position={position}>
        <div className={styles.labelLayout}>
          {showTruncate ? (
            <TruncateString className={styles.label} text={label} maxLines={labelTruncate} />
          ) : (
            <span className={styles.label}>{label}</span>
          )}

          {labelTooltip &&
            (typeof labelTooltip === 'string' ? (
              <QuestionTooltip tip={labelTooltip} placement={PLACEMENT.Top} trigger={TRIGGER.Hover} tabIndex={-1} />
            ) : (
              <QuestionTooltip {...labelTooltip} />
            ))}
        </div>

        <div className={styles.contentLayout}>
          <SkeletonContextProvider loading={loading}>
            <WithSkeleton skeleton={<SkeletonText width='100%' lines={1} />}>
              <div className={styles.content}>{content}</div>
            </WithSkeleton>
          </SkeletonContextProvider>

          {rowActions && (
            <div className={cn(getThemeClassnames({ density: 'compact' }), styles.rowActions)}>
              {renderRowActionButton(rowActions.first, loading)}
              {rowActions.second && renderRowActionButton(rowActions.second, loading)}
            </div>
          )}
        </div>
      </div>

      {bottomDivider && position !== POSITION.Last && <Divider variant={DIVIDER_VARIANT.Regular} />}
    </div>
  );
}
