import { AiShimmer, SIZE } from '@ds/ai-shimmer';

export function CustomSize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AiShimmer text='Size S (body regular)' size={SIZE.s} />
      <AiShimmer text='Size M (body regular)' size={SIZE.m} />
      <AiShimmer text='Size L (body regular)' size={SIZE.l} />
    </div>
  );
}
