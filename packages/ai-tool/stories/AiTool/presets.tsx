import { AiToolKeyValue, AiToolText } from '@ds/ai-tool';

export const TOOL_NAME = 'status_for_users';
export const TOOL_DURATION = 365 * 86400 + 9 * 3600 + 9 * 60 + 9;

export const callPreset = <AiToolText mono>{'{ "user_id": 42 }'}</AiToolText>;

export const resultPreset = (
  <>
    <AiToolKeyValue label='status' value='active' />
    <AiToolKeyValue label='last_seen' value='2026-06-10T12:00:00Z' />
  </>
);
