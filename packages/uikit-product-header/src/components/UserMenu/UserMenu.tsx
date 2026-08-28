import { Avatar } from '@ds/avatar';
import { BaseItemProps, Droplist, DroplistProps } from '@ds/list';
import { useValueControl } from '@ds/utils';
import { useMemo } from 'react';

import { TEST_IDS } from '../../constants';
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
  profile?: UserProfileProps;

  theme?: ThemeProps;

  items?: DroplistProps['items'];

  settingItems?: BaseItemProps[];

  onLogout?(): void;

  open?: boolean;
  setOpen?(open: boolean): void;
  triggerTooltip?: string;

  onClick?(): void;
};

export function UserMenu({
  profile = {},
  open: openProp,
  setOpen: setOpenProp,
  onLogout,
  items,
  settingItems,
  theme,
  onClick,
  triggerTooltip,
}: UserMenuProps) {
  const { t } = headerLocale.useTranslations();
  const isMobile = useMobileLayout();

  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { fullName = '', inviteCount } = profile;

  const userMenuItems = useUserMenuItems({
    isMobile,
    profile,
    theme,
    items,
    settingItems,
    onClose: () => {
      setOpen(false);
    },
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
      items={userMenuItems}
      trigger='click'
      placement='bottom-end'
      className={styles.userMenuDroplist}
      closeOnPopstate
      data-test-id={TEST_IDS.userMenu.root}
      label={t('user')}
    >
      {trigger}
    </Droplist>
  );
}
