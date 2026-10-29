import { GroupItemRenderProps, ItemContentProps, ItemRenderProps } from '@ds/list';
import { TruncateString } from '@ds/truncate-string';
import cn from 'classnames';
import { ReactNode, useMemo } from 'react';

import styles from './styles.module.scss';

/**
 * Приватный слот before + текст + after.
 * Текстовые поля и truncate — из `ItemContentProps`; слоты строки — из `ItemRenderProps`;
 * `groupVariant` — из `GroupItemRenderProps`. Своё: `layout`, `selectButton`.
 * `label` опционален: при `contentNode` структурный текст не собирается.
 */
export type ContentWrapperCustomProps = Partial<Pick<ItemContentProps, 'label'>> &
  Pick<ItemContentProps, 'caption' | 'description' | 'truncate' | 'disabled' | 'className'> &
  Pick<ItemRenderProps, 'beforeContent' | 'afterContent'> &
  Pick<GroupItemRenderProps, 'groupVariant'> & {
    /** Готовый узел вместо структурного текста; у группы обычно не задаётся */
    contentNode?: ItemRenderProps['contentNode'];
    /** Слот справа в групповом заголовке (bulk select) */
    selectButton?: ReactNode;
    /** Раскладка: строка списка или заголовок группы */
    layout?: 'item' | 'group';
  };

const DEFAULT_TRUNCATE: NonNullable<ItemContentProps['truncate']> = {
  label: 1,
  description: 2,
  variant: 'end',
};

export function ContentWrapperCustom({
  beforeContent,
  afterContent,
  label,
  caption,
  description,
  truncate: truncateProp,
  contentNode,
  selectButton,
  layout = 'item',
  groupVariant = 'subtitleTertiary',
  disabled,
  className,
}: ContentWrapperCustomProps) {
  const truncate = useMemo(
    () => ({
      ...DEFAULT_TRUNCATE,
      ...truncateProp,
    }),
    [truncateProp],
  );

  const hasStructuredText = label !== undefined && label !== null && !contentNode;

  return (
    <div className={cn(styles.root, className)} data-layout={layout} data-disabled={disabled || undefined}>
      {beforeContent && (
        <div className={styles.centeredWrapper} aria-hidden>
          <div className={styles.elementBeforeContent}>{beforeContent}</div>
        </div>
      )}

      <div className={styles.textWrapper}>
        {hasStructuredText ? (
          <div className={styles.textContent}>
            <div className={styles.headline}>
              <div className={styles.label} data-group-variant={layout === 'group' ? groupVariant : undefined}>
                <TruncateString
                  data-test-id='header-list-item__label'
                  variant={truncate.variant}
                  text={String(label)}
                  maxLines={truncate.label}
                />
              </div>
              {caption && layout === 'item' && <span className={styles.caption}>{caption}</span>}
            </div>

            {description && layout === 'item' && (
              <div className={styles.description}>
                <TruncateString
                  data-test-id='header-list-item__description'
                  text={description}
                  maxLines={truncate.description}
                />
              </div>
            )}
          </div>
        ) : (
          contentNode
        )}

        {selectButton && <span className={styles.selectButton}>{selectButton}</span>}
      </div>

      {afterContent && (
        <div className={cn(styles.centeredWrapper, styles.centeredWrapperAfter)} aria-hidden>
          <div className={styles.elementAfterContent}>{afterContent}</div>
        </div>
      )}
    </div>
  );
}
