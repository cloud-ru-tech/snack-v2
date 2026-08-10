import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';
import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLProps, ReactNode, Ref } from 'react';

import styles from './styles.module.scss';

export type DragPreviewProps = WithSupportProps<
  {
    /** Перетаскиваемая сущность: строка списка, карточка, чип — то, что едет за курсором. */
    children?: ReactNode;
    /** CSS-класс */
    className?: string;
    /** Ref на корневой элемент */
    innerRef?: Ref<HTMLDivElement>;
  } & Omit<HTMLProps<HTMLDivElement>, 'ref'>
>;

/**
 * Поверхность перетаскиваемой копии: материал `neutralBackground1Level` + тень второго уровня.
 *
 * Оборачивает сущность на время переноса — обычно внутри портала (`DragOverlay` у `@dnd-kit`),
 * где своей подложки у сущности нет и без материала она сливается с фоном страницы.
 * Скругление наследуется от сущности (`border-radius: inherit`), поэтому обёртка повторяет
 * форму того, что в неё положили.
 */
export function DragPreview({ children, className, innerRef, ...rest }: DragPreviewProps) {
  const { appearance, level } = backgroundPredefinedFillToAcrylic(BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level);

  return (
    <div
      ref={innerRef}
      className={cn(styles.dragPreview, className)}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      {...rest}
    >
      {/* Порядок узлов задаёт painting: acrylic (фон) → content, z-index не нужен. */}
      <span className={styles.acrylic} aria-hidden />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

withInnerRefSupport(DragPreview);
