import { afterEach, expect, it, vi } from 'vitest';

import { loadSpriteFrames } from '../../src/utils';

afterEach(() => vi.unstubAllGlobals());

it('uses an abortable request and parses successful VTT responses', async () => {
  vi.stubGlobal('window', { document: { createElement: vi.fn() }, location: { href: 'https://example.com/' } });
  const request = vi.fn().mockResolvedValue({
    ok: true,
    text: async () => 'WEBVTT\n\n00:00:01.250 --> 00:00:05.000\nthumb.jpg#xywh=10,20,160,90',
  });
  vi.stubGlobal('fetch', request);

  const signal = new AbortController().signal;

  expect(await loadSpriteFrames('https://example.com/video/sprite.vtt', signal)).toEqual([
    { start: 1.25, imageUrl: 'https://example.com/video/thumb.jpg', x: 10, y: 20, width: 160, height: 90 },
  ]);
  expect(request).toHaveBeenCalledWith('https://example.com/video/sprite.vtt', { signal });
});

it('treats missing optional previews as empty', async () => {
  const readBody = vi.fn();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, text: readBody }));

  expect(await loadSpriteFrames('/missing.vtt', new AbortController().signal)).toEqual([]);
  expect(readBody).not.toHaveBeenCalled();
});

it('propagates network errors to the hook', async () => {
  const error = new TypeError('Failed to fetch');
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));

  await expect(loadSpriteFrames('/sprite.vtt', new AbortController().signal)).rejects.toBe(error);
});

it('propagates cancellation to the hook', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')));
  await expect(loadSpriteFrames('/sprite.vtt', new AbortController().signal)).rejects.toHaveProperty(
    'name',
    'AbortError',
  );
});
