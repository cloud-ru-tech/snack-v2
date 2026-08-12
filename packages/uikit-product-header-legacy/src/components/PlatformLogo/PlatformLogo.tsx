import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { AdvancedSVG, EvolutionSVG, VmwareSVG } from '@ds/icons/services';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentType } from 'react';

import { headerLegacyLocale } from '../../locale';
import { ICON_SIZE, TEST_IDS, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Variant } from './types';

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const SVG_BY_VARIANT: Partial<Record<Variant, IconComponent>> = {
  [VARIANT.Evolution]: EvolutionSVG,
  [VARIANT.Advanced]: AdvancedSVG,
  [VARIANT.Vmware]: VmwareSVG,
};

function isAvatarVariant(variant: Variant): variant is typeof VARIANT.Partner | typeof VARIANT.Marketplace {
  return variant === VARIANT.Partner || variant === VARIANT.Marketplace;
}

export type PlatformLogoProps = WithSupportProps<{
  /** Вариант платформы (Figma `platformSelectorIcons` / variant). */
  variant?: Variant;
  /**
   * Имя для Avatar в trigger (Figma mobile project selector).
   * При наличии рендерится Avatar вместо SVG-иконки платформы.
   */
  avatarName?: string;
  /**
   * Компактный размер для пунктов Droplist (Figma listItem icon без padding, 24×24).
   * @default false — бейдж 32×32 для trigger.
   */
  compact?: boolean;
  /** CSS-класс корневого элемента. */
  className?: string;
}>;

/**
 * Иконка платформы для legacy PlatformSelector (Figma: `platformSelectorIcons`).
 *
 * SVG-варианты (`evolution` / `advanced` / `vmware`) — accent-бейдж.
 * `partner` / `marketplace` — `@ds/avatar` squared с аббревиатурами «ПК» / «МА».
 */
export function PlatformLogo({
  variant = VARIANT.Evolution,
  avatarName,
  compact = false,
  className,
  ...rest
}: PlatformLogoProps) {
  const { t } = headerLegacyLocale.useTranslations();
  const supportProps = extractSupportProps(rest);

  if (avatarName) {
    return (
      <div
        className={className}
        data-variant={variant}
        data-compact={compact || undefined}
        data-test-id={TEST_IDS.root}
        {...supportProps}
      >
        <Avatar
          name={avatarName}
          size={compact ? SIZE.S : SIZE.M}
          shape={SHAPE.Squared}
          appearance={APPEARANCE.Neutral}
          showTwoSymbols
        />
      </div>
    );
  }

  if (isAvatarVariant(variant)) {
    return (
      <div
        className={className}
        data-variant={variant}
        data-compact={compact || undefined}
        data-test-id={TEST_IDS.root}
        {...supportProps}
      >
        <Avatar
          name={
            variant === VARIANT.Partner
              ? t('platformLogo.avatarName.partner')
              : t('platformLogo.avatarName.marketplace')
          }
          size={compact ? SIZE.S : SIZE.M}
          shape={SHAPE.Squared}
          appearance={APPEARANCE.Neutral}
          showTwoSymbols
        />
      </div>
    );
  }

  const Icon = SVG_BY_VARIANT[variant];

  return (
    <div
      className={cn(styles.root, className)}
      data-variant={variant}
      data-compact={compact || undefined}
      data-test-id={TEST_IDS.root}
      {...supportProps}
    >
      {Icon ? <Icon size={ICON_SIZE} /> : null}
    </div>
  );
}
