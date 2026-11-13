import Player from 'video.js/dist/types/player';

type FullscreenPlayer = Pick<Player, 'isFullscreen' | 'requestFullscreen' | 'exitFullscreen'>;

/** Повторный запрос требует нового действия пользователя; автоматический retry не устраняет запрет браузера. */
export async function changeFullscreen(root: HTMLElement, player: FullscreenPlayer | null) {
  const ownerDocument = root.ownerDocument;

  try {
    if (ownerDocument.fullscreenElement) {
      await ownerDocument.exitFullscreen();
      return;
    }

    if (player?.isFullscreen()) {
      await player.exitFullscreen();
      return;
    }

    if (root.requestFullscreen) {
      await root.requestFullscreen();
      return;
    }

    await player?.requestFullscreen();
  } catch (error) {
    if (error instanceof Error && ['TypeError', 'NotAllowedError', 'SecurityError'].includes(error.name)) {
      console.warn('SiteVideo: fullscreen request denied. Check browser permissions and user activation.', error);
      return;
    }

    console.error('SiteVideo: failed to change fullscreen mode.', error);
  }
}
