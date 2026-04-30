import { PaginationSlider } from '@ds/pagination';
import { useState } from 'react';

export function SliderSizeS() {
  const [page, setPage] = useState(2);

  return <PaginationSlider total={5} page={page} size='s' onChange={setPage} />;
}
