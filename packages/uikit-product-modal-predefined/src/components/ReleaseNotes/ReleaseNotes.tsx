import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopReleaseNotes, MobileReleaseNotes } from '../../helperComponents';
import { ReleaseNotesProps } from '../../types';

/**
 * Адаптивный release-notes: на `mobile` — bottom sheet, иначе — модальное окно. Поверхность выбирается
 * по `useAdaptiveLayout()` из `@ds/adaptive` и пропом не задаётся. Форс раскладки — через
 * `withLayoutType(ReleaseNotes, 'mobile')` либо `AdaptiveProvider` в поддереве.
 */
export function ReleaseNotes(props: ReleaseNotesProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileReleaseNotes {...props} /> : <DesktopReleaseNotes {...props} />;
}
