import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

export function BackgroundFills() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}>
        <div style={{ padding: 8 }}>neutralBackground1Level</div>
      </Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.PrimaryBackground}>
        <div style={{ padding: 8 }}>primaryBackground</div>
      </Card>
      <Card backgroundPredefined={BACKGROUND_PREDEFINED_FILL.VioletBackground}>
        <div style={{ padding: 8 }}>violetBackground</div>
      </Card>
    </div>
  );
}
