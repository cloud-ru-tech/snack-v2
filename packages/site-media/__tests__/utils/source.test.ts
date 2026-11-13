import { createElement } from 'react';
import { expect, it } from 'vitest';

import { getSourceType, isHlsLink, isVideoPlayerContent } from '../../src/utils';

it('detects signed HLS URLs and native sources', () => {
  expect(isHlsLink('https://example.com/a.M3U8?token=x#fragment')).toBe(true);
  expect(isHlsLink('https://example.com/a.m3u8.mp4')).toBe(false);
  expect(getSourceType('/a.m3u8')).toBe('application/x-mpegURL');
  expect(getSourceType('/a.mp4')).toBe('video/mp4');
  expect(isVideoPlayerContent({ src: '/a.mp4' })).toBe(true);
  expect(isVideoPlayerContent(null)).toBe(false);
  expect(isVideoPlayerContent(undefined)).toBe(false);
  expect(isVideoPlayerContent('video')).toBe(false);
  expect(isVideoPlayerContent(createElement('video'))).toBe(false);
});
it.each([
  ['/video.m3u8', true],
  ['/video.M3U8#fragment', true],
  ['/video.m3u8?token=a', true],
  ['/video.m3u8/segment.ts', false],
  ['/video.m3u8.mp4', false],
  ['/video.mp4?format=m3u8', false],
])('detects HLS by the URL pathname: %s', (url, expected) => {
  expect(isHlsLink(url)).toBe(expected);
});
