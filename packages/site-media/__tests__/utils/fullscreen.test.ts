import { afterEach, describe, expect, it, vi } from 'vitest';

import { changeFullscreen } from '../../src/utils/fullscreen';

function createFullscreenContext() {
  const ownerDocument = {
    fullscreenElement: null as object | null,
    exitFullscreen: vi.fn().mockResolvedValue(undefined),
  };
  const root = {
    ownerDocument,
    requestFullscreen: vi.fn().mockResolvedValue(undefined),
  };
  const player = {
    isFullscreen: vi.fn().mockReturnValue(false),
    requestFullscreen: vi.fn().mockResolvedValue(undefined),
    exitFullscreen: vi.fn().mockResolvedValue(undefined),
  };

  return { root, player, ownerDocument, element: root as unknown as HTMLElement };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fullscreen', () => {
  it('enters fullscreen on the wrapper and exits the active native session', async () => {
    const { root, player, ownerDocument, element } = createFullscreenContext();

    await changeFullscreen(element, player);
    expect(root.requestFullscreen).toHaveBeenCalledOnce();
    expect(player.requestFullscreen).not.toHaveBeenCalled();

    ownerDocument.fullscreenElement = root;
    await changeFullscreen(element, player);
    expect(ownerDocument.exitFullscreen).toHaveBeenCalledOnce();
    expect(root.requestFullscreen).toHaveBeenCalledOnce();
  });

  it('uses video.js to enter and exit when the native API is unavailable', async () => {
    const { root, player, element } = createFullscreenContext();
    Reflect.deleteProperty(root, 'requestFullscreen');

    await changeFullscreen(element, player);
    expect(player.requestFullscreen).toHaveBeenCalledOnce();

    player.isFullscreen.mockReturnValue(true);
    await changeFullscreen(element, player);
    expect(player.exitFullscreen).toHaveBeenCalledOnce();
    expect(player.requestFullscreen).toHaveBeenCalledOnce();
  });

  it.each(['TypeError', 'NotAllowedError', 'SecurityError'])(
    'reports %s without retrying a rejected native request',
    async name => {
      const { root, player, element } = createFullscreenContext();
      const error = Object.assign(new Error('Fullscreen denied'), { name });
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      root.requestFullscreen.mockRejectedValue(error);

      await changeFullscreen(element, player);

      expect(root.requestFullscreen).toHaveBeenCalledOnce();
      expect(player.requestFullscreen).not.toHaveBeenCalled();
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('fullscreen request denied'), error);
    },
  );

  it('reports unexpected native exit failures without making another request', async () => {
    const { root, player, ownerDocument, element } = createFullscreenContext();
    const error = new Error('Exit failed');
    const report = vi.spyOn(console, 'error').mockImplementation(() => {});
    ownerDocument.fullscreenElement = root;
    ownerDocument.exitFullscreen.mockRejectedValue(error);

    await changeFullscreen(element, player);

    expect(report).toHaveBeenCalledWith(expect.stringContaining('failed to change fullscreen'), error);
    expect(root.requestFullscreen).not.toHaveBeenCalled();
    expect(player.requestFullscreen).not.toHaveBeenCalled();
  });

  it('handles rejected video.js fallback promises', async () => {
    const { root, player, element } = createFullscreenContext();
    Reflect.deleteProperty(root, 'requestFullscreen');
    const error = new Error('Fallback failed');
    const report = vi.spyOn(console, 'error').mockImplementation(() => {});
    player.requestFullscreen.mockRejectedValue(error);

    await changeFullscreen(element, player);

    expect(report).toHaveBeenCalledWith(expect.any(String), error);
    expect(player.requestFullscreen).toHaveBeenCalledOnce();
  });
});
