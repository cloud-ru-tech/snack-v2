import { AiFieldBanner, SIZE, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons';

export function Mobile() {
  return (
    <AiFieldBanner
      size={SIZE.M}
      variant={TYPE.Agentic}
      description='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
    />
  );
}
