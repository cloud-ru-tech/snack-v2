import { ButtonGroup } from '@ds/button';

export function ButtonGroupPrimarySecondary() {
  return (
    <ButtonGroup
      primaryAction={{ label: 'Сохранить', appearance: 'primary', view: 'filled' }}
      secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline' }}
    />
  );
}
