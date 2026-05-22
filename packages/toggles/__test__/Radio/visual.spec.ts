import { buildRadioStory, TEST_IDS } from '../_shared/helpers';
import { registerToggleVisualSuite } from '../_shared/visualSuite';

registerToggleVisualSuite({ name: 'Radio', ids: TEST_IDS.radio, buildStory: buildRadioStory });
