import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { Counter } from '@ds/counter';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { RootThemeProvider, useApplyCustomTheme } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const COLOR_ITEMS = [
  { value: '#8a2be2', label: 'Фиолетовый' },
  { value: '#ff7a00', label: 'Оранжевый' },
  { value: '#0077ff', label: 'Синий' },
];

// `scope` — CSS-селектор корня поддерева. Здесь правило скоуплено на `#brand-hook-scope`, поэтому
// бренд-акцент перекрашивается только внутри этого блока (и во всех компонентах ниже по дереву — Button,
// Tag, Counter). Без `scope` правило было бы глобальным и перекрасило бы всю страницу, включая порталы.
const SCOPE_ID = 'brand-hook-scope';

export function CustomBrandColorHook() {
  const [color, setColor] = useState('#8a2be2');

  useApplyCustomTheme({ color, scope: `#${SCOPE_ID}` });

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={COLOR_ITEMS} value={color} onChange={value => setColor(String(value))} />

      <div id={SCOPE_ID}>
        <RootThemeProvider value={{ colorScheme: 'light', brand: 'brandA', brandRole: 'main' }}>
          <Block>
            <Flex gap='2m' align='center' wrap>
              <Button appearance='primary' label='Внутри scope' />
              <Tag appearance='primary' label='Бренд' />
              <Counter value={8} appearance='primary' />
            </Flex>
          </Block>
        </RootThemeProvider>
      </div>
    </Flex>
  );
}
