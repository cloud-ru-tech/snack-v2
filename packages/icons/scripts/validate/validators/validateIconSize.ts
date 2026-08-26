import { getGroupConfig } from '../../shared/groupConfig';
import { Validator } from './types';

const maximumSize = 24;

const ERROR_RESULT = {
  level: 'error',
  message: `Размер иконки больше ${maximumSize}px, сделай её меньше`,
} as const;

export const validateIconSize: Validator = {
  validate: ({ icon: { xml, path } }) => {
    const group = path.split('/')[0];
    const { sizeCheck = 'square' } = getGroupConfig(group);
    const heightOk = !xml.svg['@_height'] || Number(xml.svg['@_height']) <= maximumSize;
    if (sizeCheck === 'height-only') return heightOk ? null : ERROR_RESULT;
    const widthOk = !xml.svg['@_width'] || Number(xml.svg['@_width']) <= maximumSize;
    return widthOk && heightOk ? null : ERROR_RESULT;
  },
};
