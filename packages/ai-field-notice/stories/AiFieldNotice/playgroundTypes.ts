import { AiFieldNoticeProps, Variant } from '@ds/ai-field-notice';
import { AiQueueProps } from '@ds/ai-queue';

/** Story-only args: все поля варианта доступны одновременно для Controls. */
export type PlaygroundStoryArgs = {
  variant?: Variant;
  vmName?: string;
  vmIp?: string;
  queue?: AiQueueProps;
} & Omit<AiFieldNoticeProps, 'variant' | 'vmName' | 'vmIp' | 'queue'>;
