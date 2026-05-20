import { AiSuggestionParent, CHILD_TYPE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';

export function ParentExpandable() {
  return (
    <AiSuggestionParent
      label='Label text'
      icon={<PlaceholderSVG />}
      items={[
        { label: 'Suggestion 1', icon: <PlaceholderSVG /> },
        { label: 'Suggestion 2' },
        {
          type: CHILD_TYPE.Parent,
          label: 'More',
          icon: <PlaceholderSVG />,
          items: [
            { label: 'Nested A' },
            {
              label: 'More nested',
              items: [{ label: 'Nested B' }, { label: 'Nested C' }],
            },
          ],
        },
      ]}
    />
  );
}
