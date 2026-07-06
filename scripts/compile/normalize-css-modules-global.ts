import { Plugin, Rule } from 'postcss';

/**
 * Строгий CSS-modules-парсер Turbopack (Next 16) не принимает два паттерна,
 * которые dart-sass + postcss-discard-comments оставляют в `*.module.css`:
 *   1. пустой блок `:global {}` (комментарий внутри `:global { ... }` выеден
 *      discard-comments, тело опустело);
 *   2. нескобочный `:global .foo > .bar { ... }` — валидно только `:global(.foo > .bar)`.
 *
 * Плагин прогоняется ПОСЛЕ postcss-discard-comments: убирает пустые `:global {}`
 * и оборачивает `:global <sel>` → `:global(<sel>)` покомпонентно (через rule.selectors).
 */
export function normalizeCssModulesGlobal(): Plugin {
  return {
    postcssPlugin: 'normalize-css-modules-global',
    OnceExit(root) {
      root.walkRules((rule: Rule) => {
        // Пустой `:global {}` — удаляем целиком.
        if (rule.selector.trim() === ':global' && rule.nodes.length === 0) {
          rule.remove();

          return;
        }

        // Нескобочный `:global <sel>` → `:global(<sel>)`.
        rule.selectors = rule.selectors.map(selector => {
          const match = /^:global\s+(.+)$/.exec(selector.trim());

          return match ? `:global(${match[1]})` : selector;
        });
      });
    },
  };
}

normalizeCssModulesGlobal.postcss = true;
