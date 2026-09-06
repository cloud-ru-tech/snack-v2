import { ImageSVG } from '@ds/icons/interface/system';
import { Markdown } from '@ds/markdown';
import { BAR_HIDE_STRATEGY, Scroll } from '@ds/scroll';
import { Skeleton } from '@ds/skeleton';
import { Typography } from '@ds/typography';
import { useCallback, useState } from 'react';

import { MEDIA_STATUS, SURFACE, TEST_IDS } from '../../constants';
import { MediaStatus, NoteItemProps, Surface } from '../../types';
import styles from './styles.module.scss';

/** Размер иконки-заглушки в медиа-слоте, когда иллюстрация не загрузилась. */
const FALLBACK_ICON_SIZE = 48;

type NoteItemComponentProps = NoteItemProps & {
  surface?: Surface;
};

/**
 * Медиа-слот новости: иллюстрация или видео. Размеры слота задаёт разметка, а не intrinsic-размер
 * файла, поэтому загрузка не меняет раскладку карточки. До готовности файла слот занят скелетоном,
 * при ошибке загрузки — заглушкой с иконкой.
 */
function NoteItemMedia({ image, video }: Pick<NoteItemProps, 'image' | 'video'>) {
  const [imageStatus, setImageStatus] = useState<MediaStatus>(MEDIA_STATUS.Pending);
  const [videoStatus, setVideoStatus] = useState<MediaStatus>(MEDIA_STATUS.Pending);

  // При ошибке видео отображается статичная иллюстрация, и состояние слота определяет уже она.
  const withVideo = Boolean(video) && videoStatus !== MEDIA_STATUS.Error;
  const status = withVideo ? videoStatus : imageStatus;

  // Изображение из кеша может завершить загрузку до подписки на `onLoad` — состояние снимается с узла.
  const handleImageRef = useCallback((node: HTMLImageElement | null) => {
    if (!node?.complete || !node.getAttribute('src')) {
      return;
    }

    setImageStatus(node.naturalWidth > 0 ? MEDIA_STATUS.Ready : MEDIA_STATUS.Error);
  }, []);

  const handleImageLoad = useCallback(() => setImageStatus(MEDIA_STATUS.Ready), []);
  const handleImageError = useCallback(() => setImageStatus(MEDIA_STATUS.Error), []);
  const handleVideoLoad = useCallback(() => setVideoStatus(MEDIA_STATUS.Ready), []);
  const handleVideoError = useCallback(() => setVideoStatus(MEDIA_STATUS.Error), []);

  return (
    <div className={styles.media} data-status={status} data-test-id={TEST_IDS.releaseNotesMedia}>
      {withVideo ? (
        <video
          className={styles.file}
          src={video}
          muted
          loop
          playsInline
          autoPlay
          aria-hidden
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          data-test-id={TEST_IDS.releaseNotesVideo}
        />
      ) : (
        // При ошибке `<img>` не рендерится: иначе поверх заглушки остаётся превью браузера с alt-текстом.
        status !== MEDIA_STATUS.Error && (
          <img
            ref={handleImageRef}
            className={styles.file}
            src={image.src}
            alt={image.alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            data-test-id={TEST_IDS.releaseNotesImage}
          />
        )
      )}

      {status === MEDIA_STATUS.Pending && (
        <div className={styles.mediaOverlay} aria-hidden>
          <Skeleton loading width='100%' height='100%' />
        </div>
      )}

      {status === MEDIA_STATUS.Error && (
        <div
          className={styles.mediaOverlay}
          role='img'
          aria-label={image.alt}
          data-test-id={TEST_IDS.releaseNotesMediaFallback}
        >
          <ImageSVG className={styles.mediaFallbackIcon} size={FALLBACK_ICON_SIZE} />
        </div>
      )}
    </div>
  );
}

export function NoteItem({ title, description, image, video, surface = SURFACE.Modal }: NoteItemComponentProps) {
  return (
    <article className={styles.root} data-surface={surface} data-test-id={TEST_IDS.releaseNotesItem}>
      {/* `key` по источнику: карусель переиспользует слайд, а состояние загрузки относится к файлу. */}
      <NoteItemMedia key={`${video ?? ''}|${image.src}`} image={image} video={video} />

      <div className={styles.content}>
        <Typography className={styles.title} variant='title' size='l'>
          {title}
        </Typography>

        <Scroll className={styles.description} barHideStrategy={BAR_HIDE_STRATEGY.Leave}>
          <Markdown value={description} />
        </Scroll>
      </div>
    </article>
  );
}
