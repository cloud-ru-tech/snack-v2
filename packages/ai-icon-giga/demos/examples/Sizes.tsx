import { AiIconGiga } from '@ds/ai-icon-giga';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiIconGiga size={24} />
      <AiIconGiga size={48} />
      <AiIconGiga size={80} />
    </div>
  );
}
