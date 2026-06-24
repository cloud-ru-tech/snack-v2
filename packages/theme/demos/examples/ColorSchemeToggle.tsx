import { Block } from '@ds/block';
import { Button } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { ChildThemeProvider, COLOR_SCHEME, ColorScheme } from '@ds/theme';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const SCHEME_ITEMS = [
  { value: COLOR_SCHEME.Light, label: 'Светлая' },
  { value: COLOR_SCHEME.Dark, label: 'Тёмная' },
];

export function ColorSchemeToggle() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(COLOR_SCHEME.Light);

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl
        items={SCHEME_ITEMS}
        value={colorScheme}
        onChange={value => setColorScheme(value as ColorScheme)}
      />

      {/* В приложении colorScheme — источник истины `useColorScheme` (cookie + prefers-color-scheme),
          а корень держит RootThemeProvider. Здесь ChildThemeProvider переключает схему для поддерева:
          материал-подложка Block и компоненты на ней перекрашиваются вслед за схемой. */}
      <ChildThemeProvider value={{ colorScheme }}>
        <Block>
          <Flex gap='2m' align='center' wrap>
            <Button appearance='primary' label='Действие' />
            <Button appearance='neutral' view='outline' label='Отмена' />
            <Tag appearance='blue' label='Метка' />
          </Flex>
        </Block>
      </ChildThemeProvider>
    </Flex>
  );
}
