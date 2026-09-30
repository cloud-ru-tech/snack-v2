import { Avatar } from '@ds/avatar';
import { BaseItemProps, Droplist, DroplistProps, SNAP_POINTS_PRESET } from '@ds/list';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { useDesktopComfortClassName } from '../../hooks/useDesktopComfortClassName';
import { useMobileLayout } from '../../hooks/useMobileLayout';
import { headerLocale } from '../../locale';
import { HeaderButton } from '../HeaderButton';
import { useUserMenuItems } from './hooks/useUserMenuItems';
import styles from './styles.module.scss';
import { ThemeProps, UserProfileProps } from './types';

// Выбор темы ведёт корневой список: `value` — текущая тема, `id` опций совпадает с
// `ThemeMode`. `selection` контролируемый и без `onChange`, поэтому клики по обычным
// пунктам меню (профиль, организации, выход) состояние выбора не меняют — подсвечена
// всегда только текущая тема и ветка `Тема` над ней.
const SELECTION_STUB: DroplistProps['selection'] = { mode: 'single', value: '__empty_stub__', onChange: () => {} };

export type UserMenuProps = {
  /** Профиль пользователя (имя, email, счётчик приглашений). */
  profile?: UserProfileProps;

  /** Переключатель темы в меню. Без пропа не отображается. */
  theme?: ThemeProps;

  /** Пункты после темы. На desktop закреплены сверху вместе с профилем и темой */
  topItems?: DroplistProps['items'];

  /** Список организаций. На desktop — единственная прокручиваемая часть меню */
  organizationItems?: DroplistProps['items'];

  /** Пункты перед «Выйти из аккаунта». На desktop закреплены снизу */
  bottomItems?: DroplistProps['items'];

  /** Пункты настроек в нижней части меню. */
  settingItems?: BaseItemProps[];

  /** Колбэк клика по пункту «Выйти». */
  onLogout?(): void;

  /**
   * Открыто ли меню.
   *
   * Не передано — состояние открытия неуправляемое (меню само переключает себя по клику на кнопку).
   */
  open?: boolean;
  /** Колбэк открытия/закрытия меню. */
  setOpen?(open: boolean): void;
  /** Текст подсказки для кнопки-триггера. */
  triggerTooltip?: string;

  /** Колбэк клика по кнопке-триггеру. */
  onClick?(): void;
};

export function UserMenu({
  profile = {},
  open: openProp,
  setOpen: setOpenProp,
  onLogout,
  topItems,
  organizationItems,
  bottomItems,
  settingItems,
  theme,
  onClick,
  triggerTooltip,
}: UserMenuProps) {
  const { t } = headerLocale.useTranslations();
  const isMobile = useMobileLayout();
  const comfortClassName = useDesktopComfortClassName();

  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { fullName = '', inviteCount } = profile;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const {
    pinTop,
    items: menuItems,
    pinBottom,
  } = useUserMenuItems({
    isMobile,
    profile,
    theme,
    topItems,
    organizationItems,
    bottomItems,
    settingItems,
    onClose: handleClose,
    onLogout,
  });

  const trigger = useMemo(
    () => (
      <HeaderButton
        tooltip={{ tip: triggerTooltip }}
        isMobile={isMobile}
        onClick={() => {
          setOpen?.(true);
          onClick?.();
        }}
        counter={
          Number(inviteCount)
            ? {
                value: Number(inviteCount),
                appearance: 'primary',
              }
            : undefined
        }
        data-test-id={TEST_IDS.userMenu.button}
        icon={<Avatar appearance='red' size='s' name={fullName} showTwoSymbols />}
        data-pressed={open}
      />
    ),
    [fullName, inviteCount, onClick, open, setOpen, isMobile, triggerTooltip],
  );

  return (
    <Droplist
      open={open}
      onOpenChange={setOpen}
      size='m'
      selection={SELECTION_STUB}
      pinTop={pinTop}
      items={menuItems}
      pinBottom={pinBottom}
      scroll={!isMobile}
      trigger='click'
      placement='bottom-end'
      className={cn(styles.userMenuDroplist, comfortClassName)}
      closeOnPopstate
      data-test-id={TEST_IDS.userMenu.root}
      label={t('user')}
      snapPoints={SNAP_POINTS_PRESET.full}
      withDividers={false}
      triggerClassName={styles.userMenuDroplistTrigger}
    >
      {trigger}
    </Droplist>
  );
}
