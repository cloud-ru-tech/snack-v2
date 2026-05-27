import { Card } from '@ds/card';

export function DisabledCard() {
  return (
    <Card disabled>
      <div style={{ padding: 8 }}>Состояние disabled — без hover/focus визуала интеракции</div>
    </Card>
  );
}
