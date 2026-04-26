import { Pagination } from '@ds/pagination';
import { useState } from 'react';

export function Basic() {
  const [page, setPage] = useState(3);
  return <Pagination total={10} page={page} onChange={setPage} />;
}
