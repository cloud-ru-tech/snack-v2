import { APPEARANCE, ProgressBarCircle } from '@ds/progress-bar';

export function CircleAppearances() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Green} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Red} />
    </div>
  );
}
