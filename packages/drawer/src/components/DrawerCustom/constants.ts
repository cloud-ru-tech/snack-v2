import { DrawerProps } from '@rc-component/drawer';

import styles from './styles.module.scss';

export const maskMotion: DrawerProps['maskMotion'] = {
  motionAppear: true,
  motionName: styles.maskMotionName,
};

export const motion: DrawerProps['motion'] = placement => ({
  motionAppear: true,
  motionDeadline: 300,
  motionName: `${styles.panelMotionName}-${placement}`,
});

export const motionProps: Partial<DrawerProps> = {
  maskMotion,
  motion,
};
