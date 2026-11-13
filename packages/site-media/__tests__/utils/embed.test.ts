import { describe, expect, it } from 'vitest';

import { getEmbedPlaying, getEmbedSource, parseEmbedMessage } from '../../src/utils';

describe('video source parsing', () => {
  it.each([
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    'https://youtu.be/aqz-KE-bpKQ',
    'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ',
    'https://m.youtube.com/shorts/aqz-KE-bpKQ',
    'https://youtube.com/embed/aqz-KE-bpKQ',
    'https://youtu.be/aqz-KE-bpKQ?t=30',
  ])('recognizes YouTube: %s', source => {
    expect(getEmbedSource(source)).toEqual({
      provider: 'youtube',
      src: 'https://www.youtube.com/embed/aqz-KE-bpKQ?enablejsapi=1&playsinline=1',
    });
  });
  it.each(['https://rutube.ru/video/123abc/', 'https://www.rutube.ru/play/embed/123abc'])(
    'recognizes Rutube: %s',
    source => {
      expect(getEmbedSource(source)).toEqual({ provider: 'rutube', src: 'https://rutube.ru/play/embed/123abc' });
    },
  );
  it.each([
    '/local.mp4',
    'javascript:alert(1)',
    'ftp://youtube.com/watch?v=aqz-KE-bpKQ',
    'https://youtube.com.evil.test/watch?v=aqz-KE-bpKQ',
    'https://example.com/?url=youtube.com/watch?v=aqz-KE-bpKQ',
    'https://youtube.com/watch?v=bad',
    'https://rutube.ru/',
    'https://youtube.com/',
    'https://youtu.be/aqz-KE-bpKQextra',
    'https://youtube.com/watch?v=aqz!KE-bpKQ',
    'https://youtube.com/watch?v=',
    'https://youtube.com/shorts/',
    'https://youtu.be/',
    'https://evil.test/rutube.ru/video/123',
    'https://rutube.ru/play/embed/',
  ])('does not mistake unsupported URLs for embeds: %s', source => {
    expect(getEmbedSource(source)).toBeUndefined();
  });
});

describe('embed messages', () => {
  it('narrows JSON and object messages', () => {
    expect(parseEmbedMessage('{"event":"ready"}')).toEqual({ event: 'ready' });
    expect(parseEmbedMessage({ event: 'ready' })).toEqual({ event: 'ready' });
    for (const value of ['invalid', 'null', '[]', null, undefined, 1]) expect(parseEmbedMessage(value)).toBeUndefined();
  });
  it('recognizes provider playback events without treating buffering as pause', () => {
    expect(getEmbedPlaying('youtube', { event: 'onStateChange', info: 1 })).toBe(true);
    expect(getEmbedPlaying('youtube', { event: 'infoDelivery', info: { playerState: 2 } })).toBe(false);
    expect(getEmbedPlaying('youtube', { event: 'onStateChange', info: 0 })).toBe(false);
    expect(getEmbedPlaying('youtube', { event: 'onStateChange', info: 3 })).toBeUndefined();
    expect(getEmbedPlaying('rutube', { type: 'player:changeState', data: { state: 'playing' } })).toBe(true);
    expect(getEmbedPlaying('rutube', { type: 'player:changeState', data: { state: 'paused' } })).toBe(false);
    expect(getEmbedPlaying('rutube', { type: 'player:changeState', data: { state: 'stopped' } })).toBe(false);
    expect(getEmbedPlaying('rutube', { type: 'player:changeState', data: { state: 'buffering' } })).toBeUndefined();
    expect(getEmbedPlaying('youtube', { event: 'other' })).toBeUndefined();
    expect(getEmbedPlaying('rutube', { type: 'player:changeState' })).toBeUndefined();
  });
});
