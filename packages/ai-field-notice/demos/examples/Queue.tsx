import { AI_QUEUE_STEP_STATE, AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

const steps = [
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Error },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
  { label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
];

export function Queue() {
  return (
    <AiFieldNotice
      size={SIZE.S}
      variant={VARIANT.Queue}
      queue={{
        steps,
        defaultOpen: true,
      }}
    />
  );
}
