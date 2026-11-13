/** Источник видео. Для YouTube и Rutube используются элементы управления провайдера. */
export type VideoPlayerProps = {
  /** URL файла MP4, плейлиста HLS, ролика YouTube или Rutube. */
  src: string;
  /** Обложка перед началом воспроизведения. */
  poster?: string;
  /** Показать управление и кнопку Play. По умолчанию `true`. */
  controls?: boolean;
  /** Автоматический запуск без звука, если разрешён браузером. */
  autoPlay?: boolean;
  /** Отключить звук. */
  muted?: boolean;
  /** Повторять видео. */
  loop?: boolean;
};
