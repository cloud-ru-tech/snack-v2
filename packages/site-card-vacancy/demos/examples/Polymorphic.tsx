import { CardVacancy } from '@ds/site-card-vacancy';
import { useState } from 'react';

export function Polymorphic() {
  const [opened, setOpened] = useState(0);

  return (
    <CardVacancy
      as='button'
      type='button'
      title='Data Analyst'
      description={opened ? `Opened ${opened} time(s)` : 'Click to open'}
      onClick={() => setOpened(count => count + 1)}
    />
  );
}
