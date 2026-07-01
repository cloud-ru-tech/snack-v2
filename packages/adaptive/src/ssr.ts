// Server-safe подмножество публичного API @ds/adaptive: чистые функции и константы адаптива БЕЗ
// React-импортов. Барель `@ds/adaptive` (src/index.ts) реэкспортит хуки и контексты
// (`createContext`/`useEffect`), поэтому его нельзя импортировать в React Server Component (Next App
// Router завершается с ошибкой «needs use client»). Этот вход безопасно импортировать на сервере —
// например, чтобы вычислить `layoutType` из request User-Agent в `layout.tsx`
// (`getAdaptive(INITIAL_ADAPTIVE_QUERIES_VALUE, headers().get('user-agent'))`).
export * from './constants/adaptive';
export * from './types/layoutTypes';
export * from './types/presets';
export * from './utils/getAdaptive';
export * from './utils/getUserAgentInfo';
export * from './utils/resolveLayoutType';
export * from './utils/resolveByLayout';
