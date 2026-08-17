import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Default() {
  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
