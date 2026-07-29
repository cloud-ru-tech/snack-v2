import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { AiToolBadgeType } from '../../types';
import { AI_TOOL_BADGE_GLYPHS } from './icons';
import styles from './styles.module.scss';

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type AiToolBadgeOwnProps<T extends ElementType = 'span'> = {
  /** Тип бейджа — определяет встроенную иконку (`cloud-ru` / `other`). Без него иконка не рендерится. */
  badgeType?: AiToolBadgeType;
  /** Текст бейджа (одна строка с ellipsis). */
  label?: ReactNode;
  /** Полиморфный тег корня (`'a'` для ссылки и т.д.). По умолчанию `'span'`. */
  as?: T;
  /** Ref на корневой элемент (вместо `forwardRef`). */
  innerRef?: PolymorphicRef<T>;
  /** Доп. класс корня. */
  className?: string;
};

/**
 * Публичный props компонента `AiToolBadge`.
 *
 * Презентационный бейдж-пилюля для ресурсов внутри содержимого инструмента:
 * встроенная иконка по `badgeType` + текст. Полиморфен через `as` — например
 * `as='a'` с `href` для ссылки на ресурс.
 */
export type AiToolBadgeProps<T extends ElementType = 'span'> = WithSupportProps<
  AiToolBadgeOwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof AiToolBadgeOwnProps<T>>
>;

export function AiToolBadge<T extends ElementType = 'span'>({
  badgeType,
  label,
  as,
  innerRef,
  className,
  'data-test-id': dataTestId = TEST_IDS.badge,
  ...rest
}: AiToolBadgeProps<T>): ReactElement {
  const Component = (as || 'span') as ElementType;
  const Glyph = badgeType ? AI_TOOL_BADGE_GLYPHS[badgeType] : null;

  // Ссылка в новой вкладке без rel уязвима к reverse tabnabbing — проставляем безопасный rel.
  const restProps = rest as Record<string, unknown>;
  const needsSafeRel = restProps.target === '_blank' && restProps.rel == null;

  return (
    <Component
      {...rest}
      {...(needsSafeRel ? { rel: 'noopener noreferrer' } : {})}
      ref={innerRef}
      className={cn(styles.root, className)}
      data-badge-type={badgeType}
      data-test-id={dataTestId}
    >
      {Glyph && <Glyph className={styles.icon} data-test-id={TEST_IDS.badgeIcon} />}
      {label && <span className={styles.label}>{label}</span>}
    </Component>
  );
}

withInnerRefSupport(AiToolBadge);
