import { AiFieldNoticeProps, VARIANT } from '@ds/ai-field-notice';

import type { PlaygroundStoryArgs } from './playgroundTypes';

export function buildNoticeProps(
  args: PlaygroundStoryArgs,
  updateArgs?: (patch: Partial<PlaygroundStoryArgs>) => void,
): AiFieldNoticeProps {
  const { queue, size, className, variant = VARIANT.Password, vmName, vmIp, ...rest } = args;

  if (variant === VARIANT.Queue) {
    const resolvedQueue = queue ?? { steps: [] };

    return {
      ...rest,
      size,
      className,
      variant: VARIANT.Queue,
      queue: {
        ...resolvedQueue,
        onOpenChange: updateArgs
          ? (open: boolean) => updateArgs({ queue: { ...resolvedQueue, open } })
          : resolvedQueue.onOpenChange,
      },
    };
  }

  if (variant === VARIANT.VmAgent) {
    return {
      ...rest,
      size,
      className,
      variant,
      vmName: vmName ?? '',
      vmIp: vmIp ?? '',
    };
  }

  return {
    ...rest,
    size,
    className,
    variant,
  };
}
