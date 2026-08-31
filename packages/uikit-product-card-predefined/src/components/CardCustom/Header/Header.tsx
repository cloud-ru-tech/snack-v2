import { Size, useCardContext } from '@ds/card';
import { TruncateString } from '@ds/truncate-string';
import { SIZE as TYPOGRAPHY_SIZE, Typography, VARIANT } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../../constants';
import { Emblem, EmblemProps } from '../../../helperComponents';
import { DESCRIPTION_SIZE_MAP, TITLE_SIZE_MAP, TRUNCATE_DEFAULTS } from './constants';
import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  description?: string;
  /** Метаинформация */
  metadata?: string;
  /**
   * Максимальное число строк
   * - `title` — в заголовке
   * - `description` — в описании
   * - `metadata` — в метаинформации
   * @default '{ title: 1; description: 2; metadata: 1; }'
   */
  truncate?: {
    title?: number;
    description?: number;
    metadata?: number;
  };
  /** Эмблема иконка/картинка */
  emblem?: EmblemProps;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function Header({
  title,
  description,
  metadata,
  truncate,
  emblem,
  className,
  size: sizeProp,
  ...rest
}: HeaderProps) {
  const { radius } = useCardContext();
  const size = sizeProp ?? radius;
  const truncateStrings = { ...TRUNCATE_DEFAULTS, ...truncate };

  return (
    <div className={cn(styles.titleLayout, className)} {...extractSupportProps(rest)} data-size={size}>
      {emblem && <Emblem {...emblem} />}

      <div className={styles.contentLayout}>
        <Typography
          as='div'
          variant={VARIANT.title}
          size={TITLE_SIZE_MAP[size]}
          className={styles.title}
          data-test-id={TEST_IDS.cardCustomTitle}
        >
          <TruncateString variant='end' maxLines={truncateStrings.title} text={title} />
        </Typography>

        {metadata && (
          <Typography as='p' variant={VARIANT.body} size={TYPOGRAPHY_SIZE.s} className={styles.metadata}>
            <TruncateString
              variant='end'
              maxLines={truncateStrings.metadata}
              text={metadata}
              data-test-id={TEST_IDS.cardCustomMetadata}
            />
          </Typography>
        )}

        {description && (
          <Typography
            as='p'
            variant={VARIANT.body}
            size={DESCRIPTION_SIZE_MAP[size]}
            className={styles.description}
            data-test-id={TEST_IDS.cardCustomDescription}
          >
            <TruncateString variant='end' maxLines={truncateStrings.description} text={description} />
          </Typography>
        )}
      </div>
    </div>
  );
}

Header.displayName = 'CardCustom.Header';
