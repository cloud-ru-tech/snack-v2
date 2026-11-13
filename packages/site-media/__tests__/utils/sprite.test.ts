import { afterEach, describe, expect, it, vi } from 'vitest';

import { findSpriteFrame, parseSpriteVtt } from '../../src/utils';

afterEach(() => vi.unstubAllGlobals());

describe('VTT previews', () => {
  it('resolves relative frames, timing fractions and sprite coordinates', () => {
    vi.stubGlobal('window', { document: { createElement: vi.fn() }, location: { href: 'https://example.com/page/' } });
    const frames = parseSpriteVtt(
      'WEBVTT\n\n00:00:01.250 --> 00:00:05.000\nthumb.jpg#xywh=10,20,160,90\n\n00:01:00,000 --> 00:01:05.000\n/thumb2.jpg#xywh=0,0,160,90',
      'https://example.com/video/player_sprite.vtt',
    );
    expect(frames).toEqual([
      { start: 1.25, imageUrl: 'https://example.com/video/thumb.jpg', x: 10, y: 20, width: 160, height: 90 },
      { start: 60, imageUrl: 'https://example.com/thumb2.jpg', x: 0, y: 0, width: 160, height: 90 },
    ]);
    expect(findSpriteFrame(frames, 0)).toBeUndefined();
    expect(findSpriteFrame(frames, 30)).toBe(frames[0]);
    expect(findSpriteFrame(frames, 61)).toBe(frames[1]);
    expect(findSpriteFrame([], 1)).toBeUndefined();
    expect(parseSpriteVtt('00:00:01.000 --> 00:00:02.000\nhttp://[#xywh=0,0,1,1', 'https://example.com/')).toEqual([]);
    expect(parseSpriteVtt('bad content', 'https://example.com/')).toEqual([]);
  });
});

it('parses CRLF, hour offsets and skips malformed coordinates', () => {
  vi.stubGlobal('window', { document: { createElement: vi.fn() }, location: { href: 'https://example.com/' } });
  const frames = parseSpriteVtt(
    'WEBVTT\r\n\r\n01:02:03.5 --> 01:02:04.000\r\n  /sprite.jpg#xywh=0,10,160,90  \r\n\r\n01:02:04.000 --> 01:02:05.000\r\nsprite.jpg#xywh=broken',
    'https://example.com/video/player_sprite.vtt',
  );
  expect(frames).toEqual([
    { start: 3723.5, imageUrl: 'https://example.com/sprite.jpg', x: 0, y: 10, width: 160, height: 90 },
  ]);
  expect(findSpriteFrame(frames, 3723.5)).toBe(frames[0]);
});

it.each([
  ['00:00:01.000 --> 00:00:02.000', 'sprite.jpg#xywh=0,0,160'],
  ['00:00:01.000 --> 00:00:02.000', 'sprite.jpg#xywh=-1,0,160,90'],
  ['00:00:01.000 --> 00:00:02.000', 'sprite.jpg#xywh=0,0,160,90extra'],
  ['00:00:01.000 --> 00:00:02.000', '#xywh=0,0,160,90'],
  ['invalid timing', 'sprite.jpg#xywh=0,0,160,90'],
  ['00:00:01.000 --> 00:00:02.000', ''],
])('skips malformed cues and keeps subsequent valid frames: %s / %s', (timing, image) => {
  vi.stubGlobal('window', { document: { createElement: vi.fn() }, location: { href: 'https://example.com/' } });

  const vtt = `${timing}\n${image}\n\n00:00:02.000 --> 00:00:03.000\nsprite.jpg#xywh=0,0,160,90`;

  expect(parseSpriteVtt(vtt, 'https://example.com/video/sprite.vtt')).toEqual([
    { start: 2, imageUrl: 'https://example.com/video/sprite.jpg', x: 0, y: 0, width: 160, height: 90 },
  ]);
});
