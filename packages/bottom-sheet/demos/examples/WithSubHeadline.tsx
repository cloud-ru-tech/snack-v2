import { BottomSheet } from '@ds/bottom-sheet';
import { Button } from '@ds/button';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function WithSubHeadline() {
  const [open, setOpen] = useState(false);

  return (
    <MobilePreview>
      <Button label='Открыть с subHeadline' view='outline' appearance='neutral' onClick={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title='Filters'
        // В продакшене сюда — `@ds/search::SearchBar` или `@ds/segment-control::SegmentControl`.
        subHeadline={<div>SearchBar / SegmentControl placeholder</div>}
        content={<p>SubHeadline располагается под заголовком — sticky-зона для поиска/фильтров.</p>}
        approveButton={{ label: 'Применить', onClick: () => setOpen(false) }}
      />
    </MobilePreview>
  );
}
