import { VARIANT } from '@ds/ai-field-notice';

export const FIXTURE_VM = {
  name: 'my-lovely-vm',
  ip: '93.7.94.11',
} as const;

export const FIXTURE_QUEUE_STEPS = [
  { label: 'Step Description', state: 'done' as const },
  { label: 'Step Description', state: 'error' as const },
  { label: 'Step Description', state: 'done' as const },
  { label: 'Step Description', state: 'progress' as const },
  { label: 'Step Description', state: 'planned' as const },
];

export const FIXTURE_PASSWORD_NOTICE = {
  variant: VARIANT.Password,
} as const;

export const FIXTURE_SSH_NOTICE = {
  variant: VARIANT.Ssh,
} as const;

export const FIXTURE_SUPPORT_NOTICE = {
  variant: VARIANT.Support,
} as const;

export const FIXTURE_VM_AGENT_NOTICE = {
  variant: VARIANT.VmAgent,
  vmName: FIXTURE_VM.name,
  vmIp: FIXTURE_VM.ip,
} as const;

export const FIXTURE_QUEUE_PROPS = {
  steps: FIXTURE_QUEUE_STEPS,
  open: false,
} as const;

export const FIXTURE_QUEUE_NOTICE = {
  variant: VARIANT.Queue,
  queue: {
    steps: FIXTURE_QUEUE_STEPS,
    defaultOpen: true,
  },
} as const;
