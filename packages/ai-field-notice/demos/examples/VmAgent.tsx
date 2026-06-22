import { AiFieldNotice, SIZE, VARIANT } from '@ds/ai-field-notice';

export function VmAgent() {
  return (
    <AiFieldNotice
      size={SIZE.S}
      variant={VARIANT.VmAgent}
      vmName='my-lovely-vm'
      vmIp='93.7.94.11'
      onActionClick={() => undefined}
    />
  );
}
