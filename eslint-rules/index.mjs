import { requireInnerRefSupport } from './require-inner-ref-support.mjs';

/** Локальный eslint-плагин монорепо: правила, специфичные для соглашений дизайн-системы. */
export const dsPlugin = {
  meta: { name: 'eslint-plugin-ds' },
  rules: {
    'require-inner-ref-support': requireInnerRefSupport,
  },
};
