import { createThemedIcon } from '@ds/icons';

// Свой логотип в двух исполнениях. createThemedIcon собирает из них компонент,
// который сам выбирает вариант по активной теме DS и ведёт себя как штатная иконка
// (проп size, сохранение соотношения сторон, data-test-id).
const AcmeLogo = createThemedIcon({
  testId: 'acme-logo',
  light: {
    nativeWidth: 24,
    nativeHeight: 24,
    children: (
      <>
        <rect width={24} height={24} rx={6} fill='#1A1A1A' />
        <path d='M7 16 12 7l5 9z' fill='#FFFFFF' />
      </>
    ),
  },
  dark: {
    nativeWidth: 24,
    nativeHeight: 24,
    children: (
      <>
        <rect width={24} height={24} rx={6} fill='#FFFFFF' />
        <path d='M7 16 12 7l5 9z' fill='#1A1A1A' />
      </>
    ),
  },
});

export function CustomThemedIcon() {
  return <AcmeLogo size={48} aria-label='Логотип Acme' />;
}
