/**
 * @astrojs/react `check()` вызывает `Component(...args)` внутри Tester вместо
 * `React.createElement(Component, props)`. Для компонентов с хуками это даёт
 * Invalid hook call при SSR-проверке рендерера (layout-острова, Example и т.д.).
 */
export function patchAstroReactCheck() {
  return {
    name: 'patch-astro-react-check',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('@astrojs/react/dist/server.js')) return;

      return code.replace(
        'const vnode = Component(...args);',
        'const vnode = React.createElement(Component, args[0]);',
      );
    },
  };
}
