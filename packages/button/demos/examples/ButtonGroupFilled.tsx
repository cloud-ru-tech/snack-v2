import { ButtonGroup } from '@ds/button';

export function ButtonGroupFilled() {
  return (
    <div style={{ width: 320 }}>
      <ButtonGroup
        filled
        primaryAction={{ label: 'Применить', appearance: 'primary', view: 'filled' }}
        secondaryAction={{ label: 'Сбросить', appearance: 'neutral', view: 'outline' }}
      />
    </div>
  );
}
