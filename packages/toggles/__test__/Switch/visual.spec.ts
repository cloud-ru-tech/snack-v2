import { buildSwitchStory, TEST_IDS } from '../_shared/helpers';
import { registerToggleVisualSuite } from '../_shared/visualSuite';

registerToggleVisualSuite({ name: 'Switch', ids: TEST_IDS.switch, buildStory: buildSwitchStory });
