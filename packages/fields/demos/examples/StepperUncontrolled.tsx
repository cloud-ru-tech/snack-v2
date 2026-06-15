import { FieldStepper } from '@ds/fields';

export function StepperUncontrolled() {
  return <FieldStepper label='Количество' postfix='шт' defaultValue={3} min={0} max={10} />;
}
