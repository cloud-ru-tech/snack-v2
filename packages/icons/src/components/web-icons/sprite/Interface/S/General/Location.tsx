// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 2.280 C 8.582 2.478,6.030 4.029,4.555 6.404 C 4.114 7.114,3.718 8.059,3.501 8.917 C 3.182 10.184,3.174 11.727,3.482 13.017 C 3.671 13.811,4.142 14.978,4.449 15.412 C 4.540 15.541,11.943 21.960,12.000 21.960 C 12.037 21.960,19.049 15.912,19.392 15.584 C 19.663 15.325,20.078 14.466,20.354 13.595 C 21.188 10.959,20.684 8.016,19.013 5.772 C 17.637 3.924,15.504 2.658,13.240 2.345 C 12.688 2.268,11.887 2.241,11.340 2.280 M13.232 3.856 C 14.742 4.135,16.048 4.818,17.115 5.885 C 18.563 7.332,19.302 9.213,19.228 11.260 C 19.188 12.363,18.995 13.159,18.535 14.124 L 18.351 14.509 15.192 17.244 C 13.454 18.749,12.018 19.980,12.000 19.980 C 11.982 19.980,10.546 18.749,8.807 17.244 L 5.647 14.509 5.446 14.084 C 4.722 12.558,4.566 10.819,5.000 9.120 C 5.623 6.682,7.723 4.601,10.180 3.986 C 10.528 3.899,10.747 3.860,11.300 3.783 C 11.566 3.746,12.915 3.797,13.232 3.856 M11.290 7.282 C 10.835 7.363,10.189 7.643,9.780 7.937 C 9.304 8.278,8.841 8.823,8.586 9.344 C 8.285 9.958,8.184 10.409,8.188 11.120 C 8.191 11.524,8.212 11.697,8.296 12.020 C 8.761 13.800,10.383 15.003,12.191 14.909 C 13.873 14.821,15.276 13.665,15.705 12.015 C 15.824 11.557,15.850 10.805,15.764 10.360 C 15.577 9.403,15.004 8.504,14.220 7.935 C 13.962 7.748,13.288 7.424,12.980 7.340 C 12.695 7.262,11.611 7.224,11.290 7.282 M12.463 8.763 C 12.883 8.839,13.261 9.052,13.621 9.416 C 13.988 9.786,14.129 10.024,14.241 10.463 C 14.456 11.304,14.230 12.131,13.621 12.740 C 13.151 13.209,12.658 13.414,12.000 13.414 C 11.342 13.414,10.849 13.209,10.379 12.740 C 9.770 12.131,9.544 11.304,9.759 10.463 C 9.871 10.024,10.012 9.786,10.379 9.416 C 10.856 8.934,11.311 8.736,11.963 8.724 C 12.107 8.722,12.332 8.739,12.463 8.763 " stroke="none" fill-rule="evenodd"></path>';

const LocationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-location';
  const symbolId = 'snack-uikit-web-icons-' + 'location';
  const [useFallback, setUseFallback] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(symbolId)) {
      setUseFallback(true);
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`[@design-system/icons] Symbol "#${symbolId}" not found on page. Rendering inline fallback.`);
      }
    }
  }, [symbolId]);

  const isCustomSize = typeof size === 'number';
  if (isCustomSize) {
    if (!props.style) props.style = {};
    props.style.width = size + 'px';
    props.style.height = size + 'px';
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
      {useFallback ? <g dangerouslySetInnerHTML={{ __html: FALLBACK_SVG_INNER }} /> : <use href={'#' + symbolId} />}
    </svg>
  );
});
export default LocationSpriteSVG;
