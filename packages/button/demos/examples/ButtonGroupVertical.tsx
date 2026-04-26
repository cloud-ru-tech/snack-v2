import { ButtonGroup } from '@ds/button';

export function ButtonGroupVertical() {
  return (
    <ButtonGroup
      vertical
      primaryAction={{ label: 'Сохранить', appearance: 'primary', view: 'filled' }}
      secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline' }}
      tertiaryAction={{ label: 'Помощь', appearance: 'neutral', view: 'simple' }}
    />
  );
}
