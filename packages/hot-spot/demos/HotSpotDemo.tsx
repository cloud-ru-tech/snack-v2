import { Button } from '@ds/button';
import { HotSpot, HotSpotProps } from '@ds/hot-spot';

import hotSpotDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

/**
 * HotSpot — пульсирующий маркер, привязанный к UI-элементу. Без anchor'а
 * получается одинокая точка, по которой непонятно, на что она указывает.
 * Адаптер прикрепляет hot-spot к кнопке — ровно тот сценарий, ради которого
 * компонент существует.
 */
function HotSpotPreview(props: Pick<HotSpotProps, 'appearance' | 'placement' | 'pulse' | 'enabled'>) {
  return (
    <HotSpot {...props}>
      <Button label='Onboarding step' appearance='neutral' view='outline' />
    </HotSpot>
  );
}

export function HotSpotDemo() {
  return (
    <Canvas
      component={HotSpotPreview}
      componentName='HotSpot'
      componentDoc={hotSpotDoc.HotSpot}
      defaultProps={{
        appearance: 'primary',
        pulse: true,
        placement: 'right-top',
        enabled: true,
      }}
      controls={{
        appearance: {
          type: 'select',
          options: ['primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        placement: {
          type: 'select',
          options: [
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom',
            'center',
            'center-top',
            'center-bottom',
          ],
        },
        pulse: { type: 'boolean' },
        enabled: { type: 'boolean' },
      }}
      excludeProps={['children', 'dotRender', 'className', 'wrapperClassName']}
    />
  );
}
