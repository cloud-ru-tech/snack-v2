import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

export function Footer() {
  const [page, setPage] = useState(1);
  const [shown, setShown] = useState(3);

  return (
    <SectionBasic
      container='new'
      title='Новости'
      pagination={{ total: 5, page, onChange: setPage }}
      moreButton={{ onClick: () => setShown(count => count + 3) }}
    >
      <p>
        Страница {page}, показано новостей: {shown}
      </p>
    </SectionBasic>
  );
}
