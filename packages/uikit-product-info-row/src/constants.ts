/** Позиция строки в списке (мобильный `MobileInfoRow`): влияет на padding и разделители. */
export const POSITION = {
  Inner: 'inner',
  First: 'first',
  Last: 'last',
} as const;

export const TEST_IDS = {
  infoGroup: 'info-group',
  infoRow: 'info-row',
  mobileInfoRow: 'mobile-info-row',
  adaptiveInfoRow: 'adaptive-info-row',
} as const;
