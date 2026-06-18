import { TABLE_COLUMN_CSS_VARS } from '../../../constants';

export function getColumnStyleVars(id: string): {
  sizeKey: string;
  flexKey: string;
} {
  return {
    sizeKey: TABLE_COLUMN_CSS_VARS.size(id),
    flexKey: TABLE_COLUMN_CSS_VARS.flex(id),
  };
}
