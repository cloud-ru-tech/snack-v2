import { SIZE } from '../../constants';

export const ICON_SIZE: Record<(typeof SIZE)[keyof typeof SIZE], number> = {
  [SIZE.Xs]: 16,
  [SIZE.S]: 16,
  [SIZE.M]: 24,
};
