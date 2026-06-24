import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { DENSITY, Density, useThemeClassnames } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const DENSITY_ITEMS = Object.values(DENSITY).map(value => ({ value, label: value }));

function DensitySurface({ density }: { density: Density }) {
  // useThemeClassnames({ density }) подмешивает текущие colorScheme/brand из контекста и навешивает
  // ПОЛНЫЙ набор sn-* (а не одиночный sn-comfort) — внутренние отступы компонентов меняются вслед
  // за плотностью, а тёмная тема при этом не ломается.
  const className = useThemeClassnames({ density });

  return (
    <div className={className}>
      <Flex gap='2m' align='center' wrap>
        <Button appearance='primary' label='Кнопка' />
        <Button appearance='neutral' view='outline' label='Ещё' />
        <Tag appearance='primary' label='Тег' />
      </Flex>
    </div>
  );
}

export function LocalDensity() {
  const [density, setDensity] = useState<Density>(DENSITY.Compact);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={DENSITY_ITEMS} value={density} onChange={value => setDensity(value as Density)} />
      <DensitySurface density={density} />
    </Flex>
  );
}
