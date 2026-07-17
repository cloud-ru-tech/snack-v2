import { AiSuggestionParent, CHILD_TYPE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons/interface/system';

export function NestedParent() {
  return (
    <AiSuggestionParent
      label='Label text'
      icon={<PlaceholderSVG />}
      size={SIZE.S}
      items={[
        { label: 'Simple suggestion A' },
        {
          type: CHILD_TYPE.Parent,
          key: 'group-a',
          label: 'Group A',
          icon: <PlaceholderSVG />,
          items: [{ label: 'A 1' }, { label: 'A 2' }],
        },
        {
          type: CHILD_TYPE.Parent,
          key: 'group-b',
          label: 'Group B',
          icon: <PlaceholderSVG />,
          items: [
            { label: 'B 1' },
            {
              type: CHILD_TYPE.Parent,
              key: 'group-b-2',
              label: 'Group B.2',
              icon: <PlaceholderSVG />,
              items: [{ label: 'B 2.1' }],
            },
          ],
        },
      ]}
    />
  );
}
