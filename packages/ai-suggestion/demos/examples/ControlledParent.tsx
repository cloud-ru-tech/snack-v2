import { AiSuggestionParent, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';
import { useState } from 'react';

export function ControlledParent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AiSuggestionParent
      label='Suggested actions'
      icon={<PlaceholderSVG />}
      size={SIZE.S}
      expanded={expanded}
      onExpandedChange={setExpanded}
      items={[{ label: 'Summarize this thread' }, { label: 'Write follow-up email' }, { label: 'Create TODO list' }]}
    />
  );
}
