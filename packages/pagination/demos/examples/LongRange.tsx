import { Pagination } from '@ds/pagination';
import { useState } from 'react';

export function LongRange() {
  const [page, setPage] = useState(12);

  return <Pagination total={42} page={page} maxLength={7} onChange={setPage} />;
}
