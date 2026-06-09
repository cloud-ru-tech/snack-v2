import { ChipAssist } from '@ds/chips';

export function AssistSizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipAssist size='s' label='Small' onClick={() => {}} />
      <ChipAssist size='m' label='Medium' onClick={() => {}} />
      <ChipAssist size='l' label='Large' onClick={() => {}} />
    </div>
  );
}
