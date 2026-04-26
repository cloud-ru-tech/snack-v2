import { ValueOf } from '@ds/utils';

import { MODE, WIDTH } from './constants';

export type ModalWidth = ValueOf<typeof WIDTH>;

export type ModalMode = ValueOf<typeof MODE>;

export type ModalHeaderImage = {
  src: string;
  alt: string;
};
