import { defineLocale, defineMessages } from '@ds/locale';

const SITE_MEDIA_MESSAGES = defineMessages({
  'en-GB': {
    player: 'Video player',
    play: 'Play',
    pause: 'Pause',
    mute: 'Mute',
    unmute: 'Unmute',
    volume: 'Volume',
    seek: 'Seek',
    rewind: 'Back 10 seconds',
    forward: 'Forward 10 seconds',
    restart: 'Restart',
    speed: 'Playback speed',
    enterFullscreen: 'Enter fullscreen',
    exitFullscreen: 'Exit fullscreen',
    errorTitle: 'Video unavailable',
    errorDescription: 'Check your connection or try again later.',
    retry: 'Try again',
    loading: 'Loading video',
  },
  'ru-RU': {
    player: 'Видеоплеер',
    play: 'Воспроизвести',
    pause: 'Пауза',
    mute: 'Выключить звук',
    unmute: 'Включить звук',
    volume: 'Громкость',
    seek: 'Перемотка',
    rewind: 'Назад на 10 секунд',
    forward: 'Вперёд на 10 секунд',
    restart: 'Сначала',
    speed: 'Скорость воспроизведения',
    enterFullscreen: 'На весь экран',
    exitFullscreen: 'Выйти из полноэкранного режима',
    errorTitle: 'Видео недоступно',
    errorDescription: 'Проверьте подключение или повторите попытку позже.',
    retry: 'Повторить',
    loading: 'Загрузка видео',
  },
});

export type SiteMediaMessages = (typeof SITE_MEDIA_MESSAGES)['en-GB'];

/** Переводы видеоплеера и его элементов управления. */
export const siteMediaLocale = defineLocale('@ds/site-media', SITE_MEDIA_MESSAGES);
