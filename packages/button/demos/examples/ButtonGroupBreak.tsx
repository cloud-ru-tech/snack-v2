import { ButtonGroup } from '@ds/button';

export function ButtonGroupBreak() {
  return (
    <div style={{ width: 480 }}>
      <ButtonGroup
        break
        tertiaryAction={{ label: 'Назад', appearance: 'neutral', view: 'simple' }}
        primaryAction={{ label: 'Продолжить', appearance: 'primary', view: 'filled' }}
      />
    </div>
  );
}
