import { AiAttachment, ATTACHMENT_STATE, ATTACHMENT_TYPE } from '@ds/ai-attachment';

export function States() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <AiAttachment type={ATTACHMENT_TYPE.File} fileName='quarterly-report-final.pdf' tooltip='PDF, 2 МБ' />
      <AiAttachment type={ATTACHMENT_TYPE.File} state={ATTACHMENT_STATE.Loading} fileName='budget.xlsx' />
      <AiAttachment
        type={ATTACHMENT_TYPE.File}
        state={ATTACHMENT_STATE.Error}
        fileName='notes.txt'
        tooltip='Файл больше 20 МБ'
      />
    </div>
  );
}
