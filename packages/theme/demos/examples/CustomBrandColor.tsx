import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { Counter } from '@ds/counter';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { RootThemeProvider } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const COLOR_ITEMS = [
  { value: '#ff7a00', label: 'Оранжевый' },
  { value: '#8a2be2', label: 'Фиолетовый' },
  { value: '#0077ff', label: 'Синий' },
  { value: '#e5006e', label: 'Розовый' },
];

export function CustomBrandColor() {
  const [color, setColor] = useState('#ff7a00');

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={COLOR_ITEMS} value={color} onChange={value => setColor(String(value))} />

      {/* brandColor генерирует палитру `--sn-brand-color-primary-*` из одного seed-цвета — акцент
          компонентов ниже перекрашивается вслед за выбором. */}
      <RootThemeProvider value={{ colorScheme: 'light', brand: 'brandA', brandRole: 'main' }} brandColor={color}>
        <Block>
          <Flex gap='2m' align='center' wrap>
            <Button appearance='primary' label='Действие' />
            <Tag appearance='primary' label='Бренд' />
            <Counter value={8} appearance='primary' />
          </Flex>
        </Block>
      </RootThemeProvider>
    </Flex>
  );
}
