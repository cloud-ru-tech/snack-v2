import Player from 'video.js/dist/types/player';

export function setVolume(player: Player, value: number | number[]) {
  if (typeof value !== 'number') {
    return;
  }

  player.volume(value / 100);
  player.muted(value === 0);
}
