import { isMobileLayout, LayoutPresets, mergePresets, useAdaptiveLayout, useLayoutDefaults } from '@ds/adaptive';

import { DesktopDroplist } from '../../../helperComponents/DesktopDroplist';
import { MobileDroplist } from '../../../helperComponents/MobileDroplist';
import { DroplistImplProps, DroplistLayoutDefaults, DroplistProps, ReorderableDroplistProps } from '../types';

const DROPLIST_LAYOUT_PRESETS: LayoutPresets<DroplistLayoutDefaults> = { mobile: { size: 'l' } };

/** @internal Общая реализация `Droplist`/`ReorderableDroplist`: свап поверхности по раскладке. */
function DroplistImpl({
  children,
  size,
  layoutPresets,
  label,
  actionButton,
  slotAfterTitle,
  onBackButtonClick,
  ...rest
}: DroplistImplProps) {
  const { layoutType } = useAdaptiveLayout();

  const { size: resolvedSize } = useLayoutDefaults<DroplistLayoutDefaults>(
    { size: 'm' },
    mergePresets(DROPLIST_LAYOUT_PRESETS, layoutPresets),
    { size },
  );

  if (isMobileLayout(layoutType)) {
    return (
      <MobileDroplist
        {...rest}
        size={resolvedSize}
        label={label}
        actionButton={actionButton}
        slotAfterTitle={slotAfterTitle}
        onBackButtonClick={onBackButtonClick}
      >
        {children}
      </MobileDroplist>
    );
  }

  return (
    <DesktopDroplist {...rest} size={resolvedSize}>
      {children}
    </DesktopDroplist>
  );
}

/**
 * Адаптивный `Droplist`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * список (по умолчанию размера `l`) в `BottomSheet` (`MobileDroplist`), иначе — анкорный popover (`DesktopDroplist`).
 * Слоты `label` / `actionButton` / `slotAfterTitle` / `onBackButtonClick` применяются только на mobile.
 * Чтобы всегда был popover — `withLayoutType(Droplist, 'desktop')` либо вложенный
 * `<AdaptiveProvider layoutType='desktop'>`. Пропа `layoutType` у компонента нет.
 */
export function Droplist(props: DroplistProps) {
  return <DroplistImpl {...props} />;
}

Droplist.displayName = 'Droplist';

/**
 * Адаптивный `Droplist` с drag&drop-переупорядочиванием строк (см. `ReorderableList`): управляемый
 * порядок через `onItemsReorder`, модель айтемов — `ReorderItem`, виртуализации нет. Раскладку и
 * mobile-слоты берёт из `Droplist`.
 */
export function ReorderableDroplist(props: ReorderableDroplistProps) {
  return <DroplistImpl {...props} />;
}

ReorderableDroplist.displayName = 'ReorderableDroplist';
