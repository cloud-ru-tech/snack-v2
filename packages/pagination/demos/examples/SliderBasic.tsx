import { PaginationSlider } from '@ds/pagination';
import { useState } from 'react';

export function SliderBasic() {
  const [page, setPage] = useState(2);
  return <PaginationSlider total={5} page={page} onChange={setPage} />;
}
