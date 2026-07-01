import { AdaptiveProvider, isMobileLayout, LAYOUT_TYPE, LayoutType, useAdaptiveLayout } from '@ds/adaptive';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

const CONTEXT_ITEMS = [
  { value: LAYOUT_TYPE.Mobile, label: 'mobile' },
  { value: LAYOUT_TYPE.Desktop, label: 'desktop' },
];

// Раскладка из общего контекста (AdaptiveProvider выше) — следует за переключателем.
function FromContext() {
  const { layoutType } = useAdaptiveLayout();

  return (
    <Flex gap='1m' align='center'>
      <Typography variant='body' size='s'>
        из контекста:
      </Typography>
      <Tag appearance={isMobileLayout(layoutType) ? 'blue' : 'green'} label={layoutType} />
    </Flex>
  );
}

// Форс раскладки в поддереве — вложенный `<AdaptiveProvider layoutType='desktop'>` затеняет внешний
// контекст (то же делает HOC `withLayoutType(Component, 'desktop')` на module-scope). Эта ветка
// остаётся desktop при любом значении переключателя — пропа `layoutType` у компонента нет.
function ForcedDesktop() {
  const { layoutType } = useAdaptiveLayout();

  return (
    <Flex gap='1m' align='center'>
      <Typography variant='body' size='s'>
        форс поддерева на desktop:
      </Typography>
      <Tag appearance='green' label={layoutType} />
    </Flex>
  );
}

export function LayoutTypeOverride() {
  const [context, setContext] = useState<LayoutType>(LAYOUT_TYPE.Mobile);

  return (
    <AdaptiveProvider layoutType={context}>
      <Flex direction='column' gap='2m' align='flex-start'>
        <SegmentControl items={CONTEXT_ITEMS} value={context} onChange={value => setContext(value as LayoutType)} />
        <FromContext />
        <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
          <ForcedDesktop />
        </AdaptiveProvider>
      </Flex>
    </AdaptiveProvider>
  );
}
