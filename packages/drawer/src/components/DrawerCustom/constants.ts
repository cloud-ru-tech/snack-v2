import { DrawerProps } from '@rc-component/drawer';

export const maskMotion: DrawerProps['maskMotion'] = {
  motionAppear: true,
  motionName: 'maskMotion',
};

export const motion: DrawerProps['motion'] = placement => ({
  motionAppear: true,
  motionDeadline: 300,
  motionName: `panelMotion-${placement}`,
});

export const motionProps: Partial<DrawerProps> = {
  maskMotion,
  motion,
};
