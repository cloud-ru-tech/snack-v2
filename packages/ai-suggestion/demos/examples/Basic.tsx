import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';

export function Basic() {
  return (
    <AiSuggestionSimple label='Label text' icon={<PlaceholderSVG />} appearance={APPEARANCE.Primary} size={SIZE.M} />
  );
}
