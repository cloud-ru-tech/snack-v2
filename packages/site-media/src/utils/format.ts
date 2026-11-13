export function formatTime(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = String(seconds % 60).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${restSeconds}`;
  }

  return `${minutes}:${restSeconds}`;
}

export function formatRate(rate: number) {
  return `${String(rate).replace('.', ',')}x`;
}
