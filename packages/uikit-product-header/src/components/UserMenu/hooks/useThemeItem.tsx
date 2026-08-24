import { DaySVG, LaptopPhoneSVG, NightSVG, ThemeContrastSVG } from '@ds/icons/interface/system';
import { DroplistProps } from '@ds/list';
import { useCallback, useMemo } from 'react';

import { TEST_IDS } from '../../../constants';
import { headerLocale } from '../../../locale';
import { THEME_MODE, ThemeMode, ThemeProps } from '../types';

export function useThemeItem({
  value: themeMode,
  onChange,
  isMobile,
  onClose,
}: ThemeProps & { isMobile?: boolean; onClose?(): void }): DroplistProps['items'][0] {
  const { t } = headerLocale.useTranslations();

  const handleClick = useCallback(
    (themeMode: ThemeMode) => () => {
      onChange?.(themeMode);
      !isMobile && onClose?.();
    },
    [isMobile, onChange, onClose],
  );

  const themeModeOptions = useMemo(
    () => [
      {
        beforeContent: <DaySVG />,
        content: {
          label: t('themeModeLight'),
        },
        onClick: handleClick(THEME_MODE.Light),
        checked: themeMode === THEME_MODE.Light,
        'data-test-id': TEST_IDS.userMenu.themeModeLight,
      },
      {
        beforeContent: <NightSVG />,
        content: {
          label: t('themeModeDark'),
        },
        checked: themeMode === THEME_MODE.Dark,
        onClick: handleClick(THEME_MODE.Dark),
        'data-test-id': TEST_IDS.userMenu.themeModeDark,
      },
      {
        beforeContent: <LaptopPhoneSVG />,
        content: {
          label: t('themeModeSystem'),
        },
        checked: themeMode === THEME_MODE.System,
        onClick: handleClick(THEME_MODE.System),
        'data-test-id': TEST_IDS.userMenu.themeModeSystem,
      },
    ],
    [handleClick, t, themeMode],
  );

  return useMemo(
    () => ({
      type: 'next-list',
      content: {
        label: t('themeModeLabel'),
      },
      placement: 'left-start',
      beforeContent: <ThemeContrastSVG />,
      'data-test-id': TEST_IDS.userMenu.themeMode,
      items: themeModeOptions,
    }),
    [t, themeModeOptions],
  );
}
