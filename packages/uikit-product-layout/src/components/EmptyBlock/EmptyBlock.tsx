import { LayoutPresets, mergePresets, useLayoutDefaults } from '@ds/adaptive';
import { Block, SIZE as BLOCK_SIZE } from '@ds/block';
import { IconPredefinedProps } from '@ds/icon-predefined';
import { ALIGN, Align, InfoBlock, SIZE as INFO_SIZE } from '@ds/info-block';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type EmptyBlockAdaptiveFieldProps = {
  /** Выравнивание иконки и текста */
  align?: Align;
};

/** Пропы `EmptyBlock`, дефолты которых меняет адаптив (preset-класс). */
type EmptyBlockLayoutDefaults = Pick<EmptyBlockAdaptiveFieldProps, 'align'>;

export type EmptyBlockProps = WithSupportProps<
  EmptyBlockAdaptiveFieldProps & {
    /** Заголовок */
    title?: string;
    /** Описание под заголовком */
    description?: ReactNode;
    /** Иконка */
    icon?: IconPredefinedProps;
    /** Слот действий под текстом (например, `ButtonGroup`) */
    footer?: ReactNode;
    /**
     * Override mobile-дефолтов адаптива для этого инстанса (deep-merge поверх `EMPTY_BLOCK_LAYOUT_PRESETS`).
     * Escape-hatch: обычно не нужен — DS-пресет применяется автоматически по `AdaptiveProvider`.
     */
    layoutPresets?: LayoutPresets<EmptyBlockLayoutDefaults>;
    /** Дополнительный класс */
    className?: string;
  }
>;

/** DS-пресет адаптива `EmptyBlock`: на mobile — вертикальное выравнивание, desktop — горизонтальное. */
export const EMPTY_BLOCK_LAYOUT_PRESETS: LayoutPresets<EmptyBlockLayoutDefaults> = {
  mobile: { align: ALIGN.Vertical },
};

/**
 * Блок-заглушка для пустого состояния: иконка, заголовок, описание и опциональный
 * слот действий на нейтральной подложке.
 */
export function EmptyBlock({
  title,
  description,
  icon,
  footer,
  align,
  layoutPresets,
  className,
  ...rest
}: EmptyBlockProps) {
  const { align: resolvedAlign } = useLayoutDefaults<EmptyBlockLayoutDefaults>(
    { align: ALIGN.Horizontal },
    mergePresets(EMPTY_BLOCK_LAYOUT_PRESETS, layoutPresets),
    { align },
  );

  return (
    <Block size={BLOCK_SIZE.L} className={cn(styles.emptyBlock, className)} {...extractSupportProps(rest)}>
      <div className={styles.inner}>
        <InfoBlock
          className={styles.infoBlock}
          title={title}
          description={description}
          icon={icon}
          size={INFO_SIZE.L}
          align={resolvedAlign}
          footer={footer}
        />
      </div>
    </Block>
  );
}
