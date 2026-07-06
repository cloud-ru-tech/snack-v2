import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopDroplist } from '../../../helperComponents/DesktopDroplist';
import { MobileDroplist } from '../../../helperComponents/MobileDroplist';
import { DroplistImplProps, DroplistProps, ReorderableDroplistProps } from '../types';

/** @internal Общая реализация `Droplist`/`ReorderableDroplist`: свап поверхности по раскладке. */
function DroplistImpl({
  children,
  size = 'm',
  label,
  actionButton,
  slotAfterHeadline,
  onBackButtonClick,
  ...rest
}: DroplistImplProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return (
      <MobileDroplist
        {...rest}
        label={label}
        actionButton={actionButton}
        slotAfterHeadline={slotAfterHeadline}
        onBackButtonClick={onBackButtonClick}
      >
        {children}
      </MobileDroplist>
    );
  }

  return (
    <DesktopDroplist {...rest} size={size}>
      {children}
    </DesktopDroplist>
  );
}

/**
 * Адаптивный `Droplist`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * список (size `l`) в `BottomSheet` (`MobileDroplist`), иначе — анкорный popover (`DesktopDroplist`).
 * Слоты `label` / `actionButton` / `slotAfterHeadline` / `onBackButtonClick` применяются только на mobile.
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
