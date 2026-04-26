import { ButtonGroup } from '@ds/button';

import buttonDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function ButtonGroupDemo() {
  return (
    <Canvas
      component={ButtonGroup}
      componentName='ButtonGroup'
      componentDoc={buttonDoc.ButtonGroup}
      defaultProps={{
        size: 'm',
        vertical: false,
        centered: false,
        break: false,
        filled: false,
        primaryAction: { label: 'Сохранить', appearance: 'primary', view: 'filled' },
        secondaryAction: { label: 'Отмена', appearance: 'neutral', view: 'outline' },
      }}
      controls={{
        size: { type: 'select', options: ['s', 'm', 'l'] },
        vertical: { type: 'boolean' },
        centered: { type: 'boolean' },
        break: { type: 'boolean' },
        filled: { type: 'boolean' },
      }}
      excludeProps={['primaryAction', 'secondaryAction', 'tertiaryAction', 'className']}
    />
  );
}
