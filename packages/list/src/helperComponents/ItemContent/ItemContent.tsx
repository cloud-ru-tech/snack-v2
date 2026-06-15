import { TruncateString, TruncateStringProps } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';

import { useNewListContext } from '../../components/Lists/contexts';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type TruncateProps = {
  option?: number;
  description?: number;
  variant?: TruncateStringProps['variant'];
};

export type ItemContentProps = WithSupportProps<{
  option: string | number;
  caption?: string;
  description?: string;
  truncate?: TruncateProps;
  disabled?: boolean;
  className?: string;
}>;

const DEFAULT_TRUNCATE: TruncateProps = {
  option: 1,
  description: 2,
  variant: 'end',
};

export function ItemContent({
  truncate: truncateProp,
  caption,
  description,
  option,
  className,
  disabled,
  ...rest
}: ItemContentProps) {
  const { size = 's' } = useNewListContext();

  const truncate = useMemo(
    () => ({
      ...DEFAULT_TRUNCATE,
      ...truncateProp,
    }),
    [truncateProp],
  );

  return (
    <div
      className={cn(styles.content, className)}
      {...extractSupportProps(rest)}
      data-size={size ?? 's'}
      data-disabled={disabled || undefined}
    >
      <div className={styles.headline}>
        <div className={styles.label}>
          <TruncateString
            variant={truncate.variant}
            text={String(option)}
            maxLines={truncate.option}
            data-test-id={TEST_IDS.baseItemOption}
          />
        </div>
        {caption && <span className={styles.caption}>{caption}</span>}
      </div>

      {description && (
        <div className={styles.description}>
          <TruncateString
            text={description}
            maxLines={truncate.description}
            data-test-id={TEST_IDS.baseItemDescription}
          />
        </div>
      )}
    </div>
  );
}
