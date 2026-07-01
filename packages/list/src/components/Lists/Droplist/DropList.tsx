import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopDroplist } from '../../../helperComponents/DesktopDroplist';
import { MobileDroplist } from '../../../helperComponents/MobileDroplist';
import { DroplistProps } from '../types';

/**
 * Адаптивный `Droplist`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * список (size `l`) в `BottomSheet` (`MobileDroplist`), иначе — анкорный popover (`DesktopDroplist`).
 * Слоты `label` / `actionButton` / `slotAfterHeadline` / `onBackButtonClick` применяются только на mobile.
 * Чтобы всегда был popover — `withLayoutType(Droplist, 'desktop')` либо вложенный
 * `<AdaptiveProvider layoutType='desktop'>`. Пропа `layoutType` у компонента нет.
 */
export function Droplist({
  children,
  // `size` относится только к desktop-popover: MobileDroplist фиксирует size `l` (макет mobile).
  // Не пробрасываем его в MobileDroplist, иначе `...rest` перебил бы `size='l'` внутри списка.
  size,
  label,
  actionButton,
  slotAfterHeadline,
  onBackButtonClick,
  ...rest
}: DroplistProps) {
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

Droplist.displayName = 'Droplist';
