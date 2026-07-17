import { AiFieldBanner, SIZE, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Mobile() {
  return (
    <AiFieldBanner
      size={SIZE.M}
      variant={TYPE.Agentic}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
    />
  );
}
