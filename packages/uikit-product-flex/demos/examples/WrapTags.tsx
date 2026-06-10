import { Flex } from '@ds/uikit-product-flex';

const items = ['React', 'TypeScript', 'SCSS', 'Vite', 'Storybook', 'Playwright'];

const chipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: 16,
  background: 'var(--sn-theme-color-neutral-background1Level)',
  boxShadow: 'inset 0 0 0 1px var(--sn-theme-color-available-borderColor)',
} as const;

export function WrapTags() {
  return (
    <Flex wrap gap='1m' width={240}>
      {items.map(item => (
        <span key={item} style={chipStyle}>
          {item}
        </span>
      ))}
    </Flex>
  );
}
