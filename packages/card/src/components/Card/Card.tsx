import { ACRYLIC_LEVEL, BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';
import { Checkbox, SIZE as CHECKBOX_SIZE } from '@ds/toggles';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, MouseEvent, ReactElement } from 'react';

import { RADIUS, TEST_IDS, VIEW } from '../../constants';
import { CardContext } from '../../context';
import { CardProps } from '../../types';
import styles from './styles.module.scss';

const TARGET_BLANK = '_blank';

export function Card<T extends ElementType = 'div'>({
  radius = RADIUS.M,
  view = VIEW.Simple,
  backgroundPredefined = BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
  disabled = false,
  checked,
  multiSelect = false,
  interactive = true,
  children,
  className,
  as,
  innerRef,
  ...rest
}: CardProps<T>): ReactElement | null {
  const Component: ElementType = as ?? 'div';
  const supportProps = extractSupportProps(rest);
  const { appearance, level } = backgroundPredefinedFillToAcrylic(backgroundPredefined);
  const isAnchor = Component === 'a';
  // Disabled по макету теряет уровень подложки — это уровень материала, а не фон поверх акрила.
  const acrylicLevel = disabled ? ACRYLIC_LEVEL.Default : level;

  // `<a>` нативно не реагирует на `disabled` — на disabled-anchor вешаем preventDefault,
  // и санитизируем `rel` под `target='_blank'`. Остальные элементы пробрасывают `...rest` без обвязки.
  let polymorphicProps: Record<string, unknown>;
  if (isAnchor) {
    const { href, target, onClick, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'>;
    polymorphicProps = {
      ...anchorRest,
      href: href ?? '#',
      target,
      rel: target === TARGET_BLANK ? 'noopener noreferrer' : undefined,
      onClick: disabled
        ? (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onClick?.(e);
          }
        : onClick,
    };
  } else {
    polymorphicProps = rest as Record<string, unknown>;
  }

  return (
    <CardContext.Provider value={{ radius, disabled }}>
      <Component
        ref={innerRef}
        className={cn(styles.card, className)}
        data-card
        data-radius={radius}
        data-view={view}
        data-disabled={disabled || undefined}
        data-checked={checked || undefined}
        data-interactive={interactive || undefined}
        data-acrylic-appearance={appearance}
        data-acrylic-level={acrylicLevel}
        tabIndex={interactive && !disabled ? 0 : -1}
        aria-disabled={isAnchor && disabled ? true : undefined}
        {...supportProps}
        {...polymorphicProps}
      >
        {/* Порядок дочерних узлов важен: среди позиционированных братьев с z-index:auto
            более поздний в DOM рисуется поверх. Сверху вниз painting:
            acrylic (фон) → stateLayer (checked-overlay) → content → outlineBorder → checkBadge.
            Border-слой намеренно после content — Figma `stateLayer/regular/border` лежит
            поверх контента, чтобы рисовался по краю независимо от padding'а content'а. */}
        <span className={styles.acrylic} aria-hidden data-acrylic-background />
        {/* State-layer только для checked: Figma использует activated-filled overlay;
            в unchecked-состоянии stateLayer-слоя нет — hover там идёт через box-shadow. */}
        {interactive && checked && <span className={styles.stateLayer} data-state='activatedFilled' aria-hidden />}
        <div className={styles.content}>{children}</div>
        {/* Border-слой (Figma: `stateLayer/regular/border`) — overlay inset:0 поверх content'а;
            цвет переключается по data-view/data-checked родителя (см. styles.module.scss). */}
        {(view === VIEW.Outline || checked) && <span className={styles.outlineBorder} aria-hidden />}
        {checked && multiSelect && (
          <span className={styles.checkWrapper} aria-hidden>
            <Checkbox checked size={CHECKBOX_SIZE.XS} tabIndex={-1} data-test-id={TEST_IDS.checkBadge} />
          </span>
        )}
      </Component>
    </CardContext.Provider>
  );
}

Card.displayName = 'Card';
