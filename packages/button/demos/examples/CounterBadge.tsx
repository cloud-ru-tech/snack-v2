import { Button } from '@ds/button';
import { EmailSVG } from '@ds/icons/interface/system';

export function CounterBadge() {
  return <Button icon={<EmailSVG />} iconPosition='after' label='Сообщения' counter={{ value: 12 }} />;
}
