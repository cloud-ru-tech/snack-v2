import { Pagination, PaginationProps } from '@ds/pagination';
import { useState } from 'react';

import paginationDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type PreviewProps = Omit<PaginationProps, 'onChange' | 'page'> & { page?: number };

function PaginationPreview(props: PreviewProps) {
  const { page: initial = 1, ...rest } = props;
  const [page, setPage] = useState<number>(initial);
  return <Pagination {...rest} page={page} onChange={setPage} />;
}

export function PaginationDemo() {
  return (
    <Canvas
      component={PaginationPreview}
      componentName='Pagination'
      componentDoc={paginationDoc.Pagination}
      defaultProps={{
        total: 10,
        page: 3,
        size: 's',
        variant: 'button',
        maxLength: 7,
      }}
      controls={{
        total: { type: 'number' },
        page: { type: 'number' },
        size: { type: 'select', options: ['s', 'm'] },
        variant: { type: 'select', options: ['button', 'link'] },
        maxLength: { type: 'number' },
      }}
      excludeProps={['onChange', 'hrefFormatter', 'className']}
    />
  );
}
