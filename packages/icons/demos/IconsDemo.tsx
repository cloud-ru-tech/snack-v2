import { CheckSVG, SearchSVG } from '@ds/icons'

export function IconsDemo() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <SearchSVG size={24} aria-label="Search" />
      <CheckSVG size={32} aria-label="Check" />
    </div>
  )
}
