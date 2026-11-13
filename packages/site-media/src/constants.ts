export const SPRITE_VTT_NAME = 'player_sprite.vtt';

export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const SEEK_STEP = 10;

export const TOOLBAR_HIDE_DELAY = 2000;

export const DOUBLE_CLICK_DELAY = 200;

/** Стабильные идентификаторы секции и элементов плеера. */
export const TEST_IDS = {
  root: 'site-video',
  poster: 'site-video__poster',
  player: 'site-video__player',
  mount: 'site-video__mount',
  nativeVideo: 'site-video__native-video',
  embed: 'site-video__embed',
  playButton: 'site-video__play',
  toolbar: 'site-video__toolbar',
  timeline: 'site-video__timeline',
  play: 'site-video__toolbar-play',
  mute: 'site-video__mute',
  volume: 'site-video__volume',
  rewind: 'site-video__rewind',
  forward: 'site-video__forward',
  restart: 'site-video__restart',
  time: 'site-video__time',
  speed: 'site-video__speed',
  speedMenu: 'site-video__speed-menu',
  speedOption: 'site-video__speed-option',
  fullscreen: 'site-video__fullscreen',
  error: 'site-video__error',
  retry: 'site-video__retry',
  preview: 'site-video__preview',
} as const;
