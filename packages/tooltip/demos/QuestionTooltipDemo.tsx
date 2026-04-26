import { QuestionTooltip } from '@ds/tooltip';

export function QuestionTooltipDemo() {
  return (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span>Email</span>
      <input type='email' name='email' placeholder='you@example.com' />
      <QuestionTooltip tip='Используется для восстановления доступа. Не будет показан публично.' />
    </label>
  );
}
