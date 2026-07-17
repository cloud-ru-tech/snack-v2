export const VARIANT = {
  Password: 'password',
  Ssh: 'ssh',
  VmAgent: 'vmAgent',
  Support: 'support',
  Queue: 'queue',
} as const;

export const VARIANT_ORDER = [VARIANT.Password, VARIANT.Ssh, VARIANT.VmAgent, VARIANT.Support, VARIANT.Queue] as const;

export const VARIANT_MESSAGES = {
  secureMode: 'Вы перешли в безопасный режим',
  privacy: 'Гига не получит ваши данные',
  passwordPrompt: 'Введите пароль',
  sshPrompt: 'Введите SSH-ключ',
  vmAgentTitle: 'Вы перешли в режим управления ВМ',
  support: 'Чат с инженером',
  cancelAction: 'Отменить',
  finishAction: 'Завершить',
  newSessionAction: 'Новая сессия',
} as const;

export const VARIANT_ACTION_LABELS = {
  [VARIANT.Password]: VARIANT_MESSAGES.cancelAction,
  [VARIANT.Ssh]: VARIANT_MESSAGES.cancelAction,
  [VARIANT.Support]: VARIANT_MESSAGES.finishAction,
  [VARIANT.VmAgent]: VARIANT_MESSAGES.newSessionAction,
} as const;

export const DESCRIPTION_STATE = {
  FirstMessage: 'firstMessage',
  SecondMessage: 'secondMessage',
  DefaultMessage: 'defaultMessage',
  HoverMessage: 'hoverMessage',
} as const;

export const DESCRIPTION_STATE_ORDER = [
  DESCRIPTION_STATE.FirstMessage,
  DESCRIPTION_STATE.SecondMessage,
  DESCRIPTION_STATE.DefaultMessage,
  DESCRIPTION_STATE.HoverMessage,
] as const;

/** Интервал между шагами автосмены описания (мс) */
export const ANIMATION_DELAY_INTERVAL = 1900;

/** Интервал автосмены описания до завершения цикла (мс) */
export const ANIMATION_INTERVAL = 2800;

/** Задержка шага анимации при hover после завершения автосмены (мс) */
export const ANIMATION_HOVER_DELAY = 200;

export const TEST_IDS = {
  root: 'ai-field-notice',
  content: 'ai-field-notice__content',
  contentMessage: 'ai-field-notice__content-message',
  queue: 'ai-queue',
  banner: 'ai-field-notice__banner',
  vmInfo: 'ai-field-notice__vm-info',
  vmName: 'ai-field-notice__vm-name',
  vmIp: 'ai-field-notice__vm-ip',
} as const;
