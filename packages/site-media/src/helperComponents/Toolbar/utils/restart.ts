import Player from 'video.js/dist/types/player';

export function restart(player: Player, onPlaybackError: (error: unknown) => void) {
  player.currentTime(0);
  player.play()?.catch(onPlaybackError);
}
