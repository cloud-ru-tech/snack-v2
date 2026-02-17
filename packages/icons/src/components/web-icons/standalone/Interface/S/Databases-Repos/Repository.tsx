// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RepositorySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-repository';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.149 3.283C8.3 3.412 5.673 4.331 4.332 5.668a3.778 3.778 0 0 0-.978 1.574l-.094.298v8.92l.094.298c.433 1.381 1.673 2.444 3.714 3.184.84.305 1.843.542 2.852.675.447.06 1.565.143 1.909.143H12V19.253l-.71-.027c-2.477-.094-4.851-.887-5.897-1.97-.308-.319-.377-.413-.504-.684-.106-.225-.109-.257-.122-1.046l-.013-.813.213.16c1.092.821 2.969 1.482 4.953 1.744.447.06 1.565.143 1.909.143H12V15.253l-.71-.027c-2.477-.094-4.851-.887-5.897-1.97-.308-.319-.377-.413-.504-.684-.106-.225-.109-.257-.122-1.046l-.013-.813.213.16c.504.379 1.262.765 2.101 1.069 2.96 1.074 6.904 1.074 9.864 0 .837-.304 1.597-.69 2.098-1.067l.21-.158V13H20.763l-.013-2.73c-.014-3.032-.002-2.891-.292-3.506-.803-1.703-3.157-2.943-6.418-3.382-.378-.051-2.038-.154-2.18-.135-.022.003-.342.019-.711.036m2.611 1.574c2.219.288 3.953.964 4.847 1.888.308.317.377.412.504.683.092.195.109.286.109.572 0 .464-.134.749-.564 1.199-.925.969-2.528 1.611-4.856 1.948-.72.104-2.88.104-3.6 0-2.536-.367-4.249-1.115-5.119-2.235a2.303 2.303 0 0 1-.192-.34C4.797 8.377 4.78 8.286 4.78 8s.017-.377.109-.572c.127-.271.196-.366.504-.683.919-.95 2.864-1.686 5.027-1.902.242-.024.503-.051.58-.06.347-.039 2.289.013 2.76.074m.48 12.643v3.26h7.52v-5.52H18.299l-.499-.5-.499-.5H14.24zm2.96-1.24.499.5h2.541v2.48h-4.48v-3.48h.941z'
      />
    </svg>
  ).props.children;
  const style = isCustomSize
    ? {
        ...(props.style || {}),
        width: sizePx,
        height: sizePx,
      }
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
});
export default RepositorySVG;
