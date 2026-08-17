import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function WithBottomContent() {
  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Description'
      bottomContent='Additional content'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
