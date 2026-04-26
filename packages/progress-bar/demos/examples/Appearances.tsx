import { APPEARANCE, ProgressBar } from '@ds/progress-bar';

export function Appearances() {
  return (
    <>
      <ProgressBar progress={60} appearance={APPEARANCE.Primary} />
      <ProgressBar progress={60} appearance={APPEARANCE.Green} />
      <ProgressBar progress={60} appearance={APPEARANCE.Red} />
    </>
  );
}
