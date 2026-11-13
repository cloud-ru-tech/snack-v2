import { KeyboardEvent, PointerEvent, useState } from 'react';
import Player from 'video.js/dist/types/player';

import { TimelinePosition } from '../types';
import { getTimeByKey, getTimeByPointer } from '../utils';

export function useTimeline(player: Player, currentTime: number, duration: number) {
  const [hover, setHover] = useState<TimelinePosition | null>(null);

  const getPosition = (event: PointerEvent<HTMLDivElement>) =>
    getTimeByPointer(event.clientX, event.currentTarget.getBoundingClientRect(), duration);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    player.currentTime(getPosition(event).time);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const position = getPosition(event);
    setHover(position);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      player.currentTime(position.time);
    }
  };

  const handlePointerLeave = () => {
    setHover(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = getTimeByKey(event.key, currentTime, duration);

    if (next === undefined) {
      return;
    }

    event.preventDefault();
    player.currentTime(next);
  };

  return { hover, handlePointerDown, handlePointerMove, handlePointerLeave, handleKeyDown };
}
