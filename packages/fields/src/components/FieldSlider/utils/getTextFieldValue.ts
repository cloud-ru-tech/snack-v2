import { SliderValue, TextInputFormatter } from '../types';

export function getTextFieldValue(value: SliderValue, textInputFormatter?: TextInputFormatter): string {
  if (Array.isArray(value)) {
    return value.map(v => (textInputFormatter ? textInputFormatter(v) : String(v))).join(' – ');
  }
  return textInputFormatter ? textInputFormatter(value) : String(value);
}
