import Player from 'video.js/dist/types/player';

export function seek(player: Player, currentTime: number, duration: number, offset: number) {
  player.currentTime(Math.min(duration, Math.max(0, currentTime + offset)));
}
