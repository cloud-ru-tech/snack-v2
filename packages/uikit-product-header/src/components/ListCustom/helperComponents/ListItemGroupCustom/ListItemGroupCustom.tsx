import { Divider, VARIANT } from '@ds/divider';
import { GroupItemRenderProps } from '@ds/list';
import { CSSProperties } from 'react';

import { ContentWrapperCustom } from '../ContentWrapperCustom';
import styles from './styles.module.scss';

export type ListItemGroupCustomProps = GroupItemRenderProps;

/**
 * Кастомная оболочка заголовка группы `List`/`Droplist` (Figma `listItemGroupCustom`).
 * Передаётся в `groupItemRender`: subtitle / subtitleTertiary / divider.
 */
export function ListItemGroupCustom({
  label,
  beforeContent,
  truncate,
  groupVariant = 'subtitleTertiary',
  divider,
  selectButtonNode,
  level,
}: ListItemGroupCustomProps) {
  if (label) {
    return (
      <div
        className={styles.root}
        data-level-one={level === 1 || undefined}
        data-level-more-one={level > 1 || undefined}
        style={{ '--level': level } as CSSProperties}
      >
        <ContentWrapperCustom
          layout='group'
          beforeContent={beforeContent}
          label={label}
          truncate={truncate ? { variant: truncate.variant, label: 1 } : undefined}
          groupVariant={groupVariant}
          selectButton={selectButtonNode}
        />

        {divider && (
          <Divider className={styles.divider} variant={groupVariant === 'subtitle' ? VARIANT.Regular : VARIANT.Thin} />
        )}
      </div>
    );
  }

  if (divider) {
    return (
      <div className={styles.dividerOnly}>
        <Divider variant={VARIANT.Regular} />
      </div>
    );
  }

  return null;
}
