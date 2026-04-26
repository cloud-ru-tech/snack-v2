import { APPEARANCE, ProgressBar } from '@ds/progress-bar';

export function Appearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBar progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBar progress={60} appearance={APPEARANCE.Green} />
      <ProgressBar progress={60} appearance={APPEARANCE.Red} />
    </div>
  );
}
