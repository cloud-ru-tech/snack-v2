import { Pagination } from '@ds/pagination';

export function LongRange() {
  return <Pagination total={42} page={12} maxLength={7} onChange={() => {}} />;
}
