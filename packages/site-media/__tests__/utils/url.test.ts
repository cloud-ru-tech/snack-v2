import { afterEach, expect, it, vi } from 'vitest';

import { resolveUrl } from '../../src/utils';
afterEach(() => vi.unstubAllGlobals());
it('resolves paths against the media URL and rejects invalid URLs', () => {
  vi.stubGlobal('window', { document: { createElement: vi.fn() }, location: { href: 'https://example.com/page/' } });
  expect(resolveUrl('thumb.jpg', '/video/player_sprite.vtt')).toBe('https://example.com/video/thumb.jpg');
  expect(resolveUrl('thumb.jpg', 'http://[')).toBeUndefined();
});
it('does not access browser globals during SSR', () => {
  vi.stubGlobal('window', undefined);
  expect(resolveUrl('thumb.jpg', '/video/')).toBeUndefined();
});
