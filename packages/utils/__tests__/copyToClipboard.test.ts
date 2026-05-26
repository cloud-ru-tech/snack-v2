import { afterEach, describe, expect, it, vi } from 'vitest';

const { isBrowserMock } = vi.hoisted(() => ({
  isBrowserMock: vi.fn<() => boolean>(),
}));

vi.mock('@ds/utils', () => ({
  isBrowser: () => isBrowserMock(),
}));

import { copyToClipboard } from '../src/utils/copyToClipboard';

describe('copyToClipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    isBrowserMock.mockReset();
  });

  it('returns immediately in non-browser (SSR) and does not touch clipboard', async () => {
    isBrowserMock.mockReturnValue(false);
    const writeText = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await copyToClipboard('secret');

    expect(writeText).not.toHaveBeenCalled();
  });

  it('uses Async Clipboard API when writeText is available', async () => {
    isBrowserMock.mockReturnValue(true);
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await copyToClipboard('payload');

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('payload');
  });

  it('falls back to execCommand when writeText rejects (e.g. permission denied)', async () => {
    isBrowserMock.mockReturnValue(true);
    const writeText = vi.fn().mockRejectedValue(new Error('NotAllowedError'));
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const textarea = {
      value: '',
      setAttribute: vi.fn(),
      style: {} as Record<string, string>,
      select: vi.fn(),
    };
    const execCommand = vi.fn();
    vi.stubGlobal(
      'document',
      {
        createElement: vi.fn(() => textarea),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn(),
        },
        execCommand,
      } as unknown as Document,
    );

    await copyToClipboard('via-fallback');

    expect(writeText).toHaveBeenCalledWith('via-fallback');
    expect(textarea.value).toBe('via-fallback');
    expect(textarea.setAttribute).toHaveBeenCalledWith('readonly', '');
    expect(textarea.select).toHaveBeenCalledTimes(1);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });
});
