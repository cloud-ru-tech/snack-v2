import { WithSupportProps } from '@ds/utils';
import { ImgHTMLAttributes } from 'react';

export type SiteImageProps = WithSupportProps<
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
    /** URL изображения. */
    src: string;
    /** Альтернативный текст; пустая строка — для декоративного изображения. */
    alt: string;
  }
>;

/** Изображение с обязательными источником и альтернативным текстом. */
export function SiteImage({ src, alt, ...props }: SiteImageProps) {
  return <img src={src} alt={alt} {...props} />;
}
