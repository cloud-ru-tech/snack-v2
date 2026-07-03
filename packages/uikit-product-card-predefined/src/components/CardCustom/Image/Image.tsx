import { useCardContext } from '@ds/card';
import { extractSupportProps, WithSupportProps } from '@ds/utils';

import { MODE } from './constants';
import styles from './styles.module.scss';

export type ImageProps = WithSupportProps<
  {
    /** Путь до картинки */
    src: string;
    /** Описание картинки */
    alt: string;
  } & (
    | { mode?: typeof MODE.Little | typeof MODE.Middle; hideFading?: never }
    | { mode: typeof MODE.Background; hideFading?: boolean }
  )
>;

export function Image({ src, alt, mode = MODE.Little, hideFading, ...rest }: ImageProps) {
  const { radius } = useCardContext();

  return (
    <img
      {...extractSupportProps(rest)}
      src={src}
      alt={alt}
      data-mode={mode}
      data-size={radius}
      data-card-custom-image={mode !== MODE.Background || undefined}
      className={styles.image}
      data-fading={!hideFading || undefined}
    />
  );
}

Image.displayName = 'CardCustom.Image';
