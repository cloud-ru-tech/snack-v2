import { getGroupConfig } from '../../shared/groupConfig';
import { Validator } from './types';

const maximumSize = 24;

export const validateIconSize: Validator = {
  error: `размер иконки больше ${maximumSize}px, сделай её меньше`,
  validate: ({ icon: { xml, path } }) => {
    const group = path.split('/')[0];
    const { sizeCheck = 'square' } = getGroupConfig(group);
    const heightOk = !xml.svg['@_height'] || Number(xml.svg['@_height']) <= maximumSize;
    if (sizeCheck === 'height-only') return heightOk;
    const widthOk = !xml.svg['@_width'] || Number(xml.svg['@_width']) <= maximumSize;
    return widthOk && heightOk;
  },
};
