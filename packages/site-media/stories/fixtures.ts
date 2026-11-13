import { SOURCES as DEMO_SOURCES } from '../demos/fixtures';
import poster from './assets/poster.webp?url';
import video from './assets/sample.mp4?url';

// Короткий фрагмент ролика из demos/fixtures, чтобы стори и тесты работали без CDN.
export const POSTER = poster;
export const SAMPLE_VIDEO = video;
export const VIDEO = { src: SAMPLE_VIDEO, poster: POSTER, controls: true };
export const SOURCES = { ...DEMO_SOURCES, mp4: SAMPLE_VIDEO };
