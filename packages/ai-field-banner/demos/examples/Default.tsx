import { AiFieldBanner, TYPE } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function Default() {
  return (
    <AiFieldBanner
      variant={TYPE.Information}
      content='Description'
      actionLabel='Label text'
      icon={<PlaceholderSVG />}
      onActionClick={() => undefined}
    />
  );
}
