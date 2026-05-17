const generateDataTestId = require('./generateDataTestId.cjs');

/**
 * Sprite icon template: generates <use href="#..."> with fallback support.
 * Component name includes "Sprite" for identification.
 */
const spriteIconComponentTemplate =
  ({ size, symbolPrefix = 'snack-uikit-' }) =>
  ({ imports, interfaces, componentName, exports }, { tpl }) => {
    const baseName = componentName.replace(/^Svg/, '');
    const spriteComponentName = baseName + 'SpriteSVG';
    const testId = generateDataTestId(componentName);
    const symbolIdPart = testId.replace(/^-/, '');

    const componentProp = Boolean(size)
      ? `{ size = ${size}, ...props }: ISvgIconProps`
      : `{ size, ...props }: ISvgIconProps`;

    return tpl`
    ${`
    // DO NOT EDIT IT MANUALLY

    `}
    import { forwardRef } from 'react';
    import type { Ref } from 'react';
    import type { ISvgIconProps } from '../../../types';
    ${interfaces}
    ${`
    
    `}

    const ${spriteComponentName} = forwardRef((${componentProp}, ref: Ref<SVGSVGElement>) => {
      props.width = undefined;
      props.height = undefined;

      const testId = "${testId}";
      const symbolId = "${symbolPrefix}" + "${symbolIdPart}";
      const isCustomSize = typeof size === "number";

      if (isCustomSize) {
        if (!props.style) props.style = {};
        props.style.width = size + "px";
        props.style.height = size + "px";
      }

      return (
        <svg
          ref={ref}
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          fill='currentColor'
          viewBox='0 0 24 24'
          data-test-id={'icon' + testId}
          {...props}
        >
          <use href={'#' + symbolId} />
        </svg>
      );
    })

    export default ${spriteComponentName};
    `;
  };

module.exports = spriteIconComponentTemplate;
