import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { ChevronDownSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps, ItemId } from '@ds/list';
import { extractSupportProps, useValueControl, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { PlatformLogo, VARIANT, type Variant } from '../../../../src/components/PlatformLogo';
import { CHEVRON_SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type PlatformSelectorProps = WithSupportProps<{
  /** Название выбранной платформы (нижняя строка, Figma `platformName`). */
  label: string;
  /** Подпись категории (верхняя строка, Figma `description`). */
  description: string;
  /** Вариант иконки платформы (Figma `platformSelectorIcons` / variant). */
  variant?: Variant;
  /**
   * Имя для Avatar в trigger (Figma mobile project selector).
   * При наличии рендерится Avatar вместо SVG-иконки платформы.
   */
  avatarName?: string;
  /**
   * Пункты выпадающего списка (`@ds/list` Droplist).
   * Без `items` рендерится только trigger (как ProductSelect без выбора).
   * На mobile список открывается в `BottomSheet` (поверхность адаптивного Droplist).
   */
  items?: DroplistProps['items'];
  /** Id выбранного пункта (controlled selection). */
  value?: ItemId;
  /** Колбек выбора пункта списка. */
  onChange?(value: ItemId): void;
  /** Controlled open дроплиста / BottomSheet. */
  open?: boolean;
  /** Колбек изменения open дроплиста / BottomSheet. */
  onOpenChange?(open: boolean): void;
  /** CSS-класс корневой кнопки. */
  className?: string;
  /** Отключённое состояние. */
  disabled?: boolean;
  /** Обработчик клика по trigger. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Селектор платформ (Figma: `navigationOldPlatformSelector` / `navigationOldPlatformSelectorMobile`).
 *
 * Trigger: `PlatformLogo` + description/label + chevron (в open — рамка + chevron вверх).
 * Раскладку берёт из `AdaptiveProvider`: на mobile — высота trigger 56px (Figma 11755:234419).
 * При передаче `items` — адаптивный `@ds/list` Droplist: desktop popover (`widthStrategy='eq'`),
 * mobile — список в `BottomSheet`.
 */
export function PlatformSelector({
  label,
  description,
  variant = VARIANT.Evolution,
  avatarName,
  items,
  value,
  onChange,
  open: openProp,
  onOpenChange,
  className,
  disabled = false,
  onClick,
  ...rest
}: PlatformSelectorProps) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (disabled) {
      return;
    }

    onClick?.(event);
  };

  const trigger = (
    <button
      type='button'
      data-test-id={TEST_IDS.root}
      {...extractSupportProps(rest)}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-mobile={isMobile || undefined}
      data-disabled={disabled || undefined}
      data-open={open || undefined}
      disabled={disabled}
      aria-expanded={items?.length ? open : undefined}
      aria-haspopup={items?.length ? 'listbox' : undefined}
      onClick={handleClick}
    >
      <span className={styles.stateLayer} aria-hidden data-state='regularFilled' />

      <span className={styles.content}>
        <PlatformLogo variant={variant} avatarName={avatarName} data-test-id={TEST_IDS.logo} />

        <span className={styles.text}>
          <span className={styles.description} data-test-id={TEST_IDS.description}>
            {description}
          </span>
          <span className={styles.label} data-test-id={TEST_IDS.label}>
            {label}
          </span>
        </span>

        <span className={styles.chevron} aria-hidden data-test-id={TEST_IDS.chevron}>
          <ChevronDownSVG size={CHEVRON_SIZE} />
        </span>
      </span>
    </button>
  );

  if (!items?.length || disabled) {
    return trigger;
  }

  return (
    <Droplist
      open={open}
      onOpenChange={setOpen}
      items={items}
      size='m'
      selection={
        value !== undefined
          ? {
              mode: 'single',
              value,
              onChange,
            }
          : undefined
      }
      closeDroplistOnItemClick
      closeOnPopstate
      trigger='click'
      placement='bottom-start'
      widthStrategy='eq'
      scrollToSelectedItem
      triggerClassName={styles.triggerWrap}
      label={description}
      data-test-id={TEST_IDS.droplist}
    >
      {trigger}
    </Droplist>
  );
}
