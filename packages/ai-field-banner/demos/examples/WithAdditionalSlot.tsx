import { AiFieldBanner, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons';

export function WithAdditionalSlot() {
  return (
    <AiFieldBanner
      variant={TYPE.Information}
      description='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    >
      Additional content
    </AiFieldBanner>
  );
}
