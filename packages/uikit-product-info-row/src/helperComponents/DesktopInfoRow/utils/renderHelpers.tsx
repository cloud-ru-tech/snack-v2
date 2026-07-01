import { Button, VIEW } from '@ds/button';
import { PLACEMENT, TRIGGER } from '@ds/popover-private';
import { SkeletonContextProvider, SkeletonText, WithSkeleton } from '@ds/skeleton';
import { useThemeClassnames } from '@ds/theme';
import { QuestionTooltip, QuestionTooltipProps, Tooltip, TooltipProps } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from '../styles.module.scss';
import { DesktopInfoRowProps, RowActionButton, RowActionsPair } from '../types';

type LabelTooltipProp =
  | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
  | string;

export function LabelBlock({
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
  labelWidth?: DesktopInfoRowProps['labelWidth'];
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
  // Фиксируем density, остальные оси (colorScheme/brand/…) наследуем из контекста темы.
  const themeClassName = useThemeClassnames({ density: 'compact' });

  return (
    <div className={cn(themeClassName, styles.rowActions)}>
      {renderRowActionButton(actions.first, loading)}
      {actions.second && renderRowActionButton(actions.second, loading)}
    </div>
  );
}

export function ValueColumn({
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
