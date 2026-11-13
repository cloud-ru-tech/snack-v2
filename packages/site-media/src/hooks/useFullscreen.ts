import { isBrowser } from '@ds/utils';
import { RefObject, useCallback, useEffect, useState } from 'react';
import Player from 'video.js/dist/types/player';

import { changeFullscreen } from '../utils/fullscreen';

export function useFullscreen(rootRef: RefObject<HTMLElement>, player: Player | null) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ownerDocument = root.ownerDocument;
    const update = () => {
      setIsFullscreen(ownerDocument.fullscreenElement === root || Boolean(player?.isFullscreen()));
    };

    update();
    ownerDocument.addEventListener('fullscreenchange', update);
    player?.on('fullscreenchange', update);

    return () => {
      ownerDocument.removeEventListener('fullscreenchange', update);
      player?.off('fullscreenchange', update);
    };
  }, [rootRef, player]);

  const toggleFullscreen = useCallback(() => {
    if (isBrowser() && rootRef.current) {
      changeFullscreen(rootRef.current, player);
    }
  }, [rootRef, player]);

  return { isFullscreen, toggleFullscreen };
}
