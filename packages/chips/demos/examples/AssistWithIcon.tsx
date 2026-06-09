import { ChipAssist } from '@ds/chips';
import { PlusSVG } from '@ds/icons';

export function AssistWithIcon() {
  return <ChipAssist label='Добавить тег' icon={<PlusSVG />} size='m' onClick={() => {}} />;
}
