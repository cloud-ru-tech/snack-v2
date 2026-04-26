import { APPEARANCE, ProgressBarCircle } from '@ds/progress-bar';

export function CircleAppearances() {
  return (
    <>
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Green} />
      <ProgressBarCircle progress={60} appearance={APPEARANCE.Red} />
    </>
  );
}
