import { AiFieldNotice, VARIANT } from '@ds/ai-field-notice';

export function Password() {
  return <AiFieldNotice variant={VARIANT.Password} onActionClick={() => undefined} />;
}
