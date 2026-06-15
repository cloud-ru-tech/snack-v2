import { FieldDecorator } from '@ds/fields';
import { InputPrivate } from '@ds/input-private';

export function DecoratorDisabledReadonly() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <FieldDecorator
        label='Disabled'
        hint='На неактивном поле счётчик скрыт, подсказка нейтральна'
        validationState='error'
        showHintIcon
        disabled
        length={{ current: 5, max: 20 }}
      >
        <InputPrivate value='value' onChange={() => undefined} disabled />
      </FieldDecorator>
      <FieldDecorator
        label='Readonly'
        hint='Readonly также нейтрализует подсказку и прячет счётчик'
        validationState='warning'
        showHintIcon
        readonly
        length={{ current: 5, max: 20 }}
      >
        <InputPrivate value='value' onChange={() => undefined} readonly />
      </FieldDecorator>
    </div>
  );
}
