import { PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.XS} />
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.S} />
    </div>
  );
}
