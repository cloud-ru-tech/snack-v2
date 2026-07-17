import { AiFieldBanner, TYPE_ORDER } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

const types = TYPE_ORDER;

export function Types() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      {types.map(type => (
        <AiFieldBanner
          key={type}
          variant={type}
          content='Description'
          actionLabel='Label text'
          icon={<PlaceholderSVG />}
        />
      ))}
    </div>
  );
}
