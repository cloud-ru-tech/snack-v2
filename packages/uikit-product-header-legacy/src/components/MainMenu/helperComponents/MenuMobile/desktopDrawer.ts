import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { DrawerCustom } from '@ds/drawer';

const DesktopDrawerBase = withLayoutType(DrawerCustom, LAYOUT_TYPE.Desktop);

/** Desktop-frame drawer для mobile MainMenu: левый drawer вместо BottomSheet. */
export const DesktopDrawerCustom = Object.assign(DesktopDrawerBase, {
  Header: DrawerCustom.Header,
  Body: DrawerCustom.Body,
  Footer: DrawerCustom.Footer,
}) as typeof DesktopDrawerBase & {
  Header: typeof DrawerCustom.Header;
  Body: typeof DrawerCustom.Body;
  Footer: typeof DrawerCustom.Footer;
};
