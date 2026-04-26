import { PaginationSlider, PaginationSliderProps } from '@ds/pagination';
import { useState } from 'react';

import paginationDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type PreviewProps = Omit<PaginationSliderProps, 'onChange' | 'page'> & { page?: number };

function PaginationSliderPreview(props: PreviewProps) {
  const { page: initial = 1, ...rest } = props;
  const [page, setPage] = useState<number>(initial);
  return <PaginationSlider {...rest} page={page} onChange={setPage} />;
}

export function PaginationSliderDemo() {
  return (
    <Canvas
      component={PaginationSliderPreview}
      componentName='PaginationSlider'
      componentDoc={paginationDoc.PaginationSlider}
      defaultProps={{
        total: 6,
        page: 2,
        size: 'xs',
      }}
      controls={{
        total: { type: 'number' },
        page: { type: 'number' },
        size: { type: 'select', options: ['xs', 's'] },
      }}
      excludeProps={['onChange', 'className']}
    />
  );
}
