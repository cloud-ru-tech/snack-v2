import { Slider } from '@ds/slider';

import sliderDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function SliderDemo() {
  return (
    <Canvas
      component={Slider}
      componentName='Slider'
      componentDoc={sliderDoc.Slider}
      defaultProps={{
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 40,
        handleTip: false,
        disabled: false,
      }}
      controls={{
        min: { type: 'number' },
        max: { type: 'number' },
        step: { type: 'number' },
        handleTip: { type: 'boolean' },
        disabled: { type: 'boolean' },
      }}
      excludeProps={[
        'value',
        'defaultValue',
        'onChange',
        'onChangeComplete',
        'marks',
        'tipFormatter',
        'range',
        'marksEqualSpacing',
        'className',
      ]}
    />
  );
}
