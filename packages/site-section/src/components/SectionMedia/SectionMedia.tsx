import { SiteImage, SiteImageProps, SiteVideo, SiteVideoProps, VideoPlayerProps } from '@ds/site-media';
import { ValueOf } from '@ds/utils';

import { TEST_IDS } from '../../constants';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import { MEDIA_TYPE } from './constants';
import styles from './styles.module.scss';

export type MediaType = ValueOf<typeof MEDIA_TYPE>;

/** Содержимое секции: изображение с альтернативным текстом или источник видео. */
export type SectionMediaContent =
  | (Pick<SiteImageProps, 'src' | 'alt' | 'loading'> & {
      /** Режим изображения. */
      type: typeof MEDIA_TYPE.Image;
    })
  | (VideoPlayerProps & {
      /** Режим видео. */
      type: typeof MEDIA_TYPE.Video;
    });

export type SectionMediaProps = Omit<SectionBasicProps, 'children'> &
  Pick<SiteVideoProps, 'onPlay' | 'onError'> & {
    /** Изображение или видео. Медиа занимает ширину содержимого секции с пропорцией 16:9. */
    media: SectionMediaContent;
  };

/** Секция сайта с заголовком и изображением или видео; раскладка наследуется от AdaptiveProvider. */
export function SectionMedia({ media, onPlay, onError, ...props }: SectionMediaProps) {
  return (
    <SectionBasic data-test-id={TEST_IDS.section} {...props}>
      {media.type === MEDIA_TYPE.Image ? (
        <SiteImage
          key={media.src}
          className={styles.image}
          src={media.src}
          alt={media.alt}
          onError={onError}
          loading={media.loading ?? 'lazy'}
          data-test-id={TEST_IDS.image}
        />
      ) : (
        <SiteVideo video={media} onPlay={onPlay} onError={onError} />
      )}
    </SectionBasic>
  );
}
