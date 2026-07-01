import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { extractSupportProps } from '@ds/utils';

import { POSITION } from '../../constants';
import { DesktopInfoRow } from '../../helperComponents/DesktopInfoRow';
import { DesktopInfoRowProps } from '../../helperComponents/DesktopInfoRow/types';
import { MobileInfoRow } from '../../helperComponents/MobileInfoRow';
import { Position } from '../../types';

export type InfoRowProps = DesktopInfoRowProps & {
  /**
   * Только mobile: позиция строки в группе (`first`/`inner`/`last`) — задаёт скругление/разделители
   * мобильной карточки. На desktop игнорируется (обычно проставляется `InfoGroup` автоматически).
   */
  position?: Position;
};

export function getPosition({ index, length }: { index: number; length: number }): Position {
  if (length < 2) {
    return POSITION.Inner;
  }
  if (index === 0) {
    return POSITION.First;
  }
  if (index === length - 1) {
    return POSITION.Last;
  }
  return POSITION.Inner;
}

export function InfoRow({ position, ...props }: InfoRowProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    const { label, labelTooltip, topDivider, bottomDivider, className, content, rowActions, loading, labelTruncate } =
      props;

    return (
      <MobileInfoRow
        position={position}
        label={label}
        labelTooltip={labelTooltip}
        topDivider={topDivider}
        bottomDivider={bottomDivider}
        className={className}
        content={content}
        rowActions={rowActions}
        loading={loading}
        labelTruncate={labelTruncate}
        {...extractSupportProps(props)}
      />
    );
  }

  return <DesktopInfoRow {...props} />;
}
