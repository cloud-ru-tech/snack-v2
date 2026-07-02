import { LAYOUT_TYPE, LayoutType } from '../types/layoutTypes';
import { DEVICE_TYPE, getUserAgentInfo } from './getUserAgentInfo';

/**
 * Грубый `layoutType` по user-agent (три тира: mobile / tablet / desktop).
 * Без ширины окна `desktopSmall` не выводится — для SSR-фолбэка, когда нет Client Hints.
 */
export function layoutTypeFromUserAgent(userAgent: string): LayoutType {
  const { device } = getUserAgentInfo(userAgent);

  switch (device.type) {
    case DEVICE_TYPE.Mobile:
      return LAYOUT_TYPE.Mobile;
    case DEVICE_TYPE.Tablet:
      return LAYOUT_TYPE.Tablet;
    default:
      return LAYOUT_TYPE.Desktop;
  }
}
