import { RADIUS, Size, useCardContext } from '@ds/card';
import { IconPredefined, IconPredefinedProps, SIZE as ICON_SIZE } from '@ds/icon-predefined';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type PictureProps = {
  src: string;
  alt: string;
};

export type EmblemProps = PictureProps | Pick<IconPredefinedProps, 'icon' | 'background' | 'appearance' | 'shape'>;

function isPictureProps(props: EmblemProps): props is PictureProps {
  return 'src' in props && 'alt' in props;
}

const ICON_SIZE_MAP: Record<Size, (typeof ICON_SIZE)[keyof typeof ICON_SIZE]> = {
  [RADIUS.S]: ICON_SIZE.M,
  [RADIUS.M]: ICON_SIZE.M,
  [RADIUS.L]: ICON_SIZE.L,
};

export function Emblem(props: EmblemProps) {
  const { radius } = useCardContext();

  if (isPictureProps(props)) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        data-size={radius}
        className={styles.img}
        data-test-id={TEST_IDS.cardCustomEmblemPicture}
      />
    );
  }

  return (
    <IconPredefined
      icon={props.icon}
      appearance={props.appearance ?? 'primary'}
      background={props.background ?? true}
      size={ICON_SIZE_MAP[radius]}
      shape={props.shape ?? 'rounded'}
      data-test-id={TEST_IDS.cardCustomEmblemIcon}
    />
  );
}
