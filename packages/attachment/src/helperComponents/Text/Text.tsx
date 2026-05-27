import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';

import { useAttachmentContext } from '../../context';

export type TextProps = {
  text?: string;
  className?: string;
  maxLines?: number;
  'data-test-id'?: string;
  /** Только на wrapper-div для typography token-mapping; в TruncateString не пробрасывается. */
  'data-size'?: string;
};

export function Text({ text, className, maxLines = 1, ...rest }: TextProps) {
  const { truncateVariant } = useAttachmentContext();

  if (!text) {
    return null;
  }

  const { 'data-size': dataSize, ...support } = rest;

  return (
    <div className={className} data-size={dataSize}>
      <TruncateString text={text} maxLines={maxLines} variant={truncateVariant} {...extractSupportProps(support)} />
    </div>
  );
}
