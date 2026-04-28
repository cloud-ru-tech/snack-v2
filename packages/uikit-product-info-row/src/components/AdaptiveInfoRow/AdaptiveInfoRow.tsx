import { extractSupportProps } from '@ds/utils';

import { LAYOUT_TYPE, POSITION } from '../../constants';
import { LayoutType, Position } from '../../types';
import { InfoRow } from '../InfoRow';
import { InfoRowProps } from '../InfoRow/types';
import { MobileInfoRow } from '../MobileInfoRow';

export type AdaptiveInfoRowProps = InfoRowProps & {
  layoutType: LayoutType;
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

export function AdaptiveInfoRow({ layoutType, position, ...props }: AdaptiveInfoRowProps) {
  if (layoutType === LAYOUT_TYPE.Desktop) {
    return <InfoRow {...props} />;
  }

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
