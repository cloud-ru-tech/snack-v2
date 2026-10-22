import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import { Button } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

export function Dismiss() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button label='Показать баннер' onClick={() => setVisible(true)} />;
  }

  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      content='Баннер закрывается крестиком'
      icon={<PlaceholderSVG />}
      onClose={() => setVisible(false)}
    />
  );
}
