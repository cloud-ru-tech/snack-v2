import { buildCheckboxStory, TEST_IDS } from '../_shared/helpers';
import { registerToggleVisualSuite } from '../_shared/visualSuite';

registerToggleVisualSuite({ name: 'Checkbox', ids: TEST_IDS.checkbox, buildStory: buildCheckboxStory });
