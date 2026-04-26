import { PROGRESS_BAR_SIZE, ProgressBar } from '@ds/progress-bar';

export function Sizes() {
  return (
    <>
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.XS} />
      <ProgressBar progress={40} size={PROGRESS_BAR_SIZE.S} />
    </>
  );
}
