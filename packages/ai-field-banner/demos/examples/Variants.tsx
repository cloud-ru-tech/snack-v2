import { AiFieldBanner, VARIANT_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

const variants = VARIANT_ORDER;

export function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      {variants.map(variant => (
        <AiFieldBanner
          key={variant}
          variant={variant}
          content='Description'
          actionLabel='Label text'
          icon={<PlaceholderSVG />}
        />
      ))}
    </div>
  );
}
