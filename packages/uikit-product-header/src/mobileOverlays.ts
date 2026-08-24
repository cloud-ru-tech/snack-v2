import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { DrawerCustom, DrawerCustomProps } from '@ds/drawer';
import { ModalCustom, ModalCustomProps } from '@ds/modal';

const MobileDrawerBase = withLayoutType(DrawerCustom, LAYOUT_TYPE.Mobile);
const MobileModalBase = withLayoutType(ModalCustom, LAYOUT_TYPE.Mobile);

/** Mobile-only drawer surface (bottom sheet). Форс раскладки через `withLayoutType`. */
export const MobileDrawerCustom = Object.assign(MobileDrawerBase, {
  Header: DrawerCustom.Header,
  Body: DrawerCustom.Body,
}) as typeof MobileDrawerBase & {
  Header: typeof DrawerCustom.Header;
  Body: typeof DrawerCustom.Body;
};

/** Mobile-only modal surface (bottom sheet). Форс раскладки через `withLayoutType`. */
export const MobileModalCustom = Object.assign(MobileModalBase, {
  Header: ModalCustom.Header,
  Body: ModalCustom.Body,
}) as typeof MobileModalBase & {
  Header: typeof ModalCustom.Header;
  Body: typeof ModalCustom.Body;
};

export type { DrawerCustomProps, ModalCustomProps };
