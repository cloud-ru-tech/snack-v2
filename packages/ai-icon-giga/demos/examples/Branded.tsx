import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';

export function Branded() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiIconGiga variant={VARIANT.LogoLight} />
      <AiIconGiga variant={VARIANT.LogoDark} />
    </div>
  );
}
