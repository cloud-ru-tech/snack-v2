import Player from 'video.js/dist/types/player';

export function toggleMute(player: Player, isMuted: boolean, volume: number) {
  if (isMuted && volume === 0) {
    player.volume(1);
  }

  player.muted(!isMuted);
}
