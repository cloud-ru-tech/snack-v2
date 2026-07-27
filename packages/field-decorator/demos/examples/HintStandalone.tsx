import { Hint } from '@ds/field-decorator';

export function HintStandalone() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Hint hint='Нейтральная подсказка под полем' length={{ current: 12, max: 100 }} />
      <Hint hint='Ошибка валидации' validationState='error' showHintIcon />
      <Hint hint='Предупреждение' validationState='warning' showHintIcon />
      <Hint hint='Проверка пройдена' validationState='success' showHintIcon />
    </div>
  );
}
