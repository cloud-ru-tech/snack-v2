import { Pagination } from '@ds/pagination';
import { useState } from 'react';

export function AsLinks() {
  const [page, setPage] = useState(2);

  return <Pagination total={8} page={page} variant='link' hrefFormatter={p => `?page=${p}`} onChange={setPage} />;
}
