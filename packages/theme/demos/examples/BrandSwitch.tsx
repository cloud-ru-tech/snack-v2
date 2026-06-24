import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { Counter } from '@ds/counter';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { BRAND, Brand, ChildThemeProvider } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const BRAND_ITEMS = Object.values(BRAND).map(value => ({ value, label: value }));

export function BrandSwitch() {
  const [brand, setBrand] = useState<Brand>(BRAND.A);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={BRAND_ITEMS} value={brand} onChange={value => setBrand(value as Brand)} />

      {/* ChildThemeProvider сливает ось `brand` с ближайшим контекстом и реэмитит полный набор
          sn-* на своей границе — акцентные цвета компонентов ниже меняются вслед за брендом. */}
      <ChildThemeProvider value={{ brand }}>
        <Block>
          <Flex gap='2m' align='center' wrap>
            <Button appearance='primary' label='Действие' />
            <Tag appearance='primary' label='Бренд' />
            <Counter value={8} appearance='primary' />
          </Flex>
        </Block>
      </ChildThemeProvider>
    </Flex>
  );
}
