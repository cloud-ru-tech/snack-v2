const generateDataTestId = require('./generateDataTestId.cjs');

/**
 * Standalone icon template: inline SVG as React component.
 * No sprite reference - full SVG content in the component.
 */
const standaloneIconComponentTemplate =
  ({ size = 24 }) =>
  ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => {
    const baseName = componentName.replace(/^Svg/, '');
    const standaloneComponentName = baseName + 'SVG';
    const testId = generateDataTestId(componentName);

    const componentProp = Boolean(size)
      ? `{ size = ${size}, ...props }: ISvgIconProps`
      : `{ size, ...props }: ISvgIconProps`;

    return tpl`
    ${`
    // DO NOT EDIT IT MANUALLY

    `}
    // TODO(FF-8488): убрать \`type\`-keyword согласно .claude/rules/imports-exports.md
    // на следующей перегенерации иконок (\`pnpm gen:icons\`). Сейчас оставлено, чтобы
    // соответствовать фактическому состоянию закоммиченных файлов src/components/.
    import { forwardRef } from 'react';
    import type { Ref } from 'react';
    import type { ISvgIconProps } from '../../../types';
    ${interfaces}
    ${`
    
    `}

    const ${standaloneComponentName} = forwardRef((${componentProp}, ref: Ref<SVGSVGElement>) => {
      const testId = "${testId}";
      const isCustomSize = typeof size === "number";
      const sizePx = isCustomSize ? size : 24;
      const children = (${jsx}).props.children;

      const style = isCustomSize
        ? { ...(props.style || {}), width: sizePx, height: sizePx }
        : props.style;

      return (
        <svg
          ref={ref}
          xmlns='http://www.w3.org/2000/svg'
          width={sizePx}
          height={sizePx}
          fill='currentColor'
          viewBox='0 0 24 24'
          data-test-id={'icon' + testId}
          style={style}
          {...props}
        >
          {children}
        </svg>
      );
    })

    export default ${standaloneComponentName};
    `;
  };

module.exports = standaloneIconComponentTemplate;
