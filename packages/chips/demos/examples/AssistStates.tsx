import { ChipAssist } from '@ds/chips';
import { PlusSVG } from '@ds/icons/interface/system';

export function AssistStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ChipAssist label='Обычный' icon={<PlusSVG />} onClick={() => {}} />
      <ChipAssist label='Отключён' icon={<PlusSVG />} disabled onClick={() => {}} />
      <ChipAssist label='Загрузка' icon={<PlusSVG />} loading onClick={() => {}} />
    </div>
  );
}
