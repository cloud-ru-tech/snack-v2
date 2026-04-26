import { TruncateString } from '@ds/truncate-string';

export function TruncateMiddle() {
  return (
    <div style={{ width: 220 }}>
      <TruncateString variant='middle' text='2024-quarterly-report-final-v3.pdf' />
    </div>
  );
}
