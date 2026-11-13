import { useEffect, useState } from 'react';
import Player from 'video.js/dist/types/player';

export type PlayerState = {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  buffered: [number, number][];
  rate: number;
};

const INITIAL_STATE: PlayerState = {
  isPlaying: false,
  isMuted: false,
  volume: 100,
  currentTime: 0,
  duration: 0,
  buffered: [],
  rate: 1,
};

const PLAYER_EVENTS = [
  'play',
  'pause',
  'ended',
  'timeupdate',
  'durationchange',
  'loadedmetadata',
  'progress',
  'volumechange',
  'ratechange',
];

function readState(player: Player): PlayerState {
  const timeRanges = player.buffered();
  const buffered: [number, number][] = [];

  for (let index = 0; index < timeRanges.length; index++) {
    buffered.push([timeRanges.start(index), timeRanges.end(index)]);
  }

  const volume = player.volume() ?? 1;
  const duration = player.duration() ?? 0;

  return {
    isPlaying: !player.paused(),
    isMuted: Boolean(player.muted()) || volume === 0,
    volume: Math.round(volume * 100),
    currentTime: player.currentTime() ?? 0,
    duration: Number.isFinite(duration) ? duration : 0,
    buffered,
    rate: player.playbackRate() ?? 1,
  };
}

export function usePlayerState(player: Player | null) {
  const [state, setState] = useState<PlayerState>(INITIAL_STATE);

  useEffect(() => {
    if (!player) {
      setState(INITIAL_STATE);
      return;
    }

    const update = () => {
      setState(readState(player));
    };

    update();
    player.on(PLAYER_EVENTS, update);

    return () => {
      player.off(PLAYER_EVENTS, update);
    };
  }, [player]);

  return state;
}
