import { Pagination } from '@ds/pagination';

export function AsLinks() {
  return <Pagination total={8} page={2} variant='link' hrefFormatter={page => `?page=${page}`} onChange={() => {}} />;
}
