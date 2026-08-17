import { AiFieldBanner, SIZE, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Mobile() {
  return (
    <AiFieldBanner
      size={SIZE.M}
      variant={VARIANT.Agentic}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
    />
  );
}
