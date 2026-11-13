import { useEffect, useState } from 'react';

import { SPRITE_VTT_NAME } from '../constants';
import { SpriteFrame } from '../shared/types';
import { isHlsLink, loadSpriteFrames, resolveUrl } from '../utils';

export function useSpriteFrames(link: string, enabled: boolean) {
  const [frames, setFrames] = useState<SpriteFrame[]>([]);

  useEffect(() => {
    setFrames([]);

    const url = enabled && isHlsLink(link) ? resolveUrl(SPRITE_VTT_NAME, link) : undefined;

    if (!url) {
      return;
    }

    const controller = new AbortController();

    loadSpriteFrames(url, controller.signal)
      .then(result => {
        if (!controller.signal.aborted) {
          setFrames(result);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setFrames([]);
        }
      });

    return () => {
      controller.abort();
    };
  }, [link, enabled]);

  return frames;
}
